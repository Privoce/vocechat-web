"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[125],{1125:(e,n,s)=>{s.r(n),s.d(n,{default:()=>g});var a=s(7313),i=s(3709),t=s(1690),o=s(3067),c=s(1296),l=s(1864),r=s(3657),d=s(9184),u=s(6417);const h=d.ZP.div`
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
`;function m(){return(0,u.jsxs)(h,{children:[(0,u.jsx)("div",{className:"title",children:"Magic link expired"}),(0,u.jsx)("p",{className:"desc",children:"Go back to your original Rustchat tab and request a new magic link."}),(0,u.jsx)("p",{className:"desc",children:"You can close this window now."})]})}function g(){const[e,{data:n,isLoading:s}]=(0,l.v5)(),[d,{isLoading:h,error:g,isSuccess:p,data:x}]=(0,l.YA)(),f=(0,i.I0)(),[b,k]=(0,a.useState)(""),w=new URLSearchParams(location.search).get("magic_token");(0,a.useEffect)((()=>{w&&e(w)}),[w]),(0,a.useEffect)((()=>{if(401===(null===g||void 0===g?void 0:g.status))r.ZP.error("Invalided Token")}),[g]),(0,a.useEffect)((()=>{p&&x&&(r.ZP.success("Login Successfully"),f((0,t.A3)(x)),location.href="/#/")}),[p,x]);return w?s?"Checking Magic Link...":n?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"tips",children:[(0,u.jsx)("h2",{className:"title",children:"What\u2019s your name"}),(0,u.jsx)("span",{className:"desc",children:"Enter a name or handle so people know how you\u2019d like to be called. Your name will only be visible to others in spaces you joined."})]}),(0,u.jsxs)("form",{onSubmit:e=>{e.preventDefault(),d({magic_token:w,extra_name:b,type:"magiclink"})},children:[(0,u.jsx)(o.Z,{className:"large",name:"username",value:b,required:!0,placeholder:"Type a name",onChange:e=>{const{value:n}=e.target;k(n)}}),(0,u.jsx)(c.Z,{type:"submit",disabled:h||!b||p,children:h?"Logining":"Continue"})]})]}):(0,u.jsx)(m,{}):"No Token"}}}]);