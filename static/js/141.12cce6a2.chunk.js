"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[141],{73141:(e,s,i)=>{i.r(s),i.d(s,{default:()=>C});var a=i(70537),t=i(15924),n=i(64084),r=i(3074),c=i(38289),l=i.n(c),o=i(12564),d=i(57889),p=i(7829),x=i(10562),h=i(65953),u=i(14317),g=i(31159),m=i(71893),f=i(80683);const b=d.ZP.div`
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
`,v=()=>{const{t:e}=(0,m.$)();return(0,f.jsxs)(b,{children:[(0,f.jsxs)("div",{className:"search",children:[(0,f.jsx)("img",{src:x,alt:"search icon"}),(0,f.jsx)("input",{placeholder:`${e("action.search")}...`,className:"input"})]}),(0,f.jsx)(g.Z,{tip:e("more"),placement:"bottom",children:(0,f.jsx)(p.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,f.jsx)(u.Z,{}),children:(0,f.jsx)("img",{src:h,alt:"add icon",className:"add"})})})]})};var j=i(6458),w=i(39795);const k=d.ZP.div`
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
`;var y=i(72991),N=i(66160);function Z(){const e=(0,r.I0)(),{pathname:s}=(0,t.TH)(),{user_id:i}=(0,t.UO)(),c=(0,N.CG)((e=>e.users.ids),l().isEqual);return(0,a.useEffect)((()=>(e((0,o.cp)({key:"user"})),()=>{e((0,o.cp)({key:"user",path:s}))})),[s]),c?(0,f.jsxs)(k,{children:[(0,f.jsxs)("div",{className:"left",children:[(0,f.jsx)(v,{}),(0,f.jsx)("div",{className:"list",children:(0,f.jsx)("nav",{className:"nav",children:c.map((e=>(0,f.jsx)(n.OL,{className:"session",to:`/users/${e}`,children:(0,f.jsx)(j.Z,{uid:e,enableContextMenu:!0})},e)))})})]}),(0,f.jsx)("div",{className:"right "+(i?"":"placeholder"),children:i?(0,f.jsx)(w.Z,{uid:+i}):(0,f.jsx)(y.Z,{type:"user"})})]}):null}const C=(0,a.memo)(Z)},10562:(e,s,i)=>{e.exports=i.p+"static/media/search.6ee4d07d418f350e5389.svg"}}]);