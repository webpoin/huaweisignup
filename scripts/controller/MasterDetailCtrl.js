
// 搜索功能
angular.module('app').controller('MasterDetailCtrl', ['$scope', '$http', 'HttpUrl', function ($scope, $http, HttpUrl ) {




	$scope.openDialog = function(){


		$scope.dialog = true;
	}




	$scope.closeDialog = function(){


		$scope.dialog = false;
	}


}]);
