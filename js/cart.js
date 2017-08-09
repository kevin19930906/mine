$(function() {

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
						$(".bar_search_high").unbind('click');
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
		init(".add_cart span"); //初始化购物车
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
			$(this).find("a").attr("href", "index.html")
			$(".top_bar").show();
			$(".men,.prolist-cosmestic").hide();
			$(".women,.aside").show();
			$(this).find("a").addClass("cur").end().siblings("li").find("a").removeClass("cur")
		})
		$(".man").click(function() {
			$(this).find("a").attr("href", "index.html")
			$(".top_bar").show();
			$(".women,.prolist-cosmestic").hide();
			$(".men,.aside").show()
			$(this).find("a").addClass("cur").end().siblings("li").find("a").removeClass("cur")
		})
		$(".cosmestic").click(function() {
			$(this).find("a").attr("href", "index.html")
			$(".top_bar").hide();
			$(".women,.men,.aside").hide();
			$(".prolist-cosmestic").show();
			$(this).find("a").addClass("cur").end().siblings("li").find("a").removeClass("cur")
		});
	})

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
				$(this).css("background", "#fff").siblings().css("background", "#cecece")
				$(this).children("a").css("color", "red").parent().siblings().children("a").css("color", "#000")
			}, function() {
				$(this).css({ "background": "#cecece", "color": "#000" })
				$(this).children("a").css("color", "#000")
			})
		});

	});

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
	})

	//生成购物车数据
	$.get("../json/index.json", function(data) {
		//取cookie的值
		var cartStr = $.cookie("cart")
		cartStr = cartStr ? cartStr : "[]";
		var cartObj = JSON.parse(cartStr);
		var arr = [];
		for(var item in cartObj) {
			var cart_cookie_obj = matchId(data, cartObj[item].id);
			if(cart_cookie_obj.num) {
				cart_cookie_obj.num += cartObj[item].num
			} else {
				cart_cookie_obj.num = cartObj[item].num
			}
			cart_cookie_obj.total = "￥ " + cart_cookie_obj.num * cart_cookie_obj.price[0].split(" ")[1];
			arr.push(cart_cookie_obj)
		}
		var objCart = JSON.stringify(arr);
		var obj = {};
		obj.data = arr;

		if(objCart == "[]") {
			$(".cart_tips").show();
			$(".cart_content").hide();
			$(".cart_total_btn input").prop("checked", false)
		} else {
			$(".cart_tips").hide();
			$(".cart_content").show();
			var html = template("cart_data", obj);
			$(".cart_content").html(html);
			onePrice(); //初始化小计
			totalMoney(); //初始化总金额
			init(".add_cart span"); //初始化购物车
		}

		//点击减号 更新cookie
		$(".reduce").click(function() {
			var id = $(this).parent().siblings(".select").attr("href").split("?")[1].split("=")[1];
			var value = $(this).next("input").val();
			if(value <= 1) {
				alert("数量不能小于1")
			} else {
				value--;
				$(this).next("input").val(value);
			}
			addToCart(value, id, 7);
			onePrice(); //初始化小计
			totalMoney(); //计算总金额
			init(".add_cart span"); //计算购物车数量
			init(".menu_cart a span"); //初始化购物车
		})

		//点击加号 更新cookie

		$(".add").click(function() {
			var id = $(this).parent().siblings(".select").attr("href").split("?")[1].split("=")[1];
			var value = $(this).prev("input").val();
			value++;
			$(this).prev("input").val(value);
			addToCart(value, id, 7);
			onePrice(); //初始化小计
			totalMoney(); //计算总金额
			init(".add_cart span"); //计算购物车数量
			init(".menu_cart a span"); //初始化购物车
		})

		//点击删除
		$(".cart_delete").click(function() {
			var id = $(this).parent().parent().siblings(".select").attr("href").split("?")[1].split("=")[1];
			for(var i in cartObj) {
				if(cartObj[i].id == id) {
					cartObj.splice(i, 1);
				}
			}
			var str = JSON.stringify(cartObj);
			$.cookie("cart", str, { "expires": 7, "path": "/" });
			$(this).parent().parent().parent(".cart_list").remove();
			if($(".cart_content").find("li").length == "0") {
				$(".cart_tips").show()
				$(".cart_content").hide()
				$(".cart_total_btn input").prop("checked", false)
			}
			init(".add_cart span"); //计算购物车数量
			init(".menu_cart a span"); //初始化购物车
			totalMoney(); //计算总金额
		})

		//失去焦点时
		$(".cart_count").each(function() {
			var id = $(this).siblings(".select").attr("href").split("?")[1].split("=")[1];
			var reg = /^[1-9]\d*$/
			$(this).find("input").blur(function() {
				var value = $(this).val()
				if(reg.test($(this).val())) {
					addToCart(value, id, 7);
					onePrice(); //初始化小计
					totalMoney(); //计算总金额
					init(".add_cart span"); //计算购物车数量
					init(".menu_cart a span"); //初始化购物车
				} else {
					alert("请输入正确的数字")
					$(this).val("1")
					addToCart(1, id, 7);
					onePrice(); //初始化小计
					totalMoney(); //计算总金额
					init(".add_cart span"); //计算购物车数量
					init(".menu_cart a span"); //初始化购物车
				}
			})
		})

		//点击总选择按钮
		$(".cart_total_btn input").click(function() {
			if($(this).prop("checked")) {
				$(".cart_check").each(function() {
					$(this).prop("checked", true);
				})
				totalMoney();
			} else {
				$(".cart_check").each(function() {
					$(this).prop("checked", false);
				})
				totalMoney();
			}
		})
		
		//点击单个按钮
		$(".cart_check").each(function() {
			var _this = this;
			$(this).click(function() {
				totalMoney();
				//判断是否全选
				if(!$(_this).prop("checked")) {
					$(".cart_total_btn input").prop("checked", false)
				}
				/*if(tel){
					$(".cart_total_btn input").prop("checked", true)
				}*/
			})
		})
	})



	//计算小计
	function onePrice() {
		var sun = 0;
		$(".cart_count").each(function() {
			sun = $(this).children("input").val() * $(this).siblings(".cart_price").html().split(" ")[1];
			$(this).siblings(".cart_single").html("￥" + sun);
		});
	}

	//计算总金额
	function totalMoney() {
		var sum = 0;
		$(".cart_check").each(function() {
			if($(this).prop("checked")) {
				sum += parseInt($(this).siblings(".cart_single").html().split("￥")[1]);
			}
		});
		$(".cart_total_content").find("p:first-child em").html("￥" + sum + ".00");
		$(".cart_total_content").find("p:last-child em").html("￥" + sum + ".00");
	}

	//匹配ID
	function matchId(res, id) {
		for(var item in res) {
			if(res[item].id == id) {
				return res[item];
			}
		}
	}

	//加入购物车
	function addToCart(num, id, date) {
		//获取购物车信息，判断是否有cookie
		var cartStr = $.cookie("cart");
		cartStr = cartStr ? cartStr : "[]";
		var cartObj = JSON.parse(cartStr);
		var isExit = true;
		for(var i in cartObj) {
			if(id == cartObj[i].id) {
				cartObj[i].num = num;
				isExit = false;
			}
		}
		if(isExit) {
			cartObj.push({ "id": id, "num": num })
		}
		//存cookie
		var str = JSON.stringify(cartObj);
		$.cookie("cart", str, { "expires": date, "path": "/" });

	}

	//初始化购物车

	function init(ele) {
		//获取购物车商品的数量
		var num = 0;
		var cartStr = $.cookie("cart");
		cartStr = cartStr ? cartStr : "[]";
		var cartObj = JSON.parse(cartStr);
		for(var i in cartObj) {
			num += parseInt(cartObj[i].num);
		}
		$(ele).html(num);
	}

})