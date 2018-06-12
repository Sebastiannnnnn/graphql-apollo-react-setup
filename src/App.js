import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import logo from './logo.svg';
import './App.css';

import { Messages } from './components/Messages';
import { AddMessage } from './components/AddMessage';

//TODO: point messageClient (ApolloClient) to the GraphQL server endpoint
let messageClient;
let username = 'Sebastian';

class App extends Component {
  state = { username: username };
    render() {
        return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">GraphQL / React / Apollo chat demo <span role="img" aria-label="rocket">🚀</span></h1>
              </header>
              <ApolloProvider client={messageClient} test={'foo'}>
                <React.Fragment>
                  <Messages username={username}/>
                  <AddMessage username={username}/>
                </React.Fragment>
              </ApolloProvider>
          </div>
        );
    }
}

export default App;
