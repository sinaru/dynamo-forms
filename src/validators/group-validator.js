import Validator from './validator';

export default class GroupValidator extends Validator {
  constructor(value, options) {
    super({...options, value});

    this._groupValues = Array
      .from(document.body.querySelectorAll(options.selectors))
      .map(element => element.value)
      .filter(value => value !== '');

    this._groupValues = this._groupValues.concat(this.value);
  }

  validation() {
    return new Promise((resolve) => {
      if (this.rule === GroupValidator.RULES.ANY_PRESENT && this._anyPresent()) {
        resolve({state: true});
      } else {
        resolve({state: false, error: this.error});
      }
    });
  }

  errorMessage() {
    if (this.error) {
      return this.error;
    }

    if (this.rule === GroupValidator.RULES.ANY_PRESENT) {
      return 'At least one value for the group should be present';
    }

    return 'unknown error';
  }

  _anyPresent() {
    return this._groupValues.some((value) => { return value !== ''; });
  }
}

GroupValidator.RULES = {};
GroupValidator.RULES.ANY_PRESENT = 'any-present';

