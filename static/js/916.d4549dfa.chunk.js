"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[916],{88916:(e,i,t)=>{t.r(i),t.d(i,{default:()=>m});var s=t(70537);const a=t(57889).ZP.div`
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
`;var n=t(96954),l=t(7699),r=t.n(l),o=t(20814),c=t(8969),d=t(26906),p=t(31271),f=t(79884),x=t(80308),h=t(66160),u=t(71893),g=t(80683);const m=function(){const{t:e}=(0,u.$)("fav"),[i,t]=(0,s.useState)(""),[l,m]=(0,s.useState)([]),v=[{icon:(0,g.jsx)(d.Z,{className:"icon"}),title:e("all_items"),filter:""},{icon:(0,g.jsx)(p.Z,{className:"icon"}),title:e("image"),filter:"image"},{icon:(0,g.jsx)(c.Z,{className:"icon"}),title:e("video"),filter:"video"},{icon:(0,g.jsx)(o.Z,{className:"icon"}),title:e("audio"),filter:"audio"}],{favorites:b,channelData:y,userData:j}=(0,h.CG)((e=>({favorites:e.favorites,userData:e.users.byId,channelData:e.channels.byId}))),w=e=>{t(e)};return(0,s.useEffect)((()=>{if(i)switch(i){case"audio":m(b.filter((e=>(e.messages||[]).every((e=>{var i;const t=null===(i=e.properties)||void 0===i?void 0:i.content_type;return e.content_type==x.bT.file&&t.startsWith("audio")})))));break;case"video":m(b.filter((e=>(e.messages||[]).every((e=>{var i;const t=null===(i=e.properties)||void 0===i?void 0:i.content_type;return e.content_type==x.bT.file&&t.startsWith("video")})))));break;case"image":{const e=b.filter((e=>(e.messages||[]).every((e=>{var i;const t=null===(i=e.properties)||void 0===i?void 0:i.content_type;return e.content_type==x.bT.file&&t.startsWith("image")}))));m(e)}}else m(b)}),[i,b]),(0,g.jsxs)(a,{children:[(0,g.jsx)("div",{className:"left",children:(0,g.jsx)("ul",{className:"filters",children:v.map((e=>{let{icon:t,title:s,filter:a}=e;return(0,g.jsxs)("li",{className:"filter "+(a==i?"active":""),onClick:w.bind(null,a),children:[t,(0,g.jsx)("span",{className:"txt",children:s})]},a)}))})}),(0,g.jsx)("div",{className:"right",children:l.map((e=>{var i,t;let{id:s,created_at:a,messages:l}=e;if(!l||0==l.length)return null;const[{source:{gid:o,uid:c}}]=l,d=o?(0,g.jsxs)("span",{className:"from channel",children:[(0,g.jsx)(f.Z,{className:"icon"})," ",null===(i=y[o])||void 0===i?void 0:i.name]}):(0,g.jsxs)("span",{className:"from user",children:["From ",(0,g.jsx)("strong",{children:null===(t=j[c])||void 0===t?void 0:t.name})]});return(0,g.jsxs)("div",{className:"container",children:[(0,g.jsxs)("h4",{className:"tip",children:[d,r()(a).format("YYYY-MM-DD")]}),(0,g.jsx)(n.Z,{id:s},s)]},s)}))})]})}}}]);