$(function(){
	var oA=new Accor();
	oA.init("accor1",{
		event:"click",
		height:"content",
		toggle:false,
		open:1
		//sort:true
	});

	var oTab=new Tab();
	oTab.init("tab1",{
		active:0,
		way:"Down", //fadeIn
		event:"mouseover",
		toggle:false,
		size:{width:400,height:160}
	})

	var MyData={
		"Cantones":100,
		"Chinese":95,
		"English":73,
		"HTML5_CSS3":82, //82
		"JS_JQuery":75,  //75
		"AngularJs_NodeJs":48,  //48
		"Server_Language":39,       //39
		"Window_SQL Server":65,  //65
		"Photoshop":79,   //79
		"Dreamwear_Editplus":88,  //88
		"Apache_MySql":73          //73
	}
	 progress(MyData);
})

function progress(obj){
	var aProg=$(".progress");
	var width=$(aProg[0]).width();
	aProg.each(function(i,elem){
		//var name=$(elem).siblings("span").html();
		//$(elem).attr("name",name);
		
		$(elem).find("span").animate({"width":width*parseInt(obj[$(elem).attr("name")])/100})
	})
			
	
}

