'use strict';

app.factory('Session', ['$state', '$timeout', '$cookies',
    function($state, $timeout, $cookies) {
        var obj = {'cookie': {}};

        obj.isLogin = function() {
            var session_auth = $cookies.get('n-auth');
            if (typeof (session_auth) !== 'undefined') {
                return true;
            } else {
                return false;
            }
        };

        obj.signout = function() {
            var session_auth = $cookies.get('n-auth');
            if (typeof (session_auth) !== 'undefined') {
                $timeout(function() {
                    obj.cookie.delete('n-auth');
                }).then(function() {
                    location.reload();
//                    $state.go('home.suratMasuk', {}, {'location': 'replace', 'reload': true});
                });
            }
        };

        obj.cookie = {
            save: function(key, value) {
                var now = new Date(),
                        // this will set the expiration to 6 months
                        exp = new Date(now.getFullYear(), now.getMonth() + 12, now.getDate());
                var val = angular.toJson(value);
                $cookies.put(key, val, {
                    expires: exp,
                    path: '/'
                });
            },
            get: function(key) {
                var value = $cookies.get(key);
                return value ? angular.fromJson(value) : value;
            },
            delete: function(key) {
                $cookies.remove(key, {
                    path: '/'
                });
            }
        };

        return obj;
    }]);