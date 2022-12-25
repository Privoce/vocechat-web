"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[601],{59601:(e,s,t)=>{t.r(s),t.d(s,{default:()=>u});var a=t(70537),i=t(15924),r=t(27418),l=t(80308);const o=t(57889).ZP.div`
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
      overflow: visible;
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
`;var n=t(17237),c=t(69885),d=t(15312),x=t(14566),p=t(80683);const h=e=>{let{email:s,reset:t}=e;const{t:a}=(0,x.$G)("auth");return(0,p.jsxs)("div",{className:"tips",children:[(0,p.jsx)("h2",{className:"title",children:a("check_email")}),(0,p.jsx)("span",{className:"desc",children:a("check_email_desc",{email:s})}),(0,p.jsx)(c.Z,{onClick:t,className:"main flex",children:a("use_different")})]})};var m=t(44917);function u(){const{t:e}=(0,x.$G)("auth"),[s,t]=(0,a.useState)(!1),[u,{isSuccess:g,isLoading:f,error:b}]=(0,d.wi)(),j=(0,i.s0)(),[v,w]=(0,a.useState)("");(0,a.useEffect)((()=>{g&&(r.ZP.success("Send Email Successfully!"),t(!0))}),[g]),(0,a.useEffect)((()=>{if(b&&"status"in b)switch(b.status){case"PARSING_ERROR":r.ZP.error(b.data);break;case 401:r.ZP.error("Username or Password Incorrect");break;case 404:r.ZP.error("Account not exist");break;default:r.ZP.error("Something Error")}else;}),[b]);return(0,p.jsx)(o,{children:(0,p.jsx)("div",{className:"form",children:s?(0,p.jsx)(h,{email:v,reset:()=>{w(""),t(!1)}}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{className:"tips",children:[(0,p.jsx)("img",{src:`${l.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,p.jsx)("h2",{className:"title",children:e("login.title")}),(0,p.jsx)("span",{className:"desc",children:e("placeholder_email")})]}),(0,p.jsxs)("form",{onSubmit:e=>{e.preventDefault(),u(v)},children:[(0,p.jsx)(n.Z,{type:"email",className:"large",name:"email",autoFocus:!0,value:v,required:!0,placeholder:e("placeholder_email"),onChange:e=>{const{value:s}=e.target;w(s)}}),(0,p.jsx)(c.Z,{type:"submit",disabled:f||!v,children:f?"Sending":e("continue")})]}),(0,p.jsx)("hr",{className:"or"}),(0,p.jsx)("div",{className:"flex flex-col gap-3 py-3",children:(0,p.jsx)(m.Z,{})}),(0,p.jsx)(c.Z,{onClick:()=>{j("/login")},children:e("login.password")})]})})})}}}]);