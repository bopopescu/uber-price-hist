require.config({
  baseUrl: 'js/lib',
  paths: {
    templates: '../uber-price/app/templates',
    backbone: 'backbone/backbone',
    marionette: 'marionette/backbone.marionette',
    jquery: 'jquery-2.1.4',
    jqueryui: 'jquery-ui',
    underscore: 'underscore',
    bootstrap: 'bootstrap/bootstrap',
    highcharts: 'https://code.highcharts.com/highcharts.src',
    highmaps: 'https://code.highcharts.com/maps/modules/map.src',
    usmaps: 'https://code.highcharts.com/mapdata/countries/us/us-all'


  },
  shim: {
    underscore: {
      exports: '_'
    },
    jquery: {
      exports : '$'
    },
    jqueryui: {
      deps: ['jquery']
    },
    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },
    marionette : {
      exports : 'Backbone.Marionette',
      deps : ['backbone']
    },
    bootstrap : {
      deps : ['jquery']
    },
    highcharts : {
      deps : ['jquery']
    },
    highmaps: {
      deps: ['highcharts']
    },
    usmaps: {
      deps: ['highcharts','highmaps']
    }
  }
});


requirejs([
  'backbone',
  'jquery',
  '../uber-price/app/App',
  '../uber-price/app/Router',
  '../uber-price/app/controllers/AppController'
], function(Backbone, $, App, AppRouter, AppController){

  App.addInitializer(function(){
    this.router = new AppRouter({
      controller: new AppController()
    });
    Backbone.history.start({
      silent: false,
      root: location.pathname
    });
  });

  App.start();
});