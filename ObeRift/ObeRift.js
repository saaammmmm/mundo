// Create the table
  


if (Meteor.isClient) {
  // Discern what the hell we are doing
  console.log("Creating users table")
  UserTable = new Meteor.Collection('Users'); // Do not user var
  console.log("Users table created");
  console.log("Welcome, client to OBERift")

  
function insertSomeData(){
    // Insert some dummy data
    UserTable.insert({
        name: "Sam",
        rank: 9000

    }); // End if insert...
    }
  UserTable.find().fetch();

}

if (Meteor.isServer) {
    console.log("Welcome, server to OBERift")

    UserTable = new Meteor.Collection('Users'); // dp not use var


}
