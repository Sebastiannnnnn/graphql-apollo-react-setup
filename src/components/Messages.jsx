import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { MyContext } from '../MyProvider';

//TODO set component to poll for updates

const GET_MESSAGES = gql`
  {
    //TODO query to get messages
  }
`;

function getTime(timestamp) {
    if (timestamp) {
        let date = new Date(timestamp);

        let str = [
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear()
        ].join('.') + ' ' + date.getHours() + ':' + date.getMinutes();

        return str;
    }
    return '';
}

export class Messages extends React.Component {
    render() {
        return (
            <Query
                query={GET_MESSAGES}
                
                >
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    return (
                        <ul>
                            {data.allMessages.map(message => (
                                <li className={'row'} key={message.id}>
                            <MyContext.Consumer>
                              {context => (
                                <React.Fragment>
                                  <div className={'message ' + ((message.user === context.state.username) ? 'own' : 'other')}>
                                    <div className={'user'}>
                                      <span className={'name'}>
                                        {message.user + ' (' + message.id + '):'}
                                      </span>
                                      <span className={'time'}>
                                        {getTime(message.timestamp)}
                                      </span>
                                    </div>
                                    <div className={'content'}>{message.message}</div>
                                  </div>
                                </React.Fragment>
                              )}
                            </MyContext.Consumer>
                                </li>
                            ))}
                            <li className={'clear'}></li>
                        </ul>
                    );
                }}
            </Query>
        );
    }
}
