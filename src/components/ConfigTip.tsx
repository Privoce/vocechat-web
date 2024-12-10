import React, { ReactNode } from "react";

type TipProps = { title: ReactNode; desc: ReactNode };
export const ConfigTip = ({ title, desc }: TipProps) => {
  return (
    <div className="flex flex-col text-sm">
      <h2 className="font-semibold dark:text-white">{title}</h2>
      <p className="text-gray-400 text-xs">{desc}</p>
    </div>
  );
};
