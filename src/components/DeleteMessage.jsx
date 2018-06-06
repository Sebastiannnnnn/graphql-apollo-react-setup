import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const DELETE_MESSAGE = gql`
  mutation deleteMessage($id: String!) {
    deleteMessage(id: $id)
  }
`;

export class DeleteMessage extends React.Component {
    render() {
        let input;

        return (
            <Mutation
                mutation={DELETE_MESSAGE}>
                {deleteMessage => (
                    <form className={'message-form'}
                        onSubmit={e => {
                            e.preventDefault();

                            if (input.value) {
                                deleteMessage( {variables: {id : input.value}} );
                                input.value = "";
                            }
                        }}>
                        <input className={'message-input'}
                            ref={node => {
                                input = node;
                            }}
                        />
                        <button className={'message-submit'} type="submit">Delete message</button>
                    </form>
                )}
            </Mutation>
        )
    }
}
