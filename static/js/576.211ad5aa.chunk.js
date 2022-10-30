"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[576],{9571:(e,s,c)=>{c.r(s),c.d(s,{default:()=>b});var i=c(5924),t=c(537),n=c(7889),o=c(5809),a=c(1892),r=c(9885);const d=c.p+"static/media/check.0e75fc4e5a0b2b49cbd1.png";var l=c(683);const h=n.ZP.section`
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
`,u=e=>{let{sid:s}=e;const c=(0,i.s0)(),{upsertLicense:n,upserting:u,upserted:g}=(0,a.Z)(),[f,{data:p,isError:x,isLoading:w,isSuccess:m}]=(0,o.YS)();(0,t.useEffect)((()=>{s&&f(s)}),[s]),(0,t.useEffect)((()=>{if(m&&p){const e=p.license;n(e)}}),[p,m]);return(0,l.jsxs)(h,{children:[(0,l.jsx)("img",{className:"check",src:d,alt:"check icon"}),(0,l.jsx)("h1",{className:"head",children:"Payment Success!"}),(0,l.jsxs)("p",{className:"desc",children:[u?"Renewing the License, do not close the window!":"",g?"Renew the License Successfully!":"",x?"Invalided Stripe Session ID":""]}),(0,l.jsx)(r.Z,{disabled:w||u,className:"back",onClick:()=>{c("/")},children:"Back Home"})]})};var g=c(308),f=c(5312),p=c(7418);const x=n.ZP.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .success{
        font-size: 30px;
        font-weight: bold;
        color: green;
    }
`,w=e=>{let{code:s,from:c="webapp"}=e;const i=localStorage.getItem(g.LJ),[n,{isLoading:o,isSuccess:a,error:r}]=(0,f.YA)();return(0,t.useEffect)((()=>{s&&n({magic_token:i,code:s,type:"github"})}),[s]),(0,t.useEffect)((()=>{a&&(p.ZP.success("Login Successfully"),"widget"==c&&localStorage.setItem("widget",`${(new Date).getTime()}`))}),[a,c]),(0,t.useEffect)((()=>{if(r)if(410===r.status)p.ZP.error("No associated account found, please user admin for an invitation link to join.");else p.ZP.error("Something Error");else;}),[r]),r?(0,l.jsx)("span",{children:"Something Error"}):(0,l.jsxs)(x,{children:[a&&"widget"==c&&(0,l.jsx)("h1",{children:"Please close this window and return widget window"}),(0,l.jsx)("span",{className:"success",children:o?"Github Logging in...":"Github Login Success!"})]})},m=n.ZP.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  word-break: break-word;
  line-height: 1.5;
`;function b(){const{type:e="",payload:s=""}=(0,i.UO)();if("payment_success"==e)return(0,l.jsx)(m,{children:(0,l.jsx)(u,{sid:s})});if("github"==e){var c;const e=null!==(c=new URLSearchParams(location.search).get("code"))&&void 0!==c?c:"";return(0,l.jsx)(m,{children:(0,l.jsx)(w,{code:e,from:s})})}return(0,l.jsx)(m,{children:"callback page"})}}}]);