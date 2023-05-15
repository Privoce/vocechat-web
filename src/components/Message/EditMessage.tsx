import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, FC } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useKey } from "rooks";
import { useEditMessageMutation } from "@/app/services/message";
import { ContentTypes } from "@/app/config";
import { useAppSelector } from "@/app/store";

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
    <div className="w-full">
      <div className="bg-gray-200 rounded-lg p-4">
        <TextareaAutosize
          autoFocus
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          ref={inputRef}
          className="content w-full resize-none bg-transparent text-gray-800 text-sm break-all"
          maxRows={8}
          minRows={1}
          onKeyDown={handleInputKeydown}
          onChange={handleMsgChange}
          value={currMsg}
          placeholder={`Edit Message`}
        />
      </div>
      <div className="flex items-center p-1 gap-4 text-xs">
        <span>
          esc to <button className="text-primary-500 cursor-pointer px-1" onClick={cancelEdit}>cancel</button>
        </span>
        <span>
          enter to <button className="text-primary-500 cursor-pointer px-1" onClick={handleSave}>{isEditing ? "saving" : `save`}</button>
        </span>
      </div>
    </div>
  );
};
export default EditMessage;
