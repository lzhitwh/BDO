<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
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
    String showCode = request.getParameter("showCode");
    if(showCode == null){
        showCode = "";
    }
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" >
<title>BDO流程设计工具</title>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/jquery.extend.js"></script>

<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/codemirror.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/codemirror.formatting.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/codemirror.xml.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/cfdesigner.js"></script>

<script type="text/javascript">
	var cformPath = '<%=fullWebPath%>';
	if(typeof CFlow == 'undefined')
	    CFlow = {};
	if (typeof CFDEvent == "undefined")
	    CFDEvent = {};
	CFlow.showCode = "<%=showCode%>";
</script>

<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/cfdesigner.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/codemirror.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/dialog.css"/>
</head>
<body>
    <div class="cfdBaseArea">
        <div id="cfDivHandle" class="cfdHandleArea">
            <span id="procTitle" class="cfProcTitle"></span>
            <ul>
                <li class="cfBtnModelLi"><div id="checkSource" class="cfdButton">
                    <div class="cfdButtonImg cfdBtnModel"></div><span>查看源码</span></div>
                </li> 
                <li class="cfBtnReleaseLi"><div id="cfBtnRelease" class="cfdButton"><div class="cfdButtonImg cfdBtnRelease"></div><span>保存并发布</span></div></li>
            </ul>
        </div>
        <div style="clear: both;"></div>
        <div id="cfDivDesignArea" class="cfdBottomColumn">
        </div>
        <div id="divSource" class="wfdSourceColumn" style="display:none">
        <!-- 
            <button id="bpmnSource">BPMN模型</button><button id="bdoSource">BDO模型</button>
         -->
            <textarea id="txtSource" name="txtSource" disabled="disabled"></textarea>
        </div>
    </div>
</body>
</html>