var TambahInstansiCtrl = ['$rootScope', '$scope', '$http', '$state', '$mdToast', 'Request', 'Session', '$mdDialog',
    function($rootScope, $scope, $http, $state, $mdToast, Request, Session, $mdDialog) {

        $scope.keepString = function(String) {
            return String;
        };

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

            $scope.deleteInstansi = function(id_instansi, index) {
                Request.deleteRequest('hapusInstansi/' + $rootScope.session_auth.token + "/" + id_instansi).success(function(feedback) {
                    console.log(feedback);
                    $scope.instansis.splice(index, 1);
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