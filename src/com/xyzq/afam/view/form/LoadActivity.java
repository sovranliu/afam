package com.xyzq.afam.view.form;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.xyzq.afam.R;
import com.xyzq.afam.business.Me;
import com.xyzq.afam.business.RunTime;
import com.xyzq.afam.business.inject.Window;
import com.xyzq.afam.common.Logger;
import com.xyzq.simpson.base.model.core.IEventable;
import com.xyzq.simpson.carl.communication.Networking;
import com.xyzq.simpson.carl.etc.Controller;
import com.xyzq.simpson.carl.storage.Storage;
import com.xyzq.simpson.carl.view.annotation.ResourceView;
import com.xyzq.simpson.carl.view.component.ActivityEx;
import com.xyzq.simpson.carl.view.control.BridgeWebView;
import com.xyzq.simpson.marge.Client;

/**
 * 启动页
 */
@ResourceView(id = R.layout.activity_load)
public class LoadActivity extends ActivityEx {
	/**
	 * 本地H5版本号
	 */
	public final static int VERSION_H5 = 2;
	/**
	 * 控件
	 */
	@ResourceView(id = R.id.load_image_poster)
	public ImageView imgPoster;
	@ResourceView(id = R.id.load_browser_introduce)
	public BridgeWebView webIntroduce;


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
		RunTime.refresh(this, webIntroduce);
	}

	/**
	 * 准备
	 */
	private void prepare() {
		loadMarge();
		// 延时控制
		Controller.doDelay(new Runnable() {
			@Override
			public void run() {
				// 引导主界面
				String url = null;
				if(Client.resource("afam").isNew()) {
					// 加载介绍页
					url = Networking.fetchURL("domain") + "/afam/welcome.html";
					String uri = Client.resource("afam").fetch(url);
					if(uri != null) {
						url = uri;
					}
					webIntroduce.prepare();
					webIntroduce.loadUrl(url);
					webIntroduce.inject("window", new Window(LoadActivity.this) {
						/**
						 * 关闭窗口
						 */
						public void close() {
							loadMain();
						}
					});
					Controller.doDelay(new Runnable() {
						@Override
						public void run() {
							webIntroduce.setVisibility(View.VISIBLE);
							imgPoster.setVisibility(View.GONE);
						}
					}, 1000);
				}
				else {
					// 进入系统
					loadMain();
				}
			}
		}, 3000);
	}

	/**
	 * 初始化动态资源分发客户端
	 */
	private void loadMarge() {
		try {
			Client.resource("afam").load(Storage.externalStorageDirectory() + "afam/marge/main/");
		}
		catch (Exception e) {
			Logger.e("load resource failed", e);
			return;
		}
		if(null == Client.resource("afam").current()) {
			Client.resource("afam").loadAssertBundle(LoadActivity.this, "h5/", VERSION_H5);
		}
		Client.resource("afam").update();
	}
	
	/**
	 * 加载主界面
	 */
	private void loadMain() {
		Me.autoLogin(LoadActivity.this, new IEventable<Boolean>() {
			@Override
			public void on(Boolean result) {
				if(result) {
					Intent intent = new Intent(LoadActivity.this, MainActivity.class);
					LoadActivity.this.startActivity(intent);
					LoadActivity.this.finish();
				}
				else {
					Intent intent = new Intent(LoadActivity.this, LoginActivity.class);
					LoadActivity.this.startActivity(intent);
					LoadActivity.this.finish();
				}
			}
		});
	}
}
