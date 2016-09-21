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
<title>Insert title here</title>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/property/gateway/gatewayproperty.js"></script>
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/css/wfdproperty.css" />
</head>
<body >
	<div id="gateWayDiv" class="propertyArea">
		<div id="divGatewayPropertyHead" class="headArea wfdFirstHeadArea"><span>环节属性</span><div class="shrinkDiv"></div></div>
		<div id="divGatewayPropertyBody" class="wfPropertyBodyArea">
			<div id="gatewayName" class="wfdProp"><label>名称:</label><input type="text"/></div>
			<div id="gatewayId" class="wfdProp"><label>ID:</label><input type="text" readonly="readonly"/></div>
			<div id="gwSplitType" class="wfdProp chk"><input type="checkbox" id="gwSplitChk"><label for="gwSplitChk">并行分支</label></div>
			<div id="gwJoinType" class="wfdProp chk"><input type="checkbox" id="gwJoinChk"><label for="gwJoinChk">并行汇聚</label></div>
			<div id="forkActivity" class="wfdProp"><label>关联的分支环节:</label><select></select></div>
			<div id="gwJoinRule" class="wfdProp wfdActProp1"><label>复杂汇聚:</label><select></select></div>
			<div id="gateWayBranch" class="wfdProp wfdActProp1 wfdPropWithButton gateWay"><label>分支条件:</label>
				<input type="text" readonly="readonly" class="formTxtDiv" /><input type="button" class="formBtnDiv"/>
 			</div>
		</div>
	</div>
</body>
</html>