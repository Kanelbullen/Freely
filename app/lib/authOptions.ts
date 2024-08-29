import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { sql } from "@vercel/postgres";

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt", // Correctly typed as "jwt"
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: "text" },
                password: { type: "password" },
            },
            async authorize(credentials, req) {
                const response = await sql`
                SELECT * FROM users WHERE email=${credentials?.email} OR username=${credentials?.email}`;
                const user = response.rows[0];

                const passwordCorrect = await compare(
                    credentials?.password || "",
                    user.password
                );

                if (passwordCorrect) {
                    return {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token?.sub && session.user) { // Ensure session.user is defined
                session.user.id = token.sub; // Add the user id to the session
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user?.id) {
                token.sub = user.id; // Store the user id in the JWT token
            }
            return token;
        },
    },
};
