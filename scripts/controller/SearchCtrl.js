
// 搜索功能
angular.module('app').controller('SearchCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {


	$scope.popularSearches = [];

	// $http({
	// 	method: 'get',
	// 	url : '#',
	// }).then(function(json) {

	// 	var json = {
	// 		"version": 0,
	// 		"result": true,
	// 		"message": "这是提示或异常信息",
	// 		"error": "B",
	// 		"total": 0,
	// 		"data": [
	// 			{"id": 1111, "url" : "#", "name":"FBB"},
	// 			{"id": 1111, "url" : "#", "name":"李冰班"},
	// 			{"id": 1111, "url" : "#", "name":"解决方案重装旅"},
	// 			{"id": 1111, "url" : "#", "name":"青训班"},
	// 			{"id": 1111, "url" : "#", "name":"深圳"},
	// 			{"id": 1111, "url" : "#", "name":"市场青训班"},
	// 			{"id": 1111, "url" : "#", "name":"澳大利亚"}
	// 		]
	// 	}
	// 	angular.extend($scope.popularSearches,json.data);

	// });


	$scope.searchKey = function(keyword){

		$location.path('/search');
		$location.search('keyword',keyword);
	}

	$scope.searchSubmit = function(){

		if(!$scope.keyword){return}

		$location.path('/search');
		$location.search('keyword',$scope.keyword);

	}


}]);
