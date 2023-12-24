import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";


export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
          clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string
        }),
        GitHubProvider({
          clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
          clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string
        })
      ],
}