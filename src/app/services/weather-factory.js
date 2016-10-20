angular
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
