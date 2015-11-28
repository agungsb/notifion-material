'use strict';

app.service('SuratKeluarService', ['$state', '$rootScope', '$mdToast', 'Request', '$mdDialog',
    function($state, $rootScope, $mdToast, Request, $mdDialog) {
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
                            .content(feedback.result)
                            .position('right')
                            .hideDelay(1000)
                            ).then(function() {
                        $state.reload();
                    });
                }).error(function(data) {
                    console.log(data);
                });
            },
            koreksiSurat: function(id, pesan, $event) {
                var data = {
                    "id_surat": id,
                    "token": $rootScope.session_auth.token,
                    "pesan": pesan
                };
                $mdDialog.show({
                    templateUrl: 'templates/dialogs/loaderDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: $event
                });
                Request.putRequest("koreksiSurat", data).success(function(feedback) {
                    console.log(feedback);
                    $mdDialog.hide();
                    $mdToast.show(
                            $mdToast.simple()
                            .content('Surat telah dikembalikan untuk dikoreksi')
                            .position('right')
                            .hideDelay(1000)
                            ).then(function() {
                        if (feedback.result === 'Success') {
                            $rootScope.$emit('websocketSend', {'tipe': 'suratkoreksi', 'data': feedback});
                        }
                    }).then(function() {
                        $state.reload();
                    });
                }).error(function(data) {
                    console.log(data);
                    $mdDialog.hide();
                    $mdToast.simple()
                            .content('Mohon maaf, telah terjadi kesalahan dalam memproses permintaan anda.')
                            .position('right')
                            .hideDelay(1000);
                });
            }
        };
    }]);