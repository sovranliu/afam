package com.xyzq.afam.business.inject;

import java.util.ArrayList;

import com.xyzq.afam.business.RunTime;
import com.xyzq.afam.common.Tools;
import com.xyzq.afam.view.form.LogicActivity;
import com.xyzq.simpson.base.json.JSONArray;
import com.xyzq.simpson.base.json.JSONString;
import com.xyzq.simpson.base.json.core.IJSON;
import com.xyzq.simpson.base.model.core.IEventable;
import com.xyzq.simpson.carl.view.control.BridgeWebView;
import com.xyzq.simpson.sherry.general.utility.GeneralHelper;
import com.xyzq.simpson.sherry.general.view.form.TextEditActivity;

import android.app.Activity;
import android.content.Intent;
import android.webkit.WebView;
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
	 * 浏览器
	 */
	private BridgeWebView webView = null;


	/**
	 * 构造函数
	 * 
	 * @param activity 窗口
	 * @param webView 浏览器
	 */
	public Window(Activity activity, BridgeWebView webView) {
		this.activity = activity;
		this.webView = webView;
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
				RunTime.currentBrowser.invoke(0, index);
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

	/**
	 * 弹出加载对话框
	 * 
	 * @param text 文本
	 */
	public void displayLoading(String text) {
		Tools.displayLoading(activity, text);
	}

	/**
	 * 取消加载对话框
	 */
	public void hideLoading() {
		Tools.hideLoading();
	}
	
	/**
	 * 校正URL
	 */
	public void adjustLinks() {
		adjustLinks(webView);
	}

	/**
	 * 校正URL
	 * 
	 * @param webView 浏览器对象
	 */
	public static void adjustLinks(WebView webView) {
		if(null == webView) {
			return;
		}
		webView.loadUrl("javascript: var allLinks = document.getElementsByTagName('a'); if (allLinks) {var i;for (i=0; i<allLinks.length; i++) {var link = allLinks[i];var target = link.getAttribute('target'); if (target && target == '_blank') {link.setAttribute('target','_self');if(-1 == link.href.indexOf('new://')) {link.href = 'new://'+link.href;}}}}");
	}
	
	/**
	 * 弹出对话框录入文本
	 * 
	 * @param title 标题
	 * @param defaultText 默认文本
	 */
	public void inputText(String title, String defaultText) {
		Intent intent = new Intent(activity, TextEditActivity.class);
		intent.putExtra("tag", String.valueOf(((BridgeWebView) webView).fetchPort()));
		intent.putExtra("title", title);
		intent.putExtra("default", defaultText);
		activity.startActivityForResult(intent, LogicActivity.REQUESTCODE_INPUTTEXT);
	}
}
