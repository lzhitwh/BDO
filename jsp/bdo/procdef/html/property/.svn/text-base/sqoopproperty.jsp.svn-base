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
<title>sqoop属性设置页面</title>
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/css/wfdcore.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/activityformproperty.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/dialog.css"/>

<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/property/sqoopproperty.js"></script>
<script type="text/javascript">
	if( typeof WFlow == "undefined" )
		WFlow = {};
	WFlow.webPath = '<%=webPath %>';
	WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
<div id="tabContainer">
    <div id="divActivityformPropertyHead" class="headArea">
        <span>sqoop属性</span>
        <div class="shrinkDiv"></div>
    </div>
    <div id="divActivityFormPropertyBody" class="propertyBodyArea">
        <div style="clear: both"></div>
        <div id="con1" class="con">
            <div id="formName" class="con1">
                <button id="configuration" type="button"">configuration</button>
            </div>
        </div>
     </div>
</div>
</body>
</html>