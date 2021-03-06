
var el = require('../el.js')

module.exports = function(){

  return el('outer-vertical', {
    'img' : './media/{{ img }}',
    'mytitle' : '{{title}}',
    'subtitle' : '{{subtitle}}', 
    'side' : '{{side}}'
  })
  .content(
    el('div', {'ng-bind-html' : 'content'}),
    el('links-template', {'links' : 'links'})
  )
   

}
