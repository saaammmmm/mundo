// Create the table
  




if (Meteor.isClient) {/*
  Template.home.autoredirect = function(){
    Router.go('join');
  }
*/
   console.log("Welcome, client to OBERift");
  /*Router.map( function () {
    // simple route with
    // name 'home' that
    // matches '/' and automatically renders
    // template 'home'
    this.route('home', {path: '/'});
  }); // end of Router.map()...

*/




  /* // Discern what the hell we are doing
  console.log("Creating users table")
  UserTable = new Meteor.Collection('Users'); // Do not user var
  console.log("Users table created");
  console.log("Welcome, client to OBERift")


    UserTable.insert({
        name: "Sam",
        rank: 9000

    }); // End if insert...
    
  UserTable.find().fetch();
*/
}

if (Meteor.isServer) {
  /*
    console.log("Welcome, server to OBERift");

    UserTable = new Meteor.Collection('Users'); // dp not use var
*/

}
