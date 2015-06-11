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
        //var userName = ('#addGameIgn').val(); // This is not working :()
        // console.log("Before calling server function to get id, userName:" + userName);
        Meteor.call('getRunePageByLolUsername', 'Tiandi', function (error, result) { console.log('Rune Page Verification Called Asychonously') } );   
    }
});

function createNewAuthenticationCode(){
    return "DEADBEEF";
}


