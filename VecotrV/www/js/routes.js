angular.module('app.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider



            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })


            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl'
            })


            .state('addPatient', {
                url: '/addPatient',
                templateUrl: 'templates/addPatient.html',
                controller: 'addPatientCtrl'
            })





            .state('selectTest', {
                url: '/selectTest',
                templateUrl: 'templates/selectTest.html',
                controller: 'selectTestCtrl'
            })





            .state('selectCondition', {
                url: '/selectCondition',
                templateUrl: 'templates/selectCondition.html',
                controller: 'selectConditionCtrl'
            })

            .state('selectConditionForS', {
                url: '/selectConditionForS',
                templateUrl: 'templates/selectConditionForS.html',
                controller: 'selectConditionForSCtrl'
            })



            .state('searchForPatient', {
                url: '/searchForPatient',
                templateUrl: 'templates/searchForPatient.html',
                controller: 'searchForPatientCtrl'
            })

            .state('eTest', {
                url: '/etest',
                templateUrl: 'templates/etest.html',
                controller: 'eTestCtrl'
            })
            .state('egraph', {
                url: '/egraph',
                templateUrl: 'templates/etestgraph.html',
                controller: 'egraphCntrl'
            })

            ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');

    });