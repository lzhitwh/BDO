<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>集群列表</title>
	<!-- 引入css文件 -->
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,css/datatables.css,bdo/css/bdo.css"/>
	<!-- 引入js文件 -->
	<l:script path="jquery.js,bootstrap.js,form.js,datatables.js,loushang-framework.js,ui.js,bdo/cluster.js"/>
	<style type="text/css">
		.menu-container {
			width: 90%;
			margin: auto;
			margin-top: 50px;
		}
	</style>
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
			        <input class="form-control ue-form" type="text" id="clusterName" placeholder='搜索集群名称'/>
			        <div class="input-group-addon ue-form-btn" id="queryCluster">
			        	<span class="fa fa-search"></span>
			        </div>
		        </div>
			    <div class="btn-group pull-right">
					<button id="createCluster" type="button" class="btn ue-btn">
						<span class="fa fa-plus"></span> 新建集群
					</button>
					<button id="submitTask" type="button" class="btn ue-btn">
						<span class="fa fa-step-forward"></span> 同步集群
					</button>
					<button id="batchDel" type="button" class="btn ue-btn">
						<span class="fa fa-trash"></span> 删除
					</button>
				</div>
			</form>
			<table id="clusterList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="5%" data-field="clusterId" data-render="renderCheckbox" data-sortable=false>
							<input type="checkbox" id="selectAll" onchange="selectAll(this,'checkbox')" />
						</th>
						<th width="10%" data-field="clusterName">集群名称</th>
						<th width="10%" data-field="clientName">执行用户</th>
						<th width="20%" data-field="jobtracker">JobTracker</th>
						<th width="25%" data-field="nameNode">NameNode</th>
						<th width="20%" data-field="oozieUrl">OozieUrl</th>
						<th width="10%" data-field="clusterId" data-render="rendBtn" data-sortable=false>操作</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>
</body>
</html>
