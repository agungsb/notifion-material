'use strict';

var app = angular.module('notifionApp', ['ui.router', 'ngMaterial', 'textAngular', 'ngCookies', 'mdDateTime']);

app.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

        $mdThemingProvider.theme('app-blue')
                .primaryPalette('blue')
                .accentPalette('pink')
                .warnPalette('red')
                .backgroundPalette('grey');

        // 
        // use the HTML5 History API
//    $locationProvider.html5Mode(true);
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
                .state('home', {
                    url: "/",
                    abstract: true,
                    templateUrl: "templates/home.html",
                    controller: HomeCtrl
                })
                .state('home.dashboard', {
                    url: "",
                    templateUrl: "templates/content/dashboard.html",
                    controller: DashboardCtrl
                })
                .state('home.listUser', {
                    url: "list-user",
                    templateUrl: "templates/content/management-user/list-user.html",
                    onEnter: ['$rootScope', '$state', '$timeout',
                        function($rootScope, $state, $timeout) {
                            if (!$rootScope.isLogin) {
                                $timeout(function() {
                                    $state.go('home.dashboard');
                                })
                            }
                        }]
                })
                .state('home.tambahUser', {
                    url: "tambah-user",
                    templateUrl: "templates/content/management-user/tambah-user.html",
                    controller: TambahUserCtrl,
                    onEnter: ['$rootScope', '$state', '$timeout',
                        function($rootScope, $state, $timeout) {
                            if (!$rootScope.isLogin) {
                                $timeout(function() {
                                    $state.go('home.dashboard');
                                })
                            }
                        }]
                })
                .state('home.editBio', {
                    url: "edit-bio",
                    templateUrl: "templates/content/management-user/editBio.html",
                    controller: EditBioCtrl,
                    onEnter: ['$rootScope', '$state', '$timeout',
                        function($rootScope, $state, $timeout) {
                            if (!$rootScope.isLogin) {
                                $timeout(function() {
                                    $state.go('home.dashboard');
                                })
                            }
                        }]
                })
                .state('home.buatSurat', {
                    url: "buat-surat",
                    templateUrl: "templates/content/management-surat/buat-surat.html",
                    controller: BuatSuratCtrl,
                    controllerAs: 'ctrl',
                    onEnter: ['$rootScope', '$state', '$timeout',
                        function($rootScope, $state, $timeout) {
                            if (!$rootScope.isLogin) {
                                $timeout(function() {
                                    $state.go('home.dashboard');
                                })
                            }
                        }]
                })
    }]);

app.run(['$rootScope', '$mdSidenav', '$log', '$http', 'Session', 'Request', '$timeout', '$state',
    function($rootScope, $mdSidenav, $log, $http, Session, Request, $timeout, $state) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.isLogin = false;
            $rootScope.isLogin = Session.isLogin();
            console.log($rootScope.isLogin);
            $rootScope.call_auth_me = function() {
                $rootScope.session_auth = Session.cookie.get('n-auth');
                console.log($rootScope.session_auth);
                Request.userInfoRequest(Session.cookie.get('n-auth')).success(function(feedback) {
                    console.log(feedback);
                    $rootScope.userInfo = feedback;
                    console.log($rootScope.userInfo);
                    $rootScope.userInfoIsReady = true;
                }).error(function(error) {
                    console.log(error);
                });
            };

            $rootScope.$on('reCallAuth', function(event) {
                $rootScope.call_auth_me();
            });
            if ($rootScope.isLogin) {
                $rootScope.call_auth_me();
            }

            // Close the sidenav everytime state is changed
            $mdSidenav('left').close().then(function() {
                $log.debug('close LEFT is done');
            });

            var current = Session.isLogin();
            $rootScope.callAtTimeout = function() {
                if (current !== Session.isLogin()) {
                    current = Session.isLogin();
                    $state.reload();
                    $rootScope.isLogin = current;
                }
                $timeout(function() {
                    $rootScope.callAtTimeout();
                }, 1500);
                return current;
            };
            $rootScope.callAtTimeout();
        });
    }]);