package com.xyzq.afam.view.form;

import com.xyzq.afam.R;
import com.xyzq.afam.business.core.IMeListener;
import com.xyzq.simpson.base.text.Text;
import com.xyzq.simpson.base.type.Table;
import com.xyzq.simpson.carl.etc.GraphicsHelper;
import com.xyzq.simpson.carl.view.annotation.ResourceView;
import com.xyzq.simpson.carl.view.component.FragmentActivityEx;
import com.xyzq.simpson.sherry.im.Module;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;

import android.widget.RadioButton;
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
	@ResourceView(id = R.id.main_tab_client)
	public RadioButton btnClient;
	
	
	/**
	 * 界面创建
	 */
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		prepare();
	}
	
	/**
	 * 界面创建
	 */
	@Override
	protected void onResume() {
		super.onResume();
		refreshClientIcon();
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
                refreshClientIcon();
            }
        });
	}

	/**
	 * 对指定图标绘制角标
	 * 
	 * @param source 原图
	 * @param text 脚本文字
	 * @return 添加了角标后的图标
	 */
	public static Bitmap drawCornerMark(Bitmap source, String text) {
		if(null == source || Text.isBlank(text)) {
			return source;
		}
		Bitmap result = source.copy(Bitmap.Config.ARGB_8888, true);
		Canvas canvas = new Canvas(result);
        Paint paint = new Paint();
        paint.setAntiAlias(true);
        // 绘制圆形背景
        paint.setColor(Color.RED);
        float length = Math.min(result.getWidth(), result.getHeight()) / 2;
        canvas.drawCircle(result.getWidth() - length / 2, length / 2, length / 2, paint);
        // 绘制文本
    	paint.setColor(Color.WHITE);
    	paint.setTextSize(30);
    	paint.setStrokeWidth(5);
    	float textWidth = paint.measureText(text);
    	float baseline = (length - paint.getFontMetricsInt().top - paint.getFontMetricsInt().bottom) / 2;
    	canvas.drawText(text, result.getWidth() - (length + textWidth) / 2, baseline, paint);
    	//
    	return result;
	}

	/**
	 * 刷新客户图标
	 */
	public void refreshClientIcon() {
		Drawable drawable = null;
		int messageCount = Module.getUnreadMessageCount(null);
		String corner = "";
		if(messageCount > 9) {
			corner = "..";
		}
		else if(messageCount > 0) {
			corner = String.valueOf(messageCount);
		}
		if("main_tab_client".equalsIgnoreCase(tabhost.getCurrentTabTag())) {
			drawable = new BitmapDrawable(MainActivity.this.getResources(), drawCornerMark(GraphicsHelper.decodeResource(MainActivity.this, R.drawable.main_client_selected), corner));
		}
		else {
			drawable = new BitmapDrawable(MainActivity.this.getResources(), drawCornerMark(GraphicsHelper.decodeResource(MainActivity.this, R.drawable.main_client_normal), corner));
		}
		btnClient.setCompoundDrawablesWithIntrinsicBounds(null, drawable, null, null);
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
        refreshClientIcon();
	}
}
