(function () {
    angular
        .module('app')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', '$state', 'localStorageService', 'configService', '$q'];

    function authenticationService($http, $state, localStorageService, configService,$q) {        
        var service = {};
        service.login = login;
        service.logout = logout;
        return service;

        function login(user) {

            var defer = $q.defer();
            var url = configService.getApiUrl() + 'api/Token';            
            $http.post(url,
                       user,
                       {
                           headers: {
                               'Content-Type': 'application/x-www-form-urlencoded'
                           }
                       })
            .then(function (result) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;
                localStorageService.set('userToken',
                    {
                        token: result.data.access_token,
                        userName: user.userName
                    });
                configService.setLogin(true);
                defer.resolve(true);
            },
            function (error) {
                defer.reject(false);
            });
            return defer.promise;
        }

        function logout() {
            $http.defaults.headers.common.Authorization = '';
            localStorageService.remove('userToken');
            configService.setLogin(false);            
        }

    }
})();