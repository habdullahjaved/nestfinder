"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSavedProperties, useToggleSave } from "@/hooks/use-saved";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SaveButtonProps {
  propertyId: string;
  className?: string;
}

export function SaveButton({ propertyId, className }: SaveButtonProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: saved } = useSavedProperties(userId);
  const { mutate: toggle, isPending } = useToggleSave(userId);
  const isSaved = saved?.has(propertyId) ?? false;

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      router.push("/login");
      return;
    }
    toggle({ propertyId, saved: isSaved });
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white",
        className,
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all duration-200",
          isSaved ? "fill-red-500 text-red-500 scale-110" : "text-slate-600",
        )}
      />
    </Button>
  );
}
