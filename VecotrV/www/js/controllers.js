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

     var  getValuefromDropDown = function(value){
       if(value == null || value == "None")
       {
           return 0;
       }  
       else return value;
     };
       
        $scope.generateGraph = function (form) {
            $scope.$parent.patient.etestResults = {};
            var result =  {A:{},B:{},C:{},D:{}}
            result.A = getValuefromDropDown(form.A.$modelValue);
            result.B = getValuefromDropDown(form.B.$modelValue);
            result.C = getValuefromDropDown(form.C.$modelValue);
            result.D = getValuefromDropDown(form.D.$modelValue);
            result.testdate = Date.now();
            $scope.$parent.patient.etestResults = result;
            
            $state.go('egraph');
        };
    })
 .controller('egraphCntrl', function ($scope) {
   // var eresult = $scope.$parent.patient.etestResults;
     //test data.. 
     var eresult = {A:0,B:0,C:0,D:0};   
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
    responsive: true, 
    scales:{
        xAxes: [{
         		type: 'logarithmic',
 	            		position: 'top',
 	            		labels: {
 	            			userCallback: function(tick) {
 	            				return tick.toString() + "Hz";
 	            			}
 	            		}
 	            	}],
 	            	yAxes: [{
 	            		type: 'linear',
 	            		labels: {
 	            			userCallback: function(tick) {
 	            				return tick.toString() + "dB";
 	            			}
 	            		}
 	            	}]
    }
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
        strokeColor: "rgb(0,255,0)",
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
    responsive: true,
    scales:{
        xAxes: [{
         		type: 'logarithmic',
 	            		position: 'top',
 	            		labels: {
 	            			userCallback: function(tick) {
 	            				return tick.toString() + "Hz";
 	            			}
 	            		}
 	            	}],
 	            	yAxes: [{
 	            		type: 'linear',
 	            		labels: {
 	            			userCallback: function(tick) {
 	            				return tick.toString() + "dB";
 	            			}
 	            		}
 	            	}]
    }
    };
    function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
   // mychart.Line(data,{scaleOverride: true, scaleStartValue: 0, scaleStepWidth: 1, scaleSteps: 30});

    //  $scope.patient = $scope.$parent.patient;
    //  $scope.patient.name = $scope.patient.fName + " " + $scope.patient.lName;
    //  $scope.patient.age = calculateAge( $scope.patient.dob);
    //  $scope.patient.date = eresult.testdate;
   //  var results = $scope.patient.etestResults;


 $scope.chartConfig = {

  options: {
      //This is the Main Highcharts chart config. Any Highchart options are valid here.
      //will be overriden by values specified below.
      chart: {
          type: 'bar'
      },
      tooltip: {
          style: {
              padding: 10,
              fontWeight: 'bold'
          }
      }
  },
  //The below properties are watched separately for changes.

  //Series object (optional) - a list of series using normal Highcharts series options.
  series: [{
     data: [10, 15, 12, 8, 7]
  }],
  //Title configuration (optional)
  title: {
     text: 'Hello'
  },
  //Boolean to control showing loading status on chart (optional)
  //Could be a string if you want to show specific loading text.
  loading: false,
  //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
  //properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
  xAxis: {
  currentMin: 0,
  currentMax: 20,
  title: {text: 'values'}
  },
  //Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
  useHighStocks: false,
  //size (optional) if left out the chart will default to size of the div or something sensible.
  size: {
   width: 400,
   height: 300
  },
  //function (optional)
  func: function (chart) {
   //setup some logic for the chart
  }
};
 })