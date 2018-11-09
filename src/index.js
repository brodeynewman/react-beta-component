import React from 'react';

const withBetaComponent = options => ComposedComponent => (
  class extends React.Component {
    state = { isToggled: true };

    render() {
      const { isToggled } = this.state;

      return isToggled ? <ComposedComponent {...this.props} /> : null;
    }
  }
);

export default withBetaComponent;
