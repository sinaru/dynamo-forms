import TypeValidator from './validators/type-validator';
import GroupValidator from './validators/group-validator';

const DynElement = class DynElement {
  constructor(element, parentForm) {
    this._parentForm = parentForm;
    this.validations = [];
    this.element = element;
    this.element.dynElement = this;
  }

  validate() {
    return Promise.all(this._validations().map((validation) => validation.validate()));
  }

  errors() {
    return this.validations.map((validation) => {
      if (!validation.isValid()) {
        return validation.errorMessage();
      }
      return null;
    })
      .filter(item => item !== null);
  }

  _validations() {
    this.validations = [];
    const data = this.element.dataset;

    if (data['dynType']) {
      this.validations.push(new TypeValidator(data['dynType'], this.element.value, this._ruleOptions('dynType', data)));
    }
    if (data['dynGroup']) {
      this.validations.push(new GroupValidator(
        this.element.value,
        this._parentForm.groupValues(data['dynGroup']),
        this._ruleOptions('dynGroup', data)));
    }

    return this.validations;
  }

  _ruleOptions(rule, dataSet) {

    let options = {};

    if (dataSet.dynName) {
      options['name'] = dataSet.dynName;
    }

    Object.entries(dataSet).forEach((entry) => {
      const match = RegExp(`^${rule}(?<option>.+)$`).exec(entry[0]);

      if (match) {
        options[match.groups.option.toLowerCase()] = entry[1];
      }
    });

    return options;
  }
};

export default DynElement;
