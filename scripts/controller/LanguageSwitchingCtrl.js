
// 中英文切换
angular.module('app').controller('LanguageSwitchingCtrl', ['$scope', '$translate','$cookies', function ($scope, $translate,$cookies) {
    $scope.switching = function(lang){
        $translate.use(lang);
        $cookies.put('lang',lang);
        // window.location.reload();
    };
    $scope.cur_lang = $translate.use();
}]);
