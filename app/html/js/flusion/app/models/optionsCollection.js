define([
  'backbone'
], function(
    Backbone
) {
  var Model = Backbone.Model.extend({});

  return Backbone.Collection.extend({
    model: Model,
    parse: function(response){
      return response.data;
    },
    url: function(){
      urlStr = '/options';
      return urlStr;
    }

  })
});