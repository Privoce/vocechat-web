"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[576],{51892:(e,s,t)=>{t.d(s,{Z:()=>a});var c=t(70537),i=t(65809),n=t(66160);const a=()=>{var e;const{userCount:s,isGuest:t}=(0,n.CG)((e=>({userCount:e.users.ids.length,isGuest:e.authData.guest}))),{data:a,refetch:r}=(0,i.qM)(void 0,{refetchOnMountOrArgChange:!0,skip:t}),[o,{isLoading:d,isSuccess:l}]=(0,i.U_)(),[u,{isSuccess:h,isLoading:g,reset:f}]=(0,i.yn)();(0,c.useEffect)((()=>{h&&(r(),f())}),[h]);return{reachLimit:s>=(null!==(e=null===a||void 0===a?void 0:a.user_limit)&&void 0!==e?e:Number.MAX_SAFE_INTEGER),license:a,checked:l,checking:d,upserting:g,upserted:h,checkLicense:e=>{o(e)},upsertLicense:async e=>{const s=await o(e);return!(!("data"in s)||!s.data.sign)&&await u(e)}}}},99571:(e,s,t)=>{t.r(s),t.d(s,{default:()=>m});var c=t(15924),i=t(70537),n=t(57889),a=t(65809),r=t(51892),o=t(69885);const d=t.p+"static/media/check.0e75fc4e5a0b2b49cbd1.png";var l=t(80683);const u=n.ZP.section`
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
`,h=e=>{let{sid:s}=e;const t=(0,c.s0)(),{upsertLicense:n,upserting:h,upserted:g}=(0,r.Z)(),[f,{data:p,isError:x,isLoading:w,isSuccess:m}]=(0,a.YS)();(0,i.useEffect)((()=>{s&&f(s)}),[s]),(0,i.useEffect)((()=>{if(m&&p){const e=p.license;n(e)}}),[p,m]);return(0,l.jsxs)(u,{children:[(0,l.jsx)("img",{className:"check",src:d,alt:"check icon"}),(0,l.jsx)("h1",{className:"head",children:"Payment Success!"}),(0,l.jsxs)("p",{className:"desc",children:[h?"Renewing the License, do not close the window!":"",g?"Renew the License Successfully!":"",x?"Invalided Stripe Session ID":""]}),(0,l.jsx)(o.Z,{disabled:w||h,className:"back",onClick:()=>{t("/")},children:"Back Home"})]})};var g=t(80308),f=t(15312),p=t(27418);const x=e=>{let{code:s,from:t="webapp"}=e;const c=localStorage.getItem(g.LJ),[n,{isLoading:a,isSuccess:r,error:o}]=(0,f.YA)();return(0,i.useEffect)((()=>{s&&n({magic_token:c,code:s,type:"github"})}),[s]),(0,i.useEffect)((()=>{r&&(p.ZP.success("Login Successfully"),"widget"==t&&localStorage.setItem("widget",`${(new Date).getTime()}`),"webapp"==t&&(location.href="/"))}),[r,t]),(0,i.useEffect)((()=>{if(o)if(410===o.status)p.ZP.error("No associated account found, please contact user admin for an invitation link to join.");else p.ZP.error("Something Error");else;}),[o]),o?(0,l.jsx)("span",{children:"Something Error"}):(0,l.jsxs)("section",{className:"flex flex-col gap-3 justify-center items-center",children:[r&&"widget"==t&&(0,l.jsx)("h1",{children:"Please close this window and return widget window"}),(0,l.jsx)("span",{className:"text-3xl text-green-600 font-bold",children:a?"Github Logging in...":"Github Login Success!"})]})},w=n.ZP.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  word-break: break-word;
  line-height: 1.5;
`;function m(){const{type:e="",payload:s=""}=(0,c.UO)();if("payment_success"==e)return(0,l.jsx)(w,{children:(0,l.jsx)(h,{sid:s})});if("github"==e){var t;const e=null!==(t=new URLSearchParams(location.search).get("code"))&&void 0!==t?t:"";return(0,l.jsx)(w,{children:(0,l.jsx)(x,{code:e,from:s})})}return(0,l.jsx)(w,{children:"callback page"})}}}]);