import { useState, useEffect } from "react";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import Modal from "../Modal";
import Button from "../styled/Button";
import Input from "../styled/Input";
import Contact from "../Contact";
import Reply from "../Message/Reply";
import StyledWrapper from "./styled";
import CloseIcon from "../../../assets/icons/close.circle.svg";
import StyledCheckbox from "../../component/styled/Checkbox";
import useFilteredUsers from "../../hook/useFilteredUsers";
// import { addChannel } from "../../../app/slices/channels";

// import { useCreateChannelMutation } from "../../../app/services/channel";

export default function ForwardModal({ mid, closeModal }) {
  const [members, setMembers] = useState([]);
  const { contacts, input, updateInput } = useFilteredUsers();
  // const { conactsData, loginUid } = useSelector((store) => {
  //   return { conactsData: store.contacts.byId, loginUid: store.authData.uid };
  // });
  const handleInputChange = (evt) => {
    updateInput(evt.target.value);
  };
  const toggleCheckMember = ({ currentTarget }) => {
    const { uid } = currentTarget.dataset;
    let tmp = members.includes(+uid)
      ? members.filter((m) => m != uid)
      : [...members, +uid];
    console.log(uid, currentTarget);
    setMembers(tmp);
  };
  const removeSelected = (uid) => {
    setMembers(members.filter((m) => m != uid));
  };
  const selectedCount = members.length ? `(${members.length})` : null;
  return (
    <Modal>
      <StyledWrapper>
        <div className="left">
          <div className="search">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Search user or channel"
            />
          </div>
          {contacts && (
            <ul className="users">
              {contacts.map((u) => {
                const { uid } = u;
                const checked = members.includes(uid);
                console.log({ checked });
                return (
                  <li
                    key={uid}
                    data-uid={uid}
                    className="user"
                    onClick={toggleCheckMember}
                  >
                    <StyledCheckbox
                      readOnly
                      checked={checked}
                      name="cb"
                      id="cb"
                    />
                    <Contact uid={uid} interactive={false} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className={`right`}>
          <h3 className="title">Send To {selectedCount}</h3>
          <ul className="selected">
            {members.map((uid) => {
              return (
                <li key={uid} className="item">
                  <Contact
                    key={uid}
                    uid={uid}
                    interactive={false}
                    avatarSize={40}
                  />
                  <CloseIcon
                    className="remove"
                    onClick={removeSelected.bind(null, uid)}
                  />
                </li>
              );
            })}
          </ul>
          <div className="reply">
            <Reply mid={mid} interactive={false} />
          </div>
          <Input className="input" placeholder="Leave a message"></Input>
          <div className="btns">
            <Button onClick={closeModal} className="normal cancel">
              Cancel
            </Button>
            <Button className="normal" disabled={members.length == 0}>
              Send To {selectedCount}
            </Button>
          </div>
        </div>
      </StyledWrapper>
    </Modal>
  );
}
