// home page controller

$Controller.bind = function() {
	// 初始化广告轮播
	swipe('.adver-wrap','.adver-pagination');
	swipe('.lhb-wrap','.lhb-pagination');
	swipe('.yz-wrap','.yz-pagination');
	// 加载更多
	loadMore();
};

function swipe(wrap,pagination) {
	var options = {
		'speed': 400,
		'pagination':pagination,
		'observer':true,
		'observeParents':true
	};
	var mySwiper = $Controller.f7.swiper(wrap, options);   
}

function loadMore() {
	// 加载flag
	var loading = false;
	// 上次加载的序号
	var lastIndex = $$('.list-block li').length;
	// 最多可加载的条目
	var maxItems = 60;
	// 每次加载添加多少条目
	var itemsPerLoad = 20;
	// 注册'infinite'事件处理函数
	$$('.infinite-scroll').on('infinite', function () {
	  // 如果正在加载，则退出
	  if (loading) return;
	  // 设置flag
	  loading = true;
	  // 模拟1s的加载过程
	  setTimeout(function () {
		// 重置加载flag
		loading = false;
		if (lastIndex >= maxItems) {
		  // 加载完毕，则注销无限加载事件，以防不必要的加载
		  AFA.detachInfiniteScroll($$('.infinite-scroll'));
		  // 删除加载提示符
		  $$('.infinite-scroll-preloader').remove();
		  return;
		}
		// 生成新条目的HTML
		var html = '';
		for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
		  html += '<li><a href="#" class="item-link item-content">\
					  <div class="item-media"><img src="image/info1.jpeg" width="80"></div>\
						<div class="item-inner">\
						  <div class="item-title-row">\
							<div class="item-title">资讯资讯' + i + '</div>\
						  </div>\
						  <div class="item-subtitle">Beatles</div>\
						  <div class="item-text">Lorem ipsum dolor sit amet...</div>\
						</div></a>\
			</li>';
		}
		// 添加新条目
		$$('.list-block ul').append(html);
		// 更新最后加载的序号
		lastIndex = $$('.list-block li').length;
		}, 1000);
	});
}
