'use strict';

var EditBioCtrl = ['$rootScope', '$scope', '$http', '$state', '$mdToast',
    function($rootScope, $scope, $http, $state, $mdToast) {
        $rootScope.$watch('userInfo', function(newVal, oldVal) {
            if (typeof (newVal) !== 'undefined') {
                $scope.nama = newVal.nama;
                $scope.email1 = newVal.email1;
                $scope.nip = newVal.nip;
                $scope.password = newVal.password;
                $scope.gender = newVal.gender;
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
                "token": localStorage.getItem('token'),
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

            $http.post("http://localhost/notifion-api/editBio", data).success(function(feedback) {
//            alert(feedback);
                console.log(feedback);
                $scope.isSubmitting = false;
                $mdToast.show(
                        $mdToast.simple()
                        .content('Berhasil Update')
                        .position('right')
                        .hideDelay(1000)
                        ).then(function(response) {
                    $state.go('home.dashboard');
                });
            }).error(function(data) {
                console.log(data);
            });
        };
    }];