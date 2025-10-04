import { cn } from "@workspace/ui/lib/utils";

type ResumeLayoutProps = React.ComponentProps<"main">;
export const ResumeLayout = ({
  children,
  className,
  ...rest
}: ResumeLayoutProps) => {
  return (
    <main
      className={cn([
        "py-[10vh] px-4 text-zinc-800 dark:text-zinc-200",
        className,
      ])}
      {...rest}
    >
      {children}
    </main>
  );
};
