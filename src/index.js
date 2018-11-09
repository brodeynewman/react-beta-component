import React from 'react';

export function doesKeyCodeMatchState(code, currentCapture) {
  return code === currentCapture.join('');
}

const withBetaComponent = options => ComposedComponent => (
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isListening: false,
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

    setTimeoutAndCapture = (key) => {
      const { currentCapture } = this.state;

      this.timeout = setTimeout(() => {
        this.setState({
          currentCapture: [],
          isListening: false,
        });

        clearTimeout(this.timeout);
      }, options.keyCodeTimeout || 500);

      this.setState({ currentCapture: [...currentCapture, key] }, this.maybeEnableBetaComponent);
    }

    enableListening = key => this.setState({
      isListening: true,
      currentCapture: [key],
    });

    handleKeyPress = ({ key }) => {
      const { currentCapture, isListening } = this.state;

      clearTimeout(this.timeout);

      if (key === options.keyCode[0] && !currentCapture.length) {
        this.enableListening(key);
      }

      if (isListening) {
        this.setTimeoutAndCapture(key);
      }
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
