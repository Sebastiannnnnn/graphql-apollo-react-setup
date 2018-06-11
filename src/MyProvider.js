import React, { Component } from 'react';
import PropTypes from 'prop-types';

// create context
export const MyContext = React.createContext();
// create Provider
class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameSet: false
    };
  }
  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        changeUsername: (event) => this.setState({
          username: event.target.value
        }),
        saveUsername: () => this.setState({
          usernameSet: true
        })
      }
      }>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

MyProvider.propTypes = {
  children: PropTypes.object,
};

MyProvider.defaultProps = {
  children: {}
};

export default MyProvider;
