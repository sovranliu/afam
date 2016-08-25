package com.xyzq.afam.business;

/**
 * 运行时数据
 */
public class Runtime {
	/**
	 * 隐藏构造函数
	 */
	private Runtime() { }

	/**
	 * 是否有未读消息
	 */
	public static boolean hasUnreadMessage = false;
	/**
	 * 最后一次重置的秒数
	 */
	public static long lastResetTick = 0;
}
