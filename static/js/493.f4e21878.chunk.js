"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[493],{1892:(e,s,c)=>{c.d(s,{Z:()=>t});var i=c(5809),n=c(3986);const t=()=>{var e;const s=(0,n.CG)((e=>e.users.ids.length)),{data:c}=(0,i.qM)(),[t,{isLoading:a,isSuccess:d}]=(0,i.U_)(),[r,{isSuccess:l,isLoading:o}]=(0,i.yn)();return{reachLimit:s>=(null!==(e=null===c||void 0===c?void 0:c.user_limit)&&void 0!==e?e:0),license:c,checked:d,checking:a,upserting:o,upserted:l,checkLicense:e=>{t(e)},upsertLicense:async e=>{const s=await t(e);return!(!("data"in s)||!s.data.sign)&&await r(e)}}}},3458:(e,s,c)=>{c.r(s),c.d(s,{default:()=>g});var i=c(5924),n=c(537),t=c(7889),a=c(5809),d=c(1892),r=c(9885);const l=c.p+"static/media/check.0e75fc4e5a0b2b49cbd1.png";var o=c(683);const h=t.ZP.section`
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
`,u=e=>{let{sid:s}=e;const c=(0,i.s0)(),{upsertLicense:t,upserting:u,upserted:p}=(0,d.Z)(),[g,{data:x,isError:f,isLoading:k,isSuccess:b}]=(0,a.YS)();(0,n.useEffect)((()=>{s&&g(s)}),[s]),(0,n.useEffect)((()=>{if(b&&x){const e=x.license;t(e)}}),[x,b]);return(0,o.jsxs)(h,{children:[(0,o.jsx)("img",{className:"check",src:l,alt:"check icon"}),(0,o.jsx)("h1",{className:"head",children:"Payment Success!"}),(0,o.jsxs)("p",{className:"desc",children:[u?"Renewing the License, do not close the window!":"",p?"Renew the License Successfully!":"",f?"Invalided Stripe Session ID":""]}),(0,o.jsx)(r.Z,{disabled:k||u,className:"back",onClick:()=>{c("/")},children:"Back Home"})]})},p=t.ZP.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  word-break: break-word;
  line-height: 1.5;
`;function g(){const{type:e="",payload:s=""}=(0,i.UO)();return"payment_success"==e?(0,o.jsx)(p,{children:(0,o.jsx)(u,{sid:s})}):(0,o.jsx)(p,{children:"callback page"})}}}]);