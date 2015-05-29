GameList = new Mongo.Collection('GameList');

Meteor.methods({
    'getLoLAccount' : function(userName){
        console.log("Fetching LoL informaion for: " + userName);
        var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + userName.toLowerCase() + "?api_key=d1269d52-93a3-48b8-a4c9-1961975da3b5";
        var result = Meteor.http.get(url, {timeout:30000});
        if(result.statusCode==200) {
            var respJson = JSON.parse(result.content);
            console.log("response received.");
            GameList.insert({
                IGN: respJson.username.name,
                level: respJson.username.summonerLevel
            });
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }
    }
});