// 修复ie8对trim不支持
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
$(function($){
	var addRoleDivList={};
	initPage=function(){
		$(".addPic").bind("click", function(){
			var divid=$(this).parent().attr("id");
			var divnId=$(this).parent().attr("nId");
			var roleId="";
			var roleName="";
			if(divid=="c_corpRoleType" || divid=="c_upperCorpRoleType" || divid=="c_lowerCorpRoleType"
				|| divid=="s_deptRoleType" || divid=="s_corpRoleType" || divid=="s_upperCorpRoleType" || divid=="s_lowerCorpRoleType" 
				|| divid=="h_corpRoleType" || divid=="d_dataFieldRole"){
				roleId=$(this).parent().parent().attr("roleId");
				if(roleId==undefined || roleId==null || roleId==""){
					showDialog("alert","请先设置角色！", "提示信息", 300);
					return;
				}
				roleName=$(this).parent().parent().attr("roleName");
			}
			var typeId="";
			var typeName="";
			if(divid=="c_corpOrganType" || divid=="c_upperCorpOrganType" || divid=="c_lowerCorpOrganType"
				|| divid=="s_deptOrganType" || divid=="s_upperCorpOrganType" || divid=="s_corpOrganParamOrganType" 
				|| divid=="s_lowerCorpOrganType" || divid=="h_corpOrganType" || divid=="d_dataFieldOrganType"){
				var typeId=$(this).parent().parent().attr("typeId");
				if(typeId==undefined || typeId==null || typeId==""){
					showDialog("alert","请先设置组织类型！", "提示信息", 300);
					return;
				}
				var typeName=$(this).parent().parent().attr("typeName");
			}
			var pOwner = {};
			pOwner.itemId=divid.substring(2);
			pOwner.itemName=createRule[divnId].ruleName;
			pOwner.organId="";
			pOwner.organName="";
			var divType=$(this).parent().attr("type");
			if(divType=="1"){
				pOwner.typeId="creator";
				pOwner.typeName="创建人";
			} else if(divType=="2"){
				pOwner.typeId="sender";
				pOwner.typeName="发送人";
			} else if(divType=="3"){
				pOwner.typeId="historyactselect";
				pOwner.typeName="历史环节处理人";
				var hisActDiv=$(this).parent().parent().children(':eq(1)').find(".historyAct");
					var hisAct=$(hisActDiv).val();
					var hisActName=$(hisActDiv).find("option:selected").text();
					pOwner.organId=hisAct;
					pOwner.organName=hisActName;
			} else if(divType=="4"){
				var dataField=$(this).parent().parent().children(':eq(1)').find(".dField").val().trim();
				if(dataField==null || dataField==""){
					showDialog("alert","相关数据不能为空！", "提示信息", 300);
					return ;
				}
				var dfPatrn=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
				if(!dfPatrn.exec(dataField)){
					showDialog("alert","相关数据必须以英文字母、_或$开头，且遵循java变量命名规范！", "提示信息", 300);
					return false;
				}
				pOwner.typeId="extend";
				pOwner.typeName="扩展项";
				pOwner.organId=dataField;
			}
			if(roleId!=null && roleId!=""){
				if(pOwner.organId!="")
					pOwner.organId+=":";
				if(pOwner.organName!="")
					pOwner.organName+="&";
				pOwner.organId+=roleId;
				pOwner.organName+=roleName;
			}
			if(typeId!=null && typeId!=""){
				if(pOwner.organId!="")
					pOwner.organId+=":";
				if(pOwner.organName!="")
					pOwner.organName+="&";
				pOwner.organId+=typeId;
				pOwner.organName+=typeName;
			}
			var struTypeDiv=$(this).parent().parent().children(':eq(2)').find(".struType");
			if(struTypeDiv.length>0){
				var struType=$(struTypeDiv).val();
				var struTypeName=$(struTypeDiv).find("option:selected").text();
				pOwner.organId+=":"+struType;
				pOwner.organName+="&"+struTypeName;
			}
			pOwner.internalId=pOwner.typeId+"|"+pOwner.itemId+"|"+pOwner.organId;
			addParticipantElement(pOwner);
		});
		if(typeof parent.SD_Dialog == "undefined"){
			parent.SD_Dialog={};
		}
		$(".cBtnSet").bind("click", function(){
			var url=document.URL;
			var preurl=url.substring(url.lastIndexOf("/")+1,url.length);
			url=url.replace(preurl,"");
			url=url+"participantrule/commonly-role.jsp";
			var divId="#"+$(this).attr("id")
			var param = {divId:divId, addRoleList:addRoleDivList[divId]};
			parent.SD_Dialog.showWindow1("选择角色", url, 640, 525, param, afterSetRole);
		});
		function afterSetRole(backData){
			if(backData!=null){
				if(backData.roleId!=null && backData.roleId!=""){
					$(backData.divId).parent().parent().attr("roleId",backData.roleId).attr("roleName",backData.roleName);
					$(backData.divId).val(backData.roleName);
				}else{
					$(backData.divId).parent().parent().removeAttr('roleId').removeAttr('roleName'); 
					$(backData.divId).val("设置角色");
				}
				addRoleDivList[backData.divId]=backData.addRoleList;
			}
		}
		$(".typeBtnSet").bind("click", function(){
			var url=document.URL;
			var preurl=url.substring(url.lastIndexOf("/")+1,url.length);
			url=url.replace(preurl,"");
			url=url+"participantrule/commonly-type.jsp";
			var param = {divId : "#"+$(this).attr("id")};
			parent.SD_Dialog.showWindow1("选择组织类型", url, 640, 525, param, afterSetOrganType);
		});
		function afterSetOrganType(backData){
			if(backData!=null){
				if(backData.typeId!=null && backData.typeId!=""){
					$(backData.divId).parent().parent().attr("typeId",backData.typeId).attr("typeName",backData.typeName);
					$(backData.divId).val(backData.typeName);
				}else{
					$(backData.divId).parent().parent().removeAttr('typeId').removeAttr('typeName'); 
					$(backData.divId).val("设置组织类型");
				}
			}
		}
	}
	
	initPartRule=function(){
		$.ajax({
			type : "POST",
			url:WFlow.fullWebPath+"/command/dispatcher/"
			+ "org.loushang.workflow.modeling.definition.htmlutil.ProcessDefUtil/"
			+ "getPartyRule",
			dataType: "json",
			data:{
				"partId": "context",
				"partName": "上下文相关"
			},
			async : false,
			success : function(data) {
				if(data && data.success){
					if(data.partRule.length==0){
						showDialog("alert","未找到[上下文相关]的规则，请先配置参与者规则！", "提示信息", 300);	
					}else{
						showPartRule(data.partRule);
					}
				}else{
					showDialog("alert",data.errMessage, "提示信息", 300);
				} 
			},
			error:function(){
				showDialog("alert","请求数据出错！", "提示信息", 300);
			}
		});
	}
	
	showPartRule=function(partRuleId){
		var m=0;
		for(var id in partRuleId){
			var trDiv=$("<tr></tr>");
			var ruleId=partRuleId[id].ruleId;
			var tmpRule=createRule[ruleId];
			var idDiv=$("<td><div class='addPic'></div></td>").attr("id",tmpRule.ruleId).attr("nId",ruleId)
					.attr("type",tmpRule.ruleType).addClass("td1");
			var nameDiv=$("<td></td>").addClass("td2");
			if(tmpRule.ruleType=="3"){
				var historyActDiv=$("<select></select>").addClass("historyAct");
				$(nameDiv).append(historyActDiv).append("<span>的"+tmpRule.ruleName+"</span>");
			}else if(tmpRule.ruleType=="4"){
				var dataFiledDiv=$("<input type='text'>").val(tmpRule.dfValue).addClass("dField");
				$(nameDiv).append("<span>相关数据<span>").append(dataFiledDiv).append("<span>"+tmpRule.ruleName.substring(4)+"</span>");
			}else{
				$(nameDiv).append("<span>"+tmpRule.ruleName+"</span>");
			}
			if(tmpRule.ruleId=="s_corpOrganParamOrganType"){
				$(nameDiv).css("height","45px").find("span").css("margin-top","-18px");
			}
			$(trDiv).append(idDiv).append(nameDiv);
			var roleDiv=$("<td></td>");
			if(tmpRule.ruleId=="c_corpRoleType" || tmpRule.ruleId=="c_upperCorpRoleType" || tmpRule.ruleId=="c_lowerCorpRoleType"
				||tmpRule.ruleId=="s_corpRoleType" || tmpRule.ruleId=="s_upperCorpRoleType" || tmpRule.ruleId=="s_lowerCorpRoleType"){
				var roleDiv1=$("<input type='button'>").attr("id",id).addClass("cBtnSet").val("设置角色");
				var roleDiv2=$("<select></select>").addClass("struType");
				$(roleDiv).append(roleDiv1).append(roleDiv2);
			}else if(tmpRule.ruleId=="c_corpOrganType" || tmpRule.ruleId=="c_upperCorpOrganType" || tmpRule.ruleId=="c_lowerCorpOrganType"
				|| tmpRule.ruleId=="s_upperCorpOrganType" || tmpRule.ruleId=="s_lowerCorpOrganType" ||  tmpRule.ruleId=="s_corpOrganParamOrganType"){
				var roleDiv1=$("<input type='button'>").attr("id",id).addClass("typeBtnSet").val("设置组织类型");
				var roleDiv2=$("<select></select>").addClass("struType");
				$(roleDiv).append(roleDiv1).append(roleDiv2);
			}else if(tmpRule.ruleId=="s_deptRoleType" || tmpRule.ruleId=="h_corpRoleType" || tmpRule.ruleId=="d_dataFieldRole"){
				var roleDiv1=$("<input type='button'>").attr("id",id).addClass("cBtnSet").val("设置角色");
				$(roleDiv).append(roleDiv1);
			}else if(tmpRule.ruleId=="s_deptOrganType" || tmpRule.ruleId=="h_corpOrganType" || tmpRule.ruleId=="d_dataFieldOrganType"){
				var roleDiv1=$("<input type='button'>").attr("id",id).addClass("typeBtnSet").val("设置组织类型");
				$(roleDiv).append(roleDiv1);
			}
			$(trDiv).append(roleDiv);
			$("#contextDiv tbody").append(trDiv);
			m++;
		}
		for(;m<7;m++){
			var trDiv=$("<tr><td></td><td></td><td></td></tr>");
			$("#contextDiv tbody").append(trDiv);
		}
	}
	function initPreAct(){
		var preNodes=getPreActs(activity.id);
		for(var actId in preNodes){
			var node=preNodes[actId];
			var option=$("<option></option>").val(node.id).text(node.name);
			$(".historyAct").append(option);
		}
	}
	function getPreActs(actId){
		var nodeDic=parent.WFModel.process.nodeDic;
		var preAct={};
		for(var nodeId in nodeDic){
			var node=nodeDic[nodeId];
			if(node.type=="userTask" && node.id!=actId){
				preAct[node.id]=node;
			}
		}
		var returnAct={};
		for(var preId in preAct){
			if(findRoad(preId, actId)){
				returnAct[preId]=preAct[preId];
			}
		}
		return returnAct;
	}
	function findRoad(startActId, endActId){
		flag=false;
		for(seqId in parent.WFModel.process.seqFlowDic){
			if(flag) break;
			var line=parent.WFModel.process.seqFlowDic[seqId];
			if(line.sourceNode.model.id==startActId){
				if(line.targetNode.model.id==endActId){
					flag=true;
					break;
				}
			}
		}
		return flag;
	}

	var createRule={
			"01":{"ruleId":"c_self", "ruleName":"创建人本人", "ruleType":"1"},
			"02":{"ruleId":"c_directleader", "ruleName":"创建人领导", "ruleType":"1"},
			"03":{"ruleId":"c_directunderling", "ruleName":"创建人下属", "ruleType":"1"},
			"04":{"ruleId":"c_allUpperLeading", "ruleName":"创建人所有上级部门领导", "ruleType":"1"},
			"05":{"ruleId":"c_corpOrganType", "ruleName":"创建人所属法人下组织类型", "ruleType":"1"},
			"06":{"ruleId":"c_upperCorpOrganType", "ruleName":"创建人所属法人的上级法人下组织类型", "ruleType":"1"},
			"07":{"ruleId":"c_lowerCorpOrganType", "ruleName":"创建人所属法人的下级法人下组织类型", "ruleType":"1"},
			"08":{"ruleId":"c_corpRoleType", "ruleName":"创建人所属法人下角色", "ruleType":"1"},
			"09":{"ruleId":"c_upperCorpRoleType", "ruleName":"创建人所属法人的上级法人下角色", "ruleType":"1"},
			"010":{"ruleId":"c_lowerCorpRoleType", "ruleName":"创建人所属法人的下级法人下角色", "ruleType":"1"},
			"11":{"ruleId":"s_self", "ruleName":"发送人本人", "ruleType":"2"},
			"12":{"ruleId":"s_directleader", "ruleName":"发送人领导", "ruleType":"2"},
			"13":{"ruleId":"s_directunderling", "ruleName":"发送人下属", "ruleType":"2"},
			"14":{"ruleId":"s_allUpperLeading", "ruleName":"发送人所有上级部门领导", "ruleType":"2"},
			"15":{"ruleId":"s_deptOrganType", "ruleName":"发送人所属部门下组织类型", "ruleType":"2"},
			"16":{"ruleId":"s_upperCorpOrganType", "ruleName":"发送人所属法人的上级法人下组织类型", "ruleType":"2"},
			"17":{"ruleId":"s_lowerCorpOrganType", "ruleName":"发送人所属法人的下级法人下组织类型", "ruleType":"2"},
			"18":{"ruleId":"s_deptRoleType", "ruleName":"发送人所属部门下角色", "ruleType":"2"},
			"19":{"ruleId":"s_corpRoleType", "ruleName":"发送人所属法人下角色", "ruleType":"2"},
			"110":{"ruleId":"s_upperCorpRoleType", "ruleName":"发送人所属法人的上级法人下角色", "ruleType":"2"},
			"111":{"ruleId":"s_lowerCorpRoleType", "ruleName":"发送人所属法人的下级法人下角色", "ruleType":"2"},
			"112":{"ruleId":"s_corpOrganParamOrganType", "ruleName":"发送人所属法人机构参数（WF_ORGAN_REF）对应组织机构下组织类型", "ruleType":"2"},
			"21":{"ruleId":"h_self", "ruleName":"处理人本人", "ruleType":"3"},
			"22":{"ruleId":"h_leader", "ruleName":"处理人领导", "ruleType":"3"},
			"23":{"ruleId":"h_underling", "ruleName":"处理人下属", "ruleType":"3"},
			"24":{"ruleId":"h_corpOrganType", "ruleName":"处理人所属法人下组织类型", "ruleType":"3"},
			"25":{"ruleId":"h_corpRoleType", "ruleName":"处理人所属法人下角色", "ruleType":"3"},	
			"31":{"ruleId":"d_dataFieldRole", "ruleName":"相关数据下的角色", "ruleType":"4", "dfValue":"bizStruId"},
			"32":{"ruleId":"d_dataFieldOrganType", "ruleName":"相关数据下的组织类型", "ruleType":"4", "dfValue":"bizStruId"}
	};
	
	$(function(){
		initPartRule();
		initPage();
		setStruType("#contextDiv");
		initPreAct();
	});	
	
});