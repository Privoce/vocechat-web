import { memo, useEffect, useRef, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";

import { updateChannelVisibleAside } from "@/app/slices/footprint";
import { updateRememberedNavs } from "@/app/slices/ui";
import { useAppSelector } from "@/app/store";
import { useGetGroupAnnouncementQuery } from "@/app/services/server";
import ChannelIcon from "@/components/ChannelIcon";
import GoBackNav from "@/components/GoBackNav";
import Tooltip from "@/components/Tooltip";
import MessageSearch from "@/components/MessageSearch";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import AnnouncementModal from "@/components/AnnouncementModal";
import IconFav from "@/assets/icons/bookmark.svg";
import IconPeople from "@/assets/icons/people.svg";
import IconPin from "@/assets/icons/pin.svg";
import FavList from "../FavList";
import Layout from "../Layout";
import { VirtualMessageFeedHandle } from "../Layout/VirtualMessageFeed";
import VoiceChat from "../VoiceChat";
import Dashboard from "../VoiceChat/Dashboard";
import Members from "./Members";
import PinList from "./PinList";
import { KEY_ADMIN_SEE_CHANNEL_MEMBERS } from "@/app/config";
import useServerExtSetting from "@/hooks/useServerExtSetting";
import { compareVersion } from "@/utils";

type Props = {
  cid?: number;
  dropFiles?: File[];
};
function ChannelChat({ cid = 0, dropFiles = [] }: Props) {
  const { getExtSetting } = useServerExtSetting();
  const { t } = useTranslation("chat");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feedRef = useRef<VirtualMessageFeedHandle>(null);
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const visibleAside = useAppSelector((store) => store.footprint.channelAsides[cid], shallowEqual);
  const userIds = useAppSelector((store) => store.users.ids, shallowEqual);
  const data = useAppSelector((store) => store.channels.byId[cid], shallowEqual);
  const currentVersion = useAppSelector((store) => store.server.version, shallowEqual);

  // Check if server version supports announcements
  const isAnnouncementSupported = useMemo(() => {
    return currentVersion && compareVersion(currentVersion, "0.5.13") >= 0;
  }, [currentVersion]);

  // Announcement state - only fetch if version is supported
  const { data: announcementResponse } = useGetGroupAnnouncementQuery(cid, {
    skip: !cid || !isAnnouncementSupported
  });
  const announcement = announcementResponse?.announcement;
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    if (!data) {
      // channel 不存在了 回首页
      navigate("/chat");
    }
  }, [data]);
  useEffect(() => {
    dispatch(updateRememberedNavs());
    return () => {
      dispatch(updateRememberedNavs({ path: pathname }));
    };
  }, [pathname]);

  // Handle announcement read status
  useEffect(() => {
    if (!announcement || !cid) {
      setShowModal(false);
      setShowBanner(false);
      return;
    }

    const storageKey = `announcement_read_${cid}`;
    const storedTimestamp = localStorage.getItem(storageKey);

    if (!storedTimestamp || new Date(storedTimestamp) < new Date(announcement.updated_at)) {
      // Unread announcement - show modal
      setShowModal(true);
      setShowBanner(false);
      setBannerDismissed(false);
    } else {
      // Read announcement - show banner only
      setShowModal(false);
      setShowBanner(true);
    }
  }, [announcement, cid]);

  const toggleMembersVisible = () => {
    dispatch(
      updateChannelVisibleAside({
        id: cid,
        aside: visibleAside !== "members" ? "members" : null,
      })
    );
  };

  const handleLocate = (mid: number) => {
    feedRef.current?.scrollToMessage(mid);
  };

  const handleModalClose = () => {
    if (announcement) {
      const storageKey = `announcement_read_${cid}`;
      localStorage.setItem(storageKey, new Date(announcement.updated_at).toISOString());
    }
    setShowModal(false);
    setShowBanner(true);
  };

  const handleBannerExpand = () => {
    setShowModal(true);
  };

  const handleBannerDismiss = () => {
    setBannerDismissed(true);
  };

  if (!data) return null;
  const { name, description, is_public, members = [], owner } = data;
  const memberIds = is_public ? userIds : members.slice(0).sort((n) => (n == owner ? -1 : 0));
  const addVisible = loginUser?.is_admin || owner == loginUser?.uid;
  const pinCount = data?.pinned_messages?.length || 0;
  const toolClass = `relative cursor-pointer hidden md:block`;
  const onlyAdminCanSeeMembers = getExtSetting(KEY_ADMIN_SEE_CHANNEL_MEMBERS);
  const canViewMembers = loginUser?.is_admin ? true : !onlyAdminCanSeeMembers;
  return (
    <>
      <Layout
        to={cid}
        context="channel"
        dropFiles={dropFiles}
        feedRef={feedRef}
        aside={
          <ul className="flex flex-col gap-6">
            <Tooltip tip={t("pin")} placement="left">
              <Tippy
                placement="left-start"
                popperOptions={{ strategy: "fixed" }}
                offset={[0, 150]}
                interactive
                trigger="click"
                content={<PinList id={cid} />}
              >
                <li className={`${toolClass}`}>
                  {pinCount > 0 ? (
                    <span className="absolute -top-2 -right-2 flex-center w-4 h-4 rounded-full bg-primary-400 text-white font-bold text-[10px]">
                      {pinCount}
                    </span>
                  ) : null}
                  <IconPin className="fill-gray-500" />
                </li>
              </Tippy>
            </Tooltip>
            <VoiceChat context={`channel`} id={cid} />
            <Tooltip tip={t("fav")} placement="left">
              <Tippy
                placement="left-start"
                popperOptions={{ strategy: "fixed" }}
                offset={[0, 164]}
                interactive
                trigger="click"
                content={<FavList cid={cid} />}
              >
                <li className={`${toolClass}`}>
                  <IconFav className="fill-gray-500" />
                </li>
              </Tippy>
            </Tooltip>
            {canViewMembers && (
              <li className={`${toolClass}`} onClick={toggleMembersVisible}>
                <Tooltip tip={t("channel_members")} placement="left">
                  <IconPeople className={visibleAside == "members" ? "fill-gray-600" : ""} />
                </Tooltip>
              </li>
            )}
          </ul>
        }
        header={
          <>
            <header className="px-5 py-4 flex items-center justify-center md:justify-between shadow-[inset_0_-1px_0_rgb(0_0_0_/_10%)]">
              <GoBackNav />
              <div className="flex items-center gap-1">
                <Link
                  to={`/setting/channel/${cid}/overview?f=/chat/channel/${cid}`}
                  className="flex items-center gap-1"
                >
                  <ChannelIcon personal={!is_public} />
                  <span className="text-gray-800 dark:text-white whitespace-nowrap">{name}</span>
                </Link>
                <span className="ml-2 text-gray-500 hidden md:block">{description}</span>
              </div>
              <MessageSearch context="channel" id={cid} onLocate={handleLocate} />
            </header>
            {announcement && showBanner && !bannerDismissed && (
              <AnnouncementBanner
                announcement={announcement}
                onExpand={handleBannerExpand}
                onDismiss={handleBannerDismiss}
              />
            )}
          </>
        }
        users={
          canViewMembers ? (
            <Members
              uids={memberIds}
              addVisible={addVisible}
              cid={cid}
              ownerId={owner}
              membersVisible={visibleAside == "members"}
            />
          ) : null
        }
        voice={<Dashboard visible={visibleAside == "voice"} id={cid} context="channel" />}
      />
      {announcement && showModal && (
        <AnnouncementModal announcement={announcement} onClose={handleModalClose} cid={cid} />
      )}
    </>
  );
}
export default memo(ChannelChat, (prev, next) => prev.cid == next.cid);
