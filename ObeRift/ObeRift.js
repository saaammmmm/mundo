if (Meteor.isClient) {
  Router.map(function(){
    this.route('home',          {path: '/'});
    this.route('join',          {path: '/join'});
    this.route('dashboard',     {path: 'dashboard'});
  }); // end of Router.map()...

  userStats = new Meteor.collection('userStats');

  Meteor.call(getLoLAccount("Tiandi"));


}
if (Meteor.isServer) {
    console.log("Welcome, server to OBERift");

    Meteor.methods({
        getLoLAccount: function(userName){
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
        }
    });
}
