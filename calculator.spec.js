const calculator = require('./calculator.js')


//////////////////////////////////////////////////////////
// Unit tests Calculator
/*
{
    let c = createCalculator();
    c.addNumber(2); c.addOperator('div'); c.addNumber(3); console.log('test max decimals: 2/3 = :' + c.equal());
}
{
    let c = createCalculator();
    c.addNumber(56); c.addOperator('mul'); c.addNumber(9.32); console.log('test: 56x9.32 = :' + c.equal());
}*/

describe('add', function() {
    it('incomplete add', function() {
		let c = createCalculator();
		c.addNumber(1); c.addOperator('add'); 
		expect(c.equal()).toEqual([ '1', 'add' ]);
	});
    it('test * priority over +', function() {
		let c = createCalculator();
		c.addNumber(4); c.addOperator('add'); c.addNumber(2); c.addOperator('mul'); c.addNumber(3);
		expect(c.equal()).toEqual([ '10' ]);
	});
	it('test max decimals precision', function() {
		let c = createCalculator();
		c.addNumber(2); c.addOperator('div'); c.addNumber(3); 
		expect(c.equal()).toEqual([ '0.666666667' ]);
	});
});