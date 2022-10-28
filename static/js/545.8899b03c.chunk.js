"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[545],{5545:(e,o,t)=>{t.r(o),t.d(o,{default:()=>a});var i=t(537),n=t(3074);const r=t(7889).ZP.div`
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
`;var p=t(5924),d=t(5312),x=t(7418),s=t(1645),l=t(683);function a(){const[e,{data:o,isSuccess:t,isError:a}]=(0,d.YA)(),{token:f}=(0,p.UO)(),[c,g]=(0,i.useState)(!0),[h,u]=(0,i.useState)(null),b=(0,n.I0)(),m=(0,p.s0)();return(0,i.useEffect)((()=>{setTimeout((()=>{f?e({key:f,type:"thirdparty"}):u("Token Not Found")}),1500)}),[f]),(0,i.useEffect)((()=>{a&&u("Something Error")}),[a]),(0,i.useEffect)((()=>{t&&o&&(g(!1),x.ZP.success("Login Successfully"),b((0,s.A3)(o)),m("/"))}),[t,o]),(0,l.jsxs)(r,{children:[c?"loading":"",h]})}}}]);