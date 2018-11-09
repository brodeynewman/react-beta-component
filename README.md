# react-beta-component

A simple higher order component that enables you to toggle the rendering of a wrapped component based on a custom konami-like code.

## Why?

Maybe you need a feature to be in production but behind some type of beta flag?

Or, you just think it's cool to have a feature only accessable by some type of key code.

## Installation

```bash
npm install --save react-beta-component
```

## Usage

```js
import React from 'react';
import withBetaComponent from 'react-beta-component';

const TestComponent = (props) => (
  <div>
    Test component!
  </div>
);

export default withBetaComponent({
  keyCode: '**foo**',
  keyCodeTimeout: 1000,
})(TestComponent);
```

Simply wrap your feature in the `withBetaComponent` HOC and supply the keyCode.

## Options

|  Prop  | Default |  required  | Description |
:--------|:--------:|:----------:|:------------
keyCode | | Yes | The key code to enable your component
keyCodeTimeout | 500 | No | If your code isn't typed within this amount of time (in ms), you will have to restart.
forceEnable | false  | No | If you want to always render this component. If keyCode is typed while this flag is passed, it will still toggle your component.
