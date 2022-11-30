"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[651],{17237:(e,n,t)=>{t.d(n,{Z:()=>c});var i=t(70537),o=t(40182),s=t(57889),a=t(80683);const r=s.ZP.div`
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
`,l=s.ZP.input`
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
`,c=e=>{let{type:n="text",prefix:t="",className:s,...c}=e;const[d,p]=(0,i.useState)(n);return"password"==n?(0,a.jsxs)(r,{className:s,children:[(0,a.jsx)(l,{type:d,className:`inner ${s}`,...c}),(0,a.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==d?(0,a.jsx)(o.MBb,{color:"#78787c"}):(0,a.jsx)(o.Rbo,{color:"#78787c"})})]}):t?(0,a.jsxs)(r,{className:s,children:[(0,a.jsx)("span",{className:"prefix",children:t}),(0,a.jsx)(l,{className:`inner ${s}`,type:d,...c})]}):(0,a.jsx)(l,{type:d,className:s,...c})}},15621:(e,n,t)=>{t.d(n,{Z:()=>c});var i=t(70537),o=t(57889),s=t(80683);const a=o.ZP.form`
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
`,r="",l=[],c=e=>{let{options:n,values:t=l,value:o=r,defaultValue:c="",onChange:d}=e;const p=(0,i.useId)(),[x,h]=(0,i.useState)(c),g=o!==r?o:x;return(0,s.jsx)(a,{children:n.map(((e,n)=>(0,s.jsxs)("div",{className:"option",children:[(0,s.jsx)("input",{type:"radio",checked:(t!==l?t.indexOf(g):g)===n,onChange:()=>{const e=t===l?n:t[n];o===r&&h(e),d&&d(e)},id:`${p}-${n}`}),(0,s.jsx)("div",{className:"box",children:(0,s.jsx)("label",{htmlFor:`${p}-${n}`,children:e})})]},n)))})}},26209:(e,n,t)=>{t.d(n,{Z:()=>a});var i=t(70537),o=t(34108),s=t(27418);const a=e=>{const{enableToast:n=!0}=e||{},[t,a]=(0,i.useState)(!1);(0,i.useEffect)((()=>{t&&n&&s.ZP.success("Copied!")}),[t]);const r=e=>{const n=document.createElement("textarea");n.value=e,n.setAttribute("readonly",""),n.style.position="absolute",n.style.left="-9999px",document.body.appendChild(n);const t=document.getSelection();if(!t)return!1;const i=t.rangeCount>0&&t.getRangeAt(0);n.select();const o=document.execCommand("copy");return document.body.removeChild(n),i&&(t.removeAllRanges(),t.addRange(i)),o};return{copied:t,copy:function(e){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=0;return t||(n?(0,o.VP)(e).then((()=>{a(!0),i=window.setTimeout((()=>{a(!1)}),500)})):(a(r(e)),i=window.setTimeout((()=>{a(!1)}),500))),()=>{clearTimeout(i)}}}}},4884:(e,n,t)=>{t.d(n,{Z:()=>r});var i=t(70537),o=t(26209),s=t(65809),a=t(6144);function r(e){const[n,t]=(0,i.useState)(""),{data:r,isSuccess:l}=(0,s.n8)(),[c,{data:d,isLoading:p}]=(0,a.CU)(),{copied:x,copy:h}=(0,o.Z)({enableToast:!1});(0,i.useEffect)((()=>{c(e)}),[e]),(0,i.useEffect)((()=>{d&&l&&t(d)}),[d,l]);return{enableSMTP:r,generating:p,generateNewLink:e?c.bind(null,e):()=>{c()},link:n,linkCopied:x,copyLink:()=>{h(n)}}}},76200:(e,n,t)=>{t.r(n),t.d(n,{default:()=>F});var i=t(70537),o=t(62471),s=t(75889),a=(t(49537),t(57889)),r=t(69885);const l=t.p+"static/media/play.ec27369d1d14e509155a.svg";var c=t(71893),d=t(80683);const p=a.ZP.div`
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
`;function x(e){let{nextStep:n}=e;const{t:t}=(0,c.$)("welcome",{keyPrefix:"onboarding"});return(0,d.jsxs)(p,{children:[(0,d.jsx)("span",{className:"primaryText",children:t("welcome")}),(0,d.jsx)("span",{className:"secondaryText",children:t("welcome_desc")}),(0,d.jsxs)(r.Z,{className:"startButton",onClick:n,children:[(0,d.jsx)("img",{src:l,alt:"play icon"}),(0,d.jsx)("span",{children:t("start")})]})]})}var h=t(27418),g=t(17237);const m=a.ZP.div`
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
`,f=e=>{let{serverName:n,setServerName:t,nextStep:i}=e;const{t:o}=(0,c.$)("welcome",{keyPrefix:"onboarding"});return(0,d.jsxs)(m,{children:[(0,d.jsx)("span",{className:"primaryText",children:o("new_server")}),(0,d.jsx)("span",{className:"secondaryText",children:o("server_desc")}),(0,d.jsx)(g.Z,{className:"input",placeholder:o("placeholder_server"),value:n,onChange:e=>t(e.target.value)}),(0,d.jsx)(r.Z,{className:"button",onClick:()=>{""!==n?i():h.ZP.error("Please enter server name!")},children:o("create_server")})]})};var u=t(3074),b=t(65809),w=t(15312),v=t(21645),y=t(66160);const j=a.ZP.div`
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

    > .inner {
      padding: 0;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }

    &:not(:nth-last-child(2)) {
      margin-bottom: 20px;
    }
  }

  > .button {
    width: 360px;
    margin-top: 24px;
  }
`,N=e=>{let{serverName:n,nextStep:t}=e;const{t:o}=(0,c.$)("welcome",{keyPrefix:"onboarding"}),s=(0,y.CG)((e=>!!e.authData.token)),a=(0,u.I0)(),[l,{isLoading:p,isError:x,isSuccess:m}]=(0,b.QK)(),[f,{isLoading:N,isError:k}]=(0,w.YA)(),{data:T}=(0,b.z3)(),[Z,{isLoading:C,isSuccess:S}]=(0,b.e2)(),[P,_]=(0,i.useState)(""),[z,$]=(0,i.useState)(""),[E,L]=(0,i.useState)("");return(0,i.useEffect)((()=>{x&&h.ZP.error("Failed to sign up")}),[x]),(0,i.useEffect)((()=>{m&&f({email:P,password:z,type:"password"})}),[m]),(0,i.useEffect)((()=>{k&&h.ZP.error("Login failed")}),[k]),(0,i.useEffect)((()=>{s&&T&&(a((0,v.R4)(!0)),Z({...T,name:n}))}),[s]),(0,i.useEffect)((()=>{S&&t()}),[S]),(0,d.jsxs)(j,{children:[(0,d.jsx)("span",{className:"primaryText",children:o("admin_title")}),(0,d.jsx)("span",{className:"secondaryText",children:o("admin_desc")}),(0,d.jsx)(g.Z,{className:"input",placeholder:"Enter your email",value:P,onChange:e=>_(e.target.value)}),(0,d.jsx)(g.Z,{className:"input",type:"password",placeholder:"Enter your password",value:z,onChange:e=>$(e.target.value)}),(0,d.jsx)(g.Z,{className:"input",type:"password",placeholder:"Confirm your password",value:E,onChange:e=>L(e.target.value)}),(0,d.jsx)(r.Z,{className:"button",onClick:async()=>{""!==P?""!==z?z===E?l({email:P,name:"Admin",password:z,gender:0}):h.ZP.error("Two passwords do not match!"):h.ZP.error("Please enter admin password!"):h.ZP.error("Please enter admin email!")},children:p||N||C?"...":o("sign")})]})};var k=t(15621);const T=a.ZP.div`
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
`;function Z(e){let{nextStep:n}=e;const{t:t}=(0,c.$)("welcome"),{data:o}=(0,b.ww)(),[s,{isSuccess:a,error:l}]=(0,b.QP)(),[p,x]=(0,i.useState)();return(0,i.useEffect)((()=>{o&&x(o.who_can_sign_up)}),[o]),(0,i.useEffect)((()=>{void 0!==l&&h.ZP.error(`Failed to update sign up rule: ${l.data}`)}),[l]),(0,i.useEffect)((()=>{a&&n()}),[a]),(0,d.jsxs)(T,{children:[(0,d.jsx)("span",{className:"primaryText",children:t("onboarding.invite_title")}),(0,d.jsx)("span",{className:"secondaryText",children:t("onboarding.invite_desc")}),(0,d.jsx)(k.Z,{options:[t("overview.sign_up.everyone",{ns:"setting"}),t("overview.sign_up.invite",{ns:"setting"})],values:["EveryOne","InvitationOnly"],value:p,onChange:x}),(0,d.jsx)(r.Z,{className:"button",disabled:!p,onClick:()=>{void 0!==o&&s({...o,who_can_sign_up:p})},children:t("onboarding.confirm")})]})}var C=t(4884);const S=a.ZP.div`
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
`;function P(e){let{nextStep:n}=e;const{t:t}=(0,c.$)("welcome",{keyPrefix:"onboarding"}),{t:i}=(0,c.$)(),{link:o,linkCopied:s,copyLink:a}=(0,C.Z)();return(0,d.jsxs)(S,{children:[(0,d.jsx)("span",{className:"primaryText",children:t("invite_title")}),(0,d.jsx)("span",{className:"secondaryText",children:t("last_tip")}),(0,d.jsx)("span",{className:"tip",children:t("last_desc")}),(0,d.jsxs)("div",{className:"link",children:[(0,d.jsx)(g.Z,{className:"large",readOnly:!0,placeholder:"Generating",value:o}),(0,d.jsx)(r.Z,{onClick:a,className:"ghost small border_less",children:s?"Copied":i("action.copy")})]}),(0,d.jsx)(r.Z,{className:"button",onClick:n,children:t("done")})]})}var _=t(15924),z=t(40642);const $=a.ZP.div`
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
`;function E(e){let{serverName:n}=e;const{t:t}=(0,c.$)("welcome",{keyPrefix:"onboarding"}),i=(0,_.s0)();return(0,d.jsxs)($,{children:[(0,d.jsx)("span",{className:"primaryText",children:t("done_welcome",{serverName:n})}),(0,d.jsx)("span",{className:"secondaryText",children:t("done_title")}),(0,d.jsx)("span",{className:"tip",children:(0,d.jsx)(z.c,{i18nKey:"onboarding.done_desc",ns:"welcome",children:(0,d.jsx)("span",{className:"strong"})})}),(0,d.jsxs)(r.Z,{className:"startButton",onClick:()=>i("/"),children:[(0,d.jsx)("img",{src:l,alt:"play icon"}),(0,d.jsx)("span",{children:t("enter")})]})]})}var L=t(47912);const A=[{name:"welcomePage",label:(0,L.t)("welcome:onboarding.welcome_page")},{name:"serverName",label:(0,L.t)("welcome:onboarding.set_name")},{name:"adminAccount",label:(0,L.t)("welcome:onboarding.admin_account")},{name:"whoCanSignUp",label:(0,L.t)("welcome:onboarding.who_sign_up")},{name:"inviteLink",label:(0,L.t)("welcome:onboarding.invites"),canJumpTo:["whoCanSignUp"]},{name:"donePage",label:(0,L.t)("welcome:onboarding.done"),canJumpTo:["whoCanSignUp","inviteLink"]}];const B=a.ZP.div`
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

  > .swiper {
    height: 100%;
  }
`,O=e=>{var n;let{step:t,setStep:o}=e;const s=A.map((e=>e.name)).indexOf(t),a=(null===(n=A.find((e=>e.name===t)))||void 0===n?void 0:n.canJumpTo)||[];return(0,d.jsx)("div",{className:"navigator",children:A.map(((e,n)=>{const t=a.includes(e.name),r=`node ${n===s?"emphasized":""} ${n>s?"disabled":""} ${t?"clickable":""}`,l="arrow "+(n>=s?"disabled":"");return(0,d.jsxs)(i.Fragment,{children:[(0,d.jsx)("span",{className:r,onClick:()=>{t&&o(e.name)},children:e.label}),n!==A.length-1&&(0,d.jsx)("span",{className:l,children:"\u2192"})]},n)}))})};function F(){const{t:e}=(0,c.$)("welcome"),n=function(){const[e,n]=(0,i.useState)(null),[t,o]=(0,i.useState)(0),s=A[t].name,a=(0,i.useCallback)((n=>{const t=A.map((e=>e.name)).indexOf(n);o(t),null!==e&&e.slideTo(t)}),[e]),r=(0,i.useCallback)((()=>{o((e=>e+1)),null!==e&&e.slideNext(500)}),[e]),[l,c]=(0,i.useState)("");return{swiper:e,setSwiper:n,step:s,setStep:a,nextStep:r,serverName:l,setServerName:c}}();return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(o.q,{children:(0,d.jsx)("title",{children:e("onboarding.title")})}),(0,d.jsxs)(B,{children:[(0,d.jsx)(O,{...n}),(0,d.jsxs)(s.tq,{spaceBetween:50,allowTouchMove:!1,onSwiper:e=>n.setSwiper(e),children:[(0,d.jsx)(s.o5,{children:(0,d.jsx)(x,{...n})}),(0,d.jsx)(s.o5,{children:(0,d.jsx)(f,{...n})}),(0,d.jsx)(s.o5,{children:(0,d.jsx)(N,{...n})}),(0,d.jsx)(s.o5,{children:(0,d.jsx)(Z,{...n})}),(0,d.jsx)(s.o5,{children:e=>{let{isActive:t}=e;return t?(0,d.jsx)(P,{...n}):null}}),(0,d.jsx)(s.o5,{children:(0,d.jsx)(E,{...n})})]})]})]})}}}]);