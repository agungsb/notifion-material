'use strict';

function TambahUserCtrl($rootScope, $scope, $http, $state, $mdToast, Request, Session) {

    $scope.keepString = function(String) {
        return String;
    };

    $http.get("http://localhost/notifion-api/users2").success(function(feedback) {
        console.log(feedback);
        if (feedback.result.length === 0) {
            $scope.tableIsEmpty = true;
        } else {
            $scope.tableIsEmpty = false;
        }
        $scope.users = feedback.result;
        $scope.tableReady = true;

        $scope.submitOP = function() {
            $scope.ins = $scope.keepString($scope.ins);
            $scope.isSubmitting = true;
            var data = {
                "password": $scope.password,
                "institusi": $scope.ins
            };

            console.log(data);

            $http.post("http://localhost/notifion-api/addUserOp", data).success(function(feedback) {
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

        $scope.delete = function(account, index) {
            Request.deleteRequest('hapusUser/' + $rootScope.session_auth.token + "/" + account).success(function(feedback) {
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

//    get Instansi
    $http.get("http://localhost/notifion-api/instansi").success(function(feedback) {
        console.log(feedback);
        if (feedback.result_Instansi.length === 0) {
            $scope.tableIsEmpty = true;
        } else {
            $scope.tableIsEmpty = false;
        }
        $scope.instansis = feedback.result_Instansi;
        $scope.tableReady = true;

        $scope.submitInstansi = function() {
            $scope.isSubmitting = true;
            var data = {
                "nama_instansi": $scope.instansi
            };

            console.log(data);

            $http.post("http://localhost/notifion-api/addInstansi", data).success(function(feedback) {
//            alert(feedback);
                console.log(feedback);
                $scope.isSubmitting = false;
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
        };
    }).error(function(error) {
        console.log(error);
    });

    //    get kode hal
    $http.get("http://localhost/notifion-api/kodeHals").success(function(feedback) {
        console.log(feedback);
        if (feedback.result.length === 0) {
            $scope.tableIsEmpty = true;
        } else {
            $scope.tableIsEmpty = false;
        }
        $scope.kodehals = feedback.result;
        $scope.tableReady = true;

        $scope.submitKodeHal = function() {
            $scope.isSubmitting = true;
            var data = {
                "kode_hal": $scope.kodehal,
                "deskripsi": $scope.deskripsi
            };

            console.log(data);

            $http.post("http://localhost/notifion-api/addKodeHal", data).success(function(feedback) {
//            alert(feedback);
                console.log(feedback);
                $scope.isSubmitting = false;
                $mdToast.show(
                        $mdToast.simple()
                        .content('Berhasil Tambah Kode Hal')
                        .position('right')
                        .hideDelay(1000)
                        ).then(function(response) {
                    $state.go('home.tambahUser');
                });
            }).error(function(data) {
                console.log(data);
            })
        };
    }).error(function(error) {
        console.log(error);
    });

    //    get kode unit
    $http.get("http://localhost/notifion-api/kodeUnits").success(function(feedback) {
        console.log(feedback);
        if (feedback.result.length === 0) {
            $scope.tableIsEmpty = true;
        } else {
            $scope.tableIsEmpty = false;
        }
        $scope.kodeunits = feedback.result;
        $scope.tableReady = true;

        $scope.submitKodeUnit = function() {
            $scope.inst = $scope.keepString($scope.inst);

            $scope.isSubmitting = true;
            var data = {
                "kode_unit": $scope.kodeunit,
                "deskripsi": $scope.deskripsi,
                "id_institusi": $scope.inst
            };

            console.log(data);

            $http.post("http://localhost/notifion-api/addKodeUnit", data).success(function(feedback) {
//            alert(feedback);
                console.log(feedback);
                $scope.isSubmitting = false;
                $mdToast.show(
                        $mdToast.simple()
                        .content('Berhasil Tambah Kode Unit')
                        .position('right')
                        .hideDelay(1000)
                        ).then(function(response) {
                    $state.go('home.tambahUser');
                });
            }).error(function(data) {
                console.log(data);
            });
        };
    }).error(function(error) {
        console.log(error);
    });

    /* Institusi */
    $http.get('http://localhost/notifion-api/institusi').success(function(feedback) {
        console.log(feedback);
        if (feedback.result.length === 0) {
            $scope.tableIsEmpty = true;
        } else {
            $scope.tableIsEmpty = false;
        }
        $scope.institusis = feedback.result;
        $scope.tableReady = true;

        $scope.submitInstitusi = function() {
            $scope.isSubmitting = true;
            var data = {
                "nama_institusi": $scope.institusi,
                "id_instansi": $scope.instansi
            };

            console.log(data);

            $http.post("http://localhost/notifion-api/addInstitusi", data).success(function(feedback) {
//            alert(feedback);
                console.log(feedback);
                $scope.isSubmitting = false;
                $mdToast.show(
                        $mdToast.simple()
                        .content('Berhasil Tambah Data')
                        .position('right')
                        .hideDelay(1000)
                        ).then(function(response) {
                    $state.go('home.tambahUser');
                });
            }).error(function(data) {
                console.log(data);
            })
        };
    }).error(function() {
        console.log("error");
    });


}