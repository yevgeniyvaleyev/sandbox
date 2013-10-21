angular.module('gallery')
    .filter('money', function () {
        'use strict';
        /**
         * Transforms to USD money format
         */
        return function (input) {
            if (!isNaN(input)) {
                var formatted_money = '$' + (input.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
                return formatted_money;
            }
        };
    });
