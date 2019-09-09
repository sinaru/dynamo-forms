---
layout: default
---

DynamoForms is a JavaScript library that uses HTML syntax to provide dynamic and advance form validation for your 
web pages. 

## Installation

You can either use `dynamo-forms.js` or `dynamo-forms.min.js` found in 
['dist'](https://github.com/sinaru/DynamoForms) folder. Then add `.dynamo-forms` css class to each `<form>` you want 
to validate. 

In the form you should have an HTML element with `.dynamo-errors`. This is used as the parent element to render the 
form errors.

You should add `data-dyn-field` attribute to any input that should be validated. Then you can add the `data-dyn-...` 
attributes to use the validators and build your form validations.

That's the power of DynamoForms. All the form validation behavior is defined by using `data-dyn-...` data attributes.

When you submit the form, if there are any validation errors, they will be displayed otherwise the form will get submit.

Here is an example that uses Type validator for an input.

```html
<form class="dynamo-forms">
   <div class="dynamo-errors"></div>
   <div>
       <label>Amount</label>
       <input name="number" type="text"
              data-dyn-field
              data-dyn-name="Amount"
              data-dyn-type="number"
       >
   </div>

   <button type="submit">Submit</button>
</form>
```

## Validators

### Type

Type validator can be used to define a value type for a field.

Supported types are:

- Number
- Currency
- Email

**Number**: Number supports any positive or negative integer or a decimal value. The digit should range from 0-9.

**Currency:** Currency value should be prefixed with at least two and maximum of three characters. This is to
represent tell the currency type. After that, you can specify the amount separated by comma for each group of three
 digits. 
  
**Email:** This is to validate the input as an email address.
  
### Group
 
This validator is useful when you want to validate a collection of inputs as a single entity. 

For example, if you want to check if at least one value is present for land or mobile number, this validator can be
used.  

### Function

When you want ta custom validation, you can define a function that acts as a validator. Then use that function
 validator with the name of the function that you created. 
 
It is important that the defined function returns a promise. The function will be called with the value of the input
where the function validator is used. The function should resolve the promise with an object when the validation
should pass or fail.

For the pass case resolve the promise with `{state: true}`. For the fail case, resolve it with `{state: false}`.
