import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useOutsideClick } from "rooks";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import useCopy from "../hook/useCopy";
import { useLazyDeleteContactQuery } from "../../app/services/contact";
import Contact from "./Contact";
import StyledMenu from "./StyledMenu";
const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 512px;
  .intro {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    .title {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #374151;
    }
    .desc {
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
      color: #616161;
    }
  }
  .members {
    display: flex;
    flex-direction: column;
    gap: 24px;
    .member {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;
      .left {
        display: flex;
        gap: 8px;
        .info {
          display: flex;
          flex-direction: column;
          .name {
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
            color: #52525b;
          }
          .email {
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
            color: #52525b;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        gap: 28px;
        .role {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          text-align: right;
          color: #616161;
        }
        .opts {
          position: relative;
          width: 24px;
          height: 24px;

          .dots {
            cursor: pointer;
          }
          .menu {
            position: absolute;
          }
        }
      }
    }
  }
`;
export default function ManageMembers({ members = [] }) {
  const contacts = useSelector((store) => store.contacts);
  const [copied, copy] = useCopy();
  const [remove, { isSuccess: removeSuccess }] = useLazyDeleteContactQuery();
  const wrapperRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(null);
  useOutsideClick(wrapperRef, () => {
    setMenuVisible(null);
  });
  const toggleMenu = (evt) => {
    const { uid } = evt.target.dataset;
    if (menuVisible == uid) {
      setMenuVisible(null);
    } else {
      setMenuVisible(uid);
    }
  };
  const handleRemoveUser = (uid) => {
    remove(uid);
  };
  useEffect(() => {
    if (removeSuccess) {
      toast.success("delete successfully");
    }
  }, [removeSuccess]);
  const handleCopy = (str) => {
    copy(str);
  };
  const uids = !members || members.length == 0 ? contacts.ids : members;
  return (
    <StyledWrapper>
      <div className="intro">
        <h4 className="title">Manage Members</h4>
        <p className="desc">
          Disabling your account means you can recover it at any time after
          taking this action.
        </p>
      </div>
      <ul className="members">
        {uids.map((uid) => {
          const { name, email, is_admin } = contacts.byId[uid];
          return (
            <li key={uid} className="member">
              <div className="left">
                <Contact compact uid={uid} interactive={false} />
                <div className="info">
                  <span className="name">{name}</span>
                  <span className="email">{email}</span>
                </div>
              </div>
              <div className="right">
                <span className="role">{is_admin ? "Admin" : "User"}</span>
                <div className="opts">
                  <img
                    data-uid={uid}
                    onClick={toggleMenu}
                    className="dots"
                    src="https://static.nicegoodthings.com/project/rustchat/icon.dots.svg"
                    alt="dots icon"
                  />
                  {menuVisible == uid && (
                    <StyledMenu ref={wrapperRef} className="menu">
                      <li
                        className="item"
                        onClick={handleCopy.bind(null, email)}
                      >
                        {copied ? "Copied" : `Copy Email`}
                      </li>
                      <li className="item">Mute</li>
                      <li className="item underline">Change Nickname</li>
                      <li className="item danger">Ban</li>
                      <li
                        className="item danger"
                        onClick={handleRemoveUser.bind(null, uid)}
                        data-uid={uid}
                      >
                        Remove
                      </li>
                    </StyledMenu>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </StyledWrapper>
  );
}
