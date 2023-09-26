import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { ViewportList } from "react-viewport-list";
import clsx from "clsx";

import { updateRememberedNavs } from "@/app/slices/ui";
import BlankPlaceholder from "@/components/BlankPlaceholder";
import GoBackNav from "@/components/GoBackNav";
import Profile from "@/components/Profile";
import SearchUser from "@/components/SearchUser";
import User from "@/components/User";
import useFilteredUsers from "@/hooks/useFilteredUsers";
import Search from "./Search";

function UsersPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [modalVisible, setModalVisible] = useState(false);
  const { input, updateInput, users, uids } = useFilteredUsers();
  const { user_id } = useParams();
  // 记住路由
  useEffect(() => {
    dispatch(updateRememberedNavs({ key: "user" }));
    return () => {
      dispatch(updateRememberedNavs({ key: "user", path: pathname }));
    };
  }, [pathname]);
  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };
  if (!users) return null;
  const adminCount = users.filter(({ is_admin }) => is_admin).length;
  const botCount = users.filter(({ is_bot }) => is_bot).length;
  const memberCount = users.length - adminCount - botCount;
  const isUserDetail = !!user_id;
  return (
    <div className={clsx("flex h-screen md:h-full md:pt-2 md:pb-2.5 md:pr-12")}>
      <div
        className={clsx(
          "md:rounded-l-2xl bg-white dark:bg-gray-800 relative flex flex-col w-full md:w-auto md:min-w-[268px] shadow-[inset_-1px_0px_0px_rgba(0,_0,_0,_0.1)]",
          isUserDetail && "hidden md:flex"
        )}
      >
        <Search input={input} updateInput={updateInput} openModal={toggleModal} />
        {modalVisible && <SearchUser closeModal={toggleModal} />}
        <div className="flex flex-col md:gap-1 px-2 pt-3 pb-20 md:py-3 overflow-scroll" ref={ref}>
          <ViewportList viewportRef={ref} items={uids}>
            {(id, idx) => {
              const curr = users.find(({ uid }) => uid === id);
              const prevUid = uids[idx - 1];
              const prev = users.find(({ uid }) => uid === prevUid);
              if (!curr) return null;
              const { is_admin, is_bot } = curr;
              const role = is_admin ? "admin" : is_bot ? "bot" : "member";
              const groupTitle =
                role === "admin"
                  ? `admin - ${adminCount}`
                  : role === "bot"
                  ? `bot - ${botCount}`
                  : `member - ${memberCount}`;
              const prefixHeader =
                idx === 0 ? true : prev?.is_admin !== is_admin || prev?.is_bot !== is_bot;
              return (
                <NavLink
                  data-role={role}
                  data-group-title={prefixHeader ? groupTitle : undefined}
                  key={id}
                  className={({ isActive }) =>
                    `rounded-md md:hover:bg-gray-500/10 ${isActive ? "bg-gray-500/10" : ""}`
                  }
                  to={`/users/${id}`}
                >
                  <User uid={id} enableContextMenu={true} />
                </NavLink>
              );
            }}
          </ViewportList>
        </div>
      </div>
      <div
        className={clsx(
          `md:rounded-r-2xl bg-white w-full flex justify-center items-start dark:bg-gray-700`,
          !user_id && "h-full items-center",
          !isUserDetail && "hidden md:flex"
        )}
      >
        {isUserDetail ? <Profile uid={+user_id} /> : <BlankPlaceholder type="user" />}
        <GoBackNav />
      </div>
    </div>
  );
}
export default memo(UsersPage);
