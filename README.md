# DynamoForms

[![Build Status](https://travis-ci.org/sinaru/DynamoForms.svg?branch=master)](https://travis-ci.org/sinaru/DynamoForms)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](code-of-conduct.md)

_Make your HTML forms super smart only with HTML._ 

DynamoForms is a JavaScript library that uses HTML syntax to provide dynamic and advance form validation for your 
web pages. 

## Installation

You can either use `dynamo-forms.js` or `dynamo-forms.min.js` found in 
[`dist`](https://github.com/sinaru/DynamoForms/tree/master/dist) folder. Then add `.dynamo-forms` css class to each  
`<form>` you want to validate. 

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
       <input 
         name="number" type="text"
         data-dyn-field
         data-dyn-name="Amount"
         data-dyn-type
         data-dyn-type-type="number"
       >
   </div>

   <button type="submit">Submit</button>
</form>
```
