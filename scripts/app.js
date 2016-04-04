
var app = angular.module('app', [
	// 'ngRoute',
	// 'ui.slider',
	// 'ui.InfiniteScroll',
	// 'LocalStorageModule',
	'pascalprecht.translate',
]);






// app.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
// 	localStorageServiceProvider.setPrefix('hw');
// }]);



// app.filter("T", ['$translate', function($translate) {
// 	return function(name,key) {

// 		console.log(name)
// 		console.log(key)
// 		console.log($translate.instant(key));
// 		if(key){
// 			// return $translate.instant(key);
// 			return name;
// 		}
// 	};
// }]);



// 中英文切换
app.controller('LanguageSwitchingCtrl', ['$scope', '$translate', function (scope, $translate) {
    scope.switching = function(lang){
        $translate.use(lang);
        console.log(lang);
        window.localStorage.lang = lang;
        // window.location.reload();
    };
    scope.cur_lang = $translate.use();
}]);





// // 路由
// app.config(['$routeProvider',function($routeProvider) {

// 	$routeProvider.when('/login', {
// 		templateUrl: 'login.html',
// 		controller: 'LoginCtrl'
// 	})
// 	.when('/main', {
// 		templateUrl: 'main.html',
// 		controller: 'MainCtrl'
// 	})
// 	.when('/list', {
// 		templateUrl: 'list.html',
// 		controller: 'ListCtrl'
// 	})
// 	.when('/user', {
// 		templateUrl: 'user.html',
// 		controller: 'UserCtrl'
// 	})
// 	.otherwise({
// 		redirectTo: '/main'
// 	});

// }]);


// // 自定义标签
// // 获取焦点
// app.directive('setFocus', function(){
// 	return function(scope, element) {element[0].focus();};
// });


// // 显示html
// app.directive('htmlString', function() {		
// 	return function(scope, el, attr) {
// 		attr.htmlString && scope.$watch(attr.htmlString, function(data) {el.html(data || '');});
// 	};
// });