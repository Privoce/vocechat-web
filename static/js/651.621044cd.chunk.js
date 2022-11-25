"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[651],{17237:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(70537),o=n(40182),s=n(57889),a=n(80683);const r=s.ZP.div`
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
`,d=e=>{let{type:t="text",prefix:n="",className:s,...d}=e;const[c,p]=(0,i.useState)(t);return"password"==t?(0,a.jsxs)(r,{className:s,children:[(0,a.jsx)(l,{type:c,className:`inner ${s}`,...d}),(0,a.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==c?(0,a.jsx)(o.MBb,{color:"#78787c"}):(0,a.jsx)(o.Rbo,{color:"#78787c"})})]}):n?(0,a.jsxs)(r,{className:s,children:[(0,a.jsx)("span",{className:"prefix",children:n}),(0,a.jsx)(l,{className:`inner ${s}`,type:c,...d})]}):(0,a.jsx)(l,{type:c,className:s,...d})}},15621:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(70537),o=n(57889),s=n(80683);const a=o.ZP.form`
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
`,r="",l=[],d=e=>{let{options:t,values:n=l,value:o=r,defaultValue:d="",onChange:c}=e;const p=(0,i.useId)(),[x,h]=(0,i.useState)(d),g=o!==r?o:x;return(0,s.jsx)(a,{children:t.map(((e,t)=>(0,s.jsxs)("div",{className:"option",children:[(0,s.jsx)("input",{type:"radio",checked:(n!==l?n.indexOf(g):g)===t,onChange:()=>{const e=n===l?t:n[t];o===r&&h(e),c&&c(e)},id:`${p}-${t}`}),(0,s.jsx)("div",{className:"box",children:(0,s.jsx)("label",{htmlFor:`${p}-${t}`,children:e})})]},t)))})}},26209:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(70537),o=n(34108),s=n(27418);const a=e=>{const{enableToast:t=!0}=e||{},[n,a]=(0,i.useState)(!1);(0,i.useEffect)((()=>{n&&t&&s.ZP.success("Copied!")}),[n]);const r=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection();if(!n)return!1;const i=n.rangeCount>0&&n.getRangeAt(0);t.select();const o=document.execCommand("copy");return document.body.removeChild(t),i&&(n.removeAllRanges(),n.addRange(i)),o};return{copied:n,copy:function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=0;return n||(t?(0,o.VP)(e).then((()=>{a(!0),i=window.setTimeout((()=>{a(!1)}),500)})):(a(r(e)),i=window.setTimeout((()=>{a(!1)}),500))),()=>{clearTimeout(i)}}}}},4884:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(70537),o=n(26209),s=n(65809),a=n(6144);function r(e){const[t,n]=(0,i.useState)(""),{data:r,isSuccess:l}=(0,s.n8)(),[d,{data:c,isLoading:p}]=(0,a.CU)(),{copied:x,copy:h}=(0,o.Z)({enableToast:!1});(0,i.useEffect)((()=>{d(e)}),[e]),(0,i.useEffect)((()=>{c&&l&&n(c)}),[c,l]);return{enableSMTP:r,generating:p,generateNewLink:e?d.bind(null,e):()=>{d()},link:t,linkCopied:x,copyLink:()=>{h(t)}}}},76200:(e,t,n)=>{n.r(t),n.d(t,{default:()=>O});var i=n(70537),o=n(62471),s=n(75889),a=(n(49537),n(57889)),r=n(69885);const l=n.p+"static/media/play.ec27369d1d14e509155a.svg";var d=n(71893),c=n(80683);const p=a.ZP.div`
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
`;function x(e){let{nextStep:t}=e;const{t:n}=(0,d.$)("welcome",{keyPrefix:"onboarding"});return(0,c.jsxs)(p,{children:[(0,c.jsx)("span",{className:"primaryText",children:n("welcome")}),(0,c.jsx)("span",{className:"secondaryText",children:n("welcome_desc")}),(0,c.jsxs)(r.Z,{className:"startButton",onClick:t,children:[(0,c.jsx)("img",{src:l,alt:"play icon"}),(0,c.jsx)("span",{children:n("start")})]})]})}var h=n(27418),g=n(17237);const m=a.ZP.div`
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
`,f=e=>{let{serverName:t,setServerName:n,nextStep:i}=e;const{t:o}=(0,d.$)("welcome",{keyPrefix:"onboarding"});return(0,c.jsxs)(m,{children:[(0,c.jsx)("span",{className:"primaryText",children:o("new_server")}),(0,c.jsx)("span",{className:"secondaryText",children:o("server_desc")}),(0,c.jsx)(g.Z,{className:"input",placeholder:o("placeholder_server"),value:t,onChange:e=>n(e.target.value)}),(0,c.jsx)(r.Z,{className:"button",onClick:()=>{""!==t?i():h.ZP.error("Please enter server name!")},children:o("create_server")})]})};var u=n(3074),b=n(65809),w=n(15312),v=n(21645),y=n(66160);const j=a.ZP.div`
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
`,N=e=>{let{serverName:t,nextStep:n}=e;const{t:o}=(0,d.$)("welcome",{keyPrefix:"onboarding"}),s=(0,y.CG)((e=>!!e.authData.token)),a=(0,u.I0)(),[l,{isLoading:p,error:x}]=(0,b.QK)(),[m,{isLoading:f,error:N}]=(0,w.YA)(),{data:k}=(0,b.z3)(),[T,{isLoading:Z,isSuccess:C}]=(0,b.e2)(),[S,P]=(0,i.useState)(""),[z,_]=(0,i.useState)(""),[$,E]=(0,i.useState)("");return(0,i.useEffect)((()=>{void 0!==x&&h.ZP.error(`Failed to sign up: ${x.data}`)}),[x]),(0,i.useEffect)((()=>{void 0!==N&&h.ZP.error(`Login failed: ${N.data}`)}),[N]),(0,i.useEffect)((()=>{s&&k&&(a((0,v.R4)(!0)),T({...k,name:t}))}),[s]),(0,i.useEffect)((()=>{C&&n()}),[C]),(0,c.jsxs)(j,{children:[(0,c.jsx)("span",{className:"primaryText",children:o("admin_title")}),(0,c.jsx)("span",{className:"secondaryText",children:o("admin_desc")}),(0,c.jsx)(g.Z,{className:"input",placeholder:"Enter your email",value:S,onChange:e=>P(e.target.value)}),(0,c.jsx)(g.Z,{className:"input",type:"password",placeholder:"Enter your password",value:z,onChange:e=>_(e.target.value)}),(0,c.jsx)(g.Z,{className:"input",type:"password",placeholder:"Confirm your password",value:$,onChange:e=>E(e.target.value)}),(0,c.jsx)(r.Z,{className:"button",onClick:async()=>{""!==S?""!==z?z===$?(await l({email:S,name:"Admin",password:z,gender:0}),await m({email:S,password:z,type:"password"})):h.ZP.error("Two passwords do not match!"):h.ZP.error("Please enter admin password!"):h.ZP.error("Please enter admin email!")},children:p||f||Z?"...":o("sign")})]})};var k=n(15621);const T=a.ZP.div`
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
`;function Z(e){let{nextStep:t}=e;const{t:n}=(0,d.$)("welcome"),{data:o}=(0,b.ww)(),[s,{isSuccess:a,error:l}]=(0,b.QP)(),[p,x]=(0,i.useState)();return(0,i.useEffect)((()=>{o&&x(o.who_can_sign_up)}),[o]),(0,i.useEffect)((()=>{void 0!==l&&h.ZP.error(`Failed to update sign up rule: ${l.data}`)}),[l]),(0,i.useEffect)((()=>{a&&t()}),[a]),(0,c.jsxs)(T,{children:[(0,c.jsx)("span",{className:"primaryText",children:n("onboarding.invite_title")}),(0,c.jsx)("span",{className:"secondaryText",children:n("onboarding.invite_desc")}),(0,c.jsx)(k.Z,{options:[n("overview.sign_up.everyone",{ns:"setting"}),n("overview.sign_up.invite",{ns:"setting"})],values:["EveryOne","InvitationOnly"],value:p,onChange:x}),(0,c.jsx)(r.Z,{className:"button",disabled:!p,onClick:()=>{void 0!==o&&s({...o,who_can_sign_up:p})},children:n("onboarding.confirm")})]})}var C=n(4884);const S=a.ZP.div`
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
`;function P(e){let{nextStep:t}=e;const{t:n}=(0,d.$)("welcome",{keyPrefix:"onboarding"}),{t:i}=(0,d.$)(),{link:o,linkCopied:s,copyLink:a}=(0,C.Z)();return(0,c.jsxs)(S,{children:[(0,c.jsx)("span",{className:"primaryText",children:n("invite_title")}),(0,c.jsx)("span",{className:"secondaryText",children:n("last_tip")}),(0,c.jsx)("span",{className:"tip",children:n("last_desc")}),(0,c.jsxs)("div",{className:"link",children:[(0,c.jsx)(g.Z,{className:"large",readOnly:!0,placeholder:"Generating",value:o}),(0,c.jsx)(r.Z,{onClick:a,className:"ghost small border_less",children:s?"Copied":i("action.copy")})]}),(0,c.jsx)(r.Z,{className:"button",onClick:t,children:n("done")})]})}var z=n(15924),_=n(40642);const $=a.ZP.div`
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
`;function E(e){let{serverName:t}=e;const{t:n}=(0,d.$)("welcome",{keyPrefix:"onboarding"}),i=(0,z.s0)();return(0,c.jsxs)($,{children:[(0,c.jsx)("span",{className:"primaryText",children:n("done_welcome",{serverName:t})}),(0,c.jsx)("span",{className:"secondaryText",children:n("done_title")}),(0,c.jsx)("span",{className:"tip",children:(0,c.jsx)(_.c,{i18nKey:"onboarding.done_desc",ns:"welcome",children:(0,c.jsx)("span",{className:"strong"})})}),(0,c.jsxs)(r.Z,{className:"startButton",onClick:()=>i("/"),children:[(0,c.jsx)("img",{src:l,alt:"play icon"}),(0,c.jsx)("span",{children:n("enter")})]})]})}const L=[{name:"welcomePage",label:"Welcome Page"},{name:"serverName",label:"Set Name"},{name:"adminAccount",label:"Admin Account"},{name:"whoCanSignUp",label:"Who Can Sign Up"},{name:"inviteLink",label:"Invites",canJumpTo:["whoCanSignUp"]},{name:"donePage",label:"Done",canJumpTo:["whoCanSignUp","inviteLink"]}];const A=a.ZP.div`
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
`,B=e=>{var t;let{step:n,setStep:o}=e;const s=L.map((e=>e.name)).indexOf(n),a=(null===(t=L.find((e=>e.name===n)))||void 0===t?void 0:t.canJumpTo)||[];return(0,c.jsx)("div",{className:"navigator",children:L.map(((e,t)=>{const n=a.includes(e.name),r=`node ${t===s?"emphasized":""} ${t>s?"disabled":""} ${n?"clickable":""}`,l="arrow "+(t>=s?"disabled":"");return(0,c.jsxs)(i.Fragment,{children:[(0,c.jsx)("span",{className:r,onClick:()=>{n&&o(e.name)},children:e.label}),t!==L.length-1&&(0,c.jsx)("span",{className:l,children:"\u2192"})]},t)}))})};function O(){const{t:e}=(0,d.$)("welcome"),t=function(){const[e,t]=(0,i.useState)(null),[n,o]=(0,i.useState)(0),s=L[n].name,a=(0,i.useCallback)((t=>{const n=L.map((e=>e.name)).indexOf(t);o(n),null!==e&&e.slideTo(n)}),[e]),r=(0,i.useCallback)((()=>{o((e=>e+1)),null!==e&&e.slideNext(500)}),[e]),[l,d]=(0,i.useState)("");return{swiper:e,setSwiper:t,step:s,setStep:a,nextStep:r,serverName:l,setServerName:d}}();return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o.q,{children:(0,c.jsx)("title",{children:e("onboarding.title")})}),(0,c.jsxs)(A,{children:[(0,c.jsx)(B,{...t}),(0,c.jsxs)(s.tq,{spaceBetween:50,allowTouchMove:!1,onSwiper:e=>t.setSwiper(e),children:[(0,c.jsx)(s.o5,{children:(0,c.jsx)(x,{...t})}),(0,c.jsx)(s.o5,{children:(0,c.jsx)(f,{...t})}),(0,c.jsx)(s.o5,{children:(0,c.jsx)(N,{...t})}),(0,c.jsx)(s.o5,{children:(0,c.jsx)(Z,{...t})}),(0,c.jsx)(s.o5,{children:e=>{let{isActive:n}=e;return n?(0,c.jsx)(P,{...t}):null}}),(0,c.jsx)(s.o5,{children:(0,c.jsx)(E,{...t})})]})]})]})}}}]);