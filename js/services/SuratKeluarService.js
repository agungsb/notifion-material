'use strict';

app.service('SuratKeluarService', ['$http', function($http) {
        return{
            accSurat: function(id, token) {
                var data = {
                    "id_surat": id,
                    "token": token
                }
                $http.put("http://localhost/notifion-api/accSurat", data).success(function(feedback) {
                    console.log(feedback);
                }).error(function(data) {
                    console.log(data);
                });
            },
            rejectSurat: function(id, token) {
                var data = {
                    "id_surat": id,
                    "token": token
                }
                $http.put("http://localhost/notifion-api/rejectSurat", data).success(function(feedback) {
                    console.log(feedback);
                }).error(function(data) {
                    console.log(data);
                });
            }
        }
    }]);