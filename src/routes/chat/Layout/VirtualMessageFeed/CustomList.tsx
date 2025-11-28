import { forwardRef } from "react";
import { ListProps } from "react-virtuoso";

const CustomList = forwardRef<HTMLDivElement, ListProps>(({ style, children, ...props }, ref) => {
  return (
    <div ref={ref} style={{ ...style, width: `calc(100% - 2rem)` }} {...props}>
      {children}
    </div>
  );
});

CustomList.displayName = "CustomList";

export default CustomList;
