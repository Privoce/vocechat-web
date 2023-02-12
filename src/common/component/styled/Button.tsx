import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }
const StyledButton = ({ children, className = '', ...rest }: Props) => {
  const isGhost = className.includes('ghost');
  const noBorder = className.includes('border_less');
  const isCancel = className.includes('cancel');
  const isDanger = className.includes('danger');
  const isSmall = className.includes('small');
  const isMini = className.includes('mini');
  const isFull = className.includes('flex');
  return <button className={clsx(`text-sm text-white bg-primary-400 break-keep shadow rounded-lg px-3.5 py-2.5 hover:bg-primary-500 active:bg-primary-500 disabled:bg-gray-300`,
    isFull && "w-full",
    isGhost && "!text-gray-600 dark:!text-gray-100  !border !border-solid !border-[#d0d5dd] !bg-transparent",
    isCancel && "!bg-transparent !text-black dark:!text-gray-50 !border !border-solid !border-gray-200",
    isSmall && "!py-2",
    noBorder && "!shadow-none !border-none",
    isMini && "!px-2.5 !py-1 !text-xs",
    isDanger && "!bg-red-500 disabled:!bg-gray-300 hover:!bg-red-500/80 active:bg-red-700",
    className
  )} {...rest}>
    {children}
  </button>;
};
export default StyledButton;
