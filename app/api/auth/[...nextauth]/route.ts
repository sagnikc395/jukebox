// import { NextResponse } from "next/server";

// export function GET() {
//   return NextResponse.json({
//     message: " hi there!",
//   });
// }
// //same with can add a post handler here

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
});

//export handler as both get and post.
export { handler as GET, handler as POST };
