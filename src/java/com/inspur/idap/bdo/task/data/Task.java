package com.inspur.idap.bdo.task.data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "WF_TASK")
public class Task {
	@Id
	@Column(name = "TASK_ID")
	String taskId;
	
	@Column(name = "TASK_NAME")
	String taskName;
	
	@Column(name = "CREATE_TIME")
	String createTime;
	
	@Column(name = "UPDATE_TIME")
	String updateTime;
	
	@Column(name = "NAME_NODE")
	String nameNode;
	
	@Column(name = "JOB_TRACKER")
	String jobTracker;
	
	@Column(name = "QUEUE_NAME")
	String queueName;
	
	@Column(name = "TASK_PATH")
	String taskPath;
	
	@Column(name = "CLUSTER_ID")
	String clusterId;
	
	@Column(name="OOZIE_URL")
	String oozieUrl;
	
	@Column(name="CLIENT_NAME")
	String clientName;
	
	@Column(name="TASK_TYPE")
	String taskStyle;
	
	@Column(name="TASK_COORDPATH")
	String taskCoordPath;
	
	@Column(name="START_TIME")
	String startTime;
	
	@Column(name="END_TIME")
	String endTime;
	
	String clusterName;
	

	public String getTaskStyle() {
		return taskStyle;
	}

	public void setTaskStyle(String taskStyle) {
		this.taskStyle = taskStyle;
	}

	public String getClusterName() {
		return clusterName;
	}

	public void setClusterName(String clusterName) {
		this.clusterName = clusterName;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getTaskCoordPath() {
		return taskCoordPath;
	}

	public void setTaskCoordPath(String taskCoordPath) {
		this.taskCoordPath = taskCoordPath;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getOozieUrl() {
		return oozieUrl;
	}

	public void setOozieUrl(String oozieUrl) {
		this.oozieUrl = oozieUrl;
	}

	public String getTaskId(){
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	public String getNameNode() {
		return nameNode;
	}

	public void setNameNode(String nameNode) {
		this.nameNode = nameNode;
	}

	public String getJobTracker() {
		return jobTracker;
	}

	public void setJobTracker(String jobTracker) {
		this.jobTracker = jobTracker;
	}

	public String getQueueName() {
		return queueName;
	}

	public void setQueueName(String queueName) {
		this.queueName = queueName;
	}

	public String getTaskPath() {
		return taskPath;
	}

	public void setTaskPath(String taskPath) {
		this.taskPath = taskPath;
	}

	public String getClusterId() {
		return clusterId;
	}

	public void setClusterId(String clusterId) {
		this.clusterId = clusterId;
	}
}
