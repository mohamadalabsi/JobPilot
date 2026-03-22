// this is like middelware , here we can put some restrictions like if the user is signed in can reach the dashboard or and cannot reach the sign in or sign out page 
// it is a function that will run before any request reaches any page 

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";


export default async function proxy(request : NextRequest) {

  //  it is in the dashboard page
  // const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard"); //detect if the user in the dashboard page or not 
   const session = await getSession();
  //  if (isDashboardPage && !session?.user) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }


  const isSignInPage = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUpPage = request.nextUrl.pathname.startsWith("/sign-up");

  if ((isSignInPage || isSignUpPage) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
