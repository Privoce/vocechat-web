"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[301],{746:(e,i,t)=>{t.d(i,{Z:()=>c});var s,a=t(7313);function n(){return n=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},n.apply(this,arguments)}const l=(e,i)=>{let{title:t,titleId:l,...c}=e;return a.createElement("svg",n({width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":l},c),t?a.createElement("title",{id:l},t):null,s||(s=a.createElement("path",{d:"M5 7.5L10 12.5L15 7.5",stroke:"#344054",strokeWidth:1.67,strokeLinecap:"round",strokeLinejoin:"round"})))},c=(0,a.forwardRef)(l)},552:(e,i,t)=>{t.d(i,{Z:()=>r});var s,a,n=t(7313);function l(){return l=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},l.apply(this,arguments)}const c=(e,i)=>{let{title:t,titleId:c,...r}=e;return n.createElement("svg",l({width:16,height:12,viewBox:"0 0 16 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":c},r),t?n.createElement("title",{id:c},t):null,s||(s=n.createElement("g",{clipPath:"url(#clip0_9046_23916)"},n.createElement("path",{d:"M4.93942 9.69781L1.62578 6.38648C1.25336 6.01431 0.651746 6.01431 0.27932 6.38648C-0.0931066 6.75865 -0.0931066 7.35984 0.27932 7.73201L4.27096 11.7209C4.64339 12.093 5.245 12.093 5.61743 11.7209L15.7207 1.62465C16.0931 1.25248 16.0931 0.651292 15.7207 0.279125C15.3483 -0.0930417 14.7466 -0.0930417 14.3742 0.279125L4.93942 9.69781Z",fill:"#78787C"}))),a||(a=n.createElement("defs",null,n.createElement("clipPath",{id:"clip0_9046_23916"},n.createElement("rect",{width:16,height:12,fill:"white"})))))},r=(0,n.forwardRef)(c)},7814:(e,i,t)=>{t.d(i,{Z:()=>o});var s=t(7313),a=t(9184),n=t(5536);const l=t.p+"static/media/upload.image.9f8c7fc90042d2ff4eb7.svg";var c=t(6417);const r=a.ZP.div`
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
    /* border: 1px solid #eee; */
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
`;function o(e){let{url:i="",name:t="",type:a="user",uploadImage:o,disabled:d=!1}=e;const[M,u]=(0,s.useState)(!1);return(0,c.jsxs)(r,{children:[(0,c.jsxs)("div",{className:"avatar",children:[(0,c.jsx)(n.Z,{type:a,url:i,name:t}),!d&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{className:"tip",children:M?"Uploading":"Change Avatar"}),(0,c.jsx)("input",{multiple:!1,onChange:async e=>{if(M)return;const[i]=e.target.files;u(!0),await o(i),u(!1)},type:"file",accept:"image/*",name:"avatar",id:"avatar"})]})]}),!d&&(0,c.jsx)("img",{src:l,alt:"icon",className:"icon"})]})}},11:(e,i,t)=>{t.d(i,{Z:()=>z});var s=t(7313),a=t(9184),n=t(2963),l=t(9784),c=t(3709),r=t(3657),o=t(6432),d=t(4527),M=t(8198),u=t(5120),x=t(3067),j=t(1296),N=t(6417);const g=a.ZP.div`
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
`;function p(){const{generating:e,link:i,linkCopied:t,copyLink:s,generateNewLink:a}=(0,u.Z)();return(0,N.jsxs)(g,{children:[(0,N.jsx)("span",{className:"tip",children:"Share this link to invite people to this server."}),(0,N.jsxs)("div",{className:"link",children:[(0,N.jsx)(x.Z,{readOnly:!0,className:"large",placeholder:"Generating",value:i}),(0,N.jsx)(j.Z,{onClick:s,className:"ghost small border_less",children:t?"Copied":"Copy"})]}),(0,N.jsx)("span",{className:"sub_tip",children:"Invite link expires in 7 days."}),(0,N.jsx)(j.Z,{className:"ghost",disabled:e,onClick:()=>{a()},children:e?"Generating":"Generate New Link"})]})}var m,D,h=t(169),w=t(8214);function I(){return I=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},I.apply(this,arguments)}const _=(e,i)=>{let{title:t,titleId:a,...n}=e;return s.createElement("svg",I({width:6,height:6,viewBox:"0 0 6 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":a},n),t?s.createElement("title",{id:a},t):null,m||(m=s.createElement("rect",{opacity:.01,width:6,height:6,fill:"#D8D8D8"})),D||(D=s.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.62506 1.64911C5.41795 1.4503 5.08216 1.45029 4.87506 1.64911L3.00003 3.44911L1.12506 1.64916C0.917951 1.45034 0.582164 1.45034 0.375057 1.64916C0.16795 1.84798 0.16795 2.17033 0.375057 2.36915L2.62506 4.52912C2.83217 4.72794 3.16795 4.72794 3.37506 4.52912C3.37665 4.5276 3.37822 4.52608 3.37977 4.52454L5.62506 2.36911C5.83216 2.17029 5.83216 1.84793 5.62506 1.64911Z",fill:"black",fillOpacity:.5})))},T=(0,s.forwardRef)(_);var y=t(552),f=t(7054);const L=a.ZP.section`
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
`;function z(e){var i;let{cid:t=null}=e;const{contacts:a,channels:u,loginUser:x}=(0,c.v9)((e=>({contacts:e.contacts,channels:e.channels,loginUser:e.contacts.byId[e.authData.uid]}))),{copyEmail:j,removeFromChannel:g,removeUser:m,canRemove:D,canRemoveFromChannel:I}=(0,f.Z)({cid:t}),[_,{isSuccess:z}]=(0,o.wv)();(0,s.useEffect)((()=>{z&&r.ZP.success("Update Successfully")}),[z]);const E=e=>{let{ignore:i=!1,uid:t=null,isAdmin:s=!0}=e;(0,l.Bn)(),i||_({id:t,is_admin:s})},O=null!==(i=u.byId[t])&&void 0!==i?i:null,b=O?O.is_public?a.ids:O.members:a.ids;return(0,N.jsxs)(L,{children:[(null===x||void 0===x?void 0:x.is_admin)&&(0,N.jsx)(p,{}),(0,N.jsxs)("div",{className:"intro",children:[(0,N.jsx)("h4",{className:"title",children:"Manage Members"}),(0,N.jsx)("p",{className:"desc",children:"Disabling your account means you can recover it at any time after taking this action."})]}),(0,N.jsx)("ul",{className:"members",children:b.map((e=>{const{name:i,email:s,is_admin:l}=a.byId[e],c=O&&O.owner==e,r=x.is_admin&&x.uid!==e,o=s||(null===x||void 0===x?void 0:x.is_admin);return(0,N.jsxs)("li",{className:"member",children:[(0,N.jsxs)("div",{className:"left",children:[(0,N.jsx)(d.Z,{compact:!0,uid:e,interactive:!1}),(0,N.jsxs)("div",{className:"info",children:[(0,N.jsxs)("span",{className:"name",children:[i," ",c&&(0,N.jsx)(w.Z,{})]}),(0,N.jsx)("span",{className:"email",children:s})]})]}),(0,N.jsxs)("div",{className:"right",children:[(0,N.jsxs)("span",{className:"role",children:[l?"Admin":"User",r&&(0,N.jsx)(n.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,N.jsxs)(M.Z,{className:"menu",children:[(0,N.jsxs)("li",{className:"item sb",onClick:E.bind(null,{ignore:l,uid:e,isAdmin:!0}),children:["Admin",l&&(0,N.jsx)(y.Z,{className:"icon"})]}),(0,N.jsxs)("li",{className:"item sb",onClick:E.bind(null,{ignore:!l,uid:e,isAdmin:!1}),children:["User",!l&&(0,N.jsx)(y.Z,{className:"icon"})]})]}),children:(0,N.jsx)(T,{className:"icon"})})]}),o&&(0,N.jsx)(n.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,N.jsxs)(M.Z,{className:"menu",children:[s&&(0,N.jsx)("li",{className:"item",onClick:j.bind(null,s),children:"Copy Email"}),I&&(0,N.jsx)("li",{className:"item danger",onClick:g.bind(null,e),children:"Remove From Channel"}),D&&!t&&(0,N.jsx)("li",{className:"item danger",onClick:m.bind(null,e),children:"Remove From Server"})]}),children:(0,N.jsx)("div",{className:"opts",children:(0,N.jsx)("img",{className:"dots",src:h,alt:"dots icon"})})})]})]},e)}))})]})}},6567:(e,i,t)=>{t.d(i,{Z:()=>l});var s=t(9184),a=t(6417);const n=s.ZP.div`
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
  /* gap: 20px; */
  border: 1px solid #e5e7eb;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
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
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 25px;
      &.reset {
        background: none;
        color: #667085;
        border: none;
        box-shadow: none;
      }
    }
  }
`;function l(e){let{saveHandler:i,resetHandler:t}=e;return(0,a.jsxs)(n,{className:"animate__animated animate__flipInX animate__faster",children:[(0,a.jsx)("span",{className:"txt",children:"You have unsaved changes!"}),(0,a.jsxs)("div",{className:"btns",children:[(0,a.jsx)("button",{className:"btn reset",onClick:t,children:"Reset"}),(0,a.jsx)("button",{className:"btn",onClick:i,children:"Save Changes"})]})]})}},1129:(e,i,t)=>{t.d(i,{Z:()=>o});var s=t(9184),a=t(9466),n=t(7890);const l=t.p+"static/media/arrow.left.92fbb139607631555459.svg";var c=t(6417);const r=s.ZP.div`
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
      background: url(${l});
      background-size: 16px;
      background-repeat: no-repeat;
      background-position: left;
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
    /* max-height: -webkit-fill-available; */
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
`;function o(e){let{closeModal:i,title:t="Settings",navs:s=[],dangers:l=[],nav:o,children:d}=e;const{pathname:M}=(0,n.TH)();return(0,c.jsxs)(r,{children:[(0,c.jsxs)("div",{className:"left",children:[(0,c.jsx)("h2",{onClick:i,className:"title",children:t}),s.map((e=>{let{title:i,items:t}=e;return(0,c.jsx)("ul",{"data-title":i,className:"items",children:t.map((e=>{let{name:i,title:t}=e;return(0,c.jsx)("li",{className:"item "+(i==(null===o||void 0===o?void 0:o.name)?"curr":""),children:(0,c.jsx)(a.OL,{to:`${M}?nav=${i}`,children:t})},i)}))},i)})),l.length?(0,c.jsx)("ul",{className:"items danger",children:l.map((e=>{if(!e)return null;const{title:i,handler:t}=e;return(0,c.jsx)("li",{onClick:t,className:"item",children:i},i)}))}):null]}),(0,c.jsxs)("div",{className:"right",children:[o&&(0,c.jsx)("h4",{className:"title",children:o.title}),d]})]})}},1707:(e,i,t)=>{t.d(i,{Z:()=>s});const s=t(9184).ZP.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
`},5874:(e,i,t)=>{t.d(i,{Z:()=>o});var s=t(7313),a=t(9184),n=t(6417);const l=a.ZP.form`
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
`,c={},r={};function o(e){let{options:i,values:t=r,value:a=c,defaultValue:o,onChange:d}=e;const M=(0,s.useId)(),[u,x]=(0,s.useState)(o),j=a!==c?a:u;return(0,n.jsx)(l,{children:i.map(((e,i)=>(0,n.jsxs)("div",{className:"option",children:[(0,n.jsx)("input",{type:"radio",checked:(t!==r?t.indexOf(j):j)===i,onChange:()=>{const e=t===r?i:t[i];a===c&&x(e),d&&d(e)},id:`${M}-${i}`}),(0,n.jsx)("div",{className:"box",children:(0,n.jsx)("label",{htmlFor:`${M}-${i}`,children:e})})]},i)))})}},4155:(e,i,t)=>{t.d(i,{Z:()=>s});const s=t(9184).ZP.textarea`
  font-family: inherit;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
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
`},3656:(e,i,t)=>{t.d(i,{Z:()=>n});var s=t(7313),a=t(4695);function n(){const[e,i]=(0,s.useState)(!1),[t,n]=(0,s.useState)({}),{data:l}=(0,a.R)(void 0,{refetchOnMountOrArgChange:!0}),[c,{isSuccess:r}]=(0,a.Ku)();(0,s.useEffect)((()=>{l&&n(l)}),[l]),(0,s.useEffect)((()=>{i(!r&&JSON.stringify(l)!==JSON.stringify(t))}),[l,t,r]);return{config:t,changed:e,updateGithubAuthConfig:e=>{n((i=>({...i,...e})))},updateGithubAuthConfigToServer:async()=>{await c(t)},isSuccess:r}}},8536:(e,i,t)=>{t.d(i,{Z:()=>n});var s=t(7313),a=t(4695);function n(){const[e,i]=(0,s.useState)(!1),[t,n]=(0,s.useState)(""),{data:l}=(0,a.eM)(void 0,{refetchOnMountOrArgChange:!0}),[c,{isSuccess:r}]=(0,a.Qg)();(0,s.useEffect)((()=>{l&&n(l.client_id)}),[l]),(0,s.useEffect)((()=>{i(!r&&(null===l||void 0===l?void 0:l.client_id)!==t)}),[l,t,r]);return{config:l,changed:e,clientId:t,updateClientId:n,updateClientIdToServer:async()=>{t&&await c({client_id:t})},updateGoogleAuthConfig:c,isSuccess:r}}},4706:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>MyAccount});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7313),styled_components__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(9184),react_redux__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3709),react_hot_toast__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(3657),_app_services_contact__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6432),_common_component_AvatarUploader__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(7814),_ProfileBasicEditModal__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(2631),_UpdatePasswordModal__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(9862),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(6417);const StyledWrapper=styled_components__WEBPACK_IMPORTED_MODULE_7__.ZP.div`
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
`,EditModalInfo={name:{label:"Username",title:"Change your username",intro:"Enter a new username."},email:{label:"Email",title:"Change your email",intro:"Enter a new email."}};function MyAccount(){const[passwordModal,setPasswordModal]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[editModal,setEditModal]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[uploadAvatar,{isSuccess:uploadSuccess}]=(0,_app_services_contact__WEBPACK_IMPORTED_MODULE_2__.C0)(),loginUser=(0,react_redux__WEBPACK_IMPORTED_MODULE_1__.v9)((e=>e.contacts.byId[e.authData.uid]));(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{uploadSuccess&&react_hot_toast__WEBPACK_IMPORTED_MODULE_8__.ZP.success("update avatar successfully!")}),[uploadSuccess]);const handleBasicEdit=e=>{const{edit:i}=e.target.dataset;setEditModal(i)},closeBasicEditModal=()=>{setEditModal(null)},togglePasswordModal=()=>{setPasswordModal((e=>!e))};if(!loginUser)return null;const{uid:uid,avatar:avatar,name:name,email:email}=loginUser;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(StyledWrapper,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"card",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_common_component_AvatarUploader__WEBPACK_IMPORTED_MODULE_3__.Z,{url:avatar,name:name,uploadImage:uploadAvatar}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"name",children:[name," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span",{className:"uid",children:["#",uid]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{className:"label",children:"username"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span",{className:"txt",children:[name," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span",{className:"gray",children:[" #",uid]})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button",{"data-edit":"name",onClick:handleBasicEdit,className:"btn",children:"Edit"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{className:"label",children:"email"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{className:"txt",children:email})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button",{"data-edit":"email",onClick:handleBasicEdit,className:"btn",children:"Edit"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{className:"label",children:"password"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{className:"txt",children:"*********"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button",{onClick:togglePasswordModal,className:"btn",children:"Edit"})]})]}),1!=uid&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"danger",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h4",{className:"head",children:"Account Removal"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"desc",children:"Disabling your account means you can recover it at any time after taking this action."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button",{className:"btn",children:"Delete Account"})]})]}),editModal&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ProfileBasicEditModal__WEBPACK_IMPORTED_MODULE_4__.Z,{valueKey:editModal,...EditModalInfo[editModal],value:eval(editModal),closeModal:closeBasicEditModal}),passwordModal&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_UpdatePasswordModal__WEBPACK_IMPORTED_MODULE_5__.Z,{closeModal:togglePasswordModal})]})}},2631:(e,i,t)=>{t.d(i,{Z:()=>x});var s=t(7313),a=t(9184),n=t(3067),l=t(6432),c=t(5845),r=t(1296),o=t(5607),d=t(3657),M=t(6417);const u=(0,a.ZP)(c.Z)`
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
`;function x(e){let{label:i="Username",valueKey:t="name",value:a="",title:c="Change your username",intro:x="Enter a new username and your existing password.",closeModal:j}=e;const[N,g]=(0,s.useState)(a),[p,{isLoading:m,isSuccess:D}]=(0,l.g$)();return(0,s.useEffect)((()=>{D&&(d.ZP.success("update user info successfully"),j())}),[D]),(0,M.jsx)(o.Z,{id:"modal-modal",children:(0,M.jsx)(u,{title:c,description:x,buttons:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(r.Z,{className:"cancel",onClick:j,children:"Cancel"}),(0,M.jsx)(r.Z,{onClick:()=>{p({[t]:N})},children:m?"Updating":"Done"})]}),children:(0,M.jsxs)("div",{className:"input",children:[(0,M.jsx)("label",{htmlFor:t,children:i}),(0,M.jsx)(n.Z,{name:t,value:N,onChange:e=>{g(e.target.value)}})]})})})}},9862:(e,i,t)=>{t.d(i,{Z:()=>x});var s=t(7313),a=t(9184),n=t(3067),l=t(1864),c=t(5845),r=t(1296),o=t(5607),d=t(3657),M=t(6417);const u=(0,a.ZP)(c.Z)`
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
`;function x(e){let{closeModal:i}=e;const{data:t}=(0,l.I1)(),[a,c]=(0,s.useState)({current:"",newPassword:"",confirmPassword:""}),[x,{isLoading:j,isSuccess:N}]=(0,l.a3)(),g=e=>{const{type:i}=e.target.dataset;c((t=>({...t,[i]:e.target.value})))};(0,s.useEffect)((()=>{N&&(d.ZP.success("update password successfully"),i())}),[N]);const{current:p,newPassword:m,confirmPassword:D}=a,h=(null===t||void 0===t?void 0:t.password)&&!p||!m||!D||m!==D||j;return(0,M.jsx)(o.Z,{id:"modal-modal",children:(0,M.jsxs)(u,{title:"Change your password",description:"Enter current password and new password.",buttons:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(r.Z,{className:"cancel",onClick:i,children:"Cancel"}),(0,M.jsx)(r.Z,{disabled:h,onClick:()=>{const{current:e,newPassword:i}=a;x({old_password:e,new_password:i})},children:j?"Updating":"Update"})]}),children:[(null===t||void 0===t?void 0:t.password)&&(0,M.jsxs)("div",{className:"input",children:[(0,M.jsx)("label",{htmlFor:"current",children:"Current Password"}),(0,M.jsx)(n.Z,{type:"password",id:"current",name:"current",value:p,"data-type":"current",onChange:g})]}),(0,M.jsxs)("div",{className:"input",children:[(0,M.jsx)("label",{htmlFor:"newPassword",children:"New Password"}),(0,M.jsx)(n.Z,{type:"password",name:"newPassword",value:m,"data-type":"newPassword",onChange:g})]}),(0,M.jsxs)("div",{className:"input",children:[(0,M.jsx)("label",{htmlFor:"confirmPassword",children:"Confirm New Password"}),(0,M.jsx)(n.Z,{onBlur:()=>{const{newPassword:e,confirmPassword:i}=a;e!==i&&d.ZP.error("Not same with new password")},type:"password",name:"confirmPassword",value:D,"data-type":"confirmPassword",onChange:g})]})]})})}},3168:(e,i,t)=>{t.r(i),t.d(i,{default:()=>Ne});var s=t(7313),a=t(9466),n=t(7890),l=t(1129),c=t(3709),r=t(4706),o=t(9184),d=t(4695),M=t(7814),u=t(3067),x=t(1707),j=t(4155),N=t(6567),g=t(3657),p=t(5874),m=t(6417);const D=o.ZP.div`
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
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;
      }
    }
  }

  .inputs {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;

    .input {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    > .radioButton {
      > .label {
        margin-top: 64px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
      }

      > .tip {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #667085;
      }

      > form {
        margin-top: 16px;
        width: 512px;
      }
    }
  }
`;function h(){const e=(0,c.v9)((e=>e.contacts.byId[e.authData.uid])),[i,t]=(0,s.useState)(!1),[a,n]=(0,s.useState)(null),[l,r]=(0,s.useState)(null),{data:o,refetch:h}=(0,d.z3)(),{data:w,refetch:I}=(0,d.ww)(),[_,{isSuccess:T}]=(0,d.e2)(),[y,{isSuccess:f}]=(0,d.jd)(),[L,{isSuccess:z}]=(0,d.QP)(),E=e=>{const i=e.target.value,{type:t}=e.target.dataset;n((e=>({...e,[t]:i})))};if((0,s.useEffect)((()=>{f&&(g.ZP.success("Update logo successfully!"),h())}),[f]),(0,s.useEffect)((()=>{o&&n(o)}),[o]),(0,s.useEffect)((()=>{w&&r(w)}),[w]),(0,s.useEffect)((()=>{if(o&&a&&w&&l){const{name:e,description:i}=a,{name:s,description:n}=o,{who_can_sign_up:c}=l,{who_can_sign_up:r}=w;t(s!==e||n!==i||r!==c)}}),[o,a,w,l]),(0,s.useEffect)((()=>{T&&z&&(g.ZP.success("Configuration updated!"),h(),I())}),[T,z]),!a||!l)return null;const{name:O,description:b,logo:v}=a,{who_can_sign_up:C}=l,A=null===e||void 0===e?void 0:e.is_admin;return(0,m.jsxs)(D,{children:[(0,m.jsxs)("div",{className:"logo",children:[(0,m.jsx)("div",{className:"preview",children:(0,m.jsx)(M.Z,{disabled:!A,url:f?`${v}?t=${+new Date}`:v,name:O,uploadImage:y})}),A&&(0,m.jsx)("div",{className:"upload",children:(0,m.jsx)("div",{className:"tip",children:"Minimum size is 128x128, We recommend at least 512x512 for the server. Max size limited to 5M."})})]}),(0,m.jsxs)("div",{className:"inputs",children:[(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"name",children:"Server Name"}),(0,m.jsx)(u.Z,{disabled:!A,"data-type":"name",onChange:E,value:O,name:"name",id:"name",placeholder:"Server Name"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"desc",children:"Server Description"}),(0,m.jsx)(j.Z,{disabled:!A,"data-type":"description",onChange:E,value:null!==b&&void 0!==b?b:"",rows:4,name:"name",id:"name",placeholder:"Tell the world a bit about this server"})]}),A&&(0,m.jsxs)("div",{className:"radioButton",children:[(0,m.jsx)("p",{className:"label",children:"Default Sign Up"}),(0,m.jsx)("p",{className:"tip",children:"Who can sign up this server."}),(0,m.jsx)(p.Z,{options:["Everyone","Invitation Link Only"],values:["EveryOne","InvitationOnly"],value:C,onChange:e=>r({...w,who_can_sign_up:e})})]})]}),i&&(0,m.jsx)(N.Z,{saveHandler:()=>{const{name:e,description:i}=a;_({name:e,description:i}),L({...w,who_can_sign_up:l.who_can_sign_up})},resetHandler:()=>{n(o),r(w)}})]})}const w=o.ZP.div`
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
`,I=o.ZP.div`
  cursor: pointer;
  position: relative;
  width: 44px;
  height: 24px;
  background-color: #1fe1f9;
  border-radius: 12px;
  transition: all 0.2s ease-in;
  &:after {
    border-radius: 50%;
    background-color: #fff;
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 2px;
    right: 2px;
    transition: all 0.4s ease;
  }
  &[data-checked="false"] {
    background-color: #f2f4f7;
    &:after {
      transform: translateX(-100%);
    }
  }
  &[data-disabled="true"] {
    cursor: not-allowed;
    background-color: #ccc;
    pointer-events: none;
  }
`;var _,T=t(4263),y=t(2963),f=t(9784);function L(){return L=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},L.apply(this,arguments)}const z=(e,i)=>{let{title:t,titleId:a,...n}=e;return s.createElement("svg",L({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":a},n),t?s.createElement("title",{id:a},t):null,_||(_=s.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M14.4 7.99961C14.4 9.69699 13.7257 11.3249 12.5255 12.5251C11.3252 13.7253 9.69736 14.3996 7.99998 14.3996C6.30259 14.3996 4.67472 13.7253 3.47449 12.5251C2.27426 11.3249 1.59998 9.69699 1.59998 7.99961C1.59998 6.30222 2.27426 4.67436 3.47449 3.47413C4.67472 2.27389 6.30259 1.59961 7.99998 1.59961C9.69736 1.59961 11.3252 2.27389 12.5255 3.47413C13.7257 4.67436 14.4 6.30222 14.4 7.99961ZM7.99998 5.59961C7.85941 5.59947 7.7213 5.63637 7.59953 5.70659C7.47777 5.77682 7.37666 5.87788 7.30638 5.99961C7.25563 6.09391 7.18646 6.17706 7.10298 6.24414C7.0195 6.31121 6.92341 6.36084 6.82039 6.39009C6.71737 6.41934 6.60953 6.4276 6.50326 6.4144C6.39699 6.40119 6.29445 6.36679 6.20172 6.31322C6.109 6.25965 6.02797 6.18801 5.96344 6.10254C5.89891 6.01708 5.8522 5.91953 5.82608 5.81568C5.79995 5.71182 5.79494 5.60378 5.81135 5.49796C5.82775 5.39213 5.86523 5.29068 5.92158 5.19961C6.18575 4.7421 6.5935 4.38454 7.0816 4.18238C7.56969 3.98022 8.11085 3.94476 8.62115 4.0815C9.13145 4.21823 9.58237 4.51952 9.90399 4.93865C10.2256 5.35777 10.4 5.87131 10.4 6.39961C10.4001 6.8961 10.2463 7.38043 9.95978 7.78589C9.67324 8.19135 9.26803 8.498 8.79998 8.66361V8.79961C8.79998 9.01178 8.71569 9.21527 8.56566 9.36529C8.41563 9.51532 8.21215 9.59961 7.99998 9.59961C7.7878 9.59961 7.58432 9.51532 7.43429 9.36529C7.28426 9.21527 7.19998 9.01178 7.19998 8.79961V7.99961C7.19998 7.78744 7.28426 7.58395 7.43429 7.43392C7.58432 7.28389 7.7878 7.19961 7.99998 7.19961C8.21215 7.19961 8.41563 7.11532 8.56566 6.96529C8.71569 6.81527 8.79998 6.61178 8.79998 6.39961C8.79998 6.18744 8.71569 5.98395 8.56566 5.83392C8.41563 5.68389 8.21215 5.59961 7.99998 5.59961ZM7.99998 11.9996C8.21215 11.9996 8.41563 11.9153 8.56566 11.7653C8.71569 11.6153 8.79998 11.4118 8.79998 11.1996C8.79998 10.9874 8.71569 10.784 8.56566 10.6339C8.41563 10.4839 8.21215 10.3996 7.99998 10.3996C7.7878 10.3996 7.58432 10.4839 7.43429 10.6339C7.28426 10.784 7.19998 10.9874 7.19998 11.1996C7.19998 11.4118 7.28426 11.6153 7.43429 11.7653C7.58432 11.9153 7.7878 11.9996 7.99998 11.9996Z",fill:"#9CA3AF"})))},E=(0,s.forwardRef)(z),O=o.ZP.div`
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
`;function b(e){let{link:i="#"}=e;return(0,m.jsx)(y.ZP,{delay:[0,500],interactive:!0,arrow:f.ki,placement:"bottom",content:(0,m.jsxs)(O,{children:["Need more detail? See our"," ",(0,m.jsx)("a",{target:"doc",href:i,children:"doc"}),"."]}),children:(0,m.jsx)(E,{className:"icon"})})}var v=t(552),C=t(746),A=t(8198);const k=o.ZP.div`
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
`,U={};function S(e){var i;let{options:t=[],updateSelect:a=null,current:n=U}=e;const[l,c]=(0,s.useState)(!1),[r,o]=(0,s.useState)(void 0),d=()=>{c((e=>!e))},M=e=>{o(e),d(),a&&a(e)};return(0,m.jsx)(y.ZP,{visible:l,appendTo:document.body,placement:"bottom",interactive:!0,content:(0,m.jsx)(A.Z,{children:t.map((e=>{let{title:i,value:t,selected:s,underline:a}=e;return(0,m.jsxs)("li",{onClick:s?null:M.bind(null,{title:i,value:t}),className:"item sb "+(a?"underline":""),"data-disabled":s,children:[i,s&&(0,m.jsx)(v.Z,{className:"icon"})]},t)}))}),children:(0,m.jsxs)(k,{onClick:d,children:[(0,m.jsx)("span",{className:"txt",children:(null===(i=n!==U?n:r)||void 0===i?void 0:i.title)||"Select"}),(0,m.jsx)(C.Z,{className:"icon"})]})})}var P=t(1296);const Z=JSON.parse('[{"title":"Google","value":"accounts.google.com","selected":false,"icon":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE1OTA1XzI0Njk1KSI+CjxwYXRoIGQ9Ik0yMy43NjYgMTIuMjc2M0MyMy43NjYgMTEuNDYwNSAyMy42OTk5IDEwLjY0MDQgMjMuNTU4OCA5LjgzNzg5SDEyLjI0VjE0LjQ1ODlIMTguNzIxN0MxOC40NTI4IDE1Ljk0OTIgMTcuNTg4NSAxNy4yNjc2IDE2LjMyMyAxOC4xMDU0VjIxLjEwMzdIMjAuMTlDMjIuNDYwOCAxOS4wMTM3IDIzLjc2NiAxNS45MjcyIDIzLjc2NiAxMi4yNzYzWiIgZmlsbD0iIzQyODVGNCIvPgo8cGF0aCBkPSJNMTIuMjQwMSAyNC4wMDEzQzE1LjQ3NjYgMjQuMDAxMyAxOC4yMDU5IDIyLjkzODcgMjAuMTk0NSAyMS4xMDQ0TDE2LjMyNzYgMTguMTA2QzE1LjI1MTcgMTguODM4IDEzLjg2MjcgMTkuMjUyNSAxMi4yNDQ1IDE5LjI1MjVDOS4xMTM4OCAxOS4yNTI1IDYuNDU5NDYgMTcuMTQwNCA1LjUwNzA1IDE0LjMwMDhIMS41MTY2VjE3LjM5MTdDMy41NTM3MSAyMS40NDM5IDcuNzAyOSAyNC4wMDEzIDEyLjI0MDEgMjQuMDAxM1oiIGZpbGw9IiMzNEE4NTMiLz4KPHBhdGggZD0iTTUuNTAyNTMgMTQuMzAwN0M0Ljk5OTg3IDEyLjgxMDMgNC45OTk4NyAxMS4xOTY1IDUuNTAyNTMgOS43MDYxOFY2LjYxNTIzSDEuNTE2NDlDLTAuMTg1NTEgMTAuMDA2IC0wLjE4NTUxIDE0LjAwMDkgMS41MTY0OSAxNy4zOTE2TDUuNTAyNTMgMTQuMzAwN1oiIGZpbGw9IiNGQkJDMDQiLz4KPHBhdGggZD0iTTEyLjI0MDEgNC43NDk2NkMxMy45NTA5IDQuNzIzMiAxNS42MDQ0IDUuMzY2OTcgMTYuODQzNCA2LjU0ODY3TDIwLjI2OTUgMy4xMjI2MkMxOC4xMDAxIDEuMDg1NSAxNS4yMjA4IC0wLjAzNDQ2NiAxMi4yNDAxIDAuMDAwODA4NjY2QzcuNzAyOSAwLjAwMDgwODY2NiAzLjU1MzcxIDIuNTU4MjIgMS41MTY2IDYuNjE0ODFMNS41MDI2NCA5LjcwNTc1QzYuNDUwNjQgNi44NjE3MyA5LjEwOTQ3IDQuNzQ5NjYgMTIuMjQwMSA0Ljc0OTY2WiIgZmlsbD0iI0VBNDMzNSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE1OTA1XzI0Njk1Ij4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="},{"title":"Facebook","value":"www.facebook.com","selected":false,"icon":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAxNkMzMiA3LjE2NDEzIDI0LjgzNTggMCAxNiAwQzcuMTY0MTMgMCAwIDcuMTY0MTMgMCAxNkMwIDIzLjk4NTMgNS44NTAxNiAzMC42MDQ5IDEzLjUwMDIgMzEuODA2N1YyMC42MjYxSDkuNDM2NjRWMTZIMTMuNTAwMlYxMi40NzQyQzEzLjUwMDIgOC40NjQ1NiAxNS44ODk4IDYuMjQ4MjkgMTkuNTQzOCA2LjI0ODI5QzIxLjI5NDMgNi4yNDgyOSAyMy4xMjU4IDYuNTYxMDIgMjMuMTI1OCA2LjU2MTAyVjEwLjQ5ODZIMjEuMTA3NUMxOS4xMjA4IDEwLjQ5ODYgMTguNDk5OCAxMS43MzE3IDE4LjQ5OTggMTIuOTk4NFYxNS45OTk5SDIyLjkzNjdMMjIuMjI4IDIwLjYyNkgxOC40OTk2VjMxLjgwNjRDMjYuMTQ5OCAzMC42MDcxIDMxLjk5OTggMjMuOTg3NiAzMS45OTk4IDE1Ljk5OTlMMzIgMTZaIiBmaWxsPSIjMTk3N0YzIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIuMjI4IDIwLjYyNkwyMi45MzY5IDE1Ljk5OTlIMTguNDk5OVYxMi45OTg0QzE4LjQ5OTkgMTEuNzMzOSAxOS4xMTg2IDEwLjQ5ODcgMjEuMTA3NyAxMC40OTg3SDIzLjEyNlY2LjU2MTA1QzIzLjEyNiA2LjU2MTA1IDIxLjI5NDUgNi4yNDgyOSAxOS41NDM5IDYuMjQ4MjlDMTUuODg5OSA2LjI0ODI5IDEzLjUwMDQgOC40NjIzOCAxMy41MDA0IDEyLjQ3NDJWMTZIOS40MzY3N1YyMC42MjYxSDEzLjUwMDRWMzEuODA2N0MxNC4zMTQ5IDMxLjkzNDcgMTUuMTQ5NiAzMiAxNi4wMDAxIDMyQzE2Ljg1MDcgMzIgMTcuNjg1NCAzMS45MzI1IDE4LjQ5OTkgMzEuODA2N1YyMC42MjYxSDIyLjIyODJMMjIuMjI4IDIwLjYyNloiIGZpbGw9IiNGRUZFRkUiLz4KPC9zdmc+Cg=="},{"title":"Gitlab","value":"www.gitlab.com","selected":false,"icon":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODAgMzgwIj4KPGRlZnM+CiAgICA8c3R5bGU+LmNscy0xe2ZpbGw6I2UyNDMyOTt9LmNscy0ye2ZpbGw6I2ZjNmQyNjt9LmNscy0ze2ZpbGw6I2ZjYTMyNjt9PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJMT0dPIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yODIuODMsMTcwLjczbC0uMjctLjY5LTI2LjE0LTY4LjIyYTYuODEsNi44MSwwLDAsMC0yLjY5LTMuMjQsNyw3LDAsMCwwLTgsLjQzLDcsNywwLDAsMC0yLjMyLDMuNTJsLTE3LjY1LDU0SDE1NC4yOWwtMTcuNjUtNTRBNi44Niw2Ljg2LDAsMCwwLDEzNC4zMiw5OWE3LDcsMCwwLDAtOC0uNDMsNi44Nyw2Ljg3LDAsMCwwLTIuNjksMy4yNEw5Ny40NCwxNzBsLS4yNi42OWE0OC41NCw0OC41NCwwLDAsMCwxNi4xLDU2LjFsLjA5LjA3LjI0LjE3LDM5LjgyLDI5LjgyLDE5LjcsMTQuOTEsMTIsOS4wNmE4LjA3LDguMDcsMCwwLDAsOS43NiwwbDEyLTkuMDYsMTkuNy0xNC45MSw0MC4wNi0zMCwuMS0uMDhBNDguNTYsNDguNTYsMCwwLDAsMjgyLjgzLDE3MC43M1oiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yODIuODMsMTcwLjczbC0uMjctLjY5YTg4LjMsODguMywwLDAsMC0zNS4xNSwxNS44TDE5MCwyMjkuMjVjMTkuNTUsMTQuNzksMzYuNTcsMjcuNjQsMzYuNTcsMjcuNjRsNDAuMDYtMzAsLjEtLjA4QTQ4LjU2LDQ4LjU2LDAsMCwwLDI4Mi44MywxNzAuNzNaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNMTUzLjQzLDI1Ni44OWwxOS43LDE0LjkxLDEyLDkuMDZhOC4wNyw4LjA3LDAsMCwwLDkuNzYsMGwxMi05LjA2LDE5LjctMTQuOTFTMjA5LjU1LDI0NCwxOTAsMjI5LjI1QzE3MC40NSwyNDQsMTUzLjQzLDI1Ni44OSwxNTMuNDMsMjU2Ljg5WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTEzMi41OCwxODUuODRBODguMTksODguMTksMCwwLDAsOTcuNDQsMTcwbC0uMjYuNjlhNDguNTQsNDguNTQsMCwwLDAsMTYuMSw1Ni4xbC4wOS4wNy4yNC4xNywzOS44MiwyOS44MnMxNy0xMi44NSwzNi41Ny0yNy42NFoiLz48L2c+PC9zdmc+"},{"title":"Paypal","value":"www.paypal.com","selected":false,"icon":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjMwMnB4IiB2aWV3Qm94PSIwIDAgMjU2IDMwMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+Cgk8Zz4KCQk8cGF0aCBkPSJNMjE3LjE2ODQ3NiwyMy41MDcwMTQ2IEMyMDMuMjM0MDc3LDcuNjI0Nzk2NTEgMTc4LjA0NTYxMiwwLjgxNTc1MzMzOCAxNDUuODIzMzU1LDAuODE1NzUzMzM4IEw1Mi4zMDMwNjE5LDAuODE1NzUzMzM4IEM0NS43MTA0NDMxLDAuODE1NzUzMzM4IDQwLjEwODM4MTksNS42MTAzODUyIDM5LjA3NjIwNDIsMTIuMTExNDM5OSBMMC4xMzY0NjgzMDIsMjU5LjA3NjYwMSBDLTAuNjM3NjY0OTY4LDI2My45NDYxNDkgMy4xMzMxMTMyMiwyNjguMzU3ODc2IDguMDY5MjUzMzEsMjY4LjM1Nzg3NiBMNjUuODA0NjEyLDI2OC4zNTc4NzYgTDgwLjMwNTA0MzgsMTc2LjM4NTg0OSBMNzkuODU1NTQ3MSwxNzkuMjY1OTU4IEM4MC44ODc3MjQ4LDE3Mi43NjQ5MDMgODYuNDQ4MTY1OSwxNjcuOTcwMjcyIDkzLjAzMjQ2MDcsMTY3Ljk3MDI3MiBMMTIwLjQ2ODQxLDE2Ny45NzAyNzIgQzE3NC4zNjYzOTgsMTY3Ljk3MDI3MiAyMTYuNTY5MTQ3LDE0Ni4wNzgxMTYgMjI4Ljg5NzAxMiw4Mi43NDkwMTk3IEMyMjkuMjYzMjY4LDgwLjg3NjExNjcgMjI5LjU3OTU4MSw3OS4wNTMxNTc3IDIyOS44NTQyNzMsNzcuMjcxODE4OCBDMjI4LjI5NzY4Myw3Ni40NDc3NDE0IDIyOC4yOTc2ODMsNzYuNDQ3NzQxNCAyMjkuODU0MjczLDc3LjI3MTgxODggQzIzMy41MjUxNjMsNTMuODY0NjkyNCAyMjkuODI5MzAxLDM3LjkzMjUzMDIgMjE3LjE2ODQ3NiwyMy41MDcwMTQ2IiBmaWxsPSIjMjczNDZBIj48L3BhdGg+CgkJPHBhdGggZD0iTTEwMi4zOTY5NzYsNjguODM5NTkyOSBDMTAzLjkzNjkxOSw2OC4xMDcwNzk3IDEwNS42NTE2NjUsNjcuNjk5MjAzIDEwNy40NDk2NTIsNjcuNjk5MjAzIEwxODAuNzY3NTY1LDY3LjY5OTIwMyBDMTg5LjQ0OTUxMSw2Ny42OTkyMDMgMTk3LjU0ODc3Niw2OC4yNjUyMzYgMjA0Ljk0ODgyNCw2OS40NTU1Njk5IEMyMDcuMDcxNDQ4LDY5Ljc5Njg1NDUgMjA5LjEyNzQ3OSw3MC4xODgwODMxIDIxMS4xMjUyNDIsNzAuNjM3NTc5OSBDMjEzLjEyMzAwNiw3MS4wNzg3NTI2IDIxNS4wNjI1MDEsNzEuNTc4MTkzNCAyMTYuOTQzNzI4LDcyLjEyNzU3ODMgQzIxNy44ODQzNDEsNzIuNDAyMjcwOCAyMTguODA4MzA3LDcyLjY4NTI4NzIgMjE5LjcxNTYyNCw3Mi45ODQ5NTE3IEMyMjMuMzUzMjE4LDc0LjIwMDI1NzcgMjI2Ljc0MTA5Miw3NS42MTUzNCAyMjkuODU0MjczLDc3LjI3MTgxODggQzIzMy41MjUxNjMsNTMuODU2MzY4MyAyMjkuODI5MzAxLDM3LjkzMjUzMDIgMjE3LjE2ODQ3NiwyMy41MDcwMTQ2IEMyMDMuMjI1NzUzLDcuNjI0Nzk2NTEgMTc4LjA0NTYxMiwwLjgxNTc1MzMzOCAxNDUuODIzMzU1LDAuODE1NzUzMzM4IEw1Mi4yOTQ3Mzc5LDAuODE1NzUzMzM4IEM0NS43MTA0NDMxLDAuODE1NzUzMzM4IDQwLjEwODM4MTksNS42MTAzODUyIDM5LjA3NjIwNDIsMTIuMTExNDM5OSBMMC4xMzY0NjgzMDIsMjU5LjA2ODI3NyBDLTAuNjM3NjY0OTY4LDI2My45NDYxNDkgMy4xMzMxMTMyMiwyNjguMzQ5NTUyIDguMDYwOTI5MywyNjguMzQ5NTUyIEw2NS44MDQ2MTIsMjY4LjM0OTU1MiBMOTUuODg3NTk3NCw3Ny41Nzk4MDczIEM5Ni41MDM1NzQ0LDczLjY2NzUyMDggOTkuMDE3NDI2NSw3MC40NjI3NzU2IDEwMi4zOTY5NzYsNjguODM5NTkyOSBaIiBmaWxsPSIjMjczNDZBIj48L3BhdGg+CgkJPHBhdGggZD0iTTIyOC44OTcwMTIsODIuNzQ5MDE5NyBDMjE2LjU2OTE0NywxNDYuMDY5NzkyIDE3NC4zNjYzOTgsMTY3Ljk3MDI3MiAxMjAuNDY4NDEsMTY3Ljk3MDI3MiBMOTMuMDI0MTM2NywxNjcuOTcwMjcyIEM4Ni40Mzk4NDE5LDE2Ny45NzAyNzIgODAuODc5NDAwNywxNzIuNzY0OTAzIDc5Ljg1NTU0NzEsMTc5LjI2NTk1OCBMNjEuODE3NDA5NSwyOTMuNjIxMjU4IEM2MS4xNDMxNjQ0LDI5Ny44ODMxNTMgNjQuNDM5NDczOCwzMDEuNzQ1NDk1IDY4Ljc1MTMxMjksMzAxLjc0NTQ5NSBMMTE3LjQyMTgyMSwzMDEuNzQ1NDk1IEMxMjMuMTgyMDM4LDMwMS43NDU0OTUgMTI4LjA4NDg4MiwyOTcuNTUwMTkyIDEyOC45ODM4NzYsMjkxLjg2NDg5MSBMMTI5LjQ1ODM0NCwyODkuMzg0MzM1IEwxMzguNjMxNDA3LDIzMS4yNDk0MjMgTDEzOS4yMjI0MTIsMjI4LjAzNjM1NCBDMTQwLjEyMTQwNiwyMjIuMzUxMDUzIDE0NS4wMjQyNSwyMTguMTU1NzUgMTUwLjc4NDQ2NywyMTguMTU1NzUgTDE1OC4wNjc5NzksMjE4LjE1NTc1IEMyMDUuMjE1MTkzLDIxOC4xNTU3NSAyNDIuMTMyMTkzLDE5OS4wMDIxOTQgMjUyLjkyMDExNSwxNDMuNjA1ODg0IEMyNTcuNDIzNDA2LDEyMC40NTY4MDIgMjU1LjA5MjY4MywxMDEuMTI4NDQyIDI0My4xODEwMTksODcuNTUxOTc1NiBDMjM5LjU2ODM5Nyw4My40Mzk5MTI5IDIzNS4wODE3NTQsODAuMDQzNzE1MyAyMjkuODU0MjczLDc3LjI3MTgxODggQzIyOS41NzEyNTcsNzkuMDYxNDgxNyAyMjkuMjYzMjY4LDgwLjg3NjExNjcgMjI4Ljg5NzAxMiw4Mi43NDkwMTk3IEwyMjguODk3MDEyLDgyLjc0OTAxOTcgWiIgZmlsbD0iIzI3OTBDMyI+PC9wYXRoPgoJCTxwYXRoIGQ9Ik0yMTYuOTUyMDUyLDcyLjEyNzU3ODMgQzIxNS4wNzA4MjUsNzEuNTc4MTkzNCAyMTMuMTMxMzMsNzEuMDc4NzUyNiAyMTEuMTMzNTY2LDcwLjYzNzU3OTkgQzIwOS4xMzU4MDMsNzAuMTk2NDA3MSAyMDcuMDcxNDQ4LDY5LjgwNTE3ODUgMjA0Ljk1NzE0OCw2OS40NjM4OTM5IEMxOTcuNTQ4Nzc2LDY4LjI2NTIzNiAxODkuNDU3ODM1LDY3LjY5OTIwMyAxODAuNzY3NTY1LDY3LjY5OTIwMyBMMTA3LjQ1Nzk3Niw2Ny42OTkyMDMgQzEwNS42NTE2NjUsNjcuNjk5MjAzIDEwMy45MzY5MTksNjguMTA3MDc5NyAxMDIuNDA1Myw2OC44NDc5MTY5IEM5OS4wMTc0MjY1LDcwLjQ3MTA5OTYgOTYuNTExODk4NCw3My42Njc1MjA4IDk1Ljg5NTkyMTQsNzcuNTg4MTMxMyBMODAuMzEzMzY3OCwxNzYuMzg1ODQ5IEw3OS44NjM4NzExLDE3OS4yNjU5NTggQzgwLjg4NzcyNDgsMTcyLjc2NDkwMyA4Ni40NDgxNjU5LDE2Ny45NzAyNzIgOTMuMDMyNDYwNywxNjcuOTcwMjcyIEwxMjAuNDc2NzM0LDE2Ny45NzAyNzIgQzE3NC4zNzQ3MjIsMTY3Ljk3MDI3MiAyMTYuNTc3NDcxLDE0Ni4wNzgxMTYgMjI4LjkwNTMzNiw4Mi43NDkwMTk3IEMyMjkuMjcxNTkyLDgwLjg3NjExNjcgMjI5LjU3OTU4MSw3OS4wNjE0ODE3IDIyOS44NjI1OTcsNzcuMjcxODE4OCBDMjI2Ljc0MTA5Miw3NS42MjM2NjQgMjIzLjM2MTU0Miw3NC4yMDAyNTc3IDIxOS43MjM5NDgsNzIuOTkzMjc1NyBDMjE4LjgxNjYzMSw3Mi42OTM2MTEyIDIxNy44OTI2NjUsNzIuNDAyMjcwOCAyMTYuOTUyMDUyLDcyLjEyNzU3ODMiIGZpbGw9IiMxRjI2NEYiPjwvcGF0aD4KCTwvZz4KPC9zdmc+"},{"title":"SolidWeb","value":"solidweb.org","selected":false,"icon":"data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjM1MiIgaGVpZ2h0PSIzMjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSJub25lIj4KICAgIDxwYXRoIGQ9Ik04Ny45NzI5NiAyODIuMzUyN0wyNy4yNDEzMyAxNzcuMDIyMDdjLTUuNjIwNDEtOS43NTc2NS01LjYyMDQxLTIxLjc3OTA4IDAtMzEuNTM2NzRMODcuOTcyOTYgNDAuMjMyOGM1LjY0NjQzLTkuNzgzNjcgMTYuMDgwNjEtMTUuNzk0MzkgMjcuMzIxNDMtMTUuNzk0MzloMTIxLjM4NTJjMTEuMjY2ODQgMCAyMS43MjcwNCA2LjAxMDcyIDI3LjMyMTQzIDE1Ljc5NDRsNjAuNzU3NjUgMTA1LjMwNDU4YzUuNjIwNDEgOS43NTc2NiA1LjYyMDQxIDIxLjc3OTA5IDAgMzEuNTM2NzRsLTYwLjczMTYzIDEwNS4zMzA2MWMtNS42NDY0MyA5Ljc4MzY3LTE2LjA4MDYxIDE1Ljc5NDM5LTI3LjMyMTQzIDE1Ljc5NDM5SDExNS4zNzI0NWMtMTEuMzE4ODgtLjA1MjA0LTIxLjcyNzA0LTYuMDg4NzgtMjcuMzk5NS0xNS44NDY0M3oiIGZpbGw9IiNGRkYiLz4KICAgIDxwYXRoIGQ9Ik05My4xNTEwMiAyNzUuMTk3MDhsLTU3LjExNDgtOTkuMDU5N2MtNS4zMDgxNi05LjE4NTItNS4zMDgxNi0yMC41MDQwOCAwLTI5LjY2MzI2bDU3LjExNDgtOTkuMDg1NzJjNS4zMzQxOC05LjIxMTIyIDE1LjE0Mzg4LTE0Ljg1NzY1IDI1LjczNDE4LTE0Ljg1NzY1aDExNC4yMjk2YzEwLjU5MDMgMCAyMC40MjYwMiA1LjY0NjQzIDI1LjczNDE4IDE0Ljg1NzY1bDU3LjE2Njg0IDk5LjAzMzY4YzUuMzA4MTYgOS4xODUyIDUuMzA4MTYgMjAuNTA0MDggMCAyOS42NjMyNkwyNTguODc1IDI3NS4yMjMxYy01LjMzNDE4IDkuMjExMjItMTUuMTQzODggMTQuODU3NjUtMjUuNzM0MTggMTQuODU3NjVIMTE4LjkzNzI0Yy0xMC42NDIzNCAwLTIwLjQ1MjA0LTUuNjcyNDUtMjUuNzg2MjItMTQuODgzNjd6IiBmaWxsPSIjN0M0REZGIi8+CiAgICA8cGF0aCBkPSJNMTE4LjQ2ODg4IDE0Mi4yMzI4aDExNy41MzQxOGMxLjQ4MzE2IDAgMi42NTQwOC0xLjE5Njk1IDIuNjU0MDgtMi42NTQwOXYtMjIuMDM5MjhjMC0xNC42NDk1LTExLjg5MTMyLTI2LjU0MDg1LTI2LjU0MDgxLTI2LjU0MDg1aC03MC41NjczNWMtMjAuNTMwMS0uMDI2LTM3LjE1NzIyIDE2LjYwMTA1LTM3LjE1NzIyIDM3LjEzMTE1LS4wMjU5NCA3LjgzMjE0IDYuMjcxIDE0LjEwMzA2IDE0LjA3NzEyIDE0LjEwMzA2ek0xMjkuOTk1OTIgMjM5LjYwMTE2SDIwMC4yMjVjMjEuMjA2NjMgMCAzOC40MzIxNC0xNy4yMjU1MSAzOC40MzIxNC0zOC40MzIxNCAwLTcuMDc3NTUtNS43MjQ0OS0xMi44MjgwNi0xMi44MjgwNi0xMi44MjgwNkgxMDYuOTQxODRjLTEuNDU3MTUgMC0yLjU1MDA1IDEuMTcwOTEtMi41NTAwNSAyLjU1djIzLjA1NDA4Yy0uMDI1OTcgMTQuMTgxMTIgMTEuNDc1MDUgMjUuNjU2MTIgMjUuNjA0MTMgMjUuNjU2MTJ6IiBmaWxsPSIjRjdGN0Y3Ii8+CiAgICA8cGF0aCBkPSJNMTA5LjU5NTkyIDEzOS4zMTg1bDg3LjY2Mjc1IDg3LjY2Mjc2YzUuODAyNTUgNS44MDI1NSAxNS4xOTU5MiA1LjgwMjU1IDIwLjk5ODQ3IDBsMTUuMTk1OTItMTUuMTk1OTJjNS44MDI1NS01LjgwMjU1IDUuODAyNTUtMTUuMTk1OTEgMC0yMC45OTg0N2wtODcuNjM2NzMtODcuNjYyNzVjLTUuODAyNTUtNS44MDI1NS0xNS4xOTU5Mi01LjgwMjU1LTIwLjk5ODQ3IDBsLTE1LjE5NTkyIDE1LjE5NTkyYy01Ljg1NDYgNS44MDI1NS01Ljg1NDYgMTUuMjIxOTQtLjAyNjAyIDIwLjk5ODQ3eiIgZmlsbD0iI0Y3RjdGNyIvPgogICAgPHBhdGggZmlsbD0iIzQ0NCIgb3BhY2l0eT0iLjMiIGQ9Ik0xOTguNjg5OCAyMjguNDY0NDNsLTUxLjQ5NDQtNDAuMTIzNDdoMTEuMzk2OTV6TTE0NC4zNTkxOCAxMDEuNjY2OThsNDAuNTY1ODIgNDAuNTY1ODFoMTMuNzY0OHoiLz4KICA8L2c+Cjwvc3ZnPg==","underline":true},{"title":"Custom","value":"","selected":false}]'),Y=o.ZP.div`
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
`;var Q;function B(){return B=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},B.apply(this,arguments)}const R=(e,i)=>{let{title:t,titleId:a,...n}=e;return s.createElement("svg",B({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":a},n),t?s.createElement("title",{id:a},t):null,Q||(Q=s.createElement("path",{d:"M8.00004 1.33301C4.32004 1.33301 1.33337 4.31967 1.33337 7.99967C1.33337 11.6797 4.32004 14.6663 8.00004 14.6663C11.68 14.6663 14.6667 11.6797 14.6667 7.99967C14.6667 4.31967 11.68 1.33301 8.00004 1.33301ZM11.3334 8.66634H4.66671V7.33301H11.3334V8.66634Z",fill:"#D0D5DD"})))},W=(0,s.forwardRef)(R);function G(e){let{issuers:i=[],onChange:t}=e;const[a,n]=(0,s.useState)({}),[l,c]=(0,s.useState)(""),r=!l&&!(null!==a&&void 0!==a&&a.value)||!(null!==a&&void 0!==a&&a.title)||i.some((e=>e.domain===l));return(0,m.jsx)(Y,{children:(0,m.jsxs)("ul",{className:"issuers",children:[i.map((e=>{let{enable:s,favicon:a,domain:n}=e;return(0,m.jsxs)("li",{className:"issuer",children:[(0,m.jsxs)("div",{className:"left",children:[(0,m.jsx)(W,{className:"remove",onClick:()=>{t(i.filter((e=>e.domain!==n)))}}),(0,m.jsxs)("div",{className:"data",children:[Boolean(a)&&(0,m.jsx)("img",{src:a,alt:"logo",className:"icon"}),(0,m.jsx)(u.Z,{readOnly:!0,value:n,prefix:"https://",placeholder:"Issuer Domain",className:"url"})]})]}),(0,m.jsx)("div",{className:"right",children:(0,m.jsx)(I,{"data-checked":s,onClick:()=>{t(i.map((e=>({...e,enable:e.domain===n?!s:e.enable}))))}})})]},n)})),(0,m.jsxs)("li",{className:"issuer add",children:[(0,m.jsxs)("div",{className:"left",children:[(0,m.jsx)(S,{options:Z.map((e=>({...e,selected:i.some((i=>i.domain===e.value))}))),current:a,updateSelect:n}),(0,m.jsx)("div",{className:"data",children:(0,m.jsx)(u.Z,{onChange:e=>{c(e.target.value)},readOnly:!(null===a||void 0===a||!a.value),value:(null===a||void 0===a?void 0:a.value)||l,prefix:"https://",placeholder:"domain.com",className:"url"})})]}),(0,m.jsx)("div",{className:"right",children:(0,m.jsx)(P.Z,{disabled:r,onClick:()=>{const{icon:e,value:s}=Z.find((e=>e.value===a.value));t(i.concat({enable:!0,favicon:e||"",domain:s||l})),n({}),c("")},children:"Add"})})]})]})})}var K=t(8536),F=t(3656);function H(){const{changed:e,clientId:i,updateClientId:t,updateClientIdToServer:s}=(0,K.Z)(),{config:a,changed:n,updateGithubAuthConfigToServer:l,updateGithubAuthConfig:c}=(0,F.Z)(),{values:r,updateConfig:o,setValues:d,reset:M,changed:j}=(0,T.Z)("login"),p=e=>{const{key:i}=e.target.dataset;i&&c({[i]:e.target.value})},D=e=>{d((i=>({...i,...e})))};if(!r)return null;const{google:h,magic_link:_,github:y,metamask:f,password:L,oidc:z=[]}=null!==r&&void 0!==r?r:{},E=e||j||n;return(0,m.jsxs)(w,{children:[(0,m.jsxs)("div",{className:"inputs",children:[(0,m.jsx)("div",{className:"input",children:(0,m.jsxs)("div",{className:"row",children:[(0,m.jsxs)("div",{className:"title",children:[(0,m.jsx)("div",{className:"txt",children:(0,m.jsx)(x.Z,{children:"Password"})}),(0,m.jsx)("span",{className:"desc",children:"Allows members login with password."})]}),(0,m.jsx)(I,{onClick:D.bind(null,{password:!L}),"data-checked":L})]})}),(0,m.jsx)("div",{className:"input",children:(0,m.jsxs)("div",{className:"row",children:[(0,m.jsxs)("div",{className:"title",children:[(0,m.jsx)("div",{className:"txt",children:(0,m.jsx)(x.Z,{children:"Magic Link"})}),(0,m.jsx)("span",{className:"desc",children:"Allows members login with Magic Link."})]}),(0,m.jsx)(I,{onClick:D.bind(null,{magic_link:!_}),"data-checked":_})]})}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsxs)("div",{className:"row",children:[(0,m.jsxs)("div",{className:"title",children:[(0,m.jsxs)("div",{className:"txt",children:[(0,m.jsx)(x.Z,{children:"Google"}),(0,m.jsx)(b,{link:"https://doc.rustchat.com/en-us/login-google.html"})]}),(0,m.jsx)("span",{className:"desc",children:"Allows members login with Google."})]}),(0,m.jsx)(I,{onClick:D.bind(null,{google:!h}),"data-checked":h})]}),(0,m.jsx)("div",{className:"row",children:(0,m.jsx)(u.Z,{disabled:!h,onChange:e=>{t(e.target.value)},placeholder:"Client ID",value:i})})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsxs)("div",{className:"row",children:[(0,m.jsxs)("div",{className:"title",children:[(0,m.jsxs)("div",{className:"txt",children:[(0,m.jsx)(x.Z,{children:"Github"}),(0,m.jsx)(b,{link:"https://doc.rustchat.com/en-us/login-github.html"})]}),(0,m.jsx)("span",{className:"desc",children:"Allows members login with Github."})]}),(0,m.jsx)(I,{onClick:D.bind(null,{github:!y}),"data-checked":y})]}),(0,m.jsxs)("div",{className:"row inputs",children:[(0,m.jsx)(u.Z,{disabled:!y,"data-key":"client_id",onChange:p,placeholder:"Github Client ID",value:null===a||void 0===a?void 0:a.client_id}),(0,m.jsx)(u.Z,{disabled:!y,"data-key":"client_secret",onChange:p,placeholder:"Github Client Secret",value:null===a||void 0===a?void 0:a.client_secret})]})]}),(0,m.jsx)("div",{className:"input",children:(0,m.jsxs)("div",{className:"row",children:[(0,m.jsxs)("div",{className:"title",children:[(0,m.jsxs)("div",{className:"txt",children:[(0,m.jsx)(x.Z,{children:"Metamask"}),(0,m.jsx)(b,{link:"https://doc.rustchat.com/en-us/login-metamask.html"})]}),(0,m.jsx)("span",{className:"desc",children:"Allows members login with Metamask."})]}),(0,m.jsx)(I,{onClick:D.bind(null,{metamask:!f}),"data-checked":f})]})}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)("div",{className:"row",children:(0,m.jsxs)("div",{className:"title",children:[(0,m.jsxs)("div",{className:"txt",children:[(0,m.jsx)(x.Z,{htmlFor:"desc",children:"OIDC"}),(0,m.jsx)(b,{link:"https://doc.rustchat.com/en-us/login-webid.html"})]}),(0,m.jsx)("span",{className:"desc",children:"Save my login details for next time."})]})}),(0,m.jsx)("div",{className:"row",children:(0,m.jsx)(G,{issuers:z,onChange:e=>{d((i=>({...i,oidc:e})))}})})]})]}),E&&(0,m.jsx)(N.Z,{saveHandler:async()=>{const{google:i}=r;j&&o(r),i&&e&&(await s(),j||g.ZP.success("Configuration Updated!")),y&&n&&(await l(),j||g.ZP.success("Configuration Updated!"))},resetHandler:M})]})}function J(){const{values:e,toggleEnable:i,updateConfig:t,setValues:s,reset:a,changed:n}=(0,T.Z)("firebase"),l=e=>{const i=e.target.value,{type:t}=e.target.dataset;s((e=>({...e,[t]:i})))},{token_url:c,project_id:r,private_key:o,client_email:d,enabled:M=!1}=null!==e&&void 0!==e?e:{};return(0,m.jsxs)(w,{children:[(0,m.jsxs)("div",{className:"inputs",children:[(0,m.jsxs)("div",{className:"input row",children:[(0,m.jsx)(x.Z,{children:"Enable"}),(0,m.jsx)(I,{onClick:i,"data-checked":M})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"name",children:"Token Url"}),(0,m.jsx)(u.Z,{disabled:!M,"data-type":"token_url",onChange:l,value:c||"https://oauth2.googleapis.com/token",name:"token_url",placeholder:"Token URL"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"desc",children:"Project ID"}),(0,m.jsx)(u.Z,{disabled:!M,"data-type":"project_id",onChange:l,value:r,name:"project_id",placeholder:"Project ID"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"desc",children:"Private Key"}),(0,m.jsx)(j.Z,{rows:10,disabled:!M,"data-type":"private_key",onChange:l,value:o,name:"private_key",placeholder:"Private key"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"desc",children:"Client Email"}),(0,m.jsx)(u.Z,{disabled:!M,"data-type":"client_email",onChange:l,value:d,name:"client_email",placeholder:"Client Email address"})]})]}),n&&(0,m.jsx)(N.Z,{saveHandler:()=>{t(e)},resetHandler:a})]})}const V=t.p+"static/media/question.f1e6b7aab95b0ab2de07.svg",X=o.ZP.div`
  display: flex;
  gap: 16px;
  white-space: nowrap;
  margin-top: 24px;
`;function q(){const[e,i]=(0,s.useState)(""),[t,{isSuccess:a,isError:n}]=(0,d.D$)(),{reset:l,updateConfig:c,values:r,setValues:o,changed:M,toggleEnable:j}=(0,T.Z)("smtp"),p=e=>{const i=e.target.value,{type:t}=e.target.dataset;o((e=>({...e,[t]:i})))};(0,s.useEffect)((()=>{a&&g.ZP.success("Send Test Email Successfully"),n&&g.ZP.error("Send Test Email Fail")}),[a,n]);const{host:D,port:h,from:_,username:y,password:f,enabled:L=!1}=null!==r&&void 0!==r?r:{};return(0,m.jsxs)(w,{children:[(0,m.jsxs)("div",{className:"inputs",children:[(0,m.jsxs)("div",{className:"input row",children:[(0,m.jsx)(x.Z,{children:"Enable"}),(0,m.jsx)(I,{onClick:j,"data-checked":L})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"name",children:"Host"}),(0,m.jsx)(u.Z,{disabled:!L,"data-type":"host",onChange:p,value:D,name:"host",placeholder:"SMTP Host"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"desc",children:"Port"}),(0,m.jsx)(u.Z,{disabled:!L,type:"number","data-type":"port",onChange:p,value:h,name:"port",placeholder:"SMTP Port"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"desc",children:"From"}),(0,m.jsx)(u.Z,{disabled:!L,"data-type":"from",onChange:p,value:_,name:"from",placeholder:"SMTP From"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"desc",children:"Username"}),(0,m.jsx)(u.Z,{disabled:!L,"data-type":"username",onChange:p,value:y,name:"username",placeholder:"SMTP Username"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"desc",children:"Password"}),(0,m.jsx)(u.Z,{type:"password",disabled:!L,"data-type":"password",onChange:p,value:f,name:"password",placeholder:"SMTP Password"})]})]}),(0,m.jsxs)("div",{className:"tip",children:[(0,m.jsx)("img",{src:V,alt:"question icon"}),(0,m.jsx)("a",{href:"https://rustchat.com/doc/smtp-setting",target:"_blank",className:"link",rel:"noreferrer",children:"How to set up SMTP?"})]}),(0,m.jsxs)(X,{children:[(0,m.jsx)(u.Z,{type:"email",disabled:!L,onChange:e=>{const t=e.target.value;i(t)},value:e,name:"email",placeholder:"test@email.com"}),(0,m.jsx)(P.Z,{disabled:!L||!e,onClick:()=>{t({to:e,subject:"test title",content:"test content"})},children:"Send Test Email"})]}),M&&(0,m.jsx)(N.Z,{saveHandler:()=>{var e;c({...r,port:Number(null!==(e=r.port)&&void 0!==e?e:0)})},resetHandler:l})]})}const $=o.ZP.div`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid orange;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 250px;
  .tip {
    /* word-break: break-all; */
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
`,ee=o.ZP.div`
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
`;function ie(){const{data:e}=(0,d.BL)(),[i,{data:t,isSuccess:a,isLoading:n}]=(0,d.gU)();return(0,s.useEffect)((()=>{a&&((0,f.Bn)(),g.ZP.success("Update API Secret Successfully!"))}),[a]),(0,m.jsxs)(ee,{children:[(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)("label",{htmlFor:"secret",children:"API Secure Key:"}),(0,m.jsx)(u.Z,{type:"password",id:"secret",value:t||e})]}),(0,m.jsx)(y.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,m.jsxs)($,{children:[(0,m.jsx)("div",{className:"tip",children:"Are you sure to update API secret? Previous secret will be invalided"}),(0,m.jsxs)("div",{className:"btns",children:[(0,m.jsx)(P.Z,{onClick:f.Bn,className:"cancel small",children:"Cancel"}),(0,m.jsx)(P.Z,{disabled:n,className:"small danger",onClick:i,children:"Yes"})]})]}),children:(0,m.jsx)(P.Z,{children:"Update Secret"})}),(0,m.jsxs)("div",{className:"tip",children:["Tip: The security key agreed between the rustchat server and the third-party app is used to encrypt the communication data."," "]})]})}var te=t(11);const se=o.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;function ae(){const{data:e}=(0,d.p5)();return(0,m.jsxs)(se,{children:[(0,m.jsxs)("div",{className:"item",children:["Client Version: ","0.2.14"]}),(0,m.jsxs)("div",{className:"item",children:["Server Version: ",e]}),(0,m.jsxs)("div",{className:"item",children:["Build Timestamp: ","1655776547"]})]})}function ne(){const{changed:e,reset:i,values:t,setValues:s,toggleEnable:a,updateConfig:n}=(0,T.Z)("agora"),l=e=>{const i=e.target.value,{type:t}=e.target.dataset;s((e=>({...e,[t]:i})))},{url:c,project_id:r,app_id:o,app_certificate:d,rtm_key:M,rtm_secret:g,enabled:p=!1}=null!==t&&void 0!==t?t:{};return(0,m.jsxs)(w,{children:[(0,m.jsxs)("div",{className:"inputs",children:[(0,m.jsxs)("div",{className:"input row",children:[(0,m.jsx)(x.Z,{children:"Enable"}),(0,m.jsx)(I,{onClick:a,"data-checked":p})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"url",children:"Agora Url"}),(0,m.jsx)(u.Z,{disabled:!p,"data-type":"url",onChange:l,value:c||"https://api.agora.io",name:"url",placeholder:"Agora URL"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"project_id",children:"Project ID"}),(0,m.jsx)(u.Z,{disabled:!p,"data-type":"project_id",onChange:l,value:r,name:"project_id",placeholder:"Project ID"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"app_id",children:"App ID"}),(0,m.jsx)(u.Z,{disabled:!p,"data-type":"app_id",onChange:l,value:o,name:"app_id",placeholder:"APP ID"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"app_certificate",children:"APP Certificate"}),(0,m.jsx)(u.Z,{disabled:!p,"data-type":"app_certificate",onChange:l,value:d,name:"app_certificate",placeholder:"APP Certificate"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"rtm_key",children:"RTM Key"}),(0,m.jsx)(j.Z,{disabled:!p,"data-type":"rtm_key",onChange:l,value:M,name:"rtm_key",placeholder:"RTM Key"})]}),(0,m.jsxs)("div",{className:"input",children:[(0,m.jsx)(x.Z,{htmlFor:"rtm_secret",children:"RTM Secret"}),(0,m.jsx)(j.Z,{disabled:!p,"data-type":"rtm_secret",onChange:l,value:g,name:"rtm_secret",placeholder:"RTM Secret"})]})]}),e&&(0,m.jsx)(N.Z,{saveHandler:()=>{n(t)},resetHandler:i})]})}const le=[{title:"General",items:[{name:"overview",title:"Overview",component:(0,m.jsx)(h,{})},{name:"members",title:"Members",component:(0,m.jsx)(te.Z,{}),admin:!0}]},{title:"User",items:[{name:"my_account",title:"My Account",component:(0,m.jsx)(r.Z,{})}]},{title:"Configuration",items:[{name:"firebase",title:"Firebase",component:(0,m.jsx)(J,{})},{name:"agora",title:"Agora",component:(0,m.jsx)(ne,{})},{name:"smtp",title:"SMTP",component:(0,m.jsx)(q,{})},{name:"social_login",title:"Login Methods",component:(0,m.jsx)(H,{})},{name:"api",title:"Third-party APP",component:(0,m.jsx)(ie,{})}],admin:!0},{title:"About",items:[{name:"faq",title:"FAQ",component:(0,m.jsx)(ae,{})},{name:"terms",title:"Terms & Privacy",component:"Terms & Privacy"},{name:"feedback",title:"Feedback",component:"feedback"}]}],ce=()=>{const e=(0,c.v9)((e=>e.contacts.byId[e.authData.uid]));return le.filter((i=>!(null===e||void 0===e||!e.is_admin)||!i.admin))};var re=t(5845),oe=t(6284),de=t(3637),Me=t(5607);const ue=(0,o.ZP)(re.Z)`
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
`;function xe(e){let{closeModal:i}=e;const[t,a]=(0,s.useState)(!1),{logout:n,exited:l,exiting:c,clearLocalData:r}=(0,de.Z)();return(0,s.useEffect)((()=>{l&&(t&&r(),g.ZP.success("Logout Successfully"),setTimeout((()=>{location.href=`${location.origin}#/login`}),500))}),[l,t]),(0,m.jsx)(Me.Z,{id:"modal-modal",children:(0,m.jsx)(ue,{title:"Log Out",description:"Are you sure want to log out this account?",buttons:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(P.Z,{onClick:i,children:"Cancel"}),(0,m.jsx)(P.Z,{onClick:()=>{n()},className:"danger",children:c?"Logging out":"Log Out"})]}),children:(0,m.jsxs)("div",{className:"clear",children:[(0,m.jsx)("label",{htmlFor:"clear_cb",className:"txt",children:"Clear local data"}),(0,m.jsx)(oe.Z,{name:"clear_cb",checked:t,onChange:e=>{a(e.target.checked)}})]})})})}let je=null;function Ne(){var e;const[i]=(0,a.lr)(),t=ce(),c=t.map((e=>{let{items:i}=e;return i})).flat(),r=i.get("nav");je=null!==(e=je)&&void 0!==e?e:i.get("f")||"/";const[o,d]=(0,s.useState)(!1),M=(0,n.s0)(),u=()=>{d((e=>!e))},x=c.find((e=>e.name==r))||c[0];return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l.Z,{nav:x,closeModal:()=>{M(je),je=null},title:"Settings",navs:t,dangers:[{title:"Log Out",handler:u}],children:x.component}),o&&(0,m.jsx)(xe,{closeModal:u})]})}}}]);