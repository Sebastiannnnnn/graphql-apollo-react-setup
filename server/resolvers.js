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

const resolvers = {
    Query: {
        allMessages: () => {
            return ChatMessage.find()
            .then((res) => {
                return res;
            })
        },
        messagesByUser: (root, {user}) => {
            return ChatMessage.find({user: user})
            .then((res) => {
                return res;
            })
        },
        messageById: (root, {id}) => {
            return ChatMessage.find({id: id})
            .then((res) => {
                return res;
            })
        },
        messagesLength: () => {
            return ChatMessage.count({})
            .then((res) => {
                return res
            });
        }
    },
    Mutation: {
        addMessage: async (root, {input}) => {
            let time = new Date().getTime();
            input.id = input.user + '-' + time;
            input.timestamp = time;

            var message = new ChatMessage(input);

            let resultSet = null;
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
            let options = { upsert: true, new: true };

            let resultSet;
            await ChatMessage.findOneAndUpdate(conditions, update, options)
                .then((res) => {
                    resultSet = res;
                }).catch((err) => {
                    resultSet = new Error('Error happened');
                });

            return resultSet;
        },
        deleteMessage: async (root, {id}) => {
            let conditions = {id: id};
            let resultSet;
            await ChatMessage.findOneAndRemove(conditions)
                .then((res) => {
                    resultSet = res;
                }).catch((err) => {
                    resultSet = new Error('Error happened');
                });

            return resultSet;
        }
    }
}

export default resolvers;
