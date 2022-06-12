"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[515],{8648:(e,s,o)=>{o.d(s,{Z:()=>c});var r=o(7313),i=o(4901),t=o(9184),a=o(6417);const n=t.ZP.div`
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
`,l=t.ZP.input`
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
`;function c(e){let{type:s="text",prefix:o="",className:t,...c}=e;const[d,p]=(0,r.useState)(s);return"password"==s?(0,a.jsxs)(n,{className:t,children:[(0,a.jsx)(l,{type:d,className:`inner ${t}`,...c}),(0,a.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==d?(0,a.jsx)(i.MBb,{color:"#78787c"}):(0,a.jsx)(i.Rbo,{color:"#78787c"})})]}):o?(0,a.jsxs)(n,{className:t,children:[(0,a.jsx)("span",{className:"prefix",children:o}),(0,a.jsx)(l,{className:`inner ${t}`,type:d,...c})]}):(0,a.jsx)(l,{type:d,className:t,...c})}},1578:(e,s,o)=>{o.r(s),o.d(s,{default:()=>h});var r=o(7313),i=o(7890),t=o(3657),a=o(2867);const n=o(9184).ZP.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form {
    max-width: 440px;
    padding: 32px 40px 32px 40px;
    /* border: 1px solid #eee; */
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
    border-radius: 12px;
    .tips {
      display: flex;
      flex-direction: column;
      align-items: center;
      .logo {
        width: 56px;
        height: 56px;
        margin-bottom: 28px;
        border-radius: 50%;
      }
      .title {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #101828;
        margin-bottom: 8px;
      }
      .desc {
        text-align: center;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #667085;
        margin-bottom: 24px;
      }
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 360px;
    }
    .or {
      border: none;
      position: relative;
      height: 1px;
      background-color: #e4e7ec;
      margin: 26px 0;
      &:after {
        padding: 4px;
        background-color: #fff;
        content: "OR";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        font-size: 14px;
        line-height: 20px;
        color: #667085;
      }
    }
    button {
      width: 100%;
    }
  }
`;var l=o(8648),c=o(1296),d=o(1864),p=o(6417);function x(e){let{email:s,reset:o}=e;return(0,p.jsxs)("div",{className:"tips",children:[(0,p.jsx)("h2",{className:"title",children:"Check your email"}),(0,p.jsxs)("span",{className:"desc",children:["We\u2019ve sent you a magic link to ",s,". Click on the link to continue."]}),(0,p.jsx)(c.Z,{onClick:o,className:"main flex",children:"Use a different email"})]})}function h(){const[e,s]=(0,r.useState)(!1),[o,{isSuccess:h,isLoading:u,error:f}]=(0,d.Wm)(),g=(0,i.s0)(),[m,b]=(0,r.useState)("");(0,r.useEffect)((()=>{h&&(t.ZP.success("Send Email Successfully!"),s(!0))}),[h]),(0,r.useEffect)((()=>{if(f)switch(f.status){case"PARSING_ERROR":t.ZP.error(f.data);break;case 401:t.ZP.error("username or password incorrect");break;case 404:t.ZP.error("account not exsit");break;default:t.ZP.error("something error")}else;}),[f]);return(0,p.jsx)(n,{children:(0,p.jsx)("div",{className:"form",children:e?(0,p.jsx)(x,{email:m,reset:()=>{b(""),s(!1)}}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{className:"tips",children:[(0,p.jsx)("img",{src:`${a.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,p.jsx)("h2",{className:"title",children:"Login to Rustchat"}),(0,p.jsx)("span",{className:"desc",children:"Please enter your Email"})]}),(0,p.jsxs)("form",{onSubmit:e=>{e.preventDefault(),o(m)},children:[(0,p.jsx)(l.Z,{type:"email",className:"large",name:"email",autoFocus:!0,value:m,required:!0,placeholder:"Enter your email",onChange:e=>{const{value:s}=e.target;b(s)}}),(0,p.jsx)(c.Z,{type:"submit",disabled:u||!m,children:u?"Sending":"Continue with Email"})]}),(0,p.jsx)("hr",{className:"or"}),(0,p.jsx)(c.Z,{onClick:()=>{g("/login")},children:"Sign in with Password"})]})})})}}}]);