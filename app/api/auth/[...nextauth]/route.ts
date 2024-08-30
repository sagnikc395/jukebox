// import { NextResponse } from "next/server";

// export function GET() {
//   return NextResponse.json({
//     message: " hi there!",
//   });
// }
// //same with can add a post handler here

import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  //i want to login with google
  //check providers in nextauth
  //google oauth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async signIn(params) {
      console.log(params);
      try {
        await prismaClient.user.create({
          data: {
            email: "",
            provider: "Google",
          },
        });
      } catch (err) {}
      return true;
    },
  },
});

//export handler as both get and post.
export { handler as GET, handler as POST };
