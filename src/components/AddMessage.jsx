import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { MyContext } from '../MyProvider';

const ADD_MESSAGE = gql`
  mutation addMessage($input: MessageInput) {
    //TODO mutation to add a message
  }
`;

export class AddMessage extends React.Component {
    render() {
        let input;

        return (
            <Mutation
                mutation={ADD_MESSAGE}>
                {addMessage => (
                  <MyContext.Consumer>
                      {context => (
                        <form className={'message-form'}
                          onSubmit={e => {
                            e.preventDefault();
                            if (input.value) {
                              let variables = {
                                input: {
                                  id: new Date().getUTCMilliseconds(),
                                  user: context.state.username,
                                  message: input.value
                                }
                              };
                              addMessage({ variables });
                              input.value = "";
                            }
                          }}>
                          <input className={'message-input'}
                            ref={node => {
                              input = node;
                            }}
                          />
                          <button className={'message-submit'} type="submit">Add message</button>
                        </form>
                      )}
                </MyContext.Consumer>
                )}
            </Mutation>
        )
    }
}
