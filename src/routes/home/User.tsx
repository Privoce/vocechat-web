import { FC } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import Avatar from "../../common/component/Avatar";
import { useAppSelector } from "../../app/store";

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

interface Props {
  uid: number;
}

const User: FC<Props> = ({ uid }) => {
  const { pathname } = useLocation();
  const user = useAppSelector((store) => store.users.byId[uid]);
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
};

export default User;
