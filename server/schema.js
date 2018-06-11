import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = [`
    input MessageInput {
        id: String
        user: String
        message: String
        timestamp: Float
    },
    type Message {
        id: String
        user: String
        message: String
        timestamp: Float
    },
    type Query {
        allMessages: [Message]
        messageById(id: String!): [Message]
        messagesByUser(user: String!): [Message]
        messagesLength: Int
    },
    type Mutation {
        addMessage(input: MessageInput): Message
        updateMessage(input: MessageInput): Message
        deleteMessage(id: String!): String
    }
`];


const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;
