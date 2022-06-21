"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[975],{8036:(e,t,n)=>{n.d(t,{Z:()=>h});var i,s,a=n(7313);function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},o.apply(this,arguments)}const c=(e,t)=>{let{title:n,titleId:c,...r}=e;return a.createElement("svg",o({width:25,height:24,viewBox:"0 0 25 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":c},r),n?a.createElement("title",{id:c},n):null,i||(i=a.createElement("g",{clipPath:"url(#clip0_14990_39524)"},a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.5 0C5.8724 0 0.5 5.3808 0.5 12.0204C0.5 17.3304 3.938 21.8364 8.7068 23.4252C9.3068 23.5356 9.5252 23.1648 9.5252 22.8456C9.5252 22.5612 9.5156 21.804 9.5096 20.802C6.1712 21.528 5.4668 19.1904 5.4668 19.1904C4.922 17.8008 4.1348 17.4312 4.1348 17.4312C3.0452 16.6872 4.2176 16.7016 4.2176 16.7016C5.4212 16.7856 6.0548 17.94 6.0548 17.94C7.1252 19.776 8.864 19.2456 9.5468 18.9384C9.6572 18.162 9.9668 17.6328 10.31 17.3328C7.646 17.0292 4.844 15.9972 4.844 11.3916C4.844 10.08 5.312 9.006 6.0788 8.166C5.9552 7.8624 5.5436 6.6396 6.1964 4.986C6.1964 4.986 7.2044 4.662 9.4964 6.2172C10.4753 5.95022 11.4853 5.81423 12.5 5.8128C13.52 5.8176 14.546 5.9508 15.5048 6.2172C17.7956 4.662 18.8012 4.9848 18.8012 4.9848C19.4564 6.6396 19.0436 7.8624 18.9212 8.166C19.6892 9.006 20.1548 10.08 20.1548 11.3916C20.1548 16.0092 17.348 17.0256 14.6756 17.3232C15.1064 17.694 15.4892 18.4272 15.4892 19.5492C15.4892 21.1548 15.4748 22.452 15.4748 22.8456C15.4748 23.1672 15.6908 23.5416 16.3004 23.424C18.69 22.6225 20.7672 21.0904 22.2386 19.0441C23.7099 16.9977 24.501 14.5408 24.5 12.0204C24.5 5.3808 19.1264 0 12.5 0Z",fill:"black"}))),s||(s=a.createElement("defs",null,a.createElement("clipPath",{id:"clip0_14990_39524"},a.createElement("rect",{width:24,height:24,fill:"white",transform:"translate(0.5)"})))))},r=(0,a.forwardRef)(c);var l=n(9184),d=n(1296),g=n(6417);const u=(0,l.ZP)(d.Z)`
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
`;function h(e){let{config:t={}}=e;const{client_id:n}=t;return(0,g.jsxs)(u,{onClick:()=>{location.href=`http://github.com/login/oauth/authorize?client_id=${n}`},children:[(0,g.jsx)(r,{className:"icon"}),"Sign in with Github"]})}},1618:(e,t,n)=>{n.d(t,{Z:()=>u});var i=n(7313),s=n(2338);const a=n.p+"static/media/google.db7474a481e12799b961.svg";var o=n(9184),c=n(1296),r=n(1864),l=n(3657),d=n(6417);const g=(0,o.ZP)(c.Z)`
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
`;function u(e){let{clientId:t}=e;const[n,{isSuccess:o,isLoading:c}]=(0,r.YA)(),{signIn:u,loaded:h}=(0,s.useGoogleLogin)({onScriptLoadFailure:e=>{},clientId:t,onSuccess:e=>{let{tokenId:t,...i}=e;n({id_token:t,type:"google"})},onFailure:e=>{}});(0,i.useEffect)((()=>{o&&l.ZP.success("Login Successfully")}),[o]);return(0,d.jsxs)(g,{disabled:!h||c,onClick:()=>{u()},children:[(0,d.jsx)("img",{className:"icon",src:a,alt:"google icon"}),h?"Sign in with Google":"Initailizing"]})}},3656:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(7313),s=n(4695);function a(){const[e,t]=(0,i.useState)(!1),[n,a]=(0,i.useState)({}),{data:o}=(0,s.R)(void 0,{refetchOnMountOrArgChange:!0}),[c,{isSuccess:r}]=(0,s.Ku)();(0,i.useEffect)((()=>{o&&a(o)}),[o]),(0,i.useEffect)((()=>{t(!r&&JSON.stringify(o)!==JSON.stringify(n))}),[o,n,r]);return{config:n,changed:e,updateGithubAuthConfig:e=>{a((t=>({...t,...e})))},updateGithubAuthConfigToServer:async()=>{await c(n)},isSuccess:r}}},8536:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(7313),s=n(4695);function a(){const[e,t]=(0,i.useState)(!1),[n,a]=(0,i.useState)(""),{data:o}=(0,s.eM)(void 0,{refetchOnMountOrArgChange:!0}),[c,{isSuccess:r}]=(0,s.Qg)();(0,i.useEffect)((()=>{o&&a(o.client_id)}),[o]),(0,i.useEffect)((()=>{t(!r&&(null===o||void 0===o?void 0:o.client_id)!==n)}),[o,n,r]);return{config:o,changed:e,clientId:n,updateClientId:a,updateClientIdToServer:async()=>{n&&await c({client_id:n})},updateGoogleAuthConfig:c,isSuccess:r}}},321:(e,t,n)=>{n.r(t),n.d(t,{default:()=>b});var i=n(7313),s=n(3657),a=n(2867),o=n(3067),c=n(1296),r=n(1864),l=n(9184),d=n(6417);const g=l.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-weight: 600;
    font-size: 30px;
    line-height: 38px;
    color: #101828;
    margin-bottom: 12px;
  }
  .desc {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #667085;
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
`;function u(){return(0,d.jsxs)(g,{children:[(0,d.jsx)("div",{className:"title",children:"Magic link Sent"}),(0,d.jsx)("p",{className:"desc",children:"Login to your email client, and continue next step"}),(0,d.jsx)("p",{className:"desc",children:"You can close this window now."})]})}var h=n(7890);const p=l.ZP.p`
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
`;function f(){const e=(0,h.s0)();return(0,d.jsxs)(p,{children:[(0,d.jsx)("span",{children:"Have an account?"}),(0,d.jsx)("a",{onClick:()=>{e("/login")},children:"Sign In"})]})}var m=n(4695),x=n(3656),w=n(8536),C=n(1618),v=n(8036);function b(){const[e,{isLoading:t,data:n,isSuccess:l}]=(0,r.uk)(),[g,h]=(0,i.useState)(""),[p,b]=(0,i.useState)({email:"",password:"",confirmPassword:""});(0,i.useEffect)((()=>{const e=new URLSearchParams(location.search).get("magic_token");e&&h(e)}),[]),(0,i.useEffect)((()=>{if(l&&n){const{new_magic_token:e,mail_is_sent:t}=n;!t&&e&&(location.href=`?magic_token=${e}#/register/set_name`)}}),[l,n]);const j=e=>{const{type:t}=e.target.dataset,{value:n}=e.target;b((e=>(e[t]=n,{...e})))},{clientId:S}=(0,w.Z)(),{config:y}=(0,x.Z)(),{data:_,isSuccess:Z}=(0,m.ww)();if(!Z)return null;const{github:P,google:k,who_can_sign_up:E}=_,N=k&&S;if("EveryOne"!==E)return"Open Register is Closed!";const{email:I,password:O,confirmPassword:z}=p;return null!==n&&void 0!==n&&n.mail_is_sent?(0,d.jsx)(u,{}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"tips",children:[(0,d.jsx)("img",{src:`${a.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,d.jsx)("h2",{className:"title",children:"Sign Up to Rustchat"}),(0,d.jsx)("span",{className:"desc",children:"Please enter your details."})]}),(0,d.jsxs)("form",{onSubmit:t=>{t.preventDefault();const{email:n,password:i}=p;e({magic_token:g,email:n,password:i})},children:[(0,d.jsx)(o.Z,{className:"large",name:"email",value:I,required:!0,placeholder:"Enter email","data-type":"email",onChange:j}),(0,d.jsx)(o.Z,{className:"large",type:"password",value:O,name:"password",required:!0,"data-type":"password",onChange:j,placeholder:"Enter password"}),(0,d.jsx)(o.Z,{onBlur:()=>{const{password:e,confirmPassword:t}=p;e!==t&&s.ZP.error("Not Same Password!")},type:"password",name:"confirmPassword",value:z,"data-type":"confirmPassword",onChange:j,placeholder:"Confirm Password"}),(0,d.jsx)(c.Z,{type:"submit",disabled:t,children:t?"Signing Up":"Sign Up"})]}),(0,d.jsx)("hr",{className:"or"}),N&&(0,d.jsx)(C.Z,{clientId:S}),P&&(0,d.jsx)(v.Z,{config:y}),(0,d.jsx)(f,{})]})}}}]);