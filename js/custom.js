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
})

