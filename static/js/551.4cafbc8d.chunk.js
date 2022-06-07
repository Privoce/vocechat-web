"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[551],{9367:(e,n,l)=>{l.d(n,{Z:()=>u});var a=l(7313),s=l(3657),i=l(7890),t=l(5607),c=l(5564),d=l(5845),o=l(1296),r=l(6417);function u(e){let{id:n,closeModal:l}=e;const u=(0,i.s0)(),[h,{isLoading:m,isSuccess:v}]=(0,c.kE)();return(0,a.useEffect)((()=>{v&&(s.ZP.success("delete channel successfully!"),l(),u("/chat"))}),[v]),n?(0,r.jsx)(t.Z,{id:"modal-modal",children:(0,r.jsx)(d.Z,{className:"compact",title:"Delete Channel",description:"Are you sure want to delete this channel?",buttons:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.Z,{onClick:l.bind(null,void 0),className:"cancel",children:"Cancel"}),(0,r.jsx)(o.Z,{onClick:()=>{h(n)},className:"danger",children:m?"Deleting":"Delete"})]})})}):null}},8222:(e,n,l)=>{l.r(n),l.d(n,{default:()=>U});var a=l(7313),s=l(3709),i=l(9466),t=l(7890),c=l(3657),d=l(9184),o=l(5607),r=l(5564);function u(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;const{channel:n,loginUid:l}=(0,s.v9)((n=>({channel:n.channels.byId[e],loginUid:n.authData.uid}))),[a,{isLoading:i,isSuccess:t}]=(0,r.tW)(),[c,{isLoading:d,isSuccess:o}]=(0,r.VJ)(),u=function(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;n&&a({id:e,owner:n})},h=()=>{e&&c(e)},m=l==n.owner,v=n.members.filter((e=>e!=l));return{otherMembers:v,transferOwner:u,leaveChannel:h,leaving:d,leaveSuccess:o,isOwner:m,transfering:i,transferSuccess:t}}var h=l(5845),m=l(1296),v=l(4527),p=l(6417);const x=d.ZP.ul`
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
`;function g(e){let{id:n,closeModal:l,withLeave:s=!0}=e;const{transferOwner:i,otherMembers:d,leaving:r,leaveChannel:g,leaveSuccess:f,transferSuccess:b,transfering:j}=u(n),[w,Z]=(0,a.useState)(null),C=(0,t.s0)(),y=e=>{Z(e)};if((0,a.useEffect)((()=>{b&&f&&(c.ZP.success("Leave channel successfully!"),l(),C("/chat"))}),[f,b,s]),!n)return null;const k=r||j;return(0,p.jsx)(o.Z,{id:"modal-modal",children:(0,p.jsx)(h.Z,{className:"compact",title:"Transfer Ownership",description:"This cannot be undone.",buttons:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(m.Z,{onClick:l.bind(null,void 0),className:"cancel",children:"Cancel"}),(0,p.jsx)(m.Z,{disabled:!w,onClick:async()=>{w&&(await i(w),s&&await g())},className:"danger",children:k?"Assigning":"Assign and Leave"})]}),children:(0,p.jsx)(x,{children:d.map((e=>(0,p.jsx)("li",{className:"user "+(w==e?"selected":""),onClick:y.bind(null,e),children:(0,p.jsx)(v.Z,{uid:e,interactive:!1})},e)))})})})}function f(e){let{id:n,closeModal:l,handleNextStep:s}=e;const i=(0,t.s0)(),{isOwner:d,leaving:r,leaveChannel:v,leaveSuccess:x}=u(n);return(0,a.useEffect)((()=>{x&&(c.ZP.success("Leave channel successfully!"),l(),i("/chat"))}),[x]),n?(0,p.jsx)(o.Z,{id:"modal-modal",children:(0,p.jsx)(h.Z,{className:"compact",title:"Leave Channel",description:d?"You need to transfer your channel ownership to someone else before leaving the channel.":"Are you sure want to leave this channel?",buttons:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(m.Z,{onClick:l.bind(null,void 0),className:"cancel",children:"Cancel"}),d?(0,p.jsx)(m.Z,{onClick:s,className:"main",children:"Next"}):(0,p.jsx)(m.Z,{onClick:v,className:"danger",children:r?"Leaving":"Leave"})]})})}):null}function b(e){let{id:n=null,isOwner:l=!1,closeModal:s}=e;const[i,t]=(0,a.useState)(l);return i?(0,p.jsx)(g,{id:n,closeModal:s}):(0,p.jsx)(f,{id:n,closeModal:s,handleNextStep:()=>{t(!0)}})}var j=l(1129),w=l(9367),Z=l(7814),C=l(8648),y=l(1707),k=l(4155),N=l(6567);const S=l.p+"static/media/channel.a72cc13c77b3112e68c1.svg",L=d.ZP.div`
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
`;function M(e){let{id:n=0}=e;const{loginUser:l,channel:i}=(0,s.v9)((e=>({loginUser:e.contacts.byId[e.authData.uid],channel:e.channels.byId[n]}))),{data:t,refetch:d}=(0,r.aw)(n),[o,u]=(0,a.useState)(!1),[h,m]=(0,a.useState)(null),[v]=(0,r.kG)(),[x,{isSuccess:g}]=(0,r.tW)(),f=e=>{const n=e.target.value,{type:l}=e.target.dataset;m((e=>({...e,[l]:n})))};if((0,a.useEffect)((()=>{t&&m(t)}),[t]),(0,a.useEffect)((()=>{if(t&&h){const{name:e,description:n}=h,{name:l,description:a}=t;u(l!==e||a!==n)}}),[t,h]),(0,a.useEffect)((()=>{g&&(c.ZP.success("Channel updated!"),d())}),[g]),!h||!n)return null;const{name:b,description:j}=h,w=!(null!==l&&void 0!==l&&l.is_admin)&&(null===i||void 0===i?void 0:i.owner)!=(null===l||void 0===l?void 0:l.uid);return(0,p.jsxs)(L,{children:[(0,p.jsx)(Z.Z,{type:"channel",url:null===i||void 0===i?void 0:i.icon,name:b,uploadImage:e=>{v({gid:n,image:e})}}),(0,p.jsxs)("div",{className:"inputs",children:[(0,p.jsxs)("div",{className:"input",children:[(0,p.jsx)(y.Z,{htmlFor:"name",children:"Channel Name"}),(0,p.jsx)(C.Z,{disabled:w,className:"name","data-type":"name",onChange:f,value:b,name:"name",id:"name",placeholder:"Channel Name"})]}),(0,p.jsxs)("div",{className:"input",children:[(0,p.jsx)(y.Z,{htmlFor:"desc",children:"Channel Topic"}),(0,p.jsx)(k.Z,{disabled:w,"data-type":"description",onChange:f,value:null!==j&&void 0!==j?j:"",rows:4,name:"name",id:"name",placeholder:"Let everyone know how to use this channel."})]})]}),o&&(0,p.jsx)(N.Z,{saveHandler:()=>{const{name:e,description:l}=h;x({id:n,name:e,description:l})},resetHandler:()=>{m(t)}})]})}var D=l(11);const O=e=>[{title:"General",items:[{name:"overview",title:"Overview",component:(0,p.jsx)(M,{id:e})},{name:"members",title:"Members",component:(0,p.jsx)(D.Z,{cid:e})}]}];let E=null;function U(){var e;const{cid:n}=(0,t.UO)(),{isAdmin:l,loginUid:c,channel:d}=(0,s.v9)((e=>{var l;return{loginUid:e.authData.uid,isAdmin:null===(l=e.contacts.byId[e.authData.uid])||void 0===l?void 0:l.is_admin,channel:e.channels.byId[n]}})),o=(0,t.s0)(),[r]=(0,i.lr)(),u=O(n),h=u.map((e=>{let{items:n}=e;return n})).flat(),m=r.get("nav");E=null!==(e=E)&&void 0!==e?e:r.get("f")||"/";const[v,x]=(0,a.useState)(!1),[g,f]=(0,a.useState)(!1),Z=()=>{x((e=>!e))},C=()=>{f((e=>!e))};if(!n)return null;const y=h.find((e=>e.name==m))||h[0],k=l||(null===d||void 0===d?void 0:d.owner)==c,N=!(null!==d&&void 0!==d&&d.is_public);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j.Z,{nav:y,closeModal:()=>{o(E),E=null},title:"Channel Setting",navs:u,dangers:[N&&{title:"Leave Channel",handler:C},k&&{title:"Delete Channel",handler:Z}],children:y.component}),v&&(0,p.jsx)(w.Z,{closeModal:Z,id:n}),g&&(0,p.jsx)(b,{closeModal:C,id:n})]})}}}]);