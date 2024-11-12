import { withAuth } from "next-auth/middleware";

export default async function middleware(req, event) {
  const authMiddleware = withAuth({
    pages: {
      signIn: `/login`,
    },
    callbacks: {
      async authorized({ token }) {
        if (
          req.nextUrl.pathname == "/dashboard/administrador" &&
          token?.role == "admin salta"
        ) {
          return true;
        } else if (
          req.nextUrl.pathname == "/dashboard/jujuy" &&
          token?.role == "admin jujuy"
        ) {
          return true;
        } else if (
          req.nextUrl.pathname == "/" &&
          (token?.role == "member" ||
            token?.role == "admin salta" ||
            token?.role == "user admin")
        ) {
          return true;
        } else if (
          req.nextUrl.pathname == "/user" &&
          (token?.role == "member" ||
            token?.role == "admin salta" ||
            token?.role == "user admin")
        ) {
          return true;
        } else if (
          req.nextUrl.pathname == "/mailingSystem/agentes" &&
          (token?.role == "member" ||
            token?.role == "admin salta" ||
            token?.role == "user admin")
        ) {
          return true;
        } else if (
          req.nextUrl.pathname == "/mailingSystem/rrhh" &&
          (token?.role == "member" ||
            token?.role == "admin salta" ||
            token?.role == "user admin")
        ) {
          return true;
        } else if (
          req.nextUrl.pathname == "/dashboard/rrhh" &&
          (token?.role == "admin salta" || token?.role == "user admin")
        ) {
          return true;
        } else if (
          (req.nextUrl.pathname == "/inventarioRemax" &&
            token?.role == "user admin") ||
          token?.role == "admin"
        ) {
          return true;
        } else return false;
      },
    },
  });
  return authMiddleware(req, event);
}

export const config = {
  matcher: [
    "/dashboard/administrador",
    "/dashboard/jujuy",
    "/user",
    "/mailingSystem/agentes",
    "/mailingSystem/rrhh",
    "/dashboard/rrhh",
  ],
};
