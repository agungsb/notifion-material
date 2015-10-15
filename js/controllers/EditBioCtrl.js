'use strict';

var EditBioCtrl = ['$rootScope', '$scope', '$state', '$mdToast', 'Request', 'Session',
    function($rootScope, $scope, $state, $mdToast, Request, Session) {
        $scope.data = {
            nama: "",
            nip: "",
            password: "",
            gender: "",
            email1: "",
            email2: "",
            nohp1: "",
            nohp2: ""            
        };
        $rootScope.$watch('userInfo', function(newVal, oldVal) {
            if (typeof (newVal) !== 'undefined') {
                $scope.data.nama = newVal.nama;
                $scope.data.nip = newVal.nip;
                $scope.data.password = newVal.password;
                $scope.data.gender = newVal.gender;
                $scope.data.email1 = newVal.email1;
                $scope.data.email2 = newVal.email2;
                $scope.data.nohp1 = newVal.nohp1;
                $scope.data.nohp2 = newVal.nohp2;
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
                "nama": $scope.data.nama,
                "password": $scope.data.password,
                "nip": $scope.data.nip,
                "gender": $scope.data.gender,
                "email1": $scope.data.email1,
                "email2": $scope.data.email2,
                "nohp1": $scope.data.nohp1,
                "nohp2": $scope.data.nohp2
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