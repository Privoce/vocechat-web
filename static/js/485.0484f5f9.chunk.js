"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[485],{94557:(e,t,n)=>{n.d(t,{Z:()=>s});var o=n(65809),r=n(21812),i=n(80683);const s=e=>{let{empty:t=!1,version:n,children:s}=e;const{data:a,isSuccess:l}=(0,o.p5)();if(!l)return null;return(0,r.yC)(a,n)<0?t?null:(0,i.jsxs)("div",{className:"flex flex-col gap-2 items-start border border-solid border-orange-500 p-3 rounded-lg",children:[(0,i.jsxs)("span",{className:"text-gray-400 text-sm",children:["This function needs server version:",(0,i.jsx)("strong",{className:"font-bold",children:n})," at least \ud83d\udea8"]}),(0,i.jsxs)("span",{className:"text-gray-400 text-sm",children:["Your current version:",(0,i.jsx)("strong",{className:"font-bold",children:a})]}),(0,i.jsx)("span",{className:"text-gray-400 text-sm",children:"Please upgrade the Server!"}),(0,i.jsx)("a",{className:"text-blue-500 underline",href:"https://doc.voce.chat/install/install-by-docker#update-vocechat-docker",target:"_blank",rel:"noopener noreferrer",children:"How to Update VoceChat Server \ud83d\udcd6 "})]}):s}},17237:(e,t,n)=>{n.d(t,{Z:()=>c});var o=n(70537),r=n(40182),i=n(57889),s=n(80683);const a=i.ZP.div`
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
`,l=i.ZP.input`
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
`,c=e=>{let{type:t="text",prefix:n="",className:i,...c}=e;const[d,p]=(0,o.useState)(t);return"password"==t?(0,s.jsxs)(a,{className:i,children:[(0,s.jsx)(l,{type:d,autoComplete:"password"==d?"current-password":"on",className:`inner ${i}`,...c}),(0,s.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==d?(0,s.jsx)(r.MBb,{color:"#78787c"}):(0,s.jsx)(r.Rbo,{color:"#78787c"})})]}):n?(0,s.jsxs)(a,{className:i,children:[(0,s.jsx)("span",{className:"prefix",children:n}),(0,s.jsx)(l,{className:`inner ${i}`,type:d,...c})]}):(0,s.jsx)(l,{type:d,className:i,...c})}},15621:(e,t,n)=>{n.d(t,{Z:()=>c});var o=n(70537),r=n(57889),i=n(80683);const s=r.ZP.form`
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
`,a="",l=[],c=e=>{let{options:t,values:n=l,value:r=a,defaultValue:c="",onChange:d}=e;const p=(0,o.useId)(),[x,u]=(0,o.useState)(c),h=r!==a?r:x;return(0,i.jsx)(s,{children:t.map(((e,t)=>(0,i.jsxs)("div",{className:"option",children:[(0,i.jsx)("input",{type:"radio",checked:(n!==l?n.indexOf(h):h)===t,onChange:()=>{const e=n===l?t:n[t];r===a&&u(e),d&&d(e)},id:`${p}-${t}`}),(0,i.jsx)("div",{className:"box",children:(0,i.jsx)("label",{htmlFor:`${p}-${t}`,children:e})})]},t)))})}},26209:(e,t,n)=>{n.d(t,{Z:()=>s});var o=n(70537),r=n(34108),i=n(27418);const s=e=>{const{enableToast:t=!0}=e||{},[n,s]=(0,o.useState)(!1);(0,o.useEffect)((()=>{n&&t&&i.ZP.success("Copied!")}),[n]);const a=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection();if(!n)return!1;const o=n.rangeCount>0&&n.getRangeAt(0);t.select();const r=document.execCommand("copy");return document.body.removeChild(t),o&&(n.removeAllRanges(),n.addRange(o)),r};return{copied:n,copy:function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=0;return n||(t?(0,r.VP)(e).then((()=>{s(!0),o=window.setTimeout((()=>{s(!1)}),500)})):(s(a(e)),o=window.setTimeout((()=>{s(!1)}),500))),()=>{clearTimeout(o)}}}}},4884:(e,t,n)=>{n.d(t,{Z:()=>a});var o=n(70537),r=n(26209),i=n(65809),s=n(6144);function a(e){const[t,n]=(0,o.useState)(""),{data:a,isSuccess:l}=(0,i.n8)(),[c,{data:d,isLoading:p}]=(0,s.CU)(),{copied:x,copy:u}=(0,r.Z)({enableToast:!1});(0,o.useEffect)((()=>{c(e)}),[e]),(0,o.useEffect)((()=>{d&&l&&n(d)}),[d,l]);return{enableSMTP:a,generating:p,generateNewLink:e?c.bind(null,e):()=>{c()},link:t,linkCopied:x,copyLink:()=>{u(t)}}}},4772:(e,t,n)=>{n.r(t),n.d(t,{default:()=>F});var o=n(70537),r=n(62471);const i=(0,o.createContext)(null);const s=()=>{const e=(0,o.useContext)(i);return e},a=(0,o.memo)((e=>{let{header:t,footer:n,children:r,wrapper:s,startIndex:a=0}=e;const[l,c]=(0,o.useState)(a),[d,p]=(0,o.useState)(!1),x=(0,o.useRef)(!0),u=(0,o.useRef)(!1),h=(0,o.useRef)((()=>{})),m=o.Children.toArray(r).length;x.current=l<m-1,u.current=l>0;const f=(0,o.useRef)((()=>{x.current&&c((e=>e+1))})),g=(0,o.useRef)((()=>{u.current&&(h.current=null,c((e=>e-1)))})),b=(0,o.useRef)((e=>{e>=0&&e<m&&(h.current=null,c(e))})),v=(0,o.useRef)((e=>{h.current=e})),w=(0,o.useRef)((async()=>{if(x.current&&h.current)try{p(!0),await h.current(),p(!1),h.current=null,f.current()}catch(e){throw p(!1),e}else f.current()})),y=(0,o.useMemo)((()=>({nextStep:w.current,previousStep:g.current,handleStep:v.current,isLoading:d,activeStep:l,stepCount:m,isFirstStep:!u.current,isLastStep:!x.current,goToStep:b.current})),[l,m,d]),j=(0,o.useMemo)((()=>o.Children.toArray(r)[l]),[l,r,t,n]),N=(0,o.useMemo)((()=>s?(0,o.cloneElement)(s,{children:j}):j),[s,j]);return(0,o.createElement)(i.Provider,{value:y},t,N,n)}));var l=n(57889),c=n(69885);const d=n.p+"static/media/play.ada446bc1d007eef6447.svg";var p=n(14566),x=n(80683);const u=l.ZP.div`
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
`;function h(){const{t:e}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),{nextStep:t}=s();return(0,x.jsxs)(u,{children:[(0,x.jsx)("span",{className:"primaryText",children:e("welcome")}),(0,x.jsx)("span",{className:"secondaryText",children:e("welcome_desc")}),(0,x.jsxs)(c.Z,{className:"startButton",onClick:t,children:[(0,x.jsx)("img",{src:d,alt:"play icon"}),(0,x.jsx)("span",{children:e("start")})]})]})}var m=n(27418),f=n(17237);const g=l.ZP.div`
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
`,b=e=>{let{serverName:t,setServerName:n}=e;const{t:o}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),{nextStep:r}=s();return(0,x.jsxs)(g,{children:[(0,x.jsx)("span",{className:"primaryText",children:o("new_server")}),(0,x.jsx)("span",{className:"secondaryText",children:o("server_desc")}),(0,x.jsx)(f.Z,{className:"input",placeholder:o("placeholder_server"),value:t,onChange:e=>n(e.target.value)}),(0,x.jsx)(c.Z,{className:"button",onClick:()=>{""!==t?r():m.ZP.error("Please enter server name!")},children:o("create_server")})]})};var v=n(3074),w=n(65809),y=n(15312),j=n(21645),N=n(66160);const k=l.ZP.div`
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
`,C=e=>{let{serverName:t}=e;const{t:n}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),{nextStep:r}=s(),i=(0,o.useRef)(),a=(0,N.CG)((e=>!!e.authData.token)),l=(0,v.I0)(),[d,{isLoading:u,isError:h,isSuccess:g}]=(0,w.QK)(),[b,{isLoading:C,isError:S}]=(0,y.YA)(),{data:Z}=(0,w.z3)(),[_,{isLoading:T,isSuccess:P}]=(0,w.e2)(),[z,E]=(0,o.useState)(""),[$,L]=(0,o.useState)(""),[R,G]=(0,o.useState)("");return(0,o.useEffect)((()=>{h&&m.ZP.error("Failed to sign up")}),[h]),(0,o.useEffect)((()=>{g&&b({email:z,password:$,type:"password"})}),[g]),(0,o.useEffect)((()=>{S&&m.ZP.error("Login failed")}),[S]),(0,o.useEffect)((()=>{a&&Z&&(l((0,j.R4)(!0)),_({...Z,name:t}))}),[a]),(0,o.useEffect)((()=>{P&&r()}),[P]),(0,x.jsxs)(k,{children:[(0,x.jsx)("span",{className:"primaryText",children:n("admin_title")}),(0,x.jsx)("span",{className:"secondaryText",children:n("admin_desc")}),(0,x.jsxs)("form",{ref:i,action:"/",children:[(0,x.jsx)(f.Z,{className:"input",placeholder:"Enter your email",type:"email",required:!0,value:z,onChange:e=>E(e.target.value)}),(0,x.jsx)(f.Z,{className:"input",type:"password",required:!0,minLength:6,placeholder:"Enter your password",value:$,onChange:e=>L(e.target.value)}),(0,x.jsx)(f.Z,{className:"input",type:"password",required:!0,minLength:6,placeholder:"Confirm your password",value:R,onChange:e=>G(e.target.value)})]}),(0,x.jsx)(c.Z,{className:"button",onClick:async()=>{const e=null===i||void 0===i?void 0:i.current;if(e){if(!e.checkValidity())return void e.reportValidity();d({email:z,name:"Admin",password:$,gender:0})}},children:u||C||T?"...":n("sign")})]})};var S=n(15621);const Z=l.ZP.div`
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
`;function _(){const{t:e}=(0,p.$G)("welcome"),{t:t}=(0,p.$G)("setting"),{nextStep:n}=s(),{data:r,refetch:i}=(0,w.ww)(),[a,{isSuccess:l,error:d}]=(0,w.QP)(),[u,h]=(0,o.useState)();return(0,o.useEffect)((()=>{i()}),[]),(0,o.useEffect)((()=>{r&&h(r.who_can_sign_up)}),[r]),(0,o.useEffect)((()=>{void 0!==d&&m.ZP.error(`Failed to update sign up rule: ${d.data}`)}),[d]),(0,o.useEffect)((()=>{l&&n()}),[l]),(0,x.jsxs)(Z,{children:[(0,x.jsx)("span",{className:"primaryText",children:e("onboarding.invite_title")}),(0,x.jsx)("span",{className:"secondaryText",children:e("onboarding.invite_desc")}),u&&(0,x.jsx)(S.Z,{options:[t("overview.sign_up.everyone"),t("overview.sign_up.invite")],values:["EveryOne","InvitationOnly"],value:u,onChange:h}),(0,x.jsx)(c.Z,{className:"button",disabled:!u,onClick:()=>{void 0!==r&&(r.who_can_sign_up!==u?a({...r,who_can_sign_up:u}):n())},children:e("onboarding.confirm")})]})}var T=n(4884),P=n(94557);function z(){const[e,{isSuccess:t,isLoading:n}]=(0,w.UT)(),{t:r}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),{t:i}=(0,p.$G)(),{nextStep:a}=s(),{link:l,linkCopied:d,copyLink:u,generateNewLink:h}=(0,T.Z)(),[g,b]=(0,o.useState)(location.origin);return(0,o.useEffect)((()=>{t&&(h(),m.Am.success("Update Successfully!"))}),[t]),(0,x.jsxs)("div",{className:"h-full flex flex-col items-center justify-center relative",children:[(0,x.jsx)("span",{className:"text-2xl mb-2 font-bold",children:r("invite_title")}),(0,x.jsx)("span",{className:"text-sm mb-10 text-gray-400",children:r("last_tip")}),(0,x.jsx)("span",{className:"text-sm text-gray-500 mb-2 font-semibold",children:r("last_desc")}),(0,x.jsxs)("div",{className:"w-[400px] rounded shadow-md flex border border-solid border-gray-100",children:[(0,x.jsx)(f.Z,{className:"large !border-none !shadow-none",readOnly:!0,placeholder:"Generating",value:l}),(0,x.jsx)(c.Z,{onClick:u,className:"ghost small border_less !px-2 hover:!text-[#088ab2]",children:d?"Copied":i("action.copy")})]}),(0,x.jsx)(c.Z,{className:"w-32 h-11 mt-6",onClick:a,children:r("done")}),(0,x.jsx)(P.Z,{version:"0.3.2",empty:!0,children:(0,x.jsxs)("div",{className:"flex flex-col items-center absolute left-1/2 -translate-x-1/2 bottom-8",children:[(0,x.jsx)("span",{className:"text-sm text-red-400 mb-1",children:"\u94fe\u63a5\u57df\u540d\u6709\u95ee\u9898\uff1f\u53ef\u5728\u6b64\u66f4\u65b0\u8bbe\u7f6e\uff1a"}),(0,x.jsxs)("div",{className:"w-[400px] rounded shadow-md flex border border-solid border-gray-100",children:[(0,x.jsx)(f.Z,{className:"large !border-none !shadow-none",placeholder:"Frontend URL",value:g,onChange:e=>{b(e.target.value)}}),(0,x.jsx)(c.Z,{disabled:!g||n,onClick:()=>{e(g)},className:"ghost small border_less !px-2 hover:!text-[#088ab2]",children:i("action.update")})]})]})})]})}var E=n(15924);const $=l.ZP.div`
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
`;function L(e){let{serverName:t}=e;const{t:n}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),o=(0,E.s0)();return(0,x.jsxs)($,{children:[(0,x.jsx)("span",{className:"primaryText",children:n("done_welcome",{serverName:t})}),(0,x.jsx)("span",{className:"secondaryText",children:n("done_title")}),(0,x.jsx)("span",{className:"tip",children:(0,x.jsx)(p.cC,{i18nKey:"onboarding.done_desc",ns:"welcome",children:(0,x.jsx)("span",{className:"strong"})})}),(0,x.jsxs)(c.Z,{className:"startButton",onClick:()=>o("/"),children:[(0,x.jsx)("img",{src:d,alt:"play icon"}),(0,x.jsx)("span",{children:n("enter")})]})]})}var R=n(47912);const G=[{name:"welcomePage",label:(0,R.t)("welcome:onboarding.welcome_page")},{name:"serverName",label:(0,R.t)("welcome:onboarding.set_name")},{name:"adminAccount",label:(0,R.t)("welcome:onboarding.admin_account")},{name:"whoCanSignUp",label:(0,R.t)("welcome:onboarding.who_sign_up")},{name:"inviteLink",label:(0,R.t)("welcome:onboarding.invites"),canJumpTo:["whoCanSignUp"]},{name:"donePage",label:(0,R.t)("welcome:onboarding.done"),canJumpTo:["whoCanSignUp","inviteLink"]}],U=l.ZP.div`
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
`,A=()=>{var e;const{activeStep:t,goToStep:n}=s(),r=(null===(e=G[t])||void 0===e?void 0:e.canJumpTo)||[];return(0,x.jsx)("div",{className:"navigator",children:G.map(((e,i)=>{const s=r.includes(e.name),a=`node ${i===t?"emphasized":""} ${i>t?"disabled":""} ${s?"clickable":""}`,l="arrow "+(i>=t?"disabled":"");return(0,x.jsxs)(o.Fragment,{children:[(0,x.jsx)("span",{className:a,onClick:()=>{s&&n(i)},children:e.label}),i!==G.length-1&&(0,x.jsx)("span",{className:l,children:"\u2192"})]},i)}))})};function F(){const{t:e}=(0,p.$G)("welcome"),[t,n]=(0,o.useState)("");return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(r.q,{children:(0,x.jsx)("title",{children:e("onboarding.title")})}),(0,x.jsx)(U,{children:(0,x.jsxs)(a,{header:(0,x.jsx)(A,{}),children:[(0,x.jsx)(h,{}),(0,x.jsx)(b,{serverName:t,setServerName:n}),(0,x.jsx)(C,{serverName:t}),(0,x.jsx)(_,{}),(0,x.jsx)(z,{}),(0,x.jsx)(L,{serverName:t})]})})]})}},34108:(e,t,n)=>{function o(e,t,n,o){return new(n||(n=Promise))((function(r,i){function s(e){try{l(o.next(e))}catch(t){i(t)}}function a(e){try{l(o.throw(e))}catch(t){i(t)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}l((o=o.apply(e,t||[])).next())}))}function r(e){return o(this,void 0,void 0,(function*(){const t=URL.createObjectURL(e),n=yield function(e){return o(this,void 0,void 0,(function*(){return new Promise((function(t,n){const o=document.createElement("img");o.crossOrigin="anonymous",o.src=e,o.onload=function(e){const n=e.target;t(n)},o.onabort=n,o.onerror=n}))}))}(t);return yield function(e){return o(this,void 0,void 0,(function*(){return new Promise((function(t,n){const o=document.createElement("canvas"),r=o.getContext("2d");if(r){const{width:i,height:s}=e;o.width=i,o.height=s,r.drawImage(e,0,0,i,s),o.toBlob((function(e){e?t(e):n("Cannot get blob from image element")}),"image/png",1)}}))}))}(n)}))}function i(e){return o(this,void 0,void 0,(function*(){const t={[e.type]:e},n=new ClipboardItem(t);yield navigator.clipboard.write([n])}))}function s(e){return o(this,void 0,void 0,(function*(){const t=yield function(e){return o(this,void 0,void 0,(function*(){const t=yield fetch(`${e}`);return yield t.blob()}))}(e);if(function(e){return e.type.includes("jpeg")}(t)){const e=yield r(t);return yield i(e),t}if(function(e){return e.type.includes("png")}(t))return yield i(t),t;throw new Error("Cannot copy this type of image to clipboard")}))}n.d(t,{VP:()=>s})}}]);