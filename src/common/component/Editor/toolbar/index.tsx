import React, { FC, MouseEvent } from "react";
import { EditorView } from "prosemirror-view";
import { toggleMark } from "prosemirror-commands";
import ButtonWrapper from "./button-wrapper";
import IconBold from "../icons/format_bold_24.svg";
import IconItalic from "../icons/format_italic_24.svg";
import IconUnderline from "../icons/format_underlined_24.svg";
import IconStrikethrough from "../icons/strikethrough_s_24.svg";
import IconCode from "../icons/code_24.svg";
import IconImage from "../icons/image_24.svg";
import IconEmoji from "../icons/insert_emoticon_24.svg";
import { Schema } from "prosemirror-model";

interface Props {
  schema: Schema;
  view: EditorView | null;
}

const Index: FC<Props> = ({ view, schema }) => {
  const onBold = (e: MouseEvent) => {
    e.stopPropagation();
    if (!view) return;
    toggleMark(schema.marks.strong)(view.state, view.dispatch);
  };

  const onItalic = (e: MouseEvent) => {
    e.stopPropagation();
    if (!view) return;
    toggleMark(schema.marks.em)(view.state, view.dispatch);
  };

  const onUnderline = (e: MouseEvent) => {
    e.stopPropagation();
    if (!view) return;
    toggleMark(schema.marks.u)(view.state, view.dispatch);
  };

  const onStrikeThrough = (e: MouseEvent) => {
    e.stopPropagation();
    if (!view) return;
    toggleMark(schema.marks.s)(view.state, view.dispatch);
  };

  const onCode = (e: MouseEvent) => {
    e.stopPropagation();
    if (!view) return;
    toggleMark(schema.marks.code)(view.state, view.dispatch);
  };

  return (
    <div className="border-b-primary">
      <div className="cursor-auto flex items-center h-13 px-2.5">
        <ButtonWrapper onClick={onBold}>
          <IconBold className="fill-gray-500 dark:fill-white w-6 h-6" />
        </ButtonWrapper>
        <ButtonWrapper onClick={onItalic}>
          <IconItalic className="fill-gray-500 dark:fill-white w-6 h-6" />
        </ButtonWrapper>
        <ButtonWrapper onClick={onUnderline}>
          <IconUnderline className="fill-gray-500 dark:fill-white w-6 h-6" />
        </ButtonWrapper>
        <ButtonWrapper onClick={onStrikeThrough}>
          <IconStrikethrough className="fill-gray-500 dark:fill-white w-6 h-6" />
        </ButtonWrapper>
        <ButtonWrapper onClick={onCode}>
          <IconCode className="fill-gray-500 dark:fill-white w-6 h-6" />
        </ButtonWrapper>
        <ButtonWrapper>
          <IconImage className="fill-gray-500 dark:fill-white w-6 h-6" />
        </ButtonWrapper>
        <ButtonWrapper>
          <IconEmoji className="fill-gray-500 dark:fill-white w-6 h-6" />
        </ButtonWrapper>
      </div>
    </div>
  );
};

export default Index;
