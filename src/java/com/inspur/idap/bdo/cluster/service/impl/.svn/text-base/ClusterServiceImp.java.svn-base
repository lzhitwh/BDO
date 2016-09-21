package com.inspur.idap.bdo.cluster.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inspur.idap.bdo.cluster.dao.GetClusterMapper;
import com.inspur.idap.bdo.cluster.data.ClusterInfo;
import com.inspur.idap.bdo.cluster.service.IClusterService;


@Service
public class ClusterServiceImp implements IClusterService{

	@Autowired
	private GetClusterMapper clusterMapper;
		
	@Override
	public List<ClusterInfo> findAll(Map<String, Object> parameters) {
		List<ClusterInfo> listCluster = null;
		listCluster = clusterMapper.findAll(parameters);
//		System.out.println(listCluster.get(0));
		return listCluster;
	}
	
	@Override
	public List<ClusterInfo> findAllId(String clusterId){
		List<ClusterInfo> listCluster = null;
		listCluster = clusterMapper.findAllId(clusterId);
		return listCluster;
	}
	

	@Override
	public void deleteById(String taskId) {
		clusterMapper.deleteById(taskId);
	}

	@Override
	public void add(ClusterInfo cluster) {
		clusterMapper.add(cluster);
	}

	@Override
	public void update(ClusterInfo clusterInfo) {
		clusterMapper.update(clusterInfo);
	}
}
