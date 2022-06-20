"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[125],{1125:(e,n,s)=>{s.r(n),s.d(n,{default:()=>f});var i=s(7313),a=s(3709),t=s(7890),o=s(1690),c=s(3067),l=s(1296),r=s(1864),d=s(3657),u=s(9184),h=s(6417);const g=u.ZP.div`
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
`;function m(){return(0,h.jsxs)(g,{children:[(0,h.jsx)("div",{className:"title",children:"Magic link expired"}),(0,h.jsx)("p",{className:"desc",children:"Go back to your original Rustchat tab and request a new magic link."}),(0,h.jsx)("p",{className:"desc",children:"You can close this window now."})]})}function f(){const[e,{data:n,isLoading:s}]=(0,r.v5)(),[u,{isLoading:g,error:f,isSuccess:p,data:x}]=(0,r.YA)(),[k,{isLoading:b,isSuccess:w,data:j}]=(0,r.l4)(),{from:v="reg"}=(0,t.UO)(),y=(0,a.I0)(),[N,L]=(0,i.useState)(""),S=new URLSearchParams(location.search).get("magic_token");(0,i.useEffect)((()=>{S&&e(S)}),[S]),(0,i.useEffect)((()=>{if(401===(null===f||void 0===f?void 0:f.status))d.ZP.error("Invalided Token")}),[f]),(0,i.useEffect)((()=>{const e=x||j;(p||w)&&e&&(d.ZP.success("Login Successfully"),y((0,o.A3)(e)),location.href="/#/")}),[p,w,x,j]);if(!S)return"No Token";if(s)return"Checking Magic Link...";if(!n)return(0,h.jsx)(m,{});const _=g||b,C=p||w;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"tips",children:[(0,h.jsx)("h2",{className:"title",children:"What\u2019s your name"}),(0,h.jsx)("span",{className:"desc",children:"Enter a name or handle so people know how you\u2019d like to be called. Your name will only be visible to others in spaces you joined."})]}),(0,h.jsxs)("form",{onSubmit:e=>{e.preventDefault(),"reg"==v?k({magic_token:S,name:N}):u({magic_token:S,extra_name:N,type:"magiclink"})},children:[(0,h.jsx)(c.Z,{className:"large",name:"username",value:N,required:!0,placeholder:"Type a name",onChange:e=>{const{value:n}=e.target;L(n)}}),(0,h.jsx)(l.Z,{type:"submit",disabled:_||!N||C,children:_?"Logining":"Continue"})]})]})}}}]);