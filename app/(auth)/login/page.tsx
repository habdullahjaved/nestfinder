import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border border-sand-200 bg-white p-8 shadow-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
            <Home className="h-5 w-5 text-white" />
          </div>
          <div className="text-center">
            <h1 className="font-syne text-2xl font-extrabold text-slate-900">
              NestFinder
            </h1>
            <p className="mt-1 text-sm text-sand-500">
              Sign in to save and manage listings
            </p>
          </div>
        </div>

        {/* Google sign in */}
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <Button
            type="submit"
            className="w-full gap-3 border border-sand-200 bg-white text-slate-900 shadow-sm hover:bg-sand-50"
            variant="outline"
            size="lg"
          >
            <GoogleIcon />
            Continue with Google
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-sand-500">
          By signing in you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-2">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}
