import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>
const StyledTextarea = ({ className, ...rest }: Props) => {
  return <textarea className={`rounded text-sm p-2 bg-white text-gray-700 resize-none w-full shadow border border-solid disabled:bg-[#f9fafb] disabled:text-gray-400 disabled:pointer-events-none placeholder:text-gray-400 ${className}`} {...rest}></textarea>;
};
export default StyledTextarea;
