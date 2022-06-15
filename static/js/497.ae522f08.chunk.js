"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[497],{552:(e,n,i)=>{i.d(n,{Z:()=>r});var t,l,a=i(7313);function s(){return s=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e},s.apply(this,arguments)}const o=(e,n)=>{let{title:i,titleId:o,...r}=e;return a.createElement("svg",s({width:16,height:12,viewBox:"0 0 16 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:n,"aria-labelledby":o},r),i?a.createElement("title",{id:o},i):null,t||(t=a.createElement("g",{clipPath:"url(#clip0_9046_23916)"},a.createElement("path",{d:"M4.93942 9.69781L1.62578 6.38648C1.25336 6.01431 0.651746 6.01431 0.27932 6.38648C-0.0931066 6.75865 -0.0931066 7.35984 0.27932 7.73201L4.27096 11.7209C4.64339 12.093 5.245 12.093 5.61743 11.7209L15.7207 1.62465C16.0931 1.25248 16.0931 0.651292 15.7207 0.279125C15.3483 -0.0930417 14.7466 -0.0930417 14.3742 0.279125L4.93942 9.69781Z",fill:"#78787C"}))),l||(l=a.createElement("defs",null,a.createElement("clipPath",{id:"clip0_9046_23916"},a.createElement("rect",{width:16,height:12,fill:"white"})))))},r=(0,a.forwardRef)(o)},7814:(e,n,i)=>{i.d(n,{Z:()=>c});var t=i(7313),l=i(9184),a=i(5536);const s=i.p+"static/media/upload.image.9f8c7fc90042d2ff4eb7.svg";var o=i(6417);const r=l.ZP.div`
  width: 96px;
  height: 96px;
  position: relative;
  cursor: pointer;
  .avatar {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
    /* border: 1px solid #eee; */
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    input[type="file"] {
      cursor: pointer;
      display: block;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .tip {
      white-space: nowrap;
      padding: 4px;
      display: none;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-weight: bold;
      font-size: 12px;
      line-height: 18px;
    }
    &:hover .tip {
      display: flex;
    }
  }
  .icon {
    width: 28px;
    height: 28px;
    position: absolute;
    top: 0;
    right: 0;
  }
`;function c(e){let{url:n="",name:i="",type:l="user",uploadImage:c,disabled:d=!1}=e;const[p,h]=(0,t.useState)(!1);return(0,o.jsxs)(r,{children:[(0,o.jsxs)("div",{className:"avatar",children:[(0,o.jsx)(a.Z,{type:l,url:n,name:i}),!d&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"tip",children:p?"Uploading":"Change Avatar"}),(0,o.jsx)("input",{multiple:!1,onChange:async e=>{if(p)return;const[n]=e.target.files;h(!0),await c(n),h(!1)},type:"file",accept:"image/*",name:"avatar",id:"avatar"})]})]}),!d&&(0,o.jsx)("img",{src:s,alt:"icon",className:"icon"})]})}},11:(e,n,i)=>{i.d(n,{Z:()=>_});var t=i(7313),l=i(9184),a=i(2963),s=i(9784),o=i(3709),r=i(3657),c=i(6432),d=i(4527),p=i(8198),h=i(5120),m=i(3067),x=i(1296),u=i(6417);const g=l.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 32px;
  .tip {
    font-weight: 500;
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 8px;
  }
  .link {
    width: 512px;
    margin-bottom: 12px;
    position: relative;
    button {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
    }
    input {
      padding-right: 75px;
    }
  }
  .sub_tip {
    margin-left: 4px;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #616161;
    margin-bottom: 20px;
  }
`;function f(){const{generating:e,link:n,linkCopied:i,copyLink:t,generateNewLink:l}=(0,h.Z)();return(0,u.jsxs)(g,{children:[(0,u.jsx)("span",{className:"tip",children:"Share this link to invite people to this server."}),(0,u.jsxs)("div",{className:"link",children:[(0,u.jsx)(m.Z,{readOnly:!0,className:"large",placeholder:"Generating",value:n}),(0,u.jsx)(x.Z,{onClick:t,className:"ghost small border_less",children:i?"Copied":"Copy"})]}),(0,u.jsx)("span",{className:"sub_tip",children:"Invite link expires in 7 days."}),(0,u.jsx)(x.Z,{className:"ghost",disabled:e,onClick:()=>{l()},children:e?"Generating":"Generate New Link"})]})}var b,v,w=i(169),j=i(8214);function y(){return y=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e},y.apply(this,arguments)}const N=(e,n)=>{let{title:i,titleId:l,...a}=e;return t.createElement("svg",y({width:6,height:6,viewBox:"0 0 6 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:n,"aria-labelledby":l},a),i?t.createElement("title",{id:l},i):null,b||(b=t.createElement("rect",{opacity:.01,width:6,height:6,fill:"#D8D8D8"})),v||(v=t.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.62506 1.64911C5.41795 1.4503 5.08216 1.45029 4.87506 1.64911L3.00003 3.44911L1.12506 1.64916C0.917951 1.45034 0.582164 1.45034 0.375057 1.64916C0.16795 1.84798 0.16795 2.17033 0.375057 2.36915L2.62506 4.52912C2.83217 4.72794 3.16795 4.72794 3.37506 4.52912C3.37665 4.5276 3.37822 4.52608 3.37977 4.52454L5.62506 2.36911C5.83216 2.17029 5.83216 1.84793 5.62506 1.64911Z",fill:"black",fillOpacity:.5})))},k=(0,t.forwardRef)(N);var C=i(552),Z=i(7054);const S=l.ZP.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  .intro {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    .title {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #374151;
    }
    .desc {
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
      color: #616161;
    }
  }
  .members {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 512px;
    margin-bottom: 176px;
    .member {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      border-radius: var(--br);
      &:hover {
        background: #f9fafb;
      }
      .left {
        display: flex;
        gap: 8px;
        .info {
          display: flex;
          flex-direction: column;
          .name {
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
            color: #52525b;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .email {
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
            color: #52525b;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        gap: 28px;
        .role {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          text-align: right;
          color: #616161;
          display: flex;
          align-items: center;
          gap: 4px;
          > .icon {
            cursor: pointer;
          }
          /* override */
          .menu {
            min-width: 120px;
            .item .icon {
              width: 16px;
              height: 12px;
            }
          }
        }
        .opts {
          position: relative;
          width: 24px;
          height: 24px;
          .dots {
            cursor: pointer;
          }
          .menu {
            position: absolute;
          }
        }
      }
    }
  }
`;function _(e){var n;let{cid:i=null}=e;const{contacts:l,channels:h,loginUser:m}=(0,o.v9)((e=>({contacts:e.contacts,channels:e.channels,loginUser:e.contacts.byId[e.authData.uid]}))),{copyEmail:x,removeFromChannel:g,removeUser:b,canRemove:v,canRemoveFromChannel:y}=(0,Z.Z)({cid:i}),[N,{isSuccess:_}]=(0,c.wv)();(0,t.useEffect)((()=>{_&&r.ZP.success("Update Successfully")}),[_]);const L=e=>{let{ignore:n=!1,uid:i=null,isAdmin:t=!0}=e;(0,s.Bn)(),n||N({id:i,is_admin:t})},z=null!==(n=h.byId[i])&&void 0!==n?n:null,E=z?z.is_public?l.ids:z.members:l.ids;return(0,u.jsxs)(S,{children:[(null===m||void 0===m?void 0:m.is_admin)&&(0,u.jsx)(f,{}),(0,u.jsxs)("div",{className:"intro",children:[(0,u.jsx)("h4",{className:"title",children:"Manage Members"}),(0,u.jsx)("p",{className:"desc",children:"Disabling your account means you can recover it at any time after taking this action."})]}),(0,u.jsx)("ul",{className:"members",children:E.map((e=>{const{name:n,email:t,is_admin:s}=l.byId[e],o=z&&z.owner==e,r=m.is_admin&&m.uid!==e,c=t||(null===m||void 0===m?void 0:m.is_admin);return(0,u.jsxs)("li",{className:"member",children:[(0,u.jsxs)("div",{className:"left",children:[(0,u.jsx)(d.Z,{compact:!0,uid:e,interactive:!1}),(0,u.jsxs)("div",{className:"info",children:[(0,u.jsxs)("span",{className:"name",children:[n," ",o&&(0,u.jsx)(j.Z,{})]}),(0,u.jsx)("span",{className:"email",children:t})]})]}),(0,u.jsxs)("div",{className:"right",children:[(0,u.jsxs)("span",{className:"role",children:[s?"Admin":"User",r&&(0,u.jsx)(a.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,u.jsxs)(p.Z,{className:"menu",children:[(0,u.jsxs)("li",{className:"item sb",onClick:L.bind(null,{ignore:s,uid:e,isAdmin:!0}),children:["Admin",s&&(0,u.jsx)(C.Z,{className:"icon"})]}),(0,u.jsxs)("li",{className:"item sb",onClick:L.bind(null,{ignore:!s,uid:e,isAdmin:!1}),children:["User",!s&&(0,u.jsx)(C.Z,{className:"icon"})]})]}),children:(0,u.jsx)(k,{className:"icon"})})]}),c&&(0,u.jsx)(a.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,u.jsxs)(p.Z,{className:"menu",children:[t&&(0,u.jsx)("li",{className:"item",onClick:x.bind(null,t),children:"Copy Email"}),y&&(0,u.jsx)("li",{className:"item danger",onClick:g.bind(null,e),children:"Remove From Channel"}),v&&!i&&(0,u.jsx)("li",{className:"item danger",onClick:b.bind(null,e),children:"Remove From Server"})]}),children:(0,u.jsx)("div",{className:"opts",children:(0,u.jsx)("img",{className:"dots",src:w,alt:"dots icon"})})})]})]},e)}))})]})}},6567:(e,n,i)=>{i.d(n,{Z:()=>s});var t=i(9184),l=i(6417);const a=t.ZP.div`
  width: 100%;
  position: absolute;
  bottom: 64px;
  left: 0;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
  background: #fff;
  /* gap: 20px; */
  border: 1px solid #e5e7eb;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 25px;
  .txt {
    padding: 8px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  .btns {
    display: flex;
    align-items: center;
    gap: 14px;
    .btn {
      color: #fff;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      padding: 8px 14px;
      background: #1fe1f9;
      border: 1px solid #1fe1f9;
      box-sizing: border-box;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 25px;
      &.reset {
        background: none;
        color: #667085;
        border: none;
        box-shadow: none;
      }
    }
  }
`;function s(e){let{saveHandler:n,resetHandler:i}=e;return(0,l.jsxs)(a,{className:"animate__animated animate__flipInX animate__faster",children:[(0,l.jsx)("span",{className:"txt",children:"You have unsaved changes!"}),(0,l.jsxs)("div",{className:"btns",children:[(0,l.jsx)("button",{className:"btn reset",onClick:i,children:"Reset"}),(0,l.jsx)("button",{className:"btn",onClick:n,children:"Save Changes"})]})]})}},1129:(e,n,i)=>{i.d(n,{Z:()=>c});var t=i(9184),l=i(9466),a=i(7890);const s=i.p+"static/media/arrow.left.92fbb139607631555459.svg";var o=i(6417);const r=t.ZP.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  > .left {
    max-height: 100vh;
    overflow: scroll;
    padding: 32px 16px;
    min-width: 212px;
    background-color: #f5f6f7;
    > .title {
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #1c1c1e;
      margin-bottom: 32px;
      padding-left: 24px;
      background: url(${s});
      background-size: 16px;
      background-repeat: no-repeat;
      background-position: left;
    }
    > .items {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: 36px;
      &:before {
        padding-left: 12px;
        content: attr(data-title);
        font-weight: bold;
        font-size: 12px;
        line-height: 18px;
        color: #6b7280;
        margin-bottom: 2px;
      }
      .item {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #44494f;
        border-radius: 4px;
        &:hover,
        &.curr {
          background: #e7e5e4;
        }
        > a {
          display: block;
          padding: 4px 12px;
        }
      }
      &.danger .item {
        cursor: pointer;
        padding: 4px 12px;
        color: #ef4444;
        &:hover {
          background: none;
        }
      }
    }
  }
  > .right {
    background-color: #fff;
    width: 100%;
    max-height: 100%;
    /* max-height: -webkit-fill-available; */
    overflow: auto;
    padding: 32px;
    > .title {
      font-weight: bold;
      font-size: 20px;
      line-height: 30px;
      color: #374151;
      margin-bottom: 32px;
    }
  }
`;function c(e){let{closeModal:n,title:i="Settings",navs:t=[],dangers:s=[],nav:c,children:d}=e;const{pathname:p}=(0,a.TH)();return(0,o.jsxs)(r,{children:[(0,o.jsxs)("div",{className:"left",children:[(0,o.jsx)("h2",{onClick:n,className:"title",children:i}),t.map((e=>{let{title:n,items:i}=e;return(0,o.jsx)("ul",{"data-title":n,className:"items",children:i.map((e=>{let{name:n,title:i}=e;return(0,o.jsx)("li",{className:"item "+(n==(null===c||void 0===c?void 0:c.name)?"curr":""),children:(0,o.jsx)(l.OL,{to:`${p}?nav=${n}`,children:i})},n)}))},n)})),s.length?(0,o.jsx)("ul",{className:"items danger",children:s.map((e=>{if(!e)return null;const{title:n,handler:i}=e;return(0,o.jsx)("li",{onClick:i,className:"item",children:n},n)}))}):null]}),(0,o.jsxs)("div",{className:"right",children:[c&&(0,o.jsx)("h4",{className:"title",children:c.title}),d]})]})}},1707:(e,n,i)=>{i.d(n,{Z:()=>t});const t=i(9184).ZP.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
`},4155:(e,n,i)=>{i.d(n,{Z:()=>t});const t=i(9184).ZP.textarea`
  font-family: inherit;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
  border-radius: 4px;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  padding: 8px;
  color: #333;
  resize: unset;
  &:disabled {
    color: #78787c;
    background-color: #f9fafb;
  }
  &::placeholder {
    color: #d1d5db;
  }
`},9985:(e,n,i)=>{i.r(n),i.d(n,{default:()=>O});var t=i(7313),l=i(3709),a=i(9466),s=i(7890),o=i(3657),r=i(9184),c=i(5607),d=i(5564);function p(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;const{channel:n,loginUid:i}=(0,l.v9)((n=>({channel:n.channels.byId[e],loginUid:n.authData.uid}))),[t,{isLoading:a,isSuccess:s}]=(0,d.tW)(),[o,{isLoading:r,isSuccess:c}]=(0,d.VJ)(),p=function(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;n&&t({id:e,owner:n})},h=()=>{e&&o(e)},m=i==n.owner,x=n.members.filter((e=>e!=i));return{otherMembers:x,transferOwner:p,leaveChannel:h,leaving:r,leaveSuccess:c,isOwner:m,transfering:a,transferSuccess:s}}var h=i(5845),m=i(1296),x=i(4527),u=i(6417);const g=r.ZP.ul`
  display: flex;
  flex-direction: column;
  max-height: 260px;
  padding: 16px 0;
  overflow-y: scroll;
  .user {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 8px;
    width: -webkit-fill-available;
    &:hover,
    &.selected {
      background: rgba(116, 127, 141, 0.1);
    }
    > a {
      width: 100%;
    }
  }
`;function f(e){let{id:n,closeModal:i,withLeave:l=!0}=e;const{transferOwner:a,otherMembers:r,leaving:d,leaveChannel:f,leaveSuccess:b,transferSuccess:v,transfering:w}=p(n),[j,y]=(0,t.useState)(null),N=(0,s.s0)(),k=e=>{y(e)};if((0,t.useEffect)((()=>{v&&b&&(o.ZP.success("Leave channel successfully!"),i(),N("/chat"))}),[b,v,l]),!n)return null;const C=d||w;return(0,u.jsx)(c.Z,{id:"modal-modal",children:(0,u.jsx)(h.Z,{className:"compact",title:"Transfer Ownership",description:"This cannot be undone.",buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(m.Z,{onClick:i.bind(null,void 0),className:"cancel",children:"Cancel"}),(0,u.jsx)(m.Z,{disabled:!j,onClick:async()=>{j&&(await a(j),l&&await f())},className:"danger",children:C?"Assigning":"Assign and Leave"})]}),children:(0,u.jsx)(g,{children:r.map((e=>(0,u.jsx)("li",{className:"user "+(j==e?"selected":""),onClick:k.bind(null,e),children:(0,u.jsx)(x.Z,{uid:e,interactive:!1})},e)))})})})}function b(e){let{id:n,closeModal:i,handleNextStep:l}=e;const a=(0,s.s0)(),{isOwner:r,leaving:d,leaveChannel:x,leaveSuccess:g}=p(n);return(0,t.useEffect)((()=>{g&&(o.ZP.success("Leave channel successfully!"),i(),a("/chat"))}),[g]),n?(0,u.jsx)(c.Z,{id:"modal-modal",children:(0,u.jsx)(h.Z,{className:"compact",title:"Leave Channel",description:r?"You need to transfer your channel ownership to someone else before leaving the channel.":"Are you sure want to leave this channel?",buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(m.Z,{onClick:i.bind(null,void 0),className:"cancel",children:"Cancel"}),r?(0,u.jsx)(m.Z,{onClick:l,className:"main",children:"Next"}):(0,u.jsx)(m.Z,{onClick:x,className:"danger",children:d?"Leaving":"Leave"})]})})}):null}function v(e){let{id:n=null,isOwner:i=!1,closeModal:l}=e;const[a,s]=(0,t.useState)(i);return a?(0,u.jsx)(f,{id:n,closeModal:l}):(0,u.jsx)(b,{id:n,closeModal:l,handleNextStep:()=>{s(!0)}})}var w=i(1129),j=i(9367),y=i(7814),N=i(3067),k=i(1707),C=i(4155),Z=i(6567),S=i(4721);const _=r.ZP.div`
  position: relative;
  width: 512px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .inputs {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    .input {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      .name {
        padding-left: 36px;
        background-image: url(${S});
        background-size: 20px;
        background-position-x: 8px;
        background-position-y: 8px;
        background-repeat: no-repeat;
      }
    }
  }
`;function L(e){let{id:n=0}=e;const{loginUser:i,channel:a}=(0,l.v9)((e=>({loginUser:e.contacts.byId[e.authData.uid],channel:e.channels.byId[n]}))),{data:s,refetch:r}=(0,d.aw)(n),[c,p]=(0,t.useState)(!1),[h,m]=(0,t.useState)(null),[x]=(0,d.kG)(),[g,{isSuccess:f}]=(0,d.tW)(),b=e=>{const n=e.target.value,{type:i}=e.target.dataset;m((e=>({...e,[i]:n})))};if((0,t.useEffect)((()=>{s&&m(s)}),[s]),(0,t.useEffect)((()=>{if(s&&h){const{name:e,description:n}=h,{name:i,description:t}=s;p(i!==e||t!==n)}}),[s,h]),(0,t.useEffect)((()=>{f&&(o.ZP.success("Channel updated!"),r())}),[f]),!h||!n)return null;const{name:v,description:w}=h,j=!(null!==i&&void 0!==i&&i.is_admin)&&(null===a||void 0===a?void 0:a.owner)!=(null===i||void 0===i?void 0:i.uid);return(0,u.jsxs)(_,{children:[(0,u.jsx)(y.Z,{type:"channel",url:null===a||void 0===a?void 0:a.icon,name:v,uploadImage:e=>{x({gid:n,image:e})}}),(0,u.jsxs)("div",{className:"inputs",children:[(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)(k.Z,{htmlFor:"name",children:"Channel Name"}),(0,u.jsx)(N.Z,{disabled:j,className:"name","data-type":"name",onChange:b,value:v,name:"name",id:"name",placeholder:"Channel Name"})]}),(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)(k.Z,{htmlFor:"desc",children:"Channel Topic"}),(0,u.jsx)(C.Z,{disabled:j,"data-type":"description",onChange:b,value:null!==w&&void 0!==w?w:"",rows:4,name:"name",id:"name",placeholder:"Let everyone know how to use this channel."})]})]}),c&&(0,u.jsx)(Z.Z,{saveHandler:()=>{const{name:e,description:i}=h;g({id:n,name:e,description:i})},resetHandler:()=>{m(s)}})]})}var z=i(11);const E=e=>[{title:"General",items:[{name:"overview",title:"Overview",component:(0,u.jsx)(L,{id:e})},{name:"members",title:"Members",component:(0,u.jsx)(z.Z,{cid:e})}]}];let P=null;function O(){var e;const{cid:n}=(0,s.UO)(),{isAdmin:i,loginUid:o,channel:r}=(0,l.v9)((e=>{var i;return{loginUid:e.authData.uid,isAdmin:null===(i=e.contacts.byId[e.authData.uid])||void 0===i?void 0:i.is_admin,channel:e.channels.byId[n]}})),c=(0,s.s0)(),[d]=(0,a.lr)(),p=E(n),h=p.map((e=>{let{items:n}=e;return n})).flat(),m=d.get("nav");P=null!==(e=P)&&void 0!==e?e:d.get("f")||"/";const[x,g]=(0,t.useState)(!1),[f,b]=(0,t.useState)(!1),y=()=>{g((e=>!e))},N=()=>{b((e=>!e))};if(!n)return null;const k=h.find((e=>e.name==m))||h[0],C=i||(null===r||void 0===r?void 0:r.owner)==o,Z=!(null!==r&&void 0!==r&&r.is_public);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(w.Z,{nav:k,closeModal:()=>{c(P),P=null},title:"Channel Setting",navs:p,dangers:[Z&&{title:"Leave Channel",handler:N},C&&{title:"Delete Channel",handler:y}],children:k.component}),x&&(0,u.jsx)(j.Z,{closeModal:y,id:n}),f&&(0,u.jsx)(v,{closeModal:N,id:n})]})}}}]);