"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[300],{5300:(e,n,s)=>{s.r(n),s.d(n,{default:()=>f});var i=s(7313),t=s(3709),a=s(7890),c=s(6059),o=s(1057),r=s(4050),l=s(1140),d=s(2509),u=s(244),h=s(6417);const g=u.ZP.div`
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
`;function m(){return(0,h.jsxs)(g,{children:[(0,h.jsx)("div",{className:"title",children:"Magic link expired"}),(0,h.jsx)("p",{className:"desc",children:"Go back to your original VoceChat tab and request a new magic link."}),(0,h.jsx)("p",{className:"desc",children:"You can close this window now."})]})}const f=()=>{const[e,{data:n,isLoading:s}]=(0,d.v5)(),[u,{isLoading:g,error:f,isSuccess:x,data:p}]=(0,d.YA)(),[k,{isLoading:b,isSuccess:j,data:w,error:v}]=(0,d.l4)(),{from:y="reg"}=(0,a.UO)(),N=(0,t.I0)(),[C,L]=(0,i.useState)(""),S=new URLSearchParams(location.search).get("magic_token");(0,i.useEffect)((()=>{S&&e(S)}),[S]),(0,i.useEffect)((()=>{if(f&&"status"in f&&401===f.status)c.ZP.error("Invalided Token")}),[f]),(0,i.useEffect)((()=>{if(v&&"status"in v&&409===v.status)c.ZP.error("Something Conflicted!")}),[v]),(0,i.useEffect)((()=>{const e=p||w;(x||j)&&e&&(c.ZP.success("Login Successfully"),N((0,o.A3)(e)),location.href="/#/")}),[x,j,p,w]);if(!S)return(0,h.jsx)(h.Fragment,{children:'"No Token"'});if(s)return(0,h.jsx)(h.Fragment,{children:'"Checking Magic Link..."'});if(!n)return(0,h.jsx)(m,{});const Z=g||b,_=x||j;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"tips",children:[(0,h.jsx)("h2",{className:"title",children:"What\u2019s your name"}),(0,h.jsx)("span",{className:"desc",children:"Enter a name or handle so people know how you\u2019d like to be called. Your name will only be visible to others in spaces you joined."})]}),(0,h.jsxs)("form",{onSubmit:e=>{e.preventDefault(),"reg"==y?k({magic_token:S,name:C}):u({magic_token:S,extra_name:C,type:"magiclink"})},children:[(0,h.jsx)(r.Z,{className:"large",name:"username",value:C,required:!0,placeholder:"Type a name",onChange:e=>{L(e.target.value)}}),(0,h.jsx)(l.Z,{type:"submit",disabled:Z||!C||_,children:Z?"Logging in":"Continue"})]})]})}}}]);