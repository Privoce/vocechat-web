"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[902],{71961:(e,t,s)=>{s.r(t),s.d(t,{default:()=>w});var n=s(70537),a=s(15924),c=s(64084),r=s(3074),i=s(12564),l=s(7829),o=s(10562),d=s(65953),u=s(14317),p=s(31159),x=s(14566),h=s(80683);const m=e=>{let{input:t,updateInput:s}=e;const{t:n}=(0,x.$G)();return(0,h.jsxs)("div",{className:"relative min-h-[56px] px-2 py-3 flex items-center justify-between gap-2 shadow",children:[(0,h.jsxs)("div",{className:"flex items-center gap-1",children:[(0,h.jsx)("img",{src:o,alt:"search icon"}),(0,h.jsx)("input",{value:t,placeholder:`${n("action.search")}...`,className:"w-full text-sm",onChange:e=>{s(e.target.value)}})]}),(0,h.jsx)(p.Z,{tip:n("more"),placement:"bottom",children:(0,h.jsx)(l.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,h.jsx)(u.Z,{}),children:(0,h.jsx)("img",{src:d,alt:"add icon",className:"cursor-pointer"})})})]})};var f=s(18951),v=s(78468);const g=s(57889).ZP.div`
  display: flex;
  height: 100%;
  padding: 8px 48px 10px 0;
  > .left {
    border-radius: 16px 0 0 16px;
    background-color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 268px;
    box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.1);
    .list {
      padding: 12px 8px;
      overflow: scroll;
      padding-bottom: 50px;
      > .nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
        a {
          border-radius: 6px;
          text-decoration: none;
        }
        .session {
          &:hover,
          &.active {
            background: rgba(116, 127, 141, 0.1);
          }
        }
      }
    }
  }
  .right {
    border-radius: 0 16px 16px 0;
    background-color: #fff;
    /* height: 100vh; */
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    &.placeholder {
      height: 100%;
      align-items: center;
    }
  }
`;var b=s(72991),j=s(72136);function k(){const e=(0,r.I0)(),{pathname:t}=(0,a.TH)(),{input:s,updateInput:l,users:o}=(0,j.Z)(),{user_id:d}=(0,a.UO)();return(0,n.useEffect)((()=>(e((0,i.cp)({key:"user"})),()=>{e((0,i.cp)({key:"user",path:t}))})),[t]),o?(0,h.jsxs)(g,{children:[(0,h.jsxs)("div",{className:"left",children:[(0,h.jsx)(m,{input:s,updateInput:l}),(0,h.jsx)("div",{className:"list",children:(0,h.jsx)("nav",{className:"nav",children:o.map((e=>{let{uid:t}=e;return(0,h.jsx)(c.OL,{className:"session",to:`/users/${t}`,children:(0,h.jsx)(f.Z,{uid:t,enableContextMenu:!0})},t)}))})})]}),(0,h.jsx)("div",{className:"right "+(d?"":"placeholder"),children:d?(0,h.jsx)(v.Z,{uid:+d}):(0,h.jsx)(b.Z,{type:"user"})})]}):null}const w=(0,n.memo)(k)},97943:(e,t,s)=>{s.d(t,{O:()=>c});var n=s(70537),a=s(2978);function c(e,t){let s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];const c=(0,n.useRef)(t),r=(0,n.useCallback)((t=>{e.current&&!e.current.contains(t.target)&&c.current(t)}),[e]);(0,n.useEffect)((()=>{c.current=t})),(0,n.useEffect)((()=>s?(document.addEventListener("click",r,!0),document.addEventListener("ontouchstart",r,!0),()=>{document.removeEventListener("click",r,!0),document.removeEventListener("ontouchstart",r,!0)}):a.Z),[e,t,s,r])}},2978:(e,t,s)=>{s.d(t,{Z:()=>n});const n=()=>{}},10562:(e,t,s)=>{e.exports=s.p+"static/media/search.c3b5992b6af18a20b3ce.svg"}}]);