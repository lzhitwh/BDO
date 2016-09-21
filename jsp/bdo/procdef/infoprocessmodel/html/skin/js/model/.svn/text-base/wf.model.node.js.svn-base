(function($){
	var overrideTask = {
		id: null,
		name: null,
		type : null,
		generateXml : function() {
			// 流程
			var act = WF.xmlDoc.createElement(this.type);
			act.setAttribute("id", this.id);
			act.setAttribute("name" , this.name);
			
			// 环节规则：OrderCountersignature（顺序），Countersignature（并行），Preemption（抢占）
			var assRuleXml = WF.xmlDoc.createElement("loushang:activityAssignRuleType");
			act.appendChild(assRuleXml);
			assRuleXml.setAttribute("ruleType",this.assignRuleType);

			// 环节扩展属性
			if (this.extAttrList) {
				var extListXml = WF.xmlDoc.createElement("loushang:activityExtensionAttributes");
				for (var e in this.extAttrList) {
					var tmpExt = this.extAttrList[e];
					var extXml = WF.xmlDoc.createElement("loushang:extensionAttribute");
					extXml.setAttribute("key", tmpExt.key);
					extXml.setAttribute("value", tmpExt.value);
					if (tmpExt.description) {
						extXml.setAttribute("description", tmpExt.description);
					}
					extListXml.appendChild(extXml);
				}
				act.appendChild(extListXml);
			}

			
			// 环节描述
			if(this.describe!=undefined && this.describe!=null && this.describe!=""){
				var actDesXml = WF.xmlDoc.createElement("loushang:activityDescription");
				var textNode = WF.xmlDoc.createTextNode(this.describe);
				actDesXml.appendChild(textNode);
				act.appendChild(actDesXml);
			}
			
			// 分支汇聚
			if(this.restrictObj){
				if (this.restrictObj.joinType!="" || this.restrictObj.joinRule!="" || 
						this.restrictObj.splitType!="" || this.restrictObj.splitActDefId!="") {
					var transXml = WF.xmlDoc.createElement("loushang:activityTransitionRestriction");
					transXml.setAttribute("joinType", this.restrictObj.joinType);
					transXml.setAttribute("joinRule", this.restrictObj.joinRule);
					transXml.setAttribute("splitType", this.restrictObj.splitType);
					transXml.setAttribute("relativeDivergingActDefId", this.restrictObj.splitActDefId);
					act.appendChild(transXml);
				}
			}
			
			return act;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			this.potentialOwnerList={};
		}
	};
	Node = $.inherit(FlowElement, overrideTask);
})(jQuery);