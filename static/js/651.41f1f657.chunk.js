"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[651],{15621:(e,t,n)=>{n.d(t,{Z:()=>c});var i=n(70537),s=n(57889),a=n(80683);const o=s.ZP.form`
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
`,r="",l=[],c=e=>{let{options:t,values:n=l,value:s=r,defaultValue:c="",onChange:d}=e;const x=(0,i.useId)(),[p,h]=(0,i.useState)(c),m=s!==r?s:p;return(0,a.jsx)(o,{children:t.map(((e,t)=>(0,a.jsxs)("div",{className:"option",children:[(0,a.jsx)("input",{type:"radio",checked:(n!==l?n.indexOf(m):m)===t,onChange:()=>{const e=n===l?t:n[t];s===r&&h(e),d&&d(e)},id:`${x}-${t}`}),(0,a.jsx)("div",{className:"box",children:(0,a.jsx)("label",{htmlFor:`${x}-${t}`,children:e})})]},t)))})}},76200:(e,t,n)=>{n.r(t),n.d(t,{default:()=>B});var i=n(70537),s=n(62471),a=n(75889),o=(n(49537),n(57889)),r=n(69885);const l=n.p+"static/media/play.ec27369d1d14e509155a.svg";var c=n(71893),d=n(80683);const x=o.ZP.div`
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
`;function p(e){let{nextStep:t}=e;const{t:n}=(0,c.$)("welcome",{keyPrefix:"onboarding"});return(0,d.jsxs)(x,{children:[(0,d.jsx)("span",{className:"primaryText",children:n("welcome")}),(0,d.jsx)("span",{className:"secondaryText",children:n("welcome_desc")}),(0,d.jsxs)(r.Z,{className:"startButton",onClick:t,children:[(0,d.jsx)("img",{src:l,alt:"play icon"}),(0,d.jsx)("span",{children:n("start")})]})]})}var h=n(27418),m=n(3022);const g=o.ZP.div`
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
`,f=e=>{let{serverName:t,setServerName:n,nextStep:i}=e;const{t:s}=(0,c.$)("welcome",{keyPrefix:"onboarding"});return(0,d.jsxs)(g,{children:[(0,d.jsx)("span",{className:"primaryText",children:s("new_server")}),(0,d.jsx)("span",{className:"secondaryText",children:s("server_desc")}),(0,d.jsx)(m.Z,{className:"input",placeholder:s("placeholder_server"),value:t,onChange:e=>n(e.target.value)}),(0,d.jsx)(r.Z,{className:"button",onClick:()=>{""!==t?i():h.ZP.error("Please enter server name!")},children:s("create_server")})]})};var u=n(3074),b=n(65809),w=n(15312),v=n(21645),j=n(66160);const y=o.ZP.div`
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
`,N=e=>{let{serverName:t,nextStep:n}=e;const{t:s}=(0,c.$)("welcome",{keyPrefix:"onboarding"}),a=(0,j.CG)((e=>!!e.authData.token)),o=(0,u.I0)(),[l,{isLoading:x,error:p}]=(0,b.QK)(),[g,{isLoading:f,error:N}]=(0,w.YA)(),{data:k}=(0,b.z3)(),[T,{isLoading:Z,isSuccess:S}]=(0,b.e2)(),[z,C]=(0,i.useState)(""),[P,_]=(0,i.useState)(""),[$,E]=(0,i.useState)("");return(0,i.useEffect)((()=>{void 0!==p&&h.ZP.error(`Failed to sign up: ${p.data}`)}),[p]),(0,i.useEffect)((()=>{void 0!==N&&h.ZP.error(`Login failed: ${N.data}`)}),[N]),(0,i.useEffect)((()=>{a&&k&&(o((0,v.R4)(!0)),T({...k,name:t}))}),[a]),(0,i.useEffect)((()=>{S&&n()}),[S]),(0,d.jsxs)(y,{children:[(0,d.jsx)("span",{className:"primaryText",children:s("admin_title")}),(0,d.jsx)("span",{className:"secondaryText",children:s("admin_desc")}),(0,d.jsx)(m.Z,{className:"input",placeholder:"Enter your email",value:z,onChange:e=>C(e.target.value)}),(0,d.jsx)(m.Z,{className:"input",type:"password",placeholder:"Enter your password",value:P,onChange:e=>_(e.target.value)}),(0,d.jsx)(m.Z,{className:"input",type:"password",placeholder:"Confirm your password",value:$,onChange:e=>E(e.target.value)}),(0,d.jsx)(r.Z,{className:"button",onClick:async()=>{""!==z?""!==P?P===$?(await l({email:z,name:"Admin",password:P,gender:0}),await g({email:z,password:P,type:"password"})):h.ZP.error("Two passwords do not match!"):h.ZP.error("Please enter admin password!"):h.ZP.error("Please enter admin email!")},children:x||f||Z?"...":s("sign")})]})};var k=n(15621);const T=o.ZP.div`
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
`;function Z(e){let{nextStep:t}=e;const{t:n}=(0,c.$)("welcome"),{data:s}=(0,b.ww)(),[a,{isSuccess:o,error:l}]=(0,b.QP)(),[x,p]=(0,i.useState)();return(0,i.useEffect)((()=>{s&&p(s.who_can_sign_up)}),[s]),(0,i.useEffect)((()=>{void 0!==l&&h.ZP.error(`Failed to update sign up rule: ${l.data}`)}),[l]),(0,i.useEffect)((()=>{o&&t()}),[o]),(0,d.jsxs)(T,{children:[(0,d.jsx)("span",{className:"primaryText",children:n("onboarding.invite_title")}),(0,d.jsx)("span",{className:"secondaryText",children:n("onboarding.invite_desc")}),(0,d.jsx)(k.Z,{options:[n("overview.sign_up.everyone",{ns:"setting"}),n("overview.sign_up.invite",{ns:"setting"})],values:["EveryOne","InvitationOnly"],value:x,onChange:p}),(0,d.jsx)(r.Z,{className:"button",disabled:!x,onClick:()=>{void 0!==s&&a({...s,who_can_sign_up:x})},children:n("onboarding.confirm")})]})}var S=n(4884);const z=o.ZP.div`
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
`;function C(e){let{nextStep:t}=e;const{t:n}=(0,c.$)("welcome",{keyPrefix:"onboarding"}),{link:i,linkCopied:s,copyLink:a}=(0,S.Z)();return(0,d.jsxs)(z,{children:[(0,d.jsx)("span",{className:"primaryText",children:n("invite_title")}),(0,d.jsx)("span",{className:"secondaryText",children:n("last_tip")}),(0,d.jsx)("span",{className:"tip",children:n("last_desc")}),(0,d.jsxs)("div",{className:"link",children:[(0,d.jsx)(m.Z,{className:"large",readOnly:!0,placeholder:"Generating",value:i}),(0,d.jsx)(r.Z,{onClick:a,className:"ghost small border_less",children:s?"Copied":n("action.copy",{ns:"common"})})]}),(0,d.jsx)(r.Z,{className:"button",onClick:t,children:n("done")})]})}var P=n(15924),_=n(40642);const $=o.ZP.div`
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
`;function E(e){let{serverName:t}=e;const{t:n}=(0,c.$)("welcome",{keyPrefix:"onboarding"}),i=(0,P.s0)();return(0,d.jsxs)($,{children:[(0,d.jsx)("span",{className:"primaryText",children:n("done_welcome",{serverName:t})}),(0,d.jsx)("span",{className:"secondaryText",children:n("done_title")}),(0,d.jsx)("span",{className:"tip",children:(0,d.jsx)(_.c,{i18nKey:"onboarding.done_desc",ns:"welcome",children:(0,d.jsx)("span",{className:"strong"})})}),(0,d.jsxs)(r.Z,{className:"startButton",onClick:()=>i("/"),children:[(0,d.jsx)("img",{src:l,alt:"play icon"}),(0,d.jsx)("span",{children:n("enter")})]})]})}const L=[{name:"welcomePage",label:"Welcome Page"},{name:"serverName",label:"Set Name"},{name:"adminAccount",label:"Admin Account"},{name:"whoCanSignUp",label:"Who Can Sign Up"},{name:"inviteLink",label:"Invites",canJumpTo:["whoCanSignUp"]},{name:"donePage",label:"Done",canJumpTo:["whoCanSignUp","inviteLink"]}];const A=o.ZP.div`
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
`,O=e=>{var t;let{step:n,setStep:s}=e;const a=L.map((e=>e.name)).indexOf(n),o=(null===(t=L.find((e=>e.name===n)))||void 0===t?void 0:t.canJumpTo)||[];return(0,d.jsx)("div",{className:"navigator",children:L.map(((e,t)=>{const n=o.includes(e.name),r=`node ${t===a?"emphasized":""} ${t>a?"disabled":""} ${n?"clickable":""}`,l="arrow "+(t>=a?"disabled":"");return(0,d.jsxs)(i.Fragment,{children:[(0,d.jsx)("span",{className:r,onClick:()=>{n&&s(e.name)},children:e.label}),t!==L.length-1&&(0,d.jsx)("span",{className:l,children:"\u2192"})]},t)}))})};function B(){const{t:e}=(0,c.$)("welcome"),t=function(){const[e,t]=(0,i.useState)(null),[n,s]=(0,i.useState)(0),a=L[n].name,o=(0,i.useCallback)((t=>{const n=L.map((e=>e.name)).indexOf(t);s(n),null!==e&&e.slideTo(n)}),[e]),r=(0,i.useCallback)((()=>{s((e=>e+1)),null!==e&&e.slideNext(500)}),[e]),[l,c]=(0,i.useState)("");return{swiper:e,setSwiper:t,step:a,setStep:o,nextStep:r,serverName:l,setServerName:c}}();return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s.q,{children:(0,d.jsx)("title",{children:e("onboarding.title")})}),(0,d.jsxs)(A,{children:[(0,d.jsx)(O,{...t}),(0,d.jsxs)(a.tq,{spaceBetween:50,allowTouchMove:!1,onSwiper:e=>t.setSwiper(e),children:[(0,d.jsx)(a.o5,{children:(0,d.jsx)(p,{...t})}),(0,d.jsx)(a.o5,{children:(0,d.jsx)(f,{...t})}),(0,d.jsx)(a.o5,{children:(0,d.jsx)(N,{...t})}),(0,d.jsx)(a.o5,{children:(0,d.jsx)(Z,{...t})}),(0,d.jsx)(a.o5,{children:e=>{let{isActive:n}=e;return n?(0,d.jsx)(C,{...t}):null}}),(0,d.jsx)(a.o5,{children:(0,d.jsx)(E,{...t})})]})]})]})}}}]);