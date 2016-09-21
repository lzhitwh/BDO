(function($){
	var overrideProcss = {
		process : null,
		init: function(){
			this.process = new BFProcess();
			this.process.init();
		},
		generateXml: function() {
			var process = this.process.generateXml();
			return process;
		},
		parseXml: function(element) {
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName === "Process") {
					this.process.parseXml(child);
	         	}
			}
		}
	};
	
	BFProcesses = $.inherit(CFBase, overrideProcss);
})(jQuery);