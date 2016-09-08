package com.xyzq.afam.business.inject;

import com.xyzq.afam.business.Me;
import com.xyzq.afam.business.RunTime;
import com.xyzq.simpson.base.json.JSONNumber;
import com.xyzq.simpson.base.json.JSONObject;
import com.xyzq.simpson.base.json.core.IJSON;
import com.xyzq.simpson.base.type.core.ILink;
import com.xyzq.simpson.sherry.im.Module;

/**
 * 用户类
 */
public class User {
	/**
	 * 隐藏构造函数
	 */
	private User() { }

	/**
	 * 登录
	 */
	public static void logout() {
		Me.instance.logout();
	}

	/**
	 * 未读消息
	 * 
	 * {"im1":1, "im2":2}
	 * @return 未读消息
	 */
	public static IJSON unreadMessages() {
		JSONObject result = new JSONObject();
		for(ILink<String, Integer> link : Module.getUnreadMessageCount()) {
			result.put(link.origin(), new JSONNumber(link.destination()));
		}
		return result;
	}

	/**
	 * 未读消息
	 * 
	 * @param im 
	 * @return 未读消息
	 */
	public static int unreadMessages(String im) {
		return Module.getUnreadMessageCount(im);
	}

	/**
	 * 打开指定客户的对话框
	 * 
	 * @param name 客户名
	 * @param im 客户通信工具
	 */
	public static void chat(String name, String im) {
		Me.instance.doChat(RunTime.currentActivity, name, im);
	}
}
