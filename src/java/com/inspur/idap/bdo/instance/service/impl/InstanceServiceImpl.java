package com.inspur.idap.bdo.instance.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.inspur.idap.bdo.instance.dao.InstanceMapper;
import com.inspur.idap.bdo.instance.data.Instance;
import com.inspur.idap.bdo.instance.service.IInstanceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("InstanceService")
public class InstanceServiceImpl implements IInstanceService{

	@Autowired
	private InstanceMapper instanceMapper;
	@Override
	public List<Instance> findAll(Map<String, Object> params) {
		return instanceMapper.findAll(params);
	}
	
	@Override
	public List<Instance> findAll() {
		Map map = new HashMap();
		map.put("limit", -1);
		return instanceMapper.findAll(map);
	}
	
	/**
	 * 删除实例
	 */
	@Override
	public void deleteById(String id) {
		instanceMapper.deleteById(id);
	}
}
