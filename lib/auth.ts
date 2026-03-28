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

      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", user.email)
        .single();

      if (existing) {
        await supabase
          .from("profiles")
          .update({
            full_name: user.name ?? null,
            avatar_url: user.image ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq("email", user.email);
      } else {
        await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
          full_name: user.name ?? null,
          avatar_url: user.image ?? null,
          role: "user",
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.email) {
        const supabase = getSupabaseAdmin();
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", user.email)
          .single();

        if (profile?.id) token.sub = profile.id;
      }
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
