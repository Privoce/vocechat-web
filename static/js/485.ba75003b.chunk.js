"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[485],{17237:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(70537),o=n(40182),r=n(57889),s=n(80683);const a=r.ZP.div`
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
`,c=r.ZP.input`
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
`,l=e=>{let{type:t="text",prefix:n="",className:r,...l}=e;const[d,p]=(0,i.useState)(t);return"password"==t?(0,s.jsxs)(a,{className:r,children:[(0,s.jsx)(c,{type:d,className:`inner ${r}`,...l}),(0,s.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==d?(0,s.jsx)(o.MBb,{color:"#78787c"}):(0,s.jsx)(o.Rbo,{color:"#78787c"})})]}):n?(0,s.jsxs)(a,{className:r,children:[(0,s.jsx)("span",{className:"prefix",children:n}),(0,s.jsx)(c,{className:`inner ${r}`,type:d,...l})]}):(0,s.jsx)(c,{type:d,className:r,...l})}},15621:(e,t,n)=>{n.d(t,{Z:()=>l});var i=n(70537),o=n(57889),r=n(80683);const s=o.ZP.form`
  width: 100%;
  > .option {
    &:not(:last-child) {
      margin-bottom: 8px;
    }

    > input[type="radio"] {
      display: none;

      & + .box {
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
`,a="",c=[],l=e=>{let{options:t,values:n=c,value:o=a,defaultValue:l="",onChange:d}=e;const p=(0,i.useId)(),[x,u]=(0,i.useState)(l),h=o!==a?o:x;return(0,r.jsx)(s,{children:t.map(((e,t)=>(0,r.jsxs)("div",{className:"option",children:[(0,r.jsx)("input",{type:"radio",checked:(n!==c?n.indexOf(h):h)===t,onChange:()=>{const e=n===c?t:n[t];o===a&&u(e),d&&d(e)},id:`${p}-${t}`}),(0,r.jsx)("div",{className:"box",children:(0,r.jsx)("label",{htmlFor:`${p}-${t}`,children:e})})]},t)))})}},26209:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(70537),o=n(34108),r=n(27418);const s=e=>{const{enableToast:t=!0}=e||{},[n,s]=(0,i.useState)(!1);(0,i.useEffect)((()=>{n&&t&&r.ZP.success("Copied!")}),[n]);const a=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection();if(!n)return!1;const i=n.rangeCount>0&&n.getRangeAt(0);t.select();const o=document.execCommand("copy");return document.body.removeChild(t),i&&(n.removeAllRanges(),n.addRange(i)),o};return{copied:n,copy:function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=0;return n||(t?(0,o.VP)(e).then((()=>{s(!0),i=window.setTimeout((()=>{s(!1)}),500)})):(s(a(e)),i=window.setTimeout((()=>{s(!1)}),500))),()=>{clearTimeout(i)}}}}},4884:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(70537),o=n(26209),r=n(65809),s=n(6144);function a(e){const[t,n]=(0,i.useState)(""),{data:a,isSuccess:c}=(0,r.n8)(),[l,{data:d,isLoading:p}]=(0,s.CU)(),{copied:x,copy:u}=(0,o.Z)({enableToast:!1});(0,i.useEffect)((()=>{l(e)}),[e]),(0,i.useEffect)((()=>{d&&c&&n(d)}),[d,c]);return{enableSMTP:a,generating:p,generateNewLink:e?l.bind(null,e):()=>{l()},link:t,linkCopied:x,copyLink:()=>{u(t)}}}},4772:(e,t,n)=>{n.r(t),n.d(t,{default:()=>F});var i=n(70537),o=n(62471);const r=(0,i.createContext)(null);const s=()=>{const e=(0,i.useContext)(r);return e},a=(0,i.memo)((e=>{let{header:t,footer:n,children:o,wrapper:s,startIndex:a=0}=e;const[c,l]=(0,i.useState)(a),[d,p]=(0,i.useState)(!1),x=(0,i.useRef)(!0),u=(0,i.useRef)(!1),h=(0,i.useRef)((()=>{})),f=i.Children.toArray(o).length;x.current=c<f-1,u.current=c>0;const g=(0,i.useRef)((()=>{x.current&&l((e=>e+1))})),m=(0,i.useRef)((()=>{u.current&&(h.current=null,l((e=>e-1)))})),b=(0,i.useRef)((e=>{e>=0&&e<f&&(h.current=null,l(e))})),w=(0,i.useRef)((e=>{h.current=e})),v=(0,i.useRef)((async()=>{if(x.current&&h.current)try{p(!0),await h.current(),p(!1),h.current=null,g.current()}catch(e){throw p(!1),e}else g.current()})),y=(0,i.useMemo)((()=>({nextStep:v.current,previousStep:m.current,handleStep:w.current,isLoading:d,activeStep:c,stepCount:f,isFirstStep:!u.current,isLastStep:!x.current,goToStep:b.current})),[c,f,d]),j=(0,i.useMemo)((()=>i.Children.toArray(o)[c]),[c,o,t,n]),N=(0,i.useMemo)((()=>s?(0,i.cloneElement)(s,{children:j}):j),[s,j]);return(0,i.createElement)(r.Provider,{value:y},t,N,n)}));var c=n(57889),l=n(69885);const d=n.p+"static/media/play.ec27369d1d14e509155a.svg";var p=n(14566),x=n(80683);const u=c.ZP.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .primaryText {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 8px;
  }

  > .secondaryText {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 24px;
  }

  > .startButton {
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
`;function h(){const{t:e}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),{nextStep:t}=s();return(0,x.jsxs)(u,{children:[(0,x.jsx)("span",{className:"primaryText",children:e("welcome")}),(0,x.jsx)("span",{className:"secondaryText",children:e("welcome_desc")}),(0,x.jsxs)(l.Z,{className:"startButton",onClick:t,children:[(0,x.jsx)("img",{src:d,alt:"play icon"}),(0,x.jsx)("span",{children:e("start")})]})]})}var f=n(27418),g=n(17237);const m=c.ZP.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .primaryText {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 8px;
  }

  > .secondaryText {
    width: 360px;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 24px;
    color: #667085;
  }

  > .input {
    width: 360px;
    height: 44px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding: 10px 14px;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  }

  > .button {
    width: 360px;
    margin-top: 24px;
  }
`,b=e=>{let{serverName:t,setServerName:n}=e;const{t:i}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),{nextStep:o}=s();return(0,x.jsxs)(m,{children:[(0,x.jsx)("span",{className:"primaryText",children:i("new_server")}),(0,x.jsx)("span",{className:"secondaryText",children:i("server_desc")}),(0,x.jsx)(g.Z,{className:"input",placeholder:i("placeholder_server"),value:t,onChange:e=>n(e.target.value)}),(0,x.jsx)(l.Z,{className:"button",onClick:()=>{""!==t?o():f.ZP.error("Please enter server name!")},children:i("create_server")})]})};var w=n(3074),v=n(65809),y=n(15312),j=n(21645),N=n(66160);const k=c.ZP.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .primaryText {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 8px;
  }

  > .secondaryText {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 24px;
  }

  form {
    > .input {
    margin-bottom: 20px;
    width: 360px;
    height: 44px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding: 10px 14px;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
    > .inner {
      padding: 0;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
  }}

  > .button {
    width: 360px;
    margin-top: 24px;
  }
`,C=e=>{let{serverName:t}=e;const{t:n}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),{nextStep:o}=s(),r=(0,i.useRef)(),a=(0,N.CG)((e=>!!e.authData.token)),c=(0,w.I0)(),[d,{isLoading:u,isError:h,isSuccess:m}]=(0,v.QK)(),[b,{isLoading:C,isError:T}]=(0,y.YA)(),{data:S}=(0,v.z3)(),[Z,{isLoading:_,isSuccess:P}]=(0,v.e2)(),[z,E]=(0,i.useState)(""),[$,L]=(0,i.useState)(""),[R,G]=(0,i.useState)("");return(0,i.useEffect)((()=>{h&&f.ZP.error("Failed to sign up")}),[h]),(0,i.useEffect)((()=>{m&&b({email:z,password:$,type:"password"})}),[m]),(0,i.useEffect)((()=>{T&&f.ZP.error("Login failed")}),[T]),(0,i.useEffect)((()=>{a&&S&&(c((0,j.R4)(!0)),Z({...S,name:t}))}),[a]),(0,i.useEffect)((()=>{P&&o()}),[P]),(0,x.jsxs)(k,{children:[(0,x.jsx)("span",{className:"primaryText",children:n("admin_title")}),(0,x.jsx)("span",{className:"secondaryText",children:n("admin_desc")}),(0,x.jsxs)("form",{ref:r,action:"/",children:[(0,x.jsx)(g.Z,{className:"input",placeholder:"Enter your email",type:"email",required:!0,value:z,onChange:e=>E(e.target.value)}),(0,x.jsx)(g.Z,{className:"input",type:"password",required:!0,minLength:6,placeholder:"Enter your password",value:$,onChange:e=>L(e.target.value)}),(0,x.jsx)(g.Z,{className:"input",type:"password",required:!0,minLength:6,placeholder:"Confirm your password",value:R,onChange:e=>G(e.target.value)})]}),(0,x.jsx)(l.Z,{className:"button",onClick:async()=>{const e=null===r||void 0===r?void 0:r.current;if(e){if(!e.checkValidity())return void e.reportValidity();d({email:z,name:"Admin",password:$,gender:0})}},children:u||C||_?"...":n("sign")})]})};var T=n(15621);const S=c.ZP.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .primaryText {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 8px;
  }

  > .secondaryText {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 24px;
  }

  > form {
    width: 512px;
  }

  > .button {
    width: 124px;
    height: 44px;
    margin-top: 24px;
  }
`;function Z(){const{t:e}=(0,p.$G)("welcome"),{t:t}=(0,p.$G)("setting"),{nextStep:n}=s(),{data:o,refetch:r}=(0,v.ww)(),[a,{isSuccess:c,error:d}]=(0,v.QP)(),[u,h]=(0,i.useState)();return(0,i.useEffect)((()=>{r()}),[]),(0,i.useEffect)((()=>{o&&h(o.who_can_sign_up)}),[o]),(0,i.useEffect)((()=>{void 0!==d&&f.ZP.error(`Failed to update sign up rule: ${d.data}`)}),[d]),(0,i.useEffect)((()=>{c&&n()}),[c]),(0,x.jsxs)(S,{children:[(0,x.jsx)("span",{className:"primaryText",children:e("onboarding.invite_title")}),(0,x.jsx)("span",{className:"secondaryText",children:e("onboarding.invite_desc")}),u&&(0,x.jsx)(T.Z,{options:[t("overview.sign_up.everyone"),t("overview.sign_up.invite")],values:["EveryOne","InvitationOnly"],value:u,onChange:h}),(0,x.jsx)(l.Z,{className:"button",disabled:!u,onClick:()=>{void 0!==o&&(o.who_can_sign_up!==u?a({...o,who_can_sign_up:u}):n())},children:e("onboarding.confirm")})]})}var _=n(4884);const P=c.ZP.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .primaryText {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 8px;
  }

  > .secondaryText {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
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
      transition: color 150ms ease-in-out;

      &:hover {
        color: #088ab2;
      }
    }
  }

  > .button {
    width: 124px;
    height: 44px;
    margin-top: 24px;
  }
`;function z(){const{t:e}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),{t:t}=(0,p.$G)(),{nextStep:n}=s(),{link:i,linkCopied:o,copyLink:r}=(0,_.Z)();return(0,x.jsxs)(P,{children:[(0,x.jsx)("span",{className:"primaryText",children:e("invite_title")}),(0,x.jsx)("span",{className:"secondaryText",children:e("last_tip")}),(0,x.jsx)("span",{className:"tip",children:e("last_desc")}),(0,x.jsxs)("div",{className:"link",children:[(0,x.jsx)(g.Z,{className:"large",readOnly:!0,placeholder:"Generating",value:i}),(0,x.jsx)(l.Z,{onClick:r,className:"ghost small border_less",children:o?"Copied":t("action.copy")})]}),(0,x.jsx)(l.Z,{className:"button",onClick:n,children:e("done")})]})}var E=n(15924);const $=c.ZP.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .primaryText {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 8px;
  }

  > .secondaryText {
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 48px;
  }

  > .tip {
    width: 588px;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    margin-bottom: 48px;

    > .strong {
      font-weight: 700;
    }
  }

  > .startButton {
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
`;function L(e){let{serverName:t}=e;const{t:n}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),i=(0,E.s0)();return(0,x.jsxs)($,{children:[(0,x.jsx)("span",{className:"primaryText",children:n("done_welcome",{serverName:t})}),(0,x.jsx)("span",{className:"secondaryText",children:n("done_title")}),(0,x.jsx)("span",{className:"tip",children:(0,x.jsx)(p.cC,{i18nKey:"onboarding.done_desc",ns:"welcome",children:(0,x.jsx)("span",{className:"strong"})})}),(0,x.jsxs)(l.Z,{className:"startButton",onClick:()=>i("/"),children:[(0,x.jsx)("img",{src:d,alt:"play icon"}),(0,x.jsx)("span",{children:n("enter")})]})]})}var R=n(47912);const G=[{name:"welcomePage",label:(0,R.t)("welcome:onboarding.welcome_page")},{name:"serverName",label:(0,R.t)("welcome:onboarding.set_name")},{name:"adminAccount",label:(0,R.t)("welcome:onboarding.admin_account")},{name:"whoCanSignUp",label:(0,R.t)("welcome:onboarding.who_sign_up")},{name:"inviteLink",label:(0,R.t)("welcome:onboarding.invites"),canJumpTo:["whoCanSignUp"]},{name:"donePage",label:(0,R.t)("welcome:onboarding.done"),canJumpTo:["whoCanSignUp","inviteLink"]}],A=c.ZP.div`
  height: 100vh;
  overflow-y: auto;
  > .navigator {
    position: absolute;
    top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 8px;
    z-index: 10;

    > .node,
    > .arrow {
      font-weight: 400;
      font-size: 14px;
      line-height: 28px;
      color: #101828;
      cursor: default;
      transition: all 150ms ease-in-out;

      &.disabled {
        color: #d0d5dd;
      }

      &.emphasized {
        font-weight: 600;
      }

      &.clickable {
        cursor: pointer;

        &:hover {
          color: #717180;
        }
      }
    }
  }
`,B=()=>{var e;const{activeStep:t,goToStep:n}=s(),o=(null===(e=G[t])||void 0===e?void 0:e.canJumpTo)||[];return(0,x.jsx)("div",{className:"navigator",children:G.map(((e,r)=>{const s=o.includes(e.name),a=`node ${r===t?"emphasized":""} ${r>t?"disabled":""} ${s?"clickable":""}`,c="arrow "+(r>=t?"disabled":"");return(0,x.jsxs)(i.Fragment,{children:[(0,x.jsx)("span",{className:a,onClick:()=>{s&&n(r)},children:e.label}),r!==G.length-1&&(0,x.jsx)("span",{className:c,children:"\u2192"})]},r)}))})};function F(){const{t:e}=(0,p.$G)("welcome"),[t,n]=(0,i.useState)("");return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o.q,{children:(0,x.jsx)("title",{children:e("onboarding.title")})}),(0,x.jsx)(A,{children:(0,x.jsxs)(a,{header:(0,x.jsx)(B,{}),children:[(0,x.jsx)(h,{}),(0,x.jsx)(b,{serverName:t,setServerName:n}),(0,x.jsx)(C,{serverName:t}),(0,x.jsx)(Z,{}),(0,x.jsx)(z,{}),(0,x.jsx)(L,{serverName:t})]})})]})}},34108:(e,t,n)=>{function i(e,t,n,i){return new(n||(n=Promise))((function(o,r){function s(e){try{c(i.next(e))}catch(t){r(t)}}function a(e){try{c(i.throw(e))}catch(t){r(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((i=i.apply(e,t||[])).next())}))}function o(e){return i(this,void 0,void 0,(function*(){const t=URL.createObjectURL(e),n=yield function(e){return i(this,void 0,void 0,(function*(){return new Promise((function(t,n){const i=document.createElement("img");i.crossOrigin="anonymous",i.src=e,i.onload=function(e){const n=e.target;t(n)},i.onabort=n,i.onerror=n}))}))}(t);return yield function(e){return i(this,void 0,void 0,(function*(){return new Promise((function(t,n){const i=document.createElement("canvas"),o=i.getContext("2d");if(o){const{width:r,height:s}=e;i.width=r,i.height=s,o.drawImage(e,0,0,r,s),i.toBlob((function(e){e?t(e):n("Cannot get blob from image element")}),"image/png",1)}}))}))}(n)}))}function r(e){return i(this,void 0,void 0,(function*(){const t={[e.type]:e},n=new ClipboardItem(t);yield navigator.clipboard.write([n])}))}function s(e){return i(this,void 0,void 0,(function*(){const t=yield function(e){return i(this,void 0,void 0,(function*(){const t=yield fetch(`${e}`);return yield t.blob()}))}(e);if(function(e){return e.type.includes("jpeg")}(t)){const e=yield o(t);return yield r(e),t}if(function(e){return e.type.includes("png")}(t))return yield r(t),t;throw new Error("Cannot copy this type of image to clipboard")}))}n.d(t,{VP:()=>s})}}]);