define([
    '../App',
    'marionette',
    'backbone',
    'underscore',
    'highcharts',
    'bootstrap',


    '../models/chartCollection',
    '../models/optionsCollection',

    '../views/TimeseriesChartView',
    '../views/FilterView'
], function(
    App,
    Marionette,
    Backbone,
    _,
    highcharts,
    bootstrap,

    ChartCollection,
    OptionsCollection,

    TimeSeriesChartVew,
    FilterView
) {
  return Marionette.Controller.extend({
    main: function(query) {

      //var params = this.getQueryString(query);

      this.optionsCollection = new OptionsCollection();
      this.optionsCollection.fetch();

      this.collection = new ChartCollection();

      this.collection.params = {
        startDate:'2016-08-01',
        endDate: '2016-08-05'
      };
      //
      //
      //this.mapCollection = new MapCollection();
      //this.mapCollection.params = this.collection.params;
      //
      this.listenTo(this.collection, 'sync', this.renderTimeSeriesChart);
      this.listenTo(this.collection, 'sync', this.renderFilter);
      //this.listenTo(this.mapCollection, 'sync',this.refreshAllData);
      //this.listenTo(this.optionsCollection,'sync',this.renderFilter);
      //
      //this.optionsCollection.fetch();
      this.collection.fetch();
      //this.mapCollection.fetch();

    },

    refreshAllData: function(){
      this.refreshTimeSeriesChart();
      this.renderMap();
    },

    refreshTimeSeriesChart: function() {
      console.log('refreshing...');
      this.collection.fetch();
      this.renderTimeSeriesChart();
    },

    renderTimeSeriesChart: function() {
      var region = App.getRegion('timelineContainer')
      region.show(new TimeSeriesChartVew({
        collection : this.collection
      }))
    },

    renderFilter: function(){
      //console.log(this.optionsCollection);
      var region = App.getRegion('filterContainer');
      region.show(new FilterView({
        collection: this.optionsCollection
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