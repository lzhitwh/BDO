package com.inspur.idap.bdo.task.data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "WF_TASK_MAP")
public class TaskMapping {
	@Id
	@Column(name = "TASK_ID")
	String taskId;
	
	@Column(name = "INSTANCE_ID")
	String instanceId;
	
	@Column(name = "STATUS")
	String status;
	
	@Column(name="CLUSTER_ID")
	String clusterId;
	
	@Column(name="CLUSTER_NAME")
	String clusterName;

	public String getClusterId() {
		return clusterId;
	}

	public void setClusterId(String clusterId) {
		this.clusterId = clusterId;
	}

	public String getClusterName() {
		return clusterName;
	}

	public void setClusterName(String clusterName) {
		this.clusterName = clusterName;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getInstanceId() {
		return instanceId;
	}

	public void setInstanceId(String instanceId) {
		this.instanceId = instanceId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}
