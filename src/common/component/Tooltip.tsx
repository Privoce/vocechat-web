import { FC } from "react";
import Tippy, { TippyProps } from "@tippyjs/react";
import clsx from "clsx";


const Triangle: FC<Pick<TippyProps, "placement">> = ({ placement }) => {
  if (placement == "left") return null;
  const cls = clsx("w-3 h-3 bg-inherit absolute rounded-[1px] origin-center rotate-45",
    placement == "right" && "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
    placement == "top" && "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
    placement == "bottom" && "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",

  );
  return <i className={cls}></i>;
};

type Props = {
  tip: string;
} & TippyProps;

const Tooltip: FC<Props> = ({ tip = "", placement = "right", delay = null, children, ...rest }) => {
  const defaultDuration: [number, number] = [300, 250];

  return (
    <Tippy
      offset={[0, 18]}
      duration={delay ? defaultDuration : 0}
      delay={delay ?? [150, 0]}
      placement={placement}
      content={<div className="relative bg-white px-3 py-2 text-xs rounded-lg drop-shadow text-gray-700">
        <Triangle placement={placement} />
        {tip}
      </div>}
      {...rest}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;
