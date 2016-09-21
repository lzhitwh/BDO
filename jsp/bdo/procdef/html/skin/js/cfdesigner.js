$(function() {
	// 初始化设计区。
	initDesignArea();
	// 查看源码
	$( "#checkSource" ).click(function() {
		validateProcess();
		checkSource();
	});
	// BPM模型
	$("#bpmnSource").click(function() {
		bpmnSource();
	});
	// bdo模型
	$("#bdoSource").click(function() {
		bdoSource();
	});
});

// 初始化设计区。
function initDesignArea() {
	var bodyWidth = document.documentElement.clientWidth;
	var bodyHeight = document.documentElement.clientHeight;
	var userAgent = navigator.userAgent.toLowerCase();
	if( userAgent.indexOf( "chrome" ) != -1 ) {
		bodyHeight = 670;
	}
	$( "#cfDivDesignArea" ).width( bodyWidth );
	$( "#cfDivDesignArea" ).height( bodyHeight - $( "#cfDivHandle" ).height() );
	$.ajax({
		type: "POST",
		async: false,
		url: cformPath + "/jsp/bdo/procdef/html/cfdcore.jsp",
		data: parseUrl(),
		dataType: "html",
		success: function(data) {
			$( "#cfDivDesignArea" ).append( data );
		},
		error: function() {
			showDialog( "alert", "加载页面失败", "提示信息", 300 );
		}
	});
}

// 校验流程模型。
function validateProcess() {
	
}

// 查看源码。
function checkSource() {
	if (WFlow.seeCode ) {   //从源码区返回设计区
		$( "#checkSource span" ).text( "查看源码" )
		WFlow.seeCode = false;
		$( "#cfDivDesignArea" ).show();
		$( "#divSource" ).hide();
	} else {				//从设计区跳转到源码区
		$( "#checkSource span" ).text( "返回设计" )
		WFlow.seeCode = true;
		$( "#cfDivDesignArea" ).hide();
		$( "#divSource" ).show();
		var bdoXml = CFlow.getCFormModelContent(); // -->cfd.api.js
//		WFModel.generateModelContent();
		var editor;
		if ( CFlow.getDesignerEditor() ) {
			editor = CFlow.getDesignerEditor();
		} else {
			var editor = CodeMirror.fromTextArea(
					document.getElementById( "txtSource" ), 
					{
						mode: "application/xml",
						lineNumbers: true
					});
			CFlow.setDesignerEditor( editor );
		}
		editor.setValue( bdoXml );
		CodeMirror.commands[ "selectAll" ]( editor );
		editor.autoFormatRange( editor.getCursor( true ), editor.getCursor( false ) );
		CodeMirror.commands[ "goDocStart" ]( editor );
	}
}

// 绑定源码区事件
// BPM模型
function bpmnSource() {
	$(this).css("background","#ddd");
	$("#cformSource").css("background","#eee");
	var editor=CFlow.getDesignerEditor();
	var bpmnXml = CFlow.getProcModel();
	editor.setValue(bpmnXml);
	CodeMirror.commands["selectAll"](editor);
	editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
	CodeMirror.commands["goDocStart"](editor);
	return false;
}

// bdo模型
function bdoSource(){
	$(this).css("background","#ddd");
	$("#bpmnSource").css("background","#eee");
	var editor = CFlow.getDesignerEditor();
	var bdoXml = CFlow.getCFormModelContent();
	editor.setValue(bdoXml);
	CodeMirror.commands["selectAll"](editor);
	editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
	CodeMirror.commands["goDocStart"](editor);
	return false;
}

function parseUrl() {
	var fullUrl = document.URL.split("?");
	if (fullUrl.length <= 1) {
		return;
	}
	var params={};
	var param = fullUrl[1].split("&");
	for ( var i = 0; i < param.length; i++) {
		var keyValue = param[i].split("=");
		if (keyValue.length == 2) {
			params[keyValue[0]] = keyValue[1];
		}
	}
	return params;
}