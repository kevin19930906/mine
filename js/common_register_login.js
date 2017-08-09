//登录注册验证---------------------------------------------------
$(".regword1").attr("disabled", "disabled")
$(".login-page input").css({ "border": "1px solid #999" }).focus(function() {
	$(this).css({ "border": "1px solid #ffc353" });
}).blur(function() {
	$(this).css({ "border": "1px solid #f99" });
});
//电子邮件
var flag1 = flag2 = flag3 = flag4 = flag5 = flag6 = false;
$(".e-mail").blur(function() {
	var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	var str = $(this).val();
	$(this).css("border", "1px solid #3bb41a");
	if($(this).val() == "") {
		$(this).prev().html("邮箱不能为空");
		flag1 = false;
	} else if(!reg.test(str)) {
		$(this).css("border", "1px solid red");
		$(this).prev().html("邮箱格式有误");
		$(this).val("");
		flag1 = false;
	} else {
		$(this).prev().html("邮箱格式正确");
		$(this).css("border", "1px solid green");
		flag1 = true;
	}
})
//密码判断
$(".psd").keyup(function() {
	var val = $(this).val();
	var lv = 0;
	if(val.match(/[a-z]/g)) { lv++; }
	if(val.match(/[0-9]/g)) { lv++; }
	if(val.match(/(.[^a-z0-9])/g)) { lv++; }
	if(val.length < 6) { lv = 0; }
	if(val == "") {
		$(this).prev().html("密码不能为空");
		flag2 = false;
	} else {
		switch(lv) {
			case 0:
				$(this).prev().html("请输入至少六个字符");
				$(this).css({ "border": "1px solid #f00" });
				flag2 = false;
				break;
			case 1:
				$(this).prev().html("密码强度弱");
				$(this).css({ "border": "1px solid #f99" });
				flag2 = true;
				break;
			case 2:
				$(this).prev().html("密码强度中");
				$(this).css({ "border": "1px solid #3bb41a" });
				flag2 = true;
				break;
			case 3:
				$(this).css({ "border": "1px solid green" });
				$(this).prev().html("密码强度强");
				flag2 = true;
		}
	}

})
//密码确认
$(".psd").next().focus(function() {
	if(!flag2) {
		$(this).prev().prev().html("请输入密码");
		$(this).attr("maxlength", "0")
	} else {
		$(this).removeAttr("maxlength")
	}
});
$(".psd").next().blur(function() {
	if(flag2) {
		if($(this).val() !== $(this).prev().val()) {
			$(this).css("border", "1px solid red");
			$(this).prev().prev().html("两次密码不一致，请重新输入");
			$(this).val("");
			flag3 = false;
		} else {
			$(this).prev().prev().html("密码输入一致");
			$(this).css("border", "1px solid green");
			$(this).prev().css("border", "1px solid green");
			flag3 = true;
		}
	}
});
//用户名
$(".nae").blur(function() {
	var name = /^[A-Z0-9a-z\\-\u4e00-u9fa5]{6,20}$/;
	var arr = $(this).val();
	if(arr == "") {
		$(this).prev().html("请输入用户名");
		flag4 = false;
	} else if(!name.test(arr)) {
		$(this).css("border", "1px solid red");
		$(this).prev().html("格式有误");
		$(this).val("");
		flag4 = false;
	} else {
		$(this).prev().html("格式正确");
		$(this).css("border", "1px solid green");
		flag4 = true;
	}
});

//手机号码

$(".tel").blur(function() {
	var reg = /^1[3|5|7|8]\d{9}$/; //以13，15，17,18开头的十一位数字
	var str = $(this).val();
	if(str == "") {
		$(this).prev().html("请输入正确的手机号");
		flag5 = false;
	} else if(!reg.test(str)) {
		$(this).css("border", "1px solid red");
		$(this).prev().html("手机号格式有误");
		$(this).val("");
		flag5 = false;
	} else {
		$(this).prev().html("手机号格式正确");
		$(this).css("border", "1px solid green");
		flag5 = true;
	}
});

//验证码

$(".regword2").blur(function() {
	var regword1 = $(this).val();
	var regword2 = $(this).prev().val();
	if(regword1 == "") {
		$(this).prev().prev().prev().html("请输入验证码");
		flag6 = false;
	} else if(regword1.toUpperCase() !== regword2.toUpperCase()) {
		$(this).css("border", "1px solid red");
		$(this).prev().prev().prev().html("验证码不正确，请重新输入");
		$(this).val("");
		random();
		flag6 = false;
	} else {
		$(this).prev().prev().prev().html("验证码输入一致");
		$(this).css("border", "1px solid green");
		flag6 = true;
	}
})

//提交按钮
$(".regiter-btn strong").click(function() {
	var flag7 = $(".regiter-checked").prop("checked")
	if(flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7) {
		var name = $(".e-mail").val();
		var psd = $(".psd").val();
		$.ajax({
			type: "POST",
			url: "json/common.php",
			data: "username=" + name + "&password=" + psd + "&act=reg",
			success: function(data) {
				data = JSON.parse(data);
				if(data.error == 0) {
					alert("注册成功")
					location.href = "html/index.html";
				} else if(data.error == 1) {
					alert("用户名已存在")

				}
			}
		})

	} else {
		alert("请输入信息！");
	}
})

//登录判断

$(".login-btn").find("input").click(function() {
	var name1 = $(".login-input").find("input:first-child").val();
	var psd1 = $(".login-input").find("input:last-child").val();
	$.ajax({
		type: "POST",
		url: "json/common.php",
		data: "username=" + name1 + "&password=" + psd1 + "&act=login",
		success: function(data) {
			var data = JSON.parse(data);
			if(data.error == 0) {
				$(".login-input").find("input:first-child").val("");
				$(".login-input").find("input:last-child").val("");
				$(".login-reginster").hide();
				setTimeout(function() {
					alert("欢迎来到时尚起义");
					$(".login").hide().siblings(".acount").show();
					$(".acount").click(function() {
						alert("确定要离开？")
						$(".login").show().siblings(".acount").hide();
						$(".login a,menu_login a").click(function(){
							$(".login-reginster").show();
						})
					})
				}, 200)
			} else if(data.error == 1) {
				alert("用户名或密码错误")
			}
		}
	})
})

//随机生成验证码
function random() {
	/**生成字母数组**/
	var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9";
	var letterArr = letterStr.split(",")
	var random = "";
	for(var i = 0; i < 4; i++) {
		random += letterArr[randomNum(0, 61)]
	}
	$(".regword1").val(random).css("color", randomColor(0, 255));
}

/**生成一个随机色**/
function randomColor(min, max) {
	var r = randomNum(min, max);
	var g = randomNum(min, max);
	var b = randomNum(min, max);
	return "rgb(" + r + "," + g + "," + b + ")";
}

/**生成一个随机数**/
function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}