import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const UPDATE_MESSAGE = gql`
  mutation updateMessage($input: MessageInput) {
    updateMessage(input: $input) {
      id
      user
      message
      timestamp
    }
  }
`;

export class UpdateMessage extends React.Component {
    render() {
        let msgid;
        let msg;

        return (
            <Mutation
                mutation={UPDATE_MESSAGE}>
                {updateMessage => (
                    <form className={'message-form'}
                        onSubmit={e => {
                            e.preventDefault();

                            if (msg.value) {
                                let variables = {
                                    input: {
                                        id: msgid.value,
                                        user: this.props.username,
                                        message: msg.value
                                    }
                                };
                                
                                updateMessage({ variables });
                                msgid.value = "";
                                msg.value = "";
                            } 
                        }}>
                        <input className={'update-id'}
                            ref={node => {
                                msgid = node;
                            }}
                        />
                        <input className={'update-input'}
                            ref={node => {
                                msg = node;
                            }}
                        />
                        <button className={'message-submit'} type="submit">Update message</button>
                    </form>
                )}
            </Mutation>
        )
    }
}
