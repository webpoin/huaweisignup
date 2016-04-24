
// 结果页
angular.module('app').controller('FilterCtrl', ['$scope',  '$location','service',function ($scope,$location,service) {


	var pageSize = 20;
	var curPage = -1; 	// 分页条数
	$scope.list = [];
	$scope.person = {keyword:$location.search().keyword || ''};

	var search = function(){


		// 搜索列表 接口2
		service({
			type: 'getSearchList',
			curPage: curPage,
			pageSize : pageSize,
			keywords: $scope.person.keyword
		}, function(json) {

			var subProjectId = json.data? json.data.join(',') : '';
			var obj = {};

			$scope.paginationConf.totalItems = json.totalCount;
			$scope.totalPage = Math.ceil($scope.paginationConf.totalItems/$scope.paginationConf.itemsPerPage);


			// 搜索列表 接口16
			service({type:'getClassInfo',subProjectId:subProjectId},function(json){
				angular.forEach(json.data, function(value, key) {
					if(obj[value.subProjectId]){
						angular.extend(obj[value.subProjectId],value);
					} else{
						$scope.list.push(value);
						obj[value.subProjectId] = value;
					}
				});
			});

			// 搜索列表 接口15
			service({type:'getLearningInfo',subProjectId:subProjectId},function(json){
				angular.forEach(json.data, function(value, key) {
					if(obj[value.subProjectId]){
						angular.extend(obj[value.subProjectId],value);
					} else{
						$scope.list.push(value);
						obj[value.subProjectId] = value;
					}
				});
			});



		});


	}


	$scope.search = function(){
		if(!$scope.person.keyword){return;}
		curPage = 0;
		search();
	}

	$scope.select = function(keyword){
		$scope.person.keyword = keyword;
		search();
	}



	// 分页
	$scope.paginationConf = {
		currentPage: 1,
		totalItems: 20,
		itemsPerPage: pageSize,
		pagesLength: 9,
		perPageOptions: [10, 20, 30, 40, 50],
		rememberPerPage: 'perPageItems',
		onChange: function(a,b,c){
			var page = $scope.paginationConf.currentPage;
			if(curPage == page ){return;}
			curPage = page -1;
			search();
		}
	};


	// 取筛选信息
	var json = {
		"status": 1,
		"sysDate": "2016-4-12 14:40:55",
		"totalCount": 200,
		"data": [
			{"title": "消费者BG","links" : ["消费者BG战略预备队"]},
	 		{"title": "管理能力","links":["干部高级管理研讨班","监管重装旅","人力资源战略预备队","基层管理者角色认知","代表处HRD赋能","国家CFO发展项目","海外子公司董事赋能","总经理发展项目","领导力精品课"]},
			{"title": "变革项目","links":["变革战略预备队"]},
			{"title": "项目经营与管理","links":["后备干部项目管理与经营短训","行政战略预备队","登舰","研发项目管理专业培训"]},
			{"title": "市场能力","links":["销售项目经理资源池","企业业务BG战略预备队","IT战略预备队","运营商BG销售类新员工培训  解决方案重装旅","行政战略预备队","企业业务战略预备队","公司战略预备队 "]},
			{"title": "交付管理","links":["交付项目管理专业培训","项目管理资源池（公司战略预备队） ","New Employee Orientation(EN/Local)","新员工入职引导培训（中文/深圳）","CSR海外大学生赴华实习项目","新员工入职引导培训（英文/深圳）"]},
			{"title": "新员工培训","links":["新员工入职引导培训（中文/国内研究所）"]}
		]
	}
	$scope.filter = json.data;




}]);
