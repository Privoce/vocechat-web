import { memo, useEffect } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateRememberedNavs } from "../../app/slices/ui";
import Search from "./Search";
import User from "../../common/component/User";
import Profile from "../../common/component/Profile";

import StyledWrapper from "./styled";
import BlankPlaceholder from "../../common/component/BlankPlaceholder";
import useFilteredUsers from "../../common/hook/useFilteredUsers";

function UsersPage() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { input, updateInput, users } = useFilteredUsers();
  const { user_id } = useParams();
  // 记住路由
  useEffect(() => {
    dispatch(updateRememberedNavs({ key: "user" }));
    return () => {
      dispatch(updateRememberedNavs({ key: "user", path: pathname }));
    };
  }, [pathname]);

  if (!users) return null;
  return (
    <StyledWrapper>
      <div className="left">
        <Search input={input} updateInput={updateInput} />
        <div className="list">
          <nav className="nav">
            {users.map(({ uid }) => {
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
