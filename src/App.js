import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import logo from './logo.svg';
import './App.css';

import MyProvider, {MyContext} from './MyProvider';
import UsernameField from './components/UsernameField';
import { Messages } from './components/Messages';
import { AddMessage } from './components/AddMessage';
import { UpdateMessage } from './components/UpdateMessage';
import { DeleteMessage } from './components/DeleteMessage';

const messageClient = new ApolloClient({
    uri: `http://localhost:4000/graphql`
});

class App extends Component {
    render() {
        return (
          <MyProvider>
              <div className="App">
                  <header className="App-header">
                      <img src={logo} className="App-logo" alt="logo" />
                      <h1 className="App-title">GraphQL / React / Apollo chat demo <span role="img" aria-label="rocket">🚀</span></h1>
                      <UsernameField />
                  </header>
              <MyContext.Consumer>
                {context => (
                  context.state.usernameSet &&
                  <ApolloProvider client={messageClient} test={'foo'}>
                    <React.Fragment>
                      <div>Your username: {context.state.username}</div>
                      <Messages />
                      <AddMessage />
                      <UpdateMessage />
                      <DeleteMessage />
                    </React.Fragment>
                  </ApolloProvider>
                )
              }
              </MyContext.Consumer>
              </div>
          </MyProvider>

        );
    }
}

export default App;
