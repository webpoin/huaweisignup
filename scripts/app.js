
var app = angular.module('app', [
	'ngRoute',
	'tm.pagination', // 分页
	// 'ui.slider',
	// 'ui.InfiniteScroll',
	// 'LocalStorageModule',
	'pascalprecht.translate',
	'ngCookies'
]);





// 路由
app.config(['$routeProvider',function($routeProvider) {

	$routeProvider.when('/main', {templateUrl: 'main.html',controller: 'MainCtrl'})
	.when('/master', {templateUrl: 'master.html',controller: 'MasterCtrl'})
	.when('/search', {templateUrl: 'search.html' ,controller: 'FilterCtrl' })
	.when('/user', {templateUrl: 'user.html' ,controller: 'UserCtrl' })
	.when('/detail', {templateUrl: 'detail.html' ,controller: 'DetailCtrl' })
	.when('/success', {templateUrl: 'success.html' ,controller: 'SuccessCtrl' })
	.otherwise({redirectTo: '/main'});

}]);


// ajax路由映射
angular.module('app').factory('service',['$http',function($http){

	var map1 =  {
		getSearchList 	: './ajax/2_getSearchList.json', // 2 查询学习方案.txt
		getPopular		: './ajax/3_getPopular.json', // 3 最热学习方案.txt
		getNewest		: './ajax/4_getNewest.json', // 4 最新学习方案.txt
		getApplyStatus 	: './ajax/5_getApplyStatus.json', // 5 获取学员状态信息.txt
		getClassmate 	: './ajax/6_getClassmate.json', // 6 获取班级已报名学员.txt
		getClassReady	: './ajax/7_getClassReady.json', // 7 获取学员已报名未开班的班级.txt
		setApprovalPass : './ajax/8_setApprovalPass.json', // 8 提交审批通过学员报名.txt
		setApprovalReject : './ajax/9_setApprovalReject.json', // 9 提交审批驳回学员报名.txt
		getApproval 	: './ajax/10_getApproval.json', // 10 获取审批历史记录.txt
		getApprovalMine : './ajax/11_getApprovalMine.json', // 11 获取我的待审批.txt
		setSignup 		: './ajax/12_setSignup.json', // 12 提交报名.txt
		setWaiting 		: './ajax/13_setWaiting.json', // 13 提交候补.txt
		setSignupCancel : './ajax/14_setSignupCancel.json', // 14 提交报名取消.txt
		getLearningInfo : './ajax/15_getLearningInfo.json', // 15获取学习方案详情.txt
		getClassInfo 	: './ajax/16_getClassInfo.json', // 16获取班级详情.txt
		getSchedule 	: './ajax/17_getSchedule.json', // 17 课程表.txt
		getProject 		: './ajax/18_getProject.json', // 18 学习项目.txt
		getUserInfo 	: './ajax/19_getUserInfo.json', // 19 用户信息（王伟东）.txt
		getInterfacePelple: './ajax/22_getUserInfo.json', // 22	获取权签人接口
		setWaitingCancel: './ajax/23_setWaitingCancel.json', // 23 提交候补取消.txt
		getIfAble 		: './ajax/24_getIfAble.json', // 24 检查是否在资源池.txt
		getApprovalOpinion : './ajax/25_getApprovalOpinion.json', // 25 获取审批通过意见.txt
	};


	var tmpHost = "/huportal.dev";
	var map =  {
		getSearchList 	: tmpHost+'/services/huportal/queryenroll/enrollService/findSubprjIds', // 2 查询学习方案.txt
		getPopular		: tmpHost+'/services/huportal/queryenroll/enrollService/findhotsubprj', // 3 最热学习方案.txt
		getNewest		: tmpHost+'/services/huportal/queryenroll/enrollService/findnewsubprj', // 4 最新学习方案.txt
		getApplyStatus 	: tmpHost+'/services/huportal/enroll/enrollSubmissionService/queryEnrollStatus', // 5 获取学员状态信息.txt
		getClassmate 	: tmpHost+'/services/huportal/enroll/enrollSubmissionService/queryEnrolledStudents', // 6 获取班级已报名学员.txt
		getClassReady	: tmpHost+'/services/huportal/enroll/enrollSubmissionService/queryEnrolledAndPublishedClasses', // 7 获取学员已报名未开班的班级.txt
		setApprovalPass : tmpHost+'/services/huportal/enroll/enrollSubmissionService/commitApproval', // 8 提交审批通过学员报名.txt
		setApprovalReject : tmpHost+'/services/huportal/enroll/enrollSubmissionService/commitRejected', // 9 提交审批驳回学员报名.txt
		getApproval 	: tmpHost+'/services/huportal/enroll/enrollSubmissionService/queryCommitHistory', // 10 获取审批历史记录.txt
		getApprovalMine : tmpHost+'/services/huportal/enroll/enrollSubmissionService/queryMyApproveList', // 11 获取我的待审批.txt
		setSignup 		: tmpHost+'/services/huportal/enroll/enrollSubmissionService/commitEnroll', // 12 提交报名.txt
		setWaiting 		: tmpHost+'/services/huportal/enroll/enrollSubmissionService/commitCandidate', // 13 提交候补.txt
		setSignupCancel : tmpHost+'/services/huportal/enroll/enrollSubmissionService/commitEnrollCancel', // 14 提交报名取消.txt
		getLearningInfo : tmpHost+'/services/huportal/queryenroll/enrollService/findsubprjInfo', // 15获取学习方案详情.txt
		getClassInfo 	: tmpHost+'/services/huportal/queryenroll/enrollService/findclassInfo', // 16获取班级详情.txt
		getSchedule 	: tmpHost+'/services/huportalplan/project/learningSubProjectQueryService/queryEnrollSubProjectByCode', // 17 课程表.txt
		getProject 		: tmpHost+'/services/huportalplan/project/learningSubProjectQueryService/queryProjectInfo', // 18 学习项目.txt
		getUserInfo 	: tmpHost+'/services/huportalplan/userInfo/userInfoService/queryUserInfo', // 19 用户信息（王伟东）.txt
		
		getInterfacePelple: '-------', // 22	获取权签人接口

		setWaitingCancel: tmpHost+'/services/huportal/enroll/enrollSubmissionService/commitCandidateCancel', // 23 提交候补取消.txt
		getIfAble 		: tmpHost+'/services/huportal/enroll/enrollSubmissionService/isExistResourse', // 24 检查是否在资源池.txt
		getApprovalOpinion : tmpHost+'/services/huportal/enroll/enrollSubmissionService/queryAuditAdvice', // 25 获取审批通过意见.txt
	};



	return function(req,success,error){

		success = success || function(){};
		error = error || function(){};

		var url = map[req.type];
		var method = 'setApprovalPass,setApprovalReject,setSignup,setWaiting,setSignupCancel,setWaitingCancel'.indexOf(req.type) <0 ? 'get' : 'post';

		// $http({
		// 	method: 'get',
		// 	url : map1[req.type],
		// 	params: req
		// }).then(function(httpinfo){
		// 	console.log(JSON.stringify(req))
		// 	success(httpinfo.data);
		// },error);


		
		// delete req.type;
		$http({
			method: method,
			url : url,
			params: req
		}).then(function(httpinfo){
			console.log( method + ' -> '+JSON.stringify(req));
			console.log('res -> '+JSON.stringify(httpinfo.data));
			success(httpinfo.data);
		},error);


	}
}]);



// 自定义标签
// 获取焦点
app.directive('setFocus', function(){
	return function(scope, element) {element[0].focus();};
});


// 显示html
app.directive('htmlString', function() {		
	return function(scope, el, attr) {
		attr.htmlString && scope.$watch(attr.htmlString, function(data) {el.html(data || '');});
	};
});






// 全局函数，变量
angular.module('app').run([ '$rootScope', '$translate', '$cookies','$location',function($rootScope,$translate,$cookies,$location) {

	// 报名
	$rootScope.signup = function(){

		location.href = '#/success';
		
	}

	// 打开详情
	$rootScope.detail = function(item){
		$location.search('subProjectId',item.subProjectId);
		$location.search('subProjectCode',item.subProjectCode);
		$location.path('/detail');
	}

	// 切换中英文
	$rootScope.switchLang = function(lang) {
		$translate.use(lang);
		$cookies.put('lang', lang);
		// window.location.reload();
	};
	$rootScope.cur_lang = $translate.use();
}]);

