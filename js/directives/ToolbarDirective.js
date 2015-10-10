'use strict';

app.directive('toolbarDirective', [function() {
        return {
            restrict: 'E',
            scope: {'title': '@?'},
            templateUrl: 'templates/toolbar.html'
        };
    }]).directive('sidenavOpenLeft', ['$mdUtil', '$mdSidenav', '$log',
    function($mdUtil, $mdSidenav, $log) {
        return function(scope, element, attr) {
            var toggleLeft = buildToggler('left', $mdUtil, $mdSidenav, $log);
            function buildToggler(navID, $mdUtil, $mdSidenav, $log) {
                var debounceFn = $mdUtil.debounce(function() {
                    $mdSidenav(navID).toggle().then(function() {
                        $log.debug("toggle: " + navID + " is done");
                    });
                }, 300);
                return debounceFn;
            }
            element.bind('click', function() {
                toggleLeft();
            });
        };
    }]).directive('sidenavCloseLeft', ['$mdSidenav', '$log',
    function($mdSidenav, $log) {
        return function(scope, element, attr) {
            var closeSidenav = function() {
                $mdSidenav('left').close().then(function() {
                    $log.debug('close LEFT is done');
                });
            };
            element.bind('click', function() {
                closeSidenav();
            });
        };
    }]);