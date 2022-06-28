"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[876],{8876:(e,i,t)=>{t.r(i),t.d(i,{default:()=>w});var a=t(7313),s=t(9466),n=t(7890),c=t(3709),r=t(5878),l=t(9184),o=t(2963),d=t(562),p=t(5953),x=t(5700),h=t(9265),g=t(6417);const u=l.ZP.div`
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
  .add {
    cursor: pointer;
  }
`;function f(){return(0,g.jsxs)(u,{children:[(0,g.jsxs)("div",{className:"search",children:[(0,g.jsx)("img",{src:d,alt:"search icon"}),(0,g.jsx)("input",{placeholder:"Search...",className:"input"})]}),(0,g.jsx)(h.Z,{tip:"More",placement:"bottom",children:(0,g.jsx)(o.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,g.jsx)(x.Z,{}),children:(0,g.jsx)("img",{src:p,alt:"add icon",className:"add"})})})]})}var m=t(5515),b=t(5920);const v=l.ZP.div`
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
`;var j=t(9667);function w(){const e=(0,c.I0)(),{pathname:i}=(0,n.TH)(),{user_id:t}=(0,n.UO)(),l=(0,c.v9)((e=>e.contacts.ids));return(0,a.useEffect)((()=>(e((0,r.Cz)({key:"contact"})),()=>{e((0,r.Cz)({key:"contact",path:i}))})),[i]),l?(0,g.jsxs)(v,{children:[(0,g.jsxs)("div",{className:"left",children:[(0,g.jsx)(f,{}),(0,g.jsx)("div",{className:"list",children:(0,g.jsx)("nav",{className:"nav",children:l.map((e=>(0,g.jsx)(s.OL,{className:"session",to:`/contacts/${e}`,children:(0,g.jsx)(m.Z,{uid:e,enableContextMenu:!0})},e)))})})]}),t?(0,g.jsx)("div",{className:"right",children:(0,g.jsx)(b.Z,{uid:t})}):(0,g.jsx)("div",{className:"right placeholder",children:(0,g.jsx)(j.Z,{type:"contact"})})]}):null}},562:(e,i,t)=>{e.exports=t.p+"static/media/search.6ee4d07d418f350e5389.svg"}}]);