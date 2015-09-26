'use strict';

function TambahUserCtrl($scope, $http, $state, $mdToast) {
    $http.get("http://localhost/notifion-api/users2").success(function(feedback) {
         console.log(feedback);
            if (feedback.result.length == 0) {
                $scope.tableIsEmpty = true;
            } else {
                $scope.tableIsEmpty = false;
            }
            $scope.users = feedback.result;
            $scope.tableReady = true;
            
    }).error(function(error) {
        console.log(error);
    });
//    get Instansi
    $http.get("http://localhost/notifion-api/instansi").success(function(feedback) {
         console.log(feedback);
            if (feedback.result_Instansi.length == 0) {
                $scope.tableIsEmpty = true;
            } else {
                $scope.tableIsEmpty = false;
            }
            $scope.instansis = feedback.result_Instansi;
            $scope.tableReady = true;
            
    }).error(function(error) {
        console.log(error);
    });
    
    /* Institusi */
    $http.get('http://localhost/notifion-api/institusi').success(function(feedback) {
        console.log(feedback);
            if (feedback.result_Institusi.length == 0) {
                $scope.tableIsEmpty = true;
            } else {
                $scope.tableIsEmpty = false;
            }
            $scope.institusis = feedback.result_Institusi;
            $scope.tableReady = true;
    }).error(function() {
        console.log("error");
    });
    
    $scope.submitOP = function() {
        $scope.isSubmitting = true;
        var data = {
            "account": $scope.account,
            "password": $scope.password,
            "institusi": $scope.ins
        };

        console.log(data);

        $http.post("http://localhost/notifion-api/addUserOp", data).success(function(feedback) {
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
}