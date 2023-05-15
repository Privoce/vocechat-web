import { LabelHTMLAttributes, ReactNode } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement> & { children?: ReactNode }
const StyledLabel = ({ children, className = '', ...rest }: Props) => {
  return <label className={`text-gray-500 text-sm ${className}`} {...rest}>
    {children}
  </label>;
};
export default StyledLabel;
