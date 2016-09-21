var grid;
//提示框
function sticky(msg, style, position) {
	var type = style ? style : "success";
	var place = position ? position : "top";
	$.sticky(
		    msg,
		    {
		        autoclose : 2000, 
		        position : place,
		        style : type
		    }
	);
}

function alert(msg) {
	$.dialog({
		type: "alert",
		content: msg
	});
}

$(function() {
	// 初始化表格
	initTable();
	//运行实例，主要用于启动提交任务
	$("#run").on("click", function() {
		runInstance();
	})
	// 暂停实例
	$("#pauseInstance").on("click", function() {
		pauseInstance();
	})
	// 恢复运行
	$("#resume").on("click", function() {
		resume();
	})
	// 恢复运行
	$("#endInstance").on("click", function() {
		endInstance();
	})
	// 重新运行
	$("#restart").on("click", function() {
		restart();
	})
	//查找 
	$("#queryApp").on("click",function(){
		searchApp();
	})
})

// 初始化表格
function initTable() {
	
	var $sel = $('#clusterId');
	
	$.ajax({
		"url": context+"/service/cluster/getClusterMenu",							 
		"type": "POST",
		"dataType" : "json",
		async: false,
		
		"success": function(data){
			var temp = template("option", {
				options : data.clusterList
			});
			var cluster= data.clusterList;				  
		    for(var i=0; i<cluster.length; i++){                      
				if(cluster[i].clusterId!=null){
					var $option = $("<option></option>");
					$option.attr("Value", cluster[i].clusterId);
					$option.text(cluster[i].clusterName);
					$sel.append($option);
		        }
			}
		}
	});
	
	var options = {
			ordering: true
	};
	
	var clusterId = $sel.val();
	var param={"clusterId":clusterId};
	
	var url = context + "/service/instance/data";
	grid = new L.FlexGrid("jobList",url);
	grid.init(options);
	
	url=encodeURI(url,"utf-8"); 
	grid.reload(url,param);
}

//运行实例，主要用于启动提交任务
function runInstance(id) {
	var ids = [];
	
	var selecteds = $(":checkbox[name=checkbox]:checked");
	for(var i = 0 ; i < selecteds.length ; i++) {
		ids.push(selecteds[i].value);
	}
	if(id) {
		ids.push(id);
	}
	if(ids.length < 1) {
		alert("请选择要运行的实例！");
		return false;
	}
	
	$.ajax({
		url: context+"/service/instance/runInstance/"+ids.join(","),
		async: false,
		success: function(data) {
			sticky("执行成功！");
			// 刷新表格
			grid.reload();
		},
		error: function(msg) {
			alert(msg.responseText);
		}
	});
}

// 重新运行
function restart(id, fromFaileAction) {
	fromFaileAction = fromFaileAction||true;
	
	var ids = [];
	
	var selecteds = $(":checkbox[name=checkbox]:checked");
	for(var i = 0 ; i < selecteds.length ; i++) {
		ids.push(selecteds[i].value);
	}
	if(id) {
		ids.push(id);
	}
	if(ids.length < 1) {
		alert("请选择要重新运行的实例！");
		return false;
	}
	
	$.ajax({
		url: context+"/service/instance/restart/"+ids.join(",") + "/" + fromFaileAction,
		async: false,
		success: function(data) {
			sticky("执行成功！");
			// 刷新表格
			grid.reload();
		},
		error: function(msg) {
			alert(msg.responseText);
		}
	});
}

// 暂停实例
function pauseInstance(id) {
	var ids = [];
	
	var selecteds = $(":checkbox[name=checkbox]:checked");
	for(var i = 0 ; i < selecteds.length ; i++) {
		ids.push(selecteds[i].value);
	}
	if(id) {
		ids.push(id);
	}
	if(ids.length < 1) {
		alert("请选择要暂停的实例！");
		return false;
	}
	
	$.ajax({
		url: context+"/service/instance/pauseInstance/"+ids.join(","),
		async: false,
		success: function(data) {
			sticky("执行成功！");
			// 刷新表格
			grid.reload();
		},
		error: function(msg) {
			alert(msg.responseText);
		}
	});
}
// 恢复运行
function resume(id) {
	var ids = [];
	
	var selecteds = $(":checkbox[name=checkbox]:checked");
	for(var i = 0 ; i < selecteds.length ; i++) {
		ids.push(selecteds[i].value);
	}
	if(id) {
		ids.push(id);
	}
	if(ids.length < 1) {
		alert("请选择要恢复的实例！");
		return false;
	}
	if(ids.length > 1) {
		alert("只能恢复一条实例！");
		return false;
	}
	
	$.ajax({
		url: context+"/service/instance/resume/"+ids.join(","),
		async: false,
		success: function(data) {
			sticky("执行成功！");
			// 刷新表格
			grid.reload();
		},
		error: function(msg) {
			alert(msg.responseText);
		}
	});
}

// 终止实例
function endInstance(id) {
	var ids = [];
	
	var selecteds = $(":checkbox[name=checkbox]:checked");
	for(var i = 0 ; i < selecteds.length ; i++) {
		ids.push(selecteds[i].value);
	}
	if(id) {
		ids.push(id);
	}
	if(ids.length < 1) {
		alert("请选择要终止的实例！");
		return false;
	}
	
	$.dialog({
		type: "confirm",
		content: "确认终止选中记录?",
	    autofocus: true,
		ok: function() {
				$.ajax({
					url: context+"/service/instance/endInstance/"+ids.join(","),
					async: false,
					success: function(data) {
						sticky("执行成功！");
						// 刷新表格
						grid.reload();
					},
					error: function(msg) {
						alert(msg.responseText);
					}
				});
			},
		cancel: function(){}
	});
}

function searchApp(){
	var appName = $("#appName").val();
	var clusterId = $("#clusterId").val();
	if((appName==null)||(appName=="")||(appName)=="undefined"){
		alert("请输出查询条件");
	}else{
		 var url = context + "/service/instance/data";
		 var param={
				 "clusterId" : clusterId,
				 "jobName" : appName
				 };
		 url=encodeURI(url,"utf-8"); 
	     grid.reload(url,param);
	 }
}

function renderCheckbox(data, type, full) {
	return '<input type="checkbox" value="' + data + '" id="checkbox" name="checkbox"/>';
}

// 操作列
function rendBtn(data,type,full) {
	var logBtn = "<a href=\"javascript:checkLog('"+data+"')\">日志</a>";
	  
	return logBtn;
}

// 查看日志
function checkLog(id) {
	$.ajax({
		url: context + "/service/instance/checkLog/" + id,
		async: false,
		success: function(data) {
			alert(data);
		},
		error: function(msg) {
			alert(msg.responseText);
		}
	});
}
