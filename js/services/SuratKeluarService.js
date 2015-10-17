'use strict';

app.service('SuratKeluarService', ['$state', '$rootScope', '$mdToast', 'Request',
    function($state, $rootScope, $mdToast, Request) {
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
            koreksiSurat: function(id, pesan) {
                var data = {
                    "id_surat": id,
                    "token": $rootScope.session_auth.token,
                    "pesan": pesan
                };
                Request.putRequest("koreksiSurat", data).success(function(feedback) {
                    console.log(feedback);
                    $mdToast.show(
                            $mdToast.simple()
                            .content('Surat telah dikembalikan untuk dikoreksi')
                            .position('right')
                            .hideDelay(1000)
                            ).then(function() {
                        if (feedback.result === 'Success') {
                            $rootScope.$emit('websocketSend', {'tipe': 'suratkoreksi', 'data': feedback});
                        }
                        $state.reload();
                    });
                }).error(function(data) {
                    console.log(data);
                    $mdToast.simple()
                            .content('Mohon maaf, telah terjadi kesalahan dalam memproses permintaan anda.')
                            .position('right')
                            .hideDelay(1000)
                });
            }
        };
    }]);