
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
  $routeProvider.when('/', {
    templateUrl : 'templates/front.html',
    controller : 'ContentController'
  })
}])


app.factory('Links', ['$http', function($http){
  var linkInfo = {}

  $http.get('data/links.json').success(function(data){
    linkInfo = data
  })
  
  function getField(info, field, index){
    if(Array.isArray(field))
      field = field[index]

    if(field.charAt(0) === '#')
      return field.slice(1)
    return info[field]
  }

  return {
    getLinks : function(links) { 
      var ret = []
      for(var i = 0; i < links.entities.length; i++){
        var entry = linkInfo[links.entities[i]]
        var link = {
          'title' : getField(entry, links.format.title, i),
          'subtitle' : getField(entry, links.format.subtitle, i),
          'img' : entry.img,
          'path' : entry.path
        }
        ret.push(link)
      }   
      return ret 
    }
  }

}])

app.controller('ContentController', ['$scope', '$http', '$routeParams', '$sce', 'Links',
  function($scope, $http, $routeParams, $sce, links){
    if($routeParams.page === undefined)
      $routeParams.page = 'front'
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

app.controller('LinkController', ['$scope', '$location', function($scope, $location){
  $scope.goto = function(path){
    $location.path(path)
  }
}])
