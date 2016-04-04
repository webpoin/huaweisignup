// 国际化支持
angular.module('app').config(['$translateProvider', function($translateProvider) {


	// 中文
	$translateProvider.translations('zh', {
		header_title: '华为大学',
	});


	// 英文
	$translateProvider.translations('en', {
		header_title: 'huawei university',
		containers: 'Containers',
		images: 'Images',
		configuration: 'Configuration',
		more: 'More',
		need_help: 'Need Help',
	});


	$translateProvider.preferredLanguage(window.localStorage.lang || 'zh');
	// $translateProvider.useStaticFilesLoader({prefix: 'i18n/',suffix: '.json'});
}]);