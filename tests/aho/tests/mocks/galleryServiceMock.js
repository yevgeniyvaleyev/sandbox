var mocks = {};

mocks.galleryServiceMock = function () {
    /*jshint validthis: true */
    'use strict';
    this.$get = function () {
        return {
            getProductsList: function () {
                return {
                    then: function (callback) {
                        callback(['test']);
                    }
                };
            },
            getProductDetails: function () {
                return {
                    then: function (callback) {
                        callback({});
                    }
                };
            },
            getFilter: function () {
                return {};
            },
            getDefaultFilter: function () {
                return {
                    sort: '',
                    direction: ''
                };
            }
        };
    };
};
