/**
 * wfevent.js
 * 处理事件： 在绘图区增加节点、点击节点、添加连接线、删除连接线、点击绘图区等。
 * @param $
 */
(function($){
	WFEvent.init = function() {
		// 添加元素。
		WFEvent.bind("wfd_add_element", function(e, data) {
			addElement( data );
		});
		
		// 删除元素。
		WFEvent.bind("wfd_event_delete_element", function( e, data ) {
			deleteElement( data );
		});
		
		// 删除节点。
		WFEvent.bind("wfd_delete_node", function( e, node ) {
			deleteNode( node );
		});
		
		// 删除连接线。
		WFEvent.bind("wfd_delete_line", function( e, line ) {
			deleteLine( line );
		});
		
		// 点击绘图区的组件。
		WFEvent.bind("bizClickNode", function( e, data ) {
			bizClickNode( data );
		});
		
		
		
		
		
		
		
		
		
		/**
		 * 解析BPMN模型时，绘图
		 * @param e
		 * @param data，值为
		 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，start，end，sequenceFlow） 
		 *    2）图形ID（id）
		 *    3）图形名称（name）
		 *    4）图形关联的模型（model）
		 *    5）图形位置：x、y、width、height、sourceNode、targetNode、waypointList
		 */
		WFlow.bind(WFlow.event.WF_ADD_DIAGRAM, function( e, data ) {
			addDiagram( e, data )
		});
		
		/**
		 * 修改了属性面板的ID和名称时，需要更新图形的名称
		 * @param e
		 * @param data，值为
		 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，start，end，sequenceFlow） 
		 *    2）模型（model）
		 */
		WFlow.bind(WFlow.event.WF_UPDATE_DIAGRAM, function(e, data) {
			updateDiagram( e, data );
		});
		
		WFEvent.bind("wfd_add_lane", function(event, type, position) {
			addLane( event, type, position );
		});

		WFEvent.bind("wfd_cashe_element", function(e, node) {
			var nodeElement = node.model;
			WFGraph.nodeDiagramDic[nodeElement.innerId] = node;
		});
		
		WFEvent.bind("wfd_cashe_line", function( e, line ) {
			var flowElement = line.model;
			WFGraph.flowDiagramDic[ flowElement.innerId ] = line;
		});
		
		WFEvent.bind("wfd_delete_lane", function(e, lane) {
			deleteLane(e, lane);
		});
		
		WFEvent.bind("cancelDrawLine", function(e, data) {
			cancelDrawLine( data );
		});
		
		WFEvent.bind("updateWhenNodeIdChanged", function(e, data) {
			updateWhenNodeIdChanged(e, data);
		});
		
		function isNodeExist(actName) {
			for (var key in WFGraph.nodeDiagramDic) {
				var act = WFGraph.nodeDiagramDic[key];
				if (act.model.name == actName) {
					return true;
				}
			}
			return false;
		}

/////////////////////////////////////////  事件绑定      ////////////////////////////////////////////////////////////////////
		// 绘图区的鼠标事件。
		$( "#divDesign" ).on({
				click: function(event) {
						var nodeType = WF.selectedType();
						// 如果已经选择组件栏中的组件。
						if ( nodeType ) {
							var data = { done: false };
							WFEvent.trigger( "cancelDrawLine", data );
							if ( data.done == true ) {
								return;
							}
							if ( nodeType != "sequenceFlow" ) {
								var position = WF.getMouseXY( event.pageX, event.pageY );
								if ( nodeType == "lane" ) {
									WFEvent.trigger( "wfd_add_lane", [ nodeType, position ] );
									return false;
								}
								
								var isMove = WF.canDrawOrMove( position.x, position.y );
								if ( isMove == false ) {
									return;
								}
								return false;
							}
						}
						WF.clearSelectedType(); // -->wf.util.js
						
						// 清除缓存下来的组件、隐藏锚点
						WF.clearSelectedAndHideAnchor(); // -->wf.util.js
						// 选中图形时，通知流程和业务展现各自的属性面板
						WFEvent.triggerShowProperty( WFModel.process );
						
						return false;
					},
					mousemove: function( e ) {
						if ( WF.selectedType() == "sequenceFlow" || WFGraph.triangleClicked ) {
							var line = WFGraph.drawingLine;
							if ( line && line.model.type == "sequenceFlow" ) {
								var mousePoint = WF.getMouseXY( e.pageX, e.pageY );
								if ( WFGraph.useStraightLine ) {
									WFGraph.drawStraightLineWithMouse( line, mousePoint.x, mousePoint.y );
								} else {
									if ( WF.selectedType() == "sequenceFlow" ) {
										WFGraph.drawAutoLineWithMouse( line, mousePoint.x, mousePoint.y );
									} else {
										WFGraph.drawLineWithMouse( line, mousePoint.x, mousePoint.y );
									}
								}
							}
						}
						var f = $( "#removableBox:visible" );
						if ( e.pageX >= screen.availWidth ) {
							f.css( "left", screen.availWidth );
						} else {
							f.css( "left", e.pageX -50 );
						}
						f.css( "top", e.pageY -30 );
					},
					mousedown: function( event ) {
						// 单击鼠标右键时，清除选中节点、选中组件类型、画线状态
						if ( 3 == event.which ) {
							$( "#btnSelect" ).trigger( "click" );
							WF.clearSelectedType();
							WFEvent.trigger( "cancelDrawLine", { done: false } );
						}
					},
					mouseup: function(e) {
						$( "#removableBox" ).hide();
						var widget = NODES[ WF.selectedNode ];
						WF.selectedNode = false;
						
						// 如果鼠标的X坐标小于组件栏的宽度，说明鼠标在组件栏内，此时不进行任何操作。
						var toolLeft = $( "#divTool" ).offset().left;
						var toolRight = toolLeft + $( "#divTool" ).width();
						if( e.pageX < toolRight )
							return false;
						
						if( widget ) {
							var data = {};
							data.widget = widget
							data.position = WF.getMouseXY( e.pageX, e.pageY );
							WFEvent.trigger( "wfd_add_element", data ); // -->.
						}
					},
					contextmenu: function( e ) {
//						return false;
					}
		});
		
		$( "#divProperty, #divTool" ).mouseover(function(e) {
			WFEvent.trigger( "cancelDrawLine", { done: false } );
		});
		
		$( document ).click(function( e ) {
			var x = e.pageX, y = e.pageY;
			var toolLeft = $( "#divTool" ).offset().left;
			var toolRight = toolLeft + $( "#divTool" ).width();
			var mainLeft = $( "#divMain" ).offset().left;
			var mainRight = $( "#divMain" ).width();
			
			if ( x >= toolLeft && x <= toolRight && y >= $( "#divTool" ).offset().top ) {
				return;
			}
			if ( x >= mainLeft && x <= mainRight && y >= $( "#divMain" ).offset().top ) {
				return;
			}
			WF.clearSelectedType();
		}).keydown(function( event ) {
			if( 46 == event.keyCode ) {
				if ( WF.getSelected() && $( "#divDesign" ).data( "wfd_editing_actname" ) ) {
					return;
				}
				var data = { selected: WF.getSelected() };
				WFEvent.trigger( "wfd_event_delete_element", data );
			}
		});
	}
	
////////////////////////////////////////  函数     //////////////////////////////////////////////////////////////////////
	function addDiagram( e, data ) {
		var type = data.eventType;
		switch(type) {
			case "process":
				break;
			case "lane":
				var laneDiagram = WFGraph.drawLaneFactory(type, data);
				if (laneDiagram) {
					WFGraph.laneDiagramDic[data.model.innerId] = laneDiagram;
				}
				break;
			case "sequenceFlow":
				var lineDiagram = WFGraph.drawLineFactory(type, data);
				if (lineDiagram) {
					WFGraph.flowDiagramDic[data.model.innerId] = lineDiagram;
				}
				break;
			case "userTask":
			case "callActivity":
			case "inclusiveGateway":
			case "exclusiveGateway":
			case "parallelGateway":
			case "complexGateway":
			case "start":
			case "end":
			case "intermediateCatchEvent":
				var nodeDiagram = WFGraph.drawNodeFactory(type, data);
				if (nodeDiagram) {
					WFGraph.nodeDiagramDic[data.model.innerId] = nodeDiagram;
				}
				break;
		}
	}
	
	function updateDiagram( e, data ) {
		var type = data.eventType, model = data.model, innerId = model.innerId;
		model.name = data.updateInfo.name;
		
		switch( type ) {
			case "process":
				if ( WFlow.parameter["isRelease"] != "1" ) {
					model.id = data.updateInfo.id;
				}
				WFModel.model().name = model.name;
				break;
			case "lane":
				break;
			case "sequenceFlow":
				var lineDiagram = WFGraph.flowDiagramDic[innerId];
				if (lineDiagram) {
					if (model.isNew) {
						model.id = data.updateInfo.id;
					}
					lineDiagram.name(model.name);
				}
				break;
			case "userTask":
			case "callActivity" :
			case "inclusiveGateway":
			case "exclusiveGateway":
			case "parallelGateway":
			case "complexGateway":
			case "start":
			case "end":
			case "intermediateCatchEvent":
				var nodeDiagram = WFGraph.nodeDiagramDic[innerId]; 
				if (nodeDiagram) {
					if (model.isNew) {
						model.id = data.updateInfo.id;
					}
					if (nodeDiagram.name) {
						nodeDiagram.name(model.name);
					}
				}
				break;
		}
		// 2)那么触发事件"wf_event_update_model "通知相关业务
		var mData = {eventType:type, id:model.id, name:model.name, orgId:data.orgId, innerId:model.innerId};
		WFlow.trigger(WFlow.event.WF_UPDATE_MODEL, mData);
	}
	
	// 在绘图区添加元素。
	function addElement( data ) {
		// 在绘图区添加图形
		var node = WFGraph.drawNodeFactory( data ); // -->wfgraph.js
		if ( node ) {
			WFEvent.trigger( "wfd_cashe_element", node );
			WF.setScrollWhenDragNode();
			WF.setSelected( node ); // --> wf.util.js
			
			// 增加图形时，通知流程和业务处理各自的模型。
			var model = node.model;
			model.widget = node.widget;
			WFEvent.triggerWhenAddGraph( model ); // -->.
			// 选中图形时，通知流程和业务展现各自的属性面板。
			WFEvent.triggerShowProperty( model ); // -->.
		}
	}
	
	function addLane(event, type, position) {
		var data = $.extend(true, {}, position);
		var lane = WFGraph.drawLaneFactory(type, data);
		if (lane) {
			if (!WFModel.process.laneSet) {
				WFModel.process.laneSet = new LaneSet();
			}
			
			var model = lane.model;
			WFGraph.laneDiagramDic[model.innerId] = lane;
			WF.setScrollWhenDragNode();
			
			// 增加图形时，通知流程和业务处理各自的模型
			WFEvent.triggerWhenAddGraph(model);
			// 选中图形时，通知流程和业务展现各自的属性面板
			WFEvent.triggerShowProperty(model);
		}
	}
	
	// 删除节点。
	function deleteNode( node ) {
		WFEvent.trigger( "cancelDrawLine", { done: false } ) ;
		var model = node.model;
		if ( !model.isNew ) {
			showDialog( "alert", "环节["+model.name+"]已经发布，不能删除！", "提示信息", 300 );
			return;
		}
		var id = model.id, innerId = model.innerId;
		for ( var innerKey in WFGraph.flowDiagramDic ) {
			var tempLine = WFGraph.flowDiagramDic[ innerKey ];
			var fromModel = tempLine.model.sourceNode.model;
			var toModel = tempLine.model.targetNode.model;
			if ( id == fromModel.id || id == toModel.id ) {
				WFEvent.trigger( "wfd_delete_line", tempLine );
			}
		}
		WFEvent.triggerWhenDeleteGraph( node );
		delete WFGraph.nodeDiagramDic[ innerId ];
		if (WF.getSelected() && WF.getSelected().model
				&& WF.getSelected().model.id == id) {
			WF.clearSelected();
		}
		node.remove();
		
		WF.setScrollWhenDragNode();
	}
	
	// 删除连接线。
	function deleteLine( line ) {
		var model = line.model;
		var id = model.id, innerId = model.innerId;
		
		// 通知业务。
		WFEvent.triggerWhenDeleteGraph( line );
		
		delete WFGraph.flowDiagramDic[innerId];
		
		if (WF.getSelected() && WF.getSelected().model
				&& WF.getSelected().model.id == id) {
			WF.clearSelected();
		}
		line.remove();
		
		WF.setScrollWhenDragNode();
	}
	
	function deleteLane(e, lane) {
		var model = lane.model;
		var id = model.id, innerId = model.innerId;
		WFEvent.triggerWhenDeleteGraph(model);
		
		delete WFGraph.laneDiagramDic[innerId];
		var startX = lane.position.x, startY = lane.position.y;
		for(var l in WFGraph.laneDiagramDic) {
			var lG = WFGraph.laneDiagramDic[l];
			if ("true" == lG.model.isHorizontal) {
				var tempX = lG.position.x, tempW = lG.position.width;
				if (tempX > startX) {
					lG.resetNodeAndAnchor({x:startX});
					startX = startX+tempW;
				}
			} else {
				var tempY = lG.position.y, tempH = lG.position.height;
				if (tempY > startY) {
					lG.resetNodeAndAnchor({y:startY});
					startY = startY+tempH;
				}
			}
		}
		
		if (WF.getSelected() && WF.getSelected().model
				&& WF.getSelected().model.id == id) {
			WF.clearSelected();
		}
		lane.remove();
		
		WF.setScrollWhenDragNode();
	}
	
	// 删除节点或连线。
	function deleteElement( data ) {
		var selectedNoe = data.selected;
		if ( selectedNoe ) {
			var model = selectedNoe.model;
			var tmpMess = "确定删除";
			switch( model.type ) {
				case "lane":
					tmpMess = tmpMess + "【" + model.name + "】";
					break;
				case "sequenceFlow":
					tmpMess = tmpMess + "【" + model.id + "】";
					break;
				default:
					tmpMess = tmpMess + "【" + model.name + "】";
					break;
			}
			tmpMess = tmpMess + "吗？";
			
			showConfirm( tmpMess, function() {
				switch( model.type ) {
					case "lane":
						WFEvent.trigger("wfd_delete_lane", selectedNoe);
						break;
					case "sequenceFlow":
						WFEvent.trigger("wfd_delete_line", selectedNoe);
						break;
					default:
						WFEvent.trigger("wfd_delete_node", selectedNoe);
						break;
				}
			}, "提示信息", 300);
			
		}
	}
	
	// 取消画线状态。
	function cancelDrawLine( data ) {
		if ( WF.selectedType() == "sequenceFlow" || WFGraph.drawingLine ) {
			var line = WFGraph.drawingLine;
			if (line && line.model.type == "sequenceFlow") {
				WFEvent.trigger("wfd_delete_line", line);
				WFGraph.triangleClicked = false;
				WFGraph.drawingLine = false;
				WF.clearSelectedType();
				data.done = true;
			}
		}
	}
	
	// 点击画布上的节点。
	function bizClickNode( data ) {
		var currentNode = data.node;
		
		// 添加连接线
		if ( WF.selectedType() == "sequenceFlow" || WFGraph.triangleClicked ) {
			var mousePoint = data.mousePoint;
			WFGraph.drawLineWhenClick( currentNode, mousePoint ); // -->wf.act.event.js
		} else {
			WF.setSelected( currentNode ); // -->wf.util.js
			// 选中图形时，通知流程和业务展现各自的属性面板
			var model = currentNode.model;
			WFEvent.triggerShowProperty( model );
		}
		return false;
	}
	
	
	function updateWhenNodeIdChanged(e, data) {
		var currentNode = data.node;
		var model = currentNode.model;
		if (model.name == data.name) {
			return;
		}
		if (model.type == "lane") {
			if (!data.name) {
				showDialog("alert","名称不能为空！", "提示信息", 300);
				currentNode.name(model.name);
				return;
			}
			for (var key in WFGraph.laneDiagramDic) {
				var lane = WFGraph.laneDiagramDic[key];
				if (lane.model.name == data.name) {
					showDialog("alert","名称["+data.name+"]已经存在！", "提示信息", 300);
					currentNode.name(model.name);
					return;
				}
			}
		} else {
			
			var ret = WFlow.validateNodeName(data.name);
			if (!ret) {
				currentNode.name(model.name);
				return;
			}
		}
		var oldActId = model.id;
		model.name = data.name;
		WFEvent.triggerWhenUpdateGraph(model, oldActId);
	}
	
	// TODO:delte
	WFEvent.bind = function(eventName, method) {
		$(WFEvent).bind(eventName, method);
	};
	// TODO:delte
	WFEvent.trigger = function(eventName, args) {
		$(WFEvent).trigger(eventName, args);
	};
	
	
	/**
	 * 增加节点/迁移线时
	 * 1）触发事件”wf_event_add_basic_model”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，start，end，sequenceFlow） 
	 *    2）模型（model）
	 * 2）触发事件“wf_event_add_model”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，start，end，sequenceFlow） 
	 *    2）环节/迁移线ID（id）
	 *    3）环节/迁移线名称（name）
	 * @param model
	 */
	WFEvent.triggerWhenAddGraph = function(model) {
		var bData = {eventType:model.type, model:model};
		WFlow.trigger(WFlow.event.WF_ADD_BASIC_MODEL, bData);
		
//		var mData = {eventType:model.type, id:model.id, name:model.name, innerId:model.innerId};
		WFlow.trigger(WFlow.event.WF_ADD_MODEL, model); // --> cfdcore.js
	}
	
	/**
	 * 删除节点/迁移线时
	 * 1）触发事件”wf_event_delete_basic_model”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，start，end，sequenceFlow） 
	 *    2）环节/迁移线ID（id）
	 *    3）环节/迁移线名称（name）
	 * 2）触发事件“wf_event_delete_model”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，start，end，sequenceFlow） 
	 *    2）环节/迁移线ID（id）
	 *    3）环节/迁移线名称（name）
	 * @param model
	 */
	WFEvent.triggerWhenDeleteGraph = function( line ) {
		var model = line.model;
		var bData = { eventType: model.type, model: model };
		WFlow.trigger( WFlow.event.WF_DELETE_BASIC_MODEL, bData );
		
		// 通知业务。
//		var mData = { eventType: model.type, id: model.id, name: model.name, innerId: model.innerId };
		WFlow.trigger( WFlow.event.WF_DELETE_MODEL, line );
	}
	
	/**
	 * 图形上的环节的ID和名称变化时
	 * 1）触发事件”wf_event_update_basic_model”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，start，end，sequenceFlow） 
	 *    2）模型（model）
	 *    3）原始ID（orgId）
	 * 2）触发事件“wf_event_update_model”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，start，end，sequenceFlow） 
	 *    2）环节/迁移线ID（id）
	 *    3）环节/迁移线名称（name）
	 *    4）原始ID（orgId）
	 * @param model
	 */
	WFEvent.triggerWhenUpdateGraph = function(model, orgId) {
		var bData = {eventType:model.type, model:model, orgId:orgId};
		WFlow.trigger(WFlow.event.WF_UPDATE_BASIC_MODEL, bData);
		
		var mData = {eventType:model.type, id:model.id, name:model.name, orgId:orgId, innerId:model.innerId};
		WFlow.trigger(WFlow.event.WF_UPDATE_MODEL, mData);
		
		switch(model.type) {
			case "process":
				WF.clearSelectedType();
				WF.clearSelectedAndHideAnchor();
				// 选中图形时，通知流程和业务展现各自的属性面板
				WFEvent.triggerShowProperty(WFModel.process);
				break;
			case "lane":
				break;
			case "sequenceFlow":
				break;
			case "userTask":
			case "callActivity" :
			case "inclusiveGateway":
			case "exclusiveGateway":
			case "parallelGateway":
			case "complexGateway":
			case "start":
			case "end":
			case "intermediateCatchEvent":
				WFEvent.triggerShowProperty(model);
				break;
		}
	}
	
	/**
	 * 选中节点/迁移线 或 单击绘图区的空白区域时，展现属性面板
	 * 1）触发事件”wf_event_show_basic_property”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，start，end，sequenceFlow） 
	 *    2）模型（model）
	 * 2）触发事件“wf_event_show_property”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，start，end，sequenceFlow） 
	 *    2）环节/迁移线ID（id）
	 *    3）环节/迁移线名称（name）
	 * @param model
	 */
	WFEvent.triggerShowProperty = function( model ) {
		var bData = { 
				eventType: model.type, 
				model: model 
			};
		WFlow.trigger( WFlow.event.WF_SHOW_BASIC_PROPERTY, bData );
		
		var mData = { 
				widget: model.widget, 
				eventType: model.type, 
				id: model.id, 
				name: model.name, 
				innerId: model.innerId, 
				isStart: model.isStart 
			};
		WFlow.trigger( WFlow.event.WF_SHOW_PROPERTY, mData );
	}
	
})(jQuery);