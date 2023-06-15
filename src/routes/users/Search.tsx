import { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import Tippy from "@tippyjs/react";
import clsx from "clsx";

import { useAppSelector } from "@/app/store";
import AddEntriesMenu from "@/components/AddEntriesMenu";
import Tooltip from "@/components/Tooltip";
import IconAdd from "@/assets/icons/add.svg";
import IconSearch from "@/assets/icons/search.svg";

type Props = {
  type?: "users" | "members";
  input: string;
  openModal?: () => void;
  updateInput: (input: string) => void;
};
const Search: FC<Props> = ({ input, updateInput, openModal, type = "users" }) => {
  const enableContact = useAppSelector((store) => store.server.contact_verification_enable);
  const { t } = useTranslation();
  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    updateInput(evt.target.value);
  };
  const isMembers = type === "members";
  return (
    <div
      className={clsx(
        "w-full hidden md:flex relative px-2 items-center justify-between gap-2",
        isMembers
          ? "md:w-[512px] min-h-[40px] rounded-full bg-black/10 mb-4 focus-within:bg-transparent focus-within:ring-[1px] focus-within:ring-gray-300"
          : "shadow-[rgb(0_0_0_/_10%)_0px_1px_0px] dark:border-b-gray-500 min-h-[56px]"
      )}
    >
      <div className="flex items-center gap-1">
        <IconSearch className="dark:fill-gray-400 w-6 h-6 shrink-0" />
        <input
          value={input}
          placeholder={`${t("action.search_user")}...`}
          className={clsx(
            "w-full text-sm dark:text-gray-50 outline-none bg-transparent"
            // isMembers ? "rounded-full bg-black/10" : "bg-transparent"
          )}
          onChange={handleInput}
        />
      </div>
      {!isMembers ? (
        enableContact ? (
          <IconAdd onClick={openModal} role="button" className="dark:fill-gray-400" />
        ) : (
          <Tooltip tip={t("more")} placement="bottom">
            <Tippy interactive placement="bottom-end" trigger="click" content={<AddEntriesMenu />}>
              <IconAdd role="button" className="dark:fill-gray-400" />
            </Tippy>
          </Tooltip>
        )
      ) : null}
    </div>
  );
};
export default Search;
