import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import logo from './logo.svg';
import './App.css';

import MyProvider from './MyProvider';
import UsernameField from './components/UsernameField';
import { Messages } from './components/Messages';
import { AddMessage } from './components/AddMessage';
import { UpdateMessage } from './components/UpdateMessage';
import { DeleteMessage } from './components/DeleteMessage';

const messageClient = new ApolloClient({
    uri: `http://localhost:4000/graphql`
});

let username = 'Sebastian';

class App extends Component {
    state = { username: username };

    render() {
        return (
          <MyProvider>
              <div className="App">
                  <header className="App-header">
                      <img src={logo} className="App-logo" alt="logo" />
                      <h1 className="App-title">GraphQL / React / Apollo chat demo <span role="img" aria-label="rocket">🚀</span></h1>
                      <UsernameField />
                  </header>

                  <ApolloProvider client={messageClient} test={'foo'}>
                      <div>
                          <Messages />
                          <AddMessage />
                          <UpdateMessage />
                          <DeleteMessage />
                      </div>
                  </ApolloProvider>
              </div>
          </MyProvider>

        );
    }
}

export default App;
