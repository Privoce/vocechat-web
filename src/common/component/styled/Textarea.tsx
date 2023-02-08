import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>
const StyledTextarea = ({ className, ...rest }: Props) => {
  return <textarea className={`rounded text-sm p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 resize-none w-full shadow border border-gray-200 dark:border-gray-400 
  disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:pointer-events-none placeholder:text-gray-400 ${className}`}
    {...rest}></textarea>;
};
export default StyledTextarea;
