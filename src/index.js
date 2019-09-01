/**
 * The `react-beta-component` file.
 * Enables a beta component given a particular keyCode
 *
 * @file react-beta-component
 * @since 11-08-2018
 * @author Brodey Newman
 */

import React from 'react';

/**
 * Key codes to ignore
 */
const KEY_CODE_IGNORE = {
  16: true,
};

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
    /**
     * Forwarding initial props
     * @returns {Object} - initialProps
     */
    static getIntialProps = (...args) => (
      ComposedComponent.getInitialProps
        ? ComposedComponent.getInitialProps(...args)
        : {}
    );

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

      if (options && options.keyCode) {
        document.addEventListener('keydown', this.handleKeyPress);
      }
    }

    /**
     * Disables keydown event from window
     * @returns {void}
     */
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }

    /**
     * Checks if the user input matches the keyCode.
     * If true, it will enable the `Beta Component`.
     *
     * If the current user input is longer than the key code, just reset the state.
     * @returns {void|null} - void if key code matches or user typed incorrect pass,
     * null otherwise
     */
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

    /**
     * Starts the timeout and captures user key presses
     * @param {string} key - the current key pressed
     * @param {number} keyCode - the key code for the current key
     * @returns {void}
     */
    setTimeoutAndCapture = (key) => {
      const { currentCapture } = this.state;

      this.timeout = setTimeout(() => {
        this.setState({
          currentCapture: [],
          isListening: false,
        });

        clearTimeout(this.timeout);
      }, options.keyCodeTimeout || 500);

      return this.setState({
        currentCapture: [...currentCapture, key],
      }, this.maybeEnableBetaComponent);
    }

    /**
     * Enables `isListening` flag.
     * @param {string} key - the current key pressed (which is the first key in keyCode).
     * @returns {void}
     */
    enableListening = key => this.setState({
      isListening: true,
      currentCapture: [key],
    });

    /**
     * Checks the first key that is pressed to see if it
     * matches the first character in the keyCode.
     * If this is true, we start listening for keyCode matches.
     * @param {string} key - the current key pressed
     * @returns {void}
     */
    handleKeyPress = ({ key, keyCode }) => {
      const { currentCapture, isListening } = this.state;

      clearTimeout(this.timeout);

      if (key === options.keyCode[0] && !currentCapture.length) {
        this.enableListening(key);
      }

      if (isListening && !KEY_CODE_IGNORE[keyCode]) {
        this.setTimeoutAndCapture(key);
      }
    };

    /**
     * Render
     * @returns {React.Component} - the component
     */
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
