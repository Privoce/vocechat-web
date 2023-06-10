"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[493],{79884:(e,t,a)=>{a.d(t,{Z:()=>n});var s,l=a(70537);function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},r.apply(this,arguments)}const i=(e,t)=>{let{title:a,titleId:i,...n}=e;return l.createElement("svg",r({width:20,height:20,viewBox:"0 0 20 20",fill:"#616161",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":i},n),a?l.createElement("title",{id:i},a):null,s||(s=l.createElement("path",{d:"M6.48667 11.6667L6.83667 8.33333H3.325V6.66667H7L7.43333 2.5H9.10833L8.66667 6.66667H11.9833L12.4167 2.5H14.0917L13.65 6.66667H16.625V8.33333H13.4667L13.1167 11.6667H16.6167V13.3333H12.9333L12.4917 17.5H10.8083L11.2417 13.3333H7.91667L7.475 17.5H5.8L6.23333 13.3333H3.25V11.6667H6.4H6.48667ZM8.1625 11.6667H11.4875L11.8375 8.33333H8.5125L8.1625 11.6667Z"})))},n=(0,l.forwardRef)(i)},7499:(e,t,a)=>{a.d(t,{Z:()=>o});var s=a(70537),l=a(2632),r=a(16956),i=a(56449),n=a(80683);const o=e=>{let{id:t=""}=e;const{favorites:a}=(0,l.Z)({}),[o,c]=(0,s.useState)(null);return(0,s.useEffect)((()=>{const e=a.find((e=>e.id==t)),{messages:s}=e||{};if(!s)return;const l=s.map((e=>{let{from_mid:t}=e;return+t}))||[];c((0,n.jsx)("div",{"data-favorite-mids":l.join(","),className:"favorite flex flex-col rounded-md bg-slate-50 dark:bg-slate-800",children:(0,n.jsx)("div",{className:"list",children:s.map(((e,t)=>{const{user:a={},download:s,content:l,content_type:o,properties:c,thumbnail:d}=e;return(0,n.jsxs)("div",{className:"w-full relative flex items-start gap-3 px-2 py-1 my-2 rounded-lg md:dark:hover:bg-gray-800",children:[a&&(0,n.jsx)("div",{className:"shrink-0 w-10 h-10 flex",children:(0,n.jsx)(r.Z,{width:40,height:40,className:"rounded-full object-cover",src:a.avatar,name:a.name})}),(0,n.jsxs)("div",{className:"w-full flex flex-col gap-2 text-sm",children:[(0,n.jsx)("div",{className:"flex items-center gap-2 font-semibold",children:(0,n.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:(null===a||void 0===a?void 0:a.name)||"Deleted User"})}),(0,n.jsx)("div",{className:"select-text text-gray-800 break-all whitespace-pre-wrap dark:text-white",children:(0,i.Z)({download:s,content:l,content_type:o,properties:c,thumbnail:d})})]})]},t)}))})}))}),[a,t]),t?o:null}},97601:(e,t,a)=>{a.d(t,{Z:()=>r});var s=a(70537),l=a(10336);const r=e=>{let{id:t="root-modal",mask:a=!0,children:r}=e;const[i,n]=(0,s.useState)(null);return(0,s.useEffect)((()=>{const e=document.getElementById(t);if(!e)return;a&&e.classList.add("mask");const s=document.createElement("div");return s.classList.add("wrapper"),e.appendChild(s),n(s),()=>{e.removeChild(s)}}),[t,a]),i?(0,l.createPortal)(r,i):null}},32102:(e,t,a)=>{a.r(t),a.d(t,{default:()=>b});var s=a(70537),l=a(14566),r=a(57425),i=a(7699),n=a.n(i),o=a(80308),c=a(66160),d=a(7499),m=a(2632),u=a(79884),x=a(25552),h=a(20814),f=a(31271),p=a(26906),v=a(8969),g=a(80683);const b=function(){const{t:e}=(0,l.$G)("fav"),[t,a]=(0,s.useState)(""),[i,b]=(0,s.useState)([]),{removeFavorite:w}=(0,m.Z)({}),j=[{icon:(0,g.jsx)(p.Z,{className:"w-[15px] h-5"}),title:e("all_items"),filter:""},{icon:(0,g.jsx)(f.Z,{className:"w-[15px] h-5"}),title:e("image"),filter:"image"},{icon:(0,g.jsx)(v.Z,{className:"w-[15px] h-5"}),title:e("video"),filter:"video"},{icon:(0,g.jsx)(h.Z,{className:"w-[15px] h-5"}),title:e("audio"),filter:"audio"}],{favorites:y,channelData:N,userData:_}=(0,c.CG)((e=>({favorites:e.favorites,userData:e.users.byId,channelData:e.channels.byId}))),k=e=>{a(e)};(0,s.useEffect)((()=>{if(t)switch(t){case"audio":b(y.filter((e=>(e.messages||[]).every((e=>{var t;const a=null===(t=e.properties)||void 0===t?void 0:t.content_type;return e.content_type==o.bT.file&&a.startsWith("audio")})))));break;case"video":b(y.filter((e=>(e.messages||[]).every((e=>{var t;const a=null===(t=e.properties)||void 0===t?void 0:t.content_type;return e.content_type==o.bT.file&&a.startsWith("video")})))));break;case"image":{const e=y.filter((e=>(e.messages||[]).every((e=>{var t;const a=null===(t=e.properties)||void 0===t?void 0:t.content_type;return e.content_type==o.bT.file&&a.startsWith("image")}))));b(e)}}else b(y)}),[t,y]);const Z=e=>{const{id:t=""}=e.currentTarget.dataset;w(t)};return(0,g.jsxs)("div",{className:"h-screen flex bg-white mt-2 mr-6 mb-2.5 overflow-auto dark:bg-gray-700 rounded-2xl",children:[(0,g.jsx)("div",{className:" md:min-w-[268px] p-2 shadow-inner-[-1px_0px_0px_rgba(0,_0,_0,_0.1)]",children:(0,g.jsx)("ul",{className:"flex flex-col gap-0.5",children:j.map((e=>{let{icon:a,title:s,filter:l}=e;return(0,g.jsxs)("li",{className:(0,r.Z)(l==t&&"bg-[rgba(116,_127,_141,_0.2)]","cursor-pointer flex items-center gap-2 p-2 rounded-lg md:hover:bg-[rgba(116,_127,_141,_0.2)]"),onClick:k.bind(null,l),children:[a,(0,g.jsx)("span",{className:"hidden md:block font-bold text-sm text-gray-600 dark:text-gray-100",children:s})]},l)}))})}),(0,g.jsx)("div",{className:"w-full p-4 flex flex-col overflow-y-scroll gap-8",children:i.map((e=>{var t,a;let{id:s,created_at:l,messages:i}=e;if(!i||0==i.length)return null;const[{source:{gid:o,uid:c}}]=i,m=(0,g.jsx)("span",{className:(0,r.Z)("inline-flex items-center gap-1 mr-2"),children:o?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(u.Z,{className:"w-3 h-3"})," ",null===(t=N[o])||void 0===t?void 0:t.name]}):(0,g.jsxs)(g.Fragment,{children:["From"," ",(0,g.jsx)("strong",{className:"font-bold text-gray-800 dark:text-gray-100",children:null===(a=_[c])||void 0===a?void 0:a.name})]})});return(0,g.jsxs)("div",{className:"max-w-[600px] flex flex-col gap-1",children:[(0,g.jsxs)("h4",{className:"inline-flex items-center text-xs text-gray-400",children:[m,n()(l).format("YYYY-MM-DD")]}),(0,g.jsxs)("div",{className:"relative group",children:[(0,g.jsx)(d.Z,{id:s},s),(0,g.jsx)("button",{className:"absolute top-2 right-2 flex-center w-6 h-6 p-1 border border-solid border-slate-200 dark:border-slate-700 rounded invisible group-hover:visible","data-id":s,onClick:Z,children:(0,g.jsx)(x.Z,{className:"fill-slate-900 dark:fill-slate-100"})})]})]},s)}))})]})}}}]);