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

  var projection = d3.geo.albers()
    .center([2.5, 51.1])
    .rotate([4.4, 0])
    // .parallels([50, 60])
    .scale(1200 * 30);
    // .translate([width / 3, height / 2]);

  var path = d3.geo.path()
      .projection(projection)
      .pointRadius(2);

  var mapGroup = mapVis.append("g");
  // var layerUK = mapGroup.append("g");
  var layerHants = mapGroup.append("g");

  function centre_and_bound_projection(geojson_object) {
    projection
        .scale(1)
        .translate([0, 0]);

    var b = path.bounds(geojson_object),
        s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

    projection
        .scale(s)
        .translate(t);
  };

  // d3.json("/data/LSOA_hants_simplify0.75.topo.json", function(json){
  //   console.log("geojson loaded");
  //   mapVis.append("svg:g")
  //   .attr("class", "lsoa")
  //   .selectAll("path")
  //   .data(json.features)
  //   .enter().append("svg:path")
  //   .attr("d", path)
  //   .attr("fill-opacity", 0.5)
  //   .attr("fill", function(d){
  //     return "#00ff00";
  //     }
  //   )
  //   .attr("stroke", "#222");
  // });

  d3.json("data/LSOA_hants_simplify0.75_simplify-proportion0.5.topo.json", function(hantsData) {
  // d3.json("data/LSOA_hants_simplify0.75.topo.json", function(hantsData) {

    var objectid = 'LSOA_hants_simplify0.75';
    var hantsLsoa = topojson.feature(hantsData, hantsData.objects[objectid]);

    // centre_and_bound(hantsLsoa);

    layerHants.append("path")
      .datum(topojson.mesh(hantsData, hantsData.objects[objectid])) //, function(a, b) { return a !== b; }))
      .attr("class", "lsoa-boundary")
      .attr("d", path);

    layerHants.selectAll(".lsoa")
      .data(hantsLsoa.features)
      .enter().append("path")
      .attr("class", "lsoa")
      .style("fill", function(d) {
        return "#00ff00";
      });

  });



}


