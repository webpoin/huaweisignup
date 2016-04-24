// 工具类
var Utils = new Object();
// 上下文
var Context = new Object();

(function($) {
	function contextInitialize() {
		//console.log("util.init");
		// Context继承workspacevo
		//Context = $.extend(Context, workspaceVO);
		// 这里初始化当前页面的参数信息可以通过Context.getRequest("paramname")
		initRequest();
		Context.getRequest = function(paramname) {
			if (paramname) {// 如果产生不为空，返回对于参数名的值，否则返回所有参数数组
				return Context.request[paramname];
			}
			return Context.request;
		};
		var name = window.location.pathname.substring(0,window.location.pathname.substr(1).indexOf('/')+1);
		var rootUrl ="http://"+window.location.host+name;
		Context.rootUrl=rootUrl;

	}
	var lookupCache={};
	/**
	 * 得到lookup基础数据项集合，常用于显示在combobox中
	 * @param {string}  code classifyCode 必须传递
	 * @param {string}  parentItemCode 父项 itemCode ，可不传
	 */
	Utils.lookup=function(code, parentItemCode, lang) {
		
		lang=lang || "";
		parentItemCode = parentItemCode || "";
		var cacheKey = "" + code + "_&_" + parentItemCode+lang;
		var datas = lookupCache[cacheKey];
		if (!datas) {
			$.ajax({
				url : lang? "services/jalor/lookup/itemquery/list/lang/"+ code: "services/jalor/lookup/itemquery/list/"+ code,
				async : false,
				success : function(data) {
					datas = data || [];
					lookupCache[cacheKey] = datas;
				},
				error : function() {
					if(console&&console.log){
						console.log("查询数据失败");
					}
				}
			})
		}
		return datas;
	}
	
	//查询数据字典配置值
	Utils.registyValue = [];
	Utils.getRegisty = function(name, parentPath, includeInvalid){
		if(!name || '' == name || !parentPath || '' == parentPath){
			return "";
		}
		$.ajax({
			url : "services/jalor/registry/query/list/"+parentPath+"/"+includeInvalid,
			async : false,
			success : function(data) {
				var datas = data || [];
				for(var i=0; i<datas.length; i++){
					var dataObj = datas[i];
					if(dataObj && dataObj.value && name == dataObj.name){
						var dataObjValue = dataObj.value.split("|");
						for(var j=0; j<dataObjValue.length; j++){
							Context.registyValue.push(dataObjValue[j]);
						}
					}
				}
				return Context.registyValue;
			},
			error : function() {
				if(console&&console.log){
					console.log("查询数据失败");
				}
				return null;
			}
		});
	}
	
	// 不考虑spa页面地址变化情况，以后变化的参数都本地获取，仅考虑页面初始化时的参数
	function initRequest() {
		var args = new Object();
		var fullUrl = window.location.search;
		var tempUrl = fullUrl.split("?");
		if (tempUrl.length > 1) {
			var pairs = tempUrl[1].split("&");
			for (var i = 0; i < pairs.length; i++) {
				var pos = pairs[i].indexOf('=');
				if (pos == -1)
					continue;
				var argname = pairs[i].substring(0, pos);
				var value = pairs[i].substring(pos + 1);
				value = decodeURIComponent(value);
				args[argname] = value;
			}
		}
		Context.request = args;
	}
	/**
	 * @description 初始化用户对象，将用户的权限与无权限访问的url转换成map
	 * @param {object}
	 *            user
	 */
	/*function initPermission() {
		var user = Context.user;
		if (!user.currentRole)
			return;
		var permissions = user.currentRole.personalPermissions;
		var noPermUrls = user.currentRole.noPermissionUrl;
		this.perms = {};
		this.res = {};
		if (permissions) {
			for (var i = 0; i < permissions.length; i++) {
				this.perms[permissions[i]] = true;
			}
		}
		if (noPermUrls) {
			for (var i = 0; i < noPermUrls.length; i++) {
				this.res[noPermUrls[i]] = true;
			}
		}
		// 清空原有数据对象
		permissions = user.currentRole.personalPermissions = null;
		noPermUrls = user.currentRole.noPermissionUrl = null;
		Context.perms = this.perms;
		Context.noPermUrls = this.res;
	};
	function utilsInitialize() {
		 i18n initial 
		$.i18n.properties({
					name : "i18n?lang=" + Context.currentLanguage,
					path : "servlet/",
					mode : "map",
					language : Context.currentLanguage.substr(0, 2),
					callback : function() {
						Utils.i18n = $.i18n.prop
					}
				});
	}*/
	Utils.localKey="ilportal"
	Utils.save=function(key,value){
		if(!localStorage){
			//如果本地存储不可用，声明一个对象，作为缓存
			localStorage={};
		}
		localStorage[Utils.localkey+"-"+key]=value;
	}
	Utils.get=function(key){
		if(!localStorage){
			//如果本地存储不可用，声明一个对象，作为缓存
			localStorage={};
		}
		return localStorage[Utils.localkey+"-"+key];
	}
	
	Utils.setLanguageCookie = function (language) {
	    var d = new Date();
	    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
	    var expires = "expires=" + d.toUTCString();
	    document.cookie = "language=" + escape(language) + "; " + expires + "; path=/";
	};
	//获取当前cookie中默认的语言选项，如果没有，选取浏览器中的语言
	Utils.getCurrentLanguage = function(){
		var lan= null;
		var arrStr = document.cookie.split("; ");
		for (var i = 0; i < arrStr.length; i++) {
		    var temp = arrStr[i].split("=");
		    if (temp[0] == 'language') {
		        lan = unescape(temp[1]);
		    }
		}
		if(lan==null){
			lan = "zh_CN"
			Utils.setLanguageCookie(lan);
		}
		return lan;
	}
	var localLanguage="zh_CN";	
	//获取当前语言
	Utils.getLocalLanguage = function(){	
	   return localLanguage;
	}
	Utils.changeLanguage = function(){
//		$.ajax({url:"services/m/frontPaei18nService/findI18nMap",data: angular.toJson({
//		"type":2,
//		"subid":subWebId,
//		"callType":1
//	}),contentType:"application/json; charset=UTF-8",type:"POST",async: false}).success(function(data) {
//		$scope.advertisements = data[0].data;
//		$scope.placard = data[1].data;
//	});
		var lan = Utils.getCurrentLanguage();
	    if(lan=="zh_CN"){
	    	lan = "en_US";
	    }else{
	        lan = "zh_CN";
	    }
	    Utils.setLanguageCookie(lan);	    
		$.ajax({
				url : "services/encoding/frontPagei18nService/setSessionLanage/"+ lan,
				type: "POST",
				async : false,
				dataType :"json",
				success : function(data) {
					setTimeout(location.reload(),2000);
				},
				error : function() {
					if(console&&console.log){
						console.log("查询数据失败");
					}
				}
			});			
	}	
	
	var languageCache={};
	Utils.getI18nMessage = function(lan){
//		$.ajax({url:"services/m/frontPaei18nService/findI18nMap",data: angular.toJson({
//		"type":2,
//		"subid":subWebId,
//		"callType":1
//	}),contentType:"application/json; charset=UTF-8",type:"POST",async: false}).success(function(data) {
//		$scope.advertisements = data[0].data;
//		$scope.placard = data[1].data;
//	});
	    var returnJson = {};
	    localLanguage = lan;
		$.ajax({
				url : "services/encoding/frontPagei18nService/findI18nMap/"+ lan,
				type: "GET",
				async : false,
				dataType :"json",
				success : function(data) {
					returnJson = data;
				},
				error : function() {
					if(console&&console.log){
						console.log("查询数据失败");
					}
				}
			})
		languageCache = returnJson;	
		return returnJson;
	}
	Utils.i18n = function(key){		
		return 	languageCache[key];
	}	
	contextInitialize();
	//对请求进行拦截，判断本地语言和cookie里面的语言种类不一样，就页面刷新
	
	
	Utils.getHtmlArea = function( urlPath,success) {
		$.ajax({
			url : urlPath,
			type: "GET",
			async : false,
			dataType :"html",
			success : success || function(data) {
				return data;
			},
			error : function() {
				if(console&&console.log){
					console.log("查询数据失败");
				}
				return  null;
			}
		})
	}

	
	Utils.getAuditPerson = function(employeeNumber){
			var roleId = 102;
			var deptCode='121212121';
			var urlPath="servlet/proxy/params/amsService?sysCode=iclass&sysPsw=SQBN2IRm%2bDSA4JmJHIS9lQ%3d%3d&apprType=1&roleId="+roleId+"&apprCode="+deptCode+"&layerFlag=1&autoSearch=1";
	 		$.ajax({
	 	    		type: "GET",
	 	    		dataType: "json",
	 	    		async: false,
	 	    		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	 	            url:urlPath,
	 				success: function(data){
	 					if(data!=null){
	 						//有可能有多个
	 						var approverList = data.approverList;
			 				if(approverList!=null && approverList.length>0){
	 							var reobj = {};
								reobj.status = 1;
								reobj.sysDate = "2016-4-12 14:40:55";
								reobj.totalCount = approverList.length;
								reobj.data = [];
								for(var i =0;i<newArray.length;i++){
										var obj = {};
										obj.employeeNumber = newArray[i].USER_NUMBER;
										obj.userName = newArray[i].ENGLISH_NAME;
										reobj.data[i] = obj; 
	 							}
								
	 						}
	 					}
	 				}
	 		 });
	 		
			 return reobj;
	}
	
	
	/*utilsInitialize();
	initPermission();*/
}(jQuery))
