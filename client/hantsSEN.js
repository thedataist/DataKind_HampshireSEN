Meteor.subscribe("students");
Meteor.subscribe("lsoas");
Meteor.subscribe("schools");

var Router = Backbone.Router.extend({
  routes: {
    "": "main",
    "map": "map",
    "table" : "table"
  },

  main: function () {
    console.log("home route");
    Session.set("page", "home");
  },

  map: function () {
  	console.log("map route");
  	Session.set("page", "map");
  },

  table: function () {
  	console.log("table route");
  	Session.set("page", "table");
  }

});

Template.page.mapRoute = function () {
  if(Session.get("page") === "map") return true;
  else return false;
};

Template.page.tableRoute = function () {
  if(Session.get("page") === "table") return true;
  else return false;
};

Template.page.homeRoute = function () {
  if(Session.get("page") === "home") return true;
  else return false;
};

Template.map.students = function () {
  return Students.find();
};

Template.map.lsoas = function () {
  return LSOAs.find();
};

Template.map.schools  = function () {
  return Schools.find();
};

var mskiRouter = new Router;

Meteor.startup(function () {

  Meteor.startup(function () {
    Backbone.history.start({pushState: true});
  });

  Meteor.autorun(function () {
    //Meteor.subscribe("queries");
    Session.set("loginError", false);

  });
});


