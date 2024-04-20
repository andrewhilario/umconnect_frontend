"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
interface Props {
  children: ReactNode;
  session: any;
}

const AuthProviders = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProviders;
