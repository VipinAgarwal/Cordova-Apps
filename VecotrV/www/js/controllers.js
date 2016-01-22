/* global i */
angular.module('app.controllers', [])
    .controller('addPatientCtrl', function ($scope, $state,$location,$ionicNavBarDelegate) {
        var path = $location.path();
   if (path.indexOf('login') != -1)
     $ionicNavBarDelegate.showBackButton(false);
   else
     $ionicNavBarDelegate.showBackButton(true);
     
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

    .controller('homeCtrl', function ($scope,  $state) {
        $scope.reset = function(){
             $state.go('login');
        }

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
    .controller('loginCtrl', function ($scope, $state, $location, $ionicNavBarDelegate) {
var path = $location.path();
   if (path.indexOf('login') != -1)
     $ionicNavBarDelegate.showBackButton(false);
   else
     $ionicNavBarDelegate.showBackButton(true);
     

        $scope.authorization = {
            username: '',
            password: ''
        };

        $scope.signIn = function (form) {
            if (form.$valid) {
                $state.go('searchForPatient');
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
            $scope.C.data[i].selected = $scope.C.data[i].selectoptions[2];
        }

        $scope.D = {};
        $scope.D.data = [];
        $scope.D.section = "D";
        for (i = 0; i < 8; i++) {
            $scope.D.data[i] = {};
            $scope.D.data[i].selectoptions = [{ id: 'T' + i, label: "Top" }, { id: 'B' + i, label: "Bottom" }, { id: 'None' + i, label: "None" }];
            $scope.D.data[i].boxno = i + 1;
            $scope.D.data[i].selected = $scope.D.data[i].selectoptions[2];
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
            result.testdate = Date.now();
            $scope.$parent.patient.etestResults = result;
            
            $state.go('egraph');
        }
    })
 .controller('egraphCntrl', function ($scope) {
    var eresult = $scope.$parent.patient.etestResults;
     //test data.. 
    // var eresult = {A:0,B:0,C:0,D:0};   
     var A = [.70,1,1.17,1.34,1.49,1.63,1.78,1.93,2.08];
     var B= [.91,1.21,1.38,1.55,1.7,1.84,1.99,2.14,2.29];
     var C = [.61,.91,1.08,1.25,1.4,1.54,1.69,1.84,1.99];
     var D = [.17,.47,.64,.81,.96,1.1,1.25,1.4,1.55];
     
    $scope.data = {
      
      labels: [3,6,12,18],
      datasets: [
         {
        label: "My Last dataset",
        
        fillColor: "rgb(186,215,224)",
        data: [2.08, 2.29, 1.99, 1.55]
      },{
        label: "My Fourth dataset",
        fillColor: "rgb(136,174,186)",
        data: [1.78, 1.99, 1.69, 1.25]
      },{
        label: "My Third dataset",
        fillColor: "rgb(74,126,143)",
        data: [1.63, 1.84, 1.54, 1.1]
      },{
        label: "My Second dataset",
        fillColor: "rgb(255,255,255)",
        data: [1.34, 1.55, 1.25, .81]
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
      scaleShowGridLines : true,
      showTooltips: true,
       datasetFill : true,
       maintainAspectRatio: true,
    responsive: true
    };
     $scope.data1 = {
      
      labels: [3,6,12,18],
     datasets: [ {
        label: "My Third dataset",
        strokeColor: "rgb(186,215,224)",
        data: [2.08, 2.29, 1.99, 1.55]
      },
      {
        label: "My Result dataset",
        strokeColor: "rgb(255,0,0)",
        data: [A[eresult.A], B[eresult.B], C[eresult.C], D[eresult.D]]
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
      scaleShowVerticalLines:true,
      pointDot : false,
      bezierCurve: false,
      scaleShowGridLines : false,
      showTooltips: false,
       datasetFill : false,
       maintainAspectRatio: true,
    responsive: true
    };
    function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
   // mychart.Line(data,{scaleOverride: true, scaleStartValue: 0, scaleStepWidth: 1, scaleSteps: 30});

     $scope.patient = $scope.$parent.patient;
     $scope.patient.name = $scope.patient.fName + " " + $scope.patient.lName;
     $scope.patient.age = calculateAge( $scope.patient.dob);
     $scope.patient.date = eresult.testdate;
   //  var results = $scope.patient.etestResults;
 })