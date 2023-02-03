"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[656],{17237:(e,s,a)=>{a.d(s,{Z:()=>l});var n=a(70537),o=a(40182),r=a(57889),t=a(80683);const i=r.ZP.div`
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
`,c=r.ZP.input`
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
`,l=e=>{let{type:s="text",prefix:a="",className:r,...l}=e;const[d,p]=(0,n.useState)(s);return"password"==s?(0,t.jsxs)(i,{className:r,children:[(0,t.jsx)(c,{type:d,autoComplete:"password"==d?"current-password":"on",className:`inner ${r}`,...l}),(0,t.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==d?(0,t.jsx)(o.MBb,{color:"#78787c"}):(0,t.jsx)(o.Rbo,{color:"#78787c"})})]}):a?(0,t.jsxs)(i,{className:r,children:[(0,t.jsx)("span",{className:"prefix",children:a}),(0,t.jsx)(c,{className:`inner ${r}`,type:d,...l})]}):(0,t.jsx)(c,{type:d,className:r,...l})}},99656:(e,s,a)=>{a.r(s),a.d(s,{default:()=>u});var n=a(70537),o=a(3074),r=a(15924),t=a(27418),i=a(21645),c=a(17237),l=a(69885),d=a(15312),p=a(80683);function x(){return(0,p.jsxs)("div",{className:"flex flex-col items-center",children:[(0,p.jsx)("div",{className:"font-bold text-3xl text-gray-800 mt-3",children:"Magic link expired"}),(0,p.jsx)("p",{className:"text-center text-gray-400 mb-6",children:"Go back to your original VoceChat tab and request a new magic link."}),(0,p.jsx)("p",{className:"text-center text-gray-400",children:"You can close this window now."})]})}var h=a(14566);const u=()=>{const{t:e}=(0,h.$G)(),[s,{data:a,isLoading:u}]=(0,d.v5)(),[g,{isLoading:f,error:m,isSuccess:b,data:w}]=(0,d.YA)(),[j,{isLoading:k,isSuccess:v,data:y,error:N}]=(0,d.l4)(),{from:C="reg"}=(0,r.UO)(),Z=(0,o.I0)(),[S,L]=(0,n.useState)(""),P=new URLSearchParams(location.search).get("magic_token");(0,n.useEffect)((()=>{P&&s(P)}),[P]),(0,n.useEffect)((()=>{if(m&&"status"in m&&401===m.status)t.ZP.error("Invalided Token")}),[m]),(0,n.useEffect)((()=>{if(N&&"status"in N&&409===N.status)t.ZP.error("Something Conflicted!")}),[N]),(0,n.useEffect)((()=>{const s=w||y;(b||v)&&s&&(t.ZP.success(e("tip.login")),Z((0,i.A3)(s)),location.href="/#/")}),[b,v,w,y]);if(!P)return(0,p.jsx)(p.Fragment,{children:'"No Token"'});if(u)return(0,p.jsx)(p.Fragment,{children:'"Checking Magic Link..."'});if(!a)return(0,p.jsx)(x,{});const _=f||k,E=b||v;return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{className:"tips",children:[(0,p.jsx)("h2",{className:"title",children:"What\u2019s your name"}),(0,p.jsx)("span",{className:"desc",children:"Enter a name or handle so people know how you\u2019d like to be called. Your name will only be visible to others in spaces you joined."})]}),(0,p.jsxs)("form",{onSubmit:e=>{e.preventDefault(),"reg"==C?j({magic_token:P,name:S}):g({magic_token:P,extra_name:S,type:"magiclink"})},children:[(0,p.jsx)(c.Z,{className:"large",name:"username",value:S,required:!0,placeholder:"Type a name",onChange:e=>{L(e.target.value)}}),(0,p.jsx)(l.Z,{type:"submit",disabled:_||!S||E,children:_?"Logging in":"Continue"})]})]})}}}]);