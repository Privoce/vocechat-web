import { memo, useEffect } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateRememberedNavs } from "../../app/slices/ui";
import Search from "./Search";
import User from "../../common/component/User";
import Profile from "../../common/component/Profile";

import BlankPlaceholder from "../../common/component/BlankPlaceholder";
import useFilteredUsers from "../../common/hook/useFilteredUsers";
import clsx from "clsx";

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
  const isUserDetail = !!user_id;
  return (
    <div className={clsx("flex h-full md:pt-2 md:pb-2.5 md:pr-12")}>
      <div className={clsx("md:rounded-l-2xl bg-white dark:bg-gray-800 relative flex flex-col w-full md:w-auto md:min-w-[268px] shadow-[inset_-1px_0px_0px_rgba(0,_0,_0,_0.1)]",
        isUserDetail && "hidden"
      )}>
        <Search input={input} updateInput={updateInput} />
        <div className="px-2 pt-3 pb-20 md:py-3 overflow-scroll">
          <nav className="flex flex-col md:gap-1">
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
      <div className={clsx(`md:rounded-r-2xl bg-white w-full flex justify-center items-start dark:bg-gray-700`,
        !user_id && "h-full items-center",
        !isUserDetail && "hidden md:flex"
      )}>
        {isUserDetail ? <Profile uid={+user_id} /> : <BlankPlaceholder type="user" />}
      </div>
    </div>
  );
}
export default memo(UsersPage);
