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
import com.xyzq.afam.business.core.IMeListener;
import com.xyzq.afam.business.inject.Recorder;
import com.xyzq.afam.business.inject.User;
import com.xyzq.afam.business.inject.Window;
import com.xyzq.afam.common.Tools;
import com.xyzq.simpson.base.json.JSONObject;
import com.xyzq.simpson.base.json.JSONString;
import com.xyzq.simpson.base.text.Text;
import com.xyzq.simpson.base.type.Table;
import com.xyzq.simpson.carl.view.control.BridgeWebView;
import com.xyzq.simpson.carl.communication.Networking;
import com.xyzq.simpson.carl.etc.Controller;
import com.xyzq.simpson.carl.view.annotation.ResourceView;
import com.xyzq.simpson.carl.view.component.FragmentEx;
import com.xyzq.simpson.marge.Client;

/**
 * 引导界面
 */
@ResourceView(id = R.layout.activity_mainfragment)
public class MainFragmentActivity extends FragmentEx implements IMeListener {
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
		RunTime.refresh(this.getActivity(), browser);
		browser.trigger("onResume", null);
	}

	/**
	 * 准备
	 */
	private void prepare() {
		browser.setVisibility(View.INVISIBLE);
		browser.prepare();
		browser.inject("user", User.class);
		browser.inject("window", new Window(MainFragmentActivity.this.getActivity(), browser));
		browser.inject("recorder", Recorder.class);
		if(!Text.isBlank(this.getTag())) {
			String url = Networking.fetchURL("domain") + "/" + this.getTag();
			if(null != Client.resource("afam").fetch(url)) {
				url = Client.resource("afam").fetch(url);
			}
			Tools.displayLoading(this.getActivity(), null);
			browser.loadUrl(url);
		}
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
					browser.pauseTimers();
					browser.resumeTimers();					
					Intent intent = new Intent(MainFragmentActivity.this.getActivity(), LogicActivity.class);
					intent.putExtra("url", url.substring("new://".length()));
					startActivity(intent);
	                return true;
				}
	            return super.shouldOverrideUrlLoading(view, url);
			}
			@Override
			public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
				super.onReceivedError(view, errorCode, description, failingUrl);
				// browser.loadUrl("about:blank");
				Toast.makeText(MainFragmentActivity.this.getActivity(), description, Toast.LENGTH_LONG).show();
			}
			@Override
	        public void onPageFinished(WebView view, String url) {
				super.onPageFinished(view, url);
				view.loadUrl("javascript: var allLinks = document.getElementsByTagName('a'); if (allLinks) {var i;for (i=0; i<allLinks.length; i++) {var link = allLinks[i];var target = link.getAttribute('target'); if (target && target == '_blank') {link.setAttribute('target','_self');link.href = 'new://'+link.href;}}}");
				browser.setVisibility(View.VISIBLE);
				Controller.doDelay(new Runnable() {
					@Override
					public void run() {
						Tools.hideLoading();
					}
				}, 2000);
			}
		});
	}

	@Override
	public void onLogout() {
		
	}

	@Override
	public void onConflict() {
		
	}

	@Override
	public void onCommand(String from, String action, Table<String, Object> data) {
		JSONObject object = JSONObject.convert(data);
		object.put("from", new JSONString(from));
		object.put("action", new JSONString(action));
		browser.trigger("onCommand", object);
	}
}
