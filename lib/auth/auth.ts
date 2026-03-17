// ! 3  This file is for setting up authentication using the better-auth library.

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";


// we will be using this to do anything related to authentication in our app, like signing up , signing in , signing out and also to protect routes and pages that require authentication

//  with better auth they do not store the information about the user but they give us the tools to do that , we have to setup out database , in this case mongodb 

const client=new MongoClient(process.env.MONGODB_URI!); // create a new mongodb client instance(object) using the connection string from the env vars
const db=client.db(); // get the default database from the connection string

export const auth = betterAuth({
 
  // first we need to tell it we use mongodb and mongoose , first we pass two values (db instance and the client) i will do it above
  database: mongodbAdapter(db,{
    client
    
  }) , 
  // specify what type of authentication we want to use  , we will use email and password authentication , so we need to specify that in the options , see the documentation for better-auth for more details about the options we can use
  emailAndPassword: { 
    enabled: true, 
  }, 
});

//  now if we for example signup a user better auth will create the db for us 