package com.xyzq.afam;

import com.xyzq.simpson.carl.communication.Networking;
import com.xyzq.simpson.carl.config.Configuration;
import com.xyzq.simpson.carl.storage.Storage;
import com.xyzq.simpson.sherry.im.Module;

import android.app.Application;

/**
 * 应用类
 */
public class Program extends Application {
	/**
	 * 程序ID
	 */
	public final static String ID = "afam";
	/**
	 * 默认存储根目录
	 */
	public final static String STORAGE_ROOT = Storage.externalStorageDirectory() + ID + "/";
	/**
	 * 默认用户根目录
	 */
	public final static String STORAGE_ROOT_USER = STORAGE_ROOT + "user/";
	/**
	 * 默认图片根目录
	 */
	public final static String STORAGE_ROOT_IMAGE = STORAGE_ROOT + "image/";
	/**
	 * 默认H5根目录
	 */
	public final static String STORAGE_ROOT_H5 = STORAGE_ROOT + "h5/";
	/**
	 * 程序引用
	 */
	public static Application application = null;


	/**
	 * 构建回调
	 */
	@Override
    public void onCreate() {
		super.onCreate();
		application = this;
		// 初始化配置系统
		Configuration.initialize(application);
		// 初始化网络
		Networking.initialize(application);
		// 初始化IM组件
		initializeIM();
    }

	/**
	 * 销毁回调
	 */
	@Override
	public void onTerminate() {
		super.onTerminate();
		// 关闭IM组件
		terminateIM();
		// 关闭网络
		Networking.terminate();
		// 关闭配置系统
		Configuration.terminate();
	}
	/**
	 * 初始化IM
	 */
	private void initializeIM() {
		// 初始化IM组件
		Module.context = this;
		Module.initialize();
	}

	/**
	 * 销毁IM
	 */
	private void terminateIM() {
		// 关闭IM组件
		Module.terminate();
	}
}
