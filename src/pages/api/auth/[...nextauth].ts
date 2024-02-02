import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

import { signIn, signInWithGoogle } from "@/lib/firebase/service";

/**
 * Configuration options for authentication in NextAuth.
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "syraxes" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();

        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn({ email });

        // If no error and we have user data, return it
        if (user) {
          // Check if password is valid
          const isPasswordValid = await bcrypt.compare(password, user.password);
          return isPasswordValid ? user : null;
        }
        // Return null if user data could not be retrieved or password is invalid
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],

  // pages object for customizing routes
  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      // check if user is signed in using credentials
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
      }
      // check if user is signed in using google
      if (account?.provider === "google") {
        const data = {
          username: user.name,
          email: user.email,
          image: user.image,
          type: "google",
        };

        await signInWithGoogle(data, (res: any) => {
          if (res.status) {
            token.email = res.data.email;
            token.username = res.data.username;
            token.image = res.data.image;
            token.type = res.data.type;
          } else {
            console.error(res.message);
          }
        });
      }
      // return the token
      return token;
    },
    // session is the object that is returned to the client
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("username" in token) {
        session.user.username = token.username;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      // return the session
      return session;
    },
  },
};

export default nextAuth(authOptions);
