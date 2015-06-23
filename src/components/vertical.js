
var el = require('../el.js')

function template(side){
  return el('outer-' + side, {
    'img' : '{{ img }}',
    'mytitle' : '{{ mytitle }}',
    'subtitle' : '{{subtitle}}'
  }).content(
    el('ng-transclude')
  )
}

module.exports = function(){
  return el('div').content(
    template('right').attribute('ng-if', 'side === &quot;right&quot;'),
    template('left').attribute('ng-if', 'side === &quot;left&quot;')
  )
}
