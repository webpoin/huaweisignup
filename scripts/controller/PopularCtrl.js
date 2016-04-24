
// 首页最新动太
angular.module('app').controller('PopularCtrl', ['$scope', '$http', 'HttpUrl', function ($scope, $http, HttpUrl ) {

	$http({
		method: 'get',
		url : HttpUrl['getPopular'] || ''
	}).then(function(json) {
		$scope.list = json.data.data;
	});

}]);
