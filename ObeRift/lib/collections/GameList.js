GameList = new Mongo.Collection('GameList');

Meteor.methods({
    'getLoLAccount': function (userName) {
        console.log("Fetching LoL informaion for: " + userName);
        var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + userName.toLowerCase() + "?api_key=d1269d52-93a3-48b8-a4c9-1961975da3b5";
        this.unblock();
        try {
            var result = HTTP.get(url, function(err, result){
                if (result.statusCode == 200) {
                    var count = GameList.find({IGN: userName}).count();
                    if(count === 0){
                            var userlower = userName.toLowerCase();
                            var respJson = JSON.parse(result.content);
                            GameList.insert({
                                IGN: respJson[userlower].name,
                                level: respJson[userlower].summonerLevel,
                                Game: "League of Legends"
                            });
                        }
                    }
            });
        } catch (e) {
            console.log(e);
        }
    }
});