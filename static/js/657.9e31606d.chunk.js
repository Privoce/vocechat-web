"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[657],{8657:(e,a,t)=>{t.r(a),t.d(a,{default:()=>c});var o=t(7313);const s=t(9184).ZP.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form {
    padding: 36px 40px 32px 40px;
    /* border: 1px solid #eee; */
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
    border-radius: 12px;
    .tips {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 24px;
      .logo {
        width: 56px;
        height: 56px;
        margin-bottom: 28px;
      }
      .title {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #101828;
        margin-bottom: 8px;
      }
    }
    .desc {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #667085;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      input {
        width: 360px;
        background: #ffffff;
        border: 1px solid #d0d5dd;
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;
        padding: 10px 14px;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #667085;
      }
    }
    .btn {
      display: inline-block;
      text-align: center;
      width: 100%;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
      padding: 10px;
      background: #1fe1f9;
      border: 1px solid #1fe1f9;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 8px;
      &.google {
        color: #344054;
        border-color: #d0d5dd;
        background: none;
      }
    }
  }
`;var r=t(7890),i=t(3657),n=t(2867),d=t(1864),l=t(3709),p=t(6417);function c(){const{token:e}=(0,l.v9)((e=>e.authData)),[a,t]=(0,o.useState)(""),[c,u]=(0,o.useState)(!0),[x,g]=(0,o.useState)(""),[f,h]=(0,o.useState)(!1),[m,{data:b,isLoading:w,isSuccess:v,isError:k,error:y}]=(0,d.l4)(),[j,{data:P,isLoading:S,isSuccess:_}]=(0,d.v5)();(0,o.useEffect)((()=>{const e=new URLSearchParams(location.search);g(e.get("token"))}),[]),(0,o.useEffect)((()=>{x&&j(x)}),[x]),(0,o.useEffect)((()=>{h(!!_&&P)}),[_,P]);const[E,Z]=(0,o.useState)({name:"",email:"",password:""}),C=e=>{const{type:a}=e.target.dataset,{value:t}=e.target;Z((e=>(e[a]=t,{...e})))};(0,o.useEffect)((()=>{c||i.ZP.error("two passwords not same")}),[c]),(0,o.useEffect)((()=>{if(v&&b)i.ZP.success("register success, login please"),setTimeout((()=>{location.href="/#/login"}),500);else if(k)switch(y.status){case 400:i.ZP.error("Register Failed: please check inputs");break;case 412:i.ZP.error("Register Failed: invalid token or expired");break;case 409:{var e;const a={email_conflict:"email conflict",name_conflict:"name conflict"};i.ZP.error(`Register Failed: ${a[null===(e=y.data)||void 0===e?void 0:e.reason]}`);break}default:i.ZP.error("Register Failed")}}),[b,v,k,y]);const{email:N,password:R,name:z}=E;return e?(0,p.jsx)(r.Fg,{replace:!0,to:"/"}):x?S?"checking token valid":f?(0,p.jsx)(s,{children:(0,p.jsxs)("div",{className:"form animate__animated animate__fadeInDown animate__faster",children:[(0,p.jsxs)("div",{className:"tips",children:[(0,p.jsx)("img",{src:`${n.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,p.jsx)("h2",{className:"title",children:"Sign Up to Rustchat"}),(0,p.jsx)("span",{className:"desc",children:"Please enter your details."})]}),(0,p.jsxs)("form",{onSubmit:e=>{e.preventDefault(),c?m({...E,magic_token:x,gender:1}):i.ZP.error("two passwords not same")},children:[(0,p.jsx)("input",{name:"name",value:z,required:!0,placeholder:"Enter your name","data-type":"name",onChange:C}),(0,p.jsx)("input",{name:"email",value:N,required:!0,placeholder:"Enter your email","data-type":"email",onChange:C}),(0,p.jsx)("input",{type:"password",value:R,name:"password",required:!0,"data-type":"password",onChange:C,placeholder:"Enter your password"}),(0,p.jsx)("input",{type:"password",value:a,name:"password",required:!0,"data-type":"password",onBlur:()=>{a&&u(a==E.password)},onChange:e=>{const{value:a}=e.target;t(a)},placeholder:"Enter your password again"}),(0,p.jsx)("button",{disabled:w||v,className:"btn",type:"submit",children:"Sign Up"})]})]})}):"invite token expires or invalid":"token not found"}}}]);