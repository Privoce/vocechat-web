"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[285],{1285:(e,t,s)=>{s.r(t),s.d(t,{default:()=>u});var a=s(7313),n=s(7890),i=s(3067),o=s(1296),l=s(1864),c=s(9184),r=s(6417);const d=c.ZP.div`
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
`;function m(){return(0,r.jsxs)(d,{children:[(0,r.jsx)("div",{className:"title",children:"Magic link Sent"}),(0,r.jsx)("p",{className:"desc",children:"Login to your email client, and continue next step"}),(0,r.jsx)("p",{className:"desc",children:"You can close this window now."})]})}function u(){const[e,{isLoading:t,data:s,isSuccess:c}]=(0,l.uk)(),d=(0,n.s0)(),[u,p]=(0,a.useState)(""),[g,h]=(0,a.useState)({email:"",password:"",confirmPassword:""});(0,a.useEffect)((()=>{const e=new URLSearchParams(location.search).get("magic_token");e&&p(e)}),[]),(0,a.useEffect)((()=>{if(c&&s){const{new_magic_token:e,mail_is_sent:t}=s;!t&&e&&d(`?magic_token=${e}#/register/set_name`)}}),[c,s]);const w=e=>{const{type:t}=e.target.dataset,{value:s}=e.target;h((e=>(e[t]=s,{...e})))},{email:x,password:f}=g;return null!==s&&void 0!==s&&s.mail_is_sent?(0,r.jsx)(m,{}):(0,r.jsxs)("form",{onSubmit:t=>{t.preventDefault();const{email:s,password:a}=g;e({magic_token:u,email:s,password:a})},children:[(0,r.jsx)(i.Z,{className:"large",name:"email",value:x,required:!0,placeholder:"Enter your email","data-type":"email",onChange:w}),(0,r.jsx)(i.Z,{className:"large",type:"password",value:f,name:"password",required:!0,"data-type":"password",onChange:w,placeholder:"Enter your password"}),(0,r.jsx)(o.Z,{type:"submit",disabled:t,children:t?"Signing Up":"Sign Up"})]})}}}]);