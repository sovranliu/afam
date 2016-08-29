package com.xyzq.afam.view.form;

import android.os.Bundle;
import android.view.View;

import com.xyzq.afam.Program;
import com.xyzq.afam.R;
import com.xyzq.afam.business.inject.Recorder;
import com.xyzq.afam.business.inject.User;
import com.xyzq.afam.business.inject.Window;
import com.xyzq.simpson.carl.view.control.BridgeWebView;
import com.xyzq.simpson.carl.communication.Networking;
import com.xyzq.simpson.carl.view.annotation.ResourceView;
import com.xyzq.simpson.carl.view.component.FragmentEx;
import com.xyzq.simpson.marge.Client;

/**
 * 引导界面
 */
@ResourceView(id = R.layout.activity_mainfragment)
public class MainFragmentActivity extends FragmentEx {
	/**
	 * 控件
	 */
	@ResourceView(id = R.id.browser_webview)
	public BridgeWebView browser;
	

	/**
	 * 界面创建
	 */
	@Override
	public void onViewCreated(View view, Bundle savedInstanceState) {
		super.onViewCreated(view, savedInstanceState);
		prepare();
	}

	/**
	 * 页面呈现
	 */
	@Override
	public void onResume() {
		super.onResume();
		Program.currentBrowser = browser;
	}

	/**
	 * 准备
	 */
	private void prepare() {
		browser.prepare();
		browser.inject("user", User.class);
		browser.inject("window", new Window(MainFragmentActivity.this.getActivity()));
		browser.inject("recorder", Recorder.class);
		String url = Networking.fetchURL("domain") + "/" + this.getTag();
		if(null != Client.resource("afam").fetch(url)) {
			url = Client.resource("afam").fetch(url);
		}
		browser.loadUrl(url);
	}
}
