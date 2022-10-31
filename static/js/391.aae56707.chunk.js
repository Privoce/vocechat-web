"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[391],{5157:(e,n,s)=>{s.r(n),s.d(n,{default:()=>E});var a=s(537),l=s(5924),i=s(4084),t=s(7418),c=s(7889),r=s(874),d=s(6144),o=s(6160);function u(e){const{channel:n,loginUid:s}=(0,o.CG)((n=>{var s;return{channel:n.channels.byId[e],loginUid:null===(s=n.authData.user)||void 0===s?void 0:s.uid}})),[a,{isLoading:l,isSuccess:i}]=(0,d.tW)(),[t,{isLoading:c,isSuccess:r}]=(0,d.VJ)(),u=s==(null===n||void 0===n?void 0:n.owner);return{otherMembers:(null===n||void 0===n?void 0:n.members.filter((e=>e!=s)))||[],transferOwner:n=>{n&&a({id:e,owner:n})},leaveChannel:()=>{e&&t(e)},leaving:c,leaveSuccess:r,isOwner:u,transferring:l,transferSuccess:i}}var h=s(698),v=s(9885),m=s(6458),p=s(683);const x=c.ZP.ul`
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
`,g=e=>{let{id:n,closeModal:s,withLeave:i=!0}=e;const{transferOwner:c,otherMembers:d,leaving:o,leaveChannel:g,leaveSuccess:f,transferSuccess:b,transferring:j}=u(n),[w,C]=(0,a.useState)(null),Z=(0,l.s0)(),y=e=>{C(e)};if((0,a.useEffect)((()=>{b&&f&&(t.ZP.success("Leave channel successfully!"),s(),Z("/chat"))}),[f,b,i]),!n)return null;const k=o||j;return(0,p.jsx)(r.Z,{id:"modal-modal",children:(0,p.jsx)(h.Z,{className:"compact",title:"Transfer Ownership",description:"This cannot be undone.",buttons:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v.Z,{onClick:s.bind(null,void 0),className:"cancel",children:"Cancel"}),(0,p.jsx)(v.Z,{disabled:!w,onClick:async()=>{w&&(await c(w),i&&await g())},className:"danger",children:k?"Assigning":"Assign and Leave"})]}),children:(0,p.jsx)(x,{children:d.map((e=>(0,p.jsx)("li",{className:"user "+(w==e?"selected":""),onClick:y.bind(null,e),children:(0,p.jsx)(m.Z,{uid:e,interactive:!1})},e)))})})})},f=e=>{let{id:n,closeModal:s,handleNextStep:i}=e;const c=(0,l.s0)(),{isOwner:d,leaving:o,leaveChannel:m,leaveSuccess:x}=u(n);return(0,a.useEffect)((()=>{x&&(t.ZP.success("Leave channel successfully!"),s(),c("/chat"))}),[x]),n?(0,p.jsx)(r.Z,{id:"modal-modal",children:(0,p.jsx)(h.Z,{className:"compact",title:"Leave Channel",description:d?"You need to transfer your channel ownership to someone else before leaving the channel.":"Are you sure want to leave this channel?",buttons:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v.Z,{onClick:s.bind(null,void 0),className:"cancel",children:"Cancel"}),d?(0,p.jsx)(v.Z,{onClick:i,className:"main",children:"Next"}):(0,p.jsx)(v.Z,{onClick:m,className:"danger",children:o?"Leaving":"Leave"})]})})}):null},b=e=>{let{id:n,isOwner:s=!1,closeModal:l}=e;const[i,t]=(0,a.useState)(s);return i?(0,p.jsx)(g,{id:n,closeModal:l}):(0,p.jsx)(f,{id:n,closeModal:l,handleNextStep:()=>{t(!0)}})};var j=s(7477),w=s(7493),C=s(5727),Z=s(3022),y=s(8540),k=s(5621),S=s(558),N=s(4563);const L=s.p+"static/media/channel.a72cc13c77b3112e68c1.svg",M=c.ZP.div`
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
        background-image: url(${L});
        background-size: 20px;
        background-position-x: 8px;
        background-position-y: 8px;
        background-repeat: no-repeat;
      }

    }
  }
`;function O(e){let{id:n=0}=e;const{loginUser:s,channel:l}=(0,o.CG)((e=>({loginUser:e.authData.user,channel:e.channels.byId[n]}))),{data:i,refetch:c}=(0,d.aw)(n),[r,u]=(0,a.useState)(!1),[h,v]=(0,a.useState)(),[m]=(0,d.kG)(),[x,{isSuccess:g}]=(0,d.tW)(),[f,{isSuccess:b}]=(0,d.Cl)(),j=e=>{const n=e.target.value,{type:s=""}=e.target.dataset;v((e=>e?{...e,[s]:n}:e))};if((0,a.useEffect)((()=>{i&&v(i)}),[i]),(0,a.useEffect)((()=>{if(i&&h){const{name:e,description:n}=h,{name:s,description:a}=i;u(s!==e||a!==n)}}),[i,h]),(0,a.useEffect)((()=>{g&&(t.ZP.success("Channel updated!"),c())}),[g]),(0,a.useEffect)((()=>{b&&t.ZP.success("Change channel visibility successfully!")}),[b]),!h||!n)return null;const{name:w,description:L}=h,O=!(null!==s&&void 0!==s&&s.is_admin)&&(null===l||void 0===l?void 0:l.owner)!=(null===s||void 0===s?void 0:s.uid);return(0,p.jsxs)(M,{children:[(0,p.jsx)(C.Z,{type:"channel",url:null===l||void 0===l?void 0:l.icon,name:w,uploadImage:e=>{m({gid:n,image:e})}}),(0,p.jsxs)("div",{className:"inputs",children:[(0,p.jsxs)("div",{className:"input",children:[(0,p.jsx)(y.Z,{htmlFor:"name",children:"Channel Name"}),(0,p.jsx)(Z.Z,{disabled:O,className:"name","data-type":"name",onChange:j,value:w,name:"name",id:"name",placeholder:"Channel Name"})]}),(0,p.jsxs)("div",{className:"input",children:[(0,p.jsx)(y.Z,{htmlFor:"desc",children:"Channel Topic"}),(0,p.jsx)(S.Z,{disabled:O,"data-type":"description",onChange:j,value:null!==L&&void 0!==L?L:"",rows:4,name:"name",id:"name",placeholder:"Let everyone know how to use this channel."})]}),!O&&(0,p.jsxs)("div",{className:"input",children:[(0,p.jsx)(y.Z,{htmlFor:"desc",children:"Channel Visibility"}),(0,p.jsx)(k.Z,{options:["Public","Private"],values:["true","false"],value:String(l.is_public),onChange:e=>{f({is_public:"true"===e.toLowerCase(),id:n})}})]})]}),r&&(0,p.jsx)(N.Z,{saveHandler:()=>{if(!h)return;const{name:e,description:s}=h;x({id:n,name:e,description:s})},resetHandler:()=>{v(i)}})]})}var P=s(1205);const U=e=>[{title:"General",items:[{name:"overview",title:"Overview",component:(0,p.jsx)(O,{id:e})},{name:"members",title:"Members",component:(0,p.jsx)(P.Z,{cid:e})}]}];let _="";function E(){const{cid:e=0}=(0,l.UO)(),{loginUser:n,channel:s}=(0,o.CG)((n=>({loginUser:n.authData.user,channel:e?n.channels.byId[+e]:void 0}))),t=(0,l.s0)(),[c]=(0,i.lr)(),r=U(+e),d=r.map((e=>{let{items:n}=e;return n})).flat(),u=c.get("nav");_=_||(c.get("f")||"/");const[h,v]=(0,a.useState)(!1),[m,x]=(0,a.useState)(!1),g=()=>{v((e=>!e))},f=()=>{x((e=>!e))};if(!e)return null;const C=d.find((e=>e.name==u))||d[0],Z=(null===n||void 0===n?void 0:n.is_admin)||(null===s||void 0===s?void 0:s.owner)==(null===n||void 0===n?void 0:n.uid),y=!(null!==s&&void 0!==s&&s.is_public);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j.Z,{nav:C,closeModal:()=>{t(_),_=""},title:"Channel Setting",navs:r,dangers:[y&&{title:"Leave Channel",handler:f},Z&&{title:"Delete Channel",handler:g}],children:C.component}),h&&(0,p.jsx)(w.Z,{closeModal:g,id:+e}),m&&(0,p.jsx)(b,{closeModal:f,id:+e})]})}}}]);