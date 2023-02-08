"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[507],{11089:(e,t,l)=>{l.d(t,{Z:()=>u});var s=l(70537),r=l(27418),n=l(14566),a=l(52334),i=l(66160),o=l(24563),d=l(15621),c=l(80683);const u=e=>{var t,l;let{id:u,type:m="channel"}=e;const h=(0,i.CG)((e=>"channel"==m?e.footprint.autoDeleteMsgChannels.find((e=>e.gid==u)):e.footprint.autoDeleteMsgUsers.find((e=>e.uid==u)))),[x,{isSuccess:p}]=(0,a.ar)(),[v,g]=(0,s.useState)(null!==(t=null===h||void 0===h?void 0:h.expires_in)&&void 0!==t?t:0),{t:f}=(0,n.$G)("setting",{keyPrefix:"auto_delete_msg"}),{t:b}=(0,n.$G)(),y=[{title:f("off"),value:0},{title:f("5_min"),value:300},{title:f("10_min"),value:600},{title:f("1_hour"),value:3600},{title:f("1_day"),value:86400},{title:f("1_week"),value:604800}];(0,s.useEffect)((()=>{p&&r.Am.success(b("tip.update"))}),[p]);const w=null!==(l=null===h||void 0===h?void 0:h.expires_in)&&void 0!==l?l:0;return(0,c.jsxs)("section",{className:"max-w-[512px] h-full relative",children:[(0,c.jsxs)("div",{className:"text-sm",children:[(0,c.jsx)("h2",{className:"dark:text-white",children:f("title")}),(0,c.jsx)("p",{className:"text-gray-500 dark:text-gray-400",children:f("desc")})]}),(0,c.jsx)("div",{className:"mt-4",children:(0,c.jsx)(d.Z,{options:y.map((e=>{let{title:t}=e;return t})),values:y.map((e=>{let{value:t}=e;return t})),value:v||0,onChange:e=>{g(e)}})}),w!==v&&(0,c.jsx)(o.Z,{saveHandler:()=>{x("user"==m?{users:[{uid:u,expires_in:v}]}:{groups:[{gid:u,expires_in:v}]})},resetHandler:()=>{var e;g(null!==(e=null===h||void 0===h?void 0:h.expires_in)&&void 0!==e?e:0)}})]})}},64631:(e,t,l)=>{l.d(t,{Z:()=>i});var s=l(70537),r=l(21812),n=l(80683);function a(e){return e<=16?8:e<=24?12:e<=32?16:e<=40?18:e<=56?22:e<=80?48:64}const i=e=>{let{src:t="",name:l="Deleted User",type:i="user",width:o,height:d,...c}=e;const[u,m]=(0,s.useState)("");(0,s.useEffect)((()=>{t||m(t)}),[t]);const h=()=>{m("")};return u?(0,n.jsx)("img",{src:u,onError:h,...c}):(0,n.jsx)("div",{className:`rounded-full flex-center ${c.className||""}`,style:{width:o,height:d,fontSize:a(o),fontWeight:400,fontFamily:"'Lato', 'Lato-Regular', 'Helvetica Neue'",background:"channel"===i?"#EAECF0":"#4c99e9",color:"channel"===i?"#475467":"#FFFFFF"},children:(0,r.Qm)(l)})}},80874:(e,t,l)=>{l.d(t,{Z:()=>n});var s=l(70537),r=l(10336);const n=e=>{let{id:t="root-modal",mask:l=!0,children:n}=e;const[a,i]=(0,s.useState)(null);return(0,s.useEffect)((()=>{const e=document.getElementById(t);if(!e)return;l&&e.classList.add("mask");const s=document.createElement("div");return s.classList.add("wrapper"),e.appendChild(s),i(s),()=>{e.removeChild(s)}}),[t,l]),a?(0,r.createPortal)(n,a):null}},78468:(e,t,l)=>{l.d(t,{Z:()=>w});var s,r=l(70537),n=l(64084),a=l(7829);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s])}return e},i.apply(this,arguments)}const o=(e,t)=>{let{title:l,titleId:n,...a}=e;return r.createElement("svg",i({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":n},a),l?r.createElement("title",{id:n},l):null,s||(s=r.createElement("path",{d:"M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35578 20.8583L3.06538 21.9753C2.6111 22.0937 2.1469 21.8213 2.02858 21.367C1.99199 21.2266 1.99198 21.0791 2.02855 20.9386L3.1449 16.6502C2.3972 15.2294 2 13.6428 2 12C2 6.47715 6.47715 2 12 2Z",fill:"#22CCEE"})))},d=(0,r.forwardRef)(o);var c;function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s])}return e},u.apply(this,arguments)}const m=(e,t)=>{let{title:l,titleId:s,...n}=e;return r.createElement("svg",u({width:24,height:24,viewBox:"0 0 24 24",fill:"#616161",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":s},n),l?r.createElement("title",{id:s},l):null,c||(c=r.createElement("path",{d:"M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z"})))},h=(0,r.forwardRef)(m);var x=l(64631),p=l(50911),v=l(66160),g=l(14566),f=l(57425),b=l(80683);const y=e=>{let{uid:t,type:l="embed",cid:s}=e;const{t:r}=(0,g.$G)("member"),{t:i}=(0,g.$G)(),{canCopyEmail:o,copyEmail:c,removeFromChannel:u,canRemoveFromChannel:m,canRemove:y,removeUser:w}=(0,p.Z)({uid:t,cid:s}),{data:j}=(0,v.CG)((e=>({data:e.users.byId[t]})));if(!j)return null;const{name:N,email:C,avatar:k}=j,Z="card"==l,E=!Z&&y,_=C||m||E,$="cursor-pointer flex flex-col items-center gap-1 rounded-lg w-32 text-primary-400 bg-gray-100 dark:bg-gray-800 text-sm pt-3.5 pb-3",O=(0,f.Z)("flex-center flex-col gap-1 z-[99] mt-20 select-none",Z?"p-4 w-[280px] bg-white dark:bg-gray-800 drop-shadow rounded-md":"w-[432px]");return(0,b.jsxs)("div",{className:O,children:[(0,b.jsx)(x.Z,{width:80,height:80,className:"rounded-full w-20 h-20 object-cover",src:k,name:N}),(0,b.jsx)("h2",{className:"text-lg select-text font-bold text-[#1c1c1e] dark:text-white",children:N}),(0,b.jsx)("span",{className:"text-sm text-[#98a2b3] dark:text-gray-200 select-text",children:C}),(0,b.jsxs)("ul",{className:(0,f.Z)("mt-6 flex items-center gap-2",Z&&"pb-0.5"),children:[(0,b.jsx)(n.OL,{to:`/chat/dm/${t}`,children:(0,b.jsxs)("li",{className:`${$} icon chat`,children:[(0,b.jsx)(d,{}),(0,b.jsx)("span",{children:r("send_msg")})]})}),(0,b.jsx)(a.ZP,{disabled:!_,interactive:!0,popperOptions:{strategy:"fixed"},placement:"bottom-start",trigger:"click",hideOnClick:!0,content:(0,b.jsxs)("ul",{className:"context-menu",children:[o&&(0,b.jsx)("li",{className:"item",onClick:c.bind(void 0,C),children:r("copy_email")}),m&&(0,b.jsx)("li",{className:"item danger",onClick:u.bind(null,t),children:r("remove_from_channel")}),E&&(0,b.jsx)("li",{className:"item danger",onClick:w.bind(null,t),children:r("remove")})]}),children:(0,b.jsxs)("li",{className:`${$} icon ${_?"":"text-gray-500"}`,children:[(0,b.jsx)(h,{className:_?"fill-primary-500":""}),(0,b.jsx)("span",{children:i("more")})]})})]})]})},w=(0,r.memo)(y)},24563:(e,t,l)=>{l.d(t,{Z:()=>a});var s=l(14566),r=l(69885),n=l(80683);const a=e=>{let{saveHandler:t,resetHandler:l}=e;const{t:a}=(0,s.$G)("setting");return(0,n.jsxs)("div",{className:"w-full p-2 absolute bottom-16 left-0 flex items-center justify-between text-gray-500 border border-solid border-gray-200 dark:border-gray-400 dark:bg-gray-600 shadow-md rounded-full",children:[(0,n.jsx)("span",{className:"p-2 text-sm dark:text-gray-200",children:a("save_tip")}),(0,n.jsxs)("div",{className:"flex items-center gap-3",children:[(0,n.jsx)(r.Z,{className:"small ghost !border-none !text-gray-500 !shadow-none dark:!text-gray-100",onClick:l,children:a("reset")}),(0,n.jsx)(r.Z,{className:"small !rounded-full",onClick:t,children:a("save_change")})]})]})}},84182:(e,t,l)=>{l.d(t,{Z:()=>m});var s,r=l(15924),n=l(64084),a=l(70537);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s])}return e},i.apply(this,arguments)}const o=(e,t)=>{let{title:l,titleId:r,...n}=e;return a.createElement("svg",i({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":r},n),l?a.createElement("title",{id:r},l):null,s||(s=a.createElement("path",{d:"M10 4L6 8L10 12",stroke:"black",strokeOpacity:.3,strokeLinecap:"round",strokeLinejoin:"round"})))},d=(0,a.forwardRef)(o);var c=l(57425),u=l(80683);const m=e=>{let{closeModal:t,title:l="Settings",navs:s=[],dangers:a=[],nav:i,children:o}=e;const{pathname:m}=(0,r.TH)();return(0,u.jsxs)("div",{className:"w-screen h-screen flex",children:[(0,u.jsxs)("div",{className:"max-h-screen min-w-[212px] overflow-scroll px-4 py-8 bg-[#f5f6f7] dark:bg-[#1F2A37]",children:[(0,u.jsxs)("h2",{onClick:t,className:"flex gap-2 items-center cursor-pointer mb-8 font-bold text-gray-800 dark:text-white",children:[(0,u.jsx)(d,{className:"dark:fill-gray-400"})," ",l]}),s.map((e=>{let{title:t,items:l}=e;return(0,u.jsx)("ul",{"data-title":t,className:"flex flex-col gap-0.5 mb-9 before:pl-3 before:content-[attr(data-title)] before:font-bold before:text-xs before:text-gray-400",children:l.map((e=>{let{name:t,title:l}=e;return(0,u.jsx)("li",{className:(0,c.Z)("text-sm font-semibold text-gray-600 whitespace-nowrap dark:text-gray-200  rounded hover:bg-[#e7e5e4] dark:hover:bg-slate-500/20",t==(null===i||void 0===i?void 0:i.name)&&"bg-[#e7e5e4] dark:bg-slate-500/20"),children:(0,u.jsx)(n.OL,{to:`${m}?nav=${t}`,className:"block px-3 py-1",children:l})},t)}))},t)})),a.length?(0,u.jsx)("ul",{className:"flex flex-col gap-2 mb-9",children:a.map((e=>{if("boolean"===typeof e||!e)return null;const{title:t,handler:l}=e;return(0,u.jsx)("li",{onClick:l,className:"text-sm text-red-500 dark:text-red-400 rounded cursor-pointer py-1.5 px-3",children:t},t)}))}):null]}),(0,u.jsxs)("div",{className:"bg-white w-full max-h-full overflow-auto p-8 dark:bg-[#384250]",children:[i&&(0,u.jsx)("h4",{className:"font-bold text-xl text-gray-600 mb-8 dark:text-gray-100",children:i.title}),o]})]})}},40698:(e,t,l)=>{l.d(t,{Z:()=>n});var s=l(57425),r=l(80683);const n=e=>{let{compact:t=!1,title:l="",description:n="",buttons:a,children:i,className:o}=e;return(0,r.jsxs)("div",{className:(0,s.Z)("rounded-lg bg-white dark:bg-gray-900 drop-shadow",t?"p-4 min-w-[406px] text-left":"p-8 min-w-[440px] text-center",o),children:[l&&(0,r.jsx)("h3",{className:"text-xl text-gray-600 dark:text-white mb-4 font-semibold",children:l}),n&&(0,r.jsx)("p",{className:"text-sm text-gray-400 dark:text-gray-100 mb-2",children:n}),i,a&&(0,r.jsx)("div",{className:"pt-4 w-full flex justify-end gap-4 items-center",children:a})]})}},15621:(e,t,l)=>{l.d(t,{Z:()=>i});var s=l(70537),r=l(80683);const n="",a=[],i=e=>{let{options:t,values:l=a,value:i=n,defaultValue:o="",onChange:d}=e;const c=(0,s.useId)(),[u,m]=(0,s.useState)(o),h=i!==n?i:u;return(0,r.jsx)("form",{className:"w-full flex flex-col gap-2",children:t.map(((e,t)=>(0,r.jsxs)("div",{className:"relative bg-transparent",children:[(0,r.jsx)("input",{className:"absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer peer z-50",type:"radio",checked:(l!==a?l.indexOf(h):h)===t,onChange:()=>{const e=l===a?t:l[t];i===n&&m(e),d&&d(e)},id:`${c}-${t}`}),(0,r.jsx)("div",{className:"drop-shadow px-2 py-3 border border-solid border-gray-300 dark:border-gray-400 rounded-lg w-full h-full bg-white dark:bg-gray-800 peer-checked:bg-primary-400 text-sm text-gray-500 dark:text-gray-300  peer-checked:text-white",children:(0,r.jsx)("label",{className:"ml-6",htmlFor:`${c}-${t}`,children:e})}),(0,r.jsx)("div",{className:"absolute top-1/2 left-3 -translate-y-1/2 w-3.5 h-3.5 rounded-full border border-solid border-gray-300 peer-checked:hidden"}),(0,r.jsx)("div",{className:"absolute top-1/2 left-3 -translate-y-1/2 w-3.5 h-3.5 rounded-full border border-solid border-white invisible peer-checked:visible flex-center",children:(0,r.jsx)("div",{className:"w-1 h-1 bg-white rounded-full"})})]},t)))})}},26209:(e,t,l)=>{l.d(t,{Z:()=>a});var s=l(70537),r=l(34108),n=l(27418);const a=e=>{const{enableToast:t=!0}=e||{},[l,a]=(0,s.useState)(!1);(0,s.useEffect)((()=>{l&&t&&n.ZP.success("Copied!")}),[l]);const i=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const l=document.getSelection();if(!l)return!1;const s=l.rangeCount>0&&l.getRangeAt(0);t.select();const r=document.execCommand("copy");return document.body.removeChild(t),s&&(l.removeAllRanges(),l.addRange(s)),r};return{copied:l,copy:function(e){let t=0;return l||(arguments.length>1&&void 0!==arguments[1]&&arguments[1]?(0,r.VP)(e).then((()=>{a(!0),t=window.setTimeout((()=>{a(!1)}),500)})):(a(i(e)),t=window.setTimeout((()=>{a(!1)}),500))),()=>{clearTimeout(t)}}}}},50911:(e,t,l)=>{l.d(t,{Z:()=>m});var s=l(70537),r=l(27418),n=l(15924),a=l(69195),i=l(6144),o=l(52334),d=l(26209),c=l(66160),u=l(14566);const m=e=>{let{uid:t,cid:l}=e;const{t:m}=(0,u.$G)(),[h,x]=(0,s.useState)(void 0),p=(0,n.bS)(`/users/${t}`),[v,{isSuccess:g}]=(0,o.EO)(),[f,{isSuccess:b}]=(0,i.Cg)(),y=(0,n.s0)(),{copy:w}=(0,d.Z)(),{user:j,channel:N,loginUser:C}=(0,c.CG)((e=>({user:"undefined"!==typeof t?e.users.byId[t]:t,channel:"undefined"!==typeof l?e.channels.byId[l]:l,loginUser:e.authData.user})));(0,s.useEffect)((()=>{x(null!==t&&void 0!==t?t:null===C||void 0===C?void 0:C.uid)}),[t,C]),(0,s.useEffect)((()=>{(b||g)&&(r.ZP.success(m("tip.delete")),g&&p&&y("/users"))}),[b,g,p]);const k=!(null===C||void 0===C||!C.is_admin),Z=null===C||void 0===C?void 0:C.uid,E=!!l&&!(null!==N&&void 0!==N&&N.is_public)&&k,_=!!l&&!(null!==N&&void 0!==N&&N.is_public)&&(k||(null===N||void 0===N?void 0:N.owner)==Z)&&t!=(null===N||void 0===N?void 0:N.owner);return{canDeleteChannel:E,canRemove:k&&Z!=t&&!l&&1!==t,removeUser:e=>{const t=!Number.isNaN(+e)&&e||h;t&&(v(t),(0,a.Bn)())},startChat:()=>{y(`/chat/dm/${t}`)},removeFromChannel:e=>{if(!l)return;const t=!Number.isNaN(+e)&&e||h;t&&(f({id:+l,members:[+t]}),(0,a.Bn)())},canRemoveFromChannel:_,canCopyEmail:!(null===j||void 0===j||!j.email),copyEmail:e=>{const t="string"==typeof e&&e||(null===j||void 0===j?void 0:j.email);w(t||""),(0,a.Bn)()}}}},13507:(e,t,l)=>{l.r(t),l.d(t,{default:()=>w});var s=l(70537),r=l(15924),n=l(64084),a=l(84182),i=l(27418),o=l(80874),d=l(52334),c=l(40698),u=l(69885),m=l(14566),h=l(80683);const x=e=>{let{id:t,closeModal:l}=e;const{t:n}=(0,m.$G)("setting"),{t:a}=(0,m.$G)(),x=(0,r.s0)(),[p,{isLoading:v,isSuccess:g}]=(0,d.EO)();return(0,s.useEffect)((()=>{g&&(i.ZP.success(a("tip.delete")),l(),x("/chat"))}),[g]),t?(0,h.jsx)(o.Z,{id:"modal-modal",children:(0,h.jsx)(c.Z,{className:"compact",title:n("dm.delete"),description:n("dm.delete_desc"),buttons:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(u.Z,{onClick:l.bind(null,void 0),className:"cancel",children:a("action.cancel")}),(0,h.jsx)(u.Z,{onClick:()=>{p(t)},className:"danger",children:v?"Deleting":a("action.remove")})]})})}):null};var p=l(78468);function v(e){let{id:t=0}=e;return(0,h.jsx)("section",{className:"w-full h-full flex justify-center items-start",children:(0,h.jsx)(p.Z,{uid:t})})}var g=l(11089);const f=e=>{const{t:t}=(0,m.$G)("setting");return[{title:t("nav.general"),items:[{name:"overview",title:t("nav.overview"),component:(0,h.jsx)(v,{id:e})},{name:"auto_delete_msg",title:t("nav.auto_delete_msg"),component:(0,h.jsx)(g.Z,{id:e,type:"user"})}]}]};var b=l(66160);let y="";function w(){const{t:e}=(0,m.$G)(),{uid:t=0}=(0,r.UO)(),{loginUser:l}=(0,b.CG)((e=>({loginUser:e.authData.user,user:t?e.users.byId[+t]:void 0}))),i=(0,r.s0)(),[o]=(0,n.lr)(),d=f(+t),c=d.map((e=>{let{items:t}=e;return t})).flat(),u=o.get("nav");y=y||(o.get("f")||"/");const[p,v]=(0,s.useState)(!1),g=()=>{v((e=>!e))};if(!t)return null;const w=c.find((e=>e.name==u))||c[0],j=null===l||void 0===l?void 0:l.is_admin;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a.Z,{nav:w,closeModal:()=>{i(y),y=""},title:"DM Setting",navs:d,dangers:[j&&{title:e("action.remove_user"),handler:g}],children:w.component}),p&&(0,h.jsx)(x,{closeModal:g,id:+t})]})}}}]);