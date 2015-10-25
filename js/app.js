'use strict';
var app = angular.module('notifionApp',
        ['ui.router', 'ngMaterial', 'textAngular', 'ngCookies', 'mdDateTime', 'ngFileUpload', 'infinite-scroll']);
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
                    url: "/login",
                    template: '<login-directive class="fade-animation"></login-directive>',
                    onEnter: ['$rootScope', '$state', function($rootScope, $state) {
                            if ($rootScope.isLogin) {
                                $state.go('home.suratMasuk');
                            }
                        }]
                })
                .state('home.suratMasuk', {
                    url: "",
                    templateUrl: "templates/content/management-surat/surat-masuk.html",
                    controller: SuratMasukCtrl
                })
                .state('home.suratFavorite', {
                    url: "surat-favorite",
                    templateUrl: "templates/content/management-surat/surat-favorite.html",
                    controller: SuratFavoriteCtrl
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
                .state('home.editSurat', {
                    url: "edit-surat/:noSurat",
                    templateUrl: "templates/content/management-surat/edit-surat.html",
                    resolve: {
                        promiseObj: ['$rootScope', 'Request', '$stateParams', '$state',
                            function($rootScope, Request, $stateParams, $state) {
                                var data = {
                                    "no_surat": decodeURIComponent($stateParams.noSurat),
                                    "token": $rootScope.session_auth.token
                                };
                                return Request.postRequest('authSurat', data);
                            }]
                    },
                    controller: EditSuratCtrl,
                    controllerAs: 'ctrl',
                    onEnter: ['promiseObj', '$state',
                        function(promiseObj, $state) {
                            console.log(promiseObj.data);
                            if (!promiseObj.data.result) {
                                $state.go('home.suratMasuk', {}, {location: 'replace'});
                            }
                        }]
                })
                .state('home.listUser', {
                    url: "list-user",
                    templateUrl: "templates/content/management-user/list-user.html"
                })
//                .state('home.tambahUser', {
//                    url: "tambah-user",
//                    templateUrl: "templates/content/management-user/tambah-user.html",
//                    controller: TambahUserCtrl
//                })
                .state('home.editBio', {
                    url: "edit-bio",
                    templateUrl: "templates/content/management-user/editBio.html",
                    controller: EditBioCtrl
                })

                .state('home.tambahAccount', {
                    url: "tambah-user",
                    templateUrl: "templates/content/management-user/tambah-user.html",
                    controller: TambahAccountCtrl
                })

                .state('home.tambahUserBiasa', {
                    url: "tambah-user-ord",
                    templateUrl: "templates/content/management-user/tambah-user-ord.html",
                    controller: TambahAccountOrdCtrl
                })

                .state('home.tambahInstansi', {
                    url: "tambah-instansi",
                    templateUrl: "templates/content/management-user/tambah-instansi.html",
                    controller: TambahInstansiCtrl
                })
                .state('home.tambahInstitusi', {
                    url: "tambah-institusi",
                    templateUrl: "templates/content/management-user/tambah-institusi.html",
                    controller: TambahInstitusiCtrl
                })

                .state('home.tambahKodeHal', {
                    url: "tambah-kode-hal",
                    templateUrl: "templates/content/management-surat/tambah-hal.html",
                    controller: TambahKodeHalCtrl
                })

                .state('home.tambahKodeUnit', {
                    url: "tambah-kode-unit",
                    templateUrl: "templates/content/management-surat/tambah-kode-unit.html",
                    controller: TambahKodeUnitCtrl
                })

                .state('home.tambahPejabat', {
                    url: "tambah-pejabat",
                    templateUrl: "templates/content/management-user/tambah-pejabat.html",
                    controller: TambahUserPejabatCtrl
                })

                .state('home.tambahJabatan', {
                    url: "tambah-jabatan",
                    templateUrl: "templates/content/management-user/buat-jabatan.html",
                    controller: TambahJabatanCtrl
                })

                .state('home.buatSurat', {
                    url: "buat-surat",
                    templateUrl: "templates/content/management-surat/buat-surat.html",
                    controller: BuatSuratCtrl,
                    controllerAs: 'ctrl'
                });
    }]);
app.run(['$rootScope', '$mdSidenav', '$log', '$http', 'Session', 'Request', '$timeout', '$state', '$templateCache', '$mdToast',
    function($rootScope, $mdSidenav, $log, $http, Session, Request, $timeout, $state, $templateCache, $mdToast) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.isLogin = false;
            $rootScope.isLogin = Session.isLogin();
            console.log($rootScope.isLogin);
            var call_auth_me = function() {
                $rootScope.session_auth = Session.cookie.get('n-auth');
                console.log($rootScope.session_auth);
                Request.getUserInfoRequest(Session.cookie.get('n-auth')).success(function(feedback) {
                    console.log(feedback);
                    $rootScope.userInfo = feedback.data;
                    var setNavbarLists = $timeout(function() {
                        $rootScope.$apply(function() {
                            dataUnreadBadgeCounter(feedback);
                            dataUnsignedBadgeCounter(feedback);
                            if ($rootScope.session_auth.jenis_user === "2") {
                                dataCorrectedBadgeCounter(feedback);
                            }
                            dataFavoriteBadgeCounter(feedback);
                        });
                        $timeout.cancel(setNavbarLists);
                    }, 1000);
                    $rootScope.userInfoIsReady = true;
                }).error(function(error) {
                    console.log(error);
                });
            };
            $rootScope.$on('reCallAuth', function(event) {
                call_auth_me();
            });
            if ($rootScope.isLogin) {
                call_auth_me();
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
//                console.log(current);
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

        var loc = window.location;
        var uri = 'ws:';

        if (loc.protocol === 'https:') {
            uri = 'wss:';
        }
        uri += '//' + loc.host;
        uri += loc.pathname + 'ws';

//            uri = "ws://127.0.0.1:3000/ws" // Yang dipake, yang ini
        uri = "ws://localhost:3000/wsjsonmultiple";
//            uri = "ws://127.0.0.1:9000/notifion-api/socket_server.php";
        var ws = new WebSocket(uri);

        ws.onopen = function() {
            console.log('Connected');
        };

        ws.onmessage = function(evt) {
//                console.log(evt);
//                console.log(JSON.parse(evt.data));
            var response = JSON.parse(evt.data);
            console.log(response);
            console.log($rootScope.session_auth.isUnsigned);
//            console.log($rootScope.session_auth.account);
//            console.log($rootScope.session_auth.id_jabatan);
            console.log($rootScope.session_auth);
            if (response.tipe === 'suratmasuk') {
                if ((response.account === $rootScope.session_auth.account) || (response.account === $rootScope.userInfo.id_jabatan)) {
                    $rootScope.$emit('reInitSuratMasuk');
                    $rootScope.session_auth.isUnreads++;
                    console.log($rootScope.session_auth);
                    dataUnreadBadgeCounter($rootScope.session_auth);
                    $mdToast.show(
                            $mdToast.simple()
                            .content("Ada surat masuk baru")
                            .position('right')
                            .hideDelay(1000)
                            );
                }
            } else if (response.tipe === 'suratkeluar') {
                if ((response.account === $rootScope.session_auth.account) || (response.account === $rootScope.userInfo.id_jabatan)) {
                    $rootScope.$emit('reInitSuratKeluar');
                    $rootScope.session_auth.isUnsigned += 1;
                    console.log($rootScope.session_auth.isUnsigned);
                    alert($rootScope.session_auth.isUnsigned);
                    dataUnsignedBadgeCounter($rootScope.session_auth);
                    $mdToast.show(
                            $mdToast.simple()
                            .content("Ada surat keluar baru")
                            .position('right')
                            .hideDelay(1000)
                            );
                }
            } else if (response.tipe === 'suratkoreksi') {
                if (($rootScope.session_auth.jenis_user === '2') && (response.account === $rootScope.session_auth.id_institusi)) {
                    $rootScope.$emit('reInitSuratKoreksi');
                    $rootScope.session_auth.isCorrected += 1;
                    dataCorrectedBadgeCounter($rootScope.session_auth);
                    $mdToast.show(
                            $mdToast.simple()
                            .content("Ada surat koreksi baru")
                            .position('right')
                            .hideDelay(1000)
                            );
                }
            }
        };
        $rootScope.$on('websocketSend', function(event, args) {
            console.log(args.data);
//            var msg = {"tipe": args.tipe, "account": args.data.account, "isUnreads": args.data.isUnreads, "favorites": args.data.favorites, "isUnsigned": args.data.isUnsigned, "isCorrected": args.data.isCorrected};
            var msg = {"tipe": args.tipe, "account": args.data.account};
            ws.send(JSON.stringify(msg));
        });
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