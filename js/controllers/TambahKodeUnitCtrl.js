var TambahKodeUnitCtrl = ['$rootScope', '$scope', 'Request', '$state', '$mdToast', 'Request', 'Session', '$mdDialog',
    function($rootScope, $scope, Request, $state, $mdToast, Request, Session, $mdDialog) {

        $scope.keepString = function(String) {
            return String;
        };

        Request.getRequest('kodeUnits').success(function(feedback) {
            console.log(feedback);
            if (feedback.result.length === 0) {
                $scope.tableIsEmpty = true;
            } else {
                $scope.tableIsEmpty = false;
            }
            $scope.kodeunits = feedback.result;
            $scope.tableReady = true;

            Request.getRequest('institusi').success(function(feedback) {
                console.log(feedback);
                if (feedback.result.length === 0) {
                    $scope.tableIsEmpty = true;
                } else {
                    $scope.tableIsEmpty = false;
                }
                $scope.institusis = feedback.result;
                $scope.tableReady = true;
            }).error(function(error) {
                console.log(error);
            });

            $scope.deleteKodeUnit = function(kode_unit, index) {
                Request.deleteRequest('hapusKodeUnit/' + $rootScope.session_auth.token + "/" + kode_unit).success(function(feedback) {
                    console.log(feedback);
                    $scope.institusis.splice(index, 1);
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

            $scope.submitKodeUnit = function() {
                $scope.inst = $scope.keepString($scope.inst);

                $scope.isSubmitting = true;
                var data = {
                    "kode_unit": $scope.kodeunit,
                    "deskripsi": $scope.deskripsi,
                    "id_institusi": $scope.inst
                };

                console.log(data);

                Request.postRequest('/addKodeUnit', data).success(function(feedback) {
//            alert(feedback);
                    console.log(feedback);
                    $scope.isSubmitting = false;
                    $mdToast.show(
                            $mdToast.simple()
                            .content('Berhasil Tambah Kode Unit')
                            .position('right')
                            .hideDelay(1000)
                            ).then(function(response) {
                        $state.reload();
                    });
                }).error(function(data) {
                    console.log(data);
                });
            };
        }).error(function(error) {
            console.log(error);
        });
    }];