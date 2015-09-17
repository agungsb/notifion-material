'use strict';

function BuatSuratCtrl($mdDialog, $rootScope, $scope, $http) {
    var self = this;

    $scope.subject = "Test Subject";
    $scope.tanggalsurat = new Date();
//    $scope.isisurat = "asdf";
    $scope.nosurat = "999/UN.39.18/TU/15";
    $scope.lampiran = 2;
//    $scope.hal = "KP";

    $scope.openDatePicker = function($event) {
        $rootScope.$on('savedDate', function(evens, args) {
            $scope.tanggalsurat = new Date(args.value);
        })
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'templates/dialogs/datepickerDialog.html',
            parent: angular.element(document.body),
            targetEvent: $event
        }).then(function() {
            console.log('finished');
        });
        function DialogController($rootScope, $scope, $http, $mdDialog, $sce) {
            $scope.closeDialog = function() {
                $mdDialog.hide();
            };
            $scope.saveDate = function(value) {
                $rootScope.$emit('savedDate', {'value': value});
                $mdDialog.hide();
            }
        }
    }

    $http.get('http://localhost/notifion-api/tujuan').success(function(feedback) {
        console.log(feedback);
        $scope.results = feedback;

        self.querySearchTujuan = querySearchTujuan;
//        self.querySearchPenandatangan = querySearchPenandatangan;
        self.querySearchTembusan = querySearchTembusan;

        self.allContactsTujuan = loadContacts($scope.results);
//        self.allContactsPenandatangan = loadContacts($scope.results);
        self.allContactsTembusan = loadContacts($scope.results);

//        self.contactsTujuan = [{"name":"M. Ficky Duskarnaen","keterangan":"Dosen","identifier":"ficky_duskarnaen","image":"http://lorempixel.com/50/50/people?1","_lowername":"m. ficky duskarnaen"},{"name":"Kepala Pustikom","keterangan":"PUSTIKOM","identifier":"003000000","image":"http://lorempixel.com/50/50/people?10","_lowername":"kepala pustikom"}];
        self.contactsTujuan = [];
//        self.contactsPenandatangan = [];
        self.contactsTembusan = [];

        self.filterSelectedTujuan = true;
        self.filterSelectedTembusan = true;
//        self.filterSelectedPenandatangan = true;

    }).error(function(data) {
        console.log(data);
    });

    $http.get('http://localhost/notifion-api/penandatangan/' + localStorage.getItem('token')).success(function(feedback) {
        console.log(feedback);
        $scope.results = feedback;

        self.querySearchPenandatangan = querySearchPenandatangan;

        self.allContactsPenandatangan = loadContacts($scope.results);

        self.contactsPenandatangan = [];

        self.filterSelectedPenandatangan = true;

    }).error(function(data) {
        console.log(data);
    });

    $scope.$watch('isisurat', function(newVal, oldVal) {
        if (typeof (newVal) !== 'undefined') {
            $scope.isi = newVal;
//            console.log(newVal);
//            $scope.isi = newVal.replace('style=', "oala");
//            $scope.isi = $scope.isi.replace(' style=\"color: rgba(0, 0, 0, 0.870588);float: none;background-color: rgb(255, 255, 255);\"', "");
            $scope.isi = newVal.replace(/\s+style\=\"|color\: rgba\(0\, 0\, 0\, 0.870588\)\;|float\: none\;|background\-color\: rgb\(255\, 255\, 255\)\;\"|<span>|<\/span >/gi, "");
            console.log($scope.isi);
        }
    })

    $scope.submit = function() {
        var data = {
            "token": localStorage.getItem('token'),
            "subject": $scope.subject,
            "tanggal_surat": $scope.tanggalsurat,
            "tujuan": self.contactsTujuan,
            "penandatangan": self.contactsPenandatangan,
            "nosurat": $scope.nosurat,
            "lampiran": $scope.lampiran,
            "hal": $scope.hal,
            "isi": $scope.isi,
            "tembusan": self.contactsTembusan
        };

//        alert(JSON.stringify(data));

        console.log(data);

        $http.post("http://localhost/notifion-api/submitSurat", data).success(function(feedback) {
//            alert(feedback);
            console.log(feedback);
        }).error(function(data) {
            console.log(data);
        })
    };

    /* Scope Preview Surat */
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

        var data = {
            "token": localStorage.getItem('token'),
            "subject": $scope.subject,
            "tanggal_surat": $scope.tanggalsurat,
            "tujuan": self.contactsTujuan,
            "penandatangan": self.contactsPenandatangan,
            "nosurat": $scope.nosurat,
            "lampiran": $scope.lampiran,
            "hal": $scope.hal,
            "isi": $scope.isi,
            "tembusan": self.scontactsTembusan
        };
//        $http.post("http://localhost/notifion-api/test", data).success(function(feedback) {
//            alert(feedback);
//            console.log(feedback);
//        }).error(function(data) {
//            console.log(data);
//        })

        function DialogController($scope, $http, $mdDialog, $sce) {
            console.log(data);
            $http({
                url: "http://localhost/notifion-api/preview2",
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
                image: 'http://lorempixel.com/50/50/people?' + index
            };
            contact._lowername = contact.name.toLowerCase();
            contact.nama = arrList[index].nama;
            contact.nip = arrList[index].nip;
            return contact;
        });
    }

    /* kode hal */
    $http.get('http://localhost/notifion-api/kodeHals').success(function(feedback) {
        console.log(feedback);
        $scope.kodehals = feedback.result;
    }).error(function() {
        console.log("error");
    });
}