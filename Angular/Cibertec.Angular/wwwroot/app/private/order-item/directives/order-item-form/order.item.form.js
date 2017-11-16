(function () {
    'use strict';
    angular.module('app')
        .directive('orderItemForm', orderItemForm);
    function orderItemForm() {
        return {
            restrict: 'E',
            scope: {
                orderItem: '='
            },
            templateUrl: 'app/private/order-item/directives/order-item-form/order-item-form.html'
        };
    }
})();