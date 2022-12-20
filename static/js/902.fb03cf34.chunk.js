"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[902],{71961:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Z});var s=n(70537),i=n(15924),a=n(64084),r=n(3074),c=n(12564),o=n(57889),l=n(7829),d=n(10562),p=n(65953),u=n(14317),x=n(31159),h=n(14566),g=n(80683);const m=o.ZP.div`
  position: relative;
  min-height: 56px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  .search {
    display: flex;
    align-items: center;
    gap: 5px;
    .input {
      width: 100%;
      border: none;
      outline: none;
      background: none;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
    }
  }
`,f=e=>{let{input:t,updateInput:n}=e;const{t:s}=(0,h.$G)();return(0,g.jsxs)(m,{children:[(0,g.jsxs)("div",{className:"search",children:[(0,g.jsx)("img",{src:d,alt:"search icon"}),(0,g.jsx)("input",{value:t,placeholder:`${s("action.search")}...`,className:"input",onChange:e=>{n(e.target.value)}})]}),(0,g.jsx)(x.Z,{tip:s("more"),placement:"bottom",children:(0,g.jsx)(l.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,g.jsx)(u.Z,{}),children:(0,g.jsx)("img",{src:p,alt:"add icon",className:"cursor-pointer"})})})]})};var v=n(18951),b=n(71044);const j=o.ZP.div`
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
`;var k=n(72991),w=n(72136);function y(){const e=(0,r.I0)(),{pathname:t}=(0,i.TH)(),{input:n,updateInput:o,users:l}=(0,w.Z)(),{user_id:d}=(0,i.UO)();return(0,s.useEffect)((()=>(e((0,c.cp)({key:"user"})),()=>{e((0,c.cp)({key:"user",path:t}))})),[t]),l?(0,g.jsxs)(j,{children:[(0,g.jsxs)("div",{className:"left",children:[(0,g.jsx)(f,{input:n,updateInput:o}),(0,g.jsx)("div",{className:"list",children:(0,g.jsx)("nav",{className:"nav",children:l.map((e=>{let{uid:t}=e;return(0,g.jsx)(a.OL,{className:"session",to:`/users/${t}`,children:(0,g.jsx)(v.Z,{uid:t,enableContextMenu:!0})},t)}))})})]}),(0,g.jsx)("div",{className:"right "+(d?"":"placeholder"),children:d?(0,g.jsx)(b.Z,{uid:+d}):(0,g.jsx)(k.Z,{type:"user"})})]}):null}const Z=(0,s.memo)(y)},97943:(e,t,n)=>{n.d(t,{O:()=>a});var s=n(70537),i=n(2978);function a(e,t){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];const a=(0,s.useRef)(t),r=(0,s.useCallback)((t=>{e.current&&!e.current.contains(t.target)&&a.current(t)}),[e]);(0,s.useEffect)((()=>{a.current=t})),(0,s.useEffect)((()=>n?(document.addEventListener("click",r,!0),document.addEventListener("ontouchstart",r,!0),()=>{document.removeEventListener("click",r,!0),document.removeEventListener("ontouchstart",r,!0)}):i.Z),[e,t,n,r])}},2978:(e,t,n)=>{n.d(t,{Z:()=>s});const s=()=>{}},10562:(e,t,n)=>{e.exports=n.p+"static/media/search.c3b5992b6af18a20b3ce.svg"}}]);