import clsx from "clsx";

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export const Container = <T extends React.ElementType = "section">({
  as,
  className,
  children,
  ...restProps
}: ContainerProps<T>) => {
  const Comp = as || "section";
  const SafeComp = Comp as unknown as React.ComponentType<any>;

  return (
    <SafeComp
      className={clsx("px-4 first:pt-10 md:px-6", className)}
      {...restProps}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        {children}
      </div>
    </SafeComp>
  );
};