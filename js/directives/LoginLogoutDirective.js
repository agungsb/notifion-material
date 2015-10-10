'use strict';

app.directive('loginDirective', [function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/login.html',
            controller: ['$scope', 'Request', 'Session', '$mdToast', '$state',
                function($scope, Request, Session, $mdToast, $state) {
                    $scope.submit = function() {
                        $scope.isAuthenticating = true;
                        var data = {
                            'account': $scope.account,
                            'password': $scope.password
                        };
                        console.log(data);
                        Request.postRequest('login', data, {}).success(function(feedback) {
                            console.log(data);
                            console.log(feedback);
                            if (feedback.status) {
                                // Put cookie
                                Session.cookie.save('n-auth', {
                                    'token': feedback.token,
                                    'userid': feedback.userid,
                                    'account': feedback.account,
                                    'nama': feedback.nama,
                                    'nama_institusi': feedback.nama_institusi,
                                    'login': feedback.status
                                });
                                $state.go('home.suratMasuk', {}, {'location': 'replace'})
                            } else {
                                $mdToast.show(
                                        $mdToast.simple()
                                        .content('Login gagal. Mohon periksa kembali Account dan Password anda')
                                        .position('right')
                                        .hideDelay(1000)
                                        ).then(function(response) {
                                    $scope.isAuthenticating = false;
                                });
                            }
                        }).error(function(error) {
                            console.log(error);
                            $scope.error = error;
                        });
                    };
                }]
        };
    }]).directive('logoutDirective', ['Session', function(Session) {
        return function(scope, element, attr) {
            element.bind('click', function() {
                Session.signout();
            });
        };
    }]);