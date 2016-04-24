
// 结果页
angular.module('app').controller('DetailCtrl', ['$scope','$location','service', function ($scope,$location,service ) {

	var parameter = $location.search();
	

	scheduler.locale = {  
	    date:{  
	        month_full:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],  
	        month_short:["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
	        day_full:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],  
	        day_short:["日","一","二","三","四","五","六"]  
	    },  
	    labels:{  
	        dhx_cal_today_button:"今天",  
	        day_tab:"日",  
	        week_tab:"周",  
	        month_tab:"月",  
	        new_event:"新日程安排",  
	        icon_save:"保存",  
	        icon_cancel:"取消",  
	        icon_details:"详细",  
	        icon_edit:"编辑",  
	        icon_delete:"删除",  
	        confirm_closing:"",  
	        confirm_deleting:"确定要删除该工作计划?",  
	        section_description:"工作计划"  
	    }  
	}; 


	scheduler.config.xml_date="%Y-%m-%d %H:%i";
	scheduler.config.default_date="%Y年%m月%d日";
	scheduler.config.month_date="%Y年 %m月";
	scheduler.config.day_date="%m月%d日";
	scheduler.config.drag_resize=false; 
	scheduler.config.drag_move=false; 
	scheduler.config.drag_create=false; 
	scheduler.config.dblclick_create=false;
	scheduler.config.edit_on_create=false;
	scheduler.config.details_on_create=false;

	scheduler.config.first_hour = 8;
	scheduler.config.last_hour = 22;
	scheduler.config.multi_day = true;
	scheduler.config.date_step = "7"
	scheduler.init('scheduler_here', new Date(2016, 0, 4));
	scheduler.templates.event_class=function(s,e,ev){ return ev.custom?"custom":""; };
	scheduler.attachEvent("onClick", function(id) {return false;});



	// 班级信息 接口15
	service({
		type: 'getLearningInfo',
		subProjectId: parameter.subProjectId,
		subProjectCode: parameter.subProjectCode
	}, function(json) {
		$scope.class = json.data[0];
	});


	// 课程表
	service({
		type: 'getSchedule',
		subProjectId: parameter.subProjectId,
		subProjectCode: parameter.subProjectCode
	}, function(json) {


		var addDate = function (date, days) {
			var d = new Date(date);
			d.setDate(d.getDate() + days);
			var month = d.getMonth() + 1;
			var day = d.getDate();
			if (month < 10) {
				month = "0" + month;
			}
			if (day < 10) {
				day = "0" + day;
			}
			return d;
		}

		var data = json.data[0];
		var arr = [];
		var id = 0;


		// 添加天数
		for(var i=1;i<=data.totalDayCount;i++){
			arr.push({
				"id": ++id,
				"start_date": addDate(new Date(2016, 0, 4),i-1),
				"end_date": addDate(new Date(2016, 0, 4),i),
				"text": '第'+i+'天',
				"details": '111111'
			});

		}

		// 添加数据
		angular.forEach(data.courseListData, function(value, key) {

			var day = parseInt(value.day.replace(/\D/gi,''));
			var date1 = addDate(new Date(2016, 0, 4),day);
			var date2 = addDate(new Date(2016, 0, 4),day);


			value.startTime = value.startTime || '00:00';
			
			date1.setHours(value.startTime.split(':')[0]);
			date1.setMinutes(value.startTime.split(':')[1]);

			date2.setHours(value.endTime.split(':')[0]);
			date2.setMinutes(value.endTime.split(':')[1]);

			arr.push({
				"id": ++id,
				"start_date": date1,
				"end_date": date2,
				"text": value.courseCode,
				"details": value.courseName
			});

		});

		scheduler.parse(arr,"json");
	});




	/*********************	接口16和接口5的关系	********************************/
	// 全年安排

	$scope.getClasses = function(month){

		// 全年安排 接口16
		service({
			type: 'getClassInfo',
			subProjectId: parameter.subProjectId,
			subProjectCode: parameter.subProjectCode,
			classStatus : 1,
			month : month,
		}, function(json) {
			$scope.arrange = json.data;
			var classId = [];
			var obj = {};

			// 取classid
			angular.forEach($scope.arrange, function(value, key) {
				classId.push(value.classId);
				obj[value.classId] = value;
			});

			// 接口5
			service({
				type: 'getApplyStatus',
				classId: classId.join(',')
			}, function(json) {
				// 数据合并
				angular.forEach(json.data, function(value, key) {
					if(obj[value.classId]){
						angular.extend(obj[value.classId], value);

						var temp = obj[value.classId];
							temp.statusType = 'gray';


						if(temp.curEnrollStatus == 1 || temp.curEnrollStatus == 2){ // if 员工报名状态 curEnrollStatus 是 1已报名 或者 2 待审批  then
							temp.statusName = '已报名' // 显示 "已报名" end
						}else if(temp.curEnrollStatus == 5){ //   if 员工报名状态 是 5 已候补 then
							temp.statusName = '已候补' // 显示 "已候补" end
						}else{ // if 员工报名状态 是 已取消 或者 员工报名状态 then

							if(temp.classEnrollFlag){//if  是否可报名 = 是  then
								if(temp.totalNum > temp.enrollNum){ // if (已报名人数<z最大报名人数)
									temp.statusName = '申请报名'; // then 显示 "申请报名"
									temp.statusType = 'green';
								}else if(temp.classCandidateFlag && (new Date(temp.beginDate).getTime() - new Date().getTime())> 7*86400000){ //   else if  (已报名人数>最大报名人数) &&  当前时间 < 班级开始时间-7 天 && 是否可候补= 是
									temp.statusName = '申请候补' // then 显示 "申请报名"
									temp.statusType = 'blue';
								}else{
									temp.statusName = '报名截止' // 显示 "已候补" end
								}

							}else{

								temp.statusName = '报名截止' // 显示 "已候补" end
							}

						}
					} 
				});
				obj = null;



			});


		});

	}

	// 设置月分
	var month = new Date().getMonth() + 1;
	$scope.month = [];
	angular.forEach('1,2,3,4,5,6,7,8,9,10,11,12'.split(','), function(value, key) {
		$scope.month.push({'val':value,active:value == month});
	});
	$scope.getClasses(month);


	// 点击月份
	$scope.setMonth = function(month){

		angular.forEach($scope.month,function(value,key){
			value.active = value.val == month;
		});

		$scope.getClasses(month);
	}


	// 打开对话框
	$scope.openDialog = function(item){

		$scope.dialog = item;

		if(item.statusName == '申请报名'){
			$scope.dialog.signupType = 'setSignup';
		}else if(item.statusName == '申请候补'){
			$scope.dialog.signupType = 'setWaiting';
		}else{
			return false;
		}

		// 获得接口人信息 接口22
		// service({
		// 	type: 'getInterfacePelple',
		// }, function(json) {

		// });

		// console.log(Utils.getAuditPerson(1234321))


		$scope.showdialog = true;
		
	}



	// 点击确定提交
	$scope.signUp = function(item){

		// 报名 接口12,13
		service({
			type: item.signupType,
			"userId": "11", //用户ID 非必填String
			"classId": item.classId,//班级id  ,必填 int
			"auditUserCode ":"权签人工号"  //非必填 ，Long
		}, function(json) {
			$location.search('classId',item.classId);
			$location.path('/success');

		});

	}














}]);
