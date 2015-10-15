'use strict';

var EditBioCtrl = ['$rootScope', '$scope', '$http', '$state', '$mdToast', 'Request', 'Session',
    function($rootScope, $scope, $http, $state, $mdToast, Request, Session) {
        $rootScope.$watch('userInfo', function(newVal, oldVal) {
            if (typeof (newVal) !== 'undefined') {
                $scope.nama = newVal.nama;
                $scope.email1 = newVal.email1;
                $scope.email2 = newVal.email2;
                $scope.nip = newVal.nip;
                $scope.password = newVal.password;
                $scope.gender = newVal.gender;
                $scope.nohp1 = newVal.nohp1;
                $scope.nohp2 = newVal.nohp2;
            }
        });

        $scope.checkNumber = function(e) {
            var key = typeof e.which === 'undefined' ? e.keyCode : e.which;
            if ((key <= 57) && (key >= 48)) {
                console.log('isNaN');
            } else {
                e.preventDefault();
            }
        };

        $scope.submit = function() {
            $scope.isSubmitting = true;
            var data = {
                "token": $rootScope.session_auth.token,
                "nama": $scope.nama,
                "password": $scope.password,
                "nip": $scope.nip,
                "gender": $scope.gender,
                "email1": $scope.email1,
                "email2": $scope.email2,
                "nohp1": $scope.nohp1,
                "nohp2": $scope.nohp2
            };

            console.log(data);

            Request.postRequest('editBio', data).success(function(feedback) {
//            alert(feedback);
                console.log(feedback);
                $scope.isSubmitting = false;
                $mdToast.show(
                        $mdToast.simple()
                        .content('Berhasil Update')
                        .position('right')
                        .hideDelay(1000)
                        ).then(function(response) {
                    $state.reload();
                });
            }).error(function(data) {
                console.log(data);
            });
        };
    }];