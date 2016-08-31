package com.xyzq.afam.view.form;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;

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
		browser.setWebViewClient(new WebViewClient() {
			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				if(url.startsWith("mailto:") || url.startsWith("geo:") ||url.startsWith("tel:")) {
					Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
	                startActivity(intent);
	                browser.pauseTimers();
	                browser.resumeTimers();
	                return true;
	            }
				else if(url.startsWith("new://")) {						
					Intent intent = new Intent(MainFragmentActivity.this.getActivity(), LogicActivity.class);
					intent.putExtra("url", url.substring("new://".length()));
					startActivity(intent);
					browser.pauseTimers();
					browser.resumeTimers();
	                return true;
				}
	            return super.shouldOverrideUrlLoading(view, url);
			}
			@Override
			public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
				super.onReceivedError(view, errorCode, description, failingUrl);
				browser.loadUrl("about:blank");
			}
			@Override 
	        public void onPageFinished(WebView view, String url) {
				super.onPageFinished(view, url);
				view.loadUrl("javascript: var allLinks = document.getElementsByTagName('a'); if (allLinks) {var i;for (i=0; i<allLinks.length; i++) {var link = allLinks[i];var target = link.getAttribute('target'); if (target && target == '_blank') {link.setAttribute('target','_self');link.href = 'new://'+link.href;}}}"); 
			}
		});
	}
}
