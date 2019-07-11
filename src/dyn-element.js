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
    const rules = this._rules();

    rules.forEach((rule) => {
      const Klass = DynElement._classRef(rule);

      this.validations.push(new Klass({
        name: this.element.dataset.dynName,
        value: this.element.value,
        ...this._ruleOptions(rule)
      }));
    });

    return this.validations;
  }

  _rules() {
    const dataSet = this.element.dataset;

    return Object
      .entries(dataSet)
      .filter((entry) => {
        return !(['dynField', 'dynName'].includes(entry[0])) &&
        entry[1] === '';
      })
      .map(item => item[0]);
  }

  _ruleOptions(rule) {

    const dataSet = this.element.dataset;
    let options = {};

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
