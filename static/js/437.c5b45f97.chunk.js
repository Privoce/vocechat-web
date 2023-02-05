"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[437],{18697:(e,t,a)=>{a.d(t,{Z:()=>o});var s,l,r=a(70537);function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},n.apply(this,arguments)}const i=(e,t)=>{let{title:a,titleId:i,...o}=e;return r.createElement("svg",n({width:16,height:12,viewBox:"0 0 16 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":i},o),a?r.createElement("title",{id:i},a):null,s||(s=r.createElement("g",{clipPath:"url(#clip0_9046_23916)"},r.createElement("path",{d:"M4.93942 9.69781L1.62578 6.38648C1.25336 6.01431 0.651746 6.01431 0.27932 6.38648C-0.0931066 6.75865 -0.0931066 7.35984 0.27932 7.73201L4.27096 11.7209C4.64339 12.093 5.245 12.093 5.61743 11.7209L15.7207 1.62465C16.0931 1.25248 16.0931 0.651292 15.7207 0.279125C15.3483 -0.0930417 14.7466 -0.0930417 14.3742 0.279125L4.93942 9.69781Z",fill:"#78787C"}))),l||(l=r.createElement("defs",null,r.createElement("clipPath",{id:"clip0_9046_23916"},r.createElement("rect",{width:16,height:12,fill:"white"})))))},o=(0,r.forwardRef)(i)},95727:(e,t,a)=>{a.d(t,{Z:()=>d});var s=a(70537),l=a(64631);const r=a.p+"static/media/upload.image.9f8c7fc90042d2ff4eb7.svg";var n=a(14566),i=a(57425),o=a(80683);const d=e=>{let{size:t=96,uid:a,className:d="",url:c="",name:x="",type:p="user",uploadImage:m,disabled:h=!1}=e;const{t:f}=(0,n.$G)(),[u,g]=(0,s.useState)(!1);return(0,o.jsxs)("div",{style:{width:`${t}px`,height:`${t}px`},className:(0,i.Z)(d,"relative group"),children:[(0,o.jsxs)("div",{className:"group overflow-hidden relative w-full h-full rounded-full bg-gray-50",children:[(0,o.jsx)(l.Z,{width:t,height:t,type:p,src:c,name:x,className:`${d} object-cover w-full h-full`}),!h&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"flex-center flex-col whitespace-nowrap hidden group-hover:flex p-1 absolute inset-0 bg-black/50 text-white font-bold text-xs",children:f(u?"status.uploading":"action.change_avatar")}),(0,o.jsx)("input",{className:"opacity-0 absolute inset-0 block cursor-pointer",multiple:!1,onChange:async e=>{if(u)return;if(!e.target.files)return;const[t]=Array.from(e.target.files);g(!0),a?await m({uid:a,file:t}):await m(t),g(!1)},type:"file",accept:"image/*",name:"avatar",id:"avatar"})]})]}),!h&&(0,o.jsx)("img",{src:r,alt:"icon",className:"hidden w-7 h-7 absolute top-0 right-0 group-hover:block"})]})}},61895:(e,t,a)=>{a.d(t,{Z:()=>_});var s=a(70537),l=a(7829),r=a(69195),n=a(27418),i=a(52334),o=a(33941),d=a(63211),c=a(4884),x=a(17237),p=a(69885),m=a(14566),h=a(43764),f=a(80683);const u=()=>{const{t:e}=(0,m.$G)("chat"),{generating:t,link:a,linkCopied:s,copyLink:l,generateNewLink:r}=(0,c.Z)();return(0,f.jsxs)("div",{className:"flex flex-col items-start pb-8",children:[(0,f.jsx)("span",{className:"font-semibold text-sm mb-2 text-gray-500 dark:text-gray-50",children:e("share_invite_link")}),(0,f.jsxs)("div",{className:"w-[512px] mb-3 relative",children:[(0,f.jsx)(x.Z,{readOnly:!0,className:"large !pr-16",placeholder:"Generating",value:a}),(0,f.jsx)(p.Z,{onClick:l,className:"ghost small border_less absolute right-1 top-1/2 -translate-y-1/2",children:s?"Copied":e("action.copy",{ns:"common"})})]}),(0,f.jsx)("span",{className:"text-xs text-gray-600 dark:text-gray-100",children:e("invite_link_expire")}),(0,f.jsx)("div",{className:"w-44 h-44 my-2",children:(0,f.jsx)(h.Z,{link:a})}),(0,f.jsx)(p.Z,{className:"ghost",disabled:t,onClick:()=>{r()},children:t?"Generating":e("generate_new_link")})]})};var g,b,v=a(80169),w=a(87826);function j(){return j=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},j.apply(this,arguments)}const y=(e,t)=>{let{title:a,titleId:l,...r}=e;return s.createElement("svg",j({width:6,height:6,viewBox:"0 0 6 6",fill:"black",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":l},r),a?s.createElement("title",{id:l},a):null,g||(g=s.createElement("rect",{opacity:.01,width:6,height:6,fill:"#D8D8D8"})),b||(b=s.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.62506 1.64911C5.41795 1.4503 5.08216 1.45029 4.87506 1.64911L3.00003 3.44911L1.12506 1.64916C0.917951 1.45034 0.582164 1.45034 0.375057 1.64916C0.16795 1.84798 0.16795 2.17033 0.375057 2.36915L2.62506 4.52912C2.83217 4.72794 3.16795 4.72794 3.37506 4.52912C3.37665 4.5276 3.37822 4.52608 3.37977 4.52454L5.62506 2.36911C5.83216 2.17029 5.83216 1.84793 5.62506 1.64911Z",fillOpacity:.5})))},k=(0,s.forwardRef)(y);var N=a(18697),C=a(50911),Z=a(66160);const _=e=>{let{cid:t}=e;const{t:a}=(0,m.$G)("member"),{t:c}=(0,m.$G)(),{users:x,channels:p,loginUser:h}=(0,Z.CG)((e=>({users:e.users,channels:e.channels,loginUser:e.authData.user}))),{copyEmail:g,removeFromChannel:b,removeUser:j}=(0,C.Z)({cid:t}),[y,{isSuccess:_}]=(0,i.kD)();(0,s.useEffect)((()=>{_&&n.ZP.success(c("tip.update"))}),[_]);const E=e=>{let{ignore:t=!1,uid:a,isAdmin:s=!0}=e;(0,r.Bn)(),t||y({id:a,is_admin:s})},L=t?p.byId[t]:null,$=L?L.is_public?x.ids:L.members:x.ids;return(0,f.jsxs)("section",{className:"flex flex-col w-full",children:[(null===h||void 0===h?void 0:h.is_admin)&&(0,f.jsx)(u,{}),(0,f.jsxs)("div",{className:"flex flex-col mb-10",children:[(0,f.jsx)("h4",{className:"font-bold text-gray-600 dark:text-white",children:a("manage_members")}),(0,f.jsx)("p",{className:"text-gray-500 dark:text-gray-100 text-xs",children:a("manage_tip")})]}),(0,f.jsx)("ul",{className:"flex flex-col gap-1 w-[512px] mb-44",children:$.map((e=>{const t=x.byId[e];if(!t)return null;const{name:s,email:r,is_admin:n}=t,i=L&&L.owner==e,p=(null===h||void 0===h?void 0:h.is_admin)&&h.uid!==e&&1!==e,m=r||(null===h||void 0===h?void 0:h.is_admin),u=(null===h||void 0===h?void 0:h.is_admin)&&(null===h||void 0===h?void 0:h.uid)!=e&&1!==e,y=L&&L.owner==(null===h||void 0===h?void 0:h.uid)&&(null===h||void 0===h?void 0:h.uid)!=e;return(0,f.jsxs)("li",{className:"w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-gray-800",children:[(0,f.jsxs)("div",{className:"flex gap-4",children:[(0,f.jsx)(o.Z,{compact:!0,uid:e,interactive:!1}),(0,f.jsxs)("div",{className:"flex flex-col",children:[(0,f.jsxs)("span",{className:"font-bold text-sm text-gray-600 dark:text-white flex items-center gap-1",children:[s," ",i&&(0,f.jsx)(w.Z,{})]}),(0,f.jsx)("span",{className:"text-xs text-gray-500 dark:text-slate-50",children:r})]})]}),(0,f.jsxs)("div",{className:"flex items-center gap-7",children:[(0,f.jsxs)("span",{className:"text-xs text-right text-gray-500 dark:text-slate-100 flex items-center gap-1",children:[a(n?"admin":"user"),p&&(0,f.jsx)(l.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,f.jsxs)(d.Z,{className:"menu",children:[(0,f.jsxs)("li",{className:"item sb",onClick:E.bind(null,{ignore:n,uid:e,isAdmin:!0}),children:[a("admin"),n&&(0,f.jsx)(N.Z,{className:"icon"})]}),(0,f.jsxs)("li",{className:"item sb",onClick:E.bind(null,{ignore:!n,uid:e,isAdmin:!1}),children:[a("user"),!n&&(0,f.jsx)(N.Z,{className:"icon"})]})]}),children:(0,f.jsx)(k,{className:"cursor-pointer dark:fill-slate-50"})})]}),m&&(0,f.jsx)(l.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,f.jsxs)(d.Z,{className:"min-w-30",children:[r&&(0,f.jsx)("li",{className:"item",onClick:g.bind(null,r),children:c("action.copy_email")}),y&&(0,f.jsx)("li",{className:"item danger",onClick:b.bind(null,e),children:a("remove_from_channel")}),u&&(0,f.jsx)("li",{className:"item danger",onClick:j.bind(null,e),children:c("action.remove")})]}),children:(0,f.jsx)("div",{className:"relative w-6 h-6",children:(0,f.jsx)("img",{className:"cursor-pointer",src:v,alt:"dots icon"})})})]})]},e)}))})]})}},80874:(e,t,a)=>{a.d(t,{Z:()=>r});var s=a(70537),l=a(10336);const r=e=>{let{id:t="root-modal",mask:a=!0,children:r}=e;const[n,i]=(0,s.useState)(null);return(0,s.useEffect)((()=>{const e=document.getElementById(t);if(!e)return;a&&e.classList.add("mask");const s=document.createElement("div");return s.classList.add("wrapper"),e.appendChild(s),i(s),()=>{e.removeChild(s)}}),[t,a]),n?(0,l.createPortal)(r,n):null}},43764:(e,t,a)=>{a.d(t,{Z:()=>n});var s=a(36185),l=a(66160),r=a(80683);const n=e=>{let{link:t}=e;const a=(0,l.CG)((e=>e.server.logo));return(0,r.jsx)(s.Qd,{value:t,className:"rounded border border-solid border-gray-200 dark:border-gray-100 p-1 !w-full !h-full",size:512,bgColor:"#fff",fgColor:"#22ccee",level:"L",includeMargin:!1,imageSettings:{src:a,x:void 0,y:void 0,height:80,width:80,excavate:!0}})}},24563:(e,t,a)=>{a.d(t,{Z:()=>n});var s=a(14566),l=a(69885),r=a(80683);const n=e=>{let{saveHandler:t,resetHandler:a}=e;const{t:n}=(0,s.$G)("setting");return(0,r.jsxs)("div",{className:"w-full p-2 absolute bottom-16 left-0 flex items-center justify-between text-gray-500 border border-solid border-gray-200 dark:border-gray-400 dark:bg-gray-600 shadow-md rounded-full",children:[(0,r.jsx)("span",{className:"p-2 text-sm dark:text-gray-200",children:n("save_tip")}),(0,r.jsxs)("div",{className:"flex items-center gap-3",children:[(0,r.jsx)(l.Z,{className:"small ghost !border-none !text-gray-500 !shadow-none dark:!text-gray-100",onClick:a,children:n("reset")}),(0,r.jsx)(l.Z,{className:"small !rounded-full",onClick:t,children:n("save_change")})]})]})}},84182:(e,t,a)=>{a.d(t,{Z:()=>p});var s,l=a(15924),r=a(64084),n=a(70537);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},i.apply(this,arguments)}const o=(e,t)=>{let{title:a,titleId:l,...r}=e;return n.createElement("svg",i({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":l},r),a?n.createElement("title",{id:l},a):null,s||(s=n.createElement("path",{d:"M10 4L6 8L10 12",stroke:"black",strokeOpacity:.3,strokeLinecap:"round",strokeLinejoin:"round"})))},d=(0,n.forwardRef)(o);var c=a(57425),x=a(80683);const p=e=>{let{closeModal:t,title:a="Settings",navs:s=[],dangers:n=[],nav:i,children:o}=e;const{pathname:p}=(0,l.TH)();return(0,x.jsxs)("div",{className:"w-screen h-screen flex",children:[(0,x.jsxs)("div",{className:"max-h-screen min-w-[212px] overflow-scroll px-4 py-8 bg-[#f5f6f7] dark:bg-[#1F2A37]",children:[(0,x.jsxs)("h2",{onClick:t,className:"flex gap-2 items-center cursor-pointer mb-8 font-bold text-gray-800 dark:text-white",children:[(0,x.jsx)(d,{className:"dark:fill-gray-400"})," ",a]}),s.map((e=>{let{title:t,items:a}=e;return(0,x.jsx)("ul",{"data-title":t,className:"flex flex-col gap-0.5 mb-9 before:pl-3 before:content-[attr(data-title)] before:font-bold before:text-xs before:text-gray-400",children:a.map((e=>{let{name:t,title:a}=e;return(0,x.jsx)("li",{className:(0,c.Z)("text-sm text-gray-700 whitespace-nowrap dark:text-gray-200  rounded hover:bg-[#e7e5e4] dark:hover:bg-slate-500/20",t==(null===i||void 0===i?void 0:i.name)&&"bg-[#e7e5e4] dark:bg-slate-500/20"),children:(0,x.jsx)(r.OL,{to:`${p}?nav=${t}`,className:"block px-3 py-1",children:a})},t)}))},t)})),n.length?(0,x.jsx)("ul",{className:"flex flex-col gap-2 mb-9",children:n.map((e=>{if("boolean"===typeof e||!e)return null;const{title:t,handler:a}=e;return(0,x.jsx)("li",{onClick:a,className:"text-sm text-white dark:text-gray-200 rounded cursor-pointer py-1.5 px-3 bg-[#ef4444] hover:bg-red-600",children:t},t)}))}):null]}),(0,x.jsxs)("div",{className:"bg-white w-full max-h-full overflow-auto p-8 dark:bg-[#384250]",children:[i&&(0,x.jsx)("h4",{className:"font-bold text-xl text-gray-600 mb-8 dark:text-gray-100",children:i.title}),o]})]})}},17237:(e,t,a)=>{a.d(t,{Z:()=>d});var s=a(70537),l=a(40182),r=a(57889),n=a(80683);const i=r.ZP.div`
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);

  .prefix {
    padding: 8px 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #9ca3af;
    background: #f3f4f6;
    border-right: 1px solid #e5e7eb;
  }

  .view {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`,o=r.ZP.input`
  width: 100%;
  background: #ffffff;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  padding: 8px;
  outline: none;

  &:not(.inner) {
    border-radius: 4px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
  }

  &.large {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 11px 8px;
  }

  &.none {
    outline: none;
    border: none;
    background: none;
    box-shadow: none;
  }

  &:disabled {
    color: #78787c;
    background-color: #f9fafb;
  }

  &::placeholder {
    color: #d1d5db;
  }

  &[type="password"] {
    padding-right: 30px;
  }
`,d=e=>{let{type:t="text",prefix:a="",className:r,...d}=e;const[c,x]=(0,s.useState)(t);return"password"==t?(0,n.jsxs)(i,{className:r,children:[(0,n.jsx)(o,{type:c,autoComplete:"password"==c?"current-password":"on",className:`inner ${r}`,...d}),(0,n.jsx)("div",{className:"view",onClick:()=>{x((e=>"password"==e?"text":"password"))},children:"password"==c?(0,n.jsx)(l.MBb,{color:"#78787c"}):(0,n.jsx)(l.Rbo,{color:"#78787c"})})]}):a?(0,n.jsxs)(i,{className:r,children:[(0,n.jsx)("span",{className:"prefix",children:a}),(0,n.jsx)(o,{className:`inner ${r}`,type:c,...d})]}):(0,n.jsx)(o,{type:c,className:r,...d})}},48540:(e,t,a)=>{a.d(t,{Z:()=>l});var s=a(80683);const l=e=>{let{children:t,className:a="",...l}=e;return(0,s.jsx)("label",{className:`text-gray-500 text-sm ${a}`,...l,children:t})}},40698:(e,t,a)=>{a.d(t,{Z:()=>r});var s=a(57425),l=a(80683);const r=e=>{let{compact:t=!1,title:a="",description:r="",buttons:n,children:i,className:o}=e;return(0,l.jsxs)("div",{className:(0,s.Z)("rounded-lg bg-white dark:bg-gray-900 drop-shadow",t?"p-4 min-w-[406px] text-left":"p-8 min-w-[440px] text-center",o),children:[a&&(0,l.jsx)("h3",{className:"text-xl text-gray-600 dark:text-white mb-4 font-semibold",children:a}),r&&(0,l.jsx)("p",{className:"text-sm text-gray-400 dark:text-gray-100 mb-2",children:r}),i,n&&(0,l.jsx)("div",{className:"pt-4 w-full flex justify-end gap-4 items-center",children:n})]})}},15621:(e,t,a)=>{a.d(t,{Z:()=>d});var s=a(70537),l=a(57889),r=a(80683);const n=l.ZP.form`
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
`,i="",o=[],d=e=>{let{options:t,values:a=o,value:l=i,defaultValue:d="",onChange:c}=e;const x=(0,s.useId)(),[p,m]=(0,s.useState)(d),h=l!==i?l:p;return(0,r.jsx)(n,{children:t.map(((e,t)=>(0,r.jsxs)("div",{className:"option",children:[(0,r.jsx)("input",{type:"radio",checked:(a!==o?a.indexOf(h):h)===t,onChange:()=>{const e=a===o?t:a[t];l===i&&m(e),c&&c(e)},id:`${x}-${t}`}),(0,r.jsx)("div",{className:"box",children:(0,r.jsx)("label",{htmlFor:`${x}-${t}`,children:e})})]},t)))})}},64884:(e,t,a)=>{a.d(t,{Z:()=>l});var s=a(80683);const l=e=>{let{className:t,...a}=e;return(0,s.jsx)("textarea",{className:`rounded text-sm p-2 bg-white text-gray-700 resize-none w-full shadow border border-solid border-gray-200 disabled:bg-[#f9fafb] disabled:text-gray-400 disabled:pointer-events-none placeholder:text-gray-400 ${t}`,...a})}},4884:(e,t,a)=>{a.d(t,{Z:()=>i});var s=a(70537),l=a(26209),r=a(65809),n=a(6144);function i(e){const[t,a]=(0,s.useState)(""),{data:i,isSuccess:o}=(0,r.n8)(),[d,{data:c,isLoading:x}]=(0,n.CU)(),{copied:p,copy:m}=(0,l.Z)({enableToast:!1});(0,s.useEffect)((()=>{d(e)}),[e]),(0,s.useEffect)((()=>{c&&o&&a(c)}),[c,o]);return{enableSMTP:i,generating:x,generateNewLink:e?d.bind(null,e):()=>{d()},link:t,linkCopied:p,copyLink:()=>{m(t)}}}},80169:(e,t,a)=>{e.exports=a.p+"static/media/more.d35b0228affb89f48593.svg"}}]);