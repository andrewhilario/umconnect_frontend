import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: async ({ req, token }) => {
        if (token) {
          return true;
        }

        return !!token;
      }
    },
    pages: {
      signIn: "/login",
      signOut: "/login"
    }
  }
);

export const config = {
  matcher: ["/friends", "/profile/:path*", "/messages", "/reels", "/"]
};
