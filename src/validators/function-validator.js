import Validator from './validator';

export default class FunctionValidator extends Validator {
  constructor(handler, value, options = {}) {
    super({value, ...options});
    // eslint-disable-next-line no-eval
    this.func = eval(handler);
  }

  validation() {
    return this.func(this.value);
  }
}
