import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, FC } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { useKey } from "rooks";
import { useEditMessageMutation } from "../../../app/services/message";
import { ContentTypes } from "../../../app/config";
import { useAppSelector } from "../../../app/store";

const StyledWrapper = styled.div`
  width: 100%;
  .input {
    background: #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    textarea {
      outline: none;
      width: 100%;
      background: none;
      resize: unset;
      user-select: text;
      color: #374151;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      word-break: break-all;
      white-space: break-spaces;
    }
  }
  .opts {
    padding: 4px;
    display: flex;
    align-items: center;
    gap: 16px;
    .opt {
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
      button {
        padding: 0 4px;
        font-size: inherit;
        line-height: inherit;
        background: none;
        cursor: pointer;
        color: #06b6d4;
      }
    }
  }
`;
type Props = {
  mid: number;
  cancelEdit: () => void;
};
const EditMessage: FC<Props> = ({ mid, cancelEdit }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const msg = useAppSelector((store) => store.message[mid]);
  const [shift, setShift] = useState(false);
  const [enter, setEnter] = useState(false);
  const [currMsg, setCurrMsg] = useState(msg?.content);
  const [edit, { isLoading: isEditing, isSuccess }] = useEditMessageMutation();
  useEffect(() => {
    if (isSuccess) {
      cancelEdit();
    }
  }, [isSuccess]);

  useKey(
    "Shift",
    (e) => {
      setShift(e.type == "keydown");
    },
    { eventTypes: ["keydown", "keyup"], target: inputRef }
  );
  //   cancel by esc
  useKey(
    "Escape",
    () => {
      cancelEdit();
    },
    { eventTypes: ["keydown", "keyup"], target: inputRef }
  );
  const handleMsgChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    if (enter && !shift) {
      handleSave();
    } else {
      setCurrMsg(evt.target.value);
    }
  };
  const handleInputKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    setEnter(e.key === "Enter");
  };
  const handleSave = () => {
    edit({
      mid,
      content: currMsg,
      type: msg.content_type == ContentTypes.markdown ? "markdown" : "text"
    });
  };
  if (!msg) return null;

  return (
    <StyledWrapper>
      <div className="input">
        <TextareaAutosize
          autoFocus
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          ref={inputRef}
          className="content"
          maxRows={8}
          minRows={1}
          onKeyDown={handleInputKeydown}
          onChange={handleMsgChange}
          value={currMsg}
          placeholder={`Edit Message`}
        />
      </div>
      <div className="opts">
        <span className="opt">
          esc to <button onClick={cancelEdit}>cancel</button>
        </span>
        <span className="opt">
          enter to <button onClick={handleSave}>{isEditing ? "saving" : `save`}</button>
        </span>
      </div>
    </StyledWrapper>
  );
};
export default EditMessage;
