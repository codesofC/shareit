"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import { UserAvatar } from "./";
import { Waypoints } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();

  const [displaySubmenu, setDisplaySubmenu] = useState(false);

  const router = useRouter();

  const goToNewProject = () => {
    if(session){
      router.push("/newproject")
    }else{
      signIn()
    }
  }

  return (
    <nav className="navbar">
      <div
        className="flex-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span className="font-extrabold text-white">
          <Waypoints className="w-8  h-8 md:w-12 md:h-12" />
        </span>
        <span className="text-white font-mono font-bold text-2xl hidden md:flex"> Share IT </span>
      </div>

      <div className="buttons-container">
        <div title="Add Project">
          
          <CustomButton
            title="Add Project"
            customStyles="flex bg-white text-black hover:bg-transparent border hover:text-white"
            handleEvent={() => goToNewProject()}
          />
        </div>
        {!session ? (
          <div title="SignIn">
           
            <CustomButton
            title="Sign In"
            customStyles="flex border hover:bg-transparent"
            handleEvent={() => {signIn()}}
          />
          </div>
        ) : (
          <UserAvatar
            displaySubmenu={displaySubmenu}
            setDisplaySubmenu={setDisplaySubmenu}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
