'use strict';

function TambahUserCtrl($scope, $http, $state) {
    $http.get("http://localhost/notifion-api/users").success(function(feedback) {
         console.log(feedback);
            if (feedback.result.length == 0) {
                $scope.tableIsEmpty = true;
            } else {
                $scope.tableIsEmpty = false;
            }
            $scope.user = feedback.result;
            $scope.tableReady = true;
    }).error(function(error) {
        console.log(error);
    });
}