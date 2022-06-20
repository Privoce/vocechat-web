"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[213],{8036:(e,t,i)=>{i.d(t,{Z:()=>h});var n,o,r=i(7313);function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},s.apply(this,arguments)}const c=(e,t)=>{let{title:i,titleId:c,...l}=e;return r.createElement("svg",s({width:25,height:24,viewBox:"0 0 25 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":c},l),i?r.createElement("title",{id:c},i):null,n||(n=r.createElement("g",{clipPath:"url(#clip0_14990_39524)"},r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.5 0C5.8724 0 0.5 5.3808 0.5 12.0204C0.5 17.3304 3.938 21.8364 8.7068 23.4252C9.3068 23.5356 9.5252 23.1648 9.5252 22.8456C9.5252 22.5612 9.5156 21.804 9.5096 20.802C6.1712 21.528 5.4668 19.1904 5.4668 19.1904C4.922 17.8008 4.1348 17.4312 4.1348 17.4312C3.0452 16.6872 4.2176 16.7016 4.2176 16.7016C5.4212 16.7856 6.0548 17.94 6.0548 17.94C7.1252 19.776 8.864 19.2456 9.5468 18.9384C9.6572 18.162 9.9668 17.6328 10.31 17.3328C7.646 17.0292 4.844 15.9972 4.844 11.3916C4.844 10.08 5.312 9.006 6.0788 8.166C5.9552 7.8624 5.5436 6.6396 6.1964 4.986C6.1964 4.986 7.2044 4.662 9.4964 6.2172C10.4753 5.95022 11.4853 5.81423 12.5 5.8128C13.52 5.8176 14.546 5.9508 15.5048 6.2172C17.7956 4.662 18.8012 4.9848 18.8012 4.9848C19.4564 6.6396 19.0436 7.8624 18.9212 8.166C19.6892 9.006 20.1548 10.08 20.1548 11.3916C20.1548 16.0092 17.348 17.0256 14.6756 17.3232C15.1064 17.694 15.4892 18.4272 15.4892 19.5492C15.4892 21.1548 15.4748 22.452 15.4748 22.8456C15.4748 23.1672 15.6908 23.5416 16.3004 23.424C18.69 22.6225 20.7672 21.0904 22.2386 19.0441C23.7099 16.9977 24.501 14.5408 24.5 12.0204C24.5 5.3808 19.1264 0 12.5 0Z",fill:"black"}))),o||(o=r.createElement("defs",null,r.createElement("clipPath",{id:"clip0_14990_39524"},r.createElement("rect",{width:24,height:24,fill:"white",transform:"translate(0.5)"})))))},l=(0,r.forwardRef)(c);var a=i(9184),d=i(1296),g=i(6417);const p=(0,a.ZP)(d.Z)`
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
`;function h(e){let{config:t={}}=e;const{client_id:i}=t;return(0,g.jsxs)(p,{onClick:()=>{location.href=`http://github.com/login/oauth/authorize?client_id=${i}`},children:[(0,g.jsx)(l,{className:"icon"}),"Sign in with Github"]})}},1618:(e,t,i)=>{i.d(t,{Z:()=>p});var n=i(7313),o=i(2338);const r=i.p+"static/media/google.db7474a481e12799b961.svg";var s=i(9184),c=i(1296),l=i(1864),a=i(3657),d=i(6417);const g=(0,s.ZP)(c.Z)`
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
`;function p(e){let{clientId:t}=e;const[i,{isSuccess:s,isLoading:c}]=(0,l.YA)(),{signIn:p,loaded:h}=(0,o.useGoogleLogin)({onScriptLoadFailure:e=>{},clientId:t,onSuccess:e=>{let{tokenId:t,...n}=e;i({id_token:t,type:"google"})},onFailure:e=>{}});(0,n.useEffect)((()=>{s&&a.ZP.success("Login Successfully")}),[s]);return(0,d.jsxs)(g,{disabled:!h||c,onClick:()=>{p()},children:[(0,d.jsx)("img",{className:"icon",src:r,alt:"google icon"}),h?"Sign in with Google":"Initailizing"]})}},3656:(e,t,i)=>{i.d(t,{Z:()=>r});var n=i(7313),o=i(4695);function r(){const[e,t]=(0,n.useState)(!1),[i,r]=(0,n.useState)({}),{data:s}=(0,o.R)(void 0,{refetchOnMountOrArgChange:!0}),[c,{isSuccess:l}]=(0,o.Ku)();(0,n.useEffect)((()=>{s&&r(s)}),[s]),(0,n.useEffect)((()=>{t(!l&&JSON.stringify(s)!==JSON.stringify(i))}),[s,i,l]);return{config:i,changed:e,updateGithubAuthConfig:e=>{r((t=>({...t,...e})))},updateGithubAuthConfigToServer:async()=>{await c(i)},isSuccess:l}}},8536:(e,t,i)=>{i.d(t,{Z:()=>r});var n=i(7313),o=i(4695);function r(){const[e,t]=(0,n.useState)(!1),[i,r]=(0,n.useState)(""),{data:s}=(0,o.eM)(void 0,{refetchOnMountOrArgChange:!0}),[c,{isSuccess:l}]=(0,o.Qg)();(0,n.useEffect)((()=>{s&&r(s.client_id)}),[s]),(0,n.useEffect)((()=>{t(!l&&(null===s||void 0===s?void 0:s.client_id)!==i)}),[s,i,l]);return{config:s,changed:e,clientId:i,updateClientId:r,updateClientIdToServer:async()=>{i&&await c({client_id:i})},updateGoogleAuthConfig:c,isSuccess:l}}},9914:(e,t,i)=>{i.r(t),i.d(t,{default:()=>x});var n=i(7890),o=i(2867),r=i(9184),s=i(6417);const c=r.ZP.p`
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
`;function l(){const e=(0,n.s0)();return(0,s.jsxs)(c,{children:[(0,s.jsx)("span",{children:"Have an account?"}),(0,s.jsx)("a",{onClick:()=>{e("/login")},children:"Sign In"})]})}var a=i(4695),d=i(3656),g=i(8536),p=i(1618),h=i(8036);const u=r.ZP.div`
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
`;function x(){const e=(0,n.bS)("/register"),{clientId:t}=(0,g.Z)(),{config:i}=(0,d.Z)(),{data:r,isSuccess:c}=(0,a.ww)();if(!c)return null;const{github:x,google:f,who_can_sign_up:m}=r,C=f&&t;return"EveryOne"!==m?"Open Register is Closed!":(0,s.jsx)(u,{children:(0,s.jsxs)("div",{className:"form",children:[e&&(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:"tips",children:[(0,s.jsx)("img",{src:`${o.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,s.jsx)("h2",{className:"title",children:"Sign Up to Rustchat"}),(0,s.jsx)("span",{className:"desc",children:"Please enter your details."})]})}),(0,s.jsx)(n.j3,{}),e&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("hr",{className:"or"}),C&&(0,s.jsx)(p.Z,{clientId:t}),x&&(0,s.jsx)(h.Z,{config:i}),(0,s.jsx)(l,{})]})]})})}}}]);