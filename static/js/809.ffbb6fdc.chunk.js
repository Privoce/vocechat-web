"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[809],{8648:(e,t,n)=>{n.d(t,{Z:()=>l});var o=n(7313),i=n(887),s=n(9184),r=n(6417);const a=s.ZP.div`
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
  .prefix {
    padding: 8px 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #9ca3af;
    background: #f3f4f6;
    border-right: 1px solid #e5e7eb;
  }
  .view {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`,c=s.ZP.input`
  width: 100%;
  background: #ffffff;

  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  padding: 8px;
  outline: none;
  &:not(.inner) {
    border-radius: 4px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
  }
  &.large {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 11px 8px;
  }
  &.none {
    outline: none;
    border: none;
    background: none;
    box-shadow: none;
  }
  &:disabled {
    color: #78787c;
    background-color: #f9fafb;
  }
  &::placeholder {
    color: #d1d5db;
  }
  &[type="password"] {
    padding-right: 30px;
  }
`;function l(e){let{type:t="text",prefix:n="",className:s,...l}=e;const[d,p]=(0,o.useState)(t);return"password"==t?(0,r.jsxs)(a,{className:s,children:[(0,r.jsx)(c,{type:d,className:`inner ${s}`,...l}),(0,r.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==d?(0,r.jsx)(i.MBb,{color:"#78787c"}):(0,r.jsx)(i.Rbo,{color:"#78787c"})})]}):n?(0,r.jsxs)(a,{className:s,children:[(0,r.jsx)("span",{className:"prefix",children:n}),(0,r.jsx)(c,{className:`inner ${s}`,type:d,...l})]}):(0,r.jsx)(c,{type:d,className:s,...l})}},1026:(e,t,n)=>{n.d(t,{Z:()=>r});var o=n(7313),i=n(1818),s=n(3657);const r=e=>{const{enableToast:t=!0}=e||{},[n,r]=(0,o.useState)(!1);(0,o.useEffect)((()=>{n&&t&&s.ZP.success("Copied!")}),[n]);const a=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);t.select();const o=document.execCommand("copy");return document.body.removeChild(t),n&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(n)),o};return{copied:n,copy:function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=0;return n||(t?(0,i.VP)(e).then((()=>{r(!0),o=setTimeout((()=>{r(!1)}),500)})):(r(a(e)),o=setTimeout((()=>{r(!1)}),500))),()=>{clearTimeout(o)}}}}},5120:(e,t,n)=>{n.d(t,{Z:()=>a});var o=n(7313),i=n(1026),s=n(4695),r=n(5564);function a(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;const[t,n]=(0,o.useState)(""),{data:a,isSuccess:c}=(0,s.n8)(),[l,{data:d,isLoading:p}]=(0,r.CU)(),[u,{data:x,isLoading:h}]=(0,s.CU)(),{copied:f,copy:m}=(0,i.Z)({enableToast:!1}),g=()=>{m(t)};(0,o.useEffect)((()=>{e?l(e):u()}),[e]),(0,o.useEffect)((()=>{const e=x||d;e&&c&&n(e)}),[x,d,c]);const b=()=>{u()};return{enableSMTP:a,generating:e?p:h,generateNewLink:e?l.bind(null,e):b,link:t,linkCopied:f,copyLink:g}}},190:(e,t,n)=>{n.r(t),n.d(t,{default:()=>R});var o=n(7313),i=n(7890),s=n(182),r=n(9184),a=n(1296);const c=n.p+"static/media/play.ec27369d1d14e509155a.svg";var l=n(6417);const d=r.ZP.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;function p(e){let{setStep:t}=e;return(0,l.jsxs)(d,{children:[(0,l.jsx)("span",{className:"primaryText",children:"Welcome to your Rustchat!"}),(0,l.jsx)("span",{className:"secondaryText",children:"Everything in this space is owned by you. Let\u2019s set up your space!"}),(0,l.jsxs)(a.Z,{className:"startButton",onClick:()=>t((e=>e+1)),children:[(0,l.jsx)("img",{src:c,alt:"play icon"}),(0,l.jsx)("span",{children:"Start"})]})]})}var u=n(3657),x=n(8648);const h=r.ZP.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .secondaryText {
    color: #667085;
  }

  > .button {
    margin-top: 24px;
  }
`;function f(e){let{setStep:t,data:n,setData:o}=e;return(0,l.jsxs)(h,{children:[(0,l.jsx)("span",{className:"primaryText",children:"Create a new server"}),(0,l.jsx)("span",{className:"secondaryText",children:"Servers are shared environments where teams can work on projects and chat."}),(0,l.jsx)(x.Z,{className:"input",placeholder:"Enter server name",value:n.serverName,onChange:e=>o({...n,serverName:e.target.value})}),(0,l.jsx)(a.Z,{className:"button",onClick:()=>{""!==n.serverName?t((e=>e+1)):u.ZP.error("Please enter server name!")},children:"Create Server"})]})}var m=n(3709),g=n(4695),b=n(1864),y=n(1690);const v=r.ZP.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .input:not(:nth-last-child(2)) {
    margin-bottom: 20px;
  }

  > .button {
    margin-top: 24px;
  }
`;function w(e){let{data:t,setStep:n}=e;const i=(0,m.I0)(),[s,{isLoading:r,error:c}]=(0,g.QK)(),[d,{isLoading:p,isSuccess:h,error:f}]=(0,b.YA)(),{data:w}=(0,g.z3)(),[j,{isLoading:N,isSuccess:k}]=(0,g.e2)(),[C,S]=(0,o.useState)(""),[Z,P]=(0,o.useState)(""),[T,E]=(0,o.useState)("");return(0,o.useEffect)((()=>{void 0!==c&&u.ZP.error(`Failed to sign up: ${c.data}`)}),[c]),(0,o.useEffect)((()=>{void 0!==f&&u.ZP.error(`Login failed: ${f.data}`)}),[f]),(0,o.useEffect)((()=>{h&&(i((0,y.R4)(!0)),setTimeout((()=>{j({...w,name:t.serverName})}),0))}),[h]),(0,o.useEffect)((()=>{k&&n((e=>e+1))}),[k]),(0,l.jsxs)(v,{children:[(0,l.jsx)("span",{className:"primaryText",children:"Now let\u2019s set up your admin account"}),(0,l.jsx)("span",{className:"secondaryText",children:"You are the 1st user and admin of your space!"}),(0,l.jsx)(x.Z,{className:"input",placeholder:"Enter your email",value:C,onChange:e=>S(e.target.value)}),(0,l.jsx)(x.Z,{className:"input",type:"password",placeholder:"Enter your password",value:Z,onChange:e=>P(e.target.value)}),(0,l.jsx)(x.Z,{className:"input",type:"password",placeholder:"Confirm your password",value:T,onChange:e=>E(e.target.value)}),(0,l.jsx)(a.Z,{className:"button",onClick:async()=>{""!==C?""!==Z?Z===T?(await s({email:C,name:"Admin",password:Z,gender:0}),await d({email:C,password:Z,type:"password"})):u.ZP.error("Two passwords do not match!"):u.ZP.error("Please enter admin password!"):u.ZP.error("Please enter admin email!")},children:r||p||N?"...":"Sign Up"})]})}var j=n(2379);const N=r.ZP.form`
  > .option {
    &:not(:last-child) {
      margin-bottom: 8px;
    }

    > input[type="radio"] {
      display: none;

      & + .box {
        width: 512px;
        background: #ffffff;
        border: 1px solid #d0d5dd;
        box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;
        transition: all ease-in-out 250ms;

        & > label {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: #667085;
          cursor: pointer;
          user-select: none;
          transition: all ease-in-out 250ms;

          &:before {
            content: "";
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 8px;
            background: #ffffff;
            box-shadow: inset 0 0 0 4px #ffffff;
            border: 1px solid #d0d5dd;
            margin: 14px 8px 14px 14px;
            transition: all ease-in-out 500ms;
          }
        }
      }

      &:checked + .box {
        background: #22ccee;
        border: 1px solid #d0d5dd;

        & > label {
          color: #ffffff;

          &:before {
            background: #ffffff;
            box-shadow: inset 0 0 0 4px #22ccee;
            border: 1px solid #ffffff;
          }
        }
      }
    }
  }
`;function k(e){let{options:t,value:n,onChange:i}=e;const[s,r]=(0,o.useState)(0),a=(0,o.useRef)((0,j.x0)());return(0,l.jsx)(N,{children:t.map(((e,t)=>(0,l.jsxs)("div",{className:"option",children:[(0,l.jsx)("input",{type:"radio",checked:(void 0!==n?n:s)===t,onChange:()=>{void 0===n&&r(t),null!==i&&i(t)},id:`${a.current}-${t}`}),(0,l.jsx)("div",{className:"box",children:(0,l.jsx)("label",{htmlFor:`${a.current}-${t}`,children:e})})]},t)))})}const C=r.ZP.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .input:not(:nth-last-child(2)) {
    margin-bottom: 20px;
  }
`;function S(e){let{setStep:t}=e;const{data:n}=(0,g.ww)(),[i,{isSuccess:s,error:r}]=(0,g.QP)(),[c,d]=(0,o.useState)(0);return(0,o.useEffect)((()=>{void 0!==r&&u.ZP.error(`Failed to update invitation rule: ${r.data}`)}),[r]),(0,o.useEffect)((()=>{s&&t((e=>e+1))}),[s]),(0,l.jsxs)(C,{children:[(0,l.jsx)("span",{className:"primaryText",children:"Last step: invite others!"}),(0,l.jsx)("span",{className:"secondaryText",children:"Firstly, who can sign up to this server?"}),(0,l.jsx)(k,{options:["Everyone","Invitation link only"],value:c,onChange:async e=>{if(d(e),void 0!==n){const t=["EveryOne","InvitationOnly"][e];await i({...n,who_can_sign_up:t})}}}),(0,l.jsx)(a.Z,{className:"button border_less ghost",onClick:()=>t((e=>e+1)),children:"Skip"})]})}var Z=n(5120);const P=r.ZP.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .secondaryText {
    margin-bottom: 40px;
  }

  > .tip {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #475467;
    margin-bottom: 8px;
  }

  > .link {
    position: relative;
    background: #ffffff;
    border: 1px solid #f4f4f5;
    box-shadow: 0 1px 2px rgba(31, 41, 55, 0.08);
    border-radius: 4px;
    width: 374px;
    display: flex;

    > input {
      border: none;
      box-shadow: none;
      padding: 11px 0 11px 8px;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #78787c;
    }

    > button {
      padding: 0 8px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #22ccee;
    }
  }
`;function T(e){let{setStep:t}=e;const{link:n,linkCopied:o,copyLink:i}=(0,Z.Z)();return(0,l.jsxs)(P,{children:[(0,l.jsx)("span",{className:"primaryText",children:"Last step: invite others!"}),(0,l.jsx)("span",{className:"secondaryText",children:"Now let\u2019s invite others!"}),(0,l.jsx)("span",{className:"tip",children:"Send invitation link to your future community members:"}),(0,l.jsxs)("div",{className:"link",children:[(0,l.jsx)(x.Z,{className:"large",readOnly:!0,placeholder:"Generating",value:n}),(0,l.jsx)(a.Z,{onClick:i,className:"ghost small border_less",children:o?"Copied":"Copy"})]}),(0,l.jsx)(a.Z,{className:"button border_less ghost",onClick:()=>t((e=>e+1)),children:"Skip"})]})}const E=r.ZP.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .secondaryText {
    margin-bottom: 48px;
  }

  > .tip {
    width: 560px;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    margin-bottom: 96px;

    > .strong {
      font-weight: 700;
    }
  }
`;function z(e){let{data:t,setStep:n}=e;return(0,l.jsxs)(E,{children:[(0,l.jsxs)("span",{className:"primaryText",children:["Welcome to ",t.serverName]}),(0,l.jsx)("span",{className:"secondaryText",children:"Proudly presented by Rustchat"}),(0,l.jsxs)("span",{className:"tip",children:["More settings, including domain resolution, privileges, securities, and invites are available in ",(0,l.jsx)("span",{className:"strong",children:"Settings"})]}),(0,l.jsxs)(a.Z,{className:"startButton",onClick:()=>n((e=>e+1)),children:[(0,l.jsx)("img",{src:c,alt:"play icon"}),(0,l.jsx)("span",{children:"Enter"})]})]})}const L=r.ZP.div`
  height: 100vh;
  overflow-y: auto;

  // shared with child components
  .primaryText,
  .secondaryText {
    text-align: center;
  }

  .primaryText {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 8px;
  }

  .secondaryText {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 24px;
  }

  .startButton {
    width: 128px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0 12px;

    > img {
      margin-bottom: 7px;
    }

    > span {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .input {
    width: 360px;
    height: 44px;
    border: none;
    box-shadow: none;
  }

  input.input {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding: 10px 14px;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  }

  .button {
    width: 360px;

    &.ghost.border_less {
      width: fit-content;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #98a2b3;
      margin-top: 14px;
    }
  }
`;function R(){const[e,t]=(0,o.useState)(0),[n,r]=(0,o.useState)({serverName:""}),a={setStep:t,data:n,setData:r};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.q,{children:(0,l.jsx)("title",{children:"Rustchat Setup"})}),(0,l.jsxs)(L,{children:[0===e&&(0,l.jsx)(p,{...a}),1===e&&(0,l.jsx)(f,{...a}),2===e&&(0,l.jsx)(w,{...a}),3===e&&(0,l.jsx)(S,{...a}),4===e&&(0,l.jsx)(T,{...a}),5===e&&(0,l.jsx)(z,{...a}),6===e&&(0,l.jsx)(i.Fg,{replace:!0,to:"/"})]})]})}},1818:(e,t,n)=>{function o(e,t,n,o){return new(n||(n=Promise))((function(i,s){function r(e){try{c(o.next(e))}catch(t){s(t)}}function a(e){try{c(o.throw(e))}catch(t){s(t)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,a)}c((o=o.apply(e,t||[])).next())}))}function i(e){return o(this,void 0,void 0,(function*(){const t=URL.createObjectURL(e),n=yield function(e){return o(this,void 0,void 0,(function*(){return new Promise((function(t,n){const o=document.createElement("img");o.crossOrigin="anonymous",o.src=e,o.onload=function(e){const n=e.target;t(n)},o.onabort=n,o.onerror=n}))}))}(t);return yield function(e){return o(this,void 0,void 0,(function*(){return new Promise((function(t,n){const o=document.createElement("canvas"),i=o.getContext("2d");if(i){const{width:s,height:r}=e;o.width=s,o.height=r,i.drawImage(e,0,0,s,r),o.toBlob((function(e){e?t(e):n("Cannot get blob from image element")}),"image/png",1)}}))}))}(n)}))}function s(e){return o(this,void 0,void 0,(function*(){const t={[e.type]:e},n=new ClipboardItem(t);yield navigator.clipboard.write([n])}))}function r(e){return o(this,void 0,void 0,(function*(){const t=yield function(e){return o(this,void 0,void 0,(function*(){const t=yield fetch(`${e}`);return yield t.blob()}))}(e);if(function(e){return e.type.includes("jpeg")}(t)){const e=yield i(t);return yield s(e),t}if(function(e){return e.type.includes("png")}(t))return yield s(t),t;throw new Error("Cannot copy this type of image to clipboard")}))}n.d(t,{VP:()=>r})}}]);