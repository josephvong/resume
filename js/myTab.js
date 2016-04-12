function Tab(){
	this.obj=null;
	this.oHead=null;
	this.aBtn=null;
	this.aCon=null;
	this.setting={
		event:"click", //mouseover
		active:0,   
		way:"Normal",  //Fade Down
		toggle:false,
		size:{width:"auto",height:"auto"}
	}
}
Tab.prototype.init=function(id,json){
	var _this=this;
	if ($.type(id)=="object")
	{
		this.obj=id;
	}else if ($.type(id)=="string")
	{
		this.obj=$("#"+id);
	}
	$.extend(true,this.setting,json);

	if (this.setting.size["width"]!="auto" && parseInt(this.setting.size["width"])<=300)
	{
		this.obj.css("width",300);
	}else{
		this.obj.css("width",this.setting.size["width"]);
	}
	
	//console.log(this.setting.size["width"]);
	
	this.oHead=$(this.obj.find(".head")[0]);
	this.aBtn=this.oHead.find("li");
	this.aCon=this.obj.find(".content");

	$(this.aBtn).each(function(i,elem){
		$(elem).attr("index",i);	
	})
	$(this.aCon).each(function(i,elem){
		$(elem).attr("index",i);
		$(elem).attr("show",0);
	})
	
	
	this.show(this.setting.active,this.setting.way);
	

	if (this.setting.toggle==false)
	{
		this.change();
	}
	
	if (this.setting.toggle==true && this.setting.event=="click")
	{
		this.toggleChange();
	}
	
	
}

Tab.prototype.change=function(){
	var _this=this;
	var timer=null;
	this.aBtn.on(this.setting.event,function(){
		var This=this;
		if ( $(_this.aCon[$(This).attr("index")]).attr("show")==0)
		{
			if (_this.setting.event=="mouseover")
			{
				timer=setTimeout(function(){
					_this.TotalHide();
					_this.show($(This).attr("index"),_this.setting.way);
				},500)
			}else{
				_this.TotalHide();
				_this.show($(This).attr("index"),_this.setting.way);
			}
		}
	});

	this.aBtn.on("mouseout",function(){
		if (timer)
		{
			clearTimeout(timer);
		}
	});
}


Tab.prototype.toggleChange=function(){
	var _this=this;
	this.aBtn.on(this.setting.event,function(){
		
		if ( $(_this.aCon[$(this).attr("index")]).attr("show")==0)
		{
			_this.TotalHide();
			_this.show($(this).attr("index"),_this.setting.way);
		}else if ($(_this.aCon[$(this).attr("index")]).attr("show")==1)
		{
			//alert("a");
			_this.hide($(this).attr("index"),_this.setting.way);
		}
	});

}


Tab.prototype.show=function(index,way){
	this.btnActive(index)
	if (way=="Normal")
	{
		this.Normal(index);
	}else if (way=="fadeIn")
	{
		this.fadeIn(index);
	}else if (way="Down")
	{
		this.Down(index);
	}
}

Tab.prototype.hide=function(index,way){
	if (way=="Normal")
	{
		this.normalHide(index);
	}else if (way=="fadeIn")
	{
		this.fadeOut(index);
	}else if (way="Down")
	{
		this.Up(index);
	}
}

Tab.prototype.btnActive=function(index){
	this.aBtn.removeClass("active");
	$(this.aBtn[index]).addClass("active");
}

Tab.prototype.TotalHide=function(){
	this.aCon.css({"display":"none","opacity":0,"height":0});
	this.aCon.attr({"show":0});
}

Tab.prototype.contHeight=function(index){
	if (!this.setting.size["height"] || this.setting.size["height"]=="auto" || parseInt(this.setting.size["height"])<=100)  //改动最小高度
	{
		return $(this.aCon[index]).find("div").outerHeight();
	}else{
		return parseInt(this.setting.size["height"]);
	}
	
	
}

Tab.prototype.Normal=function(index){
	$(this.aCon[index]).css({"display":"block"});
	var aHeight=$(this.aCon[index]).find("div").outerHeight();
	var oHeight=this.contHeight(index);
	if (oHeight<aHeight)
	{
		$(this.aCon[index]).css("overflow-y","scroll");
	}
	$(this.aCon[index]).css({"height":oHeight,"opacity":1});
	$(this.aCon[index]).attr("show",1);
}
Tab.prototype.normalHide=function(index){
	$(this.aCon[index]).css({"display":"none","height":0,"opacity":0});
	$(this.aCon[index]).attr("show",0);
}

Tab.prototype.fadeIn=function(index){
	$(this.aCon[index]).css({"display":"block"});
	var aHeight=$(this.aCon[index]).find("div").outerHeight();
	var oHeight=this.contHeight(index);
	if (oHeight<aHeight)
	{
		$(this.aCon[index]).css("overflow-y","scroll");
	}
	$(this.aCon[index]).css({"height":oHeight});
	$(this.aCon[index]).animate({"opacity":1},500);
	$(this.aCon[index]).attr("show",1);
}

Tab.prototype.fadeOut=function(index){
	var _this=this;
	$(this.aCon[index]).animate({"opacity":0},500,function(){
		$(_this.aCon[index]).css({"display":"none","height":0});
		$(_this.aCon[index]).attr("show",0);
	});
	
}


Tab.prototype.Down=function(index){
	$(this.aCon[index]).css({"display":"block","opacity":1});
	var aHeight=$(this.aCon[index]).find("div").outerHeight();
	var oHeight=this.contHeight(index);
	if (oHeight<aHeight)
	{
		$(this.aCon[index]).css("overflow-y","scroll");
	}
	$(this.aCon[index]).animate({"height":oHeight},500);
	$(this.aCon[index]).attr("show",1);
}

Tab.prototype.Up=function(index){
	var _this=this;
	$(this.aCon[index]).animate({"height":0},500,function(){
		$(_this.aCon[index]).css({"display":"none","opacity":0});
		$(_this.aCon[index]).attr("show",0);	
	});

}


