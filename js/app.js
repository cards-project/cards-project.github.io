
var app = angular.module('app', ['ngRoute', 'directives', 'series']);

app.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/series/:series', {
    templateUrl : 'templates/series.html',
    controller : 'SeriesController'
  })
  $routeProvider.when('/series/:series/:page', {
    templateUrl : 'templates/submission.html',
    controller : 'SeriesController'
  })
  $routeProvider.when('/:page', {
    templateUrl : 'templates/page.html',
    controller : 'ContentController'
  })
}])


app.factory('Links', ['$http', function($http){
  var linkInfo = {}

  $http.get('data/links.json').success(function(data){
    linkInfo = data
  })
  
  return {
    getLinks : function(links) { 
      var ret = []
      for(var i = 0; i < links.entities.length; i++){
        var entry = linkInfo[links.entities[i]]
        var link = {
          'title' : entry[links.format.title],
          'subtitle' : entry[links.format.subtitle],
          'img' : entry.img
        }
        ret.push(link)
      }   
      return ret 
    }
  }

}])

app.controller('ContentController', ['$scope', '$http', '$routeParams', '$sce', 'Links',
  function($scope, $http, $routeParams, $sce, links){
    $http.get('data/' + $routeParams.page + '.json').success(function(data){
      if(data.content !== undefined){
        $scope.content = $sce.trustAsHtml(data.content)
        data.content = undefined
      }
      if(data.links !== undefined){
        $scope.links = links.getLinks(data.links)
        data.links = undefined
      }
      var keys = Object.keys(data)
      for(var i = 0; i < keys.length; i++){
        if(data[keys[i]] !== undefined){
          $scope[keys[i]] = data[keys[i]]
        }
      }
    })
  }
])
