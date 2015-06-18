
var app = angular.module('app', []);

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
