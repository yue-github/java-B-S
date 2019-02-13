// home.js部分
window.onload=function(){
	+function($){
		var $phoneN=$("#fPosition_home_login > .fPosition_home_login_phone > .phoneN")[0],
		    $phoneP=$(".fPosition_home_login_password > .phoneP")[0],
		    $glyphicon_lt_sec=$(".fPosition_home_login_password > .glyphicon_lt_sec"),
		    $phone=$(".fPosition_home_login_phone"),
		    $prove_input_fir=$("#fPosition_home_login > .prove > .proveN > ul > li > .fir")[0],
		    $prove_input=$("#fPosition_home_login > .prove > .proveN > ul > li > input"),
		    $prove=$("#fPosition_home_login > .prove"),
		    $prove_glyphicon=$('#fPosition_home_login > .prove > .glyphicon_lt_thir'),
		    $prove_next=$("#fPosition_home_login > .prove > .next_thir"),
		    $password=$("#fPosition_home_login > .fPosition_home_login_password"),
		    $next_fir=$("#fPosition_home_login > .fPosition_home_login_phone > .next"),
		    $nextPass=$(".fPosition_home_login_password > .next");
		$phoneN.focus();
		// 点击切换到验证码
		$next_fir.click(function(){
			if($($phoneN).val().match(/^\d{11}$/)==null){
				alert("输入有误")
				return false
			}; 
			$phone.animate({"left":"-100%"},500);
			// $prove.css({"display":"block"});
			$prove.slideDown(1000);
			$prove_input_fir.focus();
		});
		//点击第二个小于号号切换到login页面
		$prove_glyphicon.click(function(){
			$prove.css({"display":"none"});
			$phone.animate({"left":"0"},500,function(){
				$phoneN.focus();
			});
		});
		//点击第三个下一步时跳转主页面
		$nextPass.click(function(){
				var boo=confirm("确定以输入的密码作为密码么？");
				if(boo){
					if($($phoneP).val().match(/^[\da-zA-Z]+$/)==null){
						alert("输入有误")
						return false;
					}
				}else{
					return false;
				}
			window.location="home/index.html";
		});
		$("#fPosition_home_login > .home_pass").click(function(){
			window.location="home/index.html";
		});
		$prove_input_fir.focus();

		//点击验证码中的下一步执行跳转到输入密码页面
		$prove_next.click(function(){
			do_password();
			
		});
		do_password=function(){
			$prove.animate({"left":"-100%"},500,function(){
				$password.slideDown(100);
				$phoneP.focus();
				$glyphicon_lt_sec.css({"visibility":"visible"});
			});
		};
		//点击输入密码中的小于号时返回验证码一栏
		$glyphicon_lt_sec.click(function(){
			$password.css({"display":"none"});
			$prove.animate({"left":"0"},500)
		});
		// 为了得到index
		$prove_input.each(function(i,e){$(e).data("index",i)});
		// 监听表单数值变化
		$prove_input.on("input",function(){
			// if()
			if($(this).val().replace(/\s+/g,"")!=""){
				var the_index=parseInt($(this).data("index"));
				$prove_input.eq(the_index+1).focus();
				if(the_index>4){
					alert("输入正确")
					do_password();
				}
			}
		})

		// 判断屏幕是竖屏还是横屏
		var me=this;
		me.screen_boo=true;
		me.screen_box=document.getElementById("yue_screen_h");
		me.findPosition=document.getElementById("fPosition_home_login");
		me.screenIs_h_or_s=function(){
			// 用于灵活载入设备宽度
			// me.screenCW=window.screen.availWidth/2;
			if(window.orientation==180||window.orientation==0){
				me.screen_boo=true;
				me.screen_box.style["display"]="none";
				me.findPosition.style["display"]="block";
				// alert("素屏")
			};
			if((window.orientation==90||window.orientation==-90)&&me.screen_boo==true){
				me.screen_boo=false;
				// alert("横屏");
				me.screen_box.style["display"]="block";
				me.findPosition.style["display"]="none";
				return false;
			};

		},
		// 检查屏幕状态
		window.addEventListener("orientationchange"in window?"orientationchange":"resize",me.screenIs_h_or_s,false);
	}($)
}
