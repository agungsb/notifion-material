'use strict';

app.service('SuratKeluarService', ['$http', '$rootScope', '$mdToast', 'Request',
    function($http, $rootScope, $mdToast, Request) {
        return{
            acceptSurat: function(id) {
                var data = {
                    "id_surat": id,
                    "token": $rootScope.session_auth.token
                };
                Request.putRequest("accSurat", data).success(function(feedback) {
                    console.log(feedback);
                    $mdToast.show(
                            $mdToast.simple()
                            .content('Surat telah berhasil didistribusikan')
                            .position('right')
                            .hideDelay(1000)
                            );
                }).error(function(data) {
                    console.log(data);
                });
            },
            koreksiSurat: function(id) {
                var data = {
                    "id_surat": id,
                    "token": $rootScope.session_auth.token
                };
                Request.putRequest("rejectSurat", data).success(function(feedback) {
                    console.log(feedback);
                    $mdToast.simple()
                            .content('Surat telah dikembalikan untuk dikoreksi')
                            .position('right')
                            .hideDelay(1000);
                }).error(function(data) {
                    console.log(data);
                });
            }
        };
    }]);