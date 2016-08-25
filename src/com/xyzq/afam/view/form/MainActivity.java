package com.xyzq.afam.view.form;

import com.xyzq.afam.R;
import com.xyzq.afam.business.core.IMeListener;
import com.xyzq.simpson.base.type.Table;
import com.xyzq.simpson.carl.view.annotation.ResourceView;
import com.xyzq.simpson.carl.view.component.FragmentActivityEx;

import android.content.Intent;
import android.os.Bundle;

import android.widget.RadioGroup;
import android.widget.TabHost;
import android.widget.RadioGroup.OnCheckedChangeListener;

/**
 * 引导界面
 */
@ResourceView(id = R.layout.activity_main)
public class MainActivity extends FragmentActivityEx implements IMeListener {
	/**
	 * 资源更新策略
	 */
	public final static String STRATEGY_REQUIRED = "required";
	public final static String STRATEGY_OPTIONAL = "optional";
	/**
	 * 控件
	 */
	@ResourceView(id = R.id.main_tabhost)
    public TabHost tabhost = null;
	@ResourceView(id = R.id.main_tab)
	public RadioGroup group;
	
	
	/**
	 * 界面创建
	 */
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		prepare();
	}

	private void prepare() {
        tabhost.setup();
        tabhost.addTab(tabhost.newTabSpec("main_tab_home").setIndicator("").setContent(R.id.main_fragment_home));
        tabhost.addTab(tabhost.newTabSpec("main_tab_client").setIndicator("").setContent(R.id.main_fragment_client));
        tabhost.addTab(tabhost.newTabSpec("main_tab_query").setIndicator("").setContent(R.id.main_fragment_query));
        tabhost.addTab(tabhost.newTabSpec("main_tab_user").setIndicator("").setContent(R.id.main_fragment_user));
        group.check(R.id.main_tab_home);
        group.setOnCheckedChangeListener(new OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int checkedId) {
                switch(checkedId) {
                case R.id.main_tab_home:
                    tabhost.setCurrentTabByTag("main_tab_home");
    				break;
                case R.id.main_tab_client:
                    tabhost.setCurrentTabByTag("main_tab_client");
                    break;
                case R.id.main_tab_query:
                    tabhost.setCurrentTabByTag("main_tab_query");
    				break;
                case R.id.main_tab_user:
                    tabhost.setCurrentTabByTag("main_tab_user");
    				break;
                }
            }
        });
	}

	@Override
	public void onLogout() {
		Intent intent = new Intent(MainActivity.this, LoginActivity.class);
		MainActivity.this.startActivity(intent);
		MainActivity.this.finish();
	}

	@Override
	public void onConflict() {
		Intent intent = new Intent(MainActivity.this, LoginActivity.class);
		MainActivity.this.startActivity(intent);
		MainActivity.this.finish();
	}

	@Override
	public void onCommand(String from, String action, Table<String, Object> data) {
		
	}
}
