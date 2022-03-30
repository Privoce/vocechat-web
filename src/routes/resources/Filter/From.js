// import React from 'react'
import { useSelector } from "react-redux";
import styled from "styled-components";
import Search from "../Search";
import CheckSign from "../../../assets/icons/check.sign.svg";

import Contact from "../../../common/component/Contact";
import useFilteredUsers from "../../../common/hook/useFilteredUsers";
const Styled = styled.div`
  padding: 0 4px 4px 4px;
  background: #ffffff;
  max-height: 230px;
  overflow: auto;
  box-shadow: 0px 24px 48px -12px rgba(16, 24, 40, 0.18);
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
    .contact {
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
export default function From({ select = "", updateFilter }) {
  const { input, updateInput, contacts } = useFilteredUsers();
  // const contacts=useSelector(store=>store.contacts);

  // const uid=contacts.ids;
  // const dataMap=contacts.byId;
  const handleClick = (uid) => {
    updateFilter({ from: uid });
  };
  return (
    <Styled>
      <div className="search">
        <Search embed={true} value={input} updateSearchValue={updateInput} />
      </div>
      <ul className="list">
        <li
          className="contact none"
          onClick={handleClick.bind(null, undefined)}
        >
          Anyone
          {!select && <CheckSign className="check" />}
        </li>
        {contacts.map(({ uid }) => {
          return (
            <li
              key={uid}
              className="contact"
              onClick={handleClick.bind(null, uid)}
            >
              <Contact uid={uid} interactive={true} />
              {select == uid && <CheckSign className="check" />}
            </li>
          );
        })}
      </ul>
    </Styled>
  );
}
