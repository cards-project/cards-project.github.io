
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

var app = angular.module('directives', [])

app.directive('outerVertical', function () {
  var ret = outer('templates/vertical.html')
  ret.scope.side = '@'
  return ret
})

app.directive('series', function () {
  return outer('templates/series.html')
})
app.directive('outerBottomLarge', function () {
  return outer('templates/outerBottomLarge.html')
})
app.directive('outerBottomSmall', function () {
  return outer('templates/outerBottomSmall.html')
})
app.directive('outerRight', function () {
  return outer('templates/outerRight.html')
})
app.directive('outerLeft', function () {
  return outer('templates/outerLeft.html')
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
