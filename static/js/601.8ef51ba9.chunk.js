"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[601],{59601:(e,s,t)=>{t.r(s),t.d(s,{default:()=>m});var a=t(70537),i=t(15924),r=t(27418),o=t(80308);const l=t(57889).ZP.div`
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
`;var n=t(3022),c=t(69885),d=t(15312),x=t(71893),h=t(80683);const p=e=>{let{email:s,reset:t}=e;const{t:a}=(0,x.$)("auth");return(0,h.jsxs)("div",{className:"tips",children:[(0,h.jsx)("h2",{className:"title",children:a("check_email")}),(0,h.jsx)("span",{className:"desc",children:a("check_email_desc",{email:s})}),(0,h.jsx)(c.Z,{onClick:t,className:"main flex",children:a("use_different")})]})};function m(){const{t:e}=(0,x.$)("auth"),[s,t]=(0,a.useState)(!1),[m,{isSuccess:u,isLoading:g,error:f}]=(0,d.wi)(),b=(0,i.s0)(),[j,w]=(0,a.useState)("");(0,a.useEffect)((()=>{u&&(r.ZP.success("Send Email Successfully!"),t(!0))}),[u]),(0,a.useEffect)((()=>{if(f&&"status"in f)switch(f.status){case"PARSING_ERROR":r.ZP.error(f.data);break;case 401:r.ZP.error("Username or Password Incorrect");break;case 404:r.ZP.error("Account not exist");break;default:r.ZP.error("Something Error")}else;}),[f]);return(0,h.jsx)(l,{children:(0,h.jsx)("div",{className:"form",children:s?(0,h.jsx)(p,{email:j,reset:()=>{w(""),t(!1)}}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"tips",children:[(0,h.jsx)("img",{src:`${o.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,h.jsx)("h2",{className:"title",children:e("login.title")}),(0,h.jsx)("span",{className:"desc",children:e("placeholder_email")})]}),(0,h.jsxs)("form",{onSubmit:e=>{e.preventDefault(),m(j)},children:[(0,h.jsx)(n.Z,{type:"email",className:"large",name:"email",autoFocus:!0,value:j,required:!0,placeholder:e("placeholder_email"),onChange:e=>{const{value:s}=e.target;w(s)}}),(0,h.jsx)(c.Z,{type:"submit",disabled:g||!j,children:g?"Sending":e("continue")})]}),(0,h.jsx)("hr",{className:"or"}),(0,h.jsx)(c.Z,{onClick:()=>{b("/login")},children:e("login.password")})]})})})}}}]);