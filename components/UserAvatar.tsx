"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserAvatarProps } from "@/types/index";
import { useRouter } from "next/navigation";

const UserAvatar = ( { displaySubmenu, setDisplaySubmenu }: UserAvatarProps) => {
  
    const { data: session } = useSession();

    const router = useRouter()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Image
          src={`${session?.user?.image}`}
          width={50}
          height={50}
          alt="profil"
          className="object-contain cursor-pointer rounded-full"
          onClick={() => setDisplaySubmenu(true)}
        />
      </PopoverTrigger>

      {displaySubmenu ? (
        <PopoverContent className="px-0 w-48">
          <ul className="mt-1 flex flex-col">
            <li
              className="flex-center px-2 py-3 cursor-pointer hover:bg-green-600 hover:text-white"
              onClick={() => {
                setDisplaySubmenu(false);
                router.push("/myprojects");
              }}
            >
              My projects
            </li>
            <li
              className="flex-center px-2 py-3 cursor-pointer hover:bg-green-600 hover:text-white"
              onClick={() => {
                setDisplaySubmenu(false);
                router.push("/")
                signOut();
              }}
            >
              Logout
            </li>
          </ul>
        </PopoverContent>
      ) : null}
    </Popover>
  );
};

export default UserAvatar;
