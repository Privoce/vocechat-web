"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[583],{3812:(e,t,s)=>{s.d(t,{Z:()=>o});var a,r=s(7313);function n(){return n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},n.apply(this,arguments)}const i=(e,t)=>{let{title:s,titleId:i,...o}=e;return r.createElement("svg",n({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":i},o),s?r.createElement("title",{id:i},s):null,a||(a=r.createElement("path",{d:"M5.99988 6.5C5.99988 5.11929 7.11917 4 8.49988 4H15.4999C16.8806 4 17.9999 5.11929 17.9999 6.5V19.5C17.9999 19.6881 17.8944 19.8602 17.7268 19.9456C17.5592 20.0309 17.3579 20.015 17.2058 19.9044L11.9999 16.1183L6.79396 19.9044C6.64187 20.015 6.44057 20.0309 6.27299 19.9456C6.1054 19.8602 5.99988 19.6881 5.99988 19.5V6.5Z",fill:"#70707B"})))},o=(0,r.forwardRef)(i)},5044:(e,t,s)=>{s.d(t,{Z:()=>o});var a,r=s(7313);function n(){return n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},n.apply(this,arguments)}const i=(e,t)=>{let{title:s,titleId:i,...o}=e;return r.createElement("svg",n({width:14,height:15,viewBox:"0 0 14 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":i},o),s?r.createElement("title",{id:i},s):null,a||(a=r.createElement("path",{d:"M7 6.7929L10.5355 3.25736C10.7308 3.0621 11.0474 3.0621 11.2426 3.25736C11.4379 3.45262 11.4379 3.76921 11.2426 3.96447L7.70711 7.5L11.2426 11.0355C11.4379 11.2308 11.4379 11.5474 11.2426 11.7426C11.0474 11.9379 10.7308 11.9379 10.5355 11.7426L7 8.20711L3.46447 11.7426C3.26921 11.9379 2.95262 11.9379 2.75736 11.7426C2.5621 11.5474 2.5621 11.2308 2.75736 11.0355L6.2929 7.5L2.75736 3.96447C2.5621 3.76921 2.5621 3.45262 2.75736 3.25736C2.95262 3.0621 3.26921 3.0621 3.46447 3.25736L7 6.7929Z",fill:"black",fillOpacity:.5})))},o=(0,r.forwardRef)(i)},5536:(e,t,s)=>{s.d(t,{Z:()=>o});var a=s(7313),r=s(4711),n=s(6417);const i=e=>{let{url:t="",name:s="unkonw name",type:i="user",...o}=e;const[l,c]=(0,a.useState)("");return(0,a.useEffect)((()=>{if(t)c(t);else{const e=(0,r.eD)({initials:(0,r.Qm)(s),background:"channel"==i?"#EAECF0":void 0,foreground:"channel"==i?"#475467":void 0});c(e)}}),[t,s]),l?(0,n.jsx)("img",{src:l,onError:e=>{const t=(0,r.eD)({initials:(0,r.Qm)(s),background:"channel"==i?"#EAECF0":void 0,foreground:"channel"==i?"#475467":void 0});c(t)},...o}):null},o=(0,a.memo)(i,((e,t)=>e.url==t.url))},5607:(e,t,s)=>{s.d(t,{Z:()=>n});var a=s(7313),r=s(1168);function n(e){let{id:t="root-modal",mask:s=!0,children:n}=e;const[i,o]=(0,a.useState)(null);return(0,a.useEffect)((()=>{const e=document.getElementById(t);s&&e.classList.add("mask");const a=document.createElement("div");return a.classList.add("wrapper"),e.appendChild(a),o(a),()=>{e.removeChild(a)}}),[t,s]),i?(0,r.createPortal)(n,i):null}},4796:(e,t,s)=>{s.d(t,{Z:()=>o});var a=s(2963),r=s(9184),n=s(6417);const i=r.ZP.div`
  position: relative;
  background: #fff;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #1d2939;
  border-radius: var(--br);
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
    0px 4px 6px -2px rgba(16, 24, 40, 0.03);
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
`;function o(e){let{tip:t="",placement:s="right",delay:r=null,children:o,...l}=e;return(0,n.jsx)(a.ZP,{offset:[0,18],duration:r?[300,250]:0,delay:null!==r&&void 0!==r?r:[150,0],placement:s,content:(0,n.jsx)(i,{className:s,children:t}),...l,children:o})}},6794:(e,t,s)=>{s.r(t),s.d(t,{default:()=>be});var a=s(9466),r=s(7890),n=s(3709),i=s(9184);const o=i.ZP.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: var(--rustchat-navs-bg);
  > .col {
    height: 100%;
    display: flex;
    flex-direction: column;
    &.left {
      align-items: center;
      position: relative;
      background: transparent;
      width: 64px;
      /* box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.1); */
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
`;var l=s(5536),c=s(6417);const d=i.ZP.div`
  padding: 10px 12px;
  .avatar {
    width: 32px;
    height: 32px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
`;function u(e){let{uid:t=null}=e;const{pathname:s}=(0,r.TH)(),i=(0,n.v9)((e=>e.contacts.byId[t]));return i?(0,c.jsx)(d,{children:(0,c.jsx)(a.OL,{to:`/setting?nav=my_account&f=${s}`,children:(0,c.jsx)("div",{className:"avatar",children:(0,c.jsx)(l.Z,{url:i.avatar,name:i.name})})})}):null}var p=s(3135),h=s(4796);const g=s.p+"static/media/setting.3cfa5bc4fac01d78f3a0.svg",f=i.ZP.ul`
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
    .icon {
      width: 24px;
      height: 24px;
      transition: all 0.5s ease;
    }
    .txt {
      color: #4b5563;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
    }
  }
`;function m(){const{pathname:e}=(0,r.TH)();return(0,c.jsx)(f,{children:(0,c.jsx)("li",{className:"menu link_navs",children:(0,c.jsx)(a.OL,{className:"link",to:`/setting?f=${e}`,children:(0,c.jsx)(h.Z,{placement:"right",tip:"Settings",children:(0,c.jsx)("img",{src:g,alt:"setting icon",className:"icon"})})})})})}var x=s(7313),v=s(738),b=s.n(v),w=s(9899),k=s(39),C=s(3247),j=s(445),y=s(5106),_=s(332),E=s(6565),L=s(4926),Z=s(8109),N=s(5018);const S=()=>{const[e,t]=(0,x.useState)(!1),s=(0,n.I0)();return{rehydrate:async()=>{const e={channels:[],contacts:[],fileMessage:{},channelMessage:{},userMessage:{},reactionMessage:{},message:{replying:{}},footprint:{},ui:{},server:{}},a=Object.keys(window.CACHE);await Promise.all(a.map((t=>window.CACHE[t].iterate(((s,a)=>{switch(t){case"channels":s&&e.channels.push(s);break;case"contacts":s&&e.contacts.push(s);break;case"footprint":e.footprint[a]=s;break;case"ui":e.ui[a]=s;break;case"messageChannel":e.channelMessage[a]=s;break;case"messageFile":e.fileMessage[a]=s||[];break;case"messageDM":e.userMessage[a]=s;break;case"messageReaction":e.reactionMessage[a]=s;break;case"message":e.message[a]=s;break;case"server":e.server[a]=s}})))));(0,n.dC)((()=>{s((0,E.g5)(e.contacts)),s((0,k.EM)(e.server)),s((0,_.fS)(e.channels)),s((0,Z.D$)(e.fileMessage.list)),s((0,j.Ie)(e.channelMessage)),s((0,y.Qc)(e.userMessage)),s((0,C.Zl)(e.message)),s((0,L.GV)(e.footprint)),s((0,N.u2)(e.ui)),s((0,w.tG)(e.reactionMessage))})),t(!0)},rehydrated:e}};var M=s(2867);const O=[{storeName:"channels",description:"store channel list"},{storeName:"contacts",description:"store contact list"},{storeName:"messageDM",description:"store DM message with IDs"},{storeName:"messageChannel",description:"store channel message with IDs"},{storeName:"message",description:"store message with key-val full data"},{storeName:"messageFile",description:"store file message list refs"},{storeName:"messageReaction",description:"store message reaction with key-val full data"},{storeName:"footprint",description:"store user visit data"},{storeName:"server",description:"store server data"},{storeName:"ui",description:"store UI state"}],I=()=>{const e=`local_db_${localStorage.getItem(M.kK)||""}_v_${M.YM.split(".").join("_")}`;window.CACHE={},O.forEach((t=>{let{storeName:s,description:a}=t;window.CACHE[s]=b().createInstance({name:e,storeName:s,description:a})}))};var P=s(5843),D=s(6432),R=s(4695),H=s(25),T=s(3657),U=s(658),B=s.n(U),F=s(1864),V=s(1690),A=s(2304),W=s(8008);class $ extends Error{}class z extends Error{}let Q=null;function G(){const[e,t]=(0,x.useState)(!1),{authData:{uid:s},ui:{ready:a,online:r},footprint:{afterMid:i,usersVersion:o,readUsers:l,readChannels:c}}=(0,n.v9)((e=>e)),[d]=(0,F.SO)(),u=(0,n.I0)();let p=!1,h=!1,g=new AbortController;const f=async()=>{if(p||h)return;const{authData:{token:e,expireTime:t=(new Date).getTime(),refreshToken:r}}=W.Z.getState();let n=e;if(B()().isAfter(new Date(t-2e4))){const{data:{token:t},isError:s}=await d({token:e,refreshToken:r});if(s)return;n=t}return h=!0,await(0,H.L)(`${M.ZP}/user/events?${function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=new URLSearchParams;return Object.entries(e).forEach((e=>{let[s,a]=e;a&&t.append(s,a)})),t.toString()}({"api-key":n,users_version:o,after_mid:i})}`,{openWhenHidden:!0,signal:g.signal,async onopen(e){if(h=!1,!e.ok||e.headers.get("content-type")!==H.a)throw e.status>=400&&e.status<500&&429!==e.status?new z:new $;p=!0},onmessage(e){if(h=!1,"FatalError"===e.event)throw new z(e.data);const t=JSON.parse(e.data),{type:r}=t;switch(r){case"heartbeat":default:break;case"ready":u((0,N.Uc)());break;case"users_snapshot":{const{version:e}=t;u((0,L.uM)(e))}break;case"users_log":{const{logs:e}=t;u((0,E.ii)(e))}break;case"user_settings":case"user_settings_changed":Object.keys(t).forEach((e=>{switch(e){case"read_index_groups":u((0,L.TP)(t[e]));break;case"read_index_users":u((0,L.RT)(t[e]));break;case"add_mute_users":case"mute_users":case"add_mute_groups":case"mute_groups":{const s=t[e];if(s&&s.length){const t=e.endsWith("users")?"add_users":"add_groups";u((0,L.Uw)({[t]:s}))}}break;case"remove_mute_users":case"remove_mute_groups":{const s=t[e];if(s&&s.length){const t=e.endsWith("users")?"remove_users":"remove_groups";u((0,L.Uw)({[t]:s}))}}}}));break;case"users_state":case"users_state_changed":{let{type:e,...s}=t;const a="users_state_changed"==e?[s]:s.users;u((0,E._D)(a))}break;case"kick":switch(t.reason){case"login_from_other_device":u((0,V.sQ)()),(0,T.ZP)("kicked from the other device");break;case"delete_user":u((0,V.sQ)()),(0,T.ZP)("sorry, your account has been deleted")}break;case"related_groups":u((0,_.fS)(t.groups));break;case"joined_group":u((0,_.mR)(t.group));break;case"group_changed":{const{gid:e,...s}=t;u((0,_.pW)({id:e,...s}))}break;case"user_joined_group":{const{gid:e,uid:s}=t;u((0,_.pW)({operation:"add_member",id:e,members:s}))}break;case"user_leaved_group":{const{gid:e,uid:a}=t;a.findIndex((e=>e==s))>-1?u((0,_.OG)(e)):u((0,_.pW)({operation:"remove_member",id:e,members:a}))}break;case"kick_from_group":u((0,_.OG)(t.gid));break;case"pinned_message_updated":u((0,_.ac)(t));break;case"chat":(0,A.Z)(t,u,{ready:a,loginUid:s,readUsers:l,readChannels:c})}},onclose(){throw h=!1,new $},onerror(e){throw h=!1,e instanceof z||(m(),Q&&clearTimeout(Q),Q=setTimeout((()=>{p=!1,f()}),2e3)),e}}),h=!1,g},m=()=>{g&&g.abort&&g.abort()};return(0,x.useEffect)((()=>(e&&(r?f():m()),()=>{m()})),[r,e]),{setStreamingReady:e=>{t(e)},startStreaming:f,stopStreaming:m}}var K=s(7471);var q=s(271),J=s(3790);const Y=e=>{const[t,s]=(0,x.useState)(null),a=(0,J.KL)((0,q.ZF)(M.qe));return(0,J.LP)(a,{vapidKey:e}).then((e=>{e&&s(e)})).catch((e=>{})),t},X=()=>{const e=(0,r.s0)(),t=Y(M.um),[s]=(0,F.Vd)();return(0,x.useEffect)((()=>{t&&s(t)}),[t]),(0,x.useEffect)((()=>{var t;const s=t=>{const{newPath:s}=t.data;e(s)};return null===(t=navigator.serviceWorker)||void 0===t||t.addEventListener("message",s),()=>{var e;null===(e=navigator.serviceWorker)||void 0===e||e.removeEventListener("message",s)}}),[]),null};var ee=s(5607),te=s(5044),se=s(1296);const ae=i.ZP.div`
  position: relative;
  margin-top: 15px;
  pointer-events: all;
  width: 406px;
  padding: 16px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 25px 50px rgba(31, 41, 55, 0.25);
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
`;function re(e){let{handleInstall:t,closePrompt:s}=e;return(0,c.jsx)(ee.Z,{mask:!1,children:(0,c.jsxs)(ae,{children:[(0,c.jsx)(te.Z,{className:"close",onClick:s}),(0,c.jsxs)("div",{className:"tip",children:[(0,c.jsx)("h2",{className:"title",children:"Install web app on desktop?"}),(0,c.jsx)("p",{className:"desc",children:"Add to desktop for quick access to this app."})]}),(0,c.jsxs)("div",{className:"btns",children:[(0,c.jsx)(se.Z,{className:"ghost cancel small",onClick:s,children:"Cancel"}),(0,c.jsx)(se.Z,{className:"main small",onClick:t,children:"Install"})]})]})})}function ne(){const{setCanneled:e,prompted:t}={setCanneled:()=>{localStorage.setItem(M.R1,!0)},prompted:!!localStorage.getItem(M.R1),resetPrompt:()=>{localStorage.removeItem(M.R1)}},s=(0,x.useRef)(null),[a,r]=(0,x.useState)(!1);(0,x.useEffect)((()=>{const e=e=>{e.preventDefault(),s.current=e,r(!0)},t=()=>{s.current=null,r(!1)};return window.addEventListener("beforeinstallprompt",e),window.addEventListener("appinstalled",t),()=>{window.removeEventListener("beforeinstallprompt",e),window.removeEventListener("appinstalled",t)}}),[]);return!a||t?null:(0,c.jsx)(re,{handleInstall:async()=>{if(r(!1),!s.current)return;s.current.prompt();const{outcome:e}=await s.current.userChoice;s.current=null},closePrompt:async()=>{e(),r(!1)}})}var ie;function oe(){return oe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},oe.apply(this,arguments)}const le=(e,t)=>{let{title:s,titleId:a,...r}=e;return x.createElement("svg",oe({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},r),s?x.createElement("title",{id:a},s):null,ie||(ie=x.createElement("path",{d:"M8.79053 19.3376C10.0779 20.3775 11.7161 21.0002 13.4999 21.0002C14.6315 21.0002 15.7064 20.7491 16.6701 20.299L20.1027 20.9856C20.3486 21.0348 20.6029 20.9579 20.7802 20.7806C20.9575 20.6032 21.0345 20.349 20.9853 20.1031L20.2988 16.6702C20.7488 15.7065 20.9999 14.6318 20.9999 13.5002C20.9999 11.7168 20.3774 10.0788 19.338 8.79163C19.4443 9.3448 19.4999 9.91599 19.4999 10.5002C19.4999 11.0652 19.4479 11.618 19.3483 12.1541C19.4475 12.5868 19.4999 13.0374 19.4999 13.5002C19.4999 14.4837 19.2638 15.41 18.8458 16.2274C18.7689 16.3779 18.745 16.5501 18.7782 16.7159L19.2938 19.2941L16.7159 18.7784C16.55 18.7452 16.3778 18.7691 16.2273 18.8461C15.4098 19.2641 14.4835 19.5002 13.4999 19.5002C13.037 19.5002 12.5864 19.4478 12.1537 19.3486C11.6176 19.4481 11.0648 19.5002 10.4999 19.5002C9.91613 19.5002 9.34454 19.4443 8.79053 19.3376ZM10.5 3C6.35788 3 3.00001 6.35786 3.00001 10.5C3.00001 11.6316 3.2511 12.7064 3.70112 13.6701L3.01458 17.103C2.9654 17.3489 3.04237 17.6031 3.2197 17.7804C3.39702 17.9577 3.65123 18.0347 3.89713 17.9855L7.32974 17.2988C8.29349 17.7489 9.36836 18 10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3Z",fill:"#70707B"})))},ce=(0,x.forwardRef)(le);var de;function ue(){return ue=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},ue.apply(this,arguments)}const pe=(e,t)=>{let{title:s,titleId:a,...r}=e;return x.createElement("svg",ue({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},r),s?x.createElement("title",{id:a},s):null,de||(de=x.createElement("path",{d:"M17.7541 13.9999C18.9961 13.9999 20.0029 15.0068 20.0029 16.2488V17.1673C20.0029 17.7406 19.8237 18.2997 19.4903 18.7662C17.9445 20.9294 15.4202 22.0011 11.9999 22.0011C8.57891 22.0011 6.05595 20.9289 4.51379 18.7646C4.18182 18.2987 4.00342 17.7409 4.00342 17.1688V16.2488C4.00342 15.0068 5.01027 13.9999 6.25229 13.9999H17.7541ZM11.9999 2.00464C14.7613 2.00464 16.9999 4.24321 16.9999 7.00464C16.9999 9.76606 14.7613 12.0046 11.9999 12.0046C9.23845 12.0046 6.99988 9.76606 6.99988 7.00464C6.99988 4.24321 9.23845 2.00464 11.9999 2.00464Z",fill:"#70707B"})))},he=(0,x.forwardRef)(pe);var ge,fe=s(3812);function me(){return me=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},me.apply(this,arguments)}const xe=(e,t)=>{let{title:s,titleId:a,...r}=e;return x.createElement("svg",me({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},r),s?x.createElement("title",{id:a},s):null,ge||(ge=x.createElement("path",{d:"M13.821 6.5H19.75C20.8867 6.5 21.8266 7.34297 21.9785 8.43788L21.9948 8.59595L22 8.75V17.75C22 18.9409 21.0748 19.9156 19.904 19.9948L19.75 20H4.25C3.05914 20 2.08436 19.0748 2.00519 17.904L2 17.75V10.499L8.20693 10.5L8.40335 10.4914C8.79396 10.4572 9.16896 10.3214 9.49094 10.0977L9.64734 9.9785L13.821 6.5ZM8.20693 4C8.66749 4 9.1153 4.14129 9.49094 4.40235L9.64734 4.5215L11.75 6.273L8.68706 8.82617L8.60221 8.88738C8.51363 8.94232 8.41452 8.9782 8.31129 8.9927L8.20693 9L2 8.999V6.25C2 5.05914 2.92516 4.08436 4.09595 4.00519L4.25 4H8.20693Z",fill:"#70707B"})))},ve=(0,x.forwardRef)(xe);function be(){!function(){const e=new K.Z;(0,x.useEffect)((()=>{e.isSupported()&&e.asyncSetBadge(2).catch((e=>{}))}),[]),e.isSupported()}();const e=(0,r.bS)("/"),t=(0,r.bS)("/chat"),{pathname:s}=(0,r.TH)(),{loginUid:i,ui:{ready:l,remeberedNavs:{chat:d,contact:g}}}=(0,n.v9)((e=>({ui:e.ui,loginUid:e.authData.uid}))),{loading:f}=function(){const{rehydrate:e,rehydrated:t}=S(),{loginUid:s,token:a}=(0,n.v9)((e=>({loginUid:e.authData.uid,token:e.authData.token}))),{setStreamingReady:r}=G(),[i,{isLoading:o,isSuccess:l,isError:c,data:d}]=(0,P.rF)(),[u,{isLoading:p,isSuccess:h,isError:g,data:f}]=(0,D.Uk)(),[m,{isLoading:v,isSuccess:b,isError:w,data:k}]=(0,R.$M)();(0,x.useEffect)((()=>(I(),e(),()=>{r(!1)})),[]),(0,x.useEffect)((()=>{t&&(u(),m(),i())}),[t]);const C=s&&t&&!!a;return(0,x.useEffect)((()=>{r(C)}),[C]),{loading:p||v||o||!t,error:g&&w&&c,success:h&&b&&l,data:{contacts:f,server:k,favorites:d}}}();if(f||!l)return(0,c.jsx)(p.Z,{reload:!0,fullscreen:!0});if(s.startsWith("/setting"))return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(X,{}),(0,c.jsx)(r.j3,{})]});const v=t?"/chat":d||"/chat",b=g||"/contacts";return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(ne,{}),(0,c.jsx)(X,{}),(0,c.jsxs)(o,{children:[(0,c.jsxs)("div",{className:"col left",children:[(0,c.jsx)(u,{uid:i}),(0,c.jsxs)("nav",{className:"link_navs",children:[(0,c.jsx)(a.OL,{className:"link "+(e?"active":""),to:v,children:(0,c.jsx)(h.Z,{tip:"Chat",children:(0,c.jsx)(ce,{})})}),(0,c.jsx)(a.OL,{className:"link",to:b,children:(0,c.jsx)(h.Z,{tip:"Members",children:(0,c.jsx)(he,{})})}),(0,c.jsx)(a.OL,{className:"link",to:"/favs",children:(0,c.jsx)(h.Z,{tip:"Favorites",children:(0,c.jsx)(fe.Z,{})})}),(0,c.jsx)(a.OL,{className:"link",to:"/files",children:(0,c.jsx)(h.Z,{tip:"Files",children:(0,c.jsx)(ve,{})})})]}),(0,c.jsx)(m,{})]}),(0,c.jsx)("div",{className:"col right",children:(0,c.jsx)(r.j3,{})})]})]})}}}]);