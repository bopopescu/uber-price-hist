define([
    '../App',
    'marionette',
    'backbone',
    'underscore',
    'highcharts',
    'highmaps',
    'bootstrap',

    '../models/chartCollection',
    '../models/optionsCollection',
    '../models/mapCollection',

    '../views/TimeseriesChartView',
    '../views/FilterView',
    '../views/MapView',

    'usmaps'
], function(
    App,
    Marionette,
    Backbone,
    _,
    highcharts,
    highmaps,
    bootstrap,

    ChartCollection,
    OptionsCollection,
    MapCollection,

    TimeSeriesChartVew,
    FilterView,
    MapView,

    USMaps
) {
  return Marionette.Controller.extend({
    main: function(query) {

      //****** TEST *******
      //*******************

      var params = this.getQueryString(query);

      this.optionsCollection = new OptionsCollection();
      //this.optionsCollection.fetch();

      this.collection = new ChartCollection();

      this.collection.params = {
        startDate:'2014-02-01',
        endDate: '2014-05-05'
      };


      this.mapCollection = new MapCollection();
      this.mapCollection.params = this.collection.params;

      //this.listenTo(this.collection, 'sync', this.refreshData);
      this.listenTo(this.mapCollection, 'sync',this.refreshAllData);
      this.listenTo(this.optionsCollection,'sync',this.renderFilter);

      this.optionsCollection.fetch();
      this.collection.fetch();
      this.mapCollection.fetch();

    },

    refreshAllData: function(){
      this.refreshTimeSeriesChart();
      this.renderMap();
    },

    refreshTimeSeriesChart: function() {
      this.collection.fetch();
      this.renderTimeSeriesChart();
    },

    renderTimeSeriesChart: function() {
      var region = App.getRegion('timelineContainer');
      region.show(new TimeSeriesChartVew({
        collection : this.collection
      }))
    },

    renderFilter: function(){

      if (this.optionsCollection.toJSON()[0] != undefined){
        this.collection.minDate = this.optionsCollection.toJSON()[0]['min_date'];
        this.collection.maxDate = this.optionsCollection.toJSON()[0]['max_date'];
      }
      var region = App.getRegion('filterContainer');
      region.show(new FilterView({
        collection: this.mapCollection
      }))
    },

    renderMap: function() {
      var region =  App.getRegion('mapContainer');
      region.show(new MapView({
            collection: this.mapCollection
          })
      )
    },

    getQueryString: function(querystring) {
      var params = {};
      if (querystring) {
        _.each(querystring.split('&'), function(keyvalue) {
          var pair = keyvalue.split('=');
          var value = pair[1];
          params[pair[0]] = value ? value.replace(/\+/g,' ') : '';
        });
      }
      return params;
    }
  });
});