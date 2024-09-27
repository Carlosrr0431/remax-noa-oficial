import { SendEmail } from "@/app/(components)/SendEmail";
import { supabaseClient } from "@/supabase/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,

      // authorization solo es para modo de desarrollo
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },

      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("user: " + user.email);

      const result = await supabaseClient
        .from("usuarios")
        .select("email")
        .match({ email: user?.email });

      const data = result.data;

      console.log("data: " + data);

      if (data?.length == 0) {
        const result2 = await supabaseClient.from("usuarios").insert({
          nombre: user.name,
          email: user.email,
          imagenUrl: user.image,
          role: "member",
        });


        await SendEmail();
      }

      return true;
    },

    async jwt({ token, user }) {
      let { data: usuarios, error } = await supabaseClient
        .from("usuarios")
        .select("*")
        .order("id", { ascending: true });

      console.log("USUARIO EMAIL: " + user?.email);

      if (user?.email != undefined) {
        if (
          usuarios
            .filter((e) => e.role == "admin")
            .find((e) => e.email == user?.email)
        )
          token.role = "admin";
        else if (
          usuarios
            .filter((e) => e.role == "user admin")
            .find((e) => e.email == user?.email)
        )
          token.role = "user admin";
        else token.role = "member";
      }

      console.log("TOKEN: " + token.role);

      return token;
    },
  },
});

export { handler as GET, handler as POST };
