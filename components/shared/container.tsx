import { cn } from "@/lib/utils";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[1rem] sm:max-w-[44rem] sm:px-[1.25rem] md:max-w-[56rem] md:px-[1.75rem] lg:max-w-[72rem] lg:px-[2.25rem] xl:max-w-[88rem] xl:px-[2.75rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};
