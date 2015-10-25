var TambahJabatanCtrl = ['$rootScope', '$scope', 'Request', '$state', '$mdToast', 'Request', 'Session', '$mdDialog',
    function($rootScope, $scope, Request, $state, $mdToast, Request, Session, $mdDialog) {

        $scope.keepString = function(String) {
            return String;
        };

        Request.getJabatansInsRequest().success(function(feedback) {
            console.log(feedback.result);
            if (feedback.result.length === 0) {
                $scope.tableIsEmpty = true;
            } else {
                $scope.tableIsEmpty = false;
            }
            $scope.jabatans = feedback.result;
            $scope.tableReady = true;

            $scope.submitJabatan = function() {
//                $scope.ins = $scope.keepString($scope.ins);
                $scope.isSubmitting = true;
                var data = {
                    "token": $rootScope.session_auth.token,
                    "jabatan": $scope.jabatan
                };

                console.log(data);

                Request.postRequest('addJabatan', data).success(function(feedback) {
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

            $scope.deleteJabatan = function(jabatan, index) {
                Request.deleteRequest('hapusJabatan/' + $rootScope.session_auth.token + "/" + jabatan).success(function(feedback) {
                    console.log(feedback);
                    $scope.jabatans.splice(index, 1);
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