"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[15],{94557:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(14566),i=n(65809),o=n(21812),s=n(80683);const a=e=>{let{empty:t=!1,version:n,children:a}=e;const{t:l}=(0,r.$G)(),{data:c,isSuccess:d}=(0,i.p5)();if(!d)return null;return(0,o.yC)(c,n)<0?t?null:(0,s.jsxs)("div",{className:"flex flex-col gap-2 items-start border border-solid border-orange-500 p-3 rounded-lg w-fit",children:[(0,s.jsx)("span",{className:"text-gray-400 text-sm",children:(0,s.jsx)(r.cC,{i18nKey:"server_update.version_needed",children:(0,s.jsx)("strong",{className:"font-bold",children:{version:n}})})}),(0,s.jsx)("span",{className:"text-gray-400 text-sm",children:(0,s.jsx)(r.cC,{i18nKey:"server_update.current_version",children:(0,s.jsx)("strong",{className:"font-bold",children:{version:c}})})}),(0,s.jsx)("span",{className:"text-gray-400 text-sm",children:l("server_update.update_tip")}),(0,s.jsxs)("a",{className:"text-blue-500 underline",href:"https://doc.voce.chat/install/install-by-docker#update-vocechat-docker",target:"_blank",rel:"noopener noreferrer",children:[l("server_update.howto"),"  \ud83d\udcd6 "]})]}):a}},17237:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(70537),i=n(40182),o=n(57889),s=n(80683);const a=o.ZP.div`
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
`,l=o.ZP.input`
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
`,c=e=>{let{type:t="text",prefix:n="",className:o,...c}=e;const[d,p]=(0,r.useState)(t);return"password"==t?(0,s.jsxs)(a,{className:o,children:[(0,s.jsx)(l,{type:d,autoComplete:"password"==d?"current-password":"on",className:`inner ${o}`,...c}),(0,s.jsx)("div",{className:"view",onClick:()=>{p((e=>"password"==e?"text":"password"))},children:"password"==d?(0,s.jsx)(i.MBb,{color:"#78787c"}):(0,s.jsx)(i.Rbo,{color:"#78787c"})})]}):n?(0,s.jsxs)(a,{className:o,children:[(0,s.jsx)("span",{className:"prefix",children:n}),(0,s.jsx)(l,{className:`inner ${o}`,type:d,...c})]}):(0,s.jsx)(l,{type:d,className:o,...c})}},15621:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(70537),i=n(57889),o=n(80683);const s=i.ZP.form`
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
`,a="",l=[],c=e=>{let{options:t,values:n=l,value:i=a,defaultValue:c="",onChange:d}=e;const p=(0,r.useId)(),[x,u]=(0,r.useState)(c),h=i!==a?i:x;return(0,o.jsx)(s,{children:t.map(((e,t)=>(0,o.jsxs)("div",{className:"option",children:[(0,o.jsx)("input",{type:"radio",checked:(n!==l?n.indexOf(h):h)===t,onChange:()=>{const e=n===l?t:n[t];i===a&&u(e),d&&d(e)},id:`${p}-${t}`}),(0,o.jsx)("div",{className:"box",children:(0,o.jsx)("label",{htmlFor:`${p}-${t}`,children:e})})]},t)))})}},26209:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(70537),i=n(34108),o=n(27418);const s=e=>{const{enableToast:t=!0}=e||{},[n,s]=(0,r.useState)(!1);(0,r.useEffect)((()=>{n&&t&&o.ZP.success("Copied!")}),[n]);const a=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection();if(!n)return!1;const r=n.rangeCount>0&&n.getRangeAt(0);t.select();const i=document.execCommand("copy");return document.body.removeChild(t),r&&(n.removeAllRanges(),n.addRange(r)),i};return{copied:n,copy:function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=0;return n||(t?(0,i.VP)(e).then((()=>{s(!0),r=window.setTimeout((()=>{s(!1)}),500)})):(s(a(e)),r=window.setTimeout((()=>{s(!1)}),500))),()=>{clearTimeout(r)}}}}},4884:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(70537),i=n(26209),o=n(65809),s=n(6144);function a(e){const[t,n]=(0,r.useState)(""),{data:a,isSuccess:l}=(0,o.n8)(),[c,{data:d,isLoading:p}]=(0,s.CU)(),{copied:x,copy:u}=(0,i.Z)({enableToast:!1});(0,r.useEffect)((()=>{c(e)}),[e]),(0,r.useEffect)((()=>{d&&l&&n(d)}),[d,l]);return{enableSMTP:a,generating:p,generateNewLink:e?c.bind(null,e):()=>{c()},link:t,linkCopied:x,copyLink:()=>{u(t)}}}},33237:(e,t,n)=>{n.r(t),n.d(t,{default:()=>q});var r=n(70537),i=n(62471);const o=(0,r.createContext)(null);const s=()=>{const e=(0,r.useContext)(o);return e},a=(0,r.memo)((e=>{let{header:t,footer:n,children:i,wrapper:s,startIndex:a=0}=e;const[l,c]=(0,r.useState)(a),[d,p]=(0,r.useState)(!1),x=(0,r.useRef)(!0),u=(0,r.useRef)(!1),h=(0,r.useRef)((()=>{})),m=r.Children.toArray(i).length;x.current=l<m-1,u.current=l>0;const f=(0,r.useRef)((()=>{x.current&&c((e=>e+1))})),g=(0,r.useRef)((()=>{u.current&&(h.current=null,c((e=>e-1)))})),b=(0,r.useRef)((e=>{e>=0&&e<m&&(h.current=null,c(e))})),v=(0,r.useRef)((e=>{h.current=e})),w=(0,r.useRef)((async()=>{if(x.current&&h.current)try{p(!0),await h.current(),p(!1),h.current=null,f.current()}catch(e){throw p(!1),e}else f.current()})),y=(0,r.useMemo)((()=>({nextStep:w.current,previousStep:g.current,handleStep:v.current,isLoading:d,activeStep:l,stepCount:m,isFirstStep:!u.current,isLastStep:!x.current,goToStep:b.current})),[l,m,d]),j=(0,r.useMemo)((()=>r.Children.toArray(i)[l]),[l,i,t,n]),N=(0,r.useMemo)((()=>s?(0,r.cloneElement)(s,{children:j}):j),[s,j]);return(0,r.createElement)(o.Provider,{value:y},t,N,n)}));var l=n(57889),c=n(69885);const d=n.p+"static/media/play.ada446bc1d007eef6447.svg";var p=n(14566),x=n(80683);const u=l.ZP.div`
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
`,b=e=>{let{serverName:t,setServerName:n}=e;const{t:r}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),{nextStep:i}=s();return(0,x.jsxs)(g,{children:[(0,x.jsx)("span",{className:"primaryText",children:r("new_server")}),(0,x.jsx)("span",{className:"secondaryText",children:r("server_desc")}),(0,x.jsx)(f.Z,{className:"input",placeholder:r("placeholder_server"),value:t,onChange:e=>n(e.target.value)}),(0,x.jsx)(c.Z,{className:"button",onClick:()=>{""!==t?i():m.ZP.error("Please enter server name!")},children:r("create_server")})]})};var v=n(3074),w=n(65809),y=n(15312),j=n(21645),N=n(66160);const k=l.ZP.div`
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
`,C=e=>{let{serverName:t}=e;const{t:n}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),{nextStep:i}=s(),o=(0,r.useRef)(),a=(0,N.CG)((e=>!!e.authData.token)),l=(0,v.I0)(),[d,{isLoading:u,isError:h,isSuccess:g}]=(0,w.QK)(),[b,{isLoading:C,isError:_}]=(0,y.YA)(),{data:S}=(0,w.z3)(),[Z,{isLoading:E,isSuccess:T}]=(0,w.e2)(),[P,L]=(0,r.useState)(""),[z,$]=(0,r.useState)(""),[R,G]=(0,r.useState)("");return(0,r.useEffect)((()=>{h&&m.ZP.error("Failed to sign up")}),[h]),(0,r.useEffect)((()=>{g&&b({email:P,password:z,type:"password"})}),[g]),(0,r.useEffect)((()=>{_&&m.ZP.error("Login failed")}),[_]),(0,r.useEffect)((()=>{a&&S&&(l((0,j.R4)(!0)),Z({...S,name:t}))}),[a]),(0,r.useEffect)((()=>{T&&i()}),[T]),(0,x.jsxs)(k,{children:[(0,x.jsx)("span",{className:"primaryText",children:n("admin_title")}),(0,x.jsx)("span",{className:"secondaryText",children:n("admin_desc")}),(0,x.jsxs)("form",{ref:o,action:"/",children:[(0,x.jsx)(f.Z,{className:"input",placeholder:"Enter your email",type:"email",required:!0,value:P,onChange:e=>L(e.target.value)}),(0,x.jsx)(f.Z,{className:"input",type:"password",required:!0,minLength:6,placeholder:"Enter your password",value:z,onChange:e=>$(e.target.value)}),(0,x.jsx)(f.Z,{className:"input",type:"password",required:!0,minLength:6,placeholder:"Confirm your password",value:R,onChange:e=>G(e.target.value)})]}),(0,x.jsx)(c.Z,{className:"button",onClick:async()=>{const e=null===o||void 0===o?void 0:o.current;if(e){if(!e.checkValidity())return void e.reportValidity();d({email:P,name:"Admin",password:z,gender:0})}},children:u||C||E?"...":n("sign")})]})};var _=n(15621);const S=l.ZP.div`
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
`;function Z(){const{t:e}=(0,p.$G)("welcome"),{t:t}=(0,p.$G)("setting"),{nextStep:n}=s(),{data:i,refetch:o}=(0,w.ww)(),[a,{isSuccess:l,error:d}]=(0,w.QP)(),[u,h]=(0,r.useState)();return(0,r.useEffect)((()=>{o()}),[]),(0,r.useEffect)((()=>{i&&h(i.who_can_sign_up)}),[i]),(0,r.useEffect)((()=>{void 0!==d&&m.ZP.error(`Failed to update sign up rule: ${d.data}`)}),[d]),(0,r.useEffect)((()=>{l&&n()}),[l]),(0,x.jsxs)(S,{children:[(0,x.jsx)("span",{className:"primaryText",children:e("onboarding.invite_title")}),(0,x.jsx)("span",{className:"secondaryText",children:e("onboarding.invite_desc")}),u&&(0,x.jsx)(_.Z,{options:[t("overview.sign_up.everyone"),t("overview.sign_up.invite")],values:["EveryOne","InvitationOnly"],value:u,onChange:h}),(0,x.jsx)(c.Z,{className:"button",disabled:!u,onClick:()=>{void 0!==i&&(i.who_can_sign_up!==u?a({...i,who_can_sign_up:u}):n())},children:e("onboarding.confirm")})]})}var E,T,P=n(4884),L=n(94557);function z(){return z=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},z.apply(this,arguments)}const $=(e,t)=>{let{title:n,titleId:i,...o}=e;return r.createElement("svg",z({width:20,height:20,viewBox:"0 0 20 20",stroke:"#088AB2",fill:"white",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":i},o),n?r.createElement("title",{id:i},n):null,E||(E=r.createElement("g",{clipPath:"url(#clip0_1130_82786)"},r.createElement("path",{d:"M9.99984 13.3334V10M9.99984 6.66669H10.0082M18.3332 10C18.3332 14.6024 14.6022 18.3334 9.99984 18.3334C5.39746 18.3334 1.6665 14.6024 1.6665 10C1.6665 5.39765 5.39746 1.66669 9.99984 1.66669C14.6022 1.66669 18.3332 5.39765 18.3332 10Z",strokeWidth:1.66667,strokeLinecap:"round",strokeLinejoin:"round"}))),T||(T=r.createElement("defs",null,r.createElement("clipPath",{id:"clip0_1130_82786"},r.createElement("rect",{width:20,height:20})))))},R=(0,r.forwardRef)($),G=e=>{let{refreshInviteLink:t}=e;const{t:n}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),{t:i}=(0,p.$G)(),[o,{isSuccess:s,isLoading:a}]=(0,w.UT)(),{data:l,isSuccess:d}=(0,w.wH)(),[u,h]=(0,r.useState)(location.origin);return(0,r.useEffect)((()=>{d&&l&&h(l)}),[d]),(0,r.useEffect)((()=>{s&&(t(),m.Am.success(i("tip.update")))}),[s]),(0,x.jsxs)("div",{className:"absolute left-1/2 -translate-x-1/2 bottom-8 border-2 border-solid border-[#67E3F9] bg-[#F5FEFF] rounded-lg px-2 py-3 flex justify-start gap-4",children:[(0,x.jsx)(R,{}),(0,x.jsxs)("div",{className:"flex flex-col items-start gap-2",children:[(0,x.jsx)("span",{className:"text-sm text-[#0E7090] mb-1",children:n("update_domain_tip")}),(0,x.jsxs)("div",{className:"w-[400px] rounded flex gap-2",children:[(0,x.jsx)(f.Z,{type:"url",className:"!shadow-none !bg-transparent",placeholder:"Frontend URL",value:u,onChange:e=>{h(e.target.value)}}),(0,x.jsx)(c.Z,{disabled:!u||a,onClick:()=>{o(u)},className:"small ",children:i("action.update")})]})]})]})};function F(){const{t:e}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),{t:t}=(0,p.$G)(),{nextStep:n}=s(),{link:r,linkCopied:i,copyLink:o,generateNewLink:a}=(0,P.Z)();return(0,x.jsxs)("div",{className:"h-full flex-center flex-col relative",children:[(0,x.jsx)("span",{className:"text-2xl mb-2 font-bold",children:e("invite_title")}),(0,x.jsx)("span",{className:"text-sm mb-10 text-gray-400",children:e("last_tip")}),(0,x.jsx)("span",{className:"text-sm text-gray-500 mb-2 font-semibold",children:e("last_desc")}),(0,x.jsxs)("div",{className:"w-[400px] rounded shadow-md flex border border-solid border-gray-100",children:[(0,x.jsx)(f.Z,{className:"large !border-none !shadow-none",readOnly:!0,placeholder:"Generating",value:r}),(0,x.jsx)(c.Z,{onClick:o,className:"ghost small border_less !px-2 hover:!text-[#088ab2]",children:i?"Copied":t("action.copy")})]}),(0,x.jsx)(c.Z,{className:"w-32 h-11 mt-6",onClick:n,children:e("done")}),(0,x.jsx)(L.Z,{version:"0.3.3",empty:!0,children:(0,x.jsx)(G,{refreshInviteLink:a})})]})}var A=n(15924);const O=l.ZP.div`
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
`;function I(e){let{serverName:t}=e;const{t:n}=(0,p.$G)("welcome",{keyPrefix:"onboarding"}),r=(0,A.s0)();return(0,x.jsxs)(O,{children:[(0,x.jsx)("span",{className:"primaryText",children:n("done_welcome",{serverName:t})}),(0,x.jsx)("span",{className:"secondaryText",children:n("done_title")}),(0,x.jsx)("span",{className:"tip",children:(0,x.jsx)(p.cC,{i18nKey:"onboarding.done_desc",ns:"welcome",children:(0,x.jsx)("span",{className:"strong"})})}),(0,x.jsxs)(c.Z,{className:"startButton",onClick:()=>r("/"),children:[(0,x.jsx)("img",{src:d,alt:"play icon"}),(0,x.jsx)("span",{children:n("enter")})]})]})}var B=n(47912);const M=[{name:"welcomePage",label:(0,B.t)("welcome:onboarding.welcome_page")},{name:"serverName",label:(0,B.t)("welcome:onboarding.set_name")},{name:"adminAccount",label:(0,B.t)("welcome:onboarding.admin_account")},{name:"whoCanSignUp",label:(0,B.t)("welcome:onboarding.who_sign_up")},{name:"inviteLink",label:(0,B.t)("welcome:onboarding.invites"),canJumpTo:["whoCanSignUp"]},{name:"donePage",label:(0,B.t)("welcome:onboarding.done"),canJumpTo:["whoCanSignUp","inviteLink"]}];var U=n(57425);const V=()=>{var e;const{activeStep:t,goToStep:n}=s(),i=(null===(e=M[t])||void 0===e?void 0:e.canJumpTo)||[];return(0,x.jsx)("div",{className:"absolute top-5 w-full flex justify-center gap-2 z-10",children:M.map(((e,o)=>{const s=i.includes(e.name),a=`${(0,U.Z)("text-sm text-gray-600",s&&"cursor-pointer hover:text-gray-500",o===t&&"font-semibold",o>=t&&"text-gray-400")}`;return(0,x.jsxs)(r.Fragment,{children:[(0,x.jsx)("span",{className:a,onClick:()=>{s&&n(o)},children:e.label}),o!==M.length-1&&(0,x.jsx)("span",{className:a,children:"\u2192"})]},o)}))})};function q(){const{t:e}=(0,p.$G)("welcome"),[t,n]=(0,r.useState)("");return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(i.q,{children:(0,x.jsx)("title",{children:e("onboarding.title")})}),(0,x.jsx)("div",{className:"h-screen overflow-y-auto",children:(0,x.jsxs)(a,{header:(0,x.jsx)(V,{}),children:[(0,x.jsx)(h,{}),(0,x.jsx)(b,{serverName:t,setServerName:n}),(0,x.jsx)(C,{serverName:t}),(0,x.jsx)(Z,{}),(0,x.jsx)(F,{}),(0,x.jsx)(I,{serverName:t})]})})]})}},34108:(e,t,n)=>{function r(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{l(r.next(e))}catch(t){o(t)}}function a(e){try{l(r.throw(e))}catch(t){o(t)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}l((r=r.apply(e,t||[])).next())}))}function i(e){return r(this,void 0,void 0,(function*(){const t=URL.createObjectURL(e),n=yield function(e){return r(this,void 0,void 0,(function*(){return new Promise((function(t,n){const r=document.createElement("img");r.crossOrigin="anonymous",r.src=e,r.onload=function(e){const n=e.target;t(n)},r.onabort=n,r.onerror=n}))}))}(t);return yield function(e){return r(this,void 0,void 0,(function*(){return new Promise((function(t,n){const r=document.createElement("canvas"),i=r.getContext("2d");if(i){const{width:o,height:s}=e;r.width=o,r.height=s,i.drawImage(e,0,0,o,s),r.toBlob((function(e){e?t(e):n("Cannot get blob from image element")}),"image/png",1)}}))}))}(n)}))}function o(e){return r(this,void 0,void 0,(function*(){const t={[e.type]:e},n=new ClipboardItem(t);yield navigator.clipboard.write([n])}))}function s(e){return r(this,void 0,void 0,(function*(){const t=yield function(e){return r(this,void 0,void 0,(function*(){const t=yield fetch(`${e}`);return yield t.blob()}))}(e);if(function(e){return e.type.includes("jpeg")}(t)){const e=yield i(t);return yield o(e),t}if(function(e){return e.type.includes("png")}(t))return yield o(t),t;throw new Error("Cannot copy this type of image to clipboard")}))}n.d(t,{VP:()=>s})}}]);