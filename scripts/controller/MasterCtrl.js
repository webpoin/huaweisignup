
// 搜索功能
angular.module('app').controller('MasterCtrl', ['$scope', 'service', function ($scope, service ) {


	// 默认显示待审批
	$scope.approved = false;
	$scope.detail = {}


	var pageSize = 15;	// 分页条数
	var curPage = -1; 	// 分页条数
	

	// 已审批
	var getDataByApproved = function(){

		// 10 获取审批历史记录
		service({
			type:'getApproval',
			curPage: curPage,
			pageSize: pageSize
		},function(json){
			$scope.list = json.data;
			$scope.paginationConf.totalItems = json.totalCount;
		});


	}

	// 待审批
	var getDataByUnapproved = function(){
		// 11 获取我的待审批
		service({
			type:'getApprovalMine',
			curPage: curPage,
			pageSize: pageSize
		},function(json){
			console.log(json)
			$scope.list = json.data;
			$scope.paginationConf.totalItems = json.totalCount;
		});
	}


	$scope.changeApproved = function(status){

		$scope.showdetail = false;
		if($scope.approved == status){return}

		// 重置分页
		curPage = 0;

		if($scope.approved){
			getDataByApproved();
		}else{
			getDataByUnapproved();
		}
		$scope.approved = status;

	}

	$scope.openDetail = function(item){

		var json = {
			"status": 1,
			"sysDate": "2016-4-12 14:40:55",
			"totalCount": 200,
			"data": {
				"introduction" : "统一变革思想，使xPC掌握变革与流程管理、业务流程运营、内控与风险管理的方法，确保其在变革实践中的灵活运用支撑变革在一线的有效落地。以xPC的角色活运用，支撑变革在一线的有效落地。以xPC的角色 ",
				"endingTime": "2016/04/22",
				"startTime": "2016/03/22",
				"options": [
					{"discript": "统一变革思想，使xPC掌握变革与流程管理、业务流程运营、统一变革思想，使xPC掌握变革与流程管理、业务流程运营"},
					{"discript": "统一变革思想，使xPC掌握变革与流程管理、业务流程运营、业务流程运营、"}
				]
			}
		}

		$scope.showdetail = true;
		$scope.detail = item;
		angular.extend($scope.detail ,json.data);

		$scope.select(json.data.options[0]);

	}



	$scope.select = function(item){
		angular.forEach($scope.detail.options, function(value, key) {value.select = false;});
		item.select = true;
		$scope.detail.select = item;
	}

	$scope.reject = function(){
		$scope.showdialog = true;
	}

	// 审批通过
	$scope.pass = function(detail){



		/*--------------------- 这个没有 ------------------------*/
		// "enrollAuditId":111,//申请id ,必填 int

		// 8 提交审批通过学员报名
		service({
			type:'setApprovalPass',
			enrollAuditId: $scope.detail.auditId,
			commitId: $scope.detail.select.discript
		},function(json){

			curPage = 0;
			if($scope.approved){
				getDataByApproved();
			}else{
				getDataByUnapproved();
			}
			$scope.showdetail = false;

		});

	}


	// 审批驳回
	$scope.reject = function(detail){

		// 9 提交审批驳回学员报名
		service({
			type:'setApprovalPass',
			enrollAuditId: $scope.detail.auditId,
			comment: $scope.rejectText
		},function(json){

			curPage = 0;
			if($scope.approved){
				getDataByApproved();
			}else{
				getDataByUnapproved();
			}	

			$scope.showdialog = false;
			$scope.showdetail = false;
		});
		
	}





	// 管理员信息
	service({type:'getUserInfo'},function(json){
		$scope.master = json.data[0];
	});


	// 分页
	$scope.paginationConf = {
		currentPage: 1,
		totalItems: 20,
		itemsPerPage: pageSize,
		pagesLength: pageSize,
		perPageOptions: [10, 20, 30, 40, 50],
		rememberPerPage: 'perPageItems',
		onChange: function(a,b,c){
			var page = $scope.paginationConf.currentPage;

			if(curPage == page ){return;}

			curPage = page -1;
			if($scope.approved){
				getDataByApproved();
			}else{
				getDataByUnapproved();
			}			
		}
	};

	

}]);
