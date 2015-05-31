Template.join.helpers({
    /* helpers go here */
});
// This is from 
// http://blog.benmcmahen.com/post/41741539120/building-a-customized-accounts-ui-for-meteor
// Added May 31, 2015 by sam
// This allows us to create users 
Template.join.events({
    'click #create-account': function(e, t) {  

        console.log("Creating account");

        e.preventDefault();
        var username = $('#account-username').val();
        var password = $('#account-password').val();
        console.log("username: " + username);
         var isValidPassword = function(val) {
             return val.length >= 8 ? true : false; 
        }
        if (!isValidPassword(password)) { 
            $('#genericAlert').text("Oh snap! Password must be at least 8 characters long");
                $('#genericAlert').show();
            return false;
        }
       
        console.log("Creating Account");

        // Trim and validate the input

        Accounts.createUser({username: username, password : password}, function(err){
            if (err) {
                console.log(err);
                $('#genericAlert').text(err.reason);
                $('#genericAlert').show();
                return false;
            } 
            else {
                // Success. Account has been created and the user
                // has logged in successfully. 
                $('#genericAlert').text("Welcome!");
                $('#genericAlert').attr('class', 'alert alert-danger col-sm-6 col-sm-offset-3');
                $('#genericAlert').show();
                Router.go('dashboard');
            }
        });
        return false; 
    },

    'click #login' : function(e, t){
        e.preventDefault();
        // retrieve the input field values
        var username = $('#account-username').val();
        var password = $('#account-password').val();
        console.log("username: " + username);
        console.log("Loggin in");

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(username, password, function(err){
        if (err) {
            console.log(err);
            $('#genericAlert').text(err.reason);
            $('#genericAlert').show();
            return false;
        }
        else {
            // The user has been logged in.
            // Success. The user has logged in successfully. 

            $('#genericAlert').text("Welcome!");
            $('#genericAlert').attr('class', 'alert alert-danger col-sm-6 col-sm-offset-3');
            $('#genericAlert').show();
            Router.go('dashboard');
        }
      });
         return false; 
      }

  });
