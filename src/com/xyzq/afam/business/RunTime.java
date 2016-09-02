package com.xyzq.afam.business;

import android.app.Activity;

import com.xyzq.simpson.carl.view.control.BridgeWebView;

/**
 * 当前运行时
 */
public class RunTime {
	/**
	 * 当前展示主界面
	 */
	public static Activity currentActivity = null;
	/**
	 * 当前展示主浏览器
	 */
	public static BridgeWebView currentBrowser = null;
	
	
	/**
	 * 刷新
	 * 
	 * @param currentActivity 当前展示主界面
	 * @param currentBrowser 当前展示主浏览器
	 */
	public static void refresh(Activity currentActivity, BridgeWebView currentBrowser) {
		RunTime.currentActivity = currentActivity;
		RunTime.currentBrowser = currentBrowser;
	}
}
