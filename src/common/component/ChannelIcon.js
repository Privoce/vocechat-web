// import React from 'react';
import hashIcon from "../../assets/icons/channel.svg?url";
import lockHashIcon from "../../assets/icons/channel.private.svg?url";
export default function ChannelIcon({ personal = false, ...rest }) {
  return (
    <img
      src={personal ? lockHashIcon : hashIcon}
      alt="channel icon"
      {...rest}
    />
  );
}
