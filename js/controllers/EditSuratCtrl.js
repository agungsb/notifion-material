var EditSuratCtrl = ['$mdDialog', '$rootScope', '$scope', '$state', 'Upload', 'Request', '$mdToast', 'promiseObj',
    function($mdDialog, $rootScope, $scope, $state, Upload, Request, $mdToast, promiseObj) {
        console.log(promiseObj.data.data);
        $scope.data = promiseObj.data.data;
        $scope.file_lampiran = promiseObj.data.file_lampiran;

        $scope.subject = $scope.data.subject_surat;
        $scope.isisurat = $scope.data.isi;
        $scope.hal = $scope.data.kode_hal;
        $scope.no_surat = $scope.data.no_surat;
        $scope.tanggal_surat = $scope.data.tanggal_surat;

        var self = this;

        $scope.filesList = []; // Inisialisasi scope filesList untuk attachment

        Request.getTujuanRequest().success(function(feedback) {
            console.log(feedback);
            $scope.results = feedback;

            self.querySearchTujuan = querySearchTujuan;
            self.querySearchTembusan = querySearchTembusan;

            self.allContactsTujuan = loadContacts($scope.results);
            self.allContactsTembusan = loadContacts($scope.results);
            self.contactsTujuan = [];

            var str = $scope.data.tujuan;
            var tujuans = str.split("@+id/");
            for (var i = 0; i < tujuans.length; i++) {
                if (tujuans[i] !== '') {
                    Request.getRequest('specificUserInfo/' + tujuans[i]).success(function(feedback) {
                        self.contactsTujuan.push(feedback.result);
                    });
                }
            }
//            self.contactsTujuan = [{"name": "M. Ficky Duskarnaen", "keterangan": "Dosen", "identifier": "ficky_duskarnaen", "image": "http://lorempixel.com/50/50/people?1", "_lowername": "m. ficky duskarnaen"}, {"name": "Kepala Pustikom", "keterangan": "PUSTIKOM", "identifier": "003000000", "image": "http://localhost/notifion-api/images/user-male.png"}];
            self.contactsTembusan = [];

            var str = $scope.data.tembusan;
            var tembusans = str.split("@+id/");
            for (var i = 0; i < tembusans.length; i++) {
                if (tembusans[i] !== '') {
                    Request.getRequest('specificUserInfo/' + tembusans[i]).success(function(feedback) {
                        self.contactsTembusan.push(feedback.result);
                    });
                }
            }

            self.filterSelectedTujuan = true;
            self.filterSelectedTembusan = true;

        }).error(function(data) {
            console.log(data);
        });

        Request.getPenandatanganRequest().success(function(feedback) {
            console.log(feedback);
            $scope.results = feedback;

            self.querySearchPenandatangan = querySearchPenandatangan;

            self.allContactsPenandatangan = loadContacts($scope.results);

            self.contactsPenandatangan = [];

            Request.getRequest('specificUserInfo/' + $scope.data.penandatangan).success(function(feedback) {
                console.log(feedback);
                console.log($scope.data.penandatangan);
                self.contactsPenandatangan.push(feedback.result);
            });

            self.filterSelectedPenandatangan = true;

        }).error(function(data) {
            console.log(data);
        });

        $scope.$watch('isisurat', function(newVal, oldVal) {
            if (typeof (newVal) !== 'undefined') {
                $scope.isi = newVal;
                $scope.isi = newVal.replace(/color\: rgba\(0\, 0\, 0\, 0.870588\)\;|float\: none\;|background\-color\: rgb\(255\, 255\, 255\)\;|<br\/>/gi, "");
                console.log($scope.isi);
            }
        });

        $scope.submit = function($event) {
            $mdDialog.show({
                templateUrl: 'templates/dialogs/loaderDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event
            });
            var files = $scope.filesList;

            var selectedSurat = {};
            var isi = "";
            if ($scope.tabUploadSurat === true) {
                isi = "";
                selectedSurat = $scope.selectedSurat;
            } else {
                isi = $scope.isi;
                selectedSurat = {};
            }

            var lampiran = $scope.file_lampiran.length + $scope.filesList.length;

            var data = {
                "token": $rootScope.session_auth.token,
                "subject": $scope.subject,
                "lampiran": lampiran,
                "tanggal_surat": $scope.data.tanggal_surat,
                "tujuan": self.contactsTujuan,
                "penandatangan": self.contactsPenandatangan,
                "nosurat": $scope.data.no_surat,
                "hal": $scope.hal,
                "isi": isi,
                "tembusan": self.contactsTembusan,
                "was_uploaded": $scope.data.is_uploaded, // Apakah sebelumnya merupakan hasil upload?
                "is_uploaded": $scope.tabUploadSurat, // Apakah sekarang merupakan hasil upload?
                "totalNewAttachments": $scope.filesList.length, // Total banyaknya lampiran baru yang ingin ditambahkan
                "totalRemovedOldAttachments": $scope.removedOldAttachments.length, // Total banyaknya lampiran lama yang ingin dihapus
                "removedOldAttachments": $scope.removedOldAttachments, // Object yang berisi informasi dari lampiran-lampiran lama yang ingin dihapus
                "OldFileUploaded": promiseObj.data.file_path
            };

            console.log(data);
            console.log(files);
            console.log(selectedSurat);
            console.log($scope.file_lampiran);
            console.log(lampiran);
//            return;

            Upload.upload({
                url: '/api/submitEdit',
//                url: 'http://localhost/notifion-api/submitSurat',
                fields: data,
                file: {"files[]": files, "isi": selectedSurat}
            }).progress(function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.log = 'progress: ' + progressPercentage + '% ' +
                        evt.config.file.name + '\n' + $scope.log;
            }).success(function(data, status, headers, config) {
                console.log(data);
                $scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                $mdDialog.hide();
                $mdToast.show(
                        $mdToast.simple()
                        .content(data.result)
                        .position('right')
                        .hideDelay(1000)
                        ).then(function() {
                    $rootScope.$emit('websocketSend', {'tipe': 'suratkeluar', 'data': data});
                    $state.go('home.suratKoreksi', {}, {});
                });
            }).error(function(data) {
                console.log(data);
                $mdDialog.hide();
            });
        };

        /* Scope Preview Surat */
        $scope.previewSurat = function($event) {
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

            var lampiran = $scope.file_lampiran.length + $scope.filesList.length;

            var data = {
                "token": $rootScope.session_auth.token,
                "subject": $scope.subject,
                "tanggal_surat": $scope.data.tanggal_surat,
                "tujuan": self.contactsTujuan,
                "penandatangan": self.contactsPenandatangan,
                "nosurat": $scope.data.no_surat,
                "lampiran": lampiran,
                "hal": $scope.hal,
                "isi": $scope.isi,
                "tembusan": self.contactsTembusan
            };

            function DialogController($scope, $http, $mdDialog, $sce) {
                console.log(data);
                $http({
                    url: "/api/previewKoreksi",
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

        /**
         * Search for contacts.
         */
        function querySearchTujuan(query) {
            var results = query ?
                    self.allContactsTujuan.filter(createFilterFor(query)) : [];
            return results;
        }

        function querySearchTembusan(query) {
            var results = query ?
                    self.allContactsTembusan.filter(createFilterFor(query)) : [];
            return results;
        }

        function querySearchPenandatangan(query) {
            var results = query ?
                    self.allContactsPenandatangan.filter(createFilterFor(query)) : [];
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(contact) {
                return (contact._lowername.indexOf(lowercaseQuery) != -1);
                ;
            };

        }

        function loadContacts(arrList) {
            var contacts = [];

            for (var i in arrList) {
                contacts.push(arrList[i].deskripsi);
            }

            return contacts.map(function(c, index) {
                var contact = {
                    name: c,
                    keterangan: arrList[index].keterangan,
                    identifier: arrList[index].identifier,
//                    image: 'http://lorempixel.com/50/50/people?' + index
                    image: 'http://localhost/notifion-material/img/user-male.png'
                };
                contact._lowername = contact.name.toLowerCase();
                contact.nama = arrList[index].nama;
                contact.nip = arrList[index].nip;
                return contact;
            });
        }

        /* Posisi tab apakah di 'Tulis Surat' atau 'Upload Surat' */
        if ($scope.data.is_uploaded == "true") {
            $scope.selectedTabIndex = 1;
            $scope.tabUploadSurat = true; // Inisialisasi awal, tab bukan berada di tabUploadSurat, melainkan di tabTulisSurat
        } else if($scope.data.is_uploaded == "false"){
            $scope.selectedTabIndex = 0;
            $scope.tabUploadSurat = false;
        }
        /* kode hal */
        Request.getRequest('kodeHals', {}).success(function(feedback) {
            console.log(feedback);
            $scope.kodehals = feedback.result;
        }).error(function() {
            console.log("error");
        });

        $scope.filesList = [];

        $scope.$watch('files', function(newVal) {
            if (typeof (newVal) !== 'undefined') {
                if (newVal !== null) {
                    if (newVal.type === "application/pdf") {
                        $scope.filesList.push(newVal);
                    }
                }
            }
        });

        $scope.uploadSurat = null;
        $scope.selectedSurat = {"name": promiseObj.data.file_path, "size": "undefined"};
        $scope.$watch('uploadSurat', function(newVal) {
            console.log(newVal);
            if ((newVal) !== null) {
                $scope.selectedSurat = {};
                $scope.uploadSuratIsReady = true;
                $scope.selectedSurat = newVal;
                $scope.removeUploadSurat = function() {
                    $scope.uploadSuratIsReady = false;
                    $scope.selectedSurat = null;
                    console.log($scope.selectedSurat);
                };
            }
        });

        $scope.roundFileSize = function(size) {
            var result = size / 1024 / 1024;
            return result.toFixed(2) + " Mb";
        };

        $scope.removeFile = function(index) {
            $scope.filesList.splice(index, 1);
            console.log($scope.filesList);
        };

        $scope.removedOldAttachments = [];
        $scope.removeOldFile = function(index) {
            $scope.removedOldAttachments.push($scope.file_lampiran[index]);
            $scope.file_lampiran.splice(index, 1);
        };

        $scope.getFileName = function(path) {
            if (typeof (path) !== 'undefined') {
                var str = path;
                var res = str.split('/');
                return res[res.length - 1];
            }
        };
    }];