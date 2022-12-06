"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[375],{48055:(e,s,t)=>{t.d(s,{Z:()=>c});var a,i=t(70537);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},l.apply(this,arguments)}const n=(e,s)=>{let{title:t,titleId:n,...c}=e;return i.createElement("svg",l({width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:s,"aria-labelledby":n},c),t?i.createElement("title",{id:n},t):null,a||(a=i.createElement("path",{d:"M5 7.5L10 12.5L15 7.5",stroke:"#344054",strokeWidth:1.67,strokeLinecap:"round",strokeLinejoin:"round"})))},c=(0,i.forwardRef)(n)},75208:(e,s,t)=>{t.d(s,{Z:()=>c});var a,i=t(70537);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},l.apply(this,arguments)}const n=(e,s)=>{let{title:t,titleId:n,...c}=e;return i.createElement("svg",l({width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:s,"aria-labelledby":n},c),t?i.createElement("title",{id:n},t):null,a||(a=i.createElement("path",{d:"M6 4C6 2.89543 6.89543 2 8 2H14C15.1046 2 16 2.89543 16 4V14C16 15.1046 15.1046 16 14 16H8C6.89543 16 6 15.1046 6 14V4ZM4 6.00001C4 5.25973 4.4022 4.61339 5 4.26758V14.5C5 15.8807 6.11929 17 7.5 17H13.7324C13.3866 17.5978 12.7403 18 12 18H7.5C5.567 18 4 16.433 4 14.5V6.00001Z",fill:"#475467"})))},c=(0,i.forwardRef)(n)},24645:(e,s,t)=>{t.d(s,{Z:()=>n});var a=t(57889),i=t(80683);const l=a.ZP.input`
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
`;function n(e){return(0,i.jsx)(l,{readOnly:!0,...e,type:"checkbox"})}},9975:(e,s,t)=>{t.d(s,{Z:()=>a});const a=t(57889).ZP.div`
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
`},42712:(e,s,t)=>{t.d(s,{Z:()=>l});var a=t(70537),i=t(65809);function l(){const[e,s]=(0,a.useState)(!1),[t,l]=(0,a.useState)(),{data:n}=(0,i.R)(void 0,{refetchOnMountOrArgChange:!0}),[c,{isSuccess:r}]=(0,i.Ku)();(0,a.useEffect)((()=>{n&&l(n)}),[n]),(0,a.useEffect)((()=>{s(!r&&JSON.stringify(n)!==JSON.stringify(t))}),[n,t,r]);return{config:t,changed:e,updateGithubAuthConfig:e=>{l((s=>s?{...s,...e}:e))},updateGithubAuthConfigToServer:async()=>{t&&await c(t)},isSuccess:r}}},25089:(e,s,t)=>{t.d(s,{Z:()=>l});var a=t(70537),i=t(65809);function l(){const[e,s]=(0,a.useState)(!1),[t,l]=(0,a.useState)(""),{data:n}=(0,i.eM)(void 0,{refetchOnMountOrArgChange:!0}),[c,{isSuccess:r}]=(0,i.Qg)();(0,a.useEffect)((()=>{n&&l(n.client_id)}),[n]),(0,a.useEffect)((()=>{s(!r&&(null===n||void 0===n?void 0:n.client_id)!==t)}),[n,t,r]);return{config:n,changed:e,clientId:t,updateClientId:l,updateClientIdToServer:async()=>{t&&await c({client_id:t})},updateGoogleAuthConfig:c,isSuccess:r}}},51892:(e,s,t)=>{t.d(s,{Z:()=>n});var a=t(70537),i=t(65809),l=t(66160);const n=()=>{var e;const{userCount:s,isGuest:t}=(0,l.CG)((e=>({userCount:e.users.ids.length,isGuest:e.authData.guest}))),{data:n,refetch:c}=(0,i.qM)(void 0,{refetchOnMountOrArgChange:!0,skip:t}),[r,{isLoading:o,isSuccess:d}]=(0,i.U_)(),[M,{isSuccess:j,isLoading:u,reset:x}]=(0,i.yn)();(0,a.useEffect)((()=>{j&&(c(),x())}),[j]);return{reachLimit:s>=(null!==(e=null===n||void 0===n?void 0:n.user_limit)&&void 0!==e?e:Number.MAX_SAFE_INTEGER),license:n,checked:d,checking:o,upserting:u,upserted:j,checkLicense:e=>{r(e)},upsertLicense:async e=>{const s=await r(e);return!(!("data"in s)||!s.data.sign)&&await M(e)}}}},13997:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>MyAccount});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(70537),styled_components__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(57889),react_hot_toast__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(27418),_app_services_user__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(52334),_common_component_AvatarUploader__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(95727),_ProfileBasicEditModal__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(38593),_RemoveAccountConfirmModal__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(84213),_UpdatePasswordModal__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(63401),_app_store__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(66160),react_i18next__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(71893),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(80683);const StyledWrapper=styled_components__WEBPACK_IMPORTED_MODULE_9__.ZP.div`
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
`;function MyAccount(){const{t:t}=(0,react_i18next__WEBPACK_IMPORTED_MODULE_10__.$)("member"),{t:ct}=(0,react_i18next__WEBPACK_IMPORTED_MODULE_10__.$)(),[passwordModal,setPasswordModal]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[editModal,setEditModal]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[removeConfirmVisible,setRemoveConfirmVisible]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[uploadAvatar,{isSuccess:uploadSuccess}]=(0,_app_services_user__WEBPACK_IMPORTED_MODULE_2__.C0)(),EditModalInfo={name:{label:t("username"),title:t("change_name"),intro:t("change_name_desc")},email:{label:t("email"),title:t("change_email"),intro:t("change_email_desc")}},loginUser=(0,_app_store__WEBPACK_IMPORTED_MODULE_7__.CG)((e=>{var s;return e.users.byId[(null===(s=e.authData.user)||void 0===s?void 0:s.uid)||0]}));(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{uploadSuccess&&react_hot_toast__WEBPACK_IMPORTED_MODULE_1__.ZP.success("update avatar successfully!")}),[uploadSuccess]);const handleBasicEdit=e=>{const{edit:s}=e.currentTarget.dataset;setEditModal(s)},closeBasicEditModal=()=>{setEditModal(null)},togglePasswordModal=()=>{setPasswordModal((e=>!e))},toggleRemoveAccountModalVisible=()=>{setRemoveConfirmVisible((e=>!e))};if(!loginUser)return null;const{uid:uid,avatar:avatar,name:name,email:email}=loginUser;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(StyledWrapper,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"card",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_common_component_AvatarUploader__WEBPACK_IMPORTED_MODULE_3__.Z,{url:avatar,name:name,uploadImage:uploadAvatar}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"name",children:[name," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span",{className:"uid",children:["#",uid]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span",{className:"label",children:t("username")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span",{className:"txt",children:[name," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span",{className:"gray",children:[" #",uid]})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button",{"data-edit":"name",onClick:handleBasicEdit,className:"btn",children:ct("action.edit")})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span",{className:"label",children:t("email")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span",{className:"txt",children:email})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button",{"data-edit":"email",onClick:handleBasicEdit,className:"btn",children:ct("action.edit")})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span",{className:"label",children:t("password")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span",{className:"txt",children:"*********"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button",{onClick:togglePasswordModal,className:"btn",children:ct("action.edit")})]})]}),1!=uid&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"danger",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button",{className:"btn",onClick:toggleRemoveAccountModalVisible,children:t("delete_account")})})]}),editModal&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ProfileBasicEditModal__WEBPACK_IMPORTED_MODULE_4__.Z,{valueKey:editModal,...EditModalInfo[editModal],value:eval(editModal),closeModal:closeBasicEditModal}),passwordModal&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_UpdatePasswordModal__WEBPACK_IMPORTED_MODULE_6__.Z,{closeModal:togglePasswordModal}),removeConfirmVisible&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_RemoveAccountConfirmModal__WEBPACK_IMPORTED_MODULE_5__.Z,{closeModal:toggleRemoveAccountModalVisible})]})}},38593:(e,s,t)=>{t.d(s,{Z:()=>x});var a=t(70537),i=t(57889),l=t(27418),n=t(17237),c=t(52334),r=t(40698),o=t(69885),d=t(80874),M=t(71893),j=t(80683);const u=(0,i.ZP)(r.Z)`
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
`,x=e=>{let{label:s="Username",valueKey:t="name",value:i="",title:r="Change your username",intro:x="Enter a new username and your existing password.",closeModal:N}=e;const{t:g}=(0,M.$)(),[D,m]=(0,a.useState)(i),[p,{isLoading:_,isSuccess:h}]=(0,c.g$)();return(0,a.useEffect)((()=>{h&&(l.ZP.success("update user info successfully"),N())}),[h]),(0,j.jsx)(d.Z,{id:"modal-modal",children:(0,j.jsx)(u,{title:r,description:x,buttons:(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(o.Z,{className:"cancel",onClick:N,children:g("action.cancel")}),(0,j.jsx)(o.Z,{onClick:()=>{p({[t]:D})},children:_?"Updating":g("action.done")})]}),children:(0,j.jsxs)("div",{className:"input",children:[(0,j.jsx)("label",{htmlFor:t,children:s}),(0,j.jsx)(n.Z,{name:t,value:D,onChange:e=>{m(e.target.value)}})]})})})}},84213:(e,s,t)=>{t.d(s,{Z:()=>d});var a=t(27418),i=t(80874),l=t(40698),n=t(69885),c=t(15312),r=t(71893),o=t(80683);const d=e=>{let{closeModal:s}=e;const{t:t}=(0,r.$)("member"),[d,{isLoading:M}]=(0,c.O2)();return(0,o.jsx)(i.Z,{id:"modal-modal",children:(0,o.jsx)(l.Z,{title:t("remove_account"),description:t("remove_account_desc"),buttons:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.Z,{onClick:s,children:t("action.cancel",{ns:"common"})}),(0,o.jsx)(n.Z,{disabled:M,onClick:async()=>{try{await d()}catch(e){a.ZP.error("Remove Account Failed!")}},className:"danger",children:t("remove")})]})})})}},63401:(e,s,t)=>{t.d(s,{Z:()=>x});var a=t(70537),i=t(57889),l=t(27418),n=t(17237),c=t(15312),r=t(40698),o=t(69885),d=t(80874),M=t(71893),j=t(80683);const u=(0,i.ZP)(r.Z)`
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
`,x=e=>{let{closeModal:s}=e;const{t:t}=(0,M.$)("member"),{data:i}=(0,c.I1)(),[r,x]=(0,a.useState)({current:"",newPassword:"",confirmPassword:""}),[N,{isLoading:g,isSuccess:D}]=(0,c.a3)(),m=e=>{const{type:s}=e.target.dataset;x((t=>({...t,[s]:e.target.value})))};(0,a.useEffect)((()=>{D&&(l.ZP.success("update password successfully"),s())}),[D]);const{current:p,newPassword:_,confirmPassword:h}=r,I=(null===i||void 0===i?void 0:i.password)&&!p||!_||!h||_!==h||g;return(0,j.jsx)(d.Z,{id:"modal-modal",children:(0,j.jsxs)(u,{title:t("change_pwd"),description:t("change_pwd_desc"),buttons:(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(o.Z,{className:"cancel",onClick:s,children:t("action.cancel",{ns:"common"})}),(0,j.jsx)(o.Z,{disabled:I,onClick:()=>{const{current:e,newPassword:s}=r;N({old_password:e,new_password:s})},children:g?"Updating":t("action.update",{ns:"common"})})]}),children:[(null===i||void 0===i?void 0:i.password)&&(0,j.jsxs)("div",{className:"input",children:[(0,j.jsx)("label",{htmlFor:"current",children:t("current_pwd")}),(0,j.jsx)(n.Z,{type:"password",id:"current",name:"current",value:p,"data-type":"current",onChange:m})]}),(0,j.jsxs)("div",{className:"input",children:[(0,j.jsx)("label",{htmlFor:"newPassword",children:t("new_pwd")}),(0,j.jsx)(n.Z,{type:"password",name:"newPassword",value:_,"data-type":"newPassword",onChange:m})]}),(0,j.jsxs)("div",{className:"input",children:[(0,j.jsx)("label",{htmlFor:"confirmPassword",children:t("confirm_new_pwd")}),(0,j.jsx)(n.Z,{onBlur:()=>{const{newPassword:e,confirmPassword:s}=r;e!==s&&l.ZP.error("Not same with new password")},type:"password",name:"confirmPassword",value:h,"data-type":"confirmPassword",onChange:m})]})]})})}},63383:(e,s,t)=>{t.r(s),t.d(s,{default:()=>Se});var a=t(70537),i=t(64084),l=t(15924),n=t(7477),c=t(13997),r=t(57889),o=t(71893),d=t(15621),M=t(66160),j=t(48636),u=t(27418),x=t(65809),N=t(95727),g=t(17237),D=t(48540),m=t(64884),p=t(24563),_=t(80683);const h=()=>{const{t:e}=(0,o.$)("setting"),{loginUser:s,server:t}=(0,M.CG)((e=>({loginUser:e.authData.user,server:e.server}))),[i,{isSuccess:l}]=(0,x.jd)(),[n]=(0,x.e2)(),[c,r]=(0,a.useState)(!1),[d,j]=(0,a.useState)(t),h=e=>{const s=e.target.value,{type:t=""}=e.target.dataset;j((e=>({...e,[t]:s})))};(0,a.useEffect)((()=>{t&&j(t)}),[t]),(0,a.useEffect)((()=>{l&&u.ZP.success("Update logo successfully!")}),[l]),(0,a.useEffect)((()=>{if(t&&d){const{name:e,description:s}=d,{name:a,description:i}=t;r(a!==e||i!==s)}}),[t,d]);const{name:I,description:w,logo:T}=d,y=null===s||void 0===s?void 0:s.is_admin;return s&&d?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)("div",{className:"logo",children:[(0,_.jsx)("div",{className:"preview",children:(0,_.jsx)(N.Z,{disabled:!y,url:l?`${T}?t=${+new Date}`:T,name:I,uploadImage:i})}),y&&(0,_.jsx)("div",{className:"upload",children:(0,_.jsx)("div",{className:"tip",children:e("overview.upload_desc")})})]}),(0,_.jsxs)("div",{className:"inputs",children:[(0,_.jsxs)("div",{className:"input",children:[(0,_.jsx)(D.Z,{htmlFor:"name",children:e("overview.name")}),(0,_.jsx)(g.Z,{disabled:!y,"data-type":"name",onChange:h,value:I,name:"name",id:"name",placeholder:"Server Name"})]}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsx)(D.Z,{htmlFor:"desc",children:e("overview.desc")}),(0,_.jsx)(m.Z,{disabled:!y,"data-type":"description",onChange:h,value:null!==w&&void 0!==w?w:"",rows:4,name:"name",id:"name",placeholder:"Tell the world a bit about this server"})]})]}),c&&(0,_.jsx)(p.Z,{saveHandler:()=>{const{name:e,description:s}=d;n({name:e,description:s})},resetHandler:()=>{j(t)}})]}):null},I=()=>{const{t:e,i18n:s}=(0,o.$)("setting");return(0,_.jsxs)("div",{className:"setting",children:[(0,_.jsx)("p",{className:"label",children:e("overview.lang.title")}),(0,_.jsx)("p",{className:"tip",children:(0,_.jsx)("span",{className:"txt",children:e("overview.lang.desc")})}),(0,_.jsx)(d.Z,{options:[e("overview.lang.en"),e("overview.lang.zh"),e("overview.lang.jp")],values:["en","zh","jp"],value:s.language.split("-")[0],onChange:e=>{(e=>{s.changeLanguage(e)})(e)}})]})},w=r.ZP.div`
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
`;function T(){const{t:e}=(0,o.$)("setting"),{loginUser:s}=(0,M.CG)((e=>({loginUser:e.authData.user}))),{values:t,updateConfig:a}=(0,j.Z)("login");if(!t)return null;const{who_can_sign_up:i,guest:l=!1}=t,n=null===s||void 0===s?void 0:s.is_admin;return(0,_.jsxs)(w,{children:[(0,_.jsx)(h,{}),n&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)("div",{className:"setting",children:[(0,_.jsx)("p",{className:"label",children:e("overview.sign_up.title")}),(0,_.jsx)("p",{className:"tip",children:e("overview.sign_up.desc")}),(0,_.jsx)(d.Z,{options:[e("overview.sign_up.everyone"),e("overview.sign_up.invite")],values:["EveryOne","InvitationOnly"],value:i,onChange:e=>{var s;s=e,a({...t,who_can_sign_up:s})}})]}),(0,_.jsxs)("div",{className:"setting",children:[(0,_.jsx)("p",{className:"label",children:e("overview.guest_mode.title")}),(0,_.jsx)("p",{className:"tip",children:(0,_.jsx)("span",{className:"txt",children:e("overview.guest_mode.desc")})}),(0,_.jsx)(d.Z,{options:[e("overview.guest_mode.enable"),e("overview.guest_mode.disable")],values:["true","false"],value:String(l),onChange:e=>{(e=>{const s="true"===e;a({...t,guest:s})})(e)}})]})]}),(0,_.jsx)(I,{})]})}const y=r.ZP.div`
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
`;var L,E=t(9975),O=t(7829),z=t(69195);t(25515);function f(){return f=Object.assign?Object.assign.bind():function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},f.apply(this,arguments)}const v=(e,s)=>{let{title:t,titleId:i,...l}=e;return a.createElement("svg",f({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:s,"aria-labelledby":i},l),t?a.createElement("title",{id:i},t):null,L||(L=a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M14.4 7.99961C14.4 9.69699 13.7257 11.3249 12.5255 12.5251C11.3252 13.7253 9.69736 14.3996 7.99998 14.3996C6.30259 14.3996 4.67472 13.7253 3.47449 12.5251C2.27426 11.3249 1.59998 9.69699 1.59998 7.99961C1.59998 6.30222 2.27426 4.67436 3.47449 3.47413C4.67472 2.27389 6.30259 1.59961 7.99998 1.59961C9.69736 1.59961 11.3252 2.27389 12.5255 3.47413C13.7257 4.67436 14.4 6.30222 14.4 7.99961ZM7.99998 5.59961C7.85941 5.59947 7.7213 5.63637 7.59953 5.70659C7.47777 5.77682 7.37666 5.87788 7.30638 5.99961C7.25563 6.09391 7.18646 6.17706 7.10298 6.24414C7.0195 6.31121 6.92341 6.36084 6.82039 6.39009C6.71737 6.41934 6.60953 6.4276 6.50326 6.4144C6.39699 6.40119 6.29445 6.36679 6.20172 6.31322C6.109 6.25965 6.02797 6.18801 5.96344 6.10254C5.89891 6.01708 5.8522 5.91953 5.82608 5.81568C5.79995 5.71182 5.79494 5.60378 5.81135 5.49796C5.82775 5.39213 5.86523 5.29068 5.92158 5.19961C6.18575 4.7421 6.5935 4.38454 7.0816 4.18238C7.56969 3.98022 8.11085 3.94476 8.62115 4.0815C9.13145 4.21823 9.58237 4.51952 9.90399 4.93865C10.2256 5.35777 10.4 5.87131 10.4 6.39961C10.4001 6.8961 10.2463 7.38043 9.95978 7.78589C9.67324 8.19135 9.26803 8.498 8.79998 8.66361V8.79961C8.79998 9.01178 8.71569 9.21527 8.56566 9.36529C8.41563 9.51532 8.21215 9.59961 7.99998 9.59961C7.7878 9.59961 7.58432 9.51532 7.43429 9.36529C7.28426 9.21527 7.19998 9.01178 7.19998 8.79961V7.99961C7.19998 7.78744 7.28426 7.58395 7.43429 7.43392C7.58432 7.28389 7.7878 7.19961 7.99998 7.19961C8.21215 7.19961 8.41563 7.11532 8.56566 6.96529C8.71569 6.81527 8.79998 6.61178 8.79998 6.39961C8.79998 6.18744 8.71569 5.98395 8.56566 5.83392C8.41563 5.68389 8.21215 5.59961 7.99998 5.59961ZM7.99998 11.9996C8.21215 11.9996 8.41563 11.9153 8.56566 11.7653C8.71569 11.6153 8.79998 11.4118 8.79998 11.1996C8.79998 10.9874 8.71569 10.784 8.56566 10.6339C8.41563 10.4839 8.21215 10.3996 7.99998 10.3996C7.7878 10.3996 7.58432 10.4839 7.43429 10.6339C7.28426 10.784 7.19998 10.9874 7.19998 11.1996C7.19998 11.4118 7.28426 11.6153 7.43429 11.7653C7.58432 11.9153 7.7878 11.9996 7.99998 11.9996Z",fill:"#9CA3AF"})))},C=(0,a.forwardRef)(v);var b=t(40642);const A=e=>{let{to:s,children:t}=e;return(0,_.jsx)("a",{href:s,className:"text-primary-500",target:"_blank",rel:"noreferrer",children:t})};function k(e){let{link:s="#"}=e;return(0,_.jsx)(O.ZP,{delay:[0,500],interactive:!0,arrow:z.ki,placement:"bottom",content:(0,_.jsx)("div",{className:"py-2 px-3 bg-gray-800 text-xs text-white rounded-lg",children:(0,_.jsx)(b.c,{ns:"setting",i18nKey:"login.more_details",children:(0,_.jsx)(A,{to:s})})}),children:(0,_.jsx)(C,{className:"icon"})})}var U=t(18697),S=t(48055),Z=t(63211);const P=r.ZP.div`
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
`,Y=e=>{var s;let{options:t=[],updateSelect:i=null,current:l=null}=e;const{t:n}=(0,o.$)(),[c,r]=(0,a.useState)(!1),[d,M]=(0,a.useState)(null),j=()=>{r((e=>!e))},u=e=>{M(e),j(),i&&i(e)};return(0,_.jsx)(O.ZP,{visible:c,appendTo:document.body,placement:"bottom",interactive:!0,content:(0,_.jsx)(Z.Z,{children:t.map((e=>{let{title:s,value:t,selected:a,underline:i}=e;return(0,_.jsxs)("li",{onClick:a?void 0:u.bind(null,{title:s,value:t}),className:"item sb "+(i?"bottom_line":""),"data-disabled":a,children:[s,a&&(0,_.jsx)(U.Z,{className:"icon"})]},t)}))}),children:(0,_.jsxs)(P,{onClick:j,children:[(0,_.jsx)("span",{className:"txt",children:(null===(s=null!==l?l:d)||void 0===s?void 0:s.title)||n("action.select")}),(0,_.jsx)(S.Z,{className:"icon"})]})})};var Q=t(69885);const B=JSON.parse('[{"title":"Google","value":"accounts.google.com","selected":false,"icon":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE1OTA1XzI0Njk1KSI+CjxwYXRoIGQ9Ik0yMy43NjYgMTIuMjc2M0MyMy43NjYgMTEuNDYwNSAyMy42OTk5IDEwLjY0MDQgMjMuNTU4OCA5LjgzNzg5SDEyLjI0VjE0LjQ1ODlIMTguNzIxN0MxOC40NTI4IDE1Ljk0OTIgMTcuNTg4NSAxNy4yNjc2IDE2LjMyMyAxOC4xMDU0VjIxLjEwMzdIMjAuMTlDMjIuNDYwOCAxOS4wMTM3IDIzLjc2NiAxNS45MjcyIDIzLjc2NiAxMi4yNzYzWiIgZmlsbD0iIzQyODVGNCIvPgo8cGF0aCBkPSJNMTIuMjQwMSAyNC4wMDEzQzE1LjQ3NjYgMjQuMDAxMyAxOC4yMDU5IDIyLjkzODcgMjAuMTk0NSAyMS4xMDQ0TDE2LjMyNzYgMTguMTA2QzE1LjI1MTcgMTguODM4IDEzLjg2MjcgMTkuMjUyNSAxMi4yNDQ1IDE5LjI1MjVDOS4xMTM4OCAxOS4yNTI1IDYuNDU5NDYgMTcuMTQwNCA1LjUwNzA1IDE0LjMwMDhIMS41MTY2VjE3LjM5MTdDMy41NTM3MSAyMS40NDM5IDcuNzAyOSAyNC4wMDEzIDEyLjI0MDEgMjQuMDAxM1oiIGZpbGw9IiMzNEE4NTMiLz4KPHBhdGggZD0iTTUuNTAyNTMgMTQuMzAwN0M0Ljk5OTg3IDEyLjgxMDMgNC45OTk4NyAxMS4xOTY1IDUuNTAyNTMgOS43MDYxOFY2LjYxNTIzSDEuNTE2NDlDLTAuMTg1NTEgMTAuMDA2IC0wLjE4NTUxIDE0LjAwMDkgMS41MTY0OSAxNy4zOTE2TDUuNTAyNTMgMTQuMzAwN1oiIGZpbGw9IiNGQkJDMDQiLz4KPHBhdGggZD0iTTEyLjI0MDEgNC43NDk2NkMxMy45NTA5IDQuNzIzMiAxNS42MDQ0IDUuMzY2OTcgMTYuODQzNCA2LjU0ODY3TDIwLjI2OTUgMy4xMjI2MkMxOC4xMDAxIDEuMDg1NSAxNS4yMjA4IC0wLjAzNDQ2NiAxMi4yNDAxIDAuMDAwODA4NjY2QzcuNzAyOSAwLjAwMDgwODY2NiAzLjU1MzcxIDIuNTU4MjIgMS41MTY2IDYuNjE0ODFMNS41MDI2NCA5LjcwNTc1QzYuNDUwNjQgNi44NjE3MyA5LjEwOTQ3IDQuNzQ5NjYgMTIuMjQwMSA0Ljc0OTY2WiIgZmlsbD0iI0VBNDMzNSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE1OTA1XzI0Njk1Ij4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="},{"title":"Facebook","value":"www.facebook.com","selected":false,"icon":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAxNkMzMiA3LjE2NDEzIDI0LjgzNTggMCAxNiAwQzcuMTY0MTMgMCAwIDcuMTY0MTMgMCAxNkMwIDIzLjk4NTMgNS44NTAxNiAzMC42MDQ5IDEzLjUwMDIgMzEuODA2N1YyMC42MjYxSDkuNDM2NjRWMTZIMTMuNTAwMlYxMi40NzQyQzEzLjUwMDIgOC40NjQ1NiAxNS44ODk4IDYuMjQ4MjkgMTkuNTQzOCA2LjI0ODI5QzIxLjI5NDMgNi4yNDgyOSAyMy4xMjU4IDYuNTYxMDIgMjMuMTI1OCA2LjU2MTAyVjEwLjQ5ODZIMjEuMTA3NUMxOS4xMjA4IDEwLjQ5ODYgMTguNDk5OCAxMS43MzE3IDE4LjQ5OTggMTIuOTk4NFYxNS45OTk5SDIyLjkzNjdMMjIuMjI4IDIwLjYyNkgxOC40OTk2VjMxLjgwNjRDMjYuMTQ5OCAzMC42MDcxIDMxLjk5OTggMjMuOTg3NiAzMS45OTk4IDE1Ljk5OTlMMzIgMTZaIiBmaWxsPSIjMTk3N0YzIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIuMjI4IDIwLjYyNkwyMi45MzY5IDE1Ljk5OTlIMTguNDk5OVYxMi45OTg0QzE4LjQ5OTkgMTEuNzMzOSAxOS4xMTg2IDEwLjQ5ODcgMjEuMTA3NyAxMC40OTg3SDIzLjEyNlY2LjU2MTA1QzIzLjEyNiA2LjU2MTA1IDIxLjI5NDUgNi4yNDgyOSAxOS41NDM5IDYuMjQ4MjlDMTUuODg5OSA2LjI0ODI5IDEzLjUwMDQgOC40NjIzOCAxMy41MDA0IDEyLjQ3NDJWMTZIOS40MzY3N1YyMC42MjYxSDEzLjUwMDRWMzEuODA2N0MxNC4zMTQ5IDMxLjkzNDcgMTUuMTQ5NiAzMiAxNi4wMDAxIDMyQzE2Ljg1MDcgMzIgMTcuNjg1NCAzMS45MzI1IDE4LjQ5OTkgMzEuODA2N1YyMC42MjYxSDIyLjIyODJMMjIuMjI4IDIwLjYyNloiIGZpbGw9IiNGRUZFRkUiLz4KPC9zdmc+Cg=="},{"title":"Gitlab","value":"www.gitlab.com","selected":false,"icon":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODAgMzgwIj4KPGRlZnM+CiAgICA8c3R5bGU+LmNscy0xe2ZpbGw6I2UyNDMyOTt9LmNscy0ye2ZpbGw6I2ZjNmQyNjt9LmNscy0ze2ZpbGw6I2ZjYTMyNjt9PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJMT0dPIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yODIuODMsMTcwLjczbC0uMjctLjY5LTI2LjE0LTY4LjIyYTYuODEsNi44MSwwLDAsMC0yLjY5LTMuMjQsNyw3LDAsMCwwLTgsLjQzLDcsNywwLDAsMC0yLjMyLDMuNTJsLTE3LjY1LDU0SDE1NC4yOWwtMTcuNjUtNTRBNi44Niw2Ljg2LDAsMCwwLDEzNC4zMiw5OWE3LDcsMCwwLDAtOC0uNDMsNi44Nyw2Ljg3LDAsMCwwLTIuNjksMy4yNEw5Ny40NCwxNzBsLS4yNi42OWE0OC41NCw0OC41NCwwLDAsMCwxNi4xLDU2LjFsLjA5LjA3LjI0LjE3LDM5LjgyLDI5LjgyLDE5LjcsMTQuOTEsMTIsOS4wNmE4LjA3LDguMDcsMCwwLDAsOS43NiwwbDEyLTkuMDYsMTkuNy0xNC45MSw0MC4wNi0zMCwuMS0uMDhBNDguNTYsNDguNTYsMCwwLDAsMjgyLjgzLDE3MC43M1oiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yODIuODMsMTcwLjczbC0uMjctLjY5YTg4LjMsODguMywwLDAsMC0zNS4xNSwxNS44TDE5MCwyMjkuMjVjMTkuNTUsMTQuNzksMzYuNTcsMjcuNjQsMzYuNTcsMjcuNjRsNDAuMDYtMzAsLjEtLjA4QTQ4LjU2LDQ4LjU2LDAsMCwwLDI4Mi44MywxNzAuNzNaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNMTUzLjQzLDI1Ni44OWwxOS43LDE0LjkxLDEyLDkuMDZhOC4wNyw4LjA3LDAsMCwwLDkuNzYsMGwxMi05LjA2LDE5LjctMTQuOTFTMjA5LjU1LDI0NCwxOTAsMjI5LjI1QzE3MC40NSwyNDQsMTUzLjQzLDI1Ni44OSwxNTMuNDMsMjU2Ljg5WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTEzMi41OCwxODUuODRBODguMTksODguMTksMCwwLDAsOTcuNDQsMTcwbC0uMjYuNjlhNDguNTQsNDguNTQsMCwwLDAsMTYuMSw1Ni4xbC4wOS4wNy4yNC4xNywzOS44MiwyOS44MnMxNy0xMi44NSwzNi41Ny0yNy42NFoiLz48L2c+PC9zdmc+"},{"title":"Paypal","value":"www.paypal.com","selected":false,"icon":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjMwMnB4IiB2aWV3Qm94PSIwIDAgMjU2IDMwMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+Cgk8Zz4KCQk8cGF0aCBkPSJNMjE3LjE2ODQ3NiwyMy41MDcwMTQ2IEMyMDMuMjM0MDc3LDcuNjI0Nzk2NTEgMTc4LjA0NTYxMiwwLjgxNTc1MzMzOCAxNDUuODIzMzU1LDAuODE1NzUzMzM4IEw1Mi4zMDMwNjE5LDAuODE1NzUzMzM4IEM0NS43MTA0NDMxLDAuODE1NzUzMzM4IDQwLjEwODM4MTksNS42MTAzODUyIDM5LjA3NjIwNDIsMTIuMTExNDM5OSBMMC4xMzY0NjgzMDIsMjU5LjA3NjYwMSBDLTAuNjM3NjY0OTY4LDI2My45NDYxNDkgMy4xMzMxMTMyMiwyNjguMzU3ODc2IDguMDY5MjUzMzEsMjY4LjM1Nzg3NiBMNjUuODA0NjEyLDI2OC4zNTc4NzYgTDgwLjMwNTA0MzgsMTc2LjM4NTg0OSBMNzkuODU1NTQ3MSwxNzkuMjY1OTU4IEM4MC44ODc3MjQ4LDE3Mi43NjQ5MDMgODYuNDQ4MTY1OSwxNjcuOTcwMjcyIDkzLjAzMjQ2MDcsMTY3Ljk3MDI3MiBMMTIwLjQ2ODQxLDE2Ny45NzAyNzIgQzE3NC4zNjYzOTgsMTY3Ljk3MDI3MiAyMTYuNTY5MTQ3LDE0Ni4wNzgxMTYgMjI4Ljg5NzAxMiw4Mi43NDkwMTk3IEMyMjkuMjYzMjY4LDgwLjg3NjExNjcgMjI5LjU3OTU4MSw3OS4wNTMxNTc3IDIyOS44NTQyNzMsNzcuMjcxODE4OCBDMjI4LjI5NzY4Myw3Ni40NDc3NDE0IDIyOC4yOTc2ODMsNzYuNDQ3NzQxNCAyMjkuODU0MjczLDc3LjI3MTgxODggQzIzMy41MjUxNjMsNTMuODY0NjkyNCAyMjkuODI5MzAxLDM3LjkzMjUzMDIgMjE3LjE2ODQ3NiwyMy41MDcwMTQ2IiBmaWxsPSIjMjczNDZBIj48L3BhdGg+CgkJPHBhdGggZD0iTTEwMi4zOTY5NzYsNjguODM5NTkyOSBDMTAzLjkzNjkxOSw2OC4xMDcwNzk3IDEwNS42NTE2NjUsNjcuNjk5MjAzIDEwNy40NDk2NTIsNjcuNjk5MjAzIEwxODAuNzY3NTY1LDY3LjY5OTIwMyBDMTg5LjQ0OTUxMSw2Ny42OTkyMDMgMTk3LjU0ODc3Niw2OC4yNjUyMzYgMjA0Ljk0ODgyNCw2OS40NTU1Njk5IEMyMDcuMDcxNDQ4LDY5Ljc5Njg1NDUgMjA5LjEyNzQ3OSw3MC4xODgwODMxIDIxMS4xMjUyNDIsNzAuNjM3NTc5OSBDMjEzLjEyMzAwNiw3MS4wNzg3NTI2IDIxNS4wNjI1MDEsNzEuNTc4MTkzNCAyMTYuOTQzNzI4LDcyLjEyNzU3ODMgQzIxNy44ODQzNDEsNzIuNDAyMjcwOCAyMTguODA4MzA3LDcyLjY4NTI4NzIgMjE5LjcxNTYyNCw3Mi45ODQ5NTE3IEMyMjMuMzUzMjE4LDc0LjIwMDI1NzcgMjI2Ljc0MTA5Miw3NS42MTUzNCAyMjkuODU0MjczLDc3LjI3MTgxODggQzIzMy41MjUxNjMsNTMuODU2MzY4MyAyMjkuODI5MzAxLDM3LjkzMjUzMDIgMjE3LjE2ODQ3NiwyMy41MDcwMTQ2IEMyMDMuMjI1NzUzLDcuNjI0Nzk2NTEgMTc4LjA0NTYxMiwwLjgxNTc1MzMzOCAxNDUuODIzMzU1LDAuODE1NzUzMzM4IEw1Mi4yOTQ3Mzc5LDAuODE1NzUzMzM4IEM0NS43MTA0NDMxLDAuODE1NzUzMzM4IDQwLjEwODM4MTksNS42MTAzODUyIDM5LjA3NjIwNDIsMTIuMTExNDM5OSBMMC4xMzY0NjgzMDIsMjU5LjA2ODI3NyBDLTAuNjM3NjY0OTY4LDI2My45NDYxNDkgMy4xMzMxMTMyMiwyNjguMzQ5NTUyIDguMDYwOTI5MywyNjguMzQ5NTUyIEw2NS44MDQ2MTIsMjY4LjM0OTU1MiBMOTUuODg3NTk3NCw3Ny41Nzk4MDczIEM5Ni41MDM1NzQ0LDczLjY2NzUyMDggOTkuMDE3NDI2NSw3MC40NjI3NzU2IDEwMi4zOTY5NzYsNjguODM5NTkyOSBaIiBmaWxsPSIjMjczNDZBIj48L3BhdGg+CgkJPHBhdGggZD0iTTIyOC44OTcwMTIsODIuNzQ5MDE5NyBDMjE2LjU2OTE0NywxNDYuMDY5NzkyIDE3NC4zNjYzOTgsMTY3Ljk3MDI3MiAxMjAuNDY4NDEsMTY3Ljk3MDI3MiBMOTMuMDI0MTM2NywxNjcuOTcwMjcyIEM4Ni40Mzk4NDE5LDE2Ny45NzAyNzIgODAuODc5NDAwNywxNzIuNzY0OTAzIDc5Ljg1NTU0NzEsMTc5LjI2NTk1OCBMNjEuODE3NDA5NSwyOTMuNjIxMjU4IEM2MS4xNDMxNjQ0LDI5Ny44ODMxNTMgNjQuNDM5NDczOCwzMDEuNzQ1NDk1IDY4Ljc1MTMxMjksMzAxLjc0NTQ5NSBMMTE3LjQyMTgyMSwzMDEuNzQ1NDk1IEMxMjMuMTgyMDM4LDMwMS43NDU0OTUgMTI4LjA4NDg4MiwyOTcuNTUwMTkyIDEyOC45ODM4NzYsMjkxLjg2NDg5MSBMMTI5LjQ1ODM0NCwyODkuMzg0MzM1IEwxMzguNjMxNDA3LDIzMS4yNDk0MjMgTDEzOS4yMjI0MTIsMjI4LjAzNjM1NCBDMTQwLjEyMTQwNiwyMjIuMzUxMDUzIDE0NS4wMjQyNSwyMTguMTU1NzUgMTUwLjc4NDQ2NywyMTguMTU1NzUgTDE1OC4wNjc5NzksMjE4LjE1NTc1IEMyMDUuMjE1MTkzLDIxOC4xNTU3NSAyNDIuMTMyMTkzLDE5OS4wMDIxOTQgMjUyLjkyMDExNSwxNDMuNjA1ODg0IEMyNTcuNDIzNDA2LDEyMC40NTY4MDIgMjU1LjA5MjY4MywxMDEuMTI4NDQyIDI0My4xODEwMTksODcuNTUxOTc1NiBDMjM5LjU2ODM5Nyw4My40Mzk5MTI5IDIzNS4wODE3NTQsODAuMDQzNzE1MyAyMjkuODU0MjczLDc3LjI3MTgxODggQzIyOS41NzEyNTcsNzkuMDYxNDgxNyAyMjkuMjYzMjY4LDgwLjg3NjExNjcgMjI4Ljg5NzAxMiw4Mi43NDkwMTk3IEwyMjguODk3MDEyLDgyLjc0OTAxOTcgWiIgZmlsbD0iIzI3OTBDMyI+PC9wYXRoPgoJCTxwYXRoIGQ9Ik0yMTYuOTUyMDUyLDcyLjEyNzU3ODMgQzIxNS4wNzA4MjUsNzEuNTc4MTkzNCAyMTMuMTMxMzMsNzEuMDc4NzUyNiAyMTEuMTMzNTY2LDcwLjYzNzU3OTkgQzIwOS4xMzU4MDMsNzAuMTk2NDA3MSAyMDcuMDcxNDQ4LDY5LjgwNTE3ODUgMjA0Ljk1NzE0OCw2OS40NjM4OTM5IEMxOTcuNTQ4Nzc2LDY4LjI2NTIzNiAxODkuNDU3ODM1LDY3LjY5OTIwMyAxODAuNzY3NTY1LDY3LjY5OTIwMyBMMTA3LjQ1Nzk3Niw2Ny42OTkyMDMgQzEwNS42NTE2NjUsNjcuNjk5MjAzIDEwMy45MzY5MTksNjguMTA3MDc5NyAxMDIuNDA1Myw2OC44NDc5MTY5IEM5OS4wMTc0MjY1LDcwLjQ3MTA5OTYgOTYuNTExODk4NCw3My42Njc1MjA4IDk1Ljg5NTkyMTQsNzcuNTg4MTMxMyBMODAuMzEzMzY3OCwxNzYuMzg1ODQ5IEw3OS44NjM4NzExLDE3OS4yNjU5NTggQzgwLjg4NzcyNDgsMTcyLjc2NDkwMyA4Ni40NDgxNjU5LDE2Ny45NzAyNzIgOTMuMDMyNDYwNywxNjcuOTcwMjcyIEwxMjAuNDc2NzM0LDE2Ny45NzAyNzIgQzE3NC4zNzQ3MjIsMTY3Ljk3MDI3MiAyMTYuNTc3NDcxLDE0Ni4wNzgxMTYgMjI4LjkwNTMzNiw4Mi43NDkwMTk3IEMyMjkuMjcxNTkyLDgwLjg3NjExNjcgMjI5LjU3OTU4MSw3OS4wNjE0ODE3IDIyOS44NjI1OTcsNzcuMjcxODE4OCBDMjI2Ljc0MTA5Miw3NS42MjM2NjQgMjIzLjM2MTU0Miw3NC4yMDAyNTc3IDIxOS43MjM5NDgsNzIuOTkzMjc1NyBDMjE4LjgxNjYzMSw3Mi42OTM2MTEyIDIxNy44OTI2NjUsNzIuNDAyMjcwOCAyMTYuOTUyMDUyLDcyLjEyNzU3ODMiIGZpbGw9IiMxRjI2NEYiPjwvcGF0aD4KCTwvZz4KPC9zdmc+"},{"title":"SolidWeb","value":"solidweb.org","selected":false,"icon":"data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjM1MiIgaGVpZ2h0PSIzMjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSJub25lIj4KICAgIDxwYXRoIGQ9Ik04Ny45NzI5NiAyODIuMzUyN0wyNy4yNDEzMyAxNzcuMDIyMDdjLTUuNjIwNDEtOS43NTc2NS01LjYyMDQxLTIxLjc3OTA4IDAtMzEuNTM2NzRMODcuOTcyOTYgNDAuMjMyOGM1LjY0NjQzLTkuNzgzNjcgMTYuMDgwNjEtMTUuNzk0MzkgMjcuMzIxNDMtMTUuNzk0MzloMTIxLjM4NTJjMTEuMjY2ODQgMCAyMS43MjcwNCA2LjAxMDcyIDI3LjMyMTQzIDE1Ljc5NDRsNjAuNzU3NjUgMTA1LjMwNDU4YzUuNjIwNDEgOS43NTc2NiA1LjYyMDQxIDIxLjc3OTA5IDAgMzEuNTM2NzRsLTYwLjczMTYzIDEwNS4zMzA2MWMtNS42NDY0MyA5Ljc4MzY3LTE2LjA4MDYxIDE1Ljc5NDM5LTI3LjMyMTQzIDE1Ljc5NDM5SDExNS4zNzI0NWMtMTEuMzE4ODgtLjA1MjA0LTIxLjcyNzA0LTYuMDg4NzgtMjcuMzk5NS0xNS44NDY0M3oiIGZpbGw9IiNGRkYiLz4KICAgIDxwYXRoIGQ9Ik05My4xNTEwMiAyNzUuMTk3MDhsLTU3LjExNDgtOTkuMDU5N2MtNS4zMDgxNi05LjE4NTItNS4zMDgxNi0yMC41MDQwOCAwLTI5LjY2MzI2bDU3LjExNDgtOTkuMDg1NzJjNS4zMzQxOC05LjIxMTIyIDE1LjE0Mzg4LTE0Ljg1NzY1IDI1LjczNDE4LTE0Ljg1NzY1aDExNC4yMjk2YzEwLjU5MDMgMCAyMC40MjYwMiA1LjY0NjQzIDI1LjczNDE4IDE0Ljg1NzY1bDU3LjE2Njg0IDk5LjAzMzY4YzUuMzA4MTYgOS4xODUyIDUuMzA4MTYgMjAuNTA0MDggMCAyOS42NjMyNkwyNTguODc1IDI3NS4yMjMxYy01LjMzNDE4IDkuMjExMjItMTUuMTQzODggMTQuODU3NjUtMjUuNzM0MTggMTQuODU3NjVIMTE4LjkzNzI0Yy0xMC42NDIzNCAwLTIwLjQ1MjA0LTUuNjcyNDUtMjUuNzg2MjItMTQuODgzNjd6IiBmaWxsPSIjN0M0REZGIi8+CiAgICA8cGF0aCBkPSJNMTE4LjQ2ODg4IDE0Mi4yMzI4aDExNy41MzQxOGMxLjQ4MzE2IDAgMi42NTQwOC0xLjE5Njk1IDIuNjU0MDgtMi42NTQwOXYtMjIuMDM5MjhjMC0xNC42NDk1LTExLjg5MTMyLTI2LjU0MDg1LTI2LjU0MDgxLTI2LjU0MDg1aC03MC41NjczNWMtMjAuNTMwMS0uMDI2LTM3LjE1NzIyIDE2LjYwMTA1LTM3LjE1NzIyIDM3LjEzMTE1LS4wMjU5NCA3LjgzMjE0IDYuMjcxIDE0LjEwMzA2IDE0LjA3NzEyIDE0LjEwMzA2ek0xMjkuOTk1OTIgMjM5LjYwMTE2SDIwMC4yMjVjMjEuMjA2NjMgMCAzOC40MzIxNC0xNy4yMjU1MSAzOC40MzIxNC0zOC40MzIxNCAwLTcuMDc3NTUtNS43MjQ0OS0xMi44MjgwNi0xMi44MjgwNi0xMi44MjgwNkgxMDYuOTQxODRjLTEuNDU3MTUgMC0yLjU1MDA1IDEuMTcwOTEtMi41NTAwNSAyLjU1djIzLjA1NDA4Yy0uMDI1OTcgMTQuMTgxMTIgMTEuNDc1MDUgMjUuNjU2MTIgMjUuNjA0MTMgMjUuNjU2MTJ6IiBmaWxsPSIjRjdGN0Y3Ii8+CiAgICA8cGF0aCBkPSJNMTA5LjU5NTkyIDEzOS4zMTg1bDg3LjY2Mjc1IDg3LjY2Mjc2YzUuODAyNTUgNS44MDI1NSAxNS4xOTU5MiA1LjgwMjU1IDIwLjk5ODQ3IDBsMTUuMTk1OTItMTUuMTk1OTJjNS44MDI1NS01LjgwMjU1IDUuODAyNTUtMTUuMTk1OTEgMC0yMC45OTg0N2wtODcuNjM2NzMtODcuNjYyNzVjLTUuODAyNTUtNS44MDI1NS0xNS4xOTU5Mi01LjgwMjU1LTIwLjk5ODQ3IDBsLTE1LjE5NTkyIDE1LjE5NTkyYy01Ljg1NDYgNS44MDI1NS01Ljg1NDYgMTUuMjIxOTQtLjAyNjAyIDIwLjk5ODQ3eiIgZmlsbD0iI0Y3RjdGNyIvPgogICAgPHBhdGggZmlsbD0iIzQ0NCIgb3BhY2l0eT0iLjMiIGQ9Ik0xOTguNjg5OCAyMjguNDY0NDNsLTUxLjQ5NDQtNDAuMTIzNDdoMTEuMzk2OTV6TTE0NC4zNTkxOCAxMDEuNjY2OThsNDAuNTY1ODIgNDAuNTY1ODFoMTMuNzY0OHoiLz4KICA8L2c+Cjwvc3ZnPg==","underline":true},{"title":"Custom","value":"","selected":false}]'),R=r.ZP.div`
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
`;var W;function G(){return G=Object.assign?Object.assign.bind():function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},G.apply(this,arguments)}const K=(e,s)=>{let{title:t,titleId:i,...l}=e;return a.createElement("svg",G({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:s,"aria-labelledby":i},l),t?a.createElement("title",{id:i},t):null,W||(W=a.createElement("path",{d:"M8.00004 1.33301C4.32004 1.33301 1.33337 4.31967 1.33337 7.99967C1.33337 11.6797 4.32004 14.6663 8.00004 14.6663C11.68 14.6663 14.6667 11.6797 14.6667 7.99967C14.6667 4.31967 11.68 1.33301 8.00004 1.33301ZM11.3334 8.66634H4.66671V7.33301H11.3334V8.66634Z",fill:"#D0D5DD"})))},F=(0,a.forwardRef)(K),V=e=>{let{issuers:s=[],onChange:t}=e;const{t:i}=(0,o.$)(),[l,n]=(0,a.useState)(null),[c,r]=(0,a.useState)(""),d=!c&&!(null!==l&&void 0!==l&&l.value)||!(null!==l&&void 0!==l&&l.title)||s.some((e=>e.domain===c));return(0,_.jsx)(R,{children:(0,_.jsxs)("ul",{className:"issuers",children:[s.map((e=>{let{enable:a,favicon:i,domain:l}=e;return(0,_.jsxs)("li",{className:"issuer",children:[(0,_.jsxs)("div",{className:"left",children:[(0,_.jsx)(F,{className:"remove",onClick:()=>{t(s.filter((e=>e.domain!==l)))}}),(0,_.jsxs)("div",{className:"data",children:[Boolean(i)&&(0,_.jsx)("img",{src:i,alt:"logo",className:"icon"}),(0,_.jsx)(g.Z,{readOnly:!0,value:l,prefix:"https://",placeholder:"Issuer Domain",className:"url"})]})]}),(0,_.jsx)("div",{className:"right",children:(0,_.jsx)(E.Z,{"data-checked":a,onClick:()=>{t(s.map((e=>({...e,enable:e.domain===l?!a:e.enable}))))}})})]},l)})),(0,_.jsxs)("li",{className:"issuer add",children:[(0,_.jsxs)("div",{className:"left",children:[(0,_.jsx)(Y,{options:B.map((e=>({...e,selected:s.some((s=>s.domain===e.value))}))),current:l,updateSelect:n}),(0,_.jsx)("div",{className:"data",children:(0,_.jsx)(g.Z,{onChange:e=>{r(e.target.value)},readOnly:!(null===l||void 0===l||!l.value),value:(null===l||void 0===l?void 0:l.value)||c,prefix:"https://",placeholder:"domain.com",className:"url"})})]}),(0,_.jsx)("div",{className:"right",children:(0,_.jsx)(Q.Z,{disabled:d,onClick:()=>{const e=B.find((e=>e.value===(null===l||void 0===l?void 0:l.value)));if(!e)return;const{icon:a,value:i}=e;t(s.concat({enable:!0,favicon:a||"",domain:i||c})),n(null),r("")},children:i("action.add")})})]})]})})};var H=t(25089),$=t(42712);function J(){const{t:e}=(0,o.$)("setting",{keyPrefix:"login"}),{changed:s,clientId:t,updateClientId:a,updateClientIdToServer:i}=(0,H.Z)(),{config:l,changed:n,updateGithubAuthConfigToServer:c,updateGithubAuthConfig:r}=(0,$.Z)(),{values:d,updateConfig:M,setValues:x,reset:N,changed:m}=(0,j.Z)("login"),h=e=>{const{key:s}=e.target.dataset;s&&r({[s]:e.target.value})},I=e=>{x((s=>s?{...s,...e}:s))};if(!d)return null;const{google:w,magic_link:T,github:L,metamask:O,password:z,oidc:f=[]}=d,v=s||m||n;return(0,_.jsxs)(y,{children:[(0,_.jsxs)("div",{className:"inputs",children:[(0,_.jsx)("div",{className:"input",children:(0,_.jsxs)("div",{className:"row",children:[(0,_.jsxs)("div",{className:"title",children:[(0,_.jsx)("div",{className:"txt",children:(0,_.jsx)(D.Z,{children:e("password")})}),(0,_.jsx)("span",{className:"desc",children:e("password_desc")})]}),(0,_.jsx)(E.Z,{onClick:I.bind(null,{password:!z}),"data-checked":z})]})}),(0,_.jsx)("div",{className:"input",children:(0,_.jsxs)("div",{className:"row",children:[(0,_.jsxs)("div",{className:"title",children:[(0,_.jsx)("div",{className:"txt",children:(0,_.jsx)(D.Z,{children:e("magic_link")})}),(0,_.jsx)("span",{className:"desc",children:e("magic_link_desc")})]}),(0,_.jsx)(E.Z,{onClick:I.bind(null,{magic_link:!T}),"data-checked":T})]})}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsxs)("div",{className:"row",children:[(0,_.jsxs)("div",{className:"title",children:[(0,_.jsxs)("div",{className:"txt",children:[(0,_.jsx)(D.Z,{children:e("google")}),(0,_.jsx)(k,{link:"https://doc.voce.chat/setting/third_login/login-google"})]}),(0,_.jsx)("span",{className:"desc",children:e("google_desc")})]}),(0,_.jsx)(E.Z,{onClick:I.bind(null,{google:!w}),"data-checked":w})]}),(0,_.jsx)("div",{className:"row",children:(0,_.jsx)(g.Z,{disabled:!w,onChange:e=>{a(e.target.value)},placeholder:"Client ID",value:t})})]}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsxs)("div",{className:"row",children:[(0,_.jsxs)("div",{className:"title",children:[(0,_.jsxs)("div",{className:"txt",children:[(0,_.jsx)(D.Z,{children:e("github")}),(0,_.jsx)(k,{link:"https://doc.voce.chat/setting/third_login/login-github"})]}),(0,_.jsx)("span",{className:"desc",children:e("github_desc")})]}),(0,_.jsx)(E.Z,{onClick:I.bind(null,{github:!L}),"data-checked":L})]}),(0,_.jsxs)("div",{className:"row inputs",children:[(0,_.jsx)(g.Z,{disabled:!L,"data-key":"client_id",onChange:h,placeholder:"Github Client ID",value:null===l||void 0===l?void 0:l.client_id}),(0,_.jsx)(g.Z,{disabled:!L,"data-key":"client_secret",onChange:h,placeholder:"Github Client Secret",value:null===l||void 0===l?void 0:l.client_secret})]})]}),(0,_.jsx)("div",{className:"input",children:(0,_.jsxs)("div",{className:"row",children:[(0,_.jsxs)("div",{className:"title",children:[(0,_.jsxs)("div",{className:"txt",children:[(0,_.jsx)(D.Z,{children:e("metamask")}),(0,_.jsx)(k,{link:"https://doc.voce.chat/setting/third_login/login-metamask"})]}),(0,_.jsx)("span",{className:"desc",children:e("metamask_desc")})]}),(0,_.jsx)(E.Z,{onClick:I.bind(null,{metamask:!O}),"data-checked":O})]})}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsx)("div",{className:"row",children:(0,_.jsxs)("div",{className:"title",children:[(0,_.jsxs)("div",{className:"txt",children:[(0,_.jsx)(D.Z,{htmlFor:"desc",children:e("oidc")}),(0,_.jsx)(k,{link:"https://doc.voce.chat/setting/third_login/login-webid"})]}),(0,_.jsx)("span",{className:"desc",children:e("oidc_desc")})]})}),(0,_.jsx)("div",{className:"row",children:(0,_.jsx)(V,{issuers:f,onChange:e=>{x((s=>s?{...s,oidc:e}:s))}})})]})]}),v&&(0,_.jsx)(p.Z,{saveHandler:async()=>{const{google:e}=d;m&&M(d),e&&s&&(await i(),m||u.ZP.success("Configuration Updated!")),L&&n&&(await c(),m||u.ZP.success("Configuration Updated!"))},resetHandler:N})]})}const X={disable:"Disable",official:"Use Official Configuration",custom:"Custom"};function q(){const{values:e,setValues:s,updateConfig:t,changed:a,reset:i}=(0,j.Z)("firebase"),{t:l}=(0,o.$)("setting");let n="";if(e){const{use_official:s,enabled:t=!1}=e;n=t?s?"official":"custom":"disable"}const c=e=>{const t=e.target.value,{type:a=""}=e.target.dataset;s((e=>e?{...e,[a]:t}:e))};if(!e)return null;const{token_url:r,project_id:M,private_key:u,client_email:x}=e;return(0,_.jsxs)(y,{children:[(0,_.jsx)(d.Z,{options:Object.values(X),values:Object.keys(X),value:n,onChange:t=>{let a=null;switch(t){case"custom":a={...e,enabled:!0,use_official:!1};break;case"official":a={...e,enabled:!0,use_official:!0};break;case"disable":a={...e,enabled:!1}}a&&s(a)}}),(0,_.jsxs)("fieldset",{className:"inputs",disabled:"custom"!==n,children:[(0,_.jsxs)("div",{className:"input",children:[(0,_.jsx)(D.Z,{htmlFor:"name",children:l("firebase.token_url")}),(0,_.jsx)(g.Z,{"data-type":"token_url",onChange:c,value:r,name:"token_url",placeholder:l("firebase.token_url")})]}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsx)(D.Z,{htmlFor:"desc",children:l("firebase.project_id")}),(0,_.jsx)(g.Z,{"data-type":"project_id",onChange:c,value:M,name:"project_id",placeholder:l("firebase.project_id")})]}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsx)(D.Z,{htmlFor:"desc",children:l("firebase.private_key")}),(0,_.jsx)(m.Z,{rows:10,spellCheck:!1,"data-type":"private_key",onChange:c,value:u,name:"private_key",placeholder:l("firebase.private_key")})]}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsx)(D.Z,{htmlFor:"desc",children:l("firebase.client_email")}),(0,_.jsx)(g.Z,{"data-type":"client_email",onChange:c,value:x,name:"client_email",placeholder:l("firebase.client_email")})]})]}),a&&(0,_.jsx)(p.Z,{saveHandler:()=>{t(e)},resetHandler:()=>{i()}})]})}const ee=t.p+"static/media/question.f1e6b7aab95b0ab2de07.svg",se=r.ZP.div`
  display: flex;
  gap: 16px;
  white-space: nowrap;
  margin-top: 24px;
`;function te(){const{t:e}=(0,o.$)("setting",{keyPrefix:"smtp"}),[s,t]=(0,a.useState)(""),[i,{isSuccess:l,isError:n}]=(0,x.D$)(),{reset:c,updateConfig:r,values:d,setValues:M,changed:N,toggleEnable:m}=(0,j.Z)("smtp"),h=e=>{const s=e.target.value,{type:t=""}=e.target.dataset;M((e=>e?{...e,[t]:s}:e))};if((0,a.useEffect)((()=>{l&&u.ZP.success("Send Test Email Successfully"),n&&u.ZP.error("Send Test Email Fail")}),[l,n]),!d)return null;const{host:I,port:w,from:T,username:L,password:O,enabled:z=!1}=d;return(0,_.jsxs)(y,{children:[(0,_.jsxs)("div",{className:"inputs",children:[(0,_.jsxs)("div",{className:"input row",children:[(0,_.jsx)(D.Z,{children:e("enable")}),(0,_.jsx)(E.Z,{onClick:m,"data-checked":z})]}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsx)(D.Z,{htmlFor:"name",children:e("host")}),(0,_.jsx)(g.Z,{disabled:!z,"data-type":"host",onChange:h,value:I,name:"host",placeholder:"SMTP Host"})]}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsx)(D.Z,{htmlFor:"desc",children:e("port")}),(0,_.jsx)(g.Z,{disabled:!z,type:"number","data-type":"port",onChange:h,value:w,name:"port",placeholder:"SMTP Port"})]}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsx)(D.Z,{htmlFor:"desc",children:e("from")}),(0,_.jsx)(g.Z,{disabled:!z,"data-type":"from",onChange:h,value:T,name:"from",placeholder:"SMTP From"})]}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsx)(D.Z,{htmlFor:"desc",children:e("username")}),(0,_.jsx)(g.Z,{disabled:!z,"data-type":"username",onChange:h,value:L,name:"username",placeholder:"SMTP Username"})]}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsx)(D.Z,{htmlFor:"desc",children:e("password")}),(0,_.jsx)(g.Z,{type:"password",disabled:!z,"data-type":"password",onChange:h,value:O,name:"password",placeholder:"SMTP Password"})]})]}),(0,_.jsxs)("div",{className:"tip",children:[(0,_.jsx)("img",{src:ee,alt:"question icon"}),(0,_.jsx)("a",{href:"https://doc.voce.chat/setting/smtp/smtp-gmail",target:"_blank",className:"link",rel:"noreferrer",children:e("how_to")})]}),(0,_.jsxs)(se,{children:[(0,_.jsx)(g.Z,{type:"email",disabled:!z,onChange:e=>{const s=e.target.value;t(s)},value:s,name:"email",placeholder:"test@email.com"}),(0,_.jsx)(Q.Z,{disabled:!z||!s,onClick:()=>{i({to:s,subject:"test title",content:"test content"})},children:e("send_test_email")})]}),N&&(0,_.jsx)(p.Z,{saveHandler:()=>{var e;r({...d,port:Number(null!==(e=null===d||void 0===d?void 0:d.port)&&void 0!==e?e:0)})},resetHandler:c})]})}const ae=r.ZP.div`
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
`,ie=r.ZP.div`
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
`;function le(){const{t:e}=(0,o.$)("setting"),{t:s}=(0,o.$)(),{updateConfig:t,values:i}=(0,j.Z)("login"),{data:l}=(0,x.BL)(),[n,{data:c,isSuccess:r,isLoading:d}]=(0,x.gU)();(0,a.useEffect)((()=>{r&&((0,z.Bn)(),u.ZP.success("Update API Secret Successfully!"))}),[r]);const M=null===i||void 0===i?void 0:i.third_party;return(0,_.jsxs)(ie,{children:[(0,_.jsx)(E.Z,{onClick:(e=>{t({...i,...e})}).bind(null,{third_party:!M}),"data-checked":M}),(0,_.jsxs)("div",{className:"input",children:[(0,_.jsxs)("label",{htmlFor:"secret",children:[" ",e("third_app.key"),":"]}),(0,_.jsx)(g.Z,{disabled:!M,type:"password",id:"secret",value:c||l})]}),(0,_.jsx)(O.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,_.jsxs)(ae,{children:[(0,_.jsx)("div",{className:"tip",children:e("third_app.update_tip")}),(0,_.jsxs)("div",{className:"btns",children:[(0,_.jsx)(Q.Z,{onClick:()=>(0,z.Bn)(),className:"cancel small",children:s("action.cancel")}),(0,_.jsx)(Q.Z,{disabled:d,className:"small danger",onClick:()=>n(),children:s("action.yes")})]})]}),children:(0,_.jsxs)(Q.Z,{disabled:!M,children:[" ",e("third_app.update")]})}),(0,_.jsx)("div",{className:"tip",children:e("third_app.key_tip")})]})}var ne=t(7699),ce=t.n(ne),re=t(51892),oe=t(80874),de=t(40698),Me=t(80308);const je=e=>{let{closeModal:s}=e;const{t:t}=(0,o.$)("setting"),{t:i}=(0,o.$)(),[l,{isLoading:n,isSuccess:c}]=(0,x.O2)(),[r,M]=(0,a.useState)(`${Me.kd[0].pid}|${Me.kd[0].limit}`);return(0,_.jsx)(oe.Z,{id:"modal-modal",children:(0,_.jsx)(de.Z,{title:t("license.renew"),description:t("license.renew_select"),buttons:(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(Q.Z,{onClick:s,className:"ghost",children:i("action.cancel")}),(0,_.jsx)(Q.Z,{disabled:n||c,onClick:async()=>{const[e,s]=r.split("|"),t=await l({priceId:e,metadata:{user_limit:Number(s),expire:"2035-01-01",domain:location.hostname.startsWith("localhost")?"*":location.hostname},cancel_url:location.href,success_url:`${location.origin}/#/cb/payment_success`});"error"in t?u.ZP.error("Payment link initialized failed!"):location.href=t.data.session_url},children:n?"Initialize Payment Url":c?"Redirecting":t("license.renew")})]}),children:(0,_.jsx)(d.Z,{options:Me.kd.map((e=>{let{title:s,desc:t}=e;return`${s} [${t}]`})),values:Me.kd.map((e=>{let{pid:s,limit:t}=e;return`${s}|${t}`})),value:r,onChange:e=>{M(e)}})})})};var ue=t(57425);const xe=e=>{let{closeModal:s,updateLicense:t,updating:i,updated:l}=e;const[n,c]=(0,a.useState)(""),{t:r}=(0,o.$)("setting"),{t:d}=(0,o.$)();return(0,a.useEffect)((()=>{l&&(u.ZP.success("Update Successfully!"),s())}),[l]),(0,_.jsx)(oe.Z,{id:"modal-modal",children:(0,_.jsx)(de.Z,{buttons:(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(Q.Z,{onClick:s,className:"ghost",children:d("action.cancel")}),(0,_.jsx)(Q.Z,{disabled:i||l||!n,onClick:()=>{t(n)},children:i?"Updating":l?"Update Successfully":r("license.update")})]}),children:(0,_.jsx)(m.Z,{rows:18,placeholder:r("license.update_placeholder"),value:n,onChange:e=>{c(e.target.value)}})})})},Ne=e=>{let{label:s,data:t,foldable:a=!1,...i}=e;const l=(0,ue.Z)("font-bold w-full cursor-pointer",a?" overflow-hidden text-ellipsis":"whitespace-pre-wrap break-all");return t?(0,_.jsxs)("div",{className:"whitespace-nowrap  flex flex-col items-start justify-start text-lg",children:[(0,_.jsx)("span",{className:"text-sm text-gray-400",children:s}),Array.isArray(t)?(0,_.jsx)("ul",{className:l,children:t.map((e=>(0,_.jsx)("li",{children:e},e)))}):(0,_.jsx)("span",{className:l,...i,children:t})]}):null};function ge(){const{t:e}=(0,o.$)("setting"),{license:s,reachLimit:t,upsertLicense:i,upserting:l,upserted:n}=(0,re.Z)(),[c,r]=(0,a.useState)(!1),[d,M]=(0,a.useState)(!1),[j,u]=(0,a.useState)(!0),x=()=>{r((e=>!e))},N=()=>{M((e=>!e))};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)("div",{className:"max-w-3xl flex flex-col justify-start items-start gap-4",children:[(0,_.jsxs)("div",{className:(0,ue.Z)("relative w-full p-3 rounded border-solid border flex flex-col gap-4 shadow",t?"border-red-600 bg-red-200/50":"border-green-600 bg-green-200/50"),children:[(0,_.jsx)(Ne,{label:e("license.signed"),data:null!==s&&void 0!==s&&s.sign?"Yes":"Not Yet"}),(0,_.jsx)(Ne,{label:e("license.domain"),data:null===s||void 0===s?void 0:s.domains}),(0,_.jsx)(Ne,{label:e("license.user_limit"),data:99999==(null===s||void 0===s?void 0:s.user_limit)?"No Limit":null===s||void 0===s?void 0:s.user_limit}),(0,_.jsx)(Ne,{label:e("license.expire"),data:ce()(null===s||void 0===s?void 0:s.expired_at).format("YYYY-MM-DD h:mm:ss A")}),(0,_.jsx)(Ne,{label:e("license.create"),data:ce()(null===s||void 0===s?void 0:s.created_at).format("YYYY-MM-DD h:mm:ss A")}),(0,_.jsx)(Ne,{label:e("license.value"),data:null===s||void 0===s?void 0:s.base58,foldable:j,title:j?"Click to see full text":"Click to fold text",onClick:()=>{u((e=>!e))}})]}),(0,_.jsxs)("div",{className:"flex gap-2",children:[(0,_.jsx)(Q.Z,{onClick:x,children:e("license.renew")}),(0,_.jsx)(Q.Z,{onClick:N,className:"ghost",children:e("license.update")})]}),(0,_.jsxs)("div",{className:"flex flex-col gap-4 bg-primary-500 text-white rounded drop-shadow-xl p-5",children:[(0,_.jsxs)("h2",{className:"text-2xl font-bold",children:[e("license.tip.title")," \ud83c\udf81"]}),(0,_.jsxs)("p",{className:"text-base flex flex-col",children:[(0,_.jsx)("span",{children:e("license.tip.user_test")}),(0,_.jsxs)("span",{children:[e("license.tip.booking")," ",(0,_.jsx)("a",{className:"underline text-lg text-green-200",href:"https://calendly.com/hansu/han-meeting",target:"_blank",rel:"noopener noreferrer",children:"https://calendly.com/hansu/han-meeting"})]}),(0,_.jsxs)("span",{children:[e("license.tip.wechat"),(0,_.jsx)("em",{className:"text-lg text-green-200",children:"Privoce"})]})]})]})]}),c&&(0,_.jsx)(je,{closeModal:x}),d&&(0,_.jsx)(xe,{updated:n,updating:l,updateLicense:i,closeModal:N})]})}var De=t(28489),me=t(61991);const pe=e=>{let{paramKey:s,paramDefault:t,remarks:a}=e;return(0,_.jsxs)("tr",{className:"bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100",children:[(0,_.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",children:s}),(0,_.jsx)("td",{className:"text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",children:t}),(0,_.jsx)("td",{className:"text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",children:a})]})};function _e(){const{t:e}=(0,o.$)("setting",{keyPrefix:"widget"});return(0,_.jsxs)("div",{className:"flex flex-col justify-start items-start",children:[(0,_.jsx)("div",{className:"text-gray-600 ",children:e("tip")}),(0,_.jsxs)("label",{htmlFor:"code",className:"text-gray-500 text-sm mt-5",children:[e("code"),":"]}),(0,_.jsx)(De.Z,{id:"code",language:"html",style:me.Z,className:"rounded",children:`\x3c!-- ${e("code_comment")} --\x3e\n<script \n  data-host-id="1" \n  data-close-width="48" \n  data-close-height="48" \n  data-open-width="380" \n  data-open-height="680" \n  src="${location.origin}/widget.js" \n  async \n/>`}),(0,_.jsxs)("div",{className:"text-gray-500 text-sm mt-5 mb-2",children:[e("config"),":"]}),(0,_.jsx)("div",{className:"w-[700px] border border-solid border-gray-300 rounded overflow-hidden",children:(0,_.jsxs)("table",{className:"min-w-full table-auto",children:[(0,_.jsx)("thead",{className:"border-b bg-gray-50",children:(0,_.jsx)("tr",{children:[e("param_key"),e("default_value"),e("remark")].map((e=>(0,_.jsx)("th",{scope:"col",className:"text-sm font-bold text-gray-900 px-6 py-4 text-left",children:e},e)))})}),(0,_.jsx)("tbody",{children:[{paramKey:"host-id",paramDefault:1,remarks:e("param_host")},{paramKey:"close-width",paramDefault:"48(px)",remarks:e("param_open_width")},{paramKey:"close-height",paramDefault:"48(px)",remarks:e("param_close_height")},{paramKey:"open-width",paramDefault:"380(px)",remarks:e("param_open_width")},{paramKey:"open-height",paramDefault:"680(px)",remarks:e("param_open_height")}].map((e=>(0,_.jsx)(pe,{...e},e.paramKey)))}),(0,_.jsx)("tfoot",{className:"border-t border-solid border-gray-200",children:(0,_.jsx)("tr",{children:(0,_.jsxs)("td",{colSpan:3,className:"text-gray-400 px-5 py-3 text-sm",children:["* All the parameters are optional, and prefixed by ",(0,_.jsx)("i",{className:"bg-gray-700 text-white px-1",children:"data-"})]})})})]})})]})}const he=t.p+"static/media/api.doc.step1.6f82c2aca55ec28ee335.png",Ie=t.p+"static/media/api.doc.step2.2e3c56272ce693dc840c.jpg",we=t.p+"static/media/api.doc.step3.5c6a7979e80284de4f33.png";var Te=t(75208),ye=t(26209);const Le=`${location.origin}/api/swagger`,Ee=()=>{const e=(0,M.CG)((e=>e.authData.token)),{copy:s}=(0,ye.Z)(),{t:t}=(0,o.$)("setting");return(0,_.jsxs)("section",{className:"flex flex-col justify-start items-start gap-4",children:[(0,_.jsx)("div",{className:"text-gray-500 ",children:t("api_doc.desc")}),(0,_.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,_.jsx)("h2",{className:"text-gray-700 text-xl font-bold",children:t("api_doc.access")}),(0,_.jsx)("a",{href:Le,target:"_blank",rel:"noopener noreferrer",className:"underline text-primary-600",children:Le})]}),(0,_.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,_.jsx)("h2",{className:"text-gray-700 text-xl font-bold",children:t("api_doc.use_method")}),(0,_.jsxs)("div",{className:" flex flex-col gap-6",children:[(0,_.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,_.jsxs)("h3",{className:"text-gray-700 text-lg",children:["\ud83d\udc49 ",t("api_doc.step_1")]}),(0,_.jsx)("img",{className:"border border-solid rounded-md border-gray-300 shadow-lg w-[85%]",src:he,alt:"step 1"})]}),(0,_.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,_.jsxs)("h3",{className:"text-gray-700 text-lg flex items-center gap-2",children:["\ud83d\udc49 ",t("api_doc.step_2")," ",(0,_.jsxs)("span",{className:"text-gray-500 text-sm",children:["(",t("api_doc.step_2_desc"),")"]})]}),(0,_.jsx)("div",{className:"flex flex-col border border-solid border-green-500 bg-green-100 rounded-md p-2 w-fit break-words text-sm relative",children:(0,_.jsxs)("p",{className:"max-w-4xl font-bold",children:[e,(0,_.jsx)(Te.Z,{onClick:()=>{s(e)},className:"absolute right-2 bottom-2 cursor-pointer"})]})}),(0,_.jsx)("img",{className:"border border-solid rounded-md border-gray-300 shadow-lg w-[85%]",src:Ie,alt:"step 2"})]}),(0,_.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,_.jsxs)("h3",{className:"text-gray-700 text-lg flex items-center gap-2",children:["\ud83d\udc49  ",t("api_doc.last")]}),(0,_.jsx)("img",{className:"border border-solid rounded-md border-gray-300 shadow-lg w-[85%]",src:we,alt:"step 3"})]})]})]})]})};var Oe=t(51205);const ze=()=>{const{t:e}=(0,o.$)("setting",{keyPrefix:"faq"}),{data:s}=(0,x.p5)();return(0,_.jsxs)("div",{className:"flex flex-col gap-3",children:[(0,_.jsxs)("div",{className:"item",children:[e("client_version"),": ","0.3.27"]}),(0,_.jsxs)("div",{className:"item",children:[e("server_version"),": ",s]}),(0,_.jsxs)("div",{className:"item",children:[e("build_time"),": ","1670293430"]})]})},fe=[{title:"general",items:[{name:"overview",component:(0,_.jsx)(T,{})},{name:"my_account",component:(0,_.jsx)(c.Z,{})},{name:"members",component:(0,_.jsx)(Oe.Z,{}),admin:!0}]},{title:"config",items:[{name:"firebase",component:(0,_.jsx)(q,{})},{name:"smtp",component:(0,_.jsx)(te,{})},{name:"login_method",component:(0,_.jsx)(J,{})},{name:"third_app",component:(0,_.jsx)(le,{})},{name:"widget",component:(0,_.jsx)(_e,{})},{name:"license",component:(0,_.jsx)(ge,{})}],admin:!0},{title:"about",items:[{name:"api_doc",component:(0,_.jsx)(Ee,{})},{name:"faq",component:(0,_.jsx)(ze,{})},{name:"terms",component:"Terms & Privacy"},{name:"feedback",component:"Email: han@privoce.com Wechat: Privoce"}]}],ve=()=>{const{t:e}=(0,o.$)("setting"),s=(0,M.CG)((e=>e.authData.user));return fe.map((s=>{const{title:t,items:a,...i}=s;return{title:e(`nav.${t}`),items:a.map((s=>{const{name:t,...a}=s;return{name:t,title:e(`nav.${t}`),...a}})),...i}})).filter((e=>!(null===s||void 0===s||!s.is_admin)||!e.admin))};var Ce=t(24645),be=t(34400);const Ae=(0,r.ZP)(de.Z)`
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
`,ke=e=>{let{closeModal:s}=e;const{t:t}=(0,o.$)("auth"),{t:i}=(0,o.$)(),[l,n]=(0,a.useState)(!1),{logout:c,exited:r,exiting:d,clearLocalData:M}=(0,be.Z)();return(0,a.useEffect)((()=>{r&&(l&&M(),u.ZP.success("Logout Successfully"))}),[r,l]),(0,_.jsx)(oe.Z,{id:"modal-modal",children:(0,_.jsx)(Ae,{title:t("logout.title"),description:t("logout.desc"),buttons:(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(Q.Z,{onClick:s,children:i("action.cancel")}),(0,_.jsx)(Q.Z,{onClick:()=>{c()},className:"danger",children:d?"Logging out":i("action.logout")})]}),children:(0,_.jsxs)("div",{className:"clear",children:[(0,_.jsx)("label",{htmlFor:"clear_cb",className:"txt",children:t("logout.clear_local")}),(0,_.jsx)(Ce.Z,{name:"clear_cb",checked:l,onChange:e=>{n(e.target.checked)}})]})})})};let Ue="";function Se(){const{t:e}=(0,o.$)(),[s]=(0,i.lr)(),t=ve(),c=t.map((e=>{let{items:s}=e;return s})).flat(),r=s.get("nav"),[d,M]=(0,a.useState)(!1),j=(0,l.s0)();Ue=Ue||(s.get("f")||"/");const u=()=>{M((e=>!e))},x=c.find((e=>e.name==r))||c[0];return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(n.Z,{nav:x,closeModal:()=>{j(Ue),Ue=""},title:e("setting"),navs:t,dangers:[{title:e("action.logout"),handler:u}],children:x.component}),d&&(0,_.jsx)(ke,{closeModal:u})]})}}}]);