chatCollection = new Mongo.Collection(null);
chatStream = new Meteor.Stream('chat-stream');

chatStream.on('chat', function(message) {
    chatCollection.insert({
        userId: this.userId, //this is the userId of the sender
        subscriptionId: this.subscriptionId, //this is the subscriptionId of the sender
        message: message
    });
});

Template.chatBox.helpers({
    "message": function() {
        console.log("Content of Chat Collection:" + chatCollection.find())
        return chatCollection.find();
    }
});

Template.chatMessage.helpers({
    "user": function() {
        if(this.userId == 'me') {
            return "me";
        } else if(this.userId) {
            var username = Session.get('user-' + this.userId);
            if(username) {
                return username;
            } else {
                getUsername(this.userId);
            }
        } else {
            return this.subscriptionId;
        }
    }
});

// when `Send Chat` clicked, add the typed chat message into the collection
Template.chatBox.events({
    "click #send": function() {
        var message = $('#chat-message').val();
        console.log(message);
        chatCollection.insert({
            userId: 'me',
            message: message
        });
        chatStream.emit('chat', message);
        $('#chat-message').val('');
    },
    "keypress #chat-message": function(evt, template){
        if(evt.which === 13) {
            $("#send").click();
        }
    }
});


function getUsername(id) {
    Meteor.subscribe('user-info', id);
    Deps.autorun(function() {
        var user = Meteor.users.findOne(id);
        if(user) {
            Session.set('user-' + id, user.username);
        }
    });
}

