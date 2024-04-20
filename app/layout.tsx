import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "@/components/tanstack-provider/provider";
import AuthProviders from "@/components/auth-provider/auth-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Toaster } from "@/components/ui/toaster";

const plus_jkt_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UMConnect",
  description: "A social media platform that can Earn you Money"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={plus_jkt_sans.className}>
        <TanstackProvider>
          <AuthProviders session={session}>
            {children}
            <Toaster />
          </AuthProviders>
        </TanstackProvider>
      </body>
    </html>
  );
}
