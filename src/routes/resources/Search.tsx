import clsx from "clsx";
import { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import IconSearch from "../../assets/icons/search.svg";
interface Props {
  value?: string;
  updateSearchValue?: (value: string) => void;
  embed?: boolean;
}

const Search: FC<Props> = ({ value = "", updateSearchValue = null, embed = false }) => {
  const { t } = useTranslation();
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (updateSearchValue) {
      updateSearchValue(evt.target.value);
    }
  };

  return (
    <div className={clsx(`relative w-full py-1.5 px-4 shadow`, embed && "py-2 shadow-none")}>
      <IconSearch className="absolute left-6 top-1/2 -translate-y-1/2" />
      <input value={value} onChange={handleChange} className="bg-black/5 dark:bg-black/20 rounded-full text-sm text-gray-500 py-2.5 pl-9" placeholder={`${t("action.search")}...`} />
    </div>
  );
};

export default Search;
