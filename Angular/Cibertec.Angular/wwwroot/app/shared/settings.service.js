(function () {
    'use strict';

    angular
        .module('app')
        .factory('configService', configService);

    configService.$inject = ['localStorageService'];

    function configService(localStorageService) {
        var service = {};
        var apiUrl = undefined;
        var isLogged = false;
        service.setLogin = setLogin;
        service.getLogin = getLogin;
        service.setApiUrl = setApiUrl;
        service.getApiUrl = getApiUrl;
        service.validate = validateLogin;

        return service;

        function setLogin(state) {
            isLogged = state;
        }

        function getLogin() {
            return isLogged;
        }

        function getApiUrl() {
            return apiUrl;
        }

        function setApiUrl(url) {
            apiUrl = url;
        }

        function validateLogin() {
            var user = localStorageService.get('userToken');
            if (user && user.token) {
                setLogin(true);
            }
            else {
                setLogin(false);
            }
            return isLogged; 
        }
    }
})();
