"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[527],{8214:(e,t,n)=>{n.d(t,{Z:()=>c});var a,i,l,r=n(7313);function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o.apply(this,arguments)}const s=(e,t)=>{let{title:n,titleId:s,...c}=e;return r.createElement("svg",o({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":s},c),n?r.createElement("title",{id:s},n):null,a||(a=r.createElement("path",{d:"M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z",fill:"url(#paint0_linear_14171_23293)"})),i||(i=r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.2431 5.96725C12.4162 5.86325 12.6357 5.87375 12.7982 5.99425C12.9602 6.11525 13.0342 6.32125 12.9857 6.51725L11.9857 10.5173C11.9297 10.7403 11.7297 10.8963 11.5002 10.8963H4.50018C4.27068 10.8963 4.07068 10.7397 4.01468 10.5173L3.01468 6.51725C2.96618 6.32125 3.04018 6.11525 3.20218 5.99425C3.36518 5.87425 3.58418 5.86375 3.75768 5.96725L5.84918 7.22225L7.58468 4.61875C7.59654 4.60096 7.61307 4.58921 7.62965 4.57743C7.63964 4.57033 7.64966 4.56321 7.65868 4.55475L7.17718 4.07275C7.08018 3.97575 7.08018 3.81625 7.17718 3.71925L7.82368 3.07275C7.92068 2.97575 8.08018 2.97575 8.17718 3.07275L8.82368 3.71925C8.92068 3.81625 8.92068 3.97575 8.82368 4.07275L8.34218 4.55475C8.3512 4.56338 8.3614 4.57062 8.37161 4.57787C8.38802 4.58951 8.40447 4.60119 8.41618 4.61875L10.1517 7.22225L12.2431 5.96725ZM4.00025 11.3962H12.0002V12.3963H4.00025V11.3962Z",fill:"#ECE9FE"})),l||(l=r.createElement("defs",null,r.createElement("linearGradient",{id:"paint0_linear_14171_23293",x1:0,y1:0,x2:16,y2:-1.66785e-9,gradientUnits:"userSpaceOnUse"},r.createElement("stop",{stopColor:"#7F56D9"}),r.createElement("stop",{offset:1,stopColor:"#9E77ED"})))))},c=(0,r.forwardRef)(s)},4527:(e,t,n)=>{n.d(t,{Z:()=>f});var a=n(3709),i=n(7890),l=n(2963),r=n(8214),o=n(5536),s=n(1902),c=n(7054),d=n(2648),p=n(6417);function u(e){let{enable:t=!1,uid:n,cid:a,visible:i,hide:r,children:o}=e;const{canCall:s,call:u,copyEmail:h,canCopyEmail:m,startChat:f,canRemove:x,canRemoveFromChannel:g,removeFromChannel:v,removeUser:b}=(0,c.Z)({uid:n,cid:a});return(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(l.ZP,{disabled:!t,visible:i,followCursor:"initial",interactive:!0,placement:"right-start",popperOptions:{strategy:"fixed"},onClickOutside:r,content:(0,p.jsx)(d.Z,{hideMenu:r,items:[{title:"Message",handler:f},s&&{title:"Call",handler:u},m&&{title:"Copy Email",handler:h},g&&{danger:!0,title:"Remove From Channel",handler:v},x&&{danger:!0,title:"Remove From Server",handler:b}]}),children:o},n)})}const h=n(9184).ZP.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  user-select: none;

  &.interactive {
    &:hover,
    &.active {
      background: rgba(116, 127, 141, 0.1);
    }
  }
  .avatar {
    cursor: pointer;
    width: ${e=>{let{size:t}=e;return`${t}px`}};
    height: ${e=>{let{size:t}=e;return`${t}px`}};
    position: relative;
    img {
      object-fit: cover;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
    .status {
      position: absolute;
      bottom: -2px;
      right: -6px;
      width: 12px;
      height: 12px;
      box-sizing: content-box;
      border-radius: 50%;
      border: 2px solid #fff;
      &.online {
        background-color: #22c55e;
      }
      &.offline {
        background-color: #a1a1aa;
      }
      &.alert {
        background-color: #dc2626;
      }
    }
  }
  .name {
    /* user-select: text; */
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #52525b;
  }
  /* session nav */
  &.compact {
    padding: 0;
    .avatar .status {
      width: 15px;
      height: 15px;
    }
  }
`;var m=n(3561);function f(e){let{cid:t=null,owner:n=!1,dm:c=!1,interactive:d=!0,uid:f="",popover:x=!1,compact:g=!1,avatarSize:v=32,enableContextMenu:b=!1}=e;const C=(0,i.s0)(),{visible:w,handleContextMenuEvent:y,hideContextMenu:j}=(0,m.Z)(),E=(0,a.v9)((e=>e.contacts.byId[f]));return E?(0,p.jsx)(u,{cid:t,uid:f,enable:b,visible:w,hide:j,children:(0,p.jsx)(l.ZP,{inertia:!0,interactive:!0,disabled:!x,placement:"left",trigger:"click",content:(0,p.jsx)(s.Z,{uid:f,type:"card",cid:t}),children:(0,p.jsxs)(h,{onContextMenu:b?y:null,size:v,onDoubleClick:c?()=>{C(`/chat/dm/${f}`)}:null,className:`${d?"interactive":""} ${g?"compact":""}`,children:[(0,p.jsxs)("div",{className:"avatar",children:[(0,p.jsx)(o.Z,{url:E.avatar,name:E.name,alt:"avatar"}),(0,p.jsx)("div",{className:"status "+(E.online?"online":"offline")})]}),!g&&(0,p.jsx)("span",{className:"name",children:null===E||void 0===E?void 0:E.name}),n&&(0,p.jsx)(r.Z,{})]})})}):null}},2648:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(8198),i=n(6417);function l(e){let{items:t=[],hideMenu:n=null}=e;return(0,i.jsx)(a.Z,{children:t.map((e=>{if(!e)return null;const{title:t,icon:a=null,handler:l=(e=>{e.preventDefault(),n&&n()}),underline:r=!1,danger:o=!1}=e;return(0,i.jsxs)("li",{className:`item ${r?"underline":""} ${o?"danger":""}`,onClick:e=>{e.stopPropagation(),e.preventDefault(),l(e),n&&n()},children:[a,t]},t)}))})}},1902:(e,t,n)=>{n.d(t,{Z:()=>E});var a,i=n(3709),l=n(9466),r=n(2963),o=n(7313);function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},s.apply(this,arguments)}const c=(e,t)=>{let{title:n,titleId:i,...l}=e;return o.createElement("svg",s({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":i},l),n?o.createElement("title",{id:i},n):null,a||(a=o.createElement("path",{d:"M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35578 20.8583L3.06538 21.9753C2.6111 22.0937 2.1469 21.8213 2.02858 21.367C1.99199 21.2266 1.99198 21.0791 2.02855 20.9386L3.1449 16.6502C2.3972 15.2294 2 13.6428 2 12C2 6.47715 6.47715 2 12 2Z",fill:"#22CCEE"})))},d=(0,o.forwardRef)(c);var p;function u(){return u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},u.apply(this,arguments)}const h=(e,t)=>{let{title:n,titleId:a,...i}=e;return o.createElement("svg",u({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},i),n?o.createElement("title",{id:a},n):null,p||(p=o.createElement("path",{d:"M7.7716 2.43923L8.84819 2.09522C9.85701 1.77287 10.9349 2.29382 11.3669 3.31256L12.2266 5.33991C12.6013 6.22336 12.3934 7.26227 11.7126 7.9084L9.81832 9.70641C9.9352 10.7819 10.2967 11.8409 10.9029 12.8834C11.509 13.9259 12.266 14.7907 13.1739 15.4778L15.4491 14.7191C16.3115 14.4315 17.2507 14.762 17.7797 15.5392L19.0121 17.3498C19.627 18.2532 19.5164 19.4995 18.7534 20.2655L17.9356 21.0865C17.1217 21.9036 15.9592 22.2 14.8838 21.8645C12.3449 21.0726 10.0106 18.7214 7.88083 14.8109C5.74796 10.8947 4.99521 7.57214 5.62258 4.84313C5.88658 3.69482 6.70409 2.78033 7.7716 2.43923Z",fill:"#70707B"})))},m=(0,o.forwardRef)(h);var f;function x(){return x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},x.apply(this,arguments)}const g=(e,t)=>{let{title:n,titleId:a,...i}=e;return o.createElement("svg",x({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},i),n?o.createElement("title",{id:a},n):null,f||(f=o.createElement("path",{d:"M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z",fill:"#616161"})))},v=(0,o.forwardRef)(g);var b=n(5536);const C=n(9184).ZP.div`
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  width: 432px;
  gap: 4px;
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
  .name {
    user-select: text;
    font-weight: bold;
    font-size: 18px;
    line-height: 100%;
    color: #1c1c1e;
  }
  .email {
    user-select: text;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #98a2b3;
  }
  .intro {
    color: #344054;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
  .icons {
    margin-top: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    .icon {
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #22ccee;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 4px;
      background: #f9fafb;
      border-radius: 8px;
      width: 128px;
      padding: 14px 0 12px 0;

      &:not(.disabled):hover {
        background: #f2f4f7;
      }
      &.call,
      &.more {
        svg path {
          fill: #22ccee;
        }
      }
      &.disabled {
        color: #667085;
        svg path {
          fill: #667085;
        }
      }
      .txt {
        user-select: none;
      }
    }
  }
  .line {
    width: 100%;
    height: 1px;
    border: none;
    background-color: rgba(0, 0, 0, 0.1);
  }
  &.card {
    padding: 16px;
    width: 280px;
    background: #ffffff;
    box-shadow: 0px 20px 25px 20px rgba(31, 41, 55, 0.1), 0px 10px 10px rgba(31, 41, 55, 0.04);
    border-radius: 6px;
    .icons {
      padding-bottom: 2px;
    }
  }
`;var w=n(8198),y=n(7054),j=n(6417);function E(e){let{uid:t=null,type:n="embed",cid:a=null}=e;const{canCall:o,call:s,canCopyEmail:c,copyEmail:p,removeFromChannel:u,canRemoveFromChannel:h,canRemove:f,removeUser:x}=(0,y.Z)({uid:t,cid:a}),{data:g}=(0,i.v9)((e=>({data:e.contacts.byId[t]})));if(!g)return null;const{name:E,email:Z,avatar:k}=g,N="card"==n&&o,S="embed"==n&&f,M=N||Z||h||S;return(0,j.jsxs)(C,{className:n,children:[(0,j.jsx)(b.Z,{className:"avatar",url:k,name:E}),(0,j.jsx)("h2",{className:"name",children:E}),(0,j.jsx)("span",{className:"email",children:Z}),(0,j.jsxs)("ul",{className:"icons",children:[(0,j.jsx)(l.OL,{to:`/chat/dm/${t}`,children:(0,j.jsxs)("li",{className:"icon chat",children:[(0,j.jsx)(d,{}),(0,j.jsx)("span",{className:"txt",children:"Message"})]})}),N&&(0,j.jsxs)("li",{className:"icon call",onClick:s,children:[(0,j.jsx)(m,{}),(0,j.jsx)("span",{className:"txt",children:"Call"})]}),(0,j.jsx)(r.ZP,{disabled:!M,interactive:!0,popperOptions:{strategy:"fixed"},placement:"bottom-start",trigger:"click",hideOnClick:!0,content:(0,j.jsxs)(w.Z,{children:[N&&(0,j.jsx)("li",{className:"item",onClick:s,children:"Call"}),c&&(0,j.jsx)("li",{className:"item",onClick:p,children:"Copy Email"}),h&&(0,j.jsx)("li",{className:"item danger",onClick:u,children:"Remove from Channel"}),S&&(0,j.jsx)("li",{className:"item danger",onClick:x,children:"Remove from Server"})]}),children:(0,j.jsxs)("li",{className:"icon more "+(M?"":"disabled"),children:[(0,j.jsx)(v,{}),(0,j.jsx)("span",{className:"txt",children:"More"})]})})]})]})}},8198:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n(9184).ZP.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
  background-color: #fff;
  box-shadow: 0px 20px 25px 20px rgba(31, 41, 55, 0.1), 0px 10px 10px rgba(31, 41, 55, 0.04);
  border-radius: 12px;
  min-width: 200px;
  .item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 6px;
    padding: 6px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #616161;
    .icon {
      width: 20px;
      height: 20px;
      path {
        fill: #475467;
      }
    }
    &.sb {
      justify-content: space-between;
    }
    &:hover {
      background-color: #22ccee;
      color: #fff;
      .icon {
        path {
          fill: #fff;
        }
      }
    }
    &.underline {
      margin-bottom: 9px;
      &:before {
        position: absolute;
        content: "";
        left: 6px;
        bottom: -4px;
        display: block;
        padding: 0 6px;
        box-sizing: border-box;
        width: calc(100% - 12px);
        height: 1px;
        background-color: #f2f4f7;
      }
    }
    &.danger {
      color: #a11043;
      &:hover {
        background-color: #b42318;
        color: #fff;
      }
    }
    &[data-disabled="true"] {
      color: #a4a8b3;
      .icon {
        path {
          fill: #a4a8b3;
        }
      }
    }
  }
`},4263:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(7313),i=n(4711),l=n(3657),r=n(4695);let o=null;function s(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"smtp";const[t,n]=(0,a.useState)(!1),[s,c]=(0,a.useState)({}),[d,{isSuccess:p}]=(0,r.QP)(),[u,{isSuccess:h}]=(0,r.WO)(),[m,{data:f}]=(0,r.bx)(),[x,{isSuccess:g}]=(0,r.vF)(),[v,{data:b}]=(0,r.kv)(),[C,{data:w}]=(0,r.rW)(),[y,{data:j}]=(0,r.Ke)(),[E,{isSuccess:Z}]=(0,r.FV)(),k={login:d,smtp:u,agora:x,firebase:E},N={smtp:C,agora:m,firebase:y,login:v},S={login:p,smtp:h,agora:g,firebase:Z},M=k[e],O=N[e],R=S[e],L=()=>{c(o)},P=()=>{c((e=>({...e,enabled:!e.enabled})))};return(0,a.useEffect)((()=>{switch(e){case"firebase":y();break;case"agora":m();break;case"smtp":C();break;case"login":v()}}),[e]),(0,a.useEffect)((()=>{R&&(l.ZP.success("Configuration Updated!"),O())}),[R]),(0,a.useEffect)((()=>{const e=w||j||b||f;e&&(o=e,c(e))}),[w,j,b,f]),(0,a.useEffect)((()=>{(0,i.Z1)(o,s)?n(!1):n(!0)}),[s]),{reset:L,changed:t,updateConfig:M,agoraConfig:f,values:s,setValues:c,toggleEnable:P}}},7054:(e,t,n)=>{n.d(t,{Z:()=>u});var a=n(7313),i=n(3657),l=n(3709),r=n(7890),o=n(9784),s=n(5564),c=n(6432),d=n(4263),p=n(1026);function u(e){let{uid:t,cid:n}=e;const[u,h]=(0,a.useState)(void 0),{values:m}=(0,d.Z)("agora"),f=(0,r.bS)(`/contacts/${t}`),[x,{isSuccess:g}]=(0,c.QQ)(),[v,{isSuccess:b}]=(0,s.Cg)(),C=(0,r.s0)(),{copy:w}=(0,p.Z)(),{user:y,channel:j,loginUid:E,isAdmin:Z}=(0,l.v9)((e=>{var a;return{user:e.contacts.byId[t],channel:e.channels.byId[n],loginUid:e.authData.uid,isAdmin:null===(a=e.contacts.byId[e.authData.uid])||void 0===a?void 0:a.is_admin}}));(0,a.useEffect)((()=>{h(null!==t&&void 0!==t?t:E)}),[t,E]),(0,a.useEffect)((()=>{(b||g)&&(i.ZP.success("Remove Successfully"),g&&f&&C("/contacts"))}),[b,g,f]);const k=n&&!(null!==j&&void 0!==j&&j.is_public)&&(Z||(null===j||void 0===j?void 0:j.owner)==E),N=m.enabled&&E!=t;return{canRemove:Z&&E!=t&&!n,removeUser:e=>{const t=!Number.isNaN(+e);x(t&&e||u),(0,o.Bn)()},startChat:()=>{C(`/chat/dm/${t}`)},removeFromChannel:e=>{const t=!Number.isNaN(+e);v({id:+n,members:[+(t&&e||u)]}),(0,o.Bn)()},canRemoveFromChannel:k,canCopyEmail:!(null===y||void 0===y||!y.email),copyEmail:e=>{const t="string"==typeof e&&e||(null===y||void 0===y?void 0:y.email);w(t),(0,o.Bn)()},canCall:N,call:()=>{i.ZP.success("Cooming Soon..."),(0,o.Bn)()}}}},3561:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(7313),i=n(9784),l=n(2963),r=n(2648),o=n(6417);function s(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"right-start";const[t,n]=(0,a.useState)(!1),[s,c]=(0,a.useState)({x:0,y:0}),d=t=>{(0,i.Bn)(),t.preventDefault();const{currentTarget:a,clientX:l,clientY:r}=t,{left:o,top:s,width:d,height:p}=a.getBoundingClientRect();let u,h;"right-start"==e?(u=l-(o+d),h=s+p-r):(u=l-o,h=s-r),c({x:u,y:h}),n(!0)},p=()=>{n(!1)},u=e=>{let{key:n,items:a,children:i}=e;return(0,o.jsx)(l.ZP,{visible:t,followCursor:"initial",interactive:!0,placement:"right-start",popperOptions:{strategy:"fixed"},onClickOutside:p,content:(0,o.jsx)(r.Z,{hideMenu:p,items:a}),children:i},n)};return{ContextMenu:u,offset:s,visible:t,hideContextMenu:p,handleContextMenuEvent:d}}},1026:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(7313),i=n(1818),l=n(3657);const r=e=>{const{enableToast:t=!0}=e||{},[n,r]=(0,a.useState)(!1);(0,a.useEffect)((()=>{n&&t&&l.ZP.success("Copied!")}),[n]);const o=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);t.select();const a=document.execCommand("copy");return document.body.removeChild(t),n&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(n)),a};return{copied:n,copy:function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=0;return n||(t?(0,i.VP)(e).then((()=>{r(!0),a=setTimeout((()=>{r(!1)}),500)})):(r(o(e)),a=setTimeout((()=>{r(!1)}),500))),()=>{clearTimeout(a)}}}}}}]);