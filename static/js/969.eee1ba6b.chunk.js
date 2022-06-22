"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[969],{4968:(e,t,i)=>{i.d(t,{Z:()=>h});var n,s,a=i(7313);function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},o.apply(this,arguments)}const r=(e,t)=>{let{title:i,titleId:r,...c}=e;return a.createElement("svg",o({width:25,height:24,viewBox:"0 0 25 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":r},c),i?a.createElement("title",{id:r},i):null,n||(n=a.createElement("g",{clipPath:"url(#clip0_14990_39524)"},a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.5 0C5.8724 0 0.5 5.3808 0.5 12.0204C0.5 17.3304 3.938 21.8364 8.7068 23.4252C9.3068 23.5356 9.5252 23.1648 9.5252 22.8456C9.5252 22.5612 9.5156 21.804 9.5096 20.802C6.1712 21.528 5.4668 19.1904 5.4668 19.1904C4.922 17.8008 4.1348 17.4312 4.1348 17.4312C3.0452 16.6872 4.2176 16.7016 4.2176 16.7016C5.4212 16.7856 6.0548 17.94 6.0548 17.94C7.1252 19.776 8.864 19.2456 9.5468 18.9384C9.6572 18.162 9.9668 17.6328 10.31 17.3328C7.646 17.0292 4.844 15.9972 4.844 11.3916C4.844 10.08 5.312 9.006 6.0788 8.166C5.9552 7.8624 5.5436 6.6396 6.1964 4.986C6.1964 4.986 7.2044 4.662 9.4964 6.2172C10.4753 5.95022 11.4853 5.81423 12.5 5.8128C13.52 5.8176 14.546 5.9508 15.5048 6.2172C17.7956 4.662 18.8012 4.9848 18.8012 4.9848C19.4564 6.6396 19.0436 7.8624 18.9212 8.166C19.6892 9.006 20.1548 10.08 20.1548 11.3916C20.1548 16.0092 17.348 17.0256 14.6756 17.3232C15.1064 17.694 15.4892 18.4272 15.4892 19.5492C15.4892 21.1548 15.4748 22.452 15.4748 22.8456C15.4748 23.1672 15.6908 23.5416 16.3004 23.424C18.69 22.6225 20.7672 21.0904 22.2386 19.0441C23.7099 16.9977 24.501 14.5408 24.5 12.0204C24.5 5.3808 19.1264 0 12.5 0Z",fill:"black"}))),s||(s=a.createElement("defs",null,a.createElement("clipPath",{id:"clip0_14990_39524"},a.createElement("rect",{width:24,height:24,fill:"white",transform:"translate(0.5)"})))))},c=(0,a.forwardRef)(r);var l=i(9184),d=i(1140),u=i(6417);const g=(0,l.ZP)(d.Z)`
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
`;function h(e){let{type:t="login",client_id:i}=e;return(0,u.jsxs)(g,{onClick:()=>{location.href=`http://github.com/login/oauth/authorize?client_id=${i}`},children:[(0,u.jsx)(c,{className:"icon"}),` ${"login"===t?"Sign in":"Sign up"} with Github`]})}},5328:(e,t,i)=>{i.d(t,{Z:()=>g});var n=i(7313),s=i(2338),a=i(3657),o=i(9184);const r=i.p+"static/media/google.db7474a481e12799b961.svg";var c=i(1140),l=i(2509),d=i(6417);const u=(0,o.ZP)(c.Z)`
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
`,g=e=>{let{type:t="login",clientId:i}=e;const[o,{isSuccess:c,isLoading:g}]=(0,l.YA)(),{signIn:h,loaded:p}=(0,s.useGoogleLogin)({onScriptLoadFailure:e=>{},clientId:i,onSuccess:e=>{let{tokenId:t,...i}=e;o({id_token:t,type:"google"})},onFailure:e=>{}});(0,n.useEffect)((()=>{c&&a.ZP.success("Login Successfully")}),[c]);return(0,d.jsxs)(u,{disabled:!p||g,onClick:()=>{h()},children:[(0,d.jsx)("img",{className:"icon",src:r,alt:"google icon"}),p?("login"===t?"Sign in":"Sign up")+" with Google":"Initializing"]})}},1923:(e,t,i)=>{i.d(t,{Z:()=>a});var n=i(7313),s=i(2378);function a(){const[e,t]=(0,n.useState)(!1),[i,a]=(0,n.useState)({}),{data:o}=(0,s.R)(void 0,{refetchOnMountOrArgChange:!0}),[r,{isSuccess:c}]=(0,s.Ku)();(0,n.useEffect)((()=>{o&&a(o)}),[o]),(0,n.useEffect)((()=>{t(!c&&JSON.stringify(o)!==JSON.stringify(i))}),[o,i,c]);return{config:i,changed:e,updateGithubAuthConfig:e=>{a((t=>({...t,...e})))},updateGithubAuthConfigToServer:async()=>{await r(i)},isSuccess:c}}},9137:(e,t,i)=>{i.d(t,{Z:()=>a});var n=i(7313),s=i(2378);function a(){const[e,t]=(0,n.useState)(!1),[i,a]=(0,n.useState)(""),{data:o}=(0,s.eM)(void 0,{refetchOnMountOrArgChange:!0}),[r,{isSuccess:c}]=(0,s.Qg)();(0,n.useEffect)((()=>{o&&a(o.client_id)}),[o]),(0,n.useEffect)((()=>{t(!c&&(null===o||void 0===o?void 0:o.client_id)!==i)}),[o,i,c]);return{config:o,changed:e,clientId:i,updateClientId:a,updateClientIdToServer:async()=>{i&&await r({client_id:i})},updateGoogleAuthConfig:r,isSuccess:c}}},9047:(e,t,i)=>{i.r(t),i.d(t,{default:()=>N});var n=i(7313),s=i(3657),a=i(7935),o=i(9184),r=i(1140);const c=(0,o.ZP)(r.Z)`
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
`,l=o.ZP.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form {
    padding: 36px 40px 32px 40px;
    /* border: 1px solid #eee; */
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
      }
    }
    .desc {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #667085;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 360px;
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
  }
`;var d=i(6499),u=i(2509);const g=i.p+"static/media/metamask.f04d5fb63394197766d0.svg";var h=i(6417);function p(e){let{login:t}=e;const[i,s]=(0,n.useState)(!1),[a,o]=(0,n.useState)([]),[r]=(0,u.sZ)(),l=(0,n.useRef)();(0,n.useEffect)((()=>{function e(e){o(e)}return l.current||(l.current=new d.Z),d.Z.isMetaMaskInstalled()&&ethereum.on("accountsChanged",e),()=>{d.Z.isMetaMaskInstalled()&&ethereum.removeListener("accountsChanged",e)}}),[]),(0,n.useEffect)((()=>{if(d.Z.isMetaMaskInstalled())if(a.length>0){const[e]=a;(async e=>{const{data:i,isSuccess:n}=await r(e);if(n){const n=await p(e,i);t({public_address:e,nonce:i,signature:n,type:"metamask"})}})(e),s(!0),l.current.stopOnboarding()}else s(!1)}),[a]);const p=async(e,t)=>await ethereum.request({method:"personal_sign",params:[t,e,"hello from rustchat"]});return(0,h.jsxs)(c,{disabled:i,onClick:async()=>{if(d.Z.isMetaMaskInstalled()){s(!0);try{const e=await ethereum.request({method:"eth_requestAccounts"});o(e)}catch(e){ethereum.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}s(!1)}else l.current.startOnboarding()},children:[(0,h.jsx)("img",{className:"icon",src:g,alt:"meta mask icon"}),"Sign in with MetaMask"]})}var f=i(6571),m=i(666);function x(e){let{issuer:t}=e;const[i,{data:s,isLoading:a,isSuccess:o}]=(0,u.CB)();return(0,n.useEffect)((()=>{if(o){const{url:e}=s;location.href=e}}),[s,o]),(0,h.jsxs)(c,{disabled:a,onClick:()=>{i({issuer:t,redirect_uri:`${location.origin}/#/login`})},children:[Boolean(t.favicon)&&(0,h.jsx)("img",{src:t.favicon,className:"icon",alt:"icon"}),"Login with ",t.domain]})}const b=(0,o.ZP)(f.Z)`
  text-align: center;
  padding: 32px 32px 16px;

  > *:first-child {
    margin-bottom: 32px;
  }

  > .button {
    > .icon {
      width: 24px;
      height: 24px;
    }

    &Cancel {
      color: #8f8f8f;
    }
  }
`;function w(e){let{issuers:t}=e;const[i,s]=(0,n.useState)(!1);return t?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c,{onClick:()=>{s(!0)},children:"Sign in with OIDC"}),i&&(0,h.jsx)(m.Z,{id:"modal-modal",children:(0,h.jsxs)(b,{title:"Login with OIDC",children:[t.filter((e=>e.enable)).map(((e,t)=>(0,h.jsx)(x,{issuer:e},t))),(0,h.jsx)(r.Z,{className:"border_less ghost buttonCancel",onClick:()=>{s(!1)},children:"Close"})]})})]}):null}var C=i(4050),v=i(7890);const j=(0,o.ZP)(r.Z)`
  width: 100%;
  margin-bottom: 16px;
`;function k(){const e=(0,v.s0)();return(0,h.jsx)(j,{onClick:()=>{e("/send_magic_link")},children:"Sign in with Magic Link"})}const y=o.ZP.p`
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
`;function Z(){const e=(0,v.s0)();return(0,h.jsxs)(y,{children:[(0,h.jsx)("span",{children:"Don\u2019t have an account?"}),(0,h.jsx)("a",{onClick:()=>{e("/register")},children:"Sign up"})]})}var S=i(2378),_=i(9137),E=i(1923),P=i(5328),I=i(4968);function N(){const{data:e}=(0,S.n8)(),[t,{isSuccess:i,isLoading:o,error:c}]=(0,u.YA)(),{clientId:d}=(0,_.Z)(),{config:g}=(0,E.Z)(),{data:f,isSuccess:m}=(0,S.ww)(),[x,b]=(0,n.useState)({email:"",password:""});(0,n.useEffect)((()=>{const e=new URLSearchParams(location.search),i=e.get("oauth"),n=e.get("code"),s=e.get("state"),a=e.get("magic_token"),o=e.get("exists");if(i)switch(i){case"github":n&&t({code:n,type:"github"});break;case"oidc":n&&s&&t({code:n,state:s,type:"oidc"})}if(a&&"undefined"!==typeof o){"true"==o?t({magic_token:a,type:"magiclink"}):location.href=`?magic_token=${a}#/register/set_name/login`}}),[]),(0,n.useEffect)((()=>{if(c)switch(c.status){case"PARSING_ERROR":s.ZP.error(c.data);break;case 401:s.ZP.error("Username or Password incorrect");break;case 404:s.ZP.error("Account not exist");break;case 410:s.ZP.error("No associated account found, please contact admin for an invitation link to join.");break;default:s.ZP.error("Something Error")}else;}),[c]),(0,n.useEffect)((()=>{i&&s.ZP.success("Login Successfully")}),[i]);const v=e=>{const{type:t}=e.target.dataset,{value:i}=e.target;b((e=>(e[t]=i,{...e})))},{email:j,password:y}=x;if(!m)return null;const{magic_link:N,github:O,google:M,metamask:L,oidc:R=[],who_can_sign_up:A}=f,z=e&&N,q=M&&d,G=z||q||L||R.length>0||O;return(0,h.jsx)(l,{children:(0,h.jsxs)("div",{className:"form",children:[(0,h.jsxs)("div",{className:"tips",children:[(0,h.jsx)("img",{src:`${a.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,h.jsx)("h2",{className:"title",children:"Login to Rustchat"}),(0,h.jsx)("span",{className:"desc",children:"Please enter your details."})]}),(0,h.jsxs)("form",{onSubmit:e=>{e.preventDefault(),t({...x,type:"password"})},children:[(0,h.jsx)(C.Z,{className:"large",name:"email",value:j,required:!0,placeholder:"Enter your email","data-type":"email",onChange:v}),(0,h.jsx)(C.Z,{className:"large",type:"password",value:y,name:"password",required:!0,"data-type":"password",onChange:v,placeholder:"Enter your password"}),(0,h.jsx)(r.Z,{type:"submit",disabled:o,children:o?"Signing":"Sign in"})]}),G&&(0,h.jsx)("hr",{className:"or"}),z&&(0,h.jsx)(k,{}),q&&(0,h.jsx)(P.Z,{clientId:d}),O&&(0,h.jsx)(I.Z,{client_id:null===g||void 0===g?void 0:g.client_id}),L&&(0,h.jsx)(p,{login:t}),R.length>0&&(0,h.jsx)(w,{issuers:R}),"EveryOne"===A&&(0,h.jsx)(Z,{})]})})}}}]);