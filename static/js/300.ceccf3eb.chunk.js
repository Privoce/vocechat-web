"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[300],{5300:(e,n,i)=>{i.r(n),i.d(n,{default:()=>f});var s=i(7313),t=i(3709),a=i(7890),o=i(1057),c=i(4050),r=i(1140),l=i(2509),d=i(3657),u=i(9184),h=i(6417);const g=u.ZP.div`
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
`;function m(){return(0,h.jsxs)(g,{children:[(0,h.jsx)("div",{className:"title",children:"Magic link expired"}),(0,h.jsx)("p",{className:"desc",children:"Go back to your original Rustchat tab and request a new magic link."}),(0,h.jsx)("p",{className:"desc",children:"You can close this window now."})]})}function f(){const[e,{data:n,isLoading:i}]=(0,l.v5)(),[u,{isLoading:g,error:f,isSuccess:p,data:x}]=(0,l.YA)(),[k,{isLoading:b,isSuccess:v,data:w,error:j}]=(0,l.l4)(),{from:y="reg"}=(0,a.UO)(),N=(0,t.I0)(),[L,S]=(0,s.useState)(""),C=new URLSearchParams(location.search).get("magic_token");(0,s.useEffect)((()=>{C&&e(C)}),[C]),(0,s.useEffect)((()=>{if(401===(null===f||void 0===f?void 0:f.status))d.ZP.error("Invalided Token")}),[f]),(0,s.useEffect)((()=>{if(409===(null===j||void 0===j?void 0:j.status))d.ZP.error("Something Conflicted!")}),[j]),(0,s.useEffect)((()=>{const e=x||w;(p||v)&&e&&(d.ZP.success("Login Successfully"),N((0,o.A3)(e)),location.href="/#/")}),[p,v,x,w]);if(!C)return"No Token";if(i)return"Checking Magic Link...";if(!n)return(0,h.jsx)(m,{});const Z=g||b,_=p||v;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"tips",children:[(0,h.jsx)("h2",{className:"title",children:"What\u2019s your name"}),(0,h.jsx)("span",{className:"desc",children:"Enter a name or handle so people know how you\u2019d like to be called. Your name will only be visible to others in spaces you joined."})]}),(0,h.jsxs)("form",{onSubmit:e=>{e.preventDefault(),"reg"==y?k({magic_token:C,name:L}):u({magic_token:C,extra_name:L,type:"magiclink"})},children:[(0,h.jsx)(c.Z,{className:"large",name:"username",value:L,required:!0,placeholder:"Type a name",onChange:e=>{const{value:n}=e.target;S(n)}}),(0,h.jsx)(r.Z,{type:"submit",disabled:Z||!L||_,children:Z?"Logining":"Continue"})]})]})}}}]);