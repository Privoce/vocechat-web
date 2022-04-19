// import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "../../common/component/Search";
import Contact from "../../common/component/Contact";
// import CurrentUser from "../../common/component/CurrentUser";
import Profile from "../../common/component/Profile";

import StyledWrapper from "./styled";

export default function ContactsPage() {
  const { user_id } = useParams();
  const contactIds = useSelector((store) => store.contacts.ids);

  console.log({ contactIds, user_id });
  if (!contactIds) return null;
  return (
    <StyledWrapper>
      <div className="left">
        <Search />
        <div className="list">
          <nav className="nav">
            {contactIds.map((uid) => {
              return (
                <NavLink key={uid} className="session" to={`/contacts/${uid}`}>
                  <Contact uid={uid} />
                </NavLink>
              );
            })}
          </nav>
        </div>
        {/* <CurrentUser /> */}
      </div>
      {user_id && (
        <div className="right">
          <Profile uid={user_id} />
        </div>
      )}
    </StyledWrapper>
  );
}
