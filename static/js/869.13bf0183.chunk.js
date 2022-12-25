"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[869],{18697:(e,i,t)=>{t.d(i,{Z:()=>r});var n,s,l=t(70537);function a(){return a=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},a.apply(this,arguments)}const o=(e,i)=>{let{title:t,titleId:o,...r}=e;return l.createElement("svg",a({width:16,height:12,viewBox:"0 0 16 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":o},r),t?l.createElement("title",{id:o},t):null,n||(n=l.createElement("g",{clipPath:"url(#clip0_9046_23916)"},l.createElement("path",{d:"M4.93942 9.69781L1.62578 6.38648C1.25336 6.01431 0.651746 6.01431 0.27932 6.38648C-0.0931066 6.75865 -0.0931066 7.35984 0.27932 7.73201L4.27096 11.7209C4.64339 12.093 5.245 12.093 5.61743 11.7209L15.7207 1.62465C16.0931 1.25248 16.0931 0.651292 15.7207 0.279125C15.3483 -0.0930417 14.7466 -0.0930417 14.3742 0.279125L4.93942 9.69781Z",fill:"#78787C"}))),s||(s=l.createElement("defs",null,l.createElement("clipPath",{id:"clip0_9046_23916"},l.createElement("rect",{width:16,height:12,fill:"white"})))))},r=(0,l.forwardRef)(o)},95727:(e,i,t)=>{t.d(i,{Z:()=>c});var n=t(70537),s=t(57889),l=t(64631);const a=t.p+"static/media/upload.image.9f8c7fc90042d2ff4eb7.svg";var o=t(14566),r=t(80683);const d=s.ZP.div`
  width: ${e=>{let{size:i}=e;return`${i}px`}};
  height: ${e=>{let{size:i}=e;return`${i}px`}};
  position: relative;
  cursor: pointer;
  .avatar {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    input[type="file"] {
      cursor: pointer;
      display: block;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .tip {
      white-space: nowrap;
      padding: 4px;
      display: none;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-weight: bold;
      font-size: 12px;
      line-height: 18px;
    }
    &:hover .tip {
      display: flex;
    }
  }
  .icon {
    display: none;
    width: 28px;
    height: 28px;
    position: absolute;
    top: 0;
    right: 0;
  }
  &:hover .icon {
    display: block;
  }
`,c=e=>{let{size:i=96,uid:t,className:s="",url:c="",name:p="",type:x="user",uploadImage:h,disabled:f=!1}=e;const{t:m}=(0,o.$G)(),[g,u]=(0,n.useState)(!1);return(0,r.jsxs)(d,{size:i,className:s,children:[(0,r.jsxs)("div",{className:"avatar",children:[(0,r.jsx)(l.Z,{width:i,height:i,type:x,src:c,name:p,className:s}),!f&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"tip",children:m(g?"status.uploading":"action.change_avatar")}),(0,r.jsx)("input",{multiple:!1,onChange:async e=>{if(g)return;if(!e.target.files)return;const[i]=Array.from(e.target.files);u(!0),t?await h({uid:t,file:i}):await h(i),u(!1)},type:"file",accept:"image/*",name:"avatar",id:"avatar"})]})]}),!f&&(0,r.jsx)("img",{src:a,alt:"icon",className:"icon"})]})}},51205:(e,i,t)=>{t.d(i,{Z:()=>z});var n=t(70537),s=t(7829),l=t(69195),a=t(27418),o=t(52334),r=t(18951);const d=t(57889).ZP.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  .intro {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    .title {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #374151;
    }
    .desc {
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
      color: #616161;
    }
  }
  .members {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 512px;
    margin-bottom: 176px;
    .member {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      border-radius: var(--br);
      &:hover {
        background: #f9fafb;
      }
      .left {
        display: flex;
        gap: 8px;
        .info {
          display: flex;
          flex-direction: column;
          .name {
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
            color: #52525b;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .email {
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
            color: #52525b;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        gap: 28px;
        .role {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          text-align: right;
          color: #616161;
          display: flex;
          align-items: center;
          gap: 4px;
          > .icon {
            cursor: pointer;
          }
          /* override */
          .menu {
            min-width: 120px;
            .item .icon {
              width: 16px;
              height: 12px;
            }
          }
        }
        .opts {
          position: relative;
          width: 24px;
          height: 24px;
          .dots {
            cursor: pointer;
          }
          .menu {
            position: absolute;
          }
        }
      }
    }
  }
`;var c=t(63211),p=t(4884),x=t(17237),h=t(69885),f=t(14566),m=t(43764),g=t(80683);const u=()=>{const{t:e}=(0,f.$G)("chat"),{generating:i,link:t,linkCopied:n,copyLink:s,generateNewLink:l}=(0,p.Z)();return(0,g.jsxs)("div",{className:"flex flex-col items-start pb-8",children:[(0,g.jsx)("span",{className:"font-semibold text-sm mb-2 text-gray-500",children:e("share_invite_link")}),(0,g.jsxs)("div",{className:"w-[512px] mb-3 relative",children:[(0,g.jsx)(x.Z,{readOnly:!0,className:"large !pr-16",placeholder:"Generating",value:t}),(0,g.jsx)(h.Z,{onClick:s,className:"ghost small border_less absolute right-1 top-1/2 -translate-y-1/2",children:n?"Copied":e("action.copy",{ns:"common"})})]}),(0,g.jsx)("span",{className:"text-xs text-gray-600",children:e("invite_link_expire")}),(0,g.jsx)("div",{className:"w-44 h-44 my-2",children:(0,g.jsx)(m.Z,{link:t})}),(0,g.jsx)(h.Z,{className:"ghost",disabled:i,onClick:()=>{l()},children:i?"Generating":e("generate_new_link")})]})};var b,v,w=t(80169),j=t(87826);function y(){return y=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},y.apply(this,arguments)}const N=(e,i)=>{let{title:t,titleId:s,...l}=e;return n.createElement("svg",y({width:6,height:6,viewBox:"0 0 6 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":s},l),t?n.createElement("title",{id:s},t):null,b||(b=n.createElement("rect",{opacity:.01,width:6,height:6,fill:"#D8D8D8"})),v||(v=n.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.62506 1.64911C5.41795 1.4503 5.08216 1.45029 4.87506 1.64911L3.00003 3.44911L1.12506 1.64916C0.917951 1.45034 0.582164 1.45034 0.375057 1.64916C0.16795 1.84798 0.16795 2.17033 0.375057 2.36915L2.62506 4.52912C2.83217 4.72794 3.16795 4.72794 3.37506 4.52912C3.37665 4.5276 3.37822 4.52608 3.37977 4.52454L5.62506 2.36911C5.83216 2.17029 5.83216 1.84793 5.62506 1.64911Z",fill:"black",fillOpacity:.5})))},k=(0,n.forwardRef)(N);var Z=t(18697),C=t(50911),_=t(66160);const z=e=>{let{cid:i}=e;const{t:t}=(0,f.$G)("member"),{t:p}=(0,f.$G)(),{users:x,channels:h,loginUser:m}=(0,_.CG)((e=>({users:e.users,channels:e.channels,loginUser:e.authData.user}))),{copyEmail:b,removeFromChannel:v,removeUser:y}=(0,C.Z)({cid:i}),[N,{isSuccess:z}]=(0,o.kD)();(0,n.useEffect)((()=>{z&&a.ZP.success("Update Successfully")}),[z]);const P=e=>{let{ignore:i=!1,uid:t,isAdmin:n=!0}=e;(0,l.Bn)(),i||N({id:t,is_admin:n})},E=i?h.byId[i]:null,$=E?E.is_public?x.ids:E.members:x.ids;return(0,g.jsxs)(d,{children:[(null===m||void 0===m?void 0:m.is_admin)&&(0,g.jsx)(u,{}),(0,g.jsxs)("div",{className:"intro",children:[(0,g.jsx)("h4",{className:"title",children:t("manage_members")}),(0,g.jsx)("p",{className:"desc",children:t("manage_tip")})]}),(0,g.jsx)("ul",{className:"members",children:$.map((e=>{const i=x.byId[e];if(!i)return null;const{name:n,email:l,is_admin:a}=i,o=E&&E.owner==e,d=(null===m||void 0===m?void 0:m.is_admin)&&m.uid!==e&&1!==e,h=l||(null===m||void 0===m?void 0:m.is_admin),f=(null===m||void 0===m?void 0:m.is_admin)&&(null===m||void 0===m?void 0:m.uid)!=e&&1!==e,u=E&&E.owner==(null===m||void 0===m?void 0:m.uid)&&(null===m||void 0===m?void 0:m.uid)!=e;return(0,g.jsxs)("li",{className:"member",children:[(0,g.jsxs)("div",{className:"left",children:[(0,g.jsx)(r.Z,{compact:!0,uid:e,interactive:!1}),(0,g.jsxs)("div",{className:"info",children:[(0,g.jsxs)("span",{className:"name",children:[n," ",o&&(0,g.jsx)(j.Z,{})]}),(0,g.jsx)("span",{className:"email",children:l})]})]}),(0,g.jsxs)("div",{className:"right",children:[(0,g.jsxs)("span",{className:"role",children:[t(a?"admin":"user"),d&&(0,g.jsx)(s.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,g.jsxs)(c.Z,{className:"menu",children:[(0,g.jsxs)("li",{className:"item sb",onClick:P.bind(null,{ignore:a,uid:e,isAdmin:!0}),children:[t("admin"),a&&(0,g.jsx)(Z.Z,{className:"icon"})]}),(0,g.jsxs)("li",{className:"item sb",onClick:P.bind(null,{ignore:!a,uid:e,isAdmin:!1}),children:[t("user"),!a&&(0,g.jsx)(Z.Z,{className:"icon"})]})]}),children:(0,g.jsx)(k,{className:"icon"})})]}),h&&(0,g.jsx)(s.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,g.jsxs)(c.Z,{className:"menu",children:[l&&(0,g.jsx)("li",{className:"item",onClick:b.bind(null,l),children:p("action.copy_email")}),u&&(0,g.jsx)("li",{className:"item danger",onClick:v.bind(null,e),children:t("remove_from_channel")}),f&&(0,g.jsx)("li",{className:"item danger",onClick:y.bind(null,e),children:p("action.remove")})]}),children:(0,g.jsx)("div",{className:"opts",children:(0,g.jsx)("img",{className:"dots",src:w,alt:"dots icon"})})})]})]},e)}))})]})}},80874:(e,i,t)=>{t.d(i,{Z:()=>l});var n=t(70537),s=t(10336);const l=e=>{let{id:i="root-modal",mask:t=!0,children:l}=e;const[a,o]=(0,n.useState)(null);return(0,n.useEffect)((()=>{const e=document.getElementById(i);if(!e)return;t&&e.classList.add("mask");const n=document.createElement("div");return n.classList.add("wrapper"),e.appendChild(n),o(n),()=>{e.removeChild(n)}}),[i,t]),a?(0,s.createPortal)(l,a):null}},43764:(e,i,t)=>{t.d(i,{Z:()=>a});var n=t(36185),s=t(66160),l=t(80683);const a=e=>{let{link:i}=e;const t=(0,s.CG)((e=>e.server.logo));return(0,l.jsx)(n.Qd,{value:i,className:"rounded border border-solid border-gray-200 p-1 !w-full !h-full",size:512,bgColor:"#fff",fgColor:"#22ccee",level:"L",includeMargin:!1,imageSettings:{src:t,x:void 0,y:void 0,height:28,width:28,excavate:!0}})}},24563:(e,i,t)=>{t.d(i,{Z:()=>o});var n=t(14566),s=t(57889),l=t(80683);const a=s.ZP.div`
  width: 100%;
  position: absolute;
  bottom: 64px;
  left: 0;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 25px;
  .txt {
    padding: 8px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  .btns {
    display: flex;
    align-items: center;
    gap: 14px;
    .btn {
      color: #fff;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      padding: 8px 14px;
      background: #1fe1f9;
      border: 1px solid #1fe1f9;
      box-sizing: border-box;
      box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 25px;
      &.reset {
        background: none;
        color: #667085;
        border: none;
        box-shadow: none;
      }
    }
  }
`,o=e=>{let{saveHandler:i,resetHandler:t}=e;const{t:s}=(0,n.$G)("setting");return(0,l.jsxs)(a,{className:"animate__animated animate__flipInX animate__faster",children:[(0,l.jsx)("span",{className:"txt",children:s("save_tip")}),(0,l.jsxs)("div",{className:"btns",children:[(0,l.jsx)("button",{className:"btn reset",onClick:t,children:s("reset")}),(0,l.jsx)("button",{className:"btn",onClick:i,children:s("save_change")})]})]})}},7477:(e,i,t)=>{t.d(i,{Z:()=>d});var n=t(57889),s=t(15924),l=t(64084);const a=t.p+"static/media/arrow.left.92fbb139607631555459.svg";var o=t(80683);const r=n.ZP.div`
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
      background: url(${a}) no-repeat left;
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
`,d=e=>{let{closeModal:i,title:t="Settings",navs:n=[],dangers:a=[],nav:d,children:c}=e;const{pathname:p}=(0,s.TH)();return(0,o.jsxs)(r,{children:[(0,o.jsxs)("div",{className:"left",children:[(0,o.jsx)("h2",{onClick:i,className:"title",children:t}),n.map((e=>{let{title:i,items:t}=e;return(0,o.jsx)("ul",{"data-title":i,className:"items",children:t.map((e=>{let{name:i,title:t}=e;return(0,o.jsx)("li",{className:"item "+(i==(null===d||void 0===d?void 0:d.name)?"curr":""),children:(0,o.jsx)(l.OL,{to:`${p}?nav=${i}`,children:t})},i)}))},i)})),a.length?(0,o.jsx)("ul",{className:"items danger",children:a.map((e=>{if("boolean"===typeof e||!e)return null;const{title:i,handler:t}=e;return(0,o.jsx)("li",{onClick:t,className:"item",children:i},i)}))}):null]}),(0,o.jsxs)("div",{className:"right",children:[d&&(0,o.jsx)("h4",{className:"title",children:d.title}),c]})]})}},17237:(e,i,t)=>{t.d(i,{Z:()=>d});var n=t(70537),s=t(40182),l=t(57889),a=t(80683);const o=l.ZP.div`
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
`,r=l.ZP.input`
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
`,d=e=>{let{type:i="text",prefix:t="",className:l,...d}=e;const[c,p]=(0,n.useState)(i);return"password"==i?(0,a.jsxs)(o,{className:l,children:[(0,a.jsx)(r,{type:c,autoComplete:"password"==c?"current-password":"on",className:`inner ${l}`,...d}),(0,a.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==c?(0,a.jsx)(s.MBb,{color:"#78787c"}):(0,a.jsx)(s.Rbo,{color:"#78787c"})})]}):t?(0,a.jsxs)(o,{className:l,children:[(0,a.jsx)("span",{className:"prefix",children:t}),(0,a.jsx)(r,{className:`inner ${l}`,type:c,...d})]}):(0,a.jsx)(r,{type:c,className:l,...d})}},48540:(e,i,t)=>{t.d(i,{Z:()=>n});const n=t(57889).ZP.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
`},40698:(e,i,t)=>{t.d(i,{Z:()=>a});var n=t(57889),s=t(80683);const l=n.ZP.div`
  padding: 32px;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 8px;
  background-color: #fff;
  min-width: 440px;
  &.compact {
    padding: 16px;
    min-width: 406px;
    .title,
    .desc {
      text-align: left;
    }
  }
  .title {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color: #374151;
    margin-bottom: 16px;
  }
  .desc {
    text-align: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #6b7280;
    margin-bottom: 8px;
  }
  .btns {
    padding-top: 16px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    align-items: center;
  }
`,a=e=>{let{title:i="",description:t="",buttons:n,children:a,...o}=e;return(0,s.jsxs)(l,{...o,children:[i&&(0,s.jsx)("h3",{className:"title",children:i}),t&&(0,s.jsx)("p",{className:"desc",children:t}),a,n&&(0,s.jsx)("div",{className:"btns",children:n})]})}},15621:(e,i,t)=>{t.d(i,{Z:()=>d});var n=t(70537),s=t(57889),l=t(80683);const a=s.ZP.form`
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
`,o="",r=[],d=e=>{let{options:i,values:t=r,value:s=o,defaultValue:d="",onChange:c}=e;const p=(0,n.useId)(),[x,h]=(0,n.useState)(d),f=s!==o?s:x;return(0,l.jsx)(a,{children:i.map(((e,i)=>(0,l.jsxs)("div",{className:"option",children:[(0,l.jsx)("input",{type:"radio",checked:(t!==r?t.indexOf(f):f)===i,onChange:()=>{const e=t===r?i:t[i];s===o&&h(e),c&&c(e)},id:`${p}-${i}`}),(0,l.jsx)("div",{className:"box",children:(0,l.jsx)("label",{htmlFor:`${p}-${i}`,children:e})})]},i)))})}},64884:(e,i,t)=>{t.d(i,{Z:()=>n});const n=t(57889).ZP.textarea`
  font-family: inherit;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(31, 41, 55, 0.08);
  border-radius: 4px;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  padding: 8px;
  color: #333;
  resize: unset;
  &:disabled {
    color: #78787c;
    background-color: #f9fafb;
  }
  &::placeholder {
    color: #d1d5db;
  }
`},4884:(e,i,t)=>{t.d(i,{Z:()=>o});var n=t(70537),s=t(26209),l=t(65809),a=t(6144);function o(e){const[i,t]=(0,n.useState)(""),{data:o,isSuccess:r}=(0,l.n8)(),[d,{data:c,isLoading:p}]=(0,a.CU)(),{copied:x,copy:h}=(0,s.Z)({enableToast:!1});(0,n.useEffect)((()=>{d(e)}),[e]),(0,n.useEffect)((()=>{c&&r&&t(c)}),[c,r]);return{enableSMTP:o,generating:p,generateNewLink:e?d.bind(null,e):()=>{d()},link:i,linkCopied:x,copyLink:()=>{h(i)}}}},80169:(e,i,t)=>{e.exports=t.p+"static/media/more.54cac536d52aae6f342e.svg"}}]);