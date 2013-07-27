//Define the namespace for our API.
var d3helper = {};

//Define our data manager module.
d3helper.dataManager = function module() {
  var exports = {},
    dispatch = d3.dispatch('dataReady', 'dataLoading'),
    data;

  //Create a method to load the tsv file, and apply cleaning function asynchronously.
  exports.loadCsvData = function(_file, _cleaningFunc) {

    //Create the tsv request using d3.csv.
    var loadCsv = d3.csv(_file);

    //On the progress event, dispatch the custom dataLoading event.
    loadCsv.on('progress', function() { dispatch.dataLoading(d3.event.loaded);});

    loadCsv.get(function (_err, _response) {
      //Apply the cleaning function supplied in the _cleaningFunc parameter.
      _response.forEach(function (d) {
        _cleaningFunc(d);
      });
      //Assign the cleaned response to our data variable.
      data = _response;

      //Dispatch our custom dataReady event passing in the cleaned data.
      dispatch.dataReady(_response);
    });
  };
  //Create a method to access the cleaned data.
  exports.getCleanedData = function () {
    return data;
  };

  d3.rebind(exports, dispatch, 'on');

  return exports;
};

//Instantiate our data manager module for each data file.
hampshireDataManager = d3helper.dataManager();

//Load our Berkeley data, and supply the cleaning function.
hampshireDataManager.loadCsvData('./data/lsoas2010.csv', function(d){
});

hampshireDataManager.on('dataReady', function () {
  d3.select('#wait').style('visibility', 'hidden');
  d3.select('#instructions').style('visibility', 'visible');
});