(function () {
    'use strict';
    
    angular.module('app')
    .config(routeConfig);

    routeConfig.$inject = ['$stateProvider','$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: 'app/home.html'
            })            
            .state("login", {
                url: "/login",
                templateUrl: 'app/public/login/index.html'
            })            
            .state("product", {
                url: "/product",
                templateUrl: 'app/private/product/index.html'
            })
            .state("customer_orders", {
                url: "/customer/{customerid}",
                templateUrl: 'app/private/customer/order/customer-order.html'
            })
            .state("customer", {
                url: "/customer",
                templateUrl: 'app/private/customer/index.html'
            })
            .state("supplier", {
                url: "/supplier",
                templateUrl: 'app/private/supplier/index.html'
            })
            .state("user", {
                url: "/user",
                templateUrl: 'app/private/user/index.html'
            })
            .state("order", {
                url: "/order",
                templateUrl: 'app/private/order/index.html'
            })
            .state("orderItem", {
                url: "/orderItem",
                templateUrl: 'app/private/order-item/index.html'
            })
            .state("otherwise", {
                url: '/',
                templateUrl: 'app/home.html'
            });    
    }

})();