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
          token?.role == "admin"
        ) {
          return true;
        } else if (
          req.nextUrl.pathname == "/dashboard/user" &&
          (token?.role == "admin" || token?.role == "user admin")
        ) {
          return true;
        } else if (
          req.nextUrl.pathname == "/" &&
          (token?.role == "member" ||
            token?.role == "admin" ||
            token?.role == "user admin")
        ) {
          return true;
        } else if (
          req.nextUrl.pathname == "/user" &&
          (token?.role == "member" ||
            token?.role == "admin" ||
            token?.role == "user admin")
        ) {
          return true;
<<<<<<< HEAD
=======
        } else if (
          req.nextUrl.pathname == "/mailingSystem/agentes" &&
          (token?.role == "member" ||
            token?.role == "admin" ||
            token?.role == "user admin")
        ) {
          return true;
        } else if (
          req.nextUrl.pathname == "/mailingSystem/rrhh" &&
          (token?.role == "member" ||
            token?.role == "admin" ||
            token?.role == "user admin")
        ) {
          return true;
>>>>>>> 5580855 (Mensaje)
        } else return false;
      },
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}

export const config = {
<<<<<<< HEAD
  matcher: ["/dashboard/administrador", "/dashboard/user", "/user"],
=======
  matcher: [
    "/dashboard/administrador",
    "/dashboard/user",
    "/user",
    "/mailingSystem/agentes",
    "/mailingSystem/rrhh",
  ],
>>>>>>> 5580855 (Mensaje)
};
