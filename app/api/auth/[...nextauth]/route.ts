// import NextAuth, { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcryptjs";
// import { sql } from "@vercel/postgres";

// const authOptions = {
//     session: {
//         strategy: "jwt",
//     },
//     pages: {
//         signIn: "/login"
//     },
//     providers: [
//         CredentialsProvider({
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials, req) {
//                 const response = await sql`
//                 SELECT * FROM users WHERE email=${credentials?.email}`
//                 const user = response.rows[0];

//                 if (!user) {
//                     throw new Error('No user found with this email');
//                 }

//                 const passwordCorrect = await compare(
//                     credentials?.password || "",
//                     user.password
//                 );

//                 if (passwordCorrect) {
//                     return {
//                         id: user.id,
//                         email: user.email,
//                         username: user.username,
//                     };
//                 } else {
//                     throw new Error('Incorrect password');
//                 }
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//                 token.email = user.email;
//                 token.username = user.username;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             if (token) {
//                 session.user.id = token.id;
//                 session.user.email = token.email;
//                 session.user.username = token.username;
//             }
//             return session;
//         },
//         async redirect({ url, baseUrl }) {
//             return baseUrl + '/profile';
//         }
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// };

// export const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { authOptions } from "../../../lib/authOptions"; // Adjust the path as necessary

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

