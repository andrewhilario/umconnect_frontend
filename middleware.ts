export { default } from "next-auth/middleware";

export const config = { matcher: ["/"] };

// import { withAuth } from "next-auth/middleware";
// import { authOptions } from "./utils/authOptions";

// export default withAuth(
//   function middleware(req) {
//     console.log(req.nextauth.token);
//   },
//   {
//     jwt: { decode: authOptions.jwt?.decode },
//     callbacks: {
//       authorized: ({ token }) => !!token
//     },
//     pages: {
//       signIn: "/login",
//       signOut: "/login",
//       error: "/"
//     }
//   }
// );

// export const config = {
//   matcher: ["/"]
// };
