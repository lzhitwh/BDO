/**
 * cfdcore.js
 * 流程设计工具核心：创建流程对象，监听流程事件。
 * @param $
 */
(function( $ ) {
	if ( typeof CFDCore == "undefined" ) {
		CFDCore = {};
	}
	
	// 初始化。
	$(function() {
		// 创建流程对象
		CFWorkflowApp = new CFWorkflowApp(); // -->bfd.workflowapp.js
		CFWorkflowApp.init();
		CFProcess = CFWorkflowApp.processes.process;
		
		// 设置流程标题
		setProcessTitle();
		
		////////////////////////////////////////    监听流程事件    /////////////////////////////////////////////////////////
		// 添加元素。
		WFlow.bind(WFlow.event.WF_ADD_MODEL,function( e, data ) {
			addModel( data );
		});
		
		// 显示元素属性。
		WFlow.bind( WFlow.event.WF_SHOW_PROPERTY, function( e, data ) {
			showProperty( data );
		});
		
		// 修改元素。
		WFlow.bind(WFlow.event.WF_UPDATE_MODEL, function( e, data ) {
			updateModel( data );
		});
		
		// 删除元素。
		WFlow.bind(WFlow.event.WF_DELETE_MODEL, function( e, data ) {
			deleteModel( data );
		});
		
		// 显示流程属性。
		WFlow.trigger( WFlow.event.WF_SHOW_PROPERTY, { eventType: "process" } );
	});

	
////////////////////////////////////////////////    设置流程属性    /////////////////////////////////////////////////////////
	// 显示表单属性。
	CFDCore.showProcessProperty = function( pData ) {
		$.ajax({
			type: "POST",
			url: WFlow.fullWebPath + "/jsp/bdo/procdef/html/property/formproperty.jsp",
			data: {
			},
			dataType: "html",
			async: true,
			success: function( datas ) {
				var div = $( "<div></div>" ).addClass( "propertyArea" );
				$( div ).attr( "id", "divProcFormProperty" );
				$( div ).html( datas );
				$( "#divProperty" ).append( div );
			},
			error: function() {
				showDialog( "alert","请求数据出错！", "提示信息", 300 );
			}
		});
	}
	
	// 加载节点属性页面。
	CFDCore.showTaskProperty = function( data ){
		var widgetId = data.widget.id;
		var propertyJsp = widgetId + "property.jsp";
		
		$.ajax({
			type: "POST",
			url: WFlow.fullWebPath + "/jsp/bdo/procdef/html/property/" + propertyJsp,
			data: {
			},
			dataType: "html",
			async: true,
			success: function( datas ){
				var div = $( "<div></div>" ).addClass( "propertyArea" );
				$( div ).attr( "id", "divActFormProperty" );
				$( div ).html( datas );
				$( "#divProperty" ).append( div );
			},
			error: function(){
				showDialog( "alert", "请求节点属性页面时出错！", "提示信息", 300 );
			}
		});
	}
	
	CFDCore.showSubProcProperty = function(aData){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/jsp/bdo/procdef/html/property/subprocformproperty.jsp",
			data:{
			},
			dataType:"html",
			async:true,
			success:function (datas){
				var div = $("<div></div>").addClass("propertyArea");
				$(div).attr("id", "divFormCallProperty");
				$(div).html(datas);
				$("#divProperty").append(div);
			},
			error:function(){
				showDialog("alert","请求数据出错！", "提示信息", 300);
			}
		});
	}
	
	CFDCore.showGatewayProperty = function(gData){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/jsp/bdo/procdef/html/property/gatewayformproperty.jsp",
			data:{
			},
			dataType:"html",
			async:true,
			success:function (datas){
				var div = $("<div></div>").addClass("propertyArea");
				$(div).attr("id", "divGwFormProperty");
				$(div).html(datas);
				$("#divProperty").append(div);
				$("#branchCondiId input").attr("gname",gData.name);
			},
			error:function(){
				showDialog("alert","请求数据出错！", "提示信息", 300);
			}
		});
	}
	
////////////////////////////////////////////    函数    ///////////////////////////////////////////////////////////////////
	// 设置流程标题。
	function setProcessTitle() {
		if( CFlow.procDefUniqueId != "" ) {
			$.ajax({
				type: "POST",
				async: false,
				url: WFlow.fullWebPath + "/command/dispatcher/"
				+ "org.loushang.cform.procdef.html.cmd.ProcDefDispatcherCmd/"
				+ "getModelContent",
				data: { "procDefUniqueId": CFlow.getProcDefUniqueId() },
				dataType: "json",
				success: function( data ) {
					if( data && data.success ){
						if( data.modelContent ){
							CFModel.parseModelContent( data.modelContent );
							$( "#procTitle" ).text( CFProcess.name );
						}
					} else {
						showDialog( "alert", data.errMessage, "提示信息", 300 );
					}
				},
				error: function(){
					showDialog( "alert", "请求数据出错！", "提示信息", 300 );
				}
			});
		} else {
			CFProcess.id = "NewWorkFlow";
			CFProcess.name = "新建流程";
			$( "#procTitle" ).text( "新建流程" );
		}
	}
	
	// 添加元素
	function addModel( data ) {
		switch( data.type ) {
			case NODE_TYPE.ACTION_NODE:
			case NODE_TYPE.CONTROL_NODE:
				var node = new BDONode();
				node.init();
				node.id = data.id;
				node.name = data.name;
				node.widget = data.widget;
				CFProcess.nodes.childList[ node.id ] = node;
				break;
			case NODE_TYPE.SEQUENCE_FLOW:
				if( data.sourceNode && data.targetNode )
					CFProcess.nodes.childList[ data.sourceNode.model.id ].ok = data.targetNode.model.id;
				break;
		}
	}
	
	// 显示元素属性。
	function showProperty( data ) {
		debugger;
		switch( data.eventType ) {
			case "process":
				showProc( data );
				break;
			case "lane":
				break;
			case "sequenceFlow":
				break;
			case "action":
				CFlow.setSelectedId( data.id );
				showActionProperty( data );
				break;
			case "callActivity":
				CFlow.setSelectedId( data.id );
				showCallAct( data );
				break;
			case "inclusiveGateway":
			case "exclusiveGateway":
			case "complexGateway":
				CFlow.setSelectedId( data.id );
				showGateway( data );
				break;
			case "start":
			case "end":
				break;
		}
	}
	
	// 显示节点属性。
	function showActionProperty( data ) {
		debugger;
		CFlow.isStart = data.isStart;
		if( CFlow.ttype != "action" ) {
			data.flag = true;
			CFlow.ttype = "action";
		}
		if( CFlow.type != "action" ){
			$( "#divActFormProperty" ).show();
			$( "#divGwFormProperty" ).hide();
			$( "#divProcFormProperty" ).hide();
			$( "#divFormCallProperty" ).hide();
		}
		if( data.flag ){
			CFDCore.showTaskProperty( data );
		} else {
			CFlow.initCFormActData();
		}
	}
	
	// 修改元素。
	function updateModel( data ) {
		if( data.eventType == "process" ){
			CFProcess.id = data.id;
			CFProcess.name = data.name;
			$( "#procTitle" ).text( data.name );
		};
		if( data.eventType == "userTask" ){
			var activity = CFProcess.activities.childList[ data.orgId ];
			activity.name = data.name;
			activity.id = data.id;
			
			delete CFProcess.activities.childList[ data.orgId ];
			CFProcess.activities.childList[ data.id ] = activity;
			if ( CFlow.getSelectedId() == data.orgId ) {
				CFlow.setSelectedId( data.id );
			}
		};
	}
	
	// 删除元素
	function deleteModel( data ) {
		switch( data.widget.type ) {
			case NODE_TYPE.ACTION_NODE:
				delete CFProcess.nodes.childList[ data.model.id ];
				break;
			case NODE_TYPE.SEQUENCE_FLOW:
				CFProcess.nodes.childList[ data.model.sourceNode.model.id ].ok = "";
				break;
		}
	}
	
	// 显示流程属性。
	function showProc( data ) {
		if( CFlow.ptype != "process" ) {
			data.flag = true;
			CFlow.ptype = "process";
		}
		if( CFlow.type != "process" ) {
			$( "#divActFormProperty" ).hide();
			$( "#divGwFormProperty" ).hide();
			$( "#divProcFormProperty" ).show();
			$( "#divFormCallProperty" ).hide();
		}
		if( data.flag ) {
			CFDCore.showProcessProperty( data );
		}else if( CFProcess.formId && CFProcess.formId != "null" ) {
			$( "#procformName input:text" ).val( CFProcess.formName );
			$( "#procformName input:text" ).attr( "id", CFProcess.formId );
		}
		
	}
	
	
	function showCallAct( data ) {
		CFlow.isStart = data.isStart;
		if ( CFlow.ctype != "subProcess" ) {
			data.flag = true;
			CFlow.ctype = "subProcess";
		}
		if ( CFlow.type != "subProcess" ) {
			$( "#divActFormProperty" ).hide();
			$( "#divGwFormProperty" ).hide();
			$( "#divProcFormProperty" ).hide();
			$( "#divFormCallProperty" ).show();
		}
		if ( data.flag ) {
			CFDCore.showSubProcProperty( data );
		} else {
			CFlow.initCFormSubProcData();
		}
	}
	
	function showGateway( data ) {
		if( CFlow.gtype != "gateway" ) {
			data.flag = true;
			CFlow.gtype = "gateway";
		}
		if( CFlow.type != "gateway" ) {
			$( "#divActFormProperty" ).hide();
			$( "#divGwFormProperty" ).show();
			$( "#divProcFormProperty" ).hide();
			$( "#divFormCallProperty" ).hide();
		}
		if( data.flag ) {
			CFDCore.showGatewayProperty( data );
		} else {
			CFlow.initGataWay( data.name );
		}
	}
})(jQuery);