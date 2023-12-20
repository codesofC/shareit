"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

const UserInfo = () => {
  const { data: session } = useSession();

  return session && session?.user?.image ? (
    <div className="flex-center flex-col gap-2 py-4 border-b mb-5">
      <Image
        src={session?.user?.image}
        alt="Profil"
        width={75}
        height={75}
        className="object-cover rounded-full"
      />
      <p className="text-2xl sm:text-3xl font-extrabold text-green-600"> {session?.user?.name} </p>
      <p className="text-sm font-extralight text-gray-400"> {session?.user?.email} </p>
    </div>
  ) : null;
};

export default UserInfo;
