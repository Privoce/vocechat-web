"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[213],{8036:(e,t,i)=>{i.d(t,{Z:()=>h});var n,o,r=i(7313);function l(){return l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},l.apply(this,arguments)}const a=(e,t)=>{let{title:i,titleId:a,...c}=e;return r.createElement("svg",l({width:25,height:24,viewBox:"0 0 25 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},c),i?r.createElement("title",{id:a},i):null,n||(n=r.createElement("g",{clipPath:"url(#clip0_14990_39524)"},r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.5 0C5.8724 0 0.5 5.3808 0.5 12.0204C0.5 17.3304 3.938 21.8364 8.7068 23.4252C9.3068 23.5356 9.5252 23.1648 9.5252 22.8456C9.5252 22.5612 9.5156 21.804 9.5096 20.802C6.1712 21.528 5.4668 19.1904 5.4668 19.1904C4.922 17.8008 4.1348 17.4312 4.1348 17.4312C3.0452 16.6872 4.2176 16.7016 4.2176 16.7016C5.4212 16.7856 6.0548 17.94 6.0548 17.94C7.1252 19.776 8.864 19.2456 9.5468 18.9384C9.6572 18.162 9.9668 17.6328 10.31 17.3328C7.646 17.0292 4.844 15.9972 4.844 11.3916C4.844 10.08 5.312 9.006 6.0788 8.166C5.9552 7.8624 5.5436 6.6396 6.1964 4.986C6.1964 4.986 7.2044 4.662 9.4964 6.2172C10.4753 5.95022 11.4853 5.81423 12.5 5.8128C13.52 5.8176 14.546 5.9508 15.5048 6.2172C17.7956 4.662 18.8012 4.9848 18.8012 4.9848C19.4564 6.6396 19.0436 7.8624 18.9212 8.166C19.6892 9.006 20.1548 10.08 20.1548 11.3916C20.1548 16.0092 17.348 17.0256 14.6756 17.3232C15.1064 17.694 15.4892 18.4272 15.4892 19.5492C15.4892 21.1548 15.4748 22.452 15.4748 22.8456C15.4748 23.1672 15.6908 23.5416 16.3004 23.424C18.69 22.6225 20.7672 21.0904 22.2386 19.0441C23.7099 16.9977 24.501 14.5408 24.5 12.0204C24.5 5.3808 19.1264 0 12.5 0Z",fill:"black"}))),o||(o=r.createElement("defs",null,r.createElement("clipPath",{id:"clip0_14990_39524"},r.createElement("rect",{width:24,height:24,fill:"white",transform:"translate(0.5)"})))))},c=(0,r.forwardRef)(a);var s=i(9184),d=i(1296),g=i(6417);const p=(0,s.ZP)(d.Z)`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #344054;
  border: 1px solid #d0d5dd;
  background: none !important;
  .icon {
    width: 24px;
    height: 24px;
  }
`;function h(e){let{config:t={}}=e;const{client_id:i}=t;return(0,g.jsxs)(p,{onClick:()=>{location.href=`http://github.com/login/oauth/authorize?client_id=${i}`},children:[(0,g.jsx)(c,{className:"icon"}),"Sign in with Github"]})}},1618:(e,t,i)=>{i.d(t,{Z:()=>s});var n=i(2338);const o=i.p+"static/media/google.db7474a481e12799b961.svg";var r=i(9184),l=i(1296),a=i(6417);const c=(0,r.ZP)(l.Z)`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #344054;
  border: 1px solid #d0d5dd;
  background: none !important;
  .icon {
    width: 24px;
    height: 24px;
  }
`;function s(e){let{login:t,clientId:i}=e;const{signIn:r,loaded:l}=(0,n.useGoogleLogin)({onScriptLoadFailure:e=>{},clientId:i,onSuccess:e=>{let{tokenId:i,...n}=e;t({id_token:i,type:"google"})},onFailure:e=>{}});return(0,a.jsxs)(c,{disabled:!l,onClick:()=>{r()},children:[(0,a.jsx)("img",{className:"icon",src:o,alt:"google icon"}),l?"Sign in with Google":"Initailizing"]})}},3656:(e,t,i)=>{i.d(t,{Z:()=>r});var n=i(7313),o=i(4695);function r(){const[e,t]=(0,n.useState)(!1),[i,r]=(0,n.useState)({}),{data:l}=(0,o.R)(void 0,{refetchOnMountOrArgChange:!0}),[a,{isSuccess:c}]=(0,o.Ku)();(0,n.useEffect)((()=>{l&&r(l)}),[l]),(0,n.useEffect)((()=>{t(!c&&JSON.stringify(l)!==JSON.stringify(i))}),[l,i,c]);return{config:i,changed:e,updateGithubAuthConfig:e=>{r((t=>({...t,...e})))},updateGithubAuthConfigToServer:async()=>{await a(i)},isSuccess:c}}},8536:(e,t,i)=>{i.d(t,{Z:()=>r});var n=i(7313),o=i(4695);function r(){const[e,t]=(0,n.useState)(!1),[i,r]=(0,n.useState)(""),{data:l}=(0,o.eM)(void 0,{refetchOnMountOrArgChange:!0}),[a,{isSuccess:c}]=(0,o.Qg)();(0,n.useEffect)((()=>{l&&r(l.client_id)}),[l]),(0,n.useEffect)((()=>{t(!c&&(null===l||void 0===l?void 0:l.client_id)!==i)}),[l,i,c]);return{config:l,changed:e,clientId:i,updateClientId:r,updateClientIdToServer:async()=>{i&&await a({client_id:i})},updateGoogleAuthConfig:a,isSuccess:c}}},9914:(e,t,i)=>{i.r(t),i.d(t,{default:()=>x});var n=i(7890),o=i(2867),r=i(9184),l=i(6417);const a=r.ZP.p`
  text-align: center;
  margin: 24px 0 8px;
  > span {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
    margin-right: 4px;
  }

  > a {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #22d3ee;
    cursor: pointer;
  }
`;function c(){const e=(0,n.s0)();return(0,l.jsxs)(a,{children:[(0,l.jsx)("span",{children:"Have an account?"}),(0,l.jsx)("a",{onClick:()=>{e("/login")},children:"Sign In"})]})}var s=i(4695),d=i(3656),g=i(8536),p=i(1618),h=i(8036);const u=r.ZP.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form {
    max-width: 440px;
    padding: 36px 40px 32px 40px;
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
    border-radius: 12px;
    .tips {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 24px;
      .logo {
        width: 56px;
        height: 56px;
        margin-bottom: 28px;
        border-radius: 50%;
      }
      .title {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #101828;
        margin-bottom: 8px;
        &.error {
          color: red;
        }
      }
      .desc {
        text-align: center;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #667085;
      }
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 360px;
    }
  }
  .or {
    border: none;
    position: relative;
    height: 1px;
    background-color: #e4e7ec;
    margin: 26px 0;
    &:after {
      padding: 4px;
      background-color: #fff;
      content: "OR";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      font-size: 14px;
      line-height: 20px;
      color: #667085;
    }
  }
`;function x(){const e=(0,n.bS)("/register"),{clientId:t}=(0,g.Z)(),{config:i}=(0,d.Z)(),{data:r,isSuccess:a}=(0,s.ww)();if(!a)return null;const{github:x,google:f,who_can_sign_up:m}=r,C=f&&t;return"EveryOne"!==m?"Open Register is Closed!":(0,l.jsx)(u,{children:(0,l.jsxs)("div",{className:"form",children:[e&&(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:"tips",children:[(0,l.jsx)("img",{src:`${o.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,l.jsx)("h2",{className:"title",children:"Sign Up to Rustchat"}),(0,l.jsx)("span",{className:"desc",children:"Please enter your details."})]})}),(0,l.jsx)(n.j3,{}),e&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("hr",{className:"or"}),C&&(0,l.jsx)(p.Z,{clientId:t}),x&&(0,l.jsx)(h.Z,{config:i}),(0,l.jsx)(c,{})]})]})})}}}]);