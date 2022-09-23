"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[493],{3458:(e,s,c)=>{c.r(s),c.d(s,{default:()=>x});var i=c(5924),n=c(537),t=c(7889),a=c(5809),d=c(1892),l=c(9885);const o=c.p+"static/media/check.0e75fc4e5a0b2b49cbd1.png";var r=c(683);const h=t.ZP.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 512px;
  background: #f3f4f6;
  border-radius: 20px;
  .check {
    width: 120px;
    height: 120px;
  }
  .head {
    font-weight: bold;
    font-size: 32px;
    padding-top: 20px;
  }
  .desc {
    font-size: 18px;
    color: #999;
    padding: 0 0 30px 0;
  }
`,p=e=>{let{sid:s}=e;const c=(0,i.s0)(),{upsertLicense:t,upserting:p,upserted:u}=(0,d.Z)(),[x,{data:f,isError:g,isLoading:b,isSuccess:k}]=(0,a.YS)();(0,n.useEffect)((()=>{s&&x(s)}),[s]),(0,n.useEffect)((()=>{if(k&&f){const e=f.license;t(e)}}),[f,k]);return(0,r.jsxs)(h,{children:[(0,r.jsx)("img",{className:"check",src:o,alt:"check icon"}),(0,r.jsx)("h1",{className:"head",children:"Payment Success!"}),(0,r.jsxs)("p",{className:"desc",children:[p?"Renewing the License, do not close the window!":"",u?"Renew the License Successfully!":"",g?"Invalided Stripe Session ID":""]}),(0,r.jsx)(l.Z,{disabled:b||p,className:"back",onClick:()=>{c("/")},children:"Back Home"})]})},u=t.ZP.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  word-break: break-word;
  line-height: 1.5;
`;function x(){const{type:e="",payload:s=""}=(0,i.UO)();return"payment_success"==e?(0,r.jsx)(u,{children:(0,r.jsx)(p,{sid:s})}):(0,r.jsx)(u,{children:"callback page"})}}}]);