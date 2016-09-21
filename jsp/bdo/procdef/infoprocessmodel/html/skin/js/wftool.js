/**
 * wftool.js
 * 创建左侧组件栏，并绑定组件的点击、悬停等事件。
 * @param $
 */
(function($) {
	WFTool.init = function() {
		// 添加动作组件。
		addActionElement( "sqoop", "wfdIconTask" );
		addActionElement( "hive", "wfdIconTask" );
		addActionElement( "java", "wfdIconTask" );
		addActionElement( "spark", "wfdIconTask" );
		addActionElement( "map-reduce", "wfdIconTask" );
		addActionElement( "pig", "wfdIconTask" );
		
		// 添加控制组件。
//		addControlElement("", "选择", "wfdIconMouse");
//		addControlElement("sequenceFlow", "连接线", "wfdIconLine");
		addControlElement( "inclusiveGateway", "分支汇聚", "wfdIconGateway" );
		addControlElement( "kill", "终止", "wfdIconEnd" );
		addControlElement( "callActivity", "子流程", "wfdIconSubProc" );
//		addControlElement("start", "开始", "wfdIconStart");
//		addControlElement("end", "结束", "wfdIconEnd");
		
		// 绑定组件上的事件
		$(".wfdToolComponent").on({
			mouseover: function(e) {
				if(WF.selectedNode)
					return false;
				$(this).addClass("wfdToolSelected");
			},
			mouseout: function(e) {
				$(this).removeClass("wfdToolSelected");
			},
			mousedown: function(e) {
				// 解决IE，chrome中拖动时选中元素问题
				e.preventDefault();
				WF.selectedNode = $(this).data("nodeId");
				
				$("#removableBox").empty()
								.text($(this).data("nodeName"))
								.css({
									"left" : e.pageX - 50 + "px",
									"top" : e.pageY - 30 + "px"
								})
								.show();
			}
		});
		$("#divTool").on({
			mouseup: function(e) {
				WF.clearSelectedType();
				$("#removableBox").hide();
			}
		})

	}
	
	// 添加动作节点
	function addActionElement(nodeName, className) {
		var btnDiv = $("<div></div>").addClass("wfdToolComponent");
		btnDiv.data("nodeId", nodeName);
		btnDiv.data("nodeName", nodeName);
		btnDiv.data("nodeType", "action");
		$("<div></div>").addClass("wfdIcon").addClass(className).appendTo(btnDiv);
		$("<div></div>").addClass("wfdIconDesc").append(
				$("<span></span>").text(nodeName)).appendTo(btnDiv);
		btnDiv.appendTo($("#baseActionContent"));
		
		//  将节点信息添加到全局变量中，方便获取
		var node = {};
		node.id = nodeName;
		node.name = nodeName;
		node.type = "action";
		node.className = className;
		
		if( !NODES[node.id] )
			NODES[node.id] = node;
		else
			showDialog("alert","ID为"+node.id+"的组件重复！", "提示信息", 300);
	}
	
	// 添加控制节点
	function addControlElement(eleType, eleName, eleCssName) {
		var btnDiv = $("<div></div>").addClass("wfdToolComponent");
		$("<div></div>").addClass("wfdIcon").addClass(eleCssName).appendTo(btnDiv);
		$("<div></div>").addClass("wfdIconDesc").append(
				$("<span></span>").text(eleName)).appendTo(btnDiv);
		btnDiv.appendTo($("#controlActionContent"));
	}
	
	WFTool.setSelected = function() {
		$(".wfdToolComponent").siblings().removeClass("wfdToolSelected");
	}
	
})(jQuery);