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
`,l=e=>{let{type:s="text",prefix:a="",className:r,...l}=e;const[d,x]=(0,n.useState)(s);return"password"==s?(0,t.jsxs)(i,{className:r,children:[(0,t.jsx)(c,{type:d,className:`inner ${r}`,...l}),(0,t.jsx)("div",{className:"view",onClick:()=>{x((e=>"password"==e?"text":"password"))},children:"password"==d?(0,t.jsx)(o.MBb,{color:"#78787c"}):(0,t.jsx)(o.Rbo,{color:"#78787c"})})]}):a?(0,t.jsxs)(i,{className:r,children:[(0,t.jsx)("span",{className:"prefix",children:a}),(0,t.jsx)(c,{className:`inner ${r}`,type:d,...l})]}):(0,t.jsx)(c,{type:d,className:r,...l})}},99656:(e,s,a)=>{a.r(s),a.d(s,{default:()=>h});var n=a(70537),o=a(3074),r=a(15924),t=a(27418),i=a(21645),c=a(17237),l=a(69885),d=a(15312),x=a(80683);function p(){return(0,x.jsxs)("div",{className:"flex flex-col items-center",children:[(0,x.jsx)("div",{className:"font-bold text-3xl text-gray-800 mt-3",children:"Magic link expired"}),(0,x.jsx)("p",{className:"text-center text-gray-400 mb-6",children:"Go back to your original VoceChat tab and request a new magic link."}),(0,x.jsx)("p",{className:"text-center text-gray-400",children:"You can close this window now."})]})}const h=()=>{const[e,{data:s,isLoading:a}]=(0,d.v5)(),[h,{isLoading:u,error:g,isSuccess:f,data:m}]=(0,d.YA)(),[b,{isLoading:w,isSuccess:j,data:k,error:v}]=(0,d.l4)(),{from:y="reg"}=(0,r.UO)(),N=(0,o.I0)(),[C,S]=(0,n.useState)(""),Z=new URLSearchParams(location.search).get("magic_token");(0,n.useEffect)((()=>{Z&&e(Z)}),[Z]),(0,n.useEffect)((()=>{if(g&&"status"in g&&401===g.status)t.ZP.error("Invalided Token")}),[g]),(0,n.useEffect)((()=>{if(v&&"status"in v&&409===v.status)t.ZP.error("Something Conflicted!")}),[v]),(0,n.useEffect)((()=>{const e=m||k;(f||j)&&e&&(t.ZP.success("Login Successfully"),N((0,i.A3)(e)),location.href="/#/")}),[f,j,m,k]);if(!Z)return(0,x.jsx)(x.Fragment,{children:'"No Token"'});if(a)return(0,x.jsx)(x.Fragment,{children:'"Checking Magic Link..."'});if(!s)return(0,x.jsx)(p,{});const L=u||w,P=f||j;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"tips",children:[(0,x.jsx)("h2",{className:"title",children:"What\u2019s your name"}),(0,x.jsx)("span",{className:"desc",children:"Enter a name or handle so people know how you\u2019d like to be called. Your name will only be visible to others in spaces you joined."})]}),(0,x.jsxs)("form",{onSubmit:e=>{e.preventDefault(),"reg"==y?b({magic_token:Z,name:C}):h({magic_token:Z,extra_name:C,type:"magiclink"})},children:[(0,x.jsx)(c.Z,{className:"large",name:"username",value:C,required:!0,placeholder:"Type a name",onChange:e=>{S(e.target.value)}}),(0,x.jsx)(l.Z,{type:"submit",disabled:L||!C||P,children:L?"Logging in":"Continue"})]})]})}}}]);