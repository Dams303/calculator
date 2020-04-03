const calculator = require('./calculator.js')


describe('add', function() {
    it('adds 0 and 0', function() {
		expect(calculator.add(0,0)).toEqual(0);
	});
    xit('substrats 0 and 0', function() {
		expect(calculator.subtract(0,0)).toEqual(0);
	});
});