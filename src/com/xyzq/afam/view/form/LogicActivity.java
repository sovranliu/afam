package com.xyzq.afam.view.form;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.xyzq.afam.R;
import com.xyzq.afam.business.RunTime;
import com.xyzq.afam.business.inject.Recorder;
import com.xyzq.afam.business.inject.User;
import com.xyzq.afam.business.inject.Window;
import com.xyzq.afam.common.Logger;
import com.xyzq.simpson.carl.view.annotation.ResourceView;
import com.xyzq.simpson.carl.view.component.ActivityEx;
import com.xyzq.simpson.carl.view.control.BridgeWebView;

/**
 * 逻辑 Web页
 */
@ResourceView(id = R.layout.activity_logic)
public class LogicActivity extends ActivityEx {
	@ResourceView(id = R.id.logic_browser)
	public BridgeWebView browser;
	

	/**
	 * 界面创建
	 */
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		//
		prepare();
	}
	
	/**
	 * 页面呈现
	 */
	@Override
	public void onResume() {
		super.onResume();
		RunTime.refresh(this, browser);
	}

	/**
	 * 准备
	 */
	private void prepare() {
		browser.prepare();
		browser.inject("user", User.class);
		browser.inject("window", new Window(this, browser));
		browser.inject("recorder", Recorder.class);
		// Tools.displayLoading(LogicActivity.this, null);
		browser.setVisibility(View.VISIBLE);
		browser.setWebViewClient(new WebViewClient() {
			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				Logger.d("shouldOverrideUrlLoading(?, '" + url + "')");
				if(url.startsWith("mailto:") || url.startsWith("geo:") ||url.startsWith("tel:")) {
					Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
	                startActivity(intent);
	                browser.pauseTimers();
	                browser.resumeTimers();
	                return true;
	            }
				else if(url.startsWith("new://")) {
					Intent intent = new Intent(LogicActivity.this, LogicActivity.class);
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
				// browser.loadUrl("about:blank");
				Toast.makeText(LogicActivity.this, description, Toast.LENGTH_LONG).show();
				LogicActivity.this.finish();
			}
			@Override
	        public void onPageFinished(WebView view, String url) {
				super.onPageFinished(view, url);
				Logger.d("onPageFinished(?, '" + url + "')");
				view.loadUrl("javascript: var allLinks = document.getElementsByTagName('a'); if (allLinks) {var i;for (i=0; i<allLinks.length; i++) {var link = allLinks[i];var target = link.getAttribute('target'); if (target && target == '_blank') {link.setAttribute('target','_self');link.href = 'new://'+link.href;}}}"); 
//				Controller.doDelay(new Runnable() {
//					@Override
//					public void run() {
//						Tools.hideLoading();
//						browser.setVisibility(View.VISIBLE);
//					}
//				}, 1000);
			}
		});
		browser.loadUrl(this.getIntent().getStringExtra("url"));
	}
}
