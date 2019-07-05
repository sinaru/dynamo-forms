import chai from 'chai';
import sinon from 'sinon';

const expect = chai.expect;
const noop = function () {};

let sandbox;

beforeEach(function () {
  sandbox = sinon.createSandbox();
});

afterEach(function () {
  sandbox.restore();
});


export {sandbox, expect, noop}