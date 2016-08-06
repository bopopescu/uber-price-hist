define([
  'backbone',
  'marionette',
  'underscore',
  'text!templates/filter.html',
  'jqueryui',
  'jquery'
], function(
    Backbone,
    Marionette,
    _,
    template,
    jqueryui,
    $
){
  return Marionette.ItemView.extend({
    template: _.template(template),
    ui: {
      from_input: 'input[name=from_input]',
      to_input: 'input[name=to_input]'
    },
    events:{
      'change @ui.from_input' : 'filterChanged',
      'change @ui.to_input' : 'filterChanged'
    },
    onRender: function() {
      var from_ip = this.ui.from_input;
      var to_ip = this.ui.to_input;
      from_ip.datepicker({
        defaultDate: this.collection.params.startDate,
        changeMonth: true,
        numberOfMonths: 1,
        minDate: new Date(this.collection.minDate),
        maxDate: new Date(this.collection.maxDate),
        dateFormat: "yy-mm-dd",
        value: this.collection.params.startDate,
        onClose: function (selectedDate) {
          to_ip.datepicker("option", "minDate", selectedDate);
        }
      });
      to_ip.datepicker({
        defaultDate: this.collection.params.endDate,
        changeMonth: true,
        numberOfMonths: 1,
        minDate: new Date(this.collection.minDate),
        maxDate: new Date(this.collection.maxDate),
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
          from_ip.datepicker("option", "maxDate", selectedDate);
        }
      });
      from_ip.datepicker("setDate", this.collection.params.startDate);
      to_ip.datepicker("setDate", this.collection.params.endDate);
    },
    filterChanged: function() {
      var start_date = this.ui.from_input.datepicker("getDate");
      var end_date = this.ui.to_input.datepicker("getDate");
      if (start_date!=null){
        var start_date_str = $.datepicker.formatDate("yy-mm-dd", start_date);
        this.collection.params.startDate = start_date_str;
      }
      if (end_date!=null){
        var end_date_str = $.datepicker.formatDate("yy-mm-dd", end_date);
        this.collection.params.endDate = end_date_str;
      }
      this.collection.fetch();
    }
  });
});