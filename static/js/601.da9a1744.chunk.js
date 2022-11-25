"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[601],{17237:(e,s,o)=>{o.d(s,{Z:()=>c});var r=o(70537),i=o(40182),a=o(57889),t=o(80683);const n=a.ZP.div`
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
`,l=a.ZP.input`
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
`,c=e=>{let{type:s="text",prefix:o="",className:a,...c}=e;const[d,p]=(0,r.useState)(s);return"password"==s?(0,t.jsxs)(n,{className:a,children:[(0,t.jsx)(l,{type:d,className:`inner ${a}`,...c}),(0,t.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==d?(0,t.jsx)(i.MBb,{color:"#78787c"}):(0,t.jsx)(i.Rbo,{color:"#78787c"})})]}):o?(0,t.jsxs)(n,{className:a,children:[(0,t.jsx)("span",{className:"prefix",children:o}),(0,t.jsx)(l,{className:`inner ${a}`,type:d,...c})]}):(0,t.jsx)(l,{type:d,className:a,...c})}},59601:(e,s,o)=>{o.r(s),o.d(s,{default:()=>g});var r=o(70537),i=o(15924),a=o(27418),t=o(80308);const n=o(57889).ZP.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form {
    max-width: 440px;
    padding: 32px 40px 32px 40px;
    box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
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
`;var l=o(17237),c=o(69885),d=o(15312),p=o(71893),x=o(80683);const h=e=>{let{email:s,reset:o}=e;const{t:r}=(0,p.$)("auth");return(0,x.jsxs)("div",{className:"tips",children:[(0,x.jsx)("h2",{className:"title",children:r("check_email")}),(0,x.jsx)("span",{className:"desc",children:r("check_email_desc",{email:s})}),(0,x.jsx)(c.Z,{onClick:o,className:"main flex",children:r("use_different")})]})};function g(){const{t:e}=(0,p.$)("auth"),[s,o]=(0,r.useState)(!1),[g,{isSuccess:f,isLoading:m,error:u}]=(0,d.wi)(),b=(0,i.s0)(),[w,j]=(0,r.useState)("");(0,r.useEffect)((()=>{f&&(a.ZP.success("Send Email Successfully!"),o(!0))}),[f]),(0,r.useEffect)((()=>{if(u&&"status"in u)switch(u.status){case"PARSING_ERROR":a.ZP.error(u.data);break;case 401:a.ZP.error("Username or Password Incorrect");break;case 404:a.ZP.error("Account not exist");break;default:a.ZP.error("Something Error")}else;}),[u]);return(0,x.jsx)(n,{children:(0,x.jsx)("div",{className:"form",children:s?(0,x.jsx)(h,{email:w,reset:()=>{j(""),o(!1)}}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"tips",children:[(0,x.jsx)("img",{src:`${t.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,x.jsx)("h2",{className:"title",children:e("login.title")}),(0,x.jsx)("span",{className:"desc",children:e("placeholder_email")})]}),(0,x.jsxs)("form",{onSubmit:e=>{e.preventDefault(),g(w)},children:[(0,x.jsx)(l.Z,{type:"email",className:"large",name:"email",autoFocus:!0,value:w,required:!0,placeholder:e("placeholder_email"),onChange:e=>{const{value:s}=e.target;j(s)}}),(0,x.jsx)(c.Z,{type:"submit",disabled:m||!w,children:m?"Sending":e("continue")})]}),(0,x.jsx)("hr",{className:"or"}),(0,x.jsx)(c.Z,{onClick:()=>{b("/login")},children:e("login.password")})]})})})}}}]);