"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[527],{8214:(e,t,n)=>{n.d(t,{Z:()=>s});var i,l,a,r=n(7313);function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},o.apply(this,arguments)}const c=(e,t)=>{let{title:n,titleId:c,...s}=e;return r.createElement("svg",o({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":c},s),n?r.createElement("title",{id:c},n):null,i||(i=r.createElement("path",{d:"M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z",fill:"url(#paint0_linear_14171_23293)"})),l||(l=r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.2431 5.96725C12.4162 5.86325 12.6357 5.87375 12.7982 5.99425C12.9602 6.11525 13.0342 6.32125 12.9857 6.51725L11.9857 10.5173C11.9297 10.7403 11.7297 10.8963 11.5002 10.8963H4.50018C4.27068 10.8963 4.07068 10.7397 4.01468 10.5173L3.01468 6.51725C2.96618 6.32125 3.04018 6.11525 3.20218 5.99425C3.36518 5.87425 3.58418 5.86375 3.75768 5.96725L5.84918 7.22225L7.58468 4.61875C7.59654 4.60096 7.61307 4.58921 7.62965 4.57743C7.63964 4.57033 7.64966 4.56321 7.65868 4.55475L7.17718 4.07275C7.08018 3.97575 7.08018 3.81625 7.17718 3.71925L7.82368 3.07275C7.92068 2.97575 8.08018 2.97575 8.17718 3.07275L8.82368 3.71925C8.92068 3.81625 8.92068 3.97575 8.82368 4.07275L8.34218 4.55475C8.3512 4.56338 8.3614 4.57062 8.37161 4.57787C8.38802 4.58951 8.40447 4.60119 8.41618 4.61875L10.1517 7.22225L12.2431 5.96725ZM4.00025 11.3962H12.0002V12.3963H4.00025V11.3962Z",fill:"#ECE9FE"})),a||(a=r.createElement("defs",null,r.createElement("linearGradient",{id:"paint0_linear_14171_23293",x1:0,y1:0,x2:16,y2:-1.66785e-9,gradientUnits:"userSpaceOnUse"},r.createElement("stop",{stopColor:"#7F56D9"}),r.createElement("stop",{offset:1,stopColor:"#9E77ED"})))))},s=(0,r.forwardRef)(c)},5536:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(7313),l=n(4711),a=n(6417);const r=e=>{let{url:t="",name:n="unkonw name",type:r="user",...o}=e;const[c,s]=(0,i.useState)("");return(0,i.useEffect)((()=>{if(t)s(t);else{const e=(0,l.eD)({initials:(0,l.Qm)(n),background:"channel"==r?"#EAECF0":void 0,foreground:"channel"==r?"#475467":void 0});s(e)}}),[t,n]),c?(0,a.jsx)("img",{src:c,onError:e=>{const t=(0,l.eD)({initials:(0,l.Qm)(n),background:"channel"==r?"#EAECF0":void 0,foreground:"channel"==r?"#475467":void 0});s(t)},...o}):null},o=(0,i.memo)(r,((e,t)=>e.url==t.url))},4527:(e,t,n)=>{n.d(t,{Z:()=>x});var i=n(3709),l=n(7890),a=n(2963),r=n(8214),o=n(5536),c=n(1902),s=n(7054),d=n(2648),p=n(6417);function u(e){let{enable:t=!1,uid:n,cid:i,visible:l,hide:r,children:o}=e;const{canCall:c,call:u,copyEmail:h,canCopyEmail:m,startChat:x,canRemove:f,canRemoveFromChannel:g,removeFromChannel:v,removeUser:b}=(0,s.Z)({uid:n,cid:i});return(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(a.ZP,{disabled:!t,visible:l,followCursor:"initial",interactive:!0,placement:"right-start",popperOptions:{strategy:"fixed"},onClickOutside:r,content:(0,p.jsx)(d.Z,{hideMenu:r,items:[{title:"Message",handler:x},c&&{title:"Call",handler:u},m&&{title:"Copy Email",handler:h},g&&{danger:!0,title:"Remove From Channel",handler:v},f&&{danger:!0,title:"Remove From Server",handler:b}]}),children:o},n)})}const h=n(9184).ZP.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  user-select: none;
  &.compact {
    padding: 0;
  }
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
      right: -4px;
      width: 10px;
      height: 10px;
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
`;var m=n(3561);function x(e){let{cid:t=null,owner:n=!1,dm:s=!1,interactive:d=!0,uid:x="",popover:f=!1,compact:g=!1,avatarSize:v=32,enableContextMenu:b=!1}=e;const C=(0,l.s0)(),{visible:w,handleContextMenuEvent:y,hideContextMenu:j}=(0,m.Z)(),E=(0,i.v9)((e=>e.contacts.byId[x]));return E?(0,p.jsx)(u,{cid:t,uid:x,enable:b,visible:w,hide:j,children:(0,p.jsx)(a.ZP,{inertia:!0,interactive:!0,disabled:!f,placement:"left",trigger:"click",content:(0,p.jsx)(c.Z,{uid:x,type:"card",cid:t}),children:(0,p.jsxs)(h,{onContextMenu:b?y:null,size:v,onDoubleClick:s?()=>{C(`/chat/dm/${x}`)}:null,className:`${d?"interactive":""} ${g?"compact":""}`,children:[(0,p.jsxs)("div",{className:"avatar",children:[(0,p.jsx)(o.Z,{url:E.avatar,name:E.name,alt:"avatar"}),(0,p.jsx)("div",{className:"status "+(E.online?"online":"offline")})]}),!g&&(0,p.jsx)("span",{className:"name",children:null===E||void 0===E?void 0:E.name}),n&&(0,p.jsx)(r.Z,{})]})})}):null}},2648:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(8198),l=n(6417);function a(e){let{items:t=[],hideMenu:n=null}=e;return(0,l.jsx)(i.Z,{children:t.map((e=>{if(!e)return null;const{title:t,icon:i=null,handler:a=(e=>{e.preventDefault(),n&&n()}),underline:r=!1,danger:o=!1}=e;return(0,l.jsxs)("li",{className:`item ${r?"underline":""} ${o?"danger":""}`,onClick:e=>{e.stopPropagation(),e.preventDefault(),a(e),n&&n()},children:[i,t]},t)}))})}},1902:(e,t,n)=>{n.d(t,{Z:()=>E});var i,l=n(3709),a=n(9466),r=n(2963),o=n(7313);function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},c.apply(this,arguments)}const s=(e,t)=>{let{title:n,titleId:l,...a}=e;return o.createElement("svg",c({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":l},a),n?o.createElement("title",{id:l},n):null,i||(i=o.createElement("path",{d:"M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35578 20.8583L3.06538 21.9753C2.6111 22.0937 2.1469 21.8213 2.02858 21.367C1.99199 21.2266 1.99198 21.0791 2.02855 20.9386L3.1449 16.6502C2.3972 15.2294 2 13.6428 2 12C2 6.47715 6.47715 2 12 2Z",fill:"#22CCEE"})))},d=(0,o.forwardRef)(s);var p;function u(){return u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},u.apply(this,arguments)}const h=(e,t)=>{let{title:n,titleId:i,...l}=e;return o.createElement("svg",u({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":i},l),n?o.createElement("title",{id:i},n):null,p||(p=o.createElement("path",{d:"M7.7716 2.43923L8.84819 2.09522C9.85701 1.77287 10.9349 2.29382 11.3669 3.31256L12.2266 5.33991C12.6013 6.22336 12.3934 7.26227 11.7126 7.9084L9.81832 9.70641C9.9352 10.7819 10.2967 11.8409 10.9029 12.8834C11.509 13.9259 12.266 14.7907 13.1739 15.4778L15.4491 14.7191C16.3115 14.4315 17.2507 14.762 17.7797 15.5392L19.0121 17.3498C19.627 18.2532 19.5164 19.4995 18.7534 20.2655L17.9356 21.0865C17.1217 21.9036 15.9592 22.2 14.8838 21.8645C12.3449 21.0726 10.0106 18.7214 7.88083 14.8109C5.74796 10.8947 4.99521 7.57214 5.62258 4.84313C5.88658 3.69482 6.70409 2.78033 7.7716 2.43923Z",fill:"#70707B"})))},m=(0,o.forwardRef)(h);var x;function f(){return f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},f.apply(this,arguments)}const g=(e,t)=>{let{title:n,titleId:i,...l}=e;return o.createElement("svg",f({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":i},l),n?o.createElement("title",{id:i},n):null,x||(x=o.createElement("path",{d:"M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z",fill:"#616161"})))},v=(0,o.forwardRef)(g);var b=n(5536);const C=n(9184).ZP.div`
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
    box-shadow: 0px 20px 25px 20px rgba(31, 41, 55, 0.1),
      0px 10px 10px rgba(31, 41, 55, 0.04);
    border-radius: 6px;
    .icons {
      padding-bottom: 2px;
    }
  }
`;var w=n(8198),y=n(7054),j=n(6417);function E(e){let{uid:t=null,type:n="embed",cid:i=null}=e;const{canCall:o,call:c,canCopyEmail:s,copyEmail:p,removeFromChannel:u,canRemoveFromChannel:h,canRemove:x,removeUser:f}=(0,y.Z)({uid:t,cid:i}),{data:g}=(0,l.v9)((e=>({data:e.contacts.byId[t]})));if(!g)return null;const{name:E,email:Z,avatar:k}=g,N="card"==n&&o,M="embed"==n&&x,R=N||Z||h||M;return(0,j.jsxs)(C,{className:n,children:[(0,j.jsx)(b.Z,{className:"avatar",url:k,name:E}),(0,j.jsx)("h2",{className:"name",children:E}),(0,j.jsx)("span",{className:"email",children:Z}),(0,j.jsxs)("ul",{className:"icons",children:[(0,j.jsx)(a.OL,{to:`/chat/dm/${t}`,children:(0,j.jsxs)("li",{className:"icon chat",children:[(0,j.jsx)(d,{}),(0,j.jsx)("span",{className:"txt",children:"Message"})]})}),"embed"==n&&(0,j.jsxs)("li",{className:"icon call",onClick:c,children:[(0,j.jsx)(m,{}),(0,j.jsx)("span",{className:"txt",children:"Call"})]}),(0,j.jsx)(r.ZP,{disabled:!R,interactive:!0,popperOptions:{strategy:"fixed"},placement:"bottom-start",trigger:"click",hideOnClick:!0,content:(0,j.jsxs)(w.Z,{children:[N&&(0,j.jsx)("li",{className:"item",onClick:c,children:"Call"}),s&&(0,j.jsx)("li",{className:"item",onClick:p,children:"Copy Email"}),h&&(0,j.jsx)("li",{className:"item danger",onClick:u,children:"Remove from Channel"}),M&&(0,j.jsx)("li",{className:"item danger",onClick:f,children:"Remove from Server"})]}),children:(0,j.jsxs)("li",{className:"icon more "+(R?"":"disabled"),children:[(0,j.jsx)(v,{}),(0,j.jsx)("span",{className:"txt",children:"More"})]})})]})]})}},8198:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n(9184).ZP.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
  background-color: #fff;
  box-shadow: 0px 20px 25px 20px rgba(31, 41, 55, 0.1),
    0px 10px 10px rgba(31, 41, 55, 0.04);
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
`},7054:(e,t,n)=>{n.d(t,{Z:()=>p});var i=n(7313),l=n(3657),a=n(3709),r=n(7890),o=n(9784),c=n(5564),s=n(6432),d=n(1026);function p(e){let{uid:t,cid:n}=e;const[p,u]=(0,i.useState)(void 0),h=(0,r.bS)(`/contacts/${t}`),[m,{isSuccess:x}]=(0,s.QQ)(),[f,{isSuccess:g}]=(0,c.Cg)(),v=(0,r.s0)(),{copy:b}=(0,d.Z)(),{user:C,channel:w,loginUid:y,isAdmin:j}=(0,a.v9)((e=>{var i;return{user:e.contacts.byId[t],channel:e.channels.byId[n],loginUid:e.authData.uid,isAdmin:null===(i=e.contacts.byId[e.authData.uid])||void 0===i?void 0:i.is_admin}}));(0,i.useEffect)((()=>{u(null!==t&&void 0!==t?t:y)}),[t,y]),(0,i.useEffect)((()=>{(g||x)&&(l.ZP.success("Remove Successfully"),x&&h&&v("/contacts"))}),[g,x,h]);const E=n&&!(null!==w&&void 0!==w&&w.is_public)&&(j||(null===w||void 0===w?void 0:w.owner)==y),Z=y!=t;return{canRemove:j&&y!=t&&!n,removeUser:e=>{const t=!Number.isNaN(+e);m(t&&e||p),(0,o.Bn)()},startChat:()=>{v(`/chat/dm/${t}`)},removeFromChannel:e=>{const t=!Number.isNaN(+e);f({id:+n,members:[+(t&&e||p)]}),(0,o.Bn)()},canRemoveFromChannel:E,canCopyEmail:!(null===C||void 0===C||!C.email),copyEmail:e=>{const t="string"==typeof e&&e||(null===C||void 0===C?void 0:C.email);b(t),(0,o.Bn)()},canCall:Z,call:()=>{l.ZP.success("Cooming Soon..."),(0,o.Bn)()}}}},3561:(e,t,n)=>{n.d(t,{Z:()=>c});var i=n(7313),l=n(9784),a=n(2963),r=n(2648),o=n(6417);function c(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"right-start";const[t,n]=(0,i.useState)(!1),[c,s]=(0,i.useState)({x:0,y:0}),d=t=>{(0,l.Bn)(),t.preventDefault();const{currentTarget:i,clientX:a,clientY:r}=t,{left:o,top:c,width:d,height:p}=i.getBoundingClientRect();let u,h;"right-start"==e?(u=a-(o+d),h=c+p-r):(u=a-o,h=c-r),s({x:u,y:h}),n(!0)},p=()=>{n(!1)},u=e=>{let{key:n,items:i,children:l}=e;return(0,o.jsx)(a.ZP,{visible:t,followCursor:"initial",interactive:!0,placement:"right-start",popperOptions:{strategy:"fixed"},onClickOutside:p,content:(0,o.jsx)(r.Z,{hideMenu:p,items:i}),children:l},n)};return{ContextMenu:u,offset:c,visible:t,hideContextMenu:p,handleContextMenuEvent:d}}},1026:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(7313),l=n(1818),a=n(3657);const r=e=>{const{enableToast:t=!0}=e||{},[n,r]=(0,i.useState)(!1);(0,i.useEffect)((()=>{n&&t&&a.ZP.success("Copied!")}),[n]);const o=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);t.select();const i=document.execCommand("copy");return document.body.removeChild(t),n&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(n)),i};return{copied:n,copy:function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=0;return n||(t?(0,l.VP)(e).then((()=>{r(!0),i=setTimeout((()=>{r(!1)}),500)})):(r(o(e)),i=setTimeout((()=>{r(!1)}),500))),()=>{clearTimeout(i)}}}}}}]);