
// 首页功能
angular.module('app').controller('MainCtrl', ['$scope', 'service', function ($scope, service) {


	// <script src="scripts/controller/ChooseCtrl.js"></script>
	// <script src="scripts/controller/ApplyNoticeCtrl.js"></script>
	// <script src="scripts/controller/NewestCtrl.js"></script>
	// <script src="scripts/controller/PopularCtrl.js"></script>


	$scope.chooseList = [];
	$scope.user = {list:[]}


	/***********************	可以选择		*************************/

	// 可以选择 接口16
	service({type:'getClassInfo',curPage:1,pageSize:5},function(json){
		$scope.chooseList = json.data;
		var subProjectId = [];
		var obj = {};

		// 取subProjectId
		angular.forEach($scope.chooseList,function(value,key){
			subProjectId.push(value.subProjectId);
			obj[value.subProjectId] = value;
 		});

		// 接口15
		service({type:'getLearningInfo',subProjectId:subProjectId.join(',')},function(json){
			// 数据合并
			angular.forEach(json.data,function(value,key){
				obj[value.subProjectId] && angular.extend(obj[value.subProjectId],value);
			});
			obj = null;
		});

	});



	/***********************	我的报名状态		*************************/
	// 我的报名状态 接口19
	service({type:'getUserInfo'},function(json){
		angular.extend($scope.user,json.data?json.data[0]:{});
	});




	// 我的报名状态 接口7
	service({
		type: 'getClassReady',
		"curPage":1,
		"pageSize":20
	},function(json){

		var classId = [];
		var obj = {}

		$scope.user.list = json.data;
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
	});




	/***********************	报名须知		*************************/
	Utils.getHtmlArea('enrollNotice_zh.html',function(data){
		$scope.noticeData = data;
	});


	/***********************	最新		*************************/
	service({type:'getNewest',curPage:1,pageSize:5},function(json){
		$scope.newsList = json.data;
	});

	/***********************	最热		*************************/
	service({type:'getPopular',curPage:1,pageSize:5},function(json){
		$scope.popularList = json.data;
	});





}]);
