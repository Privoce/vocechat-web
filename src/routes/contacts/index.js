import { useEffect } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRemeberedNavs } from "../../app/slices/ui";
import Search from "../../common/component/Search";
import Contact from "../../common/component/Contact";
import Profile from "../../common/component/Profile";

import StyledWrapper from "./styled";
import BlankPlaceholder from "../../common/component/BlankPlaceholder";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { user_id } = useParams();
  const contactIds = useSelector((store) => store.contacts.ids);
  useEffect(() => {
    dispatch(updateRemeberedNavs({ key: "contact" }));
    return () => {
      dispatch(updateRemeberedNavs({ key: "contact", path: pathname }));
    };
  }, [pathname]);

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
                  <Contact uid={uid} enableContextMenu={true} />
                </NavLink>
              );
            })}
          </nav>
        </div>
        {/* <CurrentUser /> */}
      </div>
      {user_id ? (
        <div className="right">
          <Profile uid={user_id} />
        </div>
      ) : (
        <div className="right placeholder">
          <BlankPlaceholder type="contact" />
        </div>
      )}
    </StyledWrapper>
  );
}
