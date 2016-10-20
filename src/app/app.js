function run ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova) {
      window.open = cordova.InAppBrowser.open
    }

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false)
      cordova.plugins.Keyboard.disableScroll(true)
    }

    if (window.StatusBar) {
      StatusBar.styleLightContent()
    }
  })
}

function config ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'menu/menu.html'
    })
    .state('app.forecast', {
      url: '/forecast',
      templateUrl: 'routes/forecast/forecast.html',
      controller: 'ForecastCtrl as forecastCtrl'
    })

  $urlRouterProvider.otherwise('/app/forecast')
  $ionicConfigProvider.views.transition('none')
  $ionicConfigProvider.views.maxCache(0)
}

angular.module('app', ['ionic', 'ngCordova'])
  .run(run)
  .config(config)

