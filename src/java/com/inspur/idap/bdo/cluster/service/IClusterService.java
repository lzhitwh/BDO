package com.inspur.idap.bdo.cluster.service;

import java.util.List;
import java.util.Map;

import com.inspur.idap.bdo.cluster.data.ClusterInfo;

public interface IClusterService {

	public List<ClusterInfo> findAll(Map<String, Object> parameters);
	
	public List<ClusterInfo> findAllId(String clusterId);
	
	public void deleteById(String id);
	
	public void add(ClusterInfo clusterInfo);
	
	public void update(ClusterInfo clusterInfo);
}
