import clsx from "clsx";
import { useState, FC, DetailedHTMLProps, InputHTMLAttributes } from "react";
import IconEyeOpen from "../../../assets/icons/eye.open.svg";
import IconEyeClose from "../../../assets/icons/eye.close.svg";
interface Props
  extends DetailedHTMLProps<
    Pick<
      InputHTMLAttributes<HTMLInputElement>,
      | "placeholder"
      | "className"
      | "type"
      | "autoFocus"
      | "id"
      | "value"
      | "name"
      | "required"
      | "readOnly"
      | "onChange"
      | "onBlur"
      | "pattern"
      | "disabled"
      | "minLength"
    >,
    HTMLInputElement
  > {
  prefix?: string;
  ref?: any;
}

const Input: FC<Props> = ({ type = "text", prefix = "", className = "", ...rest }) => {
  const [inputType, setInputType] = useState(type);
  const togglePasswordVisible = () => {
    setInputType((prev) => (prev == "password" ? "text" : "password"));
  };

  const isLarge = className.includes("large");
  const isNone = className.includes("none");
  // const noInner=!className.includes("inner");
  const isPwd = type == "password";
  const inputClass = clsx(`w-full bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 p-2 outline-none 
  disabled:text-gray-500 disabled:bg-gray-100 
  dark:disabled:text-gray-500 
  dark:disabled:bg-gray-800/50
  dark:disabled:border-gray-600 
  placeholder:text-gray-400`,
    // noInner && 'rounded border border-solid border-gray-200 shadow',
    isLarge && 'py-3',
    isNone && "border-none bg-transparent shadow-none",
    isPwd && "pr-[30px]"
  );
  return type == "password" ? (
    <div className={`w-full relative flex overflow-hidden rounded border border-solid border-gray-300 dark:border-gray-400 shadow-sm ${className}`}>
      <input type={inputType} autoComplete={inputType == "password" ? "current-password" : "on"} className={`${inputClass} ${className}`} {...rest} />
      <div className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisible}>
        {inputType == "password" ? <IconEyeClose className="fill-gray-500" /> : <IconEyeOpen className="fill-gray-500" />}
      </div>
    </div>
  ) : prefix ? (
    <div className={`w-full relative flex overflow-hidden rounded border border-solid border-gray-300 dark:border-gray-400 shadow-sm ${className}`}>
      <span className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 shadow-[rgb(0_0_0_/_10%)_-1px_0px_0px_inset]">{prefix}</span>
      <input className={`${inputClass} ${className}`} type={inputType} {...rest} />
    </div>
  ) : (
    <input type={inputType} className={`${inputClass} rounded border border-solid border-gray-200 dark:border-gray-400 shadow-sm ${className}`} {...rest} />
  );
};

export default Input;
