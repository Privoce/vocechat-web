"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[221],{52054:(e,s,t)=>{t.d(s,{A:()=>r});var c=t(21600),i=t(57907),a=t(35160),n=t(1807);const r=(e=!1)=>{var s;const t=(0,a.GV)((e=>e.users.ids.length),n.bN),r=(0,a.GV)((e=>e.server.upgraded),n.bN),o=(0,a.GV)((e=>e.authData.guest),n.bN),{data:l,refetch:d,isLoading:g}=(0,i.xI)(void 0,{refetchOnMountOrArgChange:e,skip:o}),[u,{isLoading:h,isSuccess:p}]=(0,i._8)(),[x,{isSuccess:f,isLoading:b,reset:m}]=(0,i.bb)();(0,c.useEffect)((()=>{f&&(d(),m())}),[f]);return{upgraded:r,reachLimit:t>=(null!==(s=null===l||void 0===l?void 0:l.user_limit)&&void 0!==s?s:Number.MAX_SAFE_INTEGER),license:l,checked:p,isLoading:g,checking:h,upserting:b,upserted:f,checkLicense:e=>{u(e)},upsertLicense:async e=>{const s=await u(e);return!(!("data"in s)||!s.data.sign)&&await x(e)}}}},36221:(e,s,t)=>{t.r(s),t.d(s,{default:()=>f});var c=t(22664),i=t(21600),a=t(75837),n=t(33054),r=t(44487),o=t(24446),l=t(25654),d=t(10364);const g=({code:e,from:s="webapp"})=>{const{t:t}=(0,n.Bd)("auth"),{t:c}=(0,n.Bd)(),g=localStorage.getItem(r.wi),[u,{isLoading:h,isSuccess:p,error:x}]=(0,o._L)();(0,i.useEffect)((()=>{e&&u({magic_token:g,code:e,type:"github"})}),[e]),(0,i.useEffect)((()=>{p&&(a.Ay.success(c("tip.login")),"widget"==s&&localStorage.setItem("widget",`${(new Date).getTime()}`),"webapp"==s&&(location.href="/"))}),[p,s]),(0,i.useEffect)((()=>{if(x)if(410===x.status)a.Ay.error("No associated account found, please contact user admin for an invitation link to join.");else a.Ay.error("Something Error")}),[x]);return x?(0,d.jsx)("span",{className:"text-red-500 text-lg",children:"Something Error"}):(0,d.jsxs)("section",{className:"flex-center flex-col gap-3",children:[(0,d.jsx)(l.A,{onClick:()=>{window.close()},children:c("action.close")}),p&&"widget"==s&&(0,d.jsx)("h1",{children:t("github_cb_tip")}),(0,d.jsx)("span",{className:"text-3xl text-green-600 font-bold",children:t(h?"github_logging_in":"github_login_success")})]})};var u=t(57907),h=t(52054);const p=({sid:e})=>{const{t:s}=(0,n.Bd)("setting",{keyPrefix:"license"}),t=(0,c.Zp)(),{upsertLicense:a,upserting:r,upserted:o}=(0,h.A)(),[g,{data:p,isError:x,isLoading:f,isSuccess:b}]=(0,u.Am)();(0,i.useEffect)((()=>{e&&g(e)}),[e]),(0,i.useEffect)((()=>{if(b&&p){const e=p.license;a(e)}}),[p,b]);return(0,d.jsxs)("section",{className:"flex flex-col items-center bg-slate-100 dark:bg-slate-800 rounded-2xl w-4/5 md:w-[512px] p-6",children:[(0,d.jsx)("img",{className:"w-28 h-28",src:"https://s.voce.chat/web_client/assets/img/check.png",alt:"check icon"}),(0,d.jsx)("h1",{className:"font-bold text-3xl pt-5",children:s("payment_success")}),(0,d.jsxs)("p",{className:"text-lg pb-7 mt-2 text-gray-400 dark:text-gray-600",children:[r?s("tip_renewing"):"",o?s("tip_renewed"):"",x?s("tip_renew_error"):""]}),(0,d.jsx)(l.A,{disabled:f||r,className:"back",onClick:()=>{t("/")},children:s("back_home")})]})},x=({children:e})=>(0,d.jsx)("div",{className:"flex-center dark:bg-gray-700 dark:text-white w-screen h-screen break-words leading-normal",children:e});function f(){const{type:e="",payload:s=""}=(0,c.g)();if("payment_success"==e)return(0,d.jsx)(x,{children:(0,d.jsx)(p,{sid:s})});if("github"==e){var t;const e=null!==(t=new URLSearchParams(location.search).get("code"))&&void 0!==t?t:"";return(0,d.jsx)(x,{children:(0,d.jsx)(g,{code:e,from:s})})}return(0,d.jsx)(x,{children:"callback page"})}}}]);