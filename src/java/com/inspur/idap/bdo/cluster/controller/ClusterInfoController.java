package com.inspur.idap.bdo.cluster.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringEscapeUtils;
import org.loushang.framework.mybatis.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.inspur.idap.bdo.cluster.data.ClusterInfo;
import com.inspur.idap.bdo.cluster.service.IClusterService;

@Controller
@RequestMapping(value="/cluster")
public class ClusterInfoController {
	
	@Autowired
	private IClusterService clusterService; 
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value="/clusterConf")
	public String getClusterConf(){
		return "bdo/cluster/clusterconf";
	}
	
	/**
	 * 添加集群信息。
	 * @return
	 */
	@RequestMapping(value="/setCluster")
	public String setCluster(){
		return "bdo/cluster/clusteradd";
	}
	
	/**
	 * 获取所有集群信息
	 * @return List 
	 */
	@RequestMapping(value = "/getClusterInfo")
	@ResponseBody
	public Map<String,Object> getAllCluster(@RequestBody Map<String,Object> parameters) {
		List<ClusterInfo> clusterList = new ArrayList<ClusterInfo>();
		Map<String,Object> data = new HashMap<String,Object>();
		
		clusterList = clusterService.findAll(parameters);

		int total = PageUtil.getTotalCount("total");
		data.put("draw", parameters.get("draw"));
		data.put("total", total);
		data.put("data", clusterList);
		return data;
	}
	
	@RequestMapping(value="/getClusterMenu")
	@ResponseBody
	public Map<String,Object> getAllCluster() {
		List<ClusterInfo> clusterList = new ArrayList<ClusterInfo>();
     
		Map<String,Object> data = new HashMap<String,Object>();
		clusterList = clusterService.findAll(data);
		data.put("clusterList", clusterList);
		return data;
	}
	
	/**
	 * 添加集群。
	 * @param clusterInfo
	 * @return
	 */
	@RequestMapping(value="/addCluster")
	public String addCluster(ClusterInfo clusterInfo){
		clusterInfo.setClusterId(new java.text.SimpleDateFormat("yyyyMMddHHmmss")
				.format(new java.util.Date()));
		
		String clusterName = clusterInfo.getClusterName();
		String clientName = clusterInfo.getClientName();
		clusterInfo.setClusterName(StringEscapeUtils.escapeHtml(clusterName));
		clusterInfo.setClientName(StringEscapeUtils.escapeHtml(clientName));
		clusterService.add(clusterInfo);
		return "/bdo/cluster/clusterConf";
	}
	
	/**
	 * 删除集群
	 * @param ids
	 */
	@RequestMapping(value="/delCluster/{ids}")
	@ResponseBody
	public void batchDel(@PathVariable String ids) {
		String[] idArr = ids.split(",");
		for(String id : idArr) {
			clusterService.deleteById(id);
		}
	}
	
	/**
	 * 更新集群
	 * @param clusterInfo
	 * @return
	 */
	@RequestMapping(value="/updateClusterInfo")
	public String updateCluster(ClusterInfo clusterInfo){
		String clusterName = clusterInfo.getClusterName();
		String clientName = clusterInfo.getClientName();
		clusterInfo.setClusterName(StringEscapeUtils.escapeHtml(clusterName));
		clusterInfo.setClientName(StringEscapeUtils.escapeHtml(clientName));
		clusterService.update(clusterInfo);
		return "/bdo/cluster/clusterConf";
	}
	
	/**
	 * 
	 * @param id
	 */
	@RequestMapping("/forUpdate/{id}")
	@ResponseBody
	public ModelAndView forUpdate(@PathVariable String id) {
		List<ClusterInfo> clusterList = clusterService.findAllId(id);
		
        Map<String, Object> model = new HashMap<String, Object>();
        ClusterInfo cluster = clusterList.get(0);
        String url = "bdo/cluster/clusteradd";
        model.put("object", cluster);
        return new ModelAndView(url, model);
	}
}
