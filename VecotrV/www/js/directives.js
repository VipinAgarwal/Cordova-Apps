angular.module('app.directives', [])

.directive('tristateButton', [function(){

	return{
        scope: {
      tSBInfo: '=info'
    },
		templateUrl:'templates/tristatebutton.html'
	};

}]);

