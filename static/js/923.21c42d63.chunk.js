"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[923],{5287:(e,i,t)=>{t.r(i),t.d(i,{default:()=>m});var s=t(7313);const a=t(244).ZP.div`
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
`;var n=t(2066),l=t(658),r=t.n(l),o=t(7811),c=t(6863),d=t(4434),p=t(4716),f=t(4118),x=t(7935),h=t(4025),u=t(6417);const g=[{icon:(0,u.jsx)(d.Z,{className:"icon"}),title:"All Items",filter:""},{icon:(0,u.jsx)(p.Z,{className:"icon"}),title:"Images",filter:"image"},{icon:(0,u.jsx)(c.Z,{className:"icon"}),title:"Videos",filter:"video"},{icon:(0,u.jsx)(o.Z,{className:"icon"}),title:"Audios",filter:"audio"}];const m=function(){const[e,i]=(0,s.useState)(""),[t,l]=(0,s.useState)([]),{favorites:o,channelData:c,userData:d}=(0,h.CG)((e=>({favorites:e.favorites,userData:e.users.byId,channelData:e.channels.byId}))),p=e=>{i(e)};return(0,s.useEffect)((()=>{if(e)switch(e){case"audio":l(o.filter((e=>(e.messages||[]).every((e=>{var i;const t=null===(i=e.properties)||void 0===i?void 0:i.content_type;return e.content_type==x.bT.file&&t.startsWith("audio")})))));break;case"video":l(o.filter((e=>(e.messages||[]).every((e=>{var i;const t=null===(i=e.properties)||void 0===i?void 0:i.content_type;return e.content_type==x.bT.file&&t.startsWith("video")})))));break;case"image":{const e=o.filter((e=>(e.messages||[]).every((e=>{var i;const t=null===(i=e.properties)||void 0===i?void 0:i.content_type;return e.content_type==x.bT.file&&t.startsWith("image")}))));l(e)}}else l(o)}),[e,o]),(0,u.jsxs)(a,{children:[(0,u.jsx)("div",{className:"left",children:(0,u.jsx)("ul",{className:"filters",children:g.map((i=>{let{icon:t,title:s,filter:a}=i;return(0,u.jsxs)("li",{className:"filter "+(a==e?"active":""),onClick:p.bind(null,a),children:[t,(0,u.jsx)("span",{className:"txt",children:s})]},a)}))})}),(0,u.jsx)("div",{className:"right",children:t.map((e=>{var i,t;let{id:s,created_at:a,messages:l}=e;if(!l||0==l.length)return null;const[{source:{gid:o,uid:p}}]=l,x=o?(0,u.jsxs)("span",{className:"from channel",children:[(0,u.jsx)(f.Z,{className:"icon"})," ",null===(i=c[o])||void 0===i?void 0:i.name]}):(0,u.jsxs)("span",{className:"from user",children:["From ",(0,u.jsx)("strong",{children:null===(t=d[p])||void 0===t?void 0:t.name})]});return(0,u.jsxs)("div",{className:"container",children:[(0,u.jsxs)("h4",{className:"tip",children:[x,r()(a).format("YYYY-MM-DD")]}),(0,u.jsx)(n.Z,{id:s},s)]},s)}))})]})}}}]);