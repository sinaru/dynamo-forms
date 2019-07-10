import DynForm from '../src/dyn-form';

let form;
let dynForm;
let formAmountValue = 56.6;
const formFirstName = 'Martin';
const submitEvent = new Event('submit');
let createForm = () => {
  const frm = document.createElement('form');

  jest.spyOn(frm, 'submit').mockImplementation();
  frm.classList.add('dynamo-forms');
  frm.innerHTML = `
      <div class="dynamo-errors"></div>
        <div>
            <label>Amount</label>
            <input name="number" type="text"
                   data-dyn-field
                   data-dyn-name="Amount"
                   data-dyn-type="number"
                   value="${ formAmountValue }"
            >
            
            <label for="first-name">First Name</label>
            <input id="first-name" name="first-name" type="text"
                   data-dyn-field
                   data-dyn-name="First Name"
                   data-dyn-group="personal_name"
                   data-dyn-group-rule="any-present"
                   value="${ formFirstName }"
            >

            <label for="last-name">Last Name</label>
            <input id="last-name" name="last-name" type="text"
                   data-dyn-name="Last Name"
                   data-dyn-group="personal_name"
            >
        </div>

        <button type="submit">Submit</button>
    `;

  return frm;
};

describe('DynForm', () => {
  beforeEach(() => {
    form = createForm();
  });

  describe('form submission', () => {
    beforeEach(() => {
      jest.spyOn(DynForm.prototype, 'onSubmit');
      dynForm = new DynForm(form);
      form.dispatchEvent(new Event('submit'));
    });

    it('should call #onSubmit', () => {
      expect(dynForm.onSubmit).toHaveBeenCalled();
    });
  });

  describe('#onSubmit()', () => {
    beforeEach(() => {
      dynForm = new DynForm(form);
    });

    describe('when form is valid', () => {
      beforeEach(() => dynForm.onSubmit(submitEvent));

      it('should submit the form', () => {
        expect(form.submit).toHaveBeenCalled();
      });
    });

    describe('when the form is invalid', () => {
      beforeEach(() => {
        formAmountValue = 'invalid amount';
        form = createForm();
        dynForm = new DynForm(form);
        return dynForm.onSubmit(submitEvent);
      });

      it('should not submit the form', () => {
        expect(form.submit).not.toHaveBeenCalled();
      });

      it('should render the errors', () => {
        expect(form.querySelector('.dynamo-errors').innerHTML).toContain('Amount should be a number');
      });
    });
  });
});
