"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[866],{4968:(e,t,n)=>{n.d(t,{Z:()=>m});var i,o,r=n(7313);function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},s.apply(this,arguments)}const a=(e,t)=>{let{title:n,titleId:a,...c}=e;return r.createElement("svg",s({width:25,height:24,viewBox:"0 0 25 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},c),n?r.createElement("title",{id:a},n):null,i||(i=r.createElement("g",{clipPath:"url(#clip0_14990_39524)"},r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.5 0C5.8724 0 0.5 5.3808 0.5 12.0204C0.5 17.3304 3.938 21.8364 8.7068 23.4252C9.3068 23.5356 9.5252 23.1648 9.5252 22.8456C9.5252 22.5612 9.5156 21.804 9.5096 20.802C6.1712 21.528 5.4668 19.1904 5.4668 19.1904C4.922 17.8008 4.1348 17.4312 4.1348 17.4312C3.0452 16.6872 4.2176 16.7016 4.2176 16.7016C5.4212 16.7856 6.0548 17.94 6.0548 17.94C7.1252 19.776 8.864 19.2456 9.5468 18.9384C9.6572 18.162 9.9668 17.6328 10.31 17.3328C7.646 17.0292 4.844 15.9972 4.844 11.3916C4.844 10.08 5.312 9.006 6.0788 8.166C5.9552 7.8624 5.5436 6.6396 6.1964 4.986C6.1964 4.986 7.2044 4.662 9.4964 6.2172C10.4753 5.95022 11.4853 5.81423 12.5 5.8128C13.52 5.8176 14.546 5.9508 15.5048 6.2172C17.7956 4.662 18.8012 4.9848 18.8012 4.9848C19.4564 6.6396 19.0436 7.8624 18.9212 8.166C19.6892 9.006 20.1548 10.08 20.1548 11.3916C20.1548 16.0092 17.348 17.0256 14.6756 17.3232C15.1064 17.694 15.4892 18.4272 15.4892 19.5492C15.4892 21.1548 15.4748 22.452 15.4748 22.8456C15.4748 23.1672 15.6908 23.5416 16.3004 23.424C18.69 22.6225 20.7672 21.0904 22.2386 19.0441C23.7099 16.9977 24.501 14.5408 24.5 12.0204C24.5 5.3808 19.1264 0 12.5 0Z",fill:"black"}))),o||(o=r.createElement("defs",null,r.createElement("clipPath",{id:"clip0_14990_39524"},r.createElement("rect",{width:24,height:24,fill:"white",transform:"translate(0.5)"})))))},c=(0,r.forwardRef)(a);var l=n(9184),d=n(7935),u=n(1140),g=n(2509),p=n(3657),h=n(6417);const f=(0,l.ZP)(u.Z)`
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
`,m=e=>{let{type:t="login",client_id:n}=e;const i=localStorage.getItem(d.LJ),[o,{isLoading:s,isSuccess:a,error:l}]=(0,g.YA)();(0,r.useEffect)((()=>{const e=new URLSearchParams(location.search),t="github"===e.get("oauth"),n=e.get("code");t&&n&&o({magic_token:i,code:n,type:"github"})}),[]),(0,r.useEffect)((()=>{a&&p.ZP.success("Login Successfully")}),[a]),(0,r.useEffect)((()=>{if(l)if(410===(null===l||void 0===l?void 0:l.status))p.ZP.error("No associated account found, please user admin for an invitation link to join.");else p.ZP.error("Something Error");else;}),[l]);return(0,h.jsxs)(f,{onClick:()=>{location.href=`https://github.com/login/oauth/authorize?client_id=${n}`},disabled:s,children:[(0,h.jsx)(c,{className:"icon"}),` ${"login"===t?"Sign in":"Sign up"} with Github`]})}},4837:(e,t,n)=>{n.d(t,{Z:()=>S});var i,o,r,s,a=n(7313),c=n(2840),l=n(3657),d=n(9184),u=n(7935);function g(){return g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},g.apply(this,arguments)}const p=(e,t)=>{let{title:n,titleId:c,...l}=e;return a.createElement("svg",g({width:2443,height:2500,viewBox:"0 0 256 262",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid",ref:t,"aria-labelledby":c},l),n?a.createElement("title",{id:c},n):null,i||(i=a.createElement("path",{d:"M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027",fill:"#4285F4"})),o||(o=a.createElement("path",{d:"M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1",fill:"#34A853"})),r||(r=a.createElement("path",{d:"M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782",fill:"#FBBC05"})),s||(s=a.createElement("path",{d:"M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251",fill:"#EB4335"})))},h=(0,a.forwardRef)(p);var f=n(1140),m=n(2509),w=n(6417);const v=(0,d.ZP)(f.Z)`
  position: relative;
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
  .invisible {
    opacity: 0;
    position: absolute;
    width: 100%;
    iframe {
      width: 100% !important;
    }
  }
`,x=e=>{let{type:t="login",loaded:n,loadError:i}=e;const[o,{isSuccess:r,isLoading:s,error:d}]=(0,m.YA)(),g=localStorage.getItem(u.LJ);return(0,a.useEffect)((()=>{r&&l.ZP.success("Login Successfully")}),[r]),(0,a.useEffect)((()=>{if(d&&"status"in d)if(410===d.status)l.ZP.error("No associated account found, please user admin for an invitation link to join.");else l.ZP.error("Something Error");else;}),[d]),(0,w.jsxs)(v,{disabled:!n||s,onClick:null,children:[(0,w.jsx)("div",{className:"invisible",children:(0,w.jsx)(c.kZ,{onSuccess:e=>{o({magic_token:g,id_token:e.credential,type:"google"})}})}),(0,w.jsx)(h,{className:"icon"}),i?"Script Load Error!":n?("login"===t?"Sign in":"Sign up")+" with Google":"Initializing"]})},S=e=>{let{type:t="login",clientId:n}=e;const[i,o]=(0,a.useState)(!1),[r,s]=(0,a.useState)(!1);return n?(0,w.jsx)(c.rg,{onScriptLoadError:()=>{s(!0)},onScriptLoadSuccess:()=>{o(!0)},clientId:n,children:(0,w.jsx)(x,{type:t,loaded:i,loadError:r})}):null}},1923:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(7313),o=n(2378);function r(){const[e,t]=(0,i.useState)(!1),[n,r]=(0,i.useState)({}),{data:s}=(0,o.R)(void 0,{refetchOnMountOrArgChange:!0}),[a,{isSuccess:c}]=(0,o.Ku)();(0,i.useEffect)((()=>{s&&r(s)}),[s]),(0,i.useEffect)((()=>{t(!c&&JSON.stringify(s)!==JSON.stringify(n))}),[s,n,c]);return{config:n,changed:e,updateGithubAuthConfig:e=>{r((t=>({...t,...e})))},updateGithubAuthConfigToServer:async()=>{await a(n)},isSuccess:c}}},9137:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(7313),o=n(2378);function r(){const[e,t]=(0,i.useState)(!1),[n,r]=(0,i.useState)(""),{data:s}=(0,o.eM)(void 0,{refetchOnMountOrArgChange:!0}),[a,{isSuccess:c}]=(0,o.Qg)();(0,i.useEffect)((()=>{s&&r(s.client_id)}),[s]),(0,i.useEffect)((()=>{t(!c&&(null===s||void 0===s?void 0:s.client_id)!==n)}),[s,n,c]);return{config:s,changed:e,clientId:n,updateClientId:r,updateClientIdToServer:async()=>{n&&await a({client_id:n})},updateGoogleAuthConfig:a,isSuccess:c}}},5866:(e,t,n)=>{n.r(t),n.d(t,{default:()=>C});var i=n(7313),o=n(3657),r=n(7935),s=n(4050),a=n(1140),c=n(2509),l=n(9184),d=n(6417);const u=l.ZP.div`
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
`;function g(){return(0,d.jsxs)(u,{children:[(0,d.jsx)("div",{className:"title",children:"Magic link Sent"}),(0,d.jsx)("p",{className:"desc",children:"Login to your email client, and continue next step"}),(0,d.jsx)("p",{className:"desc",children:"You can close this window now."})]})}var p=n(7890);const h=l.ZP.p`
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
`;function f(){const e=(0,p.s0)();return(0,d.jsxs)(h,{children:[(0,d.jsx)("span",{children:"Have an account?"}),(0,d.jsx)("a",{onClick:()=>{e("/login")},children:"Sign In"})]})}var m=n(2378),w=n(1923),v=n(9137),x=n(4837),S=n(4968);function C(){const[e,{isLoading:t,data:n,isSuccess:l}]=(0,c.uk)(),[u,{isLoading:p}]=(0,c.N0)(),[h,C]=(0,i.useState)(""),[y,E]=(0,i.useState)({email:"",password:"",confirmPassword:""});(0,i.useEffect)((()=>{const e=new URLSearchParams(location.search).get("magic_token");e&&(localStorage.setItem(r.LJ,e),C(e))}),[]),(0,i.useEffect)((()=>{if(l&&n){const{new_magic_token:e,mail_is_sent:t}=n;!t&&e&&(location.href=`?magic_token=${e}#/register/set_name`)}}),[l,n]);const b=e=>{const{type:t}=e.target.dataset,{value:n}=e.target;E((e=>(e[t]=n,{...e})))},{clientId:j}=(0,v.Z)(),{config:P}=(0,w.Z)(),{data:_,isSuccess:Z}=(0,m.ww)();if(!Z)return null;const{github:k,google:L,who_can_sign_up:N}=_,I=L&&j;if("EveryOne"!==N&&!h)return(0,d.jsx)(d.Fragment,{children:"Sign up method is updated to Invitation Link Only"});const{email:O,password:R,confirmPassword:M}=y;if(null!==n&&void 0!==n&&n.mail_is_sent)return(0,d.jsx)(g,{});const A=t||p;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"tips",children:[(0,d.jsx)("img",{src:`${r.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,d.jsx)("h2",{className:"title",children:"Sign Up to VoceChat"}),(0,d.jsx)("span",{className:"desc",children:"Please enter your details."})]}),(0,d.jsxs)("form",{onSubmit:async t=>{t.preventDefault();const{email:n,password:i,confirmPassword:r}=y;if(i!==r)return void o.ZP.error("Not Same Password!");const{data:s}=await u(n);s?e({magic_token:h,email:n,password:i}):o.ZP.error("Email already registered!")},autoSave:"false",autoComplete:"true",children:[(0,d.jsx)(s.Z,{className:"large",name:"email",value:O,required:!0,placeholder:"Enter email","data-type":"email",onChange:b}),(0,d.jsx)(s.Z,{className:"large",type:"password",value:R,name:"password",required:!0,"data-type":"password",onChange:b,placeholder:"Enter password"}),(0,d.jsx)(s.Z,{required:!0,onBlur:()=>{const{password:e,confirmPassword:t}=y;e!==t&&o.ZP.error("Not Same Password!")},type:"password",name:"confirmPassword",value:M,"data-type":"confirmPassword",onChange:b,placeholder:"Confirm Password"}),(0,d.jsx)(a.Z,{type:"submit",disabled:A,children:A?"Signing Up":"Sign Up"})]}),(0,d.jsx)("hr",{className:"or"}),I&&(0,d.jsx)(x.Z,{type:"register",clientId:j}),k&&(0,d.jsx)(S.Z,{type:"register",client_id:null===P||void 0===P?void 0:P.client_id}),(0,d.jsx)(f,{})]})}},2840:(e,t,n)=>{n.d(t,{kZ:()=>c,rg:()=>r});var i=n(7313);const o=(0,i.createContext)(null);function r(e){let{clientId:t,onScriptLoadSuccess:n,onScriptLoadError:r,children:s}=e;const a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{onScriptLoadSuccess:t,onScriptLoadError:n}=e,[o,r]=(0,i.useState)(!1),s=(0,i.useRef)(t);s.current=t;const a=(0,i.useRef)(n);return a.current=n,(0,i.useEffect)((()=>{const e=document.createElement("script");return e.src="https://accounts.google.com/gsi/client",e.async=!0,e.defer=!0,e.onload=()=>{var e;r(!0),null===(e=s.current)||void 0===e||e.call(s)},e.onerror=()=>{var e;r(!1),null===(e=a.current)||void 0===e||e.call(a)},document.body.appendChild(e),()=>{document.body.removeChild(e)}}),[]),o}({onScriptLoadSuccess:n,onScriptLoadError:r}),c=(0,i.useMemo)((()=>({clientId:t,scriptLoadedSuccessfully:a})),[t,a]);return i.createElement(o.Provider,{value:c},s)}function s(){const e=(0,i.useContext)(o);if(!e)throw new Error("Google OAuth components must be used within GoogleOAuthProvider");return e}const a={large:40,medium:32,small:20};function c(e){let{onSuccess:t,onError:n,useOneTap:o,promptMomentNotification:r,type:c="standard",theme:l="outline",size:d="large",text:u,shape:g,logo_alignment:p,width:h,locale:f,...m}=e;const w=(0,i.useRef)(null),{clientId:v,scriptLoadedSuccessfully:x}=s(),S=(0,i.useRef)(t);S.current=t;const C=(0,i.useRef)(n);C.current=n;const y=(0,i.useRef)(r);return y.current=r,(0,i.useEffect)((()=>{var e,t,n;if(x)return null===(e=window.google)||void 0===e||e.accounts.id.initialize({client_id:v,callback:e=>{var t;if(!e.clientId||!e.credential)return null===(t=C.current)||void 0===t?void 0:t.call(C);S.current(e)},...m}),null===(t=window.google)||void 0===t||t.accounts.id.renderButton(w.current,{type:c,theme:l,size:d,text:u,shape:g,logo_alignment:p,width:h,locale:f}),o&&(null===(n=window.google)||void 0===n||n.accounts.id.prompt(y.current)),()=>{var e;o&&(null===(e=window.google)||void 0===e||e.accounts.id.cancel())}}),[v,x,o,c,l,d,u,g,p,h,f]),i.createElement("div",{ref:w,style:{height:a[d]}})}}}]);