"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[92],{73141:(e,t,s)=>{s.r(t),s.d(t,{default:()=>N});var n=s(70537),i=s(15924),a=s(64084),r=s(3074),c=s(38289),o=s.n(c),d=s(12564),l=s(57889),p=s(7829),x=s(10562),u=s(65953),h=s(14317),m=s(31159),g=s(71893),f=s(80683);const v=l.ZP.div`
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
`,b=()=>{const{t:e}=(0,g.$)();return(0,f.jsxs)(v,{children:[(0,f.jsxs)("div",{className:"search",children:[(0,f.jsx)("img",{src:x,alt:"search icon"}),(0,f.jsx)("input",{placeholder:`${e("action.search")}...`,className:"input"})]}),(0,f.jsx)(m.Z,{tip:e("more"),placement:"bottom",children:(0,f.jsx)(p.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,f.jsx)(h.Z,{}),children:(0,f.jsx)("img",{src:u,alt:"add icon",className:"add"})})})]})};var j=s(6458),k=s(39795);const w=l.ZP.div`
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
`;var y=s(72991),Z=s(66160);function E(){const e=(0,r.I0)(),{pathname:t}=(0,i.TH)(),{user_id:s}=(0,i.UO)(),c=(0,Z.CG)((e=>e.users.ids),o().isEqual);return(0,n.useEffect)((()=>(e((0,d.cp)({key:"user"})),()=>{e((0,d.cp)({key:"user",path:t}))})),[t]),c?(0,f.jsxs)(w,{children:[(0,f.jsxs)("div",{className:"left",children:[(0,f.jsx)(b,{}),(0,f.jsx)("div",{className:"list",children:(0,f.jsx)("nav",{className:"nav",children:c.map((e=>(0,f.jsx)(a.OL,{className:"session",to:`/users/${e}`,children:(0,f.jsx)(j.Z,{uid:e,enableContextMenu:!0})},e)))})})]}),(0,f.jsx)("div",{className:"right "+(s?"":"placeholder"),children:s?(0,f.jsx)(k.Z,{uid:+s}):(0,f.jsx)(y.Z,{type:"user"})})]}):null}const N=(0,n.memo)(E)},97943:(e,t,s)=>{s.d(t,{O:()=>a});var n=s(70537),i=s(2978);function a(e,t){let s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];const a=(0,n.useRef)(t),r=(0,n.useCallback)((t=>{e.current&&!e.current.contains(t.target)&&a.current(t)}),[e]);(0,n.useEffect)((()=>{a.current=t})),(0,n.useEffect)((()=>s?(document.addEventListener("click",r,!0),document.addEventListener("ontouchstart",r,!0),()=>{document.removeEventListener("click",r,!0),document.removeEventListener("ontouchstart",r,!0)}):i.Z),[e,t,s,r])}},2978:(e,t,s)=>{s.d(t,{Z:()=>n});const n=()=>{}},10562:(e,t,s)=>{e.exports=s.p+"static/media/search.6ee4d07d418f350e5389.svg"}}]);