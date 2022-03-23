import styled from "styled-components";
const Styled = styled.div`
  max-height: 50vh;
  overflow: auto;
  p {
    font-weight: 400;
    font-size: 14px;
    /* line-height: 20px; */
    line-height: 22px;
    color: #475467;
    /* margin-bottom: 10px; */
  }
  i {
    font-style: italic;
  }
  /* del{
    font-style: italic;
  } */
  ul,
  ol {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #475467;
    list-style-position: inside;
  }
  ul {
    list-style-type: disc;
  }
  ol {
    /* list-style-type:; */
  }
  strong {
    font-weight: 700;
  }
  h1,
  h2,
  h3 {
    font-weight: 700;
    color: #475467;
  }
  h1 {
    font-size: 24px;
    line-height: 32px;
  }
  h2 {
    font-size: 20px;
    line-height: 30px;
  }
  h3 {
    font-size: 16px;
    line-height: 24px;
  }
  blockquote {
    margin-bottom: 10px;
    color: #98a2b3;
    opacity: 0.8;
    box-shadow: inset 2px 0px 0px #a8b0bd;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 16px;
  }
`;

export default Styled;
