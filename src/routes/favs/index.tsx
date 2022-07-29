import { useState, useEffect } from "react";
import Styled from "./styled";
import FavoredMessage from "../../common/component/Message/FavoredMessage";
import dayjs from "dayjs";
import IconAudio from "../../assets/icons/file.audio.svg";
import IconVideo from "../../assets/icons/file.video.svg";
import IconUnknown from "../../assets/icons/file.unknown.svg";
import IconImage from "../../assets/icons/file.image.svg";
import IconChannel from "../../assets/icons/channel.svg";
import { ContentTypes } from "../../app/config";
import { useAppSelector } from "../../app/store";
import { Favorite } from "../../app/slices/favorites";
const Filters = [
  {
    icon: <IconUnknown className="icon" />,
    title: "All Items",
    filter: ""
  },
  {
    icon: <IconImage className="icon" />,
    title: "Images",
    filter: "image"
  },
  {
    icon: <IconVideo className="icon" />,
    title: "Videos",
    filter: "video"
  },
  {
    icon: <IconAudio className="icon" />,
    title: "Audios",
    filter: "audio"
  }
];
type filter = "audio" | "video" | "image" | "";
function FavsPage() {
  const [filter, setFilter] = useState<filter>("");
  const [favs, setFavs] = useState<Favorite[]>([]);
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

  return (
    <Styled>
      <div className="left">
        <ul className="filters">
          {Filters.map(({ icon, title, filter: f }) => {
            return (
              <li
                key={f}
                className={`filter ${f == filter ? "active" : ""}`}
                onClick={handleFilter.bind(null, f as filter)}
              >
                {icon}
                <span className="txt">{title}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="right">
        {favs.map(({ id, created_at, messages }) => {
          if (!messages || messages.length == 0) return null;
          const [
            {
              source: { gid, uid }
            }
          ] = messages;
          const tip = gid ? (
            <span className="from channel">
              <IconChannel className="icon" /> {channelData[gid]?.name}
            </span>
          ) : (
            <span className="from user">
              From <strong>{userData[uid]?.name}</strong>
            </span>
          );
          return (
            <div className="container" key={id}>
              <h4 className="tip">
                {tip}
                {dayjs(created_at).format("YYYY-MM-DD")}
              </h4>
              <FavoredMessage key={id} id={id} />
            </div>
          );
        })}
      </div>
    </Styled>
  );
}
export default FavsPage;
