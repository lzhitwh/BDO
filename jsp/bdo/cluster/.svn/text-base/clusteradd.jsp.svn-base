<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
<head>
	<title>任务</title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,css/validform.css,bdo/css/bdo.css"/>
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
	<l:script path="jquery.js,jquery.form.js,bootstrap.js,form.js,datatables.js,ui.js,knockout.js"/>
</head>

<body>
	<div class="ue-container">
		<form class="form-horizontal" id="clusterForm" onsubmit="return false">
		   
		   <!-- 集群ID设置 --> 
		   <div class="form-group">
		      <label class="col-xs-3 col-md-3 text-right" for="clusterId">集群ID<span class="required">*</span></label>
		      <div class="col-xs-8 col-md-8">
		         <input id="clusterId" name="clusterId" class="form-control ue-form Validform_input" type="text" value="${object.clusterId}">
		      </div>
		   </div>
		    
		   <!-- 集群名称设置 --> 
		   <div class="form-group">
		      <label class="col-xs-3 col-md-3 text-right" for="clusterName">集群名称<span class="required">*</span></label>
		      <div class="col-xs-8 col-md-8">
		         <input autofocus="autofocus" id="clusterName" name="clusterName" class="form-control ue-form Validform_input" type="text" datatype="nameCheck" nullmsg="名称不能为空,长度不超过60字符" value="${object.clusterName}">
		      	 <span class="Validform_checktip Validform_span"></span>
		      </div>
		   </div>
		   
		   <!-- 设置运行用户 -->
		   <div class="form-group">
		      <label class="col-xs-3 col-md-3 text-right" for="clientName">执行用户</label>
		      <div class="col-xs-8 col-md-8">
		         <input id="clientName" name="clientName" class="form-control ue-form Validform_input" type="text" datatype="inputCheck" nullmsg="执行用户不能为空,长度不超过60字符" value="${object.clientName}">
		      	 <span class="Validform_checktip Validform_span"></span>
		      </div>
		   </div>
		   
		   <!-- 设置jobTracker -->
		   <div class="form-group">
		      <label class="col-xs-3 col-md-3 text-right" for="jobTracker">JobTracker</label>
		      <div class="col-xs-8 col-md-8">
		         <input id="jobtracker" name="jobtracker" class="form-control ue-form Validform_input" type="text" placeholder="10.110.18.75:8050" datatype="*1-60" nullmsg="JobTracker不能为空" value="${object.jobtracker}">
		      	 <span class="Validform_checktip Validform_span"></span>
		      </div>
		   </div>
		   
		   <!-- 设置nameNode -->
		   <div class="form-group">
		      <label class="col-xs-3 col-md-3 text-right" for="nameNode">NameNode</label>
		      <div class="col-xs-8 col-md-8">
		         <input id="nameNode" name="nameNode" class="form-control ue-form Validform_input" type="text" placeholder="hdfs://10.110.18.74:8020" datatype="*1-60" nullmsg="NameNode不能为空" value="${object.nameNode}">
		      	 <span class="Validform_checktip Validform_span"></span>
		      </div>
		   </div>
		   
		   <!-- 设置oozie Url -->
		   <div class="form-group">
		      <label class="col-xs-3 col-md-3 text-right" for="oozieUrl">OozieUrl</label>
		      <div class="col-xs-8 col-md-8">
		         <input id="oozieUrl" name="oozieUrl" class="form-control ue-form Validform_input" type="text" placeholder="http://10.110.18.74:11000/oozie" datatype="*1-60" nullmsg="OozieUrl不能为空" value="${object.oozieUrl}">
		      	 <span class="Validform_checktip Validform_span"></span>
		      </div>
		   </div>
		 
		   <div class="form-group">
		      <label class="col-xs-3 col-md-3  text-right"></label>
		      <div class="col-xs-8 col-md-8">
		      	  <button id="saveCluster" type="button" class="btn ue-btn-primary">保存</button>
		      	  <button id="cancelCluster" type="button" class="btn ue-btn">取消</button>
		      </div>
		   </div>
		</form>
	</div>
</body>

<script type="text/javascript">
var context = "<l:assetcontext/>";
var status = "${param.status}";

$(function(){
	
	$("#clusterId").parents(".form-group").hide();
	var clusterName = $("#clusterName").val();

	// 校验
	$("#clusterForm").uValidform({
	    btnSubmit:"#saveCluster",
	    datatype:{ 
	    	"nameCheck":nameCheck,
	        "inputCheck": inputCheck,
	    },
	    callback:function(form){
	        $.dialog({
	            type: 'confirm',
	            content: '您确定要提交集群吗？',
	            ok: function () {
	            	saveCluster();
	            },
	            cancel: function () {}
	        });
	    }
	});
	
	function inputCheck(gets, obj, curform, regxp) {
		if(gets == null || gets == "") {
			return false;
		}
		if(gets.length > 60) {
		    obj.attr("errormsg","不能超过60字符");
			return false;
		}
//		if(!gets.match(/^\w+$/)) {
		if(!gets.match(/^[A-Za-z0-9()&_-]+$/)){
		    obj.attr("errormsg", "请填写字母、数字,下划线或横线");
		    return false;
		}
	}
	
	function nameCheck(gets, obj, curform, regxp){
		var cluster=null;
		$.ajax({
			"url": context+"/service/cluster/getClusterMenu",							 
			"type": "POST",
			"dataType" : "json",
			async: false,

			"success": function(data){
				cluster = data.clusterList;				  
			}
		});
		if(cluster!=null){
			for(var i=0; i<cluster.length; i++){                      
				if(cluster[i].clusterName==gets&&cluster[i].clusterName!=clusterName){
					obj.attr("errormsg","集群名称已经被注册");
					return false;
	             }
	        }
		}
        var status = inputCheck(gets, obj, curform, regxp);
        return status;
	}

	// 取消按钮
	$("#cancelCluster").click(function(){
		cancelCluster();
	});
	// 上传按钮
	initUpload();
})

// 保存
function saveCluster() {
	
	if(status == "add") {
		url = context + "/service/cluster/addCluster";
	}else{
		var url = context + "/service/cluster/updateClusterInfo";
	}
	
	$("#clusterForm").ajaxSubmit({
        type: "post",
        url: url,
        error:function(data){
            alert("error："+data);  
        },
        success:function(data){
        	window.location.href = context + "/service/cluster/clusterConf";
        }
    });
	return false;
}

// 取消
function cancelCluster() {
	window.location.href = context + "/service/cluster/clusterConf";
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
	        {title: "XML files", extensions: "xml"}
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
	        }
	    }
	});
	uploader.init();
}
</script>
</html>