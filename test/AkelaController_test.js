var assert          = require('assert'),
    expect          = require('expect.js'),
    AkelaController = require('../app/controllers/AkelaController.js');

describe('Jasmine sanity check', function() {
    it('works', function() {  expect(true).to.be(true); });
});

describe('AkelaController', function() {
    var akela;

    beforeEach(function(){
        akela = new AkelaController();
    });

    describe('destroy', function() {
        it('should expose a function', function() {
            expect(akela.destroy.get).to.be.a('function');
        })
    })
});