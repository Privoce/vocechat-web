"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[866],{5845:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(9184),a=n(6417);const s=i.ZP.div`
  padding: 32px;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 8px;
  background-color: #fff;
  min-width: 440px;
  &.compact {
    padding: 16px;
    min-width: 406px;
    .title,
    .desc {
      text-align: left;
    }
  }
  .title {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color: #374151;
    margin-bottom: 16px;
  }
  .desc {
    text-align: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #6b7280;
    margin-bottom: 8px;
  }
  .btns {
    padding-top: 16px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    align-items: center;
  }
`;function l(e){let{title:t="",description:n="",buttons:i=null,children:l,...r}=e;return(0,a.jsxs)(s,{...r,children:[t&&(0,a.jsx)("h3",{className:"title",children:t}),n&&(0,a.jsx)("p",{className:"desc",children:n}),l,i&&(0,a.jsx)("div",{className:"btns",children:i})]})}},8009:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(7313),a=n(3709);function s(){const[e,t]=(0,i.useState)(""),n=(0,a.v9)((e=>Object.values(e.channels.byId))),[s,l]=(0,i.useState)([]);(0,i.useEffect)((()=>{if(e){let t=["",...e.toLowerCase(),""].join(".*"),i=new RegExp(t);l(n.filter((e=>i.test(e.name.toLowerCase()))))}else l(n)}),[e]);return{input:e,channels:s,updateInput:e=>{t(e)}}}},29:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Pa});var i=n(7313),a=n(7890),s=n(3709),l=n(9184);const r=l.ZP.div`
  display: flex;
  height: 100%;
  padding: 8px 48px 10px 0;
  > .left {
    background-color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 268px;
    box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.05);
    height: 100%;
    overflow: auto;
    border-radius: 16px 0 0 16px;
    .list {
      margin: 12px 8px;
      &.dms {
        flex: 1;
      }
      .title {
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
        cursor: pointer;
        > .txt {
          user-select: none;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: bold;
          font-size: 12px;
          line-height: 20px;
          color: #78787c;
        }
        .icon {
          transition: transform 0.5s ease;
          transform-origin: center;
        }
        .add_icon {
          width: 18px;
          height: 18px;
        }
      }
      > .nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
        a {
          text-decoration: none;
        }
        .session {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 4px 8px;
          border-radius: 4px;
          &:hover,
          &.active {
            background: rgba(116, 127, 141, 0.1);
          }

          .avatar {
            /* todo */
          }
          .details {
            display: flex;
            flex-direction: column;
            width: 100%;
            .up {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .name {
                font-weight: 600;
                font-size: 14px;
                line-height: 20px;
                color: #52525b;
                max-width: 112px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              time {
                white-space: nowrap;
                font-weight: 500;
                font-size: 12px;
                line-height: 18px;
                color: #78787c;
              }
            }
            .down {
              display: flex;
              justify-content: space-between;
              .msg {
                min-height: 18px;
                font-weight: normal;
                font-size: 12px;
                line-height: 18px;
                color: #78787c;
                white-space: nowrap;
                overflow: hidden;
                width: 140px;
                text-overflow: ellipsis;
              }
              > .badge {
                color: #fff;
                height: 20px;
                min-width: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                background: #1fe1f9;
                font-weight: 900;
                font-size: 10px;
                line-height: 10px;
                &.dot {
                  min-width: unset;
                  width: 6px;
                  height: 6px;
                  padding: 0;
                }
                &.mute {
                  background: #bfbfbf;
                }
              }
            }
          }
        }
        /* drop files effect */
        .drop_over {
          box-shadow: inset 0 0 0 2px #52edff;
        }
      }
      &.collapse {
        .title .icon {
          transform: rotate(-90deg);
        }
        > .nav > .link:not(.active) {
          display: none;
        }
      }
    }
  }
  > .right {
    border-radius: 0 16px 16px 0;
    width: 100%;
    &.placeholder {
      background-color: #fff;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;var o=n(4075),c=n(2963),d=n(5953),p=n(4796),h=n(9466),u=n(7364),x=n(6417);const f=l.ZP.div`
  min-height: 56px;
  position: relative;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  /* margin-bottom: 10px; */
  .server {
    display: flex;
    align-items: center;
    gap: 8px;
    .logo {
      width: 32px;
      height: 32px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .name {
        font-weight: 700;
        font-size: 14px;
        line-height: 100%;
        color: #374151;
      }
      .desc {
        font-weight: 400;
        font-size: 12px;
        line-height: 100%;
        color: #78787c;
      }
    }
  }
  .add {
    cursor: pointer;
  }
`;function m(){const{pathname:e}=(0,a.TH)(),{server:t,userCount:n}=(0,s.v9)((e=>({userCount:e.contacts.ids.length,server:e.server}))),{name:i,description:l,logo:r}=t;return(0,x.jsxs)(f,{children:[(0,x.jsx)(h.OL,{to:`/setting?f=${e}`,children:(0,x.jsxs)("div",{className:"server",children:[(0,x.jsx)("div",{className:"logo",children:(0,x.jsx)("img",{src:r})}),(0,x.jsxs)("div",{className:"info",children:[(0,x.jsx)("h3",{className:"name",title:l,children:i}),(0,x.jsxs)("span",{className:"desc",children:[n," members"]})]})]})}),(0,x.jsx)(p.Z,{tip:"More",placement:"bottom",children:(0,x.jsx)(c.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,x.jsx)(u.Z,{}),children:(0,x.jsx)("img",{src:d,alt:"add icon",className:"add"})})})]})}const g=n.p+"static/media/sound.on.b52a5b656fded2ead800.svg",v=n.p+"static/media/mic.on.ce4d7bc6e790710d7c3b.svg";var b=n(5536),C=n(4263);const w=l.ZP.div`
  background-color: #f4f4f5;
  position: sticky;
  bottom: 16px;
  margin: 8px;
  width: 94%;
  width: -webkit-fill-available;
  border-radius: 25px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .profile {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
    .toggle {
    }
    .info {
      display: flex;
      flex-direction: column;
      .name {
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        color: #27272a;
      }
      .id {
        padding: 0 2px;
        font-size: 12px;
        line-height: 18px;
        color: #52525b;
      }
    }
  }
  .settings {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
`;function j(){const{values:e}=(0,C.Z)("agora"),t=(0,s.v9)((e=>e.contacts.byId[e.authData.uid]));if(!t)return null;const{uid:n,name:i,avatar:a}=t;return(0,x.jsxs)(w,{children:[(0,x.jsxs)("div",{className:"profile",children:[(0,x.jsx)(b.Z,{url:a,name:i,alt:"user avatar",className:"avatar"}),(0,x.jsxs)("div",{className:"info",children:[(0,x.jsx)("span",{className:"name",children:i}),(0,x.jsxs)("span",{className:"id",children:["#",n]})]})]}),e.enabled&&(0,x.jsxs)("div",{className:"settings",children:[(0,x.jsx)("img",{src:g,className:"icon",alt:"mic icon"}),(0,x.jsx)("img",{src:v,className:"icon",alt:"sound icon"})]})]})}var y=n(4095),Z=n(5843);function k(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;const[t,n]=(0,i.useState)([]),{channel:a,loginUser:l}=(0,s.v9)((t=>({channel:t.channels.byId[e],loginUser:t.contacts.byId[t.authData.uid]}))),[r,{isError:o,isLoading:c,isSuccess:d}]=(0,Z.OL)(),[p,{isError:h,isLoading:u,isSuccess:x}]=(0,Z.jT)(),f=t=>{t&&e&&r({mid:t,gid:+e})},m=t=>{t&&e&&p({mid:t,gid:+e})},g=t=>{if(!e||!a)return;const n=a.pinned_messages;if(!n||0==n.length)return;return n.find((e=>e.mid==t))};return(0,i.useEffect)((()=>{a&&n(a.pinned_messages)}),[a]),{getPinInfo:g,channel:a,pins:t,canPin:l.is_admin||(null===a||void 0===a?void 0:a.owner)==l.uid,pinMessage:f,unpinMessage:m,isError:o,isPining:c,isSuccess:d,isUnpinError:h,isUnpining:u,isUnpinSuccess:x}}var M,N=n(658),E=n.n(N),_=n(8006),D=n(7323);function I(e){let{mid:t=0}=e;const{msg:n,contactsData:i}=(0,s.v9)((e=>({msg:e.message[t],contactsData:e.contacts.byId})));if(!n)return null;const{from_uid:a,created_at:l,content_type:r,content:o,thumbnail:c,properties:d}=n,{name:p,avatar:h}=i[a];return(0,x.jsxs)(D.Z,{className:"preview",children:[(0,x.jsx)("div",{className:"avatar",children:(0,x.jsx)(b.Z,{url:h,name:p})}),(0,x.jsxs)("div",{className:"details",children:[(0,x.jsxs)("div",{className:"up",children:[(0,x.jsx)("span",{className:"name",children:p}),(0,x.jsx)("i",{className:"time",children:E()(l).format("YYYY-MM-DD h:mm:ss A")})]}),(0,x.jsx)("div",{className:"down",children:(0,_.Z)({content_type:r,content:o,thumbnail:c,from_uid:a,properties:d})})]})]})}function L(){return L=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},L.apply(this,arguments)}const P=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",L({width:160,height:160,viewBox:"0 0 160 160",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,M||(M=i.createElement("path",{d:"M79.9997 13.3642C116.819 13.3642 146.666 43.2118 146.666 80.0308C146.666 116.85 116.819 146.698 79.9997 146.698C43.1807 146.698 13.333 116.85 13.333 80.0308C13.333 43.2118 43.1807 13.3642 79.9997 13.3642ZM79.9997 23.3642C48.7035 23.3642 23.333 48.7347 23.333 80.0308C23.333 111.327 48.7035 136.698 79.9997 136.698C111.296 136.698 136.666 111.327 136.666 80.0308C136.666 48.7347 111.296 23.3642 79.9997 23.3642ZM79.9997 86.6667C88.284 86.6667 94.9997 93.3824 94.9997 101.667C94.9997 109.951 88.284 116.667 79.9997 116.667C71.7154 116.667 64.9997 109.951 64.9997 101.667C64.9997 93.3824 71.7154 86.6667 79.9997 86.6667ZM60.0027 58.3411C64.6024 58.3411 68.3313 62.0699 68.3313 66.6697C68.3313 71.2694 64.6024 74.9983 60.0027 74.9983C55.4029 74.9983 51.6741 71.2694 51.6741 66.6697C51.6741 62.0699 55.4029 58.3411 60.0027 58.3411ZM100.003 58.3411C104.602 58.3411 108.331 62.0699 108.331 66.6697C108.331 71.2694 104.602 74.9983 100.003 74.9983C95.4029 74.9983 91.6741 71.2694 91.6741 66.6697C91.6741 62.0699 95.4029 58.3411 100.003 58.3411Z",fill:"#D0D5DD"})))},F=(0,i.forwardRef)(P);var S=n(5044);const H=l.ZP.div`
  padding: 16px;
  background: #f9fafb;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 12px;
  width: 406px;
  > .head {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #344054;
    margin-bottom: 16px;
  }
  > .none {
    padding: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    .tip {
      width: 240px;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #475467;
    }
  }
  > .list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .pin {
      position: relative;
      border: 1px solid #f2f4f7;
      border-radius: var(--br);
      > .preview {
        background: none;
        .down img {
          width: 100% !important;
          height: auto !important;
        }
      }
      > .opts {
        visibility: hidden;
        display: flex;
        align-items: center;
        gap: 4px;
        position: absolute;
        top: 4px;
        right: 4px;
        padding: 4px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        .btn {
          display: flex;
          background: none;
          border: none;
          svg {
            width: 16px;
            height: 16px;
            path {
              fill-opacity: 1;
              fill: #667085;
            }
          }
        }
      }
      &:hover .opts {
        visibility: visible;
      }
    }
  }
`;function O(e){let{id:t}=e;const{pins:n,unpinMessage:i,canPin:a}=k(t),s=e=>{const{mid:t}=e.currentTarget.dataset;i(+t)},l=0==n.length;return(0,x.jsxs)(H,{children:[(0,x.jsxs)("h4",{className:"head",children:["Pinned Message(",n.length,")"]}),l?(0,x.jsxs)("div",{className:"none",children:[(0,x.jsx)(F,{}),(0,x.jsx)("div",{className:"tip",children:"This channel doesn\u2019t have any pinned message yet."})]}):(0,x.jsx)("ul",{className:"list",children:n.map((e=>{let{mid:t}=e;return(0,x.jsxs)("li",{className:"pin",children:[(0,x.jsx)(I,{mid:t}),(0,x.jsx)("div",{className:"opts",children:a&&(0,x.jsx)("button",{className:"btn","data-mid":t,onClick:s,children:(0,x.jsx)(S.Z,{})})})]},t)}))})]})}var z=n(4379),$=n(5664);const V=l.ZP.div`
  padding: 16px;
  background: #f9fafb;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 12px;
  min-width: 500px;
  max-height: 500px;
  overflow: auto;
  > .head {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #344054;
    margin-bottom: 16px;
  }
  > .none {
    padding: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    .tip {
      width: 240px;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #475467;
    }
  }
  > .list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .fav {
      position: relative;
      border: 1px solid #f2f4f7;
      border-radius: var(--br);
      .favorite {
        background: none;
        .down img {
          width: 100% !important;
          height: auto !important;
        }
      }
      > .opts {
        visibility: hidden;
        display: flex;
        align-items: center;
        gap: 4px;
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        .btn {
          display: flex;
          background: none;
          border: none;
          svg {
            width: 24px;
            height: 24px;
            path {
              fill: #667085;
              fill-opacity: 1;
            }
          }
        }
      }
      &:hover .opts {
        visibility: visible;
      }
    }
  }
`;function R(e){let{cid:t=null,uid:n=null}=e;const{favorites:i,removeFavorite:a}=(0,$.Z)({cid:t,uid:n}),s=e=>{const{id:t}=e.currentTarget.dataset;a(t)},l=0==i.length;return(0,x.jsxs)(V,{children:[(0,x.jsxs)("h4",{className:"head",children:["Saved Message(",i.length,")"]}),l?(0,x.jsxs)("div",{className:"none",children:[(0,x.jsx)(F,{}),(0,x.jsx)("div",{className:"tip",children:"This channel doesn\u2019t have any saved message yet."})]}):(0,x.jsx)("ul",{className:"list",children:i.map((e=>{let{id:t}=e;return(0,x.jsxs)("li",{className:"fav",children:[(0,x.jsx)(z.Z,{id:t}),(0,x.jsx)("div",{className:"opts",children:(0,x.jsx)("button",{className:"btn","data-id":t,onClick:s,children:(0,x.jsx)(S.Z,{})})})]},t)}))})]})}var T=n(5018),U=n(5564),B=n(6432);const A=e=>{const{pageNumber:t=1,pageSize:n=40,mids:i=[],isLast:a=!1}=e||{},s=i.slice(0);if(0==s.length)return{isFirst:!0,isLast:!0,pageCount:0,pageSize:n,pageNumber:1,ids:[]};s.sort(((e,t)=>Number(e)-Number(t)));const l=Math.ceil(s.length/n),r=a?l:t,o=-(l-r+1)*n,c=o+n,d=0==c?void 0:c;return{isFirst:1==r,isLast:r==l,pageCount:l,pageSize:n,pageNumber:r,ids:s.slice(o,d)}};let Y=0,G=0;function q(e){let{context:t="channel",id:n=null}=e;const[a]=(0,U.N2)(),[l]=(0,B.N2)(),r=(0,i.useRef)([]),o=(0,i.useRef)(null),c=(0,i.useRef)(null),[d,p]=(0,i.useState)(!0),[h,u]=(0,i.useState)([]),[x,f]=(0,i.useState)([]),m="channel"==t?a:l,{mids:g,messageData:v,loginUid:b}=(0,s.v9)((e=>({loginUid:e.authData.uid,mids:"channel"==t?e.channelMessage[n]||[]:e.userMessage.byId[n]||[],messageData:e.message})));(0,i.useEffect)((()=>{r.current=[],o.current=[],f([]),p(!0),u([])}),[t,n]),(0,i.useEffect)((()=>{if(x.length&&(c.current=document.querySelector(`#RUSTCHAT_FEED_${t}_${n}`),c.current)){const e=c.current.scrollHeight-c.current.clientHeight;c.current.scrollTop=Y+(e-G)}}),[x,t,n]),(0,i.useEffect)((()=>{const e=g.filter((e=>{const t=+new Date;return Math.abs(t-e)>1e4}));if(0==r.current.length&&e.length){const t=A({mids:e,isLast:!0});o.current=t,r.current=t.ids,f(r.current)}else{const[e]=r.current.slice(-1),n=g.slice(0).sort(((e,t)=>Number(e)-Number(t))).filter((t=>t>e));if(n.length){u(n);const[e]=n.slice(-1),i=c.current;if(i){var t;const n=b==(null===(t=v[e])||void 0===t?void 0:t.from_uid),a=i.scrollHeight-(i.offsetHeight+i.scrollTop);n?i.scrollTop=i.scrollHeight:a<=100&&setTimeout((()=>{i.scrollTop=i.scrollHeight}),100)}}}}),[g,v,b]);return{mids:g,appends:h,hasMore:d,pullUp:async()=>{const e=o.current;if(e&&e.isFirst){const[t]=e.ids,{data:i}=await m({mid:t,id:n});if(0==i.length)return void p(!1)}let t=null;if(e){const n=e.pageNumber-1;t=A({mids:g,pageNumber:n})}else t=A({mids:g,isLast:!0});o.current=t,r.current=[...t.ids,...r.current],setTimeout((()=>{f(r.current),p(1!==t.pageNumber);const e=c.current;e&&(Y=e.scrollTop,G=e.scrollHeight-e.clientHeight)}),e.isLast?10:800)},pullDown:()=>{},list:x}}var K=n(9269),W=n(4527),X=n(3989),J=n(5856),Q=n(3487),ee=n(6475),te=n(3247),ne=n(445),ie=n(5106);var ae=n(2867);const se=l.ZP.div`
  position: relative;
  background: #e5e7eb;
  border-radius: var(--br);
  width: 100%;
  width: -webkit-fill-available;
  &.markdown.fullscreen {
    margin-top: -35px;
  }
  .send_box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    padding: 14px 18px;
    &.markdown {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 0;
      .input {
        grid-column: span 2;
      }
    }
    &.reply {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    .input {
      width: 100%;
    }
  }
`,le=l.ZP.ul`
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  width: 100%;
  padding: 24px 16px 16px 16px;
  background: #e5e7eb;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  border-radius: 8px 8px 0px 0px;
  .file {
    position: relative;
    display: flex;
    flex-direction: column;

    background: #fcfcfd;
    border-radius: 4px;
    padding: 8px;
    .preview {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 160px;
      height: 160px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .name {
      width: 160px;
      margin: 16px 0 2px 0;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #1c1c1e;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .size {
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      color: #616161;
    }
    .opts {
      visibility: hidden;
      background: inherit;
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-sizing: border-box;
      border-radius: 6px;
      display: flex;
      align-items: center;
      position: absolute;
      right: -20px;
      top: -10px;
      .opt {
        padding: 4px;
        cursor: pointer;
      }
    }
    &:hover .opts {
      visibility: visible;
    }
  }
`;var re=n(5290),oe=n(2360),ce=n(6642),de=n(8168),pe=n(1735),he=n(1808);const ue=l.ZP.div`
  max-height: 50vh;
  overflow: auto;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #475467;
  > .box {
    display: flex;
    flex-direction: column;
    gap: 16px;
    p {
      padding: 0;
    }
  }
`,xe={editableProps:{spellCheck:!1,autoFocus:!0,placeholder:"Type\u2026"},trailingBlock:{type:ce.JBe},softBreak:{options:{rules:[{hotkey:"shift+enter",query:{allow:[ce.IVr,ce.JBe]}}]}},exitBreak:{options:{rules:[{hotkey:"mod+enter",query:{allow:[ce.IVr,ce.JBe]}}]}},selectOnBackspace:{options:{query:{allow:[ce.IVr]}}}};let fe=(0,ce.Ips)({});const me=[{type:ce.JBe,children:[{text:""}]}],ge=e=>{const t=(0,ce.CE7)(`rustchat_text_editor_${e}`);return{focus:()=>{t&&pe.F3.focus(t)},insertText:e=>{t&&(pe.F3.focus(t),t.insertText(e))}}},ve=e=>{let{updateDraft:t=null,initialValue:n=me,id:a="",placeholder:l="Write some markdown...",sendMessages:r,members:o=[]}=e;const[c,d]=a.split("_"),{addStageFile:p}=(0,he.Z)({context:c,id:d}),h=o.length>0,u=(0,s.v9)((e=>e.contacts.byId)),[f,m]=(0,i.useState)([]),[g,v]=(0,i.useState)(!1),b=(0,i.useRef)(null),C={...xe.editableProps,className:"box",placeholder:l},w=(0,ce.CE7)(`rustchat_text_editor_${a}`);(0,i.useEffect)((()=>{const e=e=>{const t=[...e.clipboardData.files];if(t.length){const e=t.map((e=>{const{size:t,type:n,name:i}=e;return{size:t,type:n,name:i,url:URL.createObjectURL(e)}})),[n,i]=a.split("_");p(e)}};return window.addEventListener("paste",e),()=>{window.removeEventListener("paste",e)}}),[a,t]),(0,re.z)("Enter",(e=>{if((0,ce.kGl)(w)||e.shiftKey||e.ctrlKey||e.altKey||e.isComposing)return!0;e.preventDefault(),r(f),oe.YR.delete(w,{at:{anchor:oe.ML.start(w,[]),focus:oe.ML.end(w,[])}})}),{target:b,when:!g}),(0,re.z)([91,93],(e=>{v("keydown"==e.type)}),{eventTypes:["keydown","keyup"],target:b});const j=[(0,ce.ZZF)(),(0,ce.kdp)(),(0,ce.kjx)(xe.softBreak),(0,ce.AFf)(xe.trailingBlock),(0,ce.z$X)(xe.exitBreak)],y=(0,ce.ZUk)(h?j.concat([(0,de.kQ)(),(0,ce.MoH)({options:{createMentionNode:e=>{const{text:t,data:{uid:n}}=e;return{value:`@${t}`,uid:n}},insertSpaceAfterMention:!0}})]):j,{components:fe}),Z=(0,i.useCallback)((async e=>{const t=[],n=e=>{const t=[];return{value:e.map((e=>{let{type:n,text:i,uid:a}=e;return"mention"==n?(t.push(a),` @${a} `):i})).join(""),mentions:t}};for(const a of e){const{value:e,mentions:i}=n(a.children),s=t[t.length-1];s&&Array.isArray(s)?t[t.length-1].push({type:"text",content:e,properties:{mentions:i}}):t.push([{type:"text",content:e,properties:{mentions:i}}])}const i=t.map((e=>Array.isArray(e)?{type:"text",content:e.map((e=>e.content)).join("\n"),properties:{mentions:e.map((e=>{var t;return(null===(t=e.properties)||void 0===t?void 0:t.mentions)||[]})).flat()}}:e)).filter((e=>{let{content:t}=e;return!!t}));m(i)}),[f]);return(0,x.jsx)(ue,{className:"input",ref:b,children:(0,x.jsx)(ce.hv7,{id:`rustchat_text_editor_${a}`,onChange:Z,editableProps:{...C,style:{userSelect:"text"}},initialValue:n,plugins:y,children:h?(0,x.jsx)(ce.bEm,{onRenderItem:e=>{let{item:t}=e;return(0,x.jsx)(W.Z,{uid:t.data.uid,interactive:!1},t.data.uid)},items:o.map((e=>{const t=u[e];if(!t)return null;const{uid:n,name:i,...a}=t;return{key:n,text:i,data:{uid:n,...a}}}))}):null})})};var be=n(5607),Ce=n(1296),we=n(8648);const je=l.ZP.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 12px;
  padding: 16px;
  width: 406px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: #344054;
    width: 100%;
    .close {
      cursor: pointer;
    }
  }
  .input {
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    label {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #475467;
    }
  }
  .btns {
    margin-top: 32px;
    gap: 16px;
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
`;function ye(e){let{name:t,closeModal:n,updateName:a}=e;const[s,l]=(0,i.useState)(t);return(0,x.jsx)(be.Z,{children:(0,x.jsxs)(je,{children:[(0,x.jsxs)("h4",{className:"title",children:["File Details ",(0,x.jsx)(S.Z,{className:"close",onClick:n})]}),(0,x.jsxs)("div",{className:"input",children:[(0,x.jsx)("label",{htmlFor:"name",children:"Name"}),(0,x.jsx)(we.Z,{id:"name",value:s,onChange:e=>{l(e.target.value)}})]}),(0,x.jsxs)("div",{className:"btns",children:[(0,x.jsx)(Ce.Z,{className:"ghost cancel",onClick:n,children:"Cancel"}),(0,x.jsx)(Ce.Z,{onClick:()=>{a(s),n()},children:"Save Changes"})]})]})})}var Ze,ke=n(4711);function Me(){return Me=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},Me.apply(this,arguments)}const Ne=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",Me({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,Ze||(Ze=i.createElement("path",{d:"M13.7036 5.75927L18.2405 10.2962L9.33146 19.2052C9.08325 19.4534 8.77457 19.6325 8.43593 19.7249L3.84998 20.9756C3.34808 21.1124 2.88755 20.6519 3.02443 20.15L4.27515 15.5641C4.3675 15.2254 4.54664 14.9167 4.79484 14.6685L13.7036 5.75927ZM20.0604 3.93956C21.3132 5.19232 21.3132 7.22343 20.0604 8.47618L19.1907 9.34506L14.6538 4.80903L15.5238 3.93956C16.7766 2.68681 18.8077 2.68681 20.0604 3.93956Z",fill:"#616161"})))},Ee=(0,i.forwardRef)(Ne);var _e;function De(){return De=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},De.apply(this,arguments)}const Ie=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",De({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,_e||(_e=i.createElement("path",{d:"M12 3.25C13.4346 3.25 14.6126 4.34848 14.7388 5.75019L19 5.75C19.4142 5.75 19.75 6.08579 19.75 6.5C19.75 6.8797 19.4678 7.19349 19.1018 7.24315L19 7.25H18.417L17.1499 18.2292C17.0335 19.2384 16.179 20 15.1631 20H8.83688C7.821 20 6.9665 19.2384 6.85006 18.2292L5.582 7.25H5C4.6203 7.25 4.30651 6.96785 4.25685 6.60177L4.25 6.5C4.25 6.1203 4.53215 5.80651 4.89823 5.75685L5 5.75L9.26119 5.75019C9.38741 4.34848 10.5654 3.25 12 3.25ZM10.5 9.5C10.2545 9.5 10.0504 9.65477 10.0081 9.85886L10 9.9375V16.0625L10.0081 16.1411C10.0504 16.3452 10.2545 16.5 10.5 16.5C10.7455 16.5 10.9496 16.3452 10.9919 16.1411L11 16.0625V9.9375L10.9919 9.85886C10.9496 9.65477 10.7455 9.5 10.5 9.5ZM13.5 9.5C13.2545 9.5 13.0504 9.65477 13.0081 9.85886L13 9.9375V16.0625L13.0081 16.1411C13.0504 16.3452 13.2545 16.5 13.5 16.5C13.7455 16.5 13.9496 16.3452 13.9919 16.1411L14 16.0625V9.9375L13.9919 9.85886C13.9496 9.65477 13.7455 9.5 13.5 9.5ZM12 4.75C11.3952 4.75 10.8908 5.17947 10.775 5.75005H13.225C13.1092 5.17947 12.6048 4.75 12 4.75Z",fill:"#D92D20"})))},Le=(0,i.forwardRef)(Ie);function Pe(e){let{context:t="",id:n=null}=e;const a=ge(`${t}_${n}`),[s,l]=(0,i.useState)(null),{stageFiles:r,updateStageFile:o,removeStageFile:c}=(0,he.Z)({context:t,id:n}),d=e=>{l((t=>t?null:e))},p=e=>{const t=r[e];t&&d({...t,index:e})};return(0,i.useEffect)((()=>{a.focus()}),[r.length]),t&&n&&r&&0!=r.length?(0,x.jsxs)(x.Fragment,{children:[s&&(0,x.jsx)(ye,{name:s.name,updateName:e=>{if(!e)return;const{index:t}=s;o(t,{name:e})},closeModal:d}),(0,x.jsx)(le,{children:r.map(((e,t)=>{let{name:n,url:i,size:a,type:s}=e;return(0,x.jsxs)("li",{className:"file",children:[(0,x.jsx)("div",{className:"preview",children:s.startsWith("image")?(0,x.jsx)("img",{src:i,alt:"image"}):(0,ke.LP)(s,n)}),(0,x.jsx)("h4",{className:"name",children:n}),(0,x.jsx)("span",{className:"size",children:(0,ke.td)(a)}),(0,x.jsxs)("ul",{className:"opts",children:[(0,x.jsx)("li",{className:"opt edit",onClick:p.bind(null,t),children:(0,x.jsx)(Ee,{})}),(0,x.jsx)("li",{className:"opt delete","data-index":t,onClick:c.bind(null,t),children:(0,x.jsx)(Le,{})})]})]},i)}))})]}):null}var Fe=n(7560),Se=n.n(Fe),He=n(780),Oe=n(9083);const ze=n.p+"static/media/close.circle.bb5cd1b0a0d236c81125.svg",$e=n.p+"static/media/picture.57a395fb7f41e8e3c5d1.svg",Ve=l.ZP.div`
  background-color: #f3f4f6;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
  padding: 12px 16px;
  .prefix {
    white-space: nowrap;
    color: #667085;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    em {
      font-weight: bold;
      color: #363f53;
    }
  }
  .content {
    white-space: normal;
    color: #616161;
    overflow: hidden;
    padding-right: 30px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    > .pic {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
    .md {
      position: relative;
      max-height: 100px;
      overflow: hidden;
      &:after {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        content: "";
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 63.54%, #f3f4f6 93.09%);
      }
    }
    .icon {
      width: 15px;
      height: 20px;
    }
    .name {
      margin-left: 5px;
      font-size: 10px;
      color: #555;
    }
  }
  .close {
    background: none;
    position: absolute;
    top: 16px;
    right: 16px;
    /* transform: translateY(-50%); */
  }
`,Re=e=>{const{content_type:t,content:n,thumbnail:i="",properties:a}=e;let s=null;switch(t){case ae.bT.text:s=Se()(n,/(\s{1}@[0-9]+\s{1})/g,((e,t)=>{const n=e.trim().slice(1);return(0,x.jsx)(He.Z,{popover:!1,uid:n},t)}));break;case ae.bT.markdown:s=(0,x.jsx)("div",{className:"md",children:(0,x.jsx)(Oe.Z,{content:n})});break;case ae.bT.file:{const{content_type:e,name:t,size:n}=a;if((0,ke.Or)(e,n))s=(0,x.jsx)("img",{className:"pic",src:i||$e});else{const n=(0,ke.LP)(e,t);s=(0,x.jsxs)(x.Fragment,{children:[n,(0,x.jsx)("span",{className:"name",children:t})]})}}}return s};function Te(e){let{context:t,id:n,mid:i}=e;const{removeReplying:a}=(0,ee.Z)({to:n,context:t}),{msg:l,contactsData:r}=(0,s.v9)((e=>({contactsData:e.contacts.byId,msg:e.message[i]})));if(!l)return null;const{from_uid:o}=l,c=r[o];return(0,x.jsxs)(Ve,{className:"reply",children:[(0,x.jsxs)("div",{className:"prefix",children:["Replying to ",(0,x.jsx)("em",{children:null===c||void 0===c?void 0:c.name})]}),(0,x.jsx)("div",{className:"content",children:Re(l)}),(0,x.jsx)("button",{className:"close",onClick:()=>{a()},children:(0,x.jsx)("img",{src:ze,alt:"close icon"})})]})}var Ue;function Be(){return Be=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},Be.apply(this,arguments)}const Ae=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",Be({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,Ue||(Ue=i.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z",fill:"#667085"})))},Ye=(0,i.forwardRef)(Ae);var Ge;function qe(){return qe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},qe.apply(this,arguments)}const Ke=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",qe({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,Ge||(Ge=i.createElement("path",{d:"M3 2H21C21.2652 2 21.5196 2.11706 21.7071 2.32544C21.8946 2.53381 22 2.81643 22 3.11111V20.8889C22 21.1836 21.8946 21.4662 21.7071 21.6746C21.5196 21.8829 21.2652 22 21 22H3C2.73478 22 2.48043 21.8829 2.29289 21.6746C2.10536 21.4662 2 21.1836 2 20.8889V3.11111C2 2.81643 2.10536 2.53381 2.29289 2.32544C2.48043 2.11706 2.73478 2 3 2ZM7 15.8889V11.4444L9 13.6667L11 11.4444V15.8889H13V8.11111H11L9 10.3333L7 8.11111H5V15.8889H7ZM18 12.5556V8.11111H16V12.5556H14L17 15.8889L20 12.5556H18Z",fill:"#667085"})))},We=(0,i.forwardRef)(Ke);var Xe;function Je(){return Je=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},Je.apply(this,arguments)}const Qe=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",Je({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,Xe||(Xe=i.createElement("path",{d:"M5 6C5 5.44772 5.44772 5 6 5H8C8.55228 5 9 4.55228 9 4C9 3.44772 8.55228 3 8 3H6C4.34315 3 3 4.34315 3 6V8C3 8.55228 3.44772 9 4 9C4.55228 9 5 8.55228 5 8V6ZM5 18C5 18.5523 5.44772 19 6 19H8C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21H6C4.34315 21 3 19.6569 3 18V16C3 15.4477 3.44772 15 4 15C4.55228 15 5 15.4477 5 16V18ZM18 5C18.5523 5 19 5.44772 19 6V8C19 8.55228 19.4477 9 20 9C20.5523 9 21 8.55228 21 8V6C21 4.34315 19.6569 3 18 3H16C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5H18ZM19 18C19 18.5523 18.5523 19 18 19H16C15.4477 19 15 19.4477 15 20C15 20.5523 15.4477 21 16 21H18C19.6569 21 21 19.6569 21 18V16C21 15.4477 20.5523 15 20 15C19.4477 15 19 15.4477 19 16V18Z",fill:"#667085"})))},et=(0,i.forwardRef)(Qe);var tt;function nt(){return nt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},nt.apply(this,arguments)}const it=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",nt({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,tt||(tt=i.createElement("path",{d:"M9 4C9 3.44772 8.55228 3 8 3C7.44772 3 7 3.44772 7 4V6.5C7 6.77614 6.77614 7 6.5 7H4C3.44772 7 3 7.44772 3 8C3 8.55228 3.44772 9 4 9H6.5C7.88071 9 9 7.88071 9 6.5V4ZM9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20V17.5C7 17.2239 6.77614 17 6.5 17H4C3.44772 17 3 16.5523 3 16C3 15.4477 3.44772 15 4 15H6.5C7.88071 15 9 16.1193 9 17.5V20ZM16 3C15.4477 3 15 3.44772 15 4V6.5C15 7.88071 16.1193 9 17.5 9H20C20.5523 9 21 8.55228 21 8C21 7.44772 20.5523 7 20 7H17.5C17.2239 7 17 6.77614 17 6.5V4C17 3.44772 16.5523 3 16 3ZM15 20C15 20.5523 15.4477 21 16 21C16.5523 21 17 20.5523 17 20V17.5C17 17.2239 17.2239 17 17.5 17H20C20.5523 17 21 16.5523 21 16C21 15.4477 20.5523 15 20 15H17.5C16.1193 15 15 16.1193 15 17.5V20Z",fill:"#667085"})))},at=(0,i.forwardRef)(it),st=l.ZP.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  &.markdown .add {
    display: none;
  }
  .md {
    cursor: pointer;
    display: flex;
    gap: 14px;
    .markdown path {
      fill: #22ccee;
    }
  }
  .add {
    cursor: pointer;
    position: relative;
    width: 24px;
    height: 24px;
    label {
      opacity: 0;
      cursor: pointer;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      input {
        display: none;
      }
    }
  }
`;function lt(e){let{toggleMarkdownFullscreen:t,fullscreen:n,toggleMode:a,mode:s,to:l,context:r}=e;const{addStageFile:o}=(0,he.Z)({context:r,id:l}),c=(0,i.useRef)(null);return(0,x.jsxs)(st,{className:s,children:[(0,x.jsxs)("div",{className:"md",children:[(0,x.jsx)(p.Z,{placement:"top",tip:"Markdown",children:(0,x.jsx)(We,{className:s,onClick:a})}),"markdown"==s&&(n?(0,x.jsx)(p.Z,{placement:"top",tip:"Exit Fullscreen",children:(0,x.jsx)(at,{onClick:t})}):(0,x.jsx)(p.Z,{placement:"top",tip:"Fullscreen",children:(0,x.jsx)(et,{onClick:t})}))]}),(0,x.jsx)(p.Z,{placement:"top",tip:"Upload",children:(0,x.jsxs)("div",{className:"add",children:[(0,x.jsx)(Ye,{}),(0,x.jsx)("label",{htmlFor:"file",children:(0,x.jsx)("input",{size:24,ref:c,multiple:!0,onChange:e=>{const t=[...e.target.files].map((e=>{const{size:t,type:n,name:i}=e;return{size:t,type:n,name:i,url:URL.createObjectURL(e)}}));o(t),c.current.value=null,c.current.value=""},type:"file",name:"file",id:"file"})})]})})]})}var rt=n(8570),ot=(n(2830),n(5666));const ct=l.ZP.div`
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 12px;
  /* height: 358px;
  overflow: hidden; */
  .emoji-mart {
    border: none;
    border-radius: 12px;
  }
  .emoji-mart-emoji {
    cursor: pointer;
    span {
      cursor: inherit;
    }
  }
`;function dt(e){let{onSelect:t,...n}=e;const[a,s]=(0,i.useState)(!1);return(0,i.useEffect)((()=>{const e=setTimeout((()=>{s(!0)}),500);return()=>{clearTimeout(e)}}),[]),(0,x.jsx)(ct,{children:a?(0,x.jsx)(ot.cW,{perLine:10,emojiSize:24,emojiTooltip:!0,showSkinTones:!1,onSelect:t,...n}):null})}var pt,ht,ut,xt,ft;function mt(){return mt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},mt.apply(this,arguments)}const gt=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",mt({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,pt||(pt=i.createElement("path",{d:"M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z",fill:"#FFCC4D"})),ht||(ht=i.createElement("path",{d:"M7.99997 9.33326C6.38975 9.33326 5.32131 9.1457 3.99997 8.88881C3.6982 8.83059 3.11108 8.88881 3.11108 9.7777C3.11108 11.5555 5.15331 13.7777 7.99997 13.7777C10.8462 13.7777 12.8889 11.5555 12.8889 9.7777C12.8889 8.88881 12.3018 8.83015 12 8.88881C10.6786 9.1457 9.6102 9.33326 7.99997 9.33326Z",fill:"#664500"})),ut||(ut=i.createElement("path",{d:"M4 9.77783C4 9.77783 5.33333 10.2223 8 10.2223C10.6667 10.2223 12 9.77783 12 9.77783C12 9.77783 11.1111 11.5556 8 11.5556C4.88889 11.5556 4 9.77783 4 9.77783Z",fill:"white"})),xt||(xt=i.createElement("path",{d:"M5.33328 7.55545C5.94693 7.55545 6.44439 6.859 6.44439 5.99989C6.44439 5.14078 5.94693 4.44434 5.33328 4.44434C4.71963 4.44434 4.22217 5.14078 4.22217 5.99989C4.22217 6.859 4.71963 7.55545 5.33328 7.55545Z",fill:"#664500"})),ft||(ft=i.createElement("path",{d:"M10.6668 7.55545C11.2804 7.55545 11.7779 6.859 11.7779 5.99989C11.7779 5.14078 11.2804 4.44434 10.6668 4.44434C10.0531 4.44434 9.55566 5.14078 9.55566 5.99989C9.55566 6.859 10.0531 7.55545 10.6668 7.55545Z",fill:"#664500"})))},vt=(0,i.forwardRef)(gt),bt=l.ZP.div`
  position: relative;
  width: fit-content;
  display: flex;
  align-items: center;
  > .emoji {
    cursor: pointer;
  }
  > svg {
    width: 22px;
    height: 22px;
  }
  > .picker {
    visibility: hidden;
    position: absolute;
    top: -20px;
    left: -20px;
    transform: translateY(-100%);
    &.visible {
      visibility: visible;
    }
  }
`;function Ct(e){let{selectEmoji:t}=e;const n=(0,i.useRef)(),[a,s]=(0,i.useState)(!1);return(0,rt.O)(n,(e=>{const t=e.target;"svg"==t.nodeName&&"toggler"==t.dataset.emoji||"path"==t.nodeName&&"toggler"==t.parentElement.dataset.emoji||s(!1)}),a),(0,x.jsx)(p.Z,{placement:"top",tip:"Emojis",disabled:a,children:(0,x.jsxs)(bt,{children:[(0,x.jsx)("div",{ref:n,className:"picker "+(a?"visible":""),children:(0,x.jsx)(dt,{onSelect:e=>{t(e.native)}})}),(0,x.jsx)(vt,{"data-emoji":"toggler",className:"emoji",onClick:()=>{s((e=>!e))}})]})})}n(5001);var wt=n(7072),jt=(n(6081),n(5185),n(4334)),yt=n.n(jt);const Zt=l.ZP.div`
  position: relative;
  width: 100%;
  width: -webkit-fill-available;
  margin-top: 16px;
  > div {
    transition: height 0.5s ease 0s;
  }
  .toastui-editor-defaultUI {
    border-bottom: none;
    border-radius: 0;
    border-top: 1px solid #d0d5dd;
    border-left: none;
    border-right: none;
  }
  .toastui-editor {
    padding: 16px 0;
    [contenteditable="true"] {
      padding: 0;
    }
  }
  .toastui-editor-md-preview {
    padding-top: 16px;
    .toastui-editor-contents {
      padding: 0;
    }
  }
  .toastui-editor-toolbar {
    display: none;
  }
  .send {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
`;const kt=function(e){let{updateDraft:t=null,initialValue:n="",height:a="50vh",placeholder:s,sendMarkdown:l,setEditorInstance:r}=e;const o=(0,i.useRef)(void 0),{uploadFile:c}=(0,he.Z)();return(0,i.useEffect)((()=>{const e=null===o||void 0===o?void 0:o.current;if(e){const t=e.getInstance();t.removeHook("addImageBlobHook"),t.addHook("addImageBlobHook",(async(e,t)=>{const{thumbnail:n=""}=await c(e);t(n)})),r(t)}return()=>{if(e){const n=e.getInstance(),i=n.getMarkdown();t&&t(i),n.destroy()}}}),[]),(0,x.jsxs)(Zt,{className:"input",children:[(0,x.jsx)(wt.M,{initialValue:n,plugins:[yt()],placeholder:s,ref:o,toolbarItems:[],hideModeSwitch:!0,previewStyle:"vertical",height:a,initialEditType:"markdown",useCommandShortcut:!0}),(0,x.jsx)(Ce.Z,{className:"send small",onClick:()=>{const e=o.current.getInstance();e.getMarkdown().trim()&&(l(e.getMarkdown()),e.reset())},children:"Send"})]})};const Mt="text",Nt="markdown";const Et=function(e){var t,n,a,l;let{context:r="channel",id:o=""}=e;const{resetStageFiles:c}=(0,he.Z)({context:r,id:o}),{getDraft:d,getUpdateDraft:p}=function(e){let{context:t="",id:n=""}=e;const i=(0,s.I0)(),a=`${t}_${n}`,{draftMarkdown:l,draftMixedText:r}=(0,s.v9)((e=>({draftMarkdown:e.ui.draftMarkdown,draftMixedText:e.ui.draftMixedText})));return{getDraft:function(){return"mixed"==(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"mixed")?r[a]:l[a]},getUpdateDraft:function(){const e="mixed"==(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"mixed")?T.$K:T.Ul;return t=>{i(e({key:a,value:t}))}}}}({context:r,id:o}),h=ge(`${r}_${o}`),[u,f]=(0,i.useState)(null),[m,g]=(0,i.useState)(!1),v=(0,s.I0)(),b=function(e){let{context:t,to:n}=e;const i=(0,s.I0)(),a="channel"==t?ne.p_:ie.ZK;return e=>{i((0,te.Hz)(e)),i(a({id:n,mid:e.mid}))}}({context:r,to:o}),{from_uid:C,replying_mid:w=null,mode:j,uploadFiles:y,channelsData:Z,contactsData:k,uids:M}=(0,s.v9)((e=>({channelsData:e.channels.byId,uids:e.contacts.ids,contactsData:e.contacts.byId,mode:e.ui.inputMode,from_uid:e.authData.uid,replying_mid:e.message.replying[`${r}_${o}`],uploadFiles:e.ui.uploadFiles[`${r}_${o}`]}))),{sendMessage:N}=(0,ee.Z)({context:r,from:C,to:o});(0,i.useEffect)((()=>{w&&h.focus()}),[w]);const E="channel"==r?null===(t=Z[o])||void 0===t?void 0:t.name:null===(n=k[o])||void 0===n?void 0:n.name,_=`Send to ${ae.bI[r]}${E} `,D="channel"==r?null!==(a=Z[o])&&void 0!==a&&a.is_public?M:null===(l=Z[o])||void 0===l?void 0:l.members:[];return(0,x.jsxs)(se,{className:`send ${j} ${m?"fullscreen":""} ${w?"reply":""} ${r}`,children:[w&&(0,x.jsx)(Te,{context:r,mid:w,id:o}),j==Mt&&(0,x.jsx)(Pe,{context:r,id:o}),(0,x.jsxs)("div",{className:`send_box ${j}`,children:[(0,x.jsx)(Ct,{selectEmoji:e=>{j==Nt&&u?u.insertText(e):h.insertText(e)}}),j==Mt&&(0,x.jsx)(ve,{updateDraft:p(),initialValue:d(),members:D,id:`${r}_${o}`,placeholder:_,sendMessages:async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(o){if(e&&e.length)for await(const n of e){var t;const{type:e,content:i,properties:a={}}=n;a.local_id=null!==(t=a.local_id)&&void 0!==t?t:+new Date,await N({id:o,reply_mid:w,type:e,content:i,from_uid:C,properties:a})}y&&0!==y.length&&(y.forEach((e=>{const t=+new Date,{url:n,name:i,size:a,type:s}=e,l={mid:t,content:n,content_type:ae.bT.file,created_at:t,properties:{content_type:s,name:i,size:a,local_id:t},from_uid:C,sending:!0};b(l)})),c())}}}),(0,x.jsx)(lt,{context:r,to:o,mode:j,toggleMode:()=>{v((0,T.XH)(j==Mt?Nt:Mt))},fullscreen:m,toggleMarkdownFullscreen:()=>{g((e=>!e))}}),j==Nt&&(0,x.jsx)(kt,{updateDraft:p("markdown"),initialValue:d("markdown"),height:m?"calc(100vh - 168px)":"30vh",placeholder:_,setEditorInstance:f,sendMarkdown:async e=>{N({id:o,reply_mid:w,type:"markdown",content:e,from_uid:C,properties:{local_id:+new Date}})}})]})]})},_t=l.ZP.article`
  position: relative;
  width: 100%;
  background: #fff;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  > .head {
    box-sizing: border-box;
    height: 56px;
    padding: 0 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  > .main {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    > .chat {
      border-bottom-right-radius: 16px;
      width: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      padding: 0;
      height: calc(100vh - 56px - 18px);
      > .send {
        padding: 0 16px 16px 16px;
        &.selecting {
          padding: 0;
          > .send {
            display: none;
          }
        }
      }
    }
    .members {
      box-shadow: inset 0px 10px 2px -10px rgba(0, 0, 0, 0.1);
    }
    > .aside {
      padding: 12px;
      position: absolute;
      right: 0;
      top: -56px;
      transform: translateX(100%);
      display: flex;
      flex-direction: column;
      .divider {
        border: none;
        background-color: #d4d4d4;
        width: 16px;
        height: 1px;
        margin: 18px auto;
      }
      .tools,
      .apps {
        display: flex;
        flex-direction: column;
      }
      .tools {
        gap: 24px;
        .tool {
          position: relative;
          cursor: pointer;
          &.fav svg path {
            fill: #70707b;
          }
          &.active svg path {
            fill: #3f3f46;
          }
          &:not(.active):hover svg path {
            fill: #51525c;
          }
          &.badge:after {
            position: absolute;
            top: -8px;
            right: -8px;
            content: attr(data-count);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 16px;
            height: 16px;

            border-radius: 50%;
            background-color: #22ccee;
            color: #fff;
            font-weight: 900;
            font-size: 10px;
            line-height: 10px;
            text-align: center;
            color: #ffffff;
          }
        }
      }
      .apps {
        gap: 15px;
      }
    }
  }
  .drag_tip {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    /* pointer-events: none; */
    &.visible {
      visibility: visible;
    }
    .box {
      padding: 16px;
      filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
      border-radius: 8px;
      background: #52edff;
      .inner {
        padding: 16px;
        padding-top: 64px;
        border: 2px dashed #a5f3fc;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        .head {
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
        }
        .intro {
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
`;function Dt(){const[e,t]=(0,i.useState)(!1),{loginUser:n,messageData:a}=(0,s.v9)((e=>({messageData:e.message,loginUser:e.contacts.byId[e.authData.uid]}))),[l]=(0,Z.Pq)();return{canDelete:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!(!e||0==e.length)&&(!!n.is_admin||e.every((e=>{var t;return(null===(t=a[e])||void 0===t?void 0:t.from_uid)==n.uid})))},isDeleting:e,deleteMessage:async e=>{if(!e)return;const n=Array.isArray(e)?e:[e];t(!0);for await(const t of n)await l(t);t(!1)}}}var It=n(7275),Lt=n(3812),Pt=n(9930);const Ft=l.ZP.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  user-select: none;
  &.compact {
    padding: 0;
  }
  &.interactive {
    &:hover,
    &.active {
      background: rgba(116, 127, 141, 0.1);
    }
  }
  .avatar {
    cursor: pointer;
    width: ${e=>{let{size:t}=e;return`${t}px`}};
    height: ${e=>{let{size:t}=e;return`${t}px`}};
    position: relative;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .name {
    /* user-select: text; */
    display: flex;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #52525b;
    .txt {
      max-width: 140px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;function St(e){let{interactive:t=!0,id:n="",compact:i=!1,avatarSize:a=32}=e;const{channel:l,totalMemberCount:r}=(0,s.v9)((e=>({channel:e.channels.byId[n],totalMemberCount:e.contacts.ids.length})));if(!l)return null;const{name:o,members:c=[],is_public:d,avatar:p}=l;return(0,x.jsxs)(Ft,{size:a,className:`${t?"interactive":""} ${i?"compact":""}`,children:[(0,x.jsx)("div",{className:"avatar",children:(0,x.jsx)(b.Z,{type:"channel",url:p,name:"#",alt:"avatar"})}),!i&&(0,x.jsxs)("div",{className:"name",children:[(0,x.jsx)("span",{className:"txt",children:o})," (",d?r:c.length,")"]})]})}const Ht=l.ZP.div`
  display: flex;
  align-items: flex-start;
  padding: 8px;
  background: #e5e7eb;
  border-radius: var(--br);
  gap: 8px;
  margin-bottom: 4px;
  &.clickable {
    cursor: pointer;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    .avatar {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
    .name {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #06b6d4;
    }
  }
  .content {
    overflow: hidden;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #616161;
    display: flex;
    align-items: center;
    .txt {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      word-break: break-all;
    }
    .md {
      position: relative;
      max-height: 152px;
      overflow: hidden;
      &:after {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        content: "";
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 63.54%, #e5e7eb 93.09%);
      }
    }
    .pic {
      display: inherit;
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
    .icon {
      width: 15px;
      height: 20px;
    }
    .file_name {
      margin-left: 5px;
      font-size: 10px;
      color: #555;
    }
  }
  /* padding-left: 10px; */
`,Ot=e=>{const{content_type:t,content:n,thumbnail:i,properties:a}=e;let s=null;switch(t){case ae.bT.text:s=(0,x.jsx)("span",{className:"txt",children:Se()(n,/(\s{1}\@[0-9]+\s{1})/g,((e,t)=>{const n=e.trim().slice(1);return(0,x.jsx)(He.Z,{uid:n,popover:!1},t)}))});break;case ae.bT.markdown:s=(0,x.jsx)("div",{className:"md",children:(0,x.jsx)(Oe.Z,{content:n})});break;case ae.bT.file:{const{content_type:e,name:t,size:n}=a,l=(0,ke.LP)(e,t);s=(0,ke.Or)(e,n)?(0,x.jsx)("img",{className:"pic",src:i}):(0,x.jsxs)(x.Fragment,{children:[l,(0,x.jsx)("span",{className:"file_name",children:t})]})}}return s},zt=e=>{let{mid:t,interactive:n=!0}=e;const{data:i,users:a}=(0,s.v9)((e=>({data:e.message[t],users:e.contacts.byId})));if(!i)return null;const l=a[i.from_uid];return l?(0,x.jsxs)(Ht,{"data-mid":t,className:"reply "+(n?"clickable":""),onClick:n?e=>{const{mid:t}=e.currentTarget.dataset,n=document.querySelector(`[data-msg-mid='${t}']`);n&&(n.dataset.highlight=!0,n.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout((()=>{n.dataset.highlight=!1}),3e3))}:null,children:[(0,x.jsxs)("div",{className:"user",children:[(0,x.jsx)(b.Z,{className:"avatar",url:l.avatar,name:l.name}),(0,x.jsx)("span",{className:"name",children:l.name})]}),(0,x.jsx)("div",{className:"content",children:Ot(i)})]},t):null},$t=i.memo(zt,((e,t)=>e.mid==t.mid)),Vt=l.ZP.div`
  display: flex;
  /* max-width: 604px; */
  max-height: 514px;
  min-height: 400px;
  background: #fff;
  box-shadow: 0px 25px 50px rgba(31, 41, 55, 0.25);
  border-radius: var(--br);
  transition: all 0.5s ease;
  overflow: hidden;
  .left {
    width: 276px;
    /* height: 100%; */
    box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.1);
    overflow-y: scroll;
    .search {
      position: sticky;
      top: 0;
      z-index: 99;
      background: #fff;
      box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
      padding: 16px;
      width: calc(100% - 1px);
      input {
        outline: none;
        width: -webkit-fill-available;
        padding: 10px 8px;
        font-size: 14px;
        line-height: 20px;
        background: rgba(0, 0, 0, 0.08);
        border-radius: var(--br);
      }
    }
    .users {
      display: flex;
      flex-direction: column;
      /* height: 260px; */
      padding-bottom: 20px;
      /* overflow-y: scroll; */
      .user {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0 16px;
        /* margin: 0 4px; */
        width: -webkit-fill-available;
        border-radius: 4px;
        &:hover {
          background: rgba(116, 127, 141, 0.1);
        }
        > div {
          width: 100%;
        }
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* height: 100%; */
    /* justify-content: space-between; */
    padding: 16px;
    box-sizing: border-box;
    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #344054;
      margin-bottom: 16px;
    }
    .selected {
      width: 100%;
      height: 260px;
      padding: 10px 0;
      overflow: scroll;
      .item {
        position: relative;
        .remove {
          cursor: pointer;
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .msgs {
      border-radius: var(--br);
      padding: 8px;
      max-height: 200px;
      overflow: auto;
      background-color: #f4f4f5;
      width: 280px;
      margin-bottom: 4px;
      > .reply {
        background: none;
      }
    }
    .input {
      margin-bottom: 32px;
    }
    .btns {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
    }
  }
`;var Rt=n(8009),Tt=n(8501),Ut=n(6284),Bt=n(3657);function At(e){let{mids:t,closeModal:n}=e;const[a,s]=(0,i.useState)(""),{sendMessages:l}=(0,ee.Z)(),{forwardMessage:r,forwarding:o}=function(){const[e,t]=(0,i.useState)(!1),[n,{isError:a,isLoading:s,isSuccess:l}]=(0,Z.hE)(),[r,{isLoading:o,isSuccess:c,isError:d}]=(0,U.R4)(),[p,{isLoading:h,isSuccess:u,isError:x}]=(0,B.bm)();return{forwardMessage:async e=>{let{mids:i=[],users:a=[],channels:s=[]}=e;t(!0);const{data:l}=await n(i);if(a.length)for await(const t of a)await p({type:"archive",id:t,content:l});if(s.length)for await(const t of s)await r({type:"archive",id:t,content:l});t(!1)},forwarding:e,isError:d||x||a,isSending:h||o||s,isSuccess:c||u||l}}(),[c,d]=(0,i.useState)([]),[p,h]=(0,i.useState)([]),{channels:u,updateInput:f}=(0,Rt.Z)(),{contacts:m,input:g,updateInput:v}=(0,Tt.Z)(),b=e=>{let{currentTarget:t}=e;const{id:n,type:i="user"}=t.dataset,a="user"==i?c:p;("user"==i?d:h)(a.includes(+n)?a.filter((e=>e!=n)):[...a,+n])},C=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"user";"user"==t?d(c.filter((t=>t!=e))):h(p.filter((t=>t!=e)))};let w=c.length+p.length;const j=0==p.length&&0==c.length||o;return(0,x.jsx)(be.Z,{children:(0,x.jsxs)(Vt,{children:[(0,x.jsxs)("div",{className:"left",children:[(0,x.jsx)("div",{className:"search",children:(0,x.jsx)("input",{value:g,onChange:e=>{const t=e.target.value;f(t),v(t)},placeholder:"Search user or channel"})}),(0,x.jsxs)("ul",{className:"users",children:[u&&u.map((e=>{const{gid:t}=e,n=p.includes(t);return(0,x.jsxs)("li",{"data-type":"channel","data-id":t,className:"user channel",onClick:b,children:[(0,x.jsx)(Ut.Z,{readOnly:!0,checked:n,name:"cb",id:"cb"}),(0,x.jsx)(St,{id:t,interactive:!1})]},t)})),m&&m.map((e=>{const{uid:t}=e,n=c.includes(t);return(0,x.jsxs)("li",{"data-id":t,"data-type":"user",className:"user",onClick:b,children:[(0,x.jsx)(Ut.Z,{readOnly:!0,checked:n,name:"cb",id:"cb"}),(0,x.jsx)(W.Z,{uid:t,interactive:!1})]},t)}))]})]}),(0,x.jsxs)("div",{className:"right",children:[(0,x.jsxs)("h3",{className:"title",children:["Send To ",w]}),(0,x.jsxs)("ul",{className:"selected",children:[p.map((e=>(0,x.jsxs)("li",{className:"item",children:[(0,x.jsx)(St,{id:e,interactive:!1},e),(0,x.jsx)(Pt.Z,{className:"remove",onClick:C.bind(null,e,"channel")})]},e))),c.map((e=>(0,x.jsxs)("li",{className:"item",children:[(0,x.jsx)(W.Z,{uid:e,interactive:!1},e),(0,x.jsx)(Pt.Z,{className:"remove",onClick:C.bind(null,e,"user")})]},e)))]}),(0,x.jsx)("div",{className:"msgs",children:t.map((e=>(0,x.jsx)($t,{mid:e,interactive:!1},e)))}),(0,x.jsx)(we.Z,{className:"input",placeholder:"Leave a message",value:a,onChange:e=>{s(e.target.value)}}),(0,x.jsxs)("div",{className:"btns",children:[(0,x.jsx)(Ce.Z,{onClick:n,className:"normal cancel",children:"Cancel"}),(0,x.jsxs)(Ce.Z,{className:"normal",disabled:j,onClick:async()=>{await r({mids:t.map((e=>+e)),users:c,channels:p}),a.trim()&&await l({content:a,users:c,channels:p}),Bt.ZP.success("Forward Message Successfully"),n()},children:["Send To ",0==w?null:`(${w})`]})]})]})]})})}var Yt=n(5845);function Gt(e){let{closeModal:t,mids:n=[]}=e;const a=n?Array.isArray(n)?n:[n]:[],[s]=(0,i.useState)(a),{deleteMessage:l,isDeleting:r}=Dt();return 0==s.length?null:(0,x.jsx)(be.Z,{children:(0,x.jsx)(Yt.Z,{buttons:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(Ce.Z,{className:"cancel",onClick:t.bind(null,!1),children:"Cancel"}),(0,x.jsx)(Ce.Z,{disabled:r,onClick:async()=>{await l(s),t(!0)},className:"danger",children:r?"Deleting":"Delete"})]}),title:"Delete Message",description:`Are you sure want to delete ${s.length>1?"these messages":"this message"}?`,children:1==s.length&&(0,x.jsx)(I,{mid:s[0]})})})}const qt=l.ZP.div`
  position: relative;
  padding: 16px;
  /* padding-bottom: 0; */
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.05);
  .opt {
    padding: 8px;
    background: #f2f4f7;
    border-radius: var(--br);
    &:disabled svg path {
      fill: #ccc;
    }
    &:hover {
      background: #eaecf0;
    }
  }
  .close {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;function Kt(e){let{context:t,id:n}=e;const[a,l]=(0,i.useState)(!1),{canDelete:r}=Dt(),{addFavorite:o}=(0,$.Z)({}),c=(0,s.v9)((e=>e.ui.selectMessages[`${t}_${n}`])),[d,p]=(0,i.useState)(!1),h=(0,s.I0)(),u=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];l((e=>!e)),e&&(h((0,T.Gy)({context:t,id:n,operation:"reset"})),Bt.ZP.success("Messages Deleted!"))},f=()=>{p((e=>!e))};(0,re.z)("Escape",(e=>{h((0,T.Gy)({context:t,id:n,operation:"reset"}))}));const m=r(c);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(qt,{children:[(0,x.jsx)("button",{className:"opt",onClick:f,children:(0,x.jsx)(It.Z,{})}),(0,x.jsx)("button",{className:"opt",onClick:async()=>{await o(c)?(h((0,T.Gy)({context:t,id:n,operation:"reset"})),Bt.ZP.success("Messages Saved!")):Bt.ZP.error("Operation Failed!")},children:(0,x.jsx)(Lt.Z,{})}),(0,x.jsx)("button",{className:"opt",disabled:!m,onClick:u.bind(null,!1),children:(0,x.jsx)(Le,{})}),(0,x.jsx)(Pt.Z,{className:"close",onClick:()=>{h((0,T.Gy)({context:t,id:n,operation:"reset"}))}})]}),d&&(0,x.jsx)(At,{mids:c,closeModal:f}),a&&(0,x.jsx)(Gt,{mids:c,closeModal:u})]})}function Wt(e){var t,n;let{children:a,header:l,aside:r=null,contacts:o=null,dropFiles:c=[],context:d="channel",to:p=null}=e;const{addStageFile:h}=(0,he.Z)({context:d,id:p}),u=(0,i.useRef)(void 0),[f,m]=(0,i.useState)(null),{selects:g,channelsData:v,contactsData:b}=(0,s.v9)((e=>({selects:e.ui.selectMessages[`${d}_${p}`],channelsData:e.channels.byId,contactsData:e.contacts.byId}))),[{isActive:C},w]=(0,X.L)((()=>({accept:[J.FILE],drop(e){let{files:t}=e;if(t.length){const e=t.map((e=>{const{size:t,type:n,name:i}=e;return{size:t,type:n,name:i,url:URL.createObjectURL(e)}}));h(e)}},collect:e=>({isActive:e.canDrop()&&e.isOver()})})),[d,p]);(0,i.useEffect)((()=>{if(null!==c&&void 0!==c&&c.length){const e=c.map((e=>{const{size:t,type:n,name:i}=e;return{size:t,type:n,name:i,url:URL.createObjectURL(e)}}));h(e)}}),[c]);(0,i.useEffect)((()=>{const e=null===u||void 0===u?void 0:u.current;e&&e.addEventListener("click",(e=>{const{target:t}=e;if("IMG"==t.nodeName&&t.classList.contains("preview")){const e=t.src,n=t.dataset.origin||t.src,i=t.dataset.download||t.src,a=JSON.parse(t.dataset.meta||"{}");m({thumbnail:e,originUrl:n,downloadLink:i,...a})}}),!0)}),[]);const j="channel"==d?null===(t=v[p])||void 0===t?void 0:t.name:null===(n=b[p])||void 0===n?void 0:n.name;return(0,x.jsxs)(x.Fragment,{children:[f&&(0,x.jsx)(Q.Z,{data:f,closeModal:()=>{m(null)}}),(0,x.jsxs)(_t,{ref:w,children:[l,(0,x.jsxs)("main",{className:"main",ref:u,children:[(0,x.jsxs)("div",{className:"chat",children:[a,(0,x.jsxs)("div",{className:"send "+(g?"selecting":""),children:[(0,x.jsx)(Et,{id:p,context:d},p),g&&(0,x.jsx)(Kt,{context:d,id:p})]})]}),o&&(0,x.jsx)("div",{className:"members",children:o}),r&&(0,x.jsx)("div",{className:"aside",children:r})]}),(0,x.jsx)("div",{className:"drag_tip "+(C?"visible animate__animated animate__fadeIn":""),children:(0,x.jsx)("div",{className:"box "+(C?"animate__animated animate__bounceIn":""),children:(0,x.jsxs)("div",{className:"inner",children:[(0,x.jsx)("h4",{className:"head",children:`Send to ${ae.bI[d]}${j}`}),(0,x.jsx)("span",{className:"intro",children:"Photos accept jpg, png, max size limit to 10M."})]})})})]})]})}const Xt=l.ZP.hr`
  display: block;
  position: relative;
  border: 0;
  border-top: 1px solid #e3e5e8;
  margin: 25px 0;
  &:before {
    background: #fff;
    padding: 2px 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    content: attr(data-content);
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    color: #78787c;
  }
`;function Jt(e){let{content:t}=e;return t?(0,x.jsx)(Xt,{"data-content":t}):null}var Qt=n(2128),en=n.n(Qt),tn=n(8547),nn=n.n(tn);var an,sn,ln=n(9121),rn=n(9784);function on(){return on=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},on.apply(this,arguments)}const cn=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",on({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,an||(an=i.createElement("g",{clipPath:"url(#clip0_7924_2562)"},i.createElement("path",{d:"M15.5359 7.96249C15.5359 7.73893 15.4826 7.52916 15.3932 7.33849C14.7972 5.41582 12.007 5.55627 8.03811 5.46249C7.37455 5.44693 7.75411 4.66338 7.987 2.94338C8.13855 1.82471 7.41722 0.106934 6.20478 0.106934C4.20566 0.106934 6.12878 1.68382 4.36122 5.58338C3.41678 7.66693 1.30566 6.49982 1.30566 8.59271V13.3567C1.30566 14.1714 1.38566 14.9545 2.53144 15.0834C3.64211 15.2083 3.39233 15.9998 4.99455 15.9998H13.0141C13.831 15.9998 14.4954 15.3349 14.4954 14.518C14.4954 14.1794 14.3768 13.8709 14.1852 13.6212C14.6386 13.3674 14.9497 12.8883 14.9497 12.3327C14.9497 11.9949 14.8314 11.6865 14.6403 11.4372C15.095 11.1838 15.407 10.7043 15.407 10.1478C15.407 9.74382 15.2434 9.3776 14.9799 9.1096C15.3163 8.83805 15.5359 8.42738 15.5359 7.96249Z",fill:"#FFDB5E"}),i.createElement("path",{d:"M10.231 9.44411H14.055C14.575 9.44411 15.063 9.16589 15.3288 8.71833C15.4381 8.53389 15.3772 8.29522 15.1923 8.18545C15.0079 8.07567 14.7692 8.13745 14.6594 8.32189C14.5337 8.53478 14.3012 8.66633 14.0546 8.66633H10.139C9.751 8.66633 9.43545 8.35078 9.43545 7.96278C9.43545 7.57478 9.751 7.25922 10.139 7.25922H12.7554C12.9701 7.25922 13.1443 7.085 13.1443 6.87033C13.1443 6.65567 12.9701 6.48145 12.7554 6.48145H10.1386C9.32167 6.48145 8.65723 7.14589 8.65723 7.96278C8.65723 8.41833 8.86834 8.82144 9.19278 9.09345C8.91945 9.36233 8.74923 9.73567 8.74923 10.1481C8.74923 10.605 8.96167 11.0094 9.28789 11.281C9.01634 11.5494 8.84789 11.9214 8.84789 12.333C8.84789 12.8308 9.09634 13.2699 9.47412 13.5388C9.24123 13.8006 9.09545 14.1414 9.09545 14.5183C9.09545 15.3352 9.75989 15.9997 10.5768 15.9997H13.0141C13.5341 15.9997 14.0226 15.7219 14.2883 15.2743C14.3981 15.0899 14.3372 14.8512 14.1528 14.7414C13.9679 14.6326 13.7292 14.6926 13.6199 14.877C13.4932 15.0899 13.2608 15.2219 13.0141 15.2219H10.5768C10.1888 15.2219 9.87323 14.9063 9.87323 14.5183C9.87323 14.1303 10.1888 13.8148 10.5768 13.8148H13.4683C13.9883 13.8148 14.4772 13.5366 14.7426 13.089C14.8523 12.9041 14.7914 12.6654 14.607 12.5561C14.4208 12.4446 14.183 12.5072 14.0741 12.6917C13.9457 12.9081 13.719 13.037 13.4683 13.037H10.3292C9.94123 13.037 9.62567 12.721 9.62567 12.333C9.62567 11.945 9.94123 11.6294 10.3292 11.6294H13.9252C14.4452 11.6294 14.9337 11.3517 15.1994 10.9041C15.3092 10.7197 15.2483 10.481 15.0639 10.3712C14.8786 10.2619 14.6403 10.3223 14.531 10.5068C14.4026 10.7228 14.1759 10.8517 13.9252 10.8517H10.231C9.843 10.8517 9.52745 10.5361 9.52745 10.1481C9.52745 9.76011 9.84256 9.44411 10.231 9.44411Z",fill:"#EE9547"}))),sn||(sn=i.createElement("defs",null,i.createElement("clipPath",{id:"clip0_7924_2562"},i.createElement("rect",{width:16,height:16,fill:"white"})))))},dn=(0,i.forwardRef)(cn);var pn,hn;function un(){return un=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},un.apply(this,arguments)}const xn=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",un({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,pn||(pn=i.createElement("path",{d:"M15.5359 8.03733C15.5359 8.26089 15.4826 8.47067 15.3932 8.66133C14.7972 10.584 12.007 10.4436 8.03811 10.5373C7.37455 10.5529 7.75411 11.3364 7.987 13.0564C8.13855 14.1751 7.41722 15.8929 6.20478 15.8929C4.20566 15.8929 6.12878 14.316 4.36122 10.4164C3.41678 8.33289 1.30566 9.5 1.30566 7.40711V2.64356C1.30566 1.82889 1.38566 1.04578 2.53144 0.916889C3.64211 0.791556 3.39233 0 4.99455 0H13.0141C13.831 0 14.4954 0.664889 14.4954 1.48178C14.4954 1.82044 14.3768 2.12889 14.1852 2.37867C14.6386 2.63244 14.9497 3.11156 14.9497 3.66711C14.9497 4.00489 14.8314 4.31333 14.6403 4.56267C15.095 4.816 15.407 5.29556 15.407 5.852C15.407 6.256 15.2434 6.62222 14.9799 6.89022C15.3163 7.16178 15.5359 7.57244 15.5359 8.03733Z",fill:"#FFDB5E"})),hn||(hn=i.createElement("path",{d:"M10.231 6.55604H14.055C14.575 6.55604 15.063 6.83427 15.3288 7.28182C15.4381 7.46627 15.3772 7.70493 15.1923 7.81471C15.0079 7.92449 14.7692 7.86271 14.6594 7.67827C14.5337 7.46538 14.3012 7.33382 14.0546 7.33382H10.139C9.751 7.33382 9.43545 7.64938 9.43545 8.03738C9.43545 8.42538 9.751 8.74093 10.139 8.74093H12.7554C12.9701 8.74093 13.1443 8.91515 13.1443 9.12982C13.1443 9.34449 12.9701 9.51871 12.7554 9.51871H10.1386C9.32167 9.51871 8.65723 8.85427 8.65723 8.03738C8.65723 7.58182 8.86834 7.17871 9.19278 6.90671C8.91945 6.63782 8.74923 6.26449 8.74923 5.85204C8.74923 5.39515 8.96167 4.99071 9.28789 4.71915C9.01634 4.45071 8.84789 4.07871 8.84789 3.66715C8.84789 3.16938 9.09634 2.73027 9.47412 2.46138C9.24123 2.1996 9.09545 1.85871 9.09545 1.48182C9.09545 0.664933 9.75989 0.000488281 10.5768 0.000488281H13.0141C13.5341 0.000488281 14.0226 0.278266 14.2883 0.725822C14.3981 0.910266 14.3372 1.14893 14.1528 1.25871C13.9679 1.3676 13.7292 1.3076 13.6199 1.12315C13.4932 0.910266 13.2608 0.778266 13.0141 0.778266H10.5768C10.1888 0.778266 9.87323 1.09382 9.87323 1.48182C9.87323 1.86982 10.1888 2.18538 10.5768 2.18538H13.4683C13.9883 2.18538 14.4772 2.4636 14.7426 2.91115C14.8523 3.09604 14.7914 3.33471 14.607 3.44404C14.4208 3.5556 14.183 3.49293 14.0741 3.30849C13.9457 3.09204 13.719 2.96315 13.4683 2.96315H10.3292C9.94123 2.96315 9.62567 3.27915 9.62567 3.66715C9.62567 4.05515 9.94123 4.37071 10.3292 4.37071H13.9252C14.4452 4.37071 14.9337 4.64849 15.1994 5.09604C15.3092 5.28049 15.2483 5.51915 15.0639 5.62893C14.8786 5.73827 14.6403 5.67782 14.531 5.49338C14.4026 5.27738 14.1759 5.14849 13.9252 5.14849H10.231C9.843 5.14849 9.52745 5.46404 9.52745 5.85204C9.52745 6.24004 9.84256 6.55604 10.231 6.55604Z",fill:"#EE9547"})))},fn=(0,i.forwardRef)(xn);var mn,gn;function vn(){return vn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},vn.apply(this,arguments)}const bn=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",vn({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,mn||(mn=i.createElement("g",{clipPath:"url(#clip0_7924_2577)"},i.createElement("path",{d:"M5.16703 3.32813C5.11725 3.37791 5.07947 3.43791 5.04792 3.50369L5.04436 3.50013L0.0594748 14.7295L0.0643636 14.7344C-0.0280808 14.9135 0.126586 15.2779 0.443475 15.5952C0.760364 15.9121 1.12481 16.0668 1.30392 15.9744L1.30836 15.9788L12.5377 10.9935L12.5341 10.9895C12.5995 10.9584 12.6595 10.9206 12.7097 10.8699C13.4039 10.1757 12.2781 7.92458 10.1959 5.84191C8.11281 3.75924 5.8617 2.63391 5.16703 3.32813Z",fill:"#DD2E44"}),i.createElement("path",{d:"M5.7777 5.3335L0.184808 14.4473L0.0594748 14.7295L0.0643636 14.7344C-0.0280808 14.9135 0.126586 15.2779 0.443475 15.5953C0.546586 15.6984 0.653697 15.7766 0.758586 15.8428L7.55548 7.55572L5.7777 5.3335Z",fill:"#EA596E"}),i.createElement("path",{d:"M10.2275 5.80713C12.3031 7.88358 13.4555 10.0969 12.8004 10.7511C12.1457 11.4062 9.93241 10.2542 7.85552 8.17869C5.77952 6.10224 4.62752 3.88802 5.28219 3.23335C5.9373 2.57869 8.15063 3.73069 10.2275 5.80713Z",fill:"#A0041E"}),i.createElement("path",{d:"M8.26223 6.04852C8.17379 6.12008 8.05823 6.15741 7.93601 6.14408C7.55023 6.1023 7.22579 5.96808 6.99868 5.75608C6.75823 5.53163 6.63956 5.2303 6.67201 4.92852C6.7289 4.39874 7.26045 3.91252 8.16668 4.0103C8.51912 4.04808 8.67645 3.93474 8.68179 3.88052C8.68801 3.82674 8.55868 3.6823 8.20623 3.64408C7.82045 3.6023 7.49601 3.46808 7.26845 3.25608C7.02801 3.03163 6.9089 2.7303 6.94179 2.42852C6.99957 1.89874 7.53068 1.41252 8.43601 1.51074C8.6929 1.5383 8.82845 1.48541 8.88579 1.45119C8.93157 1.42319 8.94979 1.39652 8.95157 1.38097C8.9569 1.32719 8.82934 1.18274 8.47601 1.14452C8.23201 1.11786 8.05512 0.899188 8.08223 0.654744C8.10845 0.410744 8.32668 0.2343 8.57156 0.260966C9.4769 0.3583 9.8929 0.9463 9.83556 1.47652C9.77779 2.00719 9.24668 2.49252 8.34045 2.39519C8.08357 2.36719 7.94934 2.42052 7.89157 2.45474C7.84579 2.4823 7.82712 2.50941 7.82534 2.52452C7.81957 2.57874 7.94801 2.72274 8.30134 2.76097C9.20668 2.85874 9.62268 3.4463 9.56534 3.97652C9.50801 4.5063 8.9769 4.99252 8.07112 4.8943C7.81423 4.86674 7.67912 4.92008 7.62134 4.95386C7.57512 4.9823 7.55734 5.00897 7.55556 5.02408C7.54979 5.07786 7.67823 5.2223 8.03112 5.26052C8.27468 5.28719 8.45201 5.5063 8.4249 5.7503C8.41245 5.87208 8.35068 5.97741 8.26223 6.04852Z",fill:"#AA8DD8"}),i.createElement("path",{d:"M13.6272 10.1588C14.504 9.91122 15.1089 10.3023 15.2529 10.8157C15.3969 11.3285 15.0849 11.9779 14.2085 12.2246C13.8663 12.3205 13.7636 12.4841 13.7774 12.5361C13.7925 12.5886 13.9663 12.6748 14.3076 12.5783C15.184 12.3317 15.7889 12.7228 15.9329 13.2357C16.0778 13.749 15.7649 14.3974 14.888 14.6446C14.5463 14.7406 14.4432 14.9046 14.4583 14.9566C14.4729 15.0086 14.6463 15.0948 14.988 14.9988C15.2236 14.9326 15.4698 15.0699 15.536 15.3059C15.6018 15.5423 15.4645 15.7877 15.228 15.8543C14.352 16.101 13.7467 15.7108 13.6018 15.197C13.4578 14.6841 13.7703 14.0357 14.6476 13.7885C14.9898 13.6921 15.0925 13.529 15.0774 13.4766C15.0632 13.4246 14.8898 13.3379 14.5485 13.4339C13.6712 13.681 13.0667 13.2908 12.9223 12.7766C12.7778 12.2637 13.0903 11.6152 13.9672 11.3677C14.3085 11.2721 14.4112 11.1077 14.3969 11.0561C14.3818 11.0037 14.2089 10.9174 13.8672 11.0134C13.6307 11.0801 13.3858 10.9423 13.3192 10.7063C13.2529 10.4708 13.3907 10.2254 13.6272 10.1588Z",fill:"#77B255"}),i.createElement("path",{d:"M10.2226 8.96008C10.092 8.96008 9.96309 8.90274 9.87509 8.79341C9.72176 8.60141 9.75331 8.32185 9.94443 8.16852C10.0413 8.09074 12.3524 6.27563 15.6186 6.74274C15.8618 6.77741 16.0306 7.0023 15.996 7.24541C15.9613 7.48808 15.7382 7.65874 15.4929 7.6223C12.6071 7.21252 10.5209 8.8463 10.5004 8.86274C10.4178 8.92852 10.32 8.96008 10.2226 8.96008Z",fill:"#AA8DD8"}),i.createElement("path",{d:"M2.55737 7.11115C2.51515 7.11115 2.47204 7.10493 2.42937 7.09249C2.19426 7.02182 2.06093 6.77426 2.1316 6.53915C2.63515 4.86226 3.0916 2.18626 2.53071 1.48848C2.46804 1.40937 2.37337 1.3316 2.15649 1.34804C1.7396 1.38004 1.77915 2.2596 1.7796 2.26848C1.79826 2.51337 1.61426 2.72671 1.36982 2.74493C1.12137 2.76004 0.911597 2.5796 0.893375 2.33471C0.847597 1.72182 1.03826 0.541373 2.08982 0.461818C2.55915 0.426262 2.94893 0.589373 3.22404 0.931596C4.27782 2.24315 3.20804 6.04537 2.98315 6.79471C2.92537 6.98715 2.74849 7.11115 2.55737 7.11115Z",fill:"#77B255"}),i.createElement("path",{d:"M11.3334 4.889C11.7016 4.889 12.0001 4.59052 12.0001 4.22233C12.0001 3.85414 11.7016 3.55566 11.3334 3.55566C10.9652 3.55566 10.6667 3.85414 10.6667 4.22233C10.6667 4.59052 10.9652 4.889 11.3334 4.889Z",fill:"#5C913B"}),i.createElement("path",{d:"M0.888889 8.88911C1.37981 8.88911 1.77778 8.49114 1.77778 8.00022C1.77778 7.5093 1.37981 7.11133 0.888889 7.11133C0.397969 7.11133 0 7.5093 0 8.00022C0 8.49114 0.397969 8.88911 0.888889 8.88911Z",fill:"#9266CC"}),i.createElement("path",{d:"M14.4445 9.33333C14.8127 9.33333 15.1112 9.03486 15.1112 8.66667C15.1112 8.29848 14.8127 8 14.4445 8C14.0763 8 13.7778 8.29848 13.7778 8.66667C13.7778 9.03486 14.0763 9.33333 14.4445 9.33333Z",fill:"#5C913B"}),i.createElement("path",{d:"M10.4445 14.6668C10.8127 14.6668 11.1112 14.3684 11.1112 14.0002C11.1112 13.632 10.8127 13.3335 10.4445 13.3335C10.0763 13.3335 9.77783 13.632 9.77783 14.0002C9.77783 14.3684 10.0763 14.6668 10.4445 14.6668Z",fill:"#5C913B"}),i.createElement("path",{d:"M12.4446 2.66645C12.9355 2.66645 13.3334 2.26848 13.3334 1.77756C13.3334 1.28664 12.9355 0.888672 12.4446 0.888672C11.9536 0.888672 11.5557 1.28664 11.5557 1.77756C11.5557 2.26848 11.9536 2.66645 12.4446 2.66645Z",fill:"#FFCC4D"}),i.createElement("path",{d:"M14.4445 4.44466C14.8127 4.44466 15.1112 4.14618 15.1112 3.77799C15.1112 3.4098 14.8127 3.11133 14.4445 3.11133C14.0763 3.11133 13.7778 3.4098 13.7778 3.77799C13.7778 4.14618 14.0763 4.44466 14.4445 4.44466Z",fill:"#FFCC4D"}),i.createElement("path",{d:"M13.111 6.22201C13.4792 6.22201 13.7777 5.92353 13.7777 5.55534C13.7777 5.18715 13.4792 4.88867 13.111 4.88867C12.7428 4.88867 12.4443 5.18715 12.4443 5.55534C12.4443 5.92353 12.7428 6.22201 13.111 6.22201Z",fill:"#FFCC4D"}),i.createElement("path",{d:"M3.33341 11.1112C3.7016 11.1112 4.00008 10.8127 4.00008 10.4445C4.00008 10.0763 3.7016 9.77783 3.33341 9.77783C2.96522 9.77783 2.66675 10.0763 2.66675 10.4445C2.66675 10.8127 2.96522 11.1112 3.33341 11.1112Z",fill:"#FFCC4D"}))),gn||(gn=i.createElement("defs",null,i.createElement("clipPath",{id:"clip0_7924_2577"},i.createElement("rect",{width:16,height:16,fill:"white"})))))},Cn=(0,i.forwardRef)(bn);var wn,jn,yn,Zn;function kn(){return kn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},kn.apply(this,arguments)}const Mn=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",kn({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,wn||(wn=i.createElement("path",{d:"M16 8C16 12.4182 12.4182 16 8 16C3.58222 16 0 12.4182 0 8C0 3.58222 3.58222 0 8 0C12.4182 0 16 3.58222 16 8Z",fill:"#FFCC4D"})),jn||(jn=i.createElement("path",{d:"M5.11111 8.88894C5.72476 8.88894 6.22222 8.1925 6.22222 7.33339C6.22222 6.47428 5.72476 5.77783 5.11111 5.77783C4.49746 5.77783 4 6.47428 4 7.33339C4 8.1925 4.49746 8.88894 5.11111 8.88894Z",fill:"#664500"})),yn||(yn=i.createElement("path",{d:"M10.8889 8.88894C11.5026 8.88894 12.0001 8.1925 12.0001 7.33339C12.0001 6.47428 11.5026 5.77783 10.8889 5.77783C10.2753 5.77783 9.77783 6.47428 9.77783 7.33339C9.77783 8.1925 10.2753 8.88894 10.8889 8.88894Z",fill:"#664500"})),Zn||(Zn=i.createElement("path",{d:"M5.33325 12.4443C6.22214 10.2221 11.111 10.2221 11.111 11.111C11.111 11.5554 7.55547 10.6666 5.33325 12.4443Z",fill:"#664500"})))},Nn=(0,i.forwardRef)(Mn);var En;function _n(){return _n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},_n.apply(this,arguments)}const Dn=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",_n({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,En||(En=i.createElement("path",{d:"M15.9488 5.25931C15.9488 2.83709 13.9852 0.873535 11.5635 0.873535C10.0932 0.873535 8.79591 1.59931 7.99991 2.70865C7.20391 1.59931 5.90658 0.873535 4.4368 0.873535C2.01458 0.873535 0.0510254 2.83665 0.0510254 5.25931C0.0510254 5.60242 0.0945809 5.93487 0.169248 6.25531C0.778136 10.0389 4.9848 14.0304 7.99991 15.1264C11.0146 14.0304 15.2217 10.0389 15.8297 6.25576C15.9052 5.93531 15.9488 5.60287 15.9488 5.25931Z",fill:"#DD2E44"})))},In=(0,i.forwardRef)(Dn);var Ln,Pn,Fn,Sn,Hn,On;function zn(){return zn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},zn.apply(this,arguments)}const $n=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",zn({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,Ln||(Ln=i.createElement("path",{d:"M0.444336 7.55545L3.99989 4.44434L11.111 4.88878L11.5554 11.9999L8.44434 15.5554C8.44434 15.5554 8.44478 12.8892 5.77767 10.2221C3.11056 7.555 0.444336 7.55545 0.444336 7.55545Z",fill:"#A0041E"})),Pn||(Pn=i.createElement("path",{d:"M0.432382 15.5555C0.432382 15.5555 0.416382 12.0093 1.75905 10.6666C3.10171 9.32395 6.6666 9.41639 6.6666 9.41639C6.6666 9.41639 6.66616 12.8888 5.33283 14.2222C3.99949 15.5555 0.432382 15.5555 0.432382 15.5555Z",fill:"#FFAC33"})),Fn||(Fn=i.createElement("path",{d:"M3.99946 13.7777C4.9813 13.7777 5.77724 12.9818 5.77724 11.9999C5.77724 11.0181 4.9813 10.2222 3.99946 10.2222C3.01762 10.2222 2.22168 11.0181 2.22168 11.9999C2.22168 12.9818 3.01762 13.7777 3.99946 13.7777Z",fill:"#FFCC4D"})),Sn||(Sn=i.createElement("path",{d:"M15.9995 0C15.9995 0 11.5551 0 6.22175 4.44444C3.55509 6.66667 3.55509 10.6667 4.44398 11.5556C5.33287 12.4444 9.33287 12.4444 11.5551 9.77778C15.9995 4.44444 15.9995 0 15.9995 0Z",fill:"#55ACEE"})),Hn||(Hn=i.createElement("path",{d:"M11.9996 2.22217C11.2782 2.22217 10.6605 2.65372 10.3813 3.27106C10.6045 3.17017 10.8502 3.11106 11.1107 3.11106C12.0925 3.11106 12.8885 3.90706 12.8885 4.88883C12.8885 5.14928 12.8293 5.39506 12.7289 5.61772C13.3462 5.33906 13.7773 4.72128 13.7773 3.99995C13.7773 3.01817 12.9813 2.22217 11.9996 2.22217Z",fill:"black"})),On||(On=i.createElement("path",{d:"M3.55566 12.4444C3.55566 12.4444 3.55566 10.6666 4.00011 10.2222C4.44455 9.77772 9.77833 5.33372 10.2223 5.77772C10.6663 6.22172 6.22189 11.5555 5.77744 11.9999C5.333 12.4444 3.55566 12.4444 3.55566 12.4444Z",fill:"#A0041E"})))},Vn=(0,i.forwardRef)($n);var Rn,Tn,Un,Bn,An,Yn,Gn,qn,Kn,Wn;function Xn(){return Xn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},Xn.apply(this,arguments)}const Jn=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",Xn({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,Rn||(Rn=i.createElement("path",{d:"M3.92358 13.9025C5.87573 13.9025 7.45825 11.2598 7.45825 7.99984C7.45825 4.73988 5.87573 2.09717 3.92358 2.09717C1.97144 2.09717 0.388916 4.73988 0.388916 7.99984C0.388916 11.2598 1.97144 13.9025 3.92358 13.9025Z",fill:"#F5F8FA"})),Tn||(Tn=i.createElement("path",{d:"M3.92366 14.2362C1.75478 14.2362 0.0556641 11.497 0.0556641 8.00016C0.0556641 4.50327 1.75478 1.76416 3.92366 1.76416C6.09255 1.76416 7.79166 4.50327 7.79166 8.00016C7.79166 11.497 6.09255 14.2362 3.92366 14.2362ZM3.92366 2.43083C2.15833 2.43083 0.722331 4.92905 0.722331 8.00016C0.722331 11.0713 2.15833 13.5695 3.92366 13.5695C5.689 13.5695 7.125 11.0713 7.125 8.00016C7.125 4.92905 5.689 2.43083 3.92366 2.43083Z",fill:"#E1E8ED"})),Un||(Un=i.createElement("path",{d:"M2.93076 10.2043C4.14824 10.2043 5.13521 9.21734 5.13521 7.99985C5.13521 6.78237 4.14824 5.79541 2.93076 5.79541C1.71328 5.79541 0.726318 6.78237 0.726318 7.99985C0.726318 9.21734 1.71328 10.2043 2.93076 10.2043Z",fill:"#8899A6"})),Bn||(Bn=i.createElement("path",{d:"M2.93064 9.58442C3.8057 9.58442 4.51508 8.87504 4.51508 7.99997C4.51508 7.12491 3.8057 6.41553 2.93064 6.41553C2.05557 6.41553 1.34619 7.12491 1.34619 7.99997C1.34619 8.87504 2.05557 9.58442 2.93064 9.58442Z",fill:"#292F33"})),An||(An=i.createElement("path",{d:"M3.5161 7.49754C3.86613 7.49754 4.14988 7.21378 4.14988 6.86376C4.14988 6.51373 3.86613 6.22998 3.5161 6.22998C3.16608 6.22998 2.88232 6.51373 2.88232 6.86376C2.88232 7.21378 3.16608 7.49754 3.5161 7.49754Z",fill:"#F5F8FA"})),Yn||(Yn=i.createElement("path",{d:"M12.104 13.9025C14.0561 13.9025 15.6387 11.2598 15.6387 7.99984C15.6387 4.73988 14.0561 2.09717 12.104 2.09717C10.1519 2.09717 8.56934 4.73988 8.56934 7.99984C8.56934 11.2598 10.1519 13.9025 12.104 13.9025Z",fill:"#F5F8FA"})),Gn||(Gn=i.createElement("path",{d:"M12.1041 14.2362C9.93519 14.2362 8.23608 11.497 8.23608 8.00016C8.23608 4.50327 9.93519 1.76416 12.1041 1.76416C14.273 1.76416 15.9725 4.50327 15.9725 8.00016C15.9725 11.497 14.273 14.2362 12.1041 14.2362ZM12.1041 2.43083C10.3388 2.43083 8.90275 4.92949 8.90275 8.00016C8.90275 11.0713 10.3388 13.5695 12.1041 13.5695C13.8694 13.5695 15.3059 11.0713 15.3059 8.00016C15.3059 4.92905 13.8694 2.43083 12.1041 2.43083Z",fill:"#E1E8ED"})),qn||(qn=i.createElement("path",{d:"M11.1112 10.2043C12.3287 10.2043 13.3156 9.21734 13.3156 7.99985C13.3156 6.78237 12.3287 5.79541 11.1112 5.79541C9.8937 5.79541 8.90674 6.78237 8.90674 7.99985C8.90674 9.21734 9.8937 10.2043 11.1112 10.2043Z",fill:"#8899A6"})),Kn||(Kn=i.createElement("path",{d:"M11.1111 9.58442C11.9861 9.58442 12.6955 8.87504 12.6955 7.99997C12.6955 7.12491 11.9861 6.41553 11.1111 6.41553C10.236 6.41553 9.52661 7.12491 9.52661 7.99997C9.52661 8.87504 10.236 9.58442 11.1111 9.58442Z",fill:"#292F33"})),Wn||(Wn=i.createElement("path",{d:"M11.6965 7.49754C12.0465 7.49754 12.3303 7.21378 12.3303 6.86376C12.3303 6.51373 12.0465 6.22998 11.6965 6.22998C11.3465 6.22998 11.0627 6.51373 11.0627 6.86376C11.0627 7.21378 11.3465 7.49754 11.6965 7.49754Z",fill:"#F5F8FA"})))},Qn=(0,i.forwardRef)(Jn),ei={"\ud83d\udc4d":(0,x.jsx)(dn,{className:"emoji"}),"\ud83d\udc4e":(0,x.jsx)(fn,{className:"emoji"}),"\ud83d\ude04":(0,x.jsx)(vt,{className:"emoji"}),"\ud83d\udc40":(0,x.jsx)(Qn,{className:"emoji"}),"\ud83d\ude80":(0,x.jsx)(Vn,{className:"emoji"}),"\u2764\ufe0f":(0,x.jsx)(In,{className:"emoji"}),"\ud83d\ude41":(0,x.jsx)(Nn,{className:"emoji"}),"\ud83c\udf89":(0,x.jsx)(Cn,{className:"emoji"})};function ti(e){let{native:t=""}=e;return t&&ei[t]?ei[t]:null}const ni=l.ZP.div`
  background: none;
  z-index: 999;
  .emojis {
    padding: 4px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    background: #fff;
    filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
    border-radius: 12px;
    &.reacting {
      opacity: 0.6;
    }
    .wrapper {
      display: flex;
      cursor: pointer;
      border-radius: 8px;
      padding: 4px;
      &:hover,
      &.reacted {
        background-color: #f5f6f7;
      }
      > .emoji {
        width: 16px;
        height: 16px;
      }
    }
  }
`;function ii(e){let{mid:t,hidePicker:n}=e;const[i,{isLoading:a}]=(0,Z.xX)(),{reactionData:l,currUid:r}=(0,s.v9)((e=>({reactionData:e.reactionMessage[t]||{},currUid:e.authData.uid}))),o=e=>{i({mid:t,action:e}),n()};return(0,x.jsx)(ni,{children:(0,x.jsx)("ul",{className:"emojis "+(a?"reacting":""),children:ae.Ax.map((e=>{let t=l[e]&&l[e].findIndex((e=>e==r))>-1;return(0,x.jsx)("li",{className:"wrapper "+(t?"reacted":""),onClick:o.bind(null,e),children:(0,x.jsx)(ti,{native:e})},e)}))})})}const ai=n.p+"static/media/add.emoji.b1d5ed1b1206ddc32d02.svg",si=l.ZP.span`
  position: relative;
  margin-top: 8px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  .reaction {
    cursor: pointer;
    background-color: #ecfdff;
    border-radius: 6px;
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
    > .emoji {
      > * {
        display: flex;
      }
    }
    &:hover {
      background-color: #cff9fe;
    }
    &.reacted {
      box-shadow: inset 0 0 0 1px #06aed4;
      background-color: #a5f0fc;
    }

    > .count {
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #06aed4;
    }
  }
  > .add {
    visibility: hidden;
    width: 24px;
    height: 24px;
    background-color: #ecfdff;
    border-radius: 6px;
    border: none;
    background-image: url(${ai});
    background-size: 16px;
    background-repeat: no-repeat;
    background-position: center;
    &:hover {
      background-color: #cff9fe;
    }
  }
  &:hover > .add {
    visibility: visible;
  }
`,li=l.ZP.div`
  position: relative;
  background: #ffffff;
  border-radius: var(--br);
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  &:after {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 1px;
    position: absolute;
    bottom: -6px;
    left: calc(50% - 6px);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  }
  &.first:after {
    left: calc(50% - 16px);
  }
  .emoji {
    width: 32px;
    height: 32px;
  }
  .desc {
    display: flex;
    flex-direction: column;
    width: 140px;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #1d2939;
  }
`,ri=e=>{let{uids:t=[],emoji:n,index:i}=e;const a=(0,s.v9)((e=>e.contacts.byId)),l=t.map((e=>{var t;return null===(t=a[e])||void 0===t?void 0:t.name})),r=(0,ot.$w)(n,"apple",ln),o=l.length>3?`${l.join(", ")} and ${l.length-3} others reacted with`:`${l.join(", ")} reacted with`;return(0,x.jsxs)(li,{className:0==i?"first":"",children:[(0,x.jsx)("div",{className:"emoji",children:(0,x.jsx)(ti,{native:n})}),(0,x.jsxs)("div",{className:"desc",children:[(0,x.jsx)("span",{children:o}),(0,x.jsx)("span",{children:null===r||void 0===r?void 0:r.colons})]})]})};function oi(e){let{mid:t,reactions:n=null}=e;const[i]=(0,Z.xX)(),{currUid:a}=(0,s.v9)((e=>({currUid:e.authData.uid}))),l=e=>{i({mid:t,action:e})};return n&&0!=Object.entries(n).length?(0,x.jsxs)(si,{className:"reactions",children:[Object.entries(n).map(((e,t)=>{let[n,i]=e;const s=i.findIndex((e=>e==a))>-1;return i.length>0?(0,x.jsxs)("span",{onClick:l.bind(null,n),className:"reaction "+(s?"reacted":""),children:[(0,x.jsx)(c.ZP,{offset:[0,20],interactive:!0,placement:"top",content:(0,x.jsx)(ri,{uids:i,emoji:n,index:t}),children:(0,x.jsx)("i",{className:"emoji",children:(0,x.jsx)(ti,{native:n})})}),i.length>1?(0,x.jsxs)("em",{className:"count",children:[`${i.length}`," "]}):null]},n):null})),(0,x.jsx)(p.Z,{placement:"top",tip:"Add Reaction",children:(0,x.jsx)(c.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,x.jsx)(ii,{mid:t,hidePicker:rn.Bn}),children:(0,x.jsx)("button",{className:"add"})})})]}):null}var ci=n(1902),di=n(2648);const pi=n.p+"static/media/reply.5d4e2e3c5d8cf0c084f0.svg",hi=n.p+"static/media/reaction.dfc99cbb32dd13e55782.svg",ui=n.p+"static/media/edit.8c029902e162a2073edd.svg";var xi;function fi(){return fi=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},fi.apply(this,arguments)}const mi=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",fi({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,xi||(xi=i.createElement("path",{d:"M21 7.5C21 9.98528 18.9853 12 16.5 12C14.0147 12 12 9.98528 12 7.5C12 5.01472 14.0147 3 16.5 3C18.9853 3 21 5.01472 21 7.5ZM17 5.5C17 5.22386 16.7761 5 16.5 5C16.2239 5 16 5.22386 16 5.5V7H14.5C14.2239 7 14 7.22386 14 7.5C14 7.77614 14.2239 8 14.5 8H16V9.5C16 9.77614 16.2239 10 16.5 10C16.7761 10 17 9.77614 17 9.5V8H18.5C18.7761 8 19 7.77614 19 7.5C19 7.22386 18.7761 7 18.5 7H17V5.5ZM16.5 13C17.02 13 17.5232 12.9278 18 12.793V19.5C18 19.6881 17.8945 19.8602 17.7269 19.9456C17.5593 20.0309 17.358 20.015 17.2059 19.9044L12 16.1183L6.79409 19.9044C6.64199 20.015 6.4407 20.0309 6.27311 19.9456C6.10553 19.8602 6 19.6881 6 19.5V6.5C6 5.11929 7.11929 4 8.5 4H12.2572C11.4718 4.95094 11 6.17037 11 7.5C11 10.5376 13.4624 13 16.5 13Z",fill:"#667085"})))},gi=(0,i.forwardRef)(mi);var vi;function bi(){return bi=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},bi.apply(this,arguments)}const Ci=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",bi({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,vi||(vi=i.createElement("path",{d:"M21.0682 7.75765L16.2425 2.93189C14.9152 1.60462 12.6777 1.96772 11.8382 3.6466L9.40281 8.51748C9.31512 8.69287 9.16223 8.82694 8.97688 8.89096L4.81061 10.3302C3.93791 10.6317 3.682 11.7427 4.33487 12.3956L7.43936 15.5001L3.00008 19.9394L3 21.0001H4.06074L8.50002 16.5607L11.6045 19.6653C12.2574 20.3181 13.3684 20.0622 13.6699 19.1895L15.1092 15.0232C15.1732 14.8379 15.3073 14.685 15.4826 14.5973L20.3535 12.1619C22.0324 11.3224 22.3955 9.08491 21.0682 7.75765Z",fill:"#70707B"})))},wi=(0,i.forwardRef)(Ci);var ji;function yi(){return yi=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},yi.apply(this,arguments)}const Zi=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",yi({width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,ji||(ji=i.createElement("path",{d:"M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM13.3584 7.64645C13.1849 7.47288 12.9154 7.4536 12.7206 7.58859L12.6513 7.64645L9 11.298L7.35355 9.65131L7.28431 9.59346C7.08944 9.45846 6.82001 9.47775 6.64645 9.65131C6.47288 9.82488 6.4536 10.0943 6.58859 10.2892L6.64645 10.3584L8.64645 12.3584L8.71569 12.4163C8.8862 12.5344 9.1138 12.5344 9.28431 12.4163L9.35355 12.3584L13.3584 8.35355L13.4163 8.28431C13.5513 8.08944 13.532 7.82001 13.3584 7.64645Z",fill:"#475467"})))},ki=(0,i.forwardRef)(Zi);var Mi=n(169);const Ni=(0,l.ZP)(Yt.Z)`
  min-width: 406px;
  .title,
  .desc {
    text-align: left;
  }
  .preview {
    border: 1px solid #f2f4f7;
    max-height: 256px;
    overflow: auto;
    background: none;
    overflow-x: hidden;
  }
`;function Ei(e){let{closeModal:t,mid:n=0,gid:a=0}=e;const{channel:s,pinMessage:l,isPining:r,isSuccess:o}=k(a);return(0,i.useEffect)((()=>{o&&(t(),Bt.ZP.success("Pin Message Successfully"))}),[o]),n?(0,x.jsx)(be.Z,{children:(0,x.jsx)(Ni,{buttons:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(Ce.Z,{onClick:t,className:"cancel",children:"Cancel"}),(0,x.jsx)(Ce.Z,{disabled:r,onClick:()=>{l(n)},className:"main",children:r?"Pining":"Pin It"})]}),title:"Pin It",description:`Do you want to pin this message to #${null===s||void 0===s?void 0:s.name}`,children:(0,x.jsx)(I,{mid:n})})}):null}var _i=n(1026);function Di(e){let{mid:t,context:n,contextId:a}=e;const{copy:l}=(0,_i.Z)(),{content_type:r,properties:o,currUid:c,from_uid:d,content:p}=(0,s.v9)((e=>{var n,i,a,s;return{content:null===(n=e.message[t])||void 0===n?void 0:n.content,from_uid:null===(i=e.message[t])||void 0===i?void 0:i.from_uid,content_type:null===(a=e.message[t])||void 0===a?void 0:a.content_type,properties:null===(s=e.message[t])||void 0===s?void 0:s.properties,currUid:e.authData.uid}})),{canPin:h,pins:u,unpinMessage:f,isUnpinSuccess:m}=k("channel"==n?a:void 0),[g,v]=(0,i.useState)([]),[b,C]=(0,i.useState)(!1),[w,j]=(0,i.useState)(!1),[y,Z]=(0,i.useState)(!1),M=()=>{Z((e=>!e))},N=()=>{j((e=>!e))},E=()=>{C((e=>!e))},_=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];l(p,e)};(0,i.useEffect)((()=>{if(y&&r==ae.bT.archive){const e=document.querySelector(`[data-msg-mid='${t}'] .down [data-forwarded-mids]`);if(e){const t=e.dataset.forwardedMids.split(",");v(t)}}else v([t])}),[t,y,r]),(0,i.useEffect)((()=>{m&&Bt.ZP.success("Unpin Message Successfully!")}),[m]);const D="channel"==n&&h,I=r==ae.bT.file&&(null===o||void 0===o?void 0:o.content_type)&&(null===o||void 0===o?void 0:o.content_type.startsWith("image")),L=c==d&&[ae.bT.text,ae.bT.markdown].includes(r),P=c==d,F=[ae.bT.text,ae.bT.markdown].includes(r)||I;return{copyContent:_.bind(null,!!I),canCopy:F,isImage:I,isMarkdown:r==ae.bT.markdown,canDelete:P,canPin:"channel"==n&&h,pinned:!!D&&u.findIndex((e=>e.mid==t))>-1,unPin:f,canReply:!0,canEdit:L,toggleDeleteModal:N,toggleForwardModal:M,togglePinModal:E,DeleteModal:w?(0,x.jsx)(Gt,{closeModal:N,mids:t}):null,ForwardModal:y?(0,x.jsx)(At,{mids:g,closeModal:M}):null,PinModal:b?(0,x.jsx)(Ei,{mid:t,gid:a,closeModal:E}):null}}const Ii=l.ZP.ul`
  z-index: 999;
  position: absolute;
  right: 10px;
  top: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  background-color: #fff;
  visibility: hidden;
  &.visible {
    visibility: visible;
  }
  .cmd {
    display: flex;
    cursor: pointer;
    padding: 4px;
    &:hover {
      background-color: #f3f4f6;
    }
    img,
    svg {
      width: 24px;
      height: 24px;
    }
    &.fav {
      svg path {
        fill: #667085;
      }
    }
  }
  > .picker {
    position: absolute;
    left: -10px;
    top: 0;
    transform: translateX(-100%);
  }
`;function Li(e){let{context:t="user",contextId:n=0,mid:a=0,toggleEditMessage:l}=e;const{canDelete:r,canReply:o,canEdit:d,canPin:h,unPin:u,pinned:f,toggleDeleteModal:m,toggleForwardModal:g,togglePinModal:v,PinModal:b,DeleteModal:C,ForwardModal:w}=Di({mid:a,context:t,contextId:n}),{setReplying:j}=(0,ee.Z)({context:t,to:n}),{addFavorite:y,isFavorited:Z}=(0,$.Z)({cid:"channel"==t?n:null}),k=(0,s.I0)(),[M,N]=(0,i.useState)(!1),E=(0,i.useRef)(null),_=function(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];N(e)};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(Ii,{ref:E,className:"cmds "+(M?"visible":""),children:[(0,x.jsx)(c.ZP,{onShow:_.bind(null,!0),onHide:_.bind(null,!1),interactive:!0,placement:"left-start",trigger:"click",content:(0,x.jsx)(ii,{mid:a,hidePicker:rn.Bn}),children:(0,x.jsx)("li",{className:"cmd",children:(0,x.jsx)(p.Z,{placement:"top",tip:"Add Reaction",children:(0,x.jsx)("img",{src:hi,className:"toggler",alt:"icon emoji"})})})}),d&&(0,x.jsx)("li",{className:"cmd",onClick:l,children:(0,x.jsx)(p.Z,{placement:"top",tip:"Edit",children:(0,x.jsx)("img",{src:ui,alt:"icon edit"})})}),o&&(0,x.jsx)("li",{className:"cmd",onClick:e=>{n&&j(a),e&&(0,rn.Bn)()},children:(0,x.jsx)(p.Z,{placement:"top",tip:"Reply",children:(0,x.jsx)("img",{src:pi,alt:"icon reply"})})}),(0,x.jsx)("li",{className:"cmd fav",onClick:async()=>{(0,rn.Bn)();if(Z(a))return void Bt.ZP.success("Favorited!");await y(a)?Bt.ZP.success("Added Favorites!"):Bt.ZP.error("Added Favorites Failed!")},children:(0,x.jsx)(p.Z,{placement:"top",tip:"Add to Favorites",children:(0,x.jsx)(gi,{})})}),(0,x.jsx)(c.ZP,{onShow:_.bind(null,!0),onHide:_.bind(null,!1),interactive:!0,placement:"left-start",trigger:"click",content:(0,x.jsx)(di.Z,{items:[h&&{title:f?"Unpin Message":"Pin Message",icon:(0,x.jsx)(wi,{className:"icon"}),handler:f?()=>{(0,rn.Bn)(),u(a)}:v},{title:"Forward",icon:(0,x.jsx)(It.Z,{className:"icon"}),handler:g},{title:"Select",icon:(0,x.jsx)(ki,{className:"icon"}),handler:(e=>{k((0,T.Gy)({context:t,id:n,data:e})),(0,rn.Bn)()}).bind(null,a)},r&&{title:" Delete",danger:!0,icon:(0,x.jsx)(Le,{className:"icon"}),handler:m}]}),children:(0,x.jsx)("li",{className:"cmd",children:(0,x.jsx)(p.Z,{placement:"top",tip:"More",children:(0,x.jsx)("img",{src:Mi,alt:"icon more"})})})})]}),b,w,C]})}var Pi=n(2301);const Fi=l.ZP.div`
  width: 100%;
  .input {
    background: #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    textarea {
      outline: none;
      width: 100%;
      background: none;
      resize: unset;
      user-select: text;
      color: #374151;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      word-break: break-all;
      white-space: break-spaces;
    }
  }
  .opts {
    padding: 4px;
    display: flex;
    align-items: center;
    gap: 16px;
    .opt {
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
      button {
        padding: 0 4px;
        font-size: inherit;
        line-height: inherit;
        background: none;
        cursor: pointer;
        color: #06b6d4;
      }
    }
  }
`;function Si(e){let{mid:t,cancelEdit:n}=e;const a=(0,i.useRef)(),l=(0,s.v9)((e=>e.message[t]||{})),[r,o]=(0,i.useState)(!1),[c,d]=(0,i.useState)(!1),[p,h]=(0,i.useState)(l.content),[u,{isLoading:f,isSuccess:m}]=(0,Z.wm)();(0,i.useEffect)((()=>{m&&n()}),[m]),(0,re.z)("Shift",(e=>{o("keydown"==e.type)}),{eventTypes:["keydown","keyup"],target:a}),(0,re.z)("Escape",(()=>{n()}),{eventTypes:["keydown","keyup"],target:a});const g=()=>{u({mid:t,content:p,type:l.content_type==ae.bT.markdown?"markdown":"text"})};return l?(0,x.jsxs)(Fi,{children:[(0,x.jsx)("div",{className:"input",children:(0,x.jsx)(Pi.Z,{autoFocus:!0,onFocus:e=>e.currentTarget.setSelectionRange(e.currentTarget.value.length,e.currentTarget.value.length),ref:a,className:"content",maxRows:8,minRows:1,onKeyDown:e=>{d("Enter"===e.key)},onChange:e=>{c&&!r?g():h(e.target.value)},value:p,placeholder:"Edit Message"})}),(0,x.jsxs)("div",{className:"opts",children:[(0,x.jsxs)("span",{className:"opt",children:["esc to ",(0,x.jsx)("button",{onClick:n,children:"cancel"})]}),(0,x.jsxs)("span",{className:"opt",children:["enter to ",(0,x.jsx)("button",{onClick:g,children:f?"saving":"save"})]})]})]}):null}var Hi;function Oi(){return Oi=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},Oi.apply(this,arguments)}const zi=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",Oi({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,Hi||(Hi=i.createElement("path",{d:"M9.7042 16.2945C10.0945 16.6853 10.094 17.3184 9.70324 17.7087C9.31245 18.0989 8.67928 18.0985 8.28902 17.7077L3.29241 12.7043C2.90237 12.3137 2.90255 11.681 3.29282 11.2906L8.28943 6.29297C8.67992 5.9024 9.31308 5.90234 9.70365 6.29282C10.0942 6.6833 10.0943 7.31647 9.70379 7.70703L6.411 11H13C17.3349 11 20.8645 14.4478 20.9962 18.7508L21 19C21 19.5523 20.5523 20 20 20C19.4477 20 19 19.5523 19 19C19 15.7616 16.4344 13.1224 13.2249 13.0041L13 13H6.414L9.7042 16.2945Z",fill:"#616161"})))},$i=(0,i.forwardRef)(zi);var Vi;function Ri(){return Ri=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},Ri.apply(this,arguments)}const Ti=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",Ri({width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,Vi||(Vi=i.createElement("path",{d:"M6 4C6 2.89543 6.89543 2 8 2H14C15.1046 2 16 2.89543 16 4V14C16 15.1046 15.1046 16 14 16H8C6.89543 16 6 15.1046 6 14V4ZM4 6.00001C4 5.25973 4.4022 4.61339 5 4.26758V14.5C5 15.8807 6.11929 17 7.5 17H13.7324C13.3866 17.5978 12.7403 18 12 18H7.5C5.567 18 4 16.433 4 14.5V6.00001Z",fill:"#475467"})))},Ui=(0,i.forwardRef)(Ti);function Bi(e){let{context:t,contextId:n,mid:i,visible:a,hide:l,editMessage:r,children:o}=e;const{copyContent:d,canEdit:p,canPin:h,canDelete:u,canCopy:f,canReply:m,pinned:g,unPin:v,toggleDeleteModal:b,toggleForwardModal:C,togglePinModal:w,PinModal:j,ForwardModal:y,DeleteModal:Z}=Di({mid:i,contextId:n,context:t}),k=(0,s.I0)(),{setReplying:M}=(0,ee.Z)({context:t,to:n});return(0,x.jsxs)(x.Fragment,{children:[y,j,Z,(0,x.jsx)(c.ZP,{visible:a,followCursor:"initial",interactive:!0,placement:"right-start",popperOptions:{strategy:"fixed"},onClickOutside:l,content:(0,x.jsx)(di.Z,{hideMenu:l,items:[p&&{title:"Edit Message",icon:(0,x.jsx)(Ee,{className:"icon"}),handler:r},m&&{title:"Reply",icon:(0,x.jsx)($i,{className:"icon"}),handler:()=>{n&&M(i)}},f&&{title:"Copy",icon:(0,x.jsx)(Ui,{className:"icon"}),handler:d},h&&{title:g?"Unpin":"Pin",icon:(0,x.jsx)(wi,{className:"icon"}),handler:g?v.bind(null,i):w},{title:"Forward",icon:(0,x.jsx)(It.Z,{className:"icon"}),handler:C},{title:"Select",icon:(0,x.jsx)(ki,{className:"icon"}),handler:()=>{k((0,T.Gy)({context:t,id:n,data:i}))}},u&&{title:"Delete",danger:!0,icon:(0,x.jsx)(Le,{className:"icon"}),handler:b}]}),children:o},i)]})}var Ai=n(3561);function Yi(e){var t;let{readOnly:n=!1,contextId:a=0,mid:l="",context:r="user",updateReadIndex:o,read:d=!0}=e;const{visible:h,handleContextMenuEvent:u,hideContextMenu:f}=(0,Ai.Z)(),m=function(){const e=(0,i.useRef)(void 0),t=new IntersectionObserver((e=>{e.forEach((e=>{const t=e.isIntersecting,n=e.target;t?n.classList.add("in_view"):n.classList.remove("in_view")}))}),{threshold:0});return(0,i.useEffect)((()=>{const n=null===e||void 0===e?void 0:e.current;return n&&t.observe(e.current),()=>{n&&t.unobserve(n)}}),[e]),e}(),[g,v]=(0,i.useState)(!1),C=(0,i.useRef)(null),{getPinInfo:w}=k("channel"==r?a:null),{message:j={},reactionMessageData:y,contactsData:Z}=(0,s.v9)((e=>({reactionMessageData:e.reactionMessage,message:e.message[l]||{},contactsData:e.contacts.byId}))),M=()=>{v((e=>!e))},{reply_mid:N,from_uid:I,created_at:L,sending:P=!1,content:F,thumbnail:S,download:H,content_type:O="text/plain",edited:z,properties:$}=j;(0,i.useEffect)((()=>{if(!d){o("user"==r?{users:[{uid:+a,mid:l}]}:{groups:[{gid:+a,mid:l}]})}}),[l,d]);const V=y[l],R=Z[I]||{};let T=null;const U=E()(L);T=U.isToday()?"Today":U.isYesterday()?"Yesterday":null;const B=w(l),A=(null===$||void 0===$?void 0:$.local_id)||l;return(0,x.jsxs)(D.Z,{onContextMenu:u,"data-msg-mid":l,ref:m,className:`message ${n?"readonly":""} ${B?"pinned":""} ${h?"contextVisible":""} `,children:[(0,x.jsx)(c.ZP,{popperOptions:{strategy:"fixed"},disabled:n,interactive:!0,placement:"right",trigger:"click",content:(0,x.jsx)(ci.Z,{uid:I,type:"card",cid:a}),children:(0,x.jsx)("div",{className:"avatar","data-uid":I,ref:C,children:(0,x.jsx)(b.Z,{url:R.avatar,name:R.name})})},A),(0,x.jsx)(Bi,{editMessage:M,context:r,contextId:a,mid:l,visible:h,hide:f,children:(0,x.jsxs)("div",{className:"details","data-pin-tip":`pinned by ${null===(t=Z[null===B||void 0===B?void 0:B.created_by])||void 0===t?void 0:t.name}`,children:[(0,x.jsxs)("div",{className:"up",children:[(0,x.jsx)("span",{className:"name",children:R.name}),(0,x.jsx)(p.Z,{delay:200,disabled:!T||n,placement:"top",tip:U.format("YYYY-MM-DD h:mm:ss A"),children:(0,x.jsx)("i",{className:"time",children:T?`${T} ${U.format("h:mm A")}`:U.format("YYYY-MM-DD h:mm:ss A")})})]}),(0,x.jsxs)("div",{className:"down "+(P?"sending":""),children:[N&&(0,x.jsx)($t,{mid:N},N),g?(0,x.jsx)(Si,{mid:l,cancelEdit:M}):(0,_.Z)({context:r,to:a,from_uid:I,created_at:L,content_type:O,properties:$,content:F,thumbnail:S,download:H,edited:z}),V&&(0,x.jsx)(oi,{mid:l,reactions:V})]})]})}),!g&&!n&&(0,x.jsx)(Li,{content_type:O,context:r,contextId:a,mid:l,from_uid:I,toggleEditMessage:M})]},A)}E().extend(en()),E().extend(nn());const Gi=i.memo(Yi,((e,t)=>e.mid==t.mid));const qi=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(!e)return null;const{content_type:t,content:n,properties:i={}}=e;let a=null;switch(t){case ae.bT.text:a=n;break;case ae.bT.markdown:a="[markdown]";break;case ae.bT.file:{const e=null!==i&&void 0!==i?i:{};a=(0,ke.Or)(e.content_type,e.size)?"[image]":"[file]"}}return a},Ki=l.ZP.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  > .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  > .check {
    display: none;
    margin-top: 18px;
    margin-left: 8px;
  }
  > .message {
    flex: 1;
  }
  &.select {
    /* cursor: pointer; */
    &:hover {
      border-radius: var(--br);
      background: #f5f6f7;
    }
    > .check {
      display: block;
    }
  }
`,Wi=e=>{let{selectMode:t=!1,context:n,id:i,mid:a,children:l,...r}=e;const o=(0,s.I0)(),c=(0,s.v9)((e=>e.ui.selectMessages[`${n}_${i}`])),d=!(!c||!c.find((e=>e==a)));return(0,x.jsxs)(Ki,{className:t?"select":"",...r,children:[(0,x.jsx)(Ut.Z,{className:"check",checked:d}),l,t&&(0,x.jsx)("div",{className:"overlay",onClick:t?()=>{const e=d?"remove":"add";o((0,T.Gy)({context:n,id:i,operation:e,data:a}))}:null})]})},Xi=e=>{var t;let{selectMode:n=!1,isFirst:a=!1,read:s=!0,updateReadIndex:l,prev:r=null,curr:o=null,contextId:c=0,context:d="user"}=e;if(!o)return null;let{created_at:p,mid:h}=o;const u=null===(t=o.properties)||void 0===t?void 0:t.local_id;let f=null,m=E()(p).format("YYYY/MM/DD");if(r){let{created_at:e}=r;E()(e).isSame(p,"day")||(f=m)}else f=m;const g=u||h;return(0,x.jsxs)(i.Fragment,{children:[f&&(0,x.jsx)(Jt,{content:f}),(0,x.jsx)(Wi,{"data-key":g,context:d,id:c,mid:h,selectMode:n,children:(0,x.jsx)(Gi,{readOnly:n,isFirst:a,updateReadIndex:l,read:s,context:d,mid:h,contextId:c},g)},g)]},g)},Ji=function(e){let{mids:t=[],messageData:n={},loginUid:i=0,readIndex:a=0}=e;const s=t.filter((e=>{const{from_uid:t=0}=n[e]||{};return n[e]&&t!=i}));if(0==s.length)return{unreads:0};if(0==a)return{unreads:s.length};const l=s.filter((e=>e>a)),r=[];return l.forEach((e=>{const t=n[e],{mentions:a=[]}=t.properties||{};a.forEach((t=>{t==i&&r.push(e)}))})),{unreads:l.length,mentions:r}};var Qi;function ea(){return ea=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},ea.apply(this,arguments)}const ta=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",ea({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,Qi||(Qi=i.createElement("path",{d:"M3.5 14L13.5 14.001C14.2793 14.001 14.9204 14.5963 14.9931 15.3566L15 15.501V17.5C14.999 21 11.284 22 8.5 22C5.77787 22 2.1647 21.044 2.00545 17.7296L2 17.5V15.5C2 14.7207 2.59527 14.0796 3.35561 14.0069L3.5 14ZM15.488 14H20.5C21.2793 14 21.9204 14.5944 21.9931 15.3555L22 15.5V17C21.999 20.062 19.142 21 17 21C16.32 21 15.569 20.904 14.86 20.678C15.5128 19.9277 15.9362 18.9748 15.9934 17.78L16 17.5V15.5C16 15.0056 15.8507 14.5488 15.601 14.1616L15.488 14H20.5H15.488ZM8.5 3C10.985 3 13 5.015 13 7.5C13 9.985 10.985 12 8.5 12C6.015 12 4 9.985 4 7.5C4 5.015 6.015 3 8.5 3ZM17.5 5C19.433 5 21 6.567 21 8.5C21 10.433 19.433 12 17.5 12C15.567 12 14 10.433 14 8.5C14 6.567 15.567 5 17.5 5Z",fill:"#70707B"})))},na=(0,i.forwardRef)(ta);var ia;function aa(){return aa=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},aa.apply(this,arguments)}const sa=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",aa({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,ia||(ia=i.createElement("path",{d:"M12 2C17.5228 2 22 6.47715 22 12V19C22 20.6569 20.6569 22 19 22H16C15.4477 22 15 21.5523 15 21V15C15 14.4477 15.4477 14 16 14H20.5V12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12V14H8C8.55228 14 9 14.4477 9 15V21C9 21.5523 8.55228 22 8 22H5C3.34315 22 2 20.6569 2 19V12C2 6.47715 6.47715 2 12 2Z",fill:"#70707B"})))},la=(0,i.forwardRef)(sa),ra=l.ZP.header`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .txt {
    display: flex;
    align-items: center;
    gap: 5px;
    .title {
      font-size: 16px;
      line-height: 24px;
      color: #1c1c1e;
    }
    .desc {
      margin-left: 8px;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #616161;
    }
  }
`,oa=(l.ZP.div`
  padding: 3px 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
  position: absolute;
  top: 0;
  left: 10px;
  width: 900px;
  height: 24px;
  background: linear-gradient(135deg, #3c8ce7 0%, #00eaff 100%);
  border-radius: 0px 0px 8px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .clear {
    cursor: pointer;
    color: inherit;
    border: none;
    background: none;
    outline: none;
  }
`,l.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* todo */
  width: 226px;
  height: calc(100vh - 56px - 22px);
  overflow-y: scroll;
  padding: 8px;
  box-shadow: inset 1px 0px 0px rgba(0, 0, 0, 0.1);
  > .add {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    padding: 10px;
    border-radius: 8px;
    user-select: none;
    &:hover {
      background: rgba(116, 127, 141, 0.1);
    }
    .icon {
      width: 24px;
      height: 24px;
    }
    .txt {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #52525b;
    }
  }
`),ca=l.ZP.article`
  padding: 18px 16px;
  width: 100%;
  height: 100%;
  height: -webkit-fill-available;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-anchor: auto;
  /* pagination start */
  /* transform: rotate(180deg);
  direction: rtl;
  > div,
  > hr {
    direction: ltr;
    transform: rotate(180deg);
  } */
  /* pagination end */
  > .info {
    padding-top: 62px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    .title {
      font-weight: bold;
      font-size: 36px;
      line-height: 44px;
    }
    .desc {
      color: #78787c;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
    .edit {
      display: flex;
      align-items: center;
      gap: 4px;
      .icon {
        width: 16px;
        height: 16px;
        path {
          fill: #3c8ce7;
        }
      }
      padding: 0;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      background: linear-gradient(135deg, #3c8ce7 0%, #00eaff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
  /* > .feed {
  } */
`;var da=n(4851),pa=n(1206);const ha=l.ZP.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  /* background-color: #eee; */
`;function ua(e){let{pullUp:t=null}=e;const n=(0,i.useRef)(void 0);return(0,i.useEffect)((()=>{const e=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting&&t&&t()}))}),{threshold:0}),i=null===n||void 0===n?void 0:n.current;return i&&e.observe(n.current),()=>{i&&e.unobserve(i)}}),[n,t]),(0,x.jsx)(ha,{ref:n,children:(0,x.jsx)(pa.Z,{className:"loading",size:24,lineWeight:5,speed:1,color:"#ccc"})})}function xa(e){var t;let{cid:n="",dropFiles:l=[]}=e;const{values:r}=(0,C.Z)("agora"),{list:o,appends:u,hasMore:f,pullUp:m}=q({context:"channel",id:n}),[g,v]=(0,i.useState)(""),{pathname:b}=(0,a.TH)(),w=(0,s.I0)(),[j]=(0,Z.o5)(),k=(0,y.N)(j,300),[M,N]=(0,i.useState)(!0),[E,_]=(0,i.useState)(!1),{selects:D,userIds:I,data:L,messageData:P,loginUid:F,loginUser:S,footprint:H}=(0,s.v9)((e=>({selects:e.ui.selectMessages[`channel_${n}`],footprint:e.footprint,loginUser:e.contacts.byId[e.authData.uid],loginUid:e.authData.uid,userIds:e.contacts.ids,data:e.channels.byId[n]||{},messageData:e.message||{}})));(0,i.useEffect)((()=>(w((0,T.Cz)()),()=>{w((0,T.Cz)({path:b}))})),[b]);const z=()=>{_((e=>!e))};if(!L)return null;const{name:$,description:V,is_public:U,members:B=[],owner:A}=L,Y=U?I:B.slice(0).sort((e=>e==A?-1:0)),G=(null===S||void 0===S?void 0:S.is_admin)||A==F,X=H.readChannels[n],J=(null===L||void 0===L||null===(t=L.pinned_messages)||void 0===t?void 0:t.length)||0,Q=[...o,...u];return(0,x.jsxs)(x.Fragment,{children:[E&&(0,x.jsx)(da.Z,{cid:n,closeModal:z}),(0,x.jsx)(Wt,{to:n,context:"channel",dropFiles:l,aside:(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("ul",{className:"tools",children:[r.enabled&&(0,x.jsx)("li",{className:"tool",children:(0,x.jsx)(p.Z,{tip:"Voice/Video Chat",placement:"left",children:(0,x.jsx)(la,{})})}),(0,x.jsx)(p.Z,{tip:"Pin",placement:"left",disabled:"pin"==g,children:(0,x.jsx)(c.ZP,{onShow:()=>{v("pin")},onHide:()=>{v("")},placement:"left-start",popperOptions:{strategy:"fixed"},offset:[0,80],interactive:!0,trigger:"click",content:(0,x.jsx)(O,{id:n}),children:(0,x.jsx)("li",{className:`tool ${J>0?"badge":""} ${"pin"==g?"active":""} `,"data-count":J,children:(0,x.jsx)(wi,{})})})}),(0,x.jsx)(p.Z,{tip:"Favorite",placement:"left",disabled:"favorite"==g,children:(0,x.jsx)(c.ZP,{onShow:()=>{v("favorite")},onHide:()=>{v("")},placement:"left-start",popperOptions:{strategy:"fixed"},offset:[0,180],interactive:!0,trigger:"click",content:(0,x.jsx)(R,{cid:n}),children:(0,x.jsx)("li",{className:`tool fav ${"favorite"==g?"active":""} `,"data-count":J,children:(0,x.jsx)(Lt.Z,{})})})}),(0,x.jsx)("li",{className:"tool "+(M?"active":""),onClick:()=>{N((e=>!e))},children:(0,x.jsx)(p.Z,{tip:"Channel Members",placement:"left",children:(0,x.jsx)(na,{})})})]})}),header:(0,x.jsx)(ra,{className:"head",children:(0,x.jsxs)("div",{className:"txt",children:[(0,x.jsx)(K.Z,{personal:!U}),(0,x.jsx)("span",{className:"title",children:$}),(0,x.jsx)("span",{className:"desc",children:V})]})}),contacts:M?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(oa,{children:[G&&(0,x.jsxs)("div",{className:"add",onClick:z,children:[(0,x.jsx)("img",{className:"icon",src:d}),(0,x.jsx)("div",{className:"txt",children:"Add members"})]}),Y.map((e=>(0,x.jsx)(W.Z,{enableContextMenu:!0,cid:n,owner:A==e,uid:e,dm:!0,popover:!0},e)))]})}):null,children:(0,x.jsxs)(ca,{id:`RUSTCHAT_FEED_channel_${n}`,children:[f?(0,x.jsx)(ua,{pullUp:m}):(0,x.jsxs)("div",{className:"info",children:[(0,x.jsxs)("h2",{className:"title",children:["Welcome to #",$," !"]}),(0,x.jsxs)("p",{className:"desc",children:["This is the start of the #",$," channel. "]}),(0,x.jsxs)(h.OL,{to:`/setting/channel/${n}?f=${b}`,className:"edit",children:[(0,x.jsx)(Ee,{className:"icon"}),"Edit Channel"]})]}),Q.map(((e,t)=>{const i=P[e];if(!i)return null;const a=0==t,s=a?null:P[Q[t-1]],l=(null===i||void 0===i?void 0:i.from_uid)==F||e<=X;return Xi({selectMode:!!D,updateReadIndex:k,read:l,isFirst:a,prev:s,curr:i,contextId:n,context:"channel"})}))]})})]})}const fa=l.ZP.header`
  height: 100%;
  /* padding: 0 20px 0 10px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* tricky */
  > div {
    padding-left: 4px;
  }
  .txt {
    display: flex;
    align-items: center;
    gap: 5px;
    .title {
      font-size: 16px;
      line-height: 24px;
      color: #1c1c1e;
    }
    .desc {
      margin-left: 8px;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #616161;
    }
  }
`,ma=l.ZP.article`
  width: 100%;
  padding: 18px 16px;
  height: 100%;
  height: -webkit-fill-available;
  overflow: auto;
`;function ga(e){let{uid:t="",dropFiles:n=[]}=e;const{list:i,appends:a,hasMore:l,pullUp:r}=q({context:"user",id:t}),[o]=(0,Z.o5)(),d=(0,y.N)(o,300),{currUser:h,messageData:u,footprint:f,loginUid:m,selects:g}=(0,s.v9)((e=>({selects:e.ui.selectMessages[`user_${t}`],loginUid:e.authData.uid,footprint:e.footprint,currUser:e.contacts.byId[t],messageData:e.message})));if(!h)return null;const v=f.readUsers[t],b=[...i,...a];return(0,x.jsx)(Wt,{to:t,context:"user",dropFiles:n,aside:(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("ul",{className:"tools",children:[(0,x.jsx)("li",{className:"tool",children:(0,x.jsx)(la,{})}),(0,x.jsx)(p.Z,{tip:"Saved Items",placement:"left",children:(0,x.jsx)(c.ZP,{placement:"left-start",popperOptions:{strategy:"fixed"},offset:[0,180],interactive:!0,trigger:"click",content:(0,x.jsx)(R,{uid:t}),children:(0,x.jsx)("li",{className:"tool fav",children:(0,x.jsx)(Lt.Z,{})})})})]})}),header:(0,x.jsx)(fa,{className:"head",children:(0,x.jsx)(W.Z,{interactive:!1,uid:h.uid})}),children:(0,x.jsxs)(ma,{id:`RUSTCHAT_FEED_user_${t}`,children:[l?(0,x.jsx)(ua,{pullUp:r}):null,[...b].map(((e,n)=>{const i=u[e],a=0==n?null:u[b[n-1]],s=(null===i||void 0===i?void 0:i.from_uid)==m||e<=v;return Xi({selectMode:!!g,updateReadIndex:d,read:s,prev:a,curr:i,contextId:t,context:"user"})}))]})})}var va=n(5123),ba=n(4801);const Ca=l.ZP.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  height: calc(100vh - 56px - 56px - 16px);
  overflow: auto;
  > .session {
    > a {
      display: flex;
      gap: 8px;
      border-radius: 8px;
      padding: 8px;
      width: 100%;
      &.active,
      &:hover {
        background: rgba(116, 127, 141, 0.2);
      }
      &.drop_over {
        box-shadow: inset 0 0 0 2px #52edff;
      }
      .icon {
        flex: 1;
        background-color: #eee;
        border-radius: 50%;
        img {
          width: 40px;
          height: 40px;
          &.channel_default {
            padding: 5px;
            /* height: 35px; */
          }
        }
      }
      .details {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .up {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .name {
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: #52525b;
            max-width: 112px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .time {
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            color: #78787c;
            white-space: nowrap;
            overflow: hidden;
            max-width: 80px;
            text-overflow: ellipsis;
          }
        }
        .down {
          display: flex;
          align-items: center;
          justify-content: space-between;
          > .msg {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: #78787c;
            white-space: nowrap;
            overflow: hidden;
            width: 140px;
            text-overflow: ellipsis;
          }
          > .badge {
            color: #fff;
            height: 20px;
            min-width: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            background: #1fe1f9;
            font-weight: 900;
            font-size: 10px;
            line-height: 10px;
            &.dot {
              min-width: unset;
              width: 6px;
              height: 6px;
              padding: 0;
            }
            &.mute {
              background: #bfbfbf;
            }
          }
        }
      }
    }
  }
`;var wa=n(9694),ja=n.n(wa),ya=n(7054);function Za(e){let{context:t="user",id:n,visible:i,mid:l,hide:r,deleteChannel:o,setInviteChannelId:d,children:p}=e;const{canCopyEmail:h,copyEmail:u}=(0,ya.Z)({uid:"user"==t?n:null}),[f]=(0,B.bI)(),[m]=(0,Z.o5)(),g=(0,a.bS)(`/chat/dm/${n}`),v=(0,s.I0)(),b=(0,a.s0)(),{pathname:C}=(0,a.TH)(),{channelMuted:w}=(0,s.v9)((e=>({channelMuted:"channel"==t&&e.footprint.muteChannels[n]}))),j=()=>{if(l){m("user"==t?{users:[{uid:+n,mid:l}]}:{groups:[{gid:+n,mid:l}]})}},y="user"==t?[{title:"Mark As Read",handler:j},h&&{title:"Copy Email",handler:u},{title:"Hide Session",danger:!0,handler:()=>{v((0,ie.So)(n)),g&&b("/chat")}}]:[{title:"Settings",underline:!0,handler:()=>{b(`/setting/channel/${n}?f=${C}`)}},{title:"Mark As Read",handler:j},{title:w?"Unmute":"Mute",handler:()=>{f(w?{remove_groups:[n]}:{add_groups:[{gid:n}]})}},{title:"Invite People",handler:d.bind(null,n)},{title:"Delete Channel",danger:!0,handler:o.bind(null,n)}];return(0,x.jsx)(c.ZP,{interactive:!0,placement:"right-start",popperOptions:{strategy:"fixed"},followCursor:"initial",visible:i,onClickOutside:r,content:(0,x.jsx)(di.Z,{hideMenu:r,items:y}),children:p})}var ka,Ma=n(4721);function Na(){return Na=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},Na.apply(this,arguments)}const Ea=(e,t)=>{let{title:n,titleId:a,...s}=e;return i.createElement("svg",Na({width:5,height:8,viewBox:"0 0 5 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},s),n?i.createElement("title",{id:a},n):null,ka||(ka=i.createElement("path",{d:"M4.1875 3.16699V2.33366C4.1875 1.40033 3.375 0.666992 2.5 0.666992C1.625 0.666992 0.833333 1.40033 0.833333 2.33366V3.16699C0.373083 3.16699 0 3.54009 0 4.00032V6.50032C0 6.96056 0.373083 7.33366 0.833333 7.33366H2.5H4.16667C4.62692 7.33366 5 6.96056 5 6.50032V3.97949C5 3.53076 4.63625 3.16699 4.1875 3.16699ZM3.33333 3.16699H1.66667V2.33366C1.66667 1.85747 2.05558 1.50033 2.5 1.50033C2.94442 1.50033 3.33333 1.85747 3.33333 2.33366V3.16699Z",fill:"#616161"})))},_a=(0,i.forwardRef)(Ea);function Da(e){let{type:t="user",id:n,mid:l,setDeleteChannelId:r,setInviteChannelId:o}=e;const c=(0,a.s0)(),{addStageFile:d}=(0,he.Z)({context:t,id:n}),[{isActive:p},u]=(0,X.L)((()=>({accept:[J.FILE],drop(e){let{files:i}=e;if(i.length){const e=i.map((e=>{const{size:t,type:n,name:i}=e;return{size:t,type:n,name:i,url:URL.createObjectURL(e)}}));d(e),c("user"==t?`/chat/dm/${n}`:`/chat/channel/${n}`)}},collect:e=>({isActive:e.canDrop()&&e.isOver()})})),[t,n]),{visible:f,handleContextMenuEvent:m,hideContextMenu:g}=(0,Ai.Z)(),[v,b]=(0,i.useState)(null),{messageData:C,contactData:w,channelData:j,readIndex:y,loginUid:Z,mids:k}=(0,s.v9)((e=>({mids:"user"==t?e.userMessage.byId[n]:e.channelMessage[n],loginUid:e.authData.uid,readIndex:"user"==t?e.footprint.readUsers[n]:e.footprint.readChannels[n],messageData:e.message,contactData:e.contacts.byId,channelData:e.channels.byId})));if((0,i.useEffect)((()=>{const e="user"==t?w[n]:j[n];if(!e)return;const{name:i,icon:a,avatar:s,is_public:r=!0}=e;b("user"==t?{name:i,icon:s,mid:l,is_public:r}:{name:i,icon:a,mid:l,is_public:r})}),[n,l,t,w,j]),!v)return null;const M=C[l]||{},{name:N,icon:_,is_public:D}=v,{unreads:I=0}=Ji({mids:k,readIndex:y,messageData:C,loginUid:Z});return(0,x.jsx)("li",{className:"session",children:(0,x.jsx)(Za,{visible:f,hide:g,context:t,id:n,mid:l,setInviteChannelId:o,deleteChannel:r,children:(0,x.jsxs)(h.OL,{ref:u,className:"nav "+(p?"drop_over":""),to:"user"==t?`/chat/dm/${n}`:`/chat/channel/${n}`,onContextMenu:m,children:[(0,x.jsx)("div",{className:"icon",children:"user"==t?(0,x.jsx)(W.Z,{avatarSize:40,compact:!0,interactive:!1,className:"avatar",uid:n}):(0,x.jsx)("img",{className:""+(_?"":"channel_default"),onError:e=>{e.target.classList.add("channel_default"),e.target.src=Ma},src:_||Ma})}),(0,x.jsxs)("div",{className:"details",children:[(0,x.jsxs)("div",{className:"up",children:[(0,x.jsxs)("span",{className:"name",children:[N," ",!D&&(0,x.jsx)(_a,{})]}),(0,x.jsx)("span",{className:"time",children:M.created_at?E()(M.created_at).fromNow():null})]}),(0,x.jsxs)("div",{className:"down",children:[(0,x.jsx)("span",{className:"msg",children:qi(M)}),I>0&&(0,x.jsx)("i",{className:"badge "+(I>99?"dot":""),children:I>99?null:I})]})]})]})})})}E().extend(ja());var Ia=n(9367);function La(e){let{tempSession:t=null}=e;const[n,a]=(0,i.useState)(null),[l,r]=(0,i.useState)(null),[o,c]=(0,i.useState)([]),{channelIDs:d,DMs:p,readChannels:h,readUsers:u,channelMessage:f,userMessage:m,loginUid:g}=(0,s.v9)((e=>({loginUid:e.authData.uid,channelIDs:e.channels.ids,DMs:e.userMessage.ids,userMessage:e.userMessage.byId,channelMessage:e.channelMessage,readChannels:e.footprint.readChannels,readUsers:e.footprint.readUsers})));return(0,i.useEffect)((()=>{const e=[...d.map((e=>{const t=f[e];if(!t||0==t.length)return{mid:null,unreads:0,id:e,type:"channel"};return{key:`channel_${e}`,id:e,mid:[...t].pop(),type:"channel"}})),...p.map((e=>{const t=m[e];if(!t||0==t.length)return{mid:null,unreads:0,id:e,type:"user"};return{key:`user_${e}`,type:"user",id:e,mid:[...t].pop()}}))].sort(((e,t)=>t.mid-e.mid));c(t?[t,...e]:e)}),[d,p,f,h,u,g,m,t]),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(Ca,{children:o.map((e=>{const{key:t,type:n,id:i,mid:s}=e;return(0,x.jsx)(Da,{type:n,id:i,mid:s,setInviteChannelId:r,setDeleteChannelId:a,className:"session"},t)}))}),n&&(0,x.jsx)(Ia.Z,{id:n,closeModal:()=>{a(null)}}),l&&(0,x.jsx)(da.Z,{type:"channel",cid:l,closeModal:()=>{r(null)}})]})}function Pa(){const[e,t]=(0,i.useState)(!1),[n,l]=(0,i.useState)(!1),{channel_id:c,user_id:d}=(0,a.UO)(),{sessionUids:p}=(0,s.v9)((e=>({sessionUids:e.userMessage.ids}))),h=p.findIndex((e=>e==d))>-1?null:{mid:null,unreads:0,id:d,type:"user"},u=!c&&!d;return(0,x.jsxs)(x.Fragment,{children:[e&&(0,x.jsx)(ba.Z,{closeModal:()=>{t((e=>!e))},personal:!0}),n&&(0,x.jsx)(va.Z,{closeModal:()=>{l((e=>!e))}}),(0,x.jsxs)(r,{children:[(0,x.jsxs)("div",{className:"left",children:[(0,x.jsx)(m,{}),(0,x.jsx)(La,{tempSession:h}),(0,x.jsx)(j,{})]}),(0,x.jsxs)("div",{className:"right "+(u?"placeholder":""),children:[u&&(0,x.jsx)(o.Z,{}),c&&(0,x.jsx)(xa,{cid:c}),d&&(0,x.jsx)(ga,{uid:d})]})]})]})}},9367:(e,t,n)=>{n.d(t,{Z:()=>p});var i=n(7313),a=n(3657),s=n(7890),l=n(5607),r=n(5564),o=n(5845),c=n(1296),d=n(6417);function p(e){let{id:t,closeModal:n}=e;const p=(0,s.s0)(),[h,{isLoading:u,isSuccess:x}]=(0,r.kE)();return(0,i.useEffect)((()=>{x&&(a.ZP.success("delete channel successfully!"),n(),p("/chat"))}),[x]),t?(0,d.jsx)(l.Z,{id:"modal-modal",children:(0,d.jsx)(o.Z,{className:"compact",title:"Delete Channel",description:"Are you sure want to delete this channel?",buttons:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(c.Z,{onClick:n.bind(null,void 0),className:"cancel",children:"Cancel"}),(0,d.jsx)(c.Z,{onClick:()=>{h(t)},className:"danger",children:u?"Deleting":"Delete"})]})})}):null}},4721:(e,t,n)=>{e.exports=n.p+"static/media/channel.a72cc13c77b3112e68c1.svg"},169:(e,t,n)=>{e.exports=n.p+"static/media/more.54cac536d52aae6f342e.svg"}}]);