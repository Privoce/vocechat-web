import { memo, useEffect } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { updateRememberedNavs } from "../../app/slices/ui";
import Search from "../../common/component/Search";
import User from "../../common/component/User";
import Profile from "../../common/component/Profile";

import StyledWrapper from "./styled";
import BlankPlaceholder from "../../common/component/BlankPlaceholder";
import { useAppSelector } from "../../app/store";

function UsersPage() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { user_id } = useParams();
  const userIds = useAppSelector((store) => store.users.ids, _.isEqual);
  useEffect(() => {
    dispatch(updateRememberedNavs({ key: "user" }));
    return () => {
      dispatch(updateRememberedNavs({ key: "user", path: pathname }));
    };
  }, [pathname]);

  if (!userIds) return null;
  return (
    <StyledWrapper>
      <div className="left">
        <Search />
        <div className="list">
          <nav className="nav">
            {userIds.map((uid: number) => {
              return (
                <NavLink key={uid} className="session" to={`/users/${uid}`}>
                  <User uid={uid} enableContextMenu={true} />
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
      <div className={`right ${!user_id ? "placeholder" : ""}`}>
        {user_id ? <Profile uid={+user_id} /> : <BlankPlaceholder type="user" />}
      </div>
    </StyledWrapper>
  );
}
export default memo(UsersPage);
