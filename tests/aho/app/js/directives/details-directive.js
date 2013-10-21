angular.module('gallery')
    .directive('detailsDirective', function () {
        'use strict';
        return {
            restrict: 'C',
            replace: false,
            scope: {
                product: '=product'
            },
            templateUrl: '/views/details.html',
            link: function ($scope) {
                $scope.id = 'details';
            }
        };
    });
