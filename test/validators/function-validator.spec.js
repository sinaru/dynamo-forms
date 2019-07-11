import FunctionValidator from '../../src/validators/function-validator'

let validator;

const customValidator = function (value) {
  return new Promise((resolve) => {
    if (value === true) {
      resolve({state: true});
    } else {
      resolve({state: false});
    }
  });

};

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

describe('FunctionValidator', () => {
  describe('when custom validator resolves to {state: true}"', () => {
    beforeEach(() => {
      validator = new FunctionValidator({value: true, handler: customValidator});
    });

    behavesLikeAValidValidator();
  });

  describe('when custom validator resolves to {state: false}', () => {
    beforeEach(() => {
      validator = new FunctionValidator({value: false, handler: customValidator});
    });

    doesNotBehavesLikeAValidValidator();
  });
});
