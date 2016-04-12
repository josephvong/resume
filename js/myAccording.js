$(function(){
	var oA=new Accor();
	oA.init("accor1",{
		event:"click",
		height:"content",
		toggle:false,
		open:1
		//sort:true
	});
})

function Accor(){
	this.obj=null;
	this.setting={
		event:"click",
		height:"default",  //default 表示高度恒为200；
		toggle:false,
		open:false			//默认打开		
							//排序功能未开发
	}
}
Accor.prototype.init=function(id,json){
	var _this=this;
	//判断输入对象的类型“id”为字符串 或 对象
	if ($.type(id)=="string")
	{
		this.obj=$("#"+id);
	}else if ($.type(id)=="object")
	{
		this.obj=$(id);
	}
	//合并自定义备选项
	$.extend(true,this.setting,json);

	//获取展开菜单的对象元素
	this.oGroup=this.obj.find(".group");
	this.oTitle=this.oGroup.find("h3");
	this.oField=this.oGroup.find(".field");
	this.oCont=this.oField.find(".content");
	
	this.oH=this.oTitle.outerHeight(); // 初始高度（h3标签的高度）
	this.dH=400;					   // 内容的默认高度
	this.tempH=null;				   // 临时高度 （存放打开某个tab时的内容高度）
	this.timer=null;				   //延时计时器变量
	

	this.objH=this.obj.outerHeight();  //每个tab的当前高度

	
	this.aPos=this.SetAbsPosit(this.oGroup);
	this.obj.css("height",this.objH);
	console.log(this.aPos);

	//定义属性
	this.oGroup.each(function(i,elem){
		//给每个group设定基本属性
		$(elem).attr({
			"default":0,      //此“default”为是否打开，“0”为未打开，1为以打开
			border:"light",
			index:i,
			height:_this.oH,  //初始高度（h3标签的高度）
			moving:0,
		});
	})
	
	//首个打开：
	this.firOpen();
	//对象事件：
	this.oGroup.on("mouseenter",function(){
		var This=this;
		_this.m_enter(this);
	});

	this.oGroup.on("mouseleave",function(){
		_this.m_leave(this);
	});
	
	this.oGroup.on("mouseup",function(){
		_this.m_up(this);
	})

	this.oTitle.on("mousedown",function(){
		
	})
	this.oTitle.on("mouseup",function(){
		if($(this).parent().attr("moving")==0){ //moving=0 为静止
			if (_this.setting.toggle==true && $(this).parent().attr("default")==1)
			{
				$(this).parent().attr({"height":_this.oH,"default":0});
				var nowIndex=parseInt($(this).parent().attr("index"));
				_this.oGroup.each(function(i,elem){
					if ($(elem).attr("index")==nowIndex)
					{
						$(elem).animate({"height":_this.oH});
					}else if ($(elem).attr("index")>nowIndex)
					{
						$(elem).animate({"top":_this.aPos[parseInt($(elem).attr("index"))].top});
					}
				})
				event.stopPropagation();
			}
		}else if ($(this).parent().attr("moving")==1){
			$(this).parent().attr("moving")=0;
		}	
	})	
}

Accor.prototype.firOpen=function(){
	var _this=this;
	if (this.setting.open!=false )
	{
		var N=parseInt(this.setting.open)-1;
		if ($(this.oGroup[N]))
		{
			this.statusChange($(this.oGroup[N]));
		}
	}
	
}

Accor.prototype.m_enter=function(obj){
	var _this=this;
	if ($(obj).attr("border")=="light" && $(obj).attr("default")==0)
	{
		$(obj).css("borderColor","#AAAAAA");  // 此处可以自定义边框打开颜色
		$(obj).attr("border","dark");
	}
	if (this.setting.event=="hover")
	{
		this.timer=setTimeout(function(){
			_this.statusChange(obj);
		},1000)
	}
}
Accor.prototype.m_leave=function(obj){
	if ($(obj).attr("border")=="dark" && $(obj).attr("default")==0)
	{
		$(obj).css("borderColor","yellow");  // 此处可以自定义边框闭合颜色
		$(obj).attr("border","light");
	}
	if (this.timer)   //鼠标离开时 清除 延时 定时器
	{
		clearTimeout(this.timer);
	}
}

Accor.prototype.m_up=function(obj){
	this.statusChange(obj);
}




Accor.prototype.statusChange=function(obj){
	var _this=this;
	//先将所有group对象的属性 还原为最初的状态
	this.oGroup.each(function(i,elem){
		$(elem).attr({
			"border":"light",  //
			"default":0,
			"height":_this.oH   //所有group对象的高度属性返回 35.
		});
		$(elem).css({"border-color":"yellow"});	  //将边框还原为初始颜色（可以自定义颜色）
	})
	
	//将参数obj(当前控制的对象) 更改如下属性
	$(obj).attr({
		"border":"dark",
		"default":1
	});
	if (this.setting.height=="default")  //判断 如果配置项 的“height”为默认
	{
		this.tempH=this.dH;
		$(obj).attr({"height":_this.oH+this.dH}); //标签的“height”属性为 200+标题高（30）	
	}else if (this.setting.height=="content")	 //判断 如果配置项 的“height”为“content”(内容)
	{
		var conH=$(obj).find(".content").outerHeight();
		this.tempH=conH;  //将内容高存放到“tempH”变量内
		$(obj).attr({"height":this.oH+this.tempH});	
	}
	$(obj).css({"border-color":"#AAAAAA"});	
	this.synchMove(obj);
	
}




Accor.prototype.synchMove=function(obj){
	var _this=this;
	var lastIndex=parseInt($(obj).attr("index"));
	this.oGroup.each(function(i,elem){
		
		/*if (parseInt($(elem).attr("index"))==lastIndex)
		{
			$(elem).animate({"top":_this.aPos[lastIndex].top,"height":parseInt($(elem).attr("height"))});
		}*/
		
		if (parseInt($(elem).attr("index"))>parseInt($(obj).attr("index")))
		{
			$(elem).animate({"height":parseInt($(elem).attr("height")),"top":parseInt(_this.aPos[parseInt($(elem).attr("index"))].top)+_this.tempH});
		}
		else if (parseInt($(elem).attr("index"))<=lastIndex)
		{
			$(elem).animate({"top":_this.aPos[parseInt($(elem).attr("index"))].top,
				"height":parseInt($(elem).attr("height"))
			});
		}else{
			$(elem).animate({"height":parseInt($(elem).attr("height"))});
		}
	})
	//$(obj).animate({"top":this.aPos[lastIndex].top});
	this.obj.css("height",this.objH+this.tempH);
}

Accor.prototype.SetAbsPosit=function(objs){
	var aPos=[];
	objs.each(function(i,elem){
		aPos[i]={left: $(elem).position().left, top: $(elem).position().top};
	})
		
	objs.each(function(i,elem){
		$(elem).css({
			"left":aPos[i].left,
			"top":aPos[i].top,
			"position":"absolute",
			"margin":0
		});
	})
		
	return aPos;
}
