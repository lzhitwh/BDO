package com.inspur.idap.bdo.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

public class FileZip {
	
	 private static final int BUFFEREDSIZE = 1024;
	 private static FileZip instance = new FileZip();
	 
	 private FileZip() {
	 }
	 
	 public static FileZip getInstance() {
		 return instance;
	 }
	 
	 /**
	  * 压缩文件或者文件目录到指定的zip或者rar包
	  * @param inputFilename 要压缩的文件或者文件夹，如果是文件夹的话，会将文件夹下的所有文件包含子文件夹的内容进行压缩
	  * @param zipFilename 生成的zip或者rar文件的名称
	  */
	 public synchronized void zip(String inputFilename, String zipFilename)throws IOException {
		 zip(new File(inputFilename), zipFilename);
	 }
	 /**
	  * 压缩文件或者文件目录到指定的zip或者rar包，内部调用
	  * @param inputFile 参数为文件类型的要压缩的文件或者文件夹
	  * @param zipFilename 生成的zip或者rar文件的名称
	  */
	 private synchronized void zip(File inputFile, String zipFilename) throws IOException {
		 ZipOutputStream out = new ZipOutputStream(new FileOutputStream(zipFilename));
		 try {
			 zip(inputFile, out, "");
		 } catch (IOException e) {
			 throw e;
		 } finally {
			 out.close();
		 }
	 }
	 
	 /**
	  * 压缩文件或者文件目录到指定的zip或者rar包
	  * @param inputFile 参数为文件类型的要压缩的文件或者文件夹
	  * @param out 输出流
	  * @param base 基文件夹
	  */
	 private synchronized void zip(File inputFile, ZipOutputStream out, String base) throws IOException {
		 if (inputFile.isDirectory()) {
			 File[] inputFiles = inputFile.listFiles();
			 out.putNextEntry(new ZipEntry(base + "/"));
			 base = base.length() == 0 ? "" : base + "/";
			 for (int i = 0; i < inputFiles.length; i++) {
				 zip(inputFiles[i], out, base + inputFiles[i].getName());
			 }	
		 } else {
			 if (base.length() > 0) {
				 out.putNextEntry(new ZipEntry(base));
			 } else {
				 out.putNextEntry(new ZipEntry(inputFile.getName()));
			 }
			 FileInputStream in = new FileInputStream(inputFile);
			 try {
				 int c;
				 byte[] by = new byte[BUFFEREDSIZE];
				 while ((c = in.read(by)) != -1) {
					 out.write(by, 0, c);
				 }
			 } catch (IOException e) {
				 throw e;
			 } finally {
				 in.close();
			 }
		 }
	 }
	 
	 /**
	  * 解压zip或者rar包的内容到指定的目录下，可以处理其文件夹下包含子文件夹的情况
	  *
	  * @param zipFilename 要解压的zip或者rar包文件
	  * @param outputDirectory 解压后存放的目录
	  */
	 public synchronized void unzip(String zipFilename, String outputDirectory)throws IOException {
		 File outFile = new File(outputDirectory);
		 if (!outFile.exists()) {
			 outFile.mkdirs();
		 }
		 ZipFile zipFile = new ZipFile(zipFilename);
		 Enumeration en = zipFile.entries();
		 ZipEntry zipEntry = null;
		 while (en.hasMoreElements()) {
			 zipEntry = (ZipEntry) en.nextElement();
			 if (zipEntry.isDirectory()) {
				 // mkdir directory
				 String dirName = zipEntry.getName();
				 //System.out.println("=dirName is:=" + dirName + "=end=");
				 dirName = dirName.substring(0, dirName.length() - 1);
				 File f = new File(outFile.getPath() + File.separator + dirName);
				 f.mkdirs();
			 } else {
				 //unzip file
				 String strFilePath = outFile.getPath() + File.separator+ zipEntry.getName();
				 File f = new File(strFilePath);
				 //the codes remedified by can_do on 2010-07-02 =begin=
				 // /////begin/////
				 //判断文件不存在的话，就创建该文件所在文件夹的目录
				 if (!f.exists()) {
					String[] arrFolderName = zipEntry.getName().split("/");
					String strRealFolder = "";
					for (int i = 0; i < (arrFolderName.length - 1); i++) {
						strRealFolder += arrFolderName[i] + File.separator;
					}
					strRealFolder = outFile.getPath() + File.separator + strRealFolder;
					File tempDir = new File(strRealFolder);
					//此处使用.mkdirs()方法，而不能用.mkdir()
					tempDir.mkdirs();
				 }
				 //////end///
				 // the codes remedified by can_do on 2010-07-02 =end=
				 f.createNewFile();
				 InputStream in = zipFile.getInputStream(zipEntry);
				 FileOutputStream out = new FileOutputStream(f);
				 try {
					 int c;
					 byte[] by = new byte[BUFFEREDSIZE];
					 while ((c = in.read(by)) != -1) {
						 out.write(by, 0, c);
					 }
					 //out.flush();
				 } catch (IOException e) {
					 throw e;
				 } finally {
					 out.close();
					 in.close();
				 }
			 }
		 }
	 }
	 
	 /*
	  * 通过递归得到某一路径下所有的目录及其文件
	  */
	 public  ArrayList<File> getFiles(String filePath){
		 ArrayList<File> filelist = new ArrayList<File>();
		 File root = new File(filePath);
		 return getFileList(root,filelist);
	 }
	 
	 public  ArrayList<File> getFileList(File filePath,ArrayList<File> filelist){
		 
		 File[] files = filePath.listFiles();
		 for(File file:files){     
			 if(file.isDirectory()){
				 getFileList(file,filelist);
			 }else{
				 filelist.add(file);
			 }     
	    }
		 return filelist;
	 }
	 
	 
//	 public static void main(String[] args) {
//	  FileZip bean = new FileZip();
//	  try {
//	   bean.zip("E:\\20120813", "d:/test.rar");
//	   
//	   //bean.zip("E:\\struts.xml", "d:/struts.rar");
//	  } catch (IOException e) {
//	   e.printStackTrace();
//	  }
//	 }
//	} 
//	 public static void main(String[] args) {
//		 FileZip bean = new FileZip();
//		 try {
//			 bean.unzip("d:/test.rar", "D:/test");
//	   
//			 bean.unzip("d:/struts.rar", "D:/struts");
//		 } catch (IOException e) {
//			 e.printStackTrace();
//		 }
//	}
}
