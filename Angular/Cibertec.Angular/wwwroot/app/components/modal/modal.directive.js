(function () {
    'use strict';
    angular.module('app')
    .directive('modalPanel', modalPanel);
    
    function modalPanel() {
        return {
            templateUrl: 'app/components/modal/modal-directive.html',
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@',
                buttonTitle: '@',
                saveFunction: '=',
                closeFunction: '=',
                readOnly: '=',
                isDelete:'='
            },
            controller: directiveController            
        };        
    }

    directiveController.$inject = ['$scope'];

    function directiveController($scope) {
        init();

        function init() {
            $(function () {
                $('#modal-container').on('hidden.bs.modal', function () {
                    $scope.closeFunction();
                });
            })
        }
    }
})();