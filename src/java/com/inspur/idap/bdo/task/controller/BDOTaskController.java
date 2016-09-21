package com.inspur.idap.bdo.task.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.oozie.client.OozieClient;
import org.apache.oozie.client.OozieClientException;
import org.loushang.framework.mybatis.PageUtil;
import org.loushang.framework.util.DateUtil;
import org.loushang.framework.util.UUIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.inspur.idap.bdo.cluster.data.ClusterInfo;
import com.inspur.idap.bdo.cluster.service.IClusterService;
import com.inspur.idap.bdo.file.FileZip;
import com.inspur.idap.bdo.file.HdfsClient;
import com.inspur.idap.bdo.task.data.Task;
import com.inspur.idap.bdo.task.data.TaskMapping;
import com.inspur.idap.bdo.task.service.ITaskService;

@Controller
@RequestMapping("/task")
public class BDOTaskController {
	
	@Autowired
	ITaskService taskService;
	@Autowired
	IClusterService clusterService;
	
	@RequestMapping
	public String query() {
		return "bdo/task/querytask";
	}
	
	/**
	 * 获取任务
	 * @param parameters
	 * @return
	 */
	@RequestMapping("/data")
	@ResponseBody
	public Map<String, Object> getData(@RequestBody Map<String, Object> parameters) {
		Map<String, Object> taskData = new HashMap<String, Object>();		
		List<Task> taskArrayList = taskService.findAll(parameters);	
		List<Task> taskList = new ArrayList<Task>();
		Iterator<Task> it = taskArrayList.iterator();
		while(it.hasNext()){
			Task task = (Task) it.next();
			List<ClusterInfo> clusterList = clusterService.findAllId(task.getClusterId());
			if(clusterList.size()>0){
				task.setClusterName(clusterList.get(0).getClusterName());
			}
			taskList.add(task);
		}
		int total = PageUtil.getTotalCount("total");
		taskData.put("draw", parameters.get("draw"));
		taskData.put("total", total);
		taskData.put("data", taskList);
		return taskData;
	}
	
	/**
	 * 运行任务
	 * @param ids
	 * @return
	 */
	@RequestMapping(value= "/run/{ids}")
	@ResponseBody
	public String serviceRun(@PathVariable String ids) {
		String[] idArr = ids.split(",");			//拆分任务ID
		for(String id : idArr) {
			try{
				String instanceId = null;
				TaskMapping taskMapping =  new TaskMapping();
				//获取要启动任务信息。
				Map<String, Object> param = new HashMap<String, Object>();
				param.put("taskId",id);
				Task task = taskService.findAll(param).get(0);	
				
				OozieClient oozieClient = new OozieClient(task.getOozieUrl()); //根据任务中oozie信息生成OozieClient
				Properties properties = oozieClient.createConfiguration();
				
				if(task.getTaskStyle().equals("wf")){				//任务类型为普通任务。
					properties.setProperty(OozieClient.APP_PATH, task.getNameNode()+task.getTaskPath());  //设置流程文件路径。
				}
				if(task.getTaskStyle().equals("cron")){ 			//任务类型为定时任务。
					properties.setProperty(OozieClient.COORDINATOR_APP_PATH, task.getNameNode()+task.getTaskCoordPath());
					properties.setProperty("workflowAppUri", task.getNameNode()+task.getTaskPath());
					properties.setProperty("start", task.getStartTime());
					properties.setProperty("end", task.getEndTime());
				}
				properties.setProperty(OozieClient.USER_NAME,task.getClientName());
				properties.setProperty("jobTracker", task.getJobTracker());
				properties.setProperty("nameNode", task.getNameNode());
				properties.setProperty(OozieClient.USE_SYSTEM_LIBPATH,"true");
				properties.setProperty("workflowName",task.getTaskName());
				properties.setProperty("queueName","default");	
				
				instanceId = oozieClient.run(properties);
				//填写任务与实例对应表。
				taskMapping.setInstanceId(instanceId);
				taskMapping.setTaskId(id);
				taskMapping.setStatus("run");
				taskMapping.setClusterId(task.getClusterId());
				List<ClusterInfo> clusterList = clusterService.findAllId(task.getClusterId());
				if(clusterList!=null){
					if(clusterList.size()>0){
						taskMapping.setClusterName(clusterList.get(0).getClusterName());
					}else{
						taskMapping.setClusterName(null);
					}
				}
				taskService.addMapping(taskMapping);
			}catch(OozieClientException e){
				e.printStackTrace();
			}
		}
		return ids;
	}
	
	/**
	 * 提交任务
	 * @param id
	 */
	@RequestMapping("/submitTask/{id}")
	@ResponseBody
	public void submitTask(@PathVariable String ids) {
		String[] idArr = ids.split(",");
		for(String id : idArr) {
			try{
				String instanceId=null;
				TaskMapping taskMapping = new TaskMapping();
				//获取提交任务信息
				Map<String,Object> param = new HashMap<String,Object>();
				param.put("taskId",id);
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
				properties.setProperty(OozieClient.USER_NAME,task.getClientName());
	//			properties.setProperty(OozieClient.APP_PATH, task.getNameNode()+task.getTaskPath());  //设置流程文件路径。
				properties.setProperty("jobTracker", task.getJobTracker());
				properties.setProperty("nameNode", task.getNameNode());
				properties.setProperty(OozieClient.USE_SYSTEM_LIBPATH,"true");
				properties.setProperty("workflowName",task.getTaskName());
				properties.setProperty("queueName","default");	
				
				instanceId = oozieClient.submit(properties);
				
				taskMapping.setInstanceId(instanceId);
				taskMapping.setTaskId(id);
				taskMapping.setStatus("submit");
				
				taskMapping.setClusterId(task.getClusterId());
				List<ClusterInfo> clusterList = clusterService.findAllId(task.getClusterId());
				if(clusterList!=null){
					if(clusterList.size()>0){
						taskMapping.setClusterName(clusterList.get(0).getClusterName());
					}else{
						taskMapping.setClusterName(null);
					}
				}
				
				taskService.addMapping(taskMapping);
				
			}catch(Exception e){
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 跳转到导入任务界面
	 * @return
	 */
	@RequestMapping("/forAdd")
	public String forAdd() {
		return "bdo/task/wftask";
	}
	
	/**
	 * 添加任务
	 * @param task
	 * @return
	 */
	@RequestMapping("/addTask")
	public String addTask(Task task) {
		task.setTaskId(UUIDGenerator.getUUID()); 		//设置任务Id
		task.setCreateTime(DateUtil.getCurrentTime());
		task.setUpdateTime(DateUtil.getCurrentTime());
		String time = task.getTaskStyle();
		if("cron".equals(time)){
			//将开始时间与结束时间变成格式为2010-01-01T00:00Z样式
			String[] dateTimeList=task.getStartTime().split(" ");
			String dateTime=dateTimeList[0]+'T'+dateTimeList[1]+'Z';
			task.setStartTime(dateTime);
			
			dateTimeList=task.getEndTime().split(" ");
			dateTime=dateTimeList[0]+'T'+dateTimeList[1]+'Z';
			task.setEndTime(dateTime);
		}
	
		//在集群中获取任务所需信息。
		ClusterInfo cluster=clusterService.findAllId(task.getClusterId()).get(0);
		task.setJobTracker(cluster.getJobtracker());
		task.setNameNode(cluster.getNameNode());
		task.setOozieUrl(cluster.getOozieUrl());
		task.setClientName(cluster.getClientName());
		task.setQueueName("defalut");
		
		taskService.add(task);
		return "bdo/task/wftask";
	}
	
	/**
	 * 
	 * @param id
	 */
	@RequestMapping("/forUpdate/{id}")
	@ResponseBody
	public ModelAndView forUpdate(@PathVariable String id) {
		
		Map<String, Object> parameters = new HashMap<String, Object>();
		parameters.put("taskId",id);
		parameters.put("start", 0);
		parameters.put("limit", 10);
		List<Task> taskList = taskService.findAll(parameters);
		
        Map<String, Object> model = new HashMap<String, Object>();
        
        Task task = taskList.get(0);
        ClusterInfo cluster = clusterService.findAllId(task.getClusterId()).get(0);
        task.setClusterName(cluster.getClusterName());
        if("cron".equals(task.getTaskStyle())){
	        Pattern p = Pattern.compile("[a-zA-Z]");
	        Matcher m = p.matcher(task.getStartTime());
	        String startTime = m.replaceAll(" ");
	        task.setStartTime(startTime);
	        m = p.matcher(task.getEndTime());
	        task.setEndTime(m.replaceAll(" ").trim());
        }
        
        String url = "bdo/task/wftask";
//      model.put("object",taskList.get(0));
        model.put("object",task);
        return new ModelAndView(url, model);
	}
	
	/**
	 *
	 * @param task
	 * @return
	 */
	@RequestMapping("/updateTask")
	public String updateTask(Task task) {
		task.setUpdateTime(DateUtil.getCurrentTime());
		String time = task.getTaskStyle();
		if("cron".equals(time)){
			//将开始时间与结束时间变成格式为2010-01-01T00:00Z样式
			String[] dateTimeList=task.getStartTime().split(" ");
			String dateTime=dateTimeList[0]+'T'+dateTimeList[1]+'Z';
			task.setStartTime(dateTime);
			
			dateTimeList=task.getEndTime().split(" ");
			dateTime=dateTimeList[0]+'T'+dateTimeList[1]+'Z';
			task.setEndTime(dateTime);
		}
		taskService.update(task);
		return "bdo/task/wftask";
	}
	
	/**
	 * @param id
	 */
	@RequestMapping("/batchDel/{ids}")
	@ResponseBody
	public void batchDel(@PathVariable String ids) {
		String[] idArr = ids.split(",");
		for(String id : idArr) {
			taskService.deleteById(id);
		}
	}
	
	/**
	 * 通过文件名检索相关任务。
	 * @param 检索条件
	 * 
	 */
	@RequestMapping("/searchTask")
	@ResponseBody
	public Map<String, Object> searchTask(@RequestBody Map<String,Object> param){
		Map<String,Object> taskData = new HashMap<String,Object>();

		List<Task> taskList = taskService.findAll(param);	
		int total = PageUtil.getTotalCount("total");
		taskData.put("draw", param.get("draw"));
		taskData.put("total", total);
		taskData.put("data", taskList);
		return taskData;
		
	}

	// 文件上传
	@RequestMapping(value = "/upload")
	@ResponseBody
	public Map<String,String> handleFileUpload(HttpServletRequest request, @RequestParam("file") MultipartFile file) throws Exception {
		Map<String,String> data = new HashMap<String,String>();			//用于返回前台路径
		String filePath=null;		//记录流程文件workflow.xml的路径
		String coordPath=null;		//记录定时文件coordinator.xml的路径
		HdfsClient hdfsClient = new HdfsClient("hdfs://10.110.18.74:8020");
		
		if (!file.isEmpty()) {
			String time = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());  	//获取时间，作为文件夹名称。
			String filename = new String(request.getParameter("filename").getBytes("ISO-8859-1"), "utf-8");
			
			String pathDir = "D:"+File.separator+"uploadfile"+File.separator+time;  //设置服务器系统路径，用于接收压缩文件。
			String pathOut = pathDir+File.separator+time;		 					//设置服务器系统路径，用于接收解压文件。
			String hdfsDir = "/user/ambari-qa/workflow/"+time;   					//设置Hdfs路径，用于执行。
			
			try {
				byte[] bytes = file.getBytes();
				File dstFile = new File(pathDir);
				if (!dstFile.exists()) {
					dstFile.mkdirs();
				}
				taskService.saveFile(pathDir, filename, bytes);  //将文件从客户端复制到服务器端。
				
				FileZip fileZip = FileZip.getInstance();
				fileZip.unzip((pathDir+File.separator+filename),pathOut);	//解压文件
	
				hdfsClient.createFolder(hdfsDir); 				//在Hdfs文件系统下创建与时间相关目录。
				
				ArrayList<File> files = new ArrayList<File>();  //用于存储文件
				files = fileZip.getFiles(pathOut);
				
				for(Iterator<File> it = files.iterator();it.hasNext();){
					File fileOutput = (File) it.next();
					String pathRelative = fileOutput.getAbsolutePath();
					String pathRelativeName = pathRelative.replace(pathOut,"");
					pathRelativeName = pathRelativeName.replace("\\","/");
//					pathRelative = fileOutput.getName();
					pathRelative = pathRelativeName.replace(fileOutput.getName(),"");  //获取相对路径
					
					if(fileOutput.getName().equals("workflow.xml")){
						filePath = hdfsDir+pathRelative;
					}
					if(fileOutput.getName().equals("coordinator.xml")){
						coordPath = hdfsDir+pathRelative;
					}
					
					if((!pathRelative.equals(null))&&(!"".equals(pathRelative))){ //判断相对路径非空
						if(!hdfsClient.checkFileExist(hdfsDir+pathRelative)){	  //判断文件夹是否存在
							hdfsClient.createFolder(hdfsDir+pathRelative);
						}
					}else{
					}
					hdfsClient.createFile(hdfsDir+pathRelativeName);
					if("jar".equals(HdfsClient.getExtensionName(fileOutput.getAbsolutePath()))){
						hdfsClient.copyJarToHDFS(hdfsDir+pathRelativeName,fileOutput.getAbsolutePath());
					}else{
						hdfsClient.copyFileToHDFS(hdfsDir+pathRelativeName,fileOutput.getAbsolutePath());
					}
				}
				data.put("filePath",filePath);
				data.put("coordPath",coordPath);
				return data;
			} catch (Exception e) {
				e.printStackTrace();
				data.put("filePath",null);
				data.put("coordPath",null);
				return data;
			}
		}else {
			data.put("filePath",null);
			return data;
		}
	}
}
