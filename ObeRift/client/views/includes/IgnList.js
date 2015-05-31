Template.IgnList.helpers({
    IgnList: function() {
        return IgnList.find({obeUserName: Meteor.user().username});
    },
    level: function(inGameName) {
        
        var gameName =  inGameName.hash.IGN;
        console.log(gameName);
        return GameList.findOne({IGN: gameName}).level;
    }
});