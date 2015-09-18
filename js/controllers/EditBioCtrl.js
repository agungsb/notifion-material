'use strict';

function EditBioCtrl($scope, $http, $state) {
    $scope.checkNumber = function(e) {
        var key = typeof e.which === 'undefined' ? e.keyCode : e.which;
        if ((key <= 57) && (key >= 48)) {
            console.log('isNaN');
        } else {
            e.preventDefault();
        }
    };

    $scope.submit = function() {
        var data = {
            "token": localStorage.getItem('token'),
            "nama": $scope.nama,
            "password": $scope.password,
            "nip": $scope.nip,
            "gender": $scope.gender,
            "email1": $scope.email1,
            "email2": $scope.email2,
            "nohp1": $scope.nohp1,
            "nohp2": $scope.nohp2
        };
        
         console.log(data);

        $http.post("http://localhost/notifion-api/editBio", data).success(function(feedback) {
//            alert(feedback);
            console.log(feedback);
        }).error(function(data) {
            console.log(data);
        })
    };
}