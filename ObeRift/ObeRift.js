try {
ObeUserList = new Mongo.collection('ObeUserList');
}
catch (err) {
  console.log("Error in ObeUserList: " + err); 
}
if (Meteor.isClient) {
  try {
  var ObeUserList = new Mongo.collection('ObeUserList');
  }
  catch (err) {
    console.log("Error in Client var ObeUserList: " + err); 
  }
  Router.map(function(){
    this.route('home',          {path: '/'});
    this.route('dashboard',     {path: 'dashboard'});
  }); // end of Router.map()...

  //userStats = new Meteor.collection('userStats');
 
   
  

  Template.userGame.helpers({
    'gameTitle': function() {
        return ObeUserList.find().fetch();
    }
  });

  Template.dashboard.events({
     'submit form-group': function(event){
         event.preventDefault();
         var obeUserName = Meteor.user().username;
         var game = event.target.gameTitle.value;
         var playerName = event.target.gameUserName.value;

         alert("Inserting:\n" + obeUserName + "\n" + game + "\n" + playerName);
         ObeUserList.insert({
            obeUserName: obeUserName,
            name: playerName,
            game: game
         });
         console.log("Added game");
     }
  });

  Meteor.call('getLoLAccount', "Tiandi", function(err, respJson) {
      if(err) {
          window.alert("Error: " + err.reason);
          console.log("error occured on receiving data on server. ", err );
      } else {
          console.log("respJson: ", respJson);
          //window.alert(respJson.length + ' tweets received.');
          Session.set("recentTweets",respJson);
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
                console.log(response);
                return response;
            } else {
                console.log("Response issue: ", result.statusCode);
                var errorJson = JSON.parse(result.content);
                throw new Meteor.Error(result.statusCode, errorJson.error);
            }

        },
    });
}
