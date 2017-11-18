(function () {
    'use strict';

    angular.module('app').factory('appInterceptor', appInterceptor);

    appInterceptor.$inject = ['$q', '$state', 'configService', 'localStorageService'];

    function appInterceptor($q, $state, configService, localStorageService) {
        var requestInterceptor = {
            request: function (config) {
                var user = localStorageService.get('userToken');
                if (user && user.token) {
                    config.headers.Authorization = 'Bearer ' + user.token;
                    configService.setLogin(true);
                }
                return config;
            },
            responseError: function (response) {
                if (response.status == 401) {
                    return $state.go('login');
                }
                return $q.reject(response);
            }
        };
        return requestInterceptor;
    }

})();