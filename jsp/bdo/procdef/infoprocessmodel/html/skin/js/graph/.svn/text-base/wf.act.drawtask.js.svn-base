/**
 * wf.act.drawtask.js
 * 绘制控制节点。
 * nodeInfo结构：
 * 		{
 * 			attr:
 * 			catchAttr:
 * 			startAttr:
 * 			endAttr:
 * 			id:
 * 			model:
 * 			name:
 * 			position:
 * 			height:
 * 			width:
 * 			r:
 * 			widget:
 * 		}
 * 绘制动作节点
 * @param $
 */
(function($) {
	WFGraph.drawTask = function( nodeInfo ) {
		var currentNode = this;
		var graphList = {};
		
		this.model = nodeInfo.model;
		this.widget = nodeInfo.widget;
		
		// 创建图形
		var nodeTaskRect = WFGraph.canvas.rect( 0, 0, nodeInfo.width, nodeInfo.height, nodeInfo.r )
								.attr( nodeInfo.attr )
								.hide();
		graphList[ nodeInfo.model.id + "_rect" ] = nodeTaskRect;
		
		var position = { x: nodeInfo.position.x-49, y: nodeInfo.position.y-29, width: nodeInfo.width, height: nodeInfo.height };
		
		this.position = position;
		this.graphList = graphList;
		this.resetNodeAndAnchor = function ( data ) {
			position = $.extend( true, position, data );
			currentNode.position = position;
			showNode( position );
		};
		
		WFGraph.addEventToNode( currentNode ); // -->wf.act.event.js
		
		showNode( position );
		// 显示节点
		function showNode( position ) {
			// 拖拽节点到绘图区的区域：x坐标、y坐标、宽、高
			// 重新设置节点的矩形框、图标、环节名称的位置并展现
			nodeTaskRect.attr( position ).show();
			
			if ( currentNode.showName ) {
				currentNode.showName( position );
			}
		}
	}
	
})(jQuery);