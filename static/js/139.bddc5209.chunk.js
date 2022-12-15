"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[139],{48055:(e,s,t)=>{t.d(s,{Z:()=>c});var a,i=t(70537);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},l.apply(this,arguments)}const n=(e,s)=>{let{title:t,titleId:n,...c}=e;return i.createElement("svg",l({width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:s,"aria-labelledby":n},c),t?i.createElement("title",{id:n},t):null,a||(a=i.createElement("path",{d:"M5 7.5L10 12.5L15 7.5",stroke:"#344054",strokeWidth:1.67,strokeLinecap:"round",strokeLinejoin:"round"})))},c=(0,i.forwardRef)(n)},75208:(e,s,t)=>{t.d(s,{Z:()=>c});var a,i=t(70537);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},l.apply(this,arguments)}const n=(e,s)=>{let{title:t,titleId:n,...c}=e;return i.createElement("svg",l({width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:s,"aria-labelledby":n},c),t?i.createElement("title",{id:n},t):null,a||(a=i.createElement("path",{d:"M6 4C6 2.89543 6.89543 2 8 2H14C15.1046 2 16 2.89543 16 4V14C16 15.1046 15.1046 16 14 16H8C6.89543 16 6 15.1046 6 14V4ZM4 6.00001C4 5.25973 4.4022 4.61339 5 4.26758V14.5C5 15.8807 6.11929 17 7.5 17H13.7324C13.3866 17.5978 12.7403 18 12 18H7.5C5.567 18 4 16.433 4 14.5V6.00001Z",fill:"#475467"})))},c=(0,i.forwardRef)(n)},24645:(e,s,t)=>{t.d(s,{Z:()=>n});var a=t(57889),i=t(80683);const l=a.ZP.input`
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
`},48636:(e,s,t)=>{t.d(s,{Z:()=>r});var a=t(70537),i=t(27418),l=t(38289),n=t(65809);let c;function r(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"smtp";const[s,t]=(0,a.useState)(!1),[r,o]=(0,a.useState)(void 0),[d,{isSuccess:M,isLoading:u}]=(0,n.QP)(),[j,{isSuccess:x,isLoading:N}]=(0,n.WO)(),[g,{isSuccess:m,isLoading:p}]=(0,n.vF)(),[D,{isSuccess:h,isLoading:_}]=(0,n.FV)(),[w,{data:y}]=(0,n.bx)(),[I,{data:T}]=(0,n.kv)(),[f,{data:L}]=(0,n.rW)(),[E,{data:O}]=(0,n.Ke)(),z={login:d,smtp:j,agora:g,firebase:D},v={smtp:f,agora:w,firebase:E,login:I},b={login:M,smtp:x,agora:m,firebase:h},C={login:u,smtp:N,agora:p,firebase:_},A=z[e],k=v[e],U=b[e],S=C[e],Z=()=>{o(void 0)},P=()=>{o((e=>e&&"enabled"in e?{...e,enabled:!e.enabled}:e))};return(0,a.useEffect)((()=>{k()}),[]),(0,a.useEffect)((()=>{U&&(i.ZP.success("Configuration Updated!"),k())}),[U]),(0,a.useEffect)((()=>{const e=L||O||T||y;e&&(c=e,o(e))}),[L,O,T,y]),(0,a.useEffect)((()=>{r&&0!=Object.keys(r).length&&((0,l.isEqual)(c,r)?t(!1):t(!0))}),[r]),{updating:S,updated:U,reset:Z,changed:s,updateConfig:A,agoraConfig:y,values:r,setValues:o,toggleEnable:P}}},42712:(e,s,t)=>{t.d(s,{Z:()=>l});var a=t(70537),i=t(65809);function l(){const[e,s]=(0,a.useState)(!1),[t,l]=(0,a.useState)(),{data:n}=(0,i.R)(void 0,{refetchOnMountOrArgChange:!0}),[c,{isSuccess:r}]=(0,i.Ku)();(0,a.useEffect)((()=>{n&&l(n)}),[n]),(0,a.useEffect)((()=>{s(!r&&JSON.stringify(n)!==JSON.stringify(t))}),[n,t,r]);return{config:t,changed:e,updateGithubAuthConfig:e=>{l((s=>s?{...s,...e}:e))},updateGithubAuthConfigToServer:async()=>{t&&await c(t)},isSuccess:r}}},25089:(e,s,t)=>{t.d(s,{Z:()=>l});var a=t(70537),i=t(65809);function l(){const[e,s]=(0,a.useState)(!1),[t,l]=(0,a.useState)(""),{data:n}=(0,i.eM)(void 0,{refetchOnMountOrArgChange:!0}),[c,{isSuccess:r}]=(0,i.Qg)();(0,a.useEffect)((()=>{n&&l(n.client_id)}),[n]),(0,a.useEffect)((()=>{s(!r&&(null===n||void 0===n?void 0:n.client_id)!==t)}),[n,t,r]);return{config:n,changed:e,clientId:t,updateClientId:l,updateClientIdToServer:async()=>{t&&await c({client_id:t})},updateGoogleAuthConfig:c,isSuccess:r}}},51892:(e,s,t)=>{t.d(s,{Z:()=>n});var a=t(70537),i=t(65809),l=t(66160);const n=()=>{var e;const{userCount:s,isGuest:t}=(0,l.CG)((e=>({userCount:e.users.ids.length,isGuest:e.authData.guest}))),{data:n,refetch:c}=(0,i.qM)(void 0,{refetchOnMountOrArgChange:!0,skip:t}),[r,{isLoading:o,isSuccess:d}]=(0,i.U_)(),[M,{isSuccess:u,isLoading:j,reset:x}]=(0,i.yn)();(0,a.useEffect)((()=>{u&&(c(),x())}),[u]);return{reachLimit:s>=(null!==(e=null===n||void 0===n?void 0:n.user_limit)&&void 0!==e?e:Number.MAX_SAFE_INTEGER),license:n,checked:d,checking:o,upserting:j,upserted:u,checkLicense:e=>{r(e)},upsertLicense:async e=>{const s=await r(e);return!(!("data"in s)||!s.data.sign)&&await M(e)}}}},13997:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>MyAccount});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(70537),styled_components__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(57889),react_hot_toast__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(27418),_app_services_user__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(52334),_common_component_AvatarUploader__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(95727),_ProfileBasicEditModal__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(38593),_RemoveAccountConfirmModal__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(84213),_UpdatePasswordModal__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(63401),_app_store__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(66160),react_i18next__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(14566),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(80683);const StyledWrapper=styled_components__WEBPACK_IMPORTED_MODULE_10__.ZP.div`
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
`;function MyAccount(){const{t:t}=(0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.$G)("member"),{t:ct}=(0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.$G)(),[passwordModal,setPasswordModal]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[editModal,setEditModal]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),[removeConfirmVisible,setRemoveConfirmVisible]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[uploadAvatar,{isSuccess:uploadSuccess}]=(0,_app_services_user__WEBPACK_IMPORTED_MODULE_2__.C0)(),EditModalInfo={name:{label:t("username"),title:t("change_name"),intro:t("change_name_desc")},email:{label:t("email"),title:t("change_email"),intro:t("change_email_desc")}},loginUser=(0,_app_store__WEBPACK_IMPORTED_MODULE_7__.CG)((e=>{var s;return e.users.byId[(null===(s=e.authData.user)||void 0===s?void 0:s.uid)||0]}));(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{uploadSuccess&&react_hot_toast__WEBPACK_IMPORTED_MODULE_1__.ZP.success("update avatar successfully!")}),[uploadSuccess]);const handleBasicEdit=e=>{const{edit:s}=e.currentTarget.dataset;setEditModal(s)},closeBasicEditModal=()=>{setEditModal("")},togglePasswordModal=()=>{setPasswordModal((e=>!e))},toggleRemoveAccountModalVisible=()=>{setRemoveConfirmVisible((e=>!e))};if(!loginUser)return null;const{uid:uid,avatar:avatar,name:name,email:email}=loginUser;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(StyledWrapper,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"card",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_common_component_AvatarUploader__WEBPACK_IMPORTED_MODULE_3__.Z,{url:avatar,name:name,uploadImage:uploadAvatar}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"name",children:[name," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span",{className:"uid",children:["#",uid]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span",{className:"label",children:t("username")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span",{className:"txt",children:[name," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span",{className:"gray",children:[" #",uid]})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("button",{"data-edit":"name",onClick:handleBasicEdit,className:"btn",children:ct("action.edit")})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span",{className:"label",children:t("email")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span",{className:"txt",children:email})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("button",{"data-edit":"email",onClick:handleBasicEdit,className:"btn",children:ct("action.edit")})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div",{className:"info",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span",{className:"label",children:t("password")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span",{className:"txt",children:"*********"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("button",{onClick:togglePasswordModal,className:"btn",children:ct("action.edit")})]})]}),1!=uid&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{className:"danger",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("button",{className:"btn",onClick:toggleRemoveAccountModalVisible,children:t("delete_account")})})]}),editModal&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_ProfileBasicEditModal__WEBPACK_IMPORTED_MODULE_4__.Z,{type:"email"==editModal?"email":"text",valueKey:editModal,...EditModalInfo[editModal],value:eval(editModal),closeModal:closeBasicEditModal}),passwordModal&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_UpdatePasswordModal__WEBPACK_IMPORTED_MODULE_6__.Z,{closeModal:togglePasswordModal}),removeConfirmVisible&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_RemoveAccountConfirmModal__WEBPACK_IMPORTED_MODULE_5__.Z,{closeModal:toggleRemoveAccountModalVisible})]})}},38593:(e,s,t)=>{t.d(s,{Z:()=>u});var a=t(70537),i=t(27418),l=t(17237),n=t(52334),c=t(40698),r=t(69885),o=t(80874),d=t(14566),M=t(80683);const u=e=>{let{label:s="Username",valueKey:t="name",value:u="",type:j="text",title:x="Change your username",intro:N="Enter a new username and your existing password.",closeModal:g}=e;const m=(0,a.useRef)(null),{t:p}=(0,d.$G)(),[D,h]=(0,a.useState)(u),[_,{isLoading:w,isSuccess:y}]=(0,n.g$)();return(0,a.useEffect)((()=>{y&&(i.ZP.success("update user info successfully"),g())}),[y]),(0,M.jsx)(o.Z,{id:"modal-modal",children:(0,M.jsx)(c.Z,{title:x,description:N,buttons:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(r.Z,{className:"cancel",onClick:g,children:p("action.cancel")}),(0,M.jsx)(r.Z,{onClick:()=>{if(!m||!m.current)return;const e=m.current;e.checkValidity()?_({[t]:D}):e.reportValidity()},children:w?"Updating":p("action.done")})]}),children:(0,M.jsxs)("form",{ref:m,className:"flex flex-col gap-2 w-full",action:"/",children:[(0,M.jsx)("label",{htmlFor:t,className:"text-sm text-[#6b7280]",children:s}),(0,M.jsx)(l.Z,{name:t,value:D,onChange:e=>{h(e.target.value)},type:j,required:!0})]})})})}},84213:(e,s,t)=>{t.d(s,{Z:()=>d});var a=t(27418),i=t(80874),l=t(40698),n=t(69885),c=t(15312),r=t(14566),o=t(80683);const d=e=>{let{closeModal:s}=e;const{t:t}=(0,r.$G)("member"),[d,{isLoading:M}]=(0,c.O2)();return(0,o.jsx)(i.Z,{id:"modal-modal",children:(0,o.jsx)(l.Z,{title:t("remove_account"),description:t("remove_account_desc"),buttons:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.Z,{onClick:s,children:t("action.cancel",{ns:"common"})}),(0,o.jsx)(n.Z,{disabled:M,onClick:async()=>{try{await d()}catch(e){a.ZP.error("Remove Account Failed!")}},className:"danger",children:t("remove")})]})})})}},63401:(e,s,t)=>{t.d(s,{Z:()=>x});var a=t(70537),i=t(57889),l=t(27418),n=t(17237),c=t(15312),r=t(40698),o=t(69885),d=t(80874),M=t(14566),u=t(80683);const j=(0,i.ZP)(r.Z)`
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
`,x=e=>{let{closeModal:s}=e;const{t:t}=(0,M.$G)("member"),{data:i}=(0,c.I1)(),[r,x]=(0,a.useState)({current:"",newPassword:"",confirmPassword:""}),[N,{isLoading:g,isSuccess:m}]=(0,c.a3)(),p=e=>{const{type:s}=e.target.dataset;x((t=>({...t,[s]:e.target.value})))};(0,a.useEffect)((()=>{m&&(l.ZP.success("update password successfully"),s())}),[m]);const{current:D,newPassword:h,confirmPassword:_}=r,w=(null===i||void 0===i?void 0:i.password)&&!D||!h||!_||h!==_||g;return(0,u.jsx)(d.Z,{id:"modal-modal",children:(0,u.jsxs)(j,{title:t("change_pwd"),description:t("change_pwd_desc"),buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(o.Z,{className:"cancel",onClick:s,children:t("action.cancel",{ns:"common"})}),(0,u.jsx)(o.Z,{disabled:w,onClick:()=>{const{current:e,newPassword:s}=r;N({old_password:e,new_password:s})},children:g?"Updating":t("action.update",{ns:"common"})})]}),children:[(null===i||void 0===i?void 0:i.password)&&(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)("label",{htmlFor:"current",children:t("current_pwd")}),(0,u.jsx)(n.Z,{type:"password",id:"current",name:"current",value:D,"data-type":"current",onChange:p})]}),(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)("label",{htmlFor:"newPassword",children:t("new_pwd")}),(0,u.jsx)(n.Z,{type:"password",name:"newPassword",value:h,"data-type":"newPassword",onChange:p})]}),(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)("label",{htmlFor:"confirmPassword",children:t("confirm_new_pwd")}),(0,u.jsx)(n.Z,{onBlur:()=>{const{newPassword:e,confirmPassword:s}=r;e!==s&&l.ZP.error("Not same with new password")},type:"password",name:"confirmPassword",value:_,"data-type":"confirmPassword",onChange:p})]})]})})}},94681:(e,s,t)=>{t.r(s),t.d(s,{default:()=>Ye});var a=t(70537),i=t(64084),l=t(15924),n=t(7477),c=t(13997),r=t(57889),o=t(14566),d=t(15621),M=t(66160),u=t(48636),j=t(27418),x=t(65809),N=t(95727),g=t(17237),m=t(48540),p=t(64884),D=t(24563),h=t(80683);const _=()=>{const{t:e}=(0,o.$G)("setting"),{loginUser:s,server:t}=(0,M.CG)((e=>({loginUser:e.authData.user,server:e.server}))),[i,{isSuccess:l}]=(0,x.jd)(),[n]=(0,x.e2)(),[c,r]=(0,a.useState)(!1),[d,u]=(0,a.useState)(t),_=e=>{const s=e.target.value,{type:t=""}=e.target.dataset;u((e=>({...e,[t]:s})))};(0,a.useEffect)((()=>{t&&u(t)}),[t]),(0,a.useEffect)((()=>{l&&j.ZP.success("Update logo successfully!")}),[l]),(0,a.useEffect)((()=>{if(t&&d){const{name:e,description:s}=d,{name:a,description:i}=t;r(a!==e||i!==s)}}),[t,d]);const{name:w,description:y,logo:I}=d,T=null===s||void 0===s?void 0:s.is_admin;return s&&d?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"logo",children:[(0,h.jsx)("div",{className:"preview",children:(0,h.jsx)(N.Z,{disabled:!T,url:l?`${I}?t=${+new Date}`:I,name:w,uploadImage:i})}),T&&(0,h.jsx)("div",{className:"upload",children:(0,h.jsx)("div",{className:"tip",children:e("overview.upload_desc")})})]}),(0,h.jsxs)("div",{className:"inputs",children:[(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(m.Z,{htmlFor:"name",children:e("overview.name")}),(0,h.jsx)(g.Z,{disabled:!T,"data-type":"name",onChange:_,value:w,name:"name",id:"name",placeholder:"Server Name"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(m.Z,{htmlFor:"desc",children:e("overview.desc")}),(0,h.jsx)(p.Z,{disabled:!T,"data-type":"description",onChange:_,value:null!==y&&void 0!==y?y:"",rows:4,name:"name",id:"name",placeholder:"Tell the world a bit about this server"})]})]}),c&&(0,h.jsx)(D.Z,{saveHandler:()=>{const{name:e,description:s}=d;n({name:e,description:s})},resetHandler:()=>{u(t)}})]}):null},w=()=>{const{t:e,i18n:s}=(0,o.$G)("setting");return(0,h.jsxs)("div",{className:"setting",children:[(0,h.jsx)("p",{className:"label",children:e("overview.lang.title")}),(0,h.jsx)("p",{className:"tip",children:(0,h.jsx)("span",{className:"txt",children:e("overview.lang.desc")})}),(0,h.jsx)(d.Z,{options:[e("overview.lang.en"),e("overview.lang.zh"),e("overview.lang.jp")],values:["en","zh","jp"],value:s.language.split("-")[0],onChange:e=>{(e=>{s.changeLanguage(e)})(e)}})]})},y=r.ZP.div`
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
`;function I(){const{t:e}=(0,o.$G)("setting"),{loginUser:s}=(0,M.CG)((e=>({loginUser:e.authData.user}))),{values:t,updateConfig:a}=(0,u.Z)("login");if(!t)return null;const{who_can_sign_up:i,guest:l=!1}=t,n=null===s||void 0===s?void 0:s.is_admin;return(0,h.jsxs)(y,{children:[(0,h.jsx)(_,{}),n&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"setting",children:[(0,h.jsx)("p",{className:"label",children:e("overview.sign_up.title")}),(0,h.jsx)("p",{className:"tip",children:e("overview.sign_up.desc")}),(0,h.jsx)(d.Z,{options:[e("overview.sign_up.everyone"),e("overview.sign_up.invite")],values:["EveryOne","InvitationOnly"],value:i,onChange:e=>{var s;s=e,a({...t,who_can_sign_up:s})}})]}),(0,h.jsxs)("div",{className:"setting",children:[(0,h.jsx)("p",{className:"label",children:e("overview.guest_mode.title")}),(0,h.jsx)("p",{className:"tip",children:(0,h.jsx)("span",{className:"txt",children:e("overview.guest_mode.desc")})}),(0,h.jsx)(d.Z,{options:[e("overview.guest_mode.enable"),e("overview.guest_mode.disable")],values:["true","false"],value:String(l),onChange:e=>{(e=>{const s="true"===e;a({...t,guest:s})})(e)}})]})]}),(0,h.jsx)(w,{})]})}const T=r.ZP.div`
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
`;var f,L=t(9975),E=t(7829),O=t(69195);t(25515);function z(){return z=Object.assign?Object.assign.bind():function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},z.apply(this,arguments)}const v=(e,s)=>{let{title:t,titleId:i,...l}=e;return a.createElement("svg",z({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:s,"aria-labelledby":i},l),t?a.createElement("title",{id:i},t):null,f||(f=a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M14.4 7.99961C14.4 9.69699 13.7257 11.3249 12.5255 12.5251C11.3252 13.7253 9.69736 14.3996 7.99998 14.3996C6.30259 14.3996 4.67472 13.7253 3.47449 12.5251C2.27426 11.3249 1.59998 9.69699 1.59998 7.99961C1.59998 6.30222 2.27426 4.67436 3.47449 3.47413C4.67472 2.27389 6.30259 1.59961 7.99998 1.59961C9.69736 1.59961 11.3252 2.27389 12.5255 3.47413C13.7257 4.67436 14.4 6.30222 14.4 7.99961ZM7.99998 5.59961C7.85941 5.59947 7.7213 5.63637 7.59953 5.70659C7.47777 5.77682 7.37666 5.87788 7.30638 5.99961C7.25563 6.09391 7.18646 6.17706 7.10298 6.24414C7.0195 6.31121 6.92341 6.36084 6.82039 6.39009C6.71737 6.41934 6.60953 6.4276 6.50326 6.4144C6.39699 6.40119 6.29445 6.36679 6.20172 6.31322C6.109 6.25965 6.02797 6.18801 5.96344 6.10254C5.89891 6.01708 5.8522 5.91953 5.82608 5.81568C5.79995 5.71182 5.79494 5.60378 5.81135 5.49796C5.82775 5.39213 5.86523 5.29068 5.92158 5.19961C6.18575 4.7421 6.5935 4.38454 7.0816 4.18238C7.56969 3.98022 8.11085 3.94476 8.62115 4.0815C9.13145 4.21823 9.58237 4.51952 9.90399 4.93865C10.2256 5.35777 10.4 5.87131 10.4 6.39961C10.4001 6.8961 10.2463 7.38043 9.95978 7.78589C9.67324 8.19135 9.26803 8.498 8.79998 8.66361V8.79961C8.79998 9.01178 8.71569 9.21527 8.56566 9.36529C8.41563 9.51532 8.21215 9.59961 7.99998 9.59961C7.7878 9.59961 7.58432 9.51532 7.43429 9.36529C7.28426 9.21527 7.19998 9.01178 7.19998 8.79961V7.99961C7.19998 7.78744 7.28426 7.58395 7.43429 7.43392C7.58432 7.28389 7.7878 7.19961 7.99998 7.19961C8.21215 7.19961 8.41563 7.11532 8.56566 6.96529C8.71569 6.81527 8.79998 6.61178 8.79998 6.39961C8.79998 6.18744 8.71569 5.98395 8.56566 5.83392C8.41563 5.68389 8.21215 5.59961 7.99998 5.59961ZM7.99998 11.9996C8.21215 11.9996 8.41563 11.9153 8.56566 11.7653C8.71569 11.6153 8.79998 11.4118 8.79998 11.1996C8.79998 10.9874 8.71569 10.784 8.56566 10.6339C8.41563 10.4839 8.21215 10.3996 7.99998 10.3996C7.7878 10.3996 7.58432 10.4839 7.43429 10.6339C7.28426 10.784 7.19998 10.9874 7.19998 11.1996C7.19998 11.4118 7.28426 11.6153 7.43429 11.7653C7.58432 11.9153 7.7878 11.9996 7.99998 11.9996Z",fill:"#9CA3AF"})))},b=(0,a.forwardRef)(v),C=e=>{let{to:s,children:t}=e;return(0,h.jsx)("a",{href:s,className:"text-primary-500",target:"_blank",rel:"noreferrer",children:t})};function A(e){let{link:s="#"}=e;return(0,h.jsx)(E.ZP,{delay:[0,500],interactive:!0,arrow:O.ki,placement:"bottom",content:(0,h.jsx)("div",{className:"py-2 px-3 bg-gray-800 text-xs text-white rounded-lg",children:(0,h.jsx)(o.cC,{ns:"setting",i18nKey:"login.more_details",children:(0,h.jsx)(C,{to:s})})}),children:(0,h.jsx)(b,{className:"icon"})})}var k=t(18697),U=t(48055),S=t(63211);const Z=r.ZP.div`
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
`,P=e=>{var s;let{options:t=[],updateSelect:i=null,current:l=null}=e;const{t:n}=(0,o.$G)(),[c,r]=(0,a.useState)(!1),[d,M]=(0,a.useState)(null),u=()=>{r((e=>!e))},j=e=>{M(e),u(),i&&i(e)};return(0,h.jsx)(E.ZP,{visible:c,appendTo:document.body,placement:"bottom",interactive:!0,content:(0,h.jsx)(S.Z,{children:t.map((e=>{let{title:s,value:t,selected:a,underline:i}=e;return(0,h.jsxs)("li",{onClick:a?void 0:j.bind(null,{title:s,value:t}),className:"item sb "+(i?"bottom_line":""),"data-disabled":a,children:[s,a&&(0,h.jsx)(k.Z,{className:"icon"})]},t)}))}),children:(0,h.jsxs)(Z,{onClick:u,children:[(0,h.jsx)("span",{className:"txt",children:(null===(s=null!==l?l:d)||void 0===s?void 0:s.title)||n("action.select")}),(0,h.jsx)(U.Z,{className:"icon"})]})})};var Y=t(69885);const Q=JSON.parse('[{"title":"Google","value":"accounts.google.com","selected":false,"icon":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE1OTA1XzI0Njk1KSI+CjxwYXRoIGQ9Ik0yMy43NjYgMTIuMjc2M0MyMy43NjYgMTEuNDYwNSAyMy42OTk5IDEwLjY0MDQgMjMuNTU4OCA5LjgzNzg5SDEyLjI0VjE0LjQ1ODlIMTguNzIxN0MxOC40NTI4IDE1Ljk0OTIgMTcuNTg4NSAxNy4yNjc2IDE2LjMyMyAxOC4xMDU0VjIxLjEwMzdIMjAuMTlDMjIuNDYwOCAxOS4wMTM3IDIzLjc2NiAxNS45MjcyIDIzLjc2NiAxMi4yNzYzWiIgZmlsbD0iIzQyODVGNCIvPgo8cGF0aCBkPSJNMTIuMjQwMSAyNC4wMDEzQzE1LjQ3NjYgMjQuMDAxMyAxOC4yMDU5IDIyLjkzODcgMjAuMTk0NSAyMS4xMDQ0TDE2LjMyNzYgMTguMTA2QzE1LjI1MTcgMTguODM4IDEzLjg2MjcgMTkuMjUyNSAxMi4yNDQ1IDE5LjI1MjVDOS4xMTM4OCAxOS4yNTI1IDYuNDU5NDYgMTcuMTQwNCA1LjUwNzA1IDE0LjMwMDhIMS41MTY2VjE3LjM5MTdDMy41NTM3MSAyMS40NDM5IDcuNzAyOSAyNC4wMDEzIDEyLjI0MDEgMjQuMDAxM1oiIGZpbGw9IiMzNEE4NTMiLz4KPHBhdGggZD0iTTUuNTAyNTMgMTQuMzAwN0M0Ljk5OTg3IDEyLjgxMDMgNC45OTk4NyAxMS4xOTY1IDUuNTAyNTMgOS43MDYxOFY2LjYxNTIzSDEuNTE2NDlDLTAuMTg1NTEgMTAuMDA2IC0wLjE4NTUxIDE0LjAwMDkgMS41MTY0OSAxNy4zOTE2TDUuNTAyNTMgMTQuMzAwN1oiIGZpbGw9IiNGQkJDMDQiLz4KPHBhdGggZD0iTTEyLjI0MDEgNC43NDk2NkMxMy45NTA5IDQuNzIzMiAxNS42MDQ0IDUuMzY2OTcgMTYuODQzNCA2LjU0ODY3TDIwLjI2OTUgMy4xMjI2MkMxOC4xMDAxIDEuMDg1NSAxNS4yMjA4IC0wLjAzNDQ2NiAxMi4yNDAxIDAuMDAwODA4NjY2QzcuNzAyOSAwLjAwMDgwODY2NiAzLjU1MzcxIDIuNTU4MjIgMS41MTY2IDYuNjE0ODFMNS41MDI2NCA5LjcwNTc1QzYuNDUwNjQgNi44NjE3MyA5LjEwOTQ3IDQuNzQ5NjYgMTIuMjQwMSA0Ljc0OTY2WiIgZmlsbD0iI0VBNDMzNSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE1OTA1XzI0Njk1Ij4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="},{"title":"Facebook","value":"www.facebook.com","selected":false,"icon":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAxNkMzMiA3LjE2NDEzIDI0LjgzNTggMCAxNiAwQzcuMTY0MTMgMCAwIDcuMTY0MTMgMCAxNkMwIDIzLjk4NTMgNS44NTAxNiAzMC42MDQ5IDEzLjUwMDIgMzEuODA2N1YyMC42MjYxSDkuNDM2NjRWMTZIMTMuNTAwMlYxMi40NzQyQzEzLjUwMDIgOC40NjQ1NiAxNS44ODk4IDYuMjQ4MjkgMTkuNTQzOCA2LjI0ODI5QzIxLjI5NDMgNi4yNDgyOSAyMy4xMjU4IDYuNTYxMDIgMjMuMTI1OCA2LjU2MTAyVjEwLjQ5ODZIMjEuMTA3NUMxOS4xMjA4IDEwLjQ5ODYgMTguNDk5OCAxMS43MzE3IDE4LjQ5OTggMTIuOTk4NFYxNS45OTk5SDIyLjkzNjdMMjIuMjI4IDIwLjYyNkgxOC40OTk2VjMxLjgwNjRDMjYuMTQ5OCAzMC42MDcxIDMxLjk5OTggMjMuOTg3NiAzMS45OTk4IDE1Ljk5OTlMMzIgMTZaIiBmaWxsPSIjMTk3N0YzIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIuMjI4IDIwLjYyNkwyMi45MzY5IDE1Ljk5OTlIMTguNDk5OVYxMi45OTg0QzE4LjQ5OTkgMTEuNzMzOSAxOS4xMTg2IDEwLjQ5ODcgMjEuMTA3NyAxMC40OTg3SDIzLjEyNlY2LjU2MTA1QzIzLjEyNiA2LjU2MTA1IDIxLjI5NDUgNi4yNDgyOSAxOS41NDM5IDYuMjQ4MjlDMTUuODg5OSA2LjI0ODI5IDEzLjUwMDQgOC40NjIzOCAxMy41MDA0IDEyLjQ3NDJWMTZIOS40MzY3N1YyMC42MjYxSDEzLjUwMDRWMzEuODA2N0MxNC4zMTQ5IDMxLjkzNDcgMTUuMTQ5NiAzMiAxNi4wMDAxIDMyQzE2Ljg1MDcgMzIgMTcuNjg1NCAzMS45MzI1IDE4LjQ5OTkgMzEuODA2N1YyMC42MjYxSDIyLjIyODJMMjIuMjI4IDIwLjYyNloiIGZpbGw9IiNGRUZFRkUiLz4KPC9zdmc+Cg=="},{"title":"Gitlab","value":"www.gitlab.com","selected":false,"icon":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODAgMzgwIj4KPGRlZnM+CiAgICA8c3R5bGU+LmNscy0xe2ZpbGw6I2UyNDMyOTt9LmNscy0ye2ZpbGw6I2ZjNmQyNjt9LmNscy0ze2ZpbGw6I2ZjYTMyNjt9PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJMT0dPIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yODIuODMsMTcwLjczbC0uMjctLjY5LTI2LjE0LTY4LjIyYTYuODEsNi44MSwwLDAsMC0yLjY5LTMuMjQsNyw3LDAsMCwwLTgsLjQzLDcsNywwLDAsMC0yLjMyLDMuNTJsLTE3LjY1LDU0SDE1NC4yOWwtMTcuNjUtNTRBNi44Niw2Ljg2LDAsMCwwLDEzNC4zMiw5OWE3LDcsMCwwLDAtOC0uNDMsNi44Nyw2Ljg3LDAsMCwwLTIuNjksMy4yNEw5Ny40NCwxNzBsLS4yNi42OWE0OC41NCw0OC41NCwwLDAsMCwxNi4xLDU2LjFsLjA5LjA3LjI0LjE3LDM5LjgyLDI5LjgyLDE5LjcsMTQuOTEsMTIsOS4wNmE4LjA3LDguMDcsMCwwLDAsOS43NiwwbDEyLTkuMDYsMTkuNy0xNC45MSw0MC4wNi0zMCwuMS0uMDhBNDguNTYsNDguNTYsMCwwLDAsMjgyLjgzLDE3MC43M1oiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yODIuODMsMTcwLjczbC0uMjctLjY5YTg4LjMsODguMywwLDAsMC0zNS4xNSwxNS44TDE5MCwyMjkuMjVjMTkuNTUsMTQuNzksMzYuNTcsMjcuNjQsMzYuNTcsMjcuNjRsNDAuMDYtMzAsLjEtLjA4QTQ4LjU2LDQ4LjU2LDAsMCwwLDI4Mi44MywxNzAuNzNaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNMTUzLjQzLDI1Ni44OWwxOS43LDE0LjkxLDEyLDkuMDZhOC4wNyw4LjA3LDAsMCwwLDkuNzYsMGwxMi05LjA2LDE5LjctMTQuOTFTMjA5LjU1LDI0NCwxOTAsMjI5LjI1QzE3MC40NSwyNDQsMTUzLjQzLDI1Ni44OSwxNTMuNDMsMjU2Ljg5WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTEzMi41OCwxODUuODRBODguMTksODguMTksMCwwLDAsOTcuNDQsMTcwbC0uMjYuNjlhNDguNTQsNDguNTQsMCwwLDAsMTYuMSw1Ni4xbC4wOS4wNy4yNC4xNywzOS44MiwyOS44MnMxNy0xMi44NSwzNi41Ny0yNy42NFoiLz48L2c+PC9zdmc+"},{"title":"Paypal","value":"www.paypal.com","selected":false,"icon":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjMwMnB4IiB2aWV3Qm94PSIwIDAgMjU2IDMwMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+Cgk8Zz4KCQk8cGF0aCBkPSJNMjE3LjE2ODQ3NiwyMy41MDcwMTQ2IEMyMDMuMjM0MDc3LDcuNjI0Nzk2NTEgMTc4LjA0NTYxMiwwLjgxNTc1MzMzOCAxNDUuODIzMzU1LDAuODE1NzUzMzM4IEw1Mi4zMDMwNjE5LDAuODE1NzUzMzM4IEM0NS43MTA0NDMxLDAuODE1NzUzMzM4IDQwLjEwODM4MTksNS42MTAzODUyIDM5LjA3NjIwNDIsMTIuMTExNDM5OSBMMC4xMzY0NjgzMDIsMjU5LjA3NjYwMSBDLTAuNjM3NjY0OTY4LDI2My45NDYxNDkgMy4xMzMxMTMyMiwyNjguMzU3ODc2IDguMDY5MjUzMzEsMjY4LjM1Nzg3NiBMNjUuODA0NjEyLDI2OC4zNTc4NzYgTDgwLjMwNTA0MzgsMTc2LjM4NTg0OSBMNzkuODU1NTQ3MSwxNzkuMjY1OTU4IEM4MC44ODc3MjQ4LDE3Mi43NjQ5MDMgODYuNDQ4MTY1OSwxNjcuOTcwMjcyIDkzLjAzMjQ2MDcsMTY3Ljk3MDI3MiBMMTIwLjQ2ODQxLDE2Ny45NzAyNzIgQzE3NC4zNjYzOTgsMTY3Ljk3MDI3MiAyMTYuNTY5MTQ3LDE0Ni4wNzgxMTYgMjI4Ljg5NzAxMiw4Mi43NDkwMTk3IEMyMjkuMjYzMjY4LDgwLjg3NjExNjcgMjI5LjU3OTU4MSw3OS4wNTMxNTc3IDIyOS44NTQyNzMsNzcuMjcxODE4OCBDMjI4LjI5NzY4Myw3Ni40NDc3NDE0IDIyOC4yOTc2ODMsNzYuNDQ3NzQxNCAyMjkuODU0MjczLDc3LjI3MTgxODggQzIzMy41MjUxNjMsNTMuODY0NjkyNCAyMjkuODI5MzAxLDM3LjkzMjUzMDIgMjE3LjE2ODQ3NiwyMy41MDcwMTQ2IiBmaWxsPSIjMjczNDZBIj48L3BhdGg+CgkJPHBhdGggZD0iTTEwMi4zOTY5NzYsNjguODM5NTkyOSBDMTAzLjkzNjkxOSw2OC4xMDcwNzk3IDEwNS42NTE2NjUsNjcuNjk5MjAzIDEwNy40NDk2NTIsNjcuNjk5MjAzIEwxODAuNzY3NTY1LDY3LjY5OTIwMyBDMTg5LjQ0OTUxMSw2Ny42OTkyMDMgMTk3LjU0ODc3Niw2OC4yNjUyMzYgMjA0Ljk0ODgyNCw2OS40NTU1Njk5IEMyMDcuMDcxNDQ4LDY5Ljc5Njg1NDUgMjA5LjEyNzQ3OSw3MC4xODgwODMxIDIxMS4xMjUyNDIsNzAuNjM3NTc5OSBDMjEzLjEyMzAwNiw3MS4wNzg3NTI2IDIxNS4wNjI1MDEsNzEuNTc4MTkzNCAyMTYuOTQzNzI4LDcyLjEyNzU3ODMgQzIxNy44ODQzNDEsNzIuNDAyMjcwOCAyMTguODA4MzA3LDcyLjY4NTI4NzIgMjE5LjcxNTYyNCw3Mi45ODQ5NTE3IEMyMjMuMzUzMjE4LDc0LjIwMDI1NzcgMjI2Ljc0MTA5Miw3NS42MTUzNCAyMjkuODU0MjczLDc3LjI3MTgxODggQzIzMy41MjUxNjMsNTMuODU2MzY4MyAyMjkuODI5MzAxLDM3LjkzMjUzMDIgMjE3LjE2ODQ3NiwyMy41MDcwMTQ2IEMyMDMuMjI1NzUzLDcuNjI0Nzk2NTEgMTc4LjA0NTYxMiwwLjgxNTc1MzMzOCAxNDUuODIzMzU1LDAuODE1NzUzMzM4IEw1Mi4yOTQ3Mzc5LDAuODE1NzUzMzM4IEM0NS43MTA0NDMxLDAuODE1NzUzMzM4IDQwLjEwODM4MTksNS42MTAzODUyIDM5LjA3NjIwNDIsMTIuMTExNDM5OSBMMC4xMzY0NjgzMDIsMjU5LjA2ODI3NyBDLTAuNjM3NjY0OTY4LDI2My45NDYxNDkgMy4xMzMxMTMyMiwyNjguMzQ5NTUyIDguMDYwOTI5MywyNjguMzQ5NTUyIEw2NS44MDQ2MTIsMjY4LjM0OTU1MiBMOTUuODg3NTk3NCw3Ny41Nzk4MDczIEM5Ni41MDM1NzQ0LDczLjY2NzUyMDggOTkuMDE3NDI2NSw3MC40NjI3NzU2IDEwMi4zOTY5NzYsNjguODM5NTkyOSBaIiBmaWxsPSIjMjczNDZBIj48L3BhdGg+CgkJPHBhdGggZD0iTTIyOC44OTcwMTIsODIuNzQ5MDE5NyBDMjE2LjU2OTE0NywxNDYuMDY5NzkyIDE3NC4zNjYzOTgsMTY3Ljk3MDI3MiAxMjAuNDY4NDEsMTY3Ljk3MDI3MiBMOTMuMDI0MTM2NywxNjcuOTcwMjcyIEM4Ni40Mzk4NDE5LDE2Ny45NzAyNzIgODAuODc5NDAwNywxNzIuNzY0OTAzIDc5Ljg1NTU0NzEsMTc5LjI2NTk1OCBMNjEuODE3NDA5NSwyOTMuNjIxMjU4IEM2MS4xNDMxNjQ0LDI5Ny44ODMxNTMgNjQuNDM5NDczOCwzMDEuNzQ1NDk1IDY4Ljc1MTMxMjksMzAxLjc0NTQ5NSBMMTE3LjQyMTgyMSwzMDEuNzQ1NDk1IEMxMjMuMTgyMDM4LDMwMS43NDU0OTUgMTI4LjA4NDg4MiwyOTcuNTUwMTkyIDEyOC45ODM4NzYsMjkxLjg2NDg5MSBMMTI5LjQ1ODM0NCwyODkuMzg0MzM1IEwxMzguNjMxNDA3LDIzMS4yNDk0MjMgTDEzOS4yMjI0MTIsMjI4LjAzNjM1NCBDMTQwLjEyMTQwNiwyMjIuMzUxMDUzIDE0NS4wMjQyNSwyMTguMTU1NzUgMTUwLjc4NDQ2NywyMTguMTU1NzUgTDE1OC4wNjc5NzksMjE4LjE1NTc1IEMyMDUuMjE1MTkzLDIxOC4xNTU3NSAyNDIuMTMyMTkzLDE5OS4wMDIxOTQgMjUyLjkyMDExNSwxNDMuNjA1ODg0IEMyNTcuNDIzNDA2LDEyMC40NTY4MDIgMjU1LjA5MjY4MywxMDEuMTI4NDQyIDI0My4xODEwMTksODcuNTUxOTc1NiBDMjM5LjU2ODM5Nyw4My40Mzk5MTI5IDIzNS4wODE3NTQsODAuMDQzNzE1MyAyMjkuODU0MjczLDc3LjI3MTgxODggQzIyOS41NzEyNTcsNzkuMDYxNDgxNyAyMjkuMjYzMjY4LDgwLjg3NjExNjcgMjI4Ljg5NzAxMiw4Mi43NDkwMTk3IEwyMjguODk3MDEyLDgyLjc0OTAxOTcgWiIgZmlsbD0iIzI3OTBDMyI+PC9wYXRoPgoJCTxwYXRoIGQ9Ik0yMTYuOTUyMDUyLDcyLjEyNzU3ODMgQzIxNS4wNzA4MjUsNzEuNTc4MTkzNCAyMTMuMTMxMzMsNzEuMDc4NzUyNiAyMTEuMTMzNTY2LDcwLjYzNzU3OTkgQzIwOS4xMzU4MDMsNzAuMTk2NDA3MSAyMDcuMDcxNDQ4LDY5LjgwNTE3ODUgMjA0Ljk1NzE0OCw2OS40NjM4OTM5IEMxOTcuNTQ4Nzc2LDY4LjI2NTIzNiAxODkuNDU3ODM1LDY3LjY5OTIwMyAxODAuNzY3NTY1LDY3LjY5OTIwMyBMMTA3LjQ1Nzk3Niw2Ny42OTkyMDMgQzEwNS42NTE2NjUsNjcuNjk5MjAzIDEwMy45MzY5MTksNjguMTA3MDc5NyAxMDIuNDA1Myw2OC44NDc5MTY5IEM5OS4wMTc0MjY1LDcwLjQ3MTA5OTYgOTYuNTExODk4NCw3My42Njc1MjA4IDk1Ljg5NTkyMTQsNzcuNTg4MTMxMyBMODAuMzEzMzY3OCwxNzYuMzg1ODQ5IEw3OS44NjM4NzExLDE3OS4yNjU5NTggQzgwLjg4NzcyNDgsMTcyLjc2NDkwMyA4Ni40NDgxNjU5LDE2Ny45NzAyNzIgOTMuMDMyNDYwNywxNjcuOTcwMjcyIEwxMjAuNDc2NzM0LDE2Ny45NzAyNzIgQzE3NC4zNzQ3MjIsMTY3Ljk3MDI3MiAyMTYuNTc3NDcxLDE0Ni4wNzgxMTYgMjI4LjkwNTMzNiw4Mi43NDkwMTk3IEMyMjkuMjcxNTkyLDgwLjg3NjExNjcgMjI5LjU3OTU4MSw3OS4wNjE0ODE3IDIyOS44NjI1OTcsNzcuMjcxODE4OCBDMjI2Ljc0MTA5Miw3NS42MjM2NjQgMjIzLjM2MTU0Miw3NC4yMDAyNTc3IDIxOS43MjM5NDgsNzIuOTkzMjc1NyBDMjE4LjgxNjYzMSw3Mi42OTM2MTEyIDIxNy44OTI2NjUsNzIuNDAyMjcwOCAyMTYuOTUyMDUyLDcyLjEyNzU3ODMiIGZpbGw9IiMxRjI2NEYiPjwvcGF0aD4KCTwvZz4KPC9zdmc+"},{"title":"SolidWeb","value":"solidweb.org","selected":false,"icon":"data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjM1MiIgaGVpZ2h0PSIzMjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSJub25lIj4KICAgIDxwYXRoIGQ9Ik04Ny45NzI5NiAyODIuMzUyN0wyNy4yNDEzMyAxNzcuMDIyMDdjLTUuNjIwNDEtOS43NTc2NS01LjYyMDQxLTIxLjc3OTA4IDAtMzEuNTM2NzRMODcuOTcyOTYgNDAuMjMyOGM1LjY0NjQzLTkuNzgzNjcgMTYuMDgwNjEtMTUuNzk0MzkgMjcuMzIxNDMtMTUuNzk0MzloMTIxLjM4NTJjMTEuMjY2ODQgMCAyMS43MjcwNCA2LjAxMDcyIDI3LjMyMTQzIDE1Ljc5NDRsNjAuNzU3NjUgMTA1LjMwNDU4YzUuNjIwNDEgOS43NTc2NiA1LjYyMDQxIDIxLjc3OTA5IDAgMzEuNTM2NzRsLTYwLjczMTYzIDEwNS4zMzA2MWMtNS42NDY0MyA5Ljc4MzY3LTE2LjA4MDYxIDE1Ljc5NDM5LTI3LjMyMTQzIDE1Ljc5NDM5SDExNS4zNzI0NWMtMTEuMzE4ODgtLjA1MjA0LTIxLjcyNzA0LTYuMDg4NzgtMjcuMzk5NS0xNS44NDY0M3oiIGZpbGw9IiNGRkYiLz4KICAgIDxwYXRoIGQ9Ik05My4xNTEwMiAyNzUuMTk3MDhsLTU3LjExNDgtOTkuMDU5N2MtNS4zMDgxNi05LjE4NTItNS4zMDgxNi0yMC41MDQwOCAwLTI5LjY2MzI2bDU3LjExNDgtOTkuMDg1NzJjNS4zMzQxOC05LjIxMTIyIDE1LjE0Mzg4LTE0Ljg1NzY1IDI1LjczNDE4LTE0Ljg1NzY1aDExNC4yMjk2YzEwLjU5MDMgMCAyMC40MjYwMiA1LjY0NjQzIDI1LjczNDE4IDE0Ljg1NzY1bDU3LjE2Njg0IDk5LjAzMzY4YzUuMzA4MTYgOS4xODUyIDUuMzA4MTYgMjAuNTA0MDggMCAyOS42NjMyNkwyNTguODc1IDI3NS4yMjMxYy01LjMzNDE4IDkuMjExMjItMTUuMTQzODggMTQuODU3NjUtMjUuNzM0MTggMTQuODU3NjVIMTE4LjkzNzI0Yy0xMC42NDIzNCAwLTIwLjQ1MjA0LTUuNjcyNDUtMjUuNzg2MjItMTQuODgzNjd6IiBmaWxsPSIjN0M0REZGIi8+CiAgICA8cGF0aCBkPSJNMTE4LjQ2ODg4IDE0Mi4yMzI4aDExNy41MzQxOGMxLjQ4MzE2IDAgMi42NTQwOC0xLjE5Njk1IDIuNjU0MDgtMi42NTQwOXYtMjIuMDM5MjhjMC0xNC42NDk1LTExLjg5MTMyLTI2LjU0MDg1LTI2LjU0MDgxLTI2LjU0MDg1aC03MC41NjczNWMtMjAuNTMwMS0uMDI2LTM3LjE1NzIyIDE2LjYwMTA1LTM3LjE1NzIyIDM3LjEzMTE1LS4wMjU5NCA3LjgzMjE0IDYuMjcxIDE0LjEwMzA2IDE0LjA3NzEyIDE0LjEwMzA2ek0xMjkuOTk1OTIgMjM5LjYwMTE2SDIwMC4yMjVjMjEuMjA2NjMgMCAzOC40MzIxNC0xNy4yMjU1MSAzOC40MzIxNC0zOC40MzIxNCAwLTcuMDc3NTUtNS43MjQ0OS0xMi44MjgwNi0xMi44MjgwNi0xMi44MjgwNkgxMDYuOTQxODRjLTEuNDU3MTUgMC0yLjU1MDA1IDEuMTcwOTEtMi41NTAwNSAyLjU1djIzLjA1NDA4Yy0uMDI1OTcgMTQuMTgxMTIgMTEuNDc1MDUgMjUuNjU2MTIgMjUuNjA0MTMgMjUuNjU2MTJ6IiBmaWxsPSIjRjdGN0Y3Ii8+CiAgICA8cGF0aCBkPSJNMTA5LjU5NTkyIDEzOS4zMTg1bDg3LjY2Mjc1IDg3LjY2Mjc2YzUuODAyNTUgNS44MDI1NSAxNS4xOTU5MiA1LjgwMjU1IDIwLjk5ODQ3IDBsMTUuMTk1OTItMTUuMTk1OTJjNS44MDI1NS01LjgwMjU1IDUuODAyNTUtMTUuMTk1OTEgMC0yMC45OTg0N2wtODcuNjM2NzMtODcuNjYyNzVjLTUuODAyNTUtNS44MDI1NS0xNS4xOTU5Mi01LjgwMjU1LTIwLjk5ODQ3IDBsLTE1LjE5NTkyIDE1LjE5NTkyYy01Ljg1NDYgNS44MDI1NS01Ljg1NDYgMTUuMjIxOTQtLjAyNjAyIDIwLjk5ODQ3eiIgZmlsbD0iI0Y3RjdGNyIvPgogICAgPHBhdGggZmlsbD0iIzQ0NCIgb3BhY2l0eT0iLjMiIGQ9Ik0xOTguNjg5OCAyMjguNDY0NDNsLTUxLjQ5NDQtNDAuMTIzNDdoMTEuMzk2OTV6TTE0NC4zNTkxOCAxMDEuNjY2OThsNDAuNTY1ODIgNDAuNTY1ODFoMTMuNzY0OHoiLz4KICA8L2c+Cjwvc3ZnPg==","underline":true},{"title":"Custom","value":"","selected":false}]'),B=r.ZP.div`
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
`;var G;function R(){return R=Object.assign?Object.assign.bind():function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},R.apply(this,arguments)}const W=(e,s)=>{let{title:t,titleId:i,...l}=e;return a.createElement("svg",R({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:s,"aria-labelledby":i},l),t?a.createElement("title",{id:i},t):null,G||(G=a.createElement("path",{d:"M8.00004 1.33301C4.32004 1.33301 1.33337 4.31967 1.33337 7.99967C1.33337 11.6797 4.32004 14.6663 8.00004 14.6663C11.68 14.6663 14.6667 11.6797 14.6667 7.99967C14.6667 4.31967 11.68 1.33301 8.00004 1.33301ZM11.3334 8.66634H4.66671V7.33301H11.3334V8.66634Z",fill:"#D0D5DD"})))},K=(0,a.forwardRef)(W),F=e=>{let{issuers:s=[],onChange:t}=e;const{t:i}=(0,o.$G)(),[l,n]=(0,a.useState)(null),[c,r]=(0,a.useState)(""),d=!c&&!(null!==l&&void 0!==l&&l.value)||!(null!==l&&void 0!==l&&l.title)||s.some((e=>e.domain===c));return(0,h.jsx)(B,{children:(0,h.jsxs)("ul",{className:"issuers",children:[s.map((e=>{let{enable:a,favicon:i,domain:l}=e;return(0,h.jsxs)("li",{className:"issuer",children:[(0,h.jsxs)("div",{className:"left",children:[(0,h.jsx)(K,{className:"remove",onClick:()=>{t(s.filter((e=>e.domain!==l)))}}),(0,h.jsxs)("div",{className:"data",children:[Boolean(i)&&(0,h.jsx)("img",{src:i,alt:"logo",className:"icon"}),(0,h.jsx)(g.Z,{readOnly:!0,value:l,prefix:"https://",placeholder:"Issuer Domain",className:"url"})]})]}),(0,h.jsx)("div",{className:"right",children:(0,h.jsx)(L.Z,{"data-checked":a,onClick:()=>{t(s.map((e=>({...e,enable:e.domain===l?!a:e.enable}))))}})})]},l)})),(0,h.jsxs)("li",{className:"issuer add",children:[(0,h.jsxs)("div",{className:"left",children:[(0,h.jsx)(P,{options:Q.map((e=>({...e,selected:s.some((s=>s.domain===e.value))}))),current:l,updateSelect:n}),(0,h.jsx)("div",{className:"data",children:(0,h.jsx)(g.Z,{onChange:e=>{r(e.target.value)},readOnly:!(null===l||void 0===l||!l.value),value:(null===l||void 0===l?void 0:l.value)||c,prefix:"https://",placeholder:"domain.com",className:"url"})})]}),(0,h.jsx)("div",{className:"right",children:(0,h.jsx)(Y.Z,{disabled:d,onClick:()=>{const e=Q.find((e=>e.value===(null===l||void 0===l?void 0:l.value)));if(!e)return;const{icon:a,value:i}=e;t(s.concat({enable:!0,favicon:a||"",domain:i||c})),n(null),r("")},children:i("action.add")})})]})]})})};var V=t(25089),$=t(42712);function H(){const{t:e}=(0,o.$G)("setting",{keyPrefix:"login"}),{changed:s,clientId:t,updateClientId:a,updateClientIdToServer:i}=(0,V.Z)(),{config:l,changed:n,updateGithubAuthConfigToServer:c,updateGithubAuthConfig:r}=(0,$.Z)(),{values:d,updateConfig:M,setValues:x,reset:N,changed:p}=(0,u.Z)("login"),_=e=>{const{key:s}=e.target.dataset;s&&r({[s]:e.target.value})},w=e=>{x((s=>s?{...s,...e}:s))};if(!d)return null;const{google:y,magic_link:I,github:f,metamask:E,password:O,oidc:z=[]}=d,v=s||p||n;return(0,h.jsxs)(T,{children:[(0,h.jsxs)("div",{className:"inputs",children:[(0,h.jsx)("div",{className:"input",children:(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"title",children:[(0,h.jsx)("div",{className:"txt",children:(0,h.jsx)(m.Z,{children:e("password")})}),(0,h.jsx)("span",{className:"desc",children:e("password_desc")})]}),(0,h.jsx)(L.Z,{onClick:w.bind(null,{password:!O}),"data-checked":O})]})}),(0,h.jsx)("div",{className:"input",children:(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"title",children:[(0,h.jsx)("div",{className:"txt",children:(0,h.jsx)(m.Z,{children:e("magic_link")})}),(0,h.jsx)("span",{className:"desc",children:e("magic_link_desc")})]}),(0,h.jsx)(L.Z,{onClick:w.bind(null,{magic_link:!I}),"data-checked":I})]})}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"title",children:[(0,h.jsxs)("div",{className:"txt",children:[(0,h.jsx)(m.Z,{children:e("google")}),(0,h.jsx)(A,{link:"https://doc.voce.chat/setting/third_login/login-google"})]}),(0,h.jsx)("span",{className:"desc",children:e("google_desc")})]}),(0,h.jsx)(L.Z,{onClick:w.bind(null,{google:!y}),"data-checked":y})]}),(0,h.jsx)("div",{className:"row",children:(0,h.jsx)(g.Z,{disabled:!y,onChange:e=>{a(e.target.value)},placeholder:"Client ID",value:t})})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"title",children:[(0,h.jsxs)("div",{className:"txt",children:[(0,h.jsx)(m.Z,{children:e("github")}),(0,h.jsx)(A,{link:"https://doc.voce.chat/setting/third_login/login-github"})]}),(0,h.jsx)("span",{className:"desc",children:e("github_desc")})]}),(0,h.jsx)(L.Z,{onClick:w.bind(null,{github:!f}),"data-checked":f})]}),(0,h.jsxs)("div",{className:"row inputs",children:[(0,h.jsx)(g.Z,{disabled:!f,"data-key":"client_id",onChange:_,placeholder:"Github Client ID",value:null===l||void 0===l?void 0:l.client_id}),(0,h.jsx)(g.Z,{disabled:!f,"data-key":"client_secret",onChange:_,placeholder:"Github Client Secret",value:null===l||void 0===l?void 0:l.client_secret})]})]}),(0,h.jsx)("div",{className:"input",children:(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"title",children:[(0,h.jsxs)("div",{className:"txt",children:[(0,h.jsx)(m.Z,{children:e("metamask")}),(0,h.jsx)(A,{link:"https://doc.voce.chat/setting/third_login/login-metamask"})]}),(0,h.jsx)("span",{className:"desc",children:e("metamask_desc")})]}),(0,h.jsx)(L.Z,{onClick:w.bind(null,{metamask:!E}),"data-checked":E})]})}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)("div",{className:"row",children:(0,h.jsxs)("div",{className:"title",children:[(0,h.jsxs)("div",{className:"txt",children:[(0,h.jsx)(m.Z,{htmlFor:"desc",children:e("oidc")}),(0,h.jsx)(A,{link:"https://doc.voce.chat/setting/third_login/login-webid"})]}),(0,h.jsx)("span",{className:"desc",children:e("oidc_desc")})]})}),(0,h.jsx)("div",{className:"row",children:(0,h.jsx)(F,{issuers:z,onChange:e=>{x((s=>s?{...s,oidc:e}:s))}})})]})]}),v&&(0,h.jsx)(D.Z,{saveHandler:async()=>{const{google:e}=d;p&&M(d),e&&s&&(await i(),p||j.ZP.success("Configuration Updated!")),f&&n&&(await c(),p||j.ZP.success("Configuration Updated!"))},resetHandler:N})]})}const J={disable:"Disable",official:"Use Official Configuration",custom:"Custom"};function X(){const{values:e,setValues:s,updateConfig:t,changed:a,reset:i}=(0,u.Z)("firebase"),{t:l}=(0,o.$G)("setting");let n="";if(e){const{use_official:s,enabled:t=!1}=e;n=t?s?"official":"custom":"disable"}const c=e=>{const t=e.target.value,{type:a=""}=e.target.dataset;s((e=>e?{...e,[a]:t}:e))};if(!e)return null;const{token_url:r,project_id:M,private_key:j,client_email:x}=e;return(0,h.jsxs)(T,{children:[(0,h.jsx)(d.Z,{options:Object.values(J),values:Object.keys(J),value:n,onChange:t=>{let a=null;switch(t){case"custom":a={...e,enabled:!0,use_official:!1};break;case"official":a={...e,enabled:!0,use_official:!0};break;case"disable":a={...e,enabled:!1}}a&&s(a)}}),(0,h.jsxs)("fieldset",{className:"inputs",disabled:"custom"!==n,children:[(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(m.Z,{htmlFor:"name",children:l("firebase.token_url")}),(0,h.jsx)(g.Z,{"data-type":"token_url",onChange:c,value:r,name:"token_url",placeholder:l("firebase.token_url")})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(m.Z,{htmlFor:"desc",children:l("firebase.project_id")}),(0,h.jsx)(g.Z,{"data-type":"project_id",onChange:c,value:M,name:"project_id",placeholder:l("firebase.project_id")})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(m.Z,{htmlFor:"desc",children:l("firebase.private_key")}),(0,h.jsx)(p.Z,{rows:10,spellCheck:!1,"data-type":"private_key",onChange:c,value:j,name:"private_key",placeholder:l("firebase.private_key")})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(m.Z,{htmlFor:"desc",children:l("firebase.client_email")}),(0,h.jsx)(g.Z,{"data-type":"client_email",onChange:c,value:x,name:"client_email",placeholder:l("firebase.client_email")})]})]}),a&&(0,h.jsx)(D.Z,{saveHandler:()=>{t(e)},resetHandler:()=>{i()}})]})}const q=t.p+"static/media/question.f1e6b7aab95b0ab2de07.svg",ee=r.ZP.div`
  display: flex;
  gap: 16px;
  white-space: nowrap;
  margin-top: 24px;
`;function se(){const{t:e}=(0,o.$G)("setting",{keyPrefix:"smtp"}),[s,t]=(0,a.useState)(""),[i,{isSuccess:l,isError:n}]=(0,x.D$)(),{reset:c,updateConfig:r,values:d,setValues:M,changed:N,toggleEnable:p}=(0,u.Z)("smtp"),_=e=>{const s=e.target.value,{type:t=""}=e.target.dataset;M((e=>e?{...e,[t]:s}:e))};if((0,a.useEffect)((()=>{l&&j.ZP.success("Send Test Email Successfully"),n&&j.ZP.error("Send Test Email Fail")}),[l,n]),!d)return null;const{host:w,port:y,from:I,username:f,password:E,enabled:O=!1}=d;return(0,h.jsxs)(T,{children:[(0,h.jsxs)("div",{className:"inputs",children:[(0,h.jsxs)("div",{className:"input row",children:[(0,h.jsx)(m.Z,{children:e("enable")}),(0,h.jsx)(L.Z,{onClick:p,"data-checked":O})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(m.Z,{htmlFor:"name",children:e("host")}),(0,h.jsx)(g.Z,{disabled:!O,"data-type":"host",onChange:_,value:w,name:"host",placeholder:"SMTP Host"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(m.Z,{htmlFor:"desc",children:e("port")}),(0,h.jsx)(g.Z,{disabled:!O,type:"number","data-type":"port",onChange:_,value:y,name:"port",placeholder:"SMTP Port"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(m.Z,{htmlFor:"desc",children:e("from")}),(0,h.jsx)(g.Z,{disabled:!O,"data-type":"from",onChange:_,value:I,name:"from",placeholder:"SMTP From"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(m.Z,{htmlFor:"desc",children:e("username")}),(0,h.jsx)(g.Z,{disabled:!O,"data-type":"username",onChange:_,value:f,name:"username",placeholder:"SMTP Username"})]}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(m.Z,{htmlFor:"desc",children:e("password")}),(0,h.jsx)(g.Z,{type:"password",disabled:!O,"data-type":"password",onChange:_,value:E,name:"password",placeholder:"SMTP Password"})]})]}),(0,h.jsxs)("div",{className:"tip",children:[(0,h.jsx)("img",{src:q,alt:"question icon"}),(0,h.jsx)("a",{href:"https://doc.voce.chat/setting/smtp/smtp-gmail",target:"_blank",className:"link",rel:"noreferrer",children:e("how_to")})]}),(0,h.jsxs)(ee,{children:[(0,h.jsx)(g.Z,{type:"email",disabled:!O,onChange:e=>{const s=e.target.value;t(s)},value:s,name:"email",placeholder:"test@email.com"}),(0,h.jsx)(Y.Z,{disabled:!O||!s,onClick:()=>{i({to:s,subject:"test title",content:"test content"})},children:e("send_test_email")})]}),N&&(0,h.jsx)(D.Z,{saveHandler:()=>{var e;r({...d,port:Number(null!==(e=null===d||void 0===d?void 0:d.port)&&void 0!==e?e:0)})},resetHandler:c})]})}const te=r.ZP.div`
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
`,ae=r.ZP.div`
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
`;function ie(){const{t:e}=(0,o.$G)("setting"),{t:s}=(0,o.$G)(),{updateConfig:t,values:i}=(0,u.Z)("login"),{data:l}=(0,x.BL)(),[n,{data:c,isSuccess:r,isLoading:d}]=(0,x.gU)();(0,a.useEffect)((()=>{r&&((0,O.Bn)(),j.ZP.success("Update API Secret Successfully!"))}),[r]);const M=null===i||void 0===i?void 0:i.third_party;return(0,h.jsxs)(ae,{children:[(0,h.jsx)(L.Z,{onClick:(e=>{t({...i,...e})}).bind(null,{third_party:!M}),"data-checked":M}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsxs)("label",{htmlFor:"secret",children:[" ",e("third_app.key"),":"]}),(0,h.jsx)(g.Z,{disabled:!M,type:"password",id:"secret",value:c||l})]}),(0,h.jsx)(E.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,h.jsxs)(te,{children:[(0,h.jsx)("div",{className:"tip",children:e("third_app.update_tip")}),(0,h.jsxs)("div",{className:"btns",children:[(0,h.jsx)(Y.Z,{onClick:()=>(0,O.Bn)(),className:"cancel small",children:s("action.cancel")}),(0,h.jsx)(Y.Z,{disabled:d,className:"small danger",onClick:()=>n(),children:s("action.yes")})]})]}),children:(0,h.jsxs)(Y.Z,{disabled:!M,children:[" ",e("third_app.update")]})}),(0,h.jsx)("div",{className:"tip",children:e("third_app.key_tip")})]})}var le=t(7699),ne=t.n(le),ce=t(51892),re=t(80874),oe=t(40698),de=t(80308);const Me=e=>{let{closeModal:s}=e;const{t:t}=(0,o.$G)("setting"),{t:i}=(0,o.$G)(),[l,{isLoading:n,isSuccess:c}]=(0,x.O2)(),[r,M]=(0,a.useState)(`${de.kd[0].pid}|${de.kd[0].limit}`);return(0,h.jsx)(re.Z,{id:"modal-modal",children:(0,h.jsx)(oe.Z,{title:t("license.renew"),description:t("license.renew_select"),buttons:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Y.Z,{onClick:s,className:"ghost",children:i("action.cancel")}),(0,h.jsx)(Y.Z,{disabled:n||c,onClick:async()=>{const[e,s]=r.split("|"),t=await l({priceId:e,metadata:{user_limit:Number(s),expire:"2035-01-01",domain:location.hostname.startsWith("localhost")?"*":location.hostname},cancel_url:location.href,success_url:`${location.origin}/#/cb/payment_success`});"error"in t?j.ZP.error("Payment link initialized failed!"):location.href=t.data.session_url},children:n?"Initialize Payment Url":c?"Redirecting":t("license.renew")})]}),children:(0,h.jsx)(d.Z,{options:de.kd.map((e=>{let{title:s,desc:t}=e;return`${s} [${t}]`})),values:de.kd.map((e=>{let{pid:s,limit:t}=e;return`${s}|${t}`})),value:r,onChange:e=>{M(e)}})})})};var ue=t(57425);const je=e=>{let{closeModal:s,updateLicense:t,updating:i,updated:l}=e;const[n,c]=(0,a.useState)(""),{t:r}=(0,o.$G)("setting"),{t:d}=(0,o.$G)();return(0,a.useEffect)((()=>{l&&(j.ZP.success("Update Successfully!"),s())}),[l]),(0,h.jsx)(re.Z,{id:"modal-modal",children:(0,h.jsx)(oe.Z,{buttons:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Y.Z,{onClick:s,className:"ghost",children:d("action.cancel")}),(0,h.jsx)(Y.Z,{disabled:i||l||!n,onClick:()=>{t(n)},children:i?"Updating":l?"Update Successfully":r("license.update")})]}),children:(0,h.jsx)(p.Z,{rows:18,placeholder:r("license.update_placeholder"),value:n,onChange:e=>{c(e.target.value)}})})})},xe=e=>{let{label:s,data:t,foldable:a=!1,...i}=e;const l=(0,ue.Z)("font-bold w-full cursor-pointer",a?" overflow-hidden text-ellipsis":"whitespace-pre-wrap break-all");return t?(0,h.jsxs)("div",{className:"whitespace-nowrap  flex flex-col items-start justify-start text-lg",children:[(0,h.jsx)("span",{className:"text-sm text-gray-400",children:s}),Array.isArray(t)?(0,h.jsx)("ul",{className:l,children:t.map((e=>(0,h.jsx)("li",{children:e},e)))}):(0,h.jsx)("span",{className:l,...i,children:t})]}):null};function Ne(){const{t:e}=(0,o.$G)("setting"),{license:s,reachLimit:t,upsertLicense:i,upserting:l,upserted:n}=(0,ce.Z)(),[c,r]=(0,a.useState)(!1),[d,M]=(0,a.useState)(!1),[u,j]=(0,a.useState)(!0),x=()=>{r((e=>!e))},N=()=>{M((e=>!e))};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"max-w-3xl flex flex-col justify-start items-start gap-4",children:[(0,h.jsxs)("div",{className:(0,ue.Z)("relative w-full p-3 rounded border-solid border flex flex-col gap-4 shadow",t?"border-red-600 bg-red-200/50":"border-green-600 bg-green-200/50"),children:[(0,h.jsx)(xe,{label:e("license.signed"),data:null!==s&&void 0!==s&&s.sign?"Yes":"Not Yet"}),(0,h.jsx)(xe,{label:e("license.domain"),data:null===s||void 0===s?void 0:s.domains}),(0,h.jsx)(xe,{label:e("license.user_limit"),data:99999==(null===s||void 0===s?void 0:s.user_limit)?"No Limit":null===s||void 0===s?void 0:s.user_limit}),(0,h.jsx)(xe,{label:e("license.expire"),data:ne()(null===s||void 0===s?void 0:s.expired_at).format("YYYY-MM-DD h:mm:ss A")}),(0,h.jsx)(xe,{label:e("license.create"),data:ne()(null===s||void 0===s?void 0:s.created_at).format("YYYY-MM-DD h:mm:ss A")}),(0,h.jsx)(xe,{label:e("license.value"),data:null===s||void 0===s?void 0:s.base58,foldable:u,title:u?"Click to see full text":"Click to fold text",onClick:()=>{j((e=>!e))}})]}),(0,h.jsxs)("div",{className:"flex gap-2",children:[(0,h.jsx)(Y.Z,{onClick:x,children:e("license.renew")}),(0,h.jsx)(Y.Z,{onClick:N,className:"ghost",children:e("license.update")})]}),(0,h.jsxs)("div",{className:"flex flex-col gap-4 bg-primary-500 text-white rounded drop-shadow-xl p-5",children:[(0,h.jsxs)("h2",{className:"text-2xl font-bold",children:[e("license.tip.title")," \ud83c\udf81"]}),(0,h.jsxs)("p",{className:"text-base flex flex-col",children:[(0,h.jsx)("span",{children:e("license.tip.user_test")}),(0,h.jsxs)("span",{children:[e("license.tip.booking")," ",(0,h.jsx)("a",{className:"underline text-lg text-green-200",href:"https://calendly.com/hansu/han-meeting",target:"_blank",rel:"noopener noreferrer",children:"https://calendly.com/hansu/han-meeting"})]}),(0,h.jsxs)("span",{children:[e("license.tip.wechat"),(0,h.jsx)("em",{className:"text-lg text-green-200",children:"Privoce"})]})]})]})]}),c&&(0,h.jsx)(Me,{closeModal:x}),d&&(0,h.jsx)(je,{updated:n,updating:l,updateLicense:i,closeModal:N})]})}var ge=t(64559),me=t(61991);const pe=e=>{let{paramKey:s,paramDefault:t,remarks:a}=e;return(0,h.jsxs)("tr",{className:"bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100",children:[(0,h.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",children:s}),(0,h.jsx)("td",{className:"text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",children:t}),(0,h.jsx)("td",{className:"text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",children:a})]})};function De(){const{t:e}=(0,o.$G)("setting",{keyPrefix:"widget"});return(0,h.jsxs)("div",{className:"flex flex-col justify-start items-start",children:[(0,h.jsx)("div",{className:"text-gray-600 ",children:e("tip")}),(0,h.jsxs)("label",{htmlFor:"code",className:"text-gray-500 text-sm mt-5",children:[e("code"),":"]}),(0,h.jsx)(ge.Z,{id:"code",language:"html",style:me.Z,className:"rounded",children:`\x3c!-- ${e("code_comment")} --\x3e\n<script \n  data-host-id="1" \n  data-close-width="48" \n  data-close-height="48" \n  data-open-width="380" \n  data-open-height="680" \n  src="${location.origin}/widget.js" \n  async \n/>`}),(0,h.jsxs)("div",{className:"text-gray-500 text-sm mt-5 mb-2",children:[e("config"),":"]}),(0,h.jsx)("div",{className:"w-[700px] border border-solid border-gray-300 rounded overflow-hidden",children:(0,h.jsxs)("table",{className:"min-w-full table-auto",children:[(0,h.jsx)("thead",{className:"border-b bg-gray-50",children:(0,h.jsx)("tr",{children:[e("param_key"),e("default_value"),e("remark")].map((e=>(0,h.jsx)("th",{scope:"col",className:"text-sm font-bold text-gray-900 px-6 py-4 text-left",children:e},e)))})}),(0,h.jsx)("tbody",{children:[{paramKey:"host-id",paramDefault:1,remarks:e("param_host")},{paramKey:"close-width",paramDefault:"48(px)",remarks:e("param_open_width")},{paramKey:"close-height",paramDefault:"48(px)",remarks:e("param_close_height")},{paramKey:"open-width",paramDefault:"380(px)",remarks:e("param_open_width")},{paramKey:"open-height",paramDefault:"680(px)",remarks:e("param_open_height")}].map((e=>(0,h.jsx)(pe,{...e},e.paramKey)))}),(0,h.jsx)("tfoot",{className:"border-t border-solid border-gray-200",children:(0,h.jsx)("tr",{children:(0,h.jsxs)("td",{colSpan:3,className:"text-gray-400 px-5 py-3 text-sm",children:["* All the parameters are optional, and prefixed by ",(0,h.jsx)("i",{className:"bg-gray-700 text-white px-1",children:"data-"})]})})})]})})]})}var he=t(52334);const _e=e=>{let{closeModal:s}=e;const[t,{isSuccess:i,isLoading:l}]=(0,he.ny)(),n=(0,a.useRef)(null),{t:c}=(0,o.$G)("setting",{keyPrefix:"bot"}),{t:r}=(0,o.$G)();return(0,a.useEffect)((()=>{i&&(j.Am.success("Create Bot Successfully!"),s())}),[i]),(0,h.jsx)(re.Z,{id:"modal-modal",children:(0,h.jsx)(oe.Z,{title:c("create_title"),description:c("create_desc"),buttons:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Y.Z,{className:"cancel",onClick:s,children:r("action.cancel")}),(0,h.jsx)(Y.Z,{onClick:()=>{if(!n||!n.current)return;const e=n.current;if(!e.checkValidity())return void e.reportValidity();const s=new FormData(e),a={name:""};s.forEach(((e,s)=>{e&&(a[s]=e)})),t({is_bot:!0,is_admin:!1,gender:1,email:`bot_${(new Date).getTime()}@voce.chat`,password:"",...a})},children:l?"Updating":r("action.done")})]}),children:(0,h.jsxs)("form",{ref:n,className:"w-full flex flex-col gap-2",action:"/",children:[(0,h.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,h.jsx)("label",{htmlFor:"name",className:"text-sm text-[#6b7280]",children:"Name"}),(0,h.jsx)(g.Z,{name:"name",required:!0,placeholder:"Please input bot name"})]}),(0,h.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,h.jsx)("label",{htmlFor:"webhook_url",className:"text-sm text-[#6b7280]",children:"Webhook URL"}),(0,h.jsx)(g.Z,{name:"webhook_url",type:"url",placeholder:"Please input webhook url"})]})]})})})},we=e=>{let{uid:s,webhook:t,closeModal:i}=e;const[l,n]=(0,a.useState)(t),[c,{isSuccess:r,isLoading:d}]=(0,he.kD)(),M=(0,a.useRef)(null),{t:u}=(0,o.$G)("setting",{keyPrefix:"bot"}),{t:x}=(0,o.$G)();return(0,a.useEffect)((()=>{r&&(j.Am.success("Update Webhook URL Successfully!"),i())}),[r]),(0,h.jsx)(re.Z,{id:"modal-modal",children:(0,h.jsx)(oe.Z,{title:u("webhook_title"),description:u("webhook_desc"),buttons:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Y.Z,{className:"cancel",onClick:i.bind(null,void 0),children:x("action.cancel")}),(0,h.jsx)(Y.Z,{disabled:!l,onClick:()=>{var e;if(!M||!M.current)return;const t=M.current;if(!t.checkValidity())return void t.reportValidity();const a=(null===(e=new FormData(t).get("webhook"))||void 0===e?void 0:e.toString())||"";c({id:s,webhook_url:a})},children:d?"Updating":x("action.done")})]}),children:(0,h.jsxs)("form",{ref:M,className:"w-full flex flex-col gap-2",action:"/",children:[(0,h.jsx)("label",{htmlFor:"webhook",className:"text-sm text-[#6b7280]",children:"Webhook URL"}),(0,h.jsx)(g.Z,{name:"webhook",value:l,onChange:e=>{n(e.target.value)},type:"url"})]})})})};function ye(){const[e,s]=(0,a.useState)(!1),[t,i]=(0,a.useState)(void 0),l=(0,M.CG)((e=>Object.values(e.users.byId).filter((e=>!!e.is_bot)))),{t:n}=(0,o.$G)("setting",{keyPrefix:"bot"}),c=()=>{s((e=>!e))},r=e=>{i(e)};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"flex flex-col justify-start items-start gap-4",children:[(0,h.jsx)("div",{className:"text-gray-600 ",children:n("tip")}),(0,h.jsx)("div",{className:"w-[700px] border border-solid border-gray-300 rounded overflow-hidden",children:(0,h.jsxs)("table",{className:"min-w-full table-auto",children:[(0,h.jsx)("thead",{className:"border-b bg-gray-50",children:(0,h.jsx)("tr",{children:["ID",n("col_name"),n("col_api_key"),n("col_webhook"),n("col_opt")].map((e=>(0,h.jsx)("th",{scope:"col",className:"text-sm font-bold text-gray-900 px-6 py-4 text-left",children:e},e)))})}),(0,h.jsx)("tbody",{children:l.map((e=>{const{uid:s,webhook_url:t,name:a}=e;return(0,h.jsxs)("tr",{className:"bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100",children:[(0,h.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",children:["# ",s]}),(0,h.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",children:a}),(0,h.jsx)("td",{className:"text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",children:"api_key"}),(0,h.jsx)("td",{className:"text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",children:null!==t&&void 0!==t?t:"NULL"}),(0,h.jsx)("td",{className:"text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",children:(0,h.jsx)(Y.Z,{className:"mini",onClick:r.bind(null,{webhook:t,uid:s}),children:"Set Webhook"})})]},s)}))}),(0,h.jsx)("tfoot",{className:"border-t border-solid border-gray-200",children:(0,h.jsx)("tr",{children:(0,h.jsx)("td",{colSpan:3,className:"text-gray-400 px-5 py-3 text-sm",children:(0,h.jsx)(Y.Z,{onClick:c,children:"Create Bot"})})})})]})})]}),e&&(0,h.jsx)(_e,{closeModal:c}),t&&(0,h.jsx)(we,{closeModal:r,...t})]})}const Ie=t.p+"static/media/api.doc.step1.6f82c2aca55ec28ee335.png",Te=t.p+"static/media/api.doc.step2.2e3c56272ce693dc840c.jpg",fe=t.p+"static/media/api.doc.step3.5c6a7979e80284de4f33.png";var Le=t(75208),Ee=t(26209);const Oe=`${location.origin}/api/swagger`,ze=()=>{const e=(0,M.CG)((e=>e.authData.token)),{copy:s}=(0,Ee.Z)(),{t:t}=(0,o.$G)("setting");return(0,h.jsxs)("section",{className:"flex flex-col justify-start items-start gap-4",children:[(0,h.jsx)("div",{className:"text-gray-500 ",children:t("api_doc.desc")}),(0,h.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,h.jsx)("h2",{className:"text-gray-700 text-xl font-bold",children:t("api_doc.access")}),(0,h.jsx)("a",{href:Oe,target:"_blank",rel:"noopener noreferrer",className:"underline text-primary-600",children:Oe})]}),(0,h.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,h.jsx)("h2",{className:"text-gray-700 text-xl font-bold",children:t("api_doc.use_method")}),(0,h.jsxs)("div",{className:" flex flex-col gap-6",children:[(0,h.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,h.jsxs)("h3",{className:"text-gray-700 text-lg",children:["\ud83d\udc49 ",t("api_doc.step_1")]}),(0,h.jsx)("img",{className:"border border-solid rounded-md border-gray-300 shadow-lg w-[85%]",src:Ie,alt:"step 1"})]}),(0,h.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,h.jsxs)("h3",{className:"text-gray-700 text-lg flex items-center gap-2",children:["\ud83d\udc49 ",t("api_doc.step_2")," ",(0,h.jsxs)("span",{className:"text-gray-500 text-sm",children:["(",t("api_doc.step_2_desc"),")"]})]}),(0,h.jsx)("div",{className:"flex flex-col border border-solid border-green-500 bg-green-100 rounded-md p-2 w-fit break-words text-sm relative",children:(0,h.jsxs)("p",{className:"max-w-4xl font-bold",children:[e,(0,h.jsx)(Le.Z,{onClick:()=>{s(e)},className:"absolute right-2 bottom-2 cursor-pointer"})]})}),(0,h.jsx)("img",{className:"border border-solid rounded-md border-gray-300 shadow-lg w-[85%]",src:Te,alt:"step 2"})]}),(0,h.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,h.jsxs)("h3",{className:"text-gray-700 text-lg flex items-center gap-2",children:["\ud83d\udc49  ",t("api_doc.last")]}),(0,h.jsx)("img",{className:"border border-solid rounded-md border-gray-300 shadow-lg w-[85%]",src:fe,alt:"step 3"})]})]})]})]})};var ve=t(51205);const be=()=>{const{t:e}=(0,o.$G)("setting",{keyPrefix:"faq"}),{data:s}=(0,x.p5)();return(0,h.jsxs)("div",{className:"flex flex-col gap-3",children:[(0,h.jsxs)("div",{className:"item",children:[e("client_version"),": ","0.3.29"]}),(0,h.jsxs)("div",{className:"item",children:[e("server_version"),": ",s]}),(0,h.jsxs)("div",{className:"item",children:[e("build_time"),": ","1671073094"]})]})},Ce=[{title:"general",items:[{name:"overview",component:(0,h.jsx)(I,{})},{name:"my_account",component:(0,h.jsx)(c.Z,{})},{name:"members",component:(0,h.jsx)(ve.Z,{}),admin:!0}]},{title:"config",items:[{name:"bot",component:(0,h.jsx)(ye,{}),admin:!0},{name:"firebase",component:(0,h.jsx)(X,{})},{name:"smtp",component:(0,h.jsx)(se,{})},{name:"login_method",component:(0,h.jsx)(H,{})},{name:"third_app",component:(0,h.jsx)(ie,{})},{name:"widget",component:(0,h.jsx)(De,{})},{name:"license",component:(0,h.jsx)(Ne,{})}],admin:!0},{title:"about",items:[{name:"api_doc",component:(0,h.jsx)(ze,{})},{name:"faq",component:(0,h.jsx)(be,{})},{name:"terms",component:"Terms & Privacy"},{name:"feedback",component:(0,h.jsxs)("ul",{className:"flex flex-col gap-2 text-lg",children:[(0,h.jsxs)("li",{children:["Email: ",(0,h.jsx)("strong",{className:"font-bold",children:"han@privoce.com"})]}),(0,h.jsxs)("li",{children:["Wechat: ",(0,h.jsx)("strong",{className:"font-bold",children:"Privoce"})]}),(0,h.jsxs)("li",{children:["Github:",(0,h.jsxs)("strong",{className:"font-bold",children:[(0,h.jsx)("a",{className:"text-[#06b6d4] underline underline-offset-2",href:"https://github.com/Privoce/vocechat-web/issues",target:"_blank",rel:"noopener noreferrer",children:"vocechat-web/issues"})," "]})]})]})}]}],Ae=()=>{const{t:e}=(0,o.$G)("setting"),s=(0,M.CG)((e=>e.authData.user));return Ce.map((s=>{const{title:t,items:a,...i}=s;return{title:e(`nav.${t}`),items:a.map((s=>{const{name:t,...a}=s;return{name:t,title:e(`nav.${t}`),...a}})),...i}})).filter((e=>!(null===s||void 0===s||!s.is_admin)||!e.admin))};var ke=t(24645),Ue=t(34400);const Se=(0,r.ZP)(oe.Z)`
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
`,Ze=e=>{let{closeModal:s}=e;const{t:t}=(0,o.$G)("auth"),{t:i}=(0,o.$G)(),[l,n]=(0,a.useState)(!1),{logout:c,exited:r,exiting:d,clearLocalData:M}=(0,Ue.Z)();return(0,a.useEffect)((()=>{r&&(l&&M(),j.ZP.success("Logout Successfully"))}),[r,l]),(0,h.jsx)(re.Z,{id:"modal-modal",children:(0,h.jsx)(Se,{title:t("logout.title"),description:t("logout.desc"),buttons:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Y.Z,{onClick:s,children:i("action.cancel")}),(0,h.jsx)(Y.Z,{onClick:()=>{c()},className:"danger",children:d?"Logging out":i("action.logout")})]}),children:(0,h.jsxs)("div",{className:"clear",children:[(0,h.jsx)("label",{htmlFor:"clear_cb",className:"txt",children:t("logout.clear_local")}),(0,h.jsx)(ke.Z,{name:"clear_cb",checked:l,onChange:e=>{n(e.target.checked)}})]})})})};let Pe="";function Ye(){const{t:e}=(0,o.$G)(),[s]=(0,i.lr)(),t=Ae(),c=t.map((e=>{let{items:s}=e;return s})).flat(),r=s.get("nav"),[d,M]=(0,a.useState)(!1),u=(0,l.s0)();Pe=Pe||(s.get("f")||"/");const j=()=>{M((e=>!e))},x=c.find((e=>e.name==r))||c[0];return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(n.Z,{nav:x,closeModal:()=>{u(Pe),Pe=""},title:e("setting"),navs:t,dangers:[{title:e("action.logout"),handler:j}],children:x.component}),d&&(0,h.jsx)(Ze,{closeModal:j})]})}}}]);