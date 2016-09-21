<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>任务列表</title>
	<!-- 引入css文件 -->
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,css/datatables.css,bdo/css/bdo.css"/>
	<style type="text/css">
		.menu-container {
			width: 90%;
			margin: auto;
			margin-top: 50px;
		}
	</style>
    <!-- 引入js文件 -->
	<l:script path="jquery.js,bootstrap.js,form.js,datatables.js,loushang-framework.js,ui.js,bdo/task.js"/>
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
			        <input class="form-control ue-form" type="text" id="taskName" placeholder='搜索任务名称'/>
			        <div class="input-group-addon ue-form-btn" id="queryTask">
			        	<span class="fa fa-search"></span>
			        </div>
		        </div>
			    <div class="btn-group pull-right">
					<button id="import" type="button" class="btn ue-btn">
						<span class="fa fa-download"></span> 导入
					</button>
					<button id="create" type="button" class="btn ue-btn">
						<span class="fa fa-plus"></span> 新增
					</button>
					<button id="submitTask" type="button" class="btn ue-btn">
						<span class="fa fa-step-forward"></span> 提交
					</button>
					<button id="run" type="button" class="btn ue-btn">
						<span class="fa fa-play"></span> 运行
					</button>
					<button id="batchDel" type="button" class="btn ue-btn">
						<span class="fa fa-trash"></span> 删除
					</button>
				</div>
			</form>
			<table id="taskList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="5%" data-field="taskId" data-render="renderCheckbox" data-sortable=false>
							<input type="checkbox" id="selectAll" onchange="selectAll(this,'checkbox')" />
						</th>
						<th width="20%" data-field="taskName">任务名称</th>
						<th width="10%" data-field="taskStyle">任务类型</th>
						<th width="15%" data-field="clusterName">执行集群</th>
						<th width="15%" data-field="createTime">创建时间</th>
						<th width="15%" data-field="updateTime">修改时间</th>
						<th width="10%" data-field="taskId" data-render="rendBtn" data-sortable=false>操作</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>
</body>
</html>
