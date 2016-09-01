package com.xyzq.afam.view.form;

import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.webkit.CookieManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.xyzq.afam.R;
import com.xyzq.afam.business.Me;
import com.xyzq.afam.common.Tools;
import com.xyzq.simpson.base.model.core.IEventable;
import com.xyzq.simpson.base.text.Text;
import com.xyzq.simpson.carl.communication.Networking;
import com.xyzq.simpson.carl.view.annotation.ResourceView;
import com.xyzq.simpson.carl.view.component.ActivityEx;
import com.xyzq.simpson.sherry.general.view.form.BrowserActivity;
import com.xyzq.simpson.sherry.general.view.form.EnvironmentActivity;

/**
 * 登录页
 */
@ResourceView(id = R.layout.activity_login)
public class LoginActivity extends ActivityEx {
    @ResourceView(id = R.id.login_image_logo)
    public ImageView imgLogo;
    @ResourceView(id = R.id.login_text_username)
    public EditText txtUsername;
    @ResourceView(id = R.id.login_text_password)
    public EditText txtPassword;
    @ResourceView(id = R.id.login_button_login)
    public Button btnLogin;
    @ResourceView(id = R.id.login_button_reset)
    public Button btnReset;
    @ResourceView(id = R.id.login_label_protocol)
    public TextView labProtocol;


    /**
     * 界面创建
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //
        prepare();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    /**
     * 界面启动预处理
     */
    public void prepare() {
    	imgLogo.setOnLongClickListener(new View.OnLongClickListener() {
			@Override
			public boolean onLongClick(View v) {
				Intent intent = new Intent(LoginActivity.this, EnvironmentActivity.class);
				LoginActivity.this.startActivity(intent);
				return true;
			}
		});
    	btnReset.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				// 重置
			}
		});
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
				final String phone = txtUsername.getText().toString();
				if(Text.isBlank(phone)) {
					return;
				}
				final String password = txtPassword.getText().toString();
				if(Text.isBlank(password)) {
					return;
				}
				Tools.displayLoading(LoginActivity.this, "登录中");
				Me.login(LoginActivity.this, phone, password, new IEventable<Boolean>() {
					@SuppressWarnings("deprecation")
					@Override
					public void on(Boolean result) {
						Tools.hideLoading();
						if(!result) {
							return;
						}
						// 设置Cookie
						android.webkit.CookieSyncManager.createInstance(LoginActivity.this);
						CookieManager cookieManager = CookieManager.getInstance();
						cookieManager.setCookie(Networking.fetchURL("domain"), "user=" + Me.instance.token);
						android.webkit.CookieSyncManager.getInstance().sync();
						// 启动主界面
						Intent intent = new Intent(LoginActivity.this, MainActivity.class);
						LoginActivity.this.startActivity(intent);
						LoginActivity.this.finish();
					}
				});
            }
        });
        labProtocol.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent(LoginActivity.this, BrowserActivity.class);
				intent.putExtra("url", Networking.fetchURL("protocol"));
				LoginActivity.this.startActivity(intent);
			}
		});
    }
}
