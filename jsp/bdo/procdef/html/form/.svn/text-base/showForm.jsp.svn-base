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
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/smartpaginator.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/form/showform.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/dialog.css"/>

<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/showform.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/smartpaginator.css" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
<div>
    <div id="divSearch" class="searchArea"><label>表单名称:</label><input id="searchValue" type="text"><input id="search" type="button" value="查询"></div>
    <div id="divTable" class="divTable">
    <table cellspacing="0" cellpadding="2px">
        <thead>
            <tr>
                <th>表单定义ID</th>
                <th>表单名称</th>
            </tr>
        </thead>
        <tbody>
            <tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>
        </tbody>
    </table>
    </div>
    <div id="bottom"></div>
    <div class="button"><input id="confirm" class="confirm" type="button" value="确定"><input id="cancel" class="cancel" type="button" value="取消"></div>
</div>
</body>
</html>