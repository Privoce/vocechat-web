import { DOMAttributes, ReactNode } from "react";

const StyledWrapper = ({ children }: DOMAttributes<HTMLDivElement> & { children?: ReactNode }) => {

  return <div className="flex w-screen h-screen items-center justify-center break-words leading-normal">
    {children}
  </div>;
};

export default StyledWrapper;
