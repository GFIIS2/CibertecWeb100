describe('dataService', function () {
    beforeEach(module('app'));

    it('should fetch a campaign by ID',
        inject(function (dataService, $httpBackend) {
            $httpBackend
                .expectGET('/test')
                .respond(200, 'Ok');

            dataService.getData('/test').then(function (response) {
                expect(response.data).toEqual('Ok');
            });
        }));
});