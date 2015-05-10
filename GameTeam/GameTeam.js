

if (Meteor.isClient) {
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
  var setupDataBase = true

if (setupDataBase) {
  console.log("Setting up database")
  try {
    new Mongo.Collection('players');
    PlayersList = new Mongo.Collection('players');
  }
  catch (err) {
    console.log("Error in setting up database");
  }

}


}
