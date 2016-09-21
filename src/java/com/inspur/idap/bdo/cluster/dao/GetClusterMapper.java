package com.inspur.idap.bdo.cluster.dao;

import java.util.List;
import java.util.Map;

import com.inspur.idap.bdo.cluster.data.ClusterInfo;

public interface GetClusterMapper {
	
	List<ClusterInfo> findAll(Map<String, Object> parameters);
	
	List<ClusterInfo> findAllId(String clusterId);
	
	void add(ClusterInfo clusterInfo);
	
	void update(ClusterInfo clusterInfo);
	
	void deleteById(String taskId);
}
