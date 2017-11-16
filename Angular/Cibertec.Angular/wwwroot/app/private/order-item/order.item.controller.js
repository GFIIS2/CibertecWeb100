(function () {
    'use strict';
    angular.module('app')
        .controller('orderItemController', orderItemController);

    orderItemController.$inject = ['dataService', 'configService', '$state', '$scope'];
    function orderItemController(dataService, configService, $state, $scope) {
        var apiUrl = configService.getApiUrl();
        var vm = this;

        //Propiedades
        vm.orderItem = {};
        vm.orderItemList = [];
        vm.modalButtonTitle = '';
        vm.readOnly = false;
        vm.isDelete = false;
        vm.modalTitle = '';
        vm.showCreate = false;
        vm.totalRecords = 0;
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.itemsPerPage = 30;

        //Funciones
        vm.getOrderItem = getOrderItem;
        vm.create = create;
        vm.edit = edit;
        vm.delete = orderItemDelete;
        vm.pageChanged = pageChanged;
        vm.closeModal = closeModal;
        init();

        function init() {
            if (!configService.getLogin()) return $state.go('login');
            configurePagination()
        }

        function configurePagination() {
            //In case mobile just show 5 pages
            var widthScreen = (window.innerWidth > 0) ? window.innerWidth : screen.width;

            if (widthScreen < 420) vm.maxSize = 5;

            totalRecords();
        }

        function pageChanged() {
            getPageRecords(vm.currentPage);
        }

        function totalRecords() {
            dataService.getData(apiUrl + '/orderItem/count')
                .then(function (result) {
                    vm.totalRecords = result.data;
                    getPageRecords(vm.currentPage);
                }
                , function (error) {
                    console.log(error);
                });
        }

        function getPageRecords(page) {
            dataService.getData(apiUrl + '/orderItem/list/' + page + '/' + vm.itemsPerPage)
                .then(function (result) {
                    vm.orderItemList = result.data;
                },
                function (error) {
                    vm.orderItemList = [];
                    console.log(error);
                });
        }

        function getOrderItem(id) {
            vm.orderItem = null;
            dataService.getData(apiUrl + '/orderItem/' + id)
                .then(function (result) {
                    vm.orderItem = result.data;
                },
                function (error) {
                    vm.orderItem = null;
                    console.log(error);
                });
        }

        function updateOrderItem() {
            if (!vm.orderItem) return;
            dataService.putData(apiUrl + '/orderItem', vm.orderItem)
                .then(function (result) {
                    vm.orderItem = {};
                    getPageRecords(vm.currentPage);
                    closeModal();
                },
                function (error) {
                    vm.orderItem = {};
                    console.log(error);
                });
        }

        function createOrderItem() {
            if (!vm.orderItem) return;
            dataService.postData(apiUrl + '/orderItem', vm.orderItem)
                .then(function (result) {
                    getOrderItem(result.data);
                    detail();
                    getPageRecords(1);
                    vm.currentPage = 1;
                    vm.showCreate = true;
                },
                function (error) {
                    console.log(error);
                    closeModal();
                });
        }

        function deleteOrderItem() {
            dataService.deleteData(apiUrl + '/orderItem/' + vm.orderItem.id)
                .then(function (result) {
                    getPageRecords(vm.currentPage);
                    closeModal();
                },
                function (error) {
                    console.log(error);
                });
        }

        function create() {
            vm.order = {};
            vm.modalTitle = 'Create Order-Item';
            vm.modalButtonTitle = 'Create';
            vm.readOnly = false;
            vm.modalFunction = createOrderItem;
            vm.isDelete = false;
        }

        function edit() {
            vm.showCreate = false;
            vm.modalTitle = 'Edit Order-Item';
            vm.modalButtonTitle = 'Update';
            vm.readOnly = false;
            vm.modalFunction = updateOrderItem;
            vm.isDelete = false;
        }

        function detail() {
            vm.modalTitle = 'The New Order-Item Created';
            vm.modalButtonTitle = '';
            vm.readOnly = true;
            vm.modalFunction = null;
            vm.isDelete = false;
        }

        function orderItemDelete() {
            vm.showCreate = false;
            vm.modalTitle = 'Delete Order-Item';
            vm.modalButtonTitle = 'Delete';
            vm.readOnly = false;
            vm.modalFunction = deleteOrderItem;
            vm.isDelete = true;
        }

        function closeModal() {
            angular.element('#modal-container').modal('hide');
        }
    }
})();