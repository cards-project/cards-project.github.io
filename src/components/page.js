var el = require('../el.js')

module.exports = function(){

  return el('outer-vertical', {
    'mytitle' : '{{ title }}',
    'subtitle' : '{{ subtitle }}',
    'img' : './media/{{ img }}',
    'side' : 'left'
  })
  .content(
    el('div', {'ng-bind-html' : 'content'}),
    el('links-template', {'links' : 'links'})
  )

}
