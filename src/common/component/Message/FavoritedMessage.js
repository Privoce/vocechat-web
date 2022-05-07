import { useEffect, useState } from "react";
// import dayjs from "dayjs";

import styled from "styled-components";
import StyledMsg from "./styled";
import renderContent from "./renderContent";
import Avatar from "../Avatar";
import useFavMessage from "../../hook/useFavMessage";
const StyledFav = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: var(--br);
  background-color: #f4f4f5;
`;
const FavoritedMessage = ({ id }) => {
  const { favorites } = useFavMessage({});
  const [msgs, setMsgs] = useState(null);

  useEffect(() => {
    const current = favorites.find((f) => f.id == id);
    const { messages } = current || {};
    if (messages) {
      const favorite_mids = messages.map(({ from_mid }) => from_mid) || [];

      setMsgs(
        <StyledFav data-favorite-mids={favorite_mids.join(",")}>
          <div className="list">
            {messages.map((msg, idx) => {
              const {
                user = {},
                download,
                content,
                content_type,
                properties,
                thumbnail,
              } = msg;
              return (
                <StyledMsg className="archive" key={idx}>
                  {user && (
                    <div className="avatar">
                      <Avatar url={user.avatar} name={user.name} />
                    </div>
                  )}
                  <div className="details">
                    <div className="up">
                      <span className="name">{user?.name}</span>
                    </div>
                    <div className="down">
                      {renderContent({
                        download,
                        content,
                        content_type,
                        properties,
                        thumbnail,
                      })}
                    </div>
                  </div>
                </StyledMsg>
              );
            })}
          </div>
        </StyledFav>
      );
    }
  }, [favorites, id]);

  if (!id) return null;

  return msgs;
};

export default FavoritedMessage;
