"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[7],{24007:(e,t,n)=>{t.b=void 0;const r=n(80683),o=n(70537),i="undefined"===typeof window,c=!i&&(()=>{try{return"ontouchstart"in window||navigator.maxTouchPoints}catch(e){return!1}})(),l=!i&&(()=>{try{return window.CSS.supports("overflow-anchor: auto")}catch(e){return!1}})(),u=c&&!l,m={top:"top",bottom:"bottom",clientHeight:"clientHeight",scrollHeight:"scrollHeight",scrollTop:"scrollTop",overflowY:"overflowY",height:"height",minHeight:"minHeight",maxHeight:"maxHeight",marginTop:"marginTop"},s={top:"left",bottom:"right",scrollHeight:"scrollWidth",clientHeight:"clientWidth",scrollTop:"scrollLeft",overflowY:"overflowX",minHeight:"minWidth",height:"width",maxHeight:"maxWidth",marginTop:"marginLeft"},d=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0;return Math.max(Math.min(t,n),e)},f=(e,t,n)=>Math.ceil(Math.abs(e-t)/n),p=i?o.useEffect:o.useLayoutEffect,a=(e,t,n)=>{const r=[];for(let o=e;o<t;o++)r.push(n(o));return r},g=e=>{let{fromElement:t,toElement:n,fromIndex:r,asc:o=!0,compare:i}=e,c=r,l=t;for(;l&&l!==n;){if(i(l,c))return[l,c];o?(c++,l=l.nextSibling):(c--,l=l.previousSibling)}return[null,-1]},h=/auto|scroll/gi,b=(e,t)=>{if(!t||t===document.body||t===document.documentElement)return document.documentElement;const n=window.getComputedStyle(t);return h.test(n[e.overflowY])||h.test(n.overflow)?t:b(e,t.parentNode)},v=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return{padding:0,margin:0,border:"none",visibility:"hidden",overflowAnchor:"none",[e.minHeight]:t,[e.height]:t,[e.maxHeight]:t,[e.marginTop]:n}};t.b=(0,o.forwardRef)(((e,t)=>{let{items:n=[],count:i,children:h,viewportRef:x,itemSize:T=0,itemMargin:w=-1,overscan:E=1,axis:y="y",initialIndex:R=-1,initialAlignToTop:H=!0,initialOffset:C=0,initialDelay:S=-1,initialPrerender:I=0,onViewportIndexesChange:M,overflowAnchor:B="auto",withCache:Y=!0,scrollThreshold:A=0,renderSpacer:k=(e=>{let{ref:t,style:n}=e;return(0,r.jsx)("div",{ref:t,style:n},void 0)}),indexesShift:W=0,getItemBoundingClientRect:F=(e=>e.getBoundingClientRect())}=e;const L="y"===y?m:s,j="number"===typeof i,N=(j?i:n.length)-1,[[P,_],q]=(0,o.useState)((()=>[d(0,T),d(-1,w)])),z=d(0,P+_),D=d(0,Math.ceil(E*z)),[O,V]=(0,o.useState)([R-I,R+I]),X=(0,o.useRef)(null),$=(0,o.useRef)(-1),G=(0,o.useRef)(null),J=(0,o.useRef)(null),K=(0,o.useRef)(!1),Q=(0,o.useRef)(W),U=(0,o.useRef)([]),Z=(0,o.useRef)(R>=0?{index:R,alignToTop:H,offset:C,delay:S,prerender:I}:null),ee=(0,o.useRef)(null),te=(0,o.useRef)(0),ne=(0,o.useRef)([-1,-1]),re=(0,o.useRef)(null),[oe,ie]=(0,o.useMemo)((()=>{O[0]=d(0,O[0],N),O[1]=d(O[0],O[1],N);const e=W-Q.current;Q.current=W;const t=G.current;return t&&e&&(O[0]=d(0,O[0]+e,N),O[1]=d(O[0],O[1]+e,N),X.current=t.nextSibling,$.current=O[0],K.current=!0),O}),[W,O,N]),ce=(0,o.useMemo)((()=>v(L,(Y?U.current:[]).slice(0,oe).reduce(((e,t)=>e+(t-P)),oe*z),te.current)),[L,Y,oe,z,P]),le=(0,o.useMemo)((()=>v(L,(Y?U.current:[]).slice(ie+1,N+1).reduce(((e,t)=>e+(t-P)),z*(N-ie)))),[L,Y,ie,N,z,P]),ue=(0,o.useMemo)((()=>{let e=null;return()=>{if(x)return x.current===document.body?document.documentElement:x.current;if(e&&e.isConnected)return e;const t=G.current;return t?(e=b(L,t.parentNode),e):null}}),[L,x]),me=(0,o.useRef)((()=>{}));let se;return p((()=>{me.current=()=>{const e=ue(),t=G.current,n=J.current;if(!e||!t||!n)return;const r=t.nextSibling,o=n.previousSibling,i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),l=n.getBoundingClientRect(),m={[L.top]:e===document.documentElement?0:i[L.top],[L.bottom]:e===document.documentElement?document.documentElement.clientHeight:i[L.bottom]},s={[L.top]:m[L.top]-D,[L.bottom]:m[L.bottom]+D};if(te.current<0&&c[L.top]-te.current>=s[L.top]||te.current>0&&c[L.top]>=s[L.top]||te.current&&Z.current)return t.style[L.marginTop]="0px",e.style[L.overflowY]="hidden",e[L.scrollTop]+=-te.current,e.style[L.overflowY]="",void(te.current=0);if(0===P||-1===_){let e=0;if(g({fromElement:r,toElement:n,fromIndex:oe,compare:t=>(e+=F(t)[L.height],!1)}),!e)return;const t=ie-oe+1,o=0===P?Math.ceil(e/t):P,i=-1===_?Math.ceil((l[L.top]-c[L.bottom]-e)/t):_;return void q([o,i])}if(ee.current)return;if(Z.current){const t=d(0,Z.current.index,N);if(t<oe||t>ie)return void V([t-Z.current.prerender,t+Z.current.prerender]);const[o]=g({fromElement:r,toElement:n,fromIndex:oe,compare:(e,n)=>n===t});if(!o)return;const{alignToTop:i,offset:c,delay:l}=Z.current;Z.current=null;const s=()=>{const t=F(o),n=i?t[L.top]-m[L.top]+c:t[L.bottom]-m[L.top]-e[L.clientHeight]+c;e[L.scrollTop]+=n,ee.current=null},f=l<0&&u?30:l;return f>0?void(ee.current=setTimeout(s,f)):void s()}if(null===re.current)re.current=e.scrollTop;else if(re.current!==e.scrollTop){const t=Math.abs(e.scrollTop-re.current);if(re.current=e.scrollTop,A>0&&t>A)return}const p=r===n?n:r.nextSibling,a=o===t?t:o.previousSibling,h=Math.ceil((l[L.top]-c[L.bottom])/(ie+1-oe)),b=c[L.bottom]>s[L.bottom],v=l[L.top]<s[L.top],x=!b&&!v&&c[L.bottom]>s[L.top],T=!b&&!v&&l[L.top]<s[L.bottom],w=!b&&!v&&(a===t?c:F(a))[L.bottom]>s[L.bottom],E=!b&&!v&&(p===n?l:F(p))[L.top]<s[L.top];let y=oe,R=ie;if(b&&(y-=f(c[L.bottom],s[L.top],h),R-=f(l[L.top],s[L.bottom],h)),v&&(R+=f(l[L.top],s[L.bottom],h),y+=f(c[L.bottom],s[L.top],h)),x&&(y-=f(c[L.bottom],s[L.top],h)),T&&(R+=f(l[L.top],s[L.bottom],h)),w){const[,e]=g({fromElement:o,toElement:t,fromIndex:ie,asc:!1,compare:e=>F(e)[L.bottom]<=s[L.bottom]});-1!==e&&(R=e+1)}if(E){const[,e]=g({fromElement:r,toElement:n,fromIndex:oe,compare:e=>F(e)[L.top]>=s[L.top]});-1!==e&&(y=e-1)}if(M){let[,e]=g({fromElement:r,toElement:n,fromIndex:oe,compare:e=>F(e)[L.bottom]>m[L.top]});-1===e&&(e=oe);let[,i]=g({fromElement:o,toElement:t,fromIndex:ie,asc:!1,compare:e=>F(e)[L.top]<m[L.bottom]});-1===i&&(i=ie),e===ne.current[0]&&i===ne.current[1]||(ne.current=[e,i],M(ne.current))}if(y=d(0,y,N),R=d(y,R,N),y!==oe||R!==ie){if(y!==oe)if(oe>=y)X.current=r,$.current=oe;else{const[e,t]=g({fromElement:r,toElement:n,fromIndex:oe,compare:(e,t)=>{if(t===y)return!0;const n=F(e);return n[L.height]!==P&&(U.current[t]=n[L.height]),!1}});e?(X.current=e,$.current=t):(X.current=o,$.current=ie)}V([y,R])}}})),X.current&&ue()&&G.current&&(se=F(X.current)[L.top]-(ue()===document.documentElement?0:ue().getBoundingClientRect()[L.top])),p((()=>{X.current=null;const e=$.current,t=K.current;$.current=-1,K.current=!1;const n=ue(),r=G.current,o=J.current;if(-1===e||!n||!r||!o||void 0===se||l&&"none"!==B&&!t)return;let i=null;if(e>=oe&&e<=ie){const[t]=g({fromElement:r.nextSibling,toElement:o,fromIndex:oe,compare:(t,n)=>n===e});t&&(i=F(t)[L.top])}else e<oe?i=r.getBoundingClientRect()[L.top]+(Y?U.current:[]).slice(0,e).reduce(((e,t)=>e+(t-P)),e*z):e<=N&&(i=o.getBoundingClientRect()[L.top]+(Y?U.current:[]).slice(ie+1,e).reduce(((e,t)=>e+(t-P)),z*(e-1-ie)));if(null===i)return;const u=i-(n===document.documentElement?0:n.getBoundingClientRect()[L.top])-se;return u?c?(te.current-=u,void(r.style[L.marginTop]=`${te.current}px`)):void(n[L.scrollTop]+=u):void 0}),[oe]),p((()=>{let e;const t=()=>{e=requestAnimationFrame(t),me.current()};return t(),()=>{cancelAnimationFrame(e),ee.current&&clearTimeout(ee.current)}}),[]),(0,o.useImperativeHandle)(t,(()=>({scrollToIndex:e=>{let{index:t=-1,alignToTop:n=!0,offset:r=0,delay:o=-1,prerender:i=0}=e;Z.current={index:t,alignToTop:n,offset:r,delay:o,prerender:i},me.current()}})),[]),(0,r.jsxs)(o.Fragment,{children:[k({ref:G,style:ce,type:"top"}),(!!i||!!n.length)&&a(oe,ie+1,j?h:e=>h(n[e],e,n)),k({ref:J,style:le,type:"bottom"})]},void 0)}))}}]);