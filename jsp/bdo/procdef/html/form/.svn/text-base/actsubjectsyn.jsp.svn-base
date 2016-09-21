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
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/dialog.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/actsubjectsyn.css" />

<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/form/actsubjectsyn.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
    <div class="txtTitle"><label>流程上设置的标题和域的对应关系:</label>
        <div id="synSubject"></div></div>
    <div class="synHead">
        <table>
            <thead>
                <tr>
                    <th class="actTh"><input type="checkbox">环节名称</th>
                    <th class="conTh">标题和域的对应关系</th>
                </tr>
            </thead>
        </table>
        <div class="context">
            <table>
                <tbody id="actContext"></tbody>
            </table>
        </div>
    </div>
    <div class="buttonArea">
        <input id="confirm" class="confirm" type="button" value="确定">
        <input id="cancel" class="cancel" type="button" value="取消"></div>
</body>
</html>