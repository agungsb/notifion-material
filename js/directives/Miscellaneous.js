'use strict';

app.directive('repeatDone', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, iAttrs) {
                if (scope.$last) {
                    $rootScope.$emit('repeatDone');
                }
            }
        };
    }]);