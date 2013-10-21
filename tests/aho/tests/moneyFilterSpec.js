describe('money filter,', function () {
    'use strict';

    beforeEach(module('gallery'));

    it('should convert number to money format', inject(function (moneyFilter) {
            expect(moneyFilter(1)).toBe('$1.00');
            expect(moneyFilter(1234.4)).toBe('$1.234.40');
            expect(moneyFilter(0)).toBe('$0.00');
            expect(moneyFilter('invalid_input')).toBe(undefined);
        }
    ));
});
