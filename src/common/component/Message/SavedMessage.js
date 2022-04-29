import { useEffect, useState } from "react";
import dayjs from "dayjs";

import styled from "styled-components";
import StyledMsg from "./styled";
import renderContent from "./renderContent";
import Avatar from "../Avatar";
import useFavMessage from "../../hook/useFavMessage";
const StyledSaved = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: var(--br);
  background-color: #f4f4f5;
  padding: 8px;
`;
const SavedMessage = ({ cid, id }) => {
  const { favorites } = useFavMessage(cid);
  const [fav, setFav] = useState(null);
  const [messages, setMessages] = useState(null);
  useEffect(() => {
    if (id && favorites) {
      const msgs = favorites.find((f) => f.id == id)?.messages;
      console.log("favv", favorites, id, msgs);
      setMessages(msgs);
    }
  }, [id, favorites]);

  useEffect(() => {
    if (messages) {
      const fav_mids = messages.map(({ from_mid }) => from_mid) || [];

      setFav(
        <StyledSaved data-fav-mids={fav_mids.join(",")}>
          <div className="list">
            {messages.map((msg, idx) => {
              const {
                user = {},
                created_at,
                download,
                content,
                content_type,
                properties,
                thumbnail,
              } = msg;
              return (
                <StyledMsg className="favorite" key={idx}>
                  {user && (
                    <div className="avatar">
                      <Avatar url={user.avatar} name={user.name} />
                    </div>
                  )}
                  <div className="details">
                    <div className="up">
                      <span className="name">{user?.name}</span>
                      <i className="time">
                        {dayjs(created_at).format("YYYY-MM-DD h:mm:ss A")}
                      </i>
                    </div>
                    <div className="down">
                      {renderContent({
                        download,
                        context: "channel",
                        to: null,
                        from_uid: null,
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
        </StyledSaved>
      );
    }
  }, [messages]);

  if (!id) return null;
  console.log("archive data", messages, fav);

  return fav;
};

export default SavedMessage;
