Template.dashboard.events({
    "submit .form-inline": function(event){
        event.preventDefault();
        var obeUserName = Meteor.user().username;
        var game = event.target.gameTitle.value;
        var playerName = event.target.gameUserName.value;

       /* console.log("Inserting:\n" + obeUserName + "\n" + game + "\n" + playerName);*/
        IgnList.insert({
            obeUserName: obeUserName,
            name: playerName,
            game: game
        });
        event.target.gameTitle.value = "";
        event.target.gameUserName.value = "";
        Meteor.call('getLoLAccount', playerName);
    }
});

Template.dashboard.helpers({
    stats: function() {
        return GameList.find();
    }
});
