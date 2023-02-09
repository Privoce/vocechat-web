import Tippy from "@tippyjs/react";
import searchIcon from "../../assets/icons/search.svg?url";
import addIcon from "../../assets/icons/add.svg?url";
import AddEntriesMenu from "../../common/component/AddEntriesMenu";
import Tooltip from "../../common/component/Tooltip";
import { FC, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
type Props = {
  input: string,
  updateInput: (input: string) => void
};
const Search: FC<Props> = ({ input, updateInput }) => {
  const { t } = useTranslation();
  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    updateInput(evt.target.value);
  };
  return (
    <div className="relative min-h-[56px] px-2 py-3 flex items-center justify-between gap-2 shadow-[rgb(0_0_0_/_10%)_0px_1px_0px] dark:border-b-gray-500">
      <div className="flex items-center gap-1">
        <img src={searchIcon} alt="search icon" />
        <input value={input} placeholder={`${t("action.search")}...`} className="w-full text-sm bg-transparent dark:text-gray-50" onChange={handleInput} />
      </div>
      <Tooltip tip={t("more")} placement="bottom">
        <Tippy interactive placement="bottom-end" trigger="click" content={<AddEntriesMenu />}>
          <img src={addIcon} alt="add icon" className="cursor-pointer" />
        </Tippy>
      </Tooltip>
    </div>
  );
};
export default Search;
