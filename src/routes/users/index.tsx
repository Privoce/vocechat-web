import { memo, useEffect, useRef, useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ViewportList } from 'react-viewport-list';

import { updateRememberedNavs } from "../../app/slices/ui";
import Search from "./Search";
import User from "../../common/component/User";
import Profile from "../../common/component/Profile";

import BlankPlaceholder from "../../common/component/BlankPlaceholder";
import useFilteredUsers from "../../common/hook/useFilteredUsers";
import clsx from "clsx";
import GoBackNav from "../../common/component/GoBackNav";
import SearchUser from "./SearchUser";

function UsersPage() {
  const ref = useRef<HTMLDivElement | null>(
    null,
  );
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [modalVisible, setModalVisible] = useState(false);
  const { input, updateInput, users } = useFilteredUsers();
  const { user_id } = useParams();
  // 记住路由
  useEffect(() => {
    dispatch(updateRememberedNavs({ key: "user" }));
    return () => {
      dispatch(updateRememberedNavs({ key: "user", path: pathname }));
    };
  }, [pathname]);
  const toggleModal = () => {
    setModalVisible(prev => !prev);
  };
  if (!users) return null;
  const isUserDetail = !!user_id;
  return (
    <div className={clsx("flex h-screen md:h-full md:pt-2 md:pb-2.5 md:pr-12")}>
      <div className={clsx("md:rounded-l-2xl bg-white dark:bg-gray-800 relative flex flex-col w-full md:w-auto md:min-w-[268px] shadow-[inset_-1px_0px_0px_rgba(0,_0,_0,_0.1)]",
        isUserDetail && "hidden md:flex"
      )}>
        <Search input={input} updateInput={updateInput} openModal={toggleModal} />
        {modalVisible && <SearchUser closeModal={toggleModal} />}
        <div className="flex flex-col md:gap-1 px-2 pt-3 pb-20 md:py-3 overflow-scroll" ref={ref}>
          <ViewportList
            viewportRef={ref}
            items={users.map(({ uid }) => uid)}
          >
            {(uid) => {
              return (
                <NavLink key={uid} className={({ isActive }) => `rounded-md md:hover:bg-gray-500/10 ${isActive ? "bg-gray-500/10" : ""}`} to={`/users/${uid}`}>
                  <User uid={uid} enableContextMenu={true} />
                </NavLink>
              );
            }}
          </ViewportList>
        </div>
      </div>
      <div className={clsx(`md:rounded-r-2xl bg-white w-full flex justify-center items-start dark:bg-gray-700`,
        !user_id && "h-full items-center",
        !isUserDetail && "hidden md:flex"
      )}>
        {isUserDetail ? <Profile uid={+user_id} /> : <BlankPlaceholder type="user" />}
        <GoBackNav />
      </div>
    </div>
  );
}
export default memo(UsersPage);
