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
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/dialog.css"/>

<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/gatewayformproperty.css" />

<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/property/gatewayformproperty.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
    <div id="tabContainer">
         <div id="divGatewayformPropertyHead" class="headArea"><span>表单属性</span>
             <div class="shrinkDiv"></div>
         </div>
         <div id="divGatewayFormPropertyBody" class="propertyBodyArea">
             <div id="branchCondiId" class="gatwayCon"><label>分支条件:</label>
            <input type="text" readonly="readonly"/><input type="button" />
             </div>
         </div>
    </div>
</body>
</html>