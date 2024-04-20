import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

import { authOptions } from "@/utils/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
