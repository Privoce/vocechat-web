import clsx from "clsx";
import { FC, ReactNode } from "react";

interface Props {
  title?: string;
  description?: string;
  buttons?: ReactNode;
  children?: ReactNode;
  className?: string;
  compact?: boolean
}

const StyledModal: FC<Props> = ({ compact = false, title = "", description = "", buttons, children, className }) => {
  return (
    <div className={clsx("rounded-lg bg-white drop-shadow", compact ? "p-4 min-w-[406px] text-left" : "p-8 min-w-[440px] text-center", className)} >
      {title && <h3 className="text-xl text-gray-600 mb-4 font-semibold">{title}</h3>}
      {description && <p className="text-sm text-gray-400 mb-2">{description}</p>}
      {children}
      {buttons && <div className="pt-4 w-full flex justify-end gap-4 items-center">{buttons}</div>}
    </div>
  );
};

export default StyledModal;
