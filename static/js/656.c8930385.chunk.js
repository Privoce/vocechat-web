"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[656],{17237:(e,a,s)=>{s.d(a,{Z:()=>c});var t=s(70537),n=s(40182),r=s(57889),o=s(80683);const i=r.ZP.div`
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
`,l=r.ZP.input`
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
`,c=e=>{let{type:a="text",prefix:s="",className:r,...c}=e;const[d,x]=(0,t.useState)(a);return"password"==a?(0,o.jsxs)(i,{className:r,children:[(0,o.jsx)(l,{type:d,autoComplete:"password"==d?"current-password":"on",className:`inner ${r}`,...c}),(0,o.jsx)("div",{className:"view",onClick:()=>{x((e=>"password"==e?"text":"password"))},children:"password"==d?(0,o.jsx)(n.MBb,{color:"#78787c"}):(0,o.jsx)(n.Rbo,{color:"#78787c"})})]}):s?(0,o.jsxs)(i,{className:r,children:[(0,o.jsx)("span",{className:"prefix",children:s}),(0,o.jsx)(l,{className:`inner ${r}`,type:d,...c})]}):(0,o.jsx)(l,{type:d,className:r,...c})}},99656:(e,a,s)=>{s.r(a),s.d(a,{default:()=>g});var t=s(70537),n=s(3074),r=s(15924),o=s(27418),i=s(21645),l=s(17237),c=s(69885),d=s(15312),x=s(80683);function p(){return(0,x.jsxs)("div",{className:"flex flex-col items-center",children:[(0,x.jsx)("div",{className:"font-bold text-3xl text-gray-800 dark:text-white mt-3",children:"Magic link expired"}),(0,x.jsx)("p",{className:"text-center text-gray-400 mb-6",children:"Go back to your original VoceChat tab and request a new magic link."}),(0,x.jsx)("p",{className:"text-center text-gray-400",children:"You can close this window now."})]})}var h=s(14566);const g=()=>{const{t:e}=(0,h.$G)(),[a,{data:s,isLoading:g}]=(0,d.v5)(),[f,{isLoading:u,error:m,isSuccess:b,data:w}]=(0,d.YA)(),[k,{isLoading:j,isSuccess:v,data:y,error:N}]=(0,d.l4)(),{from:C="reg"}=(0,r.UO)(),Z=(0,n.I0)(),[S,L]=(0,t.useState)(""),P=new URLSearchParams(location.search).get("magic_token");(0,t.useEffect)((()=>{P&&a(P)}),[P]),(0,t.useEffect)((()=>{if(m&&"status"in m&&401===m.status)o.ZP.error("Invalided Token")}),[m]),(0,t.useEffect)((()=>{if(N&&"status"in N&&409===N.status)o.ZP.error("Something Conflicted!")}),[N]),(0,t.useEffect)((()=>{const a=w||y;(b||v)&&a&&(o.ZP.success(e("tip.login")),Z((0,i.A3)(a)),location.href="/#/")}),[b,v,w,y]);if(!P)return(0,x.jsx)(x.Fragment,{children:'"No Token"'});if(g)return(0,x.jsx)(x.Fragment,{children:'"Checking Magic Link..."'});if(!s)return(0,x.jsx)(p,{});const _=u||j,E=b||v;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"flex-center flex-col pb-6",children:[(0,x.jsx)("h2",{className:"font-semibold text-2xl text-gray-800 dark:text-white mb-2",children:"What\u2019s your name"}),(0,x.jsx)("span",{className:"text-gray-400 dark:text-gray-100",children:"Enter a name or handle so people know how you\u2019d like to be called. Your name will only be visible to others in spaces you joined."})]}),(0,x.jsxs)("form",{className:"flex flex-col gap-5 min-w-[360px]",onSubmit:e=>{e.preventDefault(),"reg"==C?k({magic_token:P,name:S}):f({magic_token:P,extra_name:S,type:"magiclink"})},children:[(0,x.jsx)(l.Z,{className:"large",name:"username",value:S,required:!0,placeholder:"Type a name",onChange:e=>{L(e.target.value)}}),(0,x.jsx)(c.Z,{type:"submit",disabled:_||!S||E,children:_?"Logging in":"Continue"})]})]})}}}]);