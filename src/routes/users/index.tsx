import { memo, useEffect } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateRememberedNavs } from "../../app/slices/ui";
import Search from "./Search";
import User from "../../common/component/User";
import Profile from "../../common/component/Profile";

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
    <div className="flex h-full pt-2 pr-12 pb-2.5">
      <div className="rounded-l-2xl bg-white dark:bg-[#1F2A37] relative flex flex-col min-w-[268px] shadow-[inset_-1px_0px_0px_rgba(0,_0,_0,_0.1)]">
        <Search input={input} updateInput={updateInput} />
        <div className="px-2 py-3 overflow-scroll pb-[50px]">
          <nav className="flex flex-col gap-1">
            {users.map(({ uid }) => {
              return (
                <NavLink key={uid} className={({ isActive }) => `rounded-md hover:bg-gray-500/10 ${isActive ? "bg-gray-500/10" : ""}`} to={`/users/${uid}`}>
                  <User uid={uid} enableContextMenu={true} />
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
      <div className={`rounded-r-2xl bg-white w-full flex justify-center items-start ${!user_id ? "h-full items-center" : ""} dark:bg-[#384250]`}>
        {user_id ? <Profile uid={+user_id} /> : <BlankPlaceholder type="user" />}
      </div>
    </div>
  );
}
export default memo(UsersPage);
