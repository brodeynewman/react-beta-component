import React from 'react';

export function doesKeyCodeMatchState(code, currentCapture) {
  return code === currentCapture.join('');
}

const withBetaComponent = options => ComposedComponent => (
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isToggled: Boolean(options && options.forceEnable),
        currentCapture: [],
      };
    }

    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }

    maybeEnableBetaComponent = () => {
      const { currentCapture } = this.state;

      const keyCodeMatches = doesKeyCodeMatchState(options.keyCode, currentCapture);

      if (keyCodeMatches) {
        this.setState(({ isToggled }) => ({
          isToggled: !isToggled,
          currentCapture: [],
        }));
      }
    }

    handleKeyPress = ({ key }) => {
      const { currentCapture } = this.state;

      clearTimeout(this.timeout);

      this.setState({ currentCapture: [...currentCapture, key] }, this.maybeEnableBetaComponent);

      this.timeout = setTimeout(() => {
        this.setState({ currentCapture: [] });

        clearTimeout(this.timeout);
      }, options.keyCodeTimeout || 500);
    };

    render() {
      const { isToggled } = this.state;

      return (
        <React.Fragment>
          {isToggled && <ComposedComponent {...this.props} />}
        </React.Fragment>
      );
    }
  }
);

export default withBetaComponent;
