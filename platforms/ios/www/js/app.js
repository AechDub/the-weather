(function () { 'use strict';function run ($ionicPlatform) {
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

})();
(function () { 'use strict';angular
  .module('app')
  .filter('dayFilter', dayFilter)

function dayFilter () {
  return function (input, option) {
    if (!input || input === '') {
      return input
    }

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var d = new Date(input)
    var dayName = days[d.getDay()]

    return dayName
  }
}
})();
(function () { 'use strict';angular
  .module('app')
  .factory('locationFactory', locationFactory)

function locationFactory ($http, Constants, $q) {
  function getCoordinates (params) {
    _.get(params, 'city', 'Seattle')
    _.get(params, 'state', 'WA')

    var req = {
      method: 'GET',
      url: Constants.googleApiUrl.replace('{city}', params.city).replace('{state}', params.state)
    }

    return $http(req)
      .then(getCoordinatesComplete, getCoordinatesFailed)

    function getCoordinatesComplete (res) {
      setCoordinates(res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng)
      return res.data.results
    }

    function getCoordinatesFailed (err) {
      return $q.reject(err)
    }
  }

  function setCoordinates (lat, lang) {
    window.localStorage.setItem('lat', lat)
    window.localStorage.setItem('lng', lang)

    console.log('lat/lang', window.localStorage.getItem('lat'), window.localStorage.getItem('lng'))
  }

  return {
    getCoordinates: getCoordinates,
    setCoordinates: setCoordinates
  }
}
})();
(function () { 'use strict';angular
  .module('app')
  .factory('weatherFactory', weatherFactory)

function weatherFactory ($http, Constants, $q) {
  function getForecast (lat, lang) {
    var req = {
      method: 'GET',
      url: Constants.darkSkyApiUrl.replace('{type}', 'forecast').replace('{lat}', lat).replace('{lang}', lang)
    }

    return $http(req)
      .then(getForecastComplete, getForecastFailed)

    function getForecastComplete (res) {
      return res.data
    }

    function getForecastFailed (err) {
      return $q.reject(err)
    }
  }

  return {
    getForecast: getForecast
  }
}
})();
(function () { 'use strict';angular
  .module('app')
  .directive('location', location)

function location (locationFactory, $rootScope) {
  var directive = {
    link: link,
    templateUrl: 'directives/location/location.html',
    restrict: 'E'
  }

  return directive

  function link (scope, el, attrs, $timeout, $state) {
    scope.changeLocation = false

    function setPositionSuccess (position) {
      scope.processed = true
      scope.changeLocation = false

      $rootScope.$broadcast('locationChanged', {
        message: 'changed!'
      })
    }

    function setPositionFailed () {
      scope.error = true
    }

    scope.setLocation = function (_city, _state) {
      scope.changeLocation = true

      var params = {
        city: _city,
        state: _state
      }

      locationFactory.getCoordinates(params)
        .then(setPositionSuccess, setPositionFailed)
    }
  }
}

})();
(function () { 'use strict';angular
  .module('app')
  .controller('ForecastCtrl', ForecastCtrl)

function ForecastCtrl (weatherFactory, locationFactory, $rootScope, $scope, $timeout, $window, Constants, $cordovaGeolocation) {
  $scope.changeLocation = false
  $scope.processing = true

  init()

  function init () {
    checkTime()

    if (window.localStorage.getItem('lat') !== undefined && window.localStorage.getItem('lat') !== null) {
      var posOptions = {timeout: 10000, enableHighAccuracy: false}

      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          locationFactory.setCoordinates(position.coords.latitude, position.coords.longitude)
          getForecast()
        }, function (err) {
          console.log(err)
          $scope.processing = false
          $scope.changeLocation = true
        })
      getForecast()
    } else {
      $scope.processing = false
      $scope.changeLocation = true
    }
  }

  function getForecast () {
    weatherFactory.getForecast(window.localStorage.getItem('lat'), window.localStorage.getItem('lng'))
      .then(function (data) {
        $scope.processing = false
        $scope.forecast = data
      })
  }

  function checkTime () {
    var h = new Date().getHours()
    if (h <= 18 & h >= 6) {
      $scope.time = 'day'
    } else {
      $scope.time = 'night'
    }
  }

  $scope.getSvgIcon = function (req) {
    var icons = {
      'clear-night': 'clearNightIcon',
      'clear-day': 'sunnyIcon',
      'cloudy': 'mostlyCloudyIcon',
      'partly-cloudy-day': 'partlyCloudyIcon',
      'partly-cloudy-night': 'partlyCloudyNightIcon',
      'rain': 'rainyIcon',
      'snow': 'snowShowersIcon',
      'wind': 'windyIcon'
    }

    return icons[req]
  }

  $rootScope.$on('locationChanged', function (event, data) {
    getForecast()
  })
}
})();