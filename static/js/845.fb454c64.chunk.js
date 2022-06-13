"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[845],{8648:(e,o,s)=>{s.d(o,{Z:()=>p});var r=s(7313),n=s(887),a=s(9184),t=s(6417);const i=a.ZP.div`
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
  .prefix {
    padding: 8px 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #9ca3af;
    background: #f3f4f6;
    border-right: 1px solid #e5e7eb;
  }
  .view {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`,d=a.ZP.input`
  width: 100%;
  background: #ffffff;

  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  padding: 8px;
  outline: none;
  &:not(.inner) {
    border-radius: 4px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
  }
  &.large {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 11px 8px;
  }
  &.none {
    outline: none;
    border: none;
    background: none;
    box-shadow: none;
  }
  &:disabled {
    color: #78787c;
    background-color: #f9fafb;
  }
  &::placeholder {
    color: #d1d5db;
  }
  &[type="password"] {
    padding-right: 30px;
  }
`;function p(e){let{type:o="text",prefix:s="",className:a,...p}=e;const[l,c]=(0,r.useState)(o);return"password"==o?(0,t.jsxs)(i,{className:a,children:[(0,t.jsx)(d,{type:l,className:`inner ${a}`,...p}),(0,t.jsx)("div",{className:"view",onClick:()=>{c((e=>"password"==e?"text":"password"))},children:"password"==l?(0,t.jsx)(n.MBb,{color:"#78787c"}):(0,t.jsx)(n.Rbo,{color:"#78787c"})})]}):s?(0,t.jsxs)(i,{className:a,children:[(0,t.jsx)("span",{className:"prefix",children:s}),(0,t.jsx)(d,{className:`inner ${a}`,type:l,...p})]}):(0,t.jsx)(d,{type:l,className:a,...p})}},3845:(e,o,s)=>{s.r(o),s.d(o,{default:()=>i});var r=s(7313),n=s(8648),a=s(1296),t=s(6417);function i(){const[e,o]=(0,r.useState)("");return(0,t.jsxs)("form",{onSubmit:e=>{e.preventDefault()},children:[(0,t.jsx)(n.Z,{className:"large",name:"username",value:e,required:!0,placeholder:"Enter your Name22",onChange:e=>{const{value:s}=e.target;o(s)}}),(0,t.jsx)(a.Z,{type:"submit",children:isLoading?"Sending":"Register"})]})}}}]);