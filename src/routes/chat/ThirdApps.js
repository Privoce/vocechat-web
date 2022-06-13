// import React from 'react'
import boardosIcon from "../../assets/icons/app.boardos.svg?url";
import webrowseIcon from "../../assets/icons/app.webrowse.svg?url";
import Tooltip from "../../common/component/Tooltip";

export default function ThirdApps() {
  return (
    <ul className="apps">
      <li className="app">
        <Tooltip tip="Webrowse" placement="left">
          <img src={webrowseIcon} alt="app icon" />
        </Tooltip>
      </li>
      <li className="app">
        <Tooltip tip="BoardOS" placement="left">
          <img src={boardosIcon} alt="app icon" />
        </Tooltip>
      </li>
    </ul>
  );
}
