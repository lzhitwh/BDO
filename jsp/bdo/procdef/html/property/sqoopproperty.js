/**
 * activityformproperty.js
 */
$(function() {
    CFlow.initCFormActData();
    $("#configuration").click(function( e ) {
    	setConfiguration();
    });
});

// 设置属性
function setConfiguration() {
	var url = CFlow.webPath + "/jsp/bdo/procdef/html/property/showConfiguration.jsp";
	
	var param = { formType: "PCForm" };
	
	showWindow( "设置属性", url, 500, 455, param, afterCloseForm );
}

// 设置节点属性。
CFlow.initCFormActData = function() {
	debugger;
    var node = CFProcess.nodes.childList[ CFlow.getSelectedId() ];
}

function afterCloseForm() {
	
}