<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
String webPath = request.getContextPath();
StringBuffer sb = new StringBuffer();
sb.append(request.getScheme());
sb.append("://");
sb.append(request.getServerName());
sb.append(":");
sb.append(request.getServerPort());
sb.append(webPath);

String fullWebPath = sb.toString();
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="apple-mobile-web-app-capable" content="yes" />
<title>设置组织类型</title>

<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/css/dialog.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/css/participantForm.css"/>

<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/property/task/participantrule/commontype.js"></script>

<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>

</head>
<body>
	<div id="typePage">
		<div class="tableHeadDiv"></div>
		<div id="typeTable" class="divTable">
			<table>
				<thead>
					<tr>
						<th id="thTypeId">类型</th>
						<th id="thTypeName">类型名称</th>
						<th id="typeAdd">操作</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
		<div id="typeBtnArea" class="buttonArea">
			<input id="typeConfirm" class="confirm" type="button" value="确定">
			<input id="typeCancel" class="cancel" type="button" value="取消">
		</div>
	</div>
</body>
</html>