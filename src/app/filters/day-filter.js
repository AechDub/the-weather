angular
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
