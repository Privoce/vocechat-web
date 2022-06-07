"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[279],{8648:(e,t,i)=>{i.d(t,{Z:()=>l});var s=i(7313),n=i(4901),a=i(9184),o=i(6417);const r=a.ZP.div`
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
`,c=a.ZP.input`
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
`;function l(e){let{type:t="text",prefix:i="",className:a,...l}=e;const[d,u]=(0,s.useState)(t);return"password"==t?(0,o.jsxs)(r,{className:a,children:[(0,o.jsx)(c,{type:d,className:`inner ${a}`,...l}),(0,o.jsx)("div",{className:"view",onClick:()=>{u((e=>"password"==e?"text":"password"))},children:"password"==d?(0,o.jsx)(n.MBb,{color:"#78787c"}):(0,o.jsx)(n.Rbo,{color:"#78787c"})})]}):i?(0,o.jsxs)(r,{className:a,children:[(0,o.jsx)("span",{className:"prefix",children:i}),(0,o.jsx)(c,{className:`inner ${a}`,type:d,...l})]}):(0,o.jsx)(c,{type:d,className:a,...l})}},3656:(e,t,i)=>{i.d(t,{Z:()=>a});var s=i(7313),n=i(4695);function a(){const[e,t]=(0,s.useState)(!1),[i,a]=(0,s.useState)({}),{data:o}=(0,n.R)(void 0,{refetchOnMountOrArgChange:!0}),[r,{isSuccess:c}]=(0,n.Ku)();(0,s.useEffect)((()=>{o&&a(o)}),[o]),(0,s.useEffect)((()=>{t(!c&&JSON.stringify(o)!==JSON.stringify(i))}),[o,i,c]);return{config:i,changed:e,updateGithubAuthConfig:e=>{a((t=>({...t,...e})))},updateGithubAuthConfigToServer:async()=>{await r(i)},isSuccess:c}}},8536:(e,t,i)=>{i.d(t,{Z:()=>a});var s=i(7313),n=i(4695);function a(){const[e,t]=(0,s.useState)(!1),[i,a]=(0,s.useState)(""),{data:o}=(0,n.eM)(void 0,{refetchOnMountOrArgChange:!0}),[r,{isSuccess:c}]=(0,n.Qg)();(0,s.useEffect)((()=>{o&&a(o.client_id)}),[o]),(0,s.useEffect)((()=>{t(!c&&(null===o||void 0===o?void 0:o.client_id)!==i)}),[o,i,c]);return{config:o,changed:e,clientId:i,updateClientId:a,updateClientIdToServer:async()=>{i&&await r({client_id:i})},updateGoogleAuthConfig:r,isSuccess:c}}},1565:(e,t,i)=>{i.r(t),i.d(t,{default:()=>R});var s=i(7313),n=i(3657),a=i(2867),o=i(9184),r=i(1296);const c=(0,o.ZP)(r.Z)`
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
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
      0px 2px 4px -2px rgba(16, 24, 40, 0.06);
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
`;var d=i(6499),u=i(1864);const p=i.p+"static/media/metamask.f04d5fb63394197766d0.svg";var g=i(6417);function h(e){let{login:t}=e;const[i,n]=(0,s.useState)(!1),[a,o]=(0,s.useState)([]),[r]=(0,u.sZ)(),l=(0,s.useRef)();(0,s.useEffect)((()=>{function e(e){o(e)}return l.current||(l.current=new d.Z),d.Z.isMetaMaskInstalled()&&ethereum.on("accountsChanged",e),()=>{d.Z.isMetaMaskInstalled()&&ethereum.removeListener("accountsChanged",e)}}),[]),(0,s.useEffect)((()=>{if(d.Z.isMetaMaskInstalled())if(a.length>0){const[e]=a;(async e=>{const{data:i,isSuccess:s}=await r(e);if(s){const s=await h(e,i);t({public_address:e,nonce:i,signature:s,type:"metamask"})}})(e),n(!0),l.current.stopOnboarding()}else n(!1)}),[a]);const h=async(e,t)=>await ethereum.request({method:"personal_sign",params:[t,e,"hello from rustchat"]});return(0,g.jsxs)(c,{disabled:i,onClick:async()=>{if(d.Z.isMetaMaskInstalled()){n(!0);try{const e=await ethereum.request({method:"eth_requestAccounts"});o(e)}catch(e){ethereum.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}n(!1)}else l.current.startOnboarding()},children:[(0,g.jsx)("img",{className:"icon",src:p,alt:"meta mask icon"}),"Sign in with MetaMask"]})}const f=i.p+"static/media/solid.ef0c47f26e38670f4812.svg";function x(e){let{issuers:t}=e;const[i,{data:n,isLoading:a,isSuccess:o}]=(0,u.CB)();return(0,s.useEffect)((()=>{if(o){const{url:e}=n;location.href=e}}),[n,o]),(0,g.jsxs)(c,{disabled:a,onClick:()=>{i({issuer:t[0],redirect_uri:`${location.origin}/#/login`})},children:[(0,g.jsx)("img",{src:f,className:"icon",alt:"solid icon"}),a?"Redirecting...":"Sign in with Solid"]})}var m=i(8648),b=i(2338);const w=i.p+"static/media/google.db7474a481e12799b961.svg";function C(e){let{login:t,clientId:i}=e;const{signIn:s,loaded:n}=(0,b.useGoogleLogin)({onScriptLoadFailure:e=>{},clientId:i,onSuccess:e=>{let{tokenId:i,...s}=e;t({id_token:i,type:"google"})},onFailure:e=>{}});return(0,g.jsxs)(c,{disabled:!n,onClick:()=>{s()},children:[(0,g.jsx)("img",{className:"icon",src:w,alt:"google icon"}),n?"Sign in with Google":"Initailizing"]})}var v=i(7890);const k=(0,o.ZP)(r.Z)`
  width: 100%;
  margin-bottom: 16px;
`;function y(){const e=(0,v.s0)();return(0,g.jsx)(k,{onClick:()=>{e("/send_magic_link")},children:"Sign in with Magic Link"})}var j,S,Z=i(4695),N=i(8536);function _(){return _=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s])}return e},_.apply(this,arguments)}const E=(e,t)=>{let{title:i,titleId:n,...a}=e;return s.createElement("svg",_({width:25,height:24,viewBox:"0 0 25 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":n},a),i?s.createElement("title",{id:n},i):null,j||(j=s.createElement("g",{clipPath:"url(#clip0_14990_39524)"},s.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.5 0C5.8724 0 0.5 5.3808 0.5 12.0204C0.5 17.3304 3.938 21.8364 8.7068 23.4252C9.3068 23.5356 9.5252 23.1648 9.5252 22.8456C9.5252 22.5612 9.5156 21.804 9.5096 20.802C6.1712 21.528 5.4668 19.1904 5.4668 19.1904C4.922 17.8008 4.1348 17.4312 4.1348 17.4312C3.0452 16.6872 4.2176 16.7016 4.2176 16.7016C5.4212 16.7856 6.0548 17.94 6.0548 17.94C7.1252 19.776 8.864 19.2456 9.5468 18.9384C9.6572 18.162 9.9668 17.6328 10.31 17.3328C7.646 17.0292 4.844 15.9972 4.844 11.3916C4.844 10.08 5.312 9.006 6.0788 8.166C5.9552 7.8624 5.5436 6.6396 6.1964 4.986C6.1964 4.986 7.2044 4.662 9.4964 6.2172C10.4753 5.95022 11.4853 5.81423 12.5 5.8128C13.52 5.8176 14.546 5.9508 15.5048 6.2172C17.7956 4.662 18.8012 4.9848 18.8012 4.9848C19.4564 6.6396 19.0436 7.8624 18.9212 8.166C19.6892 9.006 20.1548 10.08 20.1548 11.3916C20.1548 16.0092 17.348 17.0256 14.6756 17.3232C15.1064 17.694 15.4892 18.4272 15.4892 19.5492C15.4892 21.1548 15.4748 22.452 15.4748 22.8456C15.4748 23.1672 15.6908 23.5416 16.3004 23.424C18.69 22.6225 20.7672 21.0904 22.2386 19.0441C23.7099 16.9977 24.501 14.5408 24.5 12.0204C24.5 5.3808 19.1264 0 12.5 0Z",fill:"black"}))),S||(S=s.createElement("defs",null,s.createElement("clipPath",{id:"clip0_14990_39524"},s.createElement("rect",{width:24,height:24,fill:"white",transform:"translate(0.5)"})))))},P=(0,s.forwardRef)(E);function I(e){let{config:t={}}=e;const{client_id:i}=t;return(0,g.jsxs)(c,{onClick:()=>{location.href=`http://github.com/login/oauth/authorize?client_id=${i}`},children:[(0,g.jsx)(P,{className:"icon"}),"Sign in with Github"]})}var M=i(3656);function R(){const{data:e}=(0,Z.n8)(),[t,{isSuccess:i,isLoading:o,error:c}]=(0,u.YA)(),{clientId:d}=(0,N.Z)(),{config:p}=(0,M.Z)(),{data:f,isSuccess:b}=(0,Z.ww)(),[w,v]=(0,s.useState)({email:"",password:""});(0,s.useEffect)((()=>{const e=new URLSearchParams(location.search),i=e.get("oauth"),s=e.get("code"),n=e.get("state"),a=e.get("token"),o=e.get("exists");if(i)switch(i){case"github":s&&t({code:s,type:"github"});break;case"oidc":s&&n&&t({code:s,state:n,type:"oidc"})}if(a&&"undefined"!==typeof o){"true"==o?t({token:a,type:"magiclink"}):location.href=`/#/reg/magiclink/${a}`}}),[]),(0,s.useEffect)((()=>{if(c)switch(c.status){case"PARSING_ERROR":n.ZP.error(c.data);break;case 401:n.ZP.error("username or password incorrect");break;case 404:n.ZP.error("account not exsit");break;default:n.ZP.error("something error")}else;}),[c]),(0,s.useEffect)((()=>{i&&n.ZP.success("Login Successfully")}),[i]);const k=e=>{const{type:t}=e.target.dataset,{value:i}=e.target;v((e=>(e[t]=i,{...e})))},{email:j,password:S}=w;if(!b)return null;const{magic_link:_,github:E,google:P,metamask:R,oidc:O=[]}=f,z=e&&_,L=P&&d,A=z||L||R||O.length>0||E;return(0,g.jsx)(l,{children:(0,g.jsxs)("div",{className:"form",children:[(0,g.jsxs)("div",{className:"tips",children:[(0,g.jsx)("img",{src:`${a.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,g.jsx)("h2",{className:"title",children:"Login to Rustchat"}),(0,g.jsx)("span",{className:"desc",children:"Please enter your details."})]}),(0,g.jsxs)("form",{onSubmit:e=>{e.preventDefault(),t({...w,type:"password"})},children:[(0,g.jsx)(m.Z,{className:"large",name:"email",value:j,required:!0,placeholder:"Enter your email","data-type":"email",onChange:k}),(0,g.jsx)(m.Z,{className:"large",type:"password",value:S,name:"password",required:!0,"data-type":"password",onChange:k,placeholder:"Enter your password"}),(0,g.jsx)(r.Z,{type:"submit",disabled:o,children:o?"Signing":"Sign in"})]}),A&&(0,g.jsx)("hr",{className:"or"}),z&&(0,g.jsx)(y,{}),L&&(0,g.jsx)(C,{login:t,clientId:d}),E&&(0,g.jsx)(I,{config:p}),R&&(0,g.jsx)(h,{login:t}),O.length>0&&(0,g.jsx)(x,{issuers:O})]})})}}}]);