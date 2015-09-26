function DashboardCtrl($rootScope, $scope, $http, $state, $window, $mdDialog, Session, Request, SuratMasukService, SuratKeluarService) {
    $scope.setFavorite = function(index, suratId) {
        if ($scope.surats[index].isFavorite) {
            $scope.surats[index].isFavorite = !$scope.surats[index].isFavorite;
        } else {
            $scope.surats[index].isFavorite = !$scope.surats[index].isFavorite;
        }
        SuratMasukService.setFavorite(localStorage.getItem('token'), suratId, $scope.surats[index].isFavorite);
    };
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
        $scope.viewSurat = function($event, id) {
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
                $http({
                    url: "http://localhost/notifion-api/view/" + id + "/" + $rootScope.session_auth.token,
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
        }
    }).error(function(error) {
        console.log(error);
    });

    Request.getSuratKeluarRequest(0, 10).success(function(feedback) {
        console.log(feedback);
        $scope.hideMe = [];
        $scope.suratsKeluar = feedback.result;
        for (var i = 0; i < feedback.result.length; i++) {
            $scope.hideMe[i] = false;
        }
        ;
        $scope.previewSurat = function($event, id, status) {
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
                var data = {'id': id, 'token': $rootScope.session_auth.token};
                $http({
                    url: "http://localhost/notifion-api/preview",
                    method: "POST",
                    data: data,
                    headers: {'Accept': 'application/pdf'},
                    responseType: 'arraybuffer'
                }).success(function(feedback) {
                    var file = new Blob([feedback], {type: 'application/pdf'});
                    var fileURL = URL.createObjectURL(file);
                    console.log(fileURL);
                    $scope.content = $sce.trustAsResourceUrl(fileURL);
                });
                $scope.isSigned = status;
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                };
                $scope.accSurat = function() {
                    SuratKeluarService.accSurat(id, $rootScope.session_auth.token);
                };
                $scope.rejectSurat = function() {
                    SuratKeluarService.rejectSurat(id, $rootScope.session_auth.token);
                };
            }
        };
    }).error(function(error) {
        console.log(error);
    });

    Request.getSuratDraftRequest(0, 10).success(function(feedback) {
        console.log(feedback);
        $scope.hideMe = [];
        $scope.suratsDraft = feedback.result;
        for (var i = 0; i < feedback.result.length; i++) {
            $scope.hideMe[i] = false;
        }
        $scope.editSurat = editDialog;
        function editDialog($event, id) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/dialogs/editDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event
            }).then(function() {
                console.log('finished');
            });

            function DialogController($scope, $http, $mdDialog, $sce) {
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                };
            }
        }
    }).error(function(error) {
        console.log(error);
    });
}