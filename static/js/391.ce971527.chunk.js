"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[391],{77493:(e,n,s)=>{s.d(n,{Z:()=>h});var l=s(70537),a=s(27418),i=s(15924),t=s(80874),c=s(6144),d=s(40698),r=s(69885),o=s(14566),u=s(80683);const h=e=>{let{id:n,closeModal:s}=e;const{t:h}=(0,o.$G)("setting"),{t:m}=(0,o.$G)(),v=(0,i.s0)(),[p,{isLoading:g,isSuccess:x}]=(0,c.kE)();return(0,l.useEffect)((()=>{x&&(a.ZP.success("delete channel successfully!"),s(),v("/chat"))}),[x]),n?(0,u.jsx)(t.Z,{id:"modal-modal",children:(0,u.jsx)(d.Z,{className:"compact",title:h("channel.delete"),description:h("channel.delete_desc"),buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(r.Z,{onClick:s.bind(null,void 0),className:"cancel",children:m("action.cancel")}),(0,u.jsx)(r.Z,{onClick:()=>{p(n)},className:"danger",children:g?"Deleting":m("action.remove")})]})})}):null}},75157:(e,n,s)=>{s.r(n),s.d(n,{default:()=>F});var l=s(70537),a=s(15924),i=s(64084),t=s(27418),c=s(57889),d=s(80874),r=s(6144),o=s(66160);function u(e){const{channel:n,loginUid:s}=(0,o.CG)((n=>{var s;return{channel:n.channels.byId[e],loginUid:null===(s=n.authData.user)||void 0===s?void 0:s.uid}})),[l,{isLoading:a,isSuccess:i}]=(0,r.tW)(),[t,{isLoading:c,isSuccess:d}]=(0,r.VJ)(),u=s==(null===n||void 0===n?void 0:n.owner);return{otherMembers:(null===n||void 0===n?void 0:n.members.filter((e=>e!=s)))||[],transferOwner:n=>{n&&l({id:e,owner:n})},leaveChannel:()=>{e&&t(e)},leaving:c,leaveSuccess:d,isOwner:u,transferring:a,transferSuccess:i}}var h=s(40698),m=s(69885),v=s(6458),p=s(14566),g=s(80683);const x=c.ZP.ul`
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
`,f=e=>{let{id:n,closeModal:s,withLeave:i=!0}=e;const{t:c}=(0,p.$G)(),{transferOwner:r,otherMembers:o,leaving:f,leaveChannel:b,leaveSuccess:j,transferSuccess:Z,transferring:w}=u(n),[C,k]=(0,l.useState)(null),y=(0,a.s0)(),S=e=>{k(e)};if((0,l.useEffect)((()=>{Z&&j&&(t.ZP.success("Leave channel successfully!"),s(),y("/chat"))}),[j,Z,i]),!n)return null;const N=f||w;return(0,g.jsx)(d.Z,{id:"modal-modal",children:(0,g.jsx)(h.Z,{className:"compact",title:"Transfer Ownership",description:"This cannot be undone.",buttons:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(m.Z,{onClick:s.bind(null,void 0),className:"cancel",children:c("action.cancel")}),(0,g.jsx)(m.Z,{disabled:!C,onClick:async()=>{C&&(await r(C),i&&await b())},className:"danger",children:N?"Assigning":"Assign and Leave"})]}),children:(0,g.jsx)(x,{children:o.map((e=>(0,g.jsx)("li",{className:"user "+(C==e?"selected":""),onClick:S.bind(null,e),children:(0,g.jsx)(v.Z,{uid:e,interactive:!1})},e)))})})})},b=e=>{let{id:n,closeModal:s,handleNextStep:i}=e;const{t:c}=(0,p.$G)("setting"),r=(0,a.s0)(),{isOwner:o,leaving:v,leaveChannel:x,leaveSuccess:f}=u(n);return(0,l.useEffect)((()=>{f&&(t.ZP.success("Leave channel successfully!"),s(),r("/chat"))}),[f]),n?(0,g.jsx)(d.Z,{id:"modal-modal",children:(0,g.jsx)(h.Z,{className:"compact",title:c("channel.leave"),description:c(o?"channel.transfer_desc":"channel.leave_desc"),buttons:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(m.Z,{onClick:s.bind(null,void 0),className:"cancel",children:c("action.cancel",{ns:"common"})}),o?(0,g.jsx)(m.Z,{onClick:i,className:"main",children:"Next"}):(0,g.jsx)(m.Z,{onClick:x,className:"danger",children:v?"Leaving":"Leave"})]})})}):null},j=e=>{let{id:n,isOwner:s=!1,closeModal:a}=e;const[i,t]=(0,l.useState)(s);return i?(0,g.jsx)(f,{id:n,closeModal:a}):(0,g.jsx)(b,{id:n,closeModal:a,handleNextStep:()=>{t(!0)}})};var Z=s(7477),w=s(77493),C=s(95727),k=s(17237),y=s(48540),S=s(15621),N=s(64884),G=s(24563);const M=s.p+"static/media/channel.a72cc13c77b3112e68c1.svg",_=c.ZP.div`
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
        background-image: url(${M});
        background-size: 20px;
        background-position-x: 8px;
        background-position-y: 8px;
        background-repeat: no-repeat;
      }

    }
  }
`;function L(e){let{id:n=0}=e;const{t:s}=(0,p.$G)("setting",{keyPrefix:"channel"}),{loginUser:a,channel:i}=(0,o.CG)((e=>({loginUser:e.authData.user,channel:e.channels.byId[n]}))),{data:c,refetch:d}=(0,r.aw)(n),[u,h]=(0,l.useState)(!1),[m,v]=(0,l.useState)(),[x]=(0,r.kG)(),[f,{isSuccess:b}]=(0,r.tW)(),[j,{isSuccess:Z}]=(0,r.Cl)(),w=e=>{const n=e.target.value,{type:s=""}=e.target.dataset;v((e=>e?{...e,[s]:n}:e))};if((0,l.useEffect)((()=>{c&&v(c)}),[c]),(0,l.useEffect)((()=>{if(c&&m){const{name:e,description:n}=m,{name:s,description:l}=c;h(s!==e||l!==n)}}),[c,m]),(0,l.useEffect)((()=>{b&&(t.ZP.success("Channel updated!"),d())}),[b]),(0,l.useEffect)((()=>{Z&&t.ZP.success("Change channel visibility successfully!")}),[Z]),!m||!n)return null;const{name:M,description:L}=m,E=!(null!==a&&void 0!==a&&a.is_admin)&&(null===i||void 0===i?void 0:i.owner)!=(null===a||void 0===a?void 0:a.uid);return(0,g.jsxs)(_,{children:[(0,g.jsx)(C.Z,{type:"channel",url:null===i||void 0===i?void 0:i.icon,name:M,uploadImage:e=>{x({gid:n,image:e})}}),(0,g.jsxs)("div",{className:"inputs",children:[(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(y.Z,{htmlFor:"name",children:s("name")}),(0,g.jsx)(k.Z,{disabled:E,className:"name","data-type":"name",onChange:w,value:M,name:"name",id:"name",placeholder:s("name")})]}),(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(y.Z,{htmlFor:"desc",children:s("topic")}),(0,g.jsx)(N.Z,{disabled:E,"data-type":"description",onChange:w,value:null!==L&&void 0!==L?L:"",rows:4,name:"name",id:"name",placeholder:s("topic_placeholder")})]}),!E&&(0,g.jsxs)("div",{className:"input",children:[(0,g.jsx)(y.Z,{htmlFor:"desc",children:s("visibility")}),(0,g.jsx)(S.Z,{options:[s("public"),s("private")],values:["true","false"],value:String(i.is_public),onChange:e=>{j({is_public:"true"===e.toLowerCase(),id:n})}})]})]}),u&&(0,g.jsx)(G.Z,{saveHandler:()=>{if(!m)return;const{name:e,description:s}=m;f({id:n,name:e,description:s})},resetHandler:()=>{v(c)}})]})}var E=s(51205);const P=e=>{const{t:n}=(0,p.$G)("setting");return[{title:n("nav.general"),items:[{name:"overview",title:n("nav.overview"),component:(0,g.jsx)(L,{id:e})},{name:"members",title:n("nav.members"),component:(0,g.jsx)(E.Z,{cid:e})}]}]};let $="";function F(){const{t:e}=(0,p.$G)("setting"),{cid:n=0}=(0,a.UO)(),{loginUser:s,channel:t}=(0,o.CG)((e=>({loginUser:e.authData.user,channel:n?e.channels.byId[+n]:void 0}))),c=(0,a.s0)(),[d]=(0,i.lr)(),r=P(+n),u=r.map((e=>{let{items:n}=e;return n})).flat(),h=d.get("nav");$=$||(d.get("f")||"/");const[m,v]=(0,l.useState)(!1),[x,f]=(0,l.useState)(!1),b=()=>{v((e=>!e))},C=()=>{f((e=>!e))};if(!n)return null;const k=u.find((e=>e.name==h))||u[0],y=(null===s||void 0===s?void 0:s.is_admin)||(null===t||void 0===t?void 0:t.owner)==(null===s||void 0===s?void 0:s.uid),S=!(null!==t&&void 0!==t&&t.is_public);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Z.Z,{nav:k,closeModal:()=>{c($),$=""},title:"Channel Setting",navs:r,dangers:[S&&{title:e("channel.leave"),handler:C},y&&{title:e("channel.delete"),handler:b}],children:k.component}),m&&(0,g.jsx)(w.Z,{closeModal:b,id:+n}),x&&(0,g.jsx)(j,{closeModal:C,id:+n})]})}}}]);