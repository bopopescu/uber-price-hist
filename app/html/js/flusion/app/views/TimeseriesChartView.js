define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/chart.html'
], function (
    Backbone,
    Marionette,
    _,
    template
) {
  return Marionette.ItemView.extend({
    template: _.template(template),
    ui:
    {
      chart: '#chart-container'
    },
    onRender: function() {
      var data= this.collection.toJSON();
      var options = {
        title: {
          text: 'Report Flu-like Symptoms',
          x: -20 //center
        },
        xAxis: {
          categories: _.map(data, function(week){
            return week.week_of
          })
        },
        yAxis: {
          title: {
            text: 'Symptoms'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series: [{
          name: 'Symptoms',
          data: _.map(data, function (week){
            return [week.week_of, week.ili]
          })
        }]
      };
      this.ui.chart.highcharts(options);
    }
});

});