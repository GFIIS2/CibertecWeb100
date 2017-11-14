describe('dataService', function () {
    beforeEach(module('app'));

    it('should be OK',
        inject(function (dataService, $httpBackend) {
            $httpBackend
                .expectGET('/test')
                .respond(200, 'Ok');
            
            $httpBackend
                .expectGET('/error')
                .respond(400, 'Error');

            dataService.getData('/test').then(function (response) {
                expect(response.data).toEqual('Ok');
            });

            dataService.getData('/error').then(function (response) {
                expect(response.status).toEqual(400);
            });
        }));
});