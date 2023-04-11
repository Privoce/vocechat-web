// import Tippy from "@tippyjs/react";
import IconSearch from "../../assets/icons/search.svg";
import { FC, ChangeEvent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchUserMutation } from "../../app/services/user";
import StyledButton from "../../common/component/styled/Button";
type Props = {

};
const SearchUser: FC<Props> = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [searchUser, { data, isSuccess, isLoading }] = useSearchUserMutation();
  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };
  const handleSearch = () => {
    searchUser(input);
  };
  useEffect(() => {
    if (isSuccess && data) {
      console.log(data);
    }
  }, [isSuccess, data]);

  return (
    <div className="hidden md:flex relative min-h-[56px] px-2 py-3 items-center justify-between gap-2 shadow-[rgb(0_0_0_/_10%)_0px_1px_0px] dark:border-b-gray-500">
      <div className="flex items-center gap-1">
        <IconSearch className="dark:fill-gray-400 w-6 h-6 shrink-0" />
        <input value={input} placeholder={`${t("action.search")}...`} className="w-full text-sm bg-transparent dark:text-gray-50" onChange={handleInput} />
      </div>
      <StyledButton className="mini" disabled={isLoading} onClick={handleSearch}>Search</StyledButton>
      {data && <div>{JSON.stringify(data, null, 2)}</div>}
    </div>
  );
};
export default SearchUser;
