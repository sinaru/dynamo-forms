import DynElement from './dyn-element';

export default class DynForm {
  constructor(element) {
    this._form = element;
    this._dynElements = [];
    this._form
      .querySelectorAll('*[data-dyn-field]')
      .forEach((field) => {
        this._dynElements.push(new DynElement(field));
      });

    this._handleFormSubmit();
  }

  onSubmit(event) {
    event.preventDefault();
    const elements = this._dynElements;

    return Promise.all(elements.map((element) => element.validate()))
      .then((values) => {
        const hasAnyFailure = values.flat().some((result) => {
          return result.state === false;
        });

        if (!hasAnyFailure) {
          this._form.submit();
        } else {
          this._renderErrors();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _handleFormSubmit() {
    this._form.addEventListener('submit', this.onSubmit.bind(this));
  }

  _renderErrors() {
    const errors = this._dynElements.flatMap((element) => {
      return element.errors();
    });

    const parentElement = this._form.querySelector('.dynamo-errors');

    parentElement.innerHTML = '';
    errors.forEach(error => {
      parentElement.insertAdjacentHTML('beforeend', `<div class='form-error'>${error}</div>`);
    });
  }
}
