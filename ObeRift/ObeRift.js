if (Meteor.isClient) {
  Router.map(function(){
    this.route('home', {path: '/'});
    this.route('join', {path: '/join'});
  }); // end of Router.map()...

  userStats = new Meteor.collection('userStats');


}
if (Meteor.isServer) {
    console.log("Welcome, server to OBERift");

    Meteor.http.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/Tiandi?api_key=d1269d52-93a3-48b8-a4c9-1961975da3b5", function(error, result){
        if(error){
            console.log("Error");
        }
        else {
            console.log("http get SUCCESS");
            if(result.statusCode === 200) {
                console.log('Status code = 200!');
                console.log(result.content);
            }
        }
    });
}
