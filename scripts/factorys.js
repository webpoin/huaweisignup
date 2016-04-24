





// 热门搜索
angular.module('app').factory('PopularSearches',['$http',function($http){

	var res = {}




	console.log(234);

	return res;
	
}]);




// 报名状态
angular.module('app').factory('Registration',['$http',function($http){

	var res = {}

	$http({
		method: 'post',
		url : 'http://localhost:3000/',
	}).then(function(json) {

		var json = {
			"version": 0,
			"result": true,
			"message": "这是提示或异常信息",
			"error": "B",
			"total": 0,
			"data": [
				{"id": 1111, "url" : "#", "name":"FBB"},
				{"id": 1111, "url" : "#", "name":"李冰班"},
				{"id": 1111, "url" : "#", "name":"解决方案重装旅"},
				{"id": 1111, "url" : "#", "name":"青训班"},
				{"id": 1111, "url" : "#", "name":"深圳"},
				{"id": 1111, "url" : "#", "name":"市场青训班"},
				{"id": 1111, "url" : "#", "name":"澳大利亚"}
			]
		}
		angular.extend(res,json.data);

		// $scope.hot = json.data.data;
	});


	console.log(234);

	return res;
	
}]);