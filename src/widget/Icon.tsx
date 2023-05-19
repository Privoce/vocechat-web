// import React from "react";
import { useAppSelector } from "../app/store";

type Props = {
  handleClick: () => void;
};

const Icon = ({ handleClick }: Props) => {
  const { logo } = useAppSelector((store) => store.server);
  if (!logo) return null;
  return (
    <button className="rounded-full overflow-hidden" onClick={handleClick}>
      <img src={logo} alt="logo" className="w-full h-full rounded-full" />
    </button>
  );
};

export default Icon;
