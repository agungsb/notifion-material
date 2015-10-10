var SuratKeluarCtrl = ['$rootScope', '$scope', 'SuratKeluarService', 'Request', 'Session', '$mdDialog',
    function($rootScope, $scope, SuratKeluarService, Request, Session, $mdDialog) {
        Request.getSuratKeluarRequest(0, 10).success(function(feedback) {
            console.log(feedback);
            $scope.hideMe = [];
            $scope.suratsKeluar = feedback.result;
            for (var i = 0; i < feedback.count; i++) {
                $scope.hideMe[i] = false;
            }
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
            $scope.previewSurat = function($event, id) {
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
                        url: "/api/preview",
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
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                    };
                }
            };
        }).error(function(error) {
            console.log(error);
        });
    }]