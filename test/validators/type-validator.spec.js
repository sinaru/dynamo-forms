import TypeValidator from '../../src/validators/type-validator';

let validator;

let behavesLikeAValidValidator = () => {
  describe('and after validate()', function () {
    beforeEach(() => {
      return validator.validate();
    });

    it('should be a valid', function () {
      expect(validator.isValid()).toEqual(true);
    });
  });
};

let doesNotBehavesLikeAValidValidator = () => {
  describe('and after validate()', function () {
    beforeEach(() => {
      return validator.validate();
    });

    it('should not be a valid', function () {
      expect(validator.isValid()).toEqual(false);
    });
  });
};

describe('TypeValidator', function () {
  describe('#constructor()', function () {
    describe('when type is invalid', function () {
      it('should throw an error', function () {
        expect(() => new TypeValidator({ type: 'foobar' })).toThrow();
      });
    });
  });

  describe('when type is number', function () {
    describe('for valid values', function () {
      ['-23.0', '34', '4545.676', '-121.2233'].forEach((value) => {
        describe(`and value is ${value}`, function () {
          beforeEach(function () {
            validator = new TypeValidator({ type: 'number', value: value });
          });

          behavesLikeAValidValidator();
        });
      });
    });

    describe('for invalid values', function () {
      ['foo', '12x23', '65,44', '009900.', '.89'].forEach((value) => {
        describe(`and value is ${value}`, function () {
          beforeEach(function () {
            validator = new TypeValidator({ type: 'number', value: 'not a number!' });
          });

          doesNotBehavesLikeAValidValidator();
        });
      });
    });
  });

  describe('when type is currency', function () {
    describe('for valid values', function () {
      ['Rs 23.00', '34,000.00', 'USD 5,000.00'].forEach((value) => {
        describe(`where value is ${value}`, function () {
          beforeEach(function () {
            validator = new TypeValidator({ type: 'currency', value: value });
          });

          behavesLikeAValidValidator();
        });
      });
    });
  });
});
