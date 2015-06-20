Template.teams.helpers({
    ObeRiftTeams: function() {
        return Teams.find();
    }
});

Template.dashboard.events({
    // PUT THIS ON THE SERVER SIDE!!!
    "submit createTeamButton": function(event){
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
        event.target.name.value = "";
        event.target.game.value = "";
        event.target.teamCaptain.value = "";
        event.target.battleCry.value = "";
    }
});