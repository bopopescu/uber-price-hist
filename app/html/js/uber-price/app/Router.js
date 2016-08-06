define(
    ['marionette'],
    function(
        Marionette
    ) {
      return Marionette.AppRouter.extend({
        appRoutes: {
          'params?*query': 'main',
          '?*query': 'main',
          '' : 'main'
        },
        onRoute: function() {
        }
      });
  });