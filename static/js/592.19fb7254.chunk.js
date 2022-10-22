"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[592],{8055:(e,i,s)=>{s.d(i,{Z:()=>c});var t,a=s(537);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var s=arguments[i];for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t])}return e},l.apply(this,arguments)}const n=(e,i)=>{let{title:s,titleId:n,...c}=e;return a.createElement("svg",l({width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":n},c),s?a.createElement("title",{id:n},s):null,t||(t=a.createElement("path",{d:"M5 7.5L10 12.5L15 7.5",stroke:"#344054",strokeWidth:1.67,strokeLinecap:"round",strokeLinejoin:"round"})))},c=(0,a.forwardRef)(n)},8697:(e,i,s)=>{s.d(i,{Z:()=>r});var t,a,l=s(537);function n(){return n=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var s=arguments[i];for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t])}return e},n.apply(this,arguments)}const c=(e,i)=>{let{title:s,titleId:c,...r}=e;return l.createElement("svg",n({width:16,height:12,viewBox:"0 0 16 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":c},r),s?l.createElement("title",{id:c},s):null,t||(t=l.createElement("g",{clipPath:"url(#clip0_9046_23916)"},l.createElement("path",{d:"M4.93942 9.69781L1.62578 6.38648C1.25336 6.01431 0.651746 6.01431 0.27932 6.38648C-0.0931066 6.75865 -0.0931066 7.35984 0.27932 7.73201L4.27096 11.7209C4.64339 12.093 5.245 12.093 5.61743 11.7209L15.7207 1.62465C16.0931 1.25248 16.0931 0.651292 15.7207 0.279125C15.3483 -0.0930417 14.7466 -0.0930417 14.3742 0.279125L4.93942 9.69781Z",fill:"#78787C"}))),a||(a=l.createElement("defs",null,l.createElement("clipPath",{id:"clip0_9046_23916"},l.createElement("rect",{width:16,height:12,fill:"white"})))))},r=(0,l.forwardRef)(c)},5727:(e,i,s)=>{s.d(i,{Z:()=>o});var t=s(537),a=s(7889),l=s(4631);const n=s.p+"static/media/upload.image.9f8c7fc90042d2ff4eb7.svg";var c=s(683);const r=a.ZP.div`
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
`,o=e=>{let{url:i="",name:s="",type:a="user",uploadImage:o,disabled:d=!1}=e;const[M,x]=(0,t.useState)(!1);return(0,c.jsxs)(r,{children:[(0,c.jsxs)("div",{className:"avatar",children:[(0,c.jsx)(l.Z,{type:a,url:i,name:s}),!d&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{className:"tip",children:M?"Uploading":"Change Avatar"}),(0,c.jsx)("input",{multiple:!1,onChange:async e=>{if(M)return;if(!e.target.files)return;const[i]=Array.from(e.target.files);x(!0),await o(i),x(!1)},type:"file",accept:"image/*",name:"avatar",id:"avatar"})]})]}),!d&&(0,c.jsx)("img",{src:n,alt:"icon",className:"icon"})]})}},1205:(e,i,s)=>{s.d(i,{Z:()=>E});var t=s(537),a=s(7829),l=s(9195),n=s(8555),c=s(2334),r=s(6458),o=s(7889);const d=o.ZP.section`
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
`;var M=s(3211),x=s(4884),u=s(3022),j=s(9885),N=s(683);const g=o.ZP.div`
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
`,p=()=>{const{generating:e,link:i,linkCopied:s,copyLink:t,generateNewLink:a}=(0,x.Z)();return(0,N.jsxs)(g,{children:[(0,N.jsx)("span",{className:"tip",children:"Share this link to invite people to this server."}),(0,N.jsxs)("div",{className:"link",children:[(0,N.jsx)(u.Z,{readOnly:!0,className:"large",placeholder:"Generating",value:i}),(0,N.jsx)(j.Z,{onClick:t,className:"ghost small border_less",children:s?"Copied":"Copy"})]}),(0,N.jsx)("span",{className:"sub_tip",children:"Invite link expires in 7 days."}),(0,N.jsx)(j.Z,{className:"ghost",disabled:e,onClick:()=>{a()},children:e?"Generating":"Generate New Link"})]})};var m,h,D=s(169),w=s(7826);function _(){return _=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var s=arguments[i];for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t])}return e},_.apply(this,arguments)}const I=(e,i)=>{let{title:s,titleId:a,...l}=e;return t.createElement("svg",_({width:6,height:6,viewBox:"0 0 6 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":a},l),s?t.createElement("title",{id:a},s):null,m||(m=t.createElement("rect",{opacity:.01,width:6,height:6,fill:"#D8D8D8"})),h||(h=t.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.62506 1.64911C5.41795 1.4503 5.08216 1.45029 4.87506 1.64911L3.00003 3.44911L1.12506 1.64916C0.917951 1.45034 0.582164 1.45034 0.375057 1.64916C0.16795 1.84798 0.16795 2.17033 0.375057 2.36915L2.62506 4.52912C2.83217 4.72794 3.16795 4.72794 3.37506 4.52912C3.37665 4.5276 3.37822 4.52608 3.37977 4.52454L5.62506 2.36911C5.83216 2.17029 5.83216 1.84793 5.62506 1.64911Z",fill:"black",fillOpacity:.5})))},y=(0,t.forwardRef)(I);var T=s(8697),f=s(911),L=s(3986);const E=e=>{let{cid:i}=e;const{users:s,channels:o,loginUser:x}=(0,L.CG)((e=>({users:e.users,channels:e.channels,loginUser:e.authData.user}))),{copyEmail:u,removeFromChannel:j,removeUser:g}=(0,f.Z)({cid:i}),[m,{isSuccess:h}]=(0,c.kD)();(0,t.useEffect)((()=>{h&&n.ZP.success("Update Successfully")}),[h]);const _=e=>{let{ignore:i=!1,uid:s,isAdmin:t=!0}=e;(0,l.Bn)(),i||m({id:s,is_admin:t})},I=i?o.byId[i]:null,E=I?I.is_public?s.ids:I.members:s.ids;return(0,N.jsxs)(d,{children:[(null===x||void 0===x?void 0:x.is_admin)&&(0,N.jsx)(p,{}),(0,N.jsxs)("div",{className:"intro",children:[(0,N.jsx)("h4",{className:"title",children:"Manage Members"}),(0,N.jsx)("p",{className:"desc",children:"Disabling your account means you can recover it at any time after taking this action."})]}),(0,N.jsx)("ul",{className:"members",children:E.map((e=>{const i=s.byId[e];if(!i)return null;const{name:t,email:l,is_admin:n}=i,c=I&&I.owner==e,o=(null===x||void 0===x?void 0:x.is_admin)&&x.uid!==e,d=l||(null===x||void 0===x?void 0:x.is_admin),p=(null===x||void 0===x?void 0:x.is_admin)&&(null===x||void 0===x?void 0:x.uid)!=e,m=I&&I.owner==(null===x||void 0===x?void 0:x.uid)&&(null===x||void 0===x?void 0:x.uid)!=e;return(0,N.jsxs)("li",{className:"member",children:[(0,N.jsxs)("div",{className:"left",children:[(0,N.jsx)(r.Z,{compact:!0,uid:e,interactive:!1}),(0,N.jsxs)("div",{className:"info",children:[(0,N.jsxs)("span",{className:"name",children:[t," ",c&&(0,N.jsx)(w.Z,{})]}),(0,N.jsx)("span",{className:"email",children:l})]})]}),(0,N.jsxs)("div",{className:"right",children:[(0,N.jsxs)("span",{className:"role",children:[n?"Admin":"User",o&&(0,N.jsx)(a.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,N.jsxs)(M.Z,{className:"menu",children:[(0,N.jsxs)("li",{className:"item sb",onClick:_.bind(null,{ignore:n,uid:e,isAdmin:!0}),children:["Admin",n&&(0,N.jsx)(T.Z,{className:"icon"})]}),(0,N.jsxs)("li",{className:"item sb",onClick:_.bind(null,{ignore:!n,uid:e,isAdmin:!1}),children:["User",!n&&(0,N.jsx)(T.Z,{className:"icon"})]})]}),children:(0,N.jsx)(y,{className:"icon"})})]}),d&&(0,N.jsx)(a.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,N.jsxs)(M.Z,{className:"menu",children:[l&&(0,N.jsx)("li",{className:"item",onClick:u.bind(null,l),children:"Copy Email"}),m&&(0,N.jsx)("li",{className:"item danger",onClick:j.bind(null,e),children:"Remove From Channel"}),p&&(0,N.jsx)("li",{className:"item danger",onClick:g.bind(null,e),children:"Remove"})]}),children:(0,N.jsx)("div",{className:"opts",children:(0,N.jsx)("img",{className:"dots",src:D,alt:"dots icon"})})})]})]},e)}))})]})}},4563:(e,i,s)=>{s.d(i,{Z:()=>n});var t=s(7889),a=s(683);const l=t.ZP.div`
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
`,n=e=>{let{saveHandler:i,resetHandler:s}=e;return(0,a.jsxs)(l,{className:"animate__animated animate__flipInX animate__faster",children:[(0,a.jsx)("span",{className:"txt",children:"You have unsaved changes!"}),(0,a.jsxs)("div",{className:"btns",children:[(0,a.jsx)("button",{className:"btn reset",onClick:s,children:"Reset"}),(0,a.jsx)("button",{className:"btn",onClick:i,children:"Save Changes"})]})]})}},7477:(e,i,s)=>{s.d(i,{Z:()=>o});var t=s(7889),a=s(5924),l=s(4084);const n=s.p+"static/media/arrow.left.92fbb139607631555459.svg";var c=s(683);const r=t.ZP.div`
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
      background: url(${n}) no-repeat left;
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
`,o=e=>{let{closeModal:i,title:s="Settings",navs:t=[],dangers:n=[],nav:o,children:d}=e;const{pathname:M}=(0,a.TH)();return(0,c.jsxs)(r,{children:[(0,c.jsxs)("div",{className:"left",children:[(0,c.jsx)("h2",{onClick:i,className:"title",children:s}),t.map((e=>{let{title:i,items:s}=e;return(0,c.jsx)("ul",{"data-title":i,className:"items",children:s.map((e=>{let{name:i,title:s}=e;return(0,c.jsx)("li",{className:"item "+(i==(null===o||void 0===o?void 0:o.name)?"curr":""),children:(0,c.jsx)(l.OL,{to:`${M}?nav=${i}`,children:s})},i)}))},i)})),n.length?(0,c.jsx)("ul",{className:"items danger",children:n.map((e=>{if("boolean"===typeof e||!e)return null;const{title:i,handler:s}=e;return(0,c.jsx)("li",{onClick:s,className:"item",children:i},i)}))}):null]}),(0,c.jsxs)("div",{className:"right",children:[o&&(0,c.jsx)("h4",{className:"title",children:o.title}),d]})]})}},8540:(e,i,s)=>{s.d(i,{Z:()=>t});const t=s(7889).ZP.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
`},5621:(e,i,s)=>{s.d(i,{Z:()=>o});var t=s(537),a=s(7889),l=s(683);const n=a.ZP.form`
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
`,c="",r=[],o=e=>{let{options:i,values:s=r,value:a=c,defaultValue:o="",onChange:d}=e;const M=(0,t.useId)(),[x,u]=(0,t.useState)(o),j=a!==c?a:x;return(0,l.jsx)(n,{children:i.map(((e,i)=>(0,l.jsxs)("div",{className:"option",children:[(0,l.jsx)("input",{type:"radio",checked:(s!==r?s.indexOf(j):j)===i,onChange:()=>{const e=s===r?i:s[i];a===c&&u(e),d&&d(e)},id:`${M}-${i}`}),(0,l.jsx)("div",{className:"box",children:(0,l.jsx)("label",{htmlFor:`${M}-${i}`,children:e})})]},i)))})}},558:(e,i,s)=>{s.d(i,{Z:()=>t});const t=s(7889).ZP.textarea`
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
`},2712:(e,i,s)=>{s.d(i,{Z:()=>l});var t=s(537),a=s(5809);function l(){const[e,i]=(0,t.useState)(!1),[s,l]=(0,t.useState)(void 0),{data:n}=(0,a.R)(void 0,{refetchOnMountOrArgChange:!0}),[c,{isSuccess:r}]=(0,a.Ku)();(0,t.useEffect)((()=>{n&&l(n)}),[n]),(0,t.useEffect)((()=>{i(!r&&JSON.stringify(n)!==JSON.stringify(s))}),[n,s,r]);return{config:s,changed:e,updateGithubAuthConfig:e=>{l((i=>i?{...i,...e}:e))},updateGithubAuthConfigToServer:async()=>{s&&await c(s)},isSuccess:r}}},5089:(e,i,s)=>{s.d(i,{Z:()=>l});var t=s(537),a=s(5809);function l(){const[e,i]=(0,t.useState)(!1),[s,l]=(0,t.useState)(""),{data:n}=(0,a.eM)(void 0,{refetchOnMountOrArgChange:!0}),[c,{isSuccess:r}]=(0,a.Qg)();(0,t.useEffect)((()=>{n&&l(n.client_id)}),[n]),(0,t.useEffect)((()=>{i(!r&&(null===n||void 0===n?void 0:n.client_id)!==s)}),[n,s,r]);return{config:n,changed:e,clientId:s,updateClientId:l,updateClientIdToServer:async()=>{s&&await c({client_id:s})},updateGoogleAuthConfig:c,isSuccess:r}}},3997:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>MyAccount});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(537),styled_components__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(7889),react_hot_toast__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(8555),_app_services_user__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2334),_common_component_AvatarUploader__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(5727),_ProfileBasicEditModal__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(8593),_RemoveAccountConfirmModal__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(4213),_UpdatePasswordModal__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(3401),_app_store__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(3986),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(683);const StyledWrapper=styled_components__WEBPACK_IMPORTED_MODULE_9__.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  .card {
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 512px;
    background: #f3f4f6;
    border-radius: 20px;
    .name {
      margin-top: 8px;
      margin-bottom: 64px;
      font-weight: bold;
      font-size: 18px;
      line-height: 28px;
      color: #27272a;
      .uid {
        font-weight: normal;
        color: #52525b;
      }
    }
    .row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      .info {
        display: flex;
        flex-direction: column;
        .label {
          font-weight: 600;
          font-size: 12px;
          line-height: 20px;
          text-transform: uppercase;
          color: #52525b;
        }
        .txt {
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #52525b;
          .gray {
            color: #78787c;
          }
        }
      }
      .btn {
        background: #1fe1f9;
        border: 1px solid #1fe1f9;
      }
    }
  }
  .danger {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .head {
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
      margin-bottom: 16px;
    }
    .btn {
      background: #ef4444;
      border: 1px solid #ef4444;
    }
  }
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
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
  }
`,EditModalInfo={name:{label:"Username",title:"Change your username",intro:"Enter a new username."},email:{label:"Email",title:"Change your email",intro:"Enter a new email."}};function MyAccount(){const[passwordModal,setPasswordModal]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[editModal,setEditModal]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[removeConfirmVisible,setRemoveConfirmVisible]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[uploadAvatar,{isSuccess:uploadSuccess}]=(0,_app_services_user__WEBPACK_IMPORTED_MODULE_2__.C0)(),loginUser=(0,_app_store__WEBPACK_IMPORTED_MODULE_7__.CG)((e=>{var i;return e.users.byId[(null===(i=e.authData.user)||void 0===i?void 0:i.uid)||0]}));(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{uploadSuccess&&react_hot_toast__WEBPACK_IMPORTED_MODULE_1__.ZP.success("update avatar successfully!")}),[uploadSuccess]);const handleBasicEdit=e=>{const{edit:i}=e.currentTarget.dataset;setEditModal(i)},closeBasicEditModal=()=>{setEditModal(null)},togglePasswordModal=()=>{setPasswordModal((e=>!e))},toggleRemoveAccountModalVisible=()=>{setRemoveConfirmVisible((e=>!e))};if(!loginUser)return null;const{uid:uid,avatar:avatar,name:name,email:email}=loginUser;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(StyledWrapper,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"card",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_common_component_AvatarUploader__WEBPACK_IMPORTED_MODULE_3__.Z,{url:avatar,name:name,uploadImage:uploadAvatar}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"name",children:[name," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span",{className:"uid",children:["#",uid]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span",{className:"label",children:"username"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span",{className:"txt",children:[name," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span",{className:"gray",children:[" #",uid]})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button",{"data-edit":"name",onClick:handleBasicEdit,className:"btn",children:"Edit"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span",{className:"label",children:"email"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span",{className:"txt",children:email})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button",{"data-edit":"email",onClick:handleBasicEdit,className:"btn",children:"Edit"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span",{className:"label",children:"password"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span",{className:"txt",children:"*********"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button",{onClick:togglePasswordModal,className:"btn",children:"Edit"})]})]}),1!=uid&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"danger",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h4",{className:"head",children:"Account Removal"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"desc",children:"Disabling your account means you can recover it at any time after taking this action."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button",{className:"btn",onClick:toggleRemoveAccountModalVisible,children:"Delete Account"})]})]}),editModal&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ProfileBasicEditModal__WEBPACK_IMPORTED_MODULE_4__.Z,{valueKey:editModal,...EditModalInfo[editModal],value:eval(editModal),closeModal:closeBasicEditModal}),passwordModal&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_UpdatePasswordModal__WEBPACK_IMPORTED_MODULE_6__.Z,{closeModal:togglePasswordModal}),removeConfirmVisible&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_RemoveAccountConfirmModal__WEBPACK_IMPORTED_MODULE_5__.Z,{closeModal:toggleRemoveAccountModalVisible})]})}},8593:(e,i,s)=>{s.d(i,{Z:()=>u});var t=s(537),a=s(7889),l=s(8555),n=s(3022),c=s(2334),r=s(698),o=s(9885),d=s(874),M=s(683);const x=(0,a.ZP)(r.Z)`
  .input {
    margin: 48px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    label {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #6b7280;
    }
  }
`,u=e=>{let{label:i="Username",valueKey:s="name",value:a="",title:r="Change your username",intro:u="Enter a new username and your existing password.",closeModal:j}=e;const[N,g]=(0,t.useState)(a),[p,{isLoading:m,isSuccess:h}]=(0,c.g$)();return(0,t.useEffect)((()=>{h&&(l.ZP.success("update user info successfully"),j())}),[h]),(0,M.jsx)(d.Z,{id:"modal-modal",children:(0,M.jsx)(x,{title:r,description:u,buttons:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o.Z,{className:"cancel",onClick:j,children:"Cancel"}),(0,M.jsx)(o.Z,{onClick:()=>{p({[s]:N})},children:m?"Updating":"Done"})]}),children:(0,M.jsxs)("div",{className:"input",children:[(0,M.jsx)("label",{htmlFor:s,children:i}),(0,M.jsx)(n.Z,{name:s,value:N,onChange:e=>{g(e.target.value)}})]})})})}},4213:(e,i,s)=>{s.d(i,{Z:()=>o});var t=s(8555),a=s(874),l=s(698),n=s(9885),c=s(5312),r=s(683);const o=e=>{let{closeModal:i}=e;const[s,{isLoading:o}]=(0,c.O2)();return(0,r.jsx)(a.Z,{id:"modal-modal",children:(0,r.jsx)(l.Z,{title:"Remove Account",description:"Are you sure remove this account?",buttons:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.Z,{onClick:i,children:"Cancel"}),(0,r.jsx)(n.Z,{disabled:o,onClick:async()=>{try{await s()}catch(e){t.ZP.error("Remove Account Failed!")}},className:"danger",children:"Remove"})]})})})}},3401:(e,i,s)=>{s.d(i,{Z:()=>u});var t=s(537),a=s(7889),l=s(8555),n=s(3022),c=s(5312),r=s(698),o=s(9885),d=s(874),M=s(683);const x=(0,a.ZP)(r.Z)`
  .input {
    margin: 16px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    label {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #6b7280;
    }
  }
`,u=e=>{let{closeModal:i}=e;const{data:s}=(0,c.I1)(),[a,r]=(0,t.useState)({current:"",newPassword:"",confirmPassword:""}),[u,{isLoading:j,isSuccess:N}]=(0,c.a3)(),g=e=>{const{type:i}=e.target.dataset;r((s=>({...s,[i]:e.target.value})))};(0,t.useEffect)((()=>{N&&(l.ZP.success("update password successfully"),i())}),[N]);const{current:p,newPassword:m,confirmPassword:h}=a,D=(null===s||void 0===s?void 0:s.password)&&!p||!m||!h||m!==h||j;return(0,M.jsx)(d.Z,{id:"modal-modal",children:(0,M.jsxs)(x,{title:"Change your password",description:"Enter current password and new password.",buttons:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o.Z,{className:"cancel",onClick:i,children:"Cancel"}),(0,M.jsx)(o.Z,{disabled:D,onClick:()=>{const{current:e,newPassword:i}=a;u({old_password:e,new_password:i})},children:j?"Updating":"Update"})]}),children:[(null===s||void 0===s?void 0:s.password)&&(0,M.jsxs)("div",{className:"input",children:[(0,M.jsx)("label",{htmlFor:"current",children:"Current Password"}),(0,M.jsx)(n.Z,{type:"password",id:"current",name:"current",value:p,"data-type":"current",onChange:g})]}),(0,M.jsxs)("div",{className:"input",children:[(0,M.jsx)("label",{htmlFor:"newPassword",children:"New Password"}),(0,M.jsx)(n.Z,{type:"password",name:"newPassword",value:m,"data-type":"newPassword",onChange:g})]}),(0,M.jsxs)("div",{className:"input",children:[(0,M.jsx)("label",{htmlFor:"confirmPassword",children:"Confirm New Password"}),(0,M.jsx)(n.Z,{onBlur:()=>{const{newPassword:e,confirmPassword:i}=a;e!==i&&l.ZP.error("Not same with new password")},type:"password",name:"confirmPassword",value:h,"data-type":"confirmPassword",onChange:g})]})]})})}},9994:(e,i,s)=>{s.r(i),s.d(i,{default:()=>we});var t=s(537),a=s(4084),l=s(5924),n=s(7477),c=s(3997),r=s(7889),o=s(8555),d=s(5809),M=s(5727),x=s(3022),u=s(8540),j=s(558),N=s(4563),g=s(5621),p=s(3986),m=s(8636),h=s(683);const D=r.ZP.div`
  position: relative;
  width: 512px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .logo {
    display: flex;
    gap: 16px;
    .preview {
      width: 96px;
      height: 96px;
    }
    .upload {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .tip {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #374151;
      }
      .btn {
        padding: 8px 14px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #1fe1f9;
        background: #ecfeff;
        border: 1px solid #ecfeff;
        box-sizing: border-box;
        box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;
      }
    }
  }
  .inputs {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 64px;
    .input {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
  > .setting {
    font-size: 14px;
    line-height: 20px;
    > .label {
      font-weight: 500;
    }
    > .tip {
      font-weight: 400;
      color: #667085;
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    > form {
      margin-top: 16px;
      width: 512px;
    }
  }
`;function w(){const{loginUser:e,server:i}=(0,p.CG)((e=>({loginUser:e.authData.user,server:e.server}))),[s,a]=(0,t.useState)(!1),[l,n]=(0,t.useState)(i),{values:c,updateConfig:r}=(0,m.Z)("login"),[w]=(0,d.e2)(),[_,{isSuccess:I}]=(0,d.jd)(),y=e=>{const i=e.target.value,{type:s=""}=e.target.dataset;n((e=>({...e,[s]:i})))};if((0,t.useEffect)((()=>{I&&o.ZP.success("Update logo successfully!")}),[I]),(0,t.useEffect)((()=>{i&&n(i)}),[i]),(0,t.useEffect)((()=>{if(i&&l){const{name:e,description:s}=l,{name:t,description:n}=i;a(t!==e||n!==s)}}),[i,l]),!l||!c)return null;const{name:T,description:f,logo:L}=l,{who_can_sign_up:E,guest:z}=c,v=null===e||void 0===e?void 0:e.is_admin;return(0,h.jsxs)(D,{children:[(0,h.jsxs)("div",{className:"logo",children:[(0,h.jsx)("div",{className:"preview",children:(0,h.jsx)(M.Z,{disabled:!v,url:I?`${L}?t=${+new Date}`:L,name:T,uploadImage:_})}),v&&(0,h.jsx)("div",{className:"upload",children:(0,h.jsx)("div",{className:"tip",children:"Minimum size is 128x128, We recommend at least 512x512 for the server. Max size limited to 5M."})})]}),(0,h.jsxs)("div",{className:"inputs",children:[(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"name",children:"Server Name"}),(0,h.jsx)(x.Z,{disabled:!v,"data-type":"name",onChange:y,value:T,name:"name",id:"name",placeholder:"Server Name"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"desc",children:"Server Description"}),(0,h.jsx)(j.Z,{disabled:!v,"data-type":"description",onChange:y,value:null!==f&&void 0!==f?f:"",rows:4,name:"name",id:"name",placeholder:"Tell the world a bit about this server"})]})]}),v&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"setting",children:[(0,h.jsx)("p",{className:"label",children:"Default Sign Up"}),(0,h.jsx)("p",{className:"tip",children:"Who can sign up this server."}),(0,h.jsx)(g.Z,{options:["Everyone","Invitation Link Only"],values:["EveryOne","InvitationOnly"],value:E,onChange:e=>{var i;i=e,r({...c,who_can_sign_up:i})}})]}),(0,h.jsxs)("div",{className:"setting",children:[(0,h.jsx)("p",{className:"label",children:"Guest Mode"}),(0,h.jsx)("p",{className:"tip",children:(0,h.jsx)("span",{className:"txt",children:"If enabled, visitors will see public channels on this server."})}),(0,h.jsx)(g.Z,{options:["Enabled","Disabled"],values:["true","false"],value:String(z),onChange:e=>{(e=>{const i="true"===e;r({...c,guest:i})})(e)}})]})]}),s&&(0,h.jsx)(N.Z,{saveHandler:()=>{const{name:e,description:i}=l;w({name:e,description:i})},resetHandler:()=>{n(i)}})]})}const _=r.ZP.div`
  position: relative;
  width: 512px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .inputs {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    .input {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        &.inputs {
          flex-direction: column;
          gap: 8px;
        }
        .title {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .txt {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            .icon {
              cursor: pointer;
            }
          }
          .desc {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #667085;
          }
        }
      }
    }
  }
  .tip {
    display: flex;
    gap: 8px;
    align-items: center;
    .link {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #06b6d4;
    }
  }
`;var I,y=s(9975),T=s(7829),f=s(9195);function L(){return L=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var s=arguments[i];for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t])}return e},L.apply(this,arguments)}const E=(e,i)=>{let{title:s,titleId:a,...l}=e;return t.createElement("svg",L({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":a},l),s?t.createElement("title",{id:a},s):null,I||(I=t.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M14.4 7.99961C14.4 9.69699 13.7257 11.3249 12.5255 12.5251C11.3252 13.7253 9.69736 14.3996 7.99998 14.3996C6.30259 14.3996 4.67472 13.7253 3.47449 12.5251C2.27426 11.3249 1.59998 9.69699 1.59998 7.99961C1.59998 6.30222 2.27426 4.67436 3.47449 3.47413C4.67472 2.27389 6.30259 1.59961 7.99998 1.59961C9.69736 1.59961 11.3252 2.27389 12.5255 3.47413C13.7257 4.67436 14.4 6.30222 14.4 7.99961ZM7.99998 5.59961C7.85941 5.59947 7.7213 5.63637 7.59953 5.70659C7.47777 5.77682 7.37666 5.87788 7.30638 5.99961C7.25563 6.09391 7.18646 6.17706 7.10298 6.24414C7.0195 6.31121 6.92341 6.36084 6.82039 6.39009C6.71737 6.41934 6.60953 6.4276 6.50326 6.4144C6.39699 6.40119 6.29445 6.36679 6.20172 6.31322C6.109 6.25965 6.02797 6.18801 5.96344 6.10254C5.89891 6.01708 5.8522 5.91953 5.82608 5.81568C5.79995 5.71182 5.79494 5.60378 5.81135 5.49796C5.82775 5.39213 5.86523 5.29068 5.92158 5.19961C6.18575 4.7421 6.5935 4.38454 7.0816 4.18238C7.56969 3.98022 8.11085 3.94476 8.62115 4.0815C9.13145 4.21823 9.58237 4.51952 9.90399 4.93865C10.2256 5.35777 10.4 5.87131 10.4 6.39961C10.4001 6.8961 10.2463 7.38043 9.95978 7.78589C9.67324 8.19135 9.26803 8.498 8.79998 8.66361V8.79961C8.79998 9.01178 8.71569 9.21527 8.56566 9.36529C8.41563 9.51532 8.21215 9.59961 7.99998 9.59961C7.7878 9.59961 7.58432 9.51532 7.43429 9.36529C7.28426 9.21527 7.19998 9.01178 7.19998 8.79961V7.99961C7.19998 7.78744 7.28426 7.58395 7.43429 7.43392C7.58432 7.28389 7.7878 7.19961 7.99998 7.19961C8.21215 7.19961 8.41563 7.11532 8.56566 6.96529C8.71569 6.81527 8.79998 6.61178 8.79998 6.39961C8.79998 6.18744 8.71569 5.98395 8.56566 5.83392C8.41563 5.68389 8.21215 5.59961 7.99998 5.59961ZM7.99998 11.9996C8.21215 11.9996 8.41563 11.9153 8.56566 11.7653C8.71569 11.6153 8.79998 11.4118 8.79998 11.1996C8.79998 10.9874 8.71569 10.784 8.56566 10.6339C8.41563 10.4839 8.21215 10.3996 7.99998 10.3996C7.7878 10.3996 7.58432 10.4839 7.43429 10.6339C7.28426 10.784 7.19998 10.9874 7.19998 11.1996C7.19998 11.4118 7.28426 11.6153 7.43429 11.7653C7.58432 11.9153 7.7878 11.9996 7.99998 11.9996Z",fill:"#9CA3AF"})))},z=(0,t.forwardRef)(E),v=r.ZP.div`
  padding: 8px 12px;
  background: #101828;
  border-radius: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
  a {
    color: #55c7ec;
  }
`;function O(e){let{link:i="#"}=e;return(0,h.jsx)(T.ZP,{delay:[0,500],interactive:!0,arrow:f.ki,placement:"bottom",content:(0,h.jsxs)(v,{children:["Need more detail? See our"," ",(0,h.jsx)("a",{target:"doc",href:i,children:"doc"}),"."]}),children:(0,h.jsx)(z,{className:"icon"})})}var b=s(8697),C=s(8055),A=s(3211);const k=r.ZP.div`
  user-select: none;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  .txt {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #475467;
    min-width: 76px;
  }
  > .icon {
    width: 20px !important;
    height: 20px !important;
  }
`,U=e=>{var i;let{options:s=[],updateSelect:a=null,current:l=null}=e;const[n,c]=(0,t.useState)(!1),[r,o]=(0,t.useState)(null),d=()=>{c((e=>!e))},M=e=>{o(e),d(),a&&a(e)};return(0,h.jsx)(T.ZP,{visible:n,appendTo:document.body,placement:"bottom",interactive:!0,content:(0,h.jsx)(A.Z,{children:s.map((e=>{let{title:i,value:s,selected:t,underline:a}=e;return(0,h.jsxs)("li",{onClick:t?void 0:M.bind(null,{title:i,value:s}),className:"item sb "+(a?"underline":""),"data-disabled":t,children:[i,t&&(0,h.jsx)(b.Z,{className:"icon"})]},s)}))}),children:(0,h.jsxs)(k,{onClick:d,children:[(0,h.jsx)("span",{className:"txt",children:(null===(i=null!==l?l:r)||void 0===i?void 0:i.title)||"Select"}),(0,h.jsx)(C.Z,{className:"icon"})]})})};var Z=s(9885);const P=JSON.parse('[{"title":"Google","value":"accounts.google.com","selected":false,"icon":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE1OTA1XzI0Njk1KSI+CjxwYXRoIGQ9Ik0yMy43NjYgMTIuMjc2M0MyMy43NjYgMTEuNDYwNSAyMy42OTk5IDEwLjY0MDQgMjMuNTU4OCA5LjgzNzg5SDEyLjI0VjE0LjQ1ODlIMTguNzIxN0MxOC40NTI4IDE1Ljk0OTIgMTcuNTg4NSAxNy4yNjc2IDE2LjMyMyAxOC4xMDU0VjIxLjEwMzdIMjAuMTlDMjIuNDYwOCAxOS4wMTM3IDIzLjc2NiAxNS45MjcyIDIzLjc2NiAxMi4yNzYzWiIgZmlsbD0iIzQyODVGNCIvPgo8cGF0aCBkPSJNMTIuMjQwMSAyNC4wMDEzQzE1LjQ3NjYgMjQuMDAxMyAxOC4yMDU5IDIyLjkzODcgMjAuMTk0NSAyMS4xMDQ0TDE2LjMyNzYgMTguMTA2QzE1LjI1MTcgMTguODM4IDEzLjg2MjcgMTkuMjUyNSAxMi4yNDQ1IDE5LjI1MjVDOS4xMTM4OCAxOS4yNTI1IDYuNDU5NDYgMTcuMTQwNCA1LjUwNzA1IDE0LjMwMDhIMS41MTY2VjE3LjM5MTdDMy41NTM3MSAyMS40NDM5IDcuNzAyOSAyNC4wMDEzIDEyLjI0MDEgMjQuMDAxM1oiIGZpbGw9IiMzNEE4NTMiLz4KPHBhdGggZD0iTTUuNTAyNTMgMTQuMzAwN0M0Ljk5OTg3IDEyLjgxMDMgNC45OTk4NyAxMS4xOTY1IDUuNTAyNTMgOS43MDYxOFY2LjYxNTIzSDEuNTE2NDlDLTAuMTg1NTEgMTAuMDA2IC0wLjE4NTUxIDE0LjAwMDkgMS41MTY0OSAxNy4zOTE2TDUuNTAyNTMgMTQuMzAwN1oiIGZpbGw9IiNGQkJDMDQiLz4KPHBhdGggZD0iTTEyLjI0MDEgNC43NDk2NkMxMy45NTA5IDQuNzIzMiAxNS42MDQ0IDUuMzY2OTcgMTYuODQzNCA2LjU0ODY3TDIwLjI2OTUgMy4xMjI2MkMxOC4xMDAxIDEuMDg1NSAxNS4yMjA4IC0wLjAzNDQ2NiAxMi4yNDAxIDAuMDAwODA4NjY2QzcuNzAyOSAwLjAwMDgwODY2NiAzLjU1MzcxIDIuNTU4MjIgMS41MTY2IDYuNjE0ODFMNS41MDI2NCA5LjcwNTc1QzYuNDUwNjQgNi44NjE3MyA5LjEwOTQ3IDQuNzQ5NjYgMTIuMjQwMSA0Ljc0OTY2WiIgZmlsbD0iI0VBNDMzNSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE1OTA1XzI0Njk1Ij4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="},{"title":"Facebook","value":"www.facebook.com","selected":false,"icon":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAxNkMzMiA3LjE2NDEzIDI0LjgzNTggMCAxNiAwQzcuMTY0MTMgMCAwIDcuMTY0MTMgMCAxNkMwIDIzLjk4NTMgNS44NTAxNiAzMC42MDQ5IDEzLjUwMDIgMzEuODA2N1YyMC42MjYxSDkuNDM2NjRWMTZIMTMuNTAwMlYxMi40NzQyQzEzLjUwMDIgOC40NjQ1NiAxNS44ODk4IDYuMjQ4MjkgMTkuNTQzOCA2LjI0ODI5QzIxLjI5NDMgNi4yNDgyOSAyMy4xMjU4IDYuNTYxMDIgMjMuMTI1OCA2LjU2MTAyVjEwLjQ5ODZIMjEuMTA3NUMxOS4xMjA4IDEwLjQ5ODYgMTguNDk5OCAxMS43MzE3IDE4LjQ5OTggMTIuOTk4NFYxNS45OTk5SDIyLjkzNjdMMjIuMjI4IDIwLjYyNkgxOC40OTk2VjMxLjgwNjRDMjYuMTQ5OCAzMC42MDcxIDMxLjk5OTggMjMuOTg3NiAzMS45OTk4IDE1Ljk5OTlMMzIgMTZaIiBmaWxsPSIjMTk3N0YzIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIuMjI4IDIwLjYyNkwyMi45MzY5IDE1Ljk5OTlIMTguNDk5OVYxMi45OTg0QzE4LjQ5OTkgMTEuNzMzOSAxOS4xMTg2IDEwLjQ5ODcgMjEuMTA3NyAxMC40OTg3SDIzLjEyNlY2LjU2MTA1QzIzLjEyNiA2LjU2MTA1IDIxLjI5NDUgNi4yNDgyOSAxOS41NDM5IDYuMjQ4MjlDMTUuODg5OSA2LjI0ODI5IDEzLjUwMDQgOC40NjIzOCAxMy41MDA0IDEyLjQ3NDJWMTZIOS40MzY3N1YyMC42MjYxSDEzLjUwMDRWMzEuODA2N0MxNC4zMTQ5IDMxLjkzNDcgMTUuMTQ5NiAzMiAxNi4wMDAxIDMyQzE2Ljg1MDcgMzIgMTcuNjg1NCAzMS45MzI1IDE4LjQ5OTkgMzEuODA2N1YyMC42MjYxSDIyLjIyODJMMjIuMjI4IDIwLjYyNloiIGZpbGw9IiNGRUZFRkUiLz4KPC9zdmc+Cg=="},{"title":"Gitlab","value":"www.gitlab.com","selected":false,"icon":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODAgMzgwIj4KPGRlZnM+CiAgICA8c3R5bGU+LmNscy0xe2ZpbGw6I2UyNDMyOTt9LmNscy0ye2ZpbGw6I2ZjNmQyNjt9LmNscy0ze2ZpbGw6I2ZjYTMyNjt9PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJMT0dPIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yODIuODMsMTcwLjczbC0uMjctLjY5LTI2LjE0LTY4LjIyYTYuODEsNi44MSwwLDAsMC0yLjY5LTMuMjQsNyw3LDAsMCwwLTgsLjQzLDcsNywwLDAsMC0yLjMyLDMuNTJsLTE3LjY1LDU0SDE1NC4yOWwtMTcuNjUtNTRBNi44Niw2Ljg2LDAsMCwwLDEzNC4zMiw5OWE3LDcsMCwwLDAtOC0uNDMsNi44Nyw2Ljg3LDAsMCwwLTIuNjksMy4yNEw5Ny40NCwxNzBsLS4yNi42OWE0OC41NCw0OC41NCwwLDAsMCwxNi4xLDU2LjFsLjA5LjA3LjI0LjE3LDM5LjgyLDI5LjgyLDE5LjcsMTQuOTEsMTIsOS4wNmE4LjA3LDguMDcsMCwwLDAsOS43NiwwbDEyLTkuMDYsMTkuNy0xNC45MSw0MC4wNi0zMCwuMS0uMDhBNDguNTYsNDguNTYsMCwwLDAsMjgyLjgzLDE3MC43M1oiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yODIuODMsMTcwLjczbC0uMjctLjY5YTg4LjMsODguMywwLDAsMC0zNS4xNSwxNS44TDE5MCwyMjkuMjVjMTkuNTUsMTQuNzksMzYuNTcsMjcuNjQsMzYuNTcsMjcuNjRsNDAuMDYtMzAsLjEtLjA4QTQ4LjU2LDQ4LjU2LDAsMCwwLDI4Mi44MywxNzAuNzNaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNMTUzLjQzLDI1Ni44OWwxOS43LDE0LjkxLDEyLDkuMDZhOC4wNyw4LjA3LDAsMCwwLDkuNzYsMGwxMi05LjA2LDE5LjctMTQuOTFTMjA5LjU1LDI0NCwxOTAsMjI5LjI1QzE3MC40NSwyNDQsMTUzLjQzLDI1Ni44OSwxNTMuNDMsMjU2Ljg5WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTEzMi41OCwxODUuODRBODguMTksODguMTksMCwwLDAsOTcuNDQsMTcwbC0uMjYuNjlhNDguNTQsNDguNTQsMCwwLDAsMTYuMSw1Ni4xbC4wOS4wNy4yNC4xNywzOS44MiwyOS44MnMxNy0xMi44NSwzNi41Ny0yNy42NFoiLz48L2c+PC9zdmc+"},{"title":"Paypal","value":"www.paypal.com","selected":false,"icon":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjMwMnB4IiB2aWV3Qm94PSIwIDAgMjU2IDMwMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+Cgk8Zz4KCQk8cGF0aCBkPSJNMjE3LjE2ODQ3NiwyMy41MDcwMTQ2IEMyMDMuMjM0MDc3LDcuNjI0Nzk2NTEgMTc4LjA0NTYxMiwwLjgxNTc1MzMzOCAxNDUuODIzMzU1LDAuODE1NzUzMzM4IEw1Mi4zMDMwNjE5LDAuODE1NzUzMzM4IEM0NS43MTA0NDMxLDAuODE1NzUzMzM4IDQwLjEwODM4MTksNS42MTAzODUyIDM5LjA3NjIwNDIsMTIuMTExNDM5OSBMMC4xMzY0NjgzMDIsMjU5LjA3NjYwMSBDLTAuNjM3NjY0OTY4LDI2My45NDYxNDkgMy4xMzMxMTMyMiwyNjguMzU3ODc2IDguMDY5MjUzMzEsMjY4LjM1Nzg3NiBMNjUuODA0NjEyLDI2OC4zNTc4NzYgTDgwLjMwNTA0MzgsMTc2LjM4NTg0OSBMNzkuODU1NTQ3MSwxNzkuMjY1OTU4IEM4MC44ODc3MjQ4LDE3Mi43NjQ5MDMgODYuNDQ4MTY1OSwxNjcuOTcwMjcyIDkzLjAzMjQ2MDcsMTY3Ljk3MDI3MiBMMTIwLjQ2ODQxLDE2Ny45NzAyNzIgQzE3NC4zNjYzOTgsMTY3Ljk3MDI3MiAyMTYuNTY5MTQ3LDE0Ni4wNzgxMTYgMjI4Ljg5NzAxMiw4Mi43NDkwMTk3IEMyMjkuMjYzMjY4LDgwLjg3NjExNjcgMjI5LjU3OTU4MSw3OS4wNTMxNTc3IDIyOS44NTQyNzMsNzcuMjcxODE4OCBDMjI4LjI5NzY4Myw3Ni40NDc3NDE0IDIyOC4yOTc2ODMsNzYuNDQ3NzQxNCAyMjkuODU0MjczLDc3LjI3MTgxODggQzIzMy41MjUxNjMsNTMuODY0NjkyNCAyMjkuODI5MzAxLDM3LjkzMjUzMDIgMjE3LjE2ODQ3NiwyMy41MDcwMTQ2IiBmaWxsPSIjMjczNDZBIj48L3BhdGg+CgkJPHBhdGggZD0iTTEwMi4zOTY5NzYsNjguODM5NTkyOSBDMTAzLjkzNjkxOSw2OC4xMDcwNzk3IDEwNS42NTE2NjUsNjcuNjk5MjAzIDEwNy40NDk2NTIsNjcuNjk5MjAzIEwxODAuNzY3NTY1LDY3LjY5OTIwMyBDMTg5LjQ0OTUxMSw2Ny42OTkyMDMgMTk3LjU0ODc3Niw2OC4yNjUyMzYgMjA0Ljk0ODgyNCw2OS40NTU1Njk5IEMyMDcuMDcxNDQ4LDY5Ljc5Njg1NDUgMjA5LjEyNzQ3OSw3MC4xODgwODMxIDIxMS4xMjUyNDIsNzAuNjM3NTc5OSBDMjEzLjEyMzAwNiw3MS4wNzg3NTI2IDIxNS4wNjI1MDEsNzEuNTc4MTkzNCAyMTYuOTQzNzI4LDcyLjEyNzU3ODMgQzIxNy44ODQzNDEsNzIuNDAyMjcwOCAyMTguODA4MzA3LDcyLjY4NTI4NzIgMjE5LjcxNTYyNCw3Mi45ODQ5NTE3IEMyMjMuMzUzMjE4LDc0LjIwMDI1NzcgMjI2Ljc0MTA5Miw3NS42MTUzNCAyMjkuODU0MjczLDc3LjI3MTgxODggQzIzMy41MjUxNjMsNTMuODU2MzY4MyAyMjkuODI5MzAxLDM3LjkzMjUzMDIgMjE3LjE2ODQ3NiwyMy41MDcwMTQ2IEMyMDMuMjI1NzUzLDcuNjI0Nzk2NTEgMTc4LjA0NTYxMiwwLjgxNTc1MzMzOCAxNDUuODIzMzU1LDAuODE1NzUzMzM4IEw1Mi4yOTQ3Mzc5LDAuODE1NzUzMzM4IEM0NS43MTA0NDMxLDAuODE1NzUzMzM4IDQwLjEwODM4MTksNS42MTAzODUyIDM5LjA3NjIwNDIsMTIuMTExNDM5OSBMMC4xMzY0NjgzMDIsMjU5LjA2ODI3NyBDLTAuNjM3NjY0OTY4LDI2My45NDYxNDkgMy4xMzMxMTMyMiwyNjguMzQ5NTUyIDguMDYwOTI5MywyNjguMzQ5NTUyIEw2NS44MDQ2MTIsMjY4LjM0OTU1MiBMOTUuODg3NTk3NCw3Ny41Nzk4MDczIEM5Ni41MDM1NzQ0LDczLjY2NzUyMDggOTkuMDE3NDI2NSw3MC40NjI3NzU2IDEwMi4zOTY5NzYsNjguODM5NTkyOSBaIiBmaWxsPSIjMjczNDZBIj48L3BhdGg+CgkJPHBhdGggZD0iTTIyOC44OTcwMTIsODIuNzQ5MDE5NyBDMjE2LjU2OTE0NywxNDYuMDY5NzkyIDE3NC4zNjYzOTgsMTY3Ljk3MDI3MiAxMjAuNDY4NDEsMTY3Ljk3MDI3MiBMOTMuMDI0MTM2NywxNjcuOTcwMjcyIEM4Ni40Mzk4NDE5LDE2Ny45NzAyNzIgODAuODc5NDAwNywxNzIuNzY0OTAzIDc5Ljg1NTU0NzEsMTc5LjI2NTk1OCBMNjEuODE3NDA5NSwyOTMuNjIxMjU4IEM2MS4xNDMxNjQ0LDI5Ny44ODMxNTMgNjQuNDM5NDczOCwzMDEuNzQ1NDk1IDY4Ljc1MTMxMjksMzAxLjc0NTQ5NSBMMTE3LjQyMTgyMSwzMDEuNzQ1NDk1IEMxMjMuMTgyMDM4LDMwMS43NDU0OTUgMTI4LjA4NDg4MiwyOTcuNTUwMTkyIDEyOC45ODM4NzYsMjkxLjg2NDg5MSBMMTI5LjQ1ODM0NCwyODkuMzg0MzM1IEwxMzguNjMxNDA3LDIzMS4yNDk0MjMgTDEzOS4yMjI0MTIsMjI4LjAzNjM1NCBDMTQwLjEyMTQwNiwyMjIuMzUxMDUzIDE0NS4wMjQyNSwyMTguMTU1NzUgMTUwLjc4NDQ2NywyMTguMTU1NzUgTDE1OC4wNjc5NzksMjE4LjE1NTc1IEMyMDUuMjE1MTkzLDIxOC4xNTU3NSAyNDIuMTMyMTkzLDE5OS4wMDIxOTQgMjUyLjkyMDExNSwxNDMuNjA1ODg0IEMyNTcuNDIzNDA2LDEyMC40NTY4MDIgMjU1LjA5MjY4MywxMDEuMTI4NDQyIDI0My4xODEwMTksODcuNTUxOTc1NiBDMjM5LjU2ODM5Nyw4My40Mzk5MTI5IDIzNS4wODE3NTQsODAuMDQzNzE1MyAyMjkuODU0MjczLDc3LjI3MTgxODggQzIyOS41NzEyNTcsNzkuMDYxNDgxNyAyMjkuMjYzMjY4LDgwLjg3NjExNjcgMjI4Ljg5NzAxMiw4Mi43NDkwMTk3IEwyMjguODk3MDEyLDgyLjc0OTAxOTcgWiIgZmlsbD0iIzI3OTBDMyI+PC9wYXRoPgoJCTxwYXRoIGQ9Ik0yMTYuOTUyMDUyLDcyLjEyNzU3ODMgQzIxNS4wNzA4MjUsNzEuNTc4MTkzNCAyMTMuMTMxMzMsNzEuMDc4NzUyNiAyMTEuMTMzNTY2LDcwLjYzNzU3OTkgQzIwOS4xMzU4MDMsNzAuMTk2NDA3MSAyMDcuMDcxNDQ4LDY5LjgwNTE3ODUgMjA0Ljk1NzE0OCw2OS40NjM4OTM5IEMxOTcuNTQ4Nzc2LDY4LjI2NTIzNiAxODkuNDU3ODM1LDY3LjY5OTIwMyAxODAuNzY3NTY1LDY3LjY5OTIwMyBMMTA3LjQ1Nzk3Niw2Ny42OTkyMDMgQzEwNS42NTE2NjUsNjcuNjk5MjAzIDEwMy45MzY5MTksNjguMTA3MDc5NyAxMDIuNDA1Myw2OC44NDc5MTY5IEM5OS4wMTc0MjY1LDcwLjQ3MTA5OTYgOTYuNTExODk4NCw3My42Njc1MjA4IDk1Ljg5NTkyMTQsNzcuNTg4MTMxMyBMODAuMzEzMzY3OCwxNzYuMzg1ODQ5IEw3OS44NjM4NzExLDE3OS4yNjU5NTggQzgwLjg4NzcyNDgsMTcyLjc2NDkwMyA4Ni40NDgxNjU5LDE2Ny45NzAyNzIgOTMuMDMyNDYwNywxNjcuOTcwMjcyIEwxMjAuNDc2NzM0LDE2Ny45NzAyNzIgQzE3NC4zNzQ3MjIsMTY3Ljk3MDI3MiAyMTYuNTc3NDcxLDE0Ni4wNzgxMTYgMjI4LjkwNTMzNiw4Mi43NDkwMTk3IEMyMjkuMjcxNTkyLDgwLjg3NjExNjcgMjI5LjU3OTU4MSw3OS4wNjE0ODE3IDIyOS44NjI1OTcsNzcuMjcxODE4OCBDMjI2Ljc0MTA5Miw3NS42MjM2NjQgMjIzLjM2MTU0Miw3NC4yMDAyNTc3IDIxOS43MjM5NDgsNzIuOTkzMjc1NyBDMjE4LjgxNjYzMSw3Mi42OTM2MTEyIDIxNy44OTI2NjUsNzIuNDAyMjcwOCAyMTYuOTUyMDUyLDcyLjEyNzU3ODMiIGZpbGw9IiMxRjI2NEYiPjwvcGF0aD4KCTwvZz4KPC9zdmc+"},{"title":"SolidWeb","value":"solidweb.org","selected":false,"icon":"data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjM1MiIgaGVpZ2h0PSIzMjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSJub25lIj4KICAgIDxwYXRoIGQ9Ik04Ny45NzI5NiAyODIuMzUyN0wyNy4yNDEzMyAxNzcuMDIyMDdjLTUuNjIwNDEtOS43NTc2NS01LjYyMDQxLTIxLjc3OTA4IDAtMzEuNTM2NzRMODcuOTcyOTYgNDAuMjMyOGM1LjY0NjQzLTkuNzgzNjcgMTYuMDgwNjEtMTUuNzk0MzkgMjcuMzIxNDMtMTUuNzk0MzloMTIxLjM4NTJjMTEuMjY2ODQgMCAyMS43MjcwNCA2LjAxMDcyIDI3LjMyMTQzIDE1Ljc5NDRsNjAuNzU3NjUgMTA1LjMwNDU4YzUuNjIwNDEgOS43NTc2NiA1LjYyMDQxIDIxLjc3OTA5IDAgMzEuNTM2NzRsLTYwLjczMTYzIDEwNS4zMzA2MWMtNS42NDY0MyA5Ljc4MzY3LTE2LjA4MDYxIDE1Ljc5NDM5LTI3LjMyMTQzIDE1Ljc5NDM5SDExNS4zNzI0NWMtMTEuMzE4ODgtLjA1MjA0LTIxLjcyNzA0LTYuMDg4NzgtMjcuMzk5NS0xNS44NDY0M3oiIGZpbGw9IiNGRkYiLz4KICAgIDxwYXRoIGQ9Ik05My4xNTEwMiAyNzUuMTk3MDhsLTU3LjExNDgtOTkuMDU5N2MtNS4zMDgxNi05LjE4NTItNS4zMDgxNi0yMC41MDQwOCAwLTI5LjY2MzI2bDU3LjExNDgtOTkuMDg1NzJjNS4zMzQxOC05LjIxMTIyIDE1LjE0Mzg4LTE0Ljg1NzY1IDI1LjczNDE4LTE0Ljg1NzY1aDExNC4yMjk2YzEwLjU5MDMgMCAyMC40MjYwMiA1LjY0NjQzIDI1LjczNDE4IDE0Ljg1NzY1bDU3LjE2Njg0IDk5LjAzMzY4YzUuMzA4MTYgOS4xODUyIDUuMzA4MTYgMjAuNTA0MDggMCAyOS42NjMyNkwyNTguODc1IDI3NS4yMjMxYy01LjMzNDE4IDkuMjExMjItMTUuMTQzODggMTQuODU3NjUtMjUuNzM0MTggMTQuODU3NjVIMTE4LjkzNzI0Yy0xMC42NDIzNCAwLTIwLjQ1MjA0LTUuNjcyNDUtMjUuNzg2MjItMTQuODgzNjd6IiBmaWxsPSIjN0M0REZGIi8+CiAgICA8cGF0aCBkPSJNMTE4LjQ2ODg4IDE0Mi4yMzI4aDExNy41MzQxOGMxLjQ4MzE2IDAgMi42NTQwOC0xLjE5Njk1IDIuNjU0MDgtMi42NTQwOXYtMjIuMDM5MjhjMC0xNC42NDk1LTExLjg5MTMyLTI2LjU0MDg1LTI2LjU0MDgxLTI2LjU0MDg1aC03MC41NjczNWMtMjAuNTMwMS0uMDI2LTM3LjE1NzIyIDE2LjYwMTA1LTM3LjE1NzIyIDM3LjEzMTE1LS4wMjU5NCA3LjgzMjE0IDYuMjcxIDE0LjEwMzA2IDE0LjA3NzEyIDE0LjEwMzA2ek0xMjkuOTk1OTIgMjM5LjYwMTE2SDIwMC4yMjVjMjEuMjA2NjMgMCAzOC40MzIxNC0xNy4yMjU1MSAzOC40MzIxNC0zOC40MzIxNCAwLTcuMDc3NTUtNS43MjQ0OS0xMi44MjgwNi0xMi44MjgwNi0xMi44MjgwNkgxMDYuOTQxODRjLTEuNDU3MTUgMC0yLjU1MDA1IDEuMTcwOTEtMi41NTAwNSAyLjU1djIzLjA1NDA4Yy0uMDI1OTcgMTQuMTgxMTIgMTEuNDc1MDUgMjUuNjU2MTIgMjUuNjA0MTMgMjUuNjU2MTJ6IiBmaWxsPSIjRjdGN0Y3Ii8+CiAgICA8cGF0aCBkPSJNMTA5LjU5NTkyIDEzOS4zMTg1bDg3LjY2Mjc1IDg3LjY2Mjc2YzUuODAyNTUgNS44MDI1NSAxNS4xOTU5MiA1LjgwMjU1IDIwLjk5ODQ3IDBsMTUuMTk1OTItMTUuMTk1OTJjNS44MDI1NS01LjgwMjU1IDUuODAyNTUtMTUuMTk1OTEgMC0yMC45OTg0N2wtODcuNjM2NzMtODcuNjYyNzVjLTUuODAyNTUtNS44MDI1NS0xNS4xOTU5Mi01LjgwMjU1LTIwLjk5ODQ3IDBsLTE1LjE5NTkyIDE1LjE5NTkyYy01Ljg1NDYgNS44MDI1NS01Ljg1NDYgMTUuMjIxOTQtLjAyNjAyIDIwLjk5ODQ3eiIgZmlsbD0iI0Y3RjdGNyIvPgogICAgPHBhdGggZmlsbD0iIzQ0NCIgb3BhY2l0eT0iLjMiIGQ9Ik0xOTguNjg5OCAyMjguNDY0NDNsLTUxLjQ5NDQtNDAuMTIzNDdoMTEuMzk2OTV6TTE0NC4zNTkxOCAxMDEuNjY2OThsNDAuNTY1ODIgNDAuNTY1ODFoMTMuNzY0OHoiLz4KICA8L2c+Cjwvc3ZnPg==","underline":true},{"title":"Custom","value":"","selected":false}]'),S=r.ZP.div`
  padding: 16px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .issuers {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .issuer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
      .left {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .remove {
          cursor: pointer;
        }
        .data {
          display: flex;
          align-items: center;
          gap: 16px;
          justify-content: space-between;
          > .icon {
            width: 32px;
            height: 32px;
          }
          > .url {
            width: 280px;
          }
        }
      }
      .right {
        width: 56px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .add {
    cursor: pointer;
  }
`;var Y;function Q(){return Q=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var s=arguments[i];for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t])}return e},Q.apply(this,arguments)}const B=(e,i)=>{let{title:s,titleId:a,...l}=e;return t.createElement("svg",Q({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":a},l),s?t.createElement("title",{id:a},s):null,Y||(Y=t.createElement("path",{d:"M8.00004 1.33301C4.32004 1.33301 1.33337 4.31967 1.33337 7.99967C1.33337 11.6797 4.32004 14.6663 8.00004 14.6663C11.68 14.6663 14.6667 11.6797 14.6667 7.99967C14.6667 4.31967 11.68 1.33301 8.00004 1.33301ZM11.3334 8.66634H4.66671V7.33301H11.3334V8.66634Z",fill:"#D0D5DD"})))},R=(0,t.forwardRef)(B),W=e=>{let{issuers:i=[],onChange:s}=e;const[a,l]=(0,t.useState)(null),[n,c]=(0,t.useState)(""),r=!n&&!(null!==a&&void 0!==a&&a.value)||!(null!==a&&void 0!==a&&a.title)||i.some((e=>e.domain===n));return(0,h.jsx)(S,{children:(0,h.jsxs)("ul",{className:"issuers",children:[i.map((e=>{let{enable:t,favicon:a,domain:l}=e;return(0,h.jsxs)("li",{className:"issuer",children:[(0,h.jsxs)("div",{className:"left",children:[(0,h.jsx)(R,{className:"remove",onClick:()=>{s(i.filter((e=>e.domain!==l)))}}),(0,h.jsxs)("div",{className:"data",children:[Boolean(a)&&(0,h.jsx)("img",{src:a,alt:"logo",className:"icon"}),(0,h.jsx)(x.Z,{readOnly:!0,value:l,prefix:"https://",placeholder:"Issuer Domain",className:"url"})]})]}),(0,h.jsx)("div",{className:"right",children:(0,h.jsx)(y.Z,{"data-checked":t,onClick:()=>{s(i.map((e=>({...e,enable:e.domain===l?!t:e.enable}))))}})})]},l)})),(0,h.jsxs)("li",{className:"issuer add",children:[(0,h.jsxs)("div",{className:"left",children:[(0,h.jsx)(U,{options:P.map((e=>({...e,selected:i.some((i=>i.domain===e.value))}))),current:a,updateSelect:l}),(0,h.jsx)("div",{className:"data",children:(0,h.jsx)(x.Z,{onChange:e=>{c(e.target.value)},readOnly:!(null===a||void 0===a||!a.value),value:(null===a||void 0===a?void 0:a.value)||n,prefix:"https://",placeholder:"domain.com",className:"url"})})]}),(0,h.jsx)("div",{className:"right",children:(0,h.jsx)(Z.Z,{disabled:r,onClick:()=>{const e=P.find((e=>e.value===(null===a||void 0===a?void 0:a.value)));if(!e)return;const{icon:t,value:r}=e;s(i.concat({enable:!0,favicon:t||"",domain:r||n})),l(null),c("")},children:"Add"})})]})]})})};var G=s(5089),K=s(2712);function F(){const{changed:e,clientId:i,updateClientId:s,updateClientIdToServer:t}=(0,G.Z)(),{config:a,changed:l,updateGithubAuthConfigToServer:n,updateGithubAuthConfig:c}=(0,K.Z)(),{values:r,updateConfig:d,setValues:M,reset:j,changed:g}=(0,m.Z)("login"),p=e=>{const{key:i}=e.target.dataset;i&&c({[i]:e.target.value})},D=e=>{M((i=>i?{...i,...e}:i))};if(!r)return null;const{google:w,magic_link:I,github:T,metamask:f,password:L,oidc:E=[]}=r,z=e||g||l;return(0,h.jsxs)(_,{children:[(0,h.jsxs)("div",{className:"inputs",children:[(0,h.jsx)("div",{className:"input",children:(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"title",children:[(0,h.jsx)("div",{className:"txt",children:(0,h.jsx)(u.Z,{children:"Password"})}),(0,h.jsx)("span",{className:"desc",children:"Allows members login with password."})]}),(0,h.jsx)(y.Z,{onClick:D.bind(null,{password:!L}),"data-checked":L})]})}),(0,h.jsx)("div",{className:"input",children:(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"title",children:[(0,h.jsx)("div",{className:"txt",children:(0,h.jsx)(u.Z,{children:"Magic Link"})}),(0,h.jsx)("span",{className:"desc",children:"Allows members login with Magic Link."})]}),(0,h.jsx)(y.Z,{onClick:D.bind(null,{magic_link:!I}),"data-checked":I})]})}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"title",children:[(0,h.jsxs)("div",{className:"txt",children:[(0,h.jsx)(u.Z,{children:"Google"}),(0,h.jsx)(O,{link:"https://doc.voce.chat/en-us/login-google.html"})]}),(0,h.jsx)("span",{className:"desc",children:"Allows members login with Google."})]}),(0,h.jsx)(y.Z,{onClick:D.bind(null,{google:!w}),"data-checked":w})]}),(0,h.jsx)("div",{className:"row",children:(0,h.jsx)(x.Z,{disabled:!w,onChange:e=>{s(e.target.value)},placeholder:"Client ID",value:i})})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"title",children:[(0,h.jsxs)("div",{className:"txt",children:[(0,h.jsx)(u.Z,{children:"Github"}),(0,h.jsx)(O,{link:"https://doc.voce.chat/en-us/login-github.html"})]}),(0,h.jsx)("span",{className:"desc",children:"Allows members login with Github."})]}),(0,h.jsx)(y.Z,{onClick:D.bind(null,{github:!T}),"data-checked":T})]}),(0,h.jsxs)("div",{className:"row inputs",children:[(0,h.jsx)(x.Z,{disabled:!T,"data-key":"client_id",onChange:p,placeholder:"Github Client ID",value:null===a||void 0===a?void 0:a.client_id}),(0,h.jsx)(x.Z,{disabled:!T,"data-key":"client_secret",onChange:p,placeholder:"Github Client Secret",value:null===a||void 0===a?void 0:a.client_secret})]})]}),(0,h.jsx)("div",{className:"input",children:(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"title",children:[(0,h.jsxs)("div",{className:"txt",children:[(0,h.jsx)(u.Z,{children:"Metamask"}),(0,h.jsx)(O,{link:"https://doc.voce.chat/en-us/login-metamask.html"})]}),(0,h.jsx)("span",{className:"desc",children:"Allows members login with Metamask."})]}),(0,h.jsx)(y.Z,{onClick:D.bind(null,{metamask:!f}),"data-checked":f})]})}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)("div",{className:"row",children:(0,h.jsxs)("div",{className:"title",children:[(0,h.jsxs)("div",{className:"txt",children:[(0,h.jsx)(u.Z,{htmlFor:"desc",children:"OIDC"}),(0,h.jsx)(O,{link:"https://doc.voce.chat/en-us/login-webid.html"})]}),(0,h.jsx)("span",{className:"desc",children:"Save my login details for next time."})]})}),(0,h.jsx)("div",{className:"row",children:(0,h.jsx)(W,{issuers:E,onChange:e=>{M((i=>i?{...i,oidc:e}:i))}})})]})]}),z&&(0,h.jsx)(N.Z,{saveHandler:async()=>{const{google:i}=r;g&&d(r),i&&e&&(await t(),g||o.ZP.success("Configuration Updated!")),T&&l&&(await n(),g||o.ZP.success("Configuration Updated!"))},resetHandler:j})]})}function H(){const{values:e,toggleEnable:i,updateConfig:s,setValues:t,reset:a,changed:l}=(0,m.Z)("firebase"),n=e=>{const i=e.target.value,{type:s=""}=e.target.dataset;t((e=>e?{...e,[s]:i}:e))};if(!e)return null;const{token_url:c,project_id:r,private_key:o,client_email:d,enabled:M=!1}=e;return(0,h.jsxs)(_,{children:[(0,h.jsxs)("div",{className:"inputs",children:[(0,h.jsxs)("div",{className:"input row",children:[(0,h.jsx)(u.Z,{children:"Enable"}),(0,h.jsx)(y.Z,{onClick:i,"data-checked":M})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"name",children:"Token Url"}),(0,h.jsx)(x.Z,{disabled:!M,"data-type":"token_url",onChange:n,value:c||"https://oauth2.googleapis.com/token",name:"token_url",placeholder:"Token URL"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"desc",children:"Project ID"}),(0,h.jsx)(x.Z,{disabled:!M,"data-type":"project_id",onChange:n,value:r,name:"project_id",placeholder:"Project ID"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"desc",children:"Private Key"}),(0,h.jsx)(j.Z,{rows:10,disabled:!M,"data-type":"private_key",onChange:n,value:o,name:"private_key",placeholder:"Private key"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"desc",children:"Client Email"}),(0,h.jsx)(x.Z,{disabled:!M,"data-type":"client_email",onChange:n,value:d,name:"client_email",placeholder:"Client Email address"})]})]}),l&&(0,h.jsx)(N.Z,{saveHandler:()=>{s(e)},resetHandler:a})]})}const V=s.p+"static/media/question.f1e6b7aab95b0ab2de07.svg",J=r.ZP.div`
  display: flex;
  gap: 16px;
  white-space: nowrap;
  margin-top: 24px;
`;function X(){const[e,i]=(0,t.useState)(""),[s,{isSuccess:a,isError:l}]=(0,d.D$)(),{reset:n,updateConfig:c,values:r,setValues:M,changed:j,toggleEnable:g}=(0,m.Z)("smtp"),p=e=>{const i=e.target.value,{type:s=""}=e.target.dataset;M((e=>e?{...e,[s]:i}:e))};if((0,t.useEffect)((()=>{a&&o.ZP.success("Send Test Email Successfully"),l&&o.ZP.error("Send Test Email Fail")}),[a,l]),!r)return null;const{host:D,port:w,from:I,username:T,password:f,enabled:L=!1}=r;return(0,h.jsxs)(_,{children:[(0,h.jsxs)("div",{className:"inputs",children:[(0,h.jsxs)("div",{className:"input row",children:[(0,h.jsx)(u.Z,{children:"Enable"}),(0,h.jsx)(y.Z,{onClick:g,"data-checked":L})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"name",children:"Host"}),(0,h.jsx)(x.Z,{disabled:!L,"data-type":"host",onChange:p,value:D,name:"host",placeholder:"SMTP Host"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"desc",children:"Port"}),(0,h.jsx)(x.Z,{disabled:!L,type:"number","data-type":"port",onChange:p,value:w,name:"port",placeholder:"SMTP Port"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"desc",children:"From"}),(0,h.jsx)(x.Z,{disabled:!L,"data-type":"from",onChange:p,value:I,name:"from",placeholder:"SMTP From"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"desc",children:"Username"}),(0,h.jsx)(x.Z,{disabled:!L,"data-type":"username",onChange:p,value:T,name:"username",placeholder:"SMTP Username"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"desc",children:"Password"}),(0,h.jsx)(x.Z,{type:"password",disabled:!L,"data-type":"password",onChange:p,value:f,name:"password",placeholder:"SMTP Password"})]})]}),(0,h.jsxs)("div",{className:"tip",children:[(0,h.jsx)("img",{src:V,alt:"question icon"}),(0,h.jsx)("a",{href:"https://voce.chat/doc/smtp-setting",target:"_blank",className:"link",rel:"noreferrer",children:"How to set up SMTP?"})]}),(0,h.jsxs)(J,{children:[(0,h.jsx)(x.Z,{type:"email",disabled:!L,onChange:e=>{const s=e.target.value;i(s)},value:e,name:"email",placeholder:"test@email.com"}),(0,h.jsx)(Z.Z,{disabled:!L||!e,onClick:()=>{s({to:e,subject:"test title",content:"test content"})},children:"Send Test Email"})]}),j&&(0,h.jsx)(N.Z,{saveHandler:()=>{var e;c({...r,port:Number(null!==(e=null===r||void 0===r?void 0:r.port)&&void 0!==e?e:0)})},resetHandler:n})]})}const $=r.ZP.div`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid orange;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 250px;
  .tip {
    color: orange;
    font-size: 12px;
    line-height: 1.5;
  }
  .btns {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 14px;
  }
`,q=r.ZP.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  > .input {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    label {
      white-space: nowrap;
      font-size: 14px;
      color: #555;
    }
  }
  > .tip {
    font-size: 12px;
    color: #999;
    line-height: 1.5;
  }
`;function ee(){const{updateConfig:e,values:i}=(0,m.Z)("login"),{data:s}=(0,d.BL)(),[a,{data:l,isSuccess:n,isLoading:c}]=(0,d.gU)();(0,t.useEffect)((()=>{n&&((0,f.Bn)(),o.ZP.success("Update API Secret Successfully!"))}),[n]);const r=null===i||void 0===i?void 0:i.third_party;return(0,h.jsxs)(q,{children:[(0,h.jsx)(y.Z,{onClick:(s=>{e({...i,...s})}).bind(null,{third_party:!r}),"data-checked":r}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)("label",{htmlFor:"secret",children:"API Secure Key:"}),(0,h.jsx)(x.Z,{disabled:!r,type:"password",id:"secret",value:l||s})]}),(0,h.jsx)(T.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,h.jsxs)($,{children:[(0,h.jsx)("div",{className:"tip",children:"Are you sure to update API secret? Previous secret will be invalided"}),(0,h.jsxs)("div",{className:"btns",children:[(0,h.jsx)(Z.Z,{onClick:()=>(0,f.Bn)(),className:"cancel small",children:"Cancel"}),(0,h.jsx)(Z.Z,{disabled:c,className:"small danger",onClick:()=>a(),children:"Yes"})]})]}),children:(0,h.jsx)(Z.Z,{disabled:!r,children:"Update Secret"})}),(0,h.jsx)("div",{className:"tip",children:"Tip: The security key agreed between the server and the third-party app is used to encrypt the communication data."})]})}var ie=s(7699),se=s.n(ie),te=s(1892),ae=s(874),le=s(698),ne=s(308);const ce=e=>{let{closeModal:i}=e;const[s,{isLoading:a,isSuccess:l}]=(0,d.O2)(),[n,c]=(0,t.useState)(`${ne.kd[0].pid}|${ne.kd[0].limit}`);return(0,h.jsx)(ae.Z,{id:"modal-modal",children:(0,h.jsx)(le.Z,{title:"Renew License",description:"Please select the price",buttons:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Z.Z,{onClick:i,className:"ghost",children:"Cancel"}),(0,h.jsx)(Z.Z,{disabled:a||l,onClick:async()=>{const[e,i]=n.split("|"),t=await s({priceId:e,metadata:{user_limit:Number(i),expire:"2035-01-01",domain:location.hostname.startsWith("localhost")?"*":location.hostname},cancel_url:location.href,success_url:`${location.origin}/#/cb/payment_success`});"error"in t?o.ZP.error("Payment link initialized failed!"):location.href=t.data.session_url},className:"danger",children:a?"Initialize Payment Url":l?"Redirecting":"Renew"})]}),children:(0,h.jsx)(g.Z,{options:ne.kd.map((e=>{let{title:i,desc:s}=e;return`${i} [${s}]`})),values:ne.kd.map((e=>{let{pid:i,limit:s}=e;return`${i}|${s}`})),value:n,onChange:e=>{c(e)}})})})},re=r.ZP.div`
  max-width: 760px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  > .license {
    position: relative;
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    border: 2px solid #557d2340;
    background-color: #d1fadf60;
    display: flex;
    flex-direction: column;
    gap: 15px;
    &.outdated {
      border-color: #ef4444;
      background-color: #ef444457;
      &:after {
        content: "License Outdated";
        position: absolute;
        right: 10px;
        top: 10px;
        background-color: #ef4444;
        padding: 5px 4px;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        border-radius: 4px;
      }
    }
    .item {
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      line-height: 1.2;
      .label {
        font-size: 13px;
        color: #aaa;
        &:after {
          content: ":";
        }
      }
      .info {
        font-weight: bold;
        font-size: 18px;
        line-height: 1.4;
        &.value {
          cursor: pointer;
          width: 100%;
          white-space: pre-wrap;
          word-break: break-all;
          &.fold {
            white-space: inherit;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
`;function oe(){const{license:e,reachLimit:i}=(0,te.Z)(),[s,a]=(0,t.useState)(!1),l=()=>{a((e=>!e))};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(re,{children:[(0,h.jsxs)("div",{className:"license "+(i?"outdated":""),children:[(0,h.jsxs)("div",{className:"item",children:[(0,h.jsx)("span",{className:"label",children:"Signed"}),(0,h.jsx)("span",{className:"info",children:null!==e&&void 0!==e&&e.sign?"Yes":"Not Yet"})]}),(0,h.jsxs)("div",{className:"item",children:[(0,h.jsx)("span",{className:"label",children:"Domains"}),(0,h.jsx)("ul",{className:"info",children:null===e||void 0===e?void 0:e.domains.map((e=>(0,h.jsx)("li",{children:e},e)))})]}),(0,h.jsxs)("div",{className:"item",children:[(0,h.jsx)("span",{className:"label",children:"User Limit"}),(0,h.jsx)("span",{className:"info",children:99999==(null===e||void 0===e?void 0:e.user_limit)?"No Limit":null===e||void 0===e?void 0:e.user_limit})]}),(0,h.jsxs)("div",{className:"item",children:[(0,h.jsx)("span",{className:"label",children:"Expired At"}),(0,h.jsx)("span",{className:"info",children:se()(null===e||void 0===e?void 0:e.expired_at).format("YYYY-MM-DD h:mm:ss A")})]}),(0,h.jsxs)("div",{className:"item",children:[(0,h.jsx)("span",{className:"label",children:"Created At"}),(0,h.jsx)("span",{className:"info",children:se()(null===e||void 0===e?void 0:e.created_at).format("YYYY-MM-DD h:mm:ss A")})]}),(0,h.jsxs)("div",{className:"item",children:[(0,h.jsx)("span",{className:"label",children:"License Value"}),(0,h.jsx)("span",{className:"info value fold",title:"Click to see full text",onClick:e=>{const i=e.currentTarget;i.classList.toggle("fold"),i.classList.contains("fold")?i.title="Click to see full text":i.title="Click to fold text"},children:null===e||void 0===e?void 0:e.base58})]})]}),(0,h.jsx)(Z.Z,{onClick:()=>{l()},children:"Renew License"})]}),s&&(0,h.jsx)(ce,{closeModal:l})]})}var de=s(1205);const Me=r.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,xe=()=>{const{data:e}=(0,d.p5)();return(0,h.jsxs)(Me,{children:[(0,h.jsxs)("div",{className:"item",children:["Client Version: ","0.3.11"]}),(0,h.jsxs)("div",{className:"item",children:["Server Version: ",e]}),(0,h.jsxs)("div",{className:"item",children:["Build Timestamp: ","1666446020"]})]})};function ue(){const{changed:e,reset:i,values:s,setValues:t,toggleEnable:a,updateConfig:l}=(0,m.Z)("agora"),n=e=>{const i=e.target.value,{type:s=""}=e.target.dataset;t((e=>e?{...e,[s]:i}:e))};if(!s)return null;const{url:c,project_id:r,app_id:o,app_certificate:d,rtm_key:M,rtm_secret:g,enabled:p=!1}=s;return(0,h.jsxs)(_,{children:[(0,h.jsxs)("div",{className:"inputs",children:[(0,h.jsxs)("div",{className:"input row",children:[(0,h.jsx)(u.Z,{children:"Enable"}),(0,h.jsx)(y.Z,{onClick:a,"data-checked":p})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"url",children:"Agora Url"}),(0,h.jsx)(x.Z,{disabled:!p,"data-type":"url",onChange:n,value:c||"https://api.agora.io",name:"url",placeholder:"Agora URL"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"project_id",children:"Project ID"}),(0,h.jsx)(x.Z,{disabled:!p,"data-type":"project_id",onChange:n,value:r,name:"project_id",placeholder:"Project ID"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"app_id",children:"App ID"}),(0,h.jsx)(x.Z,{disabled:!p,"data-type":"app_id",onChange:n,value:o,name:"app_id",placeholder:"APP ID"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"app_certificate",children:"APP Certificate"}),(0,h.jsx)(x.Z,{disabled:!p,"data-type":"app_certificate",onChange:n,value:d,name:"app_certificate",placeholder:"APP Certificate"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"rtm_key",children:"RTM Key"}),(0,h.jsx)(j.Z,{disabled:!p,"data-type":"rtm_key",onChange:n,value:M,name:"rtm_key",placeholder:"RTM Key"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(u.Z,{htmlFor:"rtm_secret",children:"RTM Secret"}),(0,h.jsx)(j.Z,{disabled:!p,"data-type":"rtm_secret",onChange:n,value:g,name:"rtm_secret",placeholder:"RTM Secret"})]})]}),e&&(0,h.jsx)(N.Z,{saveHandler:()=>{l(s)},resetHandler:i})]})}const je=[{title:"General",items:[{name:"overview",title:"Overview",component:(0,h.jsx)(w,{})},{name:"members",title:"Members",component:(0,h.jsx)(de.Z,{}),admin:!0}]},{title:"User",items:[{name:"my_account",title:"My Account",component:(0,h.jsx)(c.Z,{})}]},{title:"Configuration",items:[{name:"firebase",title:"Firebase",component:(0,h.jsx)(H,{})},{name:"agora",title:"Agora",component:(0,h.jsx)(ue,{})},{name:"smtp",title:"SMTP",component:(0,h.jsx)(X,{})},{name:"social_login",title:"Login Methods",component:(0,h.jsx)(F,{})},{name:"api",title:"Third-party APP",component:(0,h.jsx)(ee,{})},{name:"license",title:"License",component:(0,h.jsx)(oe,{})}],admin:!0},{title:"About",items:[{name:"faq",title:"FAQ",component:(0,h.jsx)(xe,{})},{name:"terms",title:"Terms & Privacy",component:"Terms & Privacy"},{name:"feedback",title:"Feedback",component:"feedback"}]}],Ne=()=>{const e=(0,p.CG)((e=>e.authData.user));return je.filter((i=>!(null===e||void 0===e||!e.is_admin)||!i.admin))};var ge=s(4645),pe=s(4400);const me=(0,r.ZP)(le.Z)`
  .clear {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #6b7280;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .txt {
      cursor: pointer;
      color: orange;
      margin-right: 12px;
    }
    input {
      cursor: pointer;
    }
  }
`,he=e=>{let{closeModal:i}=e;const[s,a]=(0,t.useState)(!1),{logout:l,exited:n,exiting:c,clearLocalData:r}=(0,pe.Z)();return(0,t.useEffect)((()=>{n&&(s&&r(),o.ZP.success("Logout Successfully"))}),[n,s]),(0,h.jsx)(ae.Z,{id:"modal-modal",children:(0,h.jsx)(me,{title:"Log Out",description:"Are you sure want to log out this account?",buttons:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Z.Z,{onClick:i,children:"Cancel"}),(0,h.jsx)(Z.Z,{onClick:()=>{l()},className:"danger",children:c?"Logging out":"Log Out"})]}),children:(0,h.jsxs)("div",{className:"clear",children:[(0,h.jsx)("label",{htmlFor:"clear_cb",className:"txt",children:"Clear local data"}),(0,h.jsx)(ge.Z,{name:"clear_cb",checked:s,onChange:e=>{a(e.target.checked)}})]})})})};let De="";function we(){const[e]=(0,a.lr)(),i=Ne(),s=i.map((e=>{let{items:i}=e;return i})).flat(),c=e.get("nav"),[r,o]=(0,t.useState)(!1),d=(0,l.s0)();De=De||(e.get("f")||"/");const M=()=>{o((e=>!e))},x=s.find((e=>e.name==c))||s[0];return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(n.Z,{nav:x,closeModal:()=>{d(De),De=""},title:"Settings",navs:i,dangers:[{title:"Log Out",handler:M}],children:x.component}),r&&(0,h.jsx)(he,{closeModal:M})]})}}}]);