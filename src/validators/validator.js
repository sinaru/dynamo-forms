import '@babel/polyfill';

export default class Validator {

  constructor(options = {}) {
    let obj = {};

    Object.keys(options).forEach((key) => { obj[key] = { value: options[key] };});
    Object.defineProperties(this, obj);

    if (!this.isValidOptions(options)) {
      throw new Error('Invalid options');
    }

    this._valid = false;
  }

  isValid() {
    return this._valid;
  }

  async validate() {
    try {
      const result = await this.validation();

      this._valid = result.state;
      return result;
    } catch (e) {
      this._valid = false;
    }
    return Promise.reject(false);
  }

  validation() {
    return Promise.resolve({state: true});
  }

  isValidOptions(options) {
    return true;
  }

  errorMessage() {
    return this.error;
  }
}
