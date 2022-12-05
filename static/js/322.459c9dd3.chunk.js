"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[322],{79884:(e,t,n)=>{n.d(t,{Z:()=>o});var i,a=n(70537);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},l.apply(this,arguments)}const s=(e,t)=>{let{title:n,titleId:s,...o}=e;return a.createElement("svg",l({width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":s},o),n?a.createElement("title",{id:s},n):null,i||(i=a.createElement("path",{d:"M6.48667 11.6667L6.83667 8.33333H3.325V6.66667H7L7.43333 2.5H9.10833L8.66667 6.66667H11.9833L12.4167 2.5H14.0917L13.65 6.66667H16.625V8.33333H13.4667L13.1167 11.6667H16.6167V13.3333H12.9333L12.4917 17.5H10.8083L11.2417 13.3333H7.91667L7.475 17.5H5.8L6.23333 13.3333H3.25V11.6667H6.4H6.48667ZM8.1625 11.6667H11.4875L11.8375 8.33333H8.5125L8.1625 11.6667Z",fill:"#616161"})))},o=(0,a.forwardRef)(s)},64631:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(70537),a=n(21812),l=n(80683);const s=e=>{let{url:t="",name:n="Deleted User",type:s="user",...o}=e;const[r,c]=(0,i.useState)("");return(0,i.useEffect)((()=>{if(t)c(t);else{const e=(0,a.eD)({initials:(0,a.Qm)(n),background:"channel"==s?"#EAECF0":void 0,foreground:"channel"==s?"#475467":void 0});c(e)}}),[t,n]),r?(0,l.jsx)("img",{src:r,onError:e=>{const t=(0,a.eD)({initials:(0,a.Qm)(n),background:"channel"==s?"#EAECF0":void 0,foreground:"channel"==s?"#475467":void 0});c(t)},...o}):null},o=(0,i.memo)(s,((e,t)=>e.url==t.url))},80874:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(70537),a=n(10336);const l=e=>{let{id:t="root-modal",mask:n=!0,children:l}=e;const[s,o]=(0,i.useState)(null);return(0,i.useEffect)((()=>{const e=document.getElementById(t);if(!e)return;n&&e.classList.add("mask");const i=document.createElement("div");return i.classList.add("wrapper"),e.appendChild(i),o(i),()=>{e.removeChild(i)}}),[t,n]),s?(0,a.createPortal)(l,s):null}},71044:(e,t,n)=>{n.d(t,{Z:()=>C});var i,a=n(70537),l=n(64084),s=n(7829);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},o.apply(this,arguments)}const r=(e,t)=>{let{title:n,titleId:l,...s}=e;return a.createElement("svg",o({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":l},s),n?a.createElement("title",{id:l},n):null,i||(i=a.createElement("path",{d:"M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35578 20.8583L3.06538 21.9753C2.6111 22.0937 2.1469 21.8213 2.02858 21.367C1.99199 21.2266 1.99198 21.0791 2.02855 20.9386L3.1449 16.6502C2.3972 15.2294 2 13.6428 2 12C2 6.47715 6.47715 2 12 2Z",fill:"#22CCEE"})))},c=(0,a.forwardRef)(r);var d;function p(){return p=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},p.apply(this,arguments)}const u=(e,t)=>{let{title:n,titleId:i,...l}=e;return a.createElement("svg",p({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":i},l),n?a.createElement("title",{id:i},n):null,d||(d=a.createElement("path",{d:"M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z",fill:"#616161"})))},f=(0,a.forwardRef)(u);var m=n(64631);const x=n(57889).ZP.div`
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  width: 432px;
  gap: 4px;
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
`;var g=n(63211),h=n(50911),v=n(66160),b=n(71893),y=n(80683);const w=e=>{let{uid:t,type:n="embed",cid:i}=e;const{t:a}=(0,b.$)("member"),{t:o}=(0,b.$)(),{canCopyEmail:r,copyEmail:d,removeFromChannel:p,canRemoveFromChannel:u,canRemove:w,removeUser:C}=(0,h.Z)({uid:t,cid:i}),{data:j}=(0,v.CG)((e=>({data:e.users.byId[t]})));if(!j)return null;const{name:E,email:Z,avatar:N}=j,k="embed"==n&&w,L=Z||u||k;return(0,y.jsxs)(x,{className:n,children:[(0,y.jsx)(m.Z,{className:"rounded-full w-20 h-20 object-cover",url:N,name:E}),(0,y.jsx)("h2",{className:"text-lg select-text font-bold text-[#1c1c1e]",children:E}),(0,y.jsx)("span",{className:"text-sm text-[#98a2b3] select-text",children:Z}),(0,y.jsxs)("ul",{className:"icons",children:[(0,y.jsx)(l.OL,{to:`/chat/dm/${t}`,children:(0,y.jsxs)("li",{className:"icon chat",children:[(0,y.jsx)(c,{}),(0,y.jsx)("span",{className:"txt",children:a("send_msg")})]})}),(0,y.jsx)(s.ZP,{disabled:!L,interactive:!0,popperOptions:{strategy:"fixed"},placement:"bottom-start",trigger:"click",hideOnClick:!0,content:(0,y.jsxs)(g.Z,{children:[r&&(0,y.jsx)("li",{className:"item",onClick:d.bind(void 0,Z),children:a("copy_email")}),u&&(0,y.jsx)("li",{className:"item danger",onClick:p.bind(null,t),children:a("remove_from_channel")}),k&&(0,y.jsx)("li",{className:"item danger",onClick:C.bind(null,t),children:a("remove")})]}),children:(0,y.jsxs)("li",{className:"icon more "+(L?"":"disabled"),children:[(0,y.jsx)(f,{}),(0,y.jsx)("span",{className:"txt",children:o("more")})]})})]})]})},C=(0,a.memo)(w)},63211:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n(57889).ZP.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
  background-color: #fff;
  box-shadow: 0 20px 25px 20px rgba(31, 41, 55, 0.1), 0 10px 10px rgba(31, 41, 55, 0.04);
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
    &.bottom_line {
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
`},48636:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(70537),a=n(27418),l=n(38289),s=n(65809);let o;function r(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"smtp";const[t,n]=(0,i.useState)(!1),[r,c]=(0,i.useState)(void 0),[d,{isSuccess:p,isLoading:u}]=(0,s.QP)(),[f,{isSuccess:m,isLoading:x}]=(0,s.WO)(),[g,{isSuccess:h,isLoading:v}]=(0,s.vF)(),[b,{isSuccess:y,isLoading:w}]=(0,s.FV)(),[C,{data:j}]=(0,s.bx)(),[E,{data:Z}]=(0,s.kv)(),[N,{data:k}]=(0,s.rW)(),[L,{data:O}]=(0,s.Ke)(),S={login:d,smtp:f,agora:g,firebase:b},_={smtp:N,agora:C,firebase:L,login:E},H={login:p,smtp:m,agora:h,firebase:y},P={login:u,smtp:x,agora:v,firebase:w},D=S[e],R=_[e],F=H[e],I=P[e],T=()=>{c(void 0)},B=()=>{c((e=>e&&"enabled"in e?{...e,enabled:!e.enabled}:e))};return(0,i.useEffect)((()=>{R()}),[]),(0,i.useEffect)((()=>{F&&(a.ZP.success("Configuration Updated!"),R())}),[F]),(0,i.useEffect)((()=>{const e=k||O||Z||j;e&&(o=e,c(e))}),[k,O,Z,j]),(0,i.useEffect)((()=>{r&&0!=Object.keys(r).length&&((0,l.isEqual)(o,r)?n(!1):n(!0))}),[r]),{updating:I,updated:F,reset:T,changed:t,updateConfig:D,agoraConfig:j,values:r,setValues:c,toggleEnable:B}}},26209:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(70537),a=n(34108),l=n(27418);const s=e=>{const{enableToast:t=!0}=e||{},[n,s]=(0,i.useState)(!1);(0,i.useEffect)((()=>{n&&t&&l.ZP.success("Copied!")}),[n]);const o=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection();if(!n)return!1;const i=n.rangeCount>0&&n.getRangeAt(0);t.select();const a=document.execCommand("copy");return document.body.removeChild(t),i&&(n.removeAllRanges(),n.addRange(i)),a};return{copied:n,copy:function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=0;return n||(t?(0,a.VP)(e).then((()=>{s(!0),i=window.setTimeout((()=>{s(!1)}),500)})):(s(o(e)),i=window.setTimeout((()=>{s(!1)}),500))),()=>{clearTimeout(i)}}}}},50911:(e,t,n)=>{n.d(t,{Z:()=>u});var i=n(70537),a=n(27418),l=n(15924),s=n(69195),o=n(6144),r=n(52334),c=n(48636),d=n(26209),p=n(66160);const u=e=>{let{uid:t,cid:n}=e;const[u,f]=(0,i.useState)(void 0),{values:m}=(0,c.Z)("agora"),x=(0,l.bS)(`/users/${t}`),[g,{isSuccess:h}]=(0,r.EO)(),[v,{isSuccess:b}]=(0,o.Cg)(),y=(0,l.s0)(),{copy:w}=(0,d.Z)(),{user:C,channel:j,loginUser:E}=(0,p.CG)((e=>({user:"undefined"!==typeof t?e.users.byId[t]:t,channel:"undefined"!==typeof n?e.channels.byId[n]:n,loginUser:e.authData.user})));(0,i.useEffect)((()=>{f(null!==t&&void 0!==t?t:null===E||void 0===E?void 0:E.uid)}),[t,E]),(0,i.useEffect)((()=>{(b||h)&&(a.ZP.success("Remove Successfully"),h&&x&&y("/users"))}),[b,h,x]);const Z=!(null===E||void 0===E||!E.is_admin),N=null===E||void 0===E?void 0:E.uid,k=!!n&&!(null!==j&&void 0!==j&&j.is_public)&&Z,L=!!n&&!(null!==j&&void 0!==j&&j.is_public)&&(Z||(null===j||void 0===j?void 0:j.owner)==N)&&t!=(null===j||void 0===j?void 0:j.owner),O=(null===m||void 0===m?void 0:m.enabled)&&N!=t;return{canDeleteChannel:k,canRemove:Z&&N!=t&&!n&&1!==t,removeUser:e=>{const t=!Number.isNaN(+e)&&e||u;t&&(g(t),(0,s.Bn)())},startChat:()=>{y(`/chat/dm/${t}`)},removeFromChannel:e=>{if(!n)return;const t=!Number.isNaN(+e)&&e||u;t&&(v({id:+n,members:[+t]}),(0,s.Bn)())},canRemoveFromChannel:L,canCopyEmail:!(null===C||void 0===C||!C.email),copyEmail:e=>{const t="string"==typeof e&&e||(null===C||void 0===C?void 0:C.email);w(t||""),(0,s.Bn)()},canCall:O,call:()=>{a.ZP.success("Coming Soon..."),(0,s.Bn)()}}}},88916:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var i=n(70537);const a=n(57889).ZP.div`
  height: 100vh;
  display: flex;
  background-color: #fff;
  margin: 8px 24px 10px 0;
  border-radius: 16px;
  overflow: auto;
  .left {
    padding: 8px;
    min-width: 268px;
    box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.1);
    .filters {
      display: flex;
      flex-direction: column;
      gap: 2px;
      .filter {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        border-radius: var(--br);
        .icon {
          width: 15px;
          height: 20px;
        }
        .txt {
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #667085;
        }
        &:hover,
        &.active {
          background: rgba(116, 127, 141, 0.2);
        }
      }
    }
  }
  .right {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow-y: scroll;
    .container {
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      > .favorite {
        background: #f2f4f7;
      }
      .tip {
        display: inline-flex;
        align-items: center;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #bfbfbf;
        .from {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-right: 8px;
          &.channel,
          &.user strong {
            font-weight: 600;
            color: #344054;
            .icon {
              width: 12px;
              height: 12px;
            }
          }
        }
      }
    }
  }
`;var l=n(96954),s=n(7699),o=n.n(s),r=n(20814),c=n(8969),d=n(26906),p=n(31271),u=n(79884),f=n(80308),m=n(66160),x=n(71893),g=n(80683);const h=function(){const{t:e}=(0,x.$)("fav"),[t,n]=(0,i.useState)(""),[s,h]=(0,i.useState)([]),v=[{icon:(0,g.jsx)(d.Z,{className:"icon"}),title:e("all_items"),filter:""},{icon:(0,g.jsx)(p.Z,{className:"icon"}),title:e("image"),filter:"image"},{icon:(0,g.jsx)(c.Z,{className:"icon"}),title:e("video"),filter:"video"},{icon:(0,g.jsx)(r.Z,{className:"icon"}),title:e("audio"),filter:"audio"}],{favorites:b,channelData:y,userData:w}=(0,m.CG)((e=>({favorites:e.favorites,userData:e.users.byId,channelData:e.channels.byId}))),C=e=>{n(e)};return(0,i.useEffect)((()=>{if(t)switch(t){case"audio":h(b.filter((e=>(e.messages||[]).every((e=>{var t;const n=null===(t=e.properties)||void 0===t?void 0:t.content_type;return e.content_type==f.bT.file&&n.startsWith("audio")})))));break;case"video":h(b.filter((e=>(e.messages||[]).every((e=>{var t;const n=null===(t=e.properties)||void 0===t?void 0:t.content_type;return e.content_type==f.bT.file&&n.startsWith("video")})))));break;case"image":{const e=b.filter((e=>(e.messages||[]).every((e=>{var t;const n=null===(t=e.properties)||void 0===t?void 0:t.content_type;return e.content_type==f.bT.file&&n.startsWith("image")}))));h(e)}}else h(b)}),[t,b]),(0,g.jsxs)(a,{children:[(0,g.jsx)("div",{className:"left",children:(0,g.jsx)("ul",{className:"filters",children:v.map((e=>{let{icon:n,title:i,filter:a}=e;return(0,g.jsxs)("li",{className:"filter "+(a==t?"active":""),onClick:C.bind(null,a),children:[n,(0,g.jsx)("span",{className:"txt",children:i})]},a)}))})}),(0,g.jsx)("div",{className:"right",children:s.map((e=>{var t,n;let{id:i,created_at:a,messages:s}=e;if(!s||0==s.length)return null;const[{source:{gid:r,uid:c}}]=s,d=r?(0,g.jsxs)("span",{className:"from channel",children:[(0,g.jsx)(u.Z,{className:"icon"})," ",null===(t=y[r])||void 0===t?void 0:t.name]}):(0,g.jsxs)("span",{className:"from user",children:["From ",(0,g.jsx)("strong",{children:null===(n=w[c])||void 0===n?void 0:n.name})]});return(0,g.jsxs)("div",{className:"container",children:[(0,g.jsxs)("h4",{className:"tip",children:[d,o()(a).format("YYYY-MM-DD")]}),(0,g.jsx)(l.Z,{id:i},i)]},i)}))})]})}}}]);