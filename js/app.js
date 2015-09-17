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
                    controller: function($scope, $http, $state) {
                    }
                })
                .state('home.tambahUser', {
                    url: "tambah-user",
                    templateUrl: "templates/content/management-user/tambah-user.html",
                    controller: function($scope, $http, $state) {
                    }
                })
                .state('home.buatSurat', {
                    url: "buat-surat",
                    templateUrl: "templates/content/management-surat/buat-surat.html",
                    controller: BuatSuratCtrl,
                    controllerAs: 'ctrl'
                })
                .state('login', {
                    url: "/",
                    templateUrl: "templates/login.html",
                    controller: function($rootScope, $scope, $state, $http) {
                        $scope.submit = function() {
                            $scope.isAuthenticating = true;
                            var data = {
                                'account': $scope.account,
                                'password': $scope.password
                            };
                            console.log(data);
                            $http.post('http://localhost/notifion-api/login', data).success(function(feedback) {
                                console.log(data);
                                console.log(feedback);
                                $scope.isAuthenticating = false;
                                $scope.account = "";
                                $scope.password = "";
                                if (feedback.status) {
                                    // Put cookie
                                    localStorage.setItem('token', feedback.token);
                                    $state.go('home.dashboard');
                                } else {
                                    $scope.error = feedback;
                                }
                            }).error(function(error) {
                                console.log(error);
                                $scope.error = error;
                            })
                        }
                    }
                })
    }]);
app.run(['$rootScope', '$mdSidenav', '$log', function($rootScope, $mdSidenav, $log) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            // Close the sidenav everytime state is changed
            $mdSidenav('left').close().then(function() {
                $log.debug('close LEFT is done');
            });
        });
    }]);