
// 首页功能
angular.module('app').controller('UserCtrl', ['$scope', 'service', function ($scope, service) {

	$scope.sidebar = [];
	$scope.detail = {};
	$scope.active = {}

	$scope.select = function(item){


		$scope.active = item;

		angular.forEach($scope.sidebar,function(each,index,all){
			if(each == item){
				each.select = true;
			}else{
				each.select = false;
			}
		})


		/****************接口数据问题***********************/
		// 进度信息
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


	}


	// 我的报名状态 接口7
	service({
		type: 'getClassReady',
		"curPage":1,
		"pageSize":20
	},function(json){

		var classId = [];
		var obj = {}

		$scope.sidebar = json.data;
		angular.forEach(json.data, function(value, key) {
			classId.push(value.classId);
			obj[value.classId] = value;
		});

		// 我的报名状态 接口5
		service({type:'getApplyStatus',classId:classId.join(',')},function(json){

			// 数据合并
			angular.forEach(json.data,function(value,key){
				value.discript = (value.classStatus[value.curEnrollSchedule-1] || {}).discript;
				obj[value.classId] && angular.extend(obj[value.classId],value);
			});
			obj = null;
		});


		// 触发取详情
		if(json.data && json.data[0]){
			json.data[0].select = true;
			$scope.select(json.data[0]);
		}

	});

	// 取消候补 接口23
	$scope.cancel = function(){
		// $scope.detail

		service({
			type: 'setWaitingCancel',
			"classId":$scope.detail.classId,
		}, function(json) {

			$scope.select($scope.active);


		});
	}


	
}]);
