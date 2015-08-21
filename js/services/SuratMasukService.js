'use strict';

app.service('SuratMasukService', ['$http', function($http) {
        return{
            setFavorite: function(token, id, status) {
                $http.put("http://localhost/notifion-api/setFavorite", {"token": token, "id": id, "status": status}).success(function(feedback) {
                    console.log(feedback)
                }).error(function(error) {
                    console.log(error);
                });
            }
        }
    }])     