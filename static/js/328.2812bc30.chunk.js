"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[328],{5607:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(7313),s=n(1168);function o(e){let{id:t="root-modal",mask:n=!0,children:o}=e;const[a,r]=(0,i.useState)(null);return(0,i.useEffect)((()=>{const e=document.getElementById(t);n&&e.classList.add("mask");const i=document.createElement("div");return i.classList.add("wrapper"),e.appendChild(i),r(i),()=>{e.removeChild(i)}}),[t,n]),a?(0,s.createPortal)(o,a):null}},8648:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(7313),s=n(887),o=n(9184),a=n(6417);const r=o.ZP.div`
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
  .prefix {
    padding: 8px 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #9ca3af;
    background: #f3f4f6;
    border-right: 1px solid #e5e7eb;
  }
  .view {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`,c=o.ZP.input`
  width: 100%;
  background: #ffffff;

  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  padding: 8px;
  outline: none;
  &:not(.inner) {
    border-radius: 4px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
  }
  &.large {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 11px 8px;
  }
  &.none {
    outline: none;
    border: none;
    background: none;
    box-shadow: none;
  }
  &:disabled {
    color: #78787c;
    background-color: #f9fafb;
  }
  &::placeholder {
    color: #d1d5db;
  }
  &[type="password"] {
    padding-right: 30px;
  }
`;function l(e){let{type:t="text",prefix:n="",className:o,...l}=e;const[d,p]=(0,i.useState)(t);return"password"==t?(0,a.jsxs)(r,{className:o,children:[(0,a.jsx)(c,{type:d,className:`inner ${o}`,...l}),(0,a.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==d?(0,a.jsx)(s.MBb,{color:"#78787c"}):(0,a.jsx)(s.Rbo,{color:"#78787c"})})]}):n?(0,a.jsxs)(r,{className:o,children:[(0,a.jsx)("span",{className:"prefix",children:n}),(0,a.jsx)(c,{className:`inner ${o}`,type:d,...l})]}):(0,a.jsx)(c,{type:d,className:o,...l})}},5845:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(9184),s=n(6417);const o=i.ZP.div`
  padding: 32px;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 8px;
  background-color: #fff;
  min-width: 440px;
  &.compact {
    padding: 16px;
    min-width: 406px;
    .title,
    .desc {
      text-align: left;
    }
  }
  .title {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color: #374151;
    margin-bottom: 16px;
  }
  .desc {
    text-align: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #6b7280;
    margin-bottom: 8px;
  }
  .btns {
    padding-top: 16px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    align-items: center;
  }
`;function a(e){let{title:t="",description:n="",buttons:i=null,children:a,...r}=e;return(0,s.jsxs)(o,{...r,children:[t&&(0,s.jsx)("h3",{className:"title",children:t}),n&&(0,s.jsx)("p",{className:"desc",children:n}),a,i&&(0,s.jsx)("div",{className:"btns",children:i})]})}},3656:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(7313),s=n(4695);function o(){const[e,t]=(0,i.useState)(!1),[n,o]=(0,i.useState)({}),{data:a}=(0,s.R)(void 0,{refetchOnMountOrArgChange:!0}),[r,{isSuccess:c}]=(0,s.Ku)();(0,i.useEffect)((()=>{a&&o(a)}),[a]),(0,i.useEffect)((()=>{t(!c&&JSON.stringify(a)!==JSON.stringify(n))}),[a,n,c]);return{config:n,changed:e,updateGithubAuthConfig:e=>{o((t=>({...t,...e})))},updateGithubAuthConfigToServer:async()=>{await r(n)},isSuccess:c}}},8536:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(7313),s=n(4695);function o(){const[e,t]=(0,i.useState)(!1),[n,o]=(0,i.useState)(""),{data:a}=(0,s.eM)(void 0,{refetchOnMountOrArgChange:!0}),[r,{isSuccess:c}]=(0,s.Qg)();(0,i.useEffect)((()=>{a&&o(a.client_id)}),[a]),(0,i.useEffect)((()=>{t(!c&&(null===a||void 0===a?void 0:a.client_id)!==n)}),[a,n,c]);return{config:a,changed:e,clientId:n,updateClientId:o,updateClientIdToServer:async()=>{n&&await r({client_id:n})},updateGoogleAuthConfig:r,isSuccess:c}}},4482:(e,t,n)=>{n.r(t),n.d(t,{default:()=>G});var i=n(7313),s=n(3657),o=n(2867),a=n(9184),r=n(1296);const c=(0,a.ZP)(r.Z)`
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
`,l=a.ZP.div`
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
`;var d=n(6499),p=n(1864);const u=n.p+"static/media/metamask.f04d5fb63394197766d0.svg";var g=n(6417);function h(e){let{login:t}=e;const[n,s]=(0,i.useState)(!1),[o,a]=(0,i.useState)([]),[r]=(0,p.sZ)(),l=(0,i.useRef)();(0,i.useEffect)((()=>{function e(e){a(e)}return l.current||(l.current=new d.Z),d.Z.isMetaMaskInstalled()&&ethereum.on("accountsChanged",e),()=>{d.Z.isMetaMaskInstalled()&&ethereum.removeListener("accountsChanged",e)}}),[]),(0,i.useEffect)((()=>{if(d.Z.isMetaMaskInstalled())if(o.length>0){const[e]=o;(async e=>{const{data:n,isSuccess:i}=await r(e);if(i){const i=await h(e,n);t({public_address:e,nonce:n,signature:i,type:"metamask"})}})(e),s(!0),l.current.stopOnboarding()}else s(!1)}),[o]);const h=async(e,t)=>await ethereum.request({method:"personal_sign",params:[t,e,"hello from rustchat"]});return(0,g.jsxs)(c,{disabled:n,onClick:async()=>{if(d.Z.isMetaMaskInstalled()){s(!0);try{const e=await ethereum.request({method:"eth_requestAccounts"});a(e)}catch(e){ethereum.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}s(!1)}else l.current.startOnboarding()},children:[(0,g.jsx)("img",{className:"icon",src:u,alt:"meta mask icon"}),"Sign in with MetaMask"]})}var x=n(5845),f=n(5607);const m=n.p+"static/media/solid.ef0c47f26e38670f4812.svg";function b(e){let{issuer:t}=e;const[n,{data:s,isLoading:o,isSuccess:a}]=(0,p.CB)();return(0,i.useEffect)((()=>{if(a){const{url:e}=s;location.href=e}}),[s,a]),(0,g.jsxs)(c,{disabled:o,onClick:()=>{n({issuer:t,redirect_uri:`${location.origin}/#/login`})},children:[Boolean(t.favicon)&&(0,g.jsx)("img",{src:t.favicon,className:"icon",alt:"icon"}),"Login with ",t.domain]})}const w=(0,a.ZP)(x.Z)`
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
`;function C(e){let{issuers:t}=e;const[n,s]=(0,i.useState)(!1);return t?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(c,{onClick:()=>{s(!0)},children:[(0,g.jsx)("img",{src:m,className:"icon",alt:"solid icon"}),"Sign in with OIDC"]}),n&&(0,g.jsx)(f.Z,{id:"modal-modal",children:(0,g.jsxs)(w,{title:"Login with OIDC",children:[t.filter((e=>e.enable)).map(((e,t)=>(0,g.jsx)(b,{issuer:e},t))),(0,g.jsx)(r.Z,{className:"border_less ghost buttonCancel",onClick:()=>{s(!1)},children:"Close"})]})})]}):null}var j=n(8648),v=n(2338);const k=n.p+"static/media/google.db7474a481e12799b961.svg";function y(e){let{login:t,clientId:n}=e;const{signIn:i,loaded:s}=(0,v.useGoogleLogin)({onScriptLoadFailure:e=>{},clientId:n,onSuccess:e=>{let{tokenId:n,...i}=e;t({id_token:n,type:"google"})},onFailure:e=>{}});return(0,g.jsxs)(c,{disabled:!s,onClick:()=>{i()},children:[(0,g.jsx)("img",{className:"icon",src:k,alt:"google icon"}),s?"Sign in with Google":"Initailizing"]})}var S=n(7890);const Z=(0,a.ZP)(r.Z)`
  width: 100%;
  margin-bottom: 16px;
`;function N(){const e=(0,S.s0)();return(0,g.jsx)(Z,{onClick:()=>{e("/send_magic_link")},children:"Sign in with Magic Link"})}const _=a.ZP.p`
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
`;function E(){const e=(0,S.s0)();return(0,g.jsxs)(_,{children:[(0,g.jsx)("span",{children:"Don\u2019t have an account?"}),(0,g.jsx)("a",{onClick:()=>{e("/")},children:"Sign up"})]})}var P,I,M=n(4695),O=n(8536);function z(){return z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},z.apply(this,arguments)}const L=(e,t)=>{let{title:n,titleId:s,...o}=e;return i.createElement("svg",z({width:25,height:24,viewBox:"0 0 25 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":s},o),n?i.createElement("title",{id:s},n):null,P||(P=i.createElement("g",{clipPath:"url(#clip0_14990_39524)"},i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.5 0C5.8724 0 0.5 5.3808 0.5 12.0204C0.5 17.3304 3.938 21.8364 8.7068 23.4252C9.3068 23.5356 9.5252 23.1648 9.5252 22.8456C9.5252 22.5612 9.5156 21.804 9.5096 20.802C6.1712 21.528 5.4668 19.1904 5.4668 19.1904C4.922 17.8008 4.1348 17.4312 4.1348 17.4312C3.0452 16.6872 4.2176 16.7016 4.2176 16.7016C5.4212 16.7856 6.0548 17.94 6.0548 17.94C7.1252 19.776 8.864 19.2456 9.5468 18.9384C9.6572 18.162 9.9668 17.6328 10.31 17.3328C7.646 17.0292 4.844 15.9972 4.844 11.3916C4.844 10.08 5.312 9.006 6.0788 8.166C5.9552 7.8624 5.5436 6.6396 6.1964 4.986C6.1964 4.986 7.2044 4.662 9.4964 6.2172C10.4753 5.95022 11.4853 5.81423 12.5 5.8128C13.52 5.8176 14.546 5.9508 15.5048 6.2172C17.7956 4.662 18.8012 4.9848 18.8012 4.9848C19.4564 6.6396 19.0436 7.8624 18.9212 8.166C19.6892 9.006 20.1548 10.08 20.1548 11.3916C20.1548 16.0092 17.348 17.0256 14.6756 17.3232C15.1064 17.694 15.4892 18.4272 15.4892 19.5492C15.4892 21.1548 15.4748 22.452 15.4748 22.8456C15.4748 23.1672 15.6908 23.5416 16.3004 23.424C18.69 22.6225 20.7672 21.0904 22.2386 19.0441C23.7099 16.9977 24.501 14.5408 24.5 12.0204C24.5 5.3808 19.1264 0 12.5 0Z",fill:"black"}))),I||(I=i.createElement("defs",null,i.createElement("clipPath",{id:"clip0_14990_39524"},i.createElement("rect",{width:24,height:24,fill:"white",transform:"translate(0.5)"})))))},R=(0,i.forwardRef)(L);function A(e){let{config:t={}}=e;const{client_id:n}=t;return(0,g.jsxs)(c,{onClick:()=>{location.href=`http://github.com/login/oauth/authorize?client_id=${n}`},children:[(0,g.jsx)(R,{className:"icon"}),"Sign in with Github"]})}var q=n(3656);function G(){const{data:e}=(0,M.n8)(),[t,{isSuccess:n,isLoading:a,error:c}]=(0,p.YA)(),{clientId:d}=(0,O.Z)(),{config:u}=(0,q.Z)(),{data:x,isSuccess:f}=(0,M.ww)(),[m,b]=(0,i.useState)({email:"",password:""});(0,i.useEffect)((()=>{const e=new URLSearchParams(location.search),n=e.get("oauth"),i=e.get("code"),s=e.get("state"),o=e.get("token"),a=e.get("exists");if(n)switch(n){case"github":i&&t({code:i,type:"github"});break;case"oidc":i&&s&&t({code:i,state:s,type:"oidc"})}if(o&&"undefined"!==typeof a){"true"==a?t({token:o,type:"magiclink"}):location.href=`/#/reg/magiclink/${o}`}}),[]),(0,i.useEffect)((()=>{if(c)switch(c.status){case"PARSING_ERROR":s.ZP.error(c.data);break;case 401:s.ZP.error("username or password incorrect");break;case 404:s.ZP.error("account not exsit");break;default:s.ZP.error("something error")}else;}),[c]),(0,i.useEffect)((()=>{n&&s.ZP.success("Login Successfully")}),[n]);const w=e=>{const{type:t}=e.target.dataset,{value:n}=e.target;b((e=>(e[t]=n,{...e})))},{email:v,password:k}=m;if(!f)return null;const{magic_link:S,github:Z,google:_,metamask:P,oidc:I=[],who_can_sign_up:z}=x,L=e&&S,R=_&&d,G=L||R||P||I.length>0||Z;return(0,g.jsx)(l,{children:(0,g.jsxs)("div",{className:"form",children:[(0,g.jsxs)("div",{className:"tips",children:[(0,g.jsx)("img",{src:`${o.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,g.jsx)("h2",{className:"title",children:"Login to Rustchat"}),(0,g.jsx)("span",{className:"desc",children:"Please enter your details."})]}),(0,g.jsxs)("form",{onSubmit:e=>{e.preventDefault(),t({...m,type:"password"})},children:[(0,g.jsx)(j.Z,{className:"large",name:"email",value:v,required:!0,placeholder:"Enter your email","data-type":"email",onChange:w}),(0,g.jsx)(j.Z,{className:"large",type:"password",value:k,name:"password",required:!0,"data-type":"password",onChange:w,placeholder:"Enter your password"}),(0,g.jsx)(r.Z,{type:"submit",disabled:a,children:a?"Signing":"Sign in"})]}),G&&(0,g.jsx)("hr",{className:"or"}),L&&(0,g.jsx)(N,{}),R&&(0,g.jsx)(y,{login:t,clientId:d}),Z&&(0,g.jsx)(A,{config:u}),P&&(0,g.jsx)(h,{login:t}),I.length>0&&(0,g.jsx)(C,{issuers:I}),"EveryOne"===z&&(0,g.jsx)(E,{})]})})}}}]);