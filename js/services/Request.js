'use strict';

app.factory('Request', ['$rootScope', '$http', function($rootScope, $http) {
        var baseUrl = 'http://localhost/notifion-api/';
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
        obj.getPenandatanganRequest = function(){
            return $http.get('http://localhost/notifion-api/penandatangan/' + $rootScope.session_auth.token); 
        };

        return obj;
    }]);