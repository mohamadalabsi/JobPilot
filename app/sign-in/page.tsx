// second route 

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Signin() {

  return (
    // min-h-[calc(100vh-4rem)] is min height minus the height of the header (4rem) but we have to calculate it
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      {/* adding card component from shadcn run npx shadcn@latest add card  , the component is the card but it comes with a header, content, etc.  also after that i added input and label */}
       <Card className="w-full max-w-md border-gray-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-600">
           Enter your email and password to access your job application tracker
          </CardDescription>
        </CardHeader>
        <form  className="space-y-4">
          <CardContent className="space-y-4">
         
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
               
                required
                minLength={8}
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
               
            >
              Sign Up
            </Button>
            <p className="text-center text-sm text-gray-600">
              don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}