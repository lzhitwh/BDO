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
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/subjectdef.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/dialog.css"/>



<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/subject/subjectdef.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
 		<div id="divFormPropertyBody" class="propertyBodyArea">
        <div class="mainArea">
        	<div class="addImg1"></div>
           <a id="add">增加一条信息</a>
            <div class="defTable">
            	<table>
            		<thead>
            			<tr>
            			<th style="width:135px;padding-left:10px;">标题名称</th><th style="width:60px;">宽度</th><th style="width:120px;">作为查询条件</th><th style="width:135px;">表单域</th><th style="width:100px;">删除</th>
            			</tr>
            		</thead>
            		<tbody></tbody>
            	</table>
            </div>
        </div>
        <div class="buttonArea"><input id="confirm" class="confirm" type="button" value="确定"><input id="cancel" class="cancel" type="button" value="取消"></div>
        </div>
</body>
</html>