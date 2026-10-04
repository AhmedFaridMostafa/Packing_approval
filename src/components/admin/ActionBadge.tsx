import { Badge } from "@/components/ui/badge";

type Action = "CREATE" | "UPDATE" | "DELETE";

const actionStyles = {
  CREATE:
    "border-emerald-500/20 bg-emerald-500/10 font-semibold text-emerald-600",
  UPDATE: "border-blue-500/20 bg-blue-500/10 font-semibold text-blue-600",
  DELETE:
    "border-destructive/20 bg-destructive/10 font-semibold text-destructive",
} as const;

type ActionBadgeProps = {
  action: Action;
  children: React.ReactNode;
};

export function ActionBadge({ action, children }: ActionBadgeProps) {
  return <Badge className={actionStyles[action]}>{children}</Badge>;
}
