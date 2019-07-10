import TypeValidator from './validators/type-validator';
import GroupValidator from './validators/group-validator';
import FunctionValidator from './validators/function-validator';

const DynElement = class DynElement {
  constructor(element) {
    this.validations = [];
    this.element = element;
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

    if (data['dynType'] !== undefined) {
      const Klass = DynElement._classRef('dynType');

      this.validations.push(new Klass({
        value: this.element.value,
        ...this._ruleOptions('dynType')
      }));

    }
    if (data['dynGroup'] !== undefined) {
      const Klass = DynElement._classRef('dynGroup');

      this.validations.push(new Klass({
        value: this.element.value,
        ...this._ruleOptions('dynGroup')
      }));
    }
    if (data['dynFunction'] !== undefined) {
      const Klass = DynElement._classRef('dynFunction');

      this.validations.push(new Klass({
        value: this.element.value,
        ...this._ruleOptions('dynFunction')
      }));
    }

    return this.validations;
  }

  _ruleOptions(rule) {

    const dataSet = this.element.dataset;
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

  static _classRefMap = {
    'dynType': TypeValidator,
    'dynGroup': GroupValidator,
    'dynFunction': FunctionValidator
  };

  static _classRef(rule) {
    return DynElement._classRefMap[rule];
  }
};

export default DynElement;
