var el = require('../el.js')

module.exports = function(){

  return el('outer-bottom-small', {
    'mytitle' : '{{ title }}',
    'subtitle' : '{{ subtitle }}',
    'img' : './media/{{ img }}'
  })
  .content(
    el('div', {'ng-bind-html' : 'content'}),
    el('links-template', {'links' : 'links'})
  )

}
