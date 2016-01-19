angular.module('app.directives', [])

.directive('tristateButton', [function(){

	return{
        scope: {
      row: '=info'
    },
		templateUrl:'templates/tristatebutton.html'
	};

}]);

