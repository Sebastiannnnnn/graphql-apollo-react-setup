import ChatMessage from './mongoose/chatmessage'
import mongoose from 'mongoose';
import { host, login } from './constants';
import 'babel-core/register';
import 'babel-polyfill';

"use strict";

mongoose.connect(host, login)
.catch(function (err) {
    console.log("Exception in connecting", err);
});

var db = mongoose.connection;
db.on('error', ()=> {console.log( 'FAILED to connect to MongoDB')})
db.once('open', () => {console.log( 'Connected to MongoDB')})

let resultSet = null;
const resolvers = {
    Query: {
        allMessages: async () => {
            await ChatMessage.find()
                .then((res) => {
                    resultSet = res;
                }).catch((err) => {
                    resultSet = new Error('Error happened');
                });

            return resultSet;
        },
        messagesByUser: async (root, {user}) => {
            await ChatMessage.find({user: user})
                .then((res) => {
                    resultSet = res;
                }).catch((err) => {
                    resultSet = new Error('Error happened');
                });

            return resultSet;
        },
        messageById: async (root, {id}) => {
            await ChatMessage.find({id: id})
                .then((res) => {
                    resultSet = res[0];
                }).catch((err) => {
                    resultSet = new Error('Error happened');
                });

            return resultSet;
        },
        messagesLength: async () => {
            await ChatMessage.count({})
                .then((res) => {
                    resultSet = res
                }).catch((err) => {
                    resultSet = new Error('Error happened');
                });

            return resultSet;
        }
    },
    Mutation: {
        addMessage: async (root, {input}) => {
            let time = new Date().getTime();
            input.id = input.user + '-' + time;
            input.timestamp = time;

            var message = new ChatMessage(input);

            await message.save(message)
                .then((res) => {
                    resultSet = res;
                }).catch((err) => {
                    resultSet = new Error('Error happened');
                });

            return resultSet;
        },
        updateMessage: async (root, {input}) => {
            input.timestamp = new Date().getTime();
            let conditions = { id: input.id };
            let update = {$set: {message : input.message} }
            let options = { new: true };

            await ChatMessage.findOneAndUpdate(conditions, update, options)
                .then((res) => {
                    if (!res) {
                        resultSet = new Error('Entry does not exist');
                        return;
                    }
                    resultSet = res;
                }).catch((err) => {
                    resultSet = new Error('Error happened');
                });

            return resultSet;
        },
        deleteMessage: async (root, {id}) => {
            let conditions = {id: id};

            await ChatMessage.findOneAndRemove(conditions)
                .then((res) => {
                    if (!res) {
                        resultSet = new Error('Entry does not exist');
                        return;
                    }
                    resultSet = res;
                }).catch((err) => {
                    resultSet = new Error('Error happened');
                });

            return resultSet;
        }
    }
}

export default resolvers;
