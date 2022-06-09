"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[164],{746:(e,s,t)=>{t.d(s,{Z:()=>r});var a,i=t(7313);function n(){return n=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},n.apply(this,arguments)}const l=(e,s)=>{let{title:t,titleId:l,...r}=e;return i.createElement("svg",n({width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:s,"aria-labelledby":l},r),t?i.createElement("title",{id:l},t):null,a||(a=i.createElement("path",{d:"M5 7.5L10 12.5L15 7.5",stroke:"#344054",strokeWidth:1.67,strokeLinecap:"round",strokeLinejoin:"round"})))},r=(0,i.forwardRef)(l)},6284:(e,s,t)=>{t.d(s,{Z:()=>l});var a=t(9184),i=t(6417);const n=a.ZP.input`
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* Not removed via appearance */
  margin: 0;
  width: 20px;
  height: 20px;
  border: 1px solid #d0d5dd;
  border-radius: 6px;
  place-content: center;
  &::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    margin: 4px;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 10px 10px #1fe1f9;
  }
  &:checked {
    border-color: #1fe1f9;
    &:before {
      transform: scale(1);
    }
  }
  &:disabled {
    opacity: 0.4;
  }
`;function l(e){return(0,i.jsx)(n,{readOnly:!0,...e,type:"checkbox"})}},1008:(e,s,t)=>{t.d(s,{Z:()=>a});const a=t(9184).ZP.div`
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
    pointer-events: none;
  }
`},3656:(e,s,t)=>{t.d(s,{Z:()=>n});var a=t(7313),i=t(4695);function n(){const[e,s]=(0,a.useState)(!1),[t,n]=(0,a.useState)({}),{data:l}=(0,i.R)(void 0,{refetchOnMountOrArgChange:!0}),[r,{isSuccess:c}]=(0,i.Ku)();(0,a.useEffect)((()=>{l&&n(l)}),[l]),(0,a.useEffect)((()=>{s(!c&&JSON.stringify(l)!==JSON.stringify(t))}),[l,t,c]);return{config:t,changed:e,updateGithubAuthConfig:e=>{n((s=>({...s,...e})))},updateGithubAuthConfigToServer:async()=>{await r(t)},isSuccess:c}}},8536:(e,s,t)=>{t.d(s,{Z:()=>n});var a=t(7313),i=t(4695);function n(){const[e,s]=(0,a.useState)(!1),[t,n]=(0,a.useState)(""),{data:l}=(0,i.eM)(void 0,{refetchOnMountOrArgChange:!0}),[r,{isSuccess:c}]=(0,i.Qg)();(0,a.useEffect)((()=>{l&&n(l.client_id)}),[l]),(0,a.useEffect)((()=>{s(!c&&(null===l||void 0===l?void 0:l.client_id)!==t)}),[l,t,c]);return{config:l,changed:e,clientId:t,updateClientId:n,updateClientIdToServer:async()=>{t&&await r({client_id:t})},updateGoogleAuthConfig:r,isSuccess:c}}},4706:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>MyAccount});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7313),styled_components__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(9184),react_redux__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3709),react_hot_toast__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(3657),_app_services_contact__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6432),_common_component_AvatarUploader__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(7814),_ProfileBasicEditModal__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(2631),_UpdatePasswordModal__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(9862),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(6417);const StyledWrapper=styled_components__WEBPACK_IMPORTED_MODULE_7__.ZP.div`
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
`,EditModalInfo={name:{label:"Username",title:"Change your username",intro:"Enter a new username."},email:{label:"Email",title:"Change your email",intro:"Enter a new email."}};function MyAccount(){const[passwordModal,setPasswordModal]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[editModal,setEditModal]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[uploadAvatar,{isSuccess:uploadSuccess}]=(0,_app_services_contact__WEBPACK_IMPORTED_MODULE_2__.C0)(),loginUser=(0,react_redux__WEBPACK_IMPORTED_MODULE_1__.v9)((e=>e.contacts.byId[e.authData.uid]));(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{uploadSuccess&&react_hot_toast__WEBPACK_IMPORTED_MODULE_8__.ZP.success("update avatar successfully!")}),[uploadSuccess]);const handleBasicEdit=e=>{const{edit:s}=e.target.dataset;setEditModal(s)},closeBasicEditModal=()=>{setEditModal(null)},togglePasswordModal=()=>{setPasswordModal((e=>!e))};if(!loginUser)return null;const{uid:uid,avatar:avatar,name:name,email:email}=loginUser;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(StyledWrapper,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"card",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_common_component_AvatarUploader__WEBPACK_IMPORTED_MODULE_3__.Z,{url:avatar,name:name,uploadImage:uploadAvatar}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"name",children:[name," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span",{className:"uid",children:["#",uid]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{className:"label",children:"username"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span",{className:"txt",children:[name," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span",{className:"gray",children:[" #",uid]})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button",{"data-edit":"name",onClick:handleBasicEdit,className:"btn",children:"Edit"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{className:"label",children:"email"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{className:"txt",children:email})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button",{"data-edit":"email",onClick:handleBasicEdit,className:"btn",children:"Edit"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{className:"label",children:"password"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{className:"txt",children:"*********"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button",{onClick:togglePasswordModal,className:"btn",children:"Edit"})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"danger",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h4",{className:"head",children:"Account Removal"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"desc",children:"Disabling your account means you can recover it at any time after taking this action."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button",{className:"btn",children:"Delete Account"})]})]}),editModal&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ProfileBasicEditModal__WEBPACK_IMPORTED_MODULE_4__.Z,{valueKey:editModal,...EditModalInfo[editModal],value:eval(editModal),closeModal:closeBasicEditModal}),passwordModal&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_UpdatePasswordModal__WEBPACK_IMPORTED_MODULE_5__.Z,{closeModal:togglePasswordModal})]})}},2631:(e,s,t)=>{t.d(s,{Z:()=>x});var a=t(7313),i=t(9184),n=t(8648),l=t(6432),r=t(5845),c=t(1296),d=t(5607),o=t(3657),u=t(6417);const p=(0,i.ZP)(r.Z)`
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
`;function x(e){let{label:s="Username",valueKey:t="name",value:i="",title:r="Change your username",intro:x="Enter a new username and your existing password.",closeModal:_}=e;const[m,h]=(0,a.useState)(i),[g,{isLoading:j,isSuccess:f}]=(0,l.g$)();return(0,a.useEffect)((()=>{f&&(o.ZP.success("update user info successfully"),_())}),[f]),(0,u.jsx)(d.Z,{id:"modal-modal",children:(0,u.jsx)(p,{title:r,description:x,buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(c.Z,{className:"cancel",onClick:_,children:"Cancel"}),(0,u.jsx)(c.Z,{onClick:()=>{g({[t]:m})},children:j?"Updating":"Done"})]}),children:(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)("label",{htmlFor:t,children:s}),(0,u.jsx)(n.Z,{name:t,value:m,onChange:e=>{h(e.target.value)}})]})})})}},9862:(e,s,t)=>{t.d(s,{Z:()=>x});var a=t(7313),i=t(9184),n=t(8648),l=t(1864),r=t(5845),c=t(1296),d=t(5607),o=t(3657),u=t(6417);const p=(0,i.ZP)(r.Z)`
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
`;function x(e){let{closeModal:s}=e;const{data:t}=(0,l.I1)(),[i,r]=(0,a.useState)({current:"",newPassword:"",confirmPassword:""}),[x,{isLoading:_,isSuccess:m}]=(0,l.a3)(),h=e=>{const{type:s}=e.target.dataset;r((t=>({...t,[s]:e.target.value})))};(0,a.useEffect)((()=>{m&&(o.ZP.success("update password successfully"),s())}),[m]);const{current:g,newPassword:j,confirmPassword:f}=i,v=(null===t||void 0===t?void 0:t.password)&&!g||!j||!f||j!==f||_;return(0,u.jsx)(d.Z,{id:"modal-modal",children:(0,u.jsxs)(p,{title:"Change your password",description:"Enter current password and new password.",buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(c.Z,{className:"cancel",onClick:s,children:"Cancel"}),(0,u.jsx)(c.Z,{disabled:v,onClick:()=>{const{current:e,newPassword:s}=i;x({old_password:e,new_password:s})},children:_?"Updating":"Update"})]}),children:[(null===t||void 0===t?void 0:t.password)&&(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)("label",{htmlFor:"current",children:"Current Password"}),(0,u.jsx)(n.Z,{type:"password",id:"current",name:"current",value:g,"data-type":"current",onChange:h})]}),(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)("label",{htmlFor:"newPassword",children:"New Password"}),(0,u.jsx)(n.Z,{type:"password",name:"newPassword",value:j,"data-type":"newPassword",onChange:h})]}),(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)("label",{htmlFor:"confirmPassword",children:"Confirm New Password"}),(0,u.jsx)(n.Z,{onBlur:()=>{const{newPassword:e,confirmPassword:s}=i;e!==s&&o.ZP.error("Not same with new password")},type:"password",name:"confirmPassword",value:f,"data-type":"confirmPassword",onChange:h})]})]})})}},3829:(e,s,t)=>{t.r(s),t.d(s,{default:()=>_e});var a=t(7313),i=t(9466),n=t(7890),l=t(1129),r=t(3709),c=t(4706),d=t(9184),o=t(4695),u=t(7814),p=t(8648),x=t(1707),_=t(4155),m=t(6567),h=t(3657),g=t(6417);const j=d.ZP.div`
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
  }
`;function f(){const e=(0,r.v9)((e=>e.contacts.byId[e.authData.uid])),[s,t]=(0,a.useState)(!1),[i,n]=(0,a.useState)(null),{data:l,refetch:c}=(0,o.z3)(),[d,{isSuccess:f}]=(0,o.e2)(),[v,{isSuccess:M}]=(0,o.jd)(),b=e=>{const s=e.target.value,{type:t}=e.target.dataset;n((e=>({...e,[t]:s})))};if((0,a.useEffect)((()=>{M&&(h.ZP.success("update logo successfully"),c())}),[M]),(0,a.useEffect)((()=>{l&&n(l)}),[l]),(0,a.useEffect)((()=>{if(l&&i){const{name:e,description:s}=i,{name:a,description:n}=l;t(a!==e||n!==s)}}),[l,i]),(0,a.useEffect)((()=>{f&&(h.ZP.success("Server updated!"),c())}),[f]),!i)return null;const{name:w,description:E,logo:C}=i,N=null===e||void 0===e?void 0:e.is_admin;return(0,g.jsxs)(j,{children:[(0,g.jsxs)("div",{className:"logo",children:[(0,g.jsx)("div",{className:"preview",children:(0,g.jsx)(u.Z,{disabled:!N,url:M?`${C}?t=${(new Date).getTime()}`:C,name:w,uploadImage:v})}),N&&(0,g.jsx)("div",{className:"upload",children:(0,g.jsx)("div",{className:"tip",children:"Minimum size is 128x128, We recommend at least 512x512 for the server. Max size limited to 5M."})})]}),(0,g.jsxs)("div",{className:"inputs",children:[(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"name",children:"Server Name"}),(0,g.jsx)(p.Z,{disabled:!N,"data-type":"name",onChange:b,value:w,name:"name",id:"name",placeholder:"Server Name"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"desc",children:"Server Description"}),(0,g.jsx)(_.Z,{disabled:!N,"data-type":"description",onChange:b,value:null!==E&&void 0!==E?E:"",rows:4,name:"name",id:"name",placeholder:"Tell the world a bit about this server"})]})]}),s&&(0,g.jsx)(m.Z,{saveHandler:()=>{const{name:e,description:s}=i;d({name:e,description:s})},resetHandler:()=>{n(l)}})]})}const v=d.ZP.div`
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
`;var M=t(1008),b=t(4711);function w(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"smtp";const[s,t]=(0,a.useState)(!1),[i,n]=(0,a.useState)({}),{data:l,refetch:r}=(0,o.ww)(),[c,{isSuccess:d}]=(0,o.QP)(),{data:u,refetch:p}=(0,o.qW)(),[x,{isSuccess:_}]=(0,o.WO)(),{data:m,refetch:g}=(0,o.z7)(),[j,{isSuccess:f}]=(0,o.vF)(),{data:v,refetch:M}=(0,o.a4)(),[w,{isSuccess:E}]=(0,o.FV)(),C={login:l,smtp:u,agora:m,firebase:v},N={login:c,smtp:x,agora:j,firebase:w},P={smtp:p,agora:g,firebase:M,login:r},y={login:d,smtp:_,agora:f,firebase:E},D=C[e],O=N[e],Z=P[e],k=y[e],I=()=>{n(null!==D&&void 0!==D?D:{})},T=()=>{n((e=>({...e,enabled:!e.enabled})))};return(0,a.useEffect)((()=>{k&&(h.ZP.success("Configuration Updated!"),Z())}),[k]),(0,a.useEffect)((()=>{n(null!==D&&void 0!==D?D:{})}),[D]),(0,a.useEffect)((()=>{(0,b.Z1)(D,i)?t(!1):t(!0)}),[D,i]),{reset:I,changed:s,updateConfig:O,values:i,setValues:n,toggleEnable:T}}var E,C=t(2963),N=t(9784);function P(){return P=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},P.apply(this,arguments)}const y=(e,s)=>{let{title:t,titleId:i,...n}=e;return a.createElement("svg",P({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:s,"aria-labelledby":i},n),t?a.createElement("title",{id:i},t):null,E||(E=a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M14.4 7.99961C14.4 9.69699 13.7257 11.3249 12.5255 12.5251C11.3252 13.7253 9.69736 14.3996 7.99998 14.3996C6.30259 14.3996 4.67472 13.7253 3.47449 12.5251C2.27426 11.3249 1.59998 9.69699 1.59998 7.99961C1.59998 6.30222 2.27426 4.67436 3.47449 3.47413C4.67472 2.27389 6.30259 1.59961 7.99998 1.59961C9.69736 1.59961 11.3252 2.27389 12.5255 3.47413C13.7257 4.67436 14.4 6.30222 14.4 7.99961ZM7.99998 5.59961C7.85941 5.59947 7.7213 5.63637 7.59953 5.70659C7.47777 5.77682 7.37666 5.87788 7.30638 5.99961C7.25563 6.09391 7.18646 6.17706 7.10298 6.24414C7.0195 6.31121 6.92341 6.36084 6.82039 6.39009C6.71737 6.41934 6.60953 6.4276 6.50326 6.4144C6.39699 6.40119 6.29445 6.36679 6.20172 6.31322C6.109 6.25965 6.02797 6.18801 5.96344 6.10254C5.89891 6.01708 5.8522 5.91953 5.82608 5.81568C5.79995 5.71182 5.79494 5.60378 5.81135 5.49796C5.82775 5.39213 5.86523 5.29068 5.92158 5.19961C6.18575 4.7421 6.5935 4.38454 7.0816 4.18238C7.56969 3.98022 8.11085 3.94476 8.62115 4.0815C9.13145 4.21823 9.58237 4.51952 9.90399 4.93865C10.2256 5.35777 10.4 5.87131 10.4 6.39961C10.4001 6.8961 10.2463 7.38043 9.95978 7.78589C9.67324 8.19135 9.26803 8.498 8.79998 8.66361V8.79961C8.79998 9.01178 8.71569 9.21527 8.56566 9.36529C8.41563 9.51532 8.21215 9.59961 7.99998 9.59961C7.7878 9.59961 7.58432 9.51532 7.43429 9.36529C7.28426 9.21527 7.19998 9.01178 7.19998 8.79961V7.99961C7.19998 7.78744 7.28426 7.58395 7.43429 7.43392C7.58432 7.28389 7.7878 7.19961 7.99998 7.19961C8.21215 7.19961 8.41563 7.11532 8.56566 6.96529C8.71569 6.81527 8.79998 6.61178 8.79998 6.39961C8.79998 6.18744 8.71569 5.98395 8.56566 5.83392C8.41563 5.68389 8.21215 5.59961 7.99998 5.59961ZM7.99998 11.9996C8.21215 11.9996 8.41563 11.9153 8.56566 11.7653C8.71569 11.6153 8.79998 11.4118 8.79998 11.1996C8.79998 10.9874 8.71569 10.784 8.56566 10.6339C8.41563 10.4839 8.21215 10.3996 7.99998 10.3996C7.7878 10.3996 7.58432 10.4839 7.43429 10.6339C7.28426 10.784 7.19998 10.9874 7.19998 11.1996C7.19998 11.4118 7.28426 11.6153 7.43429 11.7653C7.58432 11.9153 7.7878 11.9996 7.99998 11.9996Z",fill:"#9CA3AF"})))},D=(0,a.forwardRef)(y),O=d.ZP.div`
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
`;function Z(e){let{link:s="#"}=e;return(0,g.jsx)(C.ZP,{delay:[0,500],interactive:!0,arrow:N.ki,placement:"bottom",content:(0,g.jsxs)(O,{children:["Need more detail? See our"," ",(0,g.jsx)("a",{target:"doc",href:s,children:"doc"}),"."]}),children:(0,g.jsx)(D,{className:"icon"})})}var k=t(8140),I=t(746),T=t(8198);const A=d.ZP.div`
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
`;function L(e){let{options:s=[],updateSelect:t=null}=e;const[i,n]=(0,a.useState)(!1),[l,r]=(0,a.useState)(void 0),c=()=>{n((e=>!e))},d=e=>{r(e),c(),t&&t(e)};return(0,g.jsx)(C.ZP,{trigger:"click",visible:i,placement:"bottom",interactive:!0,content:(0,g.jsx)(T.Z,{children:s.map((e=>{let{title:s,value:t,selected:a,underline:i}=e;return(0,g.jsxs)("li",{onClick:a?null:d.bind(null,{title:s,value:t}),className:"item sb "+(i?"underline":""),"data-disabled":a,children:[s,a&&(0,g.jsx)(k.Z,{className:"icon"})]},t)}))}),children:(0,g.jsxs)(A,{onClick:c,children:[(0,g.jsx)("span",{className:"txt",children:(null===l||void 0===l?void 0:l.title)||"Select"}),(0,g.jsx)(I.Z,{className:"icon"})]})})}var S=t(1296);const U=JSON.parse('[{"title":"Facebook","value":"facebook.com","icon":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAxNkMzMiA3LjE2NDEzIDI0LjgzNTggMCAxNiAwQzcuMTY0MTMgMCAwIDcuMTY0MTMgMCAxNkMwIDIzLjk4NTMgNS44NTAxNiAzMC42MDQ5IDEzLjUwMDIgMzEuODA2N1YyMC42MjYxSDkuNDM2NjRWMTZIMTMuNTAwMlYxMi40NzQyQzEzLjUwMDIgOC40NjQ1NiAxNS44ODk4IDYuMjQ4MjkgMTkuNTQzOCA2LjI0ODI5QzIxLjI5NDMgNi4yNDgyOSAyMy4xMjU4IDYuNTYxMDIgMjMuMTI1OCA2LjU2MTAyVjEwLjQ5ODZIMjEuMTA3NUMxOS4xMjA4IDEwLjQ5ODYgMTguNDk5OCAxMS43MzE3IDE4LjQ5OTggMTIuOTk4NFYxNS45OTk5SDIyLjkzNjdMMjIuMjI4IDIwLjYyNkgxOC40OTk2VjMxLjgwNjRDMjYuMTQ5OCAzMC42MDcxIDMxLjk5OTggMjMuOTg3NiAzMS45OTk4IDE1Ljk5OTlMMzIgMTZaIiBmaWxsPSIjMTk3N0YzIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIuMjI4IDIwLjYyNThMMjIuOTM2OSAxNS45OTk2SDE4LjQ5OTlWMTIuOTk4MkMxOC40OTk5IDExLjczMzcgMTkuMTE4NiAxMC40OTg0IDIxLjEwNzcgMTAuNDk4NEgyMy4xMjZWNi41NjA4QzIzLjEyNiA2LjU2MDggMjEuMjk0NSA2LjI0ODA1IDE5LjU0MzkgNi4yNDgwNUMxNS44ODk5IDYuMjQ4MDUgMTMuNTAwNCA4LjQ2MjE0IDEzLjUwMDQgMTIuNDczOVYxNS45OTk4SDkuNDM2NzdWMjAuNjI1OUgxMy41MDA0VjMxLjgwNjRDMTQuMzE0OSAzMS45MzQ0IDE1LjE0OTYgMzEuOTk5OCAxNi4wMDAxIDMxLjk5OThDMTYuODUwNyAzMS45OTk4IDE3LjY4NTQgMzEuOTMyMiAxOC40OTk5IDMxLjgwNjRWMjAuNjI1OUgyMi4yMjgyTDIyLjIyOCAyMC42MjU4WiIgZmlsbD0iI0ZFRkVGRSIvPgo8L3N2Zz4K","selected":true},{"title":"Github","value":"github.com","disabled":true,"underline":true},{"title":"Custom","value":""}]'),R=d.ZP.div`
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
        gap: 16px;
        justify-content: space-between;
        .remove {
          cursor: pointer;
        }
        .data {
          display: flex;
          align-items: flex-end;
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
`;var B;function z(){return z=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},z.apply(this,arguments)}const W=(e,s)=>{let{title:t,titleId:i,...n}=e;return a.createElement("svg",z({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:s,"aria-labelledby":i},n),t?a.createElement("title",{id:i},t):null,B||(B=a.createElement("path",{d:"M8.00004 1.33301C4.32004 1.33301 1.33337 4.31967 1.33337 7.99967C1.33337 11.6797 4.32004 14.6663 8.00004 14.6663C11.68 14.6663 14.6667 11.6797 14.6667 7.99967C14.6667 4.31967 11.68 1.33301 8.00004 1.33301ZM11.3334 8.66634H4.66671V7.33301H11.3334V8.66634Z",fill:"#D0D5DD"})))},K=(0,a.forwardRef)(W);function F(e){let{issuers:s=[]}=e;const[t,i]=(0,a.useState)(void 0),[n,l]=(0,a.useState)(""),r=!(n||null!==t&&void 0!==t&&t.value);return(0,g.jsx)(R,{children:(0,g.jsxs)("ul",{className:"issuers",children:[s.map((e=>{let{enable:s,favicon:t,domain:a}=e;return(0,g.jsxs)("li",{className:"issuer",children:[(0,g.jsxs)("div",{className:"left",children:[(0,g.jsx)(K,{className:"remove"}),(0,g.jsxs)("div",{className:"data",children:[(0,g.jsx)("img",{src:t,alt:"logo",className:"icon"}),(0,g.jsx)(p.Z,{readOnly:!0,value:a,prefix:"https://",placeholder:"Issuer Domain",className:"url"})]})]}),(0,g.jsx)("div",{className:"right",children:(0,g.jsx)(M.Z,{"data-checked":s})})]},a)})),(0,g.jsxs)("li",{className:"issuer add",children:[(0,g.jsxs)("div",{className:"left",children:[(0,g.jsx)(L,{options:U,updateSelect:i}),(0,g.jsx)("div",{className:"data",children:(0,g.jsx)(p.Z,{onChange:e=>{l(e.target.value)},readOnly:!(null===t||void 0===t||!t.value),value:(null===t||void 0===t?void 0:t.value)||n,prefix:"https://",placeholder:"domain.com",className:"url"})})]}),(0,g.jsx)("div",{className:"right",children:(0,g.jsx)(S.Z,{disabled:r,children:"Add"})})]})]})})}var Q=t(8536),G=t(3656);function Y(){const{changed:e,clientId:s,updateClientId:t,updateClientIdToServer:a}=(0,Q.Z)(),{config:i,changed:n,updateGithubAuthConfigToServer:l,updateGithubAuthConfig:r}=(0,G.Z)(),{values:c,updateConfig:d,setValues:o,reset:u,changed:_}=w("login"),j=e=>{const{key:s}=e.target.dataset;s&&r({[s]:e.target.value})},f=e=>{o((s=>({...s,...e})))};if(!c)return null;const{google:b,magic_link:E,github:C,metamask:N,password:P,oidc:y=[]}=null!==c&&void 0!==c?c:{},D=e||_||n;return(0,g.jsxs)(v,{children:[(0,g.jsxs)("div",{className:"inputs",children:[(0,g.jsx)("div",{className:"input",children:(0,g.jsxs)("div",{className:"row",children:[(0,g.jsxs)("div",{className:"title",children:[(0,g.jsx)("div",{className:"txt",children:(0,g.jsx)(x.Z,{children:"Password"})}),(0,g.jsx)("span",{className:"desc",children:"Allows members login with password."})]}),(0,g.jsx)(M.Z,{onClick:f.bind(null,{password:!P}),"data-checked":P})]})}),(0,g.jsx)("div",{className:"input",children:(0,g.jsxs)("div",{className:"row",children:[(0,g.jsxs)("div",{className:"title",children:[(0,g.jsx)("div",{className:"txt",children:(0,g.jsx)(x.Z,{children:"Magic Link"})}),(0,g.jsx)("span",{className:"desc",children:"Allows members login with Magic Link."})]}),(0,g.jsx)(M.Z,{onClick:f.bind(null,{magic_link:!E}),"data-checked":E})]})}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsxs)("div",{className:"row",children:[(0,g.jsxs)("div",{className:"title",children:[(0,g.jsxs)("div",{className:"txt",children:[(0,g.jsx)(x.Z,{children:"Google"}),(0,g.jsx)(Z,{link:"https://doc.rustchat.com/en-us/login-google.html"})]}),(0,g.jsx)("span",{className:"desc",children:"Allows members login with Google."})]}),(0,g.jsx)(M.Z,{onClick:f.bind(null,{google:!b}),"data-checked":b})]}),(0,g.jsx)("div",{className:"row",children:(0,g.jsx)(p.Z,{disabled:!b,onChange:e=>{t(e.target.value)},placeholder:"Client ID",value:s})})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsxs)("div",{className:"row",children:[(0,g.jsxs)("div",{className:"title",children:[(0,g.jsxs)("div",{className:"txt",children:[(0,g.jsx)(x.Z,{children:"Github"}),(0,g.jsx)(Z,{link:"https://doc.rustchat.com/en-us/login-github.html"})]}),(0,g.jsx)("span",{className:"desc",children:"Allows members login with Github."})]}),(0,g.jsx)(M.Z,{onClick:f.bind(null,{github:!C}),"data-checked":C})]}),(0,g.jsxs)("div",{className:"row inputs",children:[(0,g.jsx)(p.Z,{disabled:!C,"data-key":"client_id",onChange:j,placeholder:"Github Client ID",value:null===i||void 0===i?void 0:i.client_id}),(0,g.jsx)(p.Z,{disabled:!C,"data-key":"client_secret",onChange:j,placeholder:"Github Client Secret",value:null===i||void 0===i?void 0:i.client_secret})]})]}),(0,g.jsx)("div",{className:"input",children:(0,g.jsxs)("div",{className:"row",children:[(0,g.jsxs)("div",{className:"title",children:[(0,g.jsxs)("div",{className:"txt",children:[(0,g.jsx)(x.Z,{children:"Metamask"}),(0,g.jsx)(Z,{link:"https://doc.rustchat.com/en-us/login-metamask.html"})]}),(0,g.jsx)("span",{className:"desc",children:"Allows members login with Metamask."})]}),(0,g.jsx)(M.Z,{onClick:f.bind(null,{metamask:!N}),"data-checked":N})]})}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)("div",{className:"row",children:(0,g.jsxs)("div",{className:"title",children:[(0,g.jsxs)("div",{className:"txt",children:[(0,g.jsx)(x.Z,{htmlFor:"desc",children:"OIDC"}),(0,g.jsx)(Z,{link:"https://doc.rustchat.com/en-us/login-webid.html"})]}),(0,g.jsx)("span",{className:"desc",children:"Save my login details for next time."})]})}),(0,g.jsx)("div",{className:"row",children:(0,g.jsx)(F,{issuers:y})})]})]}),D&&(0,g.jsx)(m.Z,{saveHandler:async()=>{const{google:s}=c;_&&d(c),s&&e&&(await a(),_||h.ZP.success("Configuration Updated!")),C&&n&&(await l(),_||h.ZP.success("Configuration Updated!"))},resetHandler:u})]})}function V(){const{values:e,toggleEnable:s,updateConfig:t,setValues:a,reset:i,changed:n}=w("firebase"),l=e=>{const s=e.target.value,{type:t}=e.target.dataset;a((e=>({...e,[t]:s})))},{token_url:r,project_id:c,private_key:d,client_email:o,enabled:u=!1}=null!==e&&void 0!==e?e:{};return(0,g.jsxs)(v,{children:[(0,g.jsxs)("div",{className:"inputs",children:[(0,g.jsxs)("div",{className:"input row",children:[(0,g.jsx)(x.Z,{children:"Enable"}),(0,g.jsx)(M.Z,{onClick:s,"data-checked":u})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"name",children:"Token Url"}),(0,g.jsx)(p.Z,{disabled:!u,"data-type":"token_url",onChange:l,value:r||"https://oauth2.googleapis.com/token",name:"token_url",placeholder:"Token URL"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"desc",children:"Project ID"}),(0,g.jsx)(p.Z,{disabled:!u,"data-type":"project_id",onChange:l,value:c,name:"project_id",placeholder:"Project ID"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"desc",children:"Private Key"}),(0,g.jsx)(_.Z,{rows:10,disabled:!u,"data-type":"private_key",onChange:l,value:d,name:"private_key",placeholder:"Private key"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"desc",children:"Client Email"}),(0,g.jsx)(p.Z,{disabled:!u,"data-type":"client_email",onChange:l,value:o,name:"client_email",placeholder:"Client Email address"})]})]}),n&&(0,g.jsx)(m.Z,{saveHandler:()=>{t(e)},resetHandler:i})]})}const H=t.p+"static/media/question.f1e6b7aab95b0ab2de07.svg",q=d.ZP.div`
  display: flex;
  gap: 16px;
  white-space: nowrap;
  margin-top: 24px;
`;function J(){const[e,s]=(0,a.useState)(""),[t,{isSuccess:i,isError:n}]=(0,o.D$)(),{reset:l,updateConfig:r,values:c,setValues:d,changed:u,toggleEnable:_}=w("smtp"),j=e=>{const s=e.target.value,{type:t}=e.target.dataset;d((e=>({...e,[t]:s})))};(0,a.useEffect)((()=>{i&&h.ZP.success("Send Test Email Successfully"),n&&h.ZP.error("Send Test Email Fail")}),[i,n]);const{host:f,port:b,from:E,username:C,password:N,enabled:P=!1}=null!==c&&void 0!==c?c:{};return(0,g.jsxs)(v,{children:[(0,g.jsxs)("div",{className:"inputs",children:[(0,g.jsxs)("div",{className:"input row",children:[(0,g.jsx)(x.Z,{children:"Enable"}),(0,g.jsx)(M.Z,{onClick:_,"data-checked":P})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"name",children:"Host"}),(0,g.jsx)(p.Z,{disabled:!P,"data-type":"host",onChange:j,value:f,name:"host",placeholder:"SMTP Host"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"desc",children:"Port"}),(0,g.jsx)(p.Z,{disabled:!P,type:"number","data-type":"port",onChange:j,value:b,name:"port",placeholder:"SMTP Port"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"desc",children:"From"}),(0,g.jsx)(p.Z,{disabled:!P,"data-type":"from",onChange:j,value:E,name:"from",placeholder:"SMTP From"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"desc",children:"Username"}),(0,g.jsx)(p.Z,{disabled:!P,"data-type":"username",onChange:j,value:C,name:"username",placeholder:"SMTP Username"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"desc",children:"Password"}),(0,g.jsx)(p.Z,{type:"password",disabled:!P,"data-type":"password",onChange:j,value:N,name:"password",placeholder:"SMTP Password"})]})]}),(0,g.jsxs)("div",{className:"tip",children:[(0,g.jsx)("img",{src:H,alt:"question icon"}),(0,g.jsx)("a",{href:"https://rustchat.com/doc/smtp-setting",target:"_blank",className:"link",rel:"noreferrer",children:"How to set up SMTP?"})]}),(0,g.jsxs)(q,{children:[(0,g.jsx)(p.Z,{type:"email",disabled:!P,onChange:e=>{const t=e.target.value;s(t)},value:e,name:"email",placeholder:"test@email.com"}),(0,g.jsx)(S.Z,{disabled:!P||!e,onClick:()=>{t({to:e,subject:"test title",content:"test content"})},children:"Send Test Email"})]}),u&&(0,g.jsx)(m.Z,{saveHandler:()=>{var e;r({...c,port:Number(null!==(e=c.port)&&void 0!==e?e:0)})},resetHandler:l})]})}const X=d.ZP.div`
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
`,$=d.ZP.div`
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
`;function ee(){const{data:e}=(0,o.BL)(),[s,{data:t,isSuccess:i,isLoading:n}]=(0,o.gU)();return(0,a.useEffect)((()=>{i&&((0,N.Bn)(),h.ZP.success("Update API Secret Successfully!"))}),[i]),(0,g.jsxs)($,{children:[(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)("label",{htmlFor:"secret",children:"API Secure Key:"}),(0,g.jsx)(p.Z,{type:"password",id:"secret",value:t||e})]}),(0,g.jsx)(C.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,g.jsxs)(X,{children:[(0,g.jsx)("div",{className:"tip",children:"Are you sure to update API secret? Previous secret will be invalided"}),(0,g.jsxs)("div",{className:"btns",children:[(0,g.jsx)(S.Z,{onClick:N.Bn,className:"cancel small",children:"Cancel"}),(0,g.jsx)(S.Z,{disabled:n,className:"small danger",onClick:s,children:"Yes"})]})]}),children:(0,g.jsx)(S.Z,{children:"Update Secret"})}),(0,g.jsxs)("div",{className:"tip",children:["Tip: The security key agreed between the rustchat server and the third-party app is used to encrypt the communication data."," "]})]})}var se=t(11);const te=d.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;function ae(){const{data:e}=(0,o.p5)();return(0,g.jsxs)(te,{children:[(0,g.jsxs)("div",{className:"item",children:["Client Version: ","0.2.14"]}),(0,g.jsxs)("div",{className:"item",children:["Server Version: ",e]}),(0,g.jsxs)("div",{className:"item",children:["Build Timestamp: ","1654788555"]})]})}function ie(){const{changed:e,reset:s,values:t,setValues:a,toggleEnable:i,updateConfig:n}=w("agora"),l=e=>{const s=e.target.value,{type:t}=e.target.dataset;a((e=>({...e,[t]:s})))},{url:r,project_id:c,app_id:d,app_certificate:o,rtm_key:u,rtm_secret:h,enabled:j=!1}=null!==t&&void 0!==t?t:{};return(0,g.jsxs)(v,{children:[(0,g.jsxs)("div",{className:"inputs",children:[(0,g.jsxs)("div",{className:"input row",children:[(0,g.jsx)(x.Z,{children:"Enable"}),(0,g.jsx)(M.Z,{onClick:i,"data-checked":j})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"url",children:"Agora Url"}),(0,g.jsx)(p.Z,{disabled:!j,"data-type":"url",onChange:l,value:r||"https://api.agora.io",name:"url",placeholder:"Agora URL"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"project_id",children:"Project ID"}),(0,g.jsx)(p.Z,{disabled:!j,"data-type":"project_id",onChange:l,value:c,name:"project_id",placeholder:"Project ID"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"app_id",children:"App ID"}),(0,g.jsx)(p.Z,{disabled:!j,"data-type":"app_id",onChange:l,value:d,name:"app_id",placeholder:"APP ID"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"app_certificate",children:"APP Certificate"}),(0,g.jsx)(p.Z,{disabled:!j,"data-type":"app_certificate",onChange:l,value:o,name:"app_certificate",placeholder:"APP Certificate"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"rtm_key",children:"RTM Key"}),(0,g.jsx)(_.Z,{disabled:!j,"data-type":"rtm_key",onChange:l,value:u,name:"rtm_key",placeholder:"RTM Key"})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(x.Z,{htmlFor:"rtm_secret",children:"RTM Secret"}),(0,g.jsx)(_.Z,{disabled:!j,"data-type":"rtm_secret",onChange:l,value:h,name:"rtm_secret",placeholder:"RTM Secret"})]})]}),e&&(0,g.jsx)(m.Z,{saveHandler:()=>{n(t)},resetHandler:s})]})}const ne=[{title:"General",items:[{name:"overview",title:"Overview",component:(0,g.jsx)(f,{})},{name:"members",title:"Members",component:(0,g.jsx)(se.Z,{}),admin:!0}]},{title:"User",items:[{name:"my_account",title:"My Account",component:(0,g.jsx)(c.Z,{})}]},{title:"Configuration",items:[{name:"firebase",title:"Firebase",component:(0,g.jsx)(V,{})},{name:"agora",title:"Agora",component:(0,g.jsx)(ie,{})},{name:"smtp",title:"SMTP",component:(0,g.jsx)(J,{})},{name:"social_login",title:"Login Methods",component:(0,g.jsx)(Y,{})},{name:"api",title:"Third-party APP",component:(0,g.jsx)(ee,{})}],admin:!0},{title:"About",items:[{name:"faq",title:"FAQ",component:(0,g.jsx)(ae,{})},{name:"terms",title:"Terms & Privacy",component:"Terms & Privacy"},{name:"feedback",title:"Feedback",component:"feedback"}]}],le=()=>{const e=(0,r.v9)((e=>e.contacts.byId[e.authData.uid]));return ne.filter((s=>!(null===e||void 0===e||!e.is_admin)||!s.admin))};var re=t(5845),ce=t(6284),de=t(3637),oe=t(5607);const ue=(0,d.ZP)(re.Z)`
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
`;function pe(e){let{closeModal:s}=e;const[t,i]=(0,a.useState)(!1),{logout:n,exited:l,exiting:r,clearLocalData:c}=(0,de.Z)();return(0,a.useEffect)((()=>{l&&(t&&c(),h.ZP.success("Logout Successfully"),setTimeout((()=>{location.href=`${location.origin}#/login`}),500))}),[l,t]),(0,g.jsx)(oe.Z,{id:"modal-modal",children:(0,g.jsx)(ue,{title:"Log Out",description:"Are you sure want to log out this account?",buttons:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(S.Z,{onClick:s,children:"Cancel"}),(0,g.jsx)(S.Z,{onClick:()=>{n()},className:"danger",children:r?"Logging out":"Log Out"})]}),children:(0,g.jsxs)("div",{className:"clear",children:[(0,g.jsx)("label",{htmlFor:"clear_cb",className:"txt",children:"Clear local data"}),(0,g.jsx)(ce.Z,{name:"clear_cb",checked:t,onChange:e=>{i(e.target.checked)}})]})})})}let xe=null;function _e(){var e;const[s]=(0,i.lr)(),t=le(),r=t.map((e=>{let{items:s}=e;return s})).flat(),c=s.get("nav");xe=null!==(e=xe)&&void 0!==e?e:s.get("f")||"/";const[d,o]=(0,a.useState)(!1),u=(0,n.s0)(),p=()=>{o((e=>!e))},x=r.find((e=>e.name==c))||r[0];return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(l.Z,{nav:x,closeModal:()=>{u(xe),xe=null},title:"Settings",navs:t,dangers:[{title:"Log Out",handler:p}],children:x.component}),d&&(0,g.jsx)(pe,{closeModal:p})]})}}}]);