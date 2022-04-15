// import React from 'react'
import { createGlobalStyle } from "styled-components";

const MarkdownOverrides = createGlobalStyle`
[class^='toastui-editor-']{
  .toastui-editor-md-container{
      border-bottom: none;
    .toastui-editor-md-splitter{
      background-color:#D0D5DD ;
    }
    .ProseMirror{
      height: 100%;
    }
  }
    *{
        margin: 0 ;
        padding: 0;
    }
    p {
        margin:0 ;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #475467;
    margin-bottom: 16px;
  }
  a{
      background-color: transparent;
  }
  pre{
    width: 100%;
    width: -webkit-fill-available;
  }
  blockquote {
      border-left:none;
    display: flex;
    margin-top:0;
    margin-bottom: 10px;
    padding: 0;
    padding: 16px;
    color: #98a2b3;
    opacity: 0.8;
    box-shadow: inset 2px 0px 0px #a8b0bd;
    display: flex;
    align-items: center;
    > p{
      padding-right: 10px ;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 0;
    }
    > blockquote{
      padding: 14px;
    }
  }
  img{
    cursor: pointer;
      max-width:300px;
  }
  ul {
     white-space: nowrap;
      margin-top:0;
      margin-bottom:10px;
      /* display: flex;
      flex-direction:column;
      margin-left: 20px; */
      > li:before{
        margin-top: 8px;
        margin-left: -14px;
        background-color: #475467;
      }
    /* list-style-type: disc; */

  }
  ul,
  ol {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #475467;
    /* list-style-position: inside; */
  }
  h1,
  h2,
  h3,[class*='heading']{
    margin-block-start: 0;
    margin-block-end: 0;
      padding: 0;
      margin: 0;
      border-bottom: none;
      font-weight: 700;
      color: #475467;
  }
  h1,[class*='heading1'] {
    margin-top: 0 !important;
    font-size: 24px;
    line-height: 32px;
  }
  h2,[class*='heading2'] {
    font-size: 20px;
    line-height: 30px;
  }
  h3,[class*='heading3'] {
    font-size: 16px;
    line-height: 24px;
  }
}
`;

export default MarkdownOverrides;
