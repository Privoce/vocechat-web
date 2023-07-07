// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/store";
import ChannelIcon from "@/components/ChannelIcon";
import GoBackNav from "@/components/GoBackNav";
import Layout from "../Layout";

type Props = {
  cid?: number;
};
export default function GuestChannelChat({ cid = 0 }: Props) {
  // const { t } = useTranslation("chat");
  const { data } = useAppSelector((store) => {
    return {
      data: store.channels.byId[cid]
    };
  });
  if (!data) return null;
  const { name, description, is_public } = data;
  return (
    <Layout
      readonly
      to={cid}
      context="channel"
      header={
        <header className="px-5 py-4 flex items-center justify-center md:justify-between shadow-[inset_0_-1px_0_rgb(0_0_0_/_10%)]">
          <GoBackNav />
          <div className="flex items-center gap-1">
            <ChannelIcon personal={!is_public} />
            <span className="text-gray-800 dark:text-white whitespace-nowrap">{name}</span>
            <span className="ml-2 text-gray-500 hidden md:block ">{description}</span>
          </div>
        </header>
      }
    />
  );
}
