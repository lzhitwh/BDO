/**
 * wf.act.action.js
 * @param $
 */
(function($) {
	var actAdditionList = {};
	
	WFGraph.showNodeAction = function(currentNode) {
		var N = currentNode.position;
		var w = Number(WFConfig.nodeAction.width), h = Number(WFConfig.nodeAction.height);
		var halfW = w/2, halfH = h/2;
		var lX = N.x - 4 - w;
		var mX = N.x + N.width/2;
		var rX = N.x + N.width + 4 + w;
		var tY = N.y - 4 - w;
		var mY = N.y + N.height/2;
		var bY = N.y + N.height + 4 + w;
		
		actAdditionList.lm.attr({path : "M"+lX+" "+mY+"L"+Number(lX+w)+" "+Number(mY-halfH)+"L"+Number(lX+w)+" "+Number(mY+halfH)+"Z"}).show().toFront();
		actAdditionList.rm.attr({path : "M"+rX+" "+mY+"L"+Number(rX-w)+" "+Number(mY-halfH)+"L"+Number(rX-w)+" "+Number(mY+halfH)+"Z"}).show().toFront();
		actAdditionList.tm.attr({path : "M"+mX+" "+tY+"L"+Number(mX-halfH)+" "+Number(tY+w)+"L"+Number(mX+halfH)+" "+Number(tY+w)+"Z"}).show().toFront();
		actAdditionList.bm.attr({path : "M"+mX+" "+bY+"L"+Number(mX-halfH)+" "+Number(bY-w)+"L"+Number(mX+halfH)+" "+Number(bY-w)+"Z"}).show().toFront();
	}
	
	WFGraph.hideNodeAction = function() {
		actAdditionList.lm.hide();
		actAdditionList.rm.hide();
		actAdditionList.tm.hide();
		actAdditionList.bm.hide();
	}
	
	// 添加锚点，并绑定锚点的鼠标事件。
	WFGraph.drawNodeAction = function() {
		var lineGraph = function ( idx ) {
			var triangle = WFGraph.canvas.path( "M0 0L0 0L0 0Z" ).attr( WFConfig.nodeAction.attr ).hide();
			
			// 绑定鼠标事件：点击、鼠标进入、鼠标离开。
			$( triangle.node ).on({
				click: function( e ) {
							WFGraph.triangleClicked = true;
							
							var mousePoint = {};
							var currentNode = WF.getSelected();
							var N = currentNode.position;
							switch( idx ) {
								case "lm" : 
									mousePoint.x = N.x;
									mousePoint.y = N.y + N.height/2;
									break;
								case "rm" : 
									mousePoint.x = N.x + N.width;
									mousePoint.y = N.y + N.height/2;
									break;
								case "tm" : 
									mousePoint.x = N.x + N.width/2;
									mousePoint.y = N.y;
									break;
								case "bm" : 
									mousePoint.x = N.x + N.width/2;
									mousePoint.y = N.y + N.height;
									break;
							}
							
							var data = { node: currentNode, mousePoint: mousePoint };
							drawingLineWhenClickAction( data );
							return false;
						},
				
				mouseover: function( e ) {
								$(this).attr(WFConfig.nodeAction.mouseOverAttr);
							},
				mouseout: function( e ) {
								$(this).attr(WFConfig.nodeAction.attr);
							}
			});
			
			return triangle;
		}
		
		actAdditionList.lm = lineGraph("lm");
		actAdditionList.rm = lineGraph("rm");
		actAdditionList.tm = lineGraph("tm");
		actAdditionList.bm = lineGraph("bm");
	}
	
	function drawingLineWhenClickAction( data ) {
		var currentNode = data.node;
		var currModel = currentNode.model;
		var currActId = currModel.id, currActType = currModel.type;
		if ( !WFGraph.triangleClicked ) {
			return;
		}
		if ( currentNode.widget.id == "end" ) {
			showDialog("alert","不能从结束环节开始画线！", "提示信息", 300);
			WFGraph.triangleClicked = false;
			return false;
		}
		if ( currentNode.widget.id == "start" && WFGraph.isStartSeqExist( currActId ) ) {
			showDialog( "alert","起始环节的迁出线已经存在！", "提示信息", 300 );
			WFGraph.triangleClicked = false;
			return false;
		}
		var mousePoint = data.mousePoint;
		var data = { sourceNode : currentNode, x : mousePoint.x, y : mousePoint.y };
		var line = WFGraph.drawLineFactory(NODE_TYPE.SEQUENCE_FLOW, data);
		WFGraph.drawingLine = line;
	}
	
})(jQuery);