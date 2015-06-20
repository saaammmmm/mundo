Template.teams.helpers({
    Teams: function() {
        return Teams.find();
    }
});

Template.teams.events({
    // PUT THIS ON THE SERVER SIDE!!!
    "click #createTeamButton": function(event){
        console.log("Creating new team")
        event.preventDefault();
        var obeUserName = Meteor.user().username;
        var name = $('#teamName').val();
        var game = $('#teamGame').val();
        var battleCry = $('#teamBattlecry').val();
        var teamCaptain = $('#teamCaptain').val();

       /* console.log("Inserting:\n" + obeUserName + "\n" + game + "\n" + playerName);*/
        Teams.insert({
            obeUserName: obeUserName,
            name: name,
            game: game,
            teamCaptain: game,
            battleCry: battleCry
        });
        
    }
});