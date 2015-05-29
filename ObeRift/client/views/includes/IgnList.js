Template.IgnList.helpers({
    IgnList: function() {
        return IgnList.find({obeUserName: Meteor.user().username});
    }
});