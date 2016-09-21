(function($) {
	if (typeof CFlow == "undefined") {
		CFlow = {};
	}
	CFlow.setProcDefUniqueId = function(procDefUniqueId){
		CFlow.procDefUniqueId = procDefUniqueId;
		WFlow.procDefUniqueId = procDefUniqueId;
	}
	CFlow.getProcDefUniqueId = function(){
		return CFlow.procDefUniqueId;
	}
	CFlow.getProcDefId = function(){
		return WFlow.getProcInfo().id;
	}
	CFlow.getProcDefName = function(){
		return WFlow.getProcInfo().name;
	}
	CFlow.getProcType = function(){
		return WFlow.getProcInfo().procType;
	}
	CFlow.getPluginType = function(){
		return WFlow.getProcInfo().pluginType;
	}
	CFlow.getProcSpec = function(){
		return WFlow.getProcInfo().procSpec;
	}
	CFlow.getProcModel = function(){
		return WFlow.getModelContent();
	}
	CFlow.getCFormModelContent = function(){
		return CFModel.generateModelContent(); // -->cfd.model.js
	}
	CFlow.setSelectedId = function(selectedId){
		CFlow.selectedId = selectedId;
	}
	CFlow.getSelectedId = function(){
		return CFlow.selectedId;
	}
	CFlow.releaseModel = function(procDefUniqueIds){
		$.ajax({
			type : "POST",
			async : false,
			url : WFlow.fullWebPath + "/command/dispatcher/"
				+ "org.loushang.cform.procdef.html.cmd.ProcDefDispatcherCmd/"
				+ "release",
			data : {"procDefUniqueIds" : procDefUniqueIds},
			dataType:"json",
			success:function(data){
				if(data && data.success){
					showDialog("alert","发布成功", "提示信息", 300);
				}else{
					showDialog("alert",data.errMessage, "提示信息", 300);
				}
			},
			error:function(){
				showDialog("alert","流程发布出错", "提示信息", 300);
			}
		});
	}
	CFlow.deleteModel = function(procDefUniqueIds){
		$.ajax({
			type : "POST",
			async : false,
			url : WFlow.fullWebPath + "/command/dispatcher/"
				+ "org.loushang.cform.procdef.html.cmd.ProcDefDispatcherCmd/"
				+ "delete",
			data : {"procDefUniqueIds" : procDefUniqueIds},
			dataType:"json",
			success:function(data){
				if(data && data.success){
					showDialog("alert","删除成功", "提示信息", 300);
				}else{
					showDialog("alert",data.errMessage, "提示信息", 300);
				}
			},
			error:function(){
				showDialog("alert","流程删除出错", "提示信息", 300);
			}
		});
	}
	
	CFlow.validate = function (){
		var result=new Array();
		var activities=CFProcess.activities.childList;
		for(var n in activities){
			var activity=activities[n];
			if(activity.form){
				
			}else{
				result.push("环节:"+activity.name+"未定义表单");
			}
		}
		return result;
	}
	
	CFlow.getDesignerEditor = function() {
		return $(".cfdCore-Area").data("designerEditor");
	}
	CFlow.setDesignerEditor = function(element) {
		$(".cfdCore-Area").data("designerEditor", element);
	}
})(jQuery);