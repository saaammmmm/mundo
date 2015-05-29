if (Meteor.isClient) {





  Template.ObeUserList.helpers({
    ObeUserList: function() {
        return ObeUserList.find({obeUserName: Meteor.user().username});
    }
  });
    Template.ObeRiftTeams.helpers({
    ObeRiftTeams: function() {
        return ObeRiftTeams.find();
    }
  });
    
    Template.GameStatistics.created = function(){
        var League = ObeUserList.find({game: 'League of Legends'});
        console.log("Data:" + League);
        League.forEach(function(user){
            Meteor.call('getLoLAccount', user.name, function(err, respJson) {
                if(err) {
                    window.alert("Error: " + err.reason);
                    console.log("error occured on receiving data on server. ", err );
                } else {
                    var username = user.name.toLowerCase();
                    console.log("respJson: ", respJson);
                    //window.alert(respJson.length + ' tweets received.');
                    ObeGameList.insert({
                        IGN: respJson.username.name,
                        level: respJson.username.summonerLevel
                    });
                    console.log("ObeGameList:" + ObeGameList);
                }
            });
        });
    };

    Template.GameStatistics.helpers({
        stats: function() {
            return ObeGameList.find();
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
            var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + userName.toLowerCase() + "?api_key=d1269d52-93a3-48b8-a4c9-1961975da3b5";
            var result = Meteor.http.get(url, {timeout:30000});
            if(result.statusCode==200) {
                var respJson = JSON.parse(result.content);
                console.log("response received.");
                return respJson;
            } else {
                console.log("Response issue: ", result.statusCode);
                var errorJson = JSON.parse(result.content);
                throw new Meteor.Error(result.statusCode, errorJson.error);
            }


        }

    });
}