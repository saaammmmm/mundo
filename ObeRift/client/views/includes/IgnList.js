Template.IgnList.helpers({
    IgnList: function() {
        try {
            var ignUserName = IgnList.find({obeUserName: Meteor.user().username});
        }
        catch (err) {
            console.log("IGN UserName Invalid");
            ignUserName = null;
        }
        return ignUserName;
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