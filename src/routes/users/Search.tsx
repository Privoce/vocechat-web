import { FC, ChangeEvent } from "react";
import Tippy from "@tippyjs/react";
import IconSearch from "@/assets/icons/search.svg";
import IconAdd from "@/assets/icons/add.svg";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/store";
import { compareVersion } from "@/utils";
import Tooltip from "@/components/Tooltip";
import AddEntriesMenu from "@/components/AddEntriesMenu";
type Props = {
  input: string,
  openModal: () => void,
  updateInput: (input: string) => void
};
const Search: FC<Props> = ({ input, updateInput, openModal }) => {
  const serverVersion = useAppSelector(store => store.server.version);
  const { t } = useTranslation();
  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    updateInput(evt.target.value);
  };
  const enableContact = compareVersion(serverVersion, "0.3.7") >= 0;
  return (

    <div className="hidden md:flex relative min-h-[56px] px-2 py-3 items-center justify-between gap-2 shadow-[rgb(0_0_0_/_10%)_0px_1px_0px] dark:border-b-gray-500">
      <div className="flex items-center gap-1">
        <IconSearch className="dark:fill-gray-400 w-6 h-6 shrink-0" />
        <input value={input} placeholder={`${t("action.search")}...`} className="w-full text-sm bg-transparent dark:text-gray-50 outline-none" onChange={handleInput} />
      </div>
      {enableContact ? <IconAdd onClick={openModal} role="button" className="dark:fill-gray-400" /> : <Tooltip tip={t("more")} placement="bottom">
        <Tippy interactive placement="bottom-end" trigger="click" content={<AddEntriesMenu />}>
          <IconAdd role="button" className="dark:fill-gray-400" />
        </Tippy>
      </Tooltip>}
    </div>
  );
};
export default Search;
