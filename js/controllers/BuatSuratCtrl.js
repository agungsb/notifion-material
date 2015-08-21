'use strict';

function BuatSuratCtrl($mdDialog, $rootScope, $scope, $http) {
    var self = this;

    $scope.subject = "Test Subject";
    $scope.tanggalsurat = new Date();
    $scope.isisurat = "asdf";
    $scope.nosurat = "999/UN.39.18/TU/15";
    $scope.lampiran = 2;
    $scope.hal = "KP";

    $scope.openDatePicker = function($event) {
        $rootScope.$on('savedDate', function(evens, args){
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
            $scope.saveDate = function(value){
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

    $scope.submit = function() {

        alert($scope.tanggalsurat);

        var data = {
            "token": localStorage.getItem('token'),
            "subject": $scope.subject,
            "tanggal_surat": $scope.tanggalsurat,
            "tujuan": self.contactsTujuan,
            "penandatangan": self.contactsPenandatangan,
            "nosurat": $scope.nosurat,
            "lampiran": $scope.lampiran,
            "hal": $scope.hal,
            "isi": $scope.isisurat,
            "tembusan": self.contactsTembusan
        };

//        alert(JSON.stringify(data));

        $http.post("http://localhost/notifion-api/submitSurat", data).success(function(feedback) {
//            alert(feedback);
            console.log(feedback);
        }).error(function(data) {
            console.log(data);
        })
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
            var cParts = c.split(' ');
            var contact = {
                name: c,
                keterangan: arrList[index].keterangan,
                identifier: arrList[index].identifier,
                image: 'http://lorempixel.com/50/50/people?' + index
            };
            contact._lowername = contact.name.toLowerCase();
            return contact;
        });
    }
}