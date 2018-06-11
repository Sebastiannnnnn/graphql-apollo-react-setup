import jsonfile from 'jsonfile';
import ChatMessage from './mongoose/chatmessage'
import mongoose from 'mongoose';
import { host, login } from './constants';

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
            return ChatMessage.find();
        },
        messagesByUser: (root, {user}) => {
            return ChatMessage.find({user: user});
        },
        messageById: (root, {id}) => {
            return ChatMessage.find({id: id});
        },
        messagesLength: () => {
            return ChatMessage.count({}, function(err, results) {
                return results;
            });
        }
    },
    Mutation: {
        addMessage: (root, {input}) => {
            let time = new Date().getTime();
            input.id = input.user + '-' + time;
            input.timestamp = new Date().getTime();

            var message = new ChatMessage(input);

            message.save(function (err, message) {
                if (err) console.error(err);
            });

            return input;
        },
        updateMessage: (root, {input}) => {
            input.timestamp = new Date().getTime();

            ChatMessage.findOneAndUpdate({ id: input.id, user: input.user }, {$set: {message : input.message, timestamp : input.timestamp} }, function(err, doc){
                if(err) console.log(err);
            });

            return input;
        },
        deleteMessage: (root, {id}) => {
            ChatMessage.findOneAndRemove({ id: id}, function(err, message){
                if(err) console.log(err);

                return message;
            });

            return id;
        }
    }
}

export default resolvers;
