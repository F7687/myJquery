;
(function() {
	//模仿jQ里面获取元素  $(css选择器)
	function jQuerys(selector) {
		//document.querySelectorAll 返回的是一个伪数组  是NodeList构造函数的实例对象
		return new Inits(selector);
	}

	//给原型加方法 ，就需要自己写一个构造函数
	function Inits(selector) {
		let dom = document.querySelectorAll(selector);
		//遍历伪数组把每个元素拿出来作为自己的伪数组元素
		for (let i = 0; i < dom.length; i++) {
			this[i] = dom[i];
		}
		//给伪数组加一个长度
		this.length = dom.length;
	}
	//封装遍历伪数组的方法
	Inits.prototype.each = function(callback) {
		for (let i = 0; i < this.length; i++) {
			callback(i, this[i]);
		}
	}
	/*
		jQ的css方法  ：设置css样式 jQ对象.css(属性名，属性值)
					   获取css样式 jQ对象.css(属性名)
	*/
	Inits.prototype.css = function(property, value) {
		//如果没有传入第二个参数  就是获取
		if (!value) {
			return window.getComputedStyle(this[0])[property]
		} else {
			let pro = ["width", "height", "left", "right", "top", "bottom", "padding", "margin-left", "margin-top"];
			this.each(function(i, e) {
				//console.log(e);
				//console.log(property,value)
				if (pro.indexOf(property) !== -1) {
					if (value.toString().indexOf('px') === -1) {
						e.style[property] = value + "px";
					} else {
						e.style[property] = value;
					}
				} else {
					e.style[property] = value;
				}
			});
			return this;
		}

	}

	// 实现addClass功能
	/**
	 *  jq里面的addClass
	 *    jq对象.addClass(类名)
	 * 
	 */
	Inits.prototype.addClass = function(className) {
		this.each(function(i, e) {
			e.classList.add(className);
		})
	}
	Inits.prototype.removeClass = function(className) {
		this.each(function(i, e) {
			e.classList.remove(className);
		})
	}
	Inits.prototype.toggleClass = function(className) {
		this.each(function(i, e) {
			e.classList.toggle(className);
		})
	}


	//封装单个元素的方法
	function jQuery(selector) {
		return new Init(selector);
	}

	function Init(selector) {
		let dom = document.querySelector(selector);
		console.log(dom);
		this[0] = dom;

	}
	
	//修改单个元素的样式
	Init.prototype.css = function(property, value) {
		if (!value) {
			return window.getComputedStyle(this[0])[property]
		} else {
			let proAll = ["width", "height", "left", "right", "top", "bottom", "padding", "margin-left", "margin-top"];
			if (proAll.indexOf(property) !== -1) {
				if (value.toString().indexOf('px') === -1) {
						this[0].style[property] = value + "px";
				} else {
						this[0].style[property] = value;
				}
			} else {
					this[0].style[property] = value;
			}
			return this;
		}
	}
	
	//添加，删除，切换 class选择器
	Init.prototype.addClass = function(className) {
		console.log(this[0]);
		this[0].classList.add(className);
	}
	Init.prototype.removeClass=function(className){
		this[0].classList.remove(className);
	}
	Init.prototype.toggleClass=function(className){
		this[0].classList.toggle(className)
	}
	
	//添加子元素
	Init.prototype.addChild=function(ele,text){
		let element;
		if(!text){
			element=document.createElement(ele);
			this[0].appendChild(element);
		}else{
			element=document.createElement(ele);
			element.innerText=text;
			this[0].appendChild(element);
			
		}
		return element;
	}
	window.$$ = window.jQuerys = jQuerys;
	window.$ = window.jQuery = jQuery;
})();
