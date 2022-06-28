"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[902],{6902:(e,o,t)=>{t.r(o),t.d(o,{default:()=>a});var i=t(7313),r=t(3709);const n=t(9184).ZP.div`
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
`;var p=t(7890),d=t(2509),x=t(3657),s=t(1057),l=t(6417);function a(){const[e,{data:o,isSuccess:t,isError:a,error:f}]=(0,d.YA)(),{token:c}=(0,p.UO)(),[g,h]=(0,i.useState)(!0),[u,b]=(0,i.useState)(null),m=(0,r.I0)(),w=(0,p.s0)();return(0,i.useEffect)((()=>{setTimeout((()=>{c?e({key:c,type:"thirdparty"}):b("Token Not Found")}),1500)}),[c]),(0,i.useEffect)((()=>{a&&b(f)}),[a,f]),(0,i.useEffect)((()=>{t&&o&&(h(!1),x.ZP.success("Login Successfully"),m((0,s.A3)(o)),w("/"))}),[t,o]),(0,l.jsxs)(n,{children:[g?"loading":"",u]})}}}]);