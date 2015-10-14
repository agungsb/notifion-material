var TambahAccountCtrl = ['$rootScope', '$scope', '$http', '$state', '$mdToast', 'Request', 'Session', '$mdDialog',
    function($rootScope, $scope, $http, $state, $mdToast, Request, Session, $mdDialog) {

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
            
            $http.get('http://localhost/notifion-api/institusi').success(function(feedback) {
                console.log(feedback);
                if (feedback.result.length === 0) {
                    $scope.tableIsEmpty = true;
                } else {
                    $scope.tableIsEmpty = false;
                }
                $scope.institusis = feedback.result;
                $scope.tableReady = true;
                
            }).error(function() {
                console.log("error");
            });
            
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

            $scope.deleteOP = function(account, index) {
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

            $scope.editOP = editDialog;
            function editDialog(institusis, user, index) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'templates/dialogs/eUserDialog.html',
                    parent: angular.element(document.body)
                }).then(function() {
                    console.log('finished');
                });

                function DialogController($scope, $http, $mdDialog, Request, Session, $rootScope) {
                    $scope.user = user;
                    $scope.password = $scope.user.password;
                    $scope.id_institusi = $scope.user.id_institusi;
                    $scope.index = index;
                    $scope.institusis = institusis;

                    $scope.submitEditOP = function() {
                        Request.putRequest('/editUser' + $rootScope.session_auth.token).success(function(feedback) {
//                        if (feedback.result === 'success') {
                            $rootScope.$emit('editSuccess', {'$mdDialog': $mdDialog, 'index': $scope.index, 'password': $scope.password});
//                        }
                        }).error(function(error) {
                            console.log(error);
                        });
                    };

                    $scope.closeDialog = function() {
                        $mdDialog.hide();

                    };
                }
            }
            $rootScope.$on('editSuccess', function(event, args) {
                args.$mdDialog.hide();
                $scope.users[args.index].password = args.password;
            });
        }).error(function(error) {
            console.log(error);
        });
    }];