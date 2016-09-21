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

var ua = navigator.userAgent.toLowerCase();
var windowParam,widthCut,heightCut;
if(ua.indexOf("chrome") != -1){//调整表单设计器页面在谷歌浏览器中的大小
	widthCut = 15;
	heightCut = 65;
}else{
	widthCut = 10;
	heightCut = 50;
}
windowParam=' left=0,top=0,width='+ (screen.availWidth - widthCut) +',height='+ (screen.availHeight-heightCut) +',scrollbars=no,resizable=yes,toolbar=no';

$(function() {
	// 初始化表格
	initTable();
	
	$("#queryTask").on("click",function(){
		var taskName=$("#taskName").val();
		searchTaskName(taskName);
	})
	
	// 导入任务
	$("#import").on("click", function() {
		forAdd();
	})
	// 新增任务
	$("#create").on("click", function() {
		create();
	})
	// 提交任务
	$("#submitTask").on("click", function() {
		submitTask();
	})
	// 运行任务
	$("#run").on("click", function() {
		run();
	})
	$("#batchDel").on("click", function() {
		del();
	})
})

// 初始化表格
function initTable() {
	var options = {
			ordering: true
	};
	
	var url = context + "/service/task/data";
	grid = new L.FlexGrid("taskList",url);
	grid.init(options);
}

// 导入任务
function forAdd() {
	window.location.href = context+"/service/task/forAdd?status=add";
}

// 新增任务
function create() {
	var url = context + "/jsp/bdo/procdef/html/cfdesigner.jsp";
	window.open(url,"BDO设计工具",windowParam);
}

// 提交任务
function submitTask(id) {
	var idArr = getSelectRecords();
	if(id) {
		idArr.push(id);
	}
	
	if(idArr.length < 1) {
		alert("请选择要提交的任务！");
		return false;
	}
	
	var path = context+"/service/task/submitTask/"+idArr.join(",");
	
	$.ajax({
		url: context+"/service/task/submitTask/"+idArr.join(","),
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

// 运行任务
function run(id) {
	var idArr = getSelectRecords();
	if(id) {
		idArr.push(id);
	}
	
	if(idArr.length < 1) {
		alert("请选择要运行的任务！");
		return false;
	}
	
	$.ajax({
		url: context+"/service/task/run/"+idArr.join(","),
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

// 删除任务
function del(id) {
	var idArr = getSelectRecords();
	var selecteds = $(":checkbox[name=checkbox]:checked").length;
	var allTask = $(":checkbox[name=checkbox]").length;
	if(id) {
		idArr.push(id);
	}
	
	if(idArr.length < 1) {
		alert("请选择要删除的任务！");
		return false;
	}
	
	$.dialog({
		type: "confirm",
		content: "确认删除选中记录?",
	    autofocus: true,
		ok: function() {
				$.ajax({
					url: context+"/service/task/batchDel/"+idArr.join(","),
					async: false,
					success: function(data) {
						sticky("执行成功！");
						// 刷新表格
						grid.reload();
						if(selecteds==allTask){
							$("#selectAll").attr("checked",false);
						}
					},
					error: function(msg) {
						alert(msg.responseText);
					}
				});
			},
		cancel: function(){}
	});
}

// ID列
function renderId(data, type, full) {
	return "<a href=\"javascript:taskDetail('"+data+"')\">"+data+"</a>"
}

// 复选框
function renderCheckbox(data, type, full) {
	return '<input type="checkbox" value="' + data + '" id="checkbox" name="checkbox"/>';
}

// 操作列
function rendBtn(data,type,full) {
	var delBtn = "<a href=\"javascript:del('"+data+"')\">删除</a>";
	var editBtn = "<a href=\"javascript:taskDetail('"+data+"')\">编辑</a>";
	
	return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
}

// 任务明细
function taskDetail(taskId) {
	window.location.href = context + "/service/task/forUpdate/" + taskId;
}

// 获取被选中的记录，返回值为ID数组
function getSelectRecords() {
	var ids = [];
	
	var selecteds = $(":checkbox[name=checkbox]:checked");
	for(var i = 0 ; i < selecteds.length ; i++) {
		ids.push(selecteds[i].value);
	}
	
	return ids
}

function searchTaskName(taskName){
	
	if((taskName==null)||(taskName=="")||(taskName=="undefine")){
		alert("请输入查询条件");
	}else{
		 var url = context + "/service/task/searchTask";
		 var param={"taskName":taskName};
		 url=encodeURI(url,"utf-8"); 
	     grid.reload(url,param);
	 }
}