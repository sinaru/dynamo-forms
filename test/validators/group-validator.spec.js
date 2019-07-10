import GroupValidator from '../../src/validators/group-validator';

let validator;
const inputElement = document.createElement('input');

inputElement.id = 'test-id';
document.body.append(inputElement);

describe('GroupValidator', () => {
  describe('when rule is "any-present"', () => {
    beforeEach(() => {
      validator = new GroupValidator({value: 'foo', selectors: '#test-id', rule: 'any-present'});
    });

    describe('and at least one field has a value', () => {
      it('should resolve', () => {
        return expect(validator.validate()).resolves.toEqual({state: true});
      });
    });
  });
});
