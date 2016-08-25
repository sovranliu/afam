package com.xyzq.afam.view.form;

import android.os.Bundle;
import android.view.View;

import com.xyzq.afam.R;
import com.xyzq.simpson.carl.view.control.BridgeWebView;
import com.xyzq.simpson.carl.communication.Networking;
import com.xyzq.simpson.carl.view.annotation.ResourceView;
import com.xyzq.simpson.carl.view.component.FragmentEx;

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
	 * 准备
	 */
	private void prepare() {
		browser.prepare();
		browser.loadUrl(Networking.fetchURL("domain") + "/" + this.getTag());
	}
}
