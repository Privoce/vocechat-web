"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[286],{66286:(e,a,s)=>{s.r(a),s.d(a,{default:()=>k});var t=s(70537),n=s(27418),r=s(80308),i=s(17237),c=s(69885),l=s(15924),o=s(80683);function d(){const e=(0,l.s0)();return(0,o.jsx)(c.Z,{className:"w-full",onClick:()=>{e("/send_magic_link")},children:"Sign in with Magic Link"})}var g=s(14566);function m(){const{t:e}=(0,g.$G)("auth"),a=(0,l.s0)();return(0,o.jsxs)("div",{className:"flex gap-1 mt-7 text-sm text-slate-500 dark:text-gray-100 justify-center",children:[(0,o.jsx)("span",{children:e("login.no_account")}),(0,o.jsx)("a",{className:"text-primary-400 cursor-pointer",onClick:()=>{a("/register")},children:e("sign_up")})]})}var u=s(15312),h=s(65809),x=s(25089),p=s(44917),f=s(88143),w=s(66160);function k(){const e=(0,w.CG)((e=>e.server.name)),{t:a}=(0,g.$G)("auth"),{t:s}=(0,g.$G)(),{data:l,isLoading:k}=(0,h.n8)(),[j,{isSuccess:b,isLoading:y,error:_}]=(0,u.YA)(),{clientId:v}=(0,x.Z)(),{data:N,isSuccess:Z}=(0,h.ww)(),[S,P]=(0,t.useState)({email:"",password:""});(0,t.useEffect)((()=>{const e=new URLSearchParams(location.search),a=e.get("code"),s=e.get("state"),t=e.get("magic_token"),n=e.get("exists");if(a&&s&&j({code:a,state:s,type:"oidc"}),t&&"undefined"!==typeof n){"true"==n?j({magic_token:t,type:"magiclink"}):location.href=`?magic_token=${t}#/register/set_name/login`}}),[]),(0,t.useEffect)((()=>{if(_)switch(_.status){case 401:case 404:n.ZP.error("Username or Password incorrect");break;case 410:n.ZP.error("No associated account found, please contact user admin for an invitation link to join.");break;case"PARSING_ERROR":break;default:n.ZP.error("Something Error")}else;}),[_]),(0,t.useEffect)((()=>{b&&n.ZP.success(s("tip.login"))}),[b]);const C=e=>{const{type:a}=e.target.dataset,{value:s}=e.target;a&&P((e=>(e[a]=s,{...e})))},{email:E,password:R}=S;if(!Z)return null;const{magic_link:G,github:$,google:L,metamask:O,oidc:q=[],who_can_sign_up:A}=N,I=l&&G,T=I||L&&v||O||q.length>0||$;return k?null:(0,o.jsx)("div",{className:"flex-center h-screen dark:bg-gray-700",children:(0,o.jsxs)("div",{className:"py-8 px-10 shadow-md rounded-xl",children:[(0,o.jsxs)("div",{className:"flex-center flex-col pb-6",children:[(0,o.jsx)("img",{src:`${r.ZP}/resource/organization/logo`,alt:"logo",className:"w-14 h-14 mb-3 md:mb-7 rounded-full"}),(0,o.jsx)("h2",{className:"font-semibold text-2xl text-gray-800 dark:text-white md:mb-2",children:a("login.title",{name:e})}),(0,o.jsx)("span",{className:"text-gray-400 dark:text-gray-100",children:a("login.desc")})]}),(0,o.jsxs)("form",{className:"flex flex-col gap-5 w-80 md:min-w-[360px] ",onSubmit:e=>{e.preventDefault(),j({...S,type:"password"})},children:[(0,o.jsx)(i.Z,{className:"large",name:"email",value:E,type:"email",required:!0,placeholder:a("placeholder_email"),"data-type":"email",onChange:C}),(0,o.jsx)(i.Z,{className:"large",type:"password",value:R,name:"password",required:!0,"data-type":"password",onChange:C,placeholder:a("placeholder_pwd")}),(0,o.jsx)(c.Z,{type:"submit",disabled:y,children:y?"Signing":a("sign_in")})]}),T&&(0,o.jsx)(f.Z,{content:"OR"}),(0,o.jsxs)("div",{className:"flex flex-col gap-4",children:[I&&(0,o.jsx)(d,{}),(0,o.jsx)(p.Z,{})]}),"EveryOne"===A&&(0,o.jsx)(m,{})]})})}}}]);