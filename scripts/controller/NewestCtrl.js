
// 首页最新动太
angular.module('app').controller('NewestCtrl', ['$scope', '$http', 'HttpUrl', function ($scope, $http, HttpUrl ) {

	$http({
		method: 'get',
		url : HttpUrl['getNewest'] || ''
	}).then(function(json) {
		$scope.list = json.data.data;
	});

}]);
