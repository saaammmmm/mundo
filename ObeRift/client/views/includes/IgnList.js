Template.IgnList.helpers({
    IgnList: function() {
        return IgnList.find({obeUserName: Meteor.user().username});
    },
    level: function(inGameName) {
        try {
            var gameName =  inGameName.hash.IGN;
            var gameLevel = GameList.findOne({IGN: gameName}).level;

            console.log(gameName + " (" + gameLevel + ")");

            return gameLevel;
        } 
        catch (err) {
            return "-";
        }
    }
});