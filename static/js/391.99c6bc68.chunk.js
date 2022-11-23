"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[391],{75157:(e,n,s)=>{s.r(n),s.d(n,{default:()=>F});var a=s(70537),l=s(15924),i=s(64084),t=s(27418),c=s(57889),d=s(80874),r=s(6144),o=s(66160);function u(e){const{channel:n,loginUid:s}=(0,o.CG)((n=>{var s;return{channel:n.channels.byId[e],loginUid:null===(s=n.authData.user)||void 0===s?void 0:s.uid}})),[a,{isLoading:l,isSuccess:i}]=(0,r.tW)(),[t,{isLoading:c,isSuccess:d}]=(0,r.VJ)(),u=s==(null===n||void 0===n?void 0:n.owner);return{otherMembers:(null===n||void 0===n?void 0:n.members.filter((e=>e!=s)))||[],transferOwner:n=>{n&&a({id:e,owner:n})},leaveChannel:()=>{e&&t(e)},leaving:c,leaveSuccess:d,isOwner:u,transferring:l,transferSuccess:i}}var h=s(40698),v=s(69885),m=s(6458),p=s(86107),g=s(80683);const x=c.ZP.ul`
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
`,f=e=>{let{id:n,closeModal:s,withLeave:i=!0}=e;const{t:c}=(0,p.$)(),{transferOwner:r,otherMembers:o,leaving:f,leaveChannel:b,leaveSuccess:j,transferSuccess:w,transferring:Z}=u(n),[C,y]=(0,a.useState)(null),k=(0,l.s0)(),S=e=>{y(e)};if((0,a.useEffect)((()=>{w&&j&&(t.ZP.success("Leave channel successfully!"),s(),k("/chat"))}),[j,w,i]),!n)return null;const N=f||Z;return(0,g.jsx)(d.Z,{id:"modal-modal",children:(0,g.jsx)(h.Z,{className:"compact",title:"Transfer Ownership",description:"This cannot be undone.",buttons:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(v.Z,{onClick:s.bind(null,void 0),className:"cancel",children:c("action.cancel")}),(0,g.jsx)(v.Z,{disabled:!C,onClick:async()=>{C&&(await r(C),i&&await b())},className:"danger",children:N?"Assigning":"Assign and Leave"})]}),children:(0,g.jsx)(x,{children:o.map((e=>(0,g.jsx)("li",{className:"user "+(C==e?"selected":""),onClick:S.bind(null,e),children:(0,g.jsx)(m.Z,{uid:e,interactive:!1})},e)))})})})},b=e=>{let{id:n,closeModal:s,handleNextStep:i}=e;const{t:c}=(0,p.$)("setting"),r=(0,l.s0)(),{isOwner:o,leaving:m,leaveChannel:x,leaveSuccess:f}=u(n);return(0,a.useEffect)((()=>{f&&(t.ZP.success("Leave channel successfully!"),s(),r("/chat"))}),[f]),n?(0,g.jsx)(d.Z,{id:"modal-modal",children:(0,g.jsx)(h.Z,{className:"compact",title:c("channel.leave")||"",description:o?c("channel.transfer_desc")||"":c("channel.leave_desc")||"",buttons:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(v.Z,{onClick:s.bind(null,void 0),className:"cancel",children:c("action.cancel",{ns:"common"})}),o?(0,g.jsx)(v.Z,{onClick:i,className:"main",children:"Next"}):(0,g.jsx)(v.Z,{onClick:x,className:"danger",children:m?"Leaving":"Leave"})]})})}):null},j=e=>{let{id:n,isOwner:s=!1,closeModal:l}=e;const[i,t]=(0,a.useState)(s);return i?(0,g.jsx)(f,{id:n,closeModal:l}):(0,g.jsx)(b,{id:n,closeModal:l,handleNextStep:()=>{t(!0)}})};var w=s(7477),Z=s(77493),C=s(95727),y=s(3022),k=s(48540),S=s(15621),N=s(64884),M=s(24563);const _=s.p+"static/media/channel.a72cc13c77b3112e68c1.svg",L=c.ZP.div`
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
`;function O(e){let{id:n=0}=e;const{t:s}=(0,p.$)("setting",{keyPrefix:"channel"}),{loginUser:l,channel:i}=(0,o.CG)((e=>({loginUser:e.authData.user,channel:e.channels.byId[n]}))),{data:c,refetch:d}=(0,r.aw)(n),[u,h]=(0,a.useState)(!1),[v,m]=(0,a.useState)(),[x]=(0,r.kG)(),[f,{isSuccess:b}]=(0,r.tW)(),[j,{isSuccess:w}]=(0,r.Cl)(),Z=e=>{const n=e.target.value,{type:s=""}=e.target.dataset;m((e=>e?{...e,[s]:n}:e))};if((0,a.useEffect)((()=>{c&&m(c)}),[c]),(0,a.useEffect)((()=>{if(c&&v){const{name:e,description:n}=v,{name:s,description:a}=c;h(s!==e||a!==n)}}),[c,v]),(0,a.useEffect)((()=>{b&&(t.ZP.success("Channel updated!"),d())}),[b]),(0,a.useEffect)((()=>{w&&t.ZP.success("Change channel visibility successfully!")}),[w]),!v||!n)return null;const{name:_,description:O}=v,P=!(null!==l&&void 0!==l&&l.is_admin)&&(null===i||void 0===i?void 0:i.owner)!=(null===l||void 0===l?void 0:l.uid);return(0,g.jsxs)(L,{children:[(0,g.jsx)(C.Z,{type:"channel",url:null===i||void 0===i?void 0:i.icon,name:_,uploadImage:e=>{x({gid:n,image:e})}}),(0,g.jsxs)("div",{className:"inputs",children:[(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(k.Z,{htmlFor:"name",children:s("name")}),(0,g.jsx)(y.Z,{disabled:P,className:"name","data-type":"name",onChange:Z,value:_,name:"name",id:"name",placeholder:s("name")||""})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(k.Z,{htmlFor:"desc",children:s("topic")}),(0,g.jsx)(N.Z,{disabled:P,"data-type":"description",onChange:Z,value:null!==O&&void 0!==O?O:"",rows:4,name:"name",id:"name",placeholder:s("topic_placeholder")||""})]}),!P&&(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(k.Z,{htmlFor:"desc",children:s("visibility")}),(0,g.jsx)(S.Z,{options:[s("public"),s("private")],values:["true","false"],value:String(i.is_public),onChange:e=>{j({is_public:"true"===e.toLowerCase(),id:n})}})]})]}),u&&(0,g.jsx)(M.Z,{saveHandler:()=>{if(!v)return;const{name:e,description:s}=v;f({id:n,name:e,description:s})},resetHandler:()=>{m(c)}})]})}var P=s(51205);const U=e=>{const{t:n}=(0,p.$)("setting");return[{title:n("nav.general"),items:[{name:"overview",title:n("nav.overview"),component:(0,g.jsx)(O,{id:e})},{name:"members",title:n("nav.members"),component:(0,g.jsx)(P.Z,{cid:e})}]}]};let E="";function F(){const{t:e}=(0,p.$)("setting"),{cid:n=0}=(0,l.UO)(),{loginUser:s,channel:t}=(0,o.CG)((e=>({loginUser:e.authData.user,channel:n?e.channels.byId[+n]:void 0}))),c=(0,l.s0)(),[d]=(0,i.lr)(),r=U(+n),u=r.map((e=>{let{items:n}=e;return n})).flat(),h=d.get("nav");E=E||(d.get("f")||"/");const[v,m]=(0,a.useState)(!1),[x,f]=(0,a.useState)(!1),b=()=>{m((e=>!e))},C=()=>{f((e=>!e))};if(!n)return null;const y=u.find((e=>e.name==h))||u[0],k=(null===s||void 0===s?void 0:s.is_admin)||(null===t||void 0===t?void 0:t.owner)==(null===s||void 0===s?void 0:s.uid),S=!(null!==t&&void 0!==t&&t.is_public);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(w.Z,{nav:y,closeModal:()=>{c(E),E=""},title:"Channel Setting",navs:r,dangers:[S&&{title:e("channel.leave"),handler:C},k&&{title:e("channel.delete"),handler:b}],children:y.component}),v&&(0,g.jsx)(Z.Z,{closeModal:b,id:+n}),x&&(0,g.jsx)(j,{closeModal:C,id:+n})]})}}}]);