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
        var userName = $('#addGameIgn').val(); // This is not working :( - Because you were fucking drunk and did not add the $ in front of the JQuery Shit... IDIOT ASSHOLE
        console.log("Before calling server function to get id, userName:" + userName);
        Meteor.call('getRunePageByLolUsername', userName, function (error, result) { 

            console.log("result: " + result);
            console.log("error: " + error);
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
