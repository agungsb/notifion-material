var TambahAccountOrdCtrl = ['$rootScope', '$scope', 'Request', '$state', '$mdToast', 'Request', 'Session', '$mdDialog',
    function($rootScope, $scope, Request, $state, $mdToast, Request, Session, $mdDialog) {

        $scope.keepString = function(String) {
            return String;
        };

        Request.getRequest('users3').success(function(feedback) {
            console.log(feedback);
            if (feedback.result.length === 0) {
                $scope.tableIsEmpty = true;
            } else {
                $scope.tableIsEmpty = false;
            }
            $scope.users = feedback.result;
            $scope.tableReady = true;

            $scope.submitBiasa = function() {
//                $scope.ins = $scope.keepString($scope.ins);
                $scope.isSubmitting = true;
                var data = {
                    "account": $scope.account,
                    "password": $scope.password
                };

                console.log(data);

                Request.postRequest('/addUser', data).success(function(feedback) {
//            alert(feedback);
                    console.log(feedback);
                    $scope.isSubmitting = false;
//                var data = feedback.data;
//                $scope.users.push(data);
                    $mdToast.show(
                            $mdToast.simple()
                            .content(feedback.result)
                            .position('right')
                            .hideDelay(1000)
                            ).then(function(response) {
                        $state.reload();
                    });
                }).error(function(error) {
                    console.log(error);
                });
            };
            
            $scope.deleteBiasa = function(account, index) {
                Request.deleteRequest('hapusUserBiasa/' + $rootScope.session_auth.token + "/" + account).success(function(feedback) {
                    console.log(feedback);
                    $scope.users.splice(index, 1);
                    $mdToast.show(
                            $mdToast.simple()
                            .content(feedback.result)
                            .position('right')
                            .hideDelay(1000)
                            ).then(function(response) {
//                    $state.reload();
                    });
                }).error(function(error) {
                    console.log(error);
                });
//      alert(account);
            };
            
        }).error(function(error) {
            console.log(error);
        });
    }];