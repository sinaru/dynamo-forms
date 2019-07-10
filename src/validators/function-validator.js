import Validator from './validator';

export default class FunctionValidator extends Validator {
  constructor(options) {
    super(options);
    // eslint-disable-next-line no-eval
    this.func = eval(this.handler);
  }

  validation() {
    return this.func(this.value);
  }
}
