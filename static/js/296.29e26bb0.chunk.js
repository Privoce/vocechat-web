"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[296],{7723:(e,t,n)=>{n.r(t),n.d(t,{default:()=>w});var i=n(7313),o=n(9466),r=n(7890),c=n(3709),s=n(5018),a=n(9184),d=n(2963),l=n(562),u=n(5953),p=n(7364),f=n(4796),h=n(6417);const x=a.ZP.div`
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
`;function g(){return(0,h.jsxs)(x,{children:[(0,h.jsxs)("div",{className:"search",children:[(0,h.jsx)("img",{src:l}),(0,h.jsx)("input",{placeholder:"Search...",className:"input"})]}),(0,h.jsx)(f.Z,{tip:"More",placement:"bottom",children:(0,h.jsx)(d.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,h.jsx)(p.Z,{}),children:(0,h.jsx)("img",{src:u,alt:"add icon",className:"add"})})})]})}var m=n(4527),v=n(1902);const b=a.ZP.div`
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
`;var y=n(4075);function w(){const e=(0,c.I0)(),{pathname:t}=(0,r.TH)(),{user_id:n}=(0,r.UO)(),a=(0,c.v9)((e=>e.contacts.ids));return(0,i.useEffect)((()=>(e((0,s.Cz)({key:"contact"})),()=>{e((0,s.Cz)({key:"contact",path:t}))})),[t]),a?(0,h.jsxs)(b,{children:[(0,h.jsxs)("div",{className:"left",children:[(0,h.jsx)(g,{}),(0,h.jsx)("div",{className:"list",children:(0,h.jsx)("nav",{className:"nav",children:a.map((e=>(0,h.jsx)(o.OL,{className:"session",to:`/contacts/${e}`,children:(0,h.jsx)(m.Z,{uid:e,enableContextMenu:!0})},e)))})})]}),n?(0,h.jsx)("div",{className:"right",children:(0,h.jsx)(v.Z,{uid:n})}):(0,h.jsx)("div",{className:"right placeholder",children:(0,h.jsx)(y.Z,{type:"contact"})})]}):null}},1818:(e,t,n)=>{function i(e,t,n,i){return new(n||(n=Promise))((function(o,r){function c(e){try{a(i.next(e))}catch(t){r(t)}}function s(e){try{a(i.throw(e))}catch(t){r(t)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,s)}a((i=i.apply(e,t||[])).next())}))}function o(e){return i(this,void 0,void 0,(function*(){const t=URL.createObjectURL(e),n=yield function(e){return i(this,void 0,void 0,(function*(){return new Promise((function(t,n){const i=document.createElement("img");i.crossOrigin="anonymous",i.src=e,i.onload=function(e){const n=e.target;t(n)},i.onabort=n,i.onerror=n}))}))}(t);return yield function(e){return i(this,void 0,void 0,(function*(){return new Promise((function(t,n){const i=document.createElement("canvas"),o=i.getContext("2d");if(o){const{width:r,height:c}=e;i.width=r,i.height=c,o.drawImage(e,0,0,r,c),i.toBlob((function(e){e?t(e):n("Cannot get blob from image element")}),"image/png",1)}}))}))}(n)}))}function r(e){return i(this,void 0,void 0,(function*(){const t={[e.type]:e},n=new ClipboardItem(t);yield navigator.clipboard.write([n])}))}function c(e){return i(this,void 0,void 0,(function*(){const t=yield function(e){return i(this,void 0,void 0,(function*(){const t=yield fetch(`${e}`);return yield t.blob()}))}(e);if(function(e){return e.type.includes("jpeg")}(t)){const e=yield o(t);return yield r(e),t}if(function(e){return e.type.includes("png")}(t))return yield r(t),t;throw new Error("Cannot copy this type of image to clipboard")}))}n.d(t,{VP:()=>c})},8570:(e,t,n)=>{n.d(t,{O:()=>o});var i=n(7313);function o(e,t,n){void 0===n&&(n=!0);var o=(0,i.useRef)(t),r=(0,i.useCallback)((function(t){e&&e.current&&!e.current.contains(t.target)&&o.current(t)}),[]);(0,i.useEffect)((function(){o.current=t})),(0,i.useEffect)((function(){if(n)return document.addEventListener("click",r,!0),document.addEventListener("ontouchstart",r,!0),function(){document.removeEventListener("click",r,!0),document.removeEventListener("ontouchstart",r,!0)}}),[e,t,n])}},562:(e,t,n)=>{e.exports=n.p+"static/media/search.6ee4d07d418f350e5389.svg"}}]);