"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[17],{41016:(e,t,s)=>{s.d(t,{Z:()=>o});var r,a=s(70537);function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},n.apply(this,arguments)}const i=(e,t)=>{let{title:s,titleId:i,...o}=e;return a.createElement("svg",n({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":i},o),s?a.createElement("title",{id:i},s):null,r||(r=a.createElement("path",{d:"M5.99988 6.5C5.99988 5.11929 7.11917 4 8.49988 4H15.4999C16.8806 4 17.9999 5.11929 17.9999 6.5V19.5C17.9999 19.6881 17.8944 19.8602 17.7268 19.9456C17.5592 20.0309 17.3579 20.015 17.2058 19.9044L11.9999 16.1183L6.79396 19.9044C6.64187 20.015 6.44057 20.0309 6.27299 19.9456C6.1054 19.8602 5.99988 19.6881 5.99988 19.5V6.5Z",fill:"#70707B"})))},o=(0,a.forwardRef)(i)},25552:(e,t,s)=>{s.d(t,{Z:()=>o});var r,a=s(70537);function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},n.apply(this,arguments)}const i=(e,t)=>{let{title:s,titleId:i,...o}=e;return a.createElement("svg",n({width:14,height:15,viewBox:"0 0 14 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":i},o),s?a.createElement("title",{id:i},s):null,r||(r=a.createElement("path",{d:"M7 6.7929L10.5355 3.25736C10.7308 3.0621 11.0474 3.0621 11.2426 3.25736C11.4379 3.45262 11.4379 3.76921 11.2426 3.96447L7.70711 7.5L11.2426 11.0355C11.4379 11.2308 11.4379 11.5474 11.2426 11.7426C11.0474 11.9379 10.7308 11.9379 10.5355 11.7426L7 8.20711L3.46447 11.7426C3.26921 11.9379 2.95262 11.9379 2.75736 11.7426C2.5621 11.5474 2.5621 11.2308 2.75736 11.0355L6.2929 7.5L2.75736 3.96447C2.5621 3.76921 2.5621 3.45262 2.75736 3.25736C2.95262 3.0621 3.26921 3.0621 3.46447 3.25736L7 6.7929Z",fill:"black",fillOpacity:.5})))},o=(0,a.forwardRef)(i)},64631:(e,t,s)=>{s.d(t,{Z:()=>o});var r=s(70537),a=s(21812),n=s(80683);const i=e=>{let{url:t="",name:s="Deleted User",type:i="user",...o}=e;const[l,c]=(0,r.useState)("");return(0,r.useEffect)((()=>{if(t)c(t);else{const e=(0,a.eD)({initials:(0,a.Qm)(s),background:"channel"==i?"#EAECF0":void 0,foreground:"channel"==i?"#475467":void 0});c(e)}}),[t,s]),l?(0,n.jsx)("img",{src:l,onError:e=>{const t=(0,a.eD)({initials:(0,a.Qm)(s),background:"channel"==i?"#EAECF0":void 0,foreground:"channel"==i?"#475467":void 0});c(t)},...o}):null},o=(0,r.memo)(i,((e,t)=>e.url==t.url))},80874:(e,t,s)=>{s.d(t,{Z:()=>n});var r=s(70537),a=s(10336);const n=e=>{let{id:t="root-modal",mask:s=!0,children:n}=e;const[i,o]=(0,r.useState)(null);return(0,r.useEffect)((()=>{const e=document.getElementById(t);if(!e)return;s&&e.classList.add("mask");const r=document.createElement("div");return r.classList.add("wrapper"),e.appendChild(r),o(r),()=>{e.removeChild(r)}}),[t,s]),i?(0,a.createPortal)(n,i):null}},31159:(e,t,s)=>{s.d(t,{Z:()=>o});var r=s(7829),a=s(57889),n=s(80683);const i=a.ZP.div`
  position: relative;
  background: #fff;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #1d2939;
  border-radius: var(--br);
  box-shadow: 0 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
  &::after {
    background-color: inherit;
    position: absolute;
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 1px;
    transform-origin: center;
  }
  &.right::after {
    left: 0;
    top: 50%;
    transform: translate3d(-50%, -50%, 0) rotate(45deg);
  }
  &.top::after {
    left: 50%;
    bottom: 0;
    transform: translate3d(-50%, 50%, 0) rotate(45deg);
  }
  &.bottom::after {
    top: 0;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) rotate(45deg);
  }
`,o=e=>{let{tip:t="",placement:s="right",delay:a=null,children:o,...l}=e;return(0,n.jsx)(r.ZP,{offset:[0,18],duration:a?[300,250]:0,delay:null!==a&&void 0!==a?a:[150,0],placement:s,content:(0,n.jsx)(i,{className:s,children:t}),...l,children:o})}},11712:(e,t,s)=>{s.r(t),s.d(t,{default:()=>Ne});var r=s(70537),a=s(15924),n=s(64084),i=s(57889);const o=i.ZP.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: var(---navs-bg);
  &.guest {
    background: none;
  }
  > .col {
    height: 100%;
    display: flex;
    flex-direction: column;
    &.left {
      align-items: center;
      position: relative;
      background: transparent;
      width: 64px;
      transition: all 0.5s ease-in;
      > .divider {
        width: -webkit-fill-available;
        height: 1px;
        background-color: #d4d4d4;
        margin: 8px 16px;
      }
      &.expand {
        width: 140px;
      }
    }
    &.right {
      width: 100%;
    }
    .link_navs {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 24px 12px;
      .link {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        padding: 8px 12px;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #4b5563;
        border-radius: 8px;
        &:hover {
          background-color: rgba(0, 0, 0, 0.08);
        }
        &.active {
          background-color: #55c7ec;
          svg path {
            fill: #fff;
          }
        }
      }
    }
  }
  &.guest > .col.right {
    margin: 0 8px;
  }
`;var l=s(64631),c=s(66160),d=s(80683);const u=i.ZP.div`
  padding: 10px 12px;
  .avatar {
    width: 32px;
    height: 32px;
    img {
      object-fit: cover;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
`,p=e=>{let{uid:t}=e;const{pathname:s}=(0,a.TH)(),r=(0,c.CG)((e=>e.users.byId[t]));return r?(0,d.jsx)(u,{children:(0,d.jsx)(n.OL,{to:`/setting?nav=my_account&f=${s}`,children:(0,d.jsx)("div",{className:"avatar",children:(0,d.jsx)(l.Z,{url:r.avatar,name:r.name})})})}):null};var h=s(63356),g=s(31159);const m=s.p+"static/media/setting.3cfa5bc4fac01d78f3a0.svg",f=i.ZP.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 8px 12px;
  .menu {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;
  }
`,v=()=>{const{pathname:e}=(0,a.TH)();return(0,d.jsx)(f,{children:(0,d.jsx)("li",{className:"menu link_navs",children:(0,d.jsx)(n.OL,{className:"link",to:`/setting?f=${e}`,children:(0,d.jsx)(g.Z,{placement:"right",tip:"Settings",children:(0,d.jsx)("img",{src:m,alt:"setting icon",className:"w-6 h-6 max-w-[unset]"})})})})})};var x=s(7699),b=s.n(x),w=s(98090),C=s.n(w),k=s(3074),j=s(96157),y=s(2101),_=s(53517),E=s(1823),L=s(88332),N=s(53429),O=s(27197),Z=s(81980),S=s(75265),M=s(12564);const P=()=>{const[e,t]=(0,r.useState)(!1),s=(0,k.I0)();return{rehydrate:async()=>{const e={channels:[],users:[],fileMessage:{},channelMessage:{},userMessage:{},reactionMessage:{},message:{replying:{}},footprint:{},ui:{},server:{}},r=Object.keys(window.CACHE);await Promise.all(r.map((t=>{var s;return null===(s=window.CACHE[t])||void 0===s?void 0:s.iterate(((s,r)=>{switch(t){case"channels":s&&e.channels.push(s);break;case"users":s&&e.users.push(s);break;case"footprint":e.footprint[r]=s;break;case"ui":e.ui[r]=s;break;case"messageChannel":e.channelMessage[r]=s;break;case"messageFile":e.fileMessage[r]=s||[];break;case"messageDM":e.userMessage[r]=s;break;case"messageReaction":e.reactionMessage[r]=s;break;case"message":e.message[r]=s;break;case"server":e.server[r]=s}}))}))),s((0,O.i2)(e.users)),s((0,y.tD)(e.server)),s((0,N.vB)(e.channels)),s((0,S.Cb)(e.fileMessage.list)),s((0,E.sL)(e.channelMessage)),s((0,L.Cc)(e.userMessage)),s((0,_.KC)(e.message)),s((0,Z.ZN)(e.footprint)),s((0,M.HM)(e.ui)),s((0,j.kY)(e.reactionMessage)),t(!0)},rehydrated:e}};var D=s(80308);const I=[{storeName:"channels",description:"store channel list"},{storeName:"users",description:"store user list"},{storeName:"messageDM",description:"store DM message with IDs"},{storeName:"messageChannel",description:"store channel message with IDs"},{storeName:"message",description:"store message with key-val full data"},{storeName:"messageFile",description:"store file message list refs"},{storeName:"messageReaction",description:"store message reaction with key-val full data"},{storeName:"footprint",description:"store user visit data"},{storeName:"server",description:"store server data"},{storeName:"ui",description:"store UI state"}],T=()=>{const e=`local_db_${localStorage.getItem(D.kK)||""}_v_${D.YM.split(".").join("_")}`;window.CACHE={},I.forEach((t=>{let{storeName:s,description:r}=t;window.CACHE[s]=C().createInstance({name:e,storeName:s,description:r})}))};var R=s(24783),B=s(52334),H=s(65809),U=s(27418),G=s(21645),$=s(64488),A=s(38289),V=s(15312);let F,W=null,z=!1,K=0;function Q(){var e;const[t]=(0,V.SO)(),[s,a]=(0,r.useState)(!1),{authData:n,ui:{ready:i},footprint:{afterMid:o,usersVersion:l,readUsers:d,readChannels:u}}=(0,c.CG)((e=>e)),p=(0,c.TL)(),h=(null===(e=n.user)||void 0===e?void 0:e.uid)||0,g=(0,r.useCallback)((()=>{if(F&&(F.readyState===EventSource.OPEN||F.readyState===EventSource.CONNECTING))return;const{token:e="",refreshToken:s,expireTime:r=+new Date}=n;if(!e)return;if(b()().isAfter(new Date(r-2e4)))return void t({token:e,refresh_token:s});const a={"api-key":e};0!==o&&(a.after_mid=`${o}`),0!==l&&(a.users_version=`${l}`),F=new EventSource(`${D.ZP}/user/events?${(e=>{const t=new URLSearchParams;return Object.entries(e).forEach((e=>{let[s,r]=e;r&&t.append(s,r)})),t.toString()})(a)}`),F.onopen=()=>{z=!0},F.onerror=e=>{const{readyState:t}=e.target;t!==EventSource.OPEN&&t!==EventSource.CONNECTING&&(W&&clearTimeout(W),W=window.setTimeout((()=>{g()}),1e3))},F.onmessage=e=>{const t=JSON.parse(e.data),{type:s}=t;switch(s){case"heartbeat":window.clearTimeout(K),K=window.setTimeout((()=>{m(),g()}),17e3);break;case"ready":p((0,M.Uc)());break;case"users_snapshot":{const{version:e}=t;p((0,Z.uM)(e))}break;case"users_log":{const{logs:e}=t;p((0,O.ii)(e)),e.forEach((e=>{const{uid:t,action:s,log_id:r,...a}=e;t===h&&"update"===s&&p((0,G.L2)((0,A.omitBy)(a,A.isNull)))}))}break;case"user_settings":case"user_settings_changed":Object.keys(t).forEach((e=>{switch(e){case"read_index_groups":p((0,Z.TP)(t[e]));break;case"read_index_users":p((0,Z.RT)(t[e]));break;case"add_mute_users":case"mute_users":case"add_mute_groups":case"mute_groups":{const s=t[e];if(s&&s.length){const t=e.endsWith("users")?"add_users":"add_groups";p((0,Z.Uw)({[t]:s}))}}break;case"remove_mute_users":case"remove_mute_groups":{const s=t[e];if(s&&s.length){const t=e.endsWith("users")?"remove_users":"remove_groups";p((0,Z.Uw)({[t]:s}))}}}}));break;case"users_state":case"users_state_changed":{let{type:e,...s}=t;const r="users_state_changed"==e?[s]:s.users;p((0,O._D)(r))}break;case"kick":switch(t.reason){case"login_from_other_device":p((0,G.sQ)()),(0,U.ZP)("kicked from the other device");break;case"delete_user":p((0,G.sQ)()),(0,U.ZP)("Your account has been deleted")}break;case"related_groups":p((0,N.vB)(t.groups));break;case"joined_group":p((0,N.mR)(t.group));break;case"group_changed":{const{gid:e,...s}=t;p((0,N.pW)({gid:e,...s}))}break;case"user_joined_group":{const{gid:e,uid:s}=t;p((0,N.pW)({operation:"add_member",gid:e,members:s}))}break;case"user_leaved_group":{const{gid:e,uid:s}=t;s.findIndex((e=>e==h))>-1?p((0,N.OG)(e)):p((0,N.pW)({operation:"remove_member",gid:e,members:s}))}break;case"kick_from_group":p((0,N.OG)(t.gid));break;case"pinned_message_updated":p((0,N.ac)(t));break;case"chat":(0,$.Z)(t,p,{ready:i,loginUid:h,readUsers:d,readChannels:u})}}}),[n]),m=()=>{F&&(F.close(),F=void 0)};return(0,r.useEffect)((()=>(s&&g(),()=>{m()})),[s]),{setStreamingReady:e=>{a(e)},startStreaming:g,stopStreaming:m}}var Y=s(6144);let q=!1;var J=s(3014),X=s(49209);let ee=!1,te=!1;const se=e=>{const[t,s]=(0,r.useState)("");if(navigator.serviceWorker){const t=(0,X.KL)((0,J.ZF)(D.qe));if(ee||te)return;ee=!0,(0,X.LP)(t,{vapidKey:e}).then((e=>{e&&s(e),ee=!1})).catch((e=>{ee=!1,te=!0}))}return t};let re=!1,ae=!1;const ne=()=>{const e=se(D.um),[t]=(0,V.Vd)();return(0,r.useEffect)((()=>{(async e=>{if(e&&!ae&&!re)try{ae=!0,await t(e),re=!0}catch{ae=!1,re=!0}})(e)}),[e]),null},ie=(0,r.memo)(ne);var oe=s(80874),le=s(25552),ce=s(69885);const de=i.ZP.div`
  position: relative;
  margin-top: 15px;
  pointer-events: all;
  width: 406px;
  padding: 16px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 25px 50px rgba(31, 41, 55, 0.25);
  display: flex;
  flex-direction: column;
  gap: 12px;
  .tip {
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: #344054;
    .title {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }
    .desc {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }
  .close {
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 16px;
  }
`,ue=e=>{let{handleInstall:t,closePrompt:s}=e;return(0,d.jsx)(oe.Z,{mask:!1,children:(0,d.jsxs)(de,{children:[(0,d.jsx)(le.Z,{className:"close",onClick:s}),(0,d.jsxs)("div",{className:"tip",children:[(0,d.jsx)("h2",{className:"title",children:"Install web app on desktop?"}),(0,d.jsx)("p",{className:"desc",children:"Add to desktop for quick access to this app."})]}),(0,d.jsxs)("div",{className:"btns",children:[(0,d.jsx)(ce.Z,{className:"ghost cancel small",onClick:s,children:"Cancel"}),(0,d.jsx)(ce.Z,{className:"main small",onClick:t,children:"Install"})]})]})})};const pe=()=>{const{setCanceled:e,prompted:t,setDeferredPrompt:s,showPrompt:a}=function(){const e=(0,r.useRef)(null),t=t=>{e.current=t};return(0,r.useEffect)((()=>{const e=e=>{e.preventDefault(),t(e)};return window.addEventListener("beforeinstallprompt",e,!0),()=>{window.removeEventListener("beforeinstallprompt",e,!0)}}),[]),{setCanceled:()=>{localStorage.setItem(D.R1,"true")},prompted:!!localStorage.getItem(D.R1),resetPrompt:()=>{localStorage.removeItem(D.R1),e.current=null},deferredPrompt:e.current,setDeferredPrompt:t,showPrompt:async()=>{if(!e.current)return;e.current.prompt();const{outcome:s}=await e.current.userChoice;t(null)}}}(),[n,i]=(0,r.useState)(!1);(0,r.useEffect)((()=>{const e=e=>{e.preventDefault(),s(e),i(!0)},t=()=>{s(null),i(!1)};return window.addEventListener("beforeinstallprompt",e,!0),window.addEventListener("appinstalled",t),()=>{window.removeEventListener("beforeinstallprompt",e,!0),window.removeEventListener("appinstalled",t)}}),[]);return!n||t?null:(0,d.jsx)(ue,{handleInstall:async()=>{i(!1),await a()},closePrompt:async()=>{e(),i(!1)}})};var he;function ge(){return ge=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},ge.apply(this,arguments)}const me=(e,t)=>{let{title:s,titleId:a,...n}=e;return r.createElement("svg",ge({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},n),s?r.createElement("title",{id:a},s):null,he||(he=r.createElement("path",{d:"M8.79053 19.3376C10.0779 20.3775 11.7161 21.0002 13.4999 21.0002C14.6315 21.0002 15.7064 20.7491 16.6701 20.299L20.1027 20.9856C20.3486 21.0348 20.6029 20.9579 20.7802 20.7806C20.9575 20.6032 21.0345 20.349 20.9853 20.1031L20.2988 16.6702C20.7488 15.7065 20.9999 14.6318 20.9999 13.5002C20.9999 11.7168 20.3774 10.0788 19.338 8.79163C19.4443 9.3448 19.4999 9.91599 19.4999 10.5002C19.4999 11.0652 19.4479 11.618 19.3483 12.1541C19.4475 12.5868 19.4999 13.0374 19.4999 13.5002C19.4999 14.4837 19.2638 15.41 18.8458 16.2274C18.7689 16.3779 18.745 16.5501 18.7782 16.7159L19.2938 19.2941L16.7159 18.7784C16.55 18.7452 16.3778 18.7691 16.2273 18.8461C15.4098 19.2641 14.4835 19.5002 13.4999 19.5002C13.037 19.5002 12.5864 19.4478 12.1537 19.3486C11.6176 19.4481 11.0648 19.5002 10.4999 19.5002C9.91613 19.5002 9.34454 19.4443 8.79053 19.3376ZM10.5 3C6.35788 3 3.00001 6.35786 3.00001 10.5C3.00001 11.6316 3.2511 12.7064 3.70112 13.6701L3.01458 17.103C2.9654 17.3489 3.04237 17.6031 3.2197 17.7804C3.39702 17.9577 3.65123 18.0347 3.89713 17.9855L7.32974 17.2988C8.29349 17.7489 9.36836 18 10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3Z",fill:"#70707B"})))},fe=(0,r.forwardRef)(me);var ve;function xe(){return xe=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},xe.apply(this,arguments)}const be=(e,t)=>{let{title:s,titleId:a,...n}=e;return r.createElement("svg",xe({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},n),s?r.createElement("title",{id:a},s):null,ve||(ve=r.createElement("path",{d:"M17.7541 13.9999C18.9961 13.9999 20.0029 15.0068 20.0029 16.2488V17.1673C20.0029 17.7406 19.8237 18.2997 19.4903 18.7662C17.9445 20.9294 15.4202 22.0011 11.9999 22.0011C8.57891 22.0011 6.05595 20.9289 4.51379 18.7646C4.18182 18.2987 4.00342 17.7409 4.00342 17.1688V16.2488C4.00342 15.0068 5.01027 13.9999 6.25229 13.9999H17.7541ZM11.9999 2.00464C14.7613 2.00464 16.9999 4.24321 16.9999 7.00464C16.9999 9.76606 14.7613 12.0046 11.9999 12.0046C9.23845 12.0046 6.99988 9.76606 6.99988 7.00464C6.99988 4.24321 9.23845 2.00464 11.9999 2.00464Z",fill:"#70707B"})))},we=(0,r.forwardRef)(be);var Ce,ke=s(41016);function je(){return je=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},je.apply(this,arguments)}const ye=(e,t)=>{let{title:s,titleId:a,...n}=e;return r.createElement("svg",je({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},n),s?r.createElement("title",{id:a},s):null,Ce||(Ce=r.createElement("path",{d:"M13.821 6.5H19.75C20.8867 6.5 21.8266 7.34297 21.9785 8.43788L21.9948 8.59595L22 8.75V17.75C22 18.9409 21.0748 19.9156 19.904 19.9948L19.75 20H4.25C3.05914 20 2.08436 19.0748 2.00519 17.904L2 17.75V10.499L8.20693 10.5L8.40335 10.4914C8.79396 10.4572 9.16896 10.3214 9.49094 10.0977L9.64734 9.9785L13.821 6.5ZM8.20693 4C8.66749 4 9.1153 4.14129 9.49094 4.40235L9.64734 4.5215L11.75 6.273L8.68706 8.82617L8.60221 8.88738C8.51363 8.94232 8.41452 8.9782 8.31129 8.9927L8.20693 9L2 8.999V6.25C2 5.05914 2.92516 4.08436 4.09595 4.00519L4.25 4H8.20693Z",fill:"#70707B"})))},_e=(0,r.forwardRef)(ye);var Ee=s(71893);function Le(){const{t:e}=(0,Ee.$)(),t=(0,a.bS)("/"),s=(0,a.bS)("/chat"),{pathname:i}=(0,a.TH)(),{loginUid:l,guest:u,ui:{ready:m,rememberedNavs:{chat:f,user:x}}}=(0,c.CG)((e=>{var t;return{ui:e.ui,loginUid:null===(t=e.authData.user)||void 0===t?void 0:t.uid,guest:e.authData.guest}})),{loading:w}=function(){const[e]=(0,Y.N2)(),{rehydrate:t,rehydrated:s}=P(),{loginUid:a,token:n,isGuest:i,expireTime:o=+new Date,channelMessageData:l,channelIds:d}=(0,c.CG)((e=>{var t;return{channelIds:e.channels.ids,channelMessageData:e.channelMessage,loginUid:null===(t=e.authData.user)||void 0===t?void 0:t.uid,isGuest:e.authData.guest,token:e.authData.token,expireTime:e.authData.expireTime}})),{setStreamingReady:u}=Q(),[p,{isLoading:h,isSuccess:g,isError:m,data:f}]=(0,R.rF)(),[v,{isLoading:x,isSuccess:w,isError:C,data:k}]=(0,B.CJ)(),[j,{isLoading:y,isSuccess:_,isError:E,data:L}]=(0,H.$M)();(0,r.useEffect)((()=>(T(),t(),()=>{u(!1)})),[]),(0,r.useEffect)((()=>{i&&d.length>0&&!q&&(d.filter((e=>!l[e])).forEach((t=>{e({id:t,limit:50})})),q=!0)}),[d,l,i]),(0,r.useEffect)((()=>{s&&(v(),j(),p())}),[s]);const N=b()().isAfter(new Date(o-2e4)),O=!!a&&s&&!!n&&!N;return(0,r.useEffect)((()=>{u(O)}),[O]),{loading:x||y||h||!s,error:C&&E&&m,success:w&&_&&g,data:{users:k,server:L,favorites:f}}}();if(w||!m)return(0,d.jsx)(h.Z,{reload:!0,fullscreen:!0});const C=i.startsWith("/setting"),k=t||i.startsWith("/chat");if(C)return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(a.j3,{})});const j=s?"/chat":f||"/chat",y=x||"/users";return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(pe,{}),!u&&(0,d.jsx)(ie,{}),(0,d.jsxs)(o,{className:u?"guest":"",children:[!u&&(0,d.jsxs)("div",{className:"col left",children:[l&&(0,d.jsx)(p,{uid:l}),(0,d.jsxs)("nav",{className:"link_navs",children:[(0,d.jsx)(n.OL,{className:()=>"link "+(k?"active":""),to:j,children:(0,d.jsx)(g.Z,{tip:e("chat"),children:(0,d.jsx)(fe,{})})}),(0,d.jsx)(n.OL,{className:"link",to:y,children:(0,d.jsx)(g.Z,{tip:e("members"),children:(0,d.jsx)(we,{})})}),(0,d.jsx)(n.OL,{className:"link",to:"/favs",children:(0,d.jsx)(g.Z,{tip:e("favs"),children:(0,d.jsx)(ke.Z,{})})}),(0,d.jsx)(n.OL,{className:"link",to:"/files",children:(0,d.jsx)(g.Z,{tip:e("files"),children:(0,d.jsx)(_e,{})})})]}),(0,d.jsx)(v,{})]}),(0,d.jsx)("div",{className:"col right",children:(0,d.jsx)(a.j3,{})})]})]})}const Ne=(0,r.memo)(Le)}}]);