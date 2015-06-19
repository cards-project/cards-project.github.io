
var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/:page', {
    templateUrl : 'templates/page.html',
    controller : 'ContentController'
  })
}])

app.controller('ContentController', ['$scope', '$http', '$routeParams', '$sce',
  function($scope, $http, $routeParams, $sce){
    $http.get('data/' + $routeParams.page + '.json').success(function(data){
      $scope.content = $sce.trustAsHtml(data.content)
      $scope.links = data.links
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
      title : '@',
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
