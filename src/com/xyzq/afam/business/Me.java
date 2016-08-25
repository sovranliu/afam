package com.xyzq.afam.business;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;

import com.xyzq.afam.Program;
import com.xyzq.afam.business.core.IMeListener;
import com.xyzq.simpson.base.etc.Serial;
import com.xyzq.simpson.base.json.JSONVisitor;
import com.xyzq.simpson.base.model.core.IEventable;
import com.xyzq.simpson.base.type.Table;
import com.xyzq.simpson.carl.communication.Networking;
import com.xyzq.simpson.carl.communication.response.JSONResponse;
import com.xyzq.simpson.carl.etc.Version;
import com.xyzq.simpson.carl.framework.Broadcaster;
import com.xyzq.simpson.carl.sensor.Reminder;
import com.xyzq.simpson.sherry.im.Module;
import com.xyzq.simpson.sherry.im.core.IReactor;

import android.content.Context;
import android.graphics.Bitmap;

/**
 * 当前登录用户类
 */
public class Me implements Serializable, IReactor {
	private static final long serialVersionUID = 1L;

	/**
	 * 员工工号
	 */
	public long userId;
	/**
	 * 用户名
	 */
	public String userName;
	/**
	 * 姓名
	 */
	public String name;
	/**
	 * 手机号码
	 */
	public String phone = null;
	/**
	 * 口令
	 */
	public String token = null;
	/**
	 * 实例
	 */
	public static Me instance = null;


	/**
	 * 登录
	 * 
	 * @param context 上下文
	 * @param userName 用户名
	 * @param password 登录密码
	 * @param callback 回调函数
	 */
	public static void login(Context context, String userName, String password, IEventable<Boolean> callback) {
		Networking.doCommand("login", new JSONResponse(context, callback) {
			@SuppressWarnings("unchecked")
			@Override
			public void onFinished(JSONVisitor content) {
				final IEventable<Boolean> callback = (IEventable<Boolean>) tag;
				if(null == content) {
					if(null != callback) {
						callback.on(false);
					}
					return;
				}
				if(content.getInteger("code", 0) < 0) {
					if(null != callback) {
						callback.on(false);
					}
					return;
				}
				content = content.getVisitor("data");
				if(null == content) {
					if(null != callback) {
						callback.on(false);
					}
					return;
				}
				Me me = new Me();
				me.parse(content);
				instance = me;
				try {
					instance.save();
				}
				catch (IOException e) {
					throw new RuntimeException("存储用户信息失败", e);
				}
				Module.reactor = instance;
				Module.login(new IEventable<Boolean>() {
					@Override
					public void on(Boolean arg0) {
						if(null == callback) {
							return;
						}
						if(arg0) {
							callback.on(true);
						}
						else {
							callback.on(false);
						}
					}
				});
			}
		}, userName, password, "");
	}

	/**
	 * 自动登录
	 * 
	 * @param context 上下文
	 * @param callback 回调函数
	 */
	public static void autoLogin(Context context, IEventable<Boolean> callback) {
		try {
			Me me = read();
			if(null == me) {
				if(null != callback) {
					callback.on(false);
				}
			}
			else {
				instance = me;
				Networking.doCommand("login", new JSONResponse(context, callback) {
					@SuppressWarnings("unchecked")
					@Override
					public void onFinished(JSONVisitor content) {
						final IEventable<Boolean> callback = (IEventable<Boolean>) tag;
						if(null == content) {
							instance = null;
							callback.on(false);
						}
						else {
							if(content.getInteger("code", -1) >= 0) {
								if(instance.parse(content.getVisitor("data"))) {
									try {
										instance.save();
									}
									catch (IOException e) {
										throw new RuntimeException("存储用户信息失败", e);
									}
								}
								Module.reactor = instance;
								Module.login(new IEventable<Boolean>() {
									@Override
									public void on(Boolean arg0) {
										if(arg0) {
											callback.on(true);
										}
										else {
											callback.on(false);
										}
									}
								});
							}
							else {
								instance = null;
								callback.on(false);
							}
						}
					}
				}, me.userName, "", me.token);
			}
		}
		catch (IOException e) {
			throw new RuntimeException("读取用户信息失败", e);
		}
	}
	
	/**
	 * 退出登录
	 */
	public void logout() {
		Module.logout(null);
		instance = null;
		delete();
		Broadcaster.<IMeListener>broadcast(Program.application, IMeListener.class).onLogout();
	}

	/**
	 * 保存
	 */
	public void save() throws IOException {
		Serial.restore(this, file());
	}

	/**
	 * 解析用户数据
	 * 
	 * @param visitor 数据
	 * @return 解析结果
	 */
	public boolean parse(JSONVisitor visitor) {
		userId = visitor.getLong("userId", 0);
		userName = visitor.getString("userName");
		name = visitor.getString("name");
		phone = visitor.getString("phone");
		token = visitor.getString("token");
		return true;
	}

	/**
	 * 获取存储文件
	 * 
	 * @return 存储文件
	 */
	public static File file() {
		File directory = new File(Program.STORAGE_ROOT_USER);
		if(!directory.exists()) {
			directory.mkdirs();
		}
		return new File(Program.STORAGE_ROOT_USER + "me." + Version.fetchVersion(Program.application).toString() + ".dat");
	}

	/**
	 * 删除
	 */
	private void delete() {
		file().delete();
	}

	/**
	 * 读取
	 * 
	 * @return 返回存储的对象
	 */
	private static Me read() throws IOException {
		File file = file();
		if(!file.exists()) {
			return null;
		}
		try {
			return Serial.extract(file, Me.class);
		}
		catch (ClassNotFoundException e1) {
			return null;
		}
	}

	@Override
	public String getName(String userId) {
		return name;
	}

	@Override
	public String getUserId() {
		return userName;
	}

	@Override
	public String getPassword() {
		return "123456";
	}

	@Override
	public Bitmap getPhoto(String userId) {
		return null;
	}

	@Override
	public void onConflict() {
		logout();
		Broadcaster.<IMeListener>broadcast(Program.application, IMeListener.class).onConflict();
	}

	@Override
	public boolean onDial(int type) {
		return false;
	}

	@Override
	public void onCommand(String from, String action, Table<String, Object> data) {
		Reminder.ringtone(Program.application);
		Broadcaster.<IMeListener>broadcast(Program.application, IMeListener.class).onCommand(from, action, data);
	}
}
