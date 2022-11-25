"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[576],{51892:(e,s,i)=>{i.d(s,{Z:()=>n});var t=i(65809),c=i(66160);const n=()=>{var e;const{userCount:s,isGuest:i}=(0,c.CG)((e=>({userCount:e.users.ids.length,isGuest:e.authData.guest}))),{data:n}=(0,t.qM)(void 0,{refetchOnMountOrArgChange:!0,skip:i}),[a,{isLoading:r,isSuccess:o}]=(0,t.U_)(),[d,{isSuccess:l,isLoading:u}]=(0,t.yn)();return{reachLimit:s>=(null!==(e=null===n||void 0===n?void 0:n.user_limit)&&void 0!==e?e:Number.MAX_SAFE_INTEGER),license:n,checked:o,checking:r,upserting:u,upserted:l,checkLicense:e=>{a(e)},upsertLicense:async e=>{const s=await a(e);return!(!("data"in s)||!s.data.sign)&&await d(e)}}}},99571:(e,s,i)=>{i.r(s),i.d(s,{default:()=>m});var t=i(15924),c=i(70537),n=i(57889),a=i(65809),r=i(51892),o=i(69885);const d=i.p+"static/media/check.0e75fc4e5a0b2b49cbd1.png";var l=i(80683);const u=n.ZP.section`
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
`,h=e=>{let{sid:s}=e;const i=(0,t.s0)(),{upsertLicense:n,upserting:h,upserted:g}=(0,r.Z)(),[p,{data:f,isError:x,isLoading:w,isSuccess:m}]=(0,a.YS)();(0,c.useEffect)((()=>{s&&p(s)}),[s]),(0,c.useEffect)((()=>{if(m&&f){const e=f.license;n(e)}}),[f,m]);return(0,l.jsxs)(u,{children:[(0,l.jsx)("img",{className:"check",src:d,alt:"check icon"}),(0,l.jsx)("h1",{className:"head",children:"Payment Success!"}),(0,l.jsxs)("p",{className:"desc",children:[h?"Renewing the License, do not close the window!":"",g?"Renew the License Successfully!":"",x?"Invalided Stripe Session ID":""]}),(0,l.jsx)(o.Z,{disabled:w||h,className:"back",onClick:()=>{i("/")},children:"Back Home"})]})};var g=i(80308),p=i(15312),f=i(27418);const x=e=>{let{code:s,from:i="webapp"}=e;const t=localStorage.getItem(g.LJ),[n,{isLoading:a,isSuccess:r,error:o}]=(0,p.YA)();return(0,c.useEffect)((()=>{s&&n({magic_token:t,code:s,type:"github"})}),[s]),(0,c.useEffect)((()=>{r&&(f.ZP.success("Login Successfully"),"widget"==i&&localStorage.setItem("widget",`${(new Date).getTime()}`),"webapp"==i&&(location.href="/"))}),[r,i]),(0,c.useEffect)((()=>{if(o)if(410===o.status)f.ZP.error("No associated account found, please user admin for an invitation link to join.");else f.ZP.error("Something Error");else;}),[o]),o?(0,l.jsx)("span",{children:"Something Error"}):(0,l.jsxs)("section",{className:"flex flex-col gap-3 justify-center items-center",children:[r&&"widget"==i&&(0,l.jsx)("h1",{children:"Please close this window and return widget window"}),(0,l.jsx)("span",{className:"text-3xl text-green-600 font-bold",children:a?"Github Logging in...":"Github Login Success!"})]})},w=n.ZP.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  word-break: break-word;
  line-height: 1.5;
`;function m(){const{type:e="",payload:s=""}=(0,t.UO)();if("payment_success"==e)return(0,l.jsx)(w,{children:(0,l.jsx)(h,{sid:s})});if("github"==e){var i;const e=null!==(i=new URLSearchParams(location.search).get("code"))&&void 0!==i?i:"";return(0,l.jsx)(w,{children:(0,l.jsx)(x,{code:e,from:s})})}return(0,l.jsx)(w,{children:"callback page"})}}}]);