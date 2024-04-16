"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[63],{6424:(e,a,t)=>{t.d(a,{A:()=>i});var s,n=t(92821);function r(){return r=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},r.apply(this,arguments)}const l=({title:e,titleId:a,...t},l)=>n.createElement("svg",r({width:16,height:16,viewBox:"0 0 16 16",stroke:"black",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:l,"aria-labelledby":a},t),e?n.createElement("title",{id:a},e):null,s||(s=n.createElement("path",{d:"M10 4L6 8L10 12",strokeOpacity:.8,strokeLinecap:"round",strokeLinejoin:"round"}))),i=(0,n.forwardRef)(l)},74083:(e,a,t)=>{t.d(a,{A:()=>n});var s=t(55473);const n=({children:e,className:a="",...t})=>(0,s.jsx)("label",{className:`text-gray-800 dark:text-gray-100 text-sm font-semibold ${a}`,...t,children:e})},38063:(e,a,t)=>{t.r(a),t.d(a,{default:()=>v});var s=t(92821),n=t(52314),r=t(73047),l=t(47090),i=t(61297),c=t(58708),o=t(83755),d=t(55586),m=t(55377),u=t(80709),g=t(74083),h=t(6424),p=t(39003),x=t(55473);function f({email:e}){const a=(0,p.Zp)();return(0,x.jsx)(m.A,{className:"w-full ghost",onClick:()=>{a(`/send_magic_link/${e}`)},children:"Sign in with a Magic Link"})}function w(){const{t:e}=(0,r.Bd)("auth"),a=(0,p.Zp)();return(0,x.jsxs)("div",{className:"flex gap-1 mt-7 text-sm text-slate-500 dark:text-gray-100 justify-center",children:[(0,x.jsx)("span",{children:e("login.no_account")}),(0,x.jsx)("a",{className:"text-primary-400 cursor-pointer",onClick:()=>{a("/register")},children:e("sign_up")})]})}var y=t(46151),j=t(13673);const b={email:"",password:""};function v(){const{name:e,logo:a}=(0,o.GV)((e=>e.server),j.bN),{t:t}=(0,r.Bd)("auth"),{t:p}=(0,r.Bd)(),{data:v,isLoading:k}=(0,c.Q0)(),[N,{isSuccess:_,isLoading:A,error:E}]=(0,i._L)(),{data:S,isSuccess:L}=(0,c.T7)(),[O,C]=(0,s.useState)(!1),[R,P]=(0,s.useState)(b);(0,s.useEffect)((()=>{const e=new URLSearchParams(location.search),a=e.get("code"),t=e.get("state"),s=e.get("magic_token"),n=e.get("exists");if(a&&t&&N({code:a,state:t,type:"oidc"}),s&&"undefined"!==typeof n){"true"==n?N({magic_token:s,type:"magiclink"}):location.href=`/#/register/set_name/login?magic_token=${s}`}}),[]),(0,s.useEffect)((()=>{if(E)switch(E.status){case 401:case 404:n.Ay.error("Username or Password incorrect");break;case 410:n.Ay.error("No associated account found, please contact user admin for an invitation link to join.");break;case"PARSING_ERROR":break;default:n.Ay.error("Something Error")}else;}),[E]),(0,s.useEffect)((()=>{_&&n.Ay.success(p("tip.login"))}),[_]);const $=e=>{const{type:a}=e.target.dataset,{value:t}=e.target;a&&P((e=>(e[a]=t,{...e})))},{email:B,password:I}=R;if(!L)return null;const{magic_link:T,who_can_sign_up:q}=S,D=v&&T,G=D&&O||"InvitationOnly"==q,M=!D||O;return k?null:(0,x.jsx)("div",{className:"flex-center h-screen dark:bg-gray-700",children:(0,x.jsxs)("div",{className:"relative py-8 px-10 shadow-md rounded-xl",children:[O&&(0,x.jsx)(h.A,{role:"button",className:"absolute left-7 top-8 w-10 h-10 stroke-gray-300",onClick:()=>{C(!1)}}),(0,x.jsxs)("div",{className:"flex-center flex-col pb-6",children:[(0,x.jsx)("img",{src:a||`${l.Ay}/resource/organization/logo?t=${Date.now()}`,alt:"logo",className:"w-14 h-14 mb-3 md:mb-7 rounded-full"}),(0,x.jsx)("h2",{className:"font-semibold text-2xl text-gray-800 dark:text-white",children:t("login.title",{name:e})})]}),(0,x.jsxs)("form",{className:"flex flex-col gap-5 w-80 md:min-w-[360px] ",onSubmit:e=>{e.preventDefault();v&&(null===S||void 0===S?void 0:S.magic_link)&&!O?C(!0):N({...R,type:"password"})},children:[!O&&(0,x.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,x.jsx)(g.A,{children:"Email"}),(0,x.jsx)(u.A,{className:"large",name:"email",value:B,type:"email",required:!0,placeholder:t("placeholder_email"),"data-type":"email",onChange:$})]}),(!D||O)&&(0,x.jsxs)("div",{className:"",children:[(0,x.jsx)(g.A,{children:"Password"}),(0,x.jsx)(u.A,{className:"large",type:"password",value:I,name:"password",required:!0,"data-type":"password",onChange:$,placeholder:t("placeholder_pwd")})]}),M?(0,x.jsx)(m.A,{type:"submit",disabled:A,children:A?"Signing":t("sign_in")}):(0,x.jsx)(m.A,{type:"submit",children:t("continue")})]}),(0,x.jsx)(d.A,{content:"OR"}),(0,x.jsxs)("div",{className:"socials flex flex-col gap-3",children:[O&&(0,x.jsx)(f,{email:R.email}),!G&&(0,x.jsx)(y.A,{})]}),"EveryOne"===q&&(0,x.jsx)(w,{})]})})}}}]);