import Validator from './validator';

export default class GroupValidator extends Validator {
  constructor(value, groupValues, options) {
    super({...options, value});

    this._groupValues = groupValues;
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

