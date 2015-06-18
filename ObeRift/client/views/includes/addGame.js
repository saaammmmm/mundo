Template.addGame.events({
     'click #addGameButton': function() {
        event.preventDefault();
        // Start the helper
        console.log("Creating new Authentication code");
        
        // Generate an authentication code
        var authenticationCode = createNewAuthenticationCode();
        console.log("AuthenticationCode: " + authenticationCode);

        // Put it in the label
        $('#addGameAuthenticationCode').text(authenticationCode);
        
    },
    // This happens when you try to authenticate using teh provided random code
    'click #attemptToVerify': function() {
        event.preventDefault();
        var userName = $('#addGameIgn').val(); // This is not working :( - Because you were fucking drunk and did not add the $ in front of the JQuery Shit... IDIOT ASSHOLE
        var verificationCode = $('#addGameAuthenticationCode').text();
        var gameTitle = $('#addGameGameTitle').val();
        console.log("Before calling server function to get id, userName:" + userName + "\t\t\tverificationCode: " + verificationCode + "\t\tGame: " + gameTitle);
        Meteor.call('getRunePageByLolUsername', userName, verificationCode, gameTitle, function (error, result) { 
            
            console.log('Rune Page Verification Called Asychonously');

         } );   
    }
});

function createNewAuthenticationCode(){
    return makeid();
}


function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
