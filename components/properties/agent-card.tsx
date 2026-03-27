import { Phone, Mail, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AgentCardProps {
  agent: {
    name: string;
    email: string;
    phone: string;
    agency: string;
    avatar_url: string | null;
    rating: number;
    listings_count: number;
  };
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-syne text-sm font-bold text-foreground mb-4">
        Listed by
      </h3>

      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={agent.avatar_url ?? ""} />
          <AvatarFallback className="bg-primary text-primary-foreground font-syne font-bold">
            {agent.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-foreground text-sm">{agent.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Building2 className="h-3 w-3 text-muted-foreground/60" />
            <p className="text-xs text-muted-foreground">{agent.agency}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 py-3 border-y border-border">
        <div className="text-center">
          <p className="font-syne font-bold text-base text-foreground">
            {agent.rating}
          </p>
          <p>Rating</p>
        </div>
        <div className="text-center">
          <p className="font-syne font-bold text-base text-foreground">
            {agent.listings_count}
          </p>
          <p>Listings</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          className="w-full bg-accent text-accent-foreground hover:opacity-90"
          size="sm"
          asChild
        >
          <a href={`tel:${agent.phone}`}>
            <Phone className="mr-2 h-3.5 w-3.5" />
            {agent.phone}
          </a>
        </Button>
        <Button
          variant="outline"
          className="w-full border-border"
          size="sm"
          asChild
        >
          <a href={`mailto:${agent.email}`}>
            <Mail className="mr-2 h-3.5 w-3.5" />
            Email agent
          </a>
        </Button>
      </div>
    </div>
  );
}
