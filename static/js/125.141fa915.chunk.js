"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[125],{1125:(e,n,i)=>{i.r(n),i.d(n,{default:()=>f});var s=i(7313),t=i(3709),a=i(7890),o=i(1690),r=i(3067),c=i(1296),l=i(1864),d=i(3657),u=i(9184),h=i(6417);const g=u.ZP.div`
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
`;function m(){return(0,h.jsxs)(g,{children:[(0,h.jsx)("div",{className:"title",children:"Magic link expired"}),(0,h.jsx)("p",{className:"desc",children:"Go back to your original Rustchat tab and request a new magic link."}),(0,h.jsx)("p",{className:"desc",children:"You can close this window now."})]})}function f(){const[e,{data:n,isLoading:i}]=(0,l.v5)(),[u,{isLoading:g,error:f,isSuccess:p,data:x}]=(0,l.YA)(),[k,{isLoading:b,isSuccess:v,data:w}]=(0,l.l4)(),{from:j="reg"}=(0,a.UO)(),y=(0,t.I0)(),[N,E]=(0,s.useState)(""),L=new URLSearchParams(location.search).get("magic_token");(0,s.useEffect)((()=>{L&&e(L)}),[L]),(0,s.useEffect)((()=>{if(401===(null===f||void 0===f?void 0:f.status))d.ZP.error("Invalided Token")}),[f]),(0,s.useEffect)((()=>{var e;if(409===(null===(e=regError)||void 0===e?void 0:e.status))d.ZP.error("Something Conflicted!")}),[regError]),(0,s.useEffect)((()=>{const e=x||w;(p||v)&&e&&(d.ZP.success("Login Successfully"),y((0,o.A3)(e)),location.href="/#/")}),[p,v,x,w]);if(!L)return"No Token";if(i)return"Checking Magic Link...";if(!n)return(0,h.jsx)(m,{});const S=g||b,C=p||v;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"tips",children:[(0,h.jsx)("h2",{className:"title",children:"What\u2019s your name"}),(0,h.jsx)("span",{className:"desc",children:"Enter a name or handle so people know how you\u2019d like to be called. Your name will only be visible to others in spaces you joined."})]}),(0,h.jsxs)("form",{onSubmit:e=>{e.preventDefault(),"reg"==j?k({magic_token:L,name:N}):u({magic_token:L,extra_name:N,type:"magiclink"})},children:[(0,h.jsx)(r.Z,{className:"large",name:"username",value:N,required:!0,placeholder:"Type a name",onChange:e=>{const{value:n}=e.target;E(n)}}),(0,h.jsx)(c.Z,{type:"submit",disabled:S||!N||C,children:S?"Logining":"Continue"})]})]})}}}]);