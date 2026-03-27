import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import Image from "next/image";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* ── LOGO ───────────────────── */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            height={90}
            width={90}
            alt="NestFinder Logo"
            className=" w-auto"
          />
        </Link>

        {/* ── CENTER NAV ───────────────── */}
        <div className="hidden items-center gap-1 md:flex">
          <Link href="/properties?listing_type=rent">
            <Button
              variant="ghost"
              size="sm"
              className="font-medium text-muted-foreground hover:text-accent"
            >
              Rent
            </Button>
          </Link>

          <Link href="/properties?listing_type=sale">
            <Button
              variant="ghost"
              size="sm"
              className="font-medium text-muted-foreground hover:text-accent"
            >
              Buy
            </Button>
          </Link>

          <Link href="/properties/new">
            <Button
              variant="ghost"
              size="sm"
              className="font-medium text-muted-foreground hover:text-accent"
            >
              List Property
            </Button>
          </Link>
        </div>

        {/* ── RIGHT SIDE ───────────────── */}
        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              {/* Saved */}
              <Link href="/dashboard/saved">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-accent"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image ?? ""} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {session.user.name?.[0] ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 border border-border bg-popover text-popover-foreground"
                >
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">My Dashboard</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Saved Properties</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <form
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button
                        type="submit"
                        className="w-full text-left text-destructive"
                      >
                        Sign out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:opacity-90 font-medium"
              >
                Sign in
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
