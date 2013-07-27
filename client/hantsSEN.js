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

Template.map.rendered = function () {
  Meteor.generateMap();
}

var mskiRouter = new Router;

Meteor.startup(function () {

  Meteor.startup(function () {
    Backbone.history.start({pushState: true});
  });

  Meteor.autorun(function () {
    //Meteor.subscribe("queries");
    //Session.set("loginError", false);
  });
});

Meteor.generateMap = function(){
  var path = d3.geo.path();

  d3.select("svg").remove();
  d3.select("#map").attr("style","width:100%; height:500px; float:left");
  var width = $("#map").width(), 
      height = $("#map").height();

  mapVis = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

  d3.json("/data/LSOA_hants_simplify0.75.topo.json", function(json){
    console.log("geojson loaded");
    mapVis.append("svg:g")
    .attr("class", "lsoa")
    .selectAll("path")
    .data(json.features)
    .enter().append("svg:path")
    .attr("d", path)
    .attr("fill-opacity", 0.5)
    .attr("fill", function(d){
      return "#00ff00";
      }
    )
    .attr("stroke", "#222");
  });

}


