"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[55],{552:(e,i,n)=>{n.d(i,{Z:()=>o});var t,l,a=n(7313);function s(){return s=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},s.apply(this,arguments)}const r=(e,i)=>{let{title:n,titleId:r,...o}=e;return a.createElement("svg",s({width:16,height:12,viewBox:"0 0 16 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":r},o),n?a.createElement("title",{id:r},n):null,t||(t=a.createElement("g",{clipPath:"url(#clip0_9046_23916)"},a.createElement("path",{d:"M4.93942 9.69781L1.62578 6.38648C1.25336 6.01431 0.651746 6.01431 0.27932 6.38648C-0.0931066 6.75865 -0.0931066 7.35984 0.27932 7.73201L4.27096 11.7209C4.64339 12.093 5.245 12.093 5.61743 11.7209L15.7207 1.62465C16.0931 1.25248 16.0931 0.651292 15.7207 0.279125C15.3483 -0.0930417 14.7466 -0.0930417 14.3742 0.279125L4.93942 9.69781Z",fill:"#78787C"}))),l||(l=a.createElement("defs",null,a.createElement("clipPath",{id:"clip0_9046_23916"},a.createElement("rect",{width:16,height:12,fill:"white"})))))},o=(0,a.forwardRef)(r)},3960:(e,i,n)=>{n.d(i,{Z:()=>c});var t=n(7313),l=n(9184),a=n(1590);const s=n.p+"static/media/upload.image.9f8c7fc90042d2ff4eb7.svg";var r=n(6417);const o=l.ZP.div`
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
`,c=e=>{let{url:i="",name:n="",type:l="user",uploadImage:c,disabled:d=!1}=e;const[p,h]=(0,t.useState)(!1);return(0,r.jsxs)(o,{children:[(0,r.jsxs)("div",{className:"avatar",children:[(0,r.jsx)(a.Z,{type:l,url:i,name:n}),!d&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"tip",children:p?"Uploading":"Change Avatar"}),(0,r.jsx)("input",{multiple:!1,onChange:async e=>{if(p)return;if(!e.target.files)return;const[i]=Array.from(e.target.files);h(!0),await c(i),h(!1)},type:"file",accept:"image/*",name:"avatar",id:"avatar"})]})]}),!d&&(0,r.jsx)("img",{src:s,alt:"icon",className:"icon"})]})}},6047:(e,i,n)=>{n.d(i,{Z:()=>_});var t=n(7313),l=n(9184),a=n(2963),s=n(9784),r=n(3657),o=n(6113),c=n(1742),d=n(5281),p=n(9559),h=n(4050),m=n(1140),x=n(6417);const u=l.ZP.div`
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
`,g=()=>{const{generating:e,link:i,linkCopied:n,copyLink:t,generateNewLink:l}=(0,p.Z)();return(0,x.jsxs)(u,{children:[(0,x.jsx)("span",{className:"tip",children:"Share this link to invite people to this server."}),(0,x.jsxs)("div",{className:"link",children:[(0,x.jsx)(h.Z,{readOnly:!0,className:"large",placeholder:"Generating",value:i}),(0,x.jsx)(m.Z,{onClick:t,className:"ghost small border_less",children:n?"Copied":"Copy"})]}),(0,x.jsx)("span",{className:"sub_tip",children:"Invite link expires in 7 days."}),(0,x.jsx)(m.Z,{className:"ghost",disabled:e,onClick:()=>{l()},children:e?"Generating":"Generate New Link"})]})};var f,v,b=n(169),w=n(8214);function j(){return j=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},j.apply(this,arguments)}const y=(e,i)=>{let{title:n,titleId:l,...a}=e;return t.createElement("svg",j({width:6,height:6,viewBox:"0 0 6 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:i,"aria-labelledby":l},a),n?t.createElement("title",{id:l},n):null,f||(f=t.createElement("rect",{opacity:.01,width:6,height:6,fill:"#D8D8D8"})),v||(v=t.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.62506 1.64911C5.41795 1.4503 5.08216 1.45029 4.87506 1.64911L3.00003 3.44911L1.12506 1.64916C0.917951 1.45034 0.582164 1.45034 0.375057 1.64916C0.16795 1.84798 0.16795 2.17033 0.375057 2.36915L2.62506 4.52912C2.83217 4.72794 3.16795 4.72794 3.37506 4.52912C3.37665 4.5276 3.37822 4.52608 3.37977 4.52454L5.62506 2.36911C5.83216 2.17029 5.83216 1.84793 5.62506 1.64911Z",fill:"black",fillOpacity:.5})))},N=(0,t.forwardRef)(y);var k=n(552),C=n(1238),Z=n(4025);const S=l.ZP.section`
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
`,_=e=>{let{cid:i}=e;const{users:n,channels:l,loginUser:p}=(0,Z.CG)((e=>({users:e.users,channels:e.channels,loginUser:e.authData.user}))),{copyEmail:h,removeFromChannel:m,removeUser:u}=(0,C.Z)({cid:i}),[f,{isSuccess:v}]=(0,o.kD)();(0,t.useEffect)((()=>{v&&r.ZP.success("Update Successfully")}),[v]);const j=e=>{let{ignore:i=!1,uid:n,isAdmin:t=!0}=e;(0,s.Bn)(),i||f({id:n,is_admin:t})},y=i?l.byId[i]:null,_=y?y.is_public?n.ids:y.members:n.ids;return(0,x.jsxs)(S,{children:[(null===p||void 0===p?void 0:p.is_admin)&&(0,x.jsx)(g,{}),(0,x.jsxs)("div",{className:"intro",children:[(0,x.jsx)("h4",{className:"title",children:"Manage Members"}),(0,x.jsx)("p",{className:"desc",children:"Disabling your account means you can recover it at any time after taking this action."})]}),(0,x.jsx)("ul",{className:"members",children:_.map((e=>{const i=n.byId[e];if(!i)return null;const{name:t,email:l,is_admin:s}=i,r=y&&y.owner==e,o=p.is_admin&&p.uid!==e,g=l||(null===p||void 0===p?void 0:p.is_admin),f=(null===p||void 0===p?void 0:p.is_admin)&&(null===p||void 0===p?void 0:p.uid)!=e,v=y&&y.owner==(null===p||void 0===p?void 0:p.uid)&&(null===p||void 0===p?void 0:p.uid)!=e;return(0,x.jsxs)("li",{className:"member",children:[(0,x.jsxs)("div",{className:"left",children:[(0,x.jsx)(c.Z,{compact:!0,uid:e,interactive:!1}),(0,x.jsxs)("div",{className:"info",children:[(0,x.jsxs)("span",{className:"name",children:[t," ",r&&(0,x.jsx)(w.Z,{})]}),(0,x.jsx)("span",{className:"email",children:l})]})]}),(0,x.jsxs)("div",{className:"right",children:[(0,x.jsxs)("span",{className:"role",children:[s?"Admin":"User",o&&(0,x.jsx)(a.ZP,{interactive:!0,placement:"bottom-end",trigger:"click",content:(0,x.jsxs)(d.Z,{className:"menu",children:[(0,x.jsxs)("li",{className:"item sb",onClick:j.bind(null,{ignore:s,uid:e,isAdmin:!0}),children:["Admin",s&&(0,x.jsx)(k.Z,{className:"icon"})]}),(0,x.jsxs)("li",{className:"item sb",onClick:j.bind(null,{ignore:!s,uid:e,isAdmin:!1}),children:["User",!s&&(0,x.jsx)(k.Z,{className:"icon"})]})]}),children:(0,x.jsx)(N,{className:"icon"})})]}),g&&(0,x.jsx)(a.ZP,{interactive:!0,placement:"right-start",trigger:"click",content:(0,x.jsxs)(d.Z,{className:"menu",children:[l&&(0,x.jsx)("li",{className:"item",onClick:h.bind(null,l),children:"Copy Email"}),v&&(0,x.jsx)("li",{className:"item danger",onClick:m.bind(null,e),children:"Remove From Channel"}),f&&(0,x.jsx)("li",{className:"item danger",onClick:u.bind(null,e),children:"Remove From Server"})]}),children:(0,x.jsx)("div",{className:"opts",children:(0,x.jsx)("img",{className:"dots",src:b,alt:"dots icon"})})})]})]},e)}))})]})}},5579:(e,i,n)=>{n.d(i,{Z:()=>s});var t=n(9184),l=n(6417);const a=t.ZP.div`
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
`,s=e=>{let{saveHandler:i,resetHandler:n}=e;return(0,l.jsxs)(a,{className:"animate__animated animate__flipInX animate__faster",children:[(0,l.jsx)("span",{className:"txt",children:"You have unsaved changes!"}),(0,l.jsxs)("div",{className:"btns",children:[(0,l.jsx)("button",{className:"btn reset",onClick:n,children:"Reset"}),(0,l.jsx)("button",{className:"btn",onClick:i,children:"Save Changes"})]})]})}},5638:(e,i,n)=>{n.d(i,{Z:()=>c});var t=n(9184),l=n(9466),a=n(7890);const s=n.p+"static/media/arrow.left.92fbb139607631555459.svg";var r=n(6417);const o=t.ZP.div`
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
`,c=e=>{let{closeModal:i,title:n="Settings",navs:t=[],dangers:s=[],nav:c,children:d}=e;const{pathname:p}=(0,a.TH)();return(0,r.jsxs)(o,{children:[(0,r.jsxs)("div",{className:"left",children:[(0,r.jsx)("h2",{onClick:i,className:"title",children:n}),t.map((e=>{let{title:i,items:n}=e;return(0,r.jsx)("ul",{"data-title":i,className:"items",children:n.map((e=>{let{name:i,title:n}=e;return(0,r.jsx)("li",{className:"item "+(i==(null===c||void 0===c?void 0:c.name)?"curr":""),children:(0,r.jsx)(l.OL,{to:`${p}?nav=${i}`,children:n})},i)}))},i)})),s.length?(0,r.jsx)("ul",{className:"items danger",children:s.map((e=>{if(!e)return null;const{title:i,handler:n}=e;return(0,r.jsx)("li",{onClick:n,className:"item",children:i},i)}))}):null]}),(0,r.jsxs)("div",{className:"right",children:[c&&(0,r.jsx)("h4",{className:"title",children:c.title}),d]})]})}},7169:(e,i,n)=>{n.d(i,{Z:()=>t});const t=n(9184).ZP.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
`},4458:(e,i,n)=>{n.d(i,{Z:()=>t});const t=n(9184).ZP.textarea`
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
`},9169:(e,i,n)=>{n.r(i),n.d(i,{default:()=>O});var t=n(7313),l=n(9466),a=n(7890),s=n(3657),r=n(9184),o=n(666),c=n(1962),d=n(4025);function p(e){const{channel:i,loginUid:n}=(0,d.CG)((i=>{var n;return{channel:i.channels.byId[e],loginUid:null===(n=i.authData.user)||void 0===n?void 0:n.uid}})),[t,{isLoading:l,isSuccess:a}]=(0,c.tW)(),[s,{isLoading:r,isSuccess:o}]=(0,c.VJ)(),p=n==(null===i||void 0===i?void 0:i.owner);return{otherMembers:(null===i||void 0===i?void 0:i.members.filter((e=>e!=n)))||[],transferOwner:i=>{i&&t({id:e,owner:i})},leaveChannel:()=>{e&&s(e)},leaving:r,leaveSuccess:o,isOwner:p,transferring:l,transferSuccess:a}}var h=n(6571),m=n(1140),x=n(1742),u=n(6417);const g=r.ZP.ul`
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
`,f=e=>{let{id:i,closeModal:n,withLeave:l=!0}=e;const{transferOwner:r,otherMembers:c,leaving:d,leaveChannel:f,leaveSuccess:v,transferSuccess:b,transferring:w}=p(i),[j,y]=(0,t.useState)(null),N=(0,a.s0)(),k=e=>{y(e)};if((0,t.useEffect)((()=>{b&&v&&(s.ZP.success("Leave channel successfully!"),n(),N("/chat"))}),[v,b,l]),!i)return null;const C=d||w;return(0,u.jsx)(o.Z,{id:"modal-modal",children:(0,u.jsx)(h.Z,{className:"compact",title:"Transfer Ownership",description:"This cannot be undone.",buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(m.Z,{onClick:n.bind(null,void 0),className:"cancel",children:"Cancel"}),(0,u.jsx)(m.Z,{disabled:!j,onClick:async()=>{j&&(await r(j),l&&await f())},className:"danger",children:C?"Assigning":"Assign and Leave"})]}),children:(0,u.jsx)(g,{children:c.map((e=>(0,u.jsx)("li",{className:"user "+(j==e?"selected":""),onClick:k.bind(null,e),children:(0,u.jsx)(x.Z,{uid:e,interactive:!1})},e)))})})})},v=e=>{let{id:i,closeModal:n,handleNextStep:l}=e;const r=(0,a.s0)(),{isOwner:c,leaving:d,leaveChannel:x,leaveSuccess:g}=p(i);return(0,t.useEffect)((()=>{g&&(s.ZP.success("Leave channel successfully!"),n(),r("/chat"))}),[g]),i?(0,u.jsx)(o.Z,{id:"modal-modal",children:(0,u.jsx)(h.Z,{className:"compact",title:"Leave Channel",description:c?"You need to transfer your channel ownership to someone else before leaving the channel.":"Are you sure want to leave this channel?",buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(m.Z,{onClick:n.bind(null,void 0),className:"cancel",children:"Cancel"}),c?(0,u.jsx)(m.Z,{onClick:l,className:"main",children:"Next"}):(0,u.jsx)(m.Z,{onClick:x,className:"danger",children:d?"Leaving":"Leave"})]})})}):null},b=e=>{let{id:i,isOwner:n=!1,closeModal:l}=e;const[a,s]=(0,t.useState)(n);return a?(0,u.jsx)(f,{id:i,closeModal:l}):(0,u.jsx)(v,{id:i,closeModal:l,handleNextStep:()=>{s(!0)}})};var w=n(5638),j=n(6258),y=n(3960),N=n(4050),k=n(7169),C=n(4458),Z=n(5579);const S=n.p+"static/media/channel.a72cc13c77b3112e68c1.svg",_=r.ZP.div`
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
`;function L(e){let{id:i=0}=e;const{loginUser:n,channel:l}=(0,d.CG)((e=>({loginUser:e.authData.user,channel:e.channels.byId[i]}))),{data:a,refetch:r}=(0,c.aw)(i),[o,p]=(0,t.useState)(!1),[h,m]=(0,t.useState)(null),[x]=(0,c.kG)(),[g,{isSuccess:f}]=(0,c.tW)(),v=e=>{const i=e.target.value,{type:n}=e.target.dataset;m((e=>({...e,[n]:i})))};if((0,t.useEffect)((()=>{a&&m(a)}),[a]),(0,t.useEffect)((()=>{if(a&&h){const{name:e,description:i}=h,{name:n,description:t}=a;p(n!==e||t!==i)}}),[a,h]),(0,t.useEffect)((()=>{f&&(s.ZP.success("Channel updated!"),r())}),[f]),!h||!i)return null;const{name:b,description:w}=h,j=!(null!==n&&void 0!==n&&n.is_admin)&&(null===l||void 0===l?void 0:l.owner)!=(null===n||void 0===n?void 0:n.uid);return(0,u.jsxs)(_,{children:[(0,u.jsx)(y.Z,{type:"channel",url:null===l||void 0===l?void 0:l.icon,name:b,uploadImage:e=>{x({gid:i,image:e})}}),(0,u.jsxs)("div",{className:"inputs",children:[(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)(k.Z,{htmlFor:"name",children:"Channel Name"}),(0,u.jsx)(N.Z,{disabled:j,className:"name","data-type":"name",onChange:v,value:b,name:"name",id:"name",placeholder:"Channel Name"})]}),(0,u.jsxs)("div",{className:"input",children:[(0,u.jsx)(k.Z,{htmlFor:"desc",children:"Channel Topic"}),(0,u.jsx)(C.Z,{disabled:j,"data-type":"description",onChange:v,value:null!==w&&void 0!==w?w:"",rows:4,name:"name",id:"name",placeholder:"Let everyone know how to use this channel."})]})]}),o&&(0,u.jsx)(Z.Z,{saveHandler:()=>{const{name:e,description:n}=h;g({id:i,name:e,description:n})},resetHandler:()=>{m(a)}})]})}var z=n(6047);const E=e=>[{title:"General",items:[{name:"overview",title:"Overview",component:(0,u.jsx)(L,{id:e})},{name:"members",title:"Members",component:(0,u.jsx)(z.Z,{cid:e})}]}];let P="";function O(){var e;const{cid:i=0}=(0,a.UO)(),{loginUser:n,channel:s}=(0,d.CG)((e=>({loginUser:e.authData.user,channel:i?e.channels.byId[+i]:void 0}))),r=(0,a.s0)(),[o]=(0,l.lr)(),c=E(+i),p=c.map((e=>{let{items:i}=e;return i})).flat(),h=o.get("nav");P=null!==(e=P)&&void 0!==e?e:o.get("f")||"/";const[m,x]=(0,t.useState)(!1),[g,f]=(0,t.useState)(!1),v=()=>{x((e=>!e))},y=()=>{f((e=>!e))};if(!i)return null;const N=p.find((e=>e.name==h))||p[0],k=n.isAdmin||(null===s||void 0===s?void 0:s.owner)==n.uid,C=!(null!==s&&void 0!==s&&s.is_public);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(w.Z,{nav:N,closeModal:()=>{r(P),P=""},title:"Channel Setting",navs:c,dangers:[C&&{title:"Leave Channel",handler:y},k&&{title:"Delete Channel",handler:v}],children:N.component}),m&&(0,u.jsx)(j.Z,{closeModal:v,id:+i}),g&&(0,u.jsx)(b,{closeModal:y,id:+i})]})}}}]);