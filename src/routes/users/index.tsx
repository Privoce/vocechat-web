import { useEffect } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateRememberedNavs } from "../../app/slices/ui";
import Search from "../../common/component/Search";
import User from "../../common/component/User";
import Profile from "../../common/component/Profile";

import StyledWrapper from "./styled";
import BlankPlaceholder from "../../common/component/BlankPlaceholder";
import { useAppSelector } from "../../app/store";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { user_id } = useParams();
  const userIds = useAppSelector((store) => store.users.ids);
  useEffect(() => {
    dispatch(updateRememberedNavs({ key: "user" }));
    return () => {
      dispatch(updateRememberedNavs({ key: "user", path: pathname }));
    };
  }, [pathname]);

  console.log({ userIds, user_id });
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
      {user_id ? (
        <div className="right">
          <Profile uid={+user_id} />
        </div>
      ) : (
        <div className="right placeholder">
          <BlankPlaceholder type="user" />
        </div>
      )}
    </StyledWrapper>
  );
}
