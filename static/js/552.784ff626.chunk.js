"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[552],{7723:(e,t,n)=>{n.r(t),n.d(t,{default:()=>k});var i=n(7313),s=n(9466),a=n(7890),c=n(3709),r=n(5018),o=n(9184),d=n(2963),l=n(562),p=n(5953),x=n(7364),u=n(4796),h=n(6417);const f=o.ZP.div`
  position: relative;
  min-height: 56px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
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
  .add {
    cursor: pointer;
  }
`;function g(){return(0,h.jsxs)(f,{children:[(0,h.jsxs)("div",{className:"search",children:[(0,h.jsx)("img",{src:l}),(0,h.jsx)("input",{placeholder:"Search...",className:"input"})]}),(0,h.jsx)(u.Z,{tip:"More",placement:"bottom",children:(0,h.jsx)(d.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,h.jsx)(x.Z,{}),children:(0,h.jsx)("img",{src:p,alt:"add icon",className:"add"})})})]})}var m=n(4527),v=n(1902);const b=o.ZP.div`
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
`;var j=n(4075);function k(){const e=(0,c.I0)(),{pathname:t}=(0,a.TH)(),{user_id:n}=(0,a.UO)(),o=(0,c.v9)((e=>e.contacts.ids));return(0,i.useEffect)((()=>(e((0,r.Cz)({key:"contact"})),()=>{e((0,r.Cz)({key:"contact",path:t}))})),[t]),o?(0,h.jsxs)(b,{children:[(0,h.jsxs)("div",{className:"left",children:[(0,h.jsx)(g,{}),(0,h.jsx)("div",{className:"list",children:(0,h.jsx)("nav",{className:"nav",children:o.map((e=>(0,h.jsx)(s.OL,{className:"session",to:`/contacts/${e}`,children:(0,h.jsx)(m.Z,{uid:e,enableContextMenu:!0})},e)))})})]}),n?(0,h.jsx)("div",{className:"right",children:(0,h.jsx)(v.Z,{uid:n})}):(0,h.jsx)("div",{className:"right placeholder",children:(0,h.jsx)(j.Z,{type:"contact"})})]}):null}},8570:(e,t,n)=>{n.d(t,{O:()=>s});var i=n(7313);function s(e,t,n){void 0===n&&(n=!0);var s=(0,i.useRef)(t),a=(0,i.useCallback)((function(t){e&&e.current&&!e.current.contains(t.target)&&s.current(t)}),[]);(0,i.useEffect)((function(){s.current=t})),(0,i.useEffect)((function(){if(n)return document.addEventListener("click",a,!0),document.addEventListener("ontouchstart",a,!0),function(){document.removeEventListener("click",a,!0),document.removeEventListener("ontouchstart",a,!0)}}),[e,t,n])}},562:(e,t,n)=>{e.exports=n.p+"static/media/search.6ee4d07d418f350e5389.svg"}}]);