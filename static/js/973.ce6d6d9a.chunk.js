/*! For license information please see 973.ce6d6d9a.chunk.js.LICENSE.txt */
"use strict";(globalThis.webpackChunkvocechat_web=globalThis.webpackChunkvocechat_web||[]).push([[973],{19597:(e,t,n)=>{t.h=void 0;const r=n(44109),o=n(76697),i="undefined"===typeof window,l=!i&&(()=>{try{return"ontouchstart"in window||navigator.maxTouchPoints}catch(e){return!1}})(),s=!i&&(()=>{try{return window.CSS.supports("overflow-anchor: auto")}catch(e){return!1}})(),a=l&&!s,c={top:"top",bottom:"bottom",clientHeight:"clientHeight",scrollHeight:"scrollHeight",scrollTop:"scrollTop",overflowY:"overflowY",height:"height",minHeight:"minHeight",maxHeight:"maxHeight",marginTop:"marginTop"},u={top:"left",bottom:"right",scrollHeight:"scrollWidth",clientHeight:"clientWidth",scrollTop:"scrollLeft",overflowY:"overflowX",minHeight:"minWidth",height:"width",maxHeight:"maxWidth",marginTop:"marginLeft"},h=(e,t,n=1/0)=>Math.max(Math.min(t,n),e),m=(e,t,n)=>Math.ceil(Math.abs(e-t)/n),d=i?o.useEffect:o.useLayoutEffect,f=(e,t,n)=>{const r=[];for(let o=e;o<t;o++)r.push(n(o));return r},g=({fromElement:e,toElement:t,fromIndex:n,asc:r=!0,compare:o})=>{let i=n,l=e;for(;l&&l!==t;){if(o(l,i))return[l,i];r?(i++,l=l.nextSibling):(i--,l=l.previousSibling)}return[null,-1]},p=/auto|scroll/gi,E=(e,t)=>{if(!t||t===document.body||t===document.documentElement)return document.documentElement;const n=window.getComputedStyle(t);return p.test(n[e.overflowY])||p.test(n.overflow)?t:E(e,t.parentNode)},w=(e,t,n=0)=>({padding:0,margin:0,border:"none",visibility:"hidden",overflowAnchor:"none",[e.minHeight]:t,[e.height]:t,[e.maxHeight]:t,[e.marginTop]:n});t.h=(0,o.forwardRef)((({items:e=[],count:t,children:n,viewportRef:i,itemSize:p=0,itemMargin:M=-1,overscan:C=1,axis:R="y",initialIndex:v=-1,initialAlignToTop:y=!0,initialOffset:b=0,initialDelay:S=-1,initialPrerender:A=0,onViewportIndexesChange:N,overflowAnchor:I="auto",withCache:x=!0,scrollThreshold:P=0,renderSpacer:T=(({ref:e,style:t})=>(0,r.jsx)("div",{ref:e,style:t})),indexesShift:z=0,getItemBoundingClientRect:O=(e=>e.getBoundingClientRect())},H)=>{const _="y"===R?c:u,B="number"===typeof t,F=(B?t:e.length)-1,[[L,k],D]=(0,o.useState)((()=>[h(0,p),h(-1,M)])),U=h(0,L+k),V=h(0,Math.ceil(C*U)),[Q,Y]=(0,o.useState)([v-A,v+A]),$=(0,o.useRef)(null),W=(0,o.useRef)(-1),X=(0,o.useRef)(null),G=(0,o.useRef)(null),K=(0,o.useRef)(!1),j=(0,o.useRef)(z),q=(0,o.useRef)([]),J=(0,o.useRef)(v>=0?{index:v,alignToTop:y,offset:b,delay:S,prerender:A}:null),Z=(0,o.useRef)(null),ee=(0,o.useRef)(0),te=(0,o.useRef)([-1,-1]),ne=(0,o.useRef)(null),[re,oe]=(0,o.useMemo)((()=>{Q[0]=h(0,Q[0],F),Q[1]=h(Q[0],Q[1],F);const e=z-j.current;j.current=z;const t=X.current;return t&&e&&(Q[0]=h(0,Q[0]+e,F),Q[1]=h(Q[0],Q[1]+e,F),$.current=t.nextSibling,W.current=Q[0],K.current=!0),Q}),[z,Q,F]),ie=(0,o.useMemo)((()=>w(_,(x?q.current:[]).slice(0,re).reduce(((e,t)=>e+(t-L)),re*U),ee.current)),[_,x,re,U,L]),le=(0,o.useMemo)((()=>w(_,(x?q.current:[]).slice(oe+1,F+1).reduce(((e,t)=>e+(t-L)),U*(F-oe)))),[_,x,oe,F,U,L]),se=(0,o.useMemo)((()=>{let e=null;return()=>{if(i)return i.current===document.body?document.documentElement:i.current;if(e&&e.isConnected)return e;const t=X.current;return t?(e=E(_,t.parentNode),e):null}}),[_,i]),ae=(0,o.useRef)((()=>{})),ce=(0,o.useRef)((()=>({index:-1,offset:0})));let ue;return d((()=>{ae.current=()=>{const e=se(),t=X.current,n=G.current;if(!e||!t||!n)return;const r=t.nextSibling,o=n.previousSibling,i=e.getBoundingClientRect(),l=t.getBoundingClientRect(),s=n.getBoundingClientRect(),c={[_.top]:e===document.documentElement?0:i[_.top],[_.bottom]:e===document.documentElement?document.documentElement[_.clientHeight]:i[_.bottom]},u={[_.top]:c[_.top]-V,[_.bottom]:c[_.bottom]+V};if(ee.current<0&&l[_.top]-ee.current>=u[_.top]||ee.current>0&&l[_.top]>=u[_.top]||ee.current&&J.current)return t.style[_.marginTop]="0px",e.style[_.overflowY]="hidden",e[_.scrollTop]+=-ee.current,e.style[_.overflowY]="",void(ee.current=0);if(0===L||-1===k){let e=0;if(g({fromElement:r,toElement:n,fromIndex:re,compare:t=>(e+=O(t)[_.height],!1)}),!e)return;const t=oe-re+1,o=0===L?Math.ceil(e/t):L,i=-1===k?Math.ceil((s[_.top]-l[_.bottom]-e)/t):k;return void D([o,i])}if(Z.current)return;if(J.current){const t=h(0,J.current.index,F);if(t<re||t>oe)return void Y([t-J.current.prerender,t+J.current.prerender]);const[o]=g({fromElement:r,toElement:n,fromIndex:re,compare:(e,n)=>n===t});if(!o)return;const{alignToTop:i,offset:l,delay:s}=J.current;J.current=null;const u=()=>{const t=O(o),n=i?t[_.top]-c[_.top]+l:t[_.bottom]-c[_.top]-e[_.clientHeight]+l;e[_.scrollTop]+=n,Z.current=null},m=s<0&&a?30:s;return m>0?void(Z.current=setTimeout(u,m)):void u()}if(null===ne.current)ne.current=e.scrollTop;else if(ne.current!==e.scrollTop){const t=Math.abs(e.scrollTop-ne.current);if(ne.current=e.scrollTop,P>0&&t>P)return}const d=r===n?n:r.nextSibling,f=o===t?t:o.previousSibling,p=Math.ceil((s[_.top]-l[_.bottom])/(oe+1-re)),E=l[_.bottom]>u[_.bottom],w=s[_.top]<u[_.top],M=!E&&!w&&l[_.bottom]>u[_.top],C=!E&&!w&&s[_.top]<u[_.bottom],R=!E&&!w&&(f===t?l:O(f))[_.bottom]>u[_.bottom],v=!E&&!w&&(d===n?s:O(d))[_.top]<u[_.top];let y=re,b=oe;if(E&&(y-=m(l[_.bottom],u[_.top],p),b-=m(s[_.top],u[_.bottom],p)),w&&(b+=m(s[_.top],u[_.bottom],p),y+=m(l[_.bottom],u[_.top],p)),M&&(y-=m(l[_.bottom],u[_.top],p)),C&&(b+=m(s[_.top],u[_.bottom],p)),R){const[,e]=g({fromElement:o,toElement:t,fromIndex:oe,asc:!1,compare:e=>O(e)[_.bottom]<=u[_.bottom]});-1!==e&&(b=e+1)}if(v){const[,e]=g({fromElement:r,toElement:n,fromIndex:re,compare:e=>O(e)[_.top]>=u[_.top]});-1!==e&&(y=e-1)}if(N){let[,e]=g({fromElement:r,toElement:n,fromIndex:re,compare:e=>O(e)[_.bottom]>c[_.top]});-1===e&&(e=re);let[,i]=g({fromElement:o,toElement:t,fromIndex:oe,asc:!1,compare:e=>O(e)[_.top]<c[_.bottom]});-1===i&&(i=oe),e===te.current[0]&&i===te.current[1]||(te.current=[e,i],N(te.current))}if(y=h(0,y,F),b=h(y,b,F),y!==re||b!==oe){if(y!==re)if(re>=y)$.current=r,W.current=re;else{const[e,t]=g({fromElement:r,toElement:n,fromIndex:re,compare:(e,t)=>{if(t===y)return!0;const n=O(e);return n[_.height]!==L&&(q.current[t]=n[_.height]),!1}});e?($.current=e,W.current=t):($.current=o,W.current=oe)}Y([y,b])}},ce.current=()=>{const e=se(),t=X.current,n=G.current;let r=-1,o=0;if(!e||!t||!n)return{index:r,offset:o};const i=t.nextSibling,l=e.getBoundingClientRect(),s={[_.top]:e===document.documentElement?0:l[_.top],[_.bottom]:e===document.documentElement?document.documentElement[_.clientHeight]:l[_.bottom]};return g({fromElement:i,toElement:n,fromIndex:re,compare:(e,t)=>{const n=O(e);return r=t,o=s[_.top]-n[_.top],n[_.bottom]>s[_.top]}}),{index:r,offset:o}}})),$.current&&se()&&X.current&&(ue=O($.current)[_.top]-(se()===document.documentElement?0:se().getBoundingClientRect()[_.top])),d((()=>{$.current=null;const e=W.current,t=K.current;W.current=-1,K.current=!1;const n=se(),r=X.current,o=G.current;if(-1===e||!n||!r||!o||void 0===ue||s&&"none"!==I&&!t)return;let i=null;if(e>=re&&e<=oe){const[t]=g({fromElement:r.nextSibling,toElement:o,fromIndex:re,compare:(t,n)=>n===e});t&&(i=O(t)[_.top])}else e<re?i=r.getBoundingClientRect()[_.top]+(x?q.current:[]).slice(0,e).reduce(((e,t)=>e+(t-L)),e*U):e<=F&&(i=o.getBoundingClientRect()[_.top]+(x?q.current:[]).slice(oe+1,e).reduce(((e,t)=>e+(t-L)),U*(e-1-oe)));if(null===i)return;const a=i-(n===document.documentElement?0:n.getBoundingClientRect()[_.top])-ue;return a?l?(ee.current-=a,void(r.style[_.marginTop]=`${ee.current}px`)):void(n[_.scrollTop]+=a):void 0}),[re]),d((()=>{let e;const t=()=>{e=requestAnimationFrame(t),ae.current()};return t(),()=>{cancelAnimationFrame(e),Z.current&&clearTimeout(Z.current)}}),[]),(0,o.useImperativeHandle)(H,(()=>({scrollToIndex:({index:e=-1,alignToTop:t=!0,offset:n=0,delay:r=-1,prerender:o=0})=>{J.current={index:e,alignToTop:t,offset:n,delay:r,prerender:o},ae.current()},getScrollPosition:()=>ce.current()})),[]),(0,r.jsxs)(o.Fragment,{children:[T({ref:X,style:ie,type:"top"}),(!!t||!!e.length)&&f(re,oe+1,B?n:t=>n(e[t],t,e)),T({ref:G,style:le,type:"bottom"})]})}))},30489:(e,t,n)=>{n.d(t,{h:()=>N});var r,o=n(76697),i=Object.defineProperty,l=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,c=(e,t,n)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,u=(e,t)=>{for(var n in t||(t={}))s.call(t,n)&&c(e,n,t[n]);if(l)for(var n of l(t))a.call(t,n)&&c(e,n,t[n]);return e},h=(e,t)=>{var n={};for(var r in e)s.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&l)for(var r of l(e))t.indexOf(r)<0&&a.call(e,r)&&(n[r]=e[r]);return n};(e=>{const t=class t{constructor(e,n,r,i){if(this.version=e,this.errorCorrectionLevel=n,this.modules=[],this.isFunction=[],e<t.MIN_VERSION||e>t.MAX_VERSION)throw new RangeError("Version value out of range");if(i<-1||i>7)throw new RangeError("Mask value out of range");this.size=4*e+17;let l=[];for(let t=0;t<this.size;t++)l.push(!1);for(let t=0;t<this.size;t++)this.modules.push(l.slice()),this.isFunction.push(l.slice());this.drawFunctionPatterns();const s=this.addEccAndInterleave(r);if(this.drawCodewords(s),-1==i){let e=1e9;for(let t=0;t<8;t++){this.applyMask(t),this.drawFormatBits(t);const n=this.getPenaltyScore();n<e&&(i=t,e=n),this.applyMask(t)}}o(0<=i&&i<=7),this.mask=i,this.applyMask(i),this.drawFormatBits(i),this.isFunction=[]}static encodeText(n,r){const o=e.QrSegment.makeSegments(n);return t.encodeSegments(o,r)}static encodeBinary(n,r){const o=e.QrSegment.makeBytes(n);return t.encodeSegments([o],r)}static encodeSegments(e,r,i=1,s=40,a=-1,c=!0){if(!(t.MIN_VERSION<=i&&i<=s&&s<=t.MAX_VERSION)||a<-1||a>7)throw new RangeError("Invalid value");let u,h;for(u=i;;u++){const n=8*t.getNumDataCodewords(u,r),o=l.getTotalBits(e,u);if(o<=n){h=o;break}if(u>=s)throw new RangeError("Data too long")}for(const n of[t.Ecc.MEDIUM,t.Ecc.QUARTILE,t.Ecc.HIGH])c&&h<=8*t.getNumDataCodewords(u,n)&&(r=n);let m=[];for(const t of e){n(t.mode.modeBits,4,m),n(t.numChars,t.mode.numCharCountBits(u),m);for(const e of t.getData())m.push(e)}o(m.length==h);const d=8*t.getNumDataCodewords(u,r);o(m.length<=d),n(0,Math.min(4,d-m.length),m),n(0,(8-m.length%8)%8,m),o(m.length%8==0);for(let t=236;m.length<d;t^=253)n(t,8,m);let f=[];for(;8*f.length<m.length;)f.push(0);return m.forEach(((e,t)=>f[t>>>3]|=e<<7-(7&t))),new t(u,r,f,a)}getModule(e,t){return 0<=e&&e<this.size&&0<=t&&t<this.size&&this.modules[t][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let n=0;n<this.size;n++)this.setFunctionModule(6,n,n%2==0),this.setFunctionModule(n,6,n%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),t=e.length;for(let n=0;n<t;n++)for(let r=0;r<t;r++)0==n&&0==r||0==n&&r==t-1||n==t-1&&0==r||this.drawAlignmentPattern(e[n],e[r]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const t=this.errorCorrectionLevel.formatBits<<3|e;let n=t;for(let r=0;r<10;r++)n=n<<1^1335*(n>>>9);const i=21522^(t<<10|n);o(i>>>15==0);for(let o=0;o<=5;o++)this.setFunctionModule(8,o,r(i,o));this.setFunctionModule(8,7,r(i,6)),this.setFunctionModule(8,8,r(i,7)),this.setFunctionModule(7,8,r(i,8));for(let o=9;o<15;o++)this.setFunctionModule(14-o,8,r(i,o));for(let o=0;o<8;o++)this.setFunctionModule(this.size-1-o,8,r(i,o));for(let o=8;o<15;o++)this.setFunctionModule(8,this.size-15+o,r(i,o));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let n=0;n<12;n++)e=e<<1^7973*(e>>>11);const t=this.version<<12|e;o(t>>>18==0);for(let n=0;n<18;n++){const e=r(t,n),o=this.size-11+n%3,i=Math.floor(n/3);this.setFunctionModule(o,i,e),this.setFunctionModule(i,o,e)}}drawFinderPattern(e,t){for(let n=-4;n<=4;n++)for(let r=-4;r<=4;r++){const o=Math.max(Math.abs(r),Math.abs(n)),i=e+r,l=t+n;0<=i&&i<this.size&&0<=l&&l<this.size&&this.setFunctionModule(i,l,2!=o&&4!=o)}}drawAlignmentPattern(e,t){for(let n=-2;n<=2;n++)for(let r=-2;r<=2;r++)this.setFunctionModule(e+r,t+n,1!=Math.max(Math.abs(r),Math.abs(n)))}setFunctionModule(e,t,n){this.modules[t][e]=n,this.isFunction[t][e]=!0}addEccAndInterleave(e){const n=this.version,r=this.errorCorrectionLevel;if(e.length!=t.getNumDataCodewords(n,r))throw new RangeError("Invalid argument");const i=t.NUM_ERROR_CORRECTION_BLOCKS[r.ordinal][n],l=t.ECC_CODEWORDS_PER_BLOCK[r.ordinal][n],s=Math.floor(t.getNumRawDataModules(n)/8),a=i-s%i,c=Math.floor(s/i);let u=[];const h=t.reedSolomonComputeDivisor(l);for(let o=0,d=0;o<i;o++){let n=e.slice(d,d+c-l+(o<a?0:1));d+=n.length;const r=t.reedSolomonComputeRemainder(n,h);o<a&&n.push(0),u.push(n.concat(r))}let m=[];for(let t=0;t<u[0].length;t++)u.forEach(((e,n)=>{(t!=c-l||n>=a)&&m.push(e[t])}));return o(m.length==s),m}drawCodewords(e){if(e.length!=Math.floor(t.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let n=0;for(let t=this.size-1;t>=1;t-=2){6==t&&(t=5);for(let o=0;o<this.size;o++)for(let i=0;i<2;i++){const l=t-i,s=0==(t+1&2)?this.size-1-o:o;!this.isFunction[s][l]&&n<8*e.length&&(this.modules[s][l]=r(e[n>>>3],7-(7&n)),n++)}}o(n==8*e.length)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let t=0;t<this.size;t++)for(let n=0;n<this.size;n++){let r;switch(e){case 0:r=(n+t)%2==0;break;case 1:r=t%2==0;break;case 2:r=n%3==0;break;case 3:r=(n+t)%3==0;break;case 4:r=(Math.floor(n/3)+Math.floor(t/2))%2==0;break;case 5:r=n*t%2+n*t%3==0;break;case 6:r=(n*t%2+n*t%3)%2==0;break;case 7:r=((n+t)%2+n*t%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[t][n]&&r&&(this.modules[t][n]=!this.modules[t][n])}}getPenaltyScore(){let e=0;for(let o=0;o<this.size;o++){let n=!1,r=0,i=[0,0,0,0,0,0,0];for(let l=0;l<this.size;l++)this.modules[o][l]==n?(r++,5==r?e+=t.PENALTY_N1:r>5&&e++):(this.finderPenaltyAddHistory(r,i),n||(e+=this.finderPenaltyCountPatterns(i)*t.PENALTY_N3),n=this.modules[o][l],r=1);e+=this.finderPenaltyTerminateAndCount(n,r,i)*t.PENALTY_N3}for(let o=0;o<this.size;o++){let n=!1,r=0,i=[0,0,0,0,0,0,0];for(let l=0;l<this.size;l++)this.modules[l][o]==n?(r++,5==r?e+=t.PENALTY_N1:r>5&&e++):(this.finderPenaltyAddHistory(r,i),n||(e+=this.finderPenaltyCountPatterns(i)*t.PENALTY_N3),n=this.modules[l][o],r=1);e+=this.finderPenaltyTerminateAndCount(n,r,i)*t.PENALTY_N3}for(let o=0;o<this.size-1;o++)for(let n=0;n<this.size-1;n++){const r=this.modules[o][n];r==this.modules[o][n+1]&&r==this.modules[o+1][n]&&r==this.modules[o+1][n+1]&&(e+=t.PENALTY_N2)}let n=0;for(const t of this.modules)n=t.reduce(((e,t)=>e+(t?1:0)),n);const r=this.size*this.size,i=Math.ceil(Math.abs(20*n-10*r)/r)-1;return o(0<=i&&i<=9),e+=i*t.PENALTY_N4,o(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(1==this.version)return[];{const e=Math.floor(this.version/7)+2,t=32==this.version?26:2*Math.ceil((4*this.version+4)/(2*e-2));let n=[6];for(let r=this.size-7;n.length<e;r-=t)n.splice(1,0,r);return n}}static getNumRawDataModules(e){if(e<t.MIN_VERSION||e>t.MAX_VERSION)throw new RangeError("Version number out of range");let n=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;n-=(25*t-10)*t-55,e>=7&&(n-=36)}return o(208<=n&&n<=29648),n}static getNumDataCodewords(e,n){return Math.floor(t.getNumRawDataModules(e)/8)-t.ECC_CODEWORDS_PER_BLOCK[n.ordinal][e]*t.NUM_ERROR_CORRECTION_BLOCKS[n.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let n=[];for(let t=0;t<e-1;t++)n.push(0);n.push(1);let r=1;for(let o=0;o<e;o++){for(let e=0;e<n.length;e++)n[e]=t.reedSolomonMultiply(n[e],r),e+1<n.length&&(n[e]^=n[e+1]);r=t.reedSolomonMultiply(r,2)}return n}static reedSolomonComputeRemainder(e,n){let r=n.map((e=>0));for(const o of e){const e=o^r.shift();r.push(0),n.forEach(((n,o)=>r[o]^=t.reedSolomonMultiply(n,e)))}return r}static reedSolomonMultiply(e,t){if(e>>>8!=0||t>>>8!=0)throw new RangeError("Byte out of range");let n=0;for(let r=7;r>=0;r--)n=n<<1^285*(n>>>7),n^=(t>>>r&1)*e;return o(n>>>8==0),n}finderPenaltyCountPatterns(e){const t=e[1];o(t<=3*this.size);const n=t>0&&e[2]==t&&e[3]==3*t&&e[4]==t&&e[5]==t;return(n&&e[0]>=4*t&&e[6]>=t?1:0)+(n&&e[6]>=4*t&&e[0]>=t?1:0)}finderPenaltyTerminateAndCount(e,t,n){return e&&(this.finderPenaltyAddHistory(t,n),t=0),t+=this.size,this.finderPenaltyAddHistory(t,n),this.finderPenaltyCountPatterns(n)}finderPenaltyAddHistory(e,t){0==t[0]&&(e+=this.size),t.pop(),t.unshift(e)}};t.MIN_VERSION=1,t.MAX_VERSION=40,t.PENALTY_N1=3,t.PENALTY_N2=3,t.PENALTY_N3=40,t.PENALTY_N4=10,t.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],t.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]];function n(e,t,n){if(t<0||t>31||e>>>t!=0)throw new RangeError("Value out of range");for(let r=t-1;r>=0;r--)n.push(e>>>r&1)}function r(e,t){return 0!=(e>>>t&1)}function o(e){if(!e)throw new Error("Assertion error")}e.QrCode=t;const i=class e{constructor(e,t,n){if(this.mode=e,this.numChars=t,this.bitData=n,t<0)throw new RangeError("Invalid argument");this.bitData=n.slice()}static makeBytes(t){let r=[];for(const e of t)n(e,8,r);return new e(e.Mode.BYTE,t.length,r)}static makeNumeric(t){if(!e.isNumeric(t))throw new RangeError("String contains non-numeric characters");let r=[];for(let e=0;e<t.length;){const o=Math.min(t.length-e,3);n(parseInt(t.substring(e,e+o),10),3*o+1,r),e+=o}return new e(e.Mode.NUMERIC,t.length,r)}static makeAlphanumeric(t){if(!e.isAlphanumeric(t))throw new RangeError("String contains unencodable characters in alphanumeric mode");let r,o=[];for(r=0;r+2<=t.length;r+=2){let i=45*e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(r));i+=e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(r+1)),n(i,11,o)}return r<t.length&&n(e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(r)),6,o),new e(e.Mode.ALPHANUMERIC,t.length,o)}static makeSegments(t){return""==t?[]:e.isNumeric(t)?[e.makeNumeric(t)]:e.isAlphanumeric(t)?[e.makeAlphanumeric(t)]:[e.makeBytes(e.toUtf8ByteArray(t))]}static makeEci(t){let r=[];if(t<0)throw new RangeError("ECI assignment value out of range");if(t<128)n(t,8,r);else if(t<16384)n(2,2,r),n(t,14,r);else{if(!(t<1e6))throw new RangeError("ECI assignment value out of range");n(6,3,r),n(t,21,r)}return new e(e.Mode.ECI,0,r)}static isNumeric(t){return e.NUMERIC_REGEX.test(t)}static isAlphanumeric(t){return e.ALPHANUMERIC_REGEX.test(t)}getData(){return this.bitData.slice()}static getTotalBits(e,t){let n=0;for(const r of e){const e=r.mode.numCharCountBits(t);if(r.numChars>=1<<e)return 1/0;n+=4+e+r.bitData.length}return n}static toUtf8ByteArray(e){e=encodeURI(e);let t=[];for(let n=0;n<e.length;n++)"%"!=e.charAt(n)?t.push(e.charCodeAt(n)):(t.push(parseInt(e.substring(n+1,n+3),16)),n+=2);return t}};i.NUMERIC_REGEX=/^[0-9]*$/,i.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,i.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let l=i;e.QrSegment=i})(r||(r={})),(e=>{let t;(e=>{const t=class{constructor(e,t){this.ordinal=e,this.formatBits=t}};t.LOW=new t(0,1),t.MEDIUM=new t(1,0),t.QUARTILE=new t(2,3),t.HIGH=new t(3,2);e.Ecc=t})(t=e.QrCode||(e.QrCode={}))})(r||(r={})),(e=>{let t;(e=>{const t=class{constructor(e,t){this.modeBits=e,this.numBitsCharCount=t}numCharCountBits(e){return this.numBitsCharCount[Math.floor((e+7)/17)]}};t.NUMERIC=new t(1,[10,12,14]),t.ALPHANUMERIC=new t(2,[9,11,13]),t.BYTE=new t(4,[8,16,16]),t.KANJI=new t(8,[8,10,12]),t.ECI=new t(7,[0,0,0]);e.Mode=t})(t=e.QrSegment||(e.QrSegment={}))})(r||(r={}));var m=r,d={L:m.QrCode.Ecc.LOW,M:m.QrCode.Ecc.MEDIUM,Q:m.QrCode.Ecc.QUARTILE,H:m.QrCode.Ecc.HIGH},f=128,g="L",p="#FFFFFF",E="#000000",w=!1,M=1,C=4,R=0,v=.1;function y(e,t=0){const n=[];return e.forEach((function(e,r){let o=null;e.forEach((function(i,l){if(!i&&null!==o)return n.push(`M${o+t} ${r+t}h${l-o}v1H${o+t}z`),void(o=null);if(l!==e.length-1)i&&null===o&&(o=l);else{if(!i)return;null===o?n.push(`M${l+t},${r+t} h1v1H${l+t}z`):n.push(`M${o+t},${r+t} h${l+1-o}v1H${o+t}z`)}}))})),n.join("")}function b(e,t){return e.slice().map(((e,n)=>n<t.y||n>=t.y+t.h?e:e.map(((e,n)=>(n<t.x||n>=t.x+t.w)&&e))))}function S({value:e,level:t,minVersion:n,includeMargin:r,marginSize:i,imageSettings:l,size:s}){let a=o.useMemo((()=>{const r=m.QrSegment.makeSegments(e);return m.QrCode.encodeSegments(r,d[t],n)}),[e,t,n]);const{cells:c,margin:u,numCells:h,calculatedImageSettings:f}=o.useMemo((()=>{let e=a.getModules();const t=function(e,t){return null!=t?Math.max(Math.floor(t),0):e?C:R}(r,i),n=e.length+2*t,o=function(e,t,n,r){if(null==r)return null;const o=e.length+2*n,i=Math.floor(t*v),l=o/t,s=(r.width||i)*l,a=(r.height||i)*l,c=null==r.x?e.length/2-s/2:r.x*l,u=null==r.y?e.length/2-a/2:r.y*l,h=null==r.opacity?1:r.opacity;let m=null;if(r.excavate){let e=Math.floor(c),t=Math.floor(u);m={x:e,y:t,w:Math.ceil(s+c-e),h:Math.ceil(a+u-t)}}return{x:c,y:u,h:a,w:s,excavation:m,opacity:h,crossOrigin:r.crossOrigin}}(e,s,t,l);return{cells:e,margin:t,numCells:n,calculatedImageSettings:o}}),[a,s,l,r,i]);return{qrcode:a,margin:u,cells:c,numCells:h,calculatedImageSettings:f}}var A=function(){try{(new Path2D).addPath(new Path2D)}catch(e){return!1}return!0}();o.forwardRef((function(e,t){const n=e,{value:r,size:i=f,level:l=g,bgColor:s=p,fgColor:a=E,includeMargin:c=w,minVersion:m=M,marginSize:d,imageSettings:C}=n,R=h(n,["value","size","level","bgColor","fgColor","includeMargin","minVersion","marginSize","imageSettings"]),{style:v}=R,N=h(R,["style"]),I=null==C?void 0:C.src,x=o.useRef(null),P=o.useRef(null),T=o.useCallback((e=>{x.current=e,"function"===typeof t?t(e):t&&(t.current=e)}),[t]),[z,O]=o.useState(!1),{margin:H,cells:_,numCells:B,calculatedImageSettings:F}=S({value:r,level:l,minVersion:m,includeMargin:c,marginSize:d,imageSettings:C,size:i});o.useEffect((()=>{if(null!=x.current){const e=x.current,t=e.getContext("2d");if(!t)return;let n=_;const r=P.current,o=null!=F&&null!==r&&r.complete&&0!==r.naturalHeight&&0!==r.naturalWidth;o&&null!=F.excavation&&(n=b(_,F.excavation));const l=window.devicePixelRatio||1;e.height=e.width=i*l;const c=i/B*l;t.scale(c,c),t.fillStyle=s,t.fillRect(0,0,B,B),t.fillStyle=a,A?t.fill(new Path2D(y(n,H))):_.forEach((function(e,n){e.forEach((function(e,r){e&&t.fillRect(r+H,n+H,1,1)}))})),F&&(t.globalAlpha=F.opacity),o&&t.drawImage(r,F.x+H,F.y+H,F.w,F.h)}})),o.useEffect((()=>{O(!1)}),[I]);const L=u({height:i,width:i},v);let k=null;return null!=I&&(k=o.createElement("img",{src:I,key:I,style:{display:"none"},onLoad:()=>{O(!0)},ref:P,crossOrigin:null==F?void 0:F.crossOrigin})),o.createElement(o.Fragment,null,o.createElement("canvas",u({style:L,height:i,width:i,ref:T,role:"img"},N)),k)})).displayName="QRCodeCanvas";var N=o.forwardRef((function(e,t){const n=e,{value:r,size:i=f,level:l=g,bgColor:s=p,fgColor:a=E,includeMargin:c=w,minVersion:m=M,title:d,marginSize:C,imageSettings:R}=n,v=h(n,["value","size","level","bgColor","fgColor","includeMargin","minVersion","title","marginSize","imageSettings"]),{margin:A,cells:N,numCells:I,calculatedImageSettings:x}=S({value:r,level:l,minVersion:m,includeMargin:c,marginSize:C,imageSettings:R,size:i});let P=N,T=null;null!=R&&null!=x&&(null!=x.excavation&&(P=b(N,x.excavation)),T=o.createElement("image",{href:R.src,height:x.h,width:x.w,x:x.x+A,y:x.y+A,preserveAspectRatio:"none",opacity:x.opacity,crossOrigin:x.crossOrigin}));const z=y(P,A);return o.createElement("svg",u({height:i,width:i,viewBox:`0 0 ${I} ${I}`,ref:t,role:"img"},v),!!d&&o.createElement("title",null,d),o.createElement("path",{fill:s,d:`M0,0 h${I}v${I}H0z`,shapeRendering:"crispEdges"}),o.createElement("path",{fill:a,d:z,shapeRendering:"crispEdges"}),T)}));N.displayName="QRCodeSVG"}}]);