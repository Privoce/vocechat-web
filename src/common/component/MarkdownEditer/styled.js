import styled from "styled-components";
const Styled = styled.div`
  * {
    line-height: 1.4;
  }
  /* ul,
  ol {
    list-style-position: inside;
    display: list-item;
    padding-left: 10px;
  }
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  } */
  strong {
    font-weight: bold;
  }
  p {
    margin: 0;
    margin-bottom: 12px;
  }

  pre {
    padding: 10px;
    background-color: #eee;
    white-space: pre-wrap;
  }

  :not(pre) > code {
    font-family: monospace;
    background-color: #eee;
    padding: 3px;
  }
  code {
    background-color: #ccc;
  }
  img {
    max-width: 100%;
    max-height: 20em;
  }

  blockquote {
    border-left: 2px solid #ddd;
    margin-left: 0;
    margin-right: 0;
    padding-left: 10px;
    color: #aaa;
    font-style: italic;
  }

  blockquote[dir="rtl"] {
    border-left: none;
    padding-left: 0;
    padding-right: 10px;
    border-right: 2px solid #ddd;
  }
`;

export default Styled;
