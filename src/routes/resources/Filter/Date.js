// import React from 'react'
// import { useSelector } from "react-redux";
import styled from "styled-components";
import CheckSign from "../../../assets/icons/check.sign.svg";

const Styled = styled.div`
  padding: 12px;
  background: #ffffff;
  min-width: 200px;
  /* max-height: 230px; */
  overflow: auto;
  box-shadow: 0px 24px 48px -12px rgba(16, 24, 40, 0.18);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  > .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .date {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 16px;
      color: #616161;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      .check {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;
export const Dates = {
  today: {
    title: "Today",
    duration: 2222,
  },
  in7d: {
    title: "Last 7 Days",
  },
  in30d: {
    title: "Last 30 Days",
  },
  in3m: {
    title: "Last 3 months",
  },
  in12m: {
    title: "Last 12 months",
  },
};
export default function Date({ select = "", updateFilter }) {
  // const { input, updateInput, contacts } = useFilteredUsers();
  // const contacts=useSelector(store=>store.contacts);

  // const uid=contacts.ids;
  // const dataMap=contacts.byId;
  const handleClick = (dur) => {
    updateFilter({ date: dur });
  };
  return (
    <Styled>
      <ul className="list">
        <li className="date" onClick={handleClick.bind(null, undefined)}>
          Any Time
          {!select && <CheckSign className="check" />}
        </li>
        {Object.entries(Dates).map(([_key, { title }]) => {
          return (
            <li
              key={title}
              className="date"
              onClick={handleClick.bind(null, _key)}
            >
              {title}
              {select == _key && <CheckSign className="check" />}
            </li>
          );
        })}
      </ul>
    </Styled>
  );
}
