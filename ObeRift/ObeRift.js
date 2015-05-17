


if (Meteor.isClient) {
  // Discern what the hell we are doing
  console.log("Welcome, client to OBERift")

  // Create the table
  console.log("Creating users table")
  var UserTable = new Meteor.Collection('Users');
  console.log("Users table created");

  // Insert some dummy data
  UserTable.insert({
      name: "Sam",
      rank: 9000

  }); // End if insert...

}

if (Meteor.isServer) {
    console.log("Welcome, server to OBERift")




}
