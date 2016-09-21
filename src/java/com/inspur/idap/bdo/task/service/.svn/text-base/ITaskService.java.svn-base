package com.inspur.idap.bdo.task.service;

import java.util.List;
import java.util.Map;

import com.inspur.idap.bdo.task.data.Task;
import com.inspur.idap.bdo.task.data.TaskMapping;

public interface ITaskService {
	
	public List<Task> findAll(Map<String, Object> parameters);
	
	public void deleteById(String id);
	
	/**
	 * @param fileDir
	 * @param filename
	 * @param bytes
	 */
	public void saveFile(String fileDir, String filename, byte[] bytes);
	
	/**
	 *
	 * @param task
	 */
	public void add(Task task);
	
	/**
	 * 
	 * @param task
	 */
	public void update(Task task);
	
	/**
	 * 
	 * @param taskId
	 * @param instanceId	
	 * @param status
	 */
	public void addMapping(TaskMapping taskMapping);
	
	public void deleteMapping(String id);
	
	public void updateMapping(TaskMapping taskMaping);
	
	public List<TaskMapping> findMapping(String id);
}
