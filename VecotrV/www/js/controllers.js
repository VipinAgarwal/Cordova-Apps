/* global i */
angular.module('app.controllers', [])
    .controller('addPatientCtrl', function ($scope, $state) {
        $scope.addpatient = {
            fName: '',
            lNam: '',
            gender: '',
            dob: '',
            mrn: ''
        };

        $scope.addPatient = function (form) {
            if (form.$valid) {
                $state.go('selectTest');
            }
        };

    })

    .controller('selectTestCtrl', function ($scope, $state) {
        $scope.selectTest = function(event){
            if(event.target.id == "e" || event.target.id =="echar1"){
                $state.go('eTest');
            }
        }

    })

    .controller('homeCtrl', function ($scope) {

    })

    .controller('selectConditionCtrl', function ($scope) {

    })

    .controller('searchForPatientCtrl', function ($scope) {

    })

    .controller('tristateCtrl', function ($scope) {
        $scope.color = {
            name: 'top'
        };

    })
    .controller('loginCtrl', function ($scope, $state) {

        $scope.authorization = {
            username: '',
            password: ''
        };

        $scope.signIn = function (form) {
            if (form.$valid) {
                $state.go('addPatient');
            }
        };

    })
    .controller('eTestCtrl', function ($scope) {

        $scope.A = {};
        $scope.A.data = [];
        $scope.A.section = "A";
        for (i = 0; i < 8; i++) {
            $scope.A.data[i] = {};
            $scope.A.data[i].selectoptions = [{ id: 'T', label: "Top" }, { id: 'B', label: "Bottom" }, { id: 'None', label: "None" }];
            $scope.A.data[i].boxno = i + 1;
            $scope.A.data[i].selected = $scope.A.data[i].selectoptions[2];
        }

        $scope.B = {};
        $scope.B.data = [];
        $scope.B.section = "B";
        for (i = 0; i < 8; i++) {
            $scope.B.data[i] = {};
            $scope.B.data[i].selectoptions = [{ id: 'T' + i, label: "Top" }, { id: 'B' + i, label: "Bottom" }, { id: 'None' + i, label: "None" }];
            $scope.B.data[i].boxno = i + 1;
            $scope.B.data[i].selected = $scope.B.data[i].selectoptions[2];
        }

        $scope.C = {};
        $scope.C.data = [];
        $scope.C.section = "C";
        for (i = 0; i < 8; i++) {
            $scope.C.data[i] = {};
            $scope.C.data[i].selectoptions = [{ id: 'T' + i, label: "Top" }, { id: 'B' + i, label: "Bottom" }, { id: 'None' + i, label: "None" }];
            $scope.C.data[i].boxno = i + 1;
            $scope.C.data[i].selected = $scope.C.data[i].selectoptions[1];
        }

        $scope.D = {};
        $scope.D.data = [];
        $scope.D.section = "D";
        for (i = 0; i < 8; i++) {
            $scope.D.data[i] = {};
            $scope.D.data[i].selectoptions = [{ id: 'T' + i, label: "Top" }, { id: 'B' + i, label: "Bottom" }, { id: 'None' + i, label: "None" }];
            $scope.D.data[i].boxno = i + 1;
            $scope.D.data[i].selected = $scope.D.data[i].selectoptions[0];
        }
        var getscore = function (row) {
            var score = 0;
            for (i = 0; i < 8; i++) {
                if (row.data[i].selected.id == "T" || row.data[i].selected.id == "B")
                    score = score + 1;
            }
            return score;
        }
        $scope.genrateGraph = function () {
            $scope.right = {};
            $scope.right.A = getscore($scope.A);
            $scope.right.B = getscore($scope.B);
            $scope.right.C = getscore($scope.C);
            $scope.right.D = getscore($scope.D);
        }
    })
 