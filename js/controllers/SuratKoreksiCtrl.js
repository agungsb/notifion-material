var SuratKoreksiCtrl = ['$scope', 'Request', '$mdDialog', '$rootScope',
    function($scope, Request, $mdDialog, $rootScope) {

        var init = function() {
            Request.getSuratDraftRequest(0, 10).success(function(feedback) {
                console.log(feedback);
                $scope.suratsIsReady = true;
                if (feedback.count === 0) {
                    $scope.tableIsEmpty = true;
                } else {
                    $scope.tableIsEmpty = false;
                }
                $scope.tableReady = true;
                $scope.suratsDraft = feedback.result;
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
        };

        $rootScope.$on('reInitSuratKoreksi', function() {
            init();
        });

        init();
    }];