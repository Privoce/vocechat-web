"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[71],{79356:(e,s,n)=>{n.d(s,{A:()=>h});var t=n(81084),l=n(71017),a=n(43307),i=n(25303),c=n(72793),d=n(80724),r=n(90800),o=n(32642),u=n(11433),m=n(52205),v=n(99264);const h=({id:e,type:s="channel"})=>{var n,h;const x=(0,d.GV)((n=>"channel"==s?n.footprint.autoDeleteMsgChannels.find((s=>s.gid==e)):n.footprint.autoDeleteMsgUsers.find((s=>s.uid==e))),m.bN),f=(0,d.GV)((e=>e.authData.user),m.bN),p=(0,d.GV)((n=>"channel"==s?n.channels.byId[e]:null),m.bN),[g,{isSuccess:j}]=(0,i.B_)(),[_,{isSuccess:A}]=(0,c.Br)(),[b,w]=(0,t.useState)(null!==(n=null===x||void 0===x?void 0:x.expires_in)&&void 0!==n?n:0),{t:N}=(0,a.Bd)("setting",{keyPrefix:"auto_delete_msg"}),{t:y}=(0,a.Bd)(),S=[{title:N("off"),value:0},{title:N("5_min"),value:300},{title:N("10_min"),value:600},{title:N("1_hour"),value:3600},{title:N("1_day"),value:86400},{title:N("1_week"),value:604800}];(0,t.useEffect)((()=>{j&&l.oR.success(y("tip.update"))}),[j]),(0,t.useEffect)((()=>{A&&l.oR.success("Cleared!")}),[A]);const C=null!==(h=null===x||void 0===x?void 0:x.expires_in)&&void 0!==h?h:0,k="channel"==s&&((null===p||void 0===p?void 0:p.owner)==(null===f||void 0===f?void 0:f.uid)||(null===f||void 0===f?void 0:f.is_admin));return(0,v.jsxs)("section",{className:"max-w-[512px] h-full relative",children:[(0,v.jsxs)("div",{className:"text-sm",children:[(0,v.jsx)("h2",{className:"dark:text-white",children:N("title")}),(0,v.jsx)("p",{className:"text-gray-400 text-xs",children:N("desc")})]}),(0,v.jsx)("div",{className:"mt-4",children:(0,v.jsx)(u.A,{options:S.map((({title:e})=>e)),values:S.map((({value:e})=>e)),value:b||0,onChange:e=>{w(e)}})}),C!==b&&(0,v.jsx)(r.A,{saveHandler:()=>{g("dm"==s?{users:[{uid:e,expires_in:b}]}:{groups:[{gid:e,expires_in:b}]})},resetHandler:()=>{var e;w(null!==(e=null===x||void 0===x?void 0:x.expires_in)&&void 0!==e?e:0)}}),k&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{className:"text-sm mt-8",children:[(0,v.jsx)("h2",{className:"dark:text-white",children:N("clear_title")}),(0,v.jsx)("p",{className:"text-gray-400 text-xs",children:N("clear_desc")})]}),(0,v.jsx)("div",{className:"mt-4",children:(0,v.jsx)(o.A,{className:"danger",onClick:()=>{confirm("are you sure?")&&_(e)},children:N("clear")})})]})]})}},24514:(e,s,n)=>{n.d(s,{A:()=>m});var t=n(81084),l=n(71017),a=n(43307),i=n(76644),c=n(72793),d=n(26521),r=n(32642),o=n(55371),u=n(99264);const m=({id:e,closeModal:s})=>{const{t:n}=(0,a.Bd)("setting"),{t:m}=(0,a.Bd)(),v=(0,i.Zp)(),[h,{isLoading:x,isSuccess:f}]=(0,c.eN)();return(0,t.useEffect)((()=>{f&&(l.Ay.success(m("tip.delete")),s(),v("/chat"))}),[f]),e?(0,u.jsx)(d.A,{id:"modal-modal",children:(0,u.jsx)(o.A,{compact:!0,title:n("channel.delete"),description:n("channel.delete_desc"),buttons:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(r.A,{onClick:s.bind(null,void 0),className:"cancel",children:m("action.cancel")}),(0,u.jsx)(r.A,{onClick:()=>{h(e)},className:"danger",children:x?"Deleting":m("action.remove")})]})})}):null}},30015:(e,s,n)=>{n.r(s),n.d(s,{default:()=>H});var t=n(81084),l=n(43307),a=n(76644),i=n(80772),c=n(80724),d=n(71017),r=n(72793),o=n(52205);function u(e){const s=(0,c.GV)((e=>{var s;return null===(s=e.authData.user)||void 0===s?void 0:s.uid}),o.bN),n=(0,c.GV)((s=>s.channels.byId[e]),o.bN),[t,{isLoading:l,isSuccess:a}]=(0,r.t1)(),[i,{isLoading:d,isSuccess:u}]=(0,r.Ss)(),m=s==(null===n||void 0===n?void 0:n.owner);return{otherMembers:(null===n||void 0===n?void 0:n.members.filter((e=>e!=s)))||[],transferOwner:s=>{s&&t({id:e,owner:s})},leaveChannel:()=>{e&&i(e)},leaving:d,leaveSuccess:u,isOwner:m,transferring:l,transferSuccess:a}}var m=n(26521),v=n(32642),h=n(55371),x=n(99264);const f=({id:e,closeModal:s,handleNextStep:n})=>{const{t:i}=(0,l.Bd)("setting"),c=(0,a.Zp)(),{isOwner:r,leaving:o,leaveChannel:f,leaveSuccess:p}=u(e);return(0,t.useEffect)((()=>{p&&(d.Ay.success("Leave channel successfully!"),s(),c("/chat"))}),[p]),e?(0,x.jsx)(m.A,{id:"modal-modal",children:(0,x.jsx)(h.A,{compact:!0,title:i("channel.leave"),description:i(r?"channel.transfer_desc":"channel.leave_desc"),buttons:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(v.A,{onClick:s.bind(null,void 0),className:"cancel",children:i("action.cancel",{ns:"common"})}),r?(0,x.jsx)(v.A,{onClick:n,className:"main",children:"Next"}):(0,x.jsx)(v.A,{onClick:f,className:"danger",children:o?"Leaving":"Leave"})]})})}):null};var p=n(45774),g=n(7688);const j=({id:e,closeModal:s,withLeave:n=!0})=>{const{t:i}=(0,l.Bd)(),{transferOwner:c,otherMembers:r,leaving:o,leaveChannel:f,leaveSuccess:j,transferSuccess:_,transferring:A}=u(e),[b,w]=(0,t.useState)(null),N=(0,a.Zp)(),y=e=>{w(e)};if((0,t.useEffect)((()=>{_&&j&&(d.Ay.success("Leave channel successfully!"),s(),N("/chat"))}),[j,_,n]),!e)return null;const S=o||A;return(0,x.jsx)(m.A,{id:"modal-modal",children:(0,x.jsx)(h.A,{compact:!0,title:"Transfer Ownership",description:"This cannot be undone.",buttons:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(v.A,{onClick:s.bind(null,void 0),className:"cancel",children:i("action.cancel")}),(0,x.jsx)(v.A,{disabled:!b,onClick:async()=>{b&&(await c(b),n&&await f())},className:"danger",children:S?"Assigning":"Assign and Leave"})]}),children:(0,x.jsx)("ul",{className:"flex flex-col max-h-[260px] py-4 overflow-y-scroll",children:r.map((e=>(0,x.jsx)("li",{className:(0,p.A)("cursor-pointer flex items-center px-2 md:hover:bg-gray-500/10",b==e?"bg-gray-500/10":""),onClick:y.bind(null,e),children:(0,x.jsx)(g.A,{uid:e,interactive:!1})},e)))})})})},_=({id:e,isOwner:s=!1,closeModal:n})=>{const[l,a]=(0,t.useState)(s);return l?(0,x.jsx)(j,{id:e,closeModal:n}):(0,x.jsx)(f,{id:e,closeModal:n,handleNextStep:()=>{a(!0)}})};var A=n(212),b=n(24514),w=n(71610),N=n(79356),y=n(87965),S=n(90800),C=n(87740),k=n(73050),E=n(11433),B=n(49912),M=n(70373),L=n(63363);const D=({id:e,show_email:s})=>{const{t:n}=(0,l.Bd)("setting"),{t:a}=(0,l.Bd)(),[i]=(0,r.h3)(),[c,{isSuccess:o}]=(0,r.t1)();(0,t.useEffect)((()=>{o&&(i(e),d.Ay.success(a("tip.update")))}),[o,e]);return(0,x.jsx)(L.A,{title:"Show Email",desc:"",children:(0,x.jsx)(E.A,{options:["Enable","Disable"],values:["true","false"],value:`${s}`,onChange:s=>{c({id:e,show_email:"true"==s})}})})},F=({id:e,dm_to_member:s})=>{const{t:n}=(0,l.Bd)("setting"),{t:a}=(0,l.Bd)(),[i]=(0,r.h3)(),[c,{isSuccess:o}]=(0,r.t1)();(0,t.useEffect)((()=>{o&&(i(e),d.Ay.success(a("tip.update")))}),[o,e]);return(0,x.jsx)(L.A,{title:"DM to member",desc:"",children:(0,x.jsx)(E.A,{options:["Allow","Disallow"],values:["true","false"],value:`${s}`,onChange:s=>{c({id:e,dm_to_member:"true"==s})}})})},G=({id:e,add_friend:s})=>{const{t:n}=(0,l.Bd)("setting"),{t:a}=(0,l.Bd)(),[i]=(0,r.h3)(),[c,{isSuccess:o}]=(0,r.t1)();(0,t.useEffect)((()=>{o&&(i(e),d.Ay.success(a("tip.update")))}),[o,e]);return(0,x.jsx)(L.A,{title:"Add friend",desc:"",children:(0,x.jsx)(E.A,{options:["Allow","Disallow"],values:["true","false"],value:`${s}`,onChange:s=>{c({id:e,add_friend:"true"==s})}})})};var V=n(97780);const O=({id:e,only_owner_can_send_msg:s})=>{const{t:n}=(0,l.Bd)("setting"),{t:a}=(0,l.Bd)(),[i]=(0,r.h3)(),[c,{isSuccess:o}]=(0,r.t1)();(0,t.useEffect)((()=>{o&&(i(e),d.Ay.success(a("tip.update")))}),[o,e]);return(0,x.jsx)(L.A,{title:"Only Owner Send Message",desc:"",children:(0,x.jsx)(E.A,{options:["Enable","Disable"],values:["true","false"],value:`${s}`,onChange:s=>{c({id:e,only_owner_can_send_msg:"true"==s})}})})};function I({id:e=0}){const{t:s}=(0,l.Bd)("setting",{keyPrefix:"channel"}),{t:n}=(0,l.Bd)(),a=(0,c.GV)((e=>e.authData.user),o.bN),i=(0,c.GV)((s=>s.channels.byId[e]),o.bN),{data:u,refetch:m}=(0,r.pc)(e),[v,h]=(0,t.useState)(!1),[f,p]=(0,t.useState)(),[g]=(0,r.ZJ)(),[j,{isSuccess:_}]=(0,r.t1)(),[A,{isSuccess:b}]=(0,r.qg)(),w=e=>{const s=e.target.value,{type:n=""}=e.target.dataset;p((e=>e?{...e,[n]:s}:e))};if((0,t.useEffect)((()=>{u&&p(u)}),[u]),(0,t.useEffect)((()=>{if(u&&f){const{name:e,description:s}=f,{name:n,description:t}=u;h(n!==e||t!==s)}}),[u,f]),(0,t.useEffect)((()=>{_&&(d.Ay.success(n("tip.update")),m())}),[_]),(0,t.useEffect)((()=>{b&&d.Ay.success(n("tip.update"))}),[b]),!f||!e||!i)return null;const{name:N,description:L,show_email:I,dm_to_member:Z,add_friend:$,only_owner_can_send_msg:H}=f,T=!(null!==a&&void 0!==a&&a.is_admin)&&(null===i||void 0===i?void 0:i.owner)!=(null===a||void 0===a?void 0:a.uid),P="w-full flex flex-col items-start gap-2 relative";return(0,x.jsxs)("div",{className:"relative w-[512px] flex flex-col gap-6 h-full mb-10",children:[(0,x.jsx)(y.A,{type:"channel",url:null===i||void 0===i?void 0:i.icon,name:N,uploadImage:s=>{g({gid:e,image:s})}}),(0,x.jsxs)("div",{className:"flex flex-col gap-6 items-start",children:[(0,x.jsxs)("div",{className:"flex items-center gap-1",children:[(0,x.jsx)(k.A,{htmlFor:"name",children:s("id")}),(0,x.jsxs)("span",{className:"text-gray-500",children:["#",e]})]}),(0,x.jsxs)("div",{className:P,children:[(0,x.jsx)(k.A,{htmlFor:"name",children:s("name")}),(0,x.jsx)(C.A,{disabled:T,className:"!pl-8","data-type":"name",onChange:w,value:N,name:"name",id:"name",placeholder:s("name")}),(0,x.jsx)(M.A,{className:"absolute bottom-2.5 left-2 dark:fill-gray-300"})]}),(0,x.jsxs)("div",{className:P,children:[(0,x.jsx)(k.A,{htmlFor:"desc",children:s("topic")}),(0,x.jsx)(B.A,{disabled:T,"data-type":"description",onChange:w,value:null!==L&&void 0!==L?L:"",rows:4,name:"name",id:"name",placeholder:s("topic_placeholder")})]}),!T&&a.is_admin&&(0,x.jsxs)("div",{className:P,children:[(0,x.jsx)(k.A,{htmlFor:"desc",children:s("visibility")}),(0,x.jsx)(E.A,{options:[s("public"),s("private")],values:["true","false"],value:String(i.is_public),onChange:s=>{A({is_public:"true"===s.toLowerCase(),id:e})}})]}),(0,x.jsx)(V.A,{empty:!0,version:"0.3.50",children:(0,x.jsxs)(x.Fragment,{children:[!T&&a.is_admin&&(0,x.jsx)(O,{id:e,only_owner_can_send_msg:H}),!T&&a.is_admin&&(0,x.jsx)(D,{id:e,show_email:I}),!T&&a.is_admin&&(0,x.jsx)(F,{id:e,dm_to_member:Z}),!T&&a.is_admin&&(0,x.jsx)(G,{id:e,add_friend:$})]})})]}),v&&(0,x.jsx)(S.A,{saveHandler:()=>{if(!f)return;const{name:s,description:n}=f;j({id:e,name:s,description:n})},resetHandler:()=>{p(u)}})]})}const Z=e=>{const{t:s}=(0,l.Bd)("setting");return[{title:s("nav.general"),items:[{name:"overview",title:s("nav.overview"),component:(0,x.jsx)(I,{id:e})},{name:"auto_delete_msg",title:s("nav.auto_delete_msg"),component:(0,x.jsx)(N.A,{id:e})},{name:"members",title:s("nav.members"),component:(0,x.jsx)(w.A,{cid:e})}]}]};let $="";function H(){const{t:e}=(0,l.Bd)("setting"),{cid:s=0,nav:n}=(0,a.g)(),d=(0,c.GV)((e=>e.authData.user),o.bN),r=(0,c.GV)((e=>s?e.channels.byId[+s]:void 0),o.bN),u=(0,a.Zp)(),[m]=(0,i.ok)(),v=Z(+s),h=v.map((({items:e})=>e)).flat();$=$||(m.get("f")||"/");const[f,p]=(0,t.useState)(!1),[g,j]=(0,t.useState)(!1),w=()=>{p((e=>!e))},N=()=>{j((e=>!e))};if(!s)return null;const y=h.find((e=>e.name==n)),S=(null===d||void 0===d?void 0:d.is_admin)||(null===r||void 0===r?void 0:r.owner)==(null===d||void 0===d?void 0:d.uid),C=!(null!==r&&void 0!==r&&r.is_public);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(A.A,{pathPrefix:`/setting/channel/${s}`,nav:y,closeModal:()=>{u($),$=""},title:"Channel Settings",navs:v,dangers:[C&&{title:e("channel.leave"),handler:N},S&&{title:e("channel.delete"),handler:w}],children:n?null===y||void 0===y?void 0:y.component:null}),f&&(0,x.jsx)(b.A,{closeModal:w,id:+s}),g&&(0,x.jsx)(_,{closeModal:N,id:+s})]})}},35041:(e,s,n)=>{n.d(s,{j:()=>a});var t=n(81084),l=n(5208);function a(e,s,n=!0){const a=(0,t.useRef)(s),i=(0,t.useCallback)((s=>{e.current&&!e.current.contains(s.target)&&a.current(s)}),[e]);(0,t.useEffect)((()=>{a.current=s})),(0,t.useEffect)((()=>n?(document.addEventListener("click",i,!0),document.addEventListener("ontouchstart",i,!0),()=>{document.removeEventListener("click",i,!0),document.removeEventListener("ontouchstart",i,!0)}):l.l),[e,s,n,i])}},5208:(e,s,n)=>{n.d(s,{l:()=>t});const t=()=>{}}}]);