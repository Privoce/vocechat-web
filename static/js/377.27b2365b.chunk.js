"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[377],{11089:(e,t,n)=>{n.d(t,{Z:()=>u});var l=n(70537),i=n(27418),s=n(14566),o=n(52334),a=n(66160),r=n(24563),d=n(15621),c=n(80683);const u=e=>{var t,n;let{id:u,type:m="channel"}=e;const p=(0,a.CG)((e=>"channel"==m?e.footprint.autoDeleteMsgChannels.find((e=>e.gid==u)):e.footprint.autoDeleteMsgUsers.find((e=>e.uid==u)))),[x,{isSuccess:h}]=(0,o.ar)(),[f,g]=(0,l.useState)(null!==(t=null===p||void 0===p?void 0:p.expires_in)&&void 0!==t?t:0),{t:v}=(0,s.$G)("setting",{keyPrefix:"auto_delete_msg"}),{t:b}=(0,s.$G)(),w=[{title:v("off"),value:0},{title:v("5_min"),value:300},{title:v("10_min"),value:600},{title:v("1_hour"),value:3600},{title:v("1_day"),value:86400},{title:v("1_week"),value:604800}];(0,l.useEffect)((()=>{h&&i.Am.success(b("tip.update"))}),[h]);const j=null!==(n=null===p||void 0===p?void 0:p.expires_in)&&void 0!==n?n:0;return(0,c.jsxs)("section",{className:"max-w-[512px] h-full relative",children:[(0,c.jsxs)("div",{className:"text-sm",children:[(0,c.jsx)("h2",{children:v("title")}),(0,c.jsx)("p",{className:"text-gray-500",children:v("desc")})]}),(0,c.jsx)("div",{className:"mt-4",children:(0,c.jsx)(d.Z,{options:w.map((e=>{let{title:t}=e;return t})),values:w.map((e=>{let{value:t}=e;return t})),value:f||0,onChange:e=>{g(e)}})}),j!==f&&(0,c.jsx)(r.Z,{saveHandler:()=>{x("user"==m?{users:[{uid:u,expires_in:f}]}:{groups:[{gid:u,expires_in:f}]})},resetHandler:()=>{var e;g(null!==(e=null===p||void 0===p?void 0:p.expires_in)&&void 0!==e?e:0)}})]})}},64631:(e,t,n)=>{n.d(t,{Z:()=>o});var l=n(21812),i=n(80683);function s(e){return e<=16?8:e<=24?12:e<=32?16:e<=40?18:e<=56?22:e<=80?48:64}const o=e=>{let{src:t="",name:n="Deleted User",type:o="user",width:a,height:r,...d}=e;return t&&0!==t.length?(0,i.jsx)("img",{src:t,...d}):(0,i.jsx)("div",{className:`rounded-full flex-center ${d.className||""}`,style:{width:a,height:r,fontSize:s(a),fontWeight:400,fontFamily:"'Lato', 'Lato-Regular', 'Helvetica Neue'",background:"channel"===o?"#EAECF0":"#4c99e9",color:"channel"===o?"#475467":"#FFFFFF"},children:(0,l.Qm)(n)})}},80874:(e,t,n)=>{n.d(t,{Z:()=>s});var l=n(70537),i=n(10336);const s=e=>{let{id:t="root-modal",mask:n=!0,children:s}=e;const[o,a]=(0,l.useState)(null);return(0,l.useEffect)((()=>{const e=document.getElementById(t);if(!e)return;n&&e.classList.add("mask");const l=document.createElement("div");return l.classList.add("wrapper"),e.appendChild(l),a(l),()=>{e.removeChild(l)}}),[t,n]),o?(0,i.createPortal)(s,o):null}},78468:(e,t,n)=>{n.d(t,{Z:()=>y});var l,i=n(70537),s=n(64084),o=n(7829);function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},a.apply(this,arguments)}const r=(e,t)=>{let{title:n,titleId:s,...o}=e;return i.createElement("svg",a({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":s},o),n?i.createElement("title",{id:s},n):null,l||(l=i.createElement("path",{d:"M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35578 20.8583L3.06538 21.9753C2.6111 22.0937 2.1469 21.8213 2.02858 21.367C1.99199 21.2266 1.99198 21.0791 2.02855 20.9386L3.1449 16.6502C2.3972 15.2294 2 13.6428 2 12C2 6.47715 6.47715 2 12 2Z",fill:"#22CCEE"})))},d=(0,i.forwardRef)(r);var c;function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},u.apply(this,arguments)}const m=(e,t)=>{let{title:n,titleId:l,...s}=e;return i.createElement("svg",u({width:24,height:24,viewBox:"0 0 24 24",fill:"#616161",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":l},s),n?i.createElement("title",{id:l},n):null,c||(c=i.createElement("path",{d:"M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z"})))},p=(0,i.forwardRef)(m);var x=n(64631),h=n(63211),f=n(50911),g=n(66160),v=n(14566),b=n(57425),w=n(80683);const j=e=>{let{uid:t,type:n="embed",cid:l}=e;const{t:i}=(0,v.$G)("member"),{t:a}=(0,v.$G)(),{canCopyEmail:r,copyEmail:c,removeFromChannel:u,canRemoveFromChannel:m,canRemove:j,removeUser:y}=(0,f.Z)({uid:t,cid:l}),{data:C}=(0,g.CG)((e=>({data:e.users.byId[t]})));if(!C)return null;const{name:N,email:Z,avatar:k}=C,_="card"==n,E=!_&&j,$=Z||m||E,O="cursor-pointer flex flex-col items-center gap-1 rounded-lg w-32 text-primary-400 bg-slate-100 text-sm pt-3.5 pb-3",F=(0,b.Z)("flex-center flex-col w-[432px] gap-1 z-[998] mt-20 select-none",_&&"p-4 w-[280px] bg-white drop-shadow rounded-md");return(0,w.jsxs)("div",{className:F,children:[(0,w.jsx)(x.Z,{width:80,height:80,className:"rounded-full w-20 h-20 object-cover",src:k,name:N}),(0,w.jsx)("h2",{className:"text-lg select-text font-bold text-[#1c1c1e]",children:N}),(0,w.jsx)("span",{className:"text-sm text-[#98a2b3] select-text",children:Z}),(0,w.jsxs)("ul",{className:(0,b.Z)("mt-6 flex items-center gap-2",_&&"pb-0.5"),children:[(0,w.jsx)(s.OL,{to:`/chat/dm/${t}`,children:(0,w.jsxs)("li",{className:`${O} icon chat`,children:[(0,w.jsx)(d,{}),(0,w.jsx)("span",{children:i("send_msg")})]})}),(0,w.jsx)(o.ZP,{disabled:!$,interactive:!0,popperOptions:{strategy:"fixed"},placement:"bottom-start",trigger:"click",hideOnClick:!0,content:(0,w.jsxs)(h.Z,{children:[r&&(0,w.jsx)("li",{className:"item",onClick:c.bind(void 0,Z),children:i("copy_email")}),m&&(0,w.jsx)("li",{className:"item danger",onClick:u.bind(null,t),children:i("remove_from_channel")}),E&&(0,w.jsx)("li",{className:"item danger",onClick:y.bind(null,t),children:i("remove")})]}),children:(0,w.jsxs)("li",{className:`${O} icon ${$?"":"text-gray-500"}`,children:[(0,w.jsx)(p,{className:$?"fill-primary-500":""}),(0,w.jsx)("span",{children:a("more")})]})})]})]})},y=(0,i.memo)(j)},24563:(e,t,n)=>{n.d(t,{Z:()=>o});var l=n(14566),i=n(69885),s=n(80683);const o=e=>{let{saveHandler:t,resetHandler:n}=e;const{t:o}=(0,l.$G)("setting");return(0,s.jsxs)("div",{className:"w-full p-2 absolute bottom-16 left-0 flex items-center justify-between text-gray-500 border border-solid border-gray-200 shadow-md rounded-full",children:[(0,s.jsx)("span",{className:"p-2 text-sm",children:o("save_tip")}),(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsx)(i.Z,{className:"small ghost !border-none !text-gray-500 !shadow-none",onClick:n,children:o("reset")}),(0,s.jsx)(i.Z,{className:"small !rounded-full",onClick:t,children:o("save_change")})]})]})}},7477:(e,t,n)=>{n.d(t,{Z:()=>d});var l=n(57889),i=n(15924),s=n(64084);const o=n.p+"static/media/arrow.left.92fbb139607631555459.svg";var a=n(80683);const r=l.ZP.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  > .left {
    max-height: 100vh;
    overflow: scroll;
    padding: 32px 16px;
    min-width: 212px;
    background-color: #f5f6f7;

    > .title {
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #1c1c1e;
      margin-bottom: 32px;
      padding-left: 24px;
      background-size: 16px;
      background: url(${o}) no-repeat left;
    }

    > .items {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: 36px;

      &:before {
        padding-left: 12px;
        content: attr(data-title);
        font-weight: bold;
        font-size: 12px;
        line-height: 18px;
        color: #6b7280;
        margin-bottom: 2px;
      }

      .item {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #44494f;
        border-radius: 4px;

        &:hover,
        &.curr {
          background: #e7e5e4;
        }

        > a {
          display: block;
          padding: 4px 12px;
        }
      }

      &.danger .item {
        cursor: pointer;
        padding: 4px 12px;
        color: #ef4444;

        &:hover {
          background: none;
        }
      }
    }
  }

  > .right {
    background-color: #fff;
    width: 100%;
    max-height: 100%;
    overflow: auto;
    padding: 32px;

    > .title {
      font-weight: bold;
      font-size: 20px;
      line-height: 30px;
      color: #374151;
      margin-bottom: 32px;
    }
  }
`,d=e=>{let{closeModal:t,title:n="Settings",navs:l=[],dangers:o=[],nav:d,children:c}=e;const{pathname:u}=(0,i.TH)();return(0,a.jsxs)(r,{children:[(0,a.jsxs)("div",{className:"left",children:[(0,a.jsx)("h2",{onClick:t,className:"title",children:n}),l.map((e=>{let{title:t,items:n}=e;return(0,a.jsx)("ul",{"data-title":t,className:"items",children:n.map((e=>{let{name:t,title:n}=e;return(0,a.jsx)("li",{className:"item "+(t==(null===d||void 0===d?void 0:d.name)?"curr":""),children:(0,a.jsx)(s.OL,{to:`${u}?nav=${t}`,children:n})},t)}))},t)})),o.length?(0,a.jsx)("ul",{className:"items danger",children:o.map((e=>{if("boolean"===typeof e||!e)return null;const{title:t,handler:n}=e;return(0,a.jsx)("li",{onClick:n,className:"item",children:t},t)}))}):null]}),(0,a.jsxs)("div",{className:"right",children:[d&&(0,a.jsx)("h4",{className:"title",children:d.title}),c]})]})}},63211:(e,t,n)=>{n.d(t,{Z:()=>l});const l=n(57889).ZP.ul`
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
`},40698:(e,t,n)=>{n.d(t,{Z:()=>s});var l=n(57425),i=n(80683);const s=e=>{let{compact:t=!1,title:n="",description:s="",buttons:o,children:a,className:r}=e;return(0,i.jsxs)("div",{className:(0,l.Z)("rounded-lg bg-white drop-shadow",t?"p-4 min-w-[406px] text-left":"p-8 min-w-[440px] text-center",r),children:[n&&(0,i.jsx)("h3",{className:"text-xl text-gray-600 mb-4 font-semibold",children:n}),s&&(0,i.jsx)("p",{className:"text-sm text-gray-400 mb-2",children:s}),a,o&&(0,i.jsx)("div",{className:"pt-4 w-full flex justify-end gap-4 items-center",children:o})]})}},15621:(e,t,n)=>{n.d(t,{Z:()=>d});var l=n(70537),i=n(57889),s=n(80683);const o=i.ZP.form`
  width: 100%;
  > .option {
    &:not(:last-child) {
      margin-bottom: 8px;
    }

    > input[type="radio"] {
      display: none;

      & + .box {
        background: #ffffff;
        border: 1px solid #d0d5dd;
        box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;
        transition: all ease-in-out 250ms;

        & > label {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: #667085;
          cursor: pointer;
          user-select: none;
          transition: all ease-in-out 250ms;

          &:before {
            content: "";
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 8px;
            background: #ffffff;
            box-shadow: inset 0 0 0 4px #ffffff;
            border: 1px solid #d0d5dd;
            margin: 14px 8px 14px 14px;
            transition: all ease-in-out 500ms;
          }
        }
      }

      &:checked + .box {
        background: #22ccee;
        border: 1px solid #d0d5dd;

        & > label {
          color: #ffffff;

          &:before {
            background: #ffffff;
            box-shadow: inset 0 0 0 4px #22ccee;
            border: 1px solid #ffffff;
          }
        }
      }
    }
  }
`,a="",r=[],d=e=>{let{options:t,values:n=r,value:i=a,defaultValue:d="",onChange:c}=e;const u=(0,l.useId)(),[m,p]=(0,l.useState)(d),x=i!==a?i:m;return(0,s.jsx)(o,{children:t.map(((e,t)=>(0,s.jsxs)("div",{className:"option",children:[(0,s.jsx)("input",{type:"radio",checked:(n!==r?n.indexOf(x):x)===t,onChange:()=>{const e=n===r?t:n[t];i===a&&p(e),c&&c(e)},id:`${u}-${t}`}),(0,s.jsx)("div",{className:"box",children:(0,s.jsx)("label",{htmlFor:`${u}-${t}`,children:e})})]},t)))})}},26209:(e,t,n)=>{n.d(t,{Z:()=>o});var l=n(70537),i=n(34108),s=n(27418);const o=e=>{const{enableToast:t=!0}=e||{},[n,o]=(0,l.useState)(!1);(0,l.useEffect)((()=>{n&&t&&s.ZP.success("Copied!")}),[n]);const a=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection();if(!n)return!1;const l=n.rangeCount>0&&n.getRangeAt(0);t.select();const i=document.execCommand("copy");return document.body.removeChild(t),l&&(n.removeAllRanges(),n.addRange(l)),i};return{copied:n,copy:function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],l=0;return n||(t?(0,i.VP)(e).then((()=>{o(!0),l=window.setTimeout((()=>{o(!1)}),500)})):(o(a(e)),l=window.setTimeout((()=>{o(!1)}),500))),()=>{clearTimeout(l)}}}}},50911:(e,t,n)=>{n.d(t,{Z:()=>m});var l=n(70537),i=n(27418),s=n(15924),o=n(69195),a=n(6144),r=n(52334),d=n(26209),c=n(66160),u=n(14566);const m=e=>{let{uid:t,cid:n}=e;const{t:m}=(0,u.$G)(),[p,x]=(0,l.useState)(void 0),h=(0,s.bS)(`/users/${t}`),[f,{isSuccess:g}]=(0,r.EO)(),[v,{isSuccess:b}]=(0,a.Cg)(),w=(0,s.s0)(),{copy:j}=(0,d.Z)(),{user:y,channel:C,loginUser:N}=(0,c.CG)((e=>({user:"undefined"!==typeof t?e.users.byId[t]:t,channel:"undefined"!==typeof n?e.channels.byId[n]:n,loginUser:e.authData.user})));(0,l.useEffect)((()=>{x(null!==t&&void 0!==t?t:null===N||void 0===N?void 0:N.uid)}),[t,N]),(0,l.useEffect)((()=>{(b||g)&&(i.ZP.success(m("tip.delete")),g&&h&&w("/users"))}),[b,g,h]);const Z=!(null===N||void 0===N||!N.is_admin),k=null===N||void 0===N?void 0:N.uid,_=!!n&&!(null!==C&&void 0!==C&&C.is_public)&&Z,E=!!n&&!(null!==C&&void 0!==C&&C.is_public)&&(Z||(null===C||void 0===C?void 0:C.owner)==k)&&t!=(null===C||void 0===C?void 0:C.owner);return{canDeleteChannel:_,canRemove:Z&&k!=t&&!n&&1!==t,removeUser:e=>{const t=!Number.isNaN(+e)&&e||p;t&&(f(t),(0,o.Bn)())},startChat:()=>{w(`/chat/dm/${t}`)},removeFromChannel:e=>{if(!n)return;const t=!Number.isNaN(+e)&&e||p;t&&(v({id:+n,members:[+t]}),(0,o.Bn)())},canRemoveFromChannel:E,canCopyEmail:!(null===y||void 0===y||!y.email),copyEmail:e=>{const t="string"==typeof e&&e||(null===y||void 0===y?void 0:y.email);j(t||""),(0,o.Bn)()}}}},13507:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j});var l=n(70537),i=n(15924),s=n(64084),o=n(7477),a=n(27418),r=n(80874),d=n(52334),c=n(40698),u=n(69885),m=n(14566),p=n(80683);const x=e=>{let{id:t,closeModal:n}=e;const{t:s}=(0,m.$G)("setting"),{t:o}=(0,m.$G)(),x=(0,i.s0)(),[h,{isLoading:f,isSuccess:g}]=(0,d.EO)();return(0,l.useEffect)((()=>{g&&(a.ZP.success(o("tip.delete")),n(),x("/chat"))}),[g]),t?(0,p.jsx)(r.Z,{id:"modal-modal",children:(0,p.jsx)(c.Z,{className:"compact",title:s("dm.delete"),description:s("dm.delete_desc"),buttons:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(u.Z,{onClick:n.bind(null,void 0),className:"cancel",children:o("action.cancel")}),(0,p.jsx)(u.Z,{onClick:()=>{h(t)},className:"danger",children:f?"Deleting":o("action.remove")})]})})}):null};var h=n(78468);function f(e){let{id:t=0}=e;return(0,p.jsx)("section",{className:"w-full h-full flex justify-center items-start",children:(0,p.jsx)(h.Z,{uid:t})})}var g=n(11089);const v=e=>{const{t:t}=(0,m.$G)("setting");return[{title:t("nav.general"),items:[{name:"overview",title:t("nav.overview"),component:(0,p.jsx)(f,{id:e})},{name:"auto_delete_msg",title:t("nav.auto_delete_msg"),component:(0,p.jsx)(g.Z,{id:e,type:"user"})}]}]};var b=n(66160);let w="";function j(){const{t:e}=(0,m.$G)(),{uid:t=0}=(0,i.UO)(),{loginUser:n}=(0,b.CG)((e=>({loginUser:e.authData.user,user:t?e.users.byId[+t]:void 0}))),a=(0,i.s0)(),[r]=(0,s.lr)(),d=v(+t),c=d.map((e=>{let{items:t}=e;return t})).flat(),u=r.get("nav");w=w||(r.get("f")||"/");const[h,f]=(0,l.useState)(!1),g=()=>{f((e=>!e))};if(!t)return null;const j=c.find((e=>e.name==u))||c[0],y=null===n||void 0===n?void 0:n.is_admin;return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.Z,{nav:j,closeModal:()=>{a(w),w=""},title:"DM Setting",navs:d,dangers:[y&&{title:e("action.remove_user"),handler:g}],children:j.component}),h&&(0,p.jsx)(x,{closeModal:g,id:+t})]})}}}]);