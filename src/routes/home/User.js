// import React from 'react';
import styled from "styled-components";
import Avatar from "../../common/component/Avatar";
import { useSelector } from "react-redux";
const StyledWrapper = styled.div`
  padding: 10px 12px;
  .avatar {
    width: 32px;
    height: 32px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
`;
export default function ServerDropList({ uid = null }) {
  const user = useSelector((store) => store.contacts.byId[uid]);
  if (!user) return null;
  return (
    <StyledWrapper>
      <div className="avatar">
        <Avatar url={user.avatar} name={user.name} />
      </div>
    </StyledWrapper>
  );
}
