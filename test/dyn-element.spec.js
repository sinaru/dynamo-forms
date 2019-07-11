import DynElement from '../src/dyn-element';

let numberValue;
let dynElement;

let createElement = () => {
  const elm = document.createElement('input');

  elm.dataset.dynField = '';
  elm.dataset.dynName = 'Number';
  elm.dataset.dynType = '';
  elm.dataset.dynTypeType = 'number';
  elm.value = numberValue;
  return elm;
};

let element = createElement();

let createDynElement = () => {
  element = createElement();
  dynElement = new DynElement(element);
};

describe('DynElement', () => {
  beforeEach(() => {

  });

  describe('#validate()', () => {
    beforeEach(() => {
      numberValue = '45';
      createDynElement();
    });

    it('should resolves', () => {
      return expect(dynElement.validate()).resolves.toEqual([{ state: true }]);
    });
  });

  describe('#errors()', () => {
    describe('when contains errors', () => {
      beforeEach(() => {
        numberValue = 'invalid!';
        createDynElement();
        dynElement.validate();
      });

      it('should return all the error messages', () => {
        expect(dynElement.errors()).toEqual(['Number should be a number']);
      });
    });

    describe('when no errors', () => {
      beforeEach(() => {
        numberValue = '45';
        createDynElement();
        dynElement.validate();
      });

      it('should return an empty array', () => {
        expect(dynElement.errors()).toEqual([]);
      });
    });
  });
});
