"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[728],{4303:(e,a,t)=>{t.r(a),t.d(a,{default:()=>c});var o=t(7313);const r=t(9184).ZP.div`
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
`;var s=t(7890),n=t(6059),i=t(7935),d=t(2509),l=t(4025),p=t(6417);const c=()=>{const{token:e}=(0,l.CG)((e=>e.authData)),[a,t]=(0,o.useState)(""),[c,x]=(0,o.useState)(!0),[g,u]=(0,o.useState)(""),[f,h]=(0,o.useState)(!1),[m,{data:b,isLoading:w,isSuccess:v,isError:k,error:y}]=(0,d.l4)(),[j,{data:P,isLoading:S,isSuccess:_}]=(0,d.v5)();(0,o.useEffect)((()=>{const e=new URLSearchParams(location.search);u(e.get("token"))}),[]),(0,o.useEffect)((()=>{g&&j(g)}),[g]),(0,o.useEffect)((()=>{h(!!_&&!!P)}),[_,P]);const[E,Z]=(0,o.useState)({name:"",email:"",password:""}),C=e=>{const{type:a}=e.target.dataset,{value:t}=e.target;Z((e=>(e[a]=t,{...e})))};(0,o.useEffect)((()=>{c||n.ZP.error("two passwords not same")}),[c]),(0,o.useEffect)((()=>{if(v&&b)n.ZP.success("register success, login please"),setTimeout((()=>{location.href="/#/login"}),500);else if(k&&y&&"data"in y)switch(y.status){case 400:n.ZP.error("Register Failed: please check inputs");break;case 412:n.ZP.error("Register Failed: invalid token or expired");break;case 409:{var e;const a={email_conflict:"email conflict",name_conflict:"name conflict"};n.ZP.error(`Register Failed: ${a[null===(e=y.data)||void 0===e?void 0:e.reason]}`);break}default:n.ZP.error("Register Failed")}}),[b,v,k,y]);const{email:F,password:N,name:z}=E;return e?(0,p.jsx)(s.Fg,{replace:!0,to:"/"}):g?S?(0,p.jsx)(p.Fragment,{children:"checking token valid"}):f?(0,p.jsx)(r,{children:(0,p.jsxs)("div",{className:"form animate__animated animate__fadeInDown animate__faster",children:[(0,p.jsxs)("div",{className:"tips",children:[(0,p.jsx)("img",{src:`${i.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,p.jsx)("h2",{className:"title",children:"Sign Up to VoceChat"}),(0,p.jsx)("span",{className:"desc",children:"Please enter your details."})]}),(0,p.jsxs)("form",{onSubmit:e=>{e.preventDefault(),c?m({...E,magic_token:g,gender:1}):n.ZP.error("two passwords not same")},children:[(0,p.jsx)("input",{name:"name",value:z,required:!0,placeholder:"Enter your name","data-type":"name",onChange:C}),(0,p.jsx)("input",{name:"email",value:F,required:!0,placeholder:"Enter your email","data-type":"email",onChange:C}),(0,p.jsx)("input",{type:"password",value:N,name:"password",required:!0,"data-type":"password",onChange:C,placeholder:"Enter your password"}),(0,p.jsx)("input",{type:"password",value:a,name:"password",required:!0,"data-type":"password",onBlur:()=>{a&&x(a==E.password)},onChange:e=>{const{value:a}=e.target;t(a)},placeholder:"Enter your password again"}),(0,p.jsx)("button",{disabled:w||v,className:"btn",type:"submit",children:"Sign Up"})]})]})}):(0,p.jsx)(p.Fragment,{children:"invite token expires or invalid"}):(0,p.jsx)(p.Fragment,{children:"token not found"})}}}]);