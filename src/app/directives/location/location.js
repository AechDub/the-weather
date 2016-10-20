angular
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

