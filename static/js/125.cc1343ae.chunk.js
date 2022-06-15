"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[125],{1125:(e,n,s)=>{s.r(n),s.d(n,{default:()=>p});var i=s(7313),t=s(3709),a=s(7890),l=s(1690),o=s(3067),c=s(1296),r=s(1864),d=s(3657),u=s(9184),h=s(6417);const m=u.ZP.div`
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
`;function g(){return(0,h.jsxs)(m,{children:[(0,h.jsx)("div",{className:"title",children:"Magic link expired"}),(0,h.jsx)("p",{className:"desc",children:"Go back to your original Rustchat tab and request a new magic link."}),(0,h.jsx)("p",{className:"desc",children:"You can close this window now."})]})}function p(){const{token:e}=(0,a.UO)(),[n,{data:s,isLoading:u}]=(0,r.Mn)(),[m,{isLoading:p,error:x,isSuccess:f,data:b}]=(0,r.YA)(),k=(0,t.I0)(),[j,w]=(0,i.useState)("");(0,i.useEffect)((()=>{e&&n(e)}),[e]),(0,i.useEffect)((()=>{if(401===(null===x||void 0===x?void 0:x.status))d.ZP.error("Invalided Token")}),[x]),(0,i.useEffect)((()=>{f&&b&&(d.ZP.success("Login Successfully"),k((0,l.A3)(b)),location.href="/#/")}),[f,b]);return e?u?"checking Magic Link...":s?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"tips",children:[(0,h.jsx)("h2",{className:"title",children:"What\u2019s your name"}),(0,h.jsx)("span",{className:"desc",children:"Enter a name or handle so people know how you\u2019d like to be called. Your name will only be visible to others in spaces you joined."})]}),(0,h.jsxs)("form",{onSubmit:n=>{n.preventDefault(),m({token:e,username:j,type:"magiclink"})},children:[(0,h.jsx)(o.Z,{className:"large",name:"username",value:j,required:!0,placeholder:"Type a name",onChange:e=>{const{value:n}=e.target;w(n)}}),(0,h.jsx)(c.Z,{type:"submit",disabled:p||!j||f,children:p?"Logining":"Continue"})]})]}):(0,h.jsx)(g,{}):"no token"}}}]);