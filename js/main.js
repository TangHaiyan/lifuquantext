(function () {
      //通过设置htmlfont-size大小，自适应屏幕大小。
      function defaultFontSize(){
         var d = window.document.createElement('div');
          d.style.width = '1rem';
          d.style.display = "none";
          var head = window.document.getElementsByTagName('head')[0];
          head.appendChild(d);
          var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
          d.remove();
          return defaultFontSize;
      }
      var defaultFontSize = defaultFontSize();

      function adapt(designWidth, rem2px){
          var head = window.document.getElementsByTagName('head')[0];
          document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';

          var x=window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
          var st = document.createElement('style');
          var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ x + "}}"
          var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
          st.innerHTML = portrait;
          head.appendChild(st);
          
      };
      adapt(750, 100);

	   window.onresize = function(){

	      //屏幕缩放时，重新设置html-font-size
         var st = document.getElementsByTagName('style')[0];
         var head = document.getElementsByTagName('head')[0];
         head.removeChild(st)
         adapt(640, 100);
	       
	    }


 window.onload=function(){

//判断是否是微信浏览器
function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
var openInWechat = document.getElementsByClassName('openInWechat')[0];
var swiperContainer = document.getElementsByClassName('swiper-container')[0];

var isWeixin = is_weixin();
if(!isWeixin){
  openInWechat.style.display="block";
  swiperContainer.style.display="none";
  console.log("扫描二维码，在微信中打开")
}else{
  openInWechat.style.display="none";
  swiperContainer.style.display="block";
}



 //点击显示规则内容 getElementById
 var ruleButton = document.getElementById('ruleButton');
 var ruleButton2 = document.getElementById('ruleButton2');
 var closeButton = document.getElementsByClassName('close')[0];
 var closeButton2 = document.getElementsByClassName('close2')[0];
 var closeButton3 = document.getElementsByClassName('close3')[0];
 var ruleText = document.getElementById('ruleText');
 var ruleText2 = document.getElementById('ruleText2');

 var prizeIntro = document.getElementsByClassName('prizeIntro')[0];
 var prizeButton = document.getElementById('prizeButton');

 var leadToShareContainer =  document.getElementsByClassName('leadToShareContainer')[0];
 var closeButton4 = document.getElementsByClassName('close4')[0]; 
 var leadToShareButton =  document.getElementsByClassName('leadToShareButton')[0];

 var myShareContainer = document.getElementsByClassName('myShareContainer')[0];
 var shareTimesButton = document.getElementsByClassName('shareTimesButton')[0];
 var closeButton5 = document.getElementsByClassName('close5')[0];


var show = function(button,ele){
  button.addEventListener('click',function(){ 
    ele.style.animation = "fadein 500ms ease-out";
    ele.style.display = "block";
 })
} ;
var hide = function(button,ele){
  button.addEventListener('click',function(){ 
    ele.style.animation = "fadeout 500ms linear";
     ele.style.display = "none";
 }) 
}




//首页查看规则关闭规则
show(ruleButton,ruleText);
hide(closeButton,ruleText);

//奖品介绍页 查看规则关闭规则
show(ruleButton2,ruleText2);
hide(closeButton2,ruleText2);
 

//查看奖品页 查看奖品介绍关闭奖品介绍
 show(prizeButton,prizeIntro);
 hide(closeButton3,prizeIntro);


//引导分享 显示 隐藏
 hide(closeButton4,leadToShareContainer);
 show(leadToShareButton,leadToShareContainer);

//查看转发次数
show(shareTimesButton,myShareContainer);
hide(closeButton5,myShareContainer);


}

})()