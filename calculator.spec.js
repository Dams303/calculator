const calculator = require('./calculator.js')


describe('add', function() {
    it('incomplete add', function() {
		let c = createCalculator(); c.addNumber(1); c.addOperator('add'); 
		expect(c.equal()).toEqual('1+add');
	});
    xit('substrats 0 and 0', function() {
		expect(calculator.subtract(0,0)).toEqual(0);
	});
});