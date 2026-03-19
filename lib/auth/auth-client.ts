// ! this is the client side version of the auth file
// now this will be used for login and signup but both are client components so we have to create this , so we cant use auth.ts because it is for server side stuff 

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  //  now we pass the base url for our website but with litte adjustments , see the .env
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL! , // this ! means assert the value 
 });


// export some functions that we can use from this auth client like signIn , signOut
// these function we get from authClient

export const { signIn, signUp , signOut , useSession } = authClient;