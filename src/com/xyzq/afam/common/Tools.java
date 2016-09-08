package com.xyzq.afam.common;

import com.xyzq.afam.R;
import com.xyzq.afam.common.Rotate3dAnimation;
import com.xyzq.simpson.base.text.Text;

import android.app.AlertDialog;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.View.OnClickListener;
import android.view.ViewTreeObserver.OnGlobalLayoutListener;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.LinearInterpolator;
import android.view.animation.RotateAnimation;
import android.widget.ImageView;
import android.widget.TextView;

/**
 * 工具类
 */
public class Tools {
	/**
	 * 告示对话框
	 */
	private static AlertDialog alertDialog = null;


	/**
	 * 构造函数
	 */
	private Tools() { }

	/**
	 * 弹出加载对话框
	 * 
	 * @param context 上下文
	 * @param title 标题
	 */
	public static void displayLoading(Context context, String title) {
		hideLoading();
		//
		alertDialog = new AlertDialog.Builder(context).create();
		alertDialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
		alertDialog.setCanceledOnTouchOutside(false);
		alertDialog.show();
		Window window = alertDialog.getWindow();
		window.setContentView(R.layout.dialog_loading);
		WindowManager.LayoutParams layoutParams = window.getAttributes();
		layoutParams.dimAmount = 0;
		window.setAttributes(layoutParams);
		ViewGroup viewGroup = (ViewGroup) window.findViewById(R.id.loading_layout_background);
		viewGroup.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) { }
		});
		ImageView imageView = (ImageView) window.findViewById(R.id.loading_image_icon);
		TextView textView = (TextView) window.findViewById(R.id.loading_label_title);
		if(Text.isBlank(title)) {
			textView.setVisibility(View.GONE);
		}
		else {
			textView.setText(title);
			textView.setVisibility(View.VISIBLE);
		}
		imageView.getViewTreeObserver().addOnGlobalLayoutListener(new OnGlobalLayoutListener() {
			@Override
			public void onGlobalLayout() {
				Logger.d("Tools.onGlobalLayout()");
				if(null == alertDialog) {
					return;
				}
				Window window = alertDialog.getWindow();
				ImageView imgIcon = (ImageView) window.findViewById(R.id.loading_image_icon);
				ImageView imgCircle = (ImageView) window.findViewById(R.id.loading_image_circle);
				imgIcon.getViewTreeObserver().removeOnGlobalLayoutListener(this);
				// 图标Y轴旋转
				Rotate3dAnimation rotate3dAnimation = new Rotate3dAnimation(0f, 360f, imgIcon.getWidth() / 2, imgIcon.getHeight() / 2, 0.0f, true);  
				rotate3dAnimation.setDuration(1200);
				rotate3dAnimation.setFillAfter(true);
				rotate3dAnimation.setInterpolator(new LinearInterpolator());
				rotate3dAnimation.setRepeatCount(Animation.INFINITE);
				imgIcon.clearAnimation();
				imgIcon.setLayerType(View.LAYER_TYPE_HARDWARE, null);
				imgIcon.startAnimation(rotate3dAnimation);  
		        // 外环中心旋转
				RotateAnimation rotateAnimation = new RotateAnimation(360f, 0f, Animation.RELATIVE_TO_SELF, 0.5f, Animation.RELATIVE_TO_SELF, 0.5f); 
				rotateAnimation.setDuration(1200);
				rotateAnimation.setRepeatCount(Animation.INFINITE);
				rotateAnimation.setInterpolator(new LinearInterpolator());
				imgCircle.clearAnimation();
				imgCircle.setLayerType(View.LAYER_TYPE_HARDWARE, null);
				imgCircle.startAnimation(rotateAnimation);
			}
		});
	}

	/**
	 * 取消加载对话框
	 * 
	 * @param context 上下文
	 * @param title 标题
	 */
	public static void hideLoading() {
		if(null != alertDialog) {
			alertDialog.dismiss();
		}
		alertDialog = null;
	}
}
