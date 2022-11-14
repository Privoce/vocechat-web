"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[576],{99571:(e,s,c)=>{c.r(s),c.d(s,{default:()=>m});var t=c(15924),i=c(70537),n=c(57889),a=c(65809),o=c(51892),r=c(69885);const d=c.p+"static/media/check.0e75fc4e5a0b2b49cbd1.png";var l=c(80683);const h=n.ZP.section`
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
`,u=e=>{let{sid:s}=e;const c=(0,t.s0)(),{upsertLicense:n,upserting:u,upserted:g}=(0,o.Z)(),[f,{data:p,isError:x,isLoading:w,isSuccess:m}]=(0,a.YS)();(0,i.useEffect)((()=>{s&&f(s)}),[s]),(0,i.useEffect)((()=>{if(m&&p){const e=p.license;n(e)}}),[p,m]);return(0,l.jsxs)(h,{children:[(0,l.jsx)("img",{className:"check",src:d,alt:"check icon"}),(0,l.jsx)("h1",{className:"head",children:"Payment Success!"}),(0,l.jsxs)("p",{className:"desc",children:[u?"Renewing the License, do not close the window!":"",g?"Renew the License Successfully!":"",x?"Invalided Stripe Session ID":""]}),(0,l.jsx)(r.Z,{disabled:w||u,className:"back",onClick:()=>{c("/")},children:"Back Home"})]})};var g=c(80308),f=c(15312),p=c(27418);const x=e=>{let{code:s,from:c="webapp"}=e;const t=localStorage.getItem(g.LJ),[n,{isLoading:a,isSuccess:o,error:r}]=(0,f.YA)();return(0,i.useEffect)((()=>{s&&n({magic_token:t,code:s,type:"github"})}),[s]),(0,i.useEffect)((()=>{o&&(p.ZP.success("Login Successfully"),"widget"==c&&localStorage.setItem("widget",`${(new Date).getTime()}`),"webapp"==c&&(location.href="/"))}),[o,c]),(0,i.useEffect)((()=>{if(r)if(410===r.status)p.ZP.error("No associated account found, please user admin for an invitation link to join.");else p.ZP.error("Something Error");else;}),[r]),r?(0,l.jsx)("span",{children:"Something Error"}):(0,l.jsxs)("section",{className:"flex flex-col gap-3 justify-center items-center",children:[o&&"widget"==c&&(0,l.jsx)("h1",{children:"Please close this window and return widget window"}),(0,l.jsx)("span",{className:"text-3xl text-green-600 font-bold",children:a?"Github Logging in...":"Github Login Success!"})]})},w=n.ZP.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  word-break: break-word;
  line-height: 1.5;
`;function m(){const{type:e="",payload:s=""}=(0,t.UO)();if("payment_success"==e)return(0,l.jsx)(w,{children:(0,l.jsx)(u,{sid:s})});if("github"==e){var c;const e=null!==(c=new URLSearchParams(location.search).get("code"))&&void 0!==c?c:"";return(0,l.jsx)(w,{children:(0,l.jsx)(x,{code:e,from:s})})}return(0,l.jsx)(w,{children:"callback page"})}}}]);