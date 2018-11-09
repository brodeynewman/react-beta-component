/* eslint-disable import/no-extraneous-dependencies, no-console */

const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

global.jest = require('jest');

enzyme.configure({ adapter: new Adapter() });
