
// 首页报名须知
angular.module('app').controller('ApplyNoticeCtrl', ['$scope', '$http', 'HttpUrl', function ($scope, $http, HttpUrl ) {

	$http({
		method: 'get',
		url : HttpUrl['getApplyNotice'] || ''
	}).then(function(json) {
		$scope.data = json.data.data;
	});

}]);
