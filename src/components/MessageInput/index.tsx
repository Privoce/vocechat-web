'use client';

// import React, { useRef } from 'react';
import { ClipboardEvent, MutableRefObject, useEffect, useRef } from 'react';
import { Plate, PlateEditor } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { useLocalstorageState } from 'rooks';

import { plugins } from './plugins';
import { getMessageFromPlateValues, ParagraphInput } from '@/utils';
import { Editor } from './plate-ui/editor';
import { MentionCombobox } from './plate-ui/mention-combobox';

import { EmojiDropdownInput } from './plate-ui/emoji-dropdown-input';
import {  MentionData, MessageWithMentions } from '@/types/message';
import { useAppSelector } from '@/app/store';
import { shallowEqual } from 'react-redux';
import { ChatContext } from '@/types/common';
import useUploadFile from '@/hooks/useUploadFile';

export const initialMessage = [
  {
    id: '1',
    type: ELEMENT_PARAGRAPH,
    children: [{ text: '' }],
  },
];
type Props = {
  editorRef: MutableRefObject<PlateEditor | null>;
  members: number[];
  debug?: boolean;
  id: string;
  placeholder: string;
  sendMessage: () => void;
  updateMessage: (msg:MessageWithMentions) => void;
};
export default function MessageInput({
  editorRef,
  members,
  debug = false,
  placeholder,
  id,
  sendMessage,
  updateMessage
}: Props) {
  const [context, to] = id.split("_") as [ChatContext, number];
  const { addStageFile } = useUploadFile({ context, id: to });
  const userData= useAppSelector(store=>store.users.byId,shallowEqual)
  const editorContainerRef = useRef(null);
  const [input, setInput] = useLocalstorageState(id, initialMessage);
  const handleSendMessage = () => {
   
    sendMessage();
  };
  useEffect(() => {
    const text = getMessageFromPlateValues(input as ParagraphInput[]);
    updateMessage(text)
  }, [input])
  // 监听文件粘贴事件
  useEffect(() => {
    const handlePasteEvent = (evt: ClipboardEvent<Window>) => {
      const files = [...evt.clipboardData.files];
      if (files.length) {
        const filesData = files.map((file) => {
          const { size, type, name } = file;
          // console.log("paste event name", name);
          const url = URL.createObjectURL(file);
          return { size, type, name, url };
        });
        addStageFile(filesData);
      }
    };
    // @ts-ignore
    window.addEventListener("paste", handlePasteEvent,true);
    return () => {
       // @ts-ignore
      window.removeEventListener("paste", handlePasteEvent,true);
    };
  }, [id]);
  const items:MentionData[]=members.map(uid=>({
    key:`${uid}`,
    text:userData[uid].name,
    data:{
      uid,
    }
  }))
  return (
    <>
      <div ref={editorContainerRef} className="input w-full pr-14 md:pr-0 max-h-[50vh] overflow-auto text-sm text-gray-600 dark:text-white">
        <Plate
        // @ts-ignore
          editorRef={editorRef}
          id={id}
          onChange={(values) => {
            setInput(values);
          }}
          plugins={plugins}
          value={input}
        >
          <Editor
            sendMessage={handleSendMessage}
            // className="px-2 py-3"
            autoFocus
            placeholder={placeholder}
          />
          <MentionCombobox items={items} />
          <div className="absolute left-3 bottom-3">
            <EmojiDropdownInput />
          </div>
        </Plate>
      </div>
      {debug && (
        <div className="whitespace-pre p-2 text-xs">
          {JSON.stringify(input, null, 2)}
        </div>
      )}
    </>
  );
}
