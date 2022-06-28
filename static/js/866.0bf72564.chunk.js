"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[866],{4968:(e,t,n)=>{n.d(t,{Z:()=>m});var i,a,o=n(7313);function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},s.apply(this,arguments)}const r=(e,t)=>{let{title:n,titleId:r,...l}=e;return o.createElement("svg",s({width:25,height:24,viewBox:"0 0 25 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":r},l),n?o.createElement("title",{id:r},n):null,i||(i=o.createElement("g",{clipPath:"url(#clip0_14990_39524)"},o.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.5 0C5.8724 0 0.5 5.3808 0.5 12.0204C0.5 17.3304 3.938 21.8364 8.7068 23.4252C9.3068 23.5356 9.5252 23.1648 9.5252 22.8456C9.5252 22.5612 9.5156 21.804 9.5096 20.802C6.1712 21.528 5.4668 19.1904 5.4668 19.1904C4.922 17.8008 4.1348 17.4312 4.1348 17.4312C3.0452 16.6872 4.2176 16.7016 4.2176 16.7016C5.4212 16.7856 6.0548 17.94 6.0548 17.94C7.1252 19.776 8.864 19.2456 9.5468 18.9384C9.6572 18.162 9.9668 17.6328 10.31 17.3328C7.646 17.0292 4.844 15.9972 4.844 11.3916C4.844 10.08 5.312 9.006 6.0788 8.166C5.9552 7.8624 5.5436 6.6396 6.1964 4.986C6.1964 4.986 7.2044 4.662 9.4964 6.2172C10.4753 5.95022 11.4853 5.81423 12.5 5.8128C13.52 5.8176 14.546 5.9508 15.5048 6.2172C17.7956 4.662 18.8012 4.9848 18.8012 4.9848C19.4564 6.6396 19.0436 7.8624 18.9212 8.166C19.6892 9.006 20.1548 10.08 20.1548 11.3916C20.1548 16.0092 17.348 17.0256 14.6756 17.3232C15.1064 17.694 15.4892 18.4272 15.4892 19.5492C15.4892 21.1548 15.4748 22.452 15.4748 22.8456C15.4748 23.1672 15.6908 23.5416 16.3004 23.424C18.69 22.6225 20.7672 21.0904 22.2386 19.0441C23.7099 16.9977 24.501 14.5408 24.5 12.0204C24.5 5.3808 19.1264 0 12.5 0Z",fill:"black"}))),a||(a=o.createElement("defs",null,o.createElement("clipPath",{id:"clip0_14990_39524"},o.createElement("rect",{width:24,height:24,fill:"white",transform:"translate(0.5)"})))))},l=(0,o.forwardRef)(r);var c=n(9184),d=n(7935),u=n(1140),g=n(2509),h=n(3657),p=n(6417);const f=(0,c.ZP)(u.Z)`
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
`,m=e=>{let{type:t="login",client_id:n}=e;const i=localStorage.getItem(d.LJ),[a,{isLoading:s,isSuccess:r,error:c}]=(0,g.YA)();(0,o.useEffect)((()=>{const e=new URLSearchParams(location.search),t="github"===e.get("oauth"),n=e.get("code");t&&n&&a({magic_token:i,code:n,type:"github"})}),[]),(0,o.useEffect)((()=>{r&&h.ZP.success("Login Successfully")}),[r]),(0,o.useEffect)((()=>{if(c)if(410===c.status)h.ZP.error("No associated account found, please contact admin for an invitation link to join.");else h.ZP.error("Something Error");else;}),[c]);return(0,p.jsxs)(f,{onClick:()=>{location.href=`https://github.com/login/oauth/authorize?client_id=${n}`},disabled:s,children:[(0,p.jsx)(l,{className:"icon"}),` ${"login"===t?"Sign in":"Sign up"} with Github`]})}},4837:(e,t,n)=>{n.d(t,{Z:()=>v});var i,a,o,s,r=n(7313),l=n(2338),c=n(3657),d=n(9184),u=n(7935);function g(){return g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},g.apply(this,arguments)}const h=(e,t)=>{let{title:n,titleId:l,...c}=e;return r.createElement("svg",g({width:2443,height:2500,viewBox:"0 0 256 262",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid",ref:t,"aria-labelledby":l},c),n?r.createElement("title",{id:l},n):null,i||(i=r.createElement("path",{d:"M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027",fill:"#4285F4"})),a||(a=r.createElement("path",{d:"M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1",fill:"#34A853"})),o||(o=r.createElement("path",{d:"M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782",fill:"#FBBC05"})),s||(s=r.createElement("path",{d:"M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251",fill:"#EB4335"})))},p=(0,r.forwardRef)(h);var f=n(1140),m=n(2509),w=n(6417);const x=(0,d.ZP)(f.Z)`
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
`,v=e=>{let{type:t="login",clientId:n}=e;const[i,{isSuccess:a,isLoading:o,error:s}]=(0,m.YA)(),d=localStorage.getItem(u.LJ),{signIn:g,loaded:h}=(0,l.useGoogleLogin)({onScriptLoadFailure:e=>{},clientId:n,onSuccess:e=>{let{tokenId:t,...n}=e;i({magic_token:d,id_token:t,type:"google"})},onFailure:e=>{}});(0,r.useEffect)((()=>{a&&c.ZP.success("Login Successfully")}),[a]),(0,r.useEffect)((()=>{if(s)if(410===s.status)c.ZP.error("No associated account found, please contact admin for an invitation link to join.");else c.ZP.error("Something Error");else;}),[s]);return(0,w.jsxs)(x,{disabled:!h||o,onClick:()=>{g()},children:[(0,w.jsx)(p,{className:"icon",alt:"google icon"}),h?("login"===t?"Sign in":"Sign up")+" with Google":"Initializing"]})}},1923:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(7313),a=n(2378);function o(){const[e,t]=(0,i.useState)(!1),[n,o]=(0,i.useState)({}),{data:s}=(0,a.R)(void 0,{refetchOnMountOrArgChange:!0}),[r,{isSuccess:l}]=(0,a.Ku)();(0,i.useEffect)((()=>{s&&o(s)}),[s]),(0,i.useEffect)((()=>{t(!l&&JSON.stringify(s)!==JSON.stringify(n))}),[s,n,l]);return{config:n,changed:e,updateGithubAuthConfig:e=>{o((t=>({...t,...e})))},updateGithubAuthConfigToServer:async()=>{await r(n)},isSuccess:l}}},9137:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(7313),a=n(2378);function o(){const[e,t]=(0,i.useState)(!1),[n,o]=(0,i.useState)(""),{data:s}=(0,a.eM)(void 0,{refetchOnMountOrArgChange:!0}),[r,{isSuccess:l}]=(0,a.Qg)();(0,i.useEffect)((()=>{s&&o(s.client_id)}),[s]),(0,i.useEffect)((()=>{t(!l&&(null===s||void 0===s?void 0:s.client_id)!==n)}),[s,n,l]);return{config:s,changed:e,clientId:n,updateClientId:o,updateClientIdToServer:async()=>{n&&await r({client_id:n})},updateGoogleAuthConfig:r,isSuccess:l}}},5866:(e,t,n)=>{n.r(t),n.d(t,{default:()=>S});var i=n(7313),a=n(3657),o=n(7935),s=n(4050),r=n(1140),l=n(2509),c=n(9184),d=n(6417);const u=c.ZP.div`
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
`;function g(){return(0,d.jsxs)(u,{children:[(0,d.jsx)("div",{className:"title",children:"Magic link Sent"}),(0,d.jsx)("p",{className:"desc",children:"Login to your email client, and continue next step"}),(0,d.jsx)("p",{className:"desc",children:"You can close this window now."})]})}var h=n(7890);const p=c.ZP.p`
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
`;function f(){const e=(0,h.s0)();return(0,d.jsxs)(p,{children:[(0,d.jsx)("span",{children:"Have an account?"}),(0,d.jsx)("a",{onClick:()=>{e("/login")},children:"Sign In"})]})}var m=n(2378),w=n(1923),x=n(9137),v=n(4837),C=n(4968);function S(){const[e,{isLoading:t,data:n,isSuccess:c}]=(0,l.uk)(),[u,{isLoading:h}]=(0,l.N0)(),[p,S]=(0,i.useState)(""),[y,b]=(0,i.useState)({email:"",password:"",confirmPassword:""});(0,i.useEffect)((()=>{const e=new URLSearchParams(location.search).get("magic_token");e&&(localStorage.setItem(o.LJ,e),S(e))}),[]),(0,i.useEffect)((()=>{if(c&&n){const{new_magic_token:e,mail_is_sent:t}=n;!t&&e&&(location.href=`?magic_token=${e}#/register/set_name`)}}),[c,n]);const j=e=>{const{type:t}=e.target.dataset,{value:n}=e.target;b((e=>(e[t]=n,{...e})))},{clientId:E}=(0,x.Z)(),{config:P}=(0,w.Z)(),{data:Z,isSuccess:_}=(0,m.ww)();if(!_)return null;const{github:k,google:N,who_can_sign_up:I}=Z,L=N&&E;if("EveryOne"!==I&&!p)return"Sign up method is updated to Invitation Link Only";const{email:O,password:M,confirmPassword:A}=y;if(null!==n&&void 0!==n&&n.mail_is_sent)return(0,d.jsx)(g,{});const R=t||h;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"tips",children:[(0,d.jsx)("img",{src:`${o.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,d.jsx)("h2",{className:"title",children:"Sign Up to VoceChat"}),(0,d.jsx)("span",{className:"desc",children:"Please enter your details."})]}),(0,d.jsxs)("form",{onSubmit:async t=>{t.preventDefault();const{email:n,password:i,confirmPassword:o}=y;if(i!==o)return void a.ZP.error("Not Same Password!");const{data:s}=await u(n);s?e({magic_token:p,email:n,password:i}):a.ZP.error("Email already registered!")},autoSave:"false",autoComplete:"true",children:[(0,d.jsx)(s.Z,{className:"large",name:"email",value:O,required:!0,placeholder:"Enter email","data-type":"email",onChange:j}),(0,d.jsx)(s.Z,{className:"large",type:"password",value:M,name:"password",required:!0,"data-type":"password",onChange:j,placeholder:"Enter password"}),(0,d.jsx)(s.Z,{required:!0,onBlur:()=>{const{password:e,confirmPassword:t}=y;e!==t&&a.ZP.error("Not Same Password!")},type:"password",name:"confirmPassword",value:A,"data-type":"confirmPassword",onChange:j,placeholder:"Confirm Password"}),(0,d.jsx)(r.Z,{type:"submit",disabled:R,children:R?"Signing Up":"Sign Up"})]}),(0,d.jsx)("hr",{className:"or"}),L&&(0,d.jsx)(v.Z,{type:"register",clientId:E}),k&&(0,d.jsx)(C.Z,{type:"register",client_id:null===P||void 0===P?void 0:P.client_id}),(0,d.jsx)(f,{})]})}}}]);