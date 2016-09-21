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
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/actsyn.css" />

<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/form/actsyn.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
    <div class="txtTitle">
        <div><span>待办操作：</span><div id="procDaiban"></div></div>
        <div><span>已办操作:</span><div id="procYiban"></div></div>
        <div><span>办结操作：</span><div id="procBanjie"></div></div>
    </div>
    <div class="synHead">
        <table>
            <thead>
                <tr>
                    <th><input type="checkbox">环节名称</th>
                    <th><input type="checkbox">待办操作</th>
                    <th><input type="checkbox">已办操作</th>
                    <th><input type="checkbox">办结操作</th>
                </tr>
            </thead>
        </table>
          <div class="content">
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