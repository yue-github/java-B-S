//home/index.js部分
//jsonp函数设置，并本地储存相应数据
function yue_FP_city_callBack(data_city){
	sessionStorage.setItem("city_data",data_city);
	data_city=JSON.parse(data_city);
	var li,
		city_str="",
		data_cityL=data_city.length,
		city_main_ul=document.getElementById("P_cityChoose").children[2].children[0].children[0];
	for(var j in data_city[0]){
		li="<li>"+data_city[0][j]+"</li>"; 
		city_str+=li;
	};
	for(var i=1;i<data_cityL;i++){
		li="<p>"+data_city[i]["letter"]+"</p>";
		city_str+=li;
		for(var z=0;z<data_city[i].length;z++){
			li="<li>"+data_city[i][z]+"</li>";
			city_str+=li;
		};
	} ;
	city_main_ul.innerHTML=city_str;
};
window.onload=function(){
	// 避免污染全局,闭包应用
!function($){
	// 公共类对象
	function yue_public(){
		this.$findPosition=$("#findPosition");
		this.$P_cityChoose=$("#P_cityChoose");
		this.$FP_position=$(" #findPosition > .topFixed > .top > .head > .center > .middle > .position");
		this.$city_the_city=$("#P_cityChoose > .centerFixed > .top > span");
		this.$search_position=$("#search_position");
		this.$search_position_city_left=$("#search_position > .search_top > .top_main > .s_t_left");
	}
	// 主页面对象
	var yue_findPosition={
		// 整的一个函数调用，执行所有相关子函数，例如初始化变量
		do:function(){
			this.reset();
			this.startDoing();
			this.bind();
			this.data();
			this.finalDoing();
		},
		startDoing:function(){
			this.fp_data_show_right.css({"top":0});
			this.$P_cityChoose.css("display","none");
			this.$search_position.css("display","none");
			this.$add_FP_car_ajax_main=this.$FP_middle_ul.html();
			this.$font_logo_li.eq(0).css("color","#f40");
			// 解决网络较慢时的加载图片
			this.$fp_load_img_m.css({"background":"none","backgroundSize":"none"});
			this.$font_logo_li.each(function(i,e){$(e).data("index_f",i)});
			this.$FP_car_ul_lia.eq(0).css("color","#f40");
			this.$FP_car_ul_lia.each(function(i,e){$(e).data("index",i)});
			this.$FP_middle_ul_car_img_src="image/car/s_car.jpg";
			this.fp_data_s_content_sec_li.eq(0).children("span").html(this.FP_sec_li_year);
			this.FP_sec_li_Month<10?this.fp_data_s_content_sec_li.eq(2).children("span").html("0"+this.FP_sec_li_Month):this.fp_data_s_content_sec_li.eq(2).children("span").html(this.FP_sec_li_Month);
			this.fp_data_s_content_sec_li.eq(4).children("span").html(this.FP_sec_li_Date);
			this.fp_data_s_content_sec_li.eq(6).children("span").html(this.FP_sec_li_Hours);
			this.FP_sec_li_Minutes<10?this.fp_data_s_content_sec_li.eq(8).children("span").html("0"+this.FP_sec_li_Minutes):this.fp_data_s_content_sec_li.eq(8).children("span").html(this.FP_sec_li_Minutes);
			this.FP_date_fun();
			// 注意：新增独立模块需要再设置其横屏下消失
			window.addEventListener("orientationchange",$.proxy(this.screenIs_h_or_s,this),false);
		},
		finalDoing:function(){
			this.FP_position_fun();
		},
		// 初始化变量数据
		reset:function(){
			// 滑动延迟定时器
			this.timer_e=null;
			// 中部可移动延长位移定时器
			this.timer_car=null;
			// 屏幕横竖布尔值
			this.screen_boo=true;
			//判断中部数据加载时是否出现动画
			this.middle_load_boo=true;
			// 持续transition动画判断
			this.screen_box=$("#yue_screen_h");
			this.$fp_load_img_m=$("#findPosition > .middle");
			this.$fp_imgShow_img_bg=$("#findPosition > .fp_imgShow > .img_bg");
			this.$fp_imgShow_move=$("#findPosition > .fp_imgShow > .content > .content_m"); 
			this.$FP_mid_data_load=$("#findPosition > .middle > .FP_data_load");
			// 中部可滑动模块
			this.$FP_middle_ul=$("#findPosition > .middle > ul");
			//获取具体的logo图标用span标签承接bootstrap中的font字体图标
			this.$font_logo_li=$("#findPosition > .bottomFixed >.bottom > ul > li");
			this.$FP_car_ul=$("#findPosition > .topFixed > .top > .foot > ul");
			this.$FP_car_title=$("#findPosition > .topFixed > .top > .foot > .title");
			this.$FP_car_ul_lia=$("#findPosition > .topFixed > .top > .foot > ul > li > a");
			this.screenCW=window.screen.availWidth/2;
			this.FP_the_date_li=$("#findPosition > .middle > ul > .add_FP_car_ajax_main > ul > .sec_li");
			this.new_da=new Date();
			this.FP_sec_li_park_time=3;
			this.FP_sec_li_park_ti="小时";
			this.FP_sec_li_year=this.new_da.getFullYear();
			this.FP_sec_li_Month=this.new_da.getMonth()+1;
			this.FP_sec_li_Date=this.new_da.getDate();
			// this.FP_sec_li_up_d="上午";
			// 获取24小时制
			this.FP_sec_li_Hours=parseInt(this.new_da.toLocaleString("chinese",{hour12:false}).match(/\d+(?=\:)/)[0]);
			this.FP_sec_li_Minutes=this.new_da.getMinutes();
			this.fp_data_show_left=$("#findPosition > .fp_data_show > .data_main > .content > .db_line > .left > ul");
			this.fp_data_show_right=$("#findPosition > .fp_data_show > .data_main > .content > .db_line > .right > ul");
			this.fp_data_show_content=$("#findPosition > .fp_data_show > .data_main > .content");
			this.fp_data_show_content_sec=$("#findPosition > .fp_data_show > .data_main > .content_sec");
			this.fp_data_show_content_thir=$("#findPosition > .fp_data_show > .data_main > .content_thir");
			// 停车时长区域li
			this.fp_data_s_content_sec_li=$("#findPosition > .fp_data_show > .data_main > .content_sec > .db_line_s > ul > li");
			this.fp_data_show_title=$("#findPosition > .fp_data_show > .data_main > .title");
			// this.fp_m_ul_car_ajax_main_four=$("#findPosition > .middle > ul > .add_FP_car_ajax_main > ul > .four");
			this.fp_data_show_f_p_ok_t_left=$("#findPosition > .fp_data_show > .data_main > .content_thir > .ok_t_left");
			this.fp_data_show_f_p_ok_t_right=$("#findPosition > .fp_data_show > .data_main > .content_thir > .ok_t_right");
			this.fp_data_show_f_p_long_li_main=$("#findPosition > .fp_data_show > .data_main > .content_thir > ul > li");
			this.fp_data_show_year_span=$("#findPosition > .fp_data_show > .data_main > .content_sec > .db_line_s > ul > :nth-child(1) > span");
			yue_public.call(this);
		},
		// 为各种元素添加绑事件
		bind:function(){
			this.$font_logo_li.on("touchstart",$.proxy(this.change_fontLogo_s_fun,this));
			this.$font_logo_li.on("touchend",$.proxy(this.change_fontLogo_e_fun,this));
			this.$FP_car_ul_lia.on("touchstart",$.proxy(this.$FP_car_lia_s_fun,this));
			this.$FP_car_ul_lia.on("touchmove",$.proxy(this.$FP_car_lia_m_fun,this));
			this.$FP_car_ul_lia.on("touchend",$.proxy(this.$FP_car_lia_e_fun,this));
			this.$FP_middle_ul.on("touchstart",$.proxy(this.$FP_middle_ul_s_fun,this));
			this.$FP_middle_ul.on("touchmove",$.proxy(this.$FP_middle_ul_m_fun,this));
			this.$FP_middle_ul.on("touchend",$.proxy(this.$FP_middle_ul_e_fun,this));
			this.$fp_imgShow_move.on("touchstart",$.proxy(this.$fp_imgShow_move_s_fun,this));
			this.$fp_imgShow_move.on("touchmove",$.proxy(this.$fp_imgShow_move_m_fun,this));
			this.$fp_imgShow_img_bg.on("touchend",$.proxy(this.$fp_imgShow_img_bg_fun));
			this.fp_data_show_left.on("touchstart",$.proxy(this.fp_data_show_left_s_fun,this));
			this.fp_data_show_left.on("touchmove",$.proxy(this.fp_data_show_left_m_fun,this));
			this.fp_data_show_left.on("touchend",$.proxy(this.fp_data_show_left_e_fun,this));
			this.fp_data_show_right.on("touchstart",$.proxy(this.fp_data_show_right_s_fun,this));
			this.fp_data_show_right.on("touchmove",$.proxy(this.fp_data_show_right_m_fun,this));
			this.fp_data_show_right.on("touchend",$.proxy(this.fp_data_show_right_e_fun,this));
			this.fp_data_s_content_sec_li.on("click",$.proxy(this.fp_data_s_content_sec_li_main_fun,this));
			this.fp_data_s_content_sec_li.children("ul").on("click",$.proxy(this.fp_data_s_content_sec_li_ul_main_fun,this));
			this.fp_data_show_f_p_ok_t_left.on("click",$.proxy(this.fp_data_show_f_p_ok_t_l_fun,this));
			this.fp_data_show_f_p_ok_t_right.on("click",$.proxy(this.fp_data_show_f_p_ok_t_r_fun,this));
		},
		data:function(){
			this.$FP_top_foot_data={
				"1":{"0":"img/ECMA.gif","1":"javascript"},
				"2":{"0":"img/w3c.jpg","1":"css"},
				"3":{"0":"img/w3c.jpg","1":"html"},
				"4":{"0":"img/user_logo.jpg","1":"梦想"}
			}
			 
		},
		// 移动端定位功能
		FP_position_fun:function(){
			var me=this;
			if(!"geolocation" in navigator){
				alert("您的设备不支持html5定位功能,默认地址为广州")
				return false;
			}
			navigator.geolocation.getCurrentPosition(success,error,obj);
			function success(data){
				var address=data.address,
				    coord=data.coords;
				var lon=coord.longitude,
				    lat=coord.latitude;
				if(address){
					if(address.city){
						me.$FP_position.html(address.city);
						me.$city_the_city.html(address.city);
						me.$search_position_city_left.children("span").eq(0).html(address.city);
					}else{
						alert("您所在位置不存在城市");
					}
				}else{
					// var script=document.createElement("script");
					// script.setAttribute("async","async");
					// script["src"]="http://api.map.baidu.com/api?v=2.0&ak=HBMD66QZdnW6qRcIkuWXpGtRXGsCnxDP";
					// document.body.appendChild(script);
					var B_i=0;
					var timer=setInterval(function(){
						try{
							if(BMap){
								clearInterval(timer);
								var baidu_m=new BMap.Geocoder(),
									add_data=new BMap.Point(lon,lat);
								baidu_m.getLocation(add_data,function(b_d){
								 	var b_city=b_d.addressComponents.city;
								 	if(b_city){
								 		me.$FP_position.html(b_city);
										me.$city_the_city.html(b_city);
										me.$search_position_city_left.children("span").eq(0).html(b_city);
								 	}else{
								 		alert("您所在位置不存在城市");
								 	}
								 	// console.log(b_d);
								 	// console.log(b_d.address);
								 	// console.log(b_d.addressComponents.streetNumber)
								 	return false;
								});
							};
						}catch(error){};
						B_i++;
						if(B_i>=600){
							alert("定位失败");
							clearInterval(timer);
						}
					},1000/60);
				};
			};
			function error(error){
				// alert("位置获取失败");
			};
			var obj={
				enableHighAccuracy:true,
				timeout:5000,
			};
		},
		// 此函数本封装设置日期，为了提高代码复用性，也加入了其它一些代码模块
		FP_date_fun:function(){
			var theLi=$("#findPosition > .middle > ul > .add_FP_car_ajax_main > ul > .sec_li > span"),
			    the_park_time=$("#findPosition > .middle > ul > .add_FP_car_ajax_main > ul > .fir_li"),
			    the_park_start_t=$("#findPosition > .middle > ul > .add_FP_car_ajax_main > ul > .sec_li"),
			    fp_d_show_ok=$("#findPosition > .fp_data_show > .data_main > .content > .ok"),
			    // 发起寻位模块
			    the_ok_f_p=$("#findPosition > .middle > ul > .add_FP_car_ajax_main > ul > .four"),
			    fp_d_show_ok_s=$("#findPosition > .fp_data_show > .data_main > .content_sec > .ok_s"),
			    fp_search_pos_button=$("#findPosition > .middle > ul > .add_FP_car_ajax_main > ul > .thir_li");
			    // 具体位置选择
			    // fp_search_pos_button.off("click").on("click",$.proxy(this.fp_search_pos_button_fun,this));
			    // 不必放这，代码优化时
			fp_d_show_ok.off("click").on("click",$.proxy(this.fp_data_show_ok_fun,this));
			fp_d_show_ok_s.off("click").on("click",$.proxy(this.fp_data_show_ok_s_fun,this));
			// 停车时长会重新绑定
			// the_park_time.off("click").on("click",$.proxy(this.FP_sec_li_park_t_fun,this));
			// 停车起始时间会重新绑定
			// the_park_start_t.off("click").on("click",$.proxy(this.FP_sec_li_park_start_t_fun,this));
			// 发起寻位函数会重新绑定
			// the_ok_f_p.off("click").on("click",$.proxy(this.FP_m_f_p_ok_fun,this))
			// 位置选择重新绑定
			
			the_park_time.children("span").eq(1).html(this.FP_sec_li_park_time);
			the_park_time.children("span").eq(2).html(this.FP_sec_li_park_ti);



			this.FP_sec_li_Hours<10?theLi.eq(8).css("marginRight","2.3%"):theLi.eq(8).css("marginRight","2.6%");
			// 修改上午下午
			this.FP_sec_li_Hours>11?theLi.eq(7).html("下午"):theLi.eq(7).html("上午");
			theLi.eq(1).html(this.FP_sec_li_year);
			// 时间加0，适应用户习惯
			this.FP_sec_li_Month<10?theLi.eq(3).html("0"+this.FP_sec_li_Month):theLi.eq(3).html(this.FP_sec_li_Month);
			theLi.eq(5).html(this.FP_sec_li_Date);
			theLi.eq(8).html(this.FP_sec_li_Hours);
			this.FP_sec_li_Minutes<10?theLi.eq(10).html("0"+this.FP_sec_li_Minutes):theLi.eq(10).html(this.FP_sec_li_Minutes);
		},
		//点击主页面底部logo导航栏字体图标变色封装函数
		change_fontLogo_s_fun:function(e){
			this.change_fontLogo_s_CY=e.changedTouches[0].clientY;
		},
		change_fontLogo_e_fun:function(e){
			var change_fontLogo_s_e=e.changedTouches[0].clientY-this.change_fontLogo_s_CY;
			// 判断是否为click;
			if(change_fontLogo_s_e==0){
				var curT=$(e.currentTarget);
				this.$font_logo_li.css("color","");
				curT.css("color","#f40");
				// 旋转
				this.rotateChange(curT.children("p").children("span").eq(0)[0],0,360,500);
				// 底部导航点击执行数据渲染到中部
				this.$FP_foot_pushData_c(curT.data("index_f"));
			};
		},
		// 点击A标签——车辆选择--移动
		$FP_car_lia_s_fun:function(e){
			clearInterval(this.timer_car);
			this.$FP_car_startY=e.targetTouches[0].clientY;
			this.$FP_car_startX=e.targetTouches[0].clientX;
			this.$FP_car_nowTime=new Date();
			this.startLeft=parseInt(this.$FP_car_ul.css("left"))||0;
			// console.log(this.screenCW);
			return false;
		},
		// 点击A标签——车辆选择--移动
		$FP_car_lia_m_fun:function(e){
			// console.log(this.$FP_car_ul.css("left"))
			var $FP_car_moveX=e.targetTouches[0].clientX;
			var sm_val=$FP_car_moveX-this.$FP_car_startX;
			var move_val=this.startLeft+sm_val;
			this.$FP_car_ul.css({"left":move_val+"px"});
			var move_val_is=parseInt(this.$FP_car_ul.css("left"));
			if( move_val_is>=0){
				this.$FP_car_ul.css({"left":0});
			};
			// console.log(move_val_is,this.arr_car[0])
			if(move_val_is/(this.screenCW<<1)<=-1.008){
				this.$FP_car_ul.css({"left":"-100.8%"});
				// console.log(this.$FP_car_ul.css("left"))
			};
				return false;
		},
		 // 点击车辆信息结束后
		$FP_car_lia_e_fun:function(e){
			// console.log(this.$FP_car_ul.width())
			var s_e_val=e.changedTouches[0].clientX-this.$FP_car_startX;
			var touch_y_s_e=e.changedTouches[0].clientY-this.$FP_car_startY;
			if(s_e_val==0&&touch_y_s_e==0){
					this.$FP_car_ul_lia.css("color","");
					$(e.target).css("color","#f40");
					var index_d=$(e.target).data("index");
					this.car_request_ajax(index_d);
				switch(index_d){
					case 3:
					this.$FP_car_ul.stop(true).animate({"left":"-13.7%"},500);
					break;
					case 4:
					this.$FP_car_ul.stop(true).animate({"left":"-29.1064%"},500);
					break;
					case 5:
					this.$FP_car_ul.stop(true).animate({"left":"-44.7602%"},500);
					break;
					case 6:
					this.$FP_car_ul.stop(true).animate({"left":"-59.7333333%"},500);
					break;
					case 7:
					this.$FP_car_ul.stop(true).animate({"left":"-75.9386666%"},500);
					break;
					case 8:
					this.$FP_car_ul.stop(true).animate({"left":"-92%"},500);
					break;

					case 0:
					this.$FP_car_ul.stop(true).animate({"left":"0px"},500);
					break;
					case 1:
					this.$FP_car_ul.stop(true).animate({"left":"0px"},500);
					break;
					case 2:
					this.$FP_car_ul.stop(true).animate({"left":"0px"},500);
					break;
					case 9:
					this.$FP_car_ul.stop(true).animate({"left":"-100.8%"},500);
					break;
					case 10:
					this.$FP_car_ul.stop(true).animate({"left":"-100.8%"},500);
					break;
					case 11:
					this.$FP_car_ul.stop(true).animate({"left":"-100.8%"},500);
					break;
				};
			}else{
					var car=this,$FP_car_s_e_time=new Date()-car.$FP_car_nowTime;
					
					if($FP_car_s_e_time<300){
						this.$FP_car_ul.stop(true);
						// 求得需要降速位移
						var speed_s=s_e_val/($FP_car_s_e_time*0.001),
						 	nowtime=new Date(),i,
						 	$FP_car_before,
						 	$FP_car_after,
						 	$FP_car_startL;
						 	$FP_car_startL=parseInt(car.$FP_car_ul.css("left"));
						car.timer_car=setInterval(function(){
							i=(new Date()-nowtime)/1000;
							car.$FP_car_ul.css("left",i*speed_s+$FP_car_startL+"px");
							 	 $FP_car_after=parseInt(car.$FP_car_ul.css("left"));
							 	 // 为了响应式所有设备用百分比表示
							if($FP_car_after/(car.screenCW<<1)<-1.008){
								clearInterval(car.timer_car);
								car.$FP_car_ul.css("left","-100.8%");
							};
							if($FP_car_after>0){
								car.$FP_car_ul.css("left",0);
								clearInterval(car.timer_car);
							};

						},1000/60)
				};
			};
			return false;
		},
		// 判断屏幕是竖屏还是横屏
		screenIs_h_or_s:function(){
			// 用于灵活载入设备宽度
			this.screenCW=window.screen.availWidth/2;
			if(window.orientation==180||window.orientation==0){
				this.screen_boo=true;
				this.screen_box.css({"display":"none"});
			 	switch(this.choose_module_boo){
			 		case "c":
			 		this.$P_cityChoose.css("display","block");
			 		break;
			 		case "s":
			 		this.$search_position.css("display","block");
			 		break;
			 		case "f":
			 		this.$findPosition.css("display","block");
			 		break;
			 	}
				// alert("素屏")
			};
			if((window.orientation==90||window.orientation==-90)&&this.screen_boo==true){
				this.screen_boo=false;
				// alert("横屏");
				this.screen_box.css({"display":"block"});
				// 键入判断display作用于谁，以便等下消失谁
				if(this.$findPosition.css("display")=="none"&&this.$search_position.css("display")=="none"){
					this.choose_module_boo="c";
				}
				if(this.$findPosition.css("display")=="none"&&this.$P_cityChoose.css("display")=="none"){
					this.choose_module_boo="s";
				}
				if(this.$P_cityChoose.css("display")=="none"&&this.$search_position.css("display")=="none"){
					this.choose_module_boo="f";
				}
				document.documentElement.scrollTop?document.documentElement.scrollTop=0:document.body.scrollTop=0;
				this.$findPosition.css("display","none");
				this.$P_cityChoose.css("display","none");
				this.$search_position.css("display","none");
				return false;
			};

		},
		// 主页面中部可以移动部分
		$FP_middle_ul_s_fun:function(e){
			clearInterval(this.timer_e);
			this.$FP_m_ul_s_boo_i=true;
			this.$FP_m_ul_s_boo_j=true;
			this.$FP_m_ul_s_clientY=e.changedTouches[0].clientY;
			this.$FP_m_ul_s_clientX=e.changedTouches[0].clientX;
			this.$FP_m_ul_s_clientY_e=e.changedTouches[0].clientY;
			this.$FP_m_ul_startLeft=parseInt(this.$FP_middle_ul.css("top"))||0;
			return false;
		},
		$FP_middle_ul_m_fun:function(e){
			this.$FP_m_ul_s_nowTime=new Date();
			this.$FP_m_ul_m_s_Y=e.changedTouches[0].clientY-this.$FP_m_ul_s_clientY_e;
			var top_before=parseInt(this.$FP_middle_ul.css("top")),
			    $FP_m_ul_m_s_starL=e.changedTouches[0].clientY-this.$FP_m_ul_s_clientY+this.$FP_m_ul_startLeft;
			this.$FP_middle_ul.css({"top":$FP_m_ul_m_s_starL+"px"});
			var $FP_middle_ul_now_top=parseFloat(this.$FP_middle_ul.css("top"));
			// 以下是判断手触起始点变迁，精确计算用户滑动意图
			if(this.$FP_m_ul_m_s_Y<0){
				if($FP_middle_ul_now_top>top_before&&this.$FP_m_ul_s_boo_i==true){
					this.$FP_m_ul_s_boo_i=false;
					this.$FP_m_ul_s_boo_j=true;
					this.$FP_m_ul_s_clientY_e=e.changedTouches[0].clientY;
				};
			}else{
				if($FP_middle_ul_now_top<top_before&&this.$FP_m_ul_s_boo_j==true){
					this.$FP_m_ul_s_boo_j=false;
					this.$FP_m_ul_s_boo_i=true;
					this.$FP_m_ul_s_clientY_e=e.changedTouches[0].clientY;
				};
			};
			// 计算差值，得出移动停止边界
			this.$FP_middle_ul_height=this.$FP_middle_ul.height()-this.$FP_middle_ul.parent().height();
			if($FP_middle_ul_now_top>0){
				this.$FP_middle_ul.css("top",0);
			};
			if($FP_middle_ul_now_top<-this.$FP_middle_ul_height){
				this.$FP_middle_ul.css("top",-this.$FP_middle_ul_height+"px");
				// 数据调用载入
				// this.middle_data_load();
				return false
			};
		},
// 滑动匀减速-->物理加速度公式算法
		// 	$FP_middle_ul_e_fun:function(e){
		// 	var yue_e=this;
		// 	clearInterval(yue_e.timer_e);
		// 	var now_clientY=e.changedTouches[0].clientY;
		// 	var $FP_m_ul_e_s_clientY=this.$FP_m_ul_m_s_Y;
		// 	var $FP_m_ul_e_s_time=new Date()-yue_e.$FP_m_ul_s_nowTime;
		// 	if($FP_m_ul_e_s_clientY!=0&&$FP_m_ul_e_s_time<300){
		// 		// 代表快速触移时产生的估计重感位移
		// 		var v_s=$FP_m_ul_e_s_clientY/($FP_m_ul_e_s_time*0.001),
		// 			nowtime_e=new Date(),e,speed_d=0,the_top,the_top_bef,
		// 			s_i=-1;
		// 			nowTop=parseInt(yue_e.$FP_middle_ul.css("top"));
		// 			var timeCom=1/60,s_i,bef_boo=true,sp_s_next=0,speed_z=-1;
		// 			var t_n=parseInt(yue_e.$FP_middle_ul.css("top"));
		// 			s_i=-1;
		// 		yue_e.timer_e=setInterval(function(){
		// 			// 赋值前的top
		// 			the_top_bef=parseInt(yue_e.$FP_middle_ul.css("top"));
		// 			if($FP_m_ul_e_s_clientY>0&&bef_boo==true){
		// 			 	 speed_z=1;
		// 			 	 bef_boo==false;
		// 			};
		// 			e=(new Date()-nowtime_e)/1000;
		// 			if(e>=0.2){
		// 			 	 if(bef_boo==true){
		// 			 	    the_top_now_v=Math.abs(parseInt(yue_e.$FP_middle_ul.css("top"))-t_n)*5;
		// 			 	 	bef_boo=false;
		// 			};
		// 			s_i++;
		// 			 	// 求得接下去的浏览器刷新时间的位移段，赋值后实现匀减速，涉及到加速度计算公式
		// 		 	 sp_s_next=(the_top_now_v-s_i*30*timeCom)/60-30*0.5*timeCom*timeCom;
		// 			 	yue_e.$FP_middle_ul.css("top",the_top_bef+speed_z*sp_s_next+"px");
		// 			 }else{
		// 			 	yue_e.$FP_middle_ul.css("top",e*v_s+nowTop+"px");
		// 			 };
		// 			// 赋值后的移动体的top
		// 			the_top=parseInt(yue_e.$FP_middle_ul.css("top"));
		// 			// 以下判断边界停止问题
		// 			if(the_top>=the_top_bef&&$FP_m_ul_e_s_clientY<0){
		// 				clearInterval(yue_e.timer_e);
		// 			};
		// 			if(the_top<=the_top_bef&&$FP_m_ul_e_s_clientY>0){
		// 				clearInterval(yue_e.timer_e);
		// 			};	
		// 			if(the_top>0){
		// 					yue_e.$FP_middle_ul.css("top",0);
		// 					clearInterval(yue_e.timer_e);
		// 				};
		// 			if(the_top<=-yue_e.$FP_middle_ul_height){
		// 				yue_e.$FP_middle_ul.css("top",-yue_e.$FP_middle_ul_height+"px");
		// 				clearInterval(yue_e.timer_e);
		// 			};
		// 		},1000/60);
		// 	}
		// },
// 滑动匀减速-->微时间分割算法
		// $FP_middle_ul_e_fun:function(e){
		// 	var yue_e=this;
		// 	clearInterval(yue_e.timer_e);
		// 	var $FP_m_ul_e_s_clientY=this.$FP_m_ul_m_s_Y;
		// 	var $FP_m_ul_e_s_time=new Date()-yue_e.$FP_m_ul_s_nowTime;
		// 	if($FP_m_ul_e_s_clientY!=0&&$FP_m_ul_e_s_time<300){
		// 		var v_s=$FP_m_ul_e_s_clientY/($FP_m_ul_e_s_time*0.001),
		// 			nowtime_e=new Date(),e,speed_d=0,the_top,the_top_bef,
		// 			speed_nowT=new Date(),speed_i,speed_j=0,speed_boo=true,
		// 			nowTop=parseInt(yue_e.$FP_middle_ul.css("top"));
		// 		yue_e.timer_e=setInterval(function(){
		// 			e=(new Date()-nowtime_e)/1000;
		// 			 if(e>0.5&&speed_boo==true){
		// 			 	speed_boo=false;
		// 			 	speed_nowT=new Date();
		// 			 	if($FP_m_ul_e_s_clientY>0){
		// 			 		speed_j=-1;
		// 			 	}else{
		// 			 		speed_j=1;
		// 			 	};
		// 			 };
		// 			speed_i=(new Date()-speed_nowT)/500;
		// 			speed_d+=1*speed_i*speed_j;
		// 			// console.log(speed_d)
		// 			the_top_bef=parseInt(yue_e.$FP_middle_ul.css("top"));
		// 			yue_e.$FP_middle_ul.css("top",e*v_s+speed_d+nowTop+"px");
		// 			the_top=parseInt(yue_e.$FP_middle_ul.css("top"));
		// 			if(the_top>the_top_bef&&$FP_m_ul_e_s_clientY<0){
		// 				clearInterval(yue_e.timer_e);
		// 			};
		// 			if(the_top<the_top_bef&&$FP_m_ul_e_s_clientY>0){
		// 				clearInterval(yue_e.timer_e);
		// 			};	
		// 			if(the_top>0){
		// 					yue_e.$FP_middle_ul.css("top",0);
		// 					clearInterval(yue_e.timer_e);
		// 				};
		// 			if(the_top<=-yue_e.$FP_middle_ul_height){
		// 				yue_e.$FP_middle_ul.css("top",-yue_e.$FP_middle_ul_height+"px");
		// 				clearInterval(yue_e.timer_e);
		// 			};
		// 			console.log(yue_e.$FP_middle_ul.css("top"))
		// 		},1000/60);
		// 	}
		// },
// 滑动匀减速-->微像素切割算法
		$FP_middle_ul_e_fun:function(e){
			var yue_e=this;
			clearInterval(yue_e.timer_e);
			var e_s_x=e.changedTouches[0].clientX-this.$FP_m_ul_s_clientX,
			    e_s_y=e.changedTouches[0].clientY-this.$FP_m_ul_s_clientY,
			    $FP_m_ul_e_s_clientY=this.$FP_m_ul_m_s_Y,
			    $FP_m_ul_e_s_time=new Date()-yue_e.$FP_m_ul_s_nowTime;
			    // 用于判断是否点击了图片
			 var e_t=e.target;
			if(e_s_x==0&&e_s_y==0){
				if(e.target.nodeName==="IMG"){
					this.$fp_imgShow_move.css({"left":"0","top":"0"});
					this.$fp_imgShow_img_bg.parent().css({"display":"block"});
					this.$fp_imgShow_img_bg.css("display","block");
					this.$fp_imgShow_move.children("img").attr("src",$(e.target).attr("src"));
				};
				// 调试2
				if(e_t.nodeName=="SPAN"||e_t.getAttribute("same")=="same"){
					var e_p=e_t.parentNode.getAttribute("who");
					var e_i=e_t.getAttribute("who");
					if(e_p=="one"||e_i=="one"){
						yue_e.FP_sec_li_park_t_fun();
					}else if(e_p=="two"||e_i=="two"){
						yue_e.FP_sec_li_park_start_t_fun();
					}else if(e_p=="three"||e_i=="three"){
						yue_e.fp_search_pos_button_fun();
					}
				}
				if(e_t.parentNode.className=="four"||e_t.className=="four"){
					yue_e.FP_m_f_p_ok_fun();
				}
			};
			if($FP_m_ul_e_s_clientY!=0&&$FP_m_ul_e_s_time<200){
				var v_s=$FP_m_ul_e_s_clientY/($FP_m_ul_e_s_time*0.03),
					nowtime_e=new Date(),e,speed_d=v_s/60,the_top,the_top_bef,speed_i,
					nowTop=parseInt(yue_e.$FP_middle_ul.css("top"));
					// 可修改speed_i的值，达到更加均匀减速，不过停下来的时间会更慢
					$FP_m_ul_e_s_clientY<0?speed_i=0.01:speed_i=-0.01;
				yue_e.timer_e=setInterval(function(){
					e=(new Date()-nowtime_e)/1000;
					// 赋值前的top
					the_top_bef=parseFloat(yue_e.$FP_middle_ul.css("top"));
					// 准备匀减速
					if(e>0.5){
						speed_d=speed_d+speed_i;
						yue_e.$FP_middle_ul.css("top",the_top_bef+speed_d+"px");
					}else{
						yue_e.$FP_middle_ul.css("top",e*v_s+nowTop+"px");
					}
					// 赋值后的top
					the_top=parseFloat(yue_e.$FP_middle_ul.css("top"));
					// 以下边界停止判断
					if(the_top>=the_top_bef&&$FP_m_ul_e_s_clientY<0){
						clearInterval(yue_e.timer_e);
					};
					if(the_top<=the_top_bef&&$FP_m_ul_e_s_clientY>0){
						clearInterval(yue_e.timer_e);
					};	
					if(the_top>0){
							yue_e.$FP_middle_ul.css("top",0);
							clearInterval(yue_e.timer_e);
						};
					if(the_top<=-yue_e.$FP_middle_ul_height){
						yue_e.$FP_middle_ul.css("top",-yue_e.$FP_middle_ul_height+"px");
						clearInterval(yue_e.timer_e);
					};
				},1000/60);
			};
			return false;
		},
		// 改变css3中的属性transform中rotate
		rotateChange:function(ele,startDeg,DegNumber,time){
			var attrV=ele.getAttribute("ele_boo");
			if(attrV=="true"||attrV==null){
				ele.setAttribute("ele_boo",false);
				var nowTime=new Date(),n,timer=null,degV,sDeg,startT;
				// 变量用于函数执行完，让对象回归最初转度角
				startT=ele.style["transform"];
				// alert(startT)
				startT=startT.match(/\d+/g);
				startT=startT?startT[0]:0;
				timer=setInterval(function(){
					n=(new Date()-nowTime)/time;
					if(n>=1){
						n=1;
						clearInterval(timer);
						ele.style["transform"]=startT;
						ele.setAttribute("ele_boo",true);
					};
					degV=startDeg+DegNumber*n+"deg";
					ele.style["transform"]='rotate('+degV+')';
				},1000/60);
			};
		},
		$FP_foot_pushData_c:function(index){
			clearInterval(this.timer_e);
			this.$FP_middle_ul.css({"top":0});

			if(index=="0"){
				this.$FP_car_title.css("display","none");
				this.$FP_car_ul.css("display","block");
				this.$FP_middle_ul.html(this.$add_FP_car_ajax_main);
				this.FP_date_fun();
				var the_el=$("#findPosition > .middle > ul > .add_FP_car_ajax_main > ul > .logo > img");
				the_el.attr("src",this.$FP_middle_ul_car_img_src);
			}else{
				if(index=="4"){
					this.$FP_car_title.children("i").addClass("add_user_log");
				}else{
					this.$FP_car_title.children("i").removeClass("add_user_log");
				};
				// 执行ajax函数
				this.$FP_middle_ul_ajax(index);
				// this.$FP_middle_ul.html(this.$FP_top_foot_data[index][1]);
				this.$FP_car_title.css("display","block");
				this.$FP_car_ul.css("display","none");
				this.$FP_car_title.children("i").children("img").attr("src",this.$FP_top_foot_data[index][0]);
				this.$FP_car_title.children("span").html(this.$FP_top_foot_data[index][1]);
			};
		},
		middle_data_load:function(){
			if(this.middle_load_boo==true){
				// 加载动画
				this.middle_load_boo=false;
				var ele_load=document.createElement("p");
				ele_load.className="add_middle_load";
				ele_load.innerHTML='<img src="img/up_load.gif">';
				this.$FP_middle_ul[0].appendChild(ele_load);
				
			};
			
		},
		// ajax渲染页面，前后端交互
		$FP_middle_ul_ajax:function(index){
			yue=this;
			$.ajax({
				type:"GET",
				// url:"http://localhost:7777/JWebDemo/MyServleta",
				url:"/MyServleta",
				data:"index="+index,
				cache:false,
				dataType:"json",
				beforeSend:function(){
					// alert(1)
					yue.$FP_mid_data_load.css("display","block");
					yue.$FP_middle_ul.stop(true,true);
					yue.$FP_middle_ul.css({"width":"0px","left":"50%"});
					
				},
				success:function(data){
					yue.$FP_middle_ul.html("");
						// 用字符串拼接可能会更好
						for(var i in data[index]){
							var frag=document.createDocumentFragment(),
								li=document.createElement("li"),
								img=document.createElement("img");
								img.setAttribute("src",data[index][i]);
								li.appendChild(img);
								li.className="FP_bottom_font";
								frag.appendChild(li);
								yue.$FP_middle_ul.append(frag);
							};

				},
				complete:function(){
					// alert(2)
					yue.$FP_mid_data_load.css("display","none");
					yue.$FP_middle_ul.animate({"left":"2%","width":"96%"},500);
				},
				error:function(arg){
					// console.log("错误")
				}

			});
		},
		// 图片放大和拖动
		$fp_imgShow_move_s_fun:function(e){
			var sqrt=this;
			sqrt.$fp_imgShow_SH=this.$fp_imgShow_move.height();
			sqrt.$fp_imgShow_s_x=e.changedTouches[0].clientX;
			sqrt.$fp_imgShow_s_y=e.changedTouches[0].clientY;
			// try{
			// 	// 由于电脑上谷歌不能调试双指，可能报错
			// 	if(e.touches.length>1){
			// 		sqrt.$fp_imgShow_s_x_two=e.changedTouches[1].clientX;
			// 		sqrt.$fp_imgShow_s_y_two=e.changedTouches[1].clientY;
			// 		sqrt.$fp_imgShow_sqrt_c=Math.sqrt(Math.pow(sqrt.$fp_imgShow_s_x_two-sqrt.$fp_imgShow_s_x,2)+Math.pow(sqrt.$fp_imgShow_s_y_two-sqrt.$fp_imgShow_s_y,2));
			// 	};
			// }catch(error){console.log(error)};
			this.$fp_imgShow_s_left=parseFloat(this.$fp_imgShow_move.css("left"))||0;
			this.$fp_imgShow_s_top=parseFloat(this.$fp_imgShow_move.css("top"))||0;
			return false;
		},
		$fp_imgShow_move_m_fun:function(e){
			var sq=this,
			    $fp_imgShow_s_m_x=e.changedTouches[0].clientX-this.$fp_imgShow_s_x,
			    $fp_imgShow_s_m_y=e.changedTouches[0].clientY-this.$fp_imgShow_s_y;

			// try{
			// 	// 由于谷歌浏览器不能调试双指，可能报错，加捕捉
			// 	if(e.touches.length>1){
			// 		// 双指缩放
			// 	    var $fp_imgShow_m_x_two=e.changedTouches[1].clientX,
			// 		    $fp_imgShow_m_y_two=e.changedTouches[1].clientY,
			// 		    $fp_imgShow_sqrt_m_c=Math.sqrt(Math.pow($fp_imgShow_m_x_two-$fp_imgShow_s_m_x,2)+Math.pow($fp_imgShow_m_y_two-$fp_imgShow_s_m_y,2)),
			// 		    $fp_imgShow_sqrt_m_s_c=($fp_imgShow_sqrt_m_c-sq.$fp_imgShow_sqrt_c)*3;
			//   	        sq.$fp_imgShow_move.children("img").css({"height":sq.$fp_imgShow_SH+$fp_imgShow_sqrt_m_s_c+"px"});
			//   	        alert($fp_imgShow_sqrt_m_s_c);
			// 	};
			// }catch(error){console.log(error)};
			this.$fp_imgShow_move.css({"left":this.$fp_imgShow_s_left+$fp_imgShow_s_m_x+"px","top":this.$fp_imgShow_s_top+$fp_imgShow_s_m_y+"px"});
			var now_left=parseFloat(this.$fp_imgShow_move.css("left"));
			var now_top=parseFloat(this.$fp_imgShow_move.css("top"));
			// 判断边界
			if(now_left>=0){
				this.$fp_imgShow_move.css({"left":"0"});
			};
			if(now_top>=0){
				this.$fp_imgShow_move.css({"top":"0"});
			};

			var the_height=this.$fp_imgShow_move.height()-this.$fp_imgShow_move.parent().height();
			if(now_top<=-the_height){
				this.$fp_imgShow_move.css({"top":-the_height+"px"});
			};
			var the_width=this.$fp_imgShow_move.width()-this.$fp_imgShow_move.parent().width();
			if(now_left<=-the_width){
				this.$fp_imgShow_move.css({"left":-the_width+"px"});
			};
		},
		// 图片放大和拖动展示模块的背景点击时
		$fp_imgShow_img_bg_fun:function(){
			$("#findPosition > .fp_imgShow").css("display","none");
			$("#findPosition > .fp_imgShow > .img_bg").css("display","none");
		},
		// 车辆选择中ajax请求
		car_request_ajax:function(arg){
			var yue_obj=this;
			yue_obj.$FP_middle_ul.html(yue_obj.$add_FP_car_ajax_main);
			yue_obj.FP_date_fun();
			var the_el=$("#findPosition > .middle > ul > .add_FP_car_ajax_main > ul > .logo > img");
			if(arg>0){
				the_el.attr("src","");
				the_el.attr("src","img/car_pro.gif");
				console.log("准备发送");	
			}else{
				this.$FP_middle_ul_car_img_src="image/car/s_car.jpg";
				return false
			};
			// ajax请求jQuery函数
			$.ajax({
				type:"GET",
				// url:"http://localhost:7777/JWebDemo/MyServletf",
				url:"/MyServletf",
				data:"index="+arg,
				cache:false,
				dataType:"json",
				beforeSend:function(){
					console.log("发送中");
					console.log("ajax-->通过java的IO流等选取服务器相应文件数据返回");
				},
				success:function(data){
					 the_el.attr("src",data[0]["src"]);
					  
				},
				complete:function(){
					console.log("接收完成");
					yue_obj.$FP_middle_ul_car_img_src=the_el.attr("src");
				}

			})
		},
		// 时间选择封装函数
		fp_data_show_left_s_fun:function(e){
			this.fp_data_fun_left_h=e.changedTouches[0].clientY;
			this.fp_data_fun_left_start_t=parseFloat(this.fp_data_show_left.css("top"));
			return false;
		},

		fp_data_show_left_m_fun:function(e){
			var fp_data_fun_left_s_m_x=e.changedTouches[0].clientY-this.fp_data_fun_left_h;
			this.fp_data_show_left.css({"top":fp_data_fun_left_s_m_x+this.fp_data_fun_left_start_t+"px"});
			// 设置移动边界
			var now_top=parseFloat(this.fp_data_show_left.css("top"));
			var the_t=now_top/812;
			if(the_t>=0.1226){
				this.fp_data_show_left.css({"top":"12.26vh"});
			};
			
			if(the_t<=-0.18212){
				this.fp_data_show_left.css({"top":"-18.212vh"});
			};
			return false;
			// console.log(this.fp_data_show_left.css("top"))
		},
		fp_data_show_left_e_fun:function(e){
			// tttt
			var now_t=parseFloat(this.fp_data_show_left.css("top"))/812;
			if(now_t<0.1226&&now_t>=0.075){
				this.fp_data_show_left.css({"top":"12.26vh"});
				this.FP_sec_li_park_time=1;
			};
			if(now_t<0.075&&now_t>=0.0294){
				this.fp_data_show_left.css({"top":"6.065vh"});
				this.FP_sec_li_park_time=2;
			};
			if(now_t<0.0294&&now_t>=-0.02){
				this.fp_data_show_left.css({"top":0});
				this.FP_sec_li_park_time=3;
			};


			if(now_t<-0.02&&now_t>=-0.0815){
				this.fp_data_show_left.css({"top":"-5.9vh"});
				this.FP_sec_li_park_time=4;
			};
			if(now_t<-0.0815&&now_t>=-0.14){
				this.fp_data_show_left.css({"top":"-11.97vh"});
				this.FP_sec_li_park_time=5;
			};
			if(now_t<=-0.12){
				this.fp_data_show_left.css({"top":"-18.212vh"});
				this.FP_sec_li_park_time=6;
			};
			return false;

		},
		// 停车时间右边滑块
		fp_data_show_right_s_fun:function(e){
			this.fp_data_fun_right_h=e.targetTouches[0].clientY;
			this.fp_data_fun_right_start_t=parseFloat(this.fp_data_show_right.css("top"));
			return false;
			// alert(this.fp_data_fun_right_start_t)
		},

		fp_data_show_right_m_fun:function(e){
			var fp_data_fun_right_s_m_x=e.targetTouches[0].clientY-this.fp_data_fun_right_h;

			this.fp_data_show_right.css({"top":fp_data_fun_right_s_m_x+this.fp_data_fun_right_start_t+"px"});
			// 设置移动边界
			var now_top=parseFloat(this.fp_data_show_right.css("top"));
			var the_t=now_top/812;
			if(the_t>=0){
				this.fp_data_show_right.css({"top":0});
			};
			
			if(the_t<=-0.18212){
				this.fp_data_show_right.css({"top":"-18.212vh"});
			};
			return false;

		},
		fp_data_show_right_e_fun:function(e){
			// 设置边界自动跳动
			var now_t=parseFloat(this.fp_data_show_right.css("top"))/812;
			if(now_t<0.0294&&now_t>-0.02){
				this.fp_data_show_right.css({"top":0});
				this.FP_sec_li_park_ti="小时";
			};

			if(now_t<-0.02&&now_t>-0.0815){
				this.fp_data_show_right.css({"top":"-5.9vh"});
				this.FP_sec_li_park_ti="小日";
			};
			if(now_t<-0.0815&&now_t>-0.14){
				this.fp_data_show_right.css({"top":"-11.97vh"});
				this.FP_sec_li_park_ti="小月";
			};
			if(now_t<-0.12){
				this.fp_data_show_right.css({"top":"-18.212vh"});
				this.FP_sec_li_park_ti="小年";
			};
			return false;

		},
		// 停车时间选区消失并赋值
		fp_data_show_ok_fun:function(){
			this.$findPosition.children(".fp_data_show").css("display","none");
			this.fp_data_show_content.css("display","none");
			var the_park_time=$("#findPosition > .middle > ul > .add_FP_car_ajax_main > ul > .fir_li");
			the_park_time.children("span").eq(1).html(this.FP_sec_li_park_time);
			the_park_time.children("span").eq(2).html(this.FP_sec_li_park_ti);
		},
		// 停车时间选区模块出现
		FP_sec_li_park_t_fun:function(){
			this.fp_data_show_title.html("停车时长选区");
			this.$findPosition.children(".fp_data_show").css("display","block");
			this.fp_data_show_content.css("display","block");
		},
		// 中部起始时间ok键
		fp_data_show_ok_s_fun:function(){
			var the_park_start=$("#findPosition > .middle > ul > .add_FP_car_ajax_main > ul > .sec_li");
			this.FP_sec_li_year=this.fp_data_s_content_sec_li.eq(0).children("span").html();
			this.FP_sec_li_Month=this.fp_data_s_content_sec_li.eq(2).children("span").html().replace(/^(0)/,"");
			this.FP_sec_li_Date=this.fp_data_s_content_sec_li.eq(4).children("span").html();
			this.FP_sec_li_Hours=this.fp_data_s_content_sec_li.eq(6).children("span").html();
			this.FP_sec_li_Minutes=this.fp_data_s_content_sec_li.eq(8).children("span").html().replace(/^(0)/,"");
			this.FP_date_fun();
			this.$findPosition.children(".fp_data_show").css("display","none");
			this.fp_data_show_content_sec.css("display","none");
		},
		// 停车起始时间封装函数
		FP_sec_li_park_start_t_fun:function(){
			// 判断日期，从而做出正确的日历表
			this.fp_data_show_month_data_ch(this.FP_sec_li_Month);
			this.fp_data_show_title.html("停车时间选区");
			this.$findPosition.children(".fp_data_show").css("display","block");
			this.fp_data_show_content_sec.css("display","block");
		},

		// 起始时间选区
		fp_data_s_content_sec_li_main_fun:function(e){
			this.fp_data_s_content_sec_li.children("ul").css("display","none");
			$(e.currentTarget).children("ul").css("display","block");
		},
		// 获取停车起始时间ul的值并赋值
		fp_data_s_content_sec_li_ul_main_fun:function(e){
		if($(e.target)[0].nodeName==="LI"){
				var val=$(e.target).html();
				$(e.target).parent().parent().children("span").html(val);
				$(e.target).parent().css({"display":"none"});
				if($(e.target).parent().children("li").length==12){
					 this.fp_data_show_month_data_ch(val);
				};
				if(val.length>3){
					 if(this.fp_data_s_content_sec_li.eq(2).children("span").html()=="2"){
					 	var the_len=this.fp_data_s_content_sec_li.eq(4).children("ul").children("li").length;
					 	if(parseInt(parseInt(val)/4)==parseInt(val)/4){
					 		if(the_len==28){
					 			// 补29
					 			this.fp_data_s_content_sec_li.eq(4).children("ul").append("<li>29</li>");
					 		};
					 	}else{
					 		// 补28
					 		if(the_len==29){
					 			 this.fp_data_s_content_sec_li.eq(4).children("ul").children("li").eq(28)[0].remove();
					 		};
					 	}
					 }
				}
				return false;
			// e.preventDefault();
			}
		},
		// 发起寻位封装函数
		FP_m_f_p_ok_fun:function(){
			this.$findPosition.children(".fp_data_show").css("display","block");
			this.fp_data_show_content_thir.css("display","block");
			this.fp_data_show_title.html("寻位确认");
			var the_main=$("#findPosition > .middle > ul > .add_FP_car_ajax_main > ul"),
			    the_long=the_main.children(".fir_li"),
			    the_time=the_main.children(".sec_li"),
			    the_position=the_main.children(".thir_li").children("span").eq(1).html();
			this.fp_data_show_f_p_long_li_main.eq(0).children("span").eq(1).html(the_long.children("span").eq(1).html());
			this.fp_data_show_f_p_long_li_main.eq(0).children("span").eq(2).html(the_long.children("span").eq(2).html());
			// 获取日期等值
			var val=the_time.children("span").eq(1).html()+"-"+the_time.children("span").eq(3).html()+"-"+the_time.children("span").eq(5).html()+"-"+the_time.children("span").eq(8).html()+"-"+the_time.children("span").eq(10).html()+"-"+the_time.children("span").eq(7).html();
			// console.log(val)
			this.fp_data_show_f_p_long_li_main.eq(1).children("span").eq(1).html(val);
			this.fp_data_show_f_p_long_li_main.eq(2).children("span").eq(1).html(the_position+"附近");
		},
		// 寻位弹框左键
		fp_data_show_f_p_ok_t_l_fun:function(){
			this.$findPosition.children(".fp_data_show").css("display","none");
			this.fp_data_show_content_thir.css("display","none");
		},
		fp_data_show_f_p_ok_t_r_fun:function(){
			this.$findPosition.children(".fp_data_show").css("display","none");
			this.fp_data_show_content_thir.css("display","none");
		},
		// 选择月份出现相应的日期模板
		fp_data_show_month_data_ch:function(month){
			var the_length=this.fp_data_s_content_sec_li.eq(4).children("ul").children("li").length,
			the_ul=this.fp_data_s_content_sec_li.eq(4).children("ul"),
			the_li=the_ul.children("li");
			month=parseInt((month+"").replace(/^(0)/,""));
			if(month<=7&&month!=2){
				// 补到30
				if(month%2==1){
					// 补31
					 switch(the_length){
					 	case 30:
					 	the_ul.append("<li>31</li>");
					 	break;
					 	case 29:
					 	the_ul.append("<li>30</li>");
					 	the_ul.append("<li>31</li>");
					 	break;
					 	case 28:
					 	the_ul.append("<li>29</li>");
					 	the_ul.append("<li>30</li>");
					 	the_ul.append("<li>31</li>");
					 	break;
					 }
				}
				if(month%2==0){
					// 补30
					 switch(the_length){
					 	case 31:
					 	the_li.eq(30)[0].remove();
					 	break;
					 	case 29:
					 	the_ul.append("<li>30</li>");
					 	break;
					 	case 28:
					 	the_ul.append("<li>29</li>");
					 	the_ul.append("<li>30</li>");
					 	break;
					 }
					 the_ul.parent().children("span").html("30");
				}

			}
			if(month>7&&month!=2){
				// 补到30
				if(month%2==1){
					 switch(the_length){
					 	case 31:
					 	the_li.eq(30)[0].remove();
					 	break;
					 	case 29:
					 	the_ul.append("<li>30</li>");
					 	break;
					 	case 28:
					 	the_ul.append("<li>29</li>");
					 	the_ul.append("<li>30</li>");
					 	break;
					 }
					 the_ul.parent().children("span").html("30");
				}
				if(month%2==0){
					// 补31
					 switch(the_length){
					 	case 30:
					 	the_ul.append("<li>31</li>");
					 	break;
					 	case 29:
					 	the_ul.append("<li>30</li>");
					 	the_ul.append("<li>31</li>");
					 	break;
					 	case 28:
					 	the_ul.append("<li>29</li>");
					 	the_ul.append("<li>30</li>");
					 	the_ul.append("<li>31</li>");
					 	break;
					 }
				}

			}
			// 月份等于2情况
			if(month==2){
				the_ul.parent().children("span").html("28");
				var year=this.fp_data_show_year_span.html();
				if(parseInt(year/4)==(year/4)){
					// 补29
					 switch(the_length){
					 	case 31:
					 	the_li.eq(30)[0].remove();
					 	the_li.eq(29)[0].remove();
					 	break;
					 	case 30:
					 	the_li.eq(29)[0].remove();
					 	break;
					 	case 28:
					 	the_ul.append("<li>29</li>");
					 	break;
					 }
				}else{
					// 补28
					switch(the_length){
					 	case 31:
					 	the_li.eq(30)[0].remove();
					 	the_li.eq(29)[0].remove();
					 	the_li.eq(28)[0].remove();
					 	break;
					 	case 30:
					 	the_li.eq(29)[0].remove();
					 	the_li.eq(28)[0].remove();
					 	break;
					 	case 29:
					 	the_li.eq(28)[0].remove();
					 	break;
					}
				}
			}
		},
		// 打开具体位置选择匹配界面
		fp_search_pos_button_fun:function(){
			$("#findPosition").css("display","none");
			$("#search_position").css("display","block");
			// $("#search_position").data("boo","true");
			$("#search_position > .search_top > .top_main > .s_t_center").children("input")[0].focus();
		}








	};





	// 城市选择页面对象
	var yue_findPosition_cityChoose={
		// 对象全局执行
		do:function(){
			this.reset();
			this.startDoing();
			this.bind();
		},
		startDoing:function(){
			this.city_callBack_fun();
			this.$city_f_fire_s.css("display","none")
		},
		// 初始化数据变量
		reset:function(){
			yue_public.call(this);
			// 主页面与城市选择界面切换页面滚动的对应效果判断
			this.index_city_boo=false;
			this.city_value_start="";
			
			// 获取城市选择模块中总滑块
			this.$P_cityCho_foot=this.$P_cityChoose.children(".foot");
			this.$city_search=$("#P_cityChoose > .headFixed > .head > .search");
			this.$city_pass=$("#P_cityChoose > .headFixed > .head > .pass");
			this.$city_delete=$("#P_cityChoose > .headFixed > .head > .delete");
			this.$city_slide_ul=$("#P_cityChoose > .foot > .main > .ulF");
			// 滑块匹配放入的ul
			this.$city_slide_ulS=$("#P_cityChoose > .foot > .main > .ulS");
			
			this.$city_letter_r=$("#P_cityChoose > .centerFixed > .rightFixed > ul");
			this.$city_letter_warn=$("#P_cityChoose > .centerFixed > .city_warn");
			this.$city_f_fire=$("#P_cityChoose > .centerFixed > .foot");
			this.fire_redian=this.$city_f_fire.html();
			// 筛选结果模块
			this.$city_f_fire_s=$("#P_cityChoose > .centerFixed > .footS");
			// 改变指针，构造函数继承
			
			
		},
		// 为各种元素添加绑事件
		bind:function(){
			this.$FP_position.on("click",$.proxy(this.$FP_position_fun,this));
			this.$city_pass.on("click",$.proxy(this.$city_pass_fun,this));
			this.$city_search[0].oninput=$.proxy(this.match_city_fun,this);
			this.$city_delete.on("click",$.proxy(this.$city_delete_fun,this))
			this.$city_slide_ul.on("touchstart",$.proxy(this.$city_slide_ul_startFun,this));
			this.$city_slide_ul.on("touchend",$.proxy(this.$city_slide_ul_endFun,this));
			// 筛选结果模块绑定切换选中城市
			this.$city_slide_ulS.on("touchstart",$.proxy(this.$city_slide_ul_startFun,this));
			this.$city_slide_ulS.on("touchend",$.proxy(this.$city_slide_ul_endFun,this));
			// 字母导航
			this.$city_letter_r.on("touchstart",$.proxy(this.$city_letter_r_startFun,this));
			this.$city_letter_r.on("touchend",$.proxy(this.$city_letter_r_endFun,this));
			$(window).on("scroll",$.proxy(this.w_scroll_fun,this));
			this.$city_the_city.parent().on("click",$.proxy(this.$city_pass_fun,this));
			
		},
		// 主页中上方位置信息点击时添加事件切换到城市选择
		$FP_position_fun:function(){
			$("#search_position").data("boo","");
			this.index_city_boo=true;
			var FPP=this;
			FPP.$findPosition.animate({"opacity":"0"},500,function(){
				FPP.$findPosition.css({"display":"none"});
			});
			FPP.$P_cityChoose.css({"opacity":"0","display":"block"});
			FPP.$P_cityChoose.animate({"opacity":"1"},500);
			FPP.$city_search[0].focus();
		},
		// 城市选择界面点击取消执行的函数
		$city_pass_fun:function(){
			this.index_city_boo=false;
			this.$P_cityChoose.css("display","none");
			if($("#search_position").data("boo")=="true"){
				$("#search_position").css("display","block");
			}else{
				this.$findPosition.css({"display":"block"});
				this.$findPosition.animate({"opacity":"1"},500);
			}
			
		},
		// 城市选择界面中的搜索框中的X号绑定事件
		$city_delete_fun:function(e){
			this.$city_search.val("");
			this.city_value_start="";
			$(e.target).css("display","none");
			this.$city_search[0].focus();
			this.$city_slide_ul.css("display","block");
			this.$city_slide_ulS.css("display","none");
			this.$city_f_fire.css("display","");
			this.$city_f_fire_s.css("display","none");
			this.$city_letter_r.parent().css("display","block");
			this.$city_f_fire.html(this.fire_redian);
			$(document).scrollTop(0);
			this.bool_fire=true;
		},
		// 城市选择中底下滑动块获取li中城市名称及赋值(底下两个函数)
		$city_slide_ul_startFun:function(e){
			this.CS_startTouchTop=e.changedTouches[0].clientY;
			if(e.target.nodeName!=="UL"){
				$(e.target).children("span").removeClass("addColorSpan");
				$(e.target).css("background","#F0FFF0");
			}
		},
		$city_slide_ul_endFun:function(e){
			$(e.target).css("background","");
			if((e.changedTouches[0].clientY-this.CS_startTouchTop)==0){
				if(e.target.nodeName==="LI"){
					var c_val=$(e.target).html();
					this.$city_the_city.html(c_val);
					this.$FP_position.html(c_val);
					this.$search_position_city_left.children("span").eq(0).html(c_val);
					this.$city_pass_fun();
					return false;
				};
			};
		},
		// jsonp跨域请求函数导入js脚本
		city_callBack_fun:function(){
			this.jsonp=document.createElement("script");
			this.jsonp.setAttribute("async","async");
			this.jsonp.setAttribute("src","js/jsonp_city.js");
			document.body.appendChild(this.jsonp);

		},
		// 城市选择模块中点击右边的字母导航时执行触摸开始函数
		$city_letter_r_startFun:function(e){
			this.$city_search[0].blur();
			this.$P_cityCho_fo_p=$("#P_cityChoose > .foot > .main > ul > p");
			if(e.target.nodeName==="LI"){
				var letterI=$(e.target).html();
				this.$city_letter_warn.children("span").html(letterI);
				this.$city_letter_warn.css({"display":"block"});
				// 遍历城市选择模块中带字母的小滑块p元素对象，以便总滑块运动
				this.$P_cityCho_fo_p.each($.proxy(function(i,ele){
					if($(ele).html()===letterI){
						var L_T_val=$(ele).offset().top-(this.$city_f_fire.offset().top-$(document).scrollTop());
							$(document).scrollTop(L_T_val);
							// 创建span节点存放字母跳到中栏
							this.change_fire_val(letterI,"#28FF28");
							return false;
					};
				},this));
			};
			return false;
		},
		// 城市选择模块中点击右边的字母导航时执行触摸end函数
		$city_letter_r_endFun:function(e){
			this.$city_letter_warn.css({"display":"none"});
			e.stopPropagation?e.stopPropagation():cancelBubble=true;
		},
		w_scroll_fun:function(){
			if(this.bool_fire==false||this.index_city_boo==false){
				return false;
			}
			if(!this.$P_cityCho_fo_p){
				this.$P_cityCho_fo_p=$("#P_cityChoose > .foot > .main > ul > p");
				this.$P_p_top=this.$P_cityCho_fo_p.eq(0).position().top;
				this.slide_ul_t=this.$city_slide_ul.offset().top;
			};
			this.$P_cityCho_fo_p.each($.proxy(function(i,ele){
						//字母距离浏览器窗口顶部的距离
						lt=$(ele).offset().top-$(document).scrollTop();
						//参照物距离浏览器窗口顶部的距离
						ft=this.$city_f_fire.offset().top-$(document).scrollTop();
						// console.log(&&(lt-ft)<-this.$city_f_fire.height())
						if(lt-ft<=0.00001){
							this.change_fire_val($(ele).html(),"#28FF28");
						};
						// 滑块顶部热点城市值改变,判断总滑块ul距离浏览器窗口顶部的距离
						var $c_$d=this.$city_slide_ul.offset().top-$(document).scrollTop();
						if($c_$d>(this.slide_ul_t-this.$P_p_top)&&$c_$d<this.slide_ul_t){
							this.$city_f_fire.html(this.fire_redian);
						 };
				},this));
		},
		// 改变滑块中部的热点城市里的值,参数为要改变为的值
		change_fire_val:function(val,color){
			var $span=$("<span>");
			$span.addClass("P_fire");
			$span.html(val);
			$span.css({"color":color});
			this.$city_f_fire.html($span);
			this.$city_f_fire.parent
		},
		//搜索框匹配城市名
		match_city_fun:function(){
			var matchData=JSON.parse(sessionStorage.getItem("city_data"));
			var city_str=this.$city_search[0].value.replace(/[\s\d\-_]*/g,"");
			if(city_str==""){
				this.bool_fire=true;
				this.city_value_start="";
				$(document).scrollTop(0);
				this.$city_f_fire.html(this.fire_redian);
				this.$city_f_fire_s.css("display","none");
				this.$city_f_fire.css("display","");
				this.$city_delete.css({"display":"none"});
				this.$city_slide_ul.css("display","block");
				this.$city_slide_ulS.css("display","none");
				this.$city_letter_r.parent().css("display","block");
			}
			if(this.$city_search[0].value.replace(/\s+/g,"")!=""){
				this.$city_delete.css({"display":"block"});
			}
			if(city_str!=this.city_value_start){
				$(document).scrollTop(0);
				this.city_value_start=city_str;
				//循环遍历，字母模块匹配
				if(city_str.match(/^[a-zA-Z]/)){
					var str_lett=city_str.charAt(0).toUpperCase();
					for(var i=1,DLength=matchData.length;i<DLength;i++){
						if(str_lett==matchData[i]["letter"]){
							var city_m_str="";
							for(var j=0,lengthJ=matchData[i].length;j<lengthJ;j++){
								city_m_str+="<li>"+matchData[i][j]+"</li>"
							};
							// 开始网滑块ul添加匹配结果
							this.$city_slide_ulS.html(city_m_str);
							this.$city_slide_ul.css("display","none");
							this.$city_slide_ulS.css("display","block");
							this.$city_f_fire_s.css("display","");
							this.$city_f_fire.css("display","none");
							this.$city_letter_r.parent().css("display","none");
							this.bool_fire=false;
							$(document).scrollTop(0);
							return false;
						};
					};
					// 除字母外其它匹配
				}else{
					// 提升用户体验带符号也能匹配到
					var newStr=city_str.replace(/[\%\d\.·、\\a-zA-Z$&*=.。，,/《？?》<>!]+/g,"");
					var otherStr="";
					for(var z=1,mDz=matchData.length;z<mDz;z++){
						for(var n=0,mDn=matchData[z].length;n<mDn;n++){
							if(matchData[z][n].search(newStr)>-1){
								var colorS=this.addContentToStr(matchData[z][n],'<span class="addColorSpan">','</span>',matchData[z][n].indexOf(newStr),matchData[z][n].indexOf(newStr)+newStr.length);
								otherStr+='<li>'+colorS+'</li>';
							};
							
						};
					};
						// 进行最终渲染
					this.$city_slide_ulS.html(otherStr);
					this.$city_slide_ul.css("display","none");
					this.$city_slide_ulS.css("display","block");
					this.$city_f_fire_s.css("display","");
					this.$city_f_fire.css("display","none");
					this.$city_letter_r.parent().css("display","none");
					this.bool_fire=false;
					$(document).scrollTop(0);
				};
			}; 
		},
		//为字符窜添加内容
		addContentToStr:function(str,addContentS,addContentE,indexS,indexE){
			var newS="";
			var tmpS=str.substring(0,indexS);
			var tmpE=str.substring(indexS,indexE);
			var estr=str.substring(indexE,str.length);
			newS+=tmpS+addContentS+tmpE+addContentE+estr;
			return newS;
		}






	};
	// 左侧边栏--用户对象
	var yue_findPosition_asideUser={
		do:function(){
			this.reset();
			this.startDoing();
			this.bind();
		},
		// 初始化
		reset:function(){
			this.$FP_top_person=$("#findPosition > .topFixed > .top > .head > .left > .person");
			this.$FP_aside_user=$("#findPosition > .aside_user_fixed > .aside_user");
			this.$FP_aside_bg=$("#findPosition > .aside_user_fixed > .aside_user > .user_bg");
			// 小三角形
			this.$FP_aside_m_foo_tri=$("#findPosition > .aside_user_fixed > .aside_user > .user_main > .user_footer > .user_foo_top");
			this.$FP_aside_user_img=$("#findPosition > .aside_user_fixed > .aside_user > .user_main > .user_top > .img_username > img");
			this.$FP_a_u_img_parent=this.$FP_aside_user_img.parent();
			this.$FP_aside_m_foo_footer=$("#findPosition > .aside_user_fixed > .aside_user > .user_main > .user_footer");
			this.$FP_a_m_fo_foo_footer=this.$FP_aside_m_foo_footer.children(".user_foo_footer");
			this.$FP_fontChangeColor=$("#findPosition > .aside_user_fixed > .aside_user > .user_main > .user_footer > .user_foo_center > ul > li > span");
			this.$FP_fontClickColor=this.$FP_fontChangeColor.parent();
			this.aside_user_backFP=$("#findPosition > .aside_user_fixed > .aside_user > .user_main > .user_top > .backFP");
			this.$FP_aside_user_m_li=$("#findPosition > .aside_user_fixed > .aside_user > .user_main > .user_center > ul > li");
			yue_public.call(this);
		},
		startDoing:function(){

		},
		// 绑定
		bind:function(){
			this.$FP_top_person.on("click",$.proxy(this.$FP_top_person_fun,this));
			this.$FP_aside_user.on("touchstart",$.proxy(this.$FP_aside_user_s_fun,this));
			this.$FP_aside_user.on("touchend",$.proxy(this.$FP_aside_user_e_fun,this));
			this.$FP_aside_m_foo_tri.on("click",$.proxy(this.$FP_aside_m_foo_tri_s_fun,this));
			this.aside_user_backFP.on("click",$.proxy(this.aside_user_backFP_fun,this));
			this.$FP_fontClickColor.on("touchstart",$.proxy(this.$FP_fontClickColor_s_fun,this));
			this.$FP_fontClickColor.on("touchend",$.proxy(this.$FP_fontClickColor_e_fun,this));
			this.$FP_a_u_img_parent.on("touchstart",$.proxy(this.$FP_a_u_img_parent_s_fun,this));
			this.$FP_a_u_img_parent.on("touchend",$.proxy(this.$FP_a_u_img_parent_e_fun,this));
			this.$FP_aside_user_m_li.on("touchstart",$.proxy(this.$$FP_aside_user_m_li_s_fun,this));
			this.$FP_aside_user_m_li.on("touchend",$.proxy(this.$$FP_aside_user_m_li_e_fun,this));
			this.$FP_a_m_fo_foo_footer.on("touchstart",$.proxy(this.$FP_a_m_fo_foo_footer_s_fun,this));
			this.$FP_a_m_fo_foo_footer.on("touchend",$.proxy(this.$FP_a_m_fo_foo_footer_e_fun,this));
			this.$FP_aside_user_img.on("click",$.proxy(this.$FP_aside_user_img_cli_fun,this));
		},	
		// 侧边栏出现
		$FP_top_person_fun:function(){
			var user_s=this;
			user_s.$FP_fontChangeColor.each(function(index,e){
				$(e).css("color",user_s.random_changeColor());
			})
			user_s.$FP_aside_m_foo_footer.css("top","80%");
			user_s.$FP_aside_user_img.css({"width":"25%"});
			user_s.$FP_aside_user_img.parent().children("span").css("visibility","visible");
			user_s.$FP_aside_m_foo_tri.children("span")[0].className="glyphicon glyphicon-triangle-top";
			user_s.$FP_aside_user.css({"display":"block"});
			user_s.$FP_aside_user.stop(true).animate({"left":0},500,function(){
			user_s.$FP_aside_bg.stop(true).animate({"left":0},500);
			});
		},
		// 侧边栏消失,以下两个函数一起合作配合完成
		$FP_aside_user_s_fun:function(e){
			this.aside_user_s_clientX=e.changedTouches[0].clientX;
			this.aside_user_s_clientY=e.changedTouches[0].clientY;

			// return false;

		},
		$FP_aside_user_e_fun:function(e){
			var user_s_e_val=e.changedTouches[0].clientX-this.aside_user_s_clientX,userI=this;
			var user_s_e_val_y=e.changedTouches[0].clientY-this.aside_user_s_clientY;
			if(user_s_e_val_y<0){
				this.$FP_aside_m_foo_tri_up();
			}else if(user_s_e_val_y>0){
				this.$FP_aside_m_foo_tri_down();
			};
			if(user_s_e_val<0&&-user_s_e_val>Math.abs(user_s_e_val_y)){
					userI.$FP_aside_user.stop(true).animate({"left":"-100%"},500,function(){
					userI.$FP_aside_user.css({"display":"none"});
					userI.$FP_aside_bg.css({"left":"-100%"});
				});
			};
			// return false;
		},
		// 小三角点击向上向下
		$FP_aside_m_foo_tri_s_fun:function(){
			if(parseInt(this.$FP_aside_m_foo_footer.css("top"))>300){
				this.$FP_aside_m_foo_tri_up();
				
			}else{
				this.$FP_aside_m_foo_tri_down();
			};
			
		},
		$FP_aside_m_foo_tri_up:function(){
			var yue=this;
				this.$FP_aside_m_foo_footer.stop(true).animate({"top":"12%"},500,function(){
					yue.$FP_aside_user_img.parent().children("span").css("visibility","hidden");
				});
				this.$FP_aside_m_foo_tri.children("span")[0].className="glyphicon glyphicon-triangle-bottom";
				this.$FP_aside_user_img.stop(true).animate({"width":"18%"},1000);
		},
		$FP_aside_m_foo_tri_down:function(){
				this.$FP_aside_m_foo_footer.stop(true).animate({"top":"80%"},500);
				this.$FP_aside_m_foo_tri.children("span")[0].className="glyphicon glyphicon-triangle-top";
				this.$FP_aside_user_img.parent().children("span").css("visibility","visible");
				this.$FP_aside_user_img.stop(true).animate({"width":"25%"},1000);
		},
		// 涉及底层机器码的随机颜色函数封装
		random_changeColor:function(){
			return "#"+function(color){
				return new Array(7-color.length).join("0")+color;
			}((Math.random()*0x1000000<<0).toString(16));
		},
		// 用户侧边栏向右箭头点击返回
		aside_user_backFP_fun:function(){
			var backI=this;
			backI.$FP_aside_user.stop(true).animate({"left":"-100%"},500,function(){
			backI.$FP_aside_user.css({"display":"none"});
			backI.$FP_aside_bg.css({"left":"-100%"});
			});
			
		},
		// 改变左侧边栏底部各导航字的颜色，及相关导航指引
		$FP_fontClickColor_s_fun:function(e){
			if($(e.target).parent()[0].nodeName==="LI"){
				$(e.target).parent().children("p").css("color","#f40");
			};
		},
		// 改变左侧边栏底部各导航字的颜色，及相关导航指引
		$FP_fontClickColor_e_fun:function(e){
			$(e.target).parent().children("p").css("color","");
		},
		// 用户头像
		$FP_a_u_img_parent_s_fun:function(e){
			if($(e.target).parent()[0].className==="img_username"){
				$(e.target).parent().children("span").css("color","#f40");
			};
		},
		// 用户头像
		$FP_a_u_img_parent_e_fun:function(e){
			$(e.target).parent().children("span").css("color","");
		},
		// 侧边中部——客服那
		$$FP_aside_user_m_li_s_fun:function(e){
			if($(e.target).parent()[0].nodeName==="LI"){
				$(e.target).parent().children("span:eq(1)").css("color","#f40");
			};
		},
		$$FP_aside_user_m_li_e_fun:function(e){
			$(e.target).parent().children("span:eq(1)").css("color","");
		},
		// 用户侧边底部的底部法律与条款
		$FP_a_m_fo_foo_footer_s_fun:function(e){
			this.$FP_a_m_fo_foo_footer.children("span:eq(1)").css("color","#f40");
		},
		$FP_a_m_fo_foo_footer_e_fun:function(e){
			this.$FP_a_m_fo_foo_footer.children("span:eq(1)").css("color","");
		},
		// 音乐
		$FP_aside_user_img_cli_fun:function(){
			var src=this.$FP_aside_user_img.attr("src");
			if(src=="img/music2.png"){
				this.$FP_aside_user_img.attr("src","img/music1.png");
				this.$FP_aside_user_img.parent().children(".shuishou")[0].play();
			}else{
				this.$FP_aside_user_img.attr("src","img/music2.png");
				this.$FP_aside_user_img.parent().children(".shuishou")[0].pause();
			}
		}

	};




	// 聊天信息模块对象
	var yue_findPosition_rightTalk={
		do:function(){
			this.reset();
			this.startDoing();
			this.bind();
		},
		// 初始化
		reset:function(){
			this.$FP_rightT=$("#findPosition > .right_talking");
			this.$FP_rT_top_left=$("#findPosition > .right_talking > .talk_top > .talk_left");
			this.$FP_topFixed_t_HRE=$("#findPosition > .topFixed > .top > .head > .right > .redTalk");
		},
		// 开始要做的事
		startDoing:function(){

		},
		// 绑定
		bind:function(){
			this.$FP_rT_top_left.on("click",$.proxy(this.$FP_rT_top_left_fun,this));
			this.$FP_topFixed_t_HRE.on("click",$.proxy(this.$FP_topFixed_t_HRE_fun,this));
			this.$FP_rightT.on("touchstart",$.proxy(this.$FP_rightT_s_fun,this));
			this.$FP_rightT.on("touchend",$.proxy(this.$FP_rightT_e_fun,this));
		},
		// 以下四个函数--有聊天总界面出现与消失内容
		$FP_rT_top_left_fun:function(){
			this.$FP_rightT.animate({"left":"100%"},500,$.proxy(function(){
				this.$FP_rightT.css({"display":"none"});				
			},this));
		},
		$FP_topFixed_t_HRE_fun:function(){
			this.$FP_topFixed_t_HRE.children(".red").css({"visibility":"hidden"});
			this.$FP_rightT.css({"display":"block"});
			this.$FP_rightT.animate({"left":0},500);				
			
		},
		$FP_rightT_s_fun:function(e){
			this.rightT_s_clientX=e.changedTouches[0].clientX;
			// console.log(this.rightT_s_clientX)
		},
		$FP_rightT_e_fun:function(e){
			var rightT_e_XY=e.changedTouches[0].clientX-this.rightT_s_clientX;
			if(rightT_e_XY>0){
				this.$FP_rightT.animate({"left":"100%"},500,$.proxy(function(){
						this.$FP_rightT.css("display","none");				
				},this));
			};
		}




	};
	var yue_findPosition_search_p={
		do:function(){
			this.reset();
			this.bind();
			this.startDoing();
		},
		reset:function(){
			 yue_public.call(this);
			 this.$search_pos_top_cent=$("#search_position > .search_top > .top_main > .s_t_center");
			 this.$search_pos_top_inp=this.$search_pos_top_cent.children("input");
			 this.$search_pos_top_span=this.$search_pos_top_cent.children("span");
			 this.$search_pos_top_cancel=this.$search_pos_top_cent.parent().children(".s_t_right");
			 this.$search_pos_top_city=this.$search_pos_top_cent.parent().children(".s_t_left");
			 this.$search_pos_top_s_center=$("#search_position > .search_center");
			 this.boo_input_val="";
		},
		bind:function(){
			this.$search_pos_top_inp.on("input",$.proxy(this.$search_pos_top_inp_fun,this));
			this.$search_pos_top_cancel.on("click",$.proxy(this.$search_pos_top_cancel_fun,this));
			this.$search_pos_top_city.on("click",$.proxy(this.$search_pos_top_city_fun,this));
			this.$search_pos_top_span.on("click",$.proxy(this.$search_pos_top_span_fun,this));
			this.$search_pos_top_s_center.on("click",$.proxy(this.$search_pos_top_cancel_fun,this));
		},
		startDoing:function(){
			this.$search_pos_top_inp[0].focus();
		},
		// 监听搜索框内容的变化
		$search_pos_top_inp_fun:function(){
			var val=this.$search_pos_top_inp.val().replace(/\s+/g,"");
			if(!val){
				this.$search_pos_top_span.css("display","none");
				return;
			}
			if(val&&val!=this.boo_input_val){
				this.boo_input_val=val;
				this.$search_pos_top_span.css("display","block");
			}
		},
		// cancel返回主页面
		$search_pos_top_cancel_fun:function(){
			$("#findPosition").css({"display":"block"});
			$("#search_position").css("display","none");

		},
		// 顶部左边城市选择点击
		$search_pos_top_city_fun:function(){
			$("#findPosition").css({"display":"none"});
			$("#search_position").css("display","none");
			$("#search_position").data("boo","true");
			$("#P_cityChoose").css("display","block");
			$("#P_cityChoose > .headFixed > .head > .search")[0].focus();

		},
		// ×点击消失内容
		$search_pos_top_span_fun:function(){
			this.$search_pos_top_span.css("display","none");
			this.$search_pos_top_inp.val("");
			this.$search_pos_top_inp[0].focus();
		}




	};





















	yue_findPosition.do();
	yue_findPosition_cityChoose.do();
	yue_findPosition_asideUser.do();
	yue_findPosition_rightTalk.do();
	yue_findPosition_search_p.do();

	//轮播组件整块
	(function(){
		var banner=document.getElementsByClassName("banner_main")[0],
			timer=null,
			count=0,
			ulstarx,ulstarx1,
			touchS,touchM=false,touchE,countes,mhua;
	    var ban_ch_f=banner.children[0],
	    	ban_ch_s=banner.children[1],
		 	qw=false,pagestarx,
		    phonepagex=document.body.clientWidth;
		interval();
		ban_ch_f.addEventListener("touchstart",touchstarfn);
		function touchstarfn(e){
			// e.preventDefault();
			clearInterval(timer);
			if(qw==true){
				ban_ch_f.style.transform="translateX(-10%)";
				qw=false;
			}
			// 获取触摸那一刻的时间
			touchS=new Date();
		        pagestarx=e.changedTouches[0].pageX;
		    // 获取对象位移百分比中去掉“%”的数
		    	ulstarx=parseFloat(ban_ch_f.style.transform.split("(")[1])||-10;
		     	// 百分比与尺寸之间的换算
		     	ulstarx1=ulstarx*0.01*phonepagex/10*100;
		};
		ban_ch_f.addEventListener("touchmove",function(e){
				clearInterval(timer);
		    	e.preventDefault();
		    	//求证是否移动的标识
		    	touchM=true;
		    	//求得移动与初始时间点差值；
		        var pagemovex=e.changedTouches[0].pageX,tmes;
		    	tmes=pagemovex-pagestarx;
		    	// 求得触摸移动的距离与元素对象初始位置x的加和
		    	var pagemovex=e.changedTouches[0].pageX;
		    	var	x=((pagemovex-pagestarx+ulstarx1)/phonepagex)*10+"%";
		    		// 正常transform赋值
		    	ban_ch_f.style.transform="translateX("+x+")";
		    	// 手指移动的距离
		    	countes=pagemovex-pagestarx;
		    })

		ban_ch_f.addEventListener("touchend",touchendfn);

		function touchendfn(e){
			clearInterval(timer);
			e.preventDefault();
			// 获取触摸结束的时间点
		    	touchE=new Date();
			es=touchE-touchS;
			
			if(es<300&&touchM==true&&countes>0){
				if(count==0&&countes>0){
		    		count=8;
		    	};
				moveRight(ban_ch_f,count);
			}else if(es<300&&touchM==true&&countes<0){
				moveLeft(ban_ch_f,count);
			}else if(es>=300&&touchM==true){
				countes1=countes/phonepagex;
				if(countes1>0.5){
					if(count==0&&countes>0){
		    			count=8;
		    		};
					addsizeRight(ban_ch_f,count);
					
				}else if(countes1<0.5&&countes1>0){
					addsizeLeft(ban_ch_f,count);
					if(count==8){
							setTimeout(function(){
								ban_ch_f.style.transform="translateX(-10%)";
								count=0;
						},210)
					}
					
					
				}else{
					// 向右补充
					if(countes1>-0.5){
						addsizeLeftTwo(ban_ch_f,count);
						
					}else{
						addsizeRightTwo(ban_ch_f,count);
						
							setTimeout(function(){
								if(count==8){
									ban_ch_f.style.transform="translateX(-10%)";
								}
							count=count%8;
							ban_ch_s.children[count].style.background="yellow";
						},210);
						
						
					};
				};
			};
			
			interval();
			touchM=false;
		}
		// 定时器封装函数
		function interval(){
			timer=setInterval(function(){
				count++;
				if(count==8){
					setTimeout(function(){
						ban_ch_f.style.transform="translateX(-10%)";
					},310)
				}
				count=count%8;
			sport(ban_ch_f,count);
			for (var i = 0; i <8; i++) {
				ban_ch_s.children[i].style.background="red";
			};
			ban_ch_s.children[count].style.background="yellow";
		},2000);
		}
		// 运动函数封装	
		function sport(qElement,n){
			var nowtime=new Date(),i=0;
			var sportT=setInterval(function(){
			 i=-(new Date()-nowtime)/300;
				if(i<=-1){
					i=-1;
					clearInterval(sportT);
				};
				i=(i-n)*10+"%";
				qElement.style.transform="translateX"+"("+i+")";
			},1000/60);
		};
		// 时间小于300毫秒向右运动封装函数
		
		function moveRight(qElement,n){
			var nowtime=new Date(),i=0,mr;
			var sportT1=setInterval(function(){
			 i=(new Date()-nowtime)/200;
				if(i>=1){
					i=1;
					clearInterval(sportT1);
					count--;
					for (var j = 0; j <8; j++) {
						ban_ch_s.children[j].style.background="red";
					};

					ban_ch_s.children[count].style.background="yellow";

				};
				mr=(-(n+1)+countes/phonepagex+i*(1-(countes/phonepagex)))*10+"%";
				qElement.style.transform="translateX"+"("+mr+")";
			},1000/60);
		};
// 时间小于300毫秒向左运动封装函数
		function moveLeft(qElement,n){
			n++;
			if(count==7){
				qw=true;
			}
			var nowtime=new Date(),i=0,ml;
			var sportT2=setInterval(function(){
			 i=-(new Date()-nowtime)/200;
				if(i<=-1){
					i=-1;
					clearInterval(sportT2);
					count++;
					count=count%8;
					for (var j = 0; j <8; j++) {
						ban_ch_s.children[j].style.background="red";
					};
					ban_ch_s.children[count].style.background="yellow";
			
				};
				    ml=(-n+countes/phonepagex+i*(1+(countes/phonepagex)))*10+"%";

				qElement.style.transform="translateX"+"("+ml+")";
			},1000/60);
		};
	// addsizeLeft向右慢划向左补充的封装函数
	function addsizeLeft(bElement,c){
		var nowtime=new Date(),n;
		var sportT3=setInterval(function(){
			n=(new Date()-nowtime)/200;
			if(n>=1){
				n=1;
				clearInterval(sportT3);
			};
			n=(-(c+1)+countes1-n*countes1)*10+"%";
			bElement.style.transform="translateX("+n+")";
		},1000/60)
	}
	// addsizeRight向右慢划向右补充的封装函数
	function addsizeRight(bElement,c){
		// if(count==8){
		// 	bElement.style.transform="translateX("+n+")";
		// }
		var nowtime=new Date(),n;
		var sportT4=setInterval(function(){
			n=(new Date()-nowtime)/200;
			if(n>=1){
				n=1;
				clearInterval(sportT4);
				count--;
				 
				for (var j = 0; j <8; j++) {
				ban_ch_s.children[j].style.background="red";
			};
			ban_ch_s.children[count].style.background="yellow";
			};
			n=(-(c+1)+countes1+n*(1-countes1))*10+"%";
			bElement.style.transform="translateX("+n+")";
		},1000/60)
	}

	//addsizeLeftTwo向左慢划向右补充的封装函数;
	function addsizeLeftTwo(bElement,c){
		var nowtime=new Date(),n;
		var sportT5=setInterval(function(){
			n=(new Date()-nowtime)/200;
			if(n>=1){
				n=1;
				clearInterval(sportT5);
				//count--;
				for (var j = 0; j <8; j++) {
				ban_ch_s.children[j].style.background="red";
			};
			ban_ch_s.children[c].style.background="yellow";
			};
			n=(-(c+1)+countes1-n*countes1)*10+"%";
			bElement.style.transform="translateX("+n+")";
		},1000/60)
	}
	//addsizeRightTwo向左慢划向左补充的封装函数;
	function addsizeRightTwo(bElement,c){
		var nowtime=new Date(),n;
		var sportT6=setInterval(function(){
			n=(new Date()-nowtime)/200;
			if(n>=1){
				n=1;
				clearInterval(sportT6);
				count++;
				
				for (var j = 0; j <8; j++) {
				ban_ch_s.children[j].style.background="red";
				};
			
			};
			n=(-(c+1)+countes1-n*(1+countes1))*10+"%";
			bElement.style.transform="translateX("+n+")";
		},1000/60)
	};
	})()
}($);
	









}






