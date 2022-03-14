import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Styled = styled.div`
  color: #aaa;
  font-size: 12px;
  margin-bottom: -10px;
  /* padding-left: 10px; */
`;
export default function Reply({ mid }) {
  const data = useSelector((store) => store.message[mid]);
  if (!data) return null;
  return <Styled className="reply">{data.content}</Styled>;
}
