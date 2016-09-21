/**
 * wf.globalvar.js
 * 所有的全局变量都在此定义。
 * @param $
 */
(function() {
/////////////////////////////////////////////  页面对象   ////////////////////////////////////////////	
	// 组件栏对象，用于加载设计页面左侧工具栏中的组件，以及绑定组件的点击、悬浮事件等。 -->wftool.js
	WFTool = {};
	
	// 画布对象，包含创建节点、连接线以及初始化节点等方法，以及绘制图形时的一些属性。
	WFGraph = {
		// 是否选中了锚点，在画布中选中锚点后，将此值设置为true，表示将绘制连接线。
		triangleClicked: false,
		// 是否处于画线状态
		drawingLine: false,
		// 画节点之间的连线时使用直线，false表示用曲线
		useStraightLine: true
	};
	
/////////////////////////////////////////////  业务对象   ////////////////////////////////////////////	
	// 存储节点。
	NODES = {};
	
	// 工具对象
	WF = {
		// 是否选中了组件栏中的对象，如果选中，则值为组件的ID；false表示没有选中组件栏中的节点。
		selectedNode: false
	};
	
	WFProp = {};
	
	// 处理事件： 在绘图区增加节点、点击节点、添加连接线、删除连接线、点击绘图区等事件。 -->wfevent.js
	WFEvent = {};
	
	WFlow = typeof WFlow == "undefined" ? {} : WFlow;
	WFlow.parameter = {};
	
/////////////////////////////////////////////  配置与常量   ////////////////////////////////////////////	
	// 节点的通用属性。
	JOBPROPERTY = {
			nameNode: "hdfs://idap-agent-75.idap.com:8020",
			jobTracker: "idap-agent-78.idap.com:8050",
			queueName: "default"
	};
	
	// 节点类型。
	NODE_TYPE = {
			ACTION_NODE: "action",
			CONTROL_NODE: "control",
			SEQUENCE_FLOW: "sequenceFlow"
	};
	
	WFConfig = {};
	
})();