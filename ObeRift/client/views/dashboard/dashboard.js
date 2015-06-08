// (c) 2015 Samuel Jacobs, Gorden Chen

// Using iron:router the Meteor.startup is already triggered because it loads the 
// template or the loading template and then inject the data. It must be delayed 
// to when iron:router knows it is rendered completely.


Template.dashboard.rendered = function() {
    console.log("Injecting typeahead");
      Meteor.typeahead.inject();
};

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
        // Populates the stats table
        stats: function() {
            return GameList.find();
        },
        // used to add new games to the stats field and in autocomplete searches
        supportedGames: function() {
            return SupportedGames.find().fetch().map(function(it){ return it.name; });
        }
    });

    Template.dashboard.rendered = function() {
        Meteor.typeahead();
    }
