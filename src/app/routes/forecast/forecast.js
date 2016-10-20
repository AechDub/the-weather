angular
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
