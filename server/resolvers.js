import jsonfile from 'jsonfile';

let file = 'server/data/messages.json';

const resolvers = {
    Query: {
        allMessages: () => {
            return jsonfile.readFileSync(file);
        },
        messagesByUser: (root, {user}) => {
            return jsonfile.readFileSync(file).filter(message => {
                return message.user === user;
            });
        },
        messageById: (root, {id}) => {
            return jsonfile.readFileSync(file).filter(message => {
                return message.id === id;
            })[0];
        },
        messagesLength: () => {
            return jsonfile.readFileSync(file).length;
        }
    },
    Mutation: {
        addMessage: (root, {input}) => {
            let time = new Date().getTime();
            input.id = input.user + '-' + time;
            input.timestamp = new Date().getTime();

            let messages = jsonfile.readFileSync(file);
            messages.push(input);
            jsonfile.writeFileSync(file, messages);

            return input;
        },
        updateMessage: (root, {input}) => {
            input.timestamp = new Date().getTime();

            let messages = jsonfile.readFileSync(file);
            let item;

            for (var i = 0; i < messages.length; i++) {
                if (messages[i].id === input.id) {
                    messages[i] = Object.assign({}, messages[i], input);
                    break;
                }
            }

            jsonfile.writeFileSync(file, messages);

            return input;
        },
        deleteMessage: (root, {id}) => {
            let messages = jsonfile.readFileSync(file);
            let item;

            for (var i = 0; i < messages.length; i++) {
                if (messages[i].id === id) {
                    item = messages.splice(i, 1);
                    break;
                }
            }

            jsonfile.writeFileSync(file, messages);

            return item[0];
        }
    }
}

export default resolvers;
