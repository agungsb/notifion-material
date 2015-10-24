var TambahUserPejabatCtrl = ['$rootScope', '$scope', 'Request', '$state', '$mdToast', 'Request', 'Session', '$mdDialog',
    function($rootScope, $scope, Request, $state, $mdToast, Request, Session, $mdDialog) {

        $scope.keepString = function(String) {
            return String;
        };

        Request.getPejabatsInsRequest().success(function(feedback) {
            console.log(feedback);
            if (feedback.length === 0) {
                $scope.tableIsEmpty = true;
            } else {
                $scope.tableIsEmpty = false;
            }
            $scope.pejabats = feedback;
            $scope.tableReady = true;

            Request.getRequest('users3').success(function(feedback) {
                console.log(feedback);
                if (feedback.result.length === 0) {
                    $scope.tableIsEmpty = true;
                } else {
                    $scope.tableIsEmpty = false;
                }
                $scope.users = feedback.result;
                $scope.tableReady = true;

            }).error(function(error) {
                console.log(error);
            });

            Request.getJabatansInsRequest().success(function(feedback) {
                console.log(feedback);
                if (feedback.result.length === 0) {
                    $scope.tableIsEmpty = true;
                } else {
                    $scope.tableIsEmpty = false;
                }
                $scope.jabatans = feedback.result;
                $scope.tableReady = true;

            }).error(function(error) {
                console.log(error);
            });

            $scope.submitSetJabatan = function() {
                $scope.account = $scope.keepString($scope.account);
                $scope.jabatan = $scope.keepString($scope.jabatan);
                $scope.isSubmitting = true;
                var data = {
                    "token": $rootScope.session_auth.token,
                    "account": $scope.account,
                    "jabatan": $scope.jabatan
                };

                console.log(data);

                Request.postRequest('/setJabatan', data).success(function(feedback) {
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
            
            $scope.deletePejabat = function(account, index) {
                Request.deleteRequest('hapusPejabat/' + $rootScope.session_auth.token + "/" + account).success(function(feedback) {
                    console.log(feedback);
                    $scope.pejabats.splice(index, 1);
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
//      alert(account);
            };


        }).error(function(error) {
            console.log(error);
        });
    }];