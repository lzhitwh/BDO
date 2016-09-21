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
<link rel="stylesheet" href="<%=webPath%>/jsp/bdo/procdef/html/skin/css/localopt.css" />

<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/frame/jquery-ui.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/bdo/procdef/html/form/localopt.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath%>';
WFlow.fullWebPath = '<%=fullWebPath%>';
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
    <div id="tabContainer">
        <div id="tabs">
            <ul>
                <li id="tab0"><a href="#"
                    onclick="switchTab(0);this.blur();return false;">
                        新建操作</a></li>
                <li id="tab1"><a href="#" class="on"
                    onclick="switchTab(1);this.blur();return false;">
                        待办操作</a></li>
                <li id="tab2"><a href="#"
                    onclick="switchTab(2);this.blur();return false;">
                        已办操作</a></li>
                <li id="tab3"><a href="#"
                    onclick="switchTab(3);this.blur();return false;">
                        办结操作</a></li>
            </ul>
        </div>
        <div id="triangle" class="triangle"></div>
        <div style="clear: both"></div>
        <div id="con0" style="display: none" class="con">
            <div id="con0left" class="left">
                <div class="selectArea"><label class="select">操作类别:</label><div class="select"><select></select></div></div>
                <div id="table0"  class="table">
                    <table cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th  style="width:133px">操作名称</th>
                                <th  style="width:240px">操作说明</th>
                                <th   style="width:89px">添加</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div id="con0right" class="right">
                <div class="header"><div  ></div>已选操作</div>
                <div class="comfirmArea">
                    
                </div>
            </div>
        </div>
        <div id="con1" class="con">
            <div id="con1left" class="left">
                <div class="selectArea"><label class="select">操作类别:</label><div class="select"><select></select></div></div>
                <div id="table1"  class="table">
                    <table cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th style="width:133px">操作名称</th>
                                <th   style="width:240px">操作说明</th>
                                <th style="width:89px">添加</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div id="con1right" class="right">
                <div class="header"><div  ></div>已选操作</div>
                <div class="comfirmArea">
                    
                </div>
            </div>
        </div>
        <div id="con2" style="display: none" class="con">
            <div id="con2left" class="left">
                <div class="selectArea"><label class="select">操作类别:</label><div class="select"><select></select></div></div>
                <div id="table2"  class="table">
                    <table cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th  style="width:133px">操作名称</th>
                                <th   style="width:240px">操作说明</th>
                                <th style="width:89px">添加</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div id="con2right" class="right">
                <div class="header"><div  ></div>已选操作</div>
                <div class="comfirmArea">
                    
                </div>
            </div>
        </div>
        <div id="con3" style="display: none" class="con">
            <div id="con3left" class="left">
                <div class="selectArea"><label class="select">操作类别:</label><div class="select"><select></select></div></div>
                <div id="table3"  class="table">
                    <table cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th  style="width:133px">操作名称</th>
                                <th   style="width:240px">操作说明</th>
                                <th style="width:89px">添加</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div id="con3right" class="right">
                <div class="header"><div  ></div>已选操作</div>
                <div class="comfirmArea">
                    
                </div>
            </div>
        </div>
    </div>
    <div class="buttonArea">
        <input id="confirm" class="confirm" type="button" value="确定"><input
            id="cancel" class="cancel" type="button" value="取消">
    </div>
</body>
</html>