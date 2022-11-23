import { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import iconSearch from "../../assets/icons/search.svg?url";

const Styled = styled.div`
  width: 100%;
  padding: 6px 16px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  &.embed {
    padding: 6px 8px;
    box-shadow: none;
  }
  .search {
    outline: none;
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 25px;
    padding: 10px 8px 10px 36px;
    color: #a1a1aa;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    background-image: url(${iconSearch});
    background-repeat: no-repeat;
    background-position: 8px center;
  }
`;

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
    <Styled className={embed ? "embed" : ""}>
      <input value={value} onChange={handleChange} className="search" placeholder={`${t("action.search")}...`} />
    </Styled>
  );
};

export default Search;
