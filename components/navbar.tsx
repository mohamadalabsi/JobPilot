"use client"

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";



 
// ! first server components can be async
// ! second we can not use hooks like useSession or onClick or anything like this on server components
// ! third functions from auth.ts that we want to use in server components and functions from auth-client.ts that we want to use in client components 
// ! now i tried doing this as server component and the part form it client component but the problem the session does not refresh when i sign in or sign out automatically because the session is fetched on the server and it feels wrong so i had to change it to client component and i can use the signoutButton from here it does not matter becaude both are client component 


export default  function Navbar() {   
  // const session = await getSession(); 
  const { data: session } = useSession();





  // use client components when it is necessary to use state or effects, like onclick on buttons or useState 
    return (
    <nav className="border-b border-gray-200 bg-white">
      <div className=" container mx-auto flex h-16 items-center px-4 justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">  
          {/* here we can change the color of the icon and the text from the link  */}
         <Briefcase />
          JobPilot
        </Link>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black hover:cursor-pointer"
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger  asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full hover:cursor-pointer"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-white">
                        {session.user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-black">
                        {session.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black hover:cursor-pointer"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary hover:bg-primary/90 hover:cursor-pointer">
                  Start for free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}