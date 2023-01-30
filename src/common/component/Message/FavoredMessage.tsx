import { FC, ReactElement, useEffect, useState } from "react";
import StyledMsg from "./styled";
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
      <div data-favorite-mids={favorite_mids.join(",")} className="favorite flex flex-col rounded-md bg-slate-200">
        <div className="list">
          {messages.map((msg, idx) => {
            const { user = {}, download, content, content_type, properties, thumbnail } = msg;
            return (
              <StyledMsg className="archive" key={idx}>
                {user && (
                  <div className="avatar">
                    <Avatar width={40} height={40} src={user.avatar} name={user.name} />
                  </div>
                )}
                <div className="details">
                  <div className="up">
                    <span className="name">{user?.name || "Deleted User"}</span>
                  </div>
                  <div className="down">
                    {renderContent({
                      download,
                      content,
                      content_type,
                      properties,
                      thumbnail
                    })}
                  </div>
                </div>
              </StyledMsg>
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
