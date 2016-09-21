(function($){
	if (typeof CFModel =="undefined") {
		CFModel = {};
	};
	
	CFModel.parseModelContent = function(modelContent) {
/*		var xmlDoc;
		if (window.DOMParser) { //判断浏览器是否支持DOMParser() IE 不支持
			xmlDoc = new DOMParser().parseFromString(modelContent, "text/xml");
		} else {		
			// Internet Explorer
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(modelContent);
		}*/
//		CFWorkflowApp.parseXml(xmlDoc); // -->bfd.workflowapp.js
		CFWorkflowApp.parseXml(); // -->bfd.workflowapp.js
	}
	
	CFModel.generateModelContent = function() {
		var xmlDoc;
		var isIE = false;
		try {	
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");	//IE 浏览器
			isIE = true;   	
		} catch(e) {
			xmlDoc = document.implementation.createDocument("", "", null); //为兼容其他浏览器
			isIE = false;
		}
		
		var xmlHead = xmlDoc.createProcessingInstruction("xml", "version=\"1.0\" encoding=\"UTF-8\"");
		xmlDoc.appendChild(xmlHead);
		
		CFlow.xmlDoc = xmlDoc;
		var root = CFWorkflowApp.generateXml(); // -->bfd.workflowapp.js
		xmlDoc.appendChild(root);
		
		var modelContent;
		if (isIE) {
			modelContent = xmlDoc.xml;
		} else {
			var xs = new XMLSerializer();
			modelContent = xs.serializeToString(xmlDoc);
		}
		return modelContent;
	};
})(jQuery);