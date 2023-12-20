import { authConfig } from "@/types/auth";
import NextAuth from "next-auth/next"

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }