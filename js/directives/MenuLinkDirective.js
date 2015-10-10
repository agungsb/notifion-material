'use strict';

app.directive('menuLink', function() {
    return {
        scope: {
            section: '='
        },
        templateUrl: 'templates/menu-link.html',
        link: function($scope, $element) {
            var controller = $element.parent().controller();

            $scope.focusSection = function() {
                // set flag to be used later when
                // $locationChangeSuccess calls openPage()
                controller.autoFocusContent = true;
            };
        }
    };
});