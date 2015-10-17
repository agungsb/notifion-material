'use strict';

app.service('SuratMasukService', ['$rootScope', 'Request', '$mdToast',
    function($rootScope, Request, $mdToast) {
        return{
            setFavorite: function(id, status) {
                var data = {"token": $rootScope.session_auth.token, "id": id, "status": status};
                var successMessage;
                if (status) {
                    successMessage = "Berhasil menambahkan ke daftar favorite";
                } else {
                    successMessage = "Berhasil menghapus dari daftar favorite";
                }
                Request.putRequest("setFavorite", data).success(function(feedback) {
                    $rootScope.$emit('reInitSuratFavorite');
                    dataFavoriteBadgeCounter(feedback);
                    console.log(feedback);
                    $mdToast.show(
                            $mdToast.simple()
                            .content(successMessage)
                            .position('right')
                            .hideDelay(1000)
                            );
                }).error(function(data) {
                    $mdToast.show(
                            $mdToast.simple()
                            .content("Mohon maaf, terjadi kesalahan dalam memproses permintaan anda.")
                            .position('right')
                            .hideDelay(1000)
                            );
                });
            }
        };
    }]);  