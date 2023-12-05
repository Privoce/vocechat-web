// import React from 'react';
// import clsx from "clsx";

// import { useWidget } from "../../WidgetContext";
import MarkdownRender from "@/components/MarkdownRender";

type Props = {
  content: string;
};

const Markdown = ({ content }: Props) => {
  return <MarkdownRender content={content} />;
};

export default Markdown;
