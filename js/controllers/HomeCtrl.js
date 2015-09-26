function HomeCtrl($http, $scope, $state, $mdSidenav, $mdUtil, $log, $rootScope) {
    if ((localStorage.getItem('token') == '') || (typeof (localStorage.getItem('token'))) == 'undefined' || (localStorage.getItem('token')) == null) {
        $state.go('login');
    } else {
        $scope.user = $rootScope.userInfo;
        $scope.closeSidenav = function() {
            $mdSidenav('left').close().then(function() {
                $log.debug('close LEFT is done');
            });
        };
        $scope.changeState = function(state) {
            $state.go(state);
        };
        $scope.logout = function() {
            localStorage.removeItem('token');
            $state.go('login');
        };

        $scope.toggleLeft = buildToggler('left', $mdUtil, $mdSidenav, $log);
    }
}

function buildToggler(navID, $mdUtil, $mdSidenav, $log) {
    var debounceFn = $mdUtil.debounce(function() {
        $mdSidenav(navID).toggle().then(function() {
            $log.debug("toggle: " + navID + " is done");
        });
    }, 300);
    return debounceFn;
}