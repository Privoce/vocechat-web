"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[507],{11089:(e,t,n)=>{n.d(t,{Z:()=>u});var l=n(70537),a=n(27418),s=n(14566),r=n(52334),i=n(66160),o=n(24563),d=n(15621),c=n(80683);const u=e=>{var t,n;let{id:u,type:m="channel"}=e;const x=(0,i.CG)((e=>"channel"==m?e.footprint.autoDeleteMsgChannels.find((e=>e.gid==u)):e.footprint.autoDeleteMsgUsers.find((e=>e.uid==u)))),[p,{isSuccess:f}]=(0,r.ar)(),[h,g]=(0,l.useState)(null!==(t=null===x||void 0===x?void 0:x.expires_in)&&void 0!==t?t:0),{t:b}=(0,s.$G)("setting",{keyPrefix:"auto_delete_msg"}),{t:v}=(0,s.$G)(),y=[{title:b("off"),value:0},{title:b("5_min"),value:300},{title:b("10_min"),value:600},{title:b("1_hour"),value:3600},{title:b("1_day"),value:86400},{title:b("1_week"),value:604800}];(0,l.useEffect)((()=>{f&&a.Am.success(v("tip.update"))}),[f]);const w=null!==(n=null===x||void 0===x?void 0:x.expires_in)&&void 0!==n?n:0;return(0,c.jsxs)("section",{className:"max-w-[512px] h-full relative",children:[(0,c.jsxs)("div",{className:"text-sm",children:[(0,c.jsx)("h2",{className:"dark:text-white",children:b("title")}),(0,c.jsx)("p",{className:"text-gray-500 dark:text-gray-400",children:b("desc")})]}),(0,c.jsx)("div",{className:"mt-4",children:(0,c.jsx)(d.Z,{options:y.map((e=>{let{title:t}=e;return t})),values:y.map((e=>{let{value:t}=e;return t})),value:h||0,onChange:e=>{g(e)}})}),w!==h&&(0,c.jsx)(o.Z,{saveHandler:()=>{p("user"==m?{users:[{uid:u,expires_in:h}]}:{groups:[{gid:u,expires_in:h}]})},resetHandler:()=>{var e;g(null!==(e=null===x||void 0===x?void 0:x.expires_in)&&void 0!==e?e:0)}})]})}},64631:(e,t,n)=>{n.d(t,{Z:()=>r});var l=n(21812),a=n(80683);function s(e){return e<=16?8:e<=24?12:e<=32?16:e<=40?18:e<=56?22:e<=80?48:64}const r=e=>{let{src:t="",name:n="Deleted User",type:r="user",width:i,height:o,...d}=e;return t&&0!==t.length?(0,a.jsx)("img",{src:t,...d}):(0,a.jsx)("div",{className:`rounded-full flex-center ${d.className||""}`,style:{width:i,height:o,fontSize:s(i),fontWeight:400,fontFamily:"'Lato', 'Lato-Regular', 'Helvetica Neue'",background:"channel"===r?"#EAECF0":"#4c99e9",color:"channel"===r?"#475467":"#FFFFFF"},children:(0,l.Qm)(n)})}},80874:(e,t,n)=>{n.d(t,{Z:()=>s});var l=n(70537),a=n(10336);const s=e=>{let{id:t="root-modal",mask:n=!0,children:s}=e;const[r,i]=(0,l.useState)(null);return(0,l.useEffect)((()=>{const e=document.getElementById(t);if(!e)return;n&&e.classList.add("mask");const l=document.createElement("div");return l.classList.add("wrapper"),e.appendChild(l),i(l),()=>{e.removeChild(l)}}),[t,n]),r?(0,a.createPortal)(s,r):null}},78468:(e,t,n)=>{n.d(t,{Z:()=>j});var l,a=n(70537),s=n(64084),r=n(7829);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},i.apply(this,arguments)}const o=(e,t)=>{let{title:n,titleId:s,...r}=e;return a.createElement("svg",i({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":s},r),n?a.createElement("title",{id:s},n):null,l||(l=a.createElement("path",{d:"M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35578 20.8583L3.06538 21.9753C2.6111 22.0937 2.1469 21.8213 2.02858 21.367C1.99199 21.2266 1.99198 21.0791 2.02855 20.9386L3.1449 16.6502C2.3972 15.2294 2 13.6428 2 12C2 6.47715 6.47715 2 12 2Z",fill:"#22CCEE"})))},d=(0,a.forwardRef)(o);var c;function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},u.apply(this,arguments)}const m=(e,t)=>{let{title:n,titleId:l,...s}=e;return a.createElement("svg",u({width:24,height:24,viewBox:"0 0 24 24",fill:"#616161",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":l},s),n?a.createElement("title",{id:l},n):null,c||(c=a.createElement("path",{d:"M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z"})))},x=(0,a.forwardRef)(m);var p=n(64631),f=n(63211),h=n(50911),g=n(66160),b=n(14566),v=n(57425),y=n(80683);const w=e=>{let{uid:t,type:n="embed",cid:l}=e;const{t:a}=(0,b.$G)("member"),{t:i}=(0,b.$G)(),{canCopyEmail:o,copyEmail:c,removeFromChannel:u,canRemoveFromChannel:m,canRemove:w,removeUser:j}=(0,h.Z)({uid:t,cid:l}),{data:k}=(0,g.CG)((e=>({data:e.users.byId[t]})));if(!k)return null;const{name:C,email:N,avatar:Z}=k,_="card"==n,E=!_&&w,$=N||m||E,O="cursor-pointer flex flex-col items-center gap-1 rounded-lg w-32 text-primary-400 bg-slate-100 dark:bg-gray-700 text-sm pt-3.5 pb-3",F=(0,v.Z)("flex-center flex-col w-[432px] gap-1 z-[99] mt-20 select-none",_&&"p-4 w-[280px] bg-white dark:bg-gray-800 drop-shadow rounded-md");return(0,y.jsxs)("div",{className:F,children:[(0,y.jsx)(p.Z,{width:80,height:80,className:"rounded-full w-20 h-20 object-cover",src:Z,name:C}),(0,y.jsx)("h2",{className:"text-lg select-text font-bold text-[#1c1c1e] dark:text-white",children:C}),(0,y.jsx)("span",{className:"text-sm text-[#98a2b3] dark:text-gray-200 select-text",children:N}),(0,y.jsxs)("ul",{className:(0,v.Z)("mt-6 flex items-center gap-2",_&&"pb-0.5"),children:[(0,y.jsx)(s.OL,{to:`/chat/dm/${t}`,children:(0,y.jsxs)("li",{className:`${O} icon chat`,children:[(0,y.jsx)(d,{}),(0,y.jsx)("span",{children:a("send_msg")})]})}),(0,y.jsx)(r.ZP,{disabled:!$,interactive:!0,popperOptions:{strategy:"fixed"},placement:"bottom-start",trigger:"click",hideOnClick:!0,content:(0,y.jsxs)(f.Z,{children:[o&&(0,y.jsx)("li",{className:"item",onClick:c.bind(void 0,N),children:a("copy_email")}),m&&(0,y.jsx)("li",{className:"item danger",onClick:u.bind(null,t),children:a("remove_from_channel")}),E&&(0,y.jsx)("li",{className:"item danger",onClick:j.bind(null,t),children:a("remove")})]}),children:(0,y.jsxs)("li",{className:`${O} icon ${$?"":"text-gray-500"}`,children:[(0,y.jsx)(x,{className:$?"fill-primary-500":""}),(0,y.jsx)("span",{children:i("more")})]})})]})]})},j=(0,a.memo)(w)},24563:(e,t,n)=>{n.d(t,{Z:()=>r});var l=n(14566),a=n(69885),s=n(80683);const r=e=>{let{saveHandler:t,resetHandler:n}=e;const{t:r}=(0,l.$G)("setting");return(0,s.jsxs)("div",{className:"w-full p-2 absolute bottom-16 left-0 flex items-center justify-between text-gray-500 border border-solid border-gray-200 dark:border-gray-400 dark:bg-gray-600 shadow-md rounded-full",children:[(0,s.jsx)("span",{className:"p-2 text-sm dark:text-gray-200",children:r("save_tip")}),(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsx)(a.Z,{className:"small ghost !border-none !text-gray-500 !shadow-none dark:!text-gray-100",onClick:n,children:r("reset")}),(0,s.jsx)(a.Z,{className:"small !rounded-full",onClick:t,children:r("save_change")})]})]})}},84182:(e,t,n)=>{n.d(t,{Z:()=>m});var l,a=n(15924),s=n(64084),r=n(70537);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},i.apply(this,arguments)}const o=(e,t)=>{let{title:n,titleId:a,...s}=e;return r.createElement("svg",i({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?r.createElement("title",{id:a},n):null,l||(l=r.createElement("path",{d:"M10 4L6 8L10 12",stroke:"black",strokeOpacity:.3,strokeLinecap:"round",strokeLinejoin:"round"})))},d=(0,r.forwardRef)(o);var c=n(57425),u=n(80683);const m=e=>{let{closeModal:t,title:n="Settings",navs:l=[],dangers:r=[],nav:i,children:o}=e;const{pathname:m}=(0,a.TH)();return(0,u.jsxs)("div",{className:"w-screen h-screen flex",children:[(0,u.jsxs)("div",{className:"max-h-screen min-w-[212px] overflow-scroll px-4 py-8 bg-[#f5f6f7] dark:bg-[#1F2A37]",children:[(0,u.jsxs)("h2",{onClick:t,className:"flex gap-2 items-center cursor-pointer mb-8 font-bold text-gray-800 dark:text-white",children:[(0,u.jsx)(d,{className:"dark:fill-gray-400"})," ",n]}),l.map((e=>{let{title:t,items:n}=e;return(0,u.jsx)("ul",{"data-title":t,className:"flex flex-col gap-0.5 mb-9 before:pl-3 before:content-[attr(data-title)] before:font-bold before:text-xs before:text-gray-400",children:n.map((e=>{let{name:t,title:n}=e;return(0,u.jsx)("li",{className:(0,c.Z)("text-sm text-gray-700 whitespace-nowrap dark:text-gray-200  rounded hover:bg-[#e7e5e4] dark:hover:bg-slate-500/20",t==(null===i||void 0===i?void 0:i.name)&&"bg-[#e7e5e4] dark:bg-slate-500/20"),children:(0,u.jsx)(s.OL,{to:`${m}?nav=${t}`,className:"block px-3 py-1",children:n})},t)}))},t)})),r.length?(0,u.jsx)("ul",{className:"flex flex-col gap-2 mb-9",children:r.map((e=>{if("boolean"===typeof e||!e)return null;const{title:t,handler:n}=e;return(0,u.jsx)("li",{onClick:n,className:"text-sm text-white dark:text-gray-200 rounded cursor-pointer py-1.5 px-3 bg-[#ef4444] hover:bg-red-600",children:t},t)}))}):null]}),(0,u.jsxs)("div",{className:"bg-white w-full max-h-full overflow-auto p-8 dark:bg-[#384250]",children:[i&&(0,u.jsx)("h4",{className:"font-bold text-xl text-gray-600 mb-8 dark:text-gray-100",children:i.title}),o]})]})}},63211:(e,t,n)=>{n.d(t,{Z:()=>l});const l=n(57889).ZP.ul`
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
`},40698:(e,t,n)=>{n.d(t,{Z:()=>s});var l=n(57425),a=n(80683);const s=e=>{let{compact:t=!1,title:n="",description:s="",buttons:r,children:i,className:o}=e;return(0,a.jsxs)("div",{className:(0,l.Z)("rounded-lg bg-white dark:bg-gray-900 drop-shadow",t?"p-4 min-w-[406px] text-left":"p-8 min-w-[440px] text-center",o),children:[n&&(0,a.jsx)("h3",{className:"text-xl text-gray-600 dark:text-white mb-4 font-semibold",children:n}),s&&(0,a.jsx)("p",{className:"text-sm text-gray-400 dark:text-gray-100 mb-2",children:s}),i,r&&(0,a.jsx)("div",{className:"pt-4 w-full flex justify-end gap-4 items-center",children:r})]})}},15621:(e,t,n)=>{n.d(t,{Z:()=>d});var l=n(70537),a=n(57889),s=n(80683);const r=a.ZP.form`
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
`,i="",o=[],d=e=>{let{options:t,values:n=o,value:a=i,defaultValue:d="",onChange:c}=e;const u=(0,l.useId)(),[m,x]=(0,l.useState)(d),p=a!==i?a:m;return(0,s.jsx)(r,{children:t.map(((e,t)=>(0,s.jsxs)("div",{className:"option",children:[(0,s.jsx)("input",{type:"radio",checked:(n!==o?n.indexOf(p):p)===t,onChange:()=>{const e=n===o?t:n[t];a===i&&x(e),c&&c(e)},id:`${u}-${t}`}),(0,s.jsx)("div",{className:"box",children:(0,s.jsx)("label",{htmlFor:`${u}-${t}`,children:e})})]},t)))})}},26209:(e,t,n)=>{n.d(t,{Z:()=>r});var l=n(70537),a=n(34108),s=n(27418);const r=e=>{const{enableToast:t=!0}=e||{},[n,r]=(0,l.useState)(!1);(0,l.useEffect)((()=>{n&&t&&s.ZP.success("Copied!")}),[n]);const i=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection();if(!n)return!1;const l=n.rangeCount>0&&n.getRangeAt(0);t.select();const a=document.execCommand("copy");return document.body.removeChild(t),l&&(n.removeAllRanges(),n.addRange(l)),a};return{copied:n,copy:function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],l=0;return n||(t?(0,a.VP)(e).then((()=>{r(!0),l=window.setTimeout((()=>{r(!1)}),500)})):(r(i(e)),l=window.setTimeout((()=>{r(!1)}),500))),()=>{clearTimeout(l)}}}}},50911:(e,t,n)=>{n.d(t,{Z:()=>m});var l=n(70537),a=n(27418),s=n(15924),r=n(69195),i=n(6144),o=n(52334),d=n(26209),c=n(66160),u=n(14566);const m=e=>{let{uid:t,cid:n}=e;const{t:m}=(0,u.$G)(),[x,p]=(0,l.useState)(void 0),f=(0,s.bS)(`/users/${t}`),[h,{isSuccess:g}]=(0,o.EO)(),[b,{isSuccess:v}]=(0,i.Cg)(),y=(0,s.s0)(),{copy:w}=(0,d.Z)(),{user:j,channel:k,loginUser:C}=(0,c.CG)((e=>({user:"undefined"!==typeof t?e.users.byId[t]:t,channel:"undefined"!==typeof n?e.channels.byId[n]:n,loginUser:e.authData.user})));(0,l.useEffect)((()=>{p(null!==t&&void 0!==t?t:null===C||void 0===C?void 0:C.uid)}),[t,C]),(0,l.useEffect)((()=>{(v||g)&&(a.ZP.success(m("tip.delete")),g&&f&&y("/users"))}),[v,g,f]);const N=!(null===C||void 0===C||!C.is_admin),Z=null===C||void 0===C?void 0:C.uid,_=!!n&&!(null!==k&&void 0!==k&&k.is_public)&&N,E=!!n&&!(null!==k&&void 0!==k&&k.is_public)&&(N||(null===k||void 0===k?void 0:k.owner)==Z)&&t!=(null===k||void 0===k?void 0:k.owner);return{canDeleteChannel:_,canRemove:N&&Z!=t&&!n&&1!==t,removeUser:e=>{const t=!Number.isNaN(+e)&&e||x;t&&(h(t),(0,r.Bn)())},startChat:()=>{y(`/chat/dm/${t}`)},removeFromChannel:e=>{if(!n)return;const t=!Number.isNaN(+e)&&e||x;t&&(b({id:+n,members:[+t]}),(0,r.Bn)())},canRemoveFromChannel:E,canCopyEmail:!(null===j||void 0===j||!j.email),copyEmail:e=>{const t="string"==typeof e&&e||(null===j||void 0===j?void 0:j.email);w(t||""),(0,r.Bn)()}}}},13507:(e,t,n)=>{n.r(t),n.d(t,{default:()=>w});var l=n(70537),a=n(15924),s=n(64084),r=n(84182),i=n(27418),o=n(80874),d=n(52334),c=n(40698),u=n(69885),m=n(14566),x=n(80683);const p=e=>{let{id:t,closeModal:n}=e;const{t:s}=(0,m.$G)("setting"),{t:r}=(0,m.$G)(),p=(0,a.s0)(),[f,{isLoading:h,isSuccess:g}]=(0,d.EO)();return(0,l.useEffect)((()=>{g&&(i.ZP.success(r("tip.delete")),n(),p("/chat"))}),[g]),t?(0,x.jsx)(o.Z,{id:"modal-modal",children:(0,x.jsx)(c.Z,{className:"compact",title:s("dm.delete"),description:s("dm.delete_desc"),buttons:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(u.Z,{onClick:n.bind(null,void 0),className:"cancel",children:r("action.cancel")}),(0,x.jsx)(u.Z,{onClick:()=>{f(t)},className:"danger",children:h?"Deleting":r("action.remove")})]})})}):null};var f=n(78468);function h(e){let{id:t=0}=e;return(0,x.jsx)("section",{className:"w-full h-full flex justify-center items-start",children:(0,x.jsx)(f.Z,{uid:t})})}var g=n(11089);const b=e=>{const{t:t}=(0,m.$G)("setting");return[{title:t("nav.general"),items:[{name:"overview",title:t("nav.overview"),component:(0,x.jsx)(h,{id:e})},{name:"auto_delete_msg",title:t("nav.auto_delete_msg"),component:(0,x.jsx)(g.Z,{id:e,type:"user"})}]}]};var v=n(66160);let y="";function w(){const{t:e}=(0,m.$G)(),{uid:t=0}=(0,a.UO)(),{loginUser:n}=(0,v.CG)((e=>({loginUser:e.authData.user,user:t?e.users.byId[+t]:void 0}))),i=(0,a.s0)(),[o]=(0,s.lr)(),d=b(+t),c=d.map((e=>{let{items:t}=e;return t})).flat(),u=o.get("nav");y=y||(o.get("f")||"/");const[f,h]=(0,l.useState)(!1),g=()=>{h((e=>!e))};if(!t)return null;const w=c.find((e=>e.name==u))||c[0],j=null===n||void 0===n?void 0:n.is_admin;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(r.Z,{nav:w,closeModal:()=>{i(y),y=""},title:"DM Setting",navs:d,dangers:[j&&{title:e("action.remove_user"),handler:g}],children:w.component}),f&&(0,x.jsx)(p,{closeModal:g,id:+t})]})}}}]);