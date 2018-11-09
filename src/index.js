import React from 'react';

/**
 * Checks if key code matches the current state
 * @param {string} code - the key code
 * @param {Array} currentCapture - the current keys in state
 * @returns {Boolean} - true if code matches the current capture, else otherwise
 */
export function doesKeyCodeMatchState(code, currentCapture) {
  return code === currentCapture.join('');
}

const withBetaComponent = options => ComposedComponent => (
  class extends React.Component {
    state = {
      isListening: false,
      isToggled: Boolean(options && options.forceEnable),
      currentCapture: [],
    };

    /**
     * Checks for a valid keycode on mount.
     * If a valid keycode exists, it will enable keydown listener.
     * Else, it will throw an error.
     * @returns {void} -
     */
    componentDidMount() {
      if (options && typeof options.keyCode !== 'string') {
        throw new Error('[react-beta-component]: options.keyCode must be a valid string');
      }

      document.addEventListener('keydown', this.handleKeyPress);
    }

    /**
     * Disables keydown event from window
     * @returns {void}
     */
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
          isListening: false,
        }));

        return clearTimeout(this.timeout);
      }

      if (currentCapture.length > options.keyCode.length) {
        return this.setState({
          isListening: false,
          currentCapture: [],
        });
      }

      return null;
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

      this.setState({
        currentCapture: [...currentCapture, key],
      }, this.maybeEnableBetaComponent);
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
