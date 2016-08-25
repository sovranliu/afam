package com.xyzq.afam.view.form;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.xyzq.afam.R;
import com.xyzq.afam.business.inject.User;
import com.xyzq.afam.business.inject.Window;
import com.xyzq.simpson.carl.view.annotation.ResourceView;
import com.xyzq.simpson.carl.view.component.ActivityEx;
import com.xyzq.simpson.carl.view.control.BridgeWebView;
import com.xyzq.simpson.sherry.general.view.form.BrowserActivity;

/**
 * 逻辑 Web页
 */
@ResourceView(id = R.layout.activity_load)
public class LogicActivity extends ActivityEx {
	@ResourceView(id = R.id.logic_browser)
	public BridgeWebView webBrowser;

	
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
	 * 准备
	 */
	private void prepare() {
		webBrowser.prepare();
		webBrowser.inject("user", User.class);
		webBrowser.inject("window", new Window(this));
		webBrowser.loadUrl(this.getIntent().getStringExtra("url"));
		webBrowser.setWebViewClient(new WebViewClient() {
			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				if(url.startsWith("mailto:") || url.startsWith("geo:") ||url.startsWith("tel:")) {
					Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
	                startActivity(intent);
	                webBrowser.pauseTimers();
	                webBrowser.resumeTimers();
	                return false;
	            }
				else if(url.startsWith("new://")) {
					Intent intent = new Intent(LogicActivity.this, BrowserActivity.class);
					intent.putExtra("url", url.substring("new://".length()));
					startActivity(intent);
					webBrowser.pauseTimers();
					webBrowser.resumeTimers();
	                return false;
				}
	            return super.shouldOverrideUrlLoading(view, url);
			}
			@Override
			public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
				super.onReceivedError(view, errorCode, description, failingUrl);
				webBrowser.loadUrl("about:blank");
			}
			@Override 
	        public void onPageFinished(WebView view, String url) {
				super.onPageFinished(view, url);
				view.loadUrl("javascript: var allLinks = document.getElementsByTagName('a'); if (allLinks) {var i;for (i=0; i<allLinks.length; i++) {var link = allLinks[i];var target = link.getAttribute('target'); if (target && target == '_blank') {link.setAttribute('target','_self');link.href = 'new://'+link.href;}}}"); 
			}
		});
	}
}
