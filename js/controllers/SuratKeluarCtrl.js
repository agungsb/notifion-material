var SuratKeluarCtrl = ['$rootScope', '$scope', 'SuratKeluarService', 'Request', 'Session', '$mdDialog',
    function($rootScope, $scope, SuratKeluarService, Request, Session, $mdDialog) {
        Request.getSuratKeluarRequest(0, 10).success(function(feedback) {
            console.log(feedback);
            $scope.hideMe = [];
            $scope.suratsKeluar = feedback.result;
            for (var i = 0; i < feedback.count; i++) {
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
    }]