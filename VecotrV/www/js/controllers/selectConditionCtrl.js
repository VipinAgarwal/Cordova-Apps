//angular.module('app.controllers', [])
  app = angular.module('app.controllers');  
  app.controller('selectConditionCtrl', function ($scope, $cordovaPrinter) {

        var A = [0, .70, 1, 1.17, 1.34, 1.49, 1.63, 1.78, 1.93, 2.08];
        var B = [0, .91, 1.21, 1.38, 1.55, 1.7, 1.84, 1.99, 2.14, 2.29];
        var C = [0, .61, .91, 1.08, 1.25, 1.4, 1.54, 1.69, 1.84, 1.99];
        var D = [0, .17, .47, .64, .81, .96, 1.1, 1.25, 1.4, 1.55];

        $scope.result = {
            L: { A: {}, B: {}, C: {}, D: {} },
            LG: { A: {}, B: {}, C: {}, D: {} },
            R: { A: {}, B: {}, C: {}, D: {} },
            RG: { A: {}, B: {}, C: {}, D: {} }
        }
        var getValuefromDropDown = function (value) {
            if (value == null || value == "-" || value == "") {
                return 0;
            }
            else if (value == "A" || value == "B" || value == "C" || value == "D"){
                return 1;
            }
            else return Number(value) + 1;
        };
        
        var computeValueBasedOnPrevious = function(a,b,c,d){
            
            if(a== 0 && b== 0 && c== 0 && d ==0)
            {
                return [];
            }
            
            else if(a!= 0 && b== 0 && c== 0 && d ==0)
            {
                return [{ x: 3, y: A[a] }];
            }
            else if (a== 0 && b!= 0 && c== 0 && d ==0)
             {
                return [{ x: 6, y: B[b] }];
            }
            else if (a== 0 && b== 0 && c!= 0 && d ==0)
             {
                return [{ x: 12, y: C[c] }];
            }
            else if (a== 0 && b== 0 && c== 0 && d !=0)
             {
                return [{ x: 18, y: D[d] }];
            }
            else
            {
              return [{ x: 3, y: A[a] }, { x: 6, y: B[b] }, { x: 12, y: C[c] }, { x: 18, y: D[d] }];   
            }
        }

        $scope.updateGraph = function (form) {
            // $scope.$parent.patient.etestResults = {};
            var eresult = { A: 0, B: 0, C: 0, D: 0 };
            eresult.A = getValuefromDropDown(form.LA.$modelValue);
            eresult.B = getValuefromDropDown(form.LB.$modelValue);
            eresult.C = getValuefromDropDown(form.LC.$modelValue);
            eresult.D = getValuefromDropDown(form.LD.$modelValue);
            
            $scope.result.L = computeValueBasedOnPrevious(eresult.A, eresult.B, eresult.C,eresult.D);
            eresult.A = getValuefromDropDown(form.LGA.$modelValue);
            eresult.B = getValuefromDropDown(form.LGB.$modelValue);
            eresult.C = getValuefromDropDown(form.LGC.$modelValue);
            eresult.D = getValuefromDropDown(form.LGD.$modelValue);
            $scope.result.LG = computeValueBasedOnPrevious(eresult.A, eresult.B, eresult.C,eresult.D);
            eresult.A = getValuefromDropDown(form.RA.$modelValue);
            eresult.B = getValuefromDropDown(form.RB.$modelValue);
            eresult.C = getValuefromDropDown(form.RC.$modelValue);
            eresult.D = getValuefromDropDown(form.RD.$modelValue);
            $scope.result.R = computeValueBasedOnPrevious(eresult.A, eresult.B, eresult.C,eresult.D);
            eresult.A = getValuefromDropDown(form.RGA.$modelValue);
            eresult.B = getValuefromDropDown(form.RGB.$modelValue);
            eresult.C = getValuefromDropDown(form.RGC.$modelValue);
            eresult.D = getValuefromDropDown(form.RGD.$modelValue);
            $scope.result.RG = computeValueBasedOnPrevious(eresult.A, eresult.B, eresult.C,eresult.D);
           
            function calculateAge(birthday) { // birthday is a date
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }


        $scope.patient = $scope.$parent.patient;
        $scope.patient.name = $scope.patient.fName + " " + $scope.patient.lName;
        $scope.patient.age = calculateAge($scope.patient.dob);
        $scope.patient.date = eresult.testdate;
        
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
        };

    })