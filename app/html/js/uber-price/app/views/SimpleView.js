define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/SimpleTemplate.html'
], function(
    Backbone,
    Marionette,
    _,
    template
){
  return Marionette.ItemView.extend({
    el: '#app-hook',
    template: template
  })
});