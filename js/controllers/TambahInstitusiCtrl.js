var TambahInstitusiCtrl = ['$rootScope', '$scope', 'Request', '$state', '$mdToast', 'Request', 'Session', '$mdDialog',
    function($rootScope, $scope, Request, $state, $mdToast, Request, Session, $mdDialog) {

        $scope.keepString = function(String) {
            return String;
        };

        Request.getRequest('institusi').success(function(feedback) {
            console.log(feedback);
            if (feedback.result.length === 0) {
                $scope.tableIsEmpty = true;
            } else {
                $scope.tableIsEmpty = false;
            }
            $scope.institusis = feedback.result;
            $scope.tableReady = true;

            Request.getRequest('instansi').success(function(feedback) {
                console.log(feedback);
                if (feedback.result_Instansi.length === 0) {
                    $scope.tableIsEmpty = true;
                } else {
                    $scope.tableIsEmpty = false;
                }
                $scope.instansis = feedback.result_Instansi;
                $scope.tableReady = true;
            }).error(function() {
                console.log("error");
            });

            $scope.deleteInstitusi = function(id_institusi, index) {
                Request.deleteRequest('hapusInstitusi/' + $rootScope.session_auth.token + "/" + id_institusi).success(function(feedback) {
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

            $scope.submitInstitusi = function() {
                $scope.isSubmitting = true;
                var data = {
                    "nama_institusi": $scope.institusi,
                    "id_instansi": $scope.instansi
                };



                console.log(data);

                Request.postRequest("/addInstitusi", data).success(function(feedback) {
//            alert(feedback);
                    console.log(feedback);
                    $scope.isSubmitting = false;
                    $mdToast.show(
                            $mdToast.simple()
                            .content(feedback.result)
                            .position('right')
                            .hideDelay(1000)
                            ).then(function(response) {
                        $state.reload();
//                    $state.go('home.tambahUser');
                    });
                }).error(function(data) {
                    console.log(data);
                });
            };
        }).error(function() {
            console.log("error");
        });
    }];