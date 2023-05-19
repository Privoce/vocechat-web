import React from "react";

type Props = {
  title: string;
  desc: string;
  children: React.ReactNode;
};

const SettingBlock = ({ title, desc, children }: Props) => {
  return (
    <div className="text-sm">
      <p className="text-gray-600 dark:text-gray-100 font-semibold">{title}</p>
      <p className="flex justify-between w-full text-gray-400 mb-2 text-xs">{desc}</p>
      {children}
    </div>
  );
};

export default SettingBlock;
