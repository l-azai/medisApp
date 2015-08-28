(function() {
	var trustHtml = ['$sce', function($sce) {
		return function(input) {
			return $sce.trustAsHtml(input);
		};
	}];

	angular.module('medisApp.filters')
		.filter('trustHtml', trustHtml);
}());