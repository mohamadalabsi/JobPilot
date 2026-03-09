import { Button } from "@/components/ui/button";
import Image from "next/image";
import {ArrowRight} from "lucide-react";

export default function Home() {
  return (
    // in the classname we put the styles using tailwind css, we can also add custom styles in the global.css file
    // flex-col so everything stack on each other 
    <div className="flex min-h-screen flex-col bg-white">
      {/* /now adding the main part  */}
         <main className=" flex-1 ">
          {/* hero section */}
          <section  className="container py-32 px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-black mb-6 text-6xl font-bold">
                A Better way to track your job application.
                </h1>
              {/* add the color palette , it is just a way where you can edit tailwind classes */}
              <p className="text-gray-700 mb-10 text-xl">
                Capture , organize and manage your job search in one place.
                </p>
                <div className="flex flex-col items-center gap-4">
                  {/* now here we have a button we can make a componente and reuse multiple time as usual but i will use shadcn  to install custom made components it will be created in components folder , run npx i shadcn@latest add button and then import it */}
               <Button size="lg" className="h-12 px-8 text-lg font-medium " >
                Start for free
                {/* i want to install icon library , run npm i lucide-react */}
                <ArrowRight className="ml-2 " />
                </Button>
               <p>Free forever , no credit card required.</p>
               </div>
            </div>

          </section>
     








             </main>


    </div>
   
  );
}
