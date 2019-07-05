import {expect, noop} from '../helper';

import TypeValidator from '../../src/validators/type-validator';

let validator;

let behavesLikeAValidValidator = () => {
  describe('behaves like valid', function () {
    beforeEach((done) => {
      validator.validate()
        .finally(() => done());
    });

    it('should be a valid', function () {
      expect(validator.isValid()).to.equal(true);
    });
  });
};

let doesNotBehavesLikeAValidValidator = () => {
  describe('does not behaves like valid', function () {
    beforeEach((done) => {
      validator
        .validate()
        .catch(noop)
        .finally(() => done());
    });

    it('should not be a valid', function () {
      expect(validator.isValid()).to.equal(false);
    });
  });
};

describe('TypeValidator', function () {
  describe('#constructor()', function () {
    describe('when type is invalid', function () {
      it('should throw an error', function () {
        expect(() => new TypeValidator({type: 'foobar'})).to.throw();
      });
    });
  });

  describe('when type is number', function () {
    describe('for valid values', function () {
      ['-23.0', '34', '4545.676', '-121.2233'].forEach((value) => {
        describe(`and value is ${value}`, function () {
          beforeEach(function () {
            validator = new TypeValidator('number', value);
          });

          behavesLikeAValidValidator();
        });
      });
    });

    describe('for invalid values', function () {
      ['foo', '12x23', '65,44', '009900.', '.89'].forEach((value) => {
        describe(`and value is ${value}`, function () {
          beforeEach(function () {
            validator = new TypeValidator('number', 'not a number!');
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
            validator = new TypeValidator('currency', value);
          });

          behavesLikeAValidValidator();
        });
      });
    });
  });
});
