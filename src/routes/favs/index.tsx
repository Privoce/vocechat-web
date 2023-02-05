import { useState, useEffect, MouseEvent } from "react";
import FavoredMessage from "../../common/component/Message/FavoredMessage";
import dayjs from "dayjs";
import IconAudio from "../../assets/icons/file.audio.svg";
import IconVideo from "../../assets/icons/file.video.svg";
import IconUnknown from "../../assets/icons/file.unknown.svg";
import IconImage from "../../assets/icons/file.image.svg";
import IconChannel from "../../assets/icons/channel.svg";
import IconRemove from "../../assets/icons/close.svg";
import { ContentTypes } from "../../app/config";
import { useAppSelector } from "../../app/store";
import { Favorite } from "../../app/slices/favorites";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import useFavMessage from "../../common/hook/useFavMessage";

type filter = "audio" | "video" | "image" | "";
function FavsPage() {
  const { t } = useTranslation("fav");
  const [filter, setFilter] = useState<filter>("");
  const [favs, setFavs] = useState<Favorite[]>([]);
  const { removeFavorite } = useFavMessage({});
  const Filters = [
    {
      icon: <IconUnknown className="w-[15px] h-5" />,
      title: t("all_items"),
      filter: ""
    },
    {
      icon: <IconImage className="w-[15px] h-5" />,
      title: t("image"),
      filter: "image"
    },
    {
      icon: <IconVideo className="w-[15px] h-5" />,
      title: t("video"),
      filter: "video"
    },
    {
      icon: <IconAudio className="w-[15px] h-5" />,
      title: t("audio"),
      filter: "audio"
    }
  ];
  const { favorites, channelData, userData } = useAppSelector((store) => {
    return {
      favorites: store.favorites,
      userData: store.users.byId,
      channelData: store.channels.byId
    };
  });
  const handleFilter = (ftr: filter) => {
    setFilter(ftr);
  };
  useEffect(() => {
    if (!filter) {
      setFavs(favorites);
    } else {
      switch (filter) {
        case "audio":
          {
            setFavs(
              favorites.filter((f) => {
                const msgs = f.messages || [];
                return msgs.every((m) => {
                  const file_type = m.properties?.content_type;
                  return m.content_type == ContentTypes.file && file_type.startsWith("audio");
                });
              })
            );
          }
          break;
        case "video":
          {
            setFavs(
              favorites.filter((f) => {
                const msgs = f.messages || [];
                return msgs.every((m) => {
                  const file_type = m.properties?.content_type;
                  return m.content_type == ContentTypes.file && file_type.startsWith("video");
                });
              })
            );
          }
          break;
        // case "file":
        //   {
        //     const tmps = favorites.filter((f) => {
        //       const msgs = f.messages || [];
        //       return msgs.every((m) => {
        //         return m.content_type == ContentTypes.file;
        //       });
        //     });
        //     setFavs(tmps);
        //   }
        //   break;
        case "image":
          {
            const tmps = favorites.filter((f) => {
              const msgs = f.messages || [];
              return msgs.every((m) => {
                const file_type = m.properties?.content_type;
                return m.content_type == ContentTypes.file && file_type.startsWith("image");
              });
            });
            setFavs(tmps);
          }
          break;

        default:
          break;
      }
    }
  }, [filter, favorites]);
  const handleRemove = (evt: MouseEvent<HTMLButtonElement>) => {
    const { id = "" } = evt.currentTarget.dataset;
    // console.log("remove fav", id);
    removeFavorite(id);
  };
  return (
    <div className="h-screen flex bg-white mt-2 mr-6 mb-2.5 overflow-auto dark:bg-[#384250] rounded-2xl">
      <div className="min-w-[268px] p-2 shadow-inner-[-1px_0px_0px_rgba(0,_0,_0,_0.1)]">
        <ul className="flex flex-col gap-0.5">
          {Filters.map(({ icon, title, filter: f }) => {
            return (
              <li
                key={f}
                className={clsx(f == filter && 'bg-[rgba(116,_127,_141,_0.2)]', `cursor-pointer flex items-center gap-2 p-2 rounded-lg hover:bg-[rgba(116,_127,_141,_0.2)]`)}
                onClick={handleFilter.bind(null, f as filter)}
              >
                {icon}
                <span className="font-bold text-sm text-gray-600 dark:text-gray-100">{title}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full p-4 flex flex-col overflow-y-scroll gap-8">
        {favs.map(({ id, created_at, messages }) => {
          if (!messages || messages.length == 0) return null;
          const [
            {
              source: { gid, uid }
            }
          ] = messages;
          const tip = <span className={clsx("inline-flex items-center gap-1 mr-2")}>
            {gid ? <><IconChannel className="w-3 h-3" /> {channelData[gid]?.name}</> : <>
              From <strong className="font-bold text-gray-800">{userData[uid]?.name}</strong>
            </>}
          </span>;
          return (
            <div className="max-w-[600px] flex flex-col gap-1" key={id}>
              <h4 className="inline-flex items-center text-xs text-gray-400">
                {tip}
                {dayjs(created_at).format("YYYY-MM-DD")}
              </h4>
              <div className="relative group">
                <FavoredMessage key={id} id={id} />
                <button className="absolute top-2 right-2 flex-center w-6 h-6 p-1 border border-solid border-slate-200 rounded invisible group-hover:visible" data-id={id} onClick={handleRemove} >
                  <IconRemove className="fill-slate-900" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default FavsPage;
