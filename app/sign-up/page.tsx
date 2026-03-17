// first route 

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "@/lib/auth/auth-client"; // we will use this function to sign up the user when they submit the form
import { useRouter } from "next/navigation";

export default function SignUp() {
 // it is a client component we have to keep track of the vaulues  of the inputs and also the error and loading state
//  so we create 3 different states for that and we will use the useState hook to manage them and we use onchange event to update the state when the user types in the input fields
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
//  if there is an error we will display it and if the form is submitting we will disable the button and show a loading state
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);

 const router = useRouter(); // we will use this to redirect the user to the dashboard page after they sign up successfully

//   now function will run whenever the user submits the form // it is async because we will be making an api call to sign up the user and we want to wait for that to finish before we do anything else
async function handleSubmit(e: React.FormEvent) { 
  // it will be called from the form 
    e.preventDefault();
    setLoading(true); // set loading to true when the form is submitted and we will set it to false when the form is done submitting or if there is an error
    setError(""); // reset the error state before submitting the form

    // ! now we sigin up the user in try 
    try {
      // we need to write something that help us with all the operations related to authentication like signing up , signing in , see auth-client.ts for that
      // we use email and password authentication , so it is the function that gonna sign up the user using that 
      const result = await signUp.email({
          email,
          password,
          name
        });

        if (result.error) {
          setError(result.error.message ?? "An error occurred while signing up"); // set the error state if there is an error
        }else {
        //  if it was successful we will redirect the user to the dashboard page and we can do that using the useRouter hook from next/navigation
          router.push("/dashboard");
        }

    } catch (err) {
        setError("An unexpected error occurred"); // set the error state if there is an error
    } finally {
      // no matter what happens we will set loading to false when the form is done submitting
        setLoading(false); 
    }

}




  return (
    // min-h-[calc(100vh-4rem)] is min height minus the height of the header (4rem) but we have to calculate it
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      {/* adding card component from shadcn run npx shadcn@latest add card  , the component is the card but it comes with a header, content, etc. */}
       <Card className="w-full max-w-md border-gray-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">
            Sign Up
          </CardTitle>
          <CardDescription className="text-gray-600">
            Create an account to start tracking your job applications
          </CardDescription>
        </CardHeader>
        <form  onSubmit={handleSubmit} className="space-y-4">
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
               {error}
              </div>
            )}
         
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              disabled={loading} // disable the button when loading is true

            >
            {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}