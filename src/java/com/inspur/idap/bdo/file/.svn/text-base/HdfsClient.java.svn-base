package com.inspur.idap.bdo.file;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.URI;
import java.util.Date;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.BlockLocation;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.hdfs.DistributedFileSystem;
import org.apache.hadoop.hdfs.protocol.DatanodeInfo;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.io.compress.CompressionCodec;
import org.apache.hadoop.io.compress.CompressionCodecFactory;

public class HdfsClient {
	
//	private static String nameNode = null;
	private static Configuration conf = new Configuration();
	private static FileSystem fs = null;
	private static DistributedFileSystem hdfs = null;
	
	public HdfsClient(String uri){
		try{
			fs = FileSystem.get(URI.create(uri),conf);
			hdfs = (DistributedFileSystem) fs;
		}catch(Exception e){
			e.printStackTrace();
		}
	}

//	static {
//		try {
//			fs = FileSystem.get(URI.create(nameNode),conf);
//			hdfs = (DistributedFileSystem) fs;
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}

	/**
	 *	列出所有DataNode的名字信息。
	 */
	public String[] listDataNodeInfo() {
		try {
			DatanodeInfo[] dataNodeStats = hdfs.getDataNodeStats();
			String[] names = new String[dataNodeStats.length];

			for (int i = 0; i < names.length; i++) {
				names[i] = dataNodeStats[i].getHostName();
				System.out.println(names[i]);
			}
			return names;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 查看文件是否存在
	 */
	public boolean checkFileExist(String path) {
		try {
//			Path a = hdfs.getHomeDirectory();
//			System.out.println("main path:" + a.toString());
			Path f = new Path(path);
			boolean exist = fs.exists(f);
//			System.out.println("Whether exist of this file:" + exist);
			return exist;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 *  在HDFS系统上创建文件。
	 */
	public void createFile(String path) {
		try {
			Path f = new Path(path);
			FSDataOutputStream os = fs.create(f, true);
			os.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public boolean deleteFile(String path){
		try {
			Path f = new Path(path);
			boolean exist = fs.exists(f);
			//删除相应文件
			if (exist) {
			     boolean isDeleted = hdfs.delete(f, false);
			     return isDeleted;
			 }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 读取本地文件到HDFS系统
	 * 请保证文件格式一直是UTF-8，从本地->HDFS
	 */
	public void copyFileToHDFS(String hdfsPath,String filePath) {
		try {
			Path f = new Path(hdfsPath);
			File file = new File(filePath);

			FileInputStream is = new FileInputStream(file);
			InputStreamReader isr = new InputStreamReader(is, "utf-8");
			BufferedReader br = new BufferedReader(isr);

			FSDataOutputStream os = fs.create(f, true);
			Writer out = new OutputStreamWriter(os, "utf-8");

			String str = "";
			while ((str = br.readLine()) != null) {
				out.write(str + "\n");
			}
			br.close();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 使用字节流读取文件，主要用于Jar文件的读取操作。
	 */
	public void copyJarToHDFS(String hdfsPath,String filePath){
	   
		try {
			Path f = new Path(hdfsPath);
			File file = new File(filePath);

			BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));

			FSDataOutputStream os = fs.create(f, true);
			BufferedOutputStream bos = new BufferedOutputStream(os);
			byte[] bys = new byte[1024];
			int len = 0;
			while ((len = bis.read(bys)) != -1) {
			   bos.write(bys, 0, len);
			}
			bos.close();
			bis.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	

	/**
	 * 取得文件块所在的位置.
	 */
	public void getLocation(String path) {
		try {
			Path f = new Path(path);
			FileStatus fileStatus = fs.getFileStatus(f);

			BlockLocation[] blkLocations = fs.getFileBlockLocations(fileStatus,
					0, fileStatus.getLen());
			for (BlockLocation currentLocation : blkLocations) {
				String[] hosts = currentLocation.getHosts();
				for (String host : hosts) {
					System.out.println(host);
				}
			}

			// 取得最后修改时间
			long modifyTime = fileStatus.getModificationTime();
			Date d = new Date(modifyTime);
			System.out.println(d);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 读取hdfs中的文件内容
	 */
	public void readFileFromHdfs(String path) {
		try {
			Path f = new Path(path);

			FSDataInputStream dis = fs.open(f);
			InputStreamReader isr = new InputStreamReader(dis, "utf-8");
			BufferedReader br = new BufferedReader(isr);
			String str = "";
			while ((str = br.readLine()) != null) {
				System.out.println(str);
		}
		br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public boolean createFolder(String path){
		try{
			return hdfs.mkdirs(new Path(path));
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
	
	
	// 使用文件扩展名来推断相应的codec来对文件进行解压缩
    public void uncompress(String uri) throws IOException {
        Configuration conf = new Configuration();
        uri = "hdfs://10.110.18.74:8020"+uri;
        FileSystem fs = FileSystem.get(URI.create(uri), conf);
 
        Path inputPath = new Path(uri);
        CompressionCodecFactory factory = new CompressionCodecFactory(conf);
        CompressionCodec codec = factory.getCodec(inputPath);
        if (codec == null) {
            System.out.println("no codec found for " + uri);
            return ;
//            System.exit(1);
        }
        String outputUri = CompressionCodecFactory.removeSuffix(uri,
                codec.getDefaultExtension());
        InputStream in = null;
        OutputStream out = null;
        try {
            in = codec.createInputStream(fs.open(inputPath));
            out = fs.create(new Path(outputUri));
            IOUtils.copyBytes(in, out, conf);
        } finally {
            IOUtils.closeStream(out);
            IOUtils.closeStream(in);
        }
    }
    
    
    public static String getExtensionName(String filename) {   
        if ((filename != null) && (filename.length() > 0)) {   
            int dot = filename.lastIndexOf('.');   
            if ((dot >-1) && (dot < (filename.length() - 1))) {   
                return filename.substring(dot + 1);   
            }   
        }   
        return filename;   
    } 

//	public static void main(String[] args) {
//		HdfsUtilDemo a = new HdfsUtilDemo();
//		// a.listDataNodeInfo();
//		// a.checkFileExist();
//		// a.createFile();
//		// a.copyFileToHDFS();
//		// a.getLocation();
//		a.readFileFromHdfs();
//	}
}
