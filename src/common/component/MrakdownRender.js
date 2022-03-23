// import React from 'react'
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
const Styled = styled.div`
  font-family: "Helvetica Neue", sans;
  background: transparent;
  color: #222;
  line-height: 1.5;
  font-size: 16px;
  font-weight: 300;
  img {
    margin: 0;
    border: 0;
  }

  p {
    margin: 1em 0;
  }

  a {
    color: #00213d;
  }

  a:visited {
    color: #00213d;
    background-color: transparent;
  }

  a:active {
    color: #318100;
    background-color: transparent;
  }

  a:hover {
    text-decoration: none;
  }

  p img {
    border: 0;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #003a6b;
    background-color: transparent;
    margin: 1em 0;
    font-weight: normal;
  }

  h1 {
    font-size: 180%;
    font-weight: bold;
  }

  h2 {
    font-size: 160%;
  }

  h3 {
    font-size: 140%;
  }

  h4 {
    font-size: 110%;
  }

  h5 {
    font-size: 105%;
  }

  h6 {
    font-size: 100%;
  }

  dt {
    font-style: italic;
  }

  dd {
    margin-bottom: 1.5em;
  }

  li {
    line-height: 1.5em;
  }

  code {
    padding: 0.1em;
    font-size: 14px;
    font-family: "Menlo", monospace;
    background-color: #f5f5f5;
    border: 1px solid #efefef;
  }

  pre {
    font-family: "Menlo", monospace;
    background-color: #fff;
    padding: 0.5em;
    line-height: 1.25em;
    border: 1px solid #efefef;
    border-bottom: 1px solid #ddd;
    -webkit-box-shadow: 0 1px 3px 0 #eee;
    -moz-box-shadow: 0 1px 3px 0 #eee;
    -ms-box-shadow: 0 1px 3px 0 #eee;
    box-shadow: 0 1px 3px 0 #eee;
  }

  pre code {
    background-color: transparent;
    border-width: 0;
  }

  blockquote {
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #ddd;
    -webkit-box-shadow: 0 1px 3px 0 #eee;
    -moz-box-shadow: 0 1px 3px 0 #eee;
    -ms-box-shadow: 0 1px 3px 0 #eee;
    box-shadow: 0 1px 3px 0 #eee;
  }

  table {
    border-collapse: collapse;
    border: 1px solid #efefef;
    border-bottom: 1px solid #ddd;
    -webkit-box-shadow: 0 1px 3px 0 #eee;
    -moz-box-shadow: 0 1px 3px 0 #eee;
    -ms-box-shadow: 0 1px 3px 0 #eee;
    box-shadow: 0 1px 3px 0 #eee;
  }

  td,
  th {
    border: 1px solid #ddd;
    padding: 0.5em;
  }

  th {
    background-color: #f5f5f5;
  }
`;
export default function MrakdownRender({ content }) {
  return (
    <Styled>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Styled>
  );
}
