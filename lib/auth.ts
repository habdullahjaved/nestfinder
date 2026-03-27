import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

function getSupabaseAdmin() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      if (!user.email || !user.id) return true;

      const supabase = getSupabaseAdmin();
      const { error } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          email: user.email,
          full_name: user.name ?? null,
          avatar_url: user.image ?? null,
        },
        { onConflict: "id" },
      );

      if (error) console.error("[auth] upsert error:", error.message);
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) token.sub = user.id;

      return token;
    },
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
