chatCollection = new Mongo.Collection(null);
chatStream = new Meteor.Stream('chat-stream');

chatStream.permissions.read(function(eventName) {
    return eventName == 'chat';
});

chatStream.permissions.write(function(eventName) {
    return eventName == 'chat';
});