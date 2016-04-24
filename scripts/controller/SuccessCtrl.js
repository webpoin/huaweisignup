

// 搜索功能
angular.module('app').controller('SuccessCtrl', ['$scope', 'service', '$location', function ($scope, service, $location) {


	// 接口19 用户信息
	service({type:'getUserInfo'},function(json){
		$scope.user = json.data[0];
	});

	var item = $location.search();


	// 接口5 报名进度
	service({type:'getApplyStatus',classId:item.classId},function(json){
		$scope.step = json.data;
	});

	// 接口6 我的同学
	service({type:'getClassmate',classId:item.classId,orderBy:'memberName'},function(json){
		$scope.classmate = json.data;
	});



	// 接口15 获取学习方案信息
	service({
		type:'getLearningInfo',
		subProjectId: item.subProjectId,
		subProjectCode: item.subProjectCode
	},function(json){
		angular.extend($scope.detail,json.data[0]);
	});

	// 接口16	获取班级信息
	service({
		type: 'getClassInfo',
		subProjectId: item.subProjectId,
		subProjectCode: item.subProjectCode
	}, function(json) {
		angular.extend($scope.detail,json.data[0]);
	});



	// // 接口5 报名进度
	// service({type:'getApplyStatus'},function(json){
	// 	$scope.step = json.data;
	// });

	// // 接口15 获取学习方案信息
	// service({type:'getLearningInfo'},function(json){
	// 	angular.extend($scope.detail,json.data[0]);
	// });

	// // 接口16	获取班级信息
	// service({type:'getClassInfo'},function(json){
	// 	angular.extend($scope.detail,json.data[0]);
	// });

	
	// // 接口6 我的同学
	// service({type:'getClassmate'},function(json){
	// 	$scope.classmate = json.data;
	// });











}]);
