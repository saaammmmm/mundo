
ObeUserList = new Mongo.Collection('ObeUserList');

ObeRiftTeams = new Mongo.Collection('ObeRiftTeams');

if (Meteor.isClient) {

  Router.map(function(){
    this.route('home',          {path: '/'});
    this.route('dashboard',     {path: 'dashboard'});
    this.route('teams',         {path: 'teams'});
  }); // end of Router.map()...


    Meteor.call('getLoLAccount', 'Tiandi', function(err, respJson) {
        if(err) {
            window.alert("Error: " + err.reason);
            alert("error occured on receiving data on server. ", err);
        } else {
            console.log(respJson.Tiandi.name);
            console.log(respJson.Tiandi.SummonerLevel);
            console.log(respJson)
            return respJson;
        }
    });

  Template.ObeUserList.helpers({
    ObeUserList: function() {
        return ObeUserList.find();
    }
  });
    Template.ObeRiftTeams.helpers({
    ObeRiftTeams: function() {
        return ObeRiftTeams.find();
    }
  });

    Template.GameStatistics.helpers({
        IGN: function() {
            return "Tiandi"
        },
        SummonerLevel: function() {
            return "30"
        }
    });


  Template.dashboard.events({
     "submit .form-inline": function(event){
         event.preventDefault();
         var obeUserName = Meteor.user().username;
         var game = event.target.gameTitle.value;
         var playerName = event.target.gameUserName.value;

         console.log("Inserting:\n" + obeUserName + "\n" + game + "\n" + playerName);
         ObeUserList.insert({
            obeUserName: obeUserName,
            name: playerName,
            game: game
         });
         event.target.gameTitle.value = "";
         event.target.gameUserName.value = "";
         console.log("Added game");
     }
  });


/**
    here we are setting the config of Accounts UI to use UserNames instead of passwords.. duh
*/
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

} // This is the end of the client code
if (Meteor.isServer) {
    console.log("Welcome, server to OBERift");

    Meteor.methods({
        'getLoLAccount' : function(userName){
            console.log("Fetching LoL informaion for: " + userName);
            var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + userName + "?api_key=d1269d52-93a3-48b8-a4c9-1961975da3b5";
            var result = Meteor.http.get(url, {timeout: 30000});
            if(result.statusCode == 200){
                var response = JSON.parse(result.content);
                return response;
            } else {
                var errorJson = JSON.parse(result.content);
                throw new Meteor.Error(result.statusCode, errorJson.error);
            }

        }

    });
}