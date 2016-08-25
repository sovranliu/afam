package com.xyzq.afam.business.inject;

import com.xyzq.afam.business.Me;

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
}
