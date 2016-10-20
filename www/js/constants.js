;(function(){
  angular.module('app')
    .constant('Constants', {
      assetsDir: '/assets',
      darkSkyApiUrl: 'https://api.darksky.net/{type}/392ce8fff24cd6738d10baf8cd68990d/{lat},{lang}?units=auto',
      googleApiUrl: 'https://maps.googleapis.com/maps/api/geocode/json?address={city},+{state}&key=AIzaSyADOU2GIxZHFq7UEkgS2UQtdb-htdBeF7o'
    });
})();