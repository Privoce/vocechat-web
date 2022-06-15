"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[657],{8657:(e,a,t)=>{t.r(a),t.d(a,{default:()=>u});var o=t(7313);const s=t(9184).ZP.div`
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
`;var r=t(7890),i=t(3657),n=t(2867),d=t(6432),l=t(1864),p=t(3709),c=t(6417);function u(){const{token:e}=(0,p.v9)((e=>e.authData)),[a,t]=(0,o.useState)(""),[u,x]=(0,o.useState)(!0),[g,f]=(0,o.useState)(""),[h,m]=(0,o.useState)(!1),[b,{data:w,isLoading:v,isSuccess:k,isError:y,error:j}]=(0,d.l4)(),[P,{data:S,isLoading:_,isSuccess:E}]=(0,l.Mn)();(0,o.useEffect)((()=>{const e=new URLSearchParams(location.search);f(e.get("token"))}),[]),(0,o.useEffect)((()=>{g&&P(g)}),[g]),(0,o.useEffect)((()=>{m(!!E&&S)}),[E,S]);const[Z,C]=(0,o.useState)({name:"",email:"",password:""}),N=e=>{const{type:a}=e.target.dataset,{value:t}=e.target;C((e=>(e[a]=t,{...e})))};(0,o.useEffect)((()=>{u||i.ZP.error("two passwords not same")}),[u]),(0,o.useEffect)((()=>{if(k&&w)i.ZP.success("register success, login please"),setTimeout((()=>{location.href="/#/login"}),500);else if(y)switch(j.status){case 400:i.ZP.error("Register Failed: please check inputs");break;case 412:i.ZP.error("Register Failed: invalid token or expired");break;case 409:{var e;const a={email_conflict:"email conflict",name_conflict:"name conflict"};i.ZP.error(`Register Failed: ${a[null===(e=j.data)||void 0===e?void 0:e.reason]}`);break}default:i.ZP.error("Register Failed")}}),[w,k,y,j]);const{email:R,password:z,name:F}=Z;return e?(0,c.jsx)(r.Fg,{replace:!0,to:"/"}):g?_?"checking token valid":h?(0,c.jsx)(s,{children:(0,c.jsxs)("div",{className:"form animate__animated animate__fadeInDown animate__faster",children:[(0,c.jsxs)("div",{className:"tips",children:[(0,c.jsx)("img",{src:`${n.ZP}/resource/organization/logo`,alt:"logo",className:"logo"}),(0,c.jsx)("h2",{className:"title",children:"Sign Up to Rustchat"}),(0,c.jsx)("span",{className:"desc",children:"Please enter your details."})]}),(0,c.jsxs)("form",{onSubmit:e=>{e.preventDefault(),u?b({...Z,magic_token:g,gender:1}):i.ZP.error("two passwords not same")},children:[(0,c.jsx)("input",{name:"name",value:F,required:!0,placeholder:"Enter your name","data-type":"name",onChange:N}),(0,c.jsx)("input",{name:"email",value:R,required:!0,placeholder:"Enter your email","data-type":"email",onChange:N}),(0,c.jsx)("input",{type:"password",value:z,name:"password",required:!0,"data-type":"password",onChange:N,placeholder:"Enter your password"}),(0,c.jsx)("input",{type:"password",value:a,name:"password",required:!0,"data-type":"password",onBlur:()=>{a&&x(a==Z.password)},onChange:e=>{const{value:a}=e.target;t(a)},placeholder:"Enter your password again"}),(0,c.jsx)("button",{disabled:v||k,className:"btn",type:"submit",children:"Sign Up"})]})]})}):"invite token expires or invalid":"token not found"}}}]);