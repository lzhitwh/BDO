<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
<%
	String webPath = request.getContextPath();
	StringBuffer sb = new StringBuffer();
	sb.append(request.getScheme());
	sb.append("://");
	sb.append(request.getServerName());
	sb.append(":");
	sb.append(String.valueOf(request.getServerPort()));
	sb.append(webPath);
	
	String fullWebPath = sb.toString();
	
	String procDefUniqueId = request.getParameter("procDefUniqueId");
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>流程设计工具核心</title>
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/css/wfdcore.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/css/wfdproperty.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/css/dialog.css"/>
<script type="text/javascript">
	debugger;
	if( typeof WFlow == "undefined" ) {
		WFlow = {};
	}
	WFlow.webPath = "<%=webPath %>";
	WFlow.fullWebPath = "<%=fullWebPath %>";
	var procDefUniqueId = "<%=procDefUniqueId %>";

	// 是否新流程
	WFlow.isNewProcess = true;
	if( procDefUniqueId != "null" && procDefUniqueId != "" ) {
		WFlow.isNewProcess = false;
		WFlow.procDefUniqueId = procDefUniqueId;
	}
</script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/frame/jquery.extend.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/frame/jspinyin.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/frame/raphael-min.js"></script>

<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/wf.globalvar.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/wf.config.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/wf.util.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/wftool.js"></script>

<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wf.model.base.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wf.model.event.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wf.model.gateway.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wf.model.node.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wf.model.callactivity.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wf.model.potentialowner.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wf.model.sequenceflow.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wf.model.lane.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wf.model.process.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wf.model.plane.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wf.model.diagram.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wf.model.definition.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/model/wfmodel.js"></script>

<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wf.graph.operation.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wf.act.action.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wf.act.event.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wf.act.drawevent.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wf.act.drawtask.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wf.act.drawgateway.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wf.act.drawsub.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wf.flow.anchor.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wf.flow.event.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wf.flow.util.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wf.flow.drawseq.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wf.lane.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/graph/wfgraph.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/wfevent.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/wfcore.js"></script>
<%
	String hideProp = request.getParameter("hideProp");
	if(!"1".equals(hideProp)){
%>
		<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/property/wfproperty.js"></script>
<%
	}
%>
</head>
<body>
<!--组件栏（左）-->
<div id="divTool" class="wfdToolArea">
    <div id="baseAction" class="actionType">
    	<span>动作节点</span>
    </div>
    <div id="baseActionContent" class="actionContent"></div>
    <div id="controlAction" class="actionType">
    	<span>控制节点</span>
    </div>
   	<div id="controlActionContent" class="actionContent"></div>
</div>
<!-- 绘图区域 -->
<div id="divMain" class="wfdBaseArea">
   <div id="divDesign" class="wfdDesignColumn">
       <div id="removableBox" class="removableBox"></div>
   </div>
</div>

<!-- 属性页面-->
<div class="propertyShrink"></div>
<div id="divProperty" class="wfdPropertyArea">
	<div id="wfDivProperty"></div>
</div>
</body>
</html>