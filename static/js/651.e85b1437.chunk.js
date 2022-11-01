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
`,r="",l=[],c=e=>{let{options:t,values:n=l,value:s=r,defaultValue:c="",onChange:p}=e;const d=(0,i.useId)(),[x,h]=(0,i.useState)(c),m=s!==r?s:x;return(0,a.jsx)(o,{children:t.map(((e,t)=>(0,a.jsxs)("div",{className:"option",children:[(0,a.jsx)("input",{type:"radio",checked:(n!==l?n.indexOf(m):m)===t,onChange:()=>{const e=n===l?t:n[t];s===r&&h(e),p&&p(e)},id:`${d}-${t}`}),(0,a.jsx)("div",{className:"box",children:(0,a.jsx)("label",{htmlFor:`${d}-${t}`,children:e})})]},t)))})}},76200:(e,t,n)=>{n.r(t),n.d(t,{default:()=>A});var i=n(70537),s=n(62471),a=n(75889),o=(n(49537),n(57889)),r=n(69885);const l=n.p+"static/media/play.ec27369d1d14e509155a.svg";var c=n(80683);const p=o.ZP.div`
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
`;function d(e){let{nextStep:t}=e;return(0,c.jsxs)(p,{children:[(0,c.jsx)("span",{className:"primaryText",children:"Welcome to your VoceChat!"}),(0,c.jsx)("span",{className:"secondaryText",children:"Everything in this space is owned by you. Let\u2019s set up your space!"}),(0,c.jsxs)(r.Z,{className:"startButton",onClick:t,children:[(0,c.jsx)("img",{src:l,alt:"play icon"}),(0,c.jsx)("span",{children:"Start"})]})]})}var x=n(27418),h=n(3022);const m=o.ZP.div`
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
`,g=e=>{let{serverName:t,setServerName:n,nextStep:i}=e;return(0,c.jsxs)(m,{children:[(0,c.jsx)("span",{className:"primaryText",children:"Create a new server"}),(0,c.jsx)("span",{className:"secondaryText",children:"Servers are shared environments where teams can work on projects and chat."}),(0,c.jsx)(h.Z,{className:"input",placeholder:"Enter server name",value:t,onChange:e=>n(e.target.value)}),(0,c.jsx)(r.Z,{className:"button",onClick:()=>{""!==t?i():x.ZP.error("Please enter server name!")},children:"Create Server"})]})};var u=n(3074),f=n(65809),b=n(15312),w=n(21645),v=n(66160);const y=o.ZP.div`
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
`,j=e=>{let{serverName:t,nextStep:n}=e;const s=(0,v.CG)((e=>!!e.authData.token)),a=(0,u.I0)(),[o,{isLoading:l,error:p}]=(0,f.QK)(),[d,{isLoading:m,error:g}]=(0,b.YA)(),{data:j}=(0,f.z3)(),[N,{isLoading:k,isSuccess:S}]=(0,f.e2)(),[C,T]=(0,i.useState)(""),[Z,z]=(0,i.useState)(""),[P,E]=(0,i.useState)("");return(0,i.useEffect)((()=>{void 0!==p&&x.ZP.error(`Failed to sign up: ${p.data}`)}),[p]),(0,i.useEffect)((()=>{void 0!==g&&x.ZP.error(`Login failed: ${g.data}`)}),[g]),(0,i.useEffect)((()=>{s&&j&&(a((0,w.R4)(!0)),N({...j,name:t}))}),[s]),(0,i.useEffect)((()=>{S&&n()}),[S]),(0,c.jsxs)(y,{children:[(0,c.jsx)("span",{className:"primaryText",children:"Now let\u2019s set up your admin account"}),(0,c.jsx)("span",{className:"secondaryText",children:"You are the 1st user and admin of your space!"}),(0,c.jsx)(h.Z,{className:"input",placeholder:"Enter your email",value:C,onChange:e=>T(e.target.value)}),(0,c.jsx)(h.Z,{className:"input",type:"password",placeholder:"Enter your password",value:Z,onChange:e=>z(e.target.value)}),(0,c.jsx)(h.Z,{className:"input",type:"password",placeholder:"Confirm your password",value:P,onChange:e=>E(e.target.value)}),(0,c.jsx)(r.Z,{className:"button",onClick:async()=>{""!==C?""!==Z?Z===P?(await o({email:C,name:"Admin",password:Z,gender:0}),await d({email:C,password:Z,type:"password"})):x.ZP.error("Two passwords do not match!"):x.ZP.error("Please enter admin password!"):x.ZP.error("Please enter admin email!")},children:l||m||k?"...":"Sign Up"})]})};var N=n(15621);const k=o.ZP.div`
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
`;function S(e){let{nextStep:t}=e;const{data:n}=(0,f.ww)(),[s,{isSuccess:a,error:o}]=(0,f.QP)(),[l,p]=(0,i.useState)();return(0,i.useEffect)((()=>{n&&p(n.who_can_sign_up)}),[n]),(0,i.useEffect)((()=>{void 0!==o&&x.ZP.error(`Failed to update sign up rule: ${o.data}`)}),[o]),(0,i.useEffect)((()=>{a&&t()}),[a]),(0,c.jsxs)(k,{children:[(0,c.jsx)("span",{className:"primaryText",children:"Last step: invite others!"}),(0,c.jsx)("span",{className:"secondaryText",children:"Firstly, who can sign up to this server?"}),(0,c.jsx)(N.Z,{options:["Everyone","Invitation link only"],values:["EveryOne","InvitationOnly"],value:l,onChange:p}),(0,c.jsx)(r.Z,{className:"button",disabled:!l,onClick:()=>{void 0!==n&&s({...n,who_can_sign_up:l})},children:"Confirm"})]})}var C=n(4884);const T=o.ZP.div`
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
`;function Z(e){let{nextStep:t}=e;const{link:n,linkCopied:i,copyLink:s}=(0,C.Z)();return(0,c.jsxs)(T,{children:[(0,c.jsx)("span",{className:"primaryText",children:"Last step: invite others!"}),(0,c.jsx)("span",{className:"secondaryText",children:"Now let\u2019s invite others!"}),(0,c.jsx)("span",{className:"tip",children:"Send invitation link to your future community members:"}),(0,c.jsxs)("div",{className:"link",children:[(0,c.jsx)(h.Z,{className:"large",readOnly:!0,placeholder:"Generating",value:n}),(0,c.jsx)(r.Z,{onClick:s,className:"ghost small border_less",children:i?"Copied":"Copy"})]}),(0,c.jsx)(r.Z,{className:"button",onClick:t,children:"Done"})]})}var z=n(15924);const P=o.ZP.div`
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
`;function E(e){let{serverName:t}=e;const n=(0,z.s0)();return(0,c.jsxs)(P,{children:[(0,c.jsxs)("span",{className:"primaryText",children:["Welcome to ",t]}),(0,c.jsx)("span",{className:"secondaryText",children:"Proudly presented by VoceChat"}),(0,c.jsxs)("span",{className:"tip",children:["More settings, including domain resolution, privileges, securities, and invites are available in ",(0,c.jsx)("span",{className:"strong",children:"Settings"})]}),(0,c.jsxs)(r.Z,{className:"startButton",onClick:()=>n("/"),children:[(0,c.jsx)("img",{src:l,alt:"play icon"}),(0,c.jsx)("span",{children:"Enter"})]})]})}const L=[{name:"welcomePage",label:"Welcome Page"},{name:"serverName",label:"Set Name"},{name:"adminAccount",label:"Admin Account"},{name:"whoCanSignUp",label:"Who Can Sign Up"},{name:"inviteLink",label:"Invites",canJumpTo:["whoCanSignUp"]},{name:"donePage",label:"Done",canJumpTo:["whoCanSignUp","inviteLink"]}];const $=o.ZP.div`
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
`,_=e=>{var t;let{step:n,setStep:s}=e;const a=L.map((e=>e.name)).indexOf(n),o=(null===(t=L.find((e=>e.name===n)))||void 0===t?void 0:t.canJumpTo)||[];return(0,c.jsx)("div",{className:"navigator",children:L.map(((e,t)=>{const n=o.includes(e.name),r=`node ${t===a?"emphasized":""} ${t>a?"disabled":""} ${n?"clickable":""}`,l="arrow "+(t>=a?"disabled":"");return(0,c.jsxs)(i.Fragment,{children:[(0,c.jsx)("span",{className:r,onClick:()=>{n&&s(e.name)},children:e.label}),t!==L.length-1&&(0,c.jsx)("span",{className:l,children:"\u2192"})]},t)}))})};function A(){const e=function(){const[e,t]=(0,i.useState)(null),[n,s]=(0,i.useState)(0),a=L[n].name,o=(0,i.useCallback)((t=>{const n=L.map((e=>e.name)).indexOf(t);s(n),null!==e&&e.slideTo(n)}),[e]),r=(0,i.useCallback)((()=>{s((e=>e+1)),null!==e&&e.slideNext(500)}),[e]),[l,c]=(0,i.useState)("");return{swiper:e,setSwiper:t,step:a,setStep:o,nextStep:r,serverName:l,setServerName:c}}();return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.q,{children:(0,c.jsx)("title",{children:"VoceChat Setup"})}),(0,c.jsxs)($,{children:[(0,c.jsx)(_,{...e}),(0,c.jsxs)(a.tq,{spaceBetween:50,allowTouchMove:!1,onSwiper:t=>e.setSwiper(t),children:[(0,c.jsx)(a.o5,{children:(0,c.jsx)(d,{...e})}),(0,c.jsx)(a.o5,{children:(0,c.jsx)(g,{...e})}),(0,c.jsx)(a.o5,{children:(0,c.jsx)(j,{...e})}),(0,c.jsx)(a.o5,{children:(0,c.jsx)(S,{...e})}),(0,c.jsx)(a.o5,{children:t=>{let{isActive:n}=t;return n?(0,c.jsx)(Z,{...e}):null}}),(0,c.jsx)(a.o5,{children:(0,c.jsx)(E,{...e})})]})]})]})}}}]);