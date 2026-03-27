"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSavedProperties(userId?: string) {
  return useQuery({
    queryKey: ["saved", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await fetch("/api/saved");
      if (!res.ok) return new Set<string>();
      const { saved } = await res.json();
      return new Set<string>(saved ?? []);
    },
  });
}

export function useToggleSave(userId?: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      propertyId,
      saved,
    }: {
      propertyId: string;
      saved: boolean;
    }) => {
      const res = await fetch("/api/saved", {
        method: saved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId }),
      });
      if (!res.ok) throw new Error("Failed to toggle save");
    },
    onMutate: async ({ propertyId, saved }) => {
      await qc.cancelQueries({ queryKey: ["saved", userId] });
      const prev = qc.getQueryData<Set<string>>(["saved", userId]);

      qc.setQueryData<Set<string>>(["saved", userId], (old) => {
        const next = new Set(old);
        saved ? next.delete(propertyId) : next.add(propertyId);
        return next;
      });

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      qc.setQueryData(["saved", userId], ctx?.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["saved", userId] });
    },
  });
}
