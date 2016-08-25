package com.xyzq.afam.business.core;

import com.xyzq.simpson.base.type.Table;
import com.xyzq.simpson.carl.framework.annotation.ListenerInterface;

/**
 * 登录用户状态监听器
 */
@ListenerInterface
public interface IMeListener {
	/**
	 * 主动退出登录
	 */
	public void onLogout();

	/**
	 * 冲突掉线回调
	 */
	public void onConflict();

	/**
	 * 透传命令回调
	 * 
	 * @param from 消息投递者
	 * @param action 动作
	 * @param data 属性
	 */
	public void onCommand(String from, String action, Table<String, Object> data);
}
