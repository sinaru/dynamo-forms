import Validator from './validator';

export default class TypeValidator extends Validator {
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
    if (typeof this.value === 'string') {
      // eslint-disable-next-line max-len
      let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return email.test(this.value);
    }
    return false;
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
