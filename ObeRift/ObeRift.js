


if (Meteor.isClient) {
  console.log("Welcome, client to OBERift")
    console.log("Creating users table")
  var UserTable = new Meteor.Collection('Users');
  console.log("Users table created");
/*  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });*/
}

if (Meteor.isServer) {
    console.log("Welcome, server to OBERift")




}
