var SuratKoreksiCtrl = ['$scope', 'Request', '$mdDialog', '$rootScope', '$state',
    function($scope, Request, $mdDialog, $rootScope, $state) {

        var init = function() {
            Request.getSuratDraftRequest(0, 100).success(function(feedback) {
                console.log(feedback);
                $scope.suratsIsReady = true;
                if (feedback.count === 0) {
                    $scope.tableIsEmpty = true;
                } else {
                    $scope.tableIsEmpty = false;
                }
                $scope.tableReady = true;
                $scope.suratsDraft = feedback.result;
                $scope.editSurat = function(source) {
                    $state.go('home.editSurat.edit', {'r': encodeURIComponent(source.no_surat)});
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

        $rootScope.$on('reInitSuratKoreksi', function() {
            init();
        });

        init();
    }];