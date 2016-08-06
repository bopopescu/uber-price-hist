define([
    'backbone'
], function(Backbone){
    var Model = Backbone.Model.extend({
    });

    return Backbone.Collection.extend({
        model: Model,
        minDate: '2014-05-01',
        maxDate: '2015-05-01',
        parse: function(response){
            return response.data;
        },
        url: function() {
            console.log(this.params);
            urlStr = '/ili_weekly?' +
                'start_date=' + (this.params.startDate) +
                '&end_date=' + (this.params.endDate) +
                '&state=' + (this.params.state || '');
            return urlStr;
        }
    })

});