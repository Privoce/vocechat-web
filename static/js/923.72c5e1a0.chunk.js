"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[923],{5287:(e,i,t)=>{t.r(i),t.d(i,{default:()=>g});var s=t(7313);const a=t(9184).ZP.div`
  height: 100vh;
  display: flex;
  background-color: #fff;
  margin: 8px 24px 10px 0;
  border-radius: 16px;
  overflow: auto;
  .left {
    padding: 8px;
    min-width: 268px;
    box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.1);
    .filters {
      display: flex;
      flex-direction: column;
      gap: 2px;
      .filter {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        border-radius: var(--br);
        .icon {
          width: 15px;
          height: 20px;
        }
        .txt {
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #667085;
        }
        &:hover,
        &.active {
          background: rgba(116, 127, 141, 0.2);
        }
      }
    }
  }
  .right {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow-y: scroll;
    .container {
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      > .favorite {
        background: #f2f4f7;
      }
      .tip {
        display: inline-flex;
        align-items: center;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #bfbfbf;
        .from {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-right: 8px;
          &.channel,
          &.user strong {
            font-weight: 600;
            color: #344054;
            .icon {
              width: 12px;
              height: 12px;
            }
          }
        }
      }
    }
  }
`;var n=t(3709),l=t(3469),r=t(658),o=t.n(r),c=t(7811),d=t(6863),p=t(4434),f=t(4716),x=t(4118),h=t(7935),m=t(6417);const u=[{icon:(0,m.jsx)(p.Z,{className:"icon"}),title:"All Items",filter:""},{icon:(0,m.jsx)(f.Z,{className:"icon"}),title:"Images",filter:"image"},{icon:(0,m.jsx)(d.Z,{className:"icon"}),title:"Videos",filter:"video"},{icon:(0,m.jsx)(c.Z,{className:"icon"}),title:"Audios",filter:"audio"}];const g=function(){const[e,i]=(0,s.useState)(""),[t,r]=(0,s.useState)([]),{favorites:c,channelData:d,userData:p}=(0,n.v9)((e=>({favorites:e.favorites,userData:e.users.byId,channelData:e.channels.byId}))),f=e=>{i(e)};return(0,s.useEffect)((()=>{if(e)switch(e){case"audio":r(c.filter((e=>(e.messages||[]).every((e=>{var i;const t=null===(i=e.properties)||void 0===i?void 0:i.content_type;return e.content_type==h.bT.file&&t.startsWith("audio")})))));break;case"video":r(c.filter((e=>(e.messages||[]).every((e=>{var i;const t=null===(i=e.properties)||void 0===i?void 0:i.content_type;return e.content_type==h.bT.file&&t.startsWith("video")})))));break;case"image":{const e=c.filter((e=>(e.messages||[]).every((e=>{var i;const t=null===(i=e.properties)||void 0===i?void 0:i.content_type;return e.content_type==h.bT.file&&t.startsWith("image")}))));r(e)}}else r(c)}),[e,c]),(0,m.jsxs)(a,{children:[(0,m.jsx)("div",{className:"left",children:(0,m.jsx)("ul",{className:"filters",children:u.map((i=>{let{icon:t,title:s,filter:a}=i;return(0,m.jsxs)("li",{className:"filter "+(a==e?"active":""),onClick:f.bind(null,a),children:[t,(0,m.jsx)("span",{className:"txt",children:s})]},a)}))})}),(0,m.jsx)("div",{className:"right",children:t.map((e=>{var i,t;let{id:s,created_at:a,messages:n}=e;const[{source:{gid:r,uid:c}}]=n,f=r?(0,m.jsxs)("span",{className:"from channel",children:[(0,m.jsx)(x.Z,{className:"icon"})," ",null===(i=d[r])||void 0===i?void 0:i.name]}):(0,m.jsxs)("span",{className:"from user",children:["From ",(0,m.jsx)("strong",{children:null===(t=p[c])||void 0===t?void 0:t.name})]});return(0,m.jsxs)("div",{className:"container",children:[(0,m.jsxs)("h4",{className:"tip",children:[f,o()(a).format("YYYY-MM-DD")]}),(0,m.jsx)(l.Z,{id:s},s)]},s)}))})]})}}}]);