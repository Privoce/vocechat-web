"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[85],{4085:(e,s,t)=>{t.r(s),t.d(s,{default:()=>p});var i=t(7313),a=t(7890),r=t(6059),o=t(7935);const n=t(9184).ZP.div`
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
`;var l=t(4050),c=t(1140),d=t(2509),x=t(6417);const h=e=>{let{email:s,reset:t}=e;return(0,x.jsxs)("div",{className:"tips",children:[(0,x.jsx)("h2",{className:"title",children:"Check your email"}),(0,x.jsxs)("span",{className:"desc",children:["We\u2019ve sent you a magic link to ",s,". Click on the link to continue."]}),(0,x.jsx)(c.Z,{onClick:t,className:"main flex",children:"Use a different email"})]})};function p(){const[e,s]=(0,i.useState)(!1),[t,{isSuccess:p,isLoading:m,error:u}]=(0,d.wi)(),g=(0,a.s0)(),[f,b]=(0,i.useState)("");(0,i.useEffect)((()=>{p&&(r.ZP.success("Send Email Successfully!"),s(!0))}),[p]),(0,i.useEffect)((()=>{if(u&&"status"in u)switch(u.status){case"PARSING_ERROR":r.ZP.error(u.data);break;case 401:r.ZP.error("Username or Password Incorrect");break;case 404:r.ZP.error("Account not exist");break;default:r.ZP.error("Something Error")}else;}),[u]);return(0,x.jsx)(n,{children:(0,x.jsx)("div",{className:"form",children:e?(0,x.jsx)(h,{email:f,reset:()=>{b(""),s(!1)}}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"tips",children:[(0,x.jsx)("img",{src:`${o.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,x.jsx)("h2",{className:"title",children:"Login to VoceChat"}),(0,x.jsx)("span",{className:"desc",children:"Please enter your Email"})]}),(0,x.jsxs)("form",{onSubmit:e=>{e.preventDefault(),t(f)},children:[(0,x.jsx)(l.Z,{type:"email",className:"large",name:"email",autoFocus:!0,value:f,required:!0,placeholder:"Enter your email",onChange:e=>{const{value:s}=e.target;b(s)}}),(0,x.jsx)(c.Z,{type:"submit",disabled:m||!f,children:m?"Sending":"Continue with Email"})]}),(0,x.jsx)("hr",{className:"or"}),(0,x.jsx)(c.Z,{onClick:()=>{g("/login")},children:"Sign in with Password"})]})})})}}}]);