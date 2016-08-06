define([
    'backbone'
], function(
    Backbone
) {
  var Model = Backbone.Model.extend({
  });

  return Backbone.Collection.extend({
    model: Model,
    startDate:'2014-01-01',
    endDate: '2015-01-01'
  })
});