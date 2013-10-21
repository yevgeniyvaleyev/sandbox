describe('controller,', function () {
    'use strict';

    beforeEach(module('gallery'));

    describe('gallery,', function () {
        var scope, ctrl;

        beforeEach(module(function ($provide) {
            $provide.provider('galleryService', mocks.galleryServiceMock);
        }));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('GalleryController', {
                $scope: scope
            });
        }));

        it('should have initializing fields', function () {
            expect(scope.productsList instanceof Array).toBeTruthy();
            expect(scope.product).toBe(null);
            expect(typeof scope.filter.list).toBe('object');
            expect(typeof scope.filter.default).toBe('object');
        });

        it('should load a product', function (done) {
            scope.$broadcast('product.select', 'test');
            setTimeout(function () {
                expect(scope.product).not.toBe(null);
                done();
            }, 10);
        });

        it('should load a list of products', function (done) {
            scope.$broadcast('product.filter', 'test');
            setTimeout(function () {
                expect(scope.productsList[0]).toBe('test');
                done();
            }, 10);
        });
    });
});
