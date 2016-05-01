/* global i */
angular.module('app.controllers', [])
    .controller('addPatientCtrl', function ($scope, $state, $location, $ionicNavBarDelegate) {
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
                $scope.$parent.patient = {
                    fName: form.fName.$modelValue,
                    lName: form.lName.$modelValue,
                    gender: form.gender.$modelValue,
                    dob: form.dob.$modelValue,
                    mrn: form.mrn.$modelValue
                };
                $state.go('selectTest');
            }
        };

    })

    .controller('selectTestCtrl', function ($scope, $state) {
        $scope.selectTest = function (event) {
            if (event.target.id == "e" || event.target.id == "echar1") {
                $state.go('selectCondition');
            }
            else {
                $state.go('selectConditionForS');
            }
        }

    })

    .controller('homeCtrl', function ($scope, $state) {
        $scope.reset = function () {
            $state.go('login');
        }

    })
    
    .controller('selectConditionForSCtrl', function($scope, $state){
        
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
    // .controller('eTestCtrl', function ($scope, $state) {

    //     var getValuefromDropDown = function (value) {
    //         if (value == null || value == "None") {
    //             return 0;
    //         }
    //         else return value;
    //     };

    //     $scope.generateGraph = function (form) {
    //         $scope.$parent.patient.etestResults = {};
    //         var result = { A: {}, B: {}, C: {}, D: {} }
    //         result.A = getValuefromDropDown(form.A.$modelValue);
    //         result.B = getValuefromDropDown(form.B.$modelValue);
    //         result.C = getValuefromDropDown(form.C.$modelValue);
    //         result.D = getValuefromDropDown(form.D.$modelValue);
    //         result.testdate = Date.now();
    //         $scope.$parent.patient.etestResults = result;

    //         $state.go('egraph');
    //     };
    // })
    .controller('egraphCntrl', function ($scope, $cordovaPrinter) {
        var eresult = $scope.$parent.patient.etestResults;
        //test data.. 
        // var eresult = { A: 0, B: 0, C: 0, D: 0 };
        var A = [.70, 1, 1.17, 1.34, 1.49, 1.63, 1.78, 1.93, 2.08];
        var B = [.91, 1.21, 1.38, 1.55, 1.7, 1.84, 1.99, 2.14, 2.29];
        var C = [.61, .91, 1.08, 1.25, 1.4, 1.54, 1.69, 1.84, 1.99];
        var D = [.17, .47, .64, .81, .96, 1.1, 1.25, 1.4, 1.55];






        function calculateAge(birthday) { // birthday is a date
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }


        $scope.patient = $scope.$parent.patient;
        $scope.patient.name = $scope.patient.fName + " " + $scope.patient.lName;
        $scope.patient.age = calculateAge($scope.patient.dob);
        $scope.patient.date = eresult.testdate;
        $scope.patient.edata = [{ x: 3, y: A[eresult.A] }, { x: 6, y: B[eresult.B] }, { x: 12, y: C[eresult.C] }, { x: 18, y: D[eresult.D] }];
        //$scope.patient.edata = "test";
        $scope.print = function () {
            if ($cordovaPrinter.isAvailable()) {
                var page = location.href;
                $cordovaPrinter.print(page, 'Document.html', function () {
                    alert('printing finished or canceled');
                })

            } else {
                alert("Printing is not available on device");
            }
        }

    })