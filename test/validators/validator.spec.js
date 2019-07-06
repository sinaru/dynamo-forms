import Validator from '../../src/validators/validator';

let validator;

describe('Validator', () => {

  beforeEach(function () {
    validator = new Validator();
  });

  describe('#constructor()', function () {
    describe('when options are invalid', function () {
      beforeEach(() => {
        jest.spyOn(Validator.prototype, 'isValidOptions').mockReturnValue(false);
      });

      afterEach(() => {
        Validator.prototype.isValidOptions.mockRestore();
      })

      it('should raise an error', function () {
        expect(() => new Validator()).toThrow();
      });
    });
  });

  describe('#isValid()', function () {
    it('should return false if called without validate()', function () {
      expect(validator.isValid()).toEqual(false);
    });

    describe('when validation() is passing and validate() is called', function () {
      beforeEach(async () => {
        jest.spyOn(validator, 'validation').mockReturnValue(Promise.resolve({state: true}));
        await validator.validate();
      });

      it('should return true', function () {
        expect(validator.isValid()).toEqual(true);
      });
    });
  });

  describe('#validate()', function () {
    beforeEach(() => {
      jest.spyOn(validator, 'validation').mockReturnValue(Promise.resolve({state: true}));
    });

    it('should return the result of validation()', function () {
      return expect(validator.validate()).resolves.toStrictEqual({state: true});
    });
  });
});
