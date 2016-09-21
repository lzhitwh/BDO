package com.inspur.idap.bdo.instance.service;

import java.util.List;
import java.util.Map;

import com.inspur.idap.bdo.instance.data.Instance;

public interface IInstanceService {

	public  List<Instance> findAll(Map<String, Object> params);

	public List<Instance> findAll();

	public void deleteById(String id);
}
