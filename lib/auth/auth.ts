// ! 3  This file is for setting up authentication using the better-auth library.

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { initializeUserBoard } from "../init-user-board";
import connectDB from "../db";


// we will be using this to do anything related to authentication in our app, like signing up , signing in , signing out and also to protect routes and pages that require authentication

//  with better auth they do not store the information about the user but they give us the tools to do that , we have to setup out database , in this case mongodb 

//! const client=new MongoClient(process.env.MONGODB_URI!); // create a new mongodb client instance(object) using the connection string from the env vars
//! const db=client.db(); // get the default database from the connection string

//!  so now here above and in db.ts we connected to the db twice , it is better in production to connect to the database once inside one single place

const mongooseInstance = await connectDB(); 
const client = mongooseInstance.connection.getClient(); 
const db = client.db();



export const auth = betterAuth({
 
  // first we need to tell it we use mongodb and mongoose , first we pass two values (db instance and the client) i will do it above
  database: mongodbAdapter(db,{
    client
    
  }) , 

    // this will cache the session in a cookie for faster access and to avoid making a request to the database every time we want to get the session , see the dashboard page 
  session: {
    cookieCache: {
      enabled: true, 
      maxAge: 60 * 60 ,
    },
      
    },
    



  // specify what type of authentication we want to use  , we will use email and password authentication , so we need to specify that in the options , see the documentation for better-auth for more details about the options we can use
  emailAndPassword: { 
    enabled: true, 
  }, 
  // this helps us if we want to do different things in different stages when the user is being created or deleted or updated 
  databaseHooks: {
    user: {
      create: {
       after: async (user) => { //this after function passes the user id 
          if (user.id) {
            await initializeUserBoard(user.id); // when a user is created we will initialize their board using the function we created in the init-user-board file and we will pass the user id to it
          }
        }
     }
    }
  }
}   
);

//!  now if we for example signup a user better auth will create the db for us includes the user and session

//! now we have to detect if the user is authenticated or not using sessions and we use it in the navebar and because navbar is a server component we do it here using a function that we will use on or app a lot in server components 


export async function getSession() {
  // Implementation for getting the session
  const result = await auth.api.getSession({
    headers: await headers(), // pass the headers from the request to get the session for the current user
  }); // this will return the session if the user is authenticated or null if not

  return result; // either null or information about the user and the session
}


export async function signOut() {
  // Implementation for signing out
 const result = await auth.api.signOut({
    headers: await headers(),
  });

  // direct the user to to signing page 
  if (result.success){
    // route.push works only in client side 
     
    redirect("/sign-in"); // redirect the user to the sign in page after signing out successfully
  }
  
}