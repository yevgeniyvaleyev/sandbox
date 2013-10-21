angular.module('gallery')
    .directive('listDirective', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        'use strict';
        return {
            restrict: 'C',
            replace: false,
            scope: {
                productsList: '=list',
                filter: '=filter'
            },
            templateUrl: 'views/list.html',
            link: function ($scope, $element) {
                var selected = null,
                    delay = null;

                $scope.id = 'products-list';
                $scope.sort = $scope.filter.default.sort;
                $scope.direction = $scope.filter.default.direction;

                /**
                 * Broadcasts selected sort and direction parameters
                 */
                $scope.selectFilter =  function () {
                    $rootScope.$broadcast('product.filter', $scope.sort, $scope.direction);
                };
                
                /**
                 * Animates scrolling
                 * @param item
                 * @param container
                 */
                function scrollContainer(item, container) {
                    var element = checkScrollElement(item, container);

                    if (!element.isVisible) {
                        container.stop().animate({
                            scrollTop: element.scroll
                        }, 300);
                    }
                }
                /**
                 * Returns a visibility and a value to scroll
                 * @param element
                 * @param container
                 * @returns {{isVisible: boolean, scroll: number}}
                 */
                function checkScrollElement(element, container) {
                    var container_top = container.scrollTop(),
                        container_bottom = container_top + container.height(),
                        element_top = element.offset().top,
                        element_bottom = element_top + element.height(),

                        is_visible = ((element_bottom < container_bottom) && (element_top > container_top)),
                        value_to_scroll = element_top - container.offset().top + container_top;

                    return {
                        isVisible: is_visible,
                        scroll: value_to_scroll
                    };
                }
                /**
                 * Returns a selected element
                 * @param $event
                 * @param $element
                 */
                function getSelectedElement($event, $element) {
                    var item = $event.target.tagName === 'LI' ? angular.element($event.target) : angular.element($event.target).parents('li').eq(0),
                        next = null,
                        list = $element.find('li'),
                        edge_item = null;

                    if ($event.type === 'click') {
                        $element.find('.selected').removeClass('selected');
                        selected = item.addClass('selected');
                    }

                    if ($event.which === 38 || $event.which === 40) {
                        if (selected) {
                            selected.removeClass('selected');
                            if ($event.which === 38) {
                                // up
                                next = selected.prev();
                                edge_item = list.last();
                            } else {
                                // down
                                next = selected.next();
                                edge_item = list.eq(0);
                            }
                            if (next.length > 0) {
                                selected = next.addClass('selected');
                            } else {
                                selected = edge_item.addClass('selected');
                            }
                        } else {
                            selected = edge_item.addClass('selected');
                        }
                    }
                    return selected;
                }
                /**
                 * Selects a product
                 * @param $event
                 */
                $scope.selectProduct = function ($event, data) {
                    var selected = getSelectedElement($event, $element),
                        key = selected.attr('data-key'),
                        list_container = angular.element('ul', $element),
                        product = $scope.productsList[key];

                    $timeout.cancel(delay);

                    if ($event.type !== 'click') {
                        scrollContainer(selected, list_container);
                        $event.preventDefault();
                    }
                    delay = $timeout(function () {
                        $rootScope.$broadcast('product.select', product.productLink);
                    }, 1000);
                };
            }
        };
    }]);
