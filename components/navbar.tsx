import { Briefcase, Plane, PlaneTakeoff } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

//  a bit different form blain react
export default function Navbar() {  
  // use client components when it is necessary to use state or effects, like onclick on buttons or useState 
    return (
    <nav className="border-b border-gray-200 bg-white">
      <div className=" flex h-16 items-center px-4 justify-between w-full">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary"> 
          {/* here we can change the color of the icon and the text from the link  */}
          <Briefcase  />
          JobPilot
          </Link>

            <div className="flex items-center gap-4">
            <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary hover:bg-primary/90">
                  Start for free
                </Button>
              </Link>
            </div>
      </div>
      </nav>

    )
}