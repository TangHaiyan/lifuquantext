(function() {
	function defaultFontSize() {
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

	function adapt(designWidth, rem2px) {
		var head = window.document.getElementsByTagName('head')[0];
		document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';

		var x = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
		var st = document.createElement('style');
		var portrait = "@media screen and (min-width: " + window.innerWidth + "px) {html{font-size:" + x + "}}"
		var landscape = "@media screen and (min-width: " + window.innerHeight + "px) {html{font-size:" + ((window.innerHeight / (designWidth / rem2px) / defaultFontSize) * 100) + "%;}}"
		st.innerHTML = portrait;
		head.appendChild(st);

	};
	adapt(750, 100);

	window.onresize = function() {

		//屏幕缩放时，重新设置html-font-size
		var st = document.getElementsByTagName('style')[0];
		var head = document.getElementsByTagName('head')[0];
		head.removeChild(st)
		adapt(640, 100);

	}


	function post(url, options, callback) {
		//1、创建ajax对象，实现兼容

		if (window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		} else if (window.ActiveObject) {
			request = new ActiveObject("Microsoft.XMLHTTP")
		}

		//2、连接服务器
		request.open("post", url, true);
		//3、设置头部信息
		request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		//4、发送请求
		request.send(serialize(options));
		//4、监听响应
		var onchange = request.onreadystatechange;

		function onchange() {
			if (request.readyState = 4) {
				if (request.status == 200 || request.status == 304) {
					callback(request.responseText);
				} else {
					console.log("请求失败，错误状态码为：" + request.responseText)
				}
			}
		};

	}

	function serialize(options) {
		if (!options) {
			return "";
		}
		var paris = [];
		for (var key in options) {
			if ((!options.hasOwnProperty(key)) || (typeof options[key] === "function")) {
				continue;
			}
			var value = options[key].toString();
			key = encodeURIComponent(key);
			value = encodeURIComponent(value);
			paris.push(key + "=" + value);
		}
		return paris.join("&");
	}

	var url = "./action";
	var name = document.getElementById('name').value,
		phone = document.getElementById('phone').value,
		province = document.getElementById('province').value,
		city = document.getElementById('city').value,
		street = document.getElementById('street').value;

	var options = {
		name: name,
		phone: phone,
		province: province,
		city: city,
		street: street
	};
	post(url, options, function() {
		console.log(request.responseText);
	})
})()