import { LabelHTMLAttributes, ReactNode } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement> & { children?: ReactNode };
const StyledLabel = ({ children, className = "", ...rest }: Props) => {
  return (
    <label
      className={`text-gray-800 dark:text-gray-100 text-sm font-semibold ${className}`}
      {...rest}
    >
      {children}
    </label>
  );
};
export default StyledLabel;
