import React from "react";

type Props = {
  title: string;
  desc: string;
  toggler?: React.ReactNode;
  children?: React.ReactNode;
};

const SettingBlock = ({ toggler, title, desc, children }: Props) => {
  return (
    <div className="text-sm w-full">
      <div className="flex justify-between mb-2">
        <div className="">
          <p className="text-gray-600 dark:text-gray-100 font-semibold">{title}</p>
          <p className="flex justify-between w-full text-gray-400 text-xs">{desc}</p>
        </div>
        {toggler && <div>{toggler}</div>}
      </div>
      {children}
    </div>
  );
};

export default SettingBlock;
