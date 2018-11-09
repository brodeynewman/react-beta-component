import React from 'react';

const withBetaComponent = options => ComposedComponent => (
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isToggled: Boolean(options && options.forceEnable),
      };
    }

    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = ({ key }) => {
      console.log('keypress', key);
    };

    render() {
      const { isToggled } = this.state;

      return (
        <React.Fragment onKeyPress={this.handleKeyPress}>
          {isToggled && <ComposedComponent {...this.props} />}
        </React.Fragment>
      );
    }
  }
);

export default withBetaComponent;
