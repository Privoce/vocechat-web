// import React from 'react'
import styled from "styled-components";
const Styled = styled.div`
  display: flex;
`;
export default function StyledCombobox({ store }) {
  console.log("combox wtf", store.get.state());
  return <Styled>StyledCombobox</Styled>;
}
