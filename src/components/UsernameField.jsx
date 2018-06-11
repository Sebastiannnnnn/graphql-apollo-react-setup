import React from 'react';

import { MyContext } from '../MyProvider';

export default class UsernameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
    <MyContext.Consumer>
      {context => (
        <React.Fragment>
          <label>Enter username</label>
          <input type='text' name='username' disabled={context.state.usernameSet}
            onChange={context.changeUsername} />
          <button name='button' onClick={context.saveUsername}>
            Save
          </button>
        </React.Fragment>
        )}
    </MyContext.Consumer>);
  }
}