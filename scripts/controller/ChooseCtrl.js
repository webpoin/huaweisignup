
// 首页列表
angular.module('app').controller('ChooseCtrl', ['$scope', '$http', 'HttpUrl', function ($scope, $http, HttpUrl ) {

	$http({
		method: 'get',
		url : HttpUrl['getChooseList'] || ''
	}).then(function(json) {

		$scope.list = json.data.data;
	});


	$scope.openDetail = function(){
		location.href = '#/detail';
	}


	$scope.signup = function(){
		location.href = '#/success';
	}

}]);
