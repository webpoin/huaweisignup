// 国际化支持
angular.module('app').config(['$translateProvider',  function($translateProvider) {


	// 中文
	$translateProvider.translations('zh', {
		header_title: '华为大学',
		header_nav_home : '首页',
		header_nav_project : '输入项目或方案名',
		header_nav_page : '讲师黄页',
		header_nav_signup : '培训报名',
		header_nav_news : '新闻活动',
		search_keyword : '输入项目或方案名',
		search_hotkey: '热门搜索',
		module_select: '您目前可以选择',
		module_select_signup: '我要报名',
		module_select_discript : "学习方案简介",
		module_select_duration : "培训时长",
		module_select_start : "最近开班时间",
		module_select_places : "剩余名额",
		module_select_location : "地点",
		module_select_price : "培训费用",
		module_select_payway : "付费方式",
		module_more : '查看更多',
		module_signup:'报名须知',
		module_signup_status : '我的报名状态',
		module_signup_discipline: '纪律',
		module_signup_position: '培训教室位置',
		module_signup_food: '周边餐饮',
		module_signup_travel: '机票预定',
		module_signup_visa : '签证进度',
		module_news : '最新',
		module_host : '最热',
		footer_nav_faq : 'FAQ',
		footer_nav_home : 'iLearning学习门户',
	});


	// 英文
	$translateProvider.translations('en', {
		header_title: 'huawei university',
		header_nav_home : 'Home',
		header_nav_project : 'Training program',
		header_nav_page : 'Lecturer Yellow Pages',
		header_nav_signup : 'Training Registration',
		header_nav_news : 'News activities',
		search_keyword : 'Enter the name of the project or program',
		search_hotkey: 'popular searches',
		module_select: 'You can choose',
		module_select_signup: 'register',
		module_select_discript : "Learning program ",
		module_select_duration : "Length training",
		module_select_start : "Recently Opening",
		module_select_places : "Remaining programprogramprogramprogramprogramprogram",
		module_select_location : "Location",
		module_select_price : "Cost",
		module_select_payway : "Payment methods",
		module_more : 'see more',
		module_signup:'Registration Information',
		module_signup_status : 'My Registration Status',
		module_signup_discipline: 'discipline',
		module_signup_position: 'Training Classroom Locations',
		module_signup_food: 'Surrounding restaurants',
		module_signup_travel: 'pre-book fly ticket',
		module_signup_visa : 'Visa progress',
		module_news : 'up to date',
		module_host : 'Most Popular',
		footer_nav_faq : 'FAQ',
		footer_nav_home : 'iLearning Home',
	});




	var cookie = (function(arr){
		var obj = {}
		for(var i=0,item;i<arr.length;i++){
			item = arr[i].split('=');
			item[0] && (obj[item[0]] = item[1]);
		}
		return obj;
	})(document.cookie.split(';'));

	$translateProvider.preferredLanguage(cookie.lang || 'zh');
	// $translateProvider.useLocalStorage();
	// $translateProvider.useStaticFilesLoader({prefix: 'i18n/',suffix: '.json'});
}]);