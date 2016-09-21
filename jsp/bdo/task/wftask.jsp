<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
<head>
	<title>任务</title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,css/validform.css,bdo/css/bdo.css,prettify.js"/>
	<l:script path="jquery.js,jquery.form.js,bootstrap.js,form.js,datatables.js,ui.js,knockout.js,arttemplate.js,prettify.js"/>
	
	<style type="text/css">
		.col-xs-8  {
			width: 75%;
		}
		.Validform_input {
			width: 48%;
		}
		.required {
			top: 0;
		}
		textarea.form-control {
			height: 62px;
		}
	</style>
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
</head>
<body>
	<div class="ue-container">
	<form class="form-horizontal" id="taskForm" onsubmit="return false">
		<div class="form-group">
		     <label class="col-xs-3 col-md-3 text-right" for="taskId">任务ID<span class="required">*</span></label>
		     <div class="col-xs-8 col-md-8">
		        <input id="taskId" name="taskId" class="form-control ue-form Validform_input" type="text" value="${object.taskId}">
		     </div>
		</div>
	
	    <div class="form-group">
			<label class="col-xs-3 col-md-3 control-label">选择集群<span class="required">*</span></label>
			<div class="col-xs-8 col-md-8">
				<select class="form-control ue-form Validform_input" id="clusterId" name="clusterId" datatype="*" errormsg="请选择集群!" nullmsg="请选择集群" value="${object.clusterId}"></select>					
				<span class="Validform_checktip Validform_span"></span>
			</div>
	   </div>
	
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="taskName">任务名称<span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input autofocus="autofocus" id="taskName" name="taskName" class="form-control ue-form Validform_input" type="text" datatype="inputCheck" nullmsg="名称不能为空" value="${object.taskName}">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   
	  <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="taskPath">任务路径<span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="taskPath" name="taskPath" class="form-control ue-form Validform_input" type="text" value="${object.taskPath}">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="taskCoordPath">定时文件路径</label>
	      <div class="col-xs-8 col-md-8">
	         <input id="taskCoordPath" name="taskCoordPath" class="form-control ue-form Validform_input" type="text" value="${object.taskCoordPath}">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   
	   <div class="form-group field organ" id="fileUpload">
         <label class="col-xs-3 col-md-3 text-right" for="fileName">上传文件</label>
         <div class="col-xs-8 col-md-8">
           <div class="input-group Validform_input">
             <input id="fileName" name="fileName" readonly="readonly" class="form-control ue-form" type="text">
             <div id="selectFile" class="input-group-addon ue-form-btn select-file">
               <span class="fa fa-upload"></span>
             </div>
           </div> 
         </div>
       </div>
       
       <div class="form-group">
				<label class="col-xs-3 col-md-3 control-label">任务类型<span class="required">*</span></label>
				<div class="col-xs-8 col-md-8">
				<select class="form-control ue-form Validform_input" id="taskStyle" name="taskStyle">
					<option value="wf">非定时任务</option>
					<option value="cron">定时任务</option>
				</select>			
				<span class="Validform_checktip Validform_span"></span>
				</div>
	   </div>
	   
	   <div class="form-group">
        	<label for="date" class="col-sm-3 control-label">开始时间</label>
        	<div class="col-sm-9">
	           	<div class="input-group date" id="startDatetime">
	                 <div id='start-datetime'>
	                 	<input  class="form-control ue-form Validform_input" id="startTime" name="startTime" type="text">
	                 </div>
	                 <span class="input-group-addon ue-form-btn">
	                 	<i class="fa fa-calendar"></i>
	                 </span>
	            </div>
        	</div>
    	</div>
    	
    	<div class="form-group">
        	<label for="date" class="col-sm-3 control-label">结束时间</label>
        	<div class="col-sm-9">
	           	<div class="input-group date" id="endDatetime">
	                 <div id='end-datetime'>
	                 	<input  class="form-control ue-form Validform_input" id="endTime" name="endTime" type="text">
	                 </div>
	                 <span class="input-group-addon ue-form-btn">
	                 	<i class="fa fa-calendar"></i>
	                 </span>
	            </div>
        	</div>
    	</div>
       
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right"></label>
	      <div class="col-xs-8 col-md-8">
	      	  <button id="saveVal" type="button" class="btn ue-btn-primary">保存</button>
	      	  <button id="cancel" type="button" class="btn ue-btn">取消</button>
	      </div>
	   </div>
	</form>
	</div>
</body>

<script type="text/javascript">
var context = "<l:assetcontext/>";
var status = "${param.status}";

$(function(){
	
	$("#taskId").parents(".form-group").hide();
	$("#taskPath").parents(".form-group").hide();
	$("#taskCoordPath").parents(".form-group").hide();
	
	taskStyleSelect();  //检测任务类型。判断时间选择框是否隐藏。
	
	// 校验
	$("#taskForm").uValidform({
	    btnSubmit:"#saveVal",
	    datatype:{ 
	          "inputCheck": inputCheck,
	    },
	    callback:function(form){
	        saveVal();
	    }
	});
	
	function inputCheck(gets, obj, curform, regxp) {
		if(gets == null || gets == "") {
			return false;
		}
		if(gets.length > 32) {
		    obj.attr("errormsg","不能超过60字符");
			return false;
		}
		if(!gets.match(/^\w+$/)) {
		    obj.attr("errormsg", "请填写字母、数字或下划线");
		    return false;
		}
	}

	// 取消按钮
	$("#cancel").click(function(){
		cancel();
	});
	$("#taskStyle").on("change",function(){
		taskStyleSelect();
	});
	
	$('#startDatetime').datetimepicker({
	    container: $('#start-datetime'),
	    language: "zh-CN",
	    autoclose: 1,
	    format: "yyyy-mm-dd hh:ii"
	});
	
	$('#endDatetime').datetimepicker({
	    container: $('#end-datetime'),
	    language: "zh-CN",
	    autoclose: 1,
	    format: "yyyy-mm-dd hh:ii"
	});
	
	// 上传按钮
	initUpload();
})

/**
 * 根据所选任务类型。展现用户需要填写内容。
 */
function taskStyleSelect(){
	var taskStyle = $("#taskStyle").val();
	if(taskStyle=="wf"){				//非定时任务
		$("#startDatetime").parents(".form-group").hide();
		$("#endDatetime").parents(".form-group").hide();
	}else if(taskStyle=="cron"){		//定时任务
		$("#startDatetime").parents(".form-group").show();
		$("#endDatetime").parents(".form-group").show();
	}else{
		
	}
}

// 保存
function saveVal() {
	var url = context + "/service/task/updateTask";
	if(status == "add") {
		url = context + "/service/task/addTask";
	}
	
	$("#taskForm").ajaxSubmit({
        type: "post",
        url: url,
        error:function(data){
            alert("error:"+data);  
        },
        success:function(data){
        	window.location.href = context + "/service/task";
        }
    });
	return false;
}

// 取消
function cancel() {
	window.location.href = context + "/service/task";
}

function initUpload() {
	var url = context + "/service/task/upload";
	var uploader = new plupload.Uploader({
	    // 用来指定上传方式,指定多个上传方式请使用逗号隔开,默认即为此,可不写
	    runtimes: "html5,flash,silverlight,html4",
	    // 点击上传html标签的id,可以是a,button等
	    browse_button: "selectFile",
	    // 服务器端的页面上传地址
	    url : url,
	    // 文件的最大上传大小,不写该参数则上传文件大小无限制
	    max_file_size: "50mb",
	    // 设置多项选择,默认为true,即可多选文件,功能为单选时需将此设为false
	    multi_selection: false,
	    // 上传的文件生成一个唯一的文件名,默认为false,false时上传文件为本身的名字,true时自动生成其他名字
	    unique_names: false,
	    // 可以使用该参数来限制上传文件的类型,大小等,该参数以对象的形式传入
	    filters: [
	        {title: "zip files", extensions: "zip"}
	    ],
	    // 当Plupload初始化完成后触发
	    init: {
	        // 当文件添加到上传队列后触发(up为当前的plupload实例对象,files为一个数组,里面的元素为本次添加到上传队列里的文件对象)
	        FilesAdded: function(up, files) {
	            plupload.each(files, function(file) {
	                //document.getElementById('filelist').value += file.name;
	            	$("#fileName").val(file.name);
	            });
	            uploader.settings.url = url + "?filename=" + encodeURIComponent(files[0].name);
	            //开始上传队列中的文件
	            uploader.start();
	        },
	        // 会在文件上传过程中不断触发,可以用此事件来显示上传进度(up当前的plupload实例对象,file为触发此事件的文件对象)
	        UploadProgress: function(up, file) {
	        },
	        FileUploaded:function(up,file,responseObject){
				var serverData = responseObject.response;
				var data=eval('(' + serverData + ')');
				$("#taskPath").val(data.filePath);			//设置流程文件workflow.xml的路径。
				$("#taskCoordPath").val(data.coordPath);	//设置定时文件coordinator.xml的路径
				if(data.coordPath!=null){
					$("#taskStyle").val("cron");
				}else{
					$("#taskStyle").val("wf");
				}
				taskStyleSelect();
			}
	    }
	});
	var path = uploader.init();
}

$(document).ready(function(){
	var $sel = $('#clusterId');
	
	if(status=="add"){
		$.ajax({
			"url": context+"/service/cluster/getClusterMenu",							 
			"type": "POST",
			"dataType" : "json",
	
			"success": function(data){
				var temp = template("option", {
					options : data.clusterList
				});
				var cluster= data.clusterList;				  
//		        var $sel = $('#clusterId');
		        for(var i=0; i<cluster.length; i++){                      
					if(cluster[i].clusterId!=null){
						var $option = $("<option></option>");
						$option.attr("Value", cluster[i].clusterId);
						$option.text(cluster[i].clusterName);
						$sel.append($option);
					
						if(cluster[i].clusterId=="${object.clusterId}"){ //如果成立，代表是对原有任务的编辑。
							$sel.val(${object.clusterId});
						}	
		             }
		        }
			}
		});
	 }else{
		var $option = $("<option></option>");
		$option.attr("Value","${object.clusterId}");
		$option.text("${object.clusterName}");
		$sel.append($option);
		$sel.attr("Disabled","true");
		$("#fileUpload").hide();
		$('#selectFile').attr("Disabled","true");
		
		if("${object.taskStyle}"=="wf"){
			$('#taskStyle').attr("Value","wf");
			$('#taskStyle').attr("Disabled","true");
			$("#startDatetime").parents(".form-group").hide();
			$("#endDatetime").parents(".form-group").hide();
		}
		if("${object.taskStyle}"=="cron"){
			$("#taskStyle").val("cron");
			$('#startTime').val("${object.startTime}");
			$('#endTime').val("${object.endTime}");
			taskStyleSelect();
		}
	 }
});

</script>
</html>