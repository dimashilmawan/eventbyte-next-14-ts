import { cn } from "@/lib/utils";

export const FormItemContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex-center w-full rounded-md border border-input px-3 has-[:autofill]:bg-[rgb(232,240,254)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
        className,
      )}
    >
      {children}
    </div>
  );
};
