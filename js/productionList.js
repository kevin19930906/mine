$(function() {
	/*引入侧边栏*/
	$(".aside").load("common.html .aside", function() {
		$.get("json/nav-title.json", function(data) {
			var html = template("nav", data);
			$(".partNav ul").html(html);
			
			
			$(".partNav ul").on("mouseenter", "li", function() {
				$(".nav_title_list").show();
				var index = $(this).index();
				$.get("json/nava-title-data.json", function(data) {
					var html1 = template("navCon", data[index]);
					$(".nav_title_list").html(html1);
				})
			})

			$(".partNav").on("mouseleave", function() {
				$(".nav_title_list").hide();
			})
			
			
			$(".partNav ul li").hover(function() {
				$(this).css("background", "#fff").siblings().css("background", "#cecece");
				$(this).children("a").css("color", "red").parent().siblings().children("a").css("color", "#000");
			}, function() {
				$(this).css({ "background": "#cecece", "color": "#000" });
				$(this).children("a").css("color", "#000");
			});
		});

	});

	//引入侧边栏
	$(".right_bar").load("common.html .right_bar", function() {
		var test = true;
		$(".menu_btn").click(function() {
			if(test) {
				$(".right_bar").stop().animate({ "right": 0 }, 100, function() {
					init(".menu_cart a span"); //初始化购物车
					test = false;
					$(".menu_btn").html(">")
					$("a.search_btn").click(function() {
						$(".search_pop").css("display", "block");
						$(".bar_search_tan").css("display", "block");
						$(".bar_search_tan").click(function() {
							$(".search_pop").css("display", "none")
						})
						$(".bar_search_high").unbind('click')
						$(".bar_search_high").click(function() {
							if($(".bar_search_word").html() == "") {
								alert("请输入内容")
							}
						})
					})

				});
				$(".bottom-fixed .yincang").hide();

				$(".weiChat-dowmload").hover(function() {
					$(this).siblings(".app_pop").show();
				}, function() {
					$(this).siblings(".app_pop").hide();
				})
				$(".weichat_btn").hover(function() {
					$(this).siblings(".wechat_pop").show();
				}, function() {
					$(this).siblings(".wechat_pop").hide();
				})

			}
			if(!test) {
				$(".right_bar").stop().animate({ "right": -100 }, 100, function() {
					test = true;
					$(".menu_btn").html("<")
				});
				$(".bottom-fixed .yincang").show();
			}

		})

	});

	$("#header").load("common.html #header", function() {
		/*登录注册*/
		var flag = true;
		init(".add_cart span");//初始化购物车
		$(".login a:first-child,.menu_login a:first-child,.login-em").click(function() {
			$("#login-outer").show().siblings($(".login-page")).show();
			$(".login-content,.register-common,.pian a:first-child,.register-vip").hide();
			$(".login-code,.login-tip").show();
			$(".login-sec a:first-child").html("普通会员登录");
			$(".login-sec a:last-child").html("批发会员登录");
			$(".login-page").css({ "height": "360px" })
			flag = true;
		})
		$(".login-page i,#login-outer").click(function() {
			$("#login-outer").hide().next($(".login-page")).hide();
			$(".register-common,.register-vip").hide();
			$(".login-code").show().next($(".login-content")).hide();
			$(".login-tip").show();
		})
		$(".pian a:first-child").click(function() {
			$(".login-code").show().next($(".login-content")).hide();
			$(".login-sec a:nth-child(1)").addClass("cur").siblings().removeClass("cur");
			$(".pian a:first-child,.register-vip").hide();
		})
		$(".login-code li:last-child").click(function() {
			$(".pian a:first-child").show();
			$(".login-code").hide().next($(".login-content")).show();
			$(this).addClass("cur").siblings().removeClass("cur");
			$(".login-content").show();
		})

		$(".login-tip .cur,.login a:last-child,.menu_login a:last-child").click(function() {
			$(".login-sec a:nth-child(1)").addClass("cur").siblings().removeClass("cur");
			$(".login-page").css({ "height": "390px" })
			$("#login-outer").show().siblings($(".login-page")).show();
			$(".login-code,.login-tip,.login-content").hide();
			$(".login-sec a:first-child").html("普通会员注册");
			$(".login-sec a:last-child").html("批发会员注册");
			$(".register-common").show();
			$(".register-vip").hide();
			random(); //验证码验证
			flag = false;
		})
		$(".login-sec a:nth-child(1)").click(function() {
			if(flag) {
				$(".pian a:first-child,.pian a:nth-child(4)").show();
				$(this).addClass("cur").siblings().removeClass("cur")
				$(".login-content").show();
				$(".login-code,.register-common").hide();
			} else {
				$(".login-content").hide();
				$(".register-vip").hide();
				$(".register-common").show();
				$(".login-page").css({ "height": "390px" });
				random(); //验证码验证
			}
			$(this).addClass("cur").siblings().removeClass("cur")
		})
		$(".login-sec a:nth-child(2)").click(function() {
			if(flag) {
				$(".pian a:nth-child(1),.pian a:nth-child(4),.register-common").hide();
			} else {
				$(".register-common").hide();
				$(".register-vip").show();
				$(".login-page").css({ "height": "650px" })
				$(".login-sec").css({ "margin-top": "50px" })
				random(); //验证码验证
			}
			$(this).addClass("cur").siblings().removeClass("cur");
		})
		/*导航栏点击切换*/
		$(".ladies").click(function() {
			$(this).find("a").attr("href","index.html")
			$(".top_bar").show();
			$(".men,.prolist-cosmestic").hide();
			$(".women,.aside").show();
			$(this).find("a").addClass("cur").end().siblings("li").find("a").removeClass("cur")
		})
		$(".man").click(function() {
			$(this).find("a").attr("href","index.html")
			$(".top_bar").show();
			$(".women,.prolist-cosmestic").hide();
			$(".men,.aside").show()
			$(this).find("a").addClass("cur").end().siblings("li").find("a").removeClass("cur")
		})
		$(".cosmestic").click(function() {
			
			$(this).find("a").attr("href","index.html")
			$(".top_bar").hide();
			$(".women,.men,.aside").hide();
			$(".prolist-cosmestic").show();
			$(this).find("a").addClass("cur").end().siblings("li").find("a").removeClass("cur")
			
		});
	})

	/*引入尾部*/
	$("#guarantee").load("common.html #guarantee");
	$(".bottom").load("common.html .bottom");

	/*引入头部导航栏*/
	$(".top_bar").load("common.html .top_bar");

	/*引入下角固定页*/
	$(".bottom-fixed").load("common.html .bottom-fixed", function() {
		$(".fixBtn").click(function() {
			$('html,body').animate({ scrollTop: 0 }, 1000);
		})
	});

	//头部导航栏
	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop()
		if(scrollTop > 500) {
			$(".top_bar").stop().animate({ top: "0" }, 300)
			$(".right_bar ").css("top", "40px")
		} else {
			$(".top_bar").stop().animate({ top: "-40px" }, 30)
			$(".right_bar ").css("top", "126px")
		}
	});

	//动态生成页面数据
	$(window).load(function() {
		$.ajax({
			type: "get",
			url: "json/index.json",
			success: function(data) {
				var html = "";
				for(var i in data) {
					html += "<li><div class='cosmestic-list-pic'><a target='_blank' href='productionDetail.html?id=" + data[i].id + "'><img src='" + data[i].src[0] + "' /></a></div><p>HOT!</p><p><a target='_blank' href='productionDetail.html?id=" + data[i].id + "'>" + data[i].details + "</a></p><p><a target='_blank' href='productionDetail.html?id=" + data[i].id + "'>" + data[i].name + "</a></p><p><span>" + data[i].price[0] + "</span><span style='color:red'>" + data[i].price[1] + "</span></p></li>"
				}

				$(".productionList").html(html);
			}
		})

	})
	
	//初始化购物车
	
    function init(ele){
        //获取购物车商品的数量
        var num = 0;
        var cartStr = $.cookie("cart");
        cartStr = cartStr ? cartStr : "[]";
        var cartObj = JSON.parse(cartStr);
        for(var i in cartObj){
            num += parseInt( cartObj[i].num );
        }
        $(ele).html(num);
    }

})