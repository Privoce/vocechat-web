"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[55],{552:(e,i,n)=>{n.d(i,{Z:()=>r});var t,l,a=n(7313);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},s.apply(this,arguments)}const o=(e,i)=>{let{title:n,titleId:o,...r}=e;return a.createElement("svg",s({width:16,height:12,viewBox:"0 0 16 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":o},r),n?a.createElement("title",{id:o},n):null,t||(t=a.createElement("g",{clipPath:"url(#clip0_9046_23916)"},a.createElement("path",{d:"M4.93942 9.69781L1.62578 6.38648C1.25336 6.01431 0.651746 6.01431 0.27932 6.38648C-0.0931066 6.75865 -0.0931066 7.35984 0.27932 7.73201L4.27096 11.7209C4.64339 12.093 5.245 12.093 5.61743 11.7209L15.7207 1.62465C16.0931 1.25248 16.0931 0.651292 15.7207 0.279125C15.3483 -0.0930417 14.7466 -0.0930417 14.3742 0.279125L4.93942 9.69781Z",fill:"#78787C"}))),l||(l=a.createElement("defs",null,a.createElement("clipPath",{id:"clip0_9046_23916"},a.createElement("rect",{width:16,height:12,fill:"white"})))))},r=(0,a.forwardRef)(o)},3960:(e,i,n)=>{n.d(i,{Z:()=>c});var t=n(7313),l=n(244),a=n(1590);const s=n.p+"static/media/upload.image.9f8c7fc90042d2ff4eb7.svg";var o=n(6417);const r=l.ZP.div`
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
`,c=e=>{let{url:i="",name:n="",type:l="user",uploadImage:c,disabled:d=!1}=e;const[p,h]=(0,t.useState)(!1);return(0,o.jsxs)(r,{children:[(0,o.jsxs)("div",{className:"avatar",children:[(0,o.jsx)(a.Z,{type:l,url:i,name:n}),!d&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"tip",children:p?"Uploading":"Change Avatar"}),(0,o.jsx)("input",{multiple:!1,onChange:async e=>{if(p)return;if(!e.target.files)return;const[i]=Array.from(e.target.files);h(!0),await c(i),h(!1)},type:"file",accept:"image/*",name:"avatar",id:"avatar"})]})]}),!d&&(0,o.jsx)("img",{src:s,alt:"icon",className:"icon"})]})}},3941:(e,i,n)=>{n.d(i,{Z:()=>L});var t=n(7313),l=n(2963),a=n(7371),s=n(6059),o=n(6113),r=n(1742),c=n(244);const d=c.ZP.section`
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
`;var p=n(5281),h=n(9559),m=n(4050),x=n(1140),u=n(6417);const g=c.ZP.div`
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
`,f=()=>{const{generating:e,link:i,linkCopied:n,copyLink:t,generateNewLink:l}=(0,h.Z)();return(0,u.jsxs)(g,{children:[(0,u.jsx)("span",{className:"tip",children:"Share this link to invite people to this server."}),(0,u.jsxs)("div",{className:"link",children:[(0,u.jsx)(m.Z,{readOnly:!0,className:"large",placeholder:"Generating",value:i}),(0,u.jsx)(x.Z,{onClick:t,className:"ghost small border_less",children:n?"Copied":"Copy"})]}),(0,u.jsx)("span",{className:"sub_tip",children:"Invite link expires in 7 days."}),(0,u.jsx)(x.Z,{className:"ghost",disabled:e,onClick:()=>{l()},children:e?"Generating":"Generate New Link"})]})};var v,b,j=n(169),w=n(8214);function y(){return y=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},y.apply(this,arguments)}const N=(e,i)=>{let{title:n,titleId:l,...a}=e;return t.createElement("svg",y({width:6,height:6,viewBox:"0 0 6 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":l},a),n?t.createElement("title",{id:l},n):null,v||(v=t.createElement("rect",{opacity:.01,width:6,height:6,fill:"#D8D8D8"})),b||(b=t.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.62506 1.64911C5.41795 1.4503 5.08216 1.45029 4.87506 1.64911L3.00003 3.44911L1.12506 1.64916C0.917951 1.45034 0.582164 1.45034 0.375057 1.64916C0.16795 1.84798 0.16795 2.17033 0.375057 2.36915L2.62506 4.52912C2.83217 4.72794 3.16795 4.72794 3.37506 4.52912C3.37665 4.5276 3.37822 4.52608 3.37977 4.52454L5.62506 2.36911C5.83216 2.17029 5.83216 1.84793 5.62506 1.64911Z",fill:"black",fillOpacity:.5})))},k=(0,t.forwardRef)(N);var C=n(552),Z=n(1238),_=n(4025);const L=e=>{let{cid:i}=e;const{users:n,channels:c,loginUser:h}=(0,_.CG)((e=>({users:e.users,channels:e.channels,loginUser:e.authData.user}))),{copyEmail:m,removeFromChannel:x,removeUser:g}=(0,Z.Z)({cid:i}),[v,{isSuccess:b}]=(0,o.kD)();(0,t.useEffect)((()=>{b&&s.ZP.success("Update Successfully")}),[b]);const y=e=>{let{ignore:i=!1,uid:n,isAdmin:t=!0}=e;(0,a.Bn)(),i||v({id:n,is_admin:t})},N=i?c.byId[i]:null,L=N?N.is_public?n.ids:N.members:n.ids;return(0,u.jsxs)(d,{children:[(null===h||void 0===h?void 0:h.is_admin)&&(0,u.jsx)(f,{}),(0,u.jsxs)("div",{className:"intro",children:[(0,u.jsx)("h4",{className:"title",children:"Manage Members"}),(0,u.jsx)("p",{className:"desc",children:"Disabling your account means you can recover it at any time after taking this action."})]}),(0,u.jsx)("ul",{className:"members",children:L.map((e=>{const i=n.byId[e];if(!i)return null;const{name:t,email:a,is_admin:s}=i,o=N&&N.owner==e,c=(null===h||void 0===h?void 0:h.is_admin)&&h.uid!==e,d=a||(null===h||void 0===h?void 0:h.is_admin),f=(null===h||void 0===h?void 0:h.is_admin)&&(null===h||void 0===h?void 0:h.uid)!=e,v=N&&N.owner==(null===h||void 0===h?void 0:h.uid)&&(null===h||void 0===h?void 0:h.uid)!=e;return(0,u.jsxs)("li",{className:"member",children:[(0,u.jsxs)("div",{className:"left",children:[(0,u.jsx)(r.Z,{compact:!0,uid:e,interactive:!1}),(0,u.jsxs)("div",{className:"info",children:[(0,u.jsxs)("span",{className:"name",children:[t," ",o&&(0,u.jsx)(w.Z,{})]}),(0,u.jsx)("span",{className:"email",children:a})]})]}),(0,u.jsxs)("div",{className:"right",children:[(0,u.jsxs)("span",{className:"role",children:[s?"Admin":"User",c&&(0,u.jsx)(l.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,u.jsxs)(p.Z,{className:"menu",children:[(0,u.jsxs)("li",{className:"item sb",onClick:y.bind(null,{ignore:s,uid:e,isAdmin:!0}),children:["Admin",s&&(0,u.jsx)(C.Z,{className:"icon"})]}),(0,u.jsxs)("li",{className:"item sb",onClick:y.bind(null,{ignore:!s,uid:e,isAdmin:!1}),children:["User",!s&&(0,u.jsx)(C.Z,{className:"icon"})]})]}),children:(0,u.jsx)(k,{className:"icon"})})]}),d&&(0,u.jsx)(l.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,u.jsxs)(p.Z,{className:"menu",children:[a&&(0,u.jsx)("li",{className:"item",onClick:m.bind(null,a),children:"Copy Email"}),v&&(0,u.jsx)("li",{className:"item danger",onClick:x.bind(null,e),children:"Remove From Channel"}),f&&(0,u.jsx)("li",{className:"item danger",onClick:g.bind(null,e),children:"Remove"})]}),children:(0,u.jsx)("div",{className:"opts",children:(0,u.jsx)("img",{className:"dots",src:j,alt:"dots icon"})})})]})]},e)}))})]})}},5579:(e,i,n)=>{n.d(i,{Z:()=>s});var t=n(244),l=n(6417);const a=t.ZP.div`
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
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
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
      box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 25px;
      &.reset {
        background: none;
        color: #667085;
        border: none;
        box-shadow: none;
      }
    }
  }
`,s=e=>{let{saveHandler:i,resetHandler:n}=e;return(0,l.jsxs)(a,{className:"animate__animated animate__flipInX animate__faster",children:[(0,l.jsx)("span",{className:"txt",children:"You have unsaved changes!"}),(0,l.jsxs)("div",{className:"btns",children:[(0,l.jsx)("button",{className:"btn reset",onClick:n,children:"Reset"}),(0,l.jsx)("button",{className:"btn",onClick:i,children:"Save Changes"})]})]})}},5638:(e,i,n)=>{n.d(i,{Z:()=>c});var t=n(244),l=n(8467),a=n(2135);const s=n.p+"static/media/arrow.left.92fbb139607631555459.svg";var o=n(6417);const r=t.ZP.div`
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
      background-size: 16px;
      background: url(${s}) no-repeat left;
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
`,c=e=>{let{closeModal:i,title:n="Settings",navs:t=[],dangers:s=[],nav:c,children:d}=e;const{pathname:p}=(0,l.TH)();return(0,o.jsxs)(r,{children:[(0,o.jsxs)("div",{className:"left",children:[(0,o.jsx)("h2",{onClick:i,className:"title",children:n}),t.map((e=>{let{title:i,items:n}=e;return(0,o.jsx)("ul",{"data-title":i,className:"items",children:n.map((e=>{let{name:i,title:n}=e;return(0,o.jsx)("li",{className:"item "+(i==(null===c||void 0===c?void 0:c.name)?"curr":""),children:(0,o.jsx)(a.OL,{to:`${p}?nav=${i}`,children:n})},i)}))},i)})),s.length?(0,o.jsx)("ul",{className:"items danger",children:s.map((e=>{if("boolean"===typeof e||!e)return null;const{title:i,handler:n}=e;return(0,o.jsx)("li",{onClick:n,className:"item",children:i},i)}))}):null]}),(0,o.jsxs)("div",{className:"right",children:[c&&(0,o.jsx)("h4",{className:"title",children:c.title}),d]})]})}},7169:(e,i,n)=>{n.d(i,{Z:()=>t});const t=n(244).ZP.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
`},4458:(e,i,n)=>{n.d(i,{Z:()=>t});const t=n(244).ZP.textarea`
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
`},9169:(e,i,n)=>{n.r(i),n.d(i,{default:()=>P});var t=n(7313),l=n(8467),a=n(2135),s=n(6059),o=n(244),r=n(666),c=n(1962),d=n(4025);function p(e){const{channel:i,loginUid:n}=(0,d.CG)((i=>{var n;return{channel:i.channels.byId[e],loginUid:null===(n=i.authData.user)||void 0===n?void 0:n.uid}})),[t,{isLoading:l,isSuccess:a}]=(0,c.tW)(),[s,{isLoading:o,isSuccess:r}]=(0,c.VJ)(),p=n==(null===i||void 0===i?void 0:i.owner);return{otherMembers:(null===i||void 0===i?void 0:i.members.filter((e=>e!=n)))||[],transferOwner:i=>{i&&t({id:e,owner:i})},leaveChannel:()=>{e&&s(e)},leaving:o,leaveSuccess:r,isOwner:p,transferring:l,transferSuccess:a}}var h=n(6571),m=n(1140),x=n(1742),u=n(6417);const g=o.ZP.ul`
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
`,f=e=>{let{id:i,closeModal:n,withLeave:a=!0}=e;const{transferOwner:o,otherMembers:c,leaving:d,leaveChannel:f,leaveSuccess:v,transferSuccess:b,transferring:j}=p(i),[w,y]=(0,t.useState)(null),N=(0,l.s0)(),k=e=>{y(e)};if((0,t.useEffect)((()=>{b&&v&&(s.ZP.success("Leave channel successfully!"),n(),N("/chat"))}),[v,b,a]),!i)return null;const C=d||j;return(0,u.jsx)(r.Z,{id:"modal-modal",children:(0,u.jsx)(h.Z,{className:"compact",title:"Transfer Ownership",description:"This cannot be undone.",buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(m.Z,{onClick:n.bind(null,void 0),className:"cancel",children:"Cancel"}),(0,u.jsx)(m.Z,{disabled:!w,onClick:async()=>{w&&(await o(w),a&&await f())},className:"danger",children:C?"Assigning":"Assign and Leave"})]}),children:(0,u.jsx)(g,{children:c.map((e=>(0,u.jsx)("li",{className:"user "+(w==e?"selected":""),onClick:k.bind(null,e),children:(0,u.jsx)(x.Z,{uid:e,interactive:!1})},e)))})})})},v=e=>{let{id:i,closeModal:n,handleNextStep:a}=e;const o=(0,l.s0)(),{isOwner:c,leaving:d,leaveChannel:x,leaveSuccess:g}=p(i);return(0,t.useEffect)((()=>{g&&(s.ZP.success("Leave channel successfully!"),n(),o("/chat"))}),[g]),i?(0,u.jsx)(r.Z,{id:"modal-modal",children:(0,u.jsx)(h.Z,{className:"compact",title:"Leave Channel",description:c?"You need to transfer your channel ownership to someone else before leaving the channel.":"Are you sure want to leave this channel?",buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(m.Z,{onClick:n.bind(null,void 0),className:"cancel",children:"Cancel"}),c?(0,u.jsx)(m.Z,{onClick:a,className:"main",children:"Next"}):(0,u.jsx)(m.Z,{onClick:x,className:"danger",children:d?"Leaving":"Leave"})]})})}):null},b=e=>{let{id:i,isOwner:n=!1,closeModal:l}=e;const[a,s]=(0,t.useState)(n);return a?(0,u.jsx)(f,{id:i,closeModal:l}):(0,u.jsx)(v,{id:i,closeModal:l,handleNextStep:()=>{s(!0)}})};var j=n(5638),w=n(6258),y=n(3960),N=n(4050),k=n(7169),C=n(4458),Z=n(5579);const _=n.p+"static/media/channel.a72cc13c77b3112e68c1.svg",L=o.ZP.div`
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
        background-image: url(${_});
        background-size: 20px;
        background-position-x: 8px;
        background-position-y: 8px;
        background-repeat: no-repeat;
      }
    }
  }
`;function S(e){let{id:i=0}=e;const{loginUser:n,channel:l}=(0,d.CG)((e=>({loginUser:e.authData.user,channel:e.channels.byId[i]}))),{data:a,refetch:o}=(0,c.aw)(i),[r,p]=(0,t.useState)(!1),[h,m]=(0,t.useState)(),[x]=(0,c.kG)(),[g,{isSuccess:f}]=(0,c.tW)(),v=e=>{const i=e.target.value,{type:n=""}=e.target.dataset;m((e=>e?{...e,[n]:i}:e))};if((0,t.useEffect)((()=>{a&&m(a)}),[a]),(0,t.useEffect)((()=>{if(a&&h){const{name:e,description:i}=h,{name:n,description:t}=a;p(n!==e||t!==i)}}),[a,h]),(0,t.useEffect)((()=>{f&&(s.ZP.success("Channel updated!"),o())}),[f]),!h||!i)return null;const{name:b,description:j}=h,w=!(null!==n&&void 0!==n&&n.is_admin)&&(null===l||void 0===l?void 0:l.owner)!=(null===n||void 0===n?void 0:n.uid);return(0,u.jsxs)(L,{children:[(0,u.jsx)(y.Z,{type:"channel",url:null===l||void 0===l?void 0:l.icon,name:b,uploadImage:e=>{x({gid:i,image:e})}}),(0,u.jsxs)("div",{className:"inputs",children:[(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)(k.Z,{htmlFor:"name",children:"Channel Name"}),(0,u.jsx)(N.Z,{disabled:w,className:"name","data-type":"name",onChange:v,value:b,name:"name",id:"name",placeholder:"Channel Name"})]}),(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)(k.Z,{htmlFor:"desc",children:"Channel Topic"}),(0,u.jsx)(C.Z,{disabled:w,"data-type":"description",onChange:v,value:null!==j&&void 0!==j?j:"",rows:4,name:"name",id:"name",placeholder:"Let everyone know how to use this channel."})]})]}),r&&(0,u.jsx)(Z.Z,{saveHandler:()=>{if(!h)return;const{name:e,description:n}=h;g({id:i,name:e,description:n})},resetHandler:()=>{m(a)}})]})}var z=n(3941);const E=e=>[{title:"General",items:[{name:"overview",title:"Overview",component:(0,u.jsx)(S,{id:e})},{name:"members",title:"Members",component:(0,u.jsx)(z.Z,{cid:e})}]}];let O="";function P(){const{cid:e=0}=(0,l.UO)(),{loginUser:i,channel:n}=(0,d.CG)((i=>({loginUser:i.authData.user,channel:e?i.channels.byId[+e]:void 0}))),s=(0,l.s0)(),[o]=(0,a.lr)(),r=E(+e),c=r.map((e=>{let{items:i}=e;return i})).flat(),p=o.get("nav");O=O||(o.get("f")||"/");const[h,m]=(0,t.useState)(!1),[x,g]=(0,t.useState)(!1),f=()=>{m((e=>!e))},v=()=>{g((e=>!e))};if(!e)return null;const y=c.find((e=>e.name==p))||c[0],N=(null===i||void 0===i?void 0:i.is_admin)||(null===n||void 0===n?void 0:n.owner)==(null===i||void 0===i?void 0:i.uid),k=!(null!==n&&void 0!==n&&n.is_public);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(j.Z,{nav:y,closeModal:()=>{s(O),O=""},title:"Channel Setting",navs:r,dangers:[k&&{title:"Leave Channel",handler:v},N&&{title:"Delete Channel",handler:f}],children:y.component}),h&&(0,u.jsx)(w.Z,{closeModal:f,id:+e}),x&&(0,u.jsx)(b,{closeModal:v,id:+e})]})}}}]);