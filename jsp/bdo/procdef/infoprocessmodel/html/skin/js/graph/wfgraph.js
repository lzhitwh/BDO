/**
 * wfgraph.js
 * 创建画布、在绘图区创建图形、连接线等
 * @param $
 */
(function($) {
	WFGraph.init = function() {
		this.nodeDiagramDic = {};
		this.flowDiagramDic = {};
		this.laneDiagramDic = {};
		
		// 创建画布。
		this.canvas = Raphael( "divDesign", $("#divDesign").width(), $("#divDesign").height() );
		// 初始化节点。
		this.createNode();
	};
	
	WFGraph.createNode = function() {
		// 增加节点删除组件。
		this.drawOperation();
		// 增加节点画线用到的四个锚点，并绑定锚点上的鼠标事件。
		this.drawNodeAction(); // --> wf.act.action.js
		
		// 如果是新增流程，在画布上增加一个“开始”和一个“结束”节点。
		if ( WFlow.isNewProcess ) {
			WFEvent.trigger( "wfd_add_element", { widget: { id:"start", name: "start", type: NODE_TYPE.CONTROL_NODE }, position: { x:40, y:200 }} );
			WFEvent.trigger( "wfd_add_element", { widget: { id:"end", name: "end", type: NODE_TYPE.CONTROL_NODE }, position: { x:800, y:200 }} );
			WF.clearSelected();
		}
	};
	
	// 节点绘制工厂，根据传入参数的不同，绘制不同的元素。
	WFGraph.drawNodeFactory = function( data ) {
		// 图形ID, 图形名称, 图形模型, 图形位置：x、y、width、height。
		var node, gId, gName, gModel, gPosition;
		
		// 设置图形属性。
		if ( WFlow.isNewProcess ) {
//			gPosition = { x:data.position.x, y:data.position.y };
		} else {
			gPosition = { x:data.position.x, y:data.position.y, width:data.width, height:data.height };
			gId = data.id;
			gName = data.name;
			gModel = data.model; 
			gModel.innerId = gId;
		}
		switch( data.widget.type ) {
			case NODE_TYPE.ACTION_NODE:
				if ( WFlow.isNewProcess ) {
					gModel = new Node( { name: data.widget.name } ); // -->wf.model.node.js
					gModel.type = data.widget.type;
					gModel.id = WF.getPinyin( gModel.name );
					gModel.innerId = "g_" + gModel.id;
					gId = gModel.innerId;
					gName = gModel.name;
				}
				var taskData = $.extend( true, {}, WFConfig.actCommonCss,
						WFConfig.userTask, { id:gId, name:gName, model:gModel }, data );
				node = new WFGraph.drawTask( taskData ); // -->wf.act.drawtask.js
				break;
			case NODE_TYPE.CONTROL_NODE:
				if ( WFlow.isNewProcess ) {
					if ( data.widget.id == "start" ) {
						gModel = new StartNode();
						gModel.name = "start";
//						gModel = new CatchEvent();
					} else {
						gModel = new EndNode();
						gModel.name = "end";
//						gModel = new ThrowEvent();
					}
					gModel.type = data.widget.type;
					gModel.id = WF.getPinyin( gModel.name );
					gModel.innerId = "g_" + gModel.id;
					gId = gModel.innerId;
					gName = gModel.name;
				}
				var eventData = $.extend( true, {}, WFConfig.actCommonCss,
						WFConfig.event, { id:gId, name:gName, model:gModel }, data );
				node = new WFGraph.drawEvent( eventData );
				break;
		}
		return node;
		
//		switch (type) {
//			case "callActivity" :
//				if (WFlow.isNewProcess) {
//					gModel = new CallActivity();
//					gModel.type = type;
//					gModel.name = "环节" + WF.generateTaskId();
//					gModel.id = WF.getPinyin(gModel.name);
//					gModel.innerId = "g_" + gModel.id;
//					gId = gModel.innerId;
//					gName = gModel.name;
//				}
//				var taskData = $.extend(true, {}, WFConfig.actCommonCss,
//						WFConfig.userTask, {id:gId, name:gName, model:gModel}, gPosition);
//				node = new WFGraph.drawCallActivity(taskData);
//				break;
//			case "start" : 
//			case "end" : 
//			case "intermediateCatchEvent":
//				if (WFlow.isNewProcess) {
//					if (type == "end") {
//						gModel = new ThrowEvent();
//					} else {
//						gModel = new CatchEvent();
//					}
//					gModel.type = type;
//					gModel.name = "事件" + WF.generateEventId();
//					gModel.id = WF.getPinyin(gModel.name);
//					gModel.innerId = "g_" + gModel.id;
//					gId = gModel.innerId;
//					gName = gModel.name;
//				}
//				var eventData = $.extend(true, {}, WFConfig.actCommonCss,
//						WFConfig.event, {id:gId, name:gName, model:gModel}, gPosition);
//				node = new WFGraph.drawEvent(eventData);
//				break;
//			case "inclusiveGateway" :
//			case "exclusiveGateway":
//			case "parallelGateway":
//			case "complexGateway":
//				if (WFlow.isNewProcess) {
//					gModel = new Gateway();
//					gModel.type = type;
//					gModel.name = "网关" + WF.generateGatewayId();
//					gModel.id = WF.getPinyin(gModel.name);
//					gModel.innerId = "g_" + gModel.id;
//					gId = gModel.innerId;
//					gName = gModel.name;
//				}
//				var gatewayData = $.extend(true, {}, WFConfig.actCommonCss,
//						WFConfig.gateway, {id:gId, name:gName, model:gModel}, gPosition);
//				node = new WFGraph.drawGateway(gatewayData);
//				break;
//		};
	};
	
	WFGraph.drawLineFactory = function( type, data ) {
		// 图形ID,图形名称,图形模型，连接线的点集合
		var flow, gId, gName, gModel, gPointList;
		if (!WFlow.isNewProcess) {
			gId=data.id;
			gName=data.name;
			gModel=data.model; 
			var fromNodeModel = WFModel.process.nodeDic[gModel.sourceRef];
			var toNodeModel =  WFModel.process.nodeDic[gModel.targetRef];
			gModel.sourceNode = WFGraph.nodeDiagramDic[fromNodeModel.innerId];
			gModel.targetNode = WFGraph.nodeDiagramDic[toNodeModel.innerId];
			gModel.innerId = data.id;
			gPointList = data.waypointList;
		}
		switch ( type ) {
			case "sequenceFlow" :
				if ( WFlow.isNewProcess ) {
					gModel = new SequenceFlow();
					gModel.id = "seq" + WF.generateSeqId();
					gModel.sourceNode = data.sourceNode;
					gModel.innerId = "g_" + gModel.id;
					gId = gModel.innerId;
					gName = gModel.name;
				}
				var seqData = $.extend(true, {}, 
						WFConfig.flowSequence, 
						{ id: gId, name: gName, model: gModel },
						{ x: data.x, y: data.y, waypointList: gPointList },
						{ widget: { id: "sequenceFlow", name: "sequenceFlow", type: "sequenceFlow"}});
				flow = new WFGraph.drawLine(seqData);
				break;
		}
		if (gModel.sourceNode && 
				gModel.sourceNode.model.type == "start" && 
				gModel.targetNode) {
			gModel.targetNode.model.isStart = true;
		}
		return flow;
	};
	
	WFGraph.drawLaneFactory = function ( type, data ) {
		//图形ID,图形名称,图形模型，图形位置：x、y、width、height
		var node, gId, gName, gModel, gPosition;
		if ( !WFlow.isNewProcess ) {
			gId=data.id;
			gName=data.name;
			gModel=data.model; 
			gModel.innerId = gId;
			gPosition={x:data.x, y:data.y, width:data.width, height:data.height};
		}
		if ( type == "lane" ) {
			if (WFlow.isNewProcess) {
				gModel = new Lane();
				gModel.name = "组" + WF.generateLaneId();
				gModel.id = WF.getPinyin(gModel.name);
				gModel.innerId = "g_" + gModel.id;
				gId = gModel.innerId;
				gName = gModel.name;
				
				if ("1" == WFlow.parameter["laneType"]) {
					gModel.isHorizontal = "false"
				}
				if ("true" == gModel.isHorizontal) {
					var x=0;
					for (var o in this.laneDiagramDic) {
						var laneObj = this.laneDiagramDic[o];
						x += laneObj.position.width;
					}
					gPosition={x:x, y:0,height:$("#divDesign").height()};
				} else {
					var y=0;
					for (var o in this.laneDiagramDic) {
						var laneObj = this.laneDiagramDic[o];
						y += laneObj.position.height;
					}
					gPosition={x:0, y:y,width:$("#divDesign").width()};
				}
			}
			var laneData = $.extend(true, {}, 
					WFConfig.lane, {id:gId, name:gName, model:gModel}, gPosition);
			node = new WFGraph.drawLane(laneData);
		};
		return node;
	};
	
})(jQuery);