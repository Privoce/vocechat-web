"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[106],{552:(e,n,i)=>{i.d(n,{Z:()=>r});var t,l,a=i(7313);function s(){return s=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e},s.apply(this,arguments)}const o=(e,n)=>{let{title:i,titleId:o,...r}=e;return a.createElement("svg",s({width:16,height:12,viewBox:"0 0 16 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:n,"aria-labelledby":o},r),i?a.createElement("title",{id:o},i):null,t||(t=a.createElement("g",{clipPath:"url(#clip0_9046_23916)"},a.createElement("path",{d:"M4.93942 9.69781L1.62578 6.38648C1.25336 6.01431 0.651746 6.01431 0.27932 6.38648C-0.0931066 6.75865 -0.0931066 7.35984 0.27932 7.73201L4.27096 11.7209C4.64339 12.093 5.245 12.093 5.61743 11.7209L15.7207 1.62465C16.0931 1.25248 16.0931 0.651292 15.7207 0.279125C15.3483 -0.0930417 14.7466 -0.0930417 14.3742 0.279125L4.93942 9.69781Z",fill:"#78787C"}))),l||(l=a.createElement("defs",null,a.createElement("clipPath",{id:"clip0_9046_23916"},a.createElement("rect",{width:16,height:12,fill:"white"})))))},r=(0,a.forwardRef)(o)},3960:(e,n,i)=>{i.d(n,{Z:()=>c});var t=i(7313),l=i(9184),a=i(1590);const s=i.p+"static/media/upload.image.9f8c7fc90042d2ff4eb7.svg";var o=i(6417);const r=l.ZP.div`
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
`;function c(e){let{url:n="",name:i="",type:l="user",uploadImage:c,disabled:d=!1}=e;const[p,h]=(0,t.useState)(!1);return(0,o.jsxs)(r,{children:[(0,o.jsxs)("div",{className:"avatar",children:[(0,o.jsx)(a.Z,{type:l,url:n,name:i}),!d&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"tip",children:p?"Uploading":"Change Avatar"}),(0,o.jsx)("input",{multiple:!1,onChange:async e=>{if(p)return;const[n]=e.target.files;h(!0),await c(n),h(!1)},type:"file",accept:"image/*",name:"avatar",id:"avatar"})]})]}),!d&&(0,o.jsx)("img",{src:s,alt:"icon",className:"icon"})]})}},6047:(e,n,i)=>{i.d(n,{Z:()=>_});var t=i(7313),l=i(9184),a=i(2963),s=i(9784),o=i(3657),r=i(6123),c=i(5515),d=i(5281),p=i(3165),h=i(4050),m=i(1140),x=i(6417);const u=l.ZP.div`
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
`;function g(){const{generating:e,link:n,linkCopied:i,copyLink:t,generateNewLink:l}=(0,p.Z)();return(0,x.jsxs)(u,{children:[(0,x.jsx)("span",{className:"tip",children:"Share this link to invite people to this server."}),(0,x.jsxs)("div",{className:"link",children:[(0,x.jsx)(h.Z,{readOnly:!0,className:"large",placeholder:"Generating",value:n}),(0,x.jsx)(m.Z,{onClick:t,className:"ghost small border_less",children:i?"Copied":"Copy"})]}),(0,x.jsx)("span",{className:"sub_tip",children:"Invite link expires in 7 days."}),(0,x.jsx)(m.Z,{className:"ghost",disabled:e,onClick:()=>{l()},children:e?"Generating":"Generate New Link"})]})}var f,b,v=i(169),w=i(8214);function j(){return j=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e},j.apply(this,arguments)}const y=(e,n)=>{let{title:i,titleId:l,...a}=e;return t.createElement("svg",j({width:6,height:6,viewBox:"0 0 6 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:n,"aria-labelledby":l},a),i?t.createElement("title",{id:l},i):null,f||(f=t.createElement("rect",{opacity:.01,width:6,height:6,fill:"#D8D8D8"})),b||(b=t.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.62506 1.64911C5.41795 1.4503 5.08216 1.45029 4.87506 1.64911L3.00003 3.44911L1.12506 1.64916C0.917951 1.45034 0.582164 1.45034 0.375057 1.64916C0.16795 1.84798 0.16795 2.17033 0.375057 2.36915L2.62506 4.52912C2.83217 4.72794 3.16795 4.72794 3.37506 4.52912C3.37665 4.5276 3.37822 4.52608 3.37977 4.52454L5.62506 2.36911C5.83216 2.17029 5.83216 1.84793 5.62506 1.64911Z",fill:"black",fillOpacity:.5})))},N=(0,t.forwardRef)(y);var k=i(552),C=i(5722),Z=i(8529);const S=l.ZP.section`
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
`;function _(e){var n;let{cid:i=null}=e;const{contacts:l,channels:p,loginUser:h}=(0,Z.CG)((e=>({contacts:e.contacts,channels:e.channels,loginUser:e.contacts.byId[e.authData.uid]}))),{copyEmail:m,removeFromChannel:u,removeUser:f,canRemove:b,canRemoveFromChannel:j}=(0,C.Z)({cid:i}),[y,{isSuccess:_}]=(0,r.wv)();(0,t.useEffect)((()=>{_&&o.ZP.success("Update Successfully")}),[_]);const L=e=>{let{ignore:n=!1,uid:i=null,isAdmin:t=!0}=e;(0,s.Bn)(),n||y({id:i,is_admin:t})},z=null!==(n=p.byId[i])&&void 0!==n?n:null,E=z?z.is_public?l.ids:z.members:l.ids;return(0,x.jsxs)(S,{children:[(null===h||void 0===h?void 0:h.is_admin)&&(0,x.jsx)(g,{}),(0,x.jsxs)("div",{className:"intro",children:[(0,x.jsx)("h4",{className:"title",children:"Manage Members"}),(0,x.jsx)("p",{className:"desc",children:"Disabling your account means you can recover it at any time after taking this action."})]}),(0,x.jsx)("ul",{className:"members",children:E.map((e=>{const{name:n,email:t,is_admin:s}=l.byId[e],o=z&&z.owner==e,r=h.is_admin&&h.uid!==e,p=t||(null===h||void 0===h?void 0:h.is_admin);return(0,x.jsxs)("li",{className:"member",children:[(0,x.jsxs)("div",{className:"left",children:[(0,x.jsx)(c.Z,{compact:!0,uid:e,interactive:!1}),(0,x.jsxs)("div",{className:"info",children:[(0,x.jsxs)("span",{className:"name",children:[n," ",o&&(0,x.jsx)(w.Z,{})]}),(0,x.jsx)("span",{className:"email",children:t})]})]}),(0,x.jsxs)("div",{className:"right",children:[(0,x.jsxs)("span",{className:"role",children:[s?"Admin":"User",r&&(0,x.jsx)(a.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,x.jsxs)(d.Z,{className:"menu",children:[(0,x.jsxs)("li",{className:"item sb",onClick:L.bind(null,{ignore:s,uid:e,isAdmin:!0}),children:["Admin",s&&(0,x.jsx)(k.Z,{className:"icon"})]}),(0,x.jsxs)("li",{className:"item sb",onClick:L.bind(null,{ignore:!s,uid:e,isAdmin:!1}),children:["User",!s&&(0,x.jsx)(k.Z,{className:"icon"})]})]}),children:(0,x.jsx)(N,{className:"icon"})})]}),p&&(0,x.jsx)(a.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,x.jsxs)(d.Z,{className:"menu",children:[t&&(0,x.jsx)("li",{className:"item",onClick:m.bind(null,t),children:"Copy Email"}),j&&(0,x.jsx)("li",{className:"item danger",onClick:u.bind(null,e),children:"Remove From Channel"}),b&&!i&&(0,x.jsx)("li",{className:"item danger",onClick:f.bind(null,e),children:"Remove From Server"})]}),children:(0,x.jsx)("div",{className:"opts",children:(0,x.jsx)("img",{className:"dots",src:v,alt:"dots icon"})})})]})]},e)}))})]})}},5579:(e,n,i)=>{i.d(n,{Z:()=>s});var t=i(9184),l=i(6417);const a=t.ZP.div`
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
`,s=e=>{let{saveHandler:n,resetHandler:i}=e;return(0,l.jsxs)(a,{className:"animate__animated animate__flipInX animate__faster",children:[(0,l.jsx)("span",{className:"txt",children:"You have unsaved changes!"}),(0,l.jsxs)("div",{className:"btns",children:[(0,l.jsx)("button",{className:"btn reset",onClick:i,children:"Reset"}),(0,l.jsx)("button",{className:"btn",onClick:n,children:"Save Changes"})]})]})}},5638:(e,n,i)=>{i.d(n,{Z:()=>c});var t=i(9184),l=i(9466),a=i(7890);const s=i.p+"static/media/arrow.left.92fbb139607631555459.svg";var o=i(6417);const r=t.ZP.div`
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
`,c=e=>{let{closeModal:n,title:i="Settings",navs:t=[],dangers:s=[],nav:c,children:d}=e;const{pathname:p}=(0,a.TH)();return(0,o.jsxs)(r,{children:[(0,o.jsxs)("div",{className:"left",children:[(0,o.jsx)("h2",{onClick:n,className:"title",children:i}),t.map((e=>{let{title:n,items:i}=e;return(0,o.jsx)("ul",{"data-title":n,className:"items",children:i.map((e=>{let{name:n,title:i}=e;return(0,o.jsx)("li",{className:"item "+(n==(null===c||void 0===c?void 0:c.name)?"curr":""),children:(0,o.jsx)(l.OL,{to:`${p}?nav=${n}`,children:i})},n)}))},n)})),s.length?(0,o.jsx)("ul",{className:"items danger",children:s.map((e=>{if(!e)return null;const{title:n,handler:i}=e;return(0,o.jsx)("li",{onClick:i,className:"item",children:n},n)}))}):null]}),(0,o.jsxs)("div",{className:"right",children:[c&&(0,o.jsx)("h4",{className:"title",children:c.title}),d]})]})}},7169:(e,n,i)=>{i.d(n,{Z:()=>t});const t=i(9184).ZP.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
`},4458:(e,n,i)=>{i.d(n,{Z:()=>t});const t=i(9184).ZP.textarea`
  font-family: inherit;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(31, 41, 55, 0.08);
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
`},3798:(e,n,i)=>{i.r(n),i.d(n,{default:()=>O});var t=i(7313),l=i(9466),a=i(7890),s=i(3657),o=i(9184),r=i(666),c=i(1962),d=i(8529);function p(e){const{channel:n,loginUid:i}=(0,d.CG)((n=>({channel:n.channels.byId[e],loginUid:n.authData.uid}))),[t,{isLoading:l,isSuccess:a}]=(0,c.tW)(),[s,{isLoading:o,isSuccess:r}]=(0,c.VJ)(),p=i==n.owner;return{otherMembers:n.members.filter((e=>e!=i)),transferOwner:function(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;n&&t({id:e,owner:n})},leaveChannel:()=>{e&&s(e)},leaving:o,leaveSuccess:r,isOwner:p,transfering:l,transferSuccess:a}}var h=i(6571),m=i(1140),x=i(5515),u=i(6417);const g=o.ZP.ul`
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
`,f=e=>{let{id:n,closeModal:i,withLeave:l=!0}=e;const{transferOwner:o,otherMembers:c,leaving:d,leaveChannel:f,leaveSuccess:b,transferSuccess:v,transfering:w}=p(n),[j,y]=(0,t.useState)(null),N=(0,a.s0)(),k=e=>{y(e)};if((0,t.useEffect)((()=>{v&&b&&(s.ZP.success("Leave channel successfully!"),i(),N("/chat"))}),[b,v,l]),!n)return null;const C=d||w;return(0,u.jsx)(r.Z,{id:"modal-modal",children:(0,u.jsx)(h.Z,{className:"compact",title:"Transfer Ownership",description:"This cannot be undone.",buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(m.Z,{onClick:i.bind(null,void 0),className:"cancel",children:"Cancel"}),(0,u.jsx)(m.Z,{disabled:!j,onClick:async()=>{j&&(await o(j),l&&await f())},className:"danger",children:C?"Assigning":"Assign and Leave"})]}),children:(0,u.jsx)(g,{children:c.map((e=>(0,u.jsx)("li",{className:"user "+(j==e?"selected":""),onClick:k.bind(null,e),children:(0,u.jsx)(x.Z,{uid:e,interactive:!1})},e)))})})})},b=e=>{let{id:n,closeModal:i,handleNextStep:l}=e;const o=(0,a.s0)(),{isOwner:c,leaving:d,leaveChannel:x,leaveSuccess:g}=p(n);return(0,t.useEffect)((()=>{g&&(s.ZP.success("Leave channel successfully!"),i(),o("/chat"))}),[g]),n?(0,u.jsx)(r.Z,{id:"modal-modal",children:(0,u.jsx)(h.Z,{className:"compact",title:"Leave Channel",description:c?"You need to transfer your channel ownership to someone else before leaving the channel.":"Are you sure want to leave this channel?",buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(m.Z,{onClick:i.bind(null,void 0),className:"cancel",children:"Cancel"}),c?(0,u.jsx)(m.Z,{onClick:l,className:"main",children:"Next"}):(0,u.jsx)(m.Z,{onClick:x,className:"danger",children:d?"Leaving":"Leave"})]})})}):null},v=e=>{let{id:n,isOwner:i=!1,closeModal:l}=e;const[a,s]=(0,t.useState)(i);return a?(0,u.jsx)(f,{id:n,closeModal:l}):(0,u.jsx)(b,{id:n,closeModal:l,handleNextStep:()=>{s(!0)}})};var w=i(5638),j=i(6258),y=i(3960),N=i(4050),k=i(7169),C=i(4458),Z=i(5579),S=i(4721);const _=o.ZP.div`
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
`;function L(e){let{id:n=0}=e;const{loginUser:i,channel:l}=(0,d.CG)((e=>({loginUser:e.contacts.byId[e.authData.uid],channel:e.channels.byId[n]}))),{data:a,refetch:o}=(0,c.aw)(n),[r,p]=(0,t.useState)(!1),[h,m]=(0,t.useState)(null),[x]=(0,c.kG)(),[g,{isSuccess:f}]=(0,c.tW)(),b=e=>{const n=e.target.value,{type:i}=e.target.dataset;m((e=>({...e,[i]:n})))};if((0,t.useEffect)((()=>{a&&m(a)}),[a]),(0,t.useEffect)((()=>{if(a&&h){const{name:e,description:n}=h,{name:i,description:t}=a;p(i!==e||t!==n)}}),[a,h]),(0,t.useEffect)((()=>{f&&(s.ZP.success("Channel updated!"),o())}),[f]),!h||!n)return null;const{name:v,description:w}=h,j=!(null!==i&&void 0!==i&&i.is_admin)&&(null===l||void 0===l?void 0:l.owner)!=(null===i||void 0===i?void 0:i.uid);return(0,u.jsxs)(_,{children:[(0,u.jsx)(y.Z,{type:"channel",url:null===l||void 0===l?void 0:l.icon,name:v,uploadImage:e=>{x({gid:n,image:e})}}),(0,u.jsxs)("div",{className:"inputs",children:[(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)(k.Z,{htmlFor:"name",children:"Channel Name"}),(0,u.jsx)(N.Z,{disabled:j,className:"name","data-type":"name",onChange:b,value:v,name:"name",id:"name",placeholder:"Channel Name"})]}),(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)(k.Z,{htmlFor:"desc",children:"Channel Topic"}),(0,u.jsx)(C.Z,{disabled:j,"data-type":"description",onChange:b,value:null!==w&&void 0!==w?w:"",rows:4,name:"name",id:"name",placeholder:"Let everyone know how to use this channel."})]})]}),r&&(0,u.jsx)(Z.Z,{saveHandler:()=>{const{name:e,description:i}=h;g({id:n,name:e,description:i})},resetHandler:()=>{m(a)}})]})}var z=i(6047);const E=e=>[{title:"General",items:[{name:"overview",title:"Overview",component:(0,u.jsx)(L,{id:e})},{name:"members",title:"Members",component:(0,u.jsx)(z.Z,{cid:e})}]}];let P=null;function O(){var e;const{cid:n}=(0,a.UO)(),{isAdmin:i,loginUid:s,channel:o}=(0,d.CG)((e=>{var i;return{loginUid:e.authData.uid,isAdmin:null===(i=e.contacts.byId[e.authData.uid])||void 0===i?void 0:i.is_admin,channel:e.channels.byId[n]}})),r=(0,a.s0)(),[c]=(0,l.lr)(),p=E(n),h=p.map((e=>{let{items:n}=e;return n})).flat(),m=c.get("nav");P=null!==(e=P)&&void 0!==e?e:c.get("f")||"/";const[x,g]=(0,t.useState)(!1),[f,b]=(0,t.useState)(!1),y=()=>{g((e=>!e))},N=()=>{b((e=>!e))};if(!n)return null;const k=h.find((e=>e.name==m))||h[0],C=i||(null===o||void 0===o?void 0:o.owner)==s,Z=!(null!==o&&void 0!==o&&o.is_public);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(w.Z,{nav:k,closeModal:()=>{r(P),P=null},title:"Channel Setting",navs:p,dangers:[Z&&{title:"Leave Channel",handler:N},C&&{title:"Delete Channel",handler:y}],children:k.component}),x&&(0,u.jsx)(j.Z,{closeModal:y,id:n}),f&&(0,u.jsx)(v,{closeModal:N,id:n})]})}}}]);