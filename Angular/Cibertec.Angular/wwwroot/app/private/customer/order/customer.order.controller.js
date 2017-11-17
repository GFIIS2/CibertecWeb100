(function () {
    'use strict';
    angular.module('app')
        .controller('customerOrderController', customerOrderController);

    customerOrderController.$inject = ['$stateParams', '$state', 'dataService','configService'];

    function customerOrderController($stateParams, $state, dataService, configService) {

        //validation
        if ($stateParams.customerid === undefined || $stateParams.customerid === "" || $stateParams.customerid <= 0) {
            return $state.go("customer");
        }

        var vm = this;

        //properties
        vm.customerId = $stateParams.customerid;
        vm.customer = null;
        vm.orderList = [];

        init();

        function init() {
            getCustomer(vm.customerId);
        }

        function getCustomer(id) {
            vm.customer = null;
            dataService.getData(configService.getApiUrl() + '/customer/' + id)
                .then(function (result) {
                    vm.customer = result.data;
                    getOrderByCustomer(id);
                },
                function (error) {
                    vm.customer = null;                    
                    vm.orderList = [];
                    console.log(error);
                });
        }

        function getOrderByCustomer(id) {
            dataService.getData(configService.getApiUrl() + '/order/bycustomer/' + id)
                .then(function (result) {
                    vm.orderList = result.data;
                },
                function (error) {
                    vm.orderList = [];
                    console.log(error);
                });
        }
    }

})();