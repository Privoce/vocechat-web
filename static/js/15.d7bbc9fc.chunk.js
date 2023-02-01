"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[15],{94557:(e,t,n)=>{n.d(t,{Z:()=>l});var s=n(14566),r=n(65809),o=n(21812),a=n(80683);const l=e=>{let{empty:t=!1,version:n,children:l}=e;const{t:i}=(0,s.$G)(),{data:c,isSuccess:d}=(0,r.p5)();if(!d)return null;return(0,o.yC)(c,n)<0?t?null:(0,a.jsxs)("div",{className:"flex flex-col gap-2 items-start border border-solid border-orange-500 p-3 rounded-lg w-fit",children:[(0,a.jsx)("span",{className:"text-gray-400 text-sm",children:(0,a.jsx)(s.cC,{i18nKey:"server_update.version_needed",children:(0,a.jsx)("strong",{className:"font-bold",children:{version:n}})})}),(0,a.jsx)("span",{className:"text-gray-400 text-sm",children:(0,a.jsx)(s.cC,{i18nKey:"server_update.current_version",children:(0,a.jsx)("strong",{className:"font-bold",children:{version:c}})})}),(0,a.jsx)("span",{className:"text-gray-400 text-sm",children:i("server_update.update_tip")}),(0,a.jsxs)("a",{className:"text-blue-500 underline",href:"https://doc.voce.chat/install/install-by-docker#update-vocechat-docker",target:"_blank",rel:"noopener noreferrer",children:[i("server_update.howto"),"  \ud83d\udcd6 "]})]}):l}},17237:(e,t,n)=>{n.d(t,{Z:()=>c});var s=n(70537),r=n(40182),o=n(57889),a=n(80683);const l=o.ZP.div`
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
`,i=o.ZP.input`
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
`,c=e=>{let{type:t="text",prefix:n="",className:o,...c}=e;const[d,u]=(0,s.useState)(t);return"password"==t?(0,a.jsxs)(l,{className:o,children:[(0,a.jsx)(i,{type:d,autoComplete:"password"==d?"current-password":"on",className:`inner ${o}`,...c}),(0,a.jsx)("div",{className:"view",onClick:()=>{u((e=>"password"==e?"text":"password"))},children:"password"==d?(0,a.jsx)(r.MBb,{color:"#78787c"}):(0,a.jsx)(r.Rbo,{color:"#78787c"})})]}):n?(0,a.jsxs)(l,{className:o,children:[(0,a.jsx)("span",{className:"prefix",children:n}),(0,a.jsx)(i,{className:`inner ${o}`,type:d,...c})]}):(0,a.jsx)(i,{type:d,className:o,...c})}},15621:(e,t,n)=>{n.d(t,{Z:()=>c});var s=n(70537),r=n(57889),o=n(80683);const a=r.ZP.form`
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
`,l="",i=[],c=e=>{let{options:t,values:n=i,value:r=l,defaultValue:c="",onChange:d}=e;const u=(0,s.useId)(),[x,p]=(0,s.useState)(c),m=r!==l?r:x;return(0,o.jsx)(a,{children:t.map(((e,t)=>(0,o.jsxs)("div",{className:"option",children:[(0,o.jsx)("input",{type:"radio",checked:(n!==i?n.indexOf(m):m)===t,onChange:()=>{const e=n===i?t:n[t];r===l&&p(e),d&&d(e)},id:`${u}-${t}`}),(0,o.jsx)("div",{className:"box",children:(0,o.jsx)("label",{htmlFor:`${u}-${t}`,children:e})})]},t)))})}},26209:(e,t,n)=>{n.d(t,{Z:()=>a});var s=n(70537),r=n(34108),o=n(27418);const a=e=>{const{enableToast:t=!0}=e||{},[n,a]=(0,s.useState)(!1);(0,s.useEffect)((()=>{n&&t&&o.ZP.success("Copied!")}),[n]);const l=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection();if(!n)return!1;const s=n.rangeCount>0&&n.getRangeAt(0);t.select();const r=document.execCommand("copy");return document.body.removeChild(t),s&&(n.removeAllRanges(),n.addRange(s)),r};return{copied:n,copy:function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=0;return n||(t?(0,r.VP)(e).then((()=>{a(!0),s=window.setTimeout((()=>{a(!1)}),500)})):(a(l(e)),s=window.setTimeout((()=>{a(!1)}),500))),()=>{clearTimeout(s)}}}}},4884:(e,t,n)=>{n.d(t,{Z:()=>l});var s=n(70537),r=n(26209),o=n(65809),a=n(6144);function l(e){const[t,n]=(0,s.useState)(""),{data:l,isSuccess:i}=(0,o.n8)(),[c,{data:d,isLoading:u}]=(0,a.CU)(),{copied:x,copy:p}=(0,r.Z)({enableToast:!1});(0,s.useEffect)((()=>{c(e)}),[e]),(0,s.useEffect)((()=>{d&&i&&n(d)}),[d,i]);return{enableSMTP:l,generating:u,generateNewLink:e?c.bind(null,e):()=>{c()},link:t,linkCopied:x,copyLink:()=>{p(t)}}}},33237:(e,t,n)=>{n.r(t),n.d(t,{default:()=>M});var s=n(70537),r=n(62471);const o=(0,s.createContext)(null);const a=()=>{const e=(0,s.useContext)(o);return e},l=(0,s.memo)((e=>{let{header:t,footer:n,children:r,wrapper:a,startIndex:l=0}=e;const[i,c]=(0,s.useState)(l),[d,u]=(0,s.useState)(!1),x=(0,s.useRef)(!0),p=(0,s.useRef)(!1),m=(0,s.useRef)((()=>{})),f=s.Children.toArray(r).length;x.current=i<f-1,p.current=i>0;const h=(0,s.useRef)((()=>{x.current&&c((e=>e+1))})),g=(0,s.useRef)((()=>{p.current&&(m.current=null,c((e=>e-1)))})),b=(0,s.useRef)((e=>{e>=0&&e<f&&(m.current=null,c(e))})),v=(0,s.useRef)((e=>{m.current=e})),w=(0,s.useRef)((async()=>{if(x.current&&m.current)try{u(!0),await m.current(),u(!1),m.current=null,h.current()}catch(e){throw u(!1),e}else h.current()})),j=(0,s.useMemo)((()=>({nextStep:w.current,previousStep:g.current,handleStep:v.current,isLoading:d,activeStep:i,stepCount:f,isFirstStep:!p.current,isLastStep:!x.current,goToStep:b.current})),[i,f,d]),y=(0,s.useMemo)((()=>s.Children.toArray(r)[i]),[i,r,t,n]),N=(0,s.useMemo)((()=>a?(0,s.cloneElement)(a,{children:y}):y),[a,y]);return(0,s.createElement)(o.Provider,{value:j},t,N,n)}));var i=n(69885);const c=n.p+"static/media/play.ada446bc1d007eef6447.svg";var d=n(14566),u=n(80683);function x(){const{t:e}=(0,d.$G)("welcome",{keyPrefix:"onboarding"}),{nextStep:t}=a();return(0,u.jsxs)("div",{className:"flex-center flex-col h-full text-center",children:[(0,u.jsx)("span",{className:"text-2xl mb-2 font-bold",children:e("welcome")}),(0,u.jsx)("span",{className:"text-sm mb-6",children:e("welcome_desc")}),(0,u.jsxs)(i.Z,{className:"!w-32 flex flex-col gap-2 items-center py-3 text-sm",onClick:t,children:[(0,u.jsx)("img",{src:c,alt:"play icon"}),(0,u.jsx)("span",{children:e("start")})]})]})}var p=n(27418),m=n(17237);const f=e=>{let{serverName:t,setServerName:n}=e;const{t:s}=(0,d.$G)("welcome",{keyPrefix:"onboarding"}),{nextStep:r}=a();return(0,u.jsxs)("div",{className:"h-full flex-center flex-col text-center w-[360px] m-auto",children:[(0,u.jsx)("span",{className:"text-2xl mb-2 font-bold",children:s("new_server")}),(0,u.jsx)("span",{className:"text-sm mb-6 text-gray-400 ",children:s("server_desc")}),(0,u.jsx)(m.Z,{className:"h-11 px-3.5 py-2.5 border-gray-300 rounded-lg shadow",placeholder:s("placeholder_server"),value:t,onChange:e=>n(e.target.value)}),(0,u.jsx)(i.Z,{className:"w-full mt-6",onClick:()=>{""!==t?r():p.ZP.error("Please enter server name!")},children:s("create_server")})]})};var h=n(3074),g=n(65809),b=n(15312),v=n(21645),w=n(66160);const j=e=>{let{serverName:t}=e;const{t:n}=(0,d.$G)("welcome",{keyPrefix:"onboarding"}),{nextStep:r}=a(),o=(0,s.useRef)(),l=(0,w.CG)((e=>!!e.authData.token)),c=(0,h.I0)(),[x,{isLoading:f,isError:j,isSuccess:y}]=(0,g.QK)(),[N,{isLoading:k,isError:C}]=(0,b.YA)(),{data:_}=(0,g.z3)(),[S,{isLoading:E,isSuccess:Z}]=(0,g.e2)(),[P,L]=(0,s.useState)(""),[$,R]=(0,s.useState)(""),[G,T]=(0,s.useState)("");return(0,s.useEffect)((()=>{j&&p.ZP.error("Failed to sign up")}),[j]),(0,s.useEffect)((()=>{y&&N({email:P,password:$,type:"password"})}),[y]),(0,s.useEffect)((()=>{C&&p.ZP.error("Login failed")}),[C]),(0,s.useEffect)((()=>{l&&_&&(c((0,v.R4)(!0)),S({..._,name:t}))}),[l]),(0,s.useEffect)((()=>{Z&&r()}),[Z]),(0,u.jsxs)("div",{className:"h-full flex-center flex-col text-center w-[360px] m-auto",children:[(0,u.jsx)("span",{className:"text-2xl mb-2 font-bold",children:n("admin_title")}),(0,u.jsx)("span",{className:"text-sm mb-6",children:n("admin_desc")}),(0,u.jsxs)("form",{ref:o,action:"/",className:"flex flex-col gap-2 w-full",children:[(0,u.jsx)(m.Z,{className:"large",placeholder:"Enter your email",type:"email",required:!0,value:P,onChange:e=>L(e.target.value)}),(0,u.jsx)(m.Z,{className:"large",type:"password",required:!0,minLength:6,placeholder:"Enter your password",value:$,onChange:e=>R(e.target.value)}),(0,u.jsx)(m.Z,{className:"large",type:"password",required:!0,minLength:6,placeholder:"Confirm your password",value:G,onChange:e=>T(e.target.value)})]}),(0,u.jsx)(i.Z,{className:"mt-6 w-full",onClick:async()=>{const e=null===o||void 0===o?void 0:o.current;if(e){if(!e.checkValidity())return void e.reportValidity();x({email:P,name:"Admin",password:$,gender:0})}},children:f||k||E?"...":n("sign")})]})};var y=n(57889),N=n(15621);function k(){const{t:e}=(0,d.$G)("welcome"),{t:t}=(0,d.$G)("setting"),{nextStep:n}=a(),{data:r,refetch:o}=(0,g.ww)(),[l,{isSuccess:c,error:x}]=(0,g.QP)(),[m,f]=(0,s.useState)();(0,s.useEffect)((()=>{o()}),[]),(0,s.useEffect)((()=>{r&&f(r.who_can_sign_up)}),[r]),(0,s.useEffect)((()=>{void 0!==x&&p.ZP.error(`Failed to update sign up rule: ${x.data}`)}),[x]),(0,s.useEffect)((()=>{c&&n()}),[c]);const h=y.ZP.div`
  /* > form {
    width: 512px;
  }

  > .button {
    width: 124px;
    height: 44px;
    margin-top: 24px;
  } */
`;return(0,u.jsxs)(h,{className:"h-full flex-center flex-col text-center w-[512px] m-auto",children:[(0,u.jsx)("span",{className:"font-bold text-2xl mb-2",children:e("onboarding.invite_title")}),(0,u.jsx)("span",{className:"text-sm mb-6",children:e("onboarding.invite_desc")}),m&&(0,u.jsx)(N.Z,{options:[t("overview.sign_up.everyone"),t("overview.sign_up.invite")],values:["EveryOne","InvitationOnly"],value:m,onChange:f}),(0,u.jsx)(i.Z,{className:"w-32 mt-6",disabled:!m,onClick:()=>{void 0!==r&&(r.who_can_sign_up!==m?l({...r,who_can_sign_up:m}):n())},children:e("onboarding.confirm")})]})}var C,_,S=n(4884),E=n(94557);function Z(){return Z=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},Z.apply(this,arguments)}const P=(e,t)=>{let{title:n,titleId:r,...o}=e;return s.createElement("svg",Z({width:20,height:20,viewBox:"0 0 20 20",stroke:"#088AB2",fill:"white",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":r},o),n?s.createElement("title",{id:r},n):null,C||(C=s.createElement("g",{clipPath:"url(#clip0_1130_82786)"},s.createElement("path",{d:"M9.99984 13.3334V10M9.99984 6.66669H10.0082M18.3332 10C18.3332 14.6024 14.6022 18.3334 9.99984 18.3334C5.39746 18.3334 1.6665 14.6024 1.6665 10C1.6665 5.39765 5.39746 1.66669 9.99984 1.66669C14.6022 1.66669 18.3332 5.39765 18.3332 10Z",strokeWidth:1.66667,strokeLinecap:"round",strokeLinejoin:"round"}))),_||(_=s.createElement("defs",null,s.createElement("clipPath",{id:"clip0_1130_82786"},s.createElement("rect",{width:20,height:20})))))},L=(0,s.forwardRef)(P),$=e=>{let{refreshInviteLink:t}=e;const{t:n}=(0,d.$G)("welcome",{keyPrefix:"onboarding"}),{t:r}=(0,d.$G)(),[o,{isSuccess:a,isLoading:l}]=(0,g.UT)(),{data:c,isSuccess:x}=(0,g.wH)(),[f,h]=(0,s.useState)(location.origin);return(0,s.useEffect)((()=>{x&&c&&h(c)}),[x]),(0,s.useEffect)((()=>{a&&(t(),p.Am.success(r("tip.update")))}),[a]),(0,u.jsxs)("div",{className:"absolute left-1/2 -translate-x-1/2 bottom-8 border-2 border-solid border-[#67E3F9] bg-[#F5FEFF] rounded-lg px-2 py-3 flex justify-start gap-4",children:[(0,u.jsx)(L,{}),(0,u.jsxs)("div",{className:"flex flex-col items-start gap-2",children:[(0,u.jsx)("span",{className:"text-sm text-[#0E7090] mb-1",children:n("update_domain_tip")}),(0,u.jsxs)("div",{className:"w-[400px] rounded flex gap-2",children:[(0,u.jsx)(m.Z,{type:"url",className:"!shadow-none !bg-transparent",placeholder:"Frontend URL",value:f,onChange:e=>{h(e.target.value)}}),(0,u.jsx)(i.Z,{disabled:!f||l,onClick:()=>{o(f)},className:"small ",children:r("action.update")})]})]})]})};function R(){const{t:e}=(0,d.$G)("welcome",{keyPrefix:"onboarding"}),{t:t}=(0,d.$G)(),{nextStep:n}=a(),{link:s,linkCopied:r,copyLink:o,generateNewLink:l}=(0,S.Z)();return(0,u.jsxs)("div",{className:"h-full flex-center flex-col relative",children:[(0,u.jsx)("span",{className:"text-2xl mb-2 font-bold",children:e("invite_title")}),(0,u.jsx)("span",{className:"text-sm mb-10 text-gray-400",children:e("last_tip")}),(0,u.jsx)("span",{className:"text-sm text-gray-500 mb-2 font-semibold",children:e("last_desc")}),(0,u.jsxs)("div",{className:"w-[400px] rounded shadow-md flex border border-solid border-gray-100",children:[(0,u.jsx)(m.Z,{className:"large !border-none !shadow-none",readOnly:!0,placeholder:"Generating",value:s}),(0,u.jsx)(i.Z,{onClick:o,className:"ghost small border_less !px-2 hover:!text-[#088ab2]",children:r?"Copied":t("action.copy")})]}),(0,u.jsx)(i.Z,{className:"w-32 h-11 mt-6",onClick:n,children:e("done")}),(0,u.jsx)(E.Z,{version:"0.3.3",empty:!0,children:(0,u.jsx)($,{refreshInviteLink:l})})]})}var G=n(15924);function T(e){let{serverName:t}=e;const{t:n}=(0,d.$G)("welcome",{keyPrefix:"onboarding"}),s=(0,G.s0)();return(0,u.jsxs)("div",{className:"h-full flex-center flex-col text-center w-[588px] m-auto",children:[(0,u.jsx)("span",{className:"text-2xl font-bold mb-2",children:n("done_welcome",{serverName:t})}),(0,u.jsx)("span",{className:"text-sm mb-12",children:n("done_title")}),(0,u.jsx)("span",{className:"text-xl mb-12",children:(0,u.jsx)(d.cC,{i18nKey:"onboarding.done_desc",ns:"welcome",children:(0,u.jsx)("span",{className:"font-bold"})})}),(0,u.jsxs)(i.Z,{className:"!w-32 flex flex-col items-center py-3",onClick:()=>s("/"),children:[(0,u.jsx)("img",{className:"mb-2",src:c,alt:"play icon"}),(0,u.jsx)("span",{className:"text-sm",children:n("enter")})]})]})}var F=n(47912);const A=[{name:"welcomePage",label:(0,F.t)("welcome:onboarding.welcome_page")},{name:"serverName",label:(0,F.t)("welcome:onboarding.set_name")},{name:"adminAccount",label:(0,F.t)("welcome:onboarding.admin_account")},{name:"whoCanSignUp",label:(0,F.t)("welcome:onboarding.who_sign_up")},{name:"inviteLink",label:(0,F.t)("welcome:onboarding.invites"),canJumpTo:["whoCanSignUp"]},{name:"donePage",label:(0,F.t)("welcome:onboarding.done"),canJumpTo:["whoCanSignUp","inviteLink"]}];var O=n(57425);const I=()=>{var e;const{activeStep:t,goToStep:n}=a(),r=(null===(e=A[t])||void 0===e?void 0:e.canJumpTo)||[];return(0,u.jsx)("div",{className:"absolute top-5 w-full flex justify-center gap-2 z-10",children:A.map(((e,o)=>{const a=r.includes(e.name),l=`${(0,O.Z)("text-sm text-gray-600",a&&"cursor-pointer hover:text-gray-500",o===t&&"font-bold text-black",o>=t&&"text-gray-400")}`;return(0,u.jsxs)(s.Fragment,{children:[(0,u.jsx)("span",{className:l,onClick:()=>{a&&n(o)},children:e.label}),o!==A.length-1&&(0,u.jsx)("span",{className:l,children:"\u2192"})]},o)}))})};function M(){const{t:e}=(0,d.$G)("welcome"),[t,n]=(0,s.useState)("");return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(r.q,{children:(0,u.jsx)("title",{children:e("onboarding.title")})}),(0,u.jsx)("div",{className:"h-screen overflow-y-auto",children:(0,u.jsxs)(l,{header:(0,u.jsx)(I,{}),children:[(0,u.jsx)(x,{}),(0,u.jsx)(f,{serverName:t,setServerName:n}),(0,u.jsx)(j,{serverName:t}),(0,u.jsx)(k,{}),(0,u.jsx)(R,{}),(0,u.jsx)(T,{serverName:t})]})})]})}},34108:(e,t,n)=>{function s(e,t,n,s){return new(n||(n=Promise))((function(r,o){function a(e){try{i(s.next(e))}catch(t){o(t)}}function l(e){try{i(s.throw(e))}catch(t){o(t)}}function i(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}i((s=s.apply(e,t||[])).next())}))}function r(e){return s(this,void 0,void 0,(function*(){const t=URL.createObjectURL(e),n=yield function(e){return s(this,void 0,void 0,(function*(){return new Promise((function(t,n){const s=document.createElement("img");s.crossOrigin="anonymous",s.src=e,s.onload=function(e){const n=e.target;t(n)},s.onabort=n,s.onerror=n}))}))}(t);return yield function(e){return s(this,void 0,void 0,(function*(){return new Promise((function(t,n){const s=document.createElement("canvas"),r=s.getContext("2d");if(r){const{width:o,height:a}=e;s.width=o,s.height=a,r.drawImage(e,0,0,o,a),s.toBlob((function(e){e?t(e):n("Cannot get blob from image element")}),"image/png",1)}}))}))}(n)}))}function o(e){return s(this,void 0,void 0,(function*(){const t={[e.type]:e},n=new ClipboardItem(t);yield navigator.clipboard.write([n])}))}function a(e){return s(this,void 0,void 0,(function*(){const t=yield function(e){return s(this,void 0,void 0,(function*(){const t=yield fetch(`${e}`);return yield t.blob()}))}(e);if(function(e){return e.type.includes("jpeg")}(t)){const e=yield r(t);return yield o(e),t}if(function(e){return e.type.includes("png")}(t))return yield o(t),t;throw new Error("Cannot copy this type of image to clipboard")}))}n.d(t,{VP:()=>a})}}]);