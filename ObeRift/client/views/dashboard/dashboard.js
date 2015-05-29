Template.dashboard.events({
    "submit .form-inline": function(event){
        event.preventDefault();
        var obeUserName = Meteor.user().username;
        var game = event.target.gameTitle.value;
        var playerName = event.target.gameUserName.value;

        console.log("Inserting:\n" + obeUserName + "\n" + game + "\n" + playerName);
        IgnList.insert({
            obeUserName: obeUserName,
            name: playerName,
            game: game
        });
        event.target.gameTitle.value = "";
        event.target.gameUserName.value = "";
        console.log("Added game");
    }
});

Template.dashboard.helpers({
    stats: function() {
        return GameList.find();
    }
});

Template.dashboard.created = function(){
    var League = IgnList.find({game: 'League of Legends'});
    League.forEach(function(user){
        Meteor.call('getLoLAccount', user.name, function(err, respJson) {
            if(err) {
                window.alert("Error: " + err.reason);
                console.log("error occured on receiving data on server. ", err );
            } else {
                var username = user.name.toLowerCase();
                console.log("respJson: ", respJson);
                //window.alert(respJson.length + ' tweets received.');

                console.log("GameList:" + GameList);
            }
        });
    });
};