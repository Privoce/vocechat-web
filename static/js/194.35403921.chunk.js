"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[194],{58194:(e,t,a)=>{a.r(t),a.d(t,{default:()=>d,useMagicToken:()=>x});var c=a(15032),s=a(9790),n=a(32838),r=a(4134),l=a(85519),o=a(55556);function i(){const{t:e}=(0,l.Bd)("auth",{keyPrefix:"magic_link_expire"});return(0,o.jsxs)("div",{className:"flex flex-col items-center",children:[(0,o.jsx)("div",{className:"font-bold text-3xl text-gray-800 dark:text-white mt-3",children:e("title")}),(0,o.jsx)("p",{className:"text-center text-gray-400 mb-6",children:e("desc")}),(0,o.jsx)("p",{className:"text-center text-gray-400",children:e("desc_close")})]})}function d(){var e;const[t,{data:a,isLoading:l}]=(0,r.BQ)(),[d,x]=(0,c.useState)("");let[h]=(0,s.ok)(new URLSearchParams(location.search));const u=null!==(e=h.get("magic_token"))&&void 0!==e?e:"";return(0,c.useEffect)((()=>{u&&t(u)}),[u]),(0,c.useEffect)((()=>{a&&x(u)}),[a,u]),l?(0,o.jsx)("div",{className:"dark:text-gray-100",children:"Checking Magic Link..."}):(0,o.jsx)("div",{className:"flex-center h-screen overflow-x-hidden overflow-y-auto dark:bg-gray-700",children:(0,o.jsx)("div",{className:"py-8 px-10 shadow-md rounded-xl max-h-[95vh] overflow-y-auto overflow-x-hidden",children:u?a?(0,o.jsx)(n.sv,{context:{token:d}}):(0,o.jsx)(i,{}):(0,o.jsx)(n.sv,{context:{token:d}})})})}function x(){return(0,n.KC)()}}}]);