"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[391],{11089:(e,n,s)=>{s.d(n,{Z:()=>u});var l=s(70537),i=s(27418),a=s(14566),t=s(52334),c=s(66160),d=s(24563),r=s(15621),o=s(80683);const u=e=>{var n,s;let{id:u,type:v="channel"}=e;const h=(0,c.CG)((e=>"channel"==v?e.footprint.autoDeleteMsgChannels.find((e=>e.gid==u)):e.footprint.autoDeleteMsgUsers.find((e=>e.uid==u)))),[m,{isSuccess:p}]=(0,t.ar)(),[x,g]=(0,l.useState)(null!==(n=null===h||void 0===h?void 0:h.expires_in)&&void 0!==n?n:0),{t:f}=(0,a.$G)("setting",{keyPrefix:"auto_delete_msg"}),{t:j}=(0,a.$G)(),b=[{title:f("off"),value:0},{title:f("5_min"),value:300},{title:f("10_min"),value:600},{title:f("1_hour"),value:3600},{title:f("1_day"),value:86400},{title:f("1_week"),value:604800}];(0,l.useEffect)((()=>{p&&i.Am.success(j("tip.update"))}),[p]);const Z=null!==(s=null===h||void 0===h?void 0:h.expires_in)&&void 0!==s?s:0;return(0,o.jsxs)("section",{className:"max-w-[512px] h-full relative",children:[(0,o.jsxs)("div",{className:"text-sm",children:[(0,o.jsx)("h2",{children:f("title")}),(0,o.jsx)("p",{className:"text-gray-500",children:f("desc")})]}),(0,o.jsx)("div",{className:"mt-4",children:(0,o.jsx)(r.Z,{options:b.map((e=>{let{title:n}=e;return n})),values:b.map((e=>{let{value:n}=e;return n})),value:x||0,onChange:e=>{g(e)}})}),Z!==x&&(0,o.jsx)(d.Z,{saveHandler:()=>{m("user"==v?{users:[{uid:u,expires_in:x}]}:{groups:[{gid:u,expires_in:x}]})},resetHandler:()=>{var e;g(null!==(e=null===h||void 0===h?void 0:h.expires_in)&&void 0!==e?e:0)}})]})}},77493:(e,n,s)=>{s.d(n,{Z:()=>v});var l=s(70537),i=s(27418),a=s(15924),t=s(80874),c=s(6144),d=s(40698),r=s(69885),o=s(14566),u=s(80683);const v=e=>{let{id:n,closeModal:s}=e;const{t:v}=(0,o.$G)("setting"),{t:h}=(0,o.$G)(),m=(0,a.s0)(),[p,{isLoading:x,isSuccess:g}]=(0,c.kE)();return(0,l.useEffect)((()=>{g&&(i.ZP.success(h("tip.delete")),s(),m("/chat"))}),[g]),n?(0,u.jsx)(t.Z,{id:"modal-modal",children:(0,u.jsx)(d.Z,{className:"compact",title:v("channel.delete"),description:v("channel.delete_desc"),buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(r.Z,{onClick:s.bind(null,void 0),className:"cancel",children:h("action.cancel")}),(0,u.jsx)(r.Z,{onClick:()=>{p(n)},className:"danger",children:x?"Deleting":h("action.remove")})]})})}):null}},75157:(e,n,s)=>{s.r(n),s.d(n,{default:()=>F});var l=s(70537),i=s(15924),a=s(64084),t=s(27418),c=s(57889),d=s(80874),r=s(6144),o=s(66160);function u(e){const{channel:n,loginUid:s}=(0,o.CG)((n=>{var s;return{channel:n.channels.byId[e],loginUid:null===(s=n.authData.user)||void 0===s?void 0:s.uid}})),[l,{isLoading:i,isSuccess:a}]=(0,r.tW)(),[t,{isLoading:c,isSuccess:d}]=(0,r.VJ)(),u=s==(null===n||void 0===n?void 0:n.owner);return{otherMembers:(null===n||void 0===n?void 0:n.members.filter((e=>e!=s)))||[],transferOwner:n=>{n&&l({id:e,owner:n})},leaveChannel:()=>{e&&t(e)},leaving:c,leaveSuccess:d,isOwner:u,transferring:i,transferSuccess:a}}var v=s(40698),h=s(69885),m=s(18951),p=s(14566),x=s(80683);const g=c.ZP.ul`
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
`,f=e=>{let{id:n,closeModal:s,withLeave:a=!0}=e;const{t:c}=(0,p.$G)(),{transferOwner:r,otherMembers:o,leaving:f,leaveChannel:j,leaveSuccess:b,transferSuccess:Z,transferring:w}=u(n),[_,C]=(0,l.useState)(null),k=(0,i.s0)(),y=e=>{C(e)};if((0,l.useEffect)((()=>{Z&&b&&(t.ZP.success("Leave channel successfully!"),s(),k("/chat"))}),[b,Z,a]),!n)return null;const N=f||w;return(0,x.jsx)(d.Z,{id:"modal-modal",children:(0,x.jsx)(v.Z,{className:"compact",title:"Transfer Ownership",description:"This cannot be undone.",buttons:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h.Z,{onClick:s.bind(null,void 0),className:"cancel",children:c("action.cancel")}),(0,x.jsx)(h.Z,{disabled:!_,onClick:async()=>{_&&(await r(_),a&&await j())},className:"danger",children:N?"Assigning":"Assign and Leave"})]}),children:(0,x.jsx)(g,{children:o.map((e=>(0,x.jsx)("li",{className:"user "+(_==e?"selected":""),onClick:y.bind(null,e),children:(0,x.jsx)(m.Z,{uid:e,interactive:!1})},e)))})})})},j=e=>{let{id:n,closeModal:s,handleNextStep:a}=e;const{t:c}=(0,p.$G)("setting"),r=(0,i.s0)(),{isOwner:o,leaving:m,leaveChannel:g,leaveSuccess:f}=u(n);return(0,l.useEffect)((()=>{f&&(t.ZP.success("Leave channel successfully!"),s(),r("/chat"))}),[f]),n?(0,x.jsx)(d.Z,{id:"modal-modal",children:(0,x.jsx)(v.Z,{className:"compact",title:c("channel.leave"),description:c(o?"channel.transfer_desc":"channel.leave_desc"),buttons:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h.Z,{onClick:s.bind(null,void 0),className:"cancel",children:c("action.cancel",{ns:"common"})}),o?(0,x.jsx)(h.Z,{onClick:a,className:"main",children:"Next"}):(0,x.jsx)(h.Z,{onClick:g,className:"danger",children:m?"Leaving":"Leave"})]})})}):null},b=e=>{let{id:n,isOwner:s=!1,closeModal:i}=e;const[a,t]=(0,l.useState)(s);return a?(0,x.jsx)(f,{id:n,closeModal:i}):(0,x.jsx)(j,{id:n,closeModal:i,handleNextStep:()=>{t(!0)}})};var Z=s(7477),w=s(77493),_=s(95727),C=s(17237),k=s(48540),y=s(15621),N=s(64884),S=s(24563);const G=s.p+"static/media/channel.0d6da91df9cd5abbd471.svg",M=c.ZP.div`
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
        background-image: url(${G});
        background-size: 20px;
        background-position-x: 8px;
        background-position-y: 8px;
        background-repeat: no-repeat;
      }

    }
  }
`;function $(e){let{id:n=0}=e;const{t:s}=(0,p.$G)("setting",{keyPrefix:"channel"}),{t:i}=(0,p.$G)(),{loginUser:a,channel:c}=(0,o.CG)((e=>({loginUser:e.authData.user,channel:e.channels.byId[n]}))),{data:d,refetch:u}=(0,r.aw)(n),[v,h]=(0,l.useState)(!1),[m,g]=(0,l.useState)(),[f]=(0,r.kG)(),[j,{isSuccess:b}]=(0,r.tW)(),[Z,{isSuccess:w}]=(0,r.Cl)(),G=e=>{const n=e.target.value,{type:s=""}=e.target.dataset;g((e=>e?{...e,[s]:n}:e))};if((0,l.useEffect)((()=>{d&&g(d)}),[d]),(0,l.useEffect)((()=>{if(d&&m){const{name:e,description:n}=m,{name:s,description:l}=d;h(s!==e||l!==n)}}),[d,m]),(0,l.useEffect)((()=>{b&&(t.ZP.success(i("tip.update")),u())}),[b]),(0,l.useEffect)((()=>{w&&t.ZP.success(i("tip.update"))}),[w]),!m||!n)return null;const{name:$,description:L}=m,E=!(null!==a&&void 0!==a&&a.is_admin)&&(null===c||void 0===c?void 0:c.owner)!=(null===a||void 0===a?void 0:a.uid);return(0,x.jsxs)(M,{children:[(0,x.jsx)(_.Z,{type:"channel",url:null===c||void 0===c?void 0:c.icon,name:$,uploadImage:e=>{f({gid:n,image:e})}}),(0,x.jsxs)("div",{className:"inputs",children:[(0,x.jsxs)("div",{className:"input",children:[(0,x.jsx)(k.Z,{htmlFor:"name",children:s("name")}),(0,x.jsx)(C.Z,{disabled:E,className:"name","data-type":"name",onChange:G,value:$,name:"name",id:"name",placeholder:s("name")})]}),(0,x.jsxs)("div",{className:"input",children:[(0,x.jsx)(k.Z,{htmlFor:"desc",children:s("topic")}),(0,x.jsx)(N.Z,{disabled:E,"data-type":"description",onChange:G,value:null!==L&&void 0!==L?L:"",rows:4,name:"name",id:"name",placeholder:s("topic_placeholder")})]}),!E&&(0,x.jsxs)("div",{className:"input",children:[(0,x.jsx)(k.Z,{htmlFor:"desc",children:s("visibility")}),(0,x.jsx)(y.Z,{options:[s("public"),s("private")],values:["true","false"],value:String(c.is_public),onChange:e=>{Z({is_public:"true"===e.toLowerCase(),id:n})}})]})]}),v&&(0,x.jsx)(S.Z,{saveHandler:()=>{if(!m)return;const{name:e,description:s}=m;j({id:n,name:e,description:s})},resetHandler:()=>{g(d)}})]})}var L=s(11089),E=s(93826);const P=e=>{const{t:n}=(0,p.$G)("setting");return[{title:n("nav.general"),items:[{name:"overview",title:n("nav.overview"),component:(0,x.jsx)($,{id:e})},{name:"auto_delete_msg",title:n("nav.auto_delete_msg"),component:(0,x.jsx)(L.Z,{id:e})},{name:"members",title:n("nav.members"),component:(0,x.jsx)(E.Z,{cid:e})}]}]};let U="";function F(){const{t:e}=(0,p.$G)("setting"),{cid:n=0}=(0,i.UO)(),{loginUser:s,channel:t}=(0,o.CG)((e=>({loginUser:e.authData.user,channel:n?e.channels.byId[+n]:void 0}))),c=(0,i.s0)(),[d]=(0,a.lr)(),r=P(+n),u=r.map((e=>{let{items:n}=e;return n})).flat(),v=d.get("nav");U=U||(d.get("f")||"/");const[h,m]=(0,l.useState)(!1),[g,f]=(0,l.useState)(!1),j=()=>{m((e=>!e))},_=()=>{f((e=>!e))};if(!n)return null;const C=u.find((e=>e.name==v))||u[0],k=(null===s||void 0===s?void 0:s.is_admin)||(null===t||void 0===t?void 0:t.owner)==(null===s||void 0===s?void 0:s.uid),y=!(null!==t&&void 0!==t&&t.is_public);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(Z.Z,{nav:C,closeModal:()=>{c(U),U=""},title:"Channel Setting",navs:r,dangers:[y&&{title:e("channel.leave"),handler:_},k&&{title:e("channel.delete"),handler:j}],children:C.component}),h&&(0,x.jsx)(w.Z,{closeModal:j,id:+n}),g&&(0,x.jsx)(b,{closeModal:_,id:+n})]})}}}]);