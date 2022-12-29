"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[782],{79884:(e,t,n)=>{n.d(t,{Z:()=>o});var i,l=n(70537);function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},r.apply(this,arguments)}const a=(e,t)=>{let{title:n,titleId:a,...o}=e;return l.createElement("svg",r({width:20,height:20,viewBox:"0 0 20 20",fill:"#616161",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},o),n?l.createElement("title",{id:a},n):null,i||(i=l.createElement("path",{d:"M6.48667 11.6667L6.83667 8.33333H3.325V6.66667H7L7.43333 2.5H9.10833L8.66667 6.66667H11.9833L12.4167 2.5H14.0917L13.65 6.66667H16.625V8.33333H13.4667L13.1167 11.6667H16.6167V13.3333H12.9333L12.4917 17.5H10.8083L11.2417 13.3333H7.91667L7.475 17.5H5.8L6.23333 13.3333H3.25V11.6667H6.4H6.48667ZM8.1625 11.6667H11.4875L11.8375 8.33333H8.5125L8.1625 11.6667Z"})))},o=(0,l.forwardRef)(a)},64631:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(21812),l=n(80683);function r(e){return e<=16?8:e<=24?12:e<=32?16:e<=40?18:e<=56?22:e<=80?48:64}const a=e=>{let{src:t="",name:n="Deleted User",type:a="user",width:o,height:s,...c}=e;return t&&0!==t.length?(0,l.jsx)("img",{src:t,...c}):(0,l.jsx)("div",{className:"rounded-full flex items-center justify-center",style:{width:o,height:s,fontSize:r(o),fontWeight:400,fontFamily:"'Lato', 'Lato-Regular', 'Helvetica Neue'",background:"channel"===a?"#EAECF0":"#4c99e9",color:"channel"===a?"#475467":"#FFFFFF"},children:(0,i.Qm)(n)})}},80874:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(70537),l=n(10336);const r=e=>{let{id:t="root-modal",mask:n=!0,children:r}=e;const[a,o]=(0,i.useState)(null);return(0,i.useEffect)((()=>{const e=document.getElementById(t);if(!e)return;n&&e.classList.add("mask");const i=document.createElement("div");return i.classList.add("wrapper"),e.appendChild(i),o(i),()=>{e.removeChild(i)}}),[t,n]),a?(0,l.createPortal)(r,a):null}},71044:(e,t,n)=>{n.d(t,{Z:()=>j});var i,l=n(70537),r=n(64084),a=n(7829);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},o.apply(this,arguments)}const s=(e,t)=>{let{title:n,titleId:r,...a}=e;return l.createElement("svg",o({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":r},a),n?l.createElement("title",{id:r},n):null,i||(i=l.createElement("path",{d:"M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35578 20.8583L3.06538 21.9753C2.6111 22.0937 2.1469 21.8213 2.02858 21.367C1.99199 21.2266 1.99198 21.0791 2.02855 20.9386L3.1449 16.6502C2.3972 15.2294 2 13.6428 2 12C2 6.47715 6.47715 2 12 2Z",fill:"#22CCEE"})))},c=(0,l.forwardRef)(s);var d;function p(){return p=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},p.apply(this,arguments)}const f=(e,t)=>{let{title:n,titleId:i,...r}=e;return l.createElement("svg",p({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":i},r),n?l.createElement("title",{id:i},n):null,d||(d=l.createElement("path",{d:"M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z",fill:"#616161"})))},u=(0,l.forwardRef)(f);var m=n(64631);const h=n(57889).ZP.div`
  z-index: 998;
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
`;var x=n(63211),g=n(50911),v=n(66160),b=n(14566),y=n(80683);const w=e=>{let{uid:t,type:n="embed",cid:i}=e;const{t:l}=(0,b.$G)("member"),{t:o}=(0,b.$G)(),{canCopyEmail:s,copyEmail:d,removeFromChannel:p,canRemoveFromChannel:f,canRemove:w,removeUser:j}=(0,g.Z)({uid:t,cid:i}),{data:C}=(0,v.CG)((e=>({data:e.users.byId[t]})));if(!C)return null;const{name:N,email:Z,avatar:k}=C,E="embed"==n&&w,L=Z||f||E;return(0,y.jsxs)(h,{className:n,children:[(0,y.jsx)(m.Z,{width:80,height:80,className:"rounded-full w-20 h-20 object-cover",src:k,name:N}),(0,y.jsx)("h2",{className:"text-lg select-text font-bold text-[#1c1c1e]",children:N}),(0,y.jsx)("span",{className:"text-sm text-[#98a2b3] select-text",children:Z}),(0,y.jsxs)("ul",{className:"icons",children:[(0,y.jsx)(r.OL,{to:`/chat/dm/${t}`,children:(0,y.jsxs)("li",{className:"icon chat",children:[(0,y.jsx)(c,{}),(0,y.jsx)("span",{className:"txt",children:l("send_msg")})]})}),(0,y.jsx)(a.ZP,{disabled:!L,interactive:!0,popperOptions:{strategy:"fixed"},placement:"bottom-start",trigger:"click",hideOnClick:!0,content:(0,y.jsxs)(x.Z,{children:[s&&(0,y.jsx)("li",{className:"item",onClick:d.bind(void 0,Z),children:l("copy_email")}),f&&(0,y.jsx)("li",{className:"item danger",onClick:p.bind(null,t),children:l("remove_from_channel")}),E&&(0,y.jsx)("li",{className:"item danger",onClick:j.bind(null,t),children:l("remove")})]}),children:(0,y.jsxs)("li",{className:"icon more "+(L?"":"disabled"),children:[(0,y.jsx)(u,{}),(0,y.jsx)("span",{className:"txt",children:o("more")})]})})]})]})},j=(0,l.memo)(w)},63211:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n(57889).ZP.ul`
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
`},26209:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(70537),l=n(34108),r=n(27418);const a=e=>{const{enableToast:t=!0}=e||{},[n,a]=(0,i.useState)(!1);(0,i.useEffect)((()=>{n&&t&&r.ZP.success("Copied!")}),[n]);const o=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection();if(!n)return!1;const i=n.rangeCount>0&&n.getRangeAt(0);t.select();const l=document.execCommand("copy");return document.body.removeChild(t),i&&(n.removeAllRanges(),n.addRange(i)),l};return{copied:n,copy:function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=0;return n||(t?(0,l.VP)(e).then((()=>{a(!0),i=window.setTimeout((()=>{a(!1)}),500)})):(a(o(e)),i=window.setTimeout((()=>{a(!1)}),500))),()=>{clearTimeout(i)}}}}},50911:(e,t,n)=>{n.d(t,{Z:()=>p});var i=n(70537),l=n(27418),r=n(15924),a=n(69195),o=n(6144),s=n(52334),c=n(26209),d=n(66160);const p=e=>{let{uid:t,cid:n}=e;const[p,f]=(0,i.useState)(void 0),u=(0,r.bS)(`/users/${t}`),[m,{isSuccess:h}]=(0,s.EO)(),[x,{isSuccess:g}]=(0,o.Cg)(),v=(0,r.s0)(),{copy:b}=(0,c.Z)(),{user:y,channel:w,loginUser:j}=(0,d.CG)((e=>({user:"undefined"!==typeof t?e.users.byId[t]:t,channel:"undefined"!==typeof n?e.channels.byId[n]:n,loginUser:e.authData.user})));(0,i.useEffect)((()=>{f(null!==t&&void 0!==t?t:null===j||void 0===j?void 0:j.uid)}),[t,j]),(0,i.useEffect)((()=>{(g||h)&&(l.ZP.success("Remove Successfully"),h&&u&&v("/users"))}),[g,h,u]);const C=!(null===j||void 0===j||!j.is_admin),N=null===j||void 0===j?void 0:j.uid,Z=!!n&&!(null!==w&&void 0!==w&&w.is_public)&&C,k=!!n&&!(null!==w&&void 0!==w&&w.is_public)&&(C||(null===w||void 0===w?void 0:w.owner)==N)&&t!=(null===w||void 0===w?void 0:w.owner);return{canDeleteChannel:Z,canRemove:C&&N!=t&&!n&&1!==t,removeUser:e=>{const t=!Number.isNaN(+e)&&e||p;t&&(m(t),(0,a.Bn)())},startChat:()=>{v(`/chat/dm/${t}`)},removeFromChannel:e=>{if(!n)return;const t=!Number.isNaN(+e)&&e||p;t&&(x({id:+n,members:[+t]}),(0,a.Bn)())},canRemoveFromChannel:k,canCopyEmail:!(null===y||void 0===y||!y.email),copyEmail:e=>{const t="string"==typeof e&&e||(null===y||void 0===y?void 0:y.email);b(t||""),(0,a.Bn)()}}}},88916:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var i=n(70537);const l=n(57889).ZP.div`
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
`;var r=n(96954),a=n(7699),o=n.n(a),s=n(20814),c=n(8969),d=n(26906),p=n(31271),f=n(79884),u=n(80308),m=n(66160),h=n(14566),x=n(80683);const g=function(){const{t:e}=(0,h.$G)("fav"),[t,n]=(0,i.useState)(""),[a,g]=(0,i.useState)([]),v=[{icon:(0,x.jsx)(d.Z,{className:"icon"}),title:e("all_items"),filter:""},{icon:(0,x.jsx)(p.Z,{className:"icon"}),title:e("image"),filter:"image"},{icon:(0,x.jsx)(c.Z,{className:"icon"}),title:e("video"),filter:"video"},{icon:(0,x.jsx)(s.Z,{className:"icon"}),title:e("audio"),filter:"audio"}],{favorites:b,channelData:y,userData:w}=(0,m.CG)((e=>({favorites:e.favorites,userData:e.users.byId,channelData:e.channels.byId}))),j=e=>{n(e)};return(0,i.useEffect)((()=>{if(t)switch(t){case"audio":g(b.filter((e=>(e.messages||[]).every((e=>{var t;const n=null===(t=e.properties)||void 0===t?void 0:t.content_type;return e.content_type==u.bT.file&&n.startsWith("audio")})))));break;case"video":g(b.filter((e=>(e.messages||[]).every((e=>{var t;const n=null===(t=e.properties)||void 0===t?void 0:t.content_type;return e.content_type==u.bT.file&&n.startsWith("video")})))));break;case"image":{const e=b.filter((e=>(e.messages||[]).every((e=>{var t;const n=null===(t=e.properties)||void 0===t?void 0:t.content_type;return e.content_type==u.bT.file&&n.startsWith("image")}))));g(e)}}else g(b)}),[t,b]),(0,x.jsxs)(l,{children:[(0,x.jsx)("div",{className:"left",children:(0,x.jsx)("ul",{className:"filters",children:v.map((e=>{let{icon:n,title:i,filter:l}=e;return(0,x.jsxs)("li",{className:"filter "+(l==t?"active":""),onClick:j.bind(null,l),children:[n,(0,x.jsx)("span",{className:"txt",children:i})]},l)}))})}),(0,x.jsx)("div",{className:"right",children:a.map((e=>{var t,n;let{id:i,created_at:l,messages:a}=e;if(!a||0==a.length)return null;const[{source:{gid:s,uid:c}}]=a,d=s?(0,x.jsxs)("span",{className:"from channel",children:[(0,x.jsx)(f.Z,{className:"icon"})," ",null===(t=y[s])||void 0===t?void 0:t.name]}):(0,x.jsxs)("span",{className:"from user",children:["From ",(0,x.jsx)("strong",{children:null===(n=w[c])||void 0===n?void 0:n.name})]});return(0,x.jsxs)("div",{className:"container",children:[(0,x.jsxs)("h4",{className:"tip",children:[d,o()(l).format("YYYY-MM-DD")]}),(0,x.jsx)(r.Z,{id:i},i)]},i)}))})]})}},57425:(e,t,n)=>{function i(e){var t,n,l="";if("string"==typeof e||"number"==typeof e)l+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=i(e[t]))&&(l&&(l+=" "),l+=n);else for(t in e)e[t]&&(l&&(l+=" "),l+=t);return l}n.d(t,{Z:()=>l});const l=function(){for(var e,t,n=0,l="";n<arguments.length;)(e=arguments[n++])&&(t=i(e))&&(l&&(l+=" "),l+=t);return l}}}]);