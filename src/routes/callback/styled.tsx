import { DOMAttributes, ReactNode } from "react";

const StyledWrapper = ({ children }: DOMAttributes<HTMLDivElement> & { children?: ReactNode }) => {

  return <div className="flex-center w-screen h-screen break-words leading-normal">
    {children}
  </div>;
};

export default StyledWrapper;
