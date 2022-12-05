import styled from "styled-components";
import Tippy from "@tippyjs/react";
import searchIcon from "../../assets/icons/search.svg?url";
import addIcon from "../../assets/icons/add.svg?url";
import AddEntriesMenu from "../../common/component/AddEntriesMenu";
import Tooltip from "../../common/component/Tooltip";
import { FC, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div`
  position: relative;
  min-height: 56px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  .search {
    display: flex;
    align-items: center;
    gap: 5px;
    .input {
      width: 100%;
      border: none;
      outline: none;
      background: none;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
    }
  }
`;
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
    <StyledWrapper>
      <div className="search">
        <img src={searchIcon} alt="search icon" />
        <input value={input} placeholder={`${t("action.search")}...`} className="input" onChange={handleInput} />
      </div>
      <Tooltip tip={t("more")} placement="bottom">
        <Tippy interactive placement="bottom-end" trigger="click" content={<AddEntriesMenu />}>
          <img src={addIcon} alt="add icon" className="cursor-pointer" />
        </Tippy>
      </Tooltip>
    </StyledWrapper>
  );
};
export default Search;
