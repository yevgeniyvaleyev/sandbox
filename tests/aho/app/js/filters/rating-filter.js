angular.module('gallery')
    .filter('rating', function () {
        'use strict';
        /**
         * Returns transformed rating number suitable for
         * displaying ratings stars
         */
        return function (input) {
            return parseInt(input * 10, 10);
        };
    });
