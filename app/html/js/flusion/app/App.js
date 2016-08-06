define([
    'backbone',
    'marionette',
    'underscore'
], function(
    Backbone,
    Marionette,
    _
  ){
  var app = new Marionette.Application();

  app.addRegions({
    timelineContainer : '#timeline-container',
    filterContainer :'#filter-container',
    mapContainer: '#mapdata-container'
  });


  return app;
});