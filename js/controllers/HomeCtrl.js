function HomeCtrl($http, $scope, $state, $mdSidenav, $mdUtil, $log) {
    if ((localStorage.getItem('token') == '') || (typeof (localStorage.getItem('token'))) == 'undefined' || (localStorage.getItem('token')) == null) {
        $state.go('login');
    } else {
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
        $http.get('http://localhost/notifion-api/user/' + localStorage.getItem('token')).success(function(feedback) {
            console.log(feedback);
            $scope.user = feedback;
        }).error(function(error) {
            $scope.error = error;
            console.log(error);
        });

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