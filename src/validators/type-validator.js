import Validator from './validator';

export default class TypeValidator extends Validator {
  constructor(type, value, options = {}) {
    super({type, value, ...options});
  }

  isValidOptions(options) {
    const keys = Object.keys(options);

    if (!keys.includes('type')) {
      return false;
    }

    return this.constructor.TYPES.includes(options.type);
  }

  validation() {
    return new Promise((resolve, _) => {
      if (this.typeValidation()) {
        resolve({state: true});
      } else {
        resolve({state: false, error: this.errorMessage()});
      }
    });
  }

  typeValidation() {
    switch (this.type) {
      case TypeValidator.TYPE.NUMBER:
        return this.isNumber();
      case TypeValidator.TYPE.CURRENCY:
        return this.isCurrency();
      case TypeValidator.TYPE.EMAIL:
        return this.isEmail();
      default:
        throw new Error('Invalid type');
    }
  }

  isCurrency() {
    if (typeof this.value === 'string') {
      return /^(([a-zA-Z])*\s)?(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})$/.test(this.value);
    }
    return false;
  }

  isNumber() {
    if (typeof this.value === 'string') {
      return /^-?\d+(.\d+)?$/.test(this.value);
    }
    return false;
  }

  isEmail() {
    return true;
  }

  errorMessage() {
    return `${ this.name ? this.name + ' ' : '' }${ TypeValidator.TYPE_ERRORS[this.type] }`;
  }
}

TypeValidator.TYPE = {};

TypeValidator.TYPE.NUMBER = 'number';
TypeValidator.TYPE.CURRENCY = 'currency';
TypeValidator.TYPE.EMAIL = 'email';

TypeValidator.TYPE_ERRORS = {
  'number': 'should be a number',
  'email': 'should be an email address',
  'currency': 'should be a currency'
};

TypeValidator.TYPES = [
  TypeValidator.TYPE.NUMBER,
  TypeValidator.TYPE.CURRENCY,
  TypeValidator.TYPE.EMAIL
];
