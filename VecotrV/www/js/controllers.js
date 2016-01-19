/* global i */
angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope) {

})
   
.controller('addPatientCtrl', function($scope) {

})
   
.controller('selectTestCtrl', function($scope) {

})
   
.controller('selectConditionCtrl', function($scope) {

})
   
.controller('searchForPatientCtrl', function($scope) {

})

.controller('tristateCtrl', function($scope) {
	$scope.color = {
        name: 'top'
      };

})
.controller('eTestCtrl', function($scope) {
   $scope.row1 ={};
          for(i= 1; i<8; i++){
              var box = "box" + i;
              $scope.row1[box] = {};
              $scope.row1[box].grossOptionsList = [{text:'Top', value:'T'+i}, {text:'Bottom', value:'B'+i}, {text:'None', value:'N'+i}];
          $scope.row1[box].data = {};
      	$scope.row1[box].data.grossOptions = 'B'+i;
          }
   // $scope.row1 = {section: "test section for 1", box1:"boxA1", box2:"boxA2",box3:"boxA3",box4:"boxA4",box5:"boxA5",box6:"boxA6",box7:"boxA7",box8:"boxA1"  };
    $scope.row2 = {section: "test section for 2", box1:"boxB1", box2:"boxB2",box3:"boxB3",box4:"boxB4",box5:"boxB5",box6:"boxB6",box7:"boxB7",box8:"boxB8" };
    $scope.row3 = {section: "test section for 3", box1:"boxC1", box2:"boxC2",box3:"boxC3",box4:"boxC4",box5:"boxC5",box6:"boxC6",box7:"boxC7",box8:"boxC8"  };
    $scope.row4 = {section: "test section for 4", box1:"boxD1", box2:"boxD2",box3:"boxD3",box4:"boxD4",box5:"boxD5",box6:"boxD6",box7:"boxD7",box8:"boxD8"  };
})
 