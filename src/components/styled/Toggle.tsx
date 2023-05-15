import clsx from "clsx";
import { HTMLAttributes } from "react";
const StyledToggle = (props: Pick<HTMLAttributes<HTMLDivElement>, "onClick"> & { checked?: boolean, disabled?: boolean }) => {
  const { checked = true, disabled = false } = props;
  return <div
    {...props}
    className={clsx(`cursor-pointer relative w-11 h-6  rounded-xl`, checked ? 'bg-primary-400' : 'bg-gray-300', disabled && "cursor-not-allowed bg-gray-400 pointer-events-none")}
  >
    <div className={clsx("rounded-full bg-white w-5 h-5 absolute top-0.5 right-0.5 transition-all", !checked && "-translate-x-full")}></div>
  </div>;
};
export default StyledToggle;
