import React from 'react';

import { MyContext } from '../MyProvider';

export default class UsernameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Sebastian'
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    return (<MyContext.Consumer>
      {context => (
        <input type='text' name='username'
          onChange={context.changeUsername} />
        )}
       </MyContext.Consumer>);
  }
}