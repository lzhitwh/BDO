package com.inspur.idap.bdo.task.service.impl;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inspur.idap.bdo.task.dao.BDOTaskMapper;
import com.inspur.idap.bdo.task.dao.TaskMappingMapper;
import com.inspur.idap.bdo.task.data.Task;
import com.inspur.idap.bdo.task.data.TaskMapping;
import com.inspur.idap.bdo.task.service.ITaskService;

@Service
public class TaskServiceImpl implements ITaskService {
	@Autowired
	private BDOTaskMapper taskMapper;
	
	@Autowired
	private TaskMappingMapper taskMappingMapper;
	
	@Override
	public List<Task> findAll(Map<String, Object> parameters) {
		return taskMapper.findAll(parameters);
	}

	@Override
	public void deleteById(String taskId) {
		taskMapper.deleteById(taskId);
	}

	@Override
	public void saveFile(String fileDir, String filename, byte[] bytes) {
		String filepath = fileDir + File.separator + filename;
		writeFile(filepath, bytes);
	}
	
	@Override
	public void add(Task task) {
		taskMapper.add(task);
	}

	@Override
	public void update(Task task) {
		taskMapper.update(task);
	}

	@Override
	public void addMapping(TaskMapping taskMapping) {
		taskMappingMapper.add(taskMapping);
	}
	
	@Override
	public void deleteMapping(String id){
		taskMappingMapper.delete(id);
	}

	
	@Override
	public void updateMapping(TaskMapping taskMapping) {
		taskMappingMapper.update(taskMapping);
	}

	@Override
	public List<TaskMapping> findMapping(String id) {
		List<TaskMapping> taskMappingList=null;
		try{
			taskMappingList = taskMappingMapper.findAllId(id);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
		return taskMappingList;
	}

	private void writeFile(String filePath, byte[] bytes) {
		BufferedOutputStream writer = null;
		try {
			writer = new BufferedOutputStream(new FileOutputStream(filePath));
			writer.write(bytes);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (writer != null) {
				try {
					writer.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
