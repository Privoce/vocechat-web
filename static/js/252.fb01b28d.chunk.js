"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[252],{50252:(e,t,s)=>{s.r(t),s.d(t,{default:()=>h});var a=s(21600),r=s(75837),c=s(64669),n=s(91438),i=s(20511),o=s(40261),d=s(24446),g=s(47437),l=s(36646),u=s(10364);function h(){const{t:e}=(0,c.Bd)(),[t,{data:s,isSuccess:h,isError:f,isLoading:k}]=(0,d._L)(),{token:p}=(0,i.g)(),[y]=(0,o.ok)(),[b,x]=(0,a.useState)(null),v=(0,n.wA)(),w=(0,i.Zp)();return(0,a.useEffect)((()=>{p?t({key:p,type:"thirdparty"}):x("Token Not Found")}),[p]),(0,a.useEffect)((()=>{f&&x("Try Logging in Error")}),[f]),(0,a.useEffect)((()=>{if(h&&s){r.Ay.success(e("tip.login")),v((0,g.vd)(s));const t=y.get("path")||"/";w(t)}}),[h,s]),(0,u.jsx)("div",{className:"flex-center h-screen dark:bg-gray-900",children:(0,u.jsxs)("span",{className:(0,l.A)("text-gray-900 dark:text-gray-100 text-lg",b&&"!text-red-500"),children:[k?"loading":"",b]})})}}}]);