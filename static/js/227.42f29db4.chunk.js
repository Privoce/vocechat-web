"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[227],{17237:(e,a,s)=>{s.d(a,{Z:()=>d});var r=s(70537),o=s(40182),t=s(57889),n=s(80683);const i=t.ZP.div`
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
`,l=t.ZP.input`
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
`,d=e=>{let{type:a="text",prefix:s="",className:t,...d}=e;const[c,p]=(0,r.useState)(a);return"password"==a?(0,n.jsxs)(i,{className:t,children:[(0,n.jsx)(l,{type:c,autoComplete:"password"==c?"current-password":"on",className:`inner ${t}`,...d}),(0,n.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==c?(0,n.jsx)(o.MBb,{color:"#78787c"}):(0,n.jsx)(o.Rbo,{color:"#78787c"})})]}):s?(0,n.jsxs)(i,{className:t,children:[(0,n.jsx)("span",{className:"prefix",children:s}),(0,n.jsx)(l,{className:`inner ${t}`,type:c,...d})]}):(0,n.jsx)(l,{type:c,className:t,...d})}},18227:(e,a,s)=>{s.r(a),s.d(a,{default:()=>x});var r=s(70537),o=s(15924),t=s(27418),n=s(80308),i=s(15312),l=s(66160),d=s(69885),c=s(17237),p=s(80683);const x=()=>{const{token:e}=(0,l.CG)((e=>e.authData)),[a,s]=(0,r.useState)(""),[x,u]=(0,r.useState)(!0),[g,h]=(0,r.useState)(""),[m,f]=(0,r.useState)(!1),[w,{data:b,isLoading:v,isSuccess:j,isError:k,error:y}]=(0,i.l4)(),[N,{data:Z,isLoading:P,isSuccess:S}]=(0,i.v5)();(0,r.useEffect)((()=>{const e=new URLSearchParams(location.search);h(e.get("token"))}),[]),(0,r.useEffect)((()=>{g&&N(g)}),[g]),(0,r.useEffect)((()=>{f(!!S&&!!Z)}),[S,Z]);const[C,E]=(0,r.useState)({name:"",email:"",password:""}),F=e=>{const{type:a}=e.target.dataset,{value:s}=e.target;E((e=>(e[a]=s,{...e})))};(0,r.useEffect)((()=>{x||t.ZP.error("two passwords not same")}),[x]),(0,r.useEffect)((()=>{if(j&&b)t.ZP.success("register success, login please"),setTimeout((()=>{location.href="/#/login"}),500);else if(k&&y&&"data"in y)switch(y.status){case 400:t.ZP.error("Register Failed: please check inputs");break;case 412:t.ZP.error("Register Failed: invalid token or expired");break;case 409:var e;t.ZP.error(`Register Failed: ${null===(e=y.data)||void 0===e?void 0:e.reason}`);break;default:t.ZP.error("Register Failed")}}),[b,j,k,y]);const{email:R,password:q,name:z}=C;return e?(0,p.jsx)(o.Fg,{replace:!0,to:"/"}):g?P?(0,p.jsx)(p.Fragment,{children:"checking token valid"}):m?(0,p.jsx)("div",{className:"flex-center h-screen dark:bg-[#384250]",children:(0,p.jsxs)("div",{className:"py-8 px-10 shadow-md rounded-xl",children:[(0,p.jsxs)("div",{className:"flex-center flex-col pb-6",children:[(0,p.jsx)("img",{src:`${n.ZP}/resource/organization/logo`,alt:"logo",className:"w-14 h-14 mb-7 rounded-full"}),(0,p.jsx)("h2",{className:"font-semibold text-2xl text-gray-800 dark:text-white mb-2",children:"Sign Up to VoceChat"}),(0,p.jsx)("span",{className:"text-gray-400 dark:text-gray-100",children:"Please enter your details."})]}),(0,p.jsxs)("form",{className:"flex flex-col gap-5 min-w-[360px]",onSubmit:e=>{e.preventDefault(),x?w({...C,magic_token:g,gender:1}):t.ZP.error("two passwords not same")},children:[(0,p.jsx)(c.Z,{className:"large",name:"name",value:z,required:!0,placeholder:"Enter your name","data-type":"name",onChange:F}),(0,p.jsx)(c.Z,{className:"large",name:"email",value:R,required:!0,placeholder:"Enter your email","data-type":"email",onChange:F}),(0,p.jsx)(c.Z,{className:"large",type:"password",value:q,name:"password",required:!0,"data-type":"password",onChange:F,placeholder:"Enter your password"}),(0,p.jsx)(c.Z,{className:"large",type:"password",value:a,name:"password",required:!0,"data-type":"password",onBlur:()=>{a&&u(a==C.password)},onChange:e=>{const{value:a}=e.target;s(a)},placeholder:"Enter your password again"}),(0,p.jsx)(d.Z,{disabled:v||j,className:"flex justify-center",type:"submit",children:"Sign Up"})]})]})}):(0,p.jsx)(p.Fragment,{children:"invite token expires or invalid"}):(0,p.jsx)(p.Fragment,{children:"token not found"})}}}]);