import {expect, sandbox} from './helper';

import DynForm from '../src/dyn-form';

let formAmountValue = 56.6;
const firstName = 'Martin';

let createForm = () => {
  const frm = document.createElement('form');

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
                   value="${ firstName }"
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

describe('DynForm', function () {
  beforeEach(function () {
    this.form = createForm();
  });

  describe('form submission', function () {
    beforeEach(function () {
      this.onSubmitStub = sandbox.stub(DynForm.prototype, 'onSubmit');
      this.dynForm = new DynForm(this.form);
      this.form.dispatchEvent(new Event('submit'));
    });

    it('should call #onSubmit', function () {
      expect(this.onSubmitStub.called).to.equal(true);
    });
  });

  describe('#onSubmit()', function () {
    beforeEach(function () {
      this.submitEvent = new Event('submit');
      this.formSubmitStub = sandbox.stub(this.form, 'submit');
      this.dynForm = new DynForm(this.form);
    });

    describe('when form is valid', function () {
      beforeEach(function (done) {
        this.dynForm.onSubmit(this.submitEvent).then(done);
      });

      it('should submit the form', function () {
        expect(this.formSubmitStub.called).to.equal(true);
      });
    });

    describe('when the form is invalid', function () {
      beforeEach(function (done) {
        formAmountValue = 'invalid amount';
        this.form = createForm();
        this.dynForm = new DynForm(this.form);
        this.formSubmitStub.resetHistory();
        this.dynForm.onSubmit(this.submitEvent).then(done);
      });

      it('should not submit the form', function () {
        expect(this.formSubmitStub.called).to.equal(false);
      });

      it('should render the errors', function () {
        expect(this.form.querySelector('.dynamo-errors').innerHTML).to.include('Amount should be a number');
      });
    });
  });

  describe('#grouValues()', function () {
    beforeEach(function () {
      this.dynForm = new DynForm(this.form);
    });

    it('should return all the values for the given group', function () {
      expect(this.dynForm.groupValues('personal_name')).to.eql(['Martin']);
    });
  });
});
