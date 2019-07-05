import {sandbox, expect} from '../helper';
import Validator from '../../src/validators/validator';

let validator;

describe('Validator', () => {

  beforeEach(function () {
    validator = new Validator();
  });

  describe('#constructor()', function () {
    describe('when options are invalid', function () {
      beforeEach(function () {
        sandbox.stub(Validator.prototype, 'isValidOptions').returns(false);
      });

      it('should raise an error', function () {
        expect(() => new Validator()).to.throw();
      });
    });
  });

  describe('#isValid()', function () {
    it('should return false if called without validate()', function () {
      expect(validator.isValid()).to.equal(false)
    });

    describe('when validation() is passing and validate() is called', function () {
      beforeEach(function (done) {
        sandbox.spy(validator, 'validation').returnValue = Promise.resolve(true);
        validator.validate().then( () => done() );
      });

      it('should return true', function () {
        expect(validator.isValid()).to.equal(true);
      });
    });
  });

  describe('#validate()', function () {
    it('should return a promise', function () {
      expect(validator.validate()).to.be.a('promise');
    });
  });
});
