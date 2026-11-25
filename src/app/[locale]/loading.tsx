import { Spinner } from "@/components/ui/spinner";

export default function loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner className="text-primary size-8" />
    </div>
  );
}
