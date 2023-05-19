import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { triggerScrollHeight } from "./MessageFeed";

type Props = {
  count: number;
  queryKey: string;
};
// linear-gradient(135deg,_#3C8CE7_0%,_#00EAFF_100%)
const NewMessageBottomTip = ({ count, queryKey }: Props) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation("chat");
  useEffect(() => {
    const container = document.querySelector(queryKey) as HTMLElement;
    if (container) {
      const { scrollHeight, scrollTop, offsetHeight } = container;
      const deltaNum = scrollHeight - scrollTop - offsetHeight;
      const showTheTip = deltaNum > triggerScrollHeight && count > 0;
      console.log("show the tip", showTheTip);
      setVisible(showTheTip);
    }
  }, [queryKey, count]);
  const handleMarkRead = () => {
    const container = document.querySelector(queryKey) as HTMLElement;
    if (container) {
      // scroll to bottom
      container.scrollTop = container.scrollHeight;
      setVisible(false);
    }
  };
  return (
    <aside
      className={clsx(
        `sticky top-0
                                justify-between text-xs
                                w-[95%] rounded-b-lg px-3 py-1 text-white z-10 
                                bg-gradient-to-tl from-[#3C8CE7] to-[#00EAFF]`,
        visible ? "flex" : "hidden"
      )}
    >
      <span> {t("new_msg", { num: count })}</span>
      <button onClick={handleMarkRead}>{t("mark_read")}</button>
    </aside>
  );
};

export default NewMessageBottomTip;
