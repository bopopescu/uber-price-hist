define([
    'backbone'
], function(Backbone){
    var Model = Backbone.Model.extend({
    });

    return Backbone.Collection.extend({
        model: Model,
        parse: function(response){
            return response.data;
        },
        url: function() {
            urlStr = '/ili_by_state?' +
                'start_date=' + (this.params.startDate) +
                '&end_date=' + (this.params.endDate);
            return urlStr;
        }
    })

});