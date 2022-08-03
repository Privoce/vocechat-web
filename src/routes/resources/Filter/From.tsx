import { FC } from "react";
import styled from "styled-components";
import Search from "../Search";
import CheckSign from "../../../assets/icons/check.sign.svg";
import User from "../../../common/component/User";
import useFilteredUsers from "../../../common/hook/useFilteredUsers";

const Styled = styled.div`
  padding: 0 4px 4px 4px;
  background: #ffffff;
  max-height: 300px;
  overflow: auto;
  box-shadow: 0 24px 48px -12px rgba(16, 24, 40, 0.18);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  > .search {
    z-index: 1;
    background-color: #fff;
    position: sticky;
    top: 0;
    input {
      z-index: 2;
    }
  }
  > .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    .user {
      position: relative;
      cursor: pointer;
      &.none {
        padding: 10px;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #616161;
      }
      .check {
        position: absolute;
        right: 6px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;
type Props = {
  select: number;
  updateFilter: (param: { from?: number }) => void;
};
const From: FC<Props> = ({ select = "", updateFilter }) => {
  const { input, updateInput, users } = useFilteredUsers();
  const handleClick = (uid?: number) => {
    updateFilter({ from: uid });
  };

  return (
    <Styled>
      <div className="search">
        <Search embed={true} value={input} updateSearchValue={updateInput} />
      </div>
      <ul className="list">
        <li className="user none" onClick={handleClick.bind(null, undefined)}>
          Anyone
          {!select && <CheckSign className="check" />}
        </li>
        {users.map(({ uid }) => {
          return (
            <li key={uid} className="user" onClick={handleClick.bind(null, uid)}>
              <User uid={uid} interactive={true} />
              {select == uid && <CheckSign className="check" />}
            </li>
          );
        })}
      </ul>
    </Styled>
  );
};
export default From;
