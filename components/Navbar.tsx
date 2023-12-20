"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import logoImg from "../public/assets/logo.png";
import CustomButton from "./CustomButton";
import { UserAvatar } from "./";
import { Divide, PenSquare, User, Waypoints } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();

  const [displaySubmenu, setDisplaySubmenu] = useState(false);

  const router = useRouter();

  return (
    <nav className="navbar">
      <div
        className="flex-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span className="font-extrabold text-green-600">
          <Waypoints className="w-10  h-10 md:w-14 md:h-14" />
        </span>
        <span className="hidden sm:flex font-bold text-2xl text-green-600">
          ShareIt
        </span>
      </div>

      <div className="buttons-container">
        <div title="Add Project">
          <PenSquare
            onClick={() => router.push("/newproject")}
            className="w-8 h-8 sm:hidden cursor-pointer"
          />
          <CustomButton
            title="Add Project"
            customStyles="hidden sm:flex bg-green-700 text-white"
            handleEvent={() => router.push("/newproject")}
          />
        </div>
        {!session ? (
          <div title="SignIn">
            <User 
              onClick={() => signIn()}
              className="w-10 h-10 sm:hidden p-1 rounded-full border cursor-pointer"
            />
            <CustomButton
            title="Sign In"
            customStyles="hidden sm:flex border"
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
