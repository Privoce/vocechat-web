// import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useGetContactsQuery } from "../../app/services/contact";
import Search from "../../common/component/Search";
import Contact from "../../common/component/Contact";
import CurrentUser from "../../common/component/CurrentUser";
import Profile from "../../common/component/Profile";

import StyledWrapper from "./styled";

export default function ContactsPage() {
  const { user_id } = useParams();
  const { data: contacts } = useGetContactsQuery();

  console.log({ contacts, user_id });
  if (!contacts) return null;
  return (
    <StyledWrapper>
      <div className="left">
        <Search />
        <div className="list">
          <nav className="nav">
            {contacts.map(({ uid, status }) => {
              return (
                <NavLink key={uid} className="session" to={`/contacts/${uid}`}>
                  <Contact uid={uid} status={status} />
                </NavLink>
              );
            })}
          </nav>
        </div>
        <CurrentUser />
      </div>
      {user_id && (
        <div className="right">
          <Profile data={contacts.find((c) => c.uid == user_id)} />
        </div>
      )}
    </StyledWrapper>
  );
}
