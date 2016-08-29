package com.xyzq.afam.business.inject;

import java.util.ArrayList;

import com.xyzq.afam.Program;
import com.xyzq.simpson.base.json.JSONArray;
import com.xyzq.simpson.base.json.JSONString;
import com.xyzq.simpson.base.json.core.IJSON;
import com.xyzq.simpson.base.model.core.IEventable;
import com.xyzq.simpson.sherry.general.utility.GeneralHelper;

import android.app.Activity;
import android.widget.Toast;

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

	/**
	 * 弹出单选框
	 */
	public void pop(JSONArray item) {
		ArrayList<String> list = new ArrayList<String>();
		for(IJSON json : item) {
			list.add(((JSONString) json).getValue()); 
		}
		GeneralHelper.showSelector(activity, new IEventable<Integer>() {
			@Override
			public void on(Integer index) {
				Program.currentBrowser.invoke(0, index);
			}
		}, list.toArray(new String[0]));
	}

	/**
	 * 弹出单选框
	 * 
	 * @param text 文本
	 */
	public void tip(String text) {
		Toast.makeText(activity, text, Toast.LENGTH_LONG).show();
	}
}
