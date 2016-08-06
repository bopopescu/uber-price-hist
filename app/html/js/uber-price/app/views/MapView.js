define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/map.html'
],  function(
    Backbone,
    Marionette,
    _,
    template
){
    return Marionette.ItemView.extend({
      template: _.template(template),
      ui: {
        mapchart: '#map-container'
      },
      onRender: function() {
        var data = this.collection.toJSON();
        var coll = this.collection;
        chartData = _.map(data, function(state){
          return {"hc-key":"us-"+state.state_abbr.toLowerCase(),
                  "value": state.ili}
        });

        var options = {
          title : {
            text : 'Total Flu-like symptoms over time period'
          },

          subtitle : {
            text : 'Source map: <a href="https://code.highcharts.com/mapdata/countries/us/us-all.js">United States of America</a>'
          },

          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: 'bottom'
            }
          },

          colorAxis: {
            min: 0
          },

          plotOptions: {
            series: {
              point: {
                events: {
                  click: function() {
                    var state =this['hc-key'].substring(3,5).toUpperCase();
                    coll.params.state = state;

                    coll.fetch();
                  }
                }
              }
            }
          },

          series : [{
            data : chartData,
            mapData: Highcharts.maps['countries/us/us-all'],
            joinBy: 'hc-key',
            name: 'Total Flu-like symptoms',
            states: {
              hover: {
                color: '#BADA55'
              }
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }, {
            name: 'Separators',
            type: 'mapline',
            data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
            color: 'silver',
            showInLegend: false,
            enableMouseTracking: false
          }]
        };
        this.ui.mapchart.highcharts('Map', options);
      }
    })
});