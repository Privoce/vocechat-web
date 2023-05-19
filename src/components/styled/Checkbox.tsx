import { InputHTMLAttributes } from "react";

export default function StyledCheckbox(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className: cbClasses } = props;
  return (
    <input
      readOnly
      {...props}
      type="checkbox"
      className={`checkbox w-5 h-5 rounded-md border border-solid border-slate-300 checked:border-primary-400 disabled:opacity-40 ${cbClasses}`}
    />
  );
}
