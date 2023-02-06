"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[444],{88143:(e,t,s)=>{s.d(t,{Z:()=>r});var a=s(80683);const r=e=>{let{content:t}=e;return(0,a.jsx)("div",{className:"relative border-none h-[1px] bg-[#e3e5e8] dark:bg-gray-500 my-6 overflow-visible",children:(0,a.jsx)("span",{className:"p-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-300 font-semibold bg-white dark:bg-[#384250]",children:t})})}},80874:(e,t,s)=>{s.d(t,{Z:()=>n});var a=s(70537),r=s(10336);const n=e=>{let{id:t="root-modal",mask:s=!0,children:n}=e;const[i,o]=(0,a.useState)(null);return(0,a.useEffect)((()=>{const e=document.getElementById(t);if(!e)return;s&&e.classList.add("mask");const a=document.createElement("div");return a.classList.add("wrapper"),e.appendChild(a),o(a),()=>{e.removeChild(a)}}),[t,s]),i?(0,r.createPortal)(n,i):null}},17237:(e,t,s)=>{s.d(t,{Z:()=>c});var a=s(70537),r=s(40182),n=s(87442),i=s(80683);const o=n.ZP.div`
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);

  .prefix {
    padding: 8px 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #9ca3af;
    background: #f3f4f6;
    border-right: 1px solid #e5e7eb;
  }

  .view {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`,l=n.ZP.input`
  width: 100%;
  background: #ffffff;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  padding: 8px;
  outline: none;

  &:not(.inner) {
    border-radius: 4px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
  }

  &.large {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 11px 8px;
  }

  &.none {
    outline: none;
    border: none;
    background: none;
    box-shadow: none;
  }

  &:disabled {
    color: #78787c;
    background-color: #f9fafb;
  }

  &::placeholder {
    color: #d1d5db;
  }

  &[type="password"] {
    padding-right: 30px;
  }
`,c=e=>{let{type:t="text",prefix:s="",className:n,...c}=e;const[d,u]=(0,a.useState)(t);return"password"==t?(0,i.jsxs)(o,{className:n,children:[(0,i.jsx)(l,{type:d,autoComplete:"password"==d?"current-password":"on",className:`inner ${n}`,...c}),(0,i.jsx)("div",{className:"view",onClick:()=>{u((e=>"password"==e?"text":"password"))},children:"password"==d?(0,i.jsx)(r.MBb,{color:"#78787c"}):(0,i.jsx)(r.Rbo,{color:"#78787c"})})]}):s?(0,i.jsxs)(o,{className:n,children:[(0,i.jsx)("span",{className:"prefix",children:s}),(0,i.jsx)(l,{className:`inner ${n}`,type:d,...c})]}):(0,i.jsx)(l,{type:d,className:n,...c})}},40698:(e,t,s)=>{s.d(t,{Z:()=>n});var a=s(57425),r=s(80683);const n=e=>{let{compact:t=!1,title:s="",description:n="",buttons:i,children:o,className:l}=e;return(0,r.jsxs)("div",{className:(0,a.Z)("rounded-lg bg-white dark:bg-gray-900 drop-shadow",t?"p-4 min-w-[406px] text-left":"p-8 min-w-[440px] text-center",l),children:[s&&(0,r.jsx)("h3",{className:"text-xl text-gray-600 dark:text-white mb-4 font-semibold",children:s}),n&&(0,r.jsx)("p",{className:"text-sm text-gray-400 dark:text-gray-100 mb-2",children:n}),o,i&&(0,r.jsx)("div",{className:"pt-4 w-full flex justify-end gap-4 items-center",children:i})]})}},42712:(e,t,s)=>{s.d(t,{Z:()=>n});var a=s(70537),r=s(65809);function n(){const[e,t]=(0,a.useState)(!1),[s,n]=(0,a.useState)(),{data:i}=(0,r.R)(void 0,{refetchOnMountOrArgChange:!0}),[o,{isSuccess:l}]=(0,r.Ku)();(0,a.useEffect)((()=>{i&&n(i)}),[i]),(0,a.useEffect)((()=>{t(!l&&JSON.stringify(i)!==JSON.stringify(s))}),[i,s,l]);return{config:s,changed:e,updateGithubAuthConfig:e=>{n((t=>t?{...t,...e}:e))},updateGithubAuthConfigToServer:async()=>{s&&await o(s)},isSuccess:l}}},25089:(e,t,s)=>{s.d(t,{Z:()=>n});var a=s(70537),r=s(65809);function n(){const[e,t]=(0,a.useState)(!1),[s,n]=(0,a.useState)(""),{data:i}=(0,r.eM)(void 0,{refetchOnMountOrArgChange:!0}),[o,{isSuccess:l}]=(0,r.Qg)();(0,a.useEffect)((()=>{i&&n(i.client_id)}),[i]),(0,a.useEffect)((()=>{t(!l&&(null===i||void 0===i?void 0:i.client_id)!==s)}),[i,s,l]);return{config:i,changed:e,clientId:s,updateClientId:n,updateClientIdToServer:async()=>{s&&await o({client_id:s})},updateGoogleAuthConfig:o,isSuccess:l}}},44917:(e,t,s)=>{s.d(t,{Z:()=>A});var a,r,n,i,o=s(70537),l=s(27418),c=s(65809),d=s(42712),u=s(25089),g=s(89156),p=s(80308);function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},h.apply(this,arguments)}const f=(e,t)=>{let{title:s,titleId:l,...c}=e;return o.createElement("svg",h({width:2443,height:2500,viewBox:"0 0 256 262",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid",ref:t,"aria-labelledby":l},c),s?o.createElement("title",{id:l},s):null,a||(a=o.createElement("path",{d:"M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027",fill:"#4285F4"})),r||(r=o.createElement("path",{d:"M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1",fill:"#34A853"})),n||(n=o.createElement("path",{d:"M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782",fill:"#FBBC05"})),i||(i=o.createElement("path",{d:"M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251",fill:"#EB4335"})))},x=(0,o.forwardRef)(f);var m=s(69885),w=s(15312),b=s(14566),v=s(80683);const y=e=>{let{type:t="login",loaded:s,loadError:a}=e;const{t:r}=(0,b.$G)("auth"),{t:n}=(0,b.$G)(),[i,{isSuccess:c,isLoading:d,error:u}]=(0,w.YA)(),h=localStorage.getItem(p.LJ);return(0,o.useEffect)((()=>{c&&l.ZP.success(n("tip.login"))}),[c]),(0,o.useEffect)((()=>{if(u&&"status"in u)if(410===u.status)l.ZP.error("No associated account found, please contact user admin for an invitation link to join.");else l.ZP.error("Something Error");else;}),[u]),(0,v.jsxs)(m.Z,{className:"group relative w-full !bg-white !text-gray-600 !h-[46px] overflow-hidden !border !border-solid !border-[#d0d5dd]",disabled:!s||d,children:[(0,v.jsxs)("div",{className:"absolute left-0 top-0 w-full flex-center gap-3 z-[998] h-10 bg-inherit",children:[(0,v.jsx)(x,{className:"w-6 h-6"}),a?"Script Load Error!":s?`${r("login"===t?"login.google":"reg.google")}`:"Initializing"]}),(0,v.jsx)("div",{className:"absolute left-0 top-0 w-full group-hover:opacity-0 group-hover:z-[999]",children:(0,v.jsx)(g.kZ,{width:"360px",onSuccess:e=>{i({magic_token:h,id_token:e.credential||"",type:"google"})}})})]})},C=e=>{let{type:t="login",clientId:s}=e;const[a,r]=(0,o.useState)(!1),[n,i]=(0,o.useState)(!1);return s?(0,v.jsx)(g.rg,{onScriptLoadError:()=>{i(!0)},onScriptLoadSuccess:()=>{r(!0)},clientId:s,children:(0,v.jsx)(y,{type:t,loaded:a,loadError:n})}):null};var j,k;function E(){return E=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},E.apply(this,arguments)}const N=(e,t)=>{let{title:s,titleId:a,...r}=e;return o.createElement("svg",E({width:25,height:24,viewBox:"0 0 25 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},r),s?o.createElement("title",{id:a},s):null,j||(j=o.createElement("g",{clipPath:"url(#clip0_14990_39524)"},o.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.5 0C5.8724 0 0.5 5.3808 0.5 12.0204C0.5 17.3304 3.938 21.8364 8.7068 23.4252C9.3068 23.5356 9.5252 23.1648 9.5252 22.8456C9.5252 22.5612 9.5156 21.804 9.5096 20.802C6.1712 21.528 5.4668 19.1904 5.4668 19.1904C4.922 17.8008 4.1348 17.4312 4.1348 17.4312C3.0452 16.6872 4.2176 16.7016 4.2176 16.7016C5.4212 16.7856 6.0548 17.94 6.0548 17.94C7.1252 19.776 8.864 19.2456 9.5468 18.9384C9.6572 18.162 9.9668 17.6328 10.31 17.3328C7.646 17.0292 4.844 15.9972 4.844 11.3916C4.844 10.08 5.312 9.006 6.0788 8.166C5.9552 7.8624 5.5436 6.6396 6.1964 4.986C6.1964 4.986 7.2044 4.662 9.4964 6.2172C10.4753 5.95022 11.4853 5.81423 12.5 5.8128C13.52 5.8176 14.546 5.9508 15.5048 6.2172C17.7956 4.662 18.8012 4.9848 18.8012 4.9848C19.4564 6.6396 19.0436 7.8624 18.9212 8.166C19.6892 9.006 20.1548 10.08 20.1548 11.3916C20.1548 16.0092 17.348 17.0256 14.6756 17.3232C15.1064 17.694 15.4892 18.4272 15.4892 19.5492C15.4892 21.1548 15.4748 22.452 15.4748 22.8456C15.4748 23.1672 15.6908 23.5416 16.3004 23.424C18.69 22.6225 20.7672 21.0904 22.2386 19.0441C23.7099 16.9977 24.501 14.5408 24.5 12.0204C24.5 5.3808 19.1264 0 12.5 0Z",fill:"black"}))),k||(k=o.createElement("defs",null,o.createElement("clipPath",{id:"clip0_14990_39524"},o.createElement("rect",{width:24,height:24,fill:"white",transform:"translate(0.5)"})))))},S=(0,o.forwardRef)(N),Z=e=>{let{type:t="login",source:s="webapp",client_id:a}=e;const{t:r}=(0,b.$G)("auth");(0,o.useEffect)((()=>{const e=e=>{const{key:t,newValue:s}=e;if("widget"==t&&s){localStorage.removeItem("widget");const e=window.parent;e&&e.postMessage("RELOAD_WITH_OPEN","*")}};return"widget"==s&&window.addEventListener("storage",e),()=>{"widget"==s&&window.removeEventListener("storage",e)}}),[s]);return(0,v.jsxs)(m.Z,{className:"flex-center gap-3 ghost !text-gray-600 dark:!text-gray-100 !border-[#d0d5dd]",onClick:()=>{const e=`https://github.com/login/oauth/authorize?client_id=${a}&redirect_uri=${location.origin}/github/cb/${s}.html`;"webapp"==s?location.href=e:window.open(e)},children:[(0,v.jsx)(S,{className:"w-6 h-6"}),` ${r("login"===t?"login.github":"reg.github")}`]})};var _=s(70479);const M=s.p+"static/media/metamask.f04d5fb63394197766d0.svg";function I(e){let{login:t,type:s="login"}=e;const{t:a}=(0,b.$G)("auth"),[r,n]=(0,o.useState)(!1),[i,l]=(0,o.useState)([]),[c]=(0,w.sZ)(),d=(0,o.useRef)();(0,o.useEffect)((()=>{function e(e){l(e)}return d.current||(d.current=new _.Z),_.Z.isMetaMaskInstalled()&&window.ethereum.on("accountsChanged",e),()=>{_.Z.isMetaMaskInstalled()&&window.ethereum.removeListener("accountsChanged",e)}}),[]),(0,o.useEffect)((()=>{if(_.Z.isMetaMaskInstalled())if(i.length>0){var e;const[s]=i;(async e=>{const{data:s,isSuccess:a}=await c(e);if(a){const a=await u(e,s);t({public_address:e,nonce:s,signature:a,type:"metamask"})}})(s),n(!0),null===(e=d.current)||void 0===e||e.stopOnboarding()}else n(!1)}),[i]);const u=async(e,t)=>await window.ethereum.request({method:"personal_sign",params:[t,e,"hello from "]});return(0,v.jsxs)(m.Z,{className:"flex ghost flex-center gap-2 !text-gray-600 !border-slate-200 dark:!text-gray-100",disabled:r,onClick:async()=>{if(_.Z.isMetaMaskInstalled()){n(!0);try{const e=await window.ethereum.request({method:"eth_requestAccounts"});l(e)}catch(t){window.ethereum.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}n(!1)}else{var e;null===(e=d.current)||void 0===e||e.startOnboarding()}},children:[(0,v.jsx)("img",{className:"w-6 h-6",src:M,alt:"meta mask icon"}),a("login"==s?"login.metamask":"reg.metamask")]})}var O=s(40698),L=s(80874);const $=e=>{let{issuer:t}=e;const[s,{data:a,isLoading:r,isSuccess:n}]=(0,w.CB)();return(0,o.useEffect)((()=>{if(n&&a){const{url:e}=a;location.href=e}}),[a,n]),(0,v.jsxs)(m.Z,{className:"flex text-gray-800 dark:text-gray-100 flex-center gap-3",disabled:r||n,onClick:()=>{s({issuer:t.domain,redirect_uri:`${location.origin}/#/login`})},children:[!!t.favicon&&(0,v.jsx)("img",{src:t.favicon,className:"w-6 h-6",alt:"icon"}),r?"Loading...":`Login with ${t.domain}`]})},P=e=>{let{issuers:t,type:s="login"}=e;const{t:a}=(0,b.$G)("auth"),{t:r}=(0,b.$G)(),[n,i]=(0,o.useState)(!1);return t?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(m.Z,{className:"flex ghost flex-center gap-2 !text-gray-600 !border-slate-200 dark:!text-gray-100",onClick:()=>{i(!0)},children:a("login"==s?"login.oidc":"reg.oidc")}),n&&(0,v.jsx)(L.Z,{id:"modal-modal",children:(0,v.jsxs)(O.Z,{className:"text-center ",title:"Login with OIDC",children:[t.filter((e=>e.enable)).map(((e,t)=>(0,v.jsx)($,{issuer:e},t))),(0,v.jsx)(m.Z,{className:"border_less ghost text-gray-500 dark:text-white",onClick:()=>{i(!1)},children:r("action.close")})]})})]}):null},A=e=>{let{type:t="login"}=e;const{t:s}=(0,b.$G)(),[a,{isSuccess:r}]=(0,w.YA)(),{config:n}=(0,d.Z)(),{data:i,isSuccess:g}=(0,c.ww)(),{clientId:p}=(0,u.Z)();if((0,o.useEffect)((()=>{r&&l.ZP.success(s("tip.login"))}),[r]),!g)return null;const{github:h,google:f,metamask:x,oidc:m=[]}=i,y=f&&!!p;return(0,v.jsxs)(v.Fragment,{children:[y&&(0,v.jsx)(C,{type:t,clientId:p}),h&&(0,v.jsx)(Z,{type:t,client_id:null===n||void 0===n?void 0:n.client_id}),x&&(0,v.jsx)(I,{type:t,login:a}),m.length>0&&(0,v.jsx)(P,{type:t,issuers:m})]})}}}]);