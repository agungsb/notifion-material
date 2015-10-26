var SuratKeluarCtrl = ['$rootScope', '$scope', 'SuratKeluarService', 'Request', 'Session', '$mdDialog',
    function($rootScope, $scope, SuratKeluarService, Request, Session, $mdDialog) {
        var init = function() {
            Request.getSuratKeluarRequest(0, 100).success(function(feedback) {
                console.log(feedback);
                $scope.suratsIsReady = true;
                if (feedback.count === 0) {
                    $scope.tableIsEmpty = true;
                } else {
                    $scope.tableIsEmpty = false;
                }
                $scope.suratsKeluar = feedback.result;
                $scope.tableReady = true;

                $scope.acceptSurat = function(id) {
                    SuratKeluarService.acceptSurat(id);
                };
                $scope.koreksiSurat = function($event, id) {
//                SuratKeluarService.koreksiSurat(id);
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'templates/dialogs/koreksiSuratDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: $event
                    }).then(function() {
                        console.log('finished');
                    });
                    function DialogController($scope, $mdDialog, $sce) {
                        $scope.closeDialog = function() {
                            $mdDialog.hide();
                        };
                        $scope.submit = function() {
                            SuratKeluarService.koreksiSurat(id, $scope.pesan);
                        };
                    }
                };
                $scope.previewSurat = function($event, source) {
//                var url = "http://localhost/notifion-api/preview/" + id + "/" + localStorage.getItem('token');
//                $window.open(url, '_blank');
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'templates/dialogs/pdfDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: $event
                    }).then(function() {
                        console.log('finished');
                    });
                    function DialogController($scope, $http, $mdDialog, $sce) {
                        console.log(source);
                        var sourceUrl = "";
                        var request = {};
                        if (source.isUploaded) {
                            sourceUrl = "/api/" + source.uploadedFilePath;
                            request = {
                                url: sourceUrl,
                                method: "GET",
                                headers: {'Accept': 'application/pdf'},
                                responseType: 'arraybuffer'
                            };
                        } else {
                            var data = {'id': source.id, 'token': $rootScope.session_auth.token};
                            request = {
                                url: "/api/preview",
                                method: "POST",
                                data: data,
                                headers: {'Accept': 'application/pdf'},
                                responseType: 'arraybuffer'
                            };
                        }
                        console.log(request);
                        $http(request).success(function(feedback) {
                            var file = new Blob([feedback], {type: 'application/pdf'});
                            var fileURL = URL.createObjectURL(file);
                            console.log(fileURL);
                            $scope.content = $sce.trustAsResourceUrl(fileURL);
                        });
                        $scope.closeDialog = function() {
                            $mdDialog.hide();
                        };
                    }
                };
            }).error(function(error) {
                console.log(error);
            });
        };

        $rootScope.$on('reInitSuratKeluar', function() {
            init();
        });

        init();
    }];