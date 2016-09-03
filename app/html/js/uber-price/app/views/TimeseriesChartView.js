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
          text: 'Uber price estimates',
          x: -20 //center
        },
        xAxis: {
          categories: _.map(data, function(est){
            return est.est_time
          })
        },
        yAxis: {
          title: {
            text: 'Estimates'
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
          name: 'Estimates',
          data: _.map(data, function (est){
            return [est.est_time, est.estimate]
          })
        }]
      };
      this.ui.chart.highcharts(options);
    }
});

});