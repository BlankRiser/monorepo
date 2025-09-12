import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className={cn(["text-2xl font-bold"])}>Hello World</h1>
        <Button size="sm" variant="ghost">
          Button
        </Button>
        <Badge variant={"secondary"}>nice</Badge>
      </div>
    </div>
  );
}
