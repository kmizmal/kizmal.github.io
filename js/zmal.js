!function(t,n){const o=n.createElement("div");o.style.cssText="\n        position: fixed; \n        top: 0; \n        left: 0; \n        width: 0; \n        height: 3px; \n        box-shadow: 0 0 3px #999; \n        background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); \n        z-index: 999999; \n        transition: width 0.3s linear;\n    ",n.body.appendChild(o);const e=t.innerHeight||n.documentElement.clientHeight||n.body.clientHeight;t.addEventListener("scroll",(()=>{const t=n.body.offsetHeight-e,i=scrollY/t*100;o.style.width=Math.min(Math.max(i,0),100)+"%"}),!1)}(window,document),function(){function t(t,n,o){return t.getAttribute(n)||o}function n(){e=c.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,i=c.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function o(){function t(t,n,o,e,i){n===h&&o>=n.max/2&&(t.x-=.03*e,t.y-=.03*i)}function n(t){t.color||(t.color="rgba(255, 0, 0, 1)"),(!t.targetColor||Math.random()<.01)&&(t.targetColor="rgba("+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+",1)");const n=t.color.match(/\d+/g).map(Number),o=t.targetColor.match(/\d+/g).map(Number),e=n.map(((t,n)=>Math.floor(t+.1*(o[n]-t))));t.color=`rgba(${e.join(",")})`}function a(t,n,o){s.beginPath(),s.lineWidth=o/2,s.strokeStyle=t.color,s.moveTo(t.x,t.y),s.lineTo(n.x,n.y),s.stroke()}s.clearRect(0,0,e,i),l.forEach((function(o,r){!function(t){t.x+=t.xa,t.y+=t.ya}(o),function(t){t.xa*=t.x>e||t.x<0?-1:1,t.ya*=t.y>i||t.y<0?-1:1}(o),s.fillRect(o.x-.5,o.y-.5,1,1),function(o,e){for(let i=e+1;i<l.length;i++){let e=l[i];if(null!==e.x&&null!==e.y){let i=o.x-e.x,r=o.y-e.y,l=i*i+r*r;if(l<e.max){t(o,e,l,i,r);let c=(e.max-l)/e.max;n(o),a(o,e,c)}}}}(o,r)})),requestAnimationFrame(o)}var e,i,a,r,l=[],c=document.createElement("canvas"),d={l:1+(r=(a=document.getElementsByTagName("script")).length-1),z:t(a[r],"zIndex",-1),o:t(a[r],"opacity",3),c:t(a[r],"color","255,0,0"),n:t(a[r],"count",85)},m="c_n"+d.l,s=c.getContext("2d"),u=(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame,Math.random),h={x:null,y:null,max:2e4};c.id=m,c.style.cssText="position:fixed;top:0;left:0;z-index:"+d.z+";opacity:"+d.o+";",document.body.appendChild(c),n(),window.onresize=n,window.onmousemove=function(t){t=t||window.event,h.x=t.clientX,h.y=t.clientY},window.onmouseout=function(){h.x=null,h.y=null};for(var f=0;d.n>f;f++){var x=u()*e,g=u()*i,y=2*u()-1,w=2*u()-1;l.push({x:x,y:g,xa:y,ya:w,max:6e3})}l.push(h),setTimeout((function(){o()}),100)}();const quotes=["❤去活出你自己。❤","❤今天的好计划胜过明天的完美计划。❤","❤不要轻言放弃，否则对不起自己。❤","❤紧要关头不放弃，绝望就会变成希望。❤","❤如果不能改变结果，那就完善过程。❤","❤好好活就是干有意义的事，有意义的事就是好好活！❤","❤桃李春风一杯酒，江湖夜雨十年灯。❤","❤欲买桂花同载酒，终不似，少年游。❤"];let a_idx=0;function getRandomStyles(t,n){return{"z-index":9999,top:n-20,left:t,position:"absolute","font-weight":"bold",color:getRandomColor()}}function getRandomColor(){return`rgb(${Math.floor(256*Math.random())},${Math.floor(256*Math.random())},${Math.floor(256*Math.random())})`}$("body").click((function(t){const n=quotes[a_idx];a_idx=(a_idx+1)%quotes.length;const o=$("<span class='quote'></span>").text(n).css(getRandomStyles(t.pageX,t.pageY));$("body").append(o);const e=Math.floor(81*Math.random())-40,i=2.2*Math.random()+.8;o.css({transform:`rotate(${e}deg) scale(2.5)`,transition:`transform ${i}s ease, opacity ${i}s ease`,"will-change":"transform, opacity"}),requestAnimationFrame((()=>{setTimeout((()=>{o.css({opacity:0,transform:`translate(50px,-100px) scale(0.5) rotate(${e/2}deg)`})}),10)})),o.on("transitionend",(function(){o.remove()}))}));