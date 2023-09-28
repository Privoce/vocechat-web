import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ViewportList } from "react-viewport-list";

import InviteModal from "@/components/InviteModal";
import User from "@/components/User";
import IconAdd from "@/assets/icons/add.svg";
import { useAppSelector } from "@/app/store";
import { shallowEqual } from "react-redux";
import { StoredUser } from "@/app/slices/users";
import { getGroupData, sortUsersByRole } from "@/utils";

type Props = {
  membersVisible: boolean;
  uids: number[];
  addVisible: boolean;
  cid: number;
  ownerId: number;
};

const Members = ({ uids, addVisible, ownerId, cid, membersVisible }: Props) => {
  const { t } = useTranslation("chat");
  const ref = useRef<HTMLDivElement | null>(null);
  const [sortedUsers, setSortedUsers] = useState<StoredUser[]>([]);
  const users = useAppSelector((store) => Object.values(store.users.byId), shallowEqual);
  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  const toggleAddVisible = () => {
    setAddMemberModalVisible((prev) => !prev);
  };
  console.log({ sortedUsers });
  useEffect(() => {
    setSortedUsers(sortUsersByRole(users.filter((u) => uids.includes(u.uid))));
  }, [uids, users]);

  const adminCount = sortedUsers.filter(({ is_admin, is_bot }) => is_admin && !is_bot).length;
  const botCount = sortedUsers.filter(({ is_bot }) => is_bot).length;
  const memberCount = sortedUsers.length - adminCount - botCount;
  const sortedUids = sortedUsers.map(({ uid }) => uid);
  return (
    <>
      {addMemberModalVisible && <InviteModal cid={cid} closeModal={toggleAddVisible} />}
      <div
        ref={ref}
        className={`h-full flex-col gap-1 w-[226px] overflow-y-scroll p-2 shadow-[inset_1px_0px_0px_rgba(0,_0,_0,_0.1)] ${
          membersVisible ? "flex" : "hidden"
        }`}
      >
        {addVisible && (
          <div
            className="cursor-pointer flex items-center justify-start gap-1 select-none rounded-lg p-2.5 md:hover:bg-gray-500/10"
            onClick={toggleAddVisible}
          >
            <IconAdd className="w-6 h-6 dark:fill-slate-300" />
            <div className="font-semibold text-sm text-gray-600 dark:text-gray-50">
              {t("add_channel_members")}
            </div>
          </div>
        )}
        <ViewportList initialPrerender={15} viewportRef={ref} items={sortedUids}>
          {(id: number, idx) => {
            const curr = sortedUsers.find(({ uid }) => uid === id);
            if (!curr) return null;
            const prevUid = sortedUids[idx - 1];
            const prev = sortedUsers.find(({ uid }) => uid === prevUid);
            const { role, title } = getGroupData({
              current: curr,
              prev,
              adminCount,
              botCount,
              memberCount,
              isFirst: idx === 0
            });
            return (
              <User
                data-role={role}
                data-group-title={title}
                enableContextMenu={true}
                cid={cid}
                owner={ownerId == id}
                key={id}
                uid={id}
                dm
                popover
              />
            );
          }}
        </ViewportList>
      </div>
    </>
  );
};

export default Members;
