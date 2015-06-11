Template.addGame.events({
     'click #addGameButton': function() {
        // Start the helper
        console.log("Creating new Authentication code");
        
        // Generate an authentication code
        var authenticationCode = createNewAuthenticationCode();
        console.log("AuthenticationCode: " + authenticationCode);

        // Put it in the label
        $('#addGameAuthenticationCode').text(authenticationCode);


        //  ! ! ! ! !  * * * * * * 
        // will want to put it in a list of already used authentication codes once it is verified. THen never use that one again... THis is a must
        // ! ! ! ! ! * * * * * * *
        // do that here

        
    },
    // This happens when you try to authenticate using teh provided random code
    'click #attemptToVerify': function() {
        getRunePageByLolUsername(getLoLAccount());
    }
});

function createNewAuthenticationCode(){
    return "DEADBEEF";
}

 function getRunePageByLolUsername(userName) {
    //
    console.log("Fetching summonerID  for: " + userName);
    var summonerIdFromSummonerNameurl = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + userName.toLowerCase() + "?api_key=d1269d52-93a3-48b8-a4c9-1961975da3b5";
    this.unblock();

    // This will hold the summonerId from the summonername
    var summonerId = ""; // init it to null string
    console.log("Requesting Summoner Id from Summoner Name of: " + userName.toLowerCase());
    try {
        var result = HTTP.get(url, function(err, result){
            if (result.statusCode == 200) {
                        var userlower = userName.toLowerCase();
                        var respJson = JSON.parse(result.content);
                      
                            summonerId = respJson[userlower].id;
                    
                }
        });
    } catch (e) {
        console.log(e);
        alert("Error!!! " + e);
    }
    // Display the summonerId that was retrieved from the summonerName
    console.log("Retrieved summonerId: " + summonerId);

    // Get the rune page name
    console.log("Requesting Run Page from Summoner from ID");

    var runePageName = ""; // init it to null string
    console.log("Requesting Rune Info  from Summoner ID of: " + summonerId);
    var runePageNameFromSummonerIdUrl = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + summonerId + "/runes?api_key=d1269d52-93a3-48b8-a4c9-1961975da3b5";

    this.unblock();

    try {
        var result = HTTP.get(url, function(err, result){
            if (result.statusCode == 200) {
                        var respJson = JSON.parse(result.content);
                      
                            runePageName = respJson[summonerId].name;
                
                }
        });
    } catch (e) {
        console.log(e);
        alert("Error!!! " + e);
    }
      // Display the rune page that was retrieved from the summonerId
    console.log("Retrieved Rune Page: " + runePageName);
    alert("Got rune page name of " + runePageName);

}
