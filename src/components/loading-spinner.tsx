import { cn } from "~/lib/utils";

interface LoadingSpinnerProps {
  color?: "primary" | "secondary";
  className?: string;
}

export function LoadingSpinner({
  color = "primary",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-[12px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] h-24 w-24",
        {
          "text-primary": color === "primary",
          "text-secondary": color === "secondary",
        },
        className,
      )}
      role="status"
    />
  );
}
