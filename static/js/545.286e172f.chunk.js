"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[545],{45545:(e,o,t)=>{t.r(o),t.d(o,{default:()=>f});var i=t(70537),n=t(3074);const r=t(57889).ZP.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form {
    padding: 36px 40px 32px 40px;
    /* border: 1px solid #eee; */
    box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
    border-radius: 12px;
    .tips {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 24px;
      .logo {
        width: 56px;
        height: 56px;
        margin-bottom: 28px;
      }
      .title {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #101828;
        margin-bottom: 8px;
      }
    }
    .desc {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #667085;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      input {
        width: 360px;
        background: #ffffff;
        border: 1px solid #d0d5dd;
        box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;
        padding: 10px 14px;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #667085;
      }
    }
    .btn {
      display: inline-block;
      text-align: center;
      width: 100%;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
      padding: 10px;
      background: #1fe1f9;
      border: 1px solid #1fe1f9;
      box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 8px;
      &.google {
        color: #344054;
        border-color: #d0d5dd;
        background: none;
      }
    }
  }
`;var p=t(15924),d=t(15312),x=t(27418),s=t(21645),a=t(14566),l=t(80683);function f(){const{t:e}=(0,a.$G)(),[o,{data:t,isSuccess:f,isError:c}]=(0,d.YA)(),{token:g}=(0,p.UO)(),[h,b]=(0,i.useState)(!0),[u,m]=(0,i.useState)(null),w=(0,n.I0)(),k=(0,p.s0)();return(0,i.useEffect)((()=>{setTimeout((()=>{g?o({key:g,type:"thirdparty"}):m("Token Not Found")}),1500)}),[g]),(0,i.useEffect)((()=>{c&&m("Something Error")}),[c]),(0,i.useEffect)((()=>{f&&t&&(b(!1),x.ZP.success(e("tip.login")),w((0,s.A3)(t)),k("/"))}),[f,t]),(0,l.jsxs)(r,{children:[h?"loading":"",u]})}}}]);