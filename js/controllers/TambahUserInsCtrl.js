var TambahUserInsCtrl = ['$rootScope', '$scope', 'Request', '$state', '$mdToast', 'Request', 'Session', '$mdDialog',
    function($rootScope, $scope, Request, $state, $mdToast, Request, Session, $mdDialog) {

        $scope.keepString = function(String) {
            return String;
        };

        Request.getRequest('pejabatsIns').success(function(feedback) {
            console.log(feedback);
            if (feedback.length === 0) {
                $scope.tableIsEmpty = true;
            } else {
                $scope.tableIsEmpty = false;
            }
            $scope.pejabats = feedback;
            $scope.tableReady = true;
            
            
        }).error(function(error) {
            console.log(error);
        });
    }];