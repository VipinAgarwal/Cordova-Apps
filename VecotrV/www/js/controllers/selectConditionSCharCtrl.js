//angular.module('app.controllers', [])
app = angular.module('app.controllers');
app.controller('selectConditionSCharCtrl', function ($scope, $cordovaPrinter) {

    var A = [0, .70, 1, 1.17, 1.34, 1.49, 1.63, 1.78, 1.93, 2.08];
    var B = [0, .91, 1.21, 1.38, 1.55, 1.7, 1.84, 1.99, 2.14, 2.29];
    var C = [0, .61, .91, 1.08, 1.25, 1.4, 1.54, 1.69, 1.84, 1.99];
    var D = [0, .17, .47, .64, .81, .96, 1.1, 1.25, 1.4, 1.55];

    $scope.result = {
        L: { A: {}, B: {}, C: {}, D: {} },
        LG: { A: {}, B: {}, C: {}, D: {} },
        R: { A: {}, B: {}, C: {}, D: {} },
        RG: { A: {}, B: {}, C: {}, D: {} }
    };
    var getValuefromDropDown = function (value) {
        if (value == null || value == "-" || value == "") {
            return 0;
        }
        else if (value == "A" || value == "B" || value == "C" || value == "D") {
            return 1;
        }
        else return Number(value) + 1;
    };
    var calculateAge = function (birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    var computeValueBasedOnPrevious = function (b, c) {

        if (b != 0 && c == 0) {
            return [{ x: 6, y: B[b] }];
        }
        else if (b == 0 && c != 0) {
            return [{ x: 12, y: C[c] }];
        }

        else {
            return [ { x: 6, y: B[b] }, { x: 12, y: C[c] }];
        }
    }
    $scope.updateGraph = function (form) {
        // $scope.$parent.patient.etestResults = {};
        var eresult = { A: 0, B: 0, C: 0, D: 0 };
        eresult.B = getValuefromDropDown(form.LB.$modelValue);
        eresult.C = getValuefromDropDown(form.LC.$modelValue);
        $scope.result.L = computeValueBasedOnPrevious(eresult.B, eresult.C);
        eresult.B = getValuefromDropDown(form.LGB.$modelValue);
        eresult.C = getValuefromDropDown(form.LGC.$modelValue);
        $scope.result.LG = computeValueBasedOnPrevious(eresult.B, eresult.C);
        eresult.B = getValuefromDropDown(form.RB.$modelValue);
        eresult.C = getValuefromDropDown(form.RC.$modelValue);
        $scope.result.R = computeValueBasedOnPrevious(eresult.B, eresult.C);
        eresult.B = getValuefromDropDown(form.RGB.$modelValue);
        eresult.C = getValuefromDropDown(form.RGC.$modelValue);
        $scope.result.RG = computeValueBasedOnPrevious(eresult.B, eresult.C);


    };

    // $scope.patient = $scope.$parent.patient;
    // $scope.patient.name = $scope.patient.fName + " " + $scope.patient.lName;
    // $scope.patient.age = calculateAge($scope.patient.dob);
    // $scope.patient.date = eresult.testdate;

    // $scope.print = function () {
    //     if ($cordovaPrinter.isAvailable()) {
    //         var page = location.href;
    //         $cordovaPrinter.print(page, 'Document.html', function () {
    //             alert('printing finished or canceled');
    //         })

    //     } else {
    //         alert("Printing is not available on device");
    //     }

    //};

})