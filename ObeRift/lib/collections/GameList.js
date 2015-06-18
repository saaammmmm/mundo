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
    },

    // To get the rune page from a username
    'getRunePageByLolUsername': function (userName, verificationCode) {
        //
        console.log("Fetching summonerID  for: " + userName + "\t\tusing verificationCode: " + verificationCode);
        var summonerIdFromSummonerNameurl = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + userName.toLowerCase() + "?api_key=d1269d52-93a3-48b8-a4c9-1961975da3b5";


        // This will hold the summonerId from the summonername
        var summonerId = "notAssigned"; // init it to null string
        console.log("Requesting Summoner Id from Summoner Name of: " + userName.toLowerCase());
        try {
            var result = HTTP.get(summonerIdFromSummonerNameurl, function(err, result){
                if (result.statusCode == 200) {
                    var userlower = userName.toLowerCase();
                    var respJson = JSON.parse(result.content);
                    summonerId = respJson[userlower].id;
                    console.log("Local SummonerId: " + summonerId);
                    // Display the summonerId that was retrieved from the summonerName
                    console.log("Retrieved summonerId: " + summonerId);

                    // Get the rune page name
                    console.log("Requesting Run Page from Summoner from ID");

                    var runePageName = ""; // init it to null string
                    console.log("Requesting Rune Info  from Summoner ID of: " + summonerId);
                    var runePageNameFromSummonerIdUrl = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + summonerId + "/runes?api_key=d1269d52-93a3-48b8-a4c9-1961975da3b5";



                    try {
                        var result = HTTP.get(runePageNameFromSummonerIdUrl, function(err, result){
                            if (result.statusCode == 200) {
                                        var respJson = JSON.parse(result.content);
                                            console.log(respJson)
                                            runePageName = respJson[summonerId].pages[0].name;
                                             console.log("Local Retrieved Rune Page: " + runePageName);
                                            console.log("Local Got rune page name of " + runePageName); 
                                            console.log("Local Rune Object:" + respJson[summonerId]);
                                            console.log("Checking: " + verificationCode);
                                            if (verificationCode.trim() == runePageName.trim()  ) {
                                                console.log("SUCCESSFUL VERIFICATION!!!!...");
                                            } else {
                                                console.log("Unable to verify...");
                                                throw new Meteor.Error(500, 'Error 500: Not found', 'Verification failed');
                                            }
                                }
                        });
                    } catch (e) {
                        console.log(e);
                        console.log("Error!!! " + e);
                        //throw new Meteor.Error(500, 'Error 500: Not found', 'Verification failed');
                    }
                      // Display the rune page that was retrieved from the summonerId
                    console.log("Retrieved Rune Page: " + runePageName);
                    console.log("Got rune page name of " + runePageName);
                   // throw new Meteor.Error(500, 'Error 500: Not found', 'Verification failed');

                        
                }
            });
        } catch (e) {
            console.log(e);
            console.log("Error Getting SummonerId!!! " + e);
            //throw new Meteor.Error(500, 'Error 500: Not found', 'Verification failed');
        }
        //throw new Meteor.Error(500, 'Error 500: Not found', 'Verification failed');
    }
});