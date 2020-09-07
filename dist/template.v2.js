(function(n,e){'object'==typeof exports&&'undefined'!=typeof module?e():'function'==typeof define&&define.amd?define(e):e()})(this,function(){'use strict';function fo(n,a){n.title=a.title,a.published&&(a.published instanceof Date?n.publishedDate=a.published:a.published.constructor===String&&(n.publishedDate=new Date(a.published))),a.publishedDate&&(a.publishedDate instanceof Date?n.publishedDate=a.publishedDate:a.publishedDate.constructor===String?n.publishedDate=new Date(a.publishedDate):console.error('Don\'t know what to do with published date: '+a.publishedDate)),n.description=a.description,n.authors=a.authors.map((t)=>new vi(t)),n.katex=a.katex,n.password=a.password,n.url=a.url,a.doi&&(n.doi=a.doi)}function ho(a=document){const i=new Set,e=a.querySelectorAll('d-cite');for(const t of e){const a=t.getAttribute('key')||t.getAttribute('bibtex-key'),d=a.split(',').map((t)=>t.trim());for(const t of d)i.add(t)}return[...i]}function bo(o,l,e,t){if(null==o.author)return'';var i=o.author.split(' and ');let a=i.map((t)=>{if(t=t.trim(),-1!=t.indexOf(','))var e=t.split(',')[0].trim(),n=t.split(',')[1];else if(-1!=t.indexOf(' '))var e=t.split(' ').slice(-1)[0].trim(),n=t.split(' ').slice(0,-1).join(' ');else var e=t.trim();var i='';return void 0!=n&&(i=n.trim().split(' ').map((t)=>t.trim()[0]),i=i.join('.')+'.'),l.replace('${F}',n).replace('${L}',e).replace('${I}',i).trim()});if(1<i.length){var d=a.slice(0,i.length-1).join(e);return d+=(t||e)+a[i.length-1],d}return a[0]}function n(a){var e=a.journal||a.booktitle||'';if('volume'in a){var t=a.issue||a.number;t=void 0==t?'':'('+t+')',e+=', Vol '+a.volume+t}return'pages'in a&&(e+=', pp. '+a.pages),''!=e&&(e+='. '),'publisher'in a&&(e+=a.publisher,'.'!=e[e.length-1]&&(e+='.')),e}function i(a){if('url'in a){var e=a.url,t=/arxiv\.org\/abs\/([0-9\.]*)/.exec(e);if(null!=t&&(e=`http://arxiv.org/pdf/${t[1]}.pdf`),'.pdf'==e.slice(-4))var n='PDF';else if('.html'==e.slice(-5))var n='HTML';return` &ensp;<a href="${e}">[${n||'link'}]</a>`}return''}function a(n,e){return'doi'in n?`${e?'<br>':''} <a href="https://doi.org/${n.doi}" style="text-decoration:inherit;">DOI: ${n.doi}</a>`:''}function d(t){return'<span class="title">'+t.title+'</span> '}function r(r){if(r){var e=d(r);return e+=i(r)+'<br>',r.author&&(e+=bo(r,'${L}, ${I}',', ',' and '),(r.year||r.date)&&(e+=', ')),e+=r.year||r.date?(r.year||r.date)+'. ':'. ',e+=n(r),e+=a(r),e}return'?'}function t(d){if(d){var e='';e+='<strong>'+d.title+'</strong>',e+=i(d),e+='<br>';var t=bo(d,'${I} ${L}',', ')+'.',r=n(d).trim()+' '+d.year+'. '+a(d,!0);return e+=(t+r).length<fi(40,d.title.length)?t+' '+r:t+'<br>'+r,e}return'?'}function o(){return-1!==['interactive','complete'].indexOf(document.readyState)}function l(n){for(let a of n.authors){const t=!!a.affiliation,e=!!a.affiliations;if(t)if(e)console.warn(`Author ${a.author} has both old-style ("affiliation" & "affiliationURL") and new style ("affiliations") affiliation information!`);else{let t={name:a.affiliation};a.affiliationURL&&(t.url=a.affiliationURL),a.affiliations=[t]}}return n}function s(n){const a=n.firstElementChild;if(a){const t=a.getAttribute('type');if('json'==t.split('/')[1]){const t=a.textContent,e=JSON.parse(t);return l(e)}console.error('Distill only supports JSON frontmatter tags anymore; no more YAML.')}else console.error('You added a frontmatter tag but did not provide a script tag with front matter data in it. Please take a look at our templates.');return{}}function c(d){const e='distill-prerendered-styles',t=d.getElementById(e);if(!t){const t=d.createElement('style');t.id=e,t.type='text/css';const n=d.createTextNode(Hi);t.appendChild(n);const i=d.head.querySelector('script');d.head.insertBefore(t,i)}}function e(a,e){console.debug('Runlevel 0: Polyfill required: '+a.name);const t=document.createElement('script');t.src=a.url,t.async=!1,e&&(t.onload=function(){e(a)}),t.onerror=function(){new Error('Runlevel 0: Polyfills failed to load script '+a.name)},document.head.appendChild(t)}function u(n,e){return e={exports:{}},n(e,e.exports),e.exports}function p(t){return t.replace(/[\t\n ]+/g,' ').replace(/{\\["^`.'acu~Hvs]( )?([a-zA-Z])}/g,(a,e,t)=>t).replace(/{\\([a-zA-Z])}/g,(n,e)=>e)}function g(a){const e=new Map,t=_l.toJSON(a);for(const n of t){for(const[a,e]of Object.entries(n.entryTags))n.entryTags[a.toLowerCase()]=p(e);n.entryTags.type=n.entryType,e.set(n.citationKey,n.entryTags)}return e}function f(t){return`@article{${t.slug},
  author = {${t.bibtexAuthors}},
  title = {${t.title}},
  year = {${t.publishedYear}},
  note = {${t.url}},
}`}function h(t){return`
  <div class="byline grid">
    <div class="authors-affiliations grid">
      <h3>Authors</h3>
      <h3>Affiliations</h3>
      ${t.authors.map((t)=>`
        <p class="author">
          ${t.personalURL?`
            <a class="name" href="${t.personalURL}">${t.name}</a>`:`
            <span class="name">${t.name}</span>`}
        </p>
        <p class="affiliation">
        ${t.affiliations.map((t)=>t.url?`<a class="affiliation" href="${t.url}">${t.name}</a>`:`<span class="affiliation">${t.name}</span>`).join(', ')}
        </p>
      `).join('')}
    </div>
    <div>
      <h3>Published</h3>
      ${t.publishedDate?`
        <p>${t.publishedMonth} ${t.publishedDay}, ${t.publishedYear}</p> `:`
        <p><em>Not published yet.</em></p>`}
    </div>
    <!--
    <div>
      <h3>DOI</h3>
      ${t.doi?`
        <p><a href="https://doi.org/${t.doi}">${t.doi}</a></p>`:`
        <p><em>No DOI yet.</em></p>`}
    </div>
    -->
  </div>
`}function b(d,o,l=document){if(0<o.size){d.style.display='';let n=d.querySelector('.references');if(n)n.innerHTML='';else{const e=l.createElement('style');e.innerHTML=ea,d.appendChild(e);const t=l.createElement('h3');t.id='references',t.textContent='References',d.appendChild(t),n=l.createElement('ol'),n.id='references-list',n.className='references',d.appendChild(n)}for(const[i,e]of o){const a=l.createElement('li');a.id=i,a.innerHTML=r(e),n.appendChild(a)}}else d.style.display='none'}function m(a,e){let o=`
  <style>

  d-toc {
    contain: layout style;
    display: block;
  }

  d-toc ul {
    padding-left: 0;
  }

  d-toc ul > ul {
    padding-left: 24px;
  }

  d-toc a {
    border-bottom: none;
    text-decoration: none;
  }

  </style>
  <nav role="navigation" class="table-of-contents"></nav>
  <h2>Table of contents</h2>
  <ul>`;for(const n of e){const i='D-TITLE'==n.parentElement.tagName,e=n.getAttribute('no-toc');if(i||e)continue;const t=n.textContent,a='#'+n.getAttribute('id');let d='<li><a href="'+a+'">'+t+'</a></li>';'H3'==n.tagName?d='<ul>'+d+'</ul>':d+='<br>',o+=d}o+='</ul></nav>',a.innerHTML=o}function y(a){return function(e,t){return ya(a(e),t)}}function x(r,e,t){var n=(e-r)/ci(0,t),i=gi(si(n)/li),o=n/oi(10,i);return 0<=i?(o>=wa?10:o>=Ca?5:o>=Sa?2:1)*oi(10,i):-oi(10,-i)/(o>=wa?10:o>=Ca?5:o>=Sa?2:1)}function k(r,e,t){var n=ri(e-r)/ci(0,t),i=oi(10,gi(si(n)/li)),o=n/i;return o>=wa?i*=10:o>=Ca?i*=5:o>=Sa&&(i*=2),e<r?-i:i}function v(a,e){var t=Object.create(a.prototype);for(var n in e)t[n]=e[n];return t}function w(){}function S(){return this.rgb().formatHex()}function _(){return this.rgb().formatRgb()}function L(a){var e,t;return a=(a+'').trim().toLowerCase(),(e=Ua.exec(a))?(t=e[1].length,e=parseInt(e[1],16),6===t?O(e):3===t?new R(15&e>>8|240&e>>4,15&e>>4|240&e,(15&e)<<4|15&e,1):8===t?new R(255&e>>24,255&e>>16,255&e>>8,(255&e)/255):4===t?new R(15&e>>12|240&e>>8,15&e>>8|240&e>>4,15&e>>4|240&e,((15&e)<<4|15&e)/255):null):(e=Oa.exec(a))?new R(e[1],e[2],e[3],1):(e=Ia.exec(a))?new R(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=Na.exec(a))?I(e[1],e[2],e[3],e[4]):(e=ja.exec(a))?I(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=Ra.exec(a))?F(e[1],e[2]/100,e[3]/100,1):(e=qa.exec(a))?F(e[1],e[2]/100,e[3]/100,e[4]):Ha.hasOwnProperty(a)?O(Ha[a]):'transparent'===a?new R(NaN,NaN,NaN,0):null}function O(t){return new R(255&t>>16,255&t>>8,255&t,1)}function I(a,e,t,n){return 0>=n&&(a=e=t=NaN),new R(a,e,t,n)}function N(t){return(t instanceof w||(t=L(t)),!t)?new R:(t=t.rgb(),new R(t.r,t.g,t.b,t.opacity))}function j(a,e,t,n){return 1===arguments.length?N(a):new R(a,e,t,null==n?1:n)}function R(a,d,r,o){this.r=+a,this.g=+d,this.b=+r,this.opacity=+o}function q(){return'#'+yo(this.r)+yo(this.g)+yo(this.b)}function mo(){var t=this.opacity;return t=isNaN(t)?1:ci(0,fi(1,t)),(1===t?'rgb(':'rgba(')+ci(0,fi(255,pi(this.r)||0))+', '+ci(0,fi(255,pi(this.g)||0))+', '+ci(0,fi(255,pi(this.b)||0))+(1===t?')':', '+t+')')}function yo(t){return t=ci(0,fi(255,pi(t)||0)),(16>t?'0':'')+t.toString(16)}function F(a,e,t,n){return 0>=n?a=e=t=NaN:0>=t||1<=t?a=e=NaN:0>=e&&(a=NaN),new Y(a,e,t,n)}function z(o){if(o instanceof Y)return new Y(o.h,o.s,o.l,o.opacity);if(o instanceof w||(o=L(o)),!o)return new Y;if(o instanceof Y)return o;o=o.rgb();var l=o.r/255,t=o.g/255,n=o.b/255,i=fi(l,t,n),a=ci(l,t,n),d=NaN,r=a-i,c=(a+i)/2;return r?(d=l===a?(t-n)/r+6*(t<n):t===a?(n-l)/r+2:(l-t)/r+4,r/=0.5>c?a+i:2-a-i,d*=60):r=0<c&&1>c?0:d,new Y(d,r,c,o.opacity)}function Y(a,d,r,o){this.h=+a,this.s=+d,this.l=+r,this.opacity=+o}function W(a,e,t){return 255*(60>a?e+(t-e)*a/60:180>a?t:240>a?e+(t-e)*(240-a)/60:e)}function V(o){if(o instanceof $)return new $(o.l,o.a,o.b,o.opacity);if(o instanceof ee)return te(o);o instanceof R||(o=N(o));var e,t,n=J(o.r),i=J(o.g),a=J(o.b),d=Q((0.2225045*n+0.7168786*i+0.0606169*a)/K);return n===i&&i===a?e=t=d:(e=Q((0.4360747*n+0.3850649*i+0.1430804*a)/Ya),t=Q((0.0139322*n+0.0971045*i+0.7141733*a)/Xn)),new $(116*d-16,500*(e-d),200*(d-t),o.opacity)}function $(a,d,r,o){this.l=+a,this.a=+d,this.b=+r,this.opacity=+o}function Q(t){return t>Wa?oi(t,1/3):t/Ba+Yn}function X(t){return t>Zn?t*t*t:Ba*(t-Yn)}function Z(t){return 255*(0.0031308>=t?12.92*t:1.055*oi(t,1/2.4)-0.055)}function J(t){return 0.04045>=(t/=255)?t/12.92:oi((t+0.055)/1.055,2.4)}function G(n){if(n instanceof ee)return new ee(n.h,n.c,n.l,n.opacity);if(n instanceof $||(n=V(n)),0===n.a&&0===n.b)return new ee(NaN,0<n.l&&100>n.l?0:NaN,n.l,n.opacity);var e=ai(n.b,n.a)*Fa;return new ee(0>e?e+360:e,ii(n.a*n.a+n.b*n.b),n.l,n.opacity)}function ee(a,d,r,o){this.h=+a,this.c=+d,this.l=+r,this.opacity=+o}function te(n){if(isNaN(n.h))return new $(n.l,0,0,n.opacity);var e=n.h*Pa;return new $(n.l,ni(e)*n.c,ti(e)*n.c,n.opacity)}function ne(s){if(s instanceof ae)return new ae(s.h,s.s,s.l,s.opacity);s instanceof R||(s=N(s));var e=s.r/255,t=s.g/255,n=s.b/255,i=(Ka*n+D*e-E*t)/(Ka+D-E),a=n-i,d=(C*(t-i)-A*a)/B,r=ii(d*d+a*a)/(C*i*(1-i)),o=r?ai(d,a)*Fa-120:NaN;return new ae(0>o?o+360:o,r,i,s.opacity)}function ie(a,e,t,n){return 1===arguments.length?ne(a):new ae(a,e,t,null==n?1:n)}function ae(a,d,r,o){this.h=+a,this.s=+d,this.l=+r,this.opacity=+o}function de(t,e){return function(n){return t+n*e}}function oe(t,e,n){return t=oi(t,n),e=oi(e,n)-t,n=1/n,function(i){return oi(t+i*e,n)}}function le(a){return 1==(a=+a)?se:function(e,t){return t-e?oe(e,t,a):Qa(isNaN(e)?t:e)}}function se(a,e){var t=e-a;return t?de(a,t):Qa(isNaN(a)?e:a)}function ce(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function ue(o,e){var t,n=e?e.length:0,i=o?fi(n,o.length):0,a=Array(i),d=Array(n);for(t=0;t<i;++t)a[t]=ad(o[t],e[t]);for(;t<n;++t)d[t]=e[t];return function(n){for(t=0;t<i;++t)d[t]=a[t](n);return d}}function pe(t){return function(){return t}}function ge(t){return function(e){return t(e)+''}}function fe(l){return function e(t){function a(n,e){var s=l((n=ie(n)).h,(e=ie(e)).h),a=se(n.s,e.s),d=se(n.l,e.l),r=se(n.opacity,e.opacity);return function(i){return n.h=s(i),n.s=a(i),n.l=d(oi(i,t)),n.opacity=r(i),n+''}}return t=+t,a.gamma=e,a}(1)}function he(a,i){return(i-=a=+a)?function(e){return(e-a)/i}:od(i)}function be(a){return function(d,r){var o=a(d=+d,r=+r);return function(t){return t<=d?0:t>=r?1:o(t)}}}function me(t){return function(a,r){var o=t(a=+a,r=+r);return function(t){return 0>=t?a:1<=t?r:o(t)}}}function ye(l,e,t,n){var i=l[0],a=l[1],d=e[0],r=e[1];return a<i?(i=t(a,i),d=n(r,d)):(i=t(i,a),d=n(d,r)),function(t){return d(i(t))}}function xe(i,e,t,n){var a=fi(i.length,e.length)-1,o=Array(a),l=Array(a),d=-1;for(i[a]<i[0]&&(i=i.slice().reverse(),e=e.slice().reverse());++d<a;)o[d]=t(i[d],i[d+1]),l[d]=n(e[d],e[d+1]);return function(e){var t=ka(i,e,1,a)-1;return l[t](o[t](e))}}function ke(n,e){return e.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp())}function ve(u,p){function t(){return n=2<fi(d.length,r.length)?xe:ye,a=i=null,e}function e(e){return(a||(a=n(d,r,l?be(u):u,o)))(+e)}var n,a,i,d=ld,r=ld,o=ad,l=!1;return e.invert=function(t){return(i||(i=n(r,d,he,l?me(p):p)))(+t)},e.domain=function(n){return arguments.length?(d=map.call(n,number),t()):d.slice()},e.range=function(n){return arguments.length?(r=slice.call(n),t()):r.slice()},e.rangeRound=function(n){return r=slice.call(n),interpolate=dd,t()},e.clamp=function(n){return arguments.length?(l=!!n,t()):l},e.interpolate=function(n){return arguments.length?(interpolate=n,t()):o},t()}function we(n){if(!(e=gd.exec(n)))throw new Error('invalid format: '+n);var e;return new Ce({fill:e[1],align:e[2],sign:e[3],symbol:e[4],zero:e[5],width:e[6],comma:e[7],precision:e[8]&&e[8].slice(1),trim:e[9],type:e[10]})}function Ce(t){this.fill=void 0===t.fill?' ':t.fill+'',this.align=void 0===t.align?'>':t.align+'',this.sign=void 0===t.sign?'-':t.sign+'',this.symbol=void 0===t.symbol?'':t.symbol+'',this.zero=!!t.zero,this.width=void 0===t.width?void 0:+t.width,this.comma=!!t.comma,this.precision=void 0===t.precision?void 0:+t.precision,this.trim=!!t.trim,this.type=void 0===t.type?'':t.type+''}function Se(s){var c=s.domain;return s.ticks=function(t){var e=c();return Ta(e[0],e[e.length-1],null==t?10:t)},s.tickFormat=function(t,e){return Ld(c(),t,e)},s.nice=function(e){null==e&&(e=10);var t,n=c(),a=0,i=n.length-1,d=n[a],r=n[i];return r<d&&(t=d,d=r,r=t,t=a,a=i,i=t),t=x(d,r,e),0<t?(d=gi(d/t)*t,r=ui(r/t)*t,t=x(d,r,e)):0>t&&(d=ui(d*t)/t,r=gi(r*t)/t,t=x(d,r,e)),0<t?(n[a]=gi(d/t)*t,n[i]=ui(r/t)*t,c(n)):0>t&&(n[a]=ui(d*t)/t,n[i]=gi(r*t)/t,c(n)),s},s}function Te(){var t=ve(he,Ga);return t.copy=function(){return ke(t,Te())},Se(t)}function _e(l,s,e,n){function c(e){return l(e=0===arguments.length?new Date:new Date(+e)),e}return c.floor=function(e){return l(e=new Date(+e)),e},c.ceil=function(e){return l(e=new Date(e-1)),s(e,1),l(e),e},c.round=function(a){var e=c(a),t=c.ceil(a);return a-e<t-a?e:t},c.offset=function(t,a){return s(t=new Date(+t),null==a?1:gi(a)),t},c.range=function(e,t,a){var i,d=[];if(e=c.ceil(e),a=null==a?1:gi(a),!(e<t)||!(0<a))return d;do d.push(i=new Date(+e)),s(e,a),l(e);while(i<e&&e<t);return d},c.filter=function(a){return _e(function(e){if(e>=e)for(;l(e),!a(e);)e.setTime(e-1)},function(t,e){if(t>=t)if(0>e)for(;0>=++e;)for(;s(t,-1),!a(t););else for(;0<=--e;)for(;s(t,1),!a(t););})},e&&(c.count=function(n,a){return Yn.setTime(+n),Zn.setTime(+a),l(Yn),l(Zn),gi(e(Ad,Ed))},c.every=function(a){return a=gi(a),isFinite(a)&&0<a?1<a?c.filter(n?function(e){return 0==n(e)%a}:function(e){return 0==c.count(0,e)%a}):c:null}),c}function Le(n){return _e(function(e){e.setDate(e.getDate()-(e.getDay()+7-n)%7),e.setHours(0,0,0,0)},function(n,e){n.setDate(n.getDate()+7*e)},function(n,e){return(e-n-(e.getTimezoneOffset()-n.getTimezoneOffset())*Ud)/Nd})}function Ae(n){return _e(function(e){e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-n)%7),e.setUTCHours(0,0,0,0)},function(n,e){n.setUTCDate(n.getUTCDate()+7*e)},function(n,e){return(e-n)/Nd})}function Ee(n){if(0<=n.y&&100>n.y){var e=new Date(-1,n.m,n.d,n.H,n.M,n.S,n.L);return e.setFullYear(n.y),e}return new Date(n.y,n.m,n.d,n.H,n.M,n.S,n.L)}function De(n){if(0<=n.y&&100>n.y){var e=new Date(Date.UTC(-1,n.m,n.d,n.H,n.M,n.S,n.L));return e.setUTCFullYear(n.y),e}return new Date(Date.UTC(n.y,n.m,n.d,n.H,n.M,n.S,n.L))}function Me(a,i,d){return{y:a,m:i,d:d,H:0,M:0,S:0,L:0}}function Ue(T){function _(n,e){return function(t){var u,d,r,o=[],l=-1,s=0,i=n.length;for(t instanceof Date||(t=new Date(+t));++l<i;)37===n.charCodeAt(l)&&(o.push(n.slice(s,l)),null==(d=cr[u=n.charAt(++l)])?d='e'===u?' ':'0':u=n.charAt(++l),(r=e[u])&&(u=r(t,d)),o.push(u),s=l+1);return o.push(n.slice(s,l)),o.join('')}}function L(a,e){return function(t){var n,i,r=Me(1900,void 0,1),o=A(r,a,t+='',0);if(o!=t.length)return null;if('Q'in r)return new Date(r.Q);if('s'in r)return new Date(1e3*r.s+('L'in r?r.L:0));if(e&&!('Z'in r)&&(r.Z=0),'p'in r&&(r.H=r.H%12+12*r.p),void 0===r.m&&(r.m='q'in r?r.q:0),'V'in r){if(1>r.V||53<r.V)return null;'w'in r||(r.w=1),'Z'in r?(n=De(Me(r.y,0,1)),Hd=n.getUTCDay(),n=4<i||0===i?Gd.ceil(n):Gd(n),n=Zd.offset(n,7*(r.V-1)),r.y=n.getUTCFullYear(),r.m=n.getUTCMonth(),r.d=n.getUTCDate()+(r.w+6)%7):(n=Ee(Me(r.y,0,1)),Hd=n.getDay(),n=4<i||0===i?Fd.ceil(n):Fd(n),n=Hd.offset(n,7*(r.V-1)),r.y=n.getFullYear(),r.m=n.getMonth(),r.d=n.getDate()+(r.w+6)%7)}else('W'in r||'U'in r)&&('w'in r||(r.w='u'in r?r.u%7:'W'in r?1:0),i='Z'in r?De(Me(r.y,0,1)).getUTCDay():Ee(Me(r.y,0,1)).getDay(),r.m=0,r.d='W'in r?(r.w+6)%7+7*r.W-(i+5)%7:r.w+7*r.U-(i+6)%7);return'Z'in r?(r.H+=0|r.Z/100,r.M+=r.Z%100,De(r)):Ee(r)}}function A(s,e,t,c){for(var d,r,u=0,l=e.length,i=t.length;u<l;){if(c>=i)return-1;if(d=e.charCodeAt(u++),37===d){if(d=e.charAt(u++),r=v[d in cr?e.charAt(u++):d],!r||0>(c=r(s,t,c)))return-1;}else if(d!=t.charCodeAt(c++))return-1}return c}var a=T.dateTime,r=T.date,o=T.time,t=T.periods,n=T.days,i=T.shortDays,l=T.months,s=T.shortMonths,c=Ne(t),u=je(t),p=Ne(n),g=je(n),f=Ne(i),h=je(i),b=Ne(l),m=je(l),y=Ne(s),x=je(s),k={a:function(t){return i[t.getDay()]},A:function(t){return n[t.getDay()]},b:function(t){return s[t.getMonth()]},B:function(t){return l[t.getMonth()]},c:null,d:Ho,e:Ho,f:Yo,H:Po,I:jo,j:Fo,L:zo,m:Bo,M:Wo,p:function(n){return t[+(12<=n.getHours())]},q:function(t){return 1+~~(t.getMonth()/3)},Q:xl,s:kl,S:Vo,u:$o,U:Ko,V:Qo,w:Xo,W:Zo,x:null,X:null,y:Jo,Y:Go,Z:el,"%":yl},d={a:function(t){return i[t.getUTCDay()]},A:function(t){return n[t.getUTCDay()]},b:function(t){return s[t.getUTCMonth()]},B:function(t){return l[t.getUTCMonth()]},c:null,d:tl,e:tl,f:rl,H:nl,I:al,j:il,L:dl,m:ol,M:ll,p:function(n){return t[+(12<=n.getUTCHours())]},q:function(t){return 1+~~(t.getUTCMonth()/3)},Q:xl,s:kl,S:sl,u:cl,U:ul,V:pl,w:gl,W:fl,x:null,X:null,y:hl,Y:bl,Z:ml,"%":yl},v={a:function(n,e,t){var a=f.exec(e.slice(t));return a?(n.w=h[a[0].toLowerCase()],t+a[0].length):-1},A:function(n,e,t){var a=p.exec(e.slice(t));return a?(n.w=g[a[0].toLowerCase()],t+a[0].length):-1},b:function(n,e,t){var a=y.exec(e.slice(t));return a?(n.m=x[a[0].toLowerCase()],t+a[0].length):-1},B:function(n,e,t){var a=b.exec(e.slice(t));return a?(n.m=m[a[0].toLowerCase()],t+a[0].length):-1},c:function(i,e,t){return A(i,a,e,t)},d:Ao,e:Ao,f:Io,H:Do,I:Do,j:Eo,L:Oo,m:Lo,M:Mo,p:function(n,e,t){var a=c.exec(e.slice(t));return a?(n.p=u[a[0].toLowerCase()],t+a[0].length):-1},q:_o,Q:Ro,s:qo,S:Uo,u:xo,U:ko,V:vo,w:Re,W:wo,x:function(a,e,t){return A(a,r,e,t)},X:function(a,e,t){return A(a,o,e,t)},y:So,Y:Co,Z:To,"%":No};return k.x=_(r,k),k.X=_(o,k),k.c=_(a,k),d.x=_(r,d),d.X=_(o,d),d.c=_(a,d),{format:function(t){var e=_(t+='',k);return e.toString=function(){return t},e},parse:function(n){var e=L(n+='',!1);return e.toString=function(){return n},e},utcFormat:function(t){var e=_(t+='',d);return e.toString=function(){return t},e},utcParse:function(n){var e=L(n+='',!0);return e.toString=function(){return n},e}}}function Oe(r,o,t){var n=0>r?'-':'',i=(n?-r:r)+'',a=i.length;return n+(a<t?Array(t-a+1).join(o)+i:i)}function Ie(t){return t.replace(gr,'\\$&')}function Ne(t){return new RegExp('^(?:'+t.map(Ie).join('|')+')','i')}function je(n){for(var e={},t=-1,a=n.length;++t<a;)e[n[t].toLowerCase()]=t;return e}function Re(n,e,t){var a=ur.exec(e.slice(t,t+1));return a?(n.w=+a[0],t+a[0].length):-1}function xo(n,e,t){var a=ur.exec(e.slice(t,t+1));return a?(n.u=+a[0],t+a[0].length):-1}function ko(n,e,t){var a=ur.exec(e.slice(t,t+2));return a?(n.U=+a[0],t+a[0].length):-1}function vo(n,e,t){var a=ur.exec(e.slice(t,t+2));return a?(n.V=+a[0],t+a[0].length):-1}function wo(n,e,t){var a=ur.exec(e.slice(t,t+2));return a?(n.W=+a[0],t+a[0].length):-1}function Co(n,e,t){var a=ur.exec(e.slice(t,t+4));return a?(n.y=+a[0],t+a[0].length):-1}function So(n,e,t){var a=ur.exec(e.slice(t,t+2));return a?(n.y=+a[0]+(68<+a[0]?1900:2e3),t+a[0].length):-1}function To(n,e,t){var a=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(t,t+6));return a?(n.Z=a[1]?0:-(a[2]+(a[3]||'00')),t+a[0].length):-1}function _o(n,e,t){var a=ur.exec(e.slice(t,t+1));return a?(n.q=3*a[0]-3,t+a[0].length):-1}function Lo(n,e,t){var a=ur.exec(e.slice(t,t+2));return a?(n.m=a[0]-1,t+a[0].length):-1}function Ao(n,e,t){var a=ur.exec(e.slice(t,t+2));return a?(n.d=+a[0],t+a[0].length):-1}function Eo(n,e,t){var a=ur.exec(e.slice(t,t+3));return a?(n.m=0,n.d=+a[0],t+a[0].length):-1}function Do(n,e,t){var a=ur.exec(e.slice(t,t+2));return a?(n.H=+a[0],t+a[0].length):-1}function Mo(n,e,t){var a=ur.exec(e.slice(t,t+2));return a?(n.M=+a[0],t+a[0].length):-1}function Uo(n,e,t){var a=ur.exec(e.slice(t,t+2));return a?(n.S=+a[0],t+a[0].length):-1}function Oo(n,e,t){var a=ur.exec(e.slice(t,t+3));return a?(n.L=+a[0],t+a[0].length):-1}function Io(n,e,t){var a=ur.exec(e.slice(t,t+6));return a?(n.L=gi(a[0]/1e3),t+a[0].length):-1}function No(n,e,t){var a=pr.exec(e.slice(t,t+1));return a?t+a[0].length:-1}function Ro(n,e,t){var a=ur.exec(e.slice(t));return a?(n.Q=+a[0],t+a[0].length):-1}function qo(n,e,t){var a=ur.exec(e.slice(t));return a?(n.s=+a[0],t+a[0].length):-1}function Ho(n,e){return Oe(n.getDate(),e,2)}function Po(n,e){return Oe(n.getHours(),e,2)}function jo(n,e){return Oe(n.getHours()%12||12,e,2)}function Fo(n,e){return Oe(1+Hd.count(Kd(n),n),e,3)}function zo(n,e){return Oe(n.getMilliseconds(),e,3)}function Yo(n,e){return zo(n,e)+'000'}function Bo(n,e){return Oe(n.getMonth()+1,e,2)}function Wo(n,e){return Oe(n.getMinutes(),e,2)}function Vo(n,e){return Oe(n.getSeconds(),e,2)}function $o(n){var e=n.getDay();return 0===e?7:e}function Ko(n,e){return Oe(Pd.count(Kd(n)-1,n),e,2)}function Qo(a,e){var t=a.getDay();return a=4<=t||0===t?Bd(a):Bd.ceil(a),Oe(Bd.count(Kd(a),a)+(4===Kd(a).getDay()),e,2)}function Xo(t){return t.getDay()}function Zo(n,e){return Oe(Fd.count(Kd(n)-1,n),e,2)}function Jo(n,e){return Oe(n.getFullYear()%100,e,2)}function Go(n,e){return Oe(n.getFullYear()%1e4,e,4)}function el(n){var e=n.getTimezoneOffset();return(0<e?'-':(e*=-1,'+'))+Oe(0|e/60,'0',2)+Oe(e%60,'0',2)}function tl(n,e){return Oe(n.getUTCDate(),e,2)}function nl(n,e){return Oe(n.getUTCHours(),e,2)}function al(n,e){return Oe(n.getUTCHours()%12||12,e,2)}function il(n,e){return Oe(1+Zd.count(rr(n),n),e,3)}function dl(n,e){return Oe(n.getUTCMilliseconds(),e,3)}function rl(n,e){return dl(n,e)+'000'}function ol(n,e){return Oe(n.getUTCMonth()+1,e,2)}function ll(n,e){return Oe(n.getUTCMinutes(),e,2)}function sl(n,e){return Oe(n.getUTCSeconds(),e,2)}function cl(n){var e=n.getUTCDay();return 0===e?7:e}function ul(n,e){return Oe(Jd.count(rr(n)-1,n),e,2)}function pl(a,e){var t=a.getUTCDay();return a=4<=t||0===t?nr(a):nr.ceil(a),Oe(nr.count(rr(a),a)+(4===rr(a).getUTCDay()),e,2)}function gl(t){return t.getUTCDay()}function fl(n,e){return Oe(Gd.count(rr(n)-1,n),e,2)}function hl(n,e){return Oe(n.getUTCFullYear()%100,e,2)}function bl(n,e){return Oe(n.getUTCFullYear()%1e4,e,4)}function ml(){return'+0000'}function yl(){return'%'}function xl(t){return+t}function kl(t){return gi(+t/1e3)}function vl(t){var e=t.length;return function(a){return t[ci(0,fi(e-1,gi(a*e)))]}}function Ft(){for(var a,e=0,t=arguments.length,i={};e<t;++e){if(!(a=arguments[e]+'')||a in i||/[\s.]/.test(a))throw new Error('illegal type: '+a);i[a]=[]}return new zt(i)}function zt(t){this._=t}function wl(t,i){return t.trim().split(/^|\s+/).map(function(t){var n='',r=t.indexOf('.');if(0<=r&&(n=t.slice(r+1),t=t.slice(0,r)),t&&!i.hasOwnProperty(t))throw new Error('unknown type: '+t);return{type:t,name:n}})}function Bt(n,e){for(var t,a=0,d=n.length;a<d;++a)if((t=n[a]).name===e)return t.value}function Wt(n,e,r){for(var o=0,d=n.length;o<d;++o)if(n[o].name===e){n[o]=Sr,n=n.slice(0,o).concat(n.slice(o+1));break}return null!=r&&n.push({name:e,value:r}),n}function Vt(a){return function(){var e=this.ownerDocument,t=this.namespaceURI;return t===Tr&&e.documentElement.namespaceURI===Tr?e.createElement(a):e.createElementNS(t,a)}}function $t(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function Kt(){}function Qt(){return[]}function Xt(n,e){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=e}function Cl(c,e,t,n,a,d){for(var r,o=0,l=e.length,i=d.length;o<i;++o)(r=e[o])?(r.__data__=d[o],n[o]=r):t[o]=new Xt(c,d[o]);for(;o<l;++o)(r=e[o])&&(a[o]=r)}function Jt(f,e,t,n,a,d,r){var o,l,i,s={},c=e.length,u=d.length,p=Array(c);for(o=0;o<c;++o)(l=e[o])&&(p[o]=i=Ir+r.call(l,l.__data__,o,e),i in s?a[o]=l:s[i]=l);for(o=0;o<u;++o)i=Ir+r.call(f,d[o],o,d),(l=s[i])?(n[o]=l,l.__data__=d[o],s[i]=null):t[o]=new Xt(f,d[o]);for(o=0;o<c;++o)(l=e[o])&&s[p[o]]===l&&(a[o]=l)}function Gt(n,e){return n<e?-1:n>e?1:n>=e?0:NaN}function en(t){return function(){this.removeAttribute(t)}}function tn(t){return function(){this.removeAttributeNS(t.space,t.local)}}function nn(n,e){return function(){this.setAttribute(n,e)}}function an(n,e){return function(){this.setAttributeNS(n.space,n.local,e)}}function dn(a,e){return function(){var t=e.apply(this,arguments);null==t?this.removeAttribute(a):this.setAttribute(a,t)}}function rn(a,e){return function(){var t=e.apply(this,arguments);null==t?this.removeAttributeNS(a.space,a.local):this.setAttributeNS(a.space,a.local,t)}}function on(t){return function(){this.style.removeProperty(t)}}function ln(a,e,t){return function(){this.style.setProperty(a,e,t)}}function sn(a,e,t){return function(){var n=e.apply(this,arguments);null==n?this.style.removeProperty(a):this.style.setProperty(a,n,t)}}function cn(n,e){return n.style.getPropertyValue(e)||Nr(n).getComputedStyle(n,null).getPropertyValue(e)}function un(t){return function(){delete this[t]}}function pn(n,e){return function(){this[n]=e}}function gn(a,e){return function(){var t=e.apply(this,arguments);null==t?delete this[a]:this[a]=t}}function fn(t){return t.trim().split(/^|\s+/)}function hn(t){return t.classList||new bn(t)}function bn(t){this._node=t,this._names=fn(t.getAttribute('class')||'')}function mn(n,e){for(var t=hn(n),a=-1,d=e.length;++a<d;)t.add(e[a])}function yn(n,e){for(var t=hn(n),a=-1,d=e.length;++a<d;)t.remove(e[a])}function xn(t){return function(){mn(this,t)}}function kn(t){return function(){yn(this,t)}}function vn(n,e){return function(){(e.apply(this,arguments)?mn:yn)(this,n)}}function wn(){this.textContent=''}function Cn(t){return function(){this.textContent=t}}function Sn(n){return function(){var e=n.apply(this,arguments);this.textContent=null==e?'':e}}function Tn(){this.innerHTML=''}function _n(t){return function(){this.innerHTML=t}}function Ln(n){return function(){var e=n.apply(this,arguments);this.innerHTML=null==e?'':e}}function An(){this.nextSibling&&this.parentNode.appendChild(this)}function En(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Dn(){return null}function Mn(){var t=this.parentNode;t&&t.removeChild(this)}function Un(){var n=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(n,this.nextSibling):n}function On(){var n=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(n,this.nextSibling):n}function In(a,e,t){return a=Nn(a,e,t),function(e){var t=e.relatedTarget;t&&(t===this||8&t.compareDocumentPosition(this))||a.call(this,e)}}function Nn(a,e,t){return function(n){var i=Rr;Rr=n;try{a.call(this,this.__data__,e,t)}finally{Rr=i}}}function jn(t){return t.trim().split(/^|\s+/).map(function(t){var i='',d=t.indexOf('.');return 0<=d&&(i=t.slice(d+1),t=t.slice(0,d)),{type:t,name:i}})}function Rn(r){return function(){var e=this.__on;if(e){for(var t,n=0,a=-1,d=e.length;n<d;++n)(t=e[n],(!r.type||t.type===r.type)&&t.name===r.name)?this.removeEventListener(t.type,t.listener,t.capture):e[++a]=t;++a?e.length=a:delete this.__on}}}function qn(p,e,g){var f=jr.hasOwnProperty(p.type)?In:Nn;return function(a,r,d){var i,l=this.__on,o=f(e,r,d);if(l)for(var h=0,c=l.length;h<c;++h)if((i=l[h]).type===p.type&&i.name===p.name)return this.removeEventListener(i.type,i.listener,i.capture),this.addEventListener(i.type,i.listener=o,i.capture=g),void(i.value=e);this.addEventListener(p.type,o,g),i={type:p.type,name:p.name,value:e,listener:o,capture:g},l?l.push(i):this.__on=[i]}}function Hn(d,e,t,n){var i=Rr;d.sourceEvent=Rr,Rr=d;try{return e.apply(t,n)}finally{Rr=i}}function Pn(d,e,t){var n=Nr(d),i=n.CustomEvent;'function'==typeof i?i=new i(e,t):(i=n.document.createEvent('Event'),t?(i.initEvent(e,t.bubbles,t.cancelable),i.detail=t.detail):i.initEvent(e,!1,!1)),d.dispatchEvent(i)}function Fn(n,e){return function(){return Pn(this,n,e)}}function zn(n,e){return function(){return Pn(this,n,e.apply(this,arguments))}}function Bn(n,e){this._groups=n,this._parents=e}function Sl(){Rr.stopImmediatePropagation()}function Vn(a,e){var t=a.document.documentElement,n=Pr(a).on('dragstart.drag',null);e&&(n.on('click.drag',Wr,!0),setTimeout(function(){n.on('click.drag',null)},0)),'onselectstart'in t?n.on('selectstart.drag',null):(t.style.MozUserSelect=t.__noselect,delete t.__noselect)}function $n(c,e,t,n,i,a,d,r,o,l){this.target=c,this.type=e,this.subject=t,this.identifier=n,this.active=i,this.x=a,this.y=d,this.dx=r,this.dy=o,this._=l}function Kn(){return!Rr.ctrlKey&&!Rr.button}function Qn(){return this.parentNode}function Jn(t){return null==t?{x:Rr.x,y:Rr.y}:t}function Gn(){return navigator.maxTouchPoints||'ontouchstart'in this}function ei(a){let e=ao;'undefined'!=typeof a.githubUrl&&(e+=`
    <h3 id="updates-and-corrections">Updates and Corrections</h3>
    <p>`,a.githubCompareUpdatesUrl&&(e+=`<a href="${a.githubCompareUpdatesUrl}">View all changes</a> to this article since it was first published.`),e+=`
    If you see mistakes or want to suggest changes, please <a href="${a.githubUrl+'/issues/new'}">create an issue on GitHub</a>. </p>
    `);const t=a.journal;return'undefined'!=typeof t&&'Distill'===t.title&&(e+=`
    <h3 id="reuse">Reuse</h3>
    <p>Diagrams and text are licensed under Creative Commons Attribution <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a> with the <a class="github" href="${a.githubUrl}">source available on GitHub</a>, unless noted otherwise. The figures that have been reused from other sources don’t fall under this license and can be recognized by a note in their caption: “Figure from …”.</p>
    `),'undefined'!=typeof a.publishedDate&&(e+=`
    <h3 id="citation">Citation</h3>
    <p>For attribution in academic contexts, please cite this work as</p>
    <pre class="citation short">${a.concatenatedAuthors}, "${a.title}", PAL, ${a.publishedYear}.</pre>
    <p>BibTeX citation</p>
    <pre class="citation long">${f(a)}</pre>
    `),e}var ti=Math.sin,ni=Math.cos,ii=Math.sqrt,ai=Math.atan2,di=Math.PI,ri=Math.abs,oi=Math.pow,li=Math.LN10,si=Math.log,ci=Math.max,ui=Math.ceil,pi=Math.round,gi=Math.floor,fi=Math.min;const hi=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],bi=['Jan.','Feb.','March','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'],mi=(t)=>10>t?'0'+t:t,yi=function(l){const e=hi[l.getDay()].substring(0,3),t=mi(l.getDate()),n=bi[l.getMonth()].substring(0,3),i=l.getFullYear().toString(),a=l.getUTCHours().toString(),d=l.getUTCMinutes().toString(),r=l.getUTCSeconds().toString();return`${e}, ${t} ${n} ${i} ${a}:${d}:${r} Z`},xi=function(n){const e=Array.from(n).reduce((a,[e,t])=>Object.assign(a,{[e]:t}),{});return e},ki=function(a){const e=new Map;for(var t in a)a.hasOwnProperty(t)&&e.set(t,a[t]);return e};class vi{constructor(t){this.name=t.author,this.personalURL=t.authorURL,this.affiliation=t.affiliation,this.affiliationURL=t.affiliationURL,this.affiliations=t.affiliations||[]}get firstName(){const t=this.name.split(' ');return t.slice(0,t.length-1).join(' ')}get lastName(){const t=this.name.split(' ');return t[t.length-1]}}class wi{constructor(){this.title='unnamed article',this.description='',this.authors=[],this.bibliography=new Map,this.bibliographyParsed=!1,this.citations=[],this.citationsCollected=!1,this.journal={},this.katex={},this.doi=void 0,this.publishedDate=void 0}set url(t){this._url=t}get url(){return this._url?this._url:this.distillPath&&this.journal.url?this.journal.url+'/'+this.distillPath:this.journal.url?this.journal.url:void 0}get githubUrl(){return this.githubPath?'https://github.com/'+this.githubPath:void 0}set previewURL(t){this._previewURL=t}get previewURL(){return this._previewURL?this._previewURL:this.url+'/thumbnail.jpg'}get publishedDateRFC(){return yi(this.publishedDate)}get updatedDateRFC(){return yi(this.updatedDate)}get publishedYear(){return this.publishedDate.getFullYear()}get publishedMonth(){return bi[this.publishedDate.getMonth()]}get publishedDay(){return this.publishedDate.getDate()}get publishedMonthPadded(){return mi(this.publishedDate.getMonth()+1)}get publishedDayPadded(){return mi(this.publishedDate.getDate())}get publishedISODateOnly(){return this.publishedDate.toISOString().split('T')[0]}get volume(){const t=this.publishedYear-2015;if(1>t)throw new Error('Invalid publish date detected during computing volume');return t}get issue(){return this.publishedDate.getMonth()+1}get concatenatedAuthors(){return 2<this.authors.length?this.authors[0].lastName+', et al.':2===this.authors.length?this.authors[0].lastName+' & '+this.authors[1].lastName:1===this.authors.length?this.authors[0].lastName:void 0}get bibtexAuthors(){return this.authors.map((t)=>{return t.lastName+', '+t.firstName}).join(' and ')}get slug(){let t='';return this.authors.length&&(t+=this.authors[0].lastName.toLowerCase(),t+=this.publishedYear,t+=this.title.split(' ')[0].toLowerCase()),t||'Untitled'}get bibliographyEntries(){return new Map(this.citations.map((n)=>{const e=this.bibliography.get(n);return[n,e]}))}set bibliography(t){t instanceof Map?this._bibliography=t:'object'==typeof t&&(this._bibliography=ki(t))}get bibliography(){return this._bibliography}static fromObject(n){const e=new wi;return Object.assign(e,n),e}assignToObject(t){Object.assign(t,this),t.bibliography=xi(this.bibliographyEntries),t.url=this.url,t.doi=this.doi,t.githubUrl=this.githubUrl,t.previewURL=this.previewURL,this.publishedDate&&(t.volume=this.volume,t.issue=this.issue,t.publishedDateRFC=this.publishedDateRFC,t.publishedYear=this.publishedYear,t.publishedMonth=this.publishedMonth,t.publishedDay=this.publishedDay,t.publishedMonthPadded=this.publishedMonthPadded,t.publishedDayPadded=this.publishedDayPadded),this.updatedDate&&(t.updatedDateRFC=this.updatedDateRFC),t.concatenatedAuthors=this.concatenatedAuthors,t.bibtexAuthors=this.bibtexAuthors,t.slug=this.slug}}const Ci=(t)=>{return class extends t{constructor(){super();const n={childList:!0,characterData:!0,subtree:!0},e=new MutationObserver(()=>{e.disconnect(),this.renderIfPossible(),e.observe(this,n)});e.observe(this,n)}connectedCallback(){super.connectedCallback(),this.renderIfPossible()}renderIfPossible(){this.textContent&&this.root&&this.renderContent()}renderContent(){console.error(`Your class ${this.constructor.name} must provide a custom renderContent() method!`)}}},Si=(d,e,t=!0)=>{return(n)=>{const i=document.createElement('template');return i.innerHTML=e,t&&'ShadyCSS'in window&&ShadyCSS.prepareTemplate(i,d),class extends n{static get is(){return d}constructor(){super(),this.clone=document.importNode(i.content,!0),t&&(this.attachShadow({mode:'open'}),this.shadowRoot.appendChild(this.clone))}connectedCallback(){this.hasAttribute('distill-prerendered')||(t?'ShadyCSS'in window&&ShadyCSS.styleElement(this):this.insertBefore(this.clone,this.firstChild))}get root(){return t?this.shadowRoot:this}$(t){return this.root.querySelector(t)}$$(t){return this.root.querySelectorAll(t)}}}};var Ti='/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nspan.katex-display {\n  text-align: left;\n  padding: 8px 0 8px 0;\n  margin: 0.5em 0 0.5em 1em;\n}\n\nspan.katex {\n  -webkit-font-smoothing: antialiased;\n  color: rgba(0, 0, 0, 0.8);\n  font-size: 1.18em;\n}\n';const _i=function(r,e,t){let o=t,i=0;for(const a=r.length;o<e.length;){const t=e[o];if(0>=i&&e.slice(o,o+a)===r)return o;'\\'===t?o++:'{'===t?i++:'}'===t&&i--,o++}return-1},Li=function(c,e,t,n){const u=[];for(let a=0;a<c.length;a++)if('text'===c[a].type){const d=c[a].data;let r,o=!0,p=0;for(r=d.indexOf(e),-1!==r&&(p=r,u.push({type:'text',data:d.slice(0,p)}),o=!1);;){if(o){if(r=d.indexOf(e,p),-1===r)break;u.push({type:'text',data:d.slice(p,r)}),p=r}else{if(r=_i(t,d,p+e.length),-1===r)break;u.push({type:'math',data:d.slice(p+e.length,r),rawData:d.slice(p,r+t.length),display:n}),p=r+t.length}o=!o}u.push({type:'text',data:d.slice(p)})}else u.push(c[a]);return u},Ai=function(a,i){let t=[{type:'text',data:a}];for(let n=0;n<i.length;n++){const a=i[n];t=Li(t,a.left,a.right,a.display||!1)}return t},Ei=function(i,r){const t=Ai(i,r.delimiters),n=document.createDocumentFragment();for(let a=0;a<t.length;a++)if('text'===t[a].type)n.appendChild(document.createTextNode(t[a].data));else{const d=document.createElement('d-math'),e=t[a].data;r.displayMode=t[a].display;try{d.textContent=e,r.displayMode&&d.setAttribute('block','')}catch(e){if(!(e instanceof katex.ParseError))throw e;r.errorCallback('KaTeX auto-render: Failed to parse `'+t[a].data+'` with ',e),n.appendChild(document.createTextNode(t[a].rawData));continue}n.appendChild(d)}return n},Di=function(r,o){for(let e=0;e<r.childNodes.length;e++){const t=r.childNodes[e];if(3===t.nodeType){const n=t.textContent;if(o.mightHaveMath(n)){const a=Ei(n,o);e+=a.childNodes.length-1,r.replaceChild(a,t)}}else if(1===t.nodeType){const n=-1===o.ignoredTags.indexOf(t.nodeName.toLowerCase());n&&Di(t,o)}}},Mi={delimiters:[{left:'$$',right:'$$',display:!0},{left:'\\[',right:'\\]',display:!0},{left:'\\(',right:'\\)',display:!1}],ignoredTags:['script','noscript','style','textarea','pre','code','svg'],errorCallback:function(n,e){console.error(n,e)}},Ui=function(a,d){if(!a)throw new Error('No element provided to render');const t=Object.assign({},Mi,d),n=t.delimiters.flatMap((t)=>[t.left,t.right]);t.mightHaveMath=(a)=>n.some((e)=>-1!==a.indexOf(e)),Di(a,t)},Oi='<link rel="stylesheet" href="https://distill.pub/third-party/katex/katex.min.css" crossorigin="anonymous">',Ii=Si('d-math',`
${Oi}
<style>

:host {
  display: inline-block;
  contain: style;
}

:host([block]) {
  display: block;
}

${Ti}
</style>
<span id='katex-container'></span>
`);class Ni extends Ci(Ii(HTMLElement)){static set katexOptions(t){Ni._katexOptions=t,Ni.katexOptions.delimiters&&(Ni.katexAdded?Ni.katexLoadedCallback():Ni.addKatex())}static get katexOptions(){return Ni._katexOptions||(Ni._katexOptions={delimiters:[{left:'$$',right:'$$',display:!1}]}),Ni._katexOptions}static katexLoadedCallback(){const n=document.querySelectorAll('d-math');for(const e of n)e.renderContent();Ni.katexOptions.delimiters&&Ui(document.body,Ni.katexOptions)}static addKatex(){document.head.insertAdjacentHTML('beforeend',Oi);const t=document.createElement('script');t.src='https://distill.pub/third-party/katex/katex.min.js',t.async=!0,t.onload=Ni.katexLoadedCallback,t.crossorigin='anonymous',document.head.appendChild(t),Ni.katexAdded=!0}get options(){const t={displayMode:this.hasAttribute('block')};return Object.assign(t,Ni.katexOptions)}connectedCallback(){super.connectedCallback(),Ni.katexAdded||Ni.addKatex()}renderContent(){if('undefined'!=typeof katex){const t=this.root.querySelector('#katex-container');katex.render(this.textContent,t,this.options)}}}Ni.katexAdded=!1,Ni.inlineMathRendered=!1,window.DMath=Ni;class T extends HTMLElement{static get is(){return'd-front-matter'}constructor(){super();const t=new MutationObserver((n)=>{for(const e of n)if('SCRIPT'===e.target.nodeName||'characterData'===e.type){const t=s(this);this.notify(t)}});t.observe(this,{childList:!0,characterData:!0,subtree:!0})}notify(n){const a=new CustomEvent('onFrontMatterChanged',{detail:n,bubbles:!0});document.dispatchEvent(a)}}var ji=function(p,e){const t=p.body,n=t.querySelector('d-article');if(!n)return void console.warn('No d-article tag found; skipping adding optional components!');let g=p.querySelector('d-byline');g||(e.authors?(g=p.createElement('d-byline'),t.insertBefore(g,n)):console.warn('No authors found in front matter; please add them before submission!'));let a=p.querySelector('d-title');a||(a=p.createElement('d-title'),t.insertBefore(a,g));let d=a.querySelector('h1');d||(d=p.createElement('h1'),d.textContent=e.title,a.insertBefore(d,a.firstChild));const r='undefined'!=typeof e.password;let f=t.querySelector('d-interstitial');if(r&&!f){const n='undefined'!=typeof window,i=n&&window.location.hostname.includes('localhost');n&&i||(f=p.createElement('d-interstitial'),f.password=e.password,t.insertBefore(f,t.firstChild))}else!r&&f&&f.parentElement.removeChild(this);let h=p.querySelector('d-appendix');h||(h=p.createElement('d-appendix'),p.body.appendChild(h));let s=p.querySelector('d-footnote-list');s||(s=p.createElement('d-footnote-list'),h.appendChild(s));let c=p.querySelector('d-citation-list');c||(c=p.createElement('d-citation-list'),h.appendChild(c))};const Ri=new wi,Tl={frontMatter:Ri,waitingOn:{bibliography:[],citations:[]},listeners:{onCiteKeyCreated(d){const[e,t]=d.detail;if(!Ri.citationsCollected)return void Tl.waitingOn.citations.push(()=>Tl.listeners.onCiteKeyCreated(d));if(!Ri.bibliographyParsed)return void Tl.waitingOn.bibliography.push(()=>Tl.listeners.onCiteKeyCreated(d));const n=t.map((t)=>Ri.citations.indexOf(t));e.numbers=n;const i=t.map((t)=>Ri.bibliography.get(t));e.entries=i},onCiteKeyChanged(){Ri.citations=ho(),Ri.citationsCollected=!0;for(const t of Tl.waitingOn.citations.slice())t();const t=document.querySelector('d-citation-list'),e=new Map(Ri.citations.map((t)=>{return[t,Ri.bibliography.get(t)]}));t.citations=e;const n=document.querySelectorAll('d-cite');for(const a of n){console.log(a);const e=a.keys,t=e.map((t)=>Ri.citations.indexOf(t));a.numbers=t;const n=e.map((t)=>Ri.bibliography.get(t));a.entries=n}},onCiteKeyRemoved(t){Tl.listeners.onCiteKeyChanged(t)},onBibliographyChanged(a){const i=document.querySelector('d-citation-list'),e=a.detail;Ri.bibliography=e,Ri.bibliographyParsed=!0;for(const e of Tl.waitingOn.bibliography.slice())e();if(!Ri.citationsCollected)return void Tl.waitingOn.citations.push(function(){Tl.listeners.onBibliographyChanged({target:a.target,detail:a.detail})});if(i.hasAttribute('distill-prerendered'))console.debug('Citation list was prerendered; not updating it.');else{const t=new Map(Ri.citations.map((t)=>{return[t,Ri.bibliography.get(t)]}));i.citations=t}},onFootnoteChanged(){const n=document.querySelector('d-footnote-list');if(n){const e=document.querySelectorAll('d-footnote');n.footnotes=e}},onFrontMatterChanged(e){const d=e.detail;fo(Ri,d);const t=document.querySelector('d-interstitial');t&&('undefined'==typeof Ri.password?t.parentElement.removeChild(t):t.password=Ri.password);const n=document.body.hasAttribute('distill-prerendered');if(!n&&o()){ji(document,Ri);const n=document.querySelector('pal-appendix');n&&(n.frontMatter=Ri);const e=document.querySelector('d-byline');e&&(e.frontMatter=Ri),d.katex&&(Ni.katexOptions=d.katex)}},DOMContentLoaded(){if(Tl.loaded)return void console.warn('Controller received DOMContentLoaded but was already loaded!');if(!o())return void console.warn('Controller received DOMContentLoaded at document.readyState: '+document.readyState+'!');Tl.loaded=!0,console.debug('Runlevel 4: Controller running DOMContentLoaded');const a=document.querySelector('d-front-matter');if(a){const e=s(a);Tl.listeners.onFrontMatterChanged({detail:e})}Ri.citations=ho(),Ri.citationsCollected=!0;for(const t of Tl.waitingOn.citations.slice())t();if(Ri.bibliographyParsed)for(const t of Tl.waitingOn.bibliography.slice())t();const t=document.querySelector('d-footnote-list');if(t){const n=document.querySelectorAll('d-footnote');t.footnotes=n}}}},Hi='/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nhtml {\n  font-size: 14px;\n\tline-height: 1.6em;\n  /* font-family: "Libre Franklin", "Helvetica Neue", sans-serif; */\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;\n  /*, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";*/\n  text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\n@media(min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n\nbody {\n  margin: 0;\n}\n\na {\n  color: #004276;\n}\n\nfigure {\n  margin: 0;\n}\n\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\ntable th {\n\ttext-align: left;\n}\n\ntable thead {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\ntable thead th {\n  padding-bottom: 0.5em;\n}\n\ntable tbody :first-child td {\n  padding-top: 0.5em;\n}\n\npre {\n  overflow: auto;\n  max-width: 100%;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1em;\n}\n\nsup, sub {\n  vertical-align: baseline;\n  position: relative;\n  top: -0.4em;\n  line-height: 1em;\n}\n\nsub {\n  top: 0.4em;\n}\n\n.kicker,\n.marker {\n  font-size: 15px;\n  font-weight: 600;\n  color: rgba(0, 0, 0, 0.5);\n}\n\n\n/* Headline */\n\n@media(min-width: 1024px) {\n  d-title h1 span {\n    display: block;\n  }\n}\n\n/* Figure */\n\nfigure {\n  position: relative;\n  margin-bottom: 2.5em;\n  margin-top: 1.5em;\n}\n\nfigcaption+figure {\n\n}\n\nfigure img {\n  width: 100%;\n}\n\nfigure svg text,\nfigure svg tspan {\n}\n\nfigcaption,\n.figcaption {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 12px;\n  line-height: 1.5em;\n}\n\n@media(min-width: 1024px) {\nfigcaption,\n.figcaption {\n    font-size: 13px;\n  }\n}\n\nfigure.external img {\n  background: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);\n  padding: 18px;\n  box-sizing: border-box;\n}\n\nfigcaption a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\nfigcaption b,\nfigcaption strong {\n  font-weight: 600;\n  color: rgba(0, 0, 0, 1.0);\n}\n/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n@supports not (display: grid) {\n  .base-grid,\n  distill-header,\n  pal-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  pal-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  pal-footer,\n  distill-footer {\n    display: block;\n    padding: 8px;\n  }\n}\n\n.base-grid,\ndistill-header,\npal-header,\nd-title,\nd-abstract,\nd-article,\nd-appendix,\npal-appendix,\nd-byline,\nd-footnote-list,\nd-citation-list,\npal-footer,\ndistill-footer {\n  display: grid;\n  justify-items: stretch;\n  grid-template-columns: [screen-start] 8px [page-start kicker-start text-start gutter-start middle-start] 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [text-end page-end gutter-end kicker-end middle-end] 8px [screen-end];\n  grid-column-gap: 8px;\n}\n\n.grid {\n  display: grid;\n  grid-column-gap: 8px;\n}\n\n@media(min-width: 768px) {\n  .base-grid,\n  distill-header,\n  pal-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  pal-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  pal-footer,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start middle-start text-start] 45px 45px 45px 45px 45px 45px 45px 45px [ kicker-end text-end gutter-start] 45px [middle-end] 45px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 16px;\n  }\n\n  .grid {\n    grid-column-gap: 16px;\n  }\n}\n\n@media(min-width: 1000px) {\n  .base-grid,\n  distill-header,\n  pal-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  pal-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  pal-footer,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 50px [middle-start] 50px [text-start kicker-end] 50px 50px 50px 50px 50px 50px 50px 50px [text-end gutter-start] 50px [middle-end] 50px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 16px;\n  }\n\n  .grid {\n    grid-column-gap: 16px;\n  }\n}\n\n@media(min-width: 1180px) {\n  .base-grid,\n  distill-header,\n  pal-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  pal-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  pal-footer,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 60px [middle-start] 60px [text-start kicker-end] 60px 60px 60px 60px 60px 60px 60px 60px [text-end gutter-start] 60px [middle-end] 60px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 32px;\n  }\n\n  .grid {\n    grid-column-gap: 32px;\n  }\n}\n\n\n\n\n.base-grid {\n  grid-column: screen;\n}\n\n/* .l-body,\nd-article > *  {\n  grid-column: text;\n}\n\n.l-page,\nd-title > *,\nd-figure {\n  grid-column: page;\n} */\n\n.l-gutter {\n  grid-column: gutter;\n}\n\n.l-text,\n.l-body {\n  grid-column: text;\n}\n\n.l-page {\n  grid-column: page;\n}\n\n.l-body-outset {\n  grid-column: middle;\n}\n\n.l-page-outset {\n  grid-column: page;\n}\n\n.l-screen {\n  grid-column: screen;\n}\n\n.l-screen-inset {\n  grid-column: screen;\n  padding-left: 16px;\n  padding-left: 16px;\n}\n\n\n/* Aside */\n\nd-article aside {\n  grid-column: gutter;\n  font-size: 12px;\n  line-height: 1.6em;\n  color: rgba(0, 0, 0, 0.6)\n}\n\n@media(min-width: 768px) {\n  aside {\n    grid-column: gutter;\n  }\n\n  .side {\n    grid-column: gutter;\n  }\n}\n/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-title {\n  padding: 2rem 0 1.5rem;\n  contain: layout style;\n  overflow-x: hidden;\n}\n\n@media(min-width: 768px) {\n  d-title {\n    padding: 4rem 0 1.5rem;\n  }\n}\n\nd-title h1 {\n  grid-column: text;\n  font-size: 40px;\n  font-weight: 700;\n  line-height: 1.1em;\n  margin: 0 0 0.5rem;\n}\n\n@media(min-width: 768px) {\n  d-title h1 {\n    font-size: 50px;\n  }\n}\n\nd-title p {\n  font-weight: 300;\n  font-size: 1.2rem;\n  line-height: 1.55em;\n  grid-column: text;\n}\n\nd-title .status {\n  margin-top: 0px;\n  font-size: 12px;\n  color: #009688;\n  opacity: 0.8;\n  grid-column: kicker;\n}\n\nd-title .status span {\n  line-height: 1;\n  display: inline-block;\n  padding: 6px 0;\n  border-bottom: 1px solid #80cbc4;\n  font-size: 11px;\n  text-transform: uppercase;\n}\n/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-byline {\n  contain: style;\n  overflow: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  font-size: 0.8rem;\n  line-height: 1.8em;\n  padding: 1.5rem 0;\n  min-height: 1.8em;\n}\n\n\nd-byline .byline {\n  grid-template-columns: 1fr 1fr;\n  grid-column: text;\n}\n\n@media(min-width: 768px) {\n  d-byline .byline {\n    grid-template-columns: 1fr 1fr 1fr;\n  }\n}\n\nd-byline .authors-affiliations {\n  grid-column-end: span 2;\n  grid-template-columns: 1fr 1fr;\n  margin-bottom: 1em;\n}\n\n@media(min-width: 768px) {\n  d-byline .authors-affiliations {\n    margin-bottom: 0;\n  }\n}\n\nd-byline h3 {\n  font-size: 0.6rem;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.5);\n  margin: 0;\n  text-transform: uppercase;\n}\n\nd-byline p {\n  margin: 0;\n}\n\nd-byline a,\nd-article d-byline a {\n  color: rgba(0, 0, 0, 0.8);\n  text-decoration: none;\n  border-bottom: none;\n}\n\nd-article d-byline a:hover {\n  text-decoration: underline;\n  border-bottom: none;\n}\n\nd-byline p.author {\n  font-weight: 500;\n}\n\nd-byline .affiliations {\n\n}\n/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-article {\n  contain: layout style;\n  overflow-x: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  padding-top: 2rem;\n  color: rgba(0, 0, 0, 0.8);\n}\n\nd-article > * {\n  grid-column: text;\n}\n\n@media(min-width: 768px) {\n  d-article {\n    font-size: 16px;\n  }\n}\n\n@media(min-width: 1024px) {\n  d-article {\n    font-size: 1.06rem;\n    line-height: 1.7em;\n  }\n}\n\n\n/* H2 */\n\n\nd-article .marker {\n  text-decoration: none;\n  border: none;\n  counter-reset: section;\n  grid-column: kicker;\n  line-height: 1.7em;\n}\n\nd-article .marker:hover {\n  border: none;\n}\n\nd-article .marker span {\n  padding: 0 3px 4px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  position: relative;\n  top: 4px;\n}\n\nd-article .marker:hover span {\n  color: rgba(0, 0, 0, 0.7);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.7);\n}\n\nd-article h2 {\n  font-weight: 600;\n  font-size: 24px;\n  line-height: 1.25em;\n  margin: 2rem 0 1.5rem 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding-bottom: 1rem;\n}\n\n@media(min-width: 1024px) {\n  d-article h2 {\n    font-size: 36px;\n  }\n}\n\n/* H3 */\n\nd-article h3 {\n  font-weight: 700;\n  font-size: 18px;\n  line-height: 1.4em;\n  margin-bottom: 1em;\n  margin-top: 2em;\n}\n\n@media(min-width: 1024px) {\n  d-article h3 {\n    font-size: 20px;\n  }\n}\n\n/* H4 */\n\nd-article h4 {\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 14px;\n  line-height: 1.4em;\n}\n\nd-article a {\n  color: inherit;\n}\n\nd-article p,\nd-article ul,\nd-article ol,\nd-article blockquote {\n  margin-top: 0;\n  margin-bottom: 1em;\n  margin-left: 0;\n  margin-right: 0;\n}\n\nd-article blockquote {\n  border-left: 2px solid rgba(0, 0, 0, 0.2);\n  padding-left: 2em;\n  font-style: italic;\n  color: rgba(0, 0, 0, 0.6);\n}\n\nd-article a {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.4);\n  text-decoration: none;\n}\n\nd-article a:hover {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.8);\n}\n\nd-article .link {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\nd-article ul,\nd-article ol {\n  padding-left: 24px;\n}\n\nd-article li {\n  margin-bottom: 1em;\n  margin-left: 0;\n  padding-left: 0;\n}\n\nd-article li:last-child {\n  margin-bottom: 0;\n}\n\nd-article pre {\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n\nd-article hr {\n  grid-column: screen;\n  width: 100%;\n  border: none;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nd-article section {\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nd-article span.equation-mimic {\n  font-family: georgia;\n  font-size: 115%;\n  font-style: italic;\n}\n\nd-article > d-code,\nd-article section > d-code  {\n  display: block;\n}\n\nd-article > d-math[block],\nd-article section > d-math[block]  {\n  display: block;\n}\n\n@media (max-width: 768px) {\n  d-article > d-code,\n  d-article section > d-code,\n  d-article > d-math[block],\n  d-article section > d-math[block] {\n      overflow-x: scroll;\n      -ms-overflow-style: none;  // IE 10+\n      overflow: -moz-scrollbars-none;  // Firefox\n  }\n\n  d-article > d-code::-webkit-scrollbar,\n  d-article section > d-code::-webkit-scrollbar,\n  d-article > d-math[block]::-webkit-scrollbar,\n  d-article section > d-math[block]::-webkit-scrollbar {\n    display: none;  // Safari and Chrome\n  }\n}\n\nd-article .citation {\n  color: #668;\n  cursor: pointer;\n}\n\nd-include {\n  width: auto;\n  display: block;\n}\n\nd-figure {\n  contain: layout style;\n}\n\n/* KaTeX */\n\n.katex, .katex-prerendered {\n  contain: style;\n  display: inline-block;\n}\n\n/* Tables */\n\nd-article table {\n  border-collapse: collapse;\n  margin-bottom: 1.5rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n\nd-article table th {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n\nd-article table td {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\nd-article table tr:last-of-type td {\n  border-bottom: none;\n}\n\nd-article table th,\nd-article table td {\n  font-size: 15px;\n  padding: 2px 8px;\n}\n\nd-article table tbody :first-child td {\n  padding-top: 2px;\n}\n'+Ti+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n@media print {\n\n  @page {\n    size: 8in 11in;\n    @bottom-right {\n      content: counter(page) " of " counter(pages);\n    }\n  }\n\n  html {\n    /* no general margins -- CSS Grid takes care of those */\n  }\n\n  p, code {\n    page-break-inside: avoid;\n  }\n\n  h2, h3 {\n    page-break-after: avoid;\n  }\n\n  d-header {\n    visibility: hidden;\n  }\n\n  d-footer {\n    display: none!important;\n  }\n\n}\n',Pi=[{name:'WebComponents',support:function(){return'customElements'in window&&'attachShadow'in Element.prototype&&'getRootNode'in Element.prototype&&'content'in document.createElement('template')&&'Promise'in window&&'from'in Array},url:'https://distill.pub/third-party/polyfills/webcomponents-lite.js'},{name:'IntersectionObserver',support:function(){return'IntersectionObserver'in window&&'IntersectionObserverEntry'in window},url:'https://distill.pub/third-party/polyfills/intersection-observer.js'}];class Fi{static browserSupportsAllFeatures(){return Pi.every((t)=>t.support())}static load(n){const a=function(e){e.loaded=!0,console.debug('Runlevel 0: Polyfill has finished loading: '+e.name),Fi.neededPolyfills.every((t)=>t.loaded)&&(console.debug('Runlevel 0: All required polyfills have finished loading.'),console.debug('Runlevel 0->1.'),window.distillRunlevel=1,n())};for(const t of Fi.neededPolyfills)e(t,a)}static get neededPolyfills(){return Fi._neededPolyfills||(Fi._neededPolyfills=Pi.filter((t)=>!t.support())),Fi._neededPolyfills}}const zi=Si('d-abstract',`
<style>
  :host {
    font-size: 1.25rem;
    line-height: 1.6em;
    color: rgba(0, 0, 0, 0.7);
    -webkit-font-smoothing: antialiased;
  }

  ::slotted(p) {
    margin-top: 0;
    margin-bottom: 1em;
    grid-column: text-start / middle-end;
  }
  ${function(t){return`${t} {
      grid-column: left / text;
    }
  `}('d-abstract')}
</style>

<slot></slot>
`);class Yi extends zi(HTMLElement){}const Bi=Si('d-appendix',`
<style>

d-appendix {
  contain: layout style;
  font-size: 0.8em;
  line-height: 1.7em;
  margin-top: 60px;
  margin-bottom: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0,0,0,0.5);
  padding-top: 60px;
  padding-bottom: 48px;
}

d-appendix h3 {
  grid-column: page-start / text-start;
  font-size: 15px;
  font-weight: 500;
  margin-top: 1em;
  margin-bottom: 0;
  color: rgba(0,0,0,0.65);
}

d-appendix h3 + * {
  margin-top: 1em;
}

d-appendix ol {
  padding: 0 0 0 15px;
}

@media (min-width: 768px) {
  d-appendix ol {
    padding: 0 0 0 30px;
    margin-left: -30px;
  }
}

d-appendix li {
  margin-bottom: 1em;
}

d-appendix a {
  color: rgba(0, 0, 0, 0.6);
}

d-appendix > * {
  grid-column: text;
}

d-appendix > d-footnote-list,
d-appendix > d-citation-list,
d-appendix > pal-appendix {
  grid-column: screen;
}

</style>

`,!1);class Wi extends Bi(HTMLElement){}const Vi=/^\s*$/;class $i extends HTMLElement{static get is(){return'd-article'}constructor(){super(),new MutationObserver((n)=>{for(const a of n)for(const i of a.addedNodes)switch(i.nodeName){case'#text':{const e=i.nodeValue;if(!Vi.test(e)){console.warn('Use of unwrapped text in distill articles is discouraged as it breaks layout! Please wrap any text in a <span> or <p> tag. We found the following text: '+e);const t=document.createElement('span');t.innerHTML=i.nodeValue,i.parentNode.insertBefore(t,i),i.parentNode.removeChild(i)}}}}).observe(this,{childList:!0})}}var Ki='undefined'==typeof window?'undefined'==typeof global?'undefined'==typeof self?{}:self:global:window,_l=u(function(n,e){(function(n){function a(){this.months=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],this.notKey=[',','{','}',' ','='],this.pos=0,this.input='',this.entries=[],this.currentEntry='',this.setInput=function(t){this.input=t},this.getEntries=function(){return this.entries},this.isWhitespace=function(t){return' '==t||'\r'==t||'\t'==t||'\n'==t},this.match=function(n,e){if((void 0==e||null==e)&&(e=!0),this.skipWhitespace(e),this.input.substring(this.pos,this.pos+n.length)==n)this.pos+=n.length;else throw'Token mismatch, expected '+n+', found '+this.input.substring(this.pos);this.skipWhitespace(e)},this.tryMatch=function(n,e){return(void 0==e||null==e)&&(e=!0),this.skipWhitespace(e),this.input.substring(this.pos,this.pos+n.length)==n},this.matchAt=function(){for(;this.input.length>this.pos&&'@'!=this.input[this.pos];)this.pos++;return'@'==this.input[this.pos]},this.skipWhitespace=function(t){for(;this.isWhitespace(this.input[this.pos]);)this.pos++;if('%'==this.input[this.pos]&&!0==t){for(;'\n'!=this.input[this.pos];)this.pos++;this.skipWhitespace(t)}},this.value_braces=function(){var a=0;this.match('{',!1);for(var e=this.pos,t=!1;;){if(!t)if('}'==this.input[this.pos]){if(0<a)a--;else{var d=this.pos;return this.match('}',!1),this.input.substring(e,d)}}else if('{'==this.input[this.pos])a++;else if(this.pos>=this.input.length-1)throw'Unterminated value';t='\\'==this.input[this.pos]&&!1==t,this.pos++}},this.value_comment=function(){for(var n='',e=0;!(this.tryMatch('}',!1)&&0==e);){if(n+=this.input[this.pos],'{'==this.input[this.pos]&&e++,'}'==this.input[this.pos]&&e--,this.pos>=this.input.length-1)throw'Unterminated value:'+this.input.substring(start);this.pos++}return n},this.value_quotes=function(){this.match('"',!1);for(var a=this.pos,e=!1;;){if(!e){if('"'==this.input[this.pos]){var i=this.pos;return this.match('"',!1),this.input.substring(a,i)}if(this.pos>=this.input.length-1)throw'Unterminated value:'+this.input.substring(a)}e='\\'==this.input[this.pos]&&!1==e,this.pos++}},this.single_value=function(){var n=this.pos;if(this.tryMatch('{'))return this.value_braces();if(this.tryMatch('"'))return this.value_quotes();var e=this.key();if(e.match('^[0-9]+$'))return e;if(0<=this.months.indexOf(e.toLowerCase()))return e.toLowerCase();throw'Value expected:'+this.input.substring(n)+' for key: '+e},this.value=function(){for(var t=[this.single_value()];this.tryMatch('#');)this.match('#'),t.push(this.single_value());return t.join('')},this.key=function(){for(var t=this.pos;;){if(this.pos>=this.input.length)throw'Runaway key';if(0<=this.notKey.indexOf(this.input[this.pos]))return this.input.substring(t,this.pos);this.pos++}},this.key_equals_value=function(){var n=this.key();if(this.tryMatch('=')){this.match('=');var e=this.value();return[n,e]}throw'... = value expected, equals sign missing:'+this.input.substring(this.pos)},this.key_value_list=function(){var t=this.key_equals_value();for(this.currentEntry.entryTags={},this.currentEntry.entryTags[t[0]]=t[1];this.tryMatch(',')&&(this.match(','),!this.tryMatch('}'));)t=this.key_equals_value(),this.currentEntry.entryTags[t[0]]=t[1]},this.entry_body=function(t){this.currentEntry={},this.currentEntry.citationKey=this.key(),this.currentEntry.entryType=t.substring(1),this.match(','),this.key_value_list(),this.entries.push(this.currentEntry)},this.directive=function(){return this.match('@'),'@'+this.key()},this.preamble=function(){this.currentEntry={},this.currentEntry.entryType='PREAMBLE',this.currentEntry.entry=this.value_comment(),this.entries.push(this.currentEntry)},this.comment=function(){this.currentEntry={},this.currentEntry.entryType='COMMENT',this.currentEntry.entry=this.value_comment(),this.entries.push(this.currentEntry)},this.entry=function(t){this.entry_body(t)},this.bibtex=function(){for(;this.matchAt();){var t=this.directive();this.match('{'),'@STRING'==t?this.string():'@PREAMBLE'==t?this.preamble():'@COMMENT'==t?this.comment():this.entry(t),this.match('}')}}}n.toJSON=function(t){var e=new a;return e.setInput(t),e.bibtex(),e.entries},n.toBibtex=function(d){var e='';for(var t in d){if(e+='@'+d[t].entryType,e+='{',d[t].citationKey&&(e+=d[t].citationKey+', '),d[t].entry&&(e+=d[t].entry),d[t].entryTags){var n='';for(var i in d[t].entryTags)0!=n.length&&(n+=', '),n+=i+'= {'+d[t].entryTags[i]+'}';e+=n}e+='}\n\n'}return e}})(e)});class Xi extends HTMLElement{static get is(){return'd-bibliography'}constructor(){super();const t=new MutationObserver((n)=>{for(const e of n)('SCRIPT'===e.target.nodeName||'characterData'===e.type)&&this.parseIfPossible()});t.observe(this,{childList:!0,characterData:!0,subtree:!0})}connectedCallback(){requestAnimationFrame(()=>{this.parseIfPossible()})}parseIfPossible(){const n=this.querySelector('script');if(n)if('text/bibtex'==n.type){const a=n.textContent;if(this.bibtex!==a){this.bibtex=a;const t=g(this.bibtex);this.notify(t)}}else if('text/json'==n.type){const e=new Map(JSON.parse(n.textContent));this.notify(e)}else console.warn('Unsupported bibliography script tag type: '+n.type)}notify(n){const a=new CustomEvent('onBibliographyChanged',{detail:n,bubbles:!0});this.dispatchEvent(a)}static get observedAttributes(){return['src']}receivedBibtex(n){const e=g(n.target.response);this.notify(e)}attributeChangedCallback(a,e,t){var n=new XMLHttpRequest;n.onload=(e)=>this.receivedBibtex(e),n.onerror=()=>console.warn(`Could not load Bibtex! (tried ${t})`),n.responseType='text',n.open('GET',t,!0),n.send()}}class Zi extends HTMLElement{static get is(){return'd-byline'}set frontMatter(t){this.innerHTML=h(t)}}const Ji=Si('d-cite',`
<style>

:host {
  display: inline-block;
}

.citation {
  color: hsla(206, 90%, 20%, 0.7);
}

.citation-number {
  cursor: default;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", Helvetica, sans-serif;
  font-size: 75%;
  color: hsla(206, 90%, 20%, 0.7);
  display: inline-block;
  line-height: 1.1em;
  text-align: center;
  position: relative;
  top: -2px;
  margin: 0 2px;
}

figcaption .citation-number {
  font-size: 11px;
  font-weight: normal;
  top: -2px;
  line-height: 1em;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 15px 10px 15px 10px;
  border-bottom: 1px solid rgba(0,0,0,0.1)
}

ul li:last-of-type {
  border-bottom: none;
}

</style>

<d-hover-box id="hover-box"></d-hover-box>

<div id="citation-" class="citation">
  <span class="citation-number"></span>
</div>
`);class Gi extends Ji(HTMLElement){constructor(){super(),this._numbers=[],this._entries=[]}connectedCallback(){this.outerSpan=this.root.querySelector('#citation-'),this.innerSpan=this.root.querySelector('.citation-number'),this.hoverBox=this.root.querySelector('d-hover-box'),window.customElements.whenDefined('d-hover-box').then(()=>{this.hoverBox.listen(this)}),this.numbers&&this.displayNumbers(this.numbers),this.entries&&this.displayEntries(this.entries)}static get observedAttributes(){return['key','bibtex-key']}attributeChangedCallback(o,e,t){const n=e?'onCiteKeyChanged':'onCiteKeyCreated',i=t.split(',').map((t)=>t.trim()),a={detail:[this,i],bubbles:!0},d=new CustomEvent(n,a);document.dispatchEvent(d)}set key(t){this.setAttribute('key',t)}get key(){return this.getAttribute('key')||this.getAttribute('bibtex-key')}get keys(){const t=this.key.split(',');return console.log(t),t}set numbers(t){this._numbers=t,this.displayNumbers(t)}get numbers(){return this._numbers}displayNumbers(a){if(this.innerSpan){const e=a.map((t)=>{return-1==t?'?':t+1+''}),t='['+e.join(', ')+']';this.innerSpan.textContent=t}}set entries(t){this._entries=t,this.displayEntries(t)}get entries(){return this._entries}displayEntries(n){this.hoverBox&&(this.hoverBox.innerHTML=`<ul>
      ${n.map(t).map((t)=>`<li>${t}</li>`).join('\n')}
    </ul>`)}}const ea=`
d-citation-list {
  contain: style;
}

d-citation-list .references {
  grid-column: text;
}

d-citation-list .references .title {
  font-weight: 500;
}
`;class ta extends HTMLElement{static get is(){return'd-citation-list'}connectedCallback(){this.hasAttribute('distill-prerendered')||(this.style.display='none')}set citations(t){b(this,t)}}var na=u(function(a){var e='undefined'==typeof window?'undefined'!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{}:window,r=function(g){function h(a,e,d,n){this.type=a,this.content=e,this.alias=d,this.length=0|(n||'').length}function y(t,e,n,i,d,r){for(var o in n)if(n.hasOwnProperty(o)&&n[o]){var l=n[o];l=Array.isArray(l)?l:[l];for(var s=0;s<l.length;++s){if(r&&r.cause==o+','+s)return;var c=l[s],u=c.inside,g=!!c.lookbehind,f=!!c.greedy,b=0,m=c.alias;if(f&&!c.pattern.global){var x=c.pattern.toString().match(/[imsuy]*$/)[0];c.pattern=RegExp(c.pattern.source,x+'g')}for(var v,C=c.pattern||c,R=i.next,T=d;R!==e.tail&&!(r&&T>=r.reach);T+=R.value.length,R=R.next){if(v=R.value,e.length>t.length)return;if(!(v instanceof h)){var _=1;if(f&&R!=e.tail.prev){C.lastIndex=T;var L=C.exec(t);if(!L)break;var q=L.index+(g&&L[1]?L[1].length:0),E=L.index+L[0].length,D=T;for(D+=R.value.length;q>=D;)R=R.next,D+=R.value.length;if(D-=R.value.length,T=D,R.value instanceof h)continue;for(var M=R;M!==e.tail&&(D<E||'string'==typeof M.value);M=M.next)_++,D+=M.value.length;_--,v=t.slice(T,D),L.index-=T}else{C.lastIndex=0;var L=C.exec(v)}if(L){g&&(b=L[1]?L[1].length:0);var q=L.index+b,p=L[0].slice(b),E=q+p.length,k=v.slice(0,q),U=v.slice(E),O=T+v.length;r&&O>r.reach&&(r.reach=O);var H=R.prev;k&&(H=w(e,H,k),T+=k.length),a(e,H,_);var N=new h(o,u?S.tokenize(p,u):p,m,p);R=w(e,H,N),U&&w(e,R,U),1<_&&y(t,e,n,R.prev,T,{cause:o+','+s,reach:O})}}}}}}function n(){var n={value:null,prev:null,next:null},a={value:null,prev:n,next:null};n.next=a,this.head=n,this.tail=a,this.length=0}function w(d,e,r){var o=e.next,l={value:r,prev:e,next:o};return e.next=l,o.prev=l,d.length++,l}function a(i,e,t){for(var n=e.next,a=0;a<t&&n!==i.tail;a++)n=n.next;e.next=n,n.prev=e,i.length-=a}function i(a){for(var e=[],t=a.head.next;t!==a.tail;)e.push(t.value),t=t.next;return e}function e(){S.manual||S.highlightAll()}var f=/\blang(?:uage)?-([\w-]+)\b/i,d=0,S={manual:g.Prism&&g.Prism.manual,disableWorkerMessageHandler:g.Prism&&g.Prism.disableWorkerMessageHandler,util:{encode:function t(e){return e instanceof h?new h(e.type,t(e.content),e.alias):Array.isArray(e)?e.map(t):e.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\u00a0/g,' ')},type:function(t){return Object.prototype.toString.call(t).slice(8,-1)},objId:function(t){return t.__id||Object.defineProperty(t,'__id',{value:++d}),t.__id},clone:function r(e,o){o=o||{};var n,t;switch(S.util.type(e)){case'Object':if(t=S.util.objId(e),o[t])return o[t];for(var a in n={},o[t]=n,e)e.hasOwnProperty(a)&&(n[a]=r(e[a],o));return n;case'Array':return(t=S.util.objId(e),o[t])?o[t]:(n=[],o[t]=n,e.forEach(function(e,t){n[t]=r(e,o)}),n);default:return e;}},getLanguage:function(t){for(;t&&!f.test(t.className);)t=t.parentElement;return t?(t.className.match(f)||[,'none'])[1].toLowerCase():'none'},currentScript:function(){if('undefined'==typeof document)return null;if('currentScript'in document&&!0)return document.currentScript;try{throw new Error}catch(n){var a=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(n.stack)||[])[1];if(a){var e=document.getElementsByTagName('script');for(var t in e)if(e[t].src==a)return e[t]}return null}},isActive:function(a,e,t){for(var d;a;){if(d=a.classList,d.contains(e))return!0;if(d.contains('no-'+e))return!1;a=a.parentElement}return!!t}},languages:{extend:function(a,e){var t=S.util.clone(S.languages[a]);for(var n in e)t[n]=e[n];return t},insertBefore:function(s,e,t,n){n=n||S.languages;var i=n[s],a={};for(var d in i)if(i.hasOwnProperty(d)){if(d==e)for(var r in t)t.hasOwnProperty(r)&&(a[r]=t[r]);t.hasOwnProperty(d)||(a[d]=i[d])}var o=n[s];return n[s]=a,S.languages.DFS(S.languages,function(e,t){t===o&&e!=s&&(this[e]=a)}),a},DFS:function s(e,t,n,a){a=a||{};var d=S.util.objId;for(var r in e)if(e.hasOwnProperty(r)){t.call(e,r,e[r],n||r);var o=e[r],i=S.util.type(o);'Object'!==i||a[d(o)]?'Array'===i&&!a[d(o)]&&(a[d(o)]=!0,s(o,t,r,a)):(a[d(o)]=!0,s(o,t,null,a))}}},plugins:{},highlightAll:function(n,e){S.highlightAllUnder(document,n,e)},highlightAllUnder:function(i,o,t){var l={callback:t,container:i,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};S.hooks.run('before-highlightall',l),l.elements=Array.prototype.slice.apply(l.container.querySelectorAll(l.selector)),S.hooks.run('before-all-elements-highlight',l);for(var a,d=0;a=l.elements[d++];)S.highlightElement(a,!0===o,l.callback)},highlightElement:function(e,l,n){function i(t){b.highlightedCode=t,S.hooks.run('before-insert',b),b.element.innerHTML=b.highlightedCode,S.hooks.run('after-highlight',b),S.hooks.run('complete',b),n&&n.call(b.element)}var a=S.util.getLanguage(e),c=S.languages[a];e.className=e.className.replace(f,'').replace(/\s+/g,' ')+' language-'+a;var h=e.parentElement;h&&'pre'===h.nodeName.toLowerCase()&&(h.className=h.className.replace(f,'').replace(/\s+/g,' ')+' language-'+a);var o=e.textContent,b={element:e,language:a,grammar:c,code:o};if(S.hooks.run('before-sanity-check',b),!b.code)return S.hooks.run('complete',b),void(n&&n.call(b.element));if(S.hooks.run('before-highlight',b),!b.grammar)return void i(S.util.encode(b.code));if(l&&g.Worker){var u=new Worker(S.filename);u.onmessage=function(t){i(t.data)},u.postMessage(JSON.stringify({language:b.language,code:b.code,immediateClose:!0}))}else i(S.highlight(b.code,b.grammar,b.language))},highlight:function(t,d,r){var o={code:t,grammar:d,language:r};return S.hooks.run('before-tokenize',o),o.tokens=S.tokenize(o.code,o.grammar),S.hooks.run('after-tokenize',o),h.stringify(S.util.encode(o.tokens),o.language)},tokenize:function(a,e){var t=e.rest;if(t){for(var d in t)e[d]=t[d];delete e.rest}var r=new n;return w(r,r.head,a),y(a,r,e,r.head,0),i(r)},hooks:{all:{},add:function(a,e){var t=S.hooks.all;t[a]=t[a]||[],t[a].push(e)},run:function(i,e){var t=S.hooks.all[i];if(t&&t.length)for(var n,a=0;n=t[a++];)n(e)}},Token:h};if(g.Prism=S,h.stringify=function o(t,s){if('string'==typeof t)return t;if(Array.isArray(t)){var c='';return t.forEach(function(e){c+=o(e,s)}),c}var i={type:t.type,content:o(t.content,s),tag:'span',classes:['token',t.type],attributes:{},language:s},a=t.alias;a&&(Array.isArray(a)?Array.prototype.push.apply(i.classes,a):i.classes.push(a)),S.hooks.run('wrap',i);var d='';for(var r in i.attributes)d+=' '+r+'="'+(i.attributes[r]||'').replace(/"/g,'&quot;')+'"';return'<'+i.tag+' class="'+i.classes.join(' ')+'"'+d+'>'+i.content+'</'+i.tag+'>'},!g.document)return g.addEventListener?(S.disableWorkerMessageHandler||g.addEventListener('message',function(e){var t=JSON.parse(e.data),n=t.language,i=t.code,a=t.immediateClose;g.postMessage(S.highlight(i,S.languages[n],n)),a&&g.close()},!1),S):S;var r=S.util.currentScript();if(r&&(S.filename=r.src,r.hasAttribute('data-manual')&&(S.manual=!0)),!S.manual){var o=document.readyState;'loading'===o||'interactive'===o&&r&&r.defer?document.addEventListener('DOMContentLoaded',e):window.requestAnimationFrame?window.requestAnimationFrame(e):window.setTimeout(e,16)}return S}(e);a.exports&&(a.exports=r),'undefined'!=typeof Ki&&(Ki.Prism=r),r.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/,name:/[^\s<>'"]+/}},cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:'attr-equals'},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:'named-entity'},/&#x?[\da-f]{1,8};/i]},r.languages.markup.tag.inside['attr-value'].inside.entity=r.languages.markup.entity,r.languages.markup.doctype.inside['internal-subset'].inside=r.languages.markup,r.hooks.add('wrap',function(t){'entity'===t.type&&(t.attributes.title=t.content.replace(/&amp;/,'&'))}),Object.defineProperty(r.languages.markup.tag,'addInlined',{value:function(n,e){var t={};t['language-'+e]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:r.languages[e]},t.cdata=/^<!\[CDATA\[|\]\]>$/i;var o={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:t}};o['language-'+e]={pattern:/[\s\S]+/,inside:r.languages[e]};var l={};l[n]={pattern:RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return n}),'i'),lookbehind:!0,greedy:!0,inside:o},r.languages.insertBefore('markup','cdata',l)}}),r.languages.html=r.languages.markup,r.languages.mathml=r.languages.markup,r.languages.svg=r.languages.markup,r.languages.xml=r.languages.extend('markup',{}),r.languages.ssml=r.languages.xml,r.languages.atom=r.languages.xml,r.languages.rss=r.languages.xml,function(a){var e=/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;a.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,lookbehind:!0,alias:'selector'},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp('\\burl\\((?:'+e.source+'|'+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+')\\)','i'),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp('^'+e.source+'$'),alias:'url'}}},selector:RegExp('[^{}\\s](?:[^{};"\']|'+e.source+')*?(?=\\s*\\{)'),string:{pattern:e,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:,]/},a.languages.css.atrule.inside.rest=a.languages.css;var i=a.languages.markup;i&&(i.tag.addInlined('style','css'),a.languages.insertBefore('inside','attr-value',{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:i.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:a.languages.css}},alias:'language-css'}},i.tag))}(r),r.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},r.languages.javascript=r.languages.extend('clike',{"class-name":[r.languages.clike['class-name'],{pattern:/(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,function:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),r.languages.javascript['class-name'][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,r.languages.insertBefore('javascript','keyword',{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,alias:'function'},parameter:[{pattern:/(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,lookbehind:!0,inside:r.languages.javascript},{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,inside:r.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,lookbehind:!0,inside:r.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,lookbehind:!0,inside:r.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),r.languages.insertBefore('javascript','string',{"template-string":{pattern:/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:'string'},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:'punctuation'},rest:r.languages.javascript}},string:/[\s\S]+/}}}),r.languages.markup&&r.languages.markup.tag.addInlined('script','javascript'),r.languages.js=r.languages.javascript,function(){function b(a,i){var t=a.className;t=t.replace(d,' ')+' language-'+i,a.className=t.replace(/\s+/g,' ').trim()}if('undefined'!=typeof self&&self.Prism&&self.document){var m=window.Prism,e=function(n,e){return'\u2716 Error '+n+' while fetching file: '+e},t={js:'javascript',py:'python',rb:'ruby',ps1:'powershell',psm1:'powershell',sh:'bash',bat:'batch',h:'c',tex:'latex'},n='data-src-status',a='loading',i='loaded',r='pre[data-src]:not(['+n+'="'+i+'"]):not(['+n+'="'+a+'"])',d=/\blang(?:uage)?-([\w-]+)\b/i;m.hooks.add('before-highlightall',function(t){t.selector+=', '+r}),m.hooks.add('before-sanity-check',function(d){var o=d.element;if(o.matches(r)){d.code='',o.setAttribute(n,a);var l=o.appendChild(document.createElement('CODE'));l.textContent='Loading\u2026';var s=o.getAttribute('data-src'),c=d.language;if('none'===c){var u=(/\.(\w+)$/.exec(s)||[,'none'])[1];c=t[u]||u}b(l,c),b(o,c);var p=m.plugins.autoloader;p&&p.loadLanguages(c);var g=new XMLHttpRequest;g.open('GET',s,!0),g.onreadystatechange=function(){4==g.readyState&&(400>g.status&&g.responseText?(o.setAttribute(n,i),l.textContent=g.responseText,m.highlightElement(l)):(o.setAttribute(n,'failed'),l.textContent=400<=g.status?e(g.status,g.statusText):'\u2716 Error: File does not exist or is empty'))},g.send(null)}}),m.plugins.fileHighlight={highlight:function(t){for(var e,n=(t||document).querySelectorAll(r),a=0;e=n[a++];)m.highlightElement(e)}};var o=!1;m.fileHighlight=function(){o||(console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.'),o=!0),m.plugins.fileHighlight.highlight.apply(this,arguments)}}}()});Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},"string-interpolation":{pattern:/(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:'punctuation'},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:'string'},string:{pattern:/(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^\s*)@\w+(?:\.\w+)*/im,lookbehind:!0,alias:['annotation','punctuation'],inside:{punctuation:/\./}},keyword:/\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:True|False|None)\b/,number:/(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python['string-interpolation'].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python,Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},Prism.languages.lua={comment:/^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,string:{pattern:/(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,greedy:!0},number:/\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,keyword:/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,function:/(?!\d)\w+(?=\s*(?:[({]))/,operator:[/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,{pattern:/(^|[^.])\.\.(?!\.)/,lookbehind:!0}],punctuation:/[\[\](){},;]|\.+|:+/},function(i){var e={environment:{pattern:/\$\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\b/,alias:'constant'},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:/(\{)\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\b/,lookbehind:!0,alias:'constant'}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/};i.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:'important'},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:'function'},{pattern:/\b\w+(?=\s*\(\s*\)\s*\{)/,alias:'function'}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:'variable',lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,inside:{environment:{pattern:/(^|[\s;|&]|[<>]\()\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\b/,lookbehind:!0,alias:'constant'}},alias:'variable',lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:e},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\2)[^\\])*\2/,lookbehind:!0,greedy:!0,inside:e}],environment:{pattern:/\$?\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\b/,alias:'constant'},variable:e.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,lookbehind:!0,alias:'class-name'},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:'important'},operator:{pattern:/\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,inside:{"file-descriptor":{pattern:/^\d/,alias:'important'}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}};for(var r=['comment','function-name','for-or-select','assign-left','string','environment','function','keyword','builtin','boolean','file-descriptor','operator','punctuation','number'],n=e.variable[1].inside,a=0;a<r.length;a++)n[r[a]]=i.languages.bash[r[a]];i.languages.shell=i.languages.bash}(Prism),Prism.languages.go=Prism.languages.extend('clike',{keyword:/\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,builtin:/\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,boolean:/\b(?:_|iota|nil|true|false)\b/,operator:/[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,number:/(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,string:{pattern:/(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,greedy:!0}}),delete Prism.languages.go['class-name'],function(c){function e(n){return n=n.replace(/<inner>/g,function(){return t}),RegExp(/((?:^|[^\\])(?:\\{2})*)/.source+'(?:'+n+')')}var t=/(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))/.source,n=/(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,i=/\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|$)/.source.replace(/__/g,function(){return n}),a=/\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;c.languages.markdown=c.languages.extend('markup',{}),c.languages.insertBefore('markdown','prolog',{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:'punctuation'},table:{pattern:RegExp('^'+i+a+'(?:'+i+')*','m'),inside:{"table-data-rows":{pattern:RegExp('^('+i+a+')(?:'+i+')*$'),lookbehind:!0,inside:{"table-data":{pattern:RegExp(n),inside:c.languages.markdown},punctuation:/\|/}},"table-line":{pattern:RegExp('^('+i+')'+a+'$'),lookbehind:!0,inside:{punctuation:/\||:?-{3,}:?/}},"table-header-row":{pattern:RegExp('^'+i+'$'),inside:{"table-header":{pattern:RegExp(n),alias:'important',inside:c.languages.markdown},punctuation:/\|/}}}},code:[{pattern:/((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,lookbehind:!0,alias:'keyword'},{pattern:/``.+?``|`[^`\r\n]+`/,alias:'keyword'},{pattern:/^```[\s\S]*?^```$/m,greedy:!0,inside:{"code-block":{pattern:/^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,lookbehind:!0},"code-language":{pattern:/^(```).+/,lookbehind:!0},punctuation:/```/}}],title:[{pattern:/\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,alias:'important',inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:'important',inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:'punctuation'},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:'punctuation'},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:'url'},bold:{pattern:e(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^..)[\s\S]+(?=..$)/,lookbehind:!0,inside:{}},punctuation:/\*\*|__/}},italic:{pattern:e(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^.)[\s\S]+(?=.$)/,lookbehind:!0,inside:{}},punctuation:/[*_]/}},strike:{pattern:e(/(~~?)(?:(?!~)<inner>)+?\2/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^~~?)[\s\S]+(?=\1$)/,lookbehind:!0,inside:{}},punctuation:/~~?/}},url:{pattern:e(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[(?:(?!\])<inner>)+\])/.source),lookbehind:!0,greedy:!0,inside:{variable:{pattern:/(\[)[^\]]+(?=\]$)/,lookbehind:!0},content:{pattern:/(^!?\[)[^\]]+(?=\])/,lookbehind:!0,inside:{}},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),['url','bold','italic','strike'].forEach(function(e){['url','bold','italic','strike'].forEach(function(t){e!==t&&(c.languages.markdown[e].inside.content.inside[t]=c.languages.markdown[t])})}),c.hooks.add('after-tokenize',function(n){function e(t){if(t&&'string'!=typeof t)for(var s,n=0,a=t.length;n<a;n++){if(s=t[n],'code'!==s.type){e(s.content);continue}var i=s.content[1],d=s.content[3];if(i&&d&&'code-language'===i.type&&'code-block'===d.type&&'string'==typeof i.content){var r=i.content.replace(/\b#/g,'sharp').replace(/\b\+\+/g,'pp');r=(/[a-z][\w-]*/i.exec(r)||[''])[0].toLowerCase();var o='language-'+r;d.alias?'string'==typeof d.alias?d.alias=[d.alias,o]:d.alias.push(o):d.alias=[o]}}}'markdown'!==n.language&&'md'!==n.language||e(n.tokens)}),c.hooks.add('wrap',function(e){if('code-block'===e.type){for(var u='',t=0,n=e.classes.length;t<n;t++){var a=e.classes[t],i=/language-(.+)/.exec(a);if(i){u=i[1];break}}var d=c.languages[u];if(!!d){var r=e.content.replace(/&lt;/g,'<').replace(/&amp;/g,'&');e.content=c.highlight(r,d,u)}else if(u&&'none'!==u&&c.plugins.autoloader){var l='md-'+new Date().valueOf()+'-'+gi(1e16*Math.random());e.attributes.id=l,c.plugins.autoloader.loadLanguages(u,function(){var e=document.getElementById(l);e&&(e.innerHTML=c.highlight(e.textContent,c.languages[u],u))})}}}),c.languages.md=c.languages.markdown}(Prism),Prism.languages.julia={comment:{pattern:/(^|[^\\])(?:#=(?:[^#=]|=(?!#)|#(?!=)|#=(?:[^#=]|=(?!#)|#(?!=))*=#)*=#|#.*)/,lookbehind:!0},regex:{pattern:/r"(?:\\.|[^"\\\r\n])*"[imsx]{0,4}/,greedy:!0},string:{pattern:/"""[\s\S]+?"""|\w*"(?:\\.|[^"\\\r\n])*"|(^|[^\w'])'(?:\\[^\r\n][^'\r\n]*|[^\\\r\n])'|`(?:[^\\`\r\n]|\\.)*`/,lookbehind:!0,greedy:!0},keyword:/\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\b/,boolean:/\b(?:true|false)\b/,number:/(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[\da-f]+(?:_[\da-f]+)*\.?(?:\d+(?:_\d+)*)?|\.\d+(?:_\d+)*)(?:[efp][+-]?\d+(?:_\d+)*)?j?/i,operator:/&&|\|\||[-+*^%÷⊻&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:|])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥'√∛]/,punctuation:/::?|[{}[\]();,.?]/,constant:/\b(?:(?:NaN|Inf)(?:16|32|64)?|im|pi|e|catalan|eulergamma|golden)\b|[πℯγφ]/};const ia=Si('d-code',`
<style>

code {
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  padding: 4px 7px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);
}

pre code {
  display: block;
  border-left: 2px solid rgba(0, 0, 0, .1);
  padding: 0 0 0 36px;
}

${'/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*="language-"],\npre[class*="language-"] {\n\tcolor: black;\n\tbackground: none;\n\ttext-shadow: 0 1px white;\n\tfont-family: Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace;\n\tfont-size: 1em;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,\ncode[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\npre[class*="language-"]::selection, pre[class*="language-"] ::selection,\ncode[class*="language-"]::selection, code[class*="language-"] ::selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\n@media print {\n\tcode[class*="language-"],\n\tpre[class*="language-"] {\n\t\ttext-shadow: none;\n\t}\n}\n\n/* Code blocks */\npre[class*="language-"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*="language-"],\npre[class*="language-"] {\n\tbackground: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*="language-"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #999;\n}\n\n.token.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n\tcolor: #9a6e3a;\n\t/* This background color was intended by the author of this theme. */\n\tbackground: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n\tcolor: #07a;\n}\n\n.token.function,\n.token.class-name {\n\tcolor: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n\tcolor: #e90;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n'}
</style>

<code id="code-container"></code>

`);class aa extends Ci(ia(HTMLElement)){renderContent(){if(this.languageName=this.getAttribute('language'),!this.languageName)return void console.warn('You need to provide a language attribute to your <d-code> block to let us know how to highlight your code; e.g.:\n <d-code language="python">zeros = np.zeros(shape)</d-code>.');const a=na.languages[this.languageName];if(void 0==a)return void console.warn(`Distill does not yet support highlighting your code block in "${this.languageName}'.`);let i=this.textContent;const t=this.shadowRoot.querySelector('#code-container');if(this.hasAttribute('block')){i=i.replace(/\n/,'');const n=i.match(/\s*/);if(i=i.replace(new RegExp('\n'+n,'g'),'\n'),i=i.trim(),t.parentNode instanceof ShadowRoot){const n=document.createElement('pre');this.shadowRoot.removeChild(t),n.appendChild(t),this.shadowRoot.appendChild(n)}}t.className=`language-${this.languageName}`,t.innerHTML=na.highlight(i,a)}}const da=Si('d-footnote',`
<style>

d-math[block] {
  display: block;
}

:host {

}

sup {
  line-height: 1em;
  font-size: 0.75em;
  position: relative;
  top: -.5em;
  vertical-align: baseline;
}

span {
  color: hsla(206, 90%, 20%, 0.7);
  cursor: default;
}

.footnote-container {
  padding: 10px;
}

</style>

<d-hover-box>
  <div class="footnote-container">
    <slot id="slot"></slot>
  </div>
</d-hover-box>

<sup>
  <span id="fn-" data-hover-ref=""></span>
</sup>

`);class ra extends da(HTMLElement){constructor(){super();const t=new MutationObserver(this.notify);t.observe(this,{childList:!0,characterData:!0,subtree:!0})}notify(){const n={detail:this,bubbles:!0},e=new CustomEvent('onFootnoteChanged',n);document.dispatchEvent(e)}connectedCallback(){this.hoverBox=this.root.querySelector('d-hover-box'),window.customElements.whenDefined('d-hover-box').then(()=>{this.hoverBox.listen(this)}),ra.currentFootnoteId+=1;const a=ra.currentFootnoteId.toString();this.root.host.id='d-footnote-'+a;const e='dt-fn-hover-box-'+a;this.hoverBox.id=e;const t=this.root.querySelector('#fn-');t.setAttribute('id','fn-'+a),t.setAttribute('data-hover-ref',e),t.textContent=a}}ra.currentFootnoteId=0;const oa=Si('d-footnote-list',`
<style>

d-footnote-list {
  contain: layout style;
}

d-footnote-list > * {
  grid-column: text;
}

d-footnote-list a.footnote-backlink {
  color: rgba(0,0,0,0.3);
  padding-left: 0.5em;
}

</style>

<h3>Footnotes</h3>
<ol></ol>
`,!1);class la extends oa(HTMLElement){connectedCallback(){super.connectedCallback(),this.list=this.root.querySelector('ol'),this.root.style.display='none'}set footnotes(n){if(this.list.innerHTML='',n.length){this.root.style.display='';for(const a of n){const t=document.createElement('li');t.id=a.id+'-listing',t.innerHTML=a.innerHTML;const e=document.createElement('a');e.setAttribute('class','footnote-backlink'),e.textContent='[\u21A9]',e.href='#'+a.id,t.appendChild(e),this.list.appendChild(t)}}else this.root.style.display='none'}}const sa=Si('d-hover-box',`
<style>

:host {
  position: absolute;
  width: 100%;
  left: 0px;
  z-index: 10000;
  display: none;
  white-space: normal
}

.container {
  position: relative;
  width: 704px;
  max-width: 100vw;
  margin: 0 auto;
}

.panel {
  position: absolute;
  font-size: 1rem;
  line-height: 1.5em;
  top: 0;
  left: 0;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(250, 250, 250, 0.95);
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

</style>

<div class="container">
  <div class="panel">
    <slot></slot>
  </div>
</div>
`);class ca extends sa(HTMLElement){constructor(){super()}connectedCallback(){}listen(t){this.bindDivEvents(this),this.bindTriggerEvents(t)}bindDivEvents(t){t.addEventListener('mouseover',()=>{this.visible||this.showAtNode(t),this.stopTimeout()}),t.addEventListener('mouseout',()=>{this.extendTimeout(500)}),t.addEventListener('touchstart',(t)=>{t.stopPropagation()},{passive:!0}),document.body.addEventListener('touchstart',()=>{this.hide()},{passive:!0})}bindTriggerEvents(n){n.addEventListener('mouseover',()=>{this.visible||this.showAtNode(n),this.stopTimeout()}),n.addEventListener('mouseout',()=>{this.extendTimeout(300)}),n.addEventListener('touchstart',(e)=>{this.visible?this.hide():this.showAtNode(n),e.stopPropagation()},{passive:!0})}show(t){this.visible=!0,this.style.display='block',this.style.top=pi(t[1]+10)+'px'}showAtNode(n){const e=n.getBoundingClientRect();this.show([n.offsetLeft+e.width,n.offsetTop+e.height])}hide(){this.visible=!1,this.style.display='none',this.stopTimeout()}stopTimeout(){this.timeout&&clearTimeout(this.timeout)}extendTimeout(t){this.stopTimeout(),this.timeout=setTimeout(()=>{this.hide()},t)}}class ua extends HTMLElement{static get is(){return'd-title'}}const pa=Si('d-references',`
<style>
d-references {
  display: block;
}
</style>
`,!1);class ga extends pa(HTMLElement){}class fa extends HTMLElement{static get is(){return'd-toc'}connectedCallback(){this.getAttribute('prerendered')||(window.onload=()=>{const n=document.querySelector('d-article'),e=n.querySelectorAll('h2, h3');m(this,e)})}}class ha extends HTMLElement{static get is(){return'd-figure'}static get readyQueue(){return ha._readyQueue||(ha._readyQueue=[]),ha._readyQueue}static addToReadyQueue(t){-1===ha.readyQueue.indexOf(t)&&(ha.readyQueue.push(t),ha.runReadyQueue())}static runReadyQueue(){const t=ha.readyQueue.sort((n,e)=>n._seenOnScreen-e._seenOnScreen).filter((t)=>!t._ready).pop();t&&(t.ready(),requestAnimationFrame(ha.runReadyQueue))}constructor(){super(),this._ready=!1,this._onscreen=!1,this._offscreen=!0}connectedCallback(){this.loadsWhileScrolling=this.hasAttribute('loadsWhileScrolling'),ha.marginObserver.observe(this),ha.directObserver.observe(this)}disconnectedCallback(){ha.marginObserver.unobserve(this),ha.directObserver.unobserve(this)}static get marginObserver(){if(!ha._marginObserver){const a=window.innerHeight,e=gi(2*a),t=ha.didObserveMarginIntersection,n=new IntersectionObserver(t,{rootMargin:e+'px 0px '+e+'px 0px',threshold:0.01});ha._marginObserver=n}return ha._marginObserver}static didObserveMarginIntersection(n){for(const a of n){const t=a.target;a.isIntersecting&&!t._ready&&ha.addToReadyQueue(t)}}static get directObserver(){return ha._directObserver||(ha._directObserver=new IntersectionObserver(ha.didObserveDirectIntersection,{rootMargin:'0px',threshold:[0,1]})),ha._directObserver}static didObserveDirectIntersection(n){for(const a of n){const t=a.target;a.isIntersecting?(t._seenOnScreen=new Date,t._offscreen&&t.onscreen()):t._onscreen&&t.offscreen()}}addEventListener(n,e){super.addEventListener(n,e),'ready'===n&&-1!==ha.readyQueue.indexOf(this)&&(this._ready=!1,ha.runReadyQueue()),'onscreen'===n&&this.onscreen()}ready(){this._ready=!0,ha.marginObserver.unobserve(this);const t=new CustomEvent('ready');this.dispatchEvent(t)}onscreen(){this._onscreen=!0,this._offscreen=!1;const t=new CustomEvent('onscreen');this.dispatchEvent(t)}offscreen(){this._onscreen=!1,this._offscreen=!0;const t=new CustomEvent('offscreen');this.dispatchEvent(t)}}if('undefined'!=typeof window){ha.isScrolling=!1;let t;window.addEventListener('scroll',()=>{ha.isScrolling=!0,clearTimeout(t),t=setTimeout(()=>{ha.isScrolling=!1,ha.runReadyQueue()},500)},!0)}const ba=Si('d-interstitial',`
<style>

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;

  opacity: 1;
  visibility: visible;

  display: flex;
  flex-flow: column;
  justify-content: center;
  z-index: 2147483647 /* MaxInt32 */

}

.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
  padding: 2em;
}

h1 {
  text-decoration: underline;
  text-decoration-color: hsl(0,100%,40%);
  -webkit-text-decoration-color: hsl(0,100%,40%);
  margin-bottom: 1em;
  line-height: 1.5em;
}

input[type="password"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  -webkit-border-radius: none;
  -moz-border-radius: none;
  -ms-border-radius: none;
  -o-border-radius: none;
  border-radius: none;
  outline: none;

  font-size: 18px;
  background: none;
  width: 25%;
  padding: 10px;
  border: none;
  border-bottom: solid 2px #999;
  transition: border .3s;
}

input[type="password"]:focus {
  border-bottom: solid 2px #333;
}

input[type="password"].wrong {
  border-bottom: solid 2px hsl(0,100%,40%);
}

p small {
  color: #888;
}

.logo {
  position: relative;
  font-size: 1.5em;
  margin-bottom: 3em;
}

.logo svg {
  width: 36px;
  position: relative;
  top: 6px;
  margin-right: 2px;
}

.logo svg path {
  fill: none;
  stroke: black;
  stroke-width: 2px;
}

</style>

<div class="overlay">
  <div class="container">
    <h1>This article is in review.</h1>
    <p>Do not share this URL or the contents of this article. Thank you!</p>
    <input id="interstitial-password-input" type="password" name="password" autofocus/>
    <p><small>Enter the password we shared with you as part of the review process to view the article.</small></p>
  </div>
</div>
`);class ma extends ba(HTMLElement){connectedCallback(){if(this.shouldRemoveSelf())this.parentElement.removeChild(this);else{const t=this.root.querySelector('#interstitial-password-input');t.oninput=(t)=>this.passwordChanged(t)}}passwordChanged(n){const e=n.target.value;e===this.password&&(console.log('Correct password entered.'),this.parentElement.removeChild(this),'undefined'!=typeof Storage&&(console.log('Saved that correct password was entered.'),localStorage.setItem(this.localStorageIdentifier(),'true')))}shouldRemoveSelf(){return window&&'distill.pub'===window.location.hostname?(console.warn('Interstitial found on production, hiding it.'),!0):'undefined'!=typeof Storage&&'true'===localStorage.getItem(this.localStorageIdentifier())&&(console.log('Loaded that correct password was entered before; skipping interstitial.'),!0)}localStorageIdentifier(){return'distill-drafts'+(window?window.location.pathname:'-')+'interstitial-password-correct'}}var ya=function(n,e){return n<e?-1:n>e?1:n>=e?0:NaN},xa=function(r){return 1===r.length&&(r=y(r)),{left:function(e,t,n,i){for(null==n&&(n=0),null==i&&(i=e.length);n<i;){var a=n+i>>>1;0>r(e[a],t)?n=a+1:i=a}return n},right:function(e,t,n,i){for(null==n&&(n=0),null==i&&(i=e.length);n<i;){var a=n+i>>>1;0<r(e[a],t)?i=a:n=a+1}return n}}}(ya),ka=xa.right,va=function(r,o,l){r=+r,o=+o,l=2>(d=arguments.length)?(o=r,r=0,1):3>d?1:+l;for(var s=-1,d=0|ci(0,ui((o-r)/l)),i=Array(d);++s<d;)i[s]=r+s*l;return i},wa=7.0710678118654755,Ca=3.1622776601683795,Sa=1.4142135623730951,Ta=function(i,s,c){var u,d,r,n,o=-1;if(s=+s,i=+i,c=+c,i===s&&0<c)return[i];if((u=s<i)&&(d=i,i=s,s=d),0===(n=x(i,s,c))||!isFinite(n))return[];if(0<n)for(i=ui(i/n),s=gi(s/n),r=Array(d=ui(s-i+1));++o<d;)r[o]=(i+o)*n;else for(i=gi(i*n),s=ui(s*n),r=Array(d=ui(i-s+1));++o<d;)r[o]=(i-o)/n;return u&&r.reverse(),r},_a=Array.prototype,La=_a.map,Aa=_a.slice,Ea=function(a,e,t){a.prototype=e.prototype=t,t.constructor=a},Da=0.7,Ma=1/Da,Ua=/^#([0-9a-f]{3,8})$/,Oa=/^rgb\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*\)$/,Ia=/^rgb\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*\)$/,Na=/^rgba\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/,ja=/^rgba\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/,Ra=/^hsl\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*\)$/,qa=/^hsla\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/,Ha={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Ea(w,L,{copy:function(t){return Object.assign(new this.constructor,this,t)},displayable:function(){return this.rgb().displayable()},hex:S,formatHex:S,formatHsl:function(){return z(this).formatHsl()},formatRgb:_,toString:_}),Ea(R,j,v(w,{brighter:function(t){return t=null==t?Ma:oi(Ma,t),new R(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?Da:oi(Da,t),new R(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return-0.5<=this.r&&255.5>this.r&&-0.5<=this.g&&255.5>this.g&&-0.5<=this.b&&255.5>this.b&&0<=this.opacity&&1>=this.opacity},hex:q,formatHex:q,formatRgb:mo,toString:mo})),Ea(Y,function(a,e,t,n){return 1===arguments.length?z(a):new Y(a,e,t,null==n?1:n)},v(w,{brighter:function(t){return t=null==t?Ma:oi(Ma,t),new Y(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?Da:oi(Da,t),new Y(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var d=this.h%360+360*(0>this.h),e=isNaN(d)||isNaN(this.s)?0:this.s,t=this.l,n=t+(0.5>t?t:1-t)*e,i=2*t-n;return new R(W(240<=d?d-240:d+120,i,n),W(d,i,n),W(120>d?d+240:d-120,i,n),this.opacity)},displayable:function(){return(0<=this.s&&1>=this.s||isNaN(this.s))&&0<=this.l&&1>=this.l&&0<=this.opacity&&1>=this.opacity},formatHsl:function(){var t=this.opacity;return t=isNaN(t)?1:ci(0,fi(1,t)),(1===t?'hsl(':'hsla(')+(this.h||0)+', '+100*(this.s||0)+'%, '+100*(this.l||0)+'%'+(1===t?')':', '+t+')')}}));var Pa=di/180,Fa=180/di,za=18,Ya=0.96422,K=1,Xn=0.82521,Yn=4/29,Zn=6/29,Ba=3*Zn*Zn,Wa=Zn*Zn*Zn;Ea($,function(a,e,t,n){return 1===arguments.length?V(a):new $(a,e,t,null==n?1:n)},v(w,{brighter:function(t){return new $(this.l+za*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new $(this.l-za*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var a=(this.l+16)/116,e=isNaN(this.a)?a:a+this.a/500,t=isNaN(this.b)?a:a-this.b/200;return e=Ya*X(e),a=K*X(a),t=Xn*X(t),new R(Z(3.1338561*e-1.6168667*a-0.4906146*t),Z(-0.9787684*e+1.9161415*a+0.033454*t),Z(0.0719453*e-0.2289914*a+1.4052427*t),this.opacity)}})),Ea(ee,function(a,e,t,n){return 1===arguments.length?G(a):new ee(a,e,t,null==n?1:n)},v(w,{brighter:function(t){return new ee(this.h,this.c,this.l+za*(null==t?1:t),this.opacity)},darker:function(t){return new ee(this.h,this.c,this.l-za*(null==t?1:t),this.opacity)},rgb:function(){return te(this).rgb()}}));var Va=-0.14861,$a=+1.78277,A=-0.29227,B=-0.90649,C=+1.97294,D=C*B,E=C*$a,Ka=$a*A-B*Va;Ea(ae,ie,v(w,{brighter:function(t){return t=null==t?Ma:oi(Ma,t),new ae(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?Da:oi(Da,t),new ae(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var d=isNaN(this.h)?0:(this.h+120)*Pa,e=+this.l,t=isNaN(this.s)?0:this.s*e*(1-e),n=ni(d),i=ti(d);return new R(255*(e+t*(Va*n+$a*i)),255*(e+t*(A*n+B*i)),255*(e+t*(C*n)),this.opacity)}}));var Qa=function(t){return function(){return t}},Xa=function a(e){function t(l,e){var t=o((l=j(l)).r,(e=j(e)).r),s=o(l.g,e.g),a=o(l.b,e.b),d=se(l.opacity,e.opacity);return function(e){return l.r=t(e),l.g=s(e),l.b=a(e),l.opacity=d(e),l+''}}var o=le(e);return t.gamma=a,t}(1),Za=function(t,e){e||(e=[]);var a,d=t?fi(e.length,t.length):0,i=e.slice();return function(n){for(a=0;a<d;++a)i[a]=t[a]*(1-n)+e[a]*n;return i}},Ja=function(t,d){var r=new Date;return t=+t,d=+d,function(e){return r.setTime(t*(1-e)+d*e),r}},Ga=function(t,a){return t=+t,a=+a,function(e){return t*(1-e)+a*e}},ed=function(a,r){var o,n={},d={};for(o in(null===a||'object'!=typeof a)&&(a={}),(null===r||'object'!=typeof r)&&(r={}),r)o in a?n[o]=ad(a[o],r[o]):d[o]=r[o];return function(t){for(o in n)d[o]=n[o](t);return d}},td=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,nd=new RegExp(td.source,'g'),id=function(i,c){var e,t,n,a=td.lastIndex=nd.lastIndex=0,d=-1,r=[],l=[];for(i+='',c+='';(e=td.exec(i))&&(t=nd.exec(c));)(n=t.index)>a&&(n=c.slice(a,n),r[d]?r[d]+=n:r[++d]=n),(e=e[0])===(t=t[0])?r[d]?r[d]+=t:r[++d]=t:(r[++d]=null,l.push({i:d,x:Ga(e,t)})),a=nd.lastIndex;return a<c.length&&(n=c.slice(a),r[d]?r[d]+=n:r[++d]=n),2>r.length?l[0]?ge(l[0].x):pe(c):(c=l.length,function(n){for(var e,t=0;t<c;++t)r[(e=l[t]).i]=e.x(n);return r.join('')})},ad=function(t,e){var d,i=typeof e;return null==e||'boolean'==i?Qa(e):('number'==i?Ga:'string'==i?(d=L(e))?(e=d,j):id:e instanceof L?Xa:e instanceof Date?Ja:ce(e)?Za:Array.isArray(e)?ue:'function'!=typeof e.valueOf&&'function'!=typeof e.toString||isNaN(e)?ed:Ga)(t,e)},dd=function(t,a){return t=+t,a=+a,function(e){return pi(t*(1-e)+a*e)}};fe(function(a,e){var t=e-a;return t?de(a,180<t||-180>t?t-360*pi(t/360):t):Qa(isNaN(a)?e:a)});var rd=fe(se),od=function(t){return function(){return t}},ld=[0,1],sd=function(a,e){if(0>(t=(a=e?a.toExponential(e-1):a.toExponential()).indexOf('e')))return null;var t,n=a.slice(0,t);return[1<n.length?n[0]+n.slice(2):n,+a.slice(t+1)]},cd=function(t){return t=sd(ri(t)),t?t[1]:NaN},ud=function(s,e){return function(n,a){for(var d=n.length,r=[],i=0,t=s[0],o=0;0<d&&0<t&&(o+t+1>a&&(t=ci(1,a-o)),r.push(n.substring(d-=t,d+t)),!((o+=t+1)>a));)t=s[i=(i+1)%s.length];return r.reverse().join(e)}},pd=function(n){return function(e){return e.replace(/[0-9]/g,function(e){return n[+e]})}},gd=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;we.prototype=Ce.prototype,Ce.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?'0':'')+(void 0===this.width?'':ci(1,0|this.width))+(this.comma?',':'')+(void 0===this.precision?'':'.'+ci(0,0|this.precision))+(this.trim?'~':'')+this.type};var fd,re,hd,bd,md=function(d){out:for(var e,t=d.length,a=1,n=-1;a<t;++a)switch(d[a]){case'.':n=e=a;break;case'0':0===n&&(n=a),e=a;break;default:if(!+d[a])break out;0<n&&(n=0);}return 0<n?d.slice(0,n)+d.slice(e+1):d},yd=function(d,e){var t=sd(d,e);if(!t)return d+'';var r=t[0],i=t[1];return 0>i?'0.'+Array(-i).join('0')+r:r.length>i+1?r.slice(0,i+1)+'.'+r.slice(i+1):r+Array(i-r.length+2).join('0')},Ll={"%":function(n,e){return(100*n).toFixed(e)},b:function(t){return pi(t).toString(2)},c:function(t){return t+''},d:function(t){return pi(t).toString(10)},e:function(n,e){return n.toExponential(e)},f:function(n,e){return n.toFixed(e)},g:function(n,e){return n.toPrecision(e)},o:function(t){return pi(t).toString(8)},p:function(n,e){return yd(100*n,e)},r:yd,s:function(n,e){var t=sd(n,e);if(!t)return n+'';var d=t[0],r=t[1],o=r-(fd=3*ci(-8,fi(8,gi(r/3))))+1,l=d.length;return o===l?d:o>l?d+Array(o-l+1).join('0'):0<o?d.slice(0,o)+'.'+d.slice(o):'0.'+Array(1-o).join('0')+sd(n,ci(0,e+o-1))[0]},X:function(t){return pi(t).toString(16).toUpperCase()},x:function(t){return pi(t).toString(16)}},kd=function(t){return t},vd=Array.prototype.map,wd=['y','z','a','f','p','n','\xB5','m','','k','M','G','T','P','E','Z','Y'],Cd=function(c){function e(o){function e(a){var r,p,C,n=x,o=k;if('c'===y)o=v(a)+o,a='';else{a=+a;var g=0>a;if(a=isNaN(a)?l:v(ri(a),b),m&&(a=md(a)),g&&0==+a&&(g=!1),n=(g?'('===c?c:u:'-'===c||'('===c?'':c)+n,o=('s'===y?wd[8+fd/3]:'')+o+(g&&'('===c?')':''),w)for(r=-1,p=a.length;++r<p;)if(C=a.charCodeAt(r),48>C||57<C){o=(46===C?i+a.slice(r+1):a.slice(r))+o,a=a.slice(0,r);break}}h&&!A&&(a=L(a,Infinity));var D=n.length+a.length+o.length,T=D<E?Array(E-D+1).join(s):'';switch(h&&A&&(a=L(T+a,T.length?E-o.length:Infinity),T=''),S){case'<':a=n+a+o+T;break;case'=':a=n+T+a+o;break;case'^':a=T.slice(0,D=T.length>>1)+n+a+o+T.slice(D);break;default:a=T+n+a+o;}return d(a)}o=we(o);var s=o.fill,S=o.align,c=o.sign,p=o.symbol,A=o.zero,E=o.width,h=o.comma,b=o.precision,m=o.trim,y=o.type;'n'===y?(h=!0,y='g'):!Ll[y]&&(void 0===b&&(b=12),m=!0,y='g'),(A||'0'===s&&'='===S)&&(A=!0,s='0',S='=');var x='$'===p?a:'#'===p&&/[boxX]/.test(y)?'0'+y.toLowerCase():'',k='$'===p?n:/[%p]/.test(y)?r:'',v=Ll[y],w=/[defgprs%]/.test(y);return b=void 0===b?6:/[gprs]/.test(y)?ci(1,fi(21,b)):ci(0,fi(20,b)),e.toString=function(){return o+''},e}var L=void 0===c.grouping||void 0===c.thousands?kd:ud(vd.call(c.grouping,Number),c.thousands+''),a=void 0===c.currency?'':c.currency[0]+'',n=void 0===c.currency?'':c.currency[1]+'',i=void 0===c.decimal?'.':c.decimal+'',d=void 0===c.numerals?kd:pd(vd.call(c.numerals,String)),r=void 0===c.percent?'%':c.percent+'',u=void 0===c.minus?'-':c.minus+'',l=void 0===c.nan?'NaN':c.nan+'';return{format:e,formatPrefix:function(t,n){var i=e((t=we(t),t.type='f',t)),a=3*ci(-8,fi(8,gi(cd(n)/3))),l=oi(10,-a),r=wd[8+a/3];return function(t){return i(l*t)+r}}}};(function(t){return re=Cd(t),hd=re.format,bd=re.formatPrefix,re})({decimal:'.',thousands:',',grouping:[3],currency:['$',''],minus:'-'});var Sd=function(t){return ci(0,-cd(ri(t)))},Td=function(n,e){return ci(0,3*ci(-8,fi(8,gi(cd(e)/3)))-cd(ri(n)))},_d=function(n,e){return n=ri(n),e=ri(e)-n,ci(0,cd(e)-cd(n))+1},Ld=function(l,e,t){var n,i=l[0],a=l[l.length-1],d=k(i,a,null==e?10:e);switch(t=we(null==t?',f':t),t.type){case's':{var r=ci(ri(i),ri(a));return null!=t.precision||isNaN(n=Td(d,r))||(t.precision=n),bd(t,r)}case'':case'e':case'g':case'p':case'r':{null!=t.precision||isNaN(n=_d(d,ci(ri(i),ri(a))))||(t.precision=n-('e'===t.type));break}case'f':case'%':{null!=t.precision||isNaN(n=Sd(d))||(t.precision=n-2*('%'===t.type));break}}return hd(t)},Ad=new Date,Ed=new Date,Dd=_e(function(){},function(n,a){n.setTime(+n+a)},function(n,e){return e-n});Dd.every=function(a){return a=gi(a),isFinite(a)&&0<a?1<a?_e(function(e){e.setTime(gi(e/a)*a)},function(e,i){e.setTime(+e+i*a)},function(e,t){return(t-e)/a}):Dd:null};var Md=1e3,Ud=6e4,Od=36e5,Id=864e5,Nd=6048e5,jd=_e(function(t){t.setTime(t-t.getMilliseconds())},function(n,a){n.setTime(+n+a*Md)},function(n,e){return(e-n)/Md},function(t){return t.getUTCSeconds()}),Rd=_e(function(t){t.setTime(t-t.getMilliseconds()-t.getSeconds()*Md)},function(n,a){n.setTime(+n+a*Ud)},function(n,e){return(e-n)/Ud},function(t){return t.getMinutes()}),qd=_e(function(t){t.setTime(t-t.getMilliseconds()-t.getSeconds()*Md-t.getMinutes()*Ud)},function(n,a){n.setTime(+n+a*Od)},function(n,e){return(e-n)/Od},function(t){return t.getHours()}),Hd=_e(function(t){t.setHours(0,0,0,0)},function(n,e){n.setDate(n.getDate()+e)},function(n,e){return(e-n-(e.getTimezoneOffset()-n.getTimezoneOffset())*Ud)/Id},function(t){return t.getDate()-1}),Pd=Le(0),Fd=Le(1),zd=Le(2),Yd=Le(3),Bd=Le(4),Wd=Le(5),Vd=Le(6),$d=_e(function(t){t.setDate(1),t.setHours(0,0,0,0)},function(n,e){n.setMonth(n.getMonth()+e)},function(n,e){return e.getMonth()-n.getMonth()+12*(e.getFullYear()-n.getFullYear())},function(t){return t.getMonth()}),Kd=_e(function(t){t.setMonth(0,1),t.setHours(0,0,0,0)},function(n,e){n.setFullYear(n.getFullYear()+e)},function(n,e){return e.getFullYear()-n.getFullYear()},function(t){return t.getFullYear()});Kd.every=function(a){return isFinite(a=gi(a))&&0<a?_e(function(e){e.setFullYear(gi(e.getFullYear()/a)*a),e.setMonth(0,1),e.setHours(0,0,0,0)},function(e,t){e.setFullYear(e.getFullYear()+t*a)}):null};var Qd=_e(function(t){t.setUTCSeconds(0,0)},function(n,a){n.setTime(+n+a*Ud)},function(n,e){return(e-n)/Ud},function(t){return t.getUTCMinutes()}),Xd=_e(function(t){t.setUTCMinutes(0,0,0)},function(n,a){n.setTime(+n+a*Od)},function(n,e){return(e-n)/Od},function(t){return t.getUTCHours()}),Zd=_e(function(t){t.setUTCHours(0,0,0,0)},function(n,e){n.setUTCDate(n.getUTCDate()+e)},function(n,e){return(e-n)/Id},function(t){return t.getUTCDate()-1}),Jd=Ae(0),Gd=Ae(1),er=Ae(2),tr=Ae(3),nr=Ae(4),ir=Ae(5),ar=Ae(6),dr=_e(function(t){t.setUTCDate(1),t.setUTCHours(0,0,0,0)},function(n,e){n.setUTCMonth(n.getUTCMonth()+e)},function(n,e){return e.getUTCMonth()-n.getUTCMonth()+12*(e.getUTCFullYear()-n.getUTCFullYear())},function(t){return t.getUTCMonth()}),rr=_e(function(t){t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(n,e){n.setUTCFullYear(n.getUTCFullYear()+e)},function(n,e){return e.getUTCFullYear()-n.getUTCFullYear()},function(t){return t.getUTCFullYear()});rr.every=function(a){return isFinite(a=gi(a))&&0<a?_e(function(e){e.setUTCFullYear(gi(e.getUTCFullYear()/a)*a),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},function(e,t){e.setUTCFullYear(e.getUTCFullYear()+t*a)}):null};var or,lr,sr,cr={0:'0',"-":'',_:' '},ur=/^\s*\d+/,pr=/^%/,gr=/[\\^$*+?|[\]().{}]/g;(function(t){return or=Ue(t),lr=or.utcFormat,sr=or.utcParse,or})({dateTime:'%x, %X',date:'%-m/%-d/%Y',time:'%-I:%M:%S %p',periods:['AM','PM'],days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],months:['January','February','March','April','May','June','July','August','September','October','November','December'],shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']});var fr='%Y-%m-%dT%H:%M:%S.%LZ',hr=Date.prototype.toISOString?function(t){return t.toISOString()}:lr(fr),br=+new Date('2000-01-01T00:00:00.000Z')?function(n){var e=new Date(n);return isNaN(e)?null:e}:sr(fr),mr=function(t){return t.match(/.{6}/g).map(function(t){return'#'+t})};mr('1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf'),mr('393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6'),mr('3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9'),mr('1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5'),rd(ie(300,0.5,0),ie(-240,0.5,1));var yr=rd(ie(-100,0.75,0.35),ie(80,1.5,0.8)),xr=rd(ie(260,0.75,0.35),ie(80,1.5,0.8)),kr=ie();vl(mr('44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725'));var vr=vl(mr('00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf')),wr=vl(mr('00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4')),Cr=vl(mr('0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921')),Sr={value:function(){}};zt.prototype=Ft.prototype={constructor:zt,on:function(n,e){var l,d=this._,t=wl(n+'',d),r=-1,o=t.length;if(2>arguments.length){for(;++r<o;)if((l=(n=t[r]).type)&&(l=Bt(d[l],n.name)))return l;return}if(null!=e&&'function'!=typeof e)throw new Error('invalid callback: '+e);for(;++r<o;)if(l=(n=t[r]).type)d[l]=Wt(d[l],n.name,e);else if(null==e)for(l in d)d[l]=Wt(d[l],n.name,null);return this},copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice();return new zt(t)},call:function(i,e){if(0<(a=arguments.length-2))for(var a,d,n=Array(a),t=0;t<a;++t)n[t]=arguments[t+2];if(!this._.hasOwnProperty(i))throw new Error('unknown type: '+i);for(d=this._[i],t=0,a=d.length;t<a;++t)d[t].value.apply(e,n)},apply:function(n,e,a){if(!this._.hasOwnProperty(n))throw new Error('unknown type: '+n);for(var d=this._[n],r=0,t=d.length;r<t;++r)d[r].value.apply(e,a)}};var Tr='http://www.w3.org/1999/xhtml',Al={svg:'http://www.w3.org/2000/svg',xhtml:Tr,xlink:'http://www.w3.org/1999/xlink',xml:'http://www.w3.org/XML/1998/namespace',xmlns:'http://www.w3.org/2000/xmlns/'},Lr=function(a){var i=a+='',t=i.indexOf(':');return 0<=t&&'xmlns'!==(i=a.slice(0,t))&&(a=a.slice(t+1)),Al.hasOwnProperty(i)?{space:Al[i],local:a}:a},Ar=function(n){var e=Lr(n);return(e.local?$t:Vt)(e)},Er=function(t){return null==t?Kt:function(){return this.querySelector(t)}},Dr=function(t){return null==t?Qt:function(){return this.querySelectorAll(t)}},Mr=function(t){return function(){return this.matches(t)}},Ur=function(t){return Array(t.length)};Xt.prototype={constructor:Xt,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(n,e){return this._parent.insertBefore(n,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};var Or=function(t){return function(){return t}},Ir='$',Nr=function(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView};bn.prototype={add:function(n){var e=this._names.indexOf(n);0>e&&(this._names.push(n),this._node.setAttribute('class',this._names.join(' ')))},remove:function(n){var e=this._names.indexOf(n);0<=e&&(this._names.splice(e,1),this._node.setAttribute('class',this._names.join(' ')))},contains:function(t){return 0<=this._names.indexOf(t)}};var jr={},Rr=null;if('undefined'!=typeof document){var qr=document.documentElement;'onmouseenter'in qr||(jr={mouseenter:'mouseover',mouseleave:'mouseout'})}var Hr=[null];Bn.prototype=function(){return new Bn([[document.documentElement]],Hr)}.prototype={constructor:Bn,select:function(i){'function'!=typeof i&&(i=Er(i));for(var p=this._groups,t=p.length,a=Array(t),d=0;d<t;++d)for(var r,o,l=p[d],s=l.length,c=a[d]=Array(s),n=0;n<s;++n)(r=l[n])&&(o=i.call(r,r.__data__,n,l))&&('__data__'in r&&(o.__data__=r.__data__),c[n]=o);return new Bn(a,this._parents)},selectAll:function(i){'function'!=typeof i&&(i=Dr(i));for(var u=this._groups,t=u.length,a=[],d=[],r=0;r<t;++r)for(var o,l=u[r],s=l.length,c=0;c<s;++c)(o=l[c])&&(a.push(i.call(o,o.__data__,c,l)),d.push(o));return new Bn(a,d)},filter:function(i){'function'!=typeof i&&(i=Mr(i));for(var u=this._groups,t=u.length,a=Array(t),d=0;d<t;++d)for(var r,o=u[d],l=o.length,s=a[d]=[],n=0;n<l;++n)(r=o[n])&&i.call(r,r.__data__,n,o)&&s.push(r);return new Bn(a,this._parents)},data:function(w,C){if(!w)return p=Array(this.size()),l=-1,this.each(function(t){p[++l]=t}),p;var t=C?Jt:Cl,n=this._parents,i=this._groups;'function'!=typeof w&&(w=Or(w));for(var a=i.length,d=Array(a),r=Array(a),o=Array(a),l=0;l<a;++l){var s=n[l],c=i[l],u=c.length,p=w.call(s,s&&s.__data__,l,n),g=p.length,f=r[l]=Array(g),h=d[l]=Array(g),b=o[l]=Array(u);t(s,c,f,h,b,p,C);for(var m,y,x=0,k=0;x<g;++x)if(m=f[x]){for(x>=k&&(k=x+1);!(y=h[k])&&++k<g;);m._next=y||null}}return d=new Bn(d,n),d._enter=r,d._exit=o,d},enter:function(){return new Bn(this._enter||this._groups.map(Ur),this._parents)},exit:function(){return new Bn(this._exit||this._groups.map(Ur),this._parents)},join:function(r,o,t){var n=this.enter(),i=this,a=this.exit();return n='function'==typeof r?r(n):n.append(r+''),null!=o&&(i=o(i)),null==t?a.remove():t(a),n&&i?n.merge(i).order():i},merge:function(i){for(var e=this._groups,t=i._groups,a=e.length,d=t.length,r=fi(a,d),o=Array(a),l=0;l<r;++l)for(var s,c=e[l],u=t[l],p=c.length,g=o[l]=Array(p),n=0;n<p;++n)(s=c[n]||u[n])&&(g[n]=s);for(;l<a;++l)o[l]=e[l];return new Bn(o,this._parents)},order:function(){for(var o=this._groups,e=-1,t=o.length;++e<t;)for(var n,a=o[e],d=a.length-1,r=a[d];0<=--d;)(n=a[d])&&(r&&4^n.compareDocumentPosition(r)&&r.parentNode.insertBefore(n,r),r=n);return this},sort:function(i){function e(e,a){return e&&a?i(e.__data__,a.__data__):!e-!a}i||(i=Gt);for(var t=this._groups,a=t.length,d=Array(a),r=0;r<a;++r){for(var o,l=t[r],s=l.length,c=d[r]=Array(s),n=0;n<s;++n)(o=l[n])&&(c[n]=o);c.sort(e)}return new Bn(d,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){var n=Array(this.size()),e=-1;return this.each(function(){n[++e]=this}),n},node:function(){for(var n=this._groups,e=0,t=n.length;e<t;++e)for(var a,d=n[e],r=0,o=d.length;r<o;++r)if(a=d[r],a)return a;return null},size:function(){var t=0;return this.each(function(){++t}),t},empty:function(){return!this.node()},each:function(n){for(var e=this._groups,t=0,a=e.length;t<a;++t)for(var d,r=e[t],o=0,l=r.length;o<l;++o)(d=r[o])&&n.call(d,d.__data__,o,r);return this},attr:function(a,e){var d=Lr(a);if(2>arguments.length){var n=this.node();return d.local?n.getAttributeNS(d.space,d.local):n.getAttribute(d)}return this.each((null==e?d.local?tn:en:'function'==typeof e?d.local?rn:dn:d.local?an:nn)(d,e))},style:function(a,e,i){return 1<arguments.length?this.each((null==e?on:'function'==typeof e?sn:ln)(a,e,null==i?'':i)):cn(this.node(),a)},property:function(n,e){return 1<arguments.length?this.each((null==e?un:'function'==typeof e?gn:pn)(n,e)):this.node()[n]},classed:function(n,e){var o=fn(n+'');if(2>arguments.length){for(var a=hn(this.node()),d=-1,r=o.length;++d<r;)if(!a.contains(o[d]))return!1;return!0}return this.each(('function'==typeof e?vn:e?xn:kn)(o,e))},text:function(t){return arguments.length?this.each(null==t?wn:('function'==typeof t?Sn:Cn)(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?Tn:('function'==typeof t?Ln:_n)(t)):this.node().innerHTML},raise:function(){return this.each(An)},lower:function(){return this.each(En)},append:function(n){var a='function'==typeof n?n:Ar(n);return this.select(function(){return this.appendChild(a.apply(this,arguments))})},insert:function(a,d){var r='function'==typeof a?a:Ar(a),n=null==d?Dn:'function'==typeof d?d:Er(d);return this.select(function(){return this.insertBefore(r.apply(this,arguments),n.apply(this,arguments)||null)})},remove:function(){return this.each(Mn)},clone:function(t){return this.select(t?On:Un)},datum:function(t){return arguments.length?this.property('__data__',t):this.node().__data__},on:function(u,e,a){var d,r,i=jn(u+''),t=i.length;if(2>arguments.length){var l=this.node().__on;if(l)for(var n,s=0,o=l.length;s<o;++s)for(d=0,n=l[s];d<t;++d)if((r=i[d]).type===n.type&&r.name===n.name)return n.value;return}for(l=e?qn:Rn,null==a&&(a=!1),d=0;d<t;++d)this.each(l(i[d],e,a));return this},dispatch:function(n,e){return this.each(('function'==typeof e?zn:Fn)(n,e))}};var Pr=function(t){return'string'==typeof t?new Bn([[document.querySelector(t)]],[document.documentElement]):new Bn([[t]],Hr)},Fr=function(){for(var n,e=Rr;n=e.sourceEvent;)e=n;return e},zr=function(d,e){var t=d.ownerSVGElement||d;if(t.createSVGPoint){var n=t.createSVGPoint();return n.x=e.clientX,n.y=e.clientY,n=n.matrixTransform(d.getScreenCTM().inverse()),[n.x,n.y]}var i=d.getBoundingClientRect();return[e.clientX-i.left-d.clientLeft,e.clientY-i.top-d.clientTop]},Yr=function(n){var e=Fr();return e.changedTouches&&(e=e.changedTouches[0]),zr(n,e)},Br=function(n,e,t){3>arguments.length&&(t=e,e=Fr().changedTouches);for(var a,d=0,r=e?e.length:0;d<r;++d)if((a=e[d]).identifier===t)return zr(n,a);return null},Wr=function(){Rr.preventDefault(),Rr.stopImmediatePropagation()},Vr=function(a){var e=a.document.documentElement,t=Pr(a).on('dragstart.drag',Wr,!0);'onselectstart'in e?t.on('selectstart.drag',Wr,!0):(e.__noselect=e.style.MozUserSelect,e.style.MozUserSelect='none')};$n.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};var $r=function(){function k(t){t.on('mousedown.drag',v).filter(g).on('touchstart.drag',i).on('touchmove.drag',a).on('touchend.drag touchcancel.drag',d).style('touch-action','none').style('-webkit-tap-highlight-color','rgba(0,0,0,0)')}function v(){if(!w&&C.apply(this,arguments)){var a=r('mouse',p.apply(this,arguments),Yr,this,arguments);a&&(Pr(Rr.view).on('mousemove.drag',t,!0).on('mouseup.drag',n,!0),Vr(Rr.view),Sl(),s=!1,o=Rr.clientX,l=Rr.clientY,a('start'))}}function t(){if(Wr(),!s){var n=Rr.clientX-o,e=Rr.clientY-l;s=n*n+e*e>m}h.mouse('drag')}function n(){Pr(Rr.view).on('mousemove.drag mouseup.drag',null),Vn(Rr.view,s),Wr(),h.mouse('end')}function i(){if(C.apply(this,arguments)){var n,e,t=Rr.changedTouches,i=p.apply(this,arguments),o=t.length;for(n=0;n<o;++n)(e=r(t[n].identifier,i,Br,this,arguments))&&(Sl(),e('start'))}}function a(){var n,e,t=Rr.changedTouches,i=t.length;for(n=0;n<i;++n)(e=h[t[n].identifier])&&(Wr(),e('drag'))}function d(){var n,e,t=Rr.changedTouches,i=t.length;for(w&&clearTimeout(w),w=setTimeout(function(){w=null},500),n=0;n<i;++n)(e=h[t[n].identifier])&&(Sl(),e('end'))}function r(m,t,n,a,i){var d,r,l,s=n(t,m),c=f.copy();return Hn(new $n(k,'beforestart',d,m,b,s[0],s[1],0,0,c),function(){return null!=(Rr.subject=d=e.apply(a,i))&&(r=d.x-s[0]||0,l=d.y-s[1]||0,!0)})?function e(o){var u,p=s;switch(o){case'start':h[m]=e,u=b++;break;case'end':delete h[m],--b;case'drag':s=n(t,m),u=b;}Hn(new $n(k,o,d,m,u,s[0]+r,s[1]+l,s[0]-p[0],s[1]-p[1],c),c.apply,c,[o,a,i])}:void 0}var o,l,s,w,C=Kn,p=Qn,e=Jn,g=Gn,h={},f=Ft('start','drag','end'),b=0,m=0;return k.filter=function(e){return arguments.length?(C='function'==typeof e?e:constant(!!e),k):C},k.container=function(e){return arguments.length?(p='function'==typeof e?e:constant(e),k):p},k.subject=function(n){return arguments.length?(e='function'==typeof n?n:constant(n),k):e},k.touchable=function(e){return arguments.length?(g='function'==typeof e?e:constant(!!e),k):g},k.on=function(){var e=f.on.apply(f,arguments);return e===f?k:e},k.clickDistance=function(e){return arguments.length?(m=(e=+e)*e,k):ii(m)},k};const Kr=Si('d-slider',`
<style>
  :host {
    position: relative;
    display: inline-block;
  }

  :host(:focus) {
    outline: none;
  }

  .background {
    padding: 9px 0;
    color: white;
    position: relative;
  }

  .track {
    height: 3px;
    width: 100%;
    border-radius: 2px;
    background-color: hsla(0, 0%, 0%, 0.2);
  }

  .track-fill {
    position: absolute;
    top: 9px;
    height: 3px;
    border-radius: 4px;
    background-color: hsl(24, 100%, 50%);
  }

  .knob-container {
    position: absolute;
    top: 10px;
  }

  .knob {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 13px;
    height: 13px;
    background-color: hsl(24, 100%, 50%);
    border-radius: 50%;
    transition-property: transform;
    transition-duration: 0.18s;
    transition-timing-function: ease;
  }
  .mousedown .knob {
    transform: scale(1.5);
  }

  .knob-highlight {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 13px;
    height: 13px;
    background-color: hsla(0, 0%, 0%, 0.1);
    border-radius: 50%;
    transition-property: transform;
    transition-duration: 0.18s;
    transition-timing-function: ease;
  }

  .focus .knob-highlight {
    transform: scale(2);
  }

  .ticks {
    position: absolute;
    top: 16px;
    height: 4px;
    width: 100%;
    z-index: -1;
  }

  .ticks .tick {
    position: absolute;
    height: 100%;
    border-left: 1px solid hsla(0, 0%, 0%, 0.2);
  }

</style>

  <div class='background'>
    <div class='track'></div>
    <div class='track-fill'></div>
    <div class='knob-container'>
      <div class='knob-highlight'></div>
      <div class='knob'></div>
    </div>
    <div class='ticks'></div>
  </div>
`),Qr={left:37,up:38,right:39,down:40,pageUp:33,pageDown:34,end:35,home:36};class Xr extends Kr(HTMLElement){connectedCallback(){this.connected=!0,this.setAttribute('role','slider'),this.hasAttribute('tabindex')||this.setAttribute('tabindex',0),this.mouseEvent=!1,this.knob=this.root.querySelector('.knob-container'),this.background=this.root.querySelector('.background'),this.trackFill=this.root.querySelector('.track-fill'),this.track=this.root.querySelector('.track'),this.min=this.min?this.min:0,this.max=this.max?this.max:100,this.scale=Te().domain([this.min,this.max]).range([0,1]).clamp(!0),this.origin=void 0===this.origin?this.min:this.origin,this.step=this.step?this.step:1,this.update(this.value?this.value:0),this.ticks=!!this.ticks&&this.ticks,this.renderTicks(),this.drag=$r().container(this.background).on('start',()=>{this.mouseEvent=!0,this.background.classList.add('mousedown'),this.changeValue=this.value,this.dragUpdate()}).on('drag',()=>{this.dragUpdate()}).on('end',()=>{this.mouseEvent=!1,this.background.classList.remove('mousedown'),this.dragUpdate(),this.changeValue!==this.value&&this.dispatchChange(),this.changeValue=this.value}),this.drag(Pr(this.background)),this.addEventListener('focusin',()=>{this.mouseEvent||this.background.classList.add('focus')}),this.addEventListener('focusout',()=>{this.background.classList.remove('focus')}),this.addEventListener('keydown',this.onKeyDown)}static get observedAttributes(){return['min','max','value','step','ticks','origin','tickValues','tickLabels']}attributeChangedCallback(a,e,t){isNaN(t)||void 0===t||null===t||('min'==a&&(this.min=+t,this.setAttribute('aria-valuemin',this.min)),'max'==a&&(this.max=+t,this.setAttribute('aria-valuemax',this.max)),'value'==a&&this.update(+t),'origin'==a&&(this.origin=+t),'step'==a&&0<t&&(this.step=+t),'ticks'==a&&(this.ticks=''===t||t))}onKeyDown(n){this.changeValue=this.value;let e=!1;switch(n.keyCode){case Qr.left:case Qr.down:this.update(this.value-this.step),e=!0;break;case Qr.right:case Qr.up:this.update(this.value+this.step),e=!0;break;case Qr.pageUp:this.update(this.value+10*this.step),e=!0;break;case Qr.pageDown:this.update(this.value+10*this.step),e=!0;break;case Qr.home:this.update(this.min),e=!0;break;case Qr.end:this.update(this.max),e=!0;break;default:}e&&(this.background.classList.add('focus'),n.preventDefault(),n.stopPropagation(),this.changeValue!==this.value&&this.dispatchChange())}validateValueRange(a,e,t){return ci(fi(e,t),a)}quantizeValue(n,e){return pi(n/e)*e}dragUpdate(){const a=this.background.getBoundingClientRect(),e=Rr.x,t=a.width;this.update(this.scale.invert(e/t))}update(n){let e=n;'any'!==this.step&&(e=this.quantizeValue(n,this.step)),e=this.validateValueRange(this.min,this.max,e),this.connected&&(this.knob.style.left=100*this.scale(e)+'%',this.trackFill.style.width=100*this.scale(this.min+ri(e-this.origin))+'%',this.trackFill.style.left=100*this.scale(fi(e,this.origin))+'%'),this.value!==e&&(this.value=e,this.setAttribute('aria-valuenow',this.value),this.dispatchInput())}dispatchChange(){const e=new Event('change');this.dispatchEvent(e,{})}dispatchInput(){const e=new Event('input');this.dispatchEvent(e,{})}renderTicks(){const a=this.root.querySelector('.ticks');if(!1!==this.ticks){let e=[];e=0<this.ticks?this.scale.ticks(this.ticks):'any'===this.step?this.scale.ticks():va(this.min,this.max+1e-6,this.step),e.forEach((e)=>{const t=document.createElement('div');t.classList.add('tick'),t.style.left=100*this.scale(e)+'%',a.appendChild(t)})}else a.style.display='none'}}var Zr='<svg viewBox="-607 419 64 64">\n  <path d="M-573.4,478.9c-8,0-14.6-6.4-14.6-14.5s14.6-25.9,14.6-40.8c0,14.9,14.6,32.8,14.6,40.8S-565.4,478.9-573.4,478.9z"/>\n</svg>\n';const Jr=`
<style>
pal-header {
  position: relative;
  height: 60px;
  background-color: hsl(200, 60%, 15%);
  width: 100%;
  box-sizing: border-box;
  z-index: 2;
  color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}
pal-header .content {
  height: 70px;
  grid-column: page;
}
pal-header a {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 22px 0;
}
pal-header a:hover {
  color: rgba(255, 255, 255, 1);
}
pal-header svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}
@media(min-width: 1080px) {
  pal-header {
    height: 70px;
  }
  pal-header a {
    height: 70px;
    line-height: 70px;
    padding: 28px 0;
  }
  pal-header .logo {
  }
}
pal-header svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}
pal-header .logo {
  font-size: 17px;
  font-weight: 200;
}
pal-header .nav {
  float: right;
  font-weight: 300;
}
pal-header .nav a {
  font-size: 12px;
  margin-left: 24px;
  text-transform: uppercase;
}
</style>
<div class="content">
  <a href="https://predictive-analytics-lab.github.io/" class="logo">
    ${Zr}
    Predictive Analytics Laboratory
  </a>
  <nav class="nav">
    <a href="https://predictive-analytics-lab.com/reading">Reading Group</a>
    <a href="https://predictive-analytics-lab.com/publications">Publications</a>
    <a href="https://predictive-analytics-lab.com/jobs">Jobs</a>
  </nav>
</div>
`,Gr=Si('pal-header',Jr,!1);class eo extends Gr(HTMLElement){}const to=`
<style>
distill-header {
  position: relative;
  height: 60px;
  background-color: hsl(200, 60%, 15%);
  width: 100%;
  box-sizing: border-box;
  z-index: 2;
  color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}
distill-header .content {
  height: 70px;
  grid-column: page;
}
distill-header a {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 22px 0;
}
distill-header a:hover {
  color: rgba(255, 255, 255, 1);
}
distill-header svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}
@media(min-width: 1080px) {
  distill-header {
    height: 70px;
  }
  distill-header a {
    height: 70px;
    line-height: 70px;
    padding: 28px 0;
  }
  distill-header .logo {
  }
}
distill-header svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}
distill-header .logo {
  font-size: 17px;
  font-weight: 200;
}
distill-header .nav {
  float: right;
  font-weight: 300;
}
distill-header .nav a {
  font-size: 12px;
  margin-left: 24px;
  text-transform: uppercase;
}
</style>
<div class="content">
  <a href="/" class="logo">
    ${Zr}
    Distill
  </a>
  <nav class="nav">
    <a href="/about/">About</a>
    <a href="/prize/">Prize</a>
    <a href="/journal/">Submit</a>
  </nav>
</div>
`,no=Si('distill-header',to,!1);class io extends no(HTMLElement){}const ao=`
<style>
  pal-appendix {
    contain: layout style;
  }

  pal-appendix .citation {
    font-size: 11px;
    line-height: 15px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 18px;
    border: 1px solid rgba(0,0,0,0.1);
    background: rgba(0, 0, 0, 0.02);
    padding: 10px 18px;
    border-radius: 3px;
    color: rgba(150, 150, 150, 1);
    overflow: hidden;
    margin-top: -12px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  pal-appendix > * {
    grid-column: text;
  }
</style>
`;class ro extends HTMLElement{static get is(){return'pal-appendix'}set frontMatter(t){this.innerHTML=ei(t)}}const oo=`
<style>

:host {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  padding: 2rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: hsl(180, 5%, 15%); /*hsl(200, 60%, 15%);*/
  text-align: left;
  contain: content;
}

.footer-container .logo svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}

.footer-container .logo svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}

.footer-container .logo {
  font-size: 17px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-right: 6px;
}

.footer-container {
  grid-column: text;
}

.footer-container .nav {
  font-size: 0.9em;
  margin-top: 1.5em;
}

.footer-container .nav a {
  color: rgba(255, 255, 255, 0.8);
  margin-right: 6px;
  text-decoration: none;
}

</style>

<div class='footer-container'>

  <a href="/" class="logo">
    ${Zr}
    Predictive Analytics Laboratory
  </a> does innovative machine learning research

  <div class="nav">
    <a href="https://predictive-analytics-lab.com/#important_dates">About</a>
    <a href="https://predictive-analytics-lab.com/#projects">Projects</a>
    <a href="https://predictive-analytics-lab.com/#teampics">Team</a>
    <a href="https://predictive-analytics-lab.com/publications">Publications</a>
    <a href="https://predictive-analytics-lab.com/reading">Reading Group</a>
    <a href="https://predictive-analytics-lab.com/#contactUs">Contact</a>
    <a href="https://github.com/predictive-analytics-lab">GitHub</a>
  </div>

</div>

`,lo=Si('pal-footer',oo);class so extends lo(HTMLElement){}const co=`
<style>

:host {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  padding: 2rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: hsl(180, 5%, 15%); /*hsl(200, 60%, 15%);*/
  text-align: left;
  contain: content;
}

.footer-container .logo svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}

.footer-container .logo svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}

.footer-container .logo {
  font-size: 17px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-right: 6px;
}

.footer-container {
  grid-column: text;
}

.footer-container .nav {
  font-size: 0.9em;
  margin-top: 1.5em;
}

.footer-container .nav a {
  color: rgba(255, 255, 255, 0.8);
  margin-right: 6px;
  text-decoration: none;
}

</style>

<div class='footer-container'>

  <a href="/" class="logo">
    ${Zr}
    Distill
  </a> is dedicated to clear explanations of machine learning

  <div class="nav">
    <a href="https://distill.pub/about/">About</a>
    <a href="https://distill.pub/journal/">Submit</a>
    <a href="https://distill.pub/prize/">Prize</a>
    <a href="https://distill.pub/archive/">Archive</a>
    <a href="https://distill.pub/rss.xml">RSS</a>
    <a href="https://github.com/distillpub">GitHub</a>
    <a href="https://twitter.com/distillpub">Twitter</a>
    &nbsp;&nbsp;&nbsp;&nbsp; ISSN 2476-0757
  </div>

</div>

`,uo=Si('distill-footer',co);class po extends uo(HTMLElement){}window.distill={runlevel:0,initialize:function(){if(1>window.distill.runlevel)throw new Error('Insufficient Runlevel for Distill Template!');if('distill'in window&&window.distill.templateIsLoading)throw new Error('Runlevel 1: Distill Template is getting loaded more than once, aborting!');else window.distill.templateIsLoading=!0,console.debug('Runlevel 1: Distill Template has started loading.');c(document),console.debug('Runlevel 1: Static Distill styles have been added.'),console.debug('Runlevel 1->2.'),window.distill.runlevel+=1;for(const[n,e]of Object.entries(Tl.listeners))'function'==typeof e?document.addEventListener(n,e):console.error('Runlevel 2: Controller listeners need to be functions!');if(console.debug('Runlevel 2: We can now listen to controller events.'),console.debug('Runlevel 2->3.'),window.distill.runlevel+=1,2>window.distill.runlevel)throw new Error('Insufficient Runlevel for adding custom elements!');const n=[Yi,Wi,$i,Xi,Zi,Gi,ta,aa,ra,la,T,ca,ua,Ni,ga,fa,ha,Xr,ma].concat([eo,io,ro,so,po]);for(const e of n)console.debug('Runlevel 2: Registering custom element: '+e.is),customElements.define(e.is,e);console.debug('Runlevel 3: Distill Template finished registering custom elements.'),console.debug('Runlevel 3->4.'),window.distill.runlevel+=1,o()&&Tl.listeners.DOMContentLoaded(),console.debug('Runlevel 4: Distill Template initialisation complete.'),window.distill.templateIsLoading=!1,window.distill.templateHasLoaded=!0},templateIsLoading:!1},Fi.browserSupportsAllFeatures()?(console.debug('Runlevel 0: No need for polyfills.'),console.debug('Runlevel 0->1.'),window.distill.runlevel+=1,window.distill.initialize()):(console.debug('Runlevel 0: Distill Template is loading polyfills.'),Fi.load(window.distill.initialize))});
//# sourceMappingURL=template.v2.js.map
