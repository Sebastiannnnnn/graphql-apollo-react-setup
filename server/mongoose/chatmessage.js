import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var chatMessageSchema = new Schema({
    id: String,
    user: String,
    message: String,
    timestamp: Number
});

var ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;
