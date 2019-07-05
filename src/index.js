import DynForm from 'dyn-form';

window.onload = function () {
  const forms = document.querySelectorAll('.dynamo-forms');

  forms.forEach((form) => new DynForm(form));
};

export { DynForm };
