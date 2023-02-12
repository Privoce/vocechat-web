import { FC, ReactElement, useEffect, useState } from "react";
import renderContent from "./renderContent";
import Avatar from "../Avatar";
import useFavMessage from "../../hook/useFavMessage";

type Props = {
  id?: string;
};
const FavoredMessage: FC<Props> = ({ id = "" }) => {
  const { favorites } = useFavMessage({});
  const [msgs, setMsgs] = useState<ReactElement | null>(null);

  useEffect(() => {
    const current = favorites.find((f) => f.id == id);
    const { messages } = current || {};
    if (!messages) return;
    const favorite_mids = messages.map(({ from_mid }) => +from_mid) || [];

    setMsgs(
      <div data-favorite-mids={favorite_mids.join(",")} className="favorite flex flex-col rounded-md bg-slate-50 dark:bg-slate-800">
        <div className="list">
          {messages.map((msg, idx) => {
            const { user = {}, download, content, content_type, properties, thumbnail } = msg;
            return (
              <div className="w-full relative flex items-start gap-3 px-2 py-1 my-2 rounded-lg dark:hover:bg-gray-800" key={idx}>
                {user && (
                  <div className="shrink-0">
                    <Avatar width={40} height={40} className="rounded-full object-cover" src={user.avatar} name={user.name} />
                  </div>
                )}
                <div className="w-full flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="text-gray-600 dark:text-gray-400">{user?.name || "Deleted User"}</span>
                  </div>
                  <div className="select-text text-gray-800 break-all whitespace-pre-wrap dark:text-white">
                    {renderContent({
                      download,
                      content,
                      content_type,
                      properties,
                      thumbnail
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [favorites, id]);

  if (!id) return null;

  return msgs;
};

export default FavoredMessage;
