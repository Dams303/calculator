require('./calculator.js')

describe('add', function() {
	it('basic add', function() {
		let c = createCalculator();
		c.addNumber(13); c.addOperator('add'); c.addNumber(34);
		expect(c.equal()).toEqual([ '47' ]);
	});
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
	it('test decimal zeros triming', function() {
		let c = createCalculator();
		c.addNumber(56); c.addOperator('mul'); c.addNumber(9.32);
		expect(c.equal()).toEqual([ '521.92' ]);
	});
});