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
	
	// 新建集群
	$("#createCluster").on("click", function() {
		forAdd();
	})
	$("#batchDel").on("click", function() {
		del();
	})
	$("#queryCluster").on("click",function(){
		searchCluster();
	})
})

// 初始化表格
function initTable() {
	var options = {
			ordering: true
	};
	
	var url = context + "/service/cluster/getClusterInfo";
	grid = new L.FlexGrid("clusterList",url);
	grid.init(options);
}

// 创建集群
function forAdd() {
	window.location.href = context+"/service/cluster/setCluster?status=add";
}

// 新增任务
function create() {
	var url = context + "/jsp/bdo/procdef/html/cfdesigner.jsp";
	window.open(url,"BDO设计工具",windowParam);
}

//删除集群
function del(id) {
	var idArr = getSelectRecords();
	var selecteds = $(":checkbox[name=checkbox]:checked").length;
	var allTask = $(":checkbox[name=checkbox]").length;
	if(id) {
		idArr.push(id);
	}
	
	if(idArr.length < 1) {
		alert("请选择要删除的记录！");
		return false;
	}
	
	$.dialog({
		type: "confirm",
		content: "确认删除选中记录?",
	    autofocus: true,
		ok: function() {
				$.ajax({
					url: context+"/service/cluster/delCluster/"+idArr.join(","),
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

// 复选框
function renderCheckbox(data, type, full) {
	return '<input type="checkbox" value="' + data + '" id="checkbox" name="checkbox"/>';
}

// 操作列
function rendBtn(data,type,full) {
	var delBtn = "<a href=\"javascript:del('"+data+"')\">删除</a>";
	var editBtn = "<a href=\"javascript:clusterDetail('"+data+"')\">编辑</a>";
	
	return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
}

// 任务明细
function clusterDetail(taskId) {
	window.location.href = context + "/service/cluster/forUpdate/" + taskId;
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

function searchCluster(){
	var clusterName = $("#clusterName").val();
	if((clusterName==null)||(clusterName=="undefined")||(clusterName=="")){
		alert("请输入查询条件");
	}else{
		 var url = context + "/service/cluster/getClusterInfo";
		 var param={"clusterName":clusterName};
		 url=encodeURI(url,"utf-8"); 
	     grid.reload(url,param);
	}
}