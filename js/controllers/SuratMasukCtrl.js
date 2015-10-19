var SuratMasukCtrl = ['$rootScope', '$scope', 'SuratMasukService', 'Request', 'Session', '$mdDialog',
    function SuratMasukCtrl($rootScope, $scope, SuratMasukService, Request, Session, $mdDialog) {
        var init = function() {
            Request.getSuratMasukRequest(0, 10).success(function(feedback) {
                console.log(feedback);
                $scope.suratsIsReady = true;
                if (feedback.count === 0) {
                    $scope.tableIsEmpty = true;
                } else {
                    $scope.tableIsEmpty = false;
                }
                $scope.surats = feedback.result;
                $scope.tableReady = true;
//            scope untuk view surat
                $scope.viewSurat = function($event, id, source) {
//                var url = "http://localhost/notifion-api/view/" + id + "/" + localStorage.getItem('token');
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
                        var sourceUrl = "";
                        if (source.isUploaded) {
                            sourceUrl = "/api/" + source.file_path;
                        } else {
                            sourceUrl = "/api/view/" + id + "/" + $rootScope.session_auth.token;
                        }
                        $http({
                            url: sourceUrl,
                            method: "GET",
                            headers: {'Accept': 'application/pdf'},
                            responseType: 'arraybuffer'
                        }).success(function(feedback) {
                            var file = new Blob([feedback], {type: 'application/pdf'});
                            var fileURL = URL.createObjectURL(file);
                            console.log(fileURL);
                            $scope.content = $sce.trustAsResourceUrl(fileURL);
                        });
                        $scope.isSigned = 1;
                        $scope.closeDialog = function() {
                            $mdDialog.hide();
                        };
                        $scope.isOpen = false;
                        $scope.demo = {
                            isOpen: false,
                            count: 0,
                            selectedAlignment: 'md-left'
                        };
                    }
                };
                $scope.setFavorite = function(index, suratId) {
                    if ($scope.surats[index].isFavorite) {
                        $scope.surats[index].isFavorite = !$scope.surats[index].isFavorite;
                    } else {
                        $scope.surats[index].isFavorite = !$scope.surats[index].isFavorite;
                    }
                    SuratMasukService.setFavorite(suratId, $scope.surats[index].isFavorite);
                };
            }).error(function(error) {
                console.log(error);
            });
        };

        $rootScope.$on('reInitSuratMasuk', function() {
            init();
        });

        init();
    }];