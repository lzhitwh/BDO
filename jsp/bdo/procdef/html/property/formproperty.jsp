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
<title>节点属性</title>
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/formproperty.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/dialog.css"/>


<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/property/formproperty.js"></script>
<script type="text/javascript">
    if(typeof WFlow == "undefined") 
        WFlow = {};
    WFlow.webPath = '<%=webPath %>';
    WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
    <div id="divProcessformPropertyHead" class="headArea"><span>节点属性</span><div class="shrinkDiv"></div></div>
    <div id="divProcessFormPropertyBody" class="propertyBodyArea">
      <div style="clear: both">
      </div>
      <div id="procCon1" class="procCon">
          <div id="actionName" class="procCon1"><label>名称:</label><span></span>
          <input type="text"/></div>
          <div id="nameNode" class="procCon1"><label>nameNode:</label><span></span>
          <input type="text"/></div>
          <div id="jobTracker" class="procCon1"><label>jobTracker:</label><span></span>
          <input type="text"/></div>
      </div>
    </div>
</body>
</html>