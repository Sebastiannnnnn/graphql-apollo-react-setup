import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_MESSAGES = gql`
  {
    allMessages {
      id
      user
      message
      timestamp
    }
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
                pollInterval={500}
                >
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    return (
                        <ul>
                            {data.allMessages.map(message => (
                                <li className={'row'} key={message.id}>
                                <React.Fragment>
                                  <div className={'message ' + ((message.user === this.props.username) ? 'own' : 'other')}>
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
