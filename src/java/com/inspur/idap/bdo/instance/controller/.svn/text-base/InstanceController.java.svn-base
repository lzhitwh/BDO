package com.inspur.idap.bdo.instance.controller;

import java.io.File;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.oozie.client.OozieClient;
import org.apache.oozie.client.OozieClientException;
import org.apache.oozie.client.WorkflowJob;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.inspur.idap.bdo.cluster.data.ClusterInfo;
import com.inspur.idap.bdo.cluster.service.IClusterService;
import com.inspur.idap.bdo.instance.data.Instance;
import com.inspur.idap.bdo.instance.service.IInstanceService;
import com.inspur.idap.bdo.task.data.Task;
import com.inspur.idap.bdo.task.data.TaskMapping;
import com.inspur.idap.bdo.task.service.ITaskService;

@Controller
@RequestMapping(value = "/instance")
public class InstanceController {
	
	@Autowired
	IInstanceService instanceService;
	@Autowired
	ITaskService taskService;
	@Autowired
	IClusterService clusterService;
	
	@RequestMapping
	public String query() {
		return "bdo/instance/queryinstance";
	}
	
	/**
	 * 获取任务实例
	 * @param parameters
	 * @return
	 */
	@RequestMapping(value = "/data")
	@ResponseBody
	public Map<String, Object> getData(@RequestBody Map<String, Object> parameters) {
		
		OozieClient oozieClient=null;
		Map<String, Object> instancedata = new HashMap<String, Object>();
		List<Instance> instanceList = new ArrayList<Instance>();
		int num=0;										//任务实例总数目
		int start=(Integer) parameters.get("start");	//获取数据开始位置
		int limit=(Integer) parameters.get("limit");	//获取请求数据长度
		String clusterId = (String)parameters.get("clusterId");
		try {
			if((clusterId==null)||(clusterId=="")){
				instancedata.put("draw", parameters.get("draw"));
				instancedata.put("total", num);
				instancedata.put("data",instanceList);
				return instancedata;
			}else{
				ClusterInfo cluster = clusterService.findAllId(clusterId).get(0);
				String oozieUrl = cluster.getOozieUrl();
				oozieClient = new OozieClient(oozieUrl);
			}
			ArrayList<WorkflowJob> workflowJobListAll = (ArrayList<WorkflowJob>)oozieClient.getJobsInfo(null);
			ArrayList<WorkflowJob> workflowJobList= new ArrayList<WorkflowJob>();
			String appName = (String) parameters.get("jobName");
			if(appName!=null){
				
				Iterator<WorkflowJob> it = workflowJobListAll.iterator();
				while(it.hasNext()){
					WorkflowJob workflowJob = it.next();
					if(workflowJob.getAppName().contains(appName)){
						workflowJobList.add(workflowJob);
					}
				}
			}else{
				workflowJobList = workflowJobListAll;
			}
			num = workflowJobList.size();
			for(int len=start;(len<num)&&(len<(start+limit));len++){
				Instance instance = new Instance();
				instance.setJobId(workflowJobList.get(len).getId());
				instance.setJobName(workflowJobList.get(len).getAppName());
				instance.setJobCreated(workflowJobList.get(len).getCreatedTime().toString());
				instance.setJobRun(""+workflowJobList.get(len).getRun());
				instance.setJobStatus(workflowJobList.get(len).getStatus().toString());
				instance.setJobUser(workflowJobList.get(len).getUser());
				instanceList.add(instance);
			}
			
		} catch (OozieClientException e) {
			e.printStackTrace();
		}
		instancedata.put("draw", parameters.get("draw"));
		instancedata.put("total", num);
		instancedata.put("data", instanceList);
		return instancedata;
	}
	
	/**
	 * 启动任务主要用于用户提交的任务。
	 * param:id
	 */
	@RequestMapping(value="/runInstance/{id}")
	@ResponseBody
	public void runInstance(@PathVariable String id){
		String[] taskId = id.split(",");
		for(String runId:taskId){
			List<TaskMapping> taskMappingList = taskService.findMapping(runId);
			TaskMapping taskMapping = taskMappingList.get(0);
			
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("taskId",taskMapping.getTaskId());
			Task task = taskService.findAll(param).get(0);	
		
			OozieClient oozieClient = new OozieClient(task.getOozieUrl());
			
			if("submit".equals(taskMapping.getStatus())){
				try{
					oozieClient.start(runId);
					taskMapping.setStatus("run");
					taskService.updateMapping(taskMapping);
				}catch(OozieClientException e){
					e.printStackTrace();
				}
			}
		}
	}
	
	/**
	 * 暂停任务
	 * @param id
	 */
	@RequestMapping("/pauseInstance/{id}")
	@ResponseBody
	public void pauseInstance(@PathVariable String id) {
		
		String[] taskId = id.split(",");
		for(String runId:taskId){
			
			List<TaskMapping> taskMappingList = taskService.findMapping(runId);
			TaskMapping taskMapping = taskMappingList.get(0);
			
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("taskId",taskMapping.getTaskId());
			Task task = taskService.findAll(param).get(0);	
		
			OozieClient oozieClient = new OozieClient(task.getOozieUrl());
			
			try{
				oozieClient.suspend(runId);
			}catch(OozieClientException e){
				e.printStackTrace();
			}
		}
	}
	
	
	/**
	 *恢复实例 
	 * @param id
	 */
	@RequestMapping("/resume/{id}")
	@ResponseBody
	public void resume(@PathVariable String id) {
		
		String[] taskId = id.split(",");
		for(String runId:taskId){
			List<TaskMapping> taskMappingList = taskService.findMapping(runId);
			TaskMapping taskMapping = taskMappingList.get(0);
			
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("taskId",taskMapping.getTaskId());
			Task task = taskService.findAll(param).get(0);	
		
			OozieClient oozieClient = new OozieClient(task.getOozieUrl());
			
			try{
				oozieClient.resume(runId);
			}catch(OozieClientException e){
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 结束实例
	 * @param id
	 */
	@RequestMapping("/endInstance/{ids}")
	@ResponseBody
	public void endInstance(@PathVariable String ids) {
		String[] idArr = ids.split(",");
		for(String id : idArr) {
			List<TaskMapping> taskMappingList = taskService.findMapping(id);
			TaskMapping taskMapping = taskMappingList.get(0);
			
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("taskId",taskMapping.getTaskId());
			Task task = taskService.findAll(param).get(0);	
		
			OozieClient oozieClient = new OozieClient(task.getOozieUrl());
			try{
				oozieClient.kill(id);
			}catch(OozieClientException e){
				e.printStackTrace();
			}
		}
	}
	
	
	/**
	 * 重启任务。
	 * @param id
	 */
	@RequestMapping("/restart/{id}")
	@ResponseBody
	public void restart(@PathVariable String id) {
		
		//获取提交任务信息
		List<TaskMapping> taskMappingList = taskService.findMapping(id);
		TaskMapping taskMapping = taskMappingList.get(0);
		
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("taskId",taskMapping.getTaskId());
		Task task = taskService.findAll(param).get(0);	
		OozieClient oozieClient = new OozieClient(task.getOozieUrl());

		Properties properties = oozieClient.createConfiguration();
		
		if(task.getTaskStyle().equals("wf")){			//任务类型为普通任务。
			properties.setProperty(OozieClient.APP_PATH, task.getNameNode()+task.getTaskPath());  //设置流程文件路径。
		}
		if(task.getTaskStyle().equals("cron")){ 			//任务类型为定时任务。
			properties.setProperty(OozieClient.COORDINATOR_APP_PATH, task.getNameNode()+task.getTaskCoordPath());
			properties.setProperty("workflowAppUri", task.getNameNode()+task.getTaskPath());
			properties.setProperty("start", task.getStartTime());
			properties.setProperty("end", task.getEndTime());
		}
		properties.setProperty(OozieClient.USER_NAME,task.getTaskName());
//		properties.setProperty(OozieClient.APP_PATH, task.getNameNode()+task.getTaskPath());  //设置流程文件路径。
		properties.setProperty("jobTracker", task.getJobTracker());
		properties.setProperty(OozieClient.USE_SYSTEM_LIBPATH,"true");
		properties.setProperty("queueName","default");	
		properties.setProperty(OozieClient.RERUN_FAIL_NODES,"true"); //设置重新运行所有节点。
		
		try{
			oozieClient.reRun(id, properties);
		}catch(OozieClientException e){
			e.printStackTrace();
		}
		
	}
	
	
	/**
	 * 获取日志信息
	 * @param ids
	 */
	@RequestMapping("/checkLog/{id}")
	@ResponseBody
	public String checkLog(@PathVariable String id) {
		String log = null;
		
		List<TaskMapping> taskMappingList = taskService.findMapping(id);
		TaskMapping taskMapping = taskMappingList.get(0);
		
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("taskId",taskMapping.getTaskId());
		Task task = taskService.findAll(param).get(0);	
	
		OozieClient oozieClient = new OozieClient(task.getOozieUrl());
		
		try{
			log = oozieClient.getJobLog(id);
			PrintStream ps = new PrintStream(new File("D:\\log\\log"));
			oozieClient.getJobErrorLog(id, ps);
			if((log.equals(null))||(log.equals(""))){
				return "无日志信息";
			}
		}catch(OozieClientException e){
			e.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}
		return log;
	}
}
