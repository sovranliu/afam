package com.xyzq.afam.business.inject;

import android.app.Activity;

/**
 * 窗口对象
 */
public class Window {
	/**
	 * 窗口对象
	 */
	private Activity activity = null;


	/**
	 * 构造函数
	 * 
	 * @param activity 窗口
	 */
	public Window(Activity activity) {
		this.activity = activity;
	}

	/**
	 * 关闭窗口
	 */
	public void close() {
		activity.finish();
	}
}
