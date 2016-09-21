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
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/property/task/taskproperty.js"></script>
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/infoprocessmodel/html/skin/css/wfdproperty.css" />

<script>
function switchActPropTab(ProTag, ProBox) {
    $("#divActivityPropertyBody #"+ProTag+" a").addClass("on");
    $("#divActivityPropertyBody ul li:not('#"+ProTag+"')"+" a").removeClass("on");
    $("#divActivityPropertyBody #"+ProBox).show();
    $("#divActivityPropertyBody .wfdActPropCon:not('#"+ProBox+"')").hide();
}
</script>
</head>
<body>
	<div id="preActDiv" class="propertyArea">
		<div id="divActivityPropertyHead" class="headArea wfdFirstHeadArea"><span>节点属性</span><div class="shrinkDiv"></div></div>
		<div id="divActivityPropertyBody" class="wfPropertyBodyArea wfdTaskPropBodyArea">
        <div id="wfdActPropTabs" class="wfdActPropTabs">
        <ul>
            <li id="wfdActPropTab1" class="wfdActPropBaseArea"><a href="#" class="on" onclick="switchActPropTab('wfdActPropTab1','wfdActPropCon1');this.blur();return false;">基本</a></li>
            <!-- 
            <li id="wfdActPropTab2" class="wfdActPropAdvArea"><a href="#" onclick="switchActPropTab('wfdActPropTab2','wfdActPropCon2');this.blur();return false;">高级</a></li>
             -->
        </ul>
        </div>
        <div style="clear: both"></div>
        <div id="wfdActPropCon1" class="wfdActPropCon">
            <div id="activityName" class="wfdProp wfdActProp"><label>名称:</label><input type="text"/></div>
            <div id="activityId" class="wfdProp wfdActProp"><label>ID:</label><input type="text" readonly="readonly"/></div>
        </div>
        <div id="wfdActPropCon2" style="display: none" class="wfdActPropCon">
	        <div id="activityLimit" class="wfdProp"><label>限时:</label><input type="text" onpaste="return false" class="txtDiv" style="width: 50px;"/><select class="limitSel">
	            <option value="D">工作日</option>
	            <option value="N">自然日</option>
	        </select></div>
	        <div id="activityWarn" class="wfdProp"><label>提前:</label><input type="text" onpaste="return false" class="txtDiv" style="width: 50px;"/>
	            <span>工作日</span>预警
	        </div>
	        <div id="taskRule" class="wfdProp wfdActProp1"><label>任务规则:</label><select style="text-align:left;">
	            <option value="Preemption">抢占</option>
	            <option value="Countersignature">并行会签</option>
	            <option value="OrderCountersignature">顺序会签</option>
	        </select></div>
		<div id="isCreateActByPart" class="wfdProp chk"><input type="checkbox" id="chk1"><label>按参与者生成环节实例</label></div>
		<div id="isAddActTimeToProcTime" class="wfdProp chk"><input type="checkbox" id="chk2"><label>环节执行时间不计入流程</label></div>
		<div id="splitType" class="wfdProp chk"><input type="checkbox" id="splitChk"><label>并行分支</label></div>
		<div id="joinType" class="wfdProp chk"><input type="checkbox" id="joinChk"><label>并行汇聚</label></div>
	        <div id="forkAct" class="wfdProp"><label>关联的分支环节:</label><select>
	        </select></div>
	        <div id="joinRule" class="wfdProp wfdActProp1"><label>复杂汇聚:</label><select>
	        </select></div>
	        <div id="actBranch" class="wfdProp wfdActProp1"><label>分支条件:</label><input type="text" readonly="readonly" class="formTxtDiv" />
				<input type="button" class="formBtnDiv"/></div>
	        <div id="activityDescribe" class="wfdProp describe"><label>描述:</label><textarea></textarea></div>
        </div>
		</div>
	</div>
</body>
</html>