angular.module('gallery')
    .controller('GalleryController', ['$scope', 'galleryService', '$rootScope', function ($scope, galleryService, $rootScope) {
        'use strict';
        $scope.productsList = [];
        $scope.product = null;
        $scope.filter = {
            list: galleryService.getFilter(),
            default: galleryService.getDefaultFilter()
        };

        $rootScope.$on('product.select', function ($event, product_link) {
            galleryService.getProductDetails(product_link).then(function (product) {
                $scope.product = product;
            });
        });
        $rootScope.$on('product.filter', function ($event, sort, direction) {
            getProducts(sort, direction);
        });
        /**
         * Gets products collection
         * @param sort
         * @param direction
         */
        function getProducts(sort, direction) {
            galleryService.getProductsList(sort, direction).then(function (productsList) {
                $scope.productsList = productsList;
            });
        }
        getProducts(null, null);
    }]);
