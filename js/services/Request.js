'use strict';

app.factory('Request', ['$rootScope', '$http', function($rootScope, $http) {
//        var baseUrl = 'http://localhost/notifion-api/';
        var baseUrl = '/api/';
        var obj = {};

        obj.loginRequest = function(data) {
            return $http.post(baseUrl + 'login', data);
        };
        obj.getUserInfoRequest = function() {
            return $http.get(baseUrl + 'user/' + $rootScope.session_auth.token);
        };
        obj.getSuratMasukRequest = function(offset, limit) {
            return $http.get(baseUrl + 'surats/' + $rootScope.session_auth.token + '/' + offset + '/' + limit)
        };
        obj.getSuratKeluarRequest = function(offset, limit) {
            return $http.get(baseUrl + 'suratsKeluar/' + $rootScope.session_auth.token + '/' + offset + '/' + limit)
        };
        obj.getSuratDraftRequest = function(offset, limit) {
            return $http.get(baseUrl + 'suratsDraft/' + $rootScope.session_auth.token + '/' + offset + '/' + limit)
        };
        obj.getTujuanRequest = function() {
            return $http.get(baseUrl + 'tujuan');
        }
        obj.getPenandatanganRequest = function() {
            return $http.get(baseUrl + 'penandatangan/' + $rootScope.session_auth.token);
        };

        obj.getRequest = function(url, options) {
            return $http({
                url: baseUrl + url,
                method: "GET",
                cache: false,
                options: options
            });
        };
        
        obj.postRequest = function(url, data, options) {
            return $http({
                url: baseUrl + url,
                method: "POST",
                data: data,
                cache: false,
                options: options
            });
        };
        
        obj.putRequest = function(url, data, options) {
            return $http({
                url: baseUrl + url,
                method: "PUT",
                data: data,
                cache: false,
                options: options
            });
        };
        
        obj.deleteRequest = function(url, data, options) {
            return $http({
                url: baseUrl + url,
                method: "DELETE",
                cache: false,
                options: options
            });
        };

        return obj;
    }]);