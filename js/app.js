
var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){

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
      $scope.content = $sce.trustAsHtml(data.content)
      $scope.links = links.getLinks(data.links)
      $scope.title = data.title
      $scope.subtitle = data.subtitle
      $scope.img = data.img
    })
  }
])

function outer(templateUrl){
  return {
    restrict : 'E',
    scope : {
      mytitle : '@',
      subtitle : '@',
      img : '@',
    },
    transclude : true,
    replace : true,
    templateUrl : templateUrl,
  }
}

app.directive('outerTemplate', function () {
  return outer('templates/outerBottomLarge.html')
})
app.directive('outerRight', function () {
  return outer('templates/outerRight.html')
})

app.directive('linksTemplate', function () {
    return {
      restrict : 'E',
      scope : {
        links : '=',
      },
      templateUrl : 'templates/links.html'
    };
});
