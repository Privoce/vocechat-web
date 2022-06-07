"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[125],{8648:(e,s,n)=>{n.d(s,{Z:()=>c});var o=n(7313),i=n(4901),a=n(9184),t=n(6417);const r=a.ZP.div`
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
`,l=a.ZP.input`
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
`;function c(e){let{type:s="text",prefix:n="",className:a,...c}=e;const[d,p]=(0,o.useState)(s);return"password"==s?(0,t.jsxs)(r,{className:a,children:[(0,t.jsx)(l,{type:d,className:`inner ${a}`,...c}),(0,t.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==d?(0,t.jsx)(i.MBb,{color:"#78787c"}):(0,t.jsx)(i.Rbo,{color:"#78787c"})})]}):n?(0,t.jsxs)(r,{className:a,children:[(0,t.jsx)("span",{className:"prefix",children:n}),(0,t.jsx)(l,{className:`inner ${a}`,type:d,...c})]}):(0,t.jsx)(l,{type:d,className:a,...c})}},1125:(e,s,n)=>{n.r(s),n.d(s,{default:()=>f});var o=n(7313),i=n(3709),a=n(7890),t=n(1690),r=n(8648),l=n(1296),c=n(1864),d=n(3657),p=n(9184),x=n(6417);const h=p.ZP.div`
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
`;function u(){return(0,x.jsxs)(h,{children:[(0,x.jsx)("div",{className:"title",children:"Magic link expired"}),(0,x.jsx)("p",{className:"desc",children:"Go back to your original Rustchat tab and request a new magic link."}),(0,x.jsx)("p",{className:"desc",children:"You can close this window now."})]})}function f(){const{token:e}=(0,a.UO)(),[s,{data:n,isLoading:p}]=(0,c.Mn)(),[h,{isLoading:f,error:g,isSuccess:b,data:m}]=(0,c.YA)(),w=(0,i.I0)(),[j,k]=(0,o.useState)("");(0,o.useEffect)((()=>{e&&s(e)}),[e]),(0,o.useEffect)((()=>{if(401===(null===g||void 0===g?void 0:g.status))d.ZP.error("Invalided Token")}),[g]),(0,o.useEffect)((()=>{b&&m&&(d.ZP.success("Login Successfully"),w((0,t.A3)(m)),location.href="/#/")}),[b,m]);return e?p?"checking Magic Link...":n?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"tips",children:[(0,x.jsx)("h2",{className:"title",children:"What\u2019s your name"}),(0,x.jsx)("span",{className:"desc",children:"Enter a name or handle so people know how you\u2019d like to be called. Your name will only be visible to others in spaces you joined."})]}),(0,x.jsxs)("form",{onSubmit:s=>{s.preventDefault(),h({token:e,username:j,type:"magiclink"})},children:[(0,x.jsx)(r.Z,{className:"large",name:"username",value:j,required:!0,placeholder:"Type a name",onChange:e=>{const{value:s}=e.target;k(s)}}),(0,x.jsx)(l.Z,{type:"submit",disabled:f||!j||b,children:f?"Logining":"Continue"})]})]}):(0,x.jsx)(u,{}):"no token"}}}]);