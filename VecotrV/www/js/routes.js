angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('login', {
      url: '/page1',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('addPatient', {
      url: '/page2',
      templateUrl: 'templates/addPatient.html',
      controller: 'addPatientCtrl'
    })
        
      
    
      
        
    .state('selectTest', {
      url: '/page3',
      templateUrl: 'templates/selectTest.html',
      controller: 'selectTestCtrl'
    })
        
      
    
      
        
    .state('selectCondition', {
      url: '/page4',
      templateUrl: 'templates/selectCondition.html',
      controller: 'selectConditionCtrl'
    })
        
      
    
      
        
    .state('searchForPatient', {
      url: '/page5',
      templateUrl: 'templates/searchForPatient.html',
      controller: 'searchForPatientCtrl'
    })
      
      .state('eTest', {
      url: '/etest',
      templateUrl: 'templates/etest.html',
      controller: 'eTestCtrl'
    })  
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/etest');

});