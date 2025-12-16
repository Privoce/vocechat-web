import { FC, ReactNode } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface Props {
  title?: string;
  description?: string;
  buttons?: ReactNode;
  children?: ReactNode;
  className?: string;
  compact?: boolean;
  footer?: ReactNode;
}

const StyledModal: FC<Props> = ({
  compact = false,
  title = "",
  description = "",
  buttons,
  children,
  className,
  footer,
}) => {
  return (
    <div
      className={clsx(
        "rounded-lg bg-white dark:bg-gray-900 drop-shadow",
        compact ? "p-4 md:min-w-[406px] text-left" : "p-5 md:p-8 md:min-w-[440px] text-center",
        className
      )}
    >
      {title && (
        <h3 className="text-xl text-gray-600 dark:text-white mb-4 font-semibold">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-gray-400 dark:text-gray-100 mb-2">{description}</p>
      )}
      {children}
      {buttons && <div className="pt-4 w-full flex justify-end gap-4 items-center">{buttons}</div>}
      {footer && footer}
    </div>
  );
};

export default StyledModal;
