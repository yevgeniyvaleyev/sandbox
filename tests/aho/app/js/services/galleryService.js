angular.module('gallery')
    .service('galleryService', ['$resource', '$q', 'config', function ($resource, $q, config) {
        'use strict';

        // isArray: Returned data is an array
        var list_resource = $resource(config.endpoint + '/topproducts?_type=json&sortby=hippogogreen%3A:sortParam&sortdir=:direction&max=100',
                {sortParam: '@sortParam'},
                {'get': { method: 'GET', isArray: true }}),
            filter = {
                sort: [
                    'rating',
                    'price'
                ],
                direction: [
                    'ascending',
                    'descending'
                ]
            },
            self = this;

        /**
         * Returns a filter
         */
        this.getFilter = function () {
            return filter;
        };
        /**
         * Returns default values of the filter
         */
        this.getDefaultFilter = function () {
            return {
                sort: filter.sort[0],
                direction: filter.direction[0]
            };
        };

        /**
         * Returns calculated parameters
         * @param sort_key
         * @param direction_key
         * @returns {}
         */
        function getFilterParams(sort_key, direction_key) {
            var sort_param = sort_key || self.getDefaultFilter().sort,
                direction_param = direction_key || self.getDefaultFilter().direction;
            return {
                sortParam: sort_param,
                direction: direction_param
            };
        }
        /**
         * Returns a list of products
         * @returns promise
         */
        this.getProductsList = function (sort, direction) {
            var deferred = $q.defer();

            list_resource.get(getFilterParams(sort, direction), function (data) {
                if (data) {
                    deferred.resolve(data);
                }
            });
            return deferred.promise;
        };

        /**
         * Returns product details
         * @returns promise
         */
        this.getProductDetails = function (product_link) {
            var deferred = $q.defer();
            // Direct call due to escaping (of a link) via params
            $resource(product_link + '?_type=json').get(function (data) {
                if (data) {
                    deferred.resolve(data);
                }
            });
            return deferred.promise;
        };
    }]);
