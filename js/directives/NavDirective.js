app.directive('navDirective', function() {
    return {
        templateUrl: 'templates/nav/nav.html',
        controller: function($http, $scope, $state, $cookieStore) {
            $scope.logout = function(){
                $cookieStore.remove('token');
                $state.go('login');
            }
            $http.get('http://localhost/notifion-api/user/'+$cookieStore.get('token')).success(function(feedback){
                console.log(feedback);
                $scope.user = feedback;
            }).error(function(error){
                console.log(error);
            })
        },
        link: function(scope, element, attr) {
            var collapsibleElement = element.find('.collapsible');
            $(collapsibleElement).collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
            // Initialize collapse button
            var buttonCollapseElement = element.find('.button-collapse');
            $(buttonCollapseElement).sideNav();
        }
    };
});