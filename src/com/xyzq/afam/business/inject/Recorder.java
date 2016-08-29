package com.xyzq.afam.business.inject;

import android.media.MediaPlayer;
import android.widget.Toast;

import com.xyzq.afam.Program;
import com.xyzq.afam.common.Logger;
import com.xyzq.simpson.carl.sensor.SoundRecorder;

/**
 * 录音机类
 */
public class Recorder {
	/**
	 * 录音机对象
	 */
	private static SoundRecorder recorder = null;
	/**
	 * 短语音播放器
	 */
	private static MediaPlayer player = null;
	
	
	/**
	 * 隐藏构造函数
	 */
	private Recorder() { }

	
	/**
	 * 开始记录
	 */
	public static void start() {
		if(null == recorder) {
			recorder = new SoundRecorder(Program.STORAGE_ROOT_RECORD);
		}
		recorder.start(Program.application);
	}

	/**
	 * 停止记录
	 * 
	 * @return 记录文件名
	 */
	public static String end() {
		if(null == recorder) {
			return null;
		}
		String path = recorder.stop().getAbsolutePath();
		recorder = null;
		return path;
	}

	/**
	 * 播放录音
	 * 
	 * @param uri 缓存音频文件名或者音频文件URL
	 */
	public static void play(String uri) {
		if(null == player) {
			player = new MediaPlayer();
		}
		player.reset();
		try {
			player.setDataSource(uri);
			player.prepare();
		}
		catch (Exception e) {
			Logger.e("play record failed, uri = " + uri, e);
		}
		player.start();
	}

	/**
	 * 停止播放
	 * 
	 * @param uri 缓存音频文件名或者音频文件URL
	 */
	public static void stop() {
		if(null == player) {
			return;
		}
		if(player.isPlaying()) {
			player.pause();
		}
		player.stop();
		player = null;
	}
	
	/**
	 * 上传录音文件
	 * 
	 * @param path 文件路径
	 */
	public static void upload(String path) {
		Toast.makeText(Program.application, "正在上传录音", Toast.LENGTH_LONG).show();
		// TODO:上传录音文件
	}
}
