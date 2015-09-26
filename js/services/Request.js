'use strict';

app.factory('Request', ['$rootScope', '$http', function($rootScope, $http) {
        var baseUrl = 'http://localhost/notifion-api/';
        var obj = {};

        obj.loginRequest = function(data) {
            return $http.post(baseUrl + 'login', data);
        };
        obj.userInfoRequest = function() {
            return $http.get(baseUrl + 'user/' + $rootScope.session_auth.token);
        };
        obj.suratMasukRequest = function(offset, limit) {
            return $http.get(baseUrl + 'surats/' + $rootScope.session_auth.token + '/' + offset + '/' + limit)
        };
        obj.suratKeluarRequest = function(offset, limit) {
            return $http.get(baseUrl + 'suratsKeluar/' + $rootScope.session_auth.token + '/' + offset + '/' + limit)
        };
        obj.suratDraftRequest = function(offset, limit) {
            return $http.get(baseUrl + 'suratsDraft/' + $rootScope.session_auth.token + '/' + offset + '/' + limit)
        };


        return obj;
    }]);