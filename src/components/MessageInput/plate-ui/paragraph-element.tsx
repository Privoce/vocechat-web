import { PlateElement, PlateElementProps } from "@udecode/plate-common";

import { cn } from "@/utils";

const ParagraphElement = ({ className, children, ref, ...props }: PlateElementProps) => {
  return (
    <PlateElement ref={ref} className={cn("m-0 px-0 py-1", className)} {...props}>
      {children}
    </PlateElement>
  );
};
ParagraphElement.displayName = "ParagraphElement";

export { ParagraphElement };
