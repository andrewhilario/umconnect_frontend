import { API_URL } from "@/constant/api";
import { jwtDecode } from "jwt-decode";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type AuthUser = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  account_type: string;
  isActive: boolean;
  token: string;
};

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 10 * 30
  },
  jwt: {
    maxAge: 60 * 10 * 30
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const response = await fetch(`${API_URL}/api/token/`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });

        const user = await response.json();

        if (response.ok) {
          const decode = jwtDecode(user.access) as User;

          console.log("DECODE", decode);

          return {
            id: decode.id,
            email: decode.email,
            token: user.access,
            first_name: decode.first_name,
            last_name: decode.last_name,
            username: decode.username,
            refresh_token: user.refresh,
            access_token: user.access
          };
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log("JWT CALLBACK", { token, user, trigger, session });
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.token = user.token;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.username = user.username;
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("SESSION CALLBACK", { token, user, session });
      return {
        ...session,
        id: token.id,
        token: token.token,
        email: token.email,
        first_name: token.first_name,
        last_name: token.last_name,
        username: token.username,
        access_token: token,
        user_id: token.id,
        refresh_token: token.refresh_token
      };
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/error"
  }
};
