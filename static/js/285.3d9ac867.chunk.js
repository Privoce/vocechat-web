"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[285],{1285:(e,s,a)=>{a.r(s),a.d(s,{default:()=>u});var t=a(7313),n=a(7890),o=a(3067),i=a(1296),r=a(1864),l=a(9184),c=a(6417);const d=l.ZP.div`
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
`;function m(){return(0,c.jsxs)(d,{children:[(0,c.jsx)("div",{className:"title",children:"Magic link Sent"}),(0,c.jsx)("p",{className:"desc",children:"Login to your email client, and continue next step"}),(0,c.jsx)("p",{className:"desc",children:"You can close this window now."})]})}var p=a(3657);function u(){const[e,{isLoading:s,data:a,isSuccess:l}]=(0,r.uk)(),d=(0,n.s0)(),[u,g]=(0,t.useState)(""),[h,w]=(0,t.useState)({email:"",password:"",confirmPassword:""});(0,t.useEffect)((()=>{const e=new URLSearchParams(location.search).get("magic_token");e&&g(e)}),[]),(0,t.useEffect)((()=>{if(l&&a){const{new_magic_token:e,mail_is_sent:s}=a;!s&&e&&d(`?magic_token=${e}#/register/set_name`)}}),[l,a]);const f=e=>{const{type:s}=e.target.dataset,{value:a}=e.target;w((e=>(e[s]=a,{...e})))},{email:x,password:_,confirmPassword:b}=h;return null!==a&&void 0!==a&&a.mail_is_sent?(0,c.jsx)(m,{}):(0,c.jsxs)("form",{onSubmit:s=>{s.preventDefault();const{email:a,password:t}=h;e({magic_token:u,email:a,password:t})},children:[(0,c.jsx)(o.Z,{className:"large",name:"email",value:x,required:!0,placeholder:"Enter email","data-type":"email",onChange:f}),(0,c.jsx)(o.Z,{className:"large",type:"password",value:_,name:"password",required:!0,"data-type":"password",onChange:f,placeholder:"Enter password"}),(0,c.jsx)(o.Z,{onBlur:()=>{const{password:e,confirmPassword:s}=h;e!==s&&p.ZP.error("Not Same Password!")},type:"password",name:"confirmPassword",value:b,"data-type":"confirmPassword",onChange:f,placeholder:"Confirm Password"}),(0,c.jsx)(i.Z,{type:"submit",disabled:s,children:s?"Signing Up":"Sign Up"})]})}}}]);