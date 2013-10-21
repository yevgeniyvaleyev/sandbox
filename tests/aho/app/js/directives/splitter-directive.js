angular.module('gallery')
    .directive('splitterDirective', function () {
        'use strict';
        return {
            restrict: 'C',
            replace: false,
            scope: {
                min_pane_width: '@minWidth'
            },
            template: '',
            link: function ($scope, $element) {
                var splitter = angular.element('<div class="splitter no-select"></div>'),
                    panes = angular.element('.view-pane', $element);

                $element.append(splitter);

                splitter.bind('mousedown', function () {
                    $element.bind('mousemove', splitterMove);
                    panes.addClass('no-select');
                });
                $element.bind('mouseup', function () {
                    $element.unbind('mousemove', splitterMove);
                    panes.removeClass('no-select');
                });
                angular.element(window).resize(function () {
                    splitter.css('left', '50%');
                    setPositions(splitter.offset().left);
                });

                setPositions(splitter.offset().left);

                /**
                 * Sets the position of view panes and splitter
                 * @param x
                 */
                function setPositions(x) {
                    var margin = splitter.outerWidth() + 5;

                    if (x > $scope.min_pane_width && x < $element.innerWidth() - $scope.min_pane_width) {
                        panes
                            .css({'position': 'absolute', 'width': x - margin, 'left': 0, 'height': '100%'})
                            .eq(1).css({'left': x + margin, 'width': $element.innerWidth() - x - margin});
                        splitter.css('left', x - splitter.outerWidth() / 2);
                    }
                }
                /**
                 * Moves a splitter
                 * @param event
                 */
                function splitterMove(event) {
                    var x = event.clientX;
                    setPositions(x);
                    event.preventDefault();
                }
            }
        };
    });
