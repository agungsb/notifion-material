'use strict';
var app = angular.module('notifionApp',
        ['ui.router', 'ngMaterial', 'textAngular', 'ngCookies', 'mdDateTime', 'ngFileUpload']);
app.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $mdThemingProvider.theme('app-blue')
                .primaryPalette('blue')
                .accentPalette('pink')
                .warnPalette('red')
                .backgroundPalette('grey');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
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
                    controller: HomeCtrl,
                    controllerAs: 'vm',
                    onEnter: ['$rootScope', '$state', function($rootScope, $state) {
                            if (!$rootScope.isLogin) {
                                $state.go('login');
                            }
                        }]
                })
                .state('login', {
                    url: "/",
                    template: '<login-directive class="fade-animation"></login-directive>',
                    onEnter: ['$rootScope', '$state', function($rootScope, $state) {
                            if ($rootScope.isLogin) {
                                $state.go('home.suratMasuk');
                            }
                        }]
                })
//                .state('home.suratMasuk', {
//                    url: "",
//                    absract: true,
//                    templateUrl: "templates/content/dashboard.html",
//                    controller: DashboardCtrl
//                })
                .state('home.suratMasuk', {
                    url: "",
                    templateUrl: "templates/content/management-surat/surat-masuk.html",
                    controller: SuratMasukCtrl
                })
                .state('home.suratKeluar', {
                    url: "surat-keluar",
                    templateUrl: "templates/content/management-surat/surat-keluar.html",
                    controller: SuratKeluarCtrl
                })
                .state('home.suratKoreksi', {
                    url: "surat-koreksi",
                    templateUrl: "templates/content/management-surat/surat-koreksi.html",
                    controller: SuratKoreksiCtrl
                })
                .state('home.listUser', {
                    url: "list-user",
                    templateUrl: "templates/content/management-user/list-user.html",
                    onEnter: ['$rootScope', '$state', // Saat user memasuki state ini, maka lakukan pengecekan apakah user merupakan operator atau bukan
                        function($rootScope, $state) {
                            if ($rootScope.userInfoIsReady) { // Jika userInfo telah 'ready'
                                if ($rootScope.userInfo.jenis_user !== '2') { // Jika jenis_user bukan operator, alihkan ke suratmasuk
                                    $state.go('home.suratMasuk');
                                }
                            }
                        }]
                })
                .state('home.tambahUser', {
                    url: "tambah-user",
                    templateUrl: "templates/content/management-user/tambah-user.html",
                    controller: TambahUserCtrl,
                    onEnter: ['$rootScope', '$state',
                        function($rootScope, $state) {
                            if ($rootScope.userInfoIsReady) {
                                if ($rootScope.userInfo.jenis_user !== '2') {
                                    $state.go('home.suratMasuk');
                                }
                            }
                        }]
                })
                .state('home.editBio', {
                    url: "edit-bio",
                    templateUrl: "templates/content/management-user/editBio.html",
                    controller: EditBioCtrl,
                    onEnter: ['$rootScope', '$state',
                        function($rootScope, $state) {
                            if (!$rootScope.isLogin) {
                                $state.go('login');
                            }
                        }]
                })
                .state('home.buatSurat', {
                    url: "buat-surat",
                    templateUrl: "templates/content/management-surat/buat-surat.html",
                    controller: BuatSuratCtrl,
                    controllerAs: 'ctrl',
                    onEnter: ['$rootScope', '$state',
                        function($rootScope, $state) {
                            if ($rootScope.userInfoIsReady) {
                                if ($rootScope.userInfo.jenis_user !== '2') {
                                    $state.go('home.suratMasuk');
                                }
                            }
                        }]
                });
    }]);
app.run(['$rootScope', '$mdSidenav', '$log', '$http', 'Session', 'Request', '$timeout', '$state', '$templateCache',
    function($rootScope, $mdSidenav, $log, $http, Session, Request, $timeout, $state, $templateCache) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.isLogin = false;
            $rootScope.isLogin = Session.isLogin();
            console.log($rootScope.isLogin);
            $rootScope.call_auth_me = function() {
                $rootScope.session_auth = Session.cookie.get('n-auth');
                console.log($rootScope.session_auth);
                Request.getUserInfoRequest(Session.cookie.get('n-auth')).success(function(feedback) {
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
        });
        var current = Session.isLogin();
        var callAtTimeout = function() {
            if (current !== Session.isLogin()) {
                current = Session.isLogin();
                $state.reload();
                $rootScope.isLogin = current;
            }
            var cat = $timeout(function() {
                callAtTimeout();
                $timeout.cancel(cat);
            }, 1500);
            return current;
        };
        callAtTimeout();
//        $templateCache.put('templates/menu-link.html',
//                '<md-button ng-class="{\'{{section.icon}}\' : true}" ui-sref-active="active" \n' +
//                '  ui-sref="{{section.state}}" ng-click="focusSection()">\n' +
//                '  {{section | humanizeDoc}}\n' +
//                '  <span  class="md-visually-hidden "\n' +
//                '    ng-if="isSelected()">\n' +
//                '    current page\n' +
//                '  </span>\n' +
//                '</md-button>\n' +
//                '');
//        $templateCache.put('partials/menu-toggle.html',
//                '<md-button class="md-button-toggle"\n' +
//                '  ng-click="toggle()"\n' +
//                '  aria-controls="docs-menu-{{section.name | nospace}}"\n' +
//                '  flex layout="row"\n' +
//                '  aria-expanded="{{isOpen()}}">\n' +
//                '  {{section.name}}\n' +
//                '  <span aria-hidden="true" class=" pull-right fa fa-chevron-down md-toggle-icon"\n' +
//                '  ng-class="{\'toggled\' : isOpen()}"></span>\n' +
//                '</md-button>\n' +
//                '<ul ng-show="isOpen()" id="docs-menu-{{section.name | nospace}}" class="menu-toggle-list">\n' +
//                '  <li ng-repeat="page in section.pages">\n' +
//                '    <menu-link section="page"></menu-link>\n' +
//                '  </li>\n' +
//                '</ul>\n' +
//                '');
    }]);
app.filter('nospace', function() {//take all whitespace out of string
    return function(value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
}).filter('humanizeDoc', function() {//replace uppercase to regular case
    return function(doc) {
        if (!doc)
            return;
        if (doc.type === 'directive') {
            return doc.name.replace(/([A-Z])/g, function($1) {
                return '-' + $1.toLowerCase();
            });
        }

        return doc.label || doc.name;
    };
});