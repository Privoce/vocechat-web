"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[869],{18697:(e,i,t)=>{t.d(i,{Z:()=>r});var n,l,o=t(70537);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},s.apply(this,arguments)}const a=(e,i)=>{let{title:t,titleId:a,...r}=e;return o.createElement("svg",s({width:16,height:12,viewBox:"0 0 16 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":a},r),t?o.createElement("title",{id:a},t):null,n||(n=o.createElement("g",{clipPath:"url(#clip0_9046_23916)"},o.createElement("path",{d:"M4.93942 9.69781L1.62578 6.38648C1.25336 6.01431 0.651746 6.01431 0.27932 6.38648C-0.0931066 6.75865 -0.0931066 7.35984 0.27932 7.73201L4.27096 11.7209C4.64339 12.093 5.245 12.093 5.61743 11.7209L15.7207 1.62465C16.0931 1.25248 16.0931 0.651292 15.7207 0.279125C15.3483 -0.0930417 14.7466 -0.0930417 14.3742 0.279125L4.93942 9.69781Z",fill:"#78787C"}))),l||(l=o.createElement("defs",null,o.createElement("clipPath",{id:"clip0_9046_23916"},o.createElement("rect",{width:16,height:12,fill:"white"})))))},r=(0,o.forwardRef)(a)},95727:(e,i,t)=>{t.d(i,{Z:()=>c});var n=t(70537),l=t(57889),o=t(64631);const s=t.p+"static/media/upload.image.9f8c7fc90042d2ff4eb7.svg";var a=t(71893),r=t(80683);const d=l.ZP.div`
  width: 96px;
  height: 96px;
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
    width: 28px;
    height: 28px;
    position: absolute;
    top: 0;
    right: 0;
  }
`,c=e=>{let{url:i="",name:t="",type:l="user",uploadImage:c,disabled:p=!1}=e;const{t:x}=(0,a.$)(),[h,f]=(0,n.useState)(!1);return(0,r.jsxs)(d,{children:[(0,r.jsxs)("div",{className:"avatar",children:[(0,r.jsx)(o.Z,{type:l,url:i,name:t}),!p&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"tip",children:x(h?"status.uploading":"action.change_avatar")}),(0,r.jsx)("input",{multiple:!1,onChange:async e=>{if(h)return;if(!e.target.files)return;const[i]=Array.from(e.target.files);f(!0),await c(i),f(!1)},type:"file",accept:"image/*",name:"avatar",id:"avatar"})]})]}),!p&&(0,r.jsx)("img",{src:s,alt:"icon",className:"icon"})]})}},51205:(e,i,t)=>{t.d(i,{Z:()=>P});var n=t(70537),l=t(7829),o=t(69195),s=t(27418),a=t(52334),r=t(6458),d=t(57889);const c=d.ZP.section`
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
`;var p=t(63211),x=t(4884),h=t(17237),f=t(69885),m=t(71893),g=t(80683);const u=d.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 32px;
  .tip {
    font-weight: 500;
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 8px;
  }
  .link {
    width: 512px;
    margin-bottom: 12px;
    position: relative;
    button {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
    }
    input {
      padding-right: 75px;
    }
  }
  .sub_tip {
    margin-left: 4px;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #616161;
    margin-bottom: 20px;
  }
`,b=()=>{const{t:e}=(0,m.$)("chat"),{generating:i,link:t,linkCopied:n,copyLink:l,generateNewLink:o}=(0,x.Z)();return(0,g.jsxs)(u,{children:[(0,g.jsx)("span",{className:"tip",children:e("share_invite_link")}),(0,g.jsxs)("div",{className:"link",children:[(0,g.jsx)(h.Z,{readOnly:!0,className:"large",placeholder:"Generating",value:t}),(0,g.jsx)(f.Z,{onClick:l,className:"ghost small border_less",children:n?"Copied":e("action.copy",{ns:"common"})})]}),(0,g.jsx)("span",{className:"sub_tip",children:e("invite_link_expire")}),(0,g.jsx)(f.Z,{className:"ghost",disabled:i,onClick:()=>{o()},children:i?"Generating":e("generate_new_link")})]})};var v,w,j=t(80169),y=t(87826);function k(){return k=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},k.apply(this,arguments)}const N=(e,i)=>{let{title:t,titleId:l,...o}=e;return n.createElement("svg",k({width:6,height:6,viewBox:"0 0 6 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":l},o),t?n.createElement("title",{id:l},t):null,v||(v=n.createElement("rect",{opacity:.01,width:6,height:6,fill:"#D8D8D8"})),w||(w=n.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.62506 1.64911C5.41795 1.4503 5.08216 1.45029 4.87506 1.64911L3.00003 3.44911L1.12506 1.64916C0.917951 1.45034 0.582164 1.45034 0.375057 1.64916C0.16795 1.84798 0.16795 2.17033 0.375057 2.36915L2.62506 4.52912C2.83217 4.72794 3.16795 4.72794 3.37506 4.52912C3.37665 4.5276 3.37822 4.52608 3.37977 4.52454L5.62506 2.36911C5.83216 2.17029 5.83216 1.84793 5.62506 1.64911Z",fill:"black",fillOpacity:.5})))},Z=(0,n.forwardRef)(N);var C=t(18697),_=t(50911),z=t(66160);const P=e=>{let{cid:i}=e;const{t:t}=(0,m.$)("member"),{t:d}=(0,m.$)(),{users:x,channels:h,loginUser:f}=(0,z.CG)((e=>({users:e.users,channels:e.channels,loginUser:e.authData.user}))),{copyEmail:u,removeFromChannel:v,removeUser:w}=(0,_.Z)({cid:i}),[k,{isSuccess:N}]=(0,a.kD)();(0,n.useEffect)((()=>{N&&s.ZP.success("Update Successfully")}),[N]);const P=e=>{let{ignore:i=!1,uid:t,isAdmin:n=!0}=e;(0,o.Bn)(),i||k({id:t,is_admin:n})},E=i?h.byId[i]:null,L=E?E.is_public?x.ids:E.members:x.ids;return(0,g.jsxs)(c,{children:[(null===f||void 0===f?void 0:f.is_admin)&&(0,g.jsx)(b,{}),(0,g.jsxs)("div",{className:"intro",children:[(0,g.jsx)("h4",{className:"title",children:t("manage_members")}),(0,g.jsx)("p",{className:"desc",children:t("manage_tip")})]}),(0,g.jsx)("ul",{className:"members",children:L.map((e=>{const i=x.byId[e];if(!i)return null;const{name:n,email:o,is_admin:s}=i,a=E&&E.owner==e,c=(null===f||void 0===f?void 0:f.is_admin)&&f.uid!==e&&1!==e,h=o||(null===f||void 0===f?void 0:f.is_admin),m=(null===f||void 0===f?void 0:f.is_admin)&&(null===f||void 0===f?void 0:f.uid)!=e&&1!==e,b=E&&E.owner==(null===f||void 0===f?void 0:f.uid)&&(null===f||void 0===f?void 0:f.uid)!=e;return(0,g.jsxs)("li",{className:"member",children:[(0,g.jsxs)("div",{className:"left",children:[(0,g.jsx)(r.Z,{compact:!0,uid:e,interactive:!1}),(0,g.jsxs)("div",{className:"info",children:[(0,g.jsxs)("span",{className:"name",children:[n," ",a&&(0,g.jsx)(y.Z,{})]}),(0,g.jsx)("span",{className:"email",children:o})]})]}),(0,g.jsxs)("div",{className:"right",children:[(0,g.jsxs)("span",{className:"role",children:[t(s?"admin":"user"),c&&(0,g.jsx)(l.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,g.jsxs)(p.Z,{className:"menu",children:[(0,g.jsxs)("li",{className:"item sb",onClick:P.bind(null,{ignore:s,uid:e,isAdmin:!0}),children:[t("admin"),s&&(0,g.jsx)(C.Z,{className:"icon"})]}),(0,g.jsxs)("li",{className:"item sb",onClick:P.bind(null,{ignore:!s,uid:e,isAdmin:!1}),children:[t("user"),!s&&(0,g.jsx)(C.Z,{className:"icon"})]})]}),children:(0,g.jsx)(Z,{className:"icon"})})]}),h&&(0,g.jsx)(l.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,g.jsxs)(p.Z,{className:"menu",children:[o&&(0,g.jsx)("li",{className:"item",onClick:u.bind(null,o),children:d("action.copy_email")}),b&&(0,g.jsx)("li",{className:"item danger",onClick:v.bind(null,e),children:t("remove_from_channel")}),m&&(0,g.jsx)("li",{className:"item danger",onClick:w.bind(null,e),children:d("action.remove")})]}),children:(0,g.jsx)("div",{className:"opts",children:(0,g.jsx)("img",{className:"dots",src:j,alt:"dots icon"})})})]})]},e)}))})]})}},80874:(e,i,t)=>{t.d(i,{Z:()=>o});var n=t(70537),l=t(10336);const o=e=>{let{id:i="root-modal",mask:t=!0,children:o}=e;const[s,a]=(0,n.useState)(null);return(0,n.useEffect)((()=>{const e=document.getElementById(i);if(!e)return;t&&e.classList.add("mask");const n=document.createElement("div");return n.classList.add("wrapper"),e.appendChild(n),a(n),()=>{e.removeChild(n)}}),[i,t]),s?(0,l.createPortal)(o,s):null}},24563:(e,i,t)=>{t.d(i,{Z:()=>a});var n=t(71893),l=t(57889),o=t(80683);const s=l.ZP.div`
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
`,a=e=>{let{saveHandler:i,resetHandler:t}=e;const{t:l}=(0,n.$)("setting");return(0,o.jsxs)(s,{className:"animate__animated animate__flipInX animate__faster",children:[(0,o.jsx)("span",{className:"txt",children:l("save_tip")}),(0,o.jsxs)("div",{className:"btns",children:[(0,o.jsx)("button",{className:"btn reset",onClick:t,children:l("reset")}),(0,o.jsx)("button",{className:"btn",onClick:i,children:l("save_change")})]})]})}},7477:(e,i,t)=>{t.d(i,{Z:()=>d});var n=t(57889),l=t(15924),o=t(64084);const s=t.p+"static/media/arrow.left.92fbb139607631555459.svg";var a=t(80683);const r=n.ZP.div`
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
      background: url(${s}) no-repeat left;
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
`,d=e=>{let{closeModal:i,title:t="Settings",navs:n=[],dangers:s=[],nav:d,children:c}=e;const{pathname:p}=(0,l.TH)();return(0,a.jsxs)(r,{children:[(0,a.jsxs)("div",{className:"left",children:[(0,a.jsx)("h2",{onClick:i,className:"title",children:t}),n.map((e=>{let{title:i,items:t}=e;return(0,a.jsx)("ul",{"data-title":i,className:"items",children:t.map((e=>{let{name:i,title:t}=e;return(0,a.jsx)("li",{className:"item "+(i==(null===d||void 0===d?void 0:d.name)?"curr":""),children:(0,a.jsx)(o.OL,{to:`${p}?nav=${i}`,children:t})},i)}))},i)})),s.length?(0,a.jsx)("ul",{className:"items danger",children:s.map((e=>{if("boolean"===typeof e||!e)return null;const{title:i,handler:t}=e;return(0,a.jsx)("li",{onClick:t,className:"item",children:i},i)}))}):null]}),(0,a.jsxs)("div",{className:"right",children:[d&&(0,a.jsx)("h4",{className:"title",children:d.title}),c]})]})}},17237:(e,i,t)=>{t.d(i,{Z:()=>d});var n=t(70537),l=t(40182),o=t(57889),s=t(80683);const a=o.ZP.div`
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
`,r=o.ZP.input`
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
`,d=e=>{let{type:i="text",prefix:t="",className:o,...d}=e;const[c,p]=(0,n.useState)(i);return"password"==i?(0,s.jsxs)(a,{className:o,children:[(0,s.jsx)(r,{type:c,className:`inner ${o}`,...d}),(0,s.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==c?(0,s.jsx)(l.MBb,{color:"#78787c"}):(0,s.jsx)(l.Rbo,{color:"#78787c"})})]}):t?(0,s.jsxs)(a,{className:o,children:[(0,s.jsx)("span",{className:"prefix",children:t}),(0,s.jsx)(r,{className:`inner ${o}`,type:c,...d})]}):(0,s.jsx)(r,{type:c,className:o,...d})}},48540:(e,i,t)=>{t.d(i,{Z:()=>n});const n=t(57889).ZP.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
`},40698:(e,i,t)=>{t.d(i,{Z:()=>s});var n=t(57889),l=t(80683);const o=n.ZP.div`
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
`,s=e=>{let{title:i="",description:t="",buttons:n,children:s,...a}=e;return(0,l.jsxs)(o,{...a,children:[i&&(0,l.jsx)("h3",{className:"title",children:i}),t&&(0,l.jsx)("p",{className:"desc",children:t}),s,n&&(0,l.jsx)("div",{className:"btns",children:n})]})}},15621:(e,i,t)=>{t.d(i,{Z:()=>d});var n=t(70537),l=t(57889),o=t(80683);const s=l.ZP.form`
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
`,a="",r=[],d=e=>{let{options:i,values:t=r,value:l=a,defaultValue:d="",onChange:c}=e;const p=(0,n.useId)(),[x,h]=(0,n.useState)(d),f=l!==a?l:x;return(0,o.jsx)(s,{children:i.map(((e,i)=>(0,o.jsxs)("div",{className:"option",children:[(0,o.jsx)("input",{type:"radio",checked:(t!==r?t.indexOf(f):f)===i,onChange:()=>{const e=t===r?i:t[i];l===a&&h(e),c&&c(e)},id:`${p}-${i}`}),(0,o.jsx)("div",{className:"box",children:(0,o.jsx)("label",{htmlFor:`${p}-${i}`,children:e})})]},i)))})}},64884:(e,i,t)=>{t.d(i,{Z:()=>n});const n=t(57889).ZP.textarea`
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
`},4884:(e,i,t)=>{t.d(i,{Z:()=>a});var n=t(70537),l=t(26209),o=t(65809),s=t(6144);function a(e){const[i,t]=(0,n.useState)(""),{data:a,isSuccess:r}=(0,o.n8)(),[d,{data:c,isLoading:p}]=(0,s.CU)(),{copied:x,copy:h}=(0,l.Z)({enableToast:!1});(0,n.useEffect)((()=>{d(e)}),[e]),(0,n.useEffect)((()=>{c&&r&&t(c)}),[c,r]);return{enableSMTP:a,generating:p,generateNewLink:e?d.bind(null,e):()=>{d()},link:i,linkCopied:x,copyLink:()=>{h(i)}}}},80169:(e,i,t)=>{e.exports=t.p+"static/media/more.54cac536d52aae6f342e.svg"}}]);