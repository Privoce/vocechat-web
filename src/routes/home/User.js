// import React from 'react';
import styled from "styled-components";
import Avatar from "../../common/component/Avatar";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
const StyledWrapper = styled.div`
  padding: 10px 12px;
  .avatar {
    width: 32px;
    height: 32px;
    img {
      object-fit: cover;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
`;
export default function User({ uid = null }) {
  const { pathname } = useLocation();
  const user = useSelector((store) => store.contacts.byId[uid]);
  if (!user) return null;
  return (
    <StyledWrapper>
      <NavLink to={`/setting?nav=my_account&f=${pathname}`}>
        <div className="avatar">
          <Avatar url={user.avatar} name={user.name} />
        </div>
      </NavLink>
    </StyledWrapper>
  );
}
