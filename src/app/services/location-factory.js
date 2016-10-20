angular
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
