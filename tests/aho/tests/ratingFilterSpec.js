describe('rating filter,', function () {
    'use strict';

    beforeEach(module('gallery'));

    it('should create special number suited for css class', inject(function (ratingFilter) {
            expect(ratingFilter(1)).toBe(10);
            expect(ratingFilter(2.5)).toBe(25);
            expect(ratingFilter(3.45)).toBe(34);
            expect(ratingFilter('ddd')).not.toBe(jasmine.any(Number));
            expect(ratingFilter()).not.toBe(jasmine.any(Number));
        }
    ));
});
