<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>实例信息</title>
	<!-- 引入css文件 -->
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,css/datatables.css,bdo/css/bdo.css"/>
	<style type="text/css">
		.menu-container {
			width: 90%;
			margin: auto;
			margin-top: 50px;
		}
	</style>
	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
    <!-- 引入js文件 -->
	<l:script path="jquery.js,bootstrap.js,form.js,datatables.js,loushang-framework.js,ui.js,bdo/instance.js,arttemplate.js"/>
	<script type="text/javascript">
		var context = "<l:assetcontext/>";
	</script>
</head>
<body>
<div class="wrap-div">
	<div class="menu-container">
		<div class="row">
			<form class="form-inline" onsubmit="return false;">	
		
				<div class="input-group">
					<label>集群</label>
					<select class="ue-form" id="clusterId" name="clusterId"></select>					
	   			</div>
										
				<div class="input-group">
				    <input class="form-control ue-form" type="text" id="appName" placeholder='搜索实例名称'/>
				    <div class="input-group-addon ue-form-btn" id="queryApp">
				      	<span class="fa fa-search"></span>
				    </div>
		        </div>
			    <div class="btn-group pull-right">
			    	<button id="run" type="button" class="btn ue-btn">
						<span class="fa fa-play"></span> 运行
					</button>
					<button id="pauseInstance" type="button" class="btn ue-btn">
						<span class="fa fa-pause"></span> 暂停
					</button>
					<button id="resume" type="button" class="btn ue-btn">
						<span class="fa fa-play"></span> 恢复
					</button>
					<button id="endInstance" type="button" class="btn ue-btn">
						<span class="fa fa-stop"></span> 终止
					</button>
					<button id="restart" type="button" class="btn ue-btn">
						<span class="fa fa-refresh"></span> 重启
					</button>
				</div>
			</form>
			<table id="jobList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="5%" data-field="jobId" data-render="renderCheckbox" data-sortable=false>
							<input type="checkbox" id="selectAll" onchange="selectAll(this,'checkbox')" />
						</th>
						<th width="25%" data-field="jobName" data-sortable=false>实例名称</th>
						<th width="20%" data-field="jobUser" data-sortable=false>执行用户</th>
						<th width="15%" data-field="jobStatus" data-sortable=false>状态</th>
						<th width="25%" data-field="jobCreated" data-sortable=false>创建时间</th>
						<th width="10%" data-field="jobId" data-render="rendBtn" data-sortable=false>操作</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>
</body>

<script type="text/javascript">
$(function(){
	var $sel = $('#clusterId');
	$("#clusterId").on("change",function(){
		 var url = context + "/service/instance/data";
		 var clusterId =  $sel.val();
		 var param={"clusterId":clusterId};
		 url=encodeURI(url,"utf-8"); 
		 grid.reload(url,param);
	});
});

</script>
</html>
