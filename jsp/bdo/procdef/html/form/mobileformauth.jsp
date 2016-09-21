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
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/css/zTreeStyle/zTreeStyle.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/dialog.css"/>

<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/formauth.css" />

<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/frame/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/frame/jquery.ztree.excheck-3.5.min.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/form/mobileformauth.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
    <div id="tree1" class="left">
    <ul id="tree" class="ztree"></ul>
    </div>
    <div id="content" class="right">
        <div id="container" class="rightTop">
        <label>容器名称</label><input id="containerName" type="text"><label class="hide" for="hide">是否隐藏</label><input class="hide" type="checkbox">
        </div>
        <div id="table" class="rightBottom">
        <table>
            <thead>
                <tr>
                    <th>表单域名称</th>
                    <th><input type="checkbox">隐藏</th>
                    <th><input type="checkbox">只读</th>
                    <th><input type="checkbox">必填</th>
                    <th><input type="checkbox">初始化</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        <div class="buttonArea"><input id="confirm" class="confirm" type="button" value="确定"><input id="cancel" class="cancel" type="button" value="取消"></div>
        </div>
    </div>
</body>
</html>