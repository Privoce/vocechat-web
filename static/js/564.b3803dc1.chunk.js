"use strict";(globalThis.webpackChunkrustchat_web=globalThis.webpackChunkrustchat_web||[]).push([[564],{5874:(e,t,n)=>{n.d(t,{Z:()=>c});var i=n(7313),s=n(9184),a=n(6417);const o=s.ZP.form`
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
`,r={},l={};function c(e){let{options:t,values:n=l,value:s=r,defaultValue:c,onChange:p}=e;const d=(0,i.useId)(),[x,h]=(0,i.useState)(c),m=s!==r?s:x;return(0,a.jsx)(o,{children:t.map(((e,t)=>(0,a.jsxs)("div",{className:"option",children:[(0,a.jsx)("input",{type:"radio",checked:(n!==l?n.indexOf(m):m)===t,onChange:()=>{const e=n===l?t:n[t];s===r&&h(e),p&&p(e)},id:`${d}-${t}`}),(0,a.jsx)("div",{className:"box",children:(0,a.jsx)("label",{htmlFor:`${d}-${t}`,children:e})})]},t)))})}},3787:(e,t,n)=>{n.r(t),n.d(t,{default:()=>_});var i=n(7313),s=n(182),a=n(3918),o=(n(296),n(9184)),r=n(1296);const l=n.p+"static/media/play.ec27369d1d14e509155a.svg";var c=n(6417);const p=o.ZP.div`
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
`;function d(e){let{nextStep:t}=e;return(0,c.jsxs)(p,{children:[(0,c.jsx)("span",{className:"primaryText",children:"Welcome to your Rustchat!"}),(0,c.jsx)("span",{className:"secondaryText",children:"Everything in this space is owned by you. Let\u2019s set up your space!"}),(0,c.jsxs)(r.Z,{className:"startButton",onClick:t,children:[(0,c.jsx)("img",{src:l,alt:"play icon"}),(0,c.jsx)("span",{children:"Start"})]})]})}var x=n(3657),h=n(3067);const m=o.ZP.div`
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
`;function g(e){let{serverName:t,setServerName:n,nextStep:i}=e;return(0,c.jsxs)(m,{children:[(0,c.jsx)("span",{className:"primaryText",children:"Create a new server"}),(0,c.jsx)("span",{className:"secondaryText",children:"Servers are shared environments where teams can work on projects and chat."}),(0,c.jsx)(h.Z,{className:"input",placeholder:"Enter server name",value:t,onChange:e=>n(e.target.value)}),(0,c.jsx)(r.Z,{className:"button",onClick:()=>{""!==t?i():x.ZP.error("Please enter server name!")},children:"Create Server"})]})}var u=n(3709),f=n(4695),b=n(1864),w=n(1690);const y=o.ZP.div`
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
`;function v(e){let{serverName:t,nextStep:n}=e;const s=(0,u.I0)(),[a,{isLoading:o,error:l}]=(0,f.QK)(),[p,{isLoading:d,isSuccess:m,error:g}]=(0,b.YA)(),{data:v}=(0,f.z3)(),[j,{isLoading:N,isSuccess:S}]=(0,f.e2)(),[k,T]=(0,i.useState)(""),[C,Z]=(0,i.useState)(""),[z,P]=(0,i.useState)("");return(0,i.useEffect)((()=>{void 0!==l&&x.ZP.error(`Failed to sign up: ${l.data}`)}),[l]),(0,i.useEffect)((()=>{void 0!==g&&x.ZP.error(`Login failed: ${g.data}`)}),[g]),(0,i.useEffect)((()=>{m&&(s((0,w.R4)(!0)),setTimeout((()=>{j({...v,name:t})}),0))}),[m]),(0,i.useEffect)((()=>{S&&n()}),[S]),(0,c.jsxs)(y,{children:[(0,c.jsx)("span",{className:"primaryText",children:"Now let\u2019s set up your admin account"}),(0,c.jsx)("span",{className:"secondaryText",children:"You are the 1st user and admin of your space!"}),(0,c.jsx)(h.Z,{className:"input",placeholder:"Enter your email",value:k,onChange:e=>T(e.target.value)}),(0,c.jsx)(h.Z,{className:"input",type:"password",placeholder:"Enter your password",value:C,onChange:e=>Z(e.target.value)}),(0,c.jsx)(h.Z,{className:"input",type:"password",placeholder:"Confirm your password",value:z,onChange:e=>P(e.target.value)}),(0,c.jsx)(r.Z,{className:"button",onClick:async()=>{""!==k?""!==C?C===z?(await a({email:k,name:"Admin",password:C,gender:0}),await p({email:k,password:C,type:"password"})):x.ZP.error("Two passwords do not match!"):x.ZP.error("Please enter admin password!"):x.ZP.error("Please enter admin email!")},children:o||d||N?"...":"Sign Up"})]})}var j=n(5874);const N=o.ZP.div`
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
`;function S(e){let{nextStep:t}=e;const{data:n}=(0,f.ww)(),[s,{isSuccess:a,error:o}]=(0,f.QP)(),[l,p]=(0,i.useState)(void 0);return(0,i.useEffect)((()=>{n&&p(n.who_can_sign_up)}),[n]),(0,i.useEffect)((()=>{void 0!==o&&x.ZP.error(`Failed to update sign up rule: ${o.data}`)}),[o]),(0,i.useEffect)((()=>{a&&t()}),[a]),(0,c.jsxs)(N,{children:[(0,c.jsx)("span",{className:"primaryText",children:"Last step: invite others!"}),(0,c.jsx)("span",{className:"secondaryText",children:"Firstly, who can sign up to this server?"}),(0,c.jsx)(j.Z,{options:["Everyone","Invitation link only"],values:["EveryOne","InvitationOnly"],value:l,onChange:p}),(0,c.jsx)(r.Z,{className:"button",disabled:!l,onClick:()=>{void 0!==n&&s({...n,who_can_sign_up:l})},children:"Confirm"})]})}var k=n(5120);const T=o.ZP.div`
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
`;function C(e){let{nextStep:t}=e;const{link:n,linkCopied:i,copyLink:s}=(0,k.Z)();return(0,c.jsxs)(T,{children:[(0,c.jsx)("span",{className:"primaryText",children:"Last step: invite others!"}),(0,c.jsx)("span",{className:"secondaryText",children:"Now let\u2019s invite others!"}),(0,c.jsx)("span",{className:"tip",children:"Send invitation link to your future community members:"}),(0,c.jsxs)("div",{className:"link",children:[(0,c.jsx)(h.Z,{className:"large",readOnly:!0,placeholder:"Generating",value:n}),(0,c.jsx)(r.Z,{onClick:s,className:"ghost small border_less",children:i?"Copied":"Copy"})]}),(0,c.jsx)(r.Z,{className:"button",onClick:t,children:"Done"})]})}var Z=n(7890);const z=o.ZP.div`
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
`;function P(e){let{serverName:t}=e;const n=(0,Z.s0)();return(0,c.jsxs)(z,{children:[(0,c.jsxs)("span",{className:"primaryText",children:["Welcome to ",t]}),(0,c.jsx)("span",{className:"secondaryText",children:"Proudly presented by Rustchat"}),(0,c.jsxs)("span",{className:"tip",children:["More settings, including domain resolution, privileges, securities, and invites are available in ",(0,c.jsx)("span",{className:"strong",children:"Settings"})]}),(0,c.jsxs)(r.Z,{className:"startButton",onClick:()=>n("/"),children:[(0,c.jsx)("img",{src:l,alt:"play icon"}),(0,c.jsx)("span",{children:"Enter"})]})]})}const E=[{name:"welcomePage",label:"Welcome Page"},{name:"serverName",label:"Set Name"},{name:"adminAccount",label:"Admin Account"},{name:"whoCanSignUp",label:"Who Can Sign Up"},{name:"inviteLink",label:"Invites",canJumpTo:["whoCanSignUp"]},{name:"donePage",label:"Done",canJumpTo:["whoCanSignUp","inviteLink"]}];const L=o.ZP.div`
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
`;function $(e){let{step:t,setStep:n}=e;const s=E.map((e=>e.name)).indexOf(t),a=E.find((e=>e.name===t)).canJumpTo||[];return(0,c.jsx)("div",{className:"navigator",children:E.map(((e,t)=>{const o=a.includes(e.name),r=`node ${t===s?"emphasized":""} ${t>s?"disabled":""} ${o?"clickable":""}`,l="arrow "+(t>=s?"disabled":"");return(0,c.jsxs)(i.Fragment,{children:[(0,c.jsx)("span",{className:r,onClick:()=>{o&&n(e.name)},children:e.label}),t!==E.length-1&&(0,c.jsx)("span",{className:l,children:"\u2192"})]},t)}))})}function _(){const e=function(){const[e,t]=(0,i.useState)(null),[n,s]=(0,i.useState)(0),a=E[n].name,o=(0,i.useCallback)((t=>{const n=E.map((e=>e.name)).indexOf(t);s(n),null!==e&&e.slideTo(n)}),[e]),r=(0,i.useCallback)((()=>{s((e=>e+1)),null!==e&&e.slideNext(500)}),[e]),[l,c]=(0,i.useState)("");return{swiper:e,setSwiper:t,step:a,setStep:o,nextStep:r,serverName:l,setServerName:c}}();return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.q,{children:(0,c.jsx)("title",{children:"Rustchat Setup"})}),(0,c.jsxs)(L,{children:[(0,c.jsx)($,{...e}),(0,c.jsxs)(a.tq,{spaceBetween:50,allowTouchMove:!1,onSwiper:t=>e.setSwiper(t),children:[(0,c.jsx)(a.o5,{children:(0,c.jsx)(d,{...e})}),(0,c.jsx)(a.o5,{children:(0,c.jsx)(g,{...e})}),(0,c.jsx)(a.o5,{children:(0,c.jsx)(v,{...e})}),(0,c.jsx)(a.o5,{children:(0,c.jsx)(S,{...e})}),(0,c.jsx)(a.o5,{children:(0,c.jsx)(C,{...e})}),(0,c.jsx)(a.o5,{children:(0,c.jsx)(P,{...e})})]})]})]})}}}]);