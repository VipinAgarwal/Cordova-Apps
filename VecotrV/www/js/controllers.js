/* global i */
angular.module('app.controllers', [])
    .controller('addPatientCtrl', function ($scope, $state) {
        $scope.addpatient = {
            fName: '',
            lName: '',
            gender: '',
            dob: '',
            mrn: ''
        };

        $scope.addPatient = function (form) {
            if (form.$valid) {
                $scope.$parent.patient = {};
                $scope.$parent.patient = {fName: form.fName.$modelValue ,
            lName: form.lName.$modelValue,
            gender: form.gender.$modelValue,
            dob: form.dob.$modelValue,
            mrn: form.mrn.$modelValue};
                $state.go('selectTest');
            }
        };

    })

    .controller('selectTestCtrl', function ($scope, $state) {
        $scope.selectTest = function(event){
            if(event.target.id == "e" || event.target.id =="echar1"){
                $state.go('selectCondition');
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
    .controller('eTestCtrl', function ($scope, $state) {

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
                if (row.data[i].selected.label == "Top" || row.data[i].selected.label == "Bottom")
                    score = score + 1;
            }
            return score;
        }
        $scope.genrateGraph = function () {
            $scope.$parent.patient.etestResults = {};
            var result =  {A:{},B:{},C:{},D:{}}
            result.A = getscore($scope.A);
            result.B = getscore($scope.B);
            result.C = getscore($scope.C);
            result.D = getscore($scope.D);
            $scope.$parent.patient.etestResults = result;
            $state.go('egraph');
        }
    })
 .controller('egraphCntrl', function ($scope) {
    $scope.data = {
      
      labels: ["A","B","C","D"],
      datasets: [ {
        label: "My Third dataset",
        
        fillColor: "rgba(151,187,205,0.2)",
        data: [2.08, 2.29, 1.99, 1.55]
      },{
        label: "My Second dataset",
        fillColor: "rgb(224,255,255)",
        data: [1.49, 1.7, 1.40, .96]
      },
      {
        label: "My First dataset",
        fillColor: "rgb(255,255,255)",
        data: [1, 1.21, .91, .47]
      }
      ]
    };
    $scope.options = {
      showScale:true,
      scaleShowVerticalLines:true,
      pointDot : false,
      bezierCurve: false,
      scaleShowGridLines : false,
      showTooltips: false,
       datasetFill : true,
    };
     $scope.data1 = {
      
      labels: ["A","B","C","D"],
     datasets: [ {
        label: "My Third dataset",
        
        fillColor: "rgba(151,187,205,0.2)",
        data: [2.08, 2.29, 1.99, 1.55]
      },{
        label: "My Second dataset",
        strokeColor: "rgba(123,120,220,1)",
        data: [1.69, 1.8, 1.60, 1.26]
      },
      {
        label: "My First dataset",
        fillColor: "rgb(255,255,255)",
        strokeColor: "rgba(255,255,255,1)",
        data: [1, 1.21, .91, .47]
      }
      
      ]
    };
      $scope.options1 = {
      showScale:true,
      scaleShowVerticalLines:false,
      pointDot : false,
      bezierCurve: false,
      scaleShowGridLines : false,
      showTooltips: false,
       datasetFill : false,
    };
     //$scope.patient = $scope.$parent.patient;
     //$scope.patient.name = $scope.patient.fName + " " + $scope.patient.lName;
   //  var results = $scope.patient.etestResults;
 })